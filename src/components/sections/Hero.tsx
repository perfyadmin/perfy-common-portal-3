import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Heart, Target, Lightbulb } from "lucide-react";
import cariHero from "@/assets/cari-hero.png";

export const Hero = ({ onCta }: { onCta: () => void }) => {
  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      {/* Floating warm blobs */}
      <div className="absolute top-24 -left-20 w-96 h-96 bg-primary/25 blur-3xl animate-blob" />
      <div className="absolute top-40 right-0 w-80 h-80 bg-secondary/30 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent/20 blur-3xl animate-blob" style={{ animationDelay: "8s" }} />

      {/* Decorative dotted swirl */}
      <svg className="absolute top-32 left-10 w-32 h-32 text-primary/30 animate-spin-slow" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-primary/20 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" /> Research-driven Personality & Intelligence
          </div>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
            Stop Making{" "}
            <span className="relative inline-block">
              <span className="text-gradient-maroon">Wrong Decisions</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M2 7 Q 50 -2 100 5 T 198 6" stroke="hsl(var(--secondary))" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            About People.
          </h1>
          <p className="mt-6 text-lg text-foreground/75 max-w-xl">
            Understand individuals deeply through structured assessments and 25+ page interpretation reports.
            <span className="font-semibold text-primary"> Data → Meaning → Insight → Action.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="hero" size="xl" onClick={onCta}>
              Take Your Assessment <ArrowRight className="size-4" />
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#reports">Explore Your Profile</a>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-foreground/65">
            <div><strong className="text-foreground text-2xl font-display">25+</strong><div>Page Reports</div></div>
            <div className="w-px h-10 bg-border" />
            <div><strong className="text-foreground text-2xl font-display">10</strong><div>Sections</div></div>
            <div className="w-px h-10 bg-border" />
            <div><strong className="text-foreground text-2xl font-display">4</strong><div>Quotients</div></div>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
          {/* Soft maroon glow plate */}
          <div className="absolute inset-0 -m-8 bg-gradient-sand rounded-[3rem] blur-2xl opacity-70" />
          <div className="relative">
            <img
              src={cariHero}
              alt="Caricature of analyst examining a personality report"
              className="relative w-full h-auto drop-shadow-[0_20px_40px_hsl(350_70%_28%_/_0.25)] animate-float-slow"
              width={1280}
              height={1024}
            />
          </div>
          {/* Floating quotient badges */}
          {[
            { Icon: Brain, label: "IQ", className: "-top-2 -left-2 bg-gradient-maroon text-primary-foreground", delay: "0s" },
            { Icon: Heart, label: "EQ", className: "top-10 -right-4 bg-secondary text-secondary-foreground", delay: "0.6s" },
            { Icon: Target, label: "AQ", className: "bottom-12 -left-6 bg-accent text-accent-foreground", delay: "1.2s" },
            { Icon: Lightbulb, label: "CQ", className: "-bottom-4 right-6 bg-gradient-violet text-primary-foreground", delay: "1.8s" },
          ].map(({ Icon, label, className, delay }) => (
            <div key={label} className={`absolute ${className} rounded-2xl px-3 py-2 shadow-soft flex items-center gap-2 animate-bounce-soft`} style={{ animationDelay: delay }}>
              <Icon className="size-4" />
              <span className="font-display font-bold text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
