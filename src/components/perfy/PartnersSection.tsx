import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PartnerCard, type Partner } from "./PartnerCard";
import { RevealOnScroll } from "./RevealOnScroll";

export const PartnersSection = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    supabase
      .from("partners")
      .select("id,name,designation,company,bio,photo_url,company_logo_url,linkedin_url,twitter_url,website_url")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("[PartnersSection] failed to load partners", error);
          return;
        }
        setPartners((data as Partner[]) || []);
      });
  }, []);

  return (
    <section id="partners" className="py-20 md:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll>
          <div className="text-center mb-12 md:mb-14">
            <span className="text-xs tracking-[0.3em] text-[hsl(var(--perfy-cyan))]">LEADERSHIP & PARTNERS</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
              The minds <span className="text-electric">behind PERFY</span>
            </h2>
            <p className="mt-4 text-[hsl(var(--perfy-muted))] max-w-2xl mx-auto">
              A curated ecosystem of operators, strategists, and specialists working in coordination to engineer business performance.
            </p>
          </div>
        </RevealOnScroll>

        {partners.length === 0 ? (
          <div className="text-center text-[hsl(var(--perfy-muted))] py-12">
            Partners will appear here once added in the admin panel.
          </div>
        ) : (
          <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto lg:flex lg:flex-wrap lg:justify-center">
            {partners.map((p, i) => (
              <RevealOnScroll key={p.id} delay={i * 0.07} className="h-full lg:w-[18%] lg:min-w-[180px] lg:max-w-[210px]">
                <PartnerCard p={p} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
