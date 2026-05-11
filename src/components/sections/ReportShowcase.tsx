import { useMemo } from "react";

const Radar = ({ values, labels, color = "hsl(var(--primary))" }: { values: number[]; labels: string[]; color?: string }) => {
  const size = 220, cx = size / 2, cy = size / 2, r = 80;
  const n = values.length;
  const points = useMemo(() => values.map((v, i) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    const rr = r * (v / 100);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  }), [values, n, cx, cy]);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + "Z";
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon key={s} points={Array.from({ length: n }).map((_, i) => {
          const a = (Math.PI * 2 * i) / n - Math.PI / 2;
          return `${cx + Math.cos(a) * r * s},${cy + Math.sin(a) * r * s}`;
        }).join(" ")} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
      ))}
      {labels.map((l, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2;
        const x = cx + Math.cos(a) * (r + 18), y = cy + Math.sin(a) * (r + 18);
        return <text key={l} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="hsl(var(--muted-foreground))">{l}</text>;
      })}
      <path d={path} fill={color} fillOpacity="0.25" stroke={color} strokeWidth="2" />
      {points.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={color} />)}
    </svg>
  );
};

const Bar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div>
    <div className="flex justify-between text-xs text-foreground/70 mb-1"><span>{label}</span><span className="font-semibold">{value}%</span></div>
    <div className="h-2 rounded-full bg-muted overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
    </div>
  </div>
);

export const ReportShowcase = () => (
  <section id="reports" className="relative py-24 bg-background">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary">Inside The Report</p>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold">We don't give scores. <span className="text-gradient-violet">We give clarity.</span></h2>
        <p className="mt-4 text-foreground/70">A glimpse at the visualizations powering your structured analysis.</p>
      </div>
      <div className="mt-14 grid lg:grid-cols-3 gap-6">
        <div className="glass rounded-3xl p-6 animate-fade-up">
          <h3 className="font-display font-semibold">Quotient Radar (IQ • EQ • AQ • CQ)</h3>
          <Radar values={[52, 68, 72, 68]} labels={["IQ", "EQ", "AQ", "CQ"]} />
        </div>
        <div className="glass rounded-3xl p-6 animate-fade-up" style={{ animationDelay: "0.08s" }}>
          <h3 className="font-display font-semibold">DISC Behavioral Profile</h3>
          <div className="mt-6 space-y-4">
            <Bar label="D — Dominance (Eagle)" value={53} color="hsl(345 80% 45%)" />
            <Bar label="I — Influence (Parrot)" value={70} color="hsl(45 100% 55%)" />
            <Bar label="S — Steadiness (Dove)" value={87} color="hsl(162 73% 41%)" />
            <Bar label="C — Compliance (Owl)" value={62} color="hsl(252 75% 63%)" />
          </div>
        </div>
        <div className="glass rounded-3xl p-6 animate-fade-up" style={{ animationDelay: "0.16s" }}>
          <h3 className="font-display font-semibold">RIASEC Career Fit</h3>
          <Radar values={[64, 66, 66, 70, 70, 70]} labels={["R", "I", "A", "S", "E", "C"]} color="hsl(162 73% 41%)" />
        </div>
        <div className="glass rounded-3xl p-6 lg:col-span-2 animate-fade-up">
          <h3 className="font-display font-semibold">SWOT — Quadrant View</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl p-4 bg-secondary/15"><div className="font-semibold text-secondary">Strengths</div><p className="text-foreground/70 mt-1">Empathy, team cohesion, persistence.</p></div>
            <div className="rounded-xl p-4 bg-accent/10"><div className="font-semibold text-accent">Weaknesses</div><p className="text-foreground/70 mt-1">Over-prioritizes harmony; analytical growth area.</p></div>
            <div className="rounded-xl p-4 bg-primary/10"><div className="font-semibold text-primary">Opportunities</div><p className="text-foreground/70 mt-1">Leadership tracks; coaching; people-first roles.</p></div>
            <div className="rounded-xl p-4 bg-muted"><div className="font-semibold">Threats</div><p className="text-foreground/70 mt-1">Conflict-heavy or purely analytical environments.</p></div>
          </div>
        </div>
        <div className="glass rounded-3xl p-6 animate-fade-up">
          <h3 className="font-display font-semibold">Action Plan</h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/75">
            <li>• 90-day priority skill ladder</li>
            <li>• Daily improvement rituals</li>
            <li>• Career roadmap with 3 phases</li>
            <li>• Learning style optimization</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);
