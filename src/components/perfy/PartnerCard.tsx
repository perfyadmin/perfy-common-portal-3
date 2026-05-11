import { useMemo, useState } from "react";
import { Linkedin, Twitter, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export interface Partner {
  id: string;
  name: string;
  designation: string | null;
  company: string | null;
  bio: string | null;
  photo_url: string | null;
  company_logo_url?: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  website_url: string | null;
}

const PartnerFallback = ({ id, name, full = false }: { id: string; name: string; full?: boolean }) => (
  <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-[hsl(var(--perfy-navy))]/60 to-black/60">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(var(--perfy-electric),0.24),transparent_52%)]" />
    <svg viewBox="0 0 200 240" className={`relative z-10 ${full ? "h-4/5 w-4/5" : "h-3/5 w-3/5"} opacity-90`} fill="none" aria-label={`${name} placeholder portrait`} role="img">
      <defs>
        <linearGradient id={`g-${id}-${full ? "f" : "s"}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--perfy-electric))" stopOpacity="0.85" />
          <stop offset="100%" stopColor="hsl(var(--perfy-cyan))" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path d="M20 230 C 30 170, 70 150, 100 150 C 130 150, 170 170, 180 230 Z" fill={`url(#g-${id}-${full ? "f" : "s"})`} opacity="0.9" />
      <circle cx="100" cy="90" r="48" fill={`url(#g-${id}-${full ? "f" : "s"})`} />
      <ellipse cx="85" cy="75" rx="12" ry="8" fill="white" opacity="0.25" />
    </svg>
  </div>
);

export const PartnerCard = ({ p }: { p: Partner }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [open, setOpen] = useState(false);

  const resolvedPhotoUrl = useMemo(() => {
    if (!p.photo_url) return null;
    if (/^https?:\/\//i.test(p.photo_url)) return p.photo_url;
    const cleanPath = p.photo_url.replace(/^\/+/, "");
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${cleanPath}`;
  }, [p.photo_url]);

  const resolveUrl = (raw: string) => {
    const v = raw.trim();
    if (!v) return null;
    if (/^https?:\/\//i.test(v)) return v;
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${v.replace(/^\/+/, "")}`;
  };

  const logoUrls = useMemo(() => {
    if (!p.company_logo_url) return [] as string[];
    return p.company_logo_url.split(/[,\n]+/).map(resolveUrl).filter((x): x is string => Boolean(x));
  }, [p.company_logo_url]);

  const companyNames = useMemo(() => {
    if (!p.company) return [] as string[];
    return p.company.split(/\s*[/,]\s*/).map((s) => s.trim()).filter(Boolean);
  }, [p.company]);

  const showPhoto = Boolean(resolvedPhotoUrl) && !imageFailed;

  return (
    <>
      <article
        onClick={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }}
        role="button"
        tabIndex={0}
        aria-label={`View ${p.name} details`}
        className="group relative flex h-full w-full flex-col cursor-pointer rounded-3xl glass-perfy glow-border overflow-hidden focus:outline-none focus:ring-2 focus:ring-[hsl(var(--perfy-cyan))] hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_hsl(var(--perfy-electric)/0.45)] transition-all duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--perfy-electric))]/10 via-transparent to-[hsl(var(--perfy-cyan))]/10 pointer-events-none" />

        <div className="relative w-full aspect-square overflow-hidden bg-black">
          {showPhoto ? (
            <img
              src={resolvedPhotoUrl!}
              alt={p.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              onLoad={() => console.info("[PartnerCard] image loaded", { id: p.id, name: p.name })}
              onError={() => { console.error("[PartnerCard] image failed", { id: p.id, name: p.name, photoUrl: resolvedPhotoUrl }); setImageFailed(true); }}
            />
          ) : (
            <PartnerFallback id={p.id} name={p.name} />
          )}

          {/* Subtle vignette only — keeps photo fully visible */}
          <div data-testid="partner-scrim" className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

          <span data-testid="partner-cta" className="absolute bottom-2.5 left-2.5 z-10 inline-flex items-center rounded-full bg-black/70 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#ffffff] ring-1 ring-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">View profile</span>
        </div>

        {/* Info panel — name, designation, brand */}
        <div className="relative flex-1 flex flex-col px-3.5 pt-2.5 pb-3 bg-gradient-to-b from-[hsl(var(--perfy-navy))]/95 to-black/95 border-t border-white/10">
          <h3 data-testid="partner-name" className="text-[#ffffff] text-sm sm:text-[15px] font-bold font-display-perfy leading-tight truncate">{p.name}</h3>
          {p.designation && (
            <p data-testid="partner-designation" className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-[hsl(var(--perfy-cyan))] truncate">{p.designation}</p>
          )}

          {(companyNames.length > 0 || logoUrls.length > 0) && (
            <div className="mt-2.5 flex items-center gap-2 pt-2.5 border-t border-white/10">
              <div className="flex shrink-0 items-center -space-x-1.5">
                {Array.from({ length: Math.max(companyNames.length, logoUrls.length, 1) }).map((_, idx) => {
                  const url = logoUrls[idx];
                  const label = companyNames[idx] || p.name;
                  return (
                    <div key={idx} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white ring-2 ring-[hsl(var(--perfy-navy))] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                      {url ? (
                        <img src={url} alt={`${label} logo`} className="h-full w-full object-contain p-0.5" loading="lazy" />
                      ) : (
                        <span className="text-xs font-bold text-[hsl(var(--perfy-navy))]">{label.charAt(0)}</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <p data-testid="partner-company" className="min-w-0 flex-1 truncate text-xs font-semibold text-[#ffffff] leading-snug">
                {companyNames.length > 1 ? companyNames.join(" · ") : (companyNames[0] || "—")}
              </p>
            </div>
          )}
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl overflow-hidden border-[hsl(var(--perfy-electric))]/30 bg-[hsl(var(--perfy-navy))]/95 p-0 text-[#ffffff] backdrop-blur-xl">
          <VisuallyHidden>
            <DialogTitle>{p.name}</DialogTitle>
            <DialogDescription>{p.designation || "Partner profile"}</DialogDescription>
          </VisuallyHidden>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-square w-full bg-black md:aspect-auto md:min-h-[480px]">
              {showPhoto ? (
                <img
                  src={resolvedPhotoUrl!}
                  alt={p.name}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              ) : (
                <PartnerFallback id={p.id} name={p.name} full />
              )}
            </div>
            <div className="flex flex-col justify-center gap-4 p-8">
              <div>
                <h2 className="text-3xl font-semibold font-display-perfy">{p.name}</h2>
                {p.designation && (
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[hsl(var(--perfy-cyan))]">{p.designation}</p>
                )}
                {p.company && <p className="mt-1 text-sm text-[hsl(var(--perfy-silver))]">{p.company}</p>}
              </div>
              <p className="text-sm leading-relaxed text-[hsl(var(--perfy-silver))]/90">
                {p.bio || "Strategic partner in the PERFY ecosystem."}
              </p>
              <div className="mt-2 flex gap-4">
                {p.linkedin_url && <a href={p.linkedin_url} target="_blank" rel="noreferrer" aria-label={`${p.name} LinkedIn`} className="text-white/70 hover:text-[hsl(var(--perfy-cyan))]"><Linkedin className="size-5" /></a>}
                {p.twitter_url && <a href={p.twitter_url} target="_blank" rel="noreferrer" aria-label={`${p.name} Twitter`} className="text-white/70 hover:text-[hsl(var(--perfy-cyan))]"><Twitter className="size-5" /></a>}
                {p.website_url && <a href={p.website_url} target="_blank" rel="noreferrer" aria-label={`${p.name} Website`} className="text-white/70 hover:text-[hsl(var(--perfy-cyan))]"><Globe className="size-5" /></a>}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
