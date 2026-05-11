import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useConfig } from "@/hooks/useConfig";
import cariStudent from "@/assets/cari-student.png";
import cariEmployer from "@/assets/cari-employer.png";
import { GraduationCap, Briefcase, ExternalLink, Eye, Download } from "lucide-react";
import { ReportPreview } from "@/components/ReportPreview";

export const SampleReports = () => {
  const { cfg } = useConfig();
  const [open, setOpen] = useState<null | "student" | "employer">(null);
  const [hovered, setHovered] = useState<null | "student" | "employer">(null);

  const cards = [
    { id: "student" as const, title: "Student Report", icon: GraduationCap, cari: cariStudent, url: cfg.studentReportUrl, desc: "Career clarity, learning style, and growth roadmap.", tag: "For Learners" },
    { id: "employer" as const, title: "Employer Report", icon: Briefcase, cari: cariEmployer, url: cfg.employerReportUrl, desc: "Hiring fit, performance lens, and team dynamics.", tag: "For Hiring" },
  ];

  return (
    <section id="reports" className="relative py-24 bg-gradient-to-b from-sand/40 via-background to-background overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/15 blur-3xl rounded-full" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent">Sample Reports</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold">
            See the structure. <span className="text-gradient-maroon">Feel the depth.</span>
          </h2>
          <p className="mt-4 text-foreground/70">Hover any caricature to peek inside. Click to view the full report right here.</p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-8">
          {cards.map(({ id, title, icon: Icon, cari, url, desc, tag }, i) => (
            <div
              key={id}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(id)}
              onBlur={() => setHovered(null)}
              className="group relative rounded-3xl glass overflow-hidden hover:-translate-y-1 transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative grid grid-cols-5 items-stretch min-h-[280px]">
                {/* Caricature side */}
                <div className="col-span-2 relative bg-gradient-sand flex items-end justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-primary/10" />
                  <img
                    src={cari}
                    alt={`${title} caricature`}
                    loading="lazy"
                    className="relative h-64 w-auto object-contain transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2 animate-float-slow"
                  />
                  {/* Speech bubble peek on hover */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 bg-white rounded-2xl rounded-br-none px-3 py-1.5 shadow-card text-[11px] font-semibold text-primary">
                    Peek inside ↓
                  </div>
                </div>

                {/* Content side */}
                <div className="col-span-3 p-6 flex flex-col">
                  <span className="inline-flex w-max items-center gap-1.5 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase">
                    <Icon className="size-3" /> {tag}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-foreground/65">{desc}</p>

                  {/* Inline mini doc preview — slowly auto-scrolls through every page on hover */}
                  <div className="mt-4">
                    <ReportPreview url={url} hover={hovered === id} />
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="hero" size="sm" onClick={() => setOpen(id)} className="flex-1">
                      <Eye className="size-4" /> View Report
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={url} download>
                        <Download className="size-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="sm:max-w-5xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-5 pb-3 border-b">
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              {open === "student" ? <GraduationCap className="size-5 text-primary" /> : <Briefcase className="size-5 text-primary" />}
              {open === "student" ? "Student Report — Full Preview" : "Employer Report — Full Preview"}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-muted/40">
            {open && (
              <iframe
                src={open === "student" ? cfg.studentReportUrl : cfg.employerReportUrl}
                title="Report preview"
                className="w-full h-[75vh] bg-white"
              />
            )}
          </div>
          <div className="flex gap-3 p-4 border-t bg-card">
            <Button variant="outline" onClick={() => setOpen(null)} className="flex-1">Close</Button>
            <Button variant="hero" asChild className="flex-1">
              <a href={open === "student" ? cfg.studentReportUrl : cfg.employerReportUrl} target="_blank" rel="noopener noreferrer">
                Open in new tab <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
