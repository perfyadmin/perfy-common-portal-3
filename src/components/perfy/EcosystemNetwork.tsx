import { motion } from "framer-motion";

const nodes = [
  "Strategy", "HR", "Technology", "Finance", "Branding", "Venture Capital", "Compliance",
];

export const EcosystemNetwork = () => {
  const cx = 300, cy = 300, r = 220;
  return (
    <div className="relative w-full max-w-3xl aspect-square mx-auto">
      <svg viewBox="0 0 600 600" className="w-full h-full">
        <defs>
          <radialGradient id="hubg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(12, 78%, 58%)" />
            <stop offset="100%" stopColor="hsl(350, 70%, 32%)" />
          </radialGradient>
          <linearGradient id="lineg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="600">
            <stop offset="0%" stopColor="hsl(22, 75%, 55%)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="hsl(350, 70%, 32%)" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="nodeg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(36, 95%, 75%)" />
            <stop offset="100%" stopColor="hsl(22, 80%, 50%)" />
          </radialGradient>
        </defs>

        {/* outer rotating dashed orbit */}
        <g style={{ transformOrigin: "300px 300px" }}>
          <circle cx={cx} cy={cy} r={r + 30} fill="none" stroke="hsl(22, 75%, 55%)" strokeOpacity="0.18" strokeDasharray="2 8">
            <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="60s" repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy={cy} r={r - 40} fill="none" stroke="hsl(350, 70%, 32%)" strokeOpacity="0.12" strokeDasharray="1 5">
            <animateTransform attributeName="transform" type="rotate" from={`360 ${cx} ${cy}`} to={`0 ${cx} ${cy}`} dur="80s" repeatCount="indefinite" />
          </circle>
        </g>

        {nodes.map((n, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          return (
            <g key={n}>
              <motion.line
                x1={cx} y1={cy} x2={x} y2={y}
                stroke="url(#lineg)" strokeWidth="1.8" strokeLinecap="round"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
              />
              {/* flowing data pulse along the spoke */}
              <circle r="3.5" fill="hsl(36, 95%, 70%)">
                <animateMotion
                  dur={`${2.4 + i * 0.18}s`}
                  repeatCount="indefinite"
                  path={`M ${cx} ${cy} L ${x} ${y}`}
                  begin={`${i * 0.25}s`}
                />
                <animate attributeName="opacity" values="0;1;1;0" dur={`${2.4 + i * 0.18}s`} repeatCount="indefinite" begin={`${i * 0.25}s`} />
              </circle>
              {/* pulsing halo on node */}
              <circle cx={x} cy={y} r="9" fill="hsl(22, 75%, 55%)" opacity="0.35">
                <animate attributeName="r" values="9;18;9" dur={`${2.6 + i * 0.12}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.35;0;0.35" dur={`${2.6 + i * 0.12}s`} repeatCount="indefinite" />
              </circle>
              <motion.circle
                cx={x} cy={y} r={9} fill="url(#nodeg)" stroke="white" strokeOpacity="0.6"
                initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 200 }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
              <motion.text
                x={x} y={y - 22}
                textAnchor="middle"
                fill="hsl(350, 70%, 22%)"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="3"
                paintOrder="stroke"
                style={{ fontSize: 14, fontFamily: "Plus Jakarta Sans", fontWeight: 800, letterSpacing: 0.5 }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.05 }}
              >
                {n}
              </motion.text>
            </g>
          );
        })}

        {/* central hub with breathing glow */}
        <circle cx={cx} cy={cy} r="95" fill="hsl(12, 78%, 58%)" opacity="0.18">
          <animate attributeName="r" values="85;105;85" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.18;0.05;0.18" dur="4s" repeatCount="indefinite" />
        </circle>
        <motion.circle
          cx={cx} cy={cy} r={70} fill="url(#hubg)"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 150 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <text x={cx} y={cy + 7} textAnchor="middle" fill="#ffffff" style={{ fontSize: 22, fontFamily: "Plus Jakarta Sans", fontWeight: 800, letterSpacing: 1 }}>
          PERFY
        </text>
      </svg>
    </div>
  );
};
