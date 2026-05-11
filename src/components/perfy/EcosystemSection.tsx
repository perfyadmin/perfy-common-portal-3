import { EcosystemNetwork } from "./EcosystemNetwork";
import { RevealOnScroll } from "./RevealOnScroll";

export const EcosystemSection = () => (
  <section id="ecosystem" className="py-16 md:py-24 relative overflow-hidden">
    <div className="absolute inset-0 mesh-perfy opacity-50" />
    <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
      <RevealOnScroll>
        <div>
          <span className="text-xs tracking-[0.3em] text-[hsl(var(--perfy-cyan))]">THE PERFY ECOSYSTEM</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white font-display-perfy">
            One ecosystem. <span className="text-electric">Every dimension covered.</span>
          </h2>
          <p className="mt-6 text-[hsl(var(--perfy-muted))] leading-relaxed">
            PERFY operates through a curated network of specialised partners, enabling integrated,
            multi-disciplinary execution. Every dimension of business transformation is handled
            with expertise, precision, and coordination — under one unified system.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
            {["Strategy", "HR & Compliance", "Technology", "Finance", "Branding", "Venture Capital", "Operations", "Leadership"].map((d) => (
              <li key={d} className="flex items-center gap-2 text-[hsl(var(--perfy-silver))]">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--perfy-cyan))]" /> {d}
              </li>
            ))}
          </ul>
        </div>
      </RevealOnScroll>
      <RevealOnScroll delay={0.15}>
        <EcosystemNetwork />
      </RevealOnScroll>
    </div>
  </section>
);
