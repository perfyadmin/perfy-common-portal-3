import { useEffect, useRef, useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Play, Pause, ChevronUp, ChevronDown, Loader2 } from "lucide-react";

// Use CDN worker matching installed pdfjs version
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
  url: string;
  /** Whether parent group is hovered — drives auto-scroll */
  hover: boolean;
  /** Compact height when not hovered */
  collapsedHeight?: number;
  /** Expanded height on hover */
  expandedHeight?: number;
}

/**
 * Mini PDF viewer that renders all pages stacked vertically and slowly
 * auto-scrolls through every page while hovered. Provides play/pause and
 * jump-to-page controls that appear on hover.
 */
export const ReportPreview = ({ url, hover, collapsedHeight = 128, expandedHeight = 220 }: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(280);

  // Measure container width for crisp page rendering
  useEffect(() => {
    const el = scrollerRef.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // Auto-scroll loop while hovered & not paused
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const stop = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    if (!hover || paused || numPages === 0) {
      stop();
      return;
    }

    // Cinematic scrolling: slow ~32 px/s with brief pause at each page boundary
    const SPEED = 32;
    const PAUSE_MS = 750; // dwell at each page top
    let last = performance.now();
    let pauseUntil = 0;
    let currentPage = 1;

    const tick = (now: number) => {
      if (!el) return;
      const dt = Math.min(0.05, (now - last) / 1000); // cap dt to avoid jumps after tab switch
      last = now;
      const max = el.scrollHeight - el.clientHeight;
      const pageHeight = el.scrollHeight / numPages;

      if (now < pauseUntil) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Smooth ease-in-out velocity within each page (slow at edges, faster mid-page)
      const within = (el.scrollTop % pageHeight) / pageHeight; // 0..1
      const ease = 0.55 + 0.85 * Math.sin(within * Math.PI); // 0.55..1.4
      let next = el.scrollTop + SPEED * ease * dt;

      if (next >= max - 1) {
        // Reached end — pause then loop to top
        el.scrollTop = max;
        setPage(numPages);
        pauseUntil = now + 1200;
        // Schedule reset
        setTimeout(() => {
          if (!el) return;
          el.scrollTo({ top: 0, behavior: "smooth" });
          setPage(1);
          currentPage = 1;
          last = performance.now();
        }, 1200);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      el.scrollTop = next;
      const pageNow = Math.min(numPages, Math.floor(next / pageHeight) + 1);
      if (pageNow !== currentPage) {
        currentPage = pageNow;
        setPage(pageNow);
        pauseUntil = now + PAUSE_MS; // dwell on the new page
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return stop;
  }, [hover, paused, numPages]);

  // Reset to top when hover leaves
  useEffect(() => {
    if (!hover && scrollerRef.current) {
      scrollerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      setPage(1);
    }
  }, [hover]);

  const jumpPage = useCallback((delta: number) => {
    const el = scrollerRef.current;
    if (!el || numPages === 0) return;
    const pageHeight = el.scrollHeight / numPages;
    const target = Math.max(1, Math.min(numPages, page + delta));
    el.scrollTo({ top: (target - 1) * pageHeight, behavior: "smooth" });
    setPage(target);
  }, [page, numPages]);

  const height = hover ? expandedHeight : collapsedHeight;

  return (
    <div
      className="relative rounded-xl border bg-white overflow-hidden transition-all duration-500"
      style={{ height }}
    >
      <div
        ref={scrollerRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        <Document
          file={url}
          onLoadSuccess={(d) => setNumPages(d.numPages)}
          loading={
            <div className="flex items-center justify-center h-full text-xs text-muted-foreground gap-2">
              <Loader2 className="size-3 animate-spin" /> Loading preview…
            </div>
          }
          error={
            <div className="flex items-center justify-center h-full text-xs text-muted-foreground p-3 text-center">
              Preview unavailable
            </div>
          }
          className="flex flex-col gap-2 p-2"
        >
          {Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i + 1}
              pageNumber={i + 1}
              width={Math.max(width - 16, 200)}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-sm rounded overflow-hidden mx-auto"
            />
          ))}
        </Document>
      </div>

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10" />

      {/* Hover controls */}
      <div
        className={`absolute top-2 right-2 z-20 flex items-center gap-1 transition-all duration-300 ${
          hover ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <button
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); jumpPage(-1); }}
          className="size-6 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center text-primary hover:bg-white"
          aria-label="Previous page"
        >
          <ChevronUp className="size-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); setPaused((p) => !p); }}
          className="size-6 rounded-full bg-primary text-primary-foreground shadow-sm flex items-center justify-center hover:opacity-90"
          aria-label={paused ? "Play" : "Pause"}
        >
          {paused ? <Play className="size-3" /> : <Pause className="size-3" />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); jumpPage(1); }}
          className="size-6 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center text-primary hover:bg-white"
          aria-label="Next page"
        >
          <ChevronDown className="size-3.5" />
        </button>
      </div>

      {/* Page indicator */}
      <div className="absolute bottom-2 right-2 z-20 text-[10px] font-semibold bg-white/85 backdrop-blur rounded-full px-2 py-0.5 text-muted-foreground tabular-nums">
        {numPages > 0 ? `${page} / ${numPages}` : "…"}
      </div>
    </div>
  );
};
