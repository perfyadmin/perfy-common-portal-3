import { useState } from "react";
import { PerfyNav } from "@/components/perfy/PerfyNav";
import { PerfyFooter } from "@/components/perfy/PerfyFooter";
import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { ReportShowcase } from "@/components/sections/ReportShowcase";
import { SampleReports } from "@/components/sections/SampleReports";
import { OtherServices } from "@/components/sections/OtherServices";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { AssessmentModal } from "@/components/AssessmentModal";

const Index = () => {
  const [open, setOpen] = useState(false);
  const cta = () => setOpen(true);

  return (
    <div className="theme-perfy-dark min-h-screen overflow-x-hidden">
      <PerfyNav />
      <main>
        <Hero onCta={cta} />
        <Trust />
        <Problem />
        <Solution />
        <ReportShowcase />
        <SampleReports />
        <OtherServices onAssessment={cta} />
        <Pricing />
        <FinalCTA onCta={cta} />
      </main>
      <PerfyFooter />
      <AssessmentModal open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default Index;

