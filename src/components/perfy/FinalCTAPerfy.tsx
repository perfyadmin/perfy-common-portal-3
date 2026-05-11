import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GlowButton } from "./GlowButton";
import { RevealOnScroll } from "./RevealOnScroll";

export const FinalCTAPerfy = () => {
  const navigate = useNavigate();
  const goContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else {
      navigate("/#contact");
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 250);
    }
  };
  return (
    <section id="final-cta" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 mesh-perfy" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <RevealOnScroll>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.05] font-display-perfy">
            Build a Business That<br />
            <span className="text-electric animate-gradient-shift bg-gradient-to-r from-[hsl(var(--perfy-electric))] via-[hsl(var(--perfy-cyan))] to-white bg-clip-text text-transparent">
              Performs with Precision
            </span>
          </h2>
          <p className="mt-6 text-lg text-[hsl(var(--perfy-muted))] max-w-2xl mx-auto">
            Whether you are building, scaling, or restructuring — PERFY delivers the systems and
            discipline required for sustained success.
          </p>
          <div className="mt-10 flex justify-center">
            <GlowButton className="!px-10 !py-4 text-base" onClick={goContact}>
              Partner With PERFY <ArrowRight className="size-5" />
            </GlowButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
