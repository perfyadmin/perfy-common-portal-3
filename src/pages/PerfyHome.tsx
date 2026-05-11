import { PerfyNav } from "@/components/perfy/PerfyNav";
import { PerfyFooter } from "@/components/perfy/PerfyFooter";
import { IntroLoader } from "@/components/IntroLoader";
import { HeroPerfy } from "@/components/perfy/HeroPerfy";
import { WhatSetsApart } from "@/components/perfy/WhatSetsApart";
import { MethodologyTimeline } from "@/components/perfy/MethodologyTimeline";
import { StoryOfPerfy } from "@/components/perfy/StoryOfPerfy";
import { EcosystemSection } from "@/components/perfy/EcosystemSection";
import { PartnersSection } from "@/components/perfy/PartnersSection";
import { BenefitsSection } from "@/components/perfy/BenefitsSection";
import { FinalCTAPerfy } from "@/components/perfy/FinalCTAPerfy";
import { ContactSection } from "@/components/perfy/ContactSection";
import { useSeo } from "@/hooks/useSeo";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PerfyHome = () => {
  useSeo({
    title: "PERFY — Engineering High-Performance Businesses",
    description: "PERFY is a performance-empowerment firm transforming businesses into scalable, system-driven organizations through strategy, execution, and discipline.",
    canonical: typeof window !== "undefined" ? window.location.origin + "/" : undefined,
  });

  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [hash]);

  return (
    <div className="theme-perfy-dark min-h-screen overflow-x-hidden">
      <IntroLoader />
      <PerfyNav />
      <main>
        <HeroPerfy />
        <WhatSetsApart />
        <MethodologyTimeline />
        <StoryOfPerfy />
        <EcosystemSection />
        <PartnersSection />
        <BenefitsSection />
        <FinalCTAPerfy />
        <ContactSection />
      </main>
      <PerfyFooter />
    </div>
  );
};

export default PerfyHome;
