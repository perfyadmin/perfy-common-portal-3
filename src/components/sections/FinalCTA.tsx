import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { openSalesDialog } from "@/components/SalesDialogController";

export const FinalCTA = ({ onCta }: { onCta: () => void }) => (
  <section id="contact" className="relative py-24 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-sand" />
    <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/30 blur-3xl animate-blob" />
    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/30 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

    <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
      <div className="rounded-[2.5rem] bg-card/80 backdrop-blur-xl border border-white/60 shadow-soft p-10 md:p-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" /> Begin Your Journey
        </div>
        <h2 className="mt-5 font-display text-3xl sm:text-5xl font-extrabold">
          Make Better Decisions <span className="text-gradient-maroon">With Real Insight.</span>
        </h2>
        <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
          Step into clarity. One assessment. One report. A lifetime of better decisions.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="hero" size="xl" onClick={onCta}>Get Started <ArrowRight className="size-4" /></Button>
          <Button variant="outline" size="xl" onClick={() => openSalesDialog()}>
            Contact
          </Button>
        </div>
      </div>
    </div>
  </section>
);
