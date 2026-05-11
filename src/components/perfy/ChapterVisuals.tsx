import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Brain, Target, Settings, Rocket, TrendingUp,
  Megaphone, DollarSign, Users, Cpu, Sparkles, Building2, Briefcase,
} from "lucide-react";

/* Shared parallax wrapper — subtle mouse-driven depth */
const Parallax = ({ children, strength = 14 }: { children: React.ReactNode; strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 14 });
  const y = useSpring(my, { stiffness: 60, damping: 14 });
  const rx = useTransform(y, [-1, 1], [strength / 2, -strength / 2]);
  const ry = useTransform(x, [-1, 1], [-strength / 2, strength / 2]);
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

/* 1. EXECUTION PIPELINE — Strategy → Planning → Operations → Execution → Results */
export const ExecutionPipeline = () => {
  const stages = [
    { label: "Strategy", icon: Target },
    { label: "Planning", icon: Brain },
    { label: "Operations", icon: Settings },
    { label: "Execution", icon: Rocket },
    { label: "Results", icon: TrendingUp },
  ];
  const [active, setActive] = useState(0);
  const [kpi, setKpi] = useState({ uptime: 92, throughput: 41, growth: 18 });

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % stages.length), 1600);
    const k = setInterval(() => setKpi({
      uptime: 90 + Math.round(Math.random() * 9),
      throughput: 38 + Math.round(Math.random() * 22),
      growth: 14 + Math.round(Math.random() * 12),
    }), 1800);
    return () => { clearInterval(t); clearInterval(k); };
  }, []);

  return (
    <Parallax>
      <div className="relative w-full h-full p-2">
        {/* KPI strip */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { k: "Uptime", v: `${kpi.uptime}%` },
            { k: "Flow", v: `${kpi.throughput}/s` },
            { k: "Growth", v: `+${kpi.growth}%` },
          ].map((s) => (
            <div key={s.k} className="rounded-xl bg-white/60 backdrop-blur border border-[hsl(22_75%_55%/.18)] px-3 py-2">
              <div className="text-[9px] tracking-[0.25em] text-[hsl(12_30%_35%)]">{s.k.toUpperCase()}</div>
              <motion.div key={s.v} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="text-base font-bold text-[hsl(12_30%_14%)] font-display-perfy">{s.v}</motion.div>
            </div>
          ))}
        </div>

        {/* Pipeline */}
        <div className="relative flex items-center justify-between gap-1 px-1">
          {stages.map((s, i) => {
            const Icon = s.icon;
            const isActive = i <= active;
            return (
              <div key={s.label} className="flex-1 flex flex-col items-center relative">
                {i < stages.length - 1 && (
                  <div className="absolute top-6 left-[60%] right-[-40%] h-[2px] bg-[hsl(22_75%_55%/.15)] overflow-hidden">
                    <motion.div
                      animate={{ x: isActive ? ["0%", "100%"] : "0%" }}
                      transition={{ duration: 1.4, repeat: isActive ? Infinity : 0, ease: "linear" }}
                      className="h-full w-1/2 bg-gradient-to-r from-transparent via-[hsl(22_85%_55%)] to-transparent"
                    />
                  </div>
                )}
                <motion.div
                  animate={{
                    scale: i === active ? 1.12 : 1,
                    boxShadow: i === active
                      ? "0 12px 30px -8px hsl(22 85% 55% / 0.55)"
                      : "0 4px 12px -6px hsl(22 30% 20% / 0.18)",
                  }}
                  transition={{ duration: 0.6 }}
                  className={`relative z-10 size-12 rounded-2xl flex items-center justify-center backdrop-blur border ${
                    isActive
                      ? "bg-gradient-to-br from-[hsl(22_85%_58%)] to-[hsl(350_70%_38%)] text-white border-white/40"
                      : "bg-white/70 text-[hsl(12_30%_30%)] border-[hsl(22_75%_55%/.18)]"
                  }`}
                >
                  <Icon className="size-5" />
                </motion.div>
                <div className={`mt-2 text-[9px] tracking-[0.18em] uppercase font-semibold ${isActive ? "text-[hsl(12_30%_18%)]" : "text-[hsl(12_30%_45%)]"}`}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Flowing data cards */}
        <div className="mt-5 space-y-2">
          {[
            { l: "Strategic Brief", p: 100 },
            { l: "Operational SOPs", p: 78 },
            { l: "Execution Sprint", p: 54 },
          ].map((row, i) => (
            <div key={row.l} className="rounded-lg bg-white/60 backdrop-blur border border-[hsl(22_75%_55%/.15)] px-3 py-2">
              <div className="flex items-center justify-between text-[10px] text-[hsl(12_30%_25%)] mb-1">
                <span className="font-semibold tracking-wide">{row.l}</span>
                <motion.span key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[hsl(22_85%_45%)] font-bold">
                  {Math.min(100, row.p + active * 4)}%
                </motion.span>
              </div>
              <div className="h-1.5 rounded-full bg-[hsl(22_75%_55%/.12)] overflow-hidden">
                <motion.div
                  animate={{ width: `${Math.min(100, row.p + active * 4)}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.1 }}
                  className="h-full bg-gradient-to-r from-[hsl(22_85%_58%)] to-[hsl(350_70%_45%)]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Parallax>
  );
};

/* 2. GROWTH ENGINE MATRIX */
export const GrowthEngineMatrix = () => {
  const modules = [
    { l: "Marketing", icon: Megaphone },
    { l: "Sales", icon: TrendingUp },
    { l: "Finance", icon: DollarSign },
    { l: "HR", icon: Users },
    { l: "Ops", icon: Settings },
    { l: "Tech", icon: Cpu },
    { l: "Brand", icon: Sparkles },
    { l: "Capital", icon: Briefcase },
    { l: "Leadership", icon: Building2 },
  ];
  const [active, setActive] = useState<number>(0);
  const [score, setScore] = useState(62);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % modules.length);
      setScore((s) => Math.min(98, Math.max(58, s + (Math.random() * 6 - 2))));
    }, 1100);
    return () => clearInterval(t);
  }, []);

  return (
    <Parallax>
      <div className="relative w-full h-full p-2 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[9px] tracking-[0.28em] text-[hsl(12_30%_35%)] font-semibold">GROWTH ENGINE</div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.18em] text-[hsl(12_30%_35%)]">SCORE</span>
            <motion.span key={Math.round(score)} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              className="text-base font-bold bg-gradient-to-r from-[hsl(22_85%_50%)] to-[hsl(350_70%_38%)] bg-clip-text text-transparent">
              {Math.round(score)}
            </motion.span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 flex-1">
          {modules.map((m, i) => {
            const Icon = m.icon;
            const on = i === active || i === (active + 3) % modules.length;
            return (
              <motion.div
                key={m.l}
                animate={{
                  scale: on ? 1.04 : 1,
                  borderColor: on ? "hsl(22 85% 55% / 0.6)" : "hsl(22 75% 55% / 0.18)",
                  boxShadow: on ? "0 10px 24px -8px hsl(22 85% 55% / 0.5)" : "0 2px 6px -3px hsl(22 30% 20% / 0.1)",
                }}
                transition={{ duration: 0.6 }}
                className="relative rounded-xl bg-white/70 backdrop-blur border p-2.5 flex flex-col items-center justify-center gap-1 overflow-hidden"
              >
                {on && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.6 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 m-auto size-8 rounded-full bg-[hsl(22_85%_55%/.4)]"
                  />
                )}
                <div className={`relative size-7 rounded-lg flex items-center justify-center ${
                  on ? "bg-gradient-to-br from-[hsl(22_85%_58%)] to-[hsl(350_70%_38%)] text-white" : "bg-[hsl(22_75%_55%/.1)] text-[hsl(12_30%_30%)]"
                }`}>
                  <Icon className="size-3.5" />
                </div>
                <div className="relative text-[9px] font-semibold text-[hsl(12_30%_22%)] tracking-wide">{m.l}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Live trend line */}
        <svg viewBox="0 0 200 40" className="mt-3 w-full h-10">
          <defs>
            <linearGradient id="trendg" x1="0" x2="1">
              <stop offset="0%" stopColor="hsl(22 85% 55%)" />
              <stop offset="100%" stopColor="hsl(350 70% 45%)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,30 Q25,28 40,22 T80,18 T120,12 T160,8 T200,4"
            fill="none" stroke="url(#trendg)" strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, ease: "easeOut" }}
          />
          <motion.circle r="3" fill="hsl(22 85% 55%)"
            animate={{ cx: [0, 200], cy: [30, 4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </Parallax>
  );
};

/* 3. ECOSYSTEM INTELLIGENCE NETWORK (light theme variant for chapter card) */
export const EcosystemIntelligence = () => {
  const nodes = ["HR", "Finance", "Brand", "Tech", "Ops", "VC", "Strategy"];
  const cx = 200, cy = 200, r = 130;
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => (p + 1) % nodes.length), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <Parallax>
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <radialGradient id="coreg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(22 85% 60%)" />
            <stop offset="100%" stopColor="hsl(350 70% 35%)" />
          </radialGradient>
          <linearGradient id="spokeg" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(22 85% 55%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(22 85% 55%)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* orbital rings */}
        {[r + 30, r - 20].map((rad, idx) => (
          <circle key={rad} cx={cx} cy={cy} r={rad} fill="none"
            stroke="hsl(22 75% 55%)" strokeOpacity="0.15" strokeDasharray="2 6">
            <animateTransform attributeName="transform" type="rotate"
              from={`${idx ? 360 : 0} ${cx} ${cy}`} to={`${idx ? 0 : 360} ${cx} ${cy}`}
              dur={`${50 + idx * 20}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {nodes.map((n, i) => {
          const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          const active = i === pulse;
          return (
            <g key={n}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="url(#spokeg)" strokeWidth={active ? 2 : 1} opacity={active ? 1 : 0.45} />
              <circle r="3" fill="hsl(22 90% 60%)">
                <animateMotion dur={`${2.4 + i * 0.2}s`} repeatCount="indefinite"
                  path={`M ${cx} ${cy} L ${x} ${y}`} begin={`${i * 0.3}s`} />
                <animate attributeName="opacity" values="0;1;0" dur={`${2.4 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              </circle>
              <motion.circle cx={x} cy={y} r={active ? 16 : 11}
                fill="white" stroke="hsl(22 85% 55%)" strokeWidth="2"
                animate={{ scale: active ? [1, 1.15, 1] : 1 }} transition={{ duration: 0.8 }}
                style={{ transformOrigin: `${x}px ${y}px` }} />
              <text x={x} y={y + 3} textAnchor="middle" fill="hsl(12 30% 20%)"
                style={{ fontSize: 9, fontFamily: "Plus Jakarta Sans", fontWeight: 700, letterSpacing: 0.5 }}>
                {n}
              </text>
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r="55" fill="hsl(22 85% 55%)" opacity="0.15">
          <animate attributeName="r" values="50;65;50" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r="38" fill="url(#coreg)" />
        <text x={cx} y={cy + 5} textAnchor="middle" fill="white"
          style={{ fontSize: 14, fontFamily: "Plus Jakarta Sans", fontWeight: 800, letterSpacing: 1.5 }}>
          PERFY
        </text>
      </svg>
    </Parallax>
  );
};

/* 4. MOVEMENT — expanding constellation */
export const MovementConstellation = () => {
  const orbs = Array.from({ length: 14 }).map((_, i) => {
    const a = (i / 14) * Math.PI * 2;
    const ring = i % 2 === 0 ? 110 : 160;
    return { x: 200 + Math.cos(a) * ring, y: 200 + Math.sin(a) * ring, d: i * 0.15 };
  });
  return (
    <Parallax>
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <radialGradient id="moveCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(22 90% 65%)" />
            <stop offset="60%" stopColor="hsl(350 70% 40%)" />
            <stop offset="100%" stopColor="hsl(350 70% 30%)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orbg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(36 95% 75%)" />
            <stop offset="100%" stopColor="hsl(22 85% 50%)" />
          </radialGradient>
        </defs>

        {/* expanding waves */}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx="200" cy="200" r="40" fill="none" stroke="hsl(22 85% 55%)" strokeWidth="1">
            <animate attributeName="r" from="40" to="180" dur="4s" begin={`${i * 1.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="4s" begin={`${i * 1.3}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* connections */}
        {orbs.map((o, i) => (
          <motion.line key={`l${i}`} x1="200" y1="200" x2={o.x} y2={o.y}
            stroke="hsl(22 85% 55%)" strokeOpacity="0.25" strokeWidth="1"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.6, delay: o.d }} />
        ))}

        {/* orbs awakening */}
        {orbs.map((o, i) => (
          <motion.circle key={i} cx={o.x} cy={o.y} r="6" fill="url(#orbg)"
            initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 + o.d }}
            style={{ transformOrigin: `${o.x}px ${o.y}px` }}>
            <animate attributeName="r" values="5;8;5" dur={`${2.5 + i * 0.1}s`} repeatCount="indefinite" />
          </motion.circle>
        ))}

        {/* core */}
        <circle cx="200" cy="200" r="90" fill="url(#moveCore)" opacity="0.5">
          <animate attributeName="r" values="80;100;80" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="200" r="42" fill="url(#moveCore)" />
        <text x="200" y="206" textAnchor="middle" fill="white"
          style={{ fontSize: 16, fontFamily: "Plus Jakarta Sans", fontWeight: 800, letterSpacing: 2 }}>
          PERFY
        </text>
      </svg>
    </Parallax>
  );
};

/* 5. EXECUTION GENESIS — for chapter 1 (where it began) */
export const ExecutionGenesis = () => {
  return (
    <Parallax>
      <div className="relative w-full h-full p-2">
        <div className="text-[9px] tracking-[0.28em] text-[hsl(12_30%_35%)] font-semibold mb-3">OPERATIONAL CHAOS → ORDER</div>

        {/* Left: scattered chaos | Right: organized system */}
        <div className="grid grid-cols-2 gap-3 h-[calc(100%-30px)]">
          <div className="relative rounded-xl bg-white/60 border border-[hsl(22_75%_55%/.18)] overflow-hidden">
            <div className="absolute inset-0">
              {Array.from({ length: 22 }).map((_, i) => (
                <motion.div key={i}
                  initial={{ x: Math.random() * 140, y: Math.random() * 200, opacity: 0.4 }}
                  animate={{
                    x: [Math.random() * 140, Math.random() * 140, Math.random() * 140],
                    y: [Math.random() * 200, Math.random() * 200, Math.random() * 200],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute size-1.5 rounded-full bg-[hsl(22_85%_55%)]"
                />
              ))}
            </div>
            <div className="absolute bottom-2 left-2 right-2 text-[8px] tracking-[0.2em] text-[hsl(12_30%_45%)] font-semibold">CHAOS</div>
          </div>

          <div className="relative rounded-xl bg-gradient-to-br from-[hsl(22_85%_55%/.08)] to-[hsl(350_70%_40%/.08)] border border-[hsl(22_85%_55%/.4)] overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-4 gap-1.5 p-3">
              {Array.from({ length: 16 }).map((_, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.06, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                  className="rounded-sm bg-gradient-to-br from-[hsl(22_85%_58%)] to-[hsl(350_70%_45%)]"
                />
              ))}
            </div>
            <div className="absolute bottom-2 left-2 right-2 text-[8px] tracking-[0.2em] text-[hsl(12_30%_25%)] font-semibold">PERFY SYSTEM</div>
          </div>
        </div>

        {/* arrow flow */}
        <motion.div
          animate={{ x: [-4, 4, -4] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 rounded-full bg-white shadow-[0_8px_20px_-6px_hsl(22_85%_55%/.6)] flex items-center justify-center text-[hsl(22_85%_50%)] font-bold text-sm border border-[hsl(22_85%_55%/.4)]"
        >→</motion.div>
      </div>
    </Parallax>
  );
};

export const ChapterVisual = ({ kind }: { kind: string }) => {
  switch (kind) {
    case "chaos": return <ExecutionGenesis />;
    case "broken": return <ExecutionPipeline />;
    case "structure": return <GrowthEngineMatrix />;
    case "ecosystem": return <EcosystemIntelligence />;
    case "future": return <MovementConstellation />;
    default: return null;
  }
};
