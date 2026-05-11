import { PerfyNav } from "@/components/perfy/PerfyNav";
import { PerfyFooter } from "@/components/perfy/PerfyFooter";
import { EcosystemNetwork } from "@/components/perfy/EcosystemNetwork";
import { PartnersSection } from "@/components/perfy/PartnersSection";
import { FinalCTAPerfy } from "@/components/perfy/FinalCTAPerfy";
import { RevealOnScroll } from "@/components/perfy/RevealOnScroll";
import { useSeo } from "@/hooks/useSeo";
import { ParticleField } from "@/components/perfy/ParticleField";
import { motion } from "framer-motion";
import {
  Sparkles, Target, Workflow, ShieldCheck, TrendingUp, Globe2, MapPin, Compass,
  Search, Settings2, Rocket, Layers, Cpu, Wallet, Users, Megaphone, LineChart,
  Building2, Network, GitBranch, CheckCircle2, Zap, Brain, Activity, Gauge,
} from "lucide-react";
import aboutCharacter from "@/assets/perfy-about-character.png";

const Section = ({
  id, eyebrow, title, subtitle, children,
}: { id?: string; eyebrow: string; title: React.ReactNode; subtitle?: React.ReactNode; children: React.ReactNode }) => (
  <section id={id} className="py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-6">
      <RevealOnScroll>
        <span className="text-xs tracking-[0.3em] text-[hsl(var(--perfy-cyan))]">{eyebrow}</span>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white font-display-perfy max-w-3xl">{title}</h2>
        {subtitle && <p className="mt-4 text-base md:text-lg text-[hsl(var(--perfy-muted))] max-w-3xl">{subtitle}</p>}
      </RevealOnScroll>
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

const visionPoints = [
  { Icon: Layers, t: "Structured operational systems" },
  { Icon: Network, t: "Scalable business frameworks" },
  { Icon: Cpu, t: "Technology-driven execution" },
  { Icon: Wallet, t: "Financial discipline & stability" },
  { Icon: Gauge, t: "Performance-oriented management" },
  { Icon: TrendingUp, t: "Sustainable organizational growth" },
];

const missionPillars = [
  "Strategic business intelligence",
  "Execution-focused operations",
  "Technology integration",
  "Financial structuring",
  "Human resource optimization",
  "Marketing acceleration",
  "Process automation",
  "Performance monitoring systems",
];

const whoWeAreProblems = [
  "Operational confusion",
  "Weak workflow systems",
  "Poor execution models",
  "Financial leakages",
  "Inefficient management structures",
  "Lack of accountability",
  "Disconnected teams",
  "Absence of scalable systems",
];

const philosophy = [
  { t: "Engineered", g: "from-[hsl(var(--perfy-electric))] to-[hsl(var(--perfy-cyan))]" },
  { t: "Structured", g: "from-[hsl(var(--perfy-cyan))] to-[hsl(190_90%_55%)]" },
  { t: "Controlled", g: "from-[hsl(280_80%_60%)] to-[hsl(var(--perfy-electric))]" },
  { t: "Measured", g: "from-[hsl(22_85%_60%)] to-[hsl(340_80%_60%)]" },
  { t: "Optimized Continuously", g: "from-[hsl(var(--perfy-electric))] to-[hsl(280_80%_60%)]" },
];

const philosophyFunctions = [
  "Business strategy", "Operations management", "Financial structuring", "HR development",
  "Compliance systems", "Branding & marketing", "Technology development",
  "Automation solutions", "Investment collaboration",
];

const whatWeDo = [
  {
    Icon: Search, step: "01", title: "Operational Diagnosis",
    desc: "We deeply study businesses through workflow analysis, financial assessments, management evaluations, team performance reviews, employee psychology, market positioning, sales studies and process efficiency audits.",
    items: ["Workflow analysis", "Financial assessments", "Management evaluation", "Team performance", "Market positioning", "Sales & marketing audit"],
    grad: "from-[hsl(var(--perfy-electric))] to-[hsl(var(--perfy-cyan))]",
  },
  {
    Icon: Settings2, step: "02", title: "System Structuring",
    desc: "We build the operating layer of the business — SOPs, workflows, reporting structures, accountability mechanisms, performance dashboards and automation that make operations repeatable.",
    items: ["SOP frameworks", "Workflow systems", "Reporting structures", "Accountability mechanisms", "Performance dashboards", "Automation systems"],
    grad: "from-[hsl(280_80%_60%)] to-[hsl(var(--perfy-electric))]",
  },
  {
    Icon: Rocket, step: "03", title: "Execution & Optimization",
    desc: "We actively implement restructuring, process optimization, workflow automation, financial leakage reduction, team alignment, performance tracking and growth acceleration.",
    items: ["Operational restructuring", "Process optimization", "Workflow automation", "Leakage reduction", "Team alignment", "Growth acceleration"],
    grad: "from-[hsl(22_85%_60%)] to-[hsl(340_80%_60%)]",
  },
];

const ecosystemRoles = [
  { Icon: Brain, t: "Strategy consultants" },
  { Icon: Workflow, t: "Operations specialists" },
  { Icon: LineChart, t: "Financial analysts" },
  { Icon: Users, t: "HR & compliance experts" },
  { Icon: Cpu, t: "Technology developers" },
  { Icon: Sparkles, t: "Branding professionals" },
  { Icon: Megaphone, t: "Marketing strategists" },
  { Icon: Zap, t: "Automation specialists" },
  { Icon: Building2, t: "Venture capital partners" },
  { Icon: Wallet, t: "Investment advisors" },
];

const approachItems = [
  "SOP implementation", "Process structuring", "Workflow automation", "Operational discipline",
  "Reporting systems", "Technology integration", "Performance monitoring", "Scalable management systems",
];

const whyPerfy = [
  { Icon: Search, t: "Analyze deeply" },
  { Icon: Layers, t: "Build systems" },
  { Icon: Workflow, t: "Implement workflows" },
  { Icon: Settings2, t: "Optimize operations" },
  { Icon: Activity, t: "Monitor performance" },
  { Icon: ShieldCheck, t: "Create accountability" },
  { Icon: TrendingUp, t: "Enable scalability" },
  { Icon: CheckCircle2, t: "Drive measurable outcomes" },
];

const todayBeliefs = [
  "Systems operate efficiently",
  "Teams work with clarity",
  "Strategy aligns with execution",
  "Processes are structured",
  "Performance is monitored",
  "Discipline drives operations",
];

const PerfyAbout = () => {
  useSeo({
    title: "About PERFY — Performance Empowerment Ecosystem",
    description: "PERFY is a performance-empowerment ecosystem transforming businesses through structured systems, disciplined execution and scalable operations.",
    canonical: typeof window !== "undefined" ? window.location.origin + "/about" : undefined,
  });

  return (
    <div className="theme-perfy-dark min-h-screen overflow-x-hidden">
      <PerfyNav />
      <main>
        {/* Hero (kept) */}
        <section className="relative min-h-[80vh] flex items-center pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 mesh-perfy" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0"><ParticleField density={50} /></div>
          <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center w-full">
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="text-xs tracking-[0.3em] text-[hsl(var(--perfy-cyan))]">ABOUT PERFY</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] font-display-perfy"
              >
                We engineer the<br />
                <span className="text-electric animate-gradient-shift bg-gradient-to-r from-[hsl(var(--perfy-electric))] via-[hsl(var(--perfy-cyan))] to-white bg-clip-text text-transparent">
                  future of business performance.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}
                className="mt-8 text-lg text-[hsl(var(--perfy-muted))] max-w-2xl mx-auto lg:mx-0"
              >
                A performance-empowerment ecosystem dedicated to building structured, scalable,
                and high-performing organisations.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute inset-0 -m-10 rounded-[3rem] bg-gradient-to-br from-[hsl(var(--perfy-electric))]/25 via-[hsl(var(--perfy-cyan))]/15 to-transparent blur-3xl" />
              <div className="relative animate-perfy-float">
                <img
                  src={aboutCharacter}
                  alt="PERFY storyteller reading our story"
                  width={1024}
                  height={1024}
                  className="relative w-full h-auto max-w-md mx-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About PERFY — Intro */}
        <Section
          eyebrow="ABOUT PERFY"
          title={<>Bridging the gap between <span className="text-electric">potential and performance.</span></>}
        >
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 text-base md:text-lg text-[hsl(var(--perfy-muted))] leading-relaxed">
              <p>
                PERFY is a performance-empowerment ecosystem built to transform businesses into structured,
                scalable, and high-performing organisations — operating at the intersection of strategy,
                operations, execution, technology and business intelligence.
              </p>
              <p>
                Unlike traditional consulting firms that stop at advice and presentations, PERFY actively
                enters businesses, restructures systems, optimises workflows, strengthens execution, and
                builds the operational discipline that drives measurable results.
              </p>
            </div>
            <RevealOnScroll delay={0.15}>
              <div className="relative rounded-3xl bg-card/90 backdrop-blur border border-foreground/10 p-6 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[hsl(var(--perfy-electric))]/20 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[hsl(var(--perfy-cyan))]/15 blur-3xl" />
                <div className="relative">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--perfy-electric))] font-bold">Our belief</span>
                  <p className="mt-3 text-xl md:text-2xl font-display-perfy text-foreground leading-snug">
                    Businesses don't fail because of a lack of <span className="text-electric">ideas</span> —
                    they fail because of a lack of <span className="text-electric">systems, structure</span>
                    {" "}and <span className="text-electric">execution clarity.</span>
                  </p>
                  <p className="mt-4 text-sm text-foreground/70">
                    Our mission is to bridge the gap between business potential and business performance.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Section>

        {/* Our Vision */}
        <Section
          eyebrow="OUR VISION"
          title={<>Building businesses that <span className="text-electric">scale with systems.</span></>}
          subtitle="A future where no entrepreneur fears building or scaling a business because of a lack of structure, systems or execution support."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visionPoints.map((v, i) => (
              <RevealOnScroll key={v.t} delay={i * 0.05}>
                <div className="group relative rounded-2xl bg-card/90 backdrop-blur border border-foreground/10 p-5 overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_hsl(var(--perfy-electric)/0.35)] transition-all duration-300">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[hsl(var(--perfy-electric))] to-[hsl(var(--perfy-cyan))]" />
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--perfy-electric))] to-[hsl(var(--perfy-cyan))] flex items-center justify-center shadow-md">
                      <v.Icon className="w-5 h-5 text-white" strokeWidth={2.4} />
                    </div>
                    <p className="text-sm text-foreground/85 leading-snug pt-1.5">{v.t}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Section>

        {/* Our Mission */}
        <Section
          eyebrow="OUR MISSION"
          title={<>Transforming <span className="text-electric">potential</span> into performance.</>}
          subtitle="Helping businesses operate with clarity, discipline and scalable systems by combining eight integrated capabilities."
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {missionPillars.map((m, i) => (
              <RevealOnScroll key={m} delay={i * 0.04}>
                <div className="rounded-2xl glass-perfy p-4 h-full flex items-start gap-3">
                  <span className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(var(--perfy-electric))] to-[hsl(var(--perfy-cyan))] text-black font-bold flex items-center justify-center text-xs font-display-perfy">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white text-sm leading-snug pt-1.5">{m}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Section>

        {/* Who We Are */}
        <Section
          eyebrow="WHO WE ARE"
          title={<>An <span className="text-electric">embedded</span> transformation partner.</>}
        >
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <p className="text-base md:text-lg text-[hsl(var(--perfy-muted))] leading-relaxed">
              Many businesses possess excellent products, strong ideas and ambitious founders, yet fail to
              grow because they lack the operational ecosystem required for sustainable success. PERFY was
              built to solve this — not as advisors but as active execution specialists who restructure,
              optimise and scale operations from the inside.
            </p>
            <RevealOnScroll delay={0.15}>
              <div className="rounded-3xl bg-card/90 backdrop-blur border border-foreground/10 p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--perfy-electric))] font-bold mb-4">
                  The friction we remove
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {whoWeAreProblems.map((p) => (
                    <div key={p} className="flex items-center gap-2 text-sm text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--perfy-electric))]" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Section>

        {/* Core Philosophy */}
        <Section
          eyebrow="OUR CORE PHILOSOPHY"
          title={<>Strategy without execution <span className="text-electric">has no value.</span></>}
          subtitle="Growth must be engineered, structured, controlled, measured — and continuously optimised."
        >
          <div className="flex flex-wrap gap-3 mb-8">
            {philosophy.map((p) => (
              <span key={p.t} className={`px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${p.g} shadow-md`}>
                {p.t}
              </span>
            ))}
          </div>
          <div className="rounded-3xl bg-card/90 backdrop-blur border border-foreground/10 p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--perfy-cyan))] font-bold mb-4">
              One integrated ecosystem
            </p>
            <div className="flex flex-wrap gap-2">
              {philosophyFunctions.map((f) => (
                <span key={f} className="px-3 py-1.5 rounded-lg text-xs text-foreground/80 bg-foreground/5 border border-foreground/10">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* What We Do — 3 phases */}
        <Section
          eyebrow="WHAT WE DO"
          title={<>Business performance <span className="text-electric">transformation.</span></>}
          subtitle="A structured implementation system delivered in three connected phases."
        >
          <div className="grid lg:grid-cols-3 gap-5">
            {whatWeDo.map((s, i) => (
              <RevealOnScroll key={s.title} delay={i * 0.1}>
                <div className="group relative h-full rounded-2xl bg-card/90 backdrop-blur border border-foreground/10 p-6 overflow-hidden hover:-translate-y-1 transition-all duration-300">
                  <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${s.grad}`} />
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center shadow-md`}>
                      <s.Icon className="w-6 h-6 text-white" strokeWidth={2.3} />
                    </div>
                    <span className={`text-xs uppercase tracking-[0.25em] font-bold bg-gradient-to-r ${s.grad} bg-clip-text text-transparent`}>
                      Phase {s.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-display-perfy">{s.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.desc}</p>
                  <ul className="mt-4 space-y-1.5">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-xs text-foreground/75">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(var(--perfy-electric))]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Section>

        {/* Our Ecosystem */}
        <section id="ecosystem" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 mesh-perfy opacity-50" />
          <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll>
              <div>
                <span className="text-xs tracking-[0.3em] text-[hsl(var(--perfy-cyan))]">OUR ECOSYSTEM</span>
                <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white font-display-perfy">
                  A collaborative network of <span className="text-electric">experts.</span>
                </h2>
                <p className="mt-6 text-[hsl(var(--perfy-muted))]">
                  PERFY operates as a multidisciplinary ecosystem supporting businesses from every critical
                  angle — united by one objective: building businesses that scale through systems rather
                  than dependency.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {ecosystemRoles.map((r) => (
                    <div key={r.t} className="flex items-center gap-2.5 text-sm text-foreground/85">
                      <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[hsl(var(--perfy-electric))] to-[hsl(var(--perfy-cyan))] flex items-center justify-center shrink-0">
                        <r.Icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                      </div>
                      {r.t}
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}><EcosystemNetwork /></RevealOnScroll>
          </div>
        </section>

        {/* Our Approach */}
        <Section
          eyebrow="OUR APPROACH"
          title={<>Building businesses that can <span className="text-electric">run on systems.</span></>}
          subtitle="Most businesses become unstable because processes are undocumented and operations depend on individuals. We replace fragility with structure."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {approachItems.map((a, i) => (
              <RevealOnScroll key={a} delay={i * 0.04}>
                <div className="rounded-xl bg-card/90 backdrop-blur border border-foreground/10 p-4 flex items-center gap-3 hover:border-[hsl(var(--perfy-electric))]/50 transition-colors">
                  <GitBranch className="w-4 h-4 text-[hsl(var(--perfy-cyan))] shrink-0" />
                  <span className="text-sm text-foreground/85">{a}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Section>

        {/* Investment & Growth Model */}
        <Section
          eyebrow="INVESTMENT & GROWTH MODEL"
          title={<>Structured growth through <span className="text-electric">strategic support.</span></>}
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 text-base md:text-lg text-[hsl(var(--perfy-muted))] leading-relaxed">
              <p>
                PERFY supports businesses through strategic investment collaboration models — enabling
                transformation, structured execution, investor collaboration and scalable funding while
                keeping founders in operational control.
              </p>
              <ul className="space-y-2 text-sm text-foreground/85">
                {[
                  "Business transformation support",
                  "Structured execution management",
                  "Investor collaboration systems",
                  "Scalable funding structures",
                  "Founder-focused operational control",
                ].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--perfy-electric))]" /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <RevealOnScroll delay={0.15}>
              <div className="relative rounded-3xl bg-gradient-to-br from-[hsl(var(--perfy-electric))]/15 via-[hsl(280_80%_60%)]/10 to-[hsl(var(--perfy-cyan))]/15 border border-foreground/10 p-7 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[hsl(var(--perfy-electric))]/25 blur-3xl animate-pulse-glow" />
                <Wallet className="w-8 h-8 text-[hsl(var(--perfy-electric))]" />
                <p className="mt-4 text-2xl md:text-3xl font-display-perfy font-bold text-foreground leading-snug">
                  "Capital should support <span className="text-electric">vision</span> — not control it."
                </p>
                <p className="mt-3 text-sm text-foreground/70">
                  Entrepreneurs scale confidently while maintaining ownership and operational direction.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </Section>

        {/* Why PERFY */}
        <Section
          eyebrow="WHY PERFY"
          title={<>Performance. Structure. <span className="text-electric">Execution.</span></>}
          subtitle="We don't simply advise. We build the operating system that makes performance compound."
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {whyPerfy.map((w, i) => (
              <RevealOnScroll key={w.t} delay={i * 0.04}>
                <div className="rounded-2xl bg-card/90 backdrop-blur border border-foreground/10 p-4 text-center hover:-translate-y-1 transition-transform">
                  <div className="mx-auto w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--perfy-electric))] to-[hsl(var(--perfy-cyan))] flex items-center justify-center shadow-md">
                    <w.Icon className="w-5 h-5 text-white" strokeWidth={2.4} />
                  </div>
                  <p className="mt-3 text-sm text-foreground/85 font-medium">{w.t}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Section>

        {/* Future of PERFY */}
        <Section
          eyebrow="THE FUTURE OF PERFY"
          title={<>Creating a global business <span className="text-electric">transformation ecosystem.</span></>}
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { Icon: Compass, t: "Strategic transformation" },
                { Icon: Rocket, t: "Execution excellence" },
                { Icon: Cpu, t: "Technology-driven operations" },
                { Icon: Layers, t: "Scalable management systems" },
                { Icon: Wallet, t: "Investment-backed growth" },
                { Icon: Activity, t: "Performance-focused ecosystems" },
              ].map((f, i) => (
                <RevealOnScroll key={f.t} delay={i * 0.04}>
                  <div className="rounded-2xl glass-perfy p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(var(--perfy-electric))] to-[hsl(var(--perfy-cyan))] flex items-center justify-center">
                      <f.Icon className="w-4 h-4 text-white" strokeWidth={2.4} />
                    </div>
                    <span className="text-white text-sm">{f.t}</span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
            <RevealOnScroll delay={0.15}>
              <div className="relative rounded-3xl bg-card/90 backdrop-blur border border-foreground/10 p-6 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[hsl(var(--perfy-electric))]/25 blur-3xl animate-pulse-glow" />
                <span className="relative text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--perfy-electric))] font-bold flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[hsl(var(--perfy-electric))] animate-pulse" />
                  North Star
                </span>
                <p className="relative mt-3 text-xl md:text-2xl font-display-perfy text-foreground leading-snug">
                  Businesses grow through <span className="text-electric">systems, discipline, execution</span>
                  {" "}and sustainable operational excellence.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </Section>

        {/* PERFY Today */}
        <Section
          eyebrow="PERFY TODAY"
          title={<>More than a company — a <span className="text-electric">performance movement.</span></>}
          subtitle="Businesses don't grow by chance. They grow when these six conditions are true."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {todayBeliefs.map((b, i) => (
              <RevealOnScroll key={b} delay={i * 0.05}>
                <div className="group relative rounded-2xl bg-card/90 backdrop-blur border border-foreground/10 p-5 overflow-hidden hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[hsl(var(--perfy-electric))] via-[hsl(var(--perfy-cyan))] to-[hsl(280_80%_60%)]" />
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-display-perfy font-bold bg-gradient-to-r from-[hsl(var(--perfy-electric))] to-[hsl(var(--perfy-cyan))] bg-clip-text text-transparent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-foreground/85 leading-snug">{b}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Section>

        {/* Foundational Leadership */}
        <PartnersSection />

        <FinalCTAPerfy />
      </main>
      <PerfyFooter />
    </div>
  );
};

export default PerfyAbout;
