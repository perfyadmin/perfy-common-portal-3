import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  TrendingUp, Workflow, Activity, Wallet, Cpu, Layers, Users, ShieldCheck,
  Target, LineChart, ShieldAlert, Rocket, Eye, Network, Boxes, Crown,
} from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";

type Benefit = { icon: any; title: string; points: string[] };

const clientBenefits: Benefit[] = [
  { icon: TrendingUp, title: "Strategic Growth", points: ["Clear business growth plans", "Smart systems for better performance", "Long-term business stability"] },
  { icon: Workflow, title: "Strong Execution", points: ["End-to-end implementation support", "Organised workflows and systems", "Result-focused operations"] },
  { icon: Activity, title: "Stable Operations", points: ["Smooth and efficient processes", "Reduced operational risks", "Better team coordination"] },
  { icon: Wallet, title: "Financial Improvement", points: ["Better cost management", "Increased profitability", "Stronger cash flow control"] },
  { icon: Cpu, title: "Technology & Automation", points: ["Automated business processes", "Real-time performance tracking", "Better operational efficiency"] },
  { icon: Layers, title: "Scalable Business Structure", points: ["Expansion-ready systems", "Sustainable business growth", "Strong operational foundation"] },
  { icon: Users, title: "Team & Workforce Development", points: ["Improved employee productivity", "Structured HR systems", "Better organisational discipline"] },
  { icon: ShieldCheck, title: "Founder-Friendly Support", points: ["The founder keeps full control", "Strategic execution support", "Growth without losing ownership"] },
];

const investorBenefits: Benefit[] = [
  { icon: Target, title: "Smart Investment Opportunities", points: ["Professionally structured businesses", "Growth-focused investment model", "Better business evaluation systems"] },
  { icon: LineChart, title: "Performance-Driven Returns", points: ["ROI-focused execution", "Continuous growth monitoring", "Strong operational support"] },
  { icon: ShieldAlert, title: "Reduced Investment Risks", points: ["Structured operational systems", "Better financial visibility", "Controlled growth environment"] },
  { icon: Rocket, title: "Long-Term Growth Potential", points: ["Scalable business ecosystem", "Multi-industry opportunities", "Strong future valuation potential"] },
  { icon: Eye, title: "Transparent Financial Systems", points: ["Clear fund management", "Performance tracking systems", "Organised reporting structure"] },
  { icon: Network, title: "Strategic Business Network", points: ["Access to expert support systems", "Integrated business ecosystem", "Strong execution partnerships"] },
  { icon: Boxes, title: "Scalable Investment Framework", points: ["Expansion-ready model", "Diversified growth opportunities", "Sustainable long-term scalability"] },
  { icon: Crown, title: "Founder-Protected Ecosystem", points: ["Founder-led businesses", "Stable partnership structure", "Strong long-term commitment"] },
];

const BenefitCard = ({ b, i, accent }: { b: Benefit; i: number; accent: "electric" | "cyan" }) => {
  const reduce = useReducedMotion();
  const Icon = b.icon;
  const accentVar = accent === "electric" ? "var(--perfy-electric)" : "var(--perfy-cyan)";
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full rounded-2xl glass-perfy p-6 border border-white/10 overflow-hidden hover:-translate-y-1 hover:border-white/20 transition-all duration-500">
        <div
          className="absolute -top-12 -right-12 size-40 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700"
          style={{ background: `radial-gradient(circle, hsl(${accentVar}) 0%, transparent 70%)` }}
        />
        <div
          className="relative inline-flex size-12 items-center justify-center rounded-xl ring-1 ring-white/15"
          style={{ background: `linear-gradient(135deg, hsl(${accentVar} / 0.25), hsl(${accentVar} / 0.05))` }}
        >
          <Icon className="size-5" style={{ color: `hsl(${accentVar})` }} />
        </div>
        <h3 className="relative mt-4 text-lg font-bold text-white font-display-perfy leading-snug">{b.title}</h3>
        <ul className="relative mt-4 space-y-2.5">
          {b.points.map((pt) => (
            <li key={pt} className="flex items-start gap-2.5 text-sm text-[hsl(var(--perfy-silver))] leading-relaxed">
              <span
                className="mt-1.5 size-1.5 shrink-0 rounded-full"
                style={{ background: `hsl(${accentVar})`, boxShadow: `0 0 8px hsl(${accentVar} / 0.7)` }}
              />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export const BenefitsSection = () => {
  const [tab, setTab] = useState<"clients" | "investors">("clients");
  const data = tab === "clients" ? clientBenefits : investorBenefits;
  const accent = tab === "clients" ? "electric" : "cyan";

  return (
    <section id="benefits" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 mesh-perfy opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[10px] sm:text-xs tracking-[0.35em] text-[hsl(var(--perfy-cyan))] font-semibold">
              VALUE WE DELIVER
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display-perfy leading-[1.05] tracking-tight">
              Built to benefit{" "}
              <span className="text-electric bg-gradient-to-r from-[hsl(var(--perfy-electric))] via-[hsl(var(--perfy-cyan))] to-[hsl(var(--perfy-electric))] bg-clip-text text-transparent">
                every stakeholder
              </span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-[hsl(var(--perfy-muted))] leading-relaxed">
              From founders and operators to investors — PERFY engineers measurable outcomes across the entire business ecosystem.
            </p>
          </div>
        </RevealOnScroll>

        {/* Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full p-1 bg-white/5 border border-white/10 backdrop-blur-md">
            {(["clients", "investors"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`relative px-6 sm:px-8 py-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full transition-colors ${
                  tab === key ? "text-white" : "text-[hsl(var(--perfy-muted))] hover:text-white"
                }`}
              >
                {tab === key && (
                  <motion.span
                    layoutId="benefit-tab-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(var(--perfy-electric))]/40 to-[hsl(var(--perfy-cyan))]/40 ring-1 ring-white/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">For {key === "clients" ? "Clients" : "Investors"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((b, i) => (
            <BenefitCard key={`${tab}-${b.title}`} b={b} i={i} accent={accent} />
          ))}
        </div>
      </div>
    </section>
  );
};
