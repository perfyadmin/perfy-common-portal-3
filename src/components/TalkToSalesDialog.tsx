import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  selectedModules: string[];
  scope: "individual" | "institution";
}

const leadSchema = z.object({
  name: z.string().trim().min(1, "Required").max(120, "Too long"),
  email: z.string().trim().email("Invalid email").max(200),
  mobile: z
    .string()
    .trim()
    .min(4, "Required")
    .max(30, "Too long")
    .regex(/^[+\d][\d\s\-()]*$/, "Invalid phone number"),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const TalkToSalesDialog = ({ open, onOpenChange, selectedModules, scope }: Props) => {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", company: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setForm({ name: "", email: "", mobile: "", company: "", message: "" });
    setErrors({});
    setDone(false);
  };

  const handleClose = (v: boolean) => {
    if (submitting) return;
    if (!v) reset();
    onOpenChange(v);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[String(i.path[0])] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-sales-lead", {
        body: { ...result.data, selected_modules: selectedModules, scope },
      });
      if (error) throw error;
      setDone(true);
      toast.success("Thanks! Our sales team will reach out shortly.");
    } catch (err) {
      toast.error("Could not submit — please try again or email sales@perfy.app");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <MessageCircle className="size-5 text-primary" />
            Talk to Sales
          </DialogTitle>
          <DialogDescription>
            Share your details and our team will reach out with a tailored plan.
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="py-8 text-center space-y-3">
            <div className="inline-flex size-16 rounded-full bg-secondary/15 items-center justify-center">
              <CheckCircle2 className="size-8 text-secondary" />
            </div>
            <h3 className="font-display text-xl font-bold">Request received</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              We've sent your details to the Perfy team. Expect a response within one business day.
            </p>
            <Button variant="outline" onClick={() => handleClose(false)}>Close</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
              <div className="font-semibold text-foreground mb-1.5">
                Plan summary
                <Badge variant="outline" className="ml-2 text-[10px]">
                  {scope === "institution" ? "Institution" : "Individual"}
                </Badge>
              </div>
              {selectedModules.length === 0 ? (
                <span className="italic">No modules selected — we'll discuss based on your needs.</span>
              ) : (
                <span>{selectedModules.length} module{selectedModules.length === 1 ? "" : "s"}: {selectedModules.slice(0, 3).join(", ")}{selectedModules.length > 3 ? ` +${selectedModules.length - 3} more` : ""}</span>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="name">Full name *</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" maxLength={120} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="mobile">Mobile no. *</Label>
                <Input id="mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="+91 98765 43210" maxLength={30} />
                {errors.mobile && <p className="text-xs text-destructive mt-1">{errors.mobile}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" maxLength={200} />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="company">Company / Institution (optional)</Label>
              <Input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Acme Inc." maxLength={200} />
            </div>

            <div>
              <Label htmlFor="message">Tell us more (optional)</Label>
              <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} placeholder="Goals, team size, timelines…" maxLength={2000} />
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => handleClose(false)} disabled={submitting} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" variant="hero" disabled={submitting} className="flex-1">
                {submitting ? <><Loader2 className="size-4 animate-spin" /> Sending…</> : <><Send className="size-4" /> Submit</>}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
