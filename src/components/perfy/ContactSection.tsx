import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "./RevealOnScroll";
import { GlowButton } from "./GlowButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import contactCharacter from "@/assets/perfy-contact-character.png";

export const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", company: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-sales-lead", {
        body: { ...form, source: "perfy-contact" },
      });
      if (error) throw error;
      toast({ title: "Message sent", description: "Our team will reach out shortly." });
      setForm({ name: "", email: "", mobile: "", company: "", message: "" });
    } catch (err: any) {
      toast({ title: "Could not send", description: err.message ?? "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 mesh-perfy opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-start">
        <RevealOnScroll>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-8 max-w-xs"
            >
              <div className="absolute inset-0 -m-6 rounded-[3rem] bg-gradient-to-br from-[hsl(var(--perfy-electric))]/25 via-[hsl(var(--perfy-cyan))]/15 to-transparent blur-3xl" />
              <div className="relative animate-perfy-float">
                <img
                  src={contactCharacter}
                  alt="PERFY representative ready to connect"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="relative w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                />
              </div>
            </motion.div>
            <span className="text-xs tracking-[0.3em] text-[hsl(var(--perfy-cyan))]">CONTACT US</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white font-display-perfy">
              Let's engineer your <span className="text-electric">next chapter</span>.
            </h2>
            <p className="mt-5 text-[hsl(var(--perfy-muted))] max-w-md">
              Tell us about your business. We'll share how PERFY can architect, embed, and scale a high-performance system inside it.
            </p>
            <div className="mt-8 space-y-4 text-sm text-[hsl(var(--perfy-silver))]">
              <a href="mailto:perfy.admin@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors"><Mail className="size-4 text-[hsl(var(--perfy-cyan))]" /> perfy.admin@gmail.com</a>
              <div className="flex items-center gap-3"><Phone className="size-4 text-[hsl(var(--perfy-cyan))]" /> +91 · Available on request</div>
              <div className="flex items-center gap-3"><MapPin className="size-4 text-[hsl(var(--perfy-cyan))]" /> Chennai · Bangalore · Hosur · Salem</div>
              <div className="flex items-center gap-3 pt-2 text-xs uppercase tracking-[0.25em] text-[hsl(var(--perfy-cyan))]">Led by Prem · Managing Director</div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <form onSubmit={submit} className="glass-perfy glow-border rounded-3xl p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[hsl(var(--perfy-muted))] focus:outline-none focus:border-[hsl(var(--perfy-cyan))]/60" />
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[hsl(var(--perfy-muted))] focus:outline-none focus:border-[hsl(var(--perfy-cyan))]/60" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="Mobile" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[hsl(var(--perfy-muted))] focus:outline-none focus:border-[hsl(var(--perfy-cyan))]/60" />
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[hsl(var(--perfy-muted))] focus:outline-none focus:border-[hsl(var(--perfy-cyan))]/60" />
            </div>
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What are you trying to build, scale or restructure?" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[hsl(var(--perfy-muted))] focus:outline-none focus:border-[hsl(var(--perfy-cyan))]/60 resize-none" />
            <GlowButton type="submit" disabled={loading} className="w-full justify-center">
              {loading ? "Sending..." : (<>Send Message <Send className="size-4" /></>)}
            </GlowButton>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
};
