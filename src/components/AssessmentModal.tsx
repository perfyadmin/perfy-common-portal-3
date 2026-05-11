import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Brain, ArrowRight, Lock } from "lucide-react";
import { useConfig } from "@/hooks/useConfig";
import cariBrain from "@/assets/cari-brain.png";

export const AssessmentModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const { cfg } = useConfig();
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState<string | null>(null);

  const enabledModules = cfg.modules.filter((m) => m.enabled && m.redirect);

  const launch = (url: string) => {
    setTarget(url);
    setLoading(true);
    setTimeout(() => { window.location.href = url; }, 1300);
  };

  const close = (v: boolean) => {
    if (loading) return;
    onOpenChange(v);
    if (!v) setTimeout(() => setTarget(null), 200);
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-2xl overflow-hidden border-0 p-0">
        <div className="relative bg-gradient-sand p-6 sm:p-8">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-secondary/30 blur-3xl" />
          {loading ? (
            <div className="relative py-14 flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute inset-0 -m-6 rounded-full bg-primary/30 blur-2xl animate-pulse-glow" />
                <Loader2 className="relative size-12 text-primary animate-spin" />
              </div>
              <h3 className="mt-6 text-lg font-display font-semibold">Preparing your environment…</h3>
              <p className="mt-2 text-sm text-muted-foreground">Calibrating the interpretation engine for you.</p>
            </div>
          ) : (
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="size-3.5" /> Explore our Products
              </div>
              <DialogHeader className="mt-3">
                <DialogTitle className="text-2xl font-display">Choose a Product to Begin</DialogTitle>
                <DialogDescription className="text-foreground/70">
                  Pick the experience that fits you. Each one delivers a structured, deep interpretation report.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-5 grid sm:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto pr-1">
                {/* Featured: Personality & Intelligence */}
                <button
                  onClick={() => launch(cfg.mainProductRedirect)}
                  className="group relative text-left rounded-2xl p-[2px] bg-gradient-maroon sm:col-span-2 hover:-translate-y-0.5 transition-transform"
                >
                  <div className="relative rounded-[14px] bg-card p-5 flex gap-4 items-center overflow-hidden">
                    <img src={cariBrain} alt="" className="size-20 object-contain shrink-0 animate-float" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-secondary">Featured · Active</span>
                      <h3 className="mt-1 font-display text-lg font-bold leading-tight">
                        Personality & Intelligence Assessment Portal
                      </h3>
                      <p className="text-xs text-foreground/65 mt-1">Structured assessment + 25+ page deep interpretation report.</p>
                    </div>
                    <ArrowRight className="size-5 text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>

                {enabledModules.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => launch(m.redirect)}
                    className="group text-left rounded-2xl border bg-white/70 backdrop-blur p-4 hover:border-primary/50 hover:-translate-y-0.5 transition-all"
                  >
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-primary">{m.category}</span>
                    <h4 className="mt-1 font-display font-semibold text-sm">{m.name}</h4>
                    <p className="mt-1 text-xs text-foreground/60 line-clamp-2">{m.description}</p>
                    <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Open <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                ))}

                {enabledModules.length === 0 && (
                  <div className="sm:col-span-2 rounded-2xl border border-dashed p-4 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                    <Lock className="size-3.5" /> More products in the Perfy ecosystem are launching soon.
                  </div>
                )}
              </div>

              <div className="mt-5 flex gap-3">
                <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">Not now</Button>
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground italic">Reports shown are sample outputs. Actual insights are customized to you.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
