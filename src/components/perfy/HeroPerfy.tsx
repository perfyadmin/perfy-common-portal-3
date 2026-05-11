import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Target, Layers, TrendingUp, Cog, Rocket } from "lucide-react";
import { ParticleField } from "./ParticleField";
import { GlowButton } from "./GlowButton";
import { Link } from "react-router-dom";
import heroCharacter from "@/assets/perfy-welcome-character.png";

const floatingBadges = [
  { Icon: Target, label: "Strategy", className: "-top-2 -left-4 bg-gradient-to-br from-[hsl(var(--perfy-electric))] to-[hsl(var(--perfy-cyan))] text-black", delay: 0 },
  { Icon: Cog, label: "Execution", className: "top-16 -right-6 bg-white/90 text-[hsl(12_30%_14%)] border border-[hsl(var(--perfy-cyan))]/40", delay: 0.6 },
  { Icon: Layers, label: "Systems", className: "bottom-24 -left-8 bg-white/90 text-[hsl(12_30%_14%)] border border-[hsl(var(--perfy-electric))]/40", delay: 1.2 },
  { Icon: TrendingUp, label: "Performance", className: "bottom-6 right-2 bg-gradient-to-br from-[hsl(var(--perfy-cyan))] to-[hsl(var(--perfy-electric))] text-black", delay: 1.8 },
  { Icon: Rocket, label: "Scale", className: "top-1/2 -right-10 bg-white/90 text-[hsl(12_30%_14%)] border border-[hsl(var(--perfy-cyan))]/40", delay: 2.4 },
];

export const HeroPerfy = () => (
  <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0 mesh-perfy" />
    <div className="absolute inset-0 grid-bg opacity-30" />
    <div className="absolute inset-0">
      <ParticleField density={70} />
    </div>

    <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center w-full">
      <div className="lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full glass-perfy glow-border px-4 py-1.5 text-xs text-[hsl(var(--perfy-cyan))]"
        >
          <Sparkles className="size-3.5" /> Performance-Empowerment Firm
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] text-white font-display-perfy"
        >
          Power Your Business{" "}
          <span className="text-electric animate-gradient-shift bg-gradient-to-r from-[hsl(var(--perfy-electric))] via-[hsl(var(--perfy-cyan))] to-white bg-clip-text text-transparent">
            Performance
          </span>
          <br />with PERFY
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-6 text-lg text-[hsl(var(--perfy-muted))] max-w-2xl leading-relaxed"
        >
          PERFY is a performance-empowerment firm that transforms businesses into scalable, system-driven
          organizations through strategy, execution, operational discipline, and performance engineering.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <GlowButton onClick={() => document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })}>
            Partner With PERFY <ArrowRight className="size-4" />
          </GlowButton>
          <GlowButton variant="ghost">
            <Link to="/about">Discover the Story</Link>
          </GlowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
          className="mt-14 grid grid-cols-3 gap-6 max-w-md"
        >
          {[
            { k: "5", v: "Phase methodology" },
            { k: "7+", v: "Ecosystem domains" },
            { k: "100%", v: "Embedded execution" },
          ].map((s) => (
            <div key={s.v}>
              <div className="text-3xl font-bold text-white font-display-perfy">{s.k}</div>
              <div className="text-xs text-[hsl(var(--perfy-muted))] mt-1">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-5 relative"
      >
        <div className="absolute inset-0 -m-10 rounded-[3rem] bg-gradient-to-br from-[hsl(var(--perfy-electric))]/25 via-[hsl(var(--perfy-cyan))]/15 to-transparent blur-3xl" />
        <div className="relative animate-perfy-float">
          <img
            src={heroCharacter}
            alt="PERFY strategist engineering high-performance business systems"
            width={1280}
            height={1024}
            className="relative w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
          />
        </div>
        {floatingBadges.map(({ Icon, label, className, delay }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 + delay * 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute ${className} rounded-2xl px-3 py-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] flex items-center gap-2 backdrop-blur-md animate-bounce-soft`}
            style={{ animationDelay: `${delay}s` }}
          >
            <Icon className="size-4" />
            <span className="font-semibold text-xs tracking-wide">{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
