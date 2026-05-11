import { useMemo, useState } from "react";
import { useConfig } from "@/hooks/useConfig";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import type { ModuleCategory, ModuleItem } from "@/lib/store";
import { Lock, ArrowUpRight, Sparkles, Brain, Workflow, ListTodo, Target, FileBarChart, TrendingUp, Network, Shield, Bell, Boxes, Truck, Users, Heart, FileText, AlertOctagon, HardHat, MapPin, Compass, Recycle, Wallet, GraduationCap, UserCheck } from "lucide-react";
import cariBrain from "@/assets/cari-brain.png";
import cariModules from "@/assets/cari-modules.png";
import { openSalesDialog } from "@/components/SalesDialogController";

const categories: ModuleCategory[] = ["Performance", "Organization", "Operations", "Compliance", "Strategy", "Learning"];

// Per-module unique icons
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  workflow: Workflow, tasks: ListTodo, kpi: Target, "perf-reports": FileBarChart, pip: TrendingUp,
  "org-structure": Network, rbac: Shield, notifications: Bell,
  inventory: Boxes, vendor: Truck, client: Users, crm: Heart,
  policy: FileText, risk: AlertOctagon, safety: HardHat, geo: MapPin,
  strategy: Compass, waste: Recycle, finance: Wallet,
  lms: GraduationCap, edp: UserCheck,
};

// Caricature sprite: cari-modules.png is a 6-character horizontal strip,
// one distinct caricature per category — matching the Perfy ecosystem personalities.
const CARI_SLICES: Record<ModuleCategory, number> = {
  Performance: 0,   // target & arrow
  Organization: 1,  // network architect
  Operations: 2,    // clipboard & gears
  Compliance: 3,    // shield & checkmark
  Strategy: 4,      // chess thinker
  Learning: 5,      // book & lightbulb
};
const SLICE_COUNT = 6;
const sliceStyle = (idx: number): React.CSSProperties => ({
  backgroundImage: `url(${cariModules})`,
  backgroundSize: `${SLICE_COUNT * 100}% 100%`,
  backgroundPosition: `${(idx / (SLICE_COUNT - 1)) * 100}% center`,
  backgroundRepeat: "no-repeat",
});

