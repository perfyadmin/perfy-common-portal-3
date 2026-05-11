import { Target, Network, Trophy } from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";

const items = [
  {
    icon: Target,
    title: "Execution-Led Transformation",
    body: "We assume responsibility beyond strategy. PERFY embeds inside the business — designing and operationalising systems that ensure execution integrity and performance consistency.",
  },
  {
    icon: Network,
    title: "System-Centric Architecture",
    body: "Workflows, SOPs, dashboards, and accountability structures replace tribal knowledge — turning fragile organisations into compounding, scalable systems.",
  },
  {
    icon: Trophy,
    title: "Outcome-Driven Engagement",
    body: "Engagements are defined not by recommendations but by results — measured in performance, predictability, and sustained organisational discipline.",
  },
];

export const WhatSetsApart = () => (
  <section className="py-28 relative">
    <div className="mx-auto max-w-7xl px-6">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] text-[hsl(var(--perfy-cyan))]">WHAT SETS PERFY APART</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto">
            Beyond advisory. <span className="text-electric">An embedded execution partner.</span>
          </h2>
        </div>
      </RevealOnScroll>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <RevealOnScroll key={it.title} delay={i * 0.1}>
              <div className="group relative h-full rounded-3xl glass-perfy glow-border p-8 hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-[hsl(var(--perfy-cyan))]/60 to-transparent" />
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[hsl(var(--perfy-electric))]/20 to-[hsl(var(--perfy-cyan))]/10 border border-white/10 flex items-center justify-center mb-6">
                  <Icon className="size-5 text-[hsl(var(--perfy-cyan))]" />
                </div>
                <h3 className="text-xl font-semibold text-white font-display-perfy">{it.title}</h3>
                <p className="mt-3 text-sm text-[hsl(var(--perfy-muted))] leading-relaxed">{it.body}</p>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  </section>
);
