import { motion } from "framer-motion";

export const DashboardMock = () => (
  <div className="relative w-full aspect-[4/3] rounded-3xl glass-perfy glow-border p-6 overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-40" />
    <div className="relative h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <span className="text-[10px] tracking-widest text-[hsl(var(--perfy-muted))]">PERFY · LIVE</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {["EXECUTION", "VELOCITY", "MARGIN"].map((k, i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="rounded-xl border border-white/10 p-3 bg-white/5"
          >
            <div className="text-[9px] text-[hsl(var(--perfy-muted))] tracking-widest">{k}</div>
            <div className="mt-1 text-xl font-semibold text-white font-display-perfy">
              {[94, 78, 32][i]}{i === 2 ? "%" : ""}
            </div>
            <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${[94, 78, 65][i]}%` }}
                transition={{ delay: 0.5 + i * 0.15, duration: 1.2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[hsl(var(--perfy-electric))] to-[hsl(var(--perfy-cyan))]"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4 relative overflow-hidden">
        <svg viewBox="0 0 400 160" className="w-full h-full">
          <defs>
            <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(350, 70%, 32%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(22, 75%, 55%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 120 C 60 80, 100 110, 140 70 S 220 30, 280 60 S 360 20, 400 40 L 400 160 L 0 160 Z"
            fill="url(#lg)"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
          />
          <motion.path
            d="M0 120 C 60 80, 100 110, 140 70 S 220 30, 280 60 S 360 20, 400 40"
            stroke="hsl(350, 70%, 32%)" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {[60, 140, 220, 280, 340].map((x, i) => (
            <motion.circle
              key={i} cx={x} cy={[80, 70, 50, 60, 35][i]} r="3" fill="white"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.15 }}
            />
          ))}
        </svg>
      </div>
    </div>
  </div>
);
