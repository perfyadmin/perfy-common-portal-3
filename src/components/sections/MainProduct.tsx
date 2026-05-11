import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, Sparkles } from "lucide-react";

export const MainProduct = ({ onCta }: { onCta: () => void }) => (
  <section id="product" className="relative py-28 overflow-hidden">
    <div className="absolute inset-0 mesh-bg opacity-70" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-3xl rounded-full" />
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
      <div className="relative rounded-[2.5rem] p-[2px] bg-gradient-violet animate-pulse-glow">
        <div className="rounded-[2.4rem] bg-white/85 backdrop-blur-2xl p-10 md:p-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" /> Active Product
          </div>
          <div className="mt-5 mx-auto size-16 rounded-2xl bg-gradient-violet flex items-center justify-center text-primary-foreground shadow-glow">
            <Brain className="size-8" />
          </div>
          <h2 className="mt-6 font-display text-3xl sm:text-5xl font-extrabold">
            Personality & Intelligence <span className="text-gradient-violet">Assessment Portal</span>
          </h2>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Structured personality and intelligence insights through deep interpretation reports — the heart of the Perfy ecosystem.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="hero" size="xl" onClick={onCta}>
              Take Your Assessment <ArrowRight className="size-4" />
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#reports">See Sample Output</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
