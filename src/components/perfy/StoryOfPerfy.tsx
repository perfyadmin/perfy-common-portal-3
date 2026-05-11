import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChapterVisual } from "./ChapterVisuals";

const chapters = [
  {
    tag: "WHERE IT BEGAN",
    title: "Most businesses don't fail from bad ideas.",
    body: "They fail because execution breaks down. PERFY was born from observing brilliant founders watching their potential dissolve in operational chaos.",
    hover: "We watched billion-dollar ideas die in messy spreadsheets. So we built the system that catches them.",
    visual: "chaos",
  },
  {
    tag: "THE PROBLEM",
    title: "Strategy without execution has no value.",
    body: "Traditional advisory ends at recommendations. PERFY embeds inside the business — owning analysis, planning, implementation, and stabilization.",
    hover: "Decks don't ship products. Operators do. PERFY owns the work, not just the advice.",
    visual: "broken",
  },
  {
    tag: "THE PHILOSOPHY",
    title: "Growth must be engineered.",
    body: "Structured. Controlled. Measured. Optimized continuously. Every PERFY system was built around clarity and performance consistency.",
    hover: "Growth is a system, not a slogan — engineered module by module, dashboard by dashboard.",
    visual: "structure",
  },
  {
    tag: "THE ECOSYSTEM",
    title: "One discipline. Many specialists.",
    body: "Strategy, operations, finance, HR, technology, branding, and venture capital — unified into a single transformation ecosystem.",
    hover: "Seven domains. One brain. Specialists that move as a single coordinated force.",
    visual: "ecosystem",
  },
  {
    tag: "TODAY",
    title: "A movement, not a company.",
    body: "PERFY exists to engineer businesses that perform with precision — and to ensure no entrepreneur fails for lack of structure.",
    hover: "We're not building a firm. We're building the operating standard for high-performance business.",
    visual: "future",
  },
];

const Chapter = ({ c, i }: { c: typeof chapters[number]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.25, 1, 1, 0.25]);
  const reverse = i % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="min-h-[60vh] md:min-h-[80vh] flex items-center py-12 md:py-20"
    >
      <motion.div
        style={{ y }}
        className="grid md:grid-cols-12 gap-8 md:gap-14 items-center w-full"
      >
        {/* Copy */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: reverse ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`md:col-span-6 ${reverse ? "md:order-2" : ""}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] sm:text-xs tracking-[0.32em] text-[hsl(22_85%_55%)] font-semibold">
              CHAPTER 0{i + 1}
            </span>
            <span className="h-px w-10 bg-gradient-to-r from-[hsl(22_85%_55%)] to-transparent" />
            <span className="text-[10px] sm:text-xs tracking-[0.28em] text-[hsl(var(--perfy-muted))]">{c.tag}</span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.05] font-display-perfy tracking-tight">
            {c.title}
          </h3>
          <p className="mt-5 md:mt-6 text-base md:text-lg text-[hsl(var(--perfy-muted))] leading-relaxed max-w-xl">
            {c.body}
          </p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 md:mt-7 text-sm md:text-[15px] italic text-[hsl(22_85%_70%)]/90 leading-relaxed max-w-lg border-l-2 border-[hsl(22_85%_55%)]/40 pl-4"
          >
            "{c.hover}"
          </motion.p>
        </motion.div>

        {/* Visual card — unified frosted ivory */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: reverse ? -40 : 40, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduce ? undefined : { y: -6, scale: 1.015 }}
          className={`md:col-span-6 ${reverse ? "md:order-1" : ""} group`}
        >
          <div className="relative mx-auto w-full max-w-[460px] aspect-square">
            {/* ambient glow */}
            <div className="absolute inset-0 -m-6 rounded-[2.5rem] bg-gradient-to-br from-[hsl(22_85%_55%)]/25 via-[hsl(350_70%_40%)]/15 to-transparent blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
            {/* card */}
            <div className="relative w-full h-full rounded-[2rem] p-5 sm:p-6 md:p-7 bg-gradient-to-br from-[hsl(36_50%_97%)] via-[hsl(30_40%_94%)] to-[hsl(22_45%_92%)] border border-[hsl(22_75%_55%)]/25 shadow-[0_30px_60px_-20px_hsl(350_70%_25%/0.45),inset_0_1px_0_0_hsl(36_60%_99%)] backdrop-blur-xl overflow-hidden">
              {/* corner badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
                <span className="size-1.5 rounded-full bg-[hsl(22_85%_55%)] animate-pulse" />
                <span className="text-[9px] tracking-[0.25em] text-[hsl(12_30%_30%)] font-semibold">LIVE</span>
              </div>
              {/* subtle inner gradient sheen on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-[hsl(22_85%_55%)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              {/* visual */}
              <div className="relative w-full h-full">
                <ChapterVisual kind={c.visual} />
              </div>
            </div>
            {/* chapter index ghost numeral */}
            <div className="absolute -bottom-4 -right-2 md:-right-4 text-[5rem] md:text-[7rem] font-black leading-none text-[hsl(22_85%_55%)]/10 font-display-perfy select-none pointer-events-none">
              0{i + 1}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const StoryOfPerfy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="story" ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 mesh-perfy opacity-40 pointer-events-none" />

      {/* vertical scroll progress rail (desktop) */}
      <div className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="relative h-48 w-px bg-white/10 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleY: progressScale, transformOrigin: "top" }}
            className="absolute inset-0 bg-gradient-to-b from-[hsl(22_85%_55%)] via-[hsl(350_70%_45%)] to-[hsl(22_85%_55%)]"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 text-center max-w-4xl mx-auto"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.35em] text-[hsl(22_85%_55%)] font-semibold">
            THE STORY · IN FIVE CHAPTERS
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display-perfy leading-[1.05] tracking-tight">
            Building businesses through<br />
            <span className="text-electric bg-gradient-to-r from-[hsl(22_85%_60%)] via-[hsl(350_70%_55%)] to-[hsl(22_85%_60%)] bg-clip-text text-transparent">
              structure, execution & performance
            </span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-[hsl(var(--perfy-muted))] max-w-2xl mx-auto leading-relaxed">
            Scroll through the philosophy that engineered PERFY — chapter by chapter.
          </p>
        </motion.div>

        <div className="space-y-4 md:space-y-8">
          {chapters.map((c, i) => <Chapter key={c.tag} c={c} i={i} />)}
        </div>
      </div>
    </section>
  );
};
