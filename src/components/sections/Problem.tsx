import { AlertTriangle, UserX, Compass } from "lucide-react";
import cari from "@/assets/cari-crossroads.png";

const pains = [
  { icon: Compass, title: "Wrong Career Choices", text: "Years lost chasing paths that don't match who someone really is." },
  { icon: UserX, title: "Poor Hiring Decisions", text: "Interviews show personas. Real personality stays hidden until it's too late." },
  { icon: AlertTriangle, title: "Shallow Understanding", text: "Surface-level scores can't reveal motivation, behavior, or potential." },
];

export const Problem = () => (
  <section className="relative py-24 bg-gradient-to-b from-background to-sand/60 overflow-hidden">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-5 relative">
        <div className="absolute inset-0 -m-6 bg-secondary/15 blur-3xl rounded-[3rem]" />
        <img src={cari} alt="Person at career crossroads" className="relative w-full max-w-md mx-auto animate-tilt drop-shadow-[0_20px_40px_hsl(350_70%_28%_/_0.2)]" loading="lazy" width={1024} height={1024} />
      </div>
      <div className="lg:col-span-7">
        <p className="text-sm font-semibold tracking-widest uppercase text-accent">The Cost of Guessing</p>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold leading-tight">
          Decisions about people are <span className="text-gradient-maroon">expensive when wrong</span>.
        </h2>
        <p className="mt-5 text-foreground/70 text-lg">
          Without structured insight, organizations and individuals trust gut feel — and pay the price in misalignment, churn, and lost potential.
        </p>
        <div className="mt-8 grid gap-4">
          {pains.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="glass rounded-2xl p-5 flex gap-4 hover:translate-x-1 transition-transform animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="size-12 shrink-0 rounded-xl bg-gradient-maroon flex items-center justify-center text-primary-foreground">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg">{title}</h3>
                <p className="text-sm text-foreground/70 mt-1">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
