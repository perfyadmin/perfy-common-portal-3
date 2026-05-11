import { ClipboardList, Layers, FileSearch, Target } from "lucide-react";
import cari from "@/assets/cari-climb.png";

const steps = [
  { icon: ClipboardList, title: "Structured Assessment", text: "A research-backed instrument across personality, intelligence, behavior, and career." },
  { icon: Layers, title: "Multi-Dimensional Analysis", text: "DISC, MBTI, RIASEC, IQ/EQ/AQ/CQ, learning style, and Multiple Intelligences." },
  { icon: FileSearch, title: "Deep Interpretation Report", text: "A 25+ page interpretation that turns scores into clarity." },
  { icon: Target, title: "Actionable Insights", text: "Personalized roadmaps you can act on this week and this decade." },
];

export const Solution = () => (
  <section className="relative py-28 overflow-hidden bg-gradient-night text-night-foreground">
    <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(hsl(36_50%_95%)_1px,transparent_1px)] [background-size:18px_18px]" />
    <div className="absolute -top-20 -left-20 w-96 h-96 bg-secondary/30 blur-3xl rounded-full" />
    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/40 blur-3xl rounded-full" />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <p className="text-sm font-semibold tracking-widest uppercase text-[hsl(22_85%_70%)]">The Perfy Method</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold !text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">From Data to Action — in four structured steps.</h2>
          <p className="mt-4 text-[hsl(36_60%_92%)]/90 text-lg">Data → Meaning → Insight → Action.</p>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="glass-dark rounded-2xl p-5 relative animate-fade-up hover:-translate-y-1 transition-transform" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="text-xs font-mono text-secondary">0{i + 1}</div>
                <div className="mt-2 size-11 rounded-xl bg-gradient-maroon flex items-center justify-center shadow-glow">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-3 font-display font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm text-night-foreground/70">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 -m-6 bg-secondary/20 blur-3xl rounded-full" />
          <img src={cari} alt="Climbing the mountain of insight" className="relative w-full max-w-md mx-auto animate-float-slow" loading="lazy" width={1024} height={1024} />
        </div>
      </div>
    </div>
  </section>
);
