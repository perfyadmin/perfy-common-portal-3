import { motion } from "framer-motion";
import { Search, Layers, Cog, TrendingUp, Rocket } from "lucide-react";

const steps = [
  { icon: Search, title: "Diagnose", body: "Deep operational, financial, and structural diagnostics surface the real constraints — not symptoms." },
  { icon: Layers, title: "Architect", body: "Tailored transformation blueprints align strategy, systems, capital, and people around outcomes." },
  { icon: Cog, title: "Execute", body: "We embed inside the business — installing SOPs, workflows, and accountability rhythms with discipline." },
  { icon: TrendingUp, title: "Optimize", body: "Performance dashboards and continuous calibration ensure consistency and compounding gains." },
  { icon: Rocket, title: "Scale", body: "Once the system runs, we engineer scale — capital, capability, and category leadership." },
];

export const MethodologyTimeline = () => (
  <section id="methodology" className="py-28 relative overflow-hidden">
    <div className="absolute inset-0 mesh-perfy opacity-40" />
    <div className="relative mx-auto max-w-7xl px-6">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <span className="text-xs tracking-[0.3em] text-[hsl(var(--perfy-cyan))]">METHODOLOGY</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white font-display-perfy">
          A disciplined path from <span className="text-electric">insight</span> to scale
        </h2>
        <p className="mt-5 text-[hsl(var(--perfy-muted))]">
          Five phases. One unified system. Each stage compounds the last — from diagnosis to category leadership.
        </p>
      </div>

      {/* horizontal connected flow */}
      <div className="relative">
        <div className="hidden lg:block absolute left-0 right-0 top-[68px] h-px bg-gradient-to-r from-transparent via-[hsl(var(--perfy-cyan))]/40 to-transparent" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 w-[136px] h-[136px] rounded-full glass-perfy glow-border flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-500">
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[hsl(var(--perfy-electric))]/20 to-[hsl(var(--perfy-cyan))]/10 blur-xl" />
                    <div className="relative flex flex-col items-center">
                      <Icon className="size-9 text-[hsl(var(--perfy-cyan))]" />
                      <span className="mt-1 text-[10px] tracking-[0.3em] text-white/60">0{i + 1}</span>
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white font-display-perfy">{s.title}</h3>
                  <p className="mt-2 text-sm text-[hsl(var(--perfy-muted))] leading-relaxed max-w-[220px]">
                    {s.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* outcome row */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 grid sm:grid-cols-3 gap-4"
      >
        {[
          { k: "Clarity", v: "Constraints surfaced and prioritized in weeks, not quarters." },
          { k: "Discipline", v: "Operating rhythms and SOPs that survive leadership changes." },
          { k: "Leverage", v: "Compounding gains through dashboards and continuous calibration." },
        ].map((o) => (
          <div key={o.k} className="rounded-2xl glass-perfy p-6 border border-white/5">
            <div className="text-xs tracking-[0.3em] text-[hsl(var(--perfy-cyan))]">{o.k.toUpperCase()}</div>
            <p className="mt-2 text-sm text-[hsl(var(--perfy-silver))]/85 leading-relaxed">{o.v}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);