export const OtherServices = ({ onAssessment }: { onAssessment: () => void }) => {
  const { cfg } = useConfig();
  const [tab, setTab] = useState<"All" | ModuleCategory>("All");
  const [active, setActive] = useState<ModuleItem | null>(null);

  const list = useMemo(
    () => (tab === "All" ? cfg.modules : cfg.modules.filter((m) => m.category === tab)),
    [cfg.modules, tab]
  );

  if (!cfg.otherServicesEnabled) return null;

  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-background via-sand/30 to-background overflow-hidden">
      <div className="absolute -top-20 right-0 w-96 h-96 bg-secondary/20 blur-3xl animate-blob" />
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-primary/15 blur-3xl animate-blob" style={{ animationDelay: "5s" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-secondary">The Perfy Ecosystem</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold">One Active Product. <span className="text-gradient-maroon">An Entire Ecosystem.</span></h2>
          <p className="mt-4 text-foreground/70">Start with individual intelligence. Scale into organizational intelligence.</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setTab(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                tab === c ? "bg-gradient-maroon text-primary-foreground shadow-soft" : "glass hover:bg-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div id="product" className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* FEATURED MAIN PRODUCT CARD */}
          {(tab === "All") && (
            <button
              onClick={onAssessment}
              className="group relative text-left rounded-3xl overflow-hidden p-[2px] bg-gradient-maroon animate-pulse-glow sm:col-span-2 lg:col-span-2 hover:-translate-y-1 transition-transform"
            >
              <div className="relative h-full rounded-[1.4rem] bg-card p-7 overflow-hidden flex gap-6 items-center">
                <div className="relative shrink-0 hidden sm:block">
                  <div className="absolute inset-0 bg-secondary/30 rounded-full blur-2xl" />
                  <img src={cariBrain} alt="" className="relative w-40 h-40 object-contain animate-float" />
                </div>
                <div className="flex-1 min-w-0">
                  <Badge className="bg-secondary text-secondary-foreground">Active Product · Featured</Badge>
                  <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold leading-tight">
                    Personality & Intelligence <br className="hidden sm:block" />
                    <span className="text-gradient-maroon">Assessment Portal</span>
                  </h3>
                  <p className="mt-2 text-sm text-foreground/70 max-w-md">
                    Structured personality and intelligence insights through deep interpretation reports — the heart of Perfy.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-primary font-semibold text-sm">
                    Take Your Assessment
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
                <Brain className="absolute -right-6 -bottom-6 size-32 text-primary/8" />
              </div>
            </button>
          )}

          {list.map((m) => {
            const enabled = m.enabled;
            const Icon = ICONS[m.id] ?? Sparkles;
            const sliceIdx = CARI_SLICES[m.category] ?? 0;
            const card = (
              <button
                key={m.id}
                onClick={() => setActive(m)}
                title={enabled ? "Open service" : "Launching Soon"}
                className={`group text-left relative glass rounded-2xl p-6 overflow-hidden transition-all hover:-translate-y-1 w-full min-h-[230px] ${
                  enabled ? "hover:shadow-glow ring-1 ring-secondary/30" : ""
                }`}
              >
                <div className={`transition-all ${enabled ? "" : "opacity-90"}`}>
                  <div className="flex items-center justify-between">
                    <div className={`size-11 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 ${
                      enabled ? "bg-gradient-maroon text-primary-foreground shadow-soft" : "bg-muted text-muted-foreground"
                    }`}>
                      {enabled ? <Icon className="size-5" /> : <Lock className="size-4" />}
                    </div>
                    {enabled
                      ? <Badge className="bg-secondary text-secondary-foreground animate-pulse-glow">Active</Badge>
                      : <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30">Coming Soon</Badge>}
                  </div>
                  <h3 className="mt-4 font-display font-semibold text-lg pr-20">{m.name}</h3>
                  <p className="mt-1 text-sm text-foreground/65 pr-16 line-clamp-2">{m.description}</p>
                  {enabled && m.showPrice && m.price > 0 && (
                    <div className="mt-3 text-sm font-semibold text-primary">₹{m.price.toLocaleString("en-IN")}</div>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">Part of Perfy Ecosystem</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.category}</div>
                  </div>
                </div>
                {/* Caricature: only shown when active to signal "this product has come alive" */}
                {enabled && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-2 right-2 w-24 h-24 opacity-100 animate-bounce-soft drop-shadow-[0_8px_16px_hsl(350_70%_28%_/_0.35)] group-hover:scale-110 transition-transform duration-500"
                    style={sliceStyle(sliceIdx)}
                  />
                )}
                {!enabled && (
                  <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1 opacity-70">
                    <Lock className="size-4 text-muted-foreground" />
                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Locked</span>
                  </div>
                )}
                <ArrowUpRight className="absolute top-5 right-5 size-4 opacity-0 group-hover:opacity-100 transition" />
              </button>
            );

            if (!enabled) return <div key={m.id}>{card}</div>;

            return (
              <HoverCard key={m.id} openDelay={120} closeDelay={80}>
                <HoverCardTrigger asChild>{card}</HoverCardTrigger>
                <HoverCardContent side="top" align="center" className="w-72 p-0 overflow-hidden border-0 shadow-glow rounded-2xl">
                  <div className="relative bg-gradient-sand p-4 flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 bg-secondary/30 rounded-full blur-lg" />
                      <div
                        className="relative w-20 h-20 animate-bounce-soft"
                        style={sliceStyle(sliceIdx)}
                        aria-hidden
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-semibold tracking-widest uppercase text-secondary">Now Active</div>
                      <div className="font-display font-bold text-sm leading-tight">{m.name}</div>
                      <div className="text-[11px] text-foreground/65 mt-1 line-clamp-2">{m.description}</div>
                    </div>
                  </div>
                  <div className="bg-card p-3 flex gap-2 border-t">
                    <Button size="sm" variant="hero" className="flex-1" asChild>
                      <a href={m.redirect || "#contact"} target={m.redirect ? "_blank" : undefined} rel="noopener noreferrer">
                        Open <ArrowUpRight className="size-3.5" />
                      </a>
                    </Button>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className="sm:max-w-md">
          {active && (
            <>
              <DialogHeader>
                <Badge className={`w-fit ${active.enabled ? "bg-secondary text-secondary-foreground" : ""}`} variant={active.enabled ? "default" : "outline"}>
                  {active.enabled ? "Access Service" : "Coming Soon"}
                </Badge>
                <DialogTitle className="font-display text-2xl mt-2">{active.name}</DialogTitle>
                <DialogDescription>
                  {active.enabled
                    ? active.description
                    : "This module is part of the Perfy ecosystem and will be available soon."}
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-3 mt-2">
                <Button variant="outline" className="flex-1" onClick={() => openSalesDialog({ selectedModules: active ? [active.name] : [] })}>Contact Us</Button>
                {active.enabled && active.redirect && (
                  <Button variant="hero" className="flex-1" asChild>
                    <a href={active.redirect} target="_blank" rel="noopener noreferrer">Proceed</a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
