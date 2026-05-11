import { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useConfig } from "@/hooks/useConfig";
import { Sparkles, MessageCircle, ArrowRight, CheckCircle2, Brain } from "lucide-react";
import { TalkToSalesDialog } from "@/components/TalkToSalesDialog";

export const Pricing = () => {
  const { cfg } = useConfig();

  // The Personality & Intelligence Assessment is always selectable as the core product.
  const CORE_ID = "__core_personality__";
  type Item = { id: string; name: string; description: string; category: string; locked?: boolean };

  const items: Item[] = useMemo(() => {
    const core: Item = {
      id: CORE_ID,
      name: "Personality & Intelligence Assessment",
      description: "The core deep interpretation report — 25+ pages.",
      category: "Featured",
    };
    const enabledModules: Item[] = cfg.modules
      .filter((m) => m.enabled)
      .map((m) => ({ id: m.id, name: m.name, description: m.description, category: m.category }));
    const lockedModules: Item[] = cfg.modules
      .filter((m) => !m.enabled)
      .map((m) => ({ id: m.id, name: m.name, description: m.description, category: m.category, locked: true }));
    return [core, ...enabledModules, ...lockedModules];
  }, [cfg.modules]);

  const [selected, setSelected] = useState<string[]>([CORE_ID]);
  const [scope, setScope] = useState<"individual" | "institution">("individual");
  const [salesOpen, setSalesOpen] = useState(false);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const selectedItems = items.filter((i) => selected.includes(i.id));

  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-b from-sand/30 via-background to-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary inline-flex items-center gap-2">
            <Sparkles className="size-3.5" /> Customize Your Assessment Plan
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold">
            Build the plan that <span className="text-gradient-violet">fits you</span>.
          </h2>
          <p className="mt-4 text-foreground/65">
            Pick the modules that matter to you. Our sales team will tailor the right plan and onboarding for your goals.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 glass rounded-3xl p-8">
            <h3 className="font-display font-semibold text-lg">Which modules do you want?</h3>
            <p className="text-sm text-muted-foreground mt-1">Select any combination — locked ones are also available on request.</p>

            <div className="mt-5 grid sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
              {items.map((it) => {
                const on = selected.includes(it.id);
                const isCore = it.id === CORE_ID;
                return (
                  <label
                    key={it.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      on ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/40"
                    } ${isCore ? "sm:col-span-2 bg-gradient-sand" : ""}`}
                  >
                    <Checkbox checked={on} onCheckedChange={() => toggle(it.id)} className="mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {isCore && <Brain className="size-4 text-primary" />}
                        <span className="font-semibold text-sm">{it.name}</span>
                        {isCore && <Badge className="bg-secondary text-secondary-foreground text-[10px]">Core</Badge>}
                        {it.locked && <Badge variant="outline" className="text-[10px] text-muted-foreground">On Request</Badge>}
                      </div>
                      <p className="text-xs text-foreground/60 mt-1 line-clamp-2">{it.description}</p>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{it.category}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2 rounded-3xl bg-gradient-night text-night-foreground p-8 shadow-glow flex flex-col">
            <div className="inline-flex items-center bg-white/10 rounded-full p-1 text-xs self-start">
              {(["individual", "institution"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setScope(s)}
                  className={`px-4 py-1.5 rounded-full transition ${scope === s ? "bg-white text-night" : "text-white/70"}`}
                >
                  {s === "individual" ? "Individual" : "Institution"}
                </button>
              ))}
            </div>

            <h3 className="mt-6 font-display text-2xl font-bold text-white">Your Custom Plan</h3>
            <p className="text-white/60 text-sm mt-1">
              {selectedItems.length} module{selectedItems.length === 1 ? "" : "s"} selected
            </p>

            <div className="mt-5 flex-1 space-y-2 max-h-56 overflow-y-auto pr-1">
              {selectedItems.length === 0 && (
                <p className="text-sm text-white/60 italic">Select at least one module to continue.</p>
              )}
              {selectedItems.map((i) => (
                <div key={i.id} className="flex items-start gap-2 text-sm text-white/85">
                  <CheckCircle2 className="size-4 text-emerald-300 mt-0.5 shrink-0" />
                  <span className="line-clamp-1">{i.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="text-[11px] uppercase tracking-widest text-white/60">Pricing</div>
              <div className="mt-1 font-display text-lg font-semibold text-white">
                Tailored to your needs
              </div>
              <p className="text-xs text-white/65 mt-1">
                Our team will share a personalized quote based on the modules and scale you've chosen.
              </p>
            </div>

            <Button
              variant="emerald"
              size="lg"
              className="mt-5 w-full"
              disabled={selectedItems.length === 0}
              onClick={() => setSalesOpen(true)}
            >
              <MessageCircle className="size-4" /> Talk to Sales
              <ArrowRight className="size-4" />
            </Button>
            <a
              href="#contact"
              className="mt-3 text-center text-xs text-white/60 hover:text-white transition"
            >
              Or get in touch through our contact form
            </a>
          </div>
        </div>
      </div>

      <TalkToSalesDialog
        open={salesOpen}
        onOpenChange={setSalesOpen}
        selectedModules={selectedItems.map((i) => i.name)}
        scope={scope}
      />
    </section>
  );
};
