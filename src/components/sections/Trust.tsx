import { GraduationCap, Briefcase, TrendingUp, FileText } from "lucide-react";

const items = [
  { icon: GraduationCap, title: "For Students", text: "Career clarity and learning style guidance", color: "bg-gradient-maroon text-primary-foreground" },
  { icon: Briefcase, title: "For Hiring", text: "Right-fit decisions backed by structured analysis", color: "bg-secondary text-secondary-foreground" },
  { icon: TrendingUp, title: "For Performance", text: "Drive growth with multi-dimensional insight", color: "bg-accent text-accent-foreground" },
  { icon: FileText, title: "25+ Page Reports", text: "Deep, structured, actionable interpretation", color: "bg-gradient-violet text-primary-foreground" },
];

const tickers = [
  "Personality", "Intelligence", "Behavior", "Career", "DISC", "MBTI", "RIASEC", "IQ • EQ • AQ • CQ",
  "Multiple Intelligences", "Learning Style", "SWOT", "Action Plan",
];

export const Trust = () => (
  <section className="relative py-20 bg-background overflow-hidden">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary">Trusted Across Use Cases</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">Multi-dimensional analysis. <span className="text-gradient-maroon">One source of clarity.</span></h2>
        <p className="mt-4 text-foreground/70">Personality • Intelligence • Behavior • Career — all interpreted in a single, research-driven report.</p>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map(({ icon: Icon, title, text, color }, i) => (
          <div key={title} className="glass rounded-2xl p-6 hover:-translate-y-1.5 hover:rotate-[-1deg] transition-all duration-500 animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className={`size-12 rounded-2xl ${color} flex items-center justify-center shadow-soft`}>
              <Icon className="size-5" />
            </div>
            <h3 className="mt-4 font-display font-semibold text-lg">{title}</h3>
            <p className="mt-1 text-sm text-foreground/65">{text}</p>
          </div>
        ))}
      </div>
    </div>
    {/* Ticker */}
    <div className="mt-16 ticker-mask overflow-hidden py-4 border-y border-border bg-gradient-sand/40">
      <div className="flex gap-10 animate-marquee whitespace-nowrap font-display font-semibold text-2xl text-primary/70">
        {[...tickers, ...tickers].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t}
            <span className="size-2 rounded-full bg-secondary" />
          </span>
        ))}
      </div>
    </div>
  </section>
);
