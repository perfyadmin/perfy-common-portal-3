import { useEffect, useState } from "react";
import logo from "@/assets/perfy-logo.png";

const SEEN_KEY = "perfy.intro.seen";

type Stage = "curtain" | "build" | "reveal" | "settle" | "hold" | "fadeout" | "done";

/**
 * Pure brand cinematic intro. No characters, no lighting effects.
 * Uses only the maroon / peach / cream palette and the logo.
 *
 *  0.00s  curtain — deep maroon fills the screen
 *  0.70s  build — three brand color bands sweep in (maroon, peach, cream)
 *  1.80s  reveal — bands part vertically, logo rises through the seam
 *  3.80s  settle — hairline draws, tagline fades in
 *  5.00s  hold — composed frame
 *  6.40s  fadeout — clean fade
 *  7.20s  done
 */
export const IntroLoader = () => {
  const [stage, setStage] = useState<Stage>(() =>
    sessionStorage.getItem(SEEN_KEY) ? "done" : "curtain"
  );

  useEffect(() => {
    if (stage === "done") return;
    const timers = [
      setTimeout(() => setStage("build"), 700),
      setTimeout(() => setStage("reveal"), 1800),
      setTimeout(() => setStage("settle"), 3800),
      setTimeout(() => setStage("hold"), 5000),
      setTimeout(() => setStage("fadeout"), 6400),
      setTimeout(() => {
        sessionStorage.setItem(SEEN_KEY, "1");
        setStage("done");
      }, 7200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (stage === "done") return null;

  const order: Stage[] = ["curtain", "build", "reveal", "settle", "hold", "fadeout", "done"];
  const at = (s: Stage) => order.indexOf(stage) >= order.indexOf(s);

  const built = at("build");
  const opened = at("reveal");
  const showLogo = at("reveal");
  const settled = at("settle");

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden transition-opacity duration-[800ms] ${
        stage === "fadeout" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      {/* Cream base — only visible once bands part */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(36_55%_97%)] via-[hsl(28_45%_94%)] to-[hsl(22_40%_90%)]" />

      {/* Brand color bands — three vertical zones using primary/secondary/accent.
          They split horizontally during reveal to expose the logo. */}
      <div className="absolute inset-0 flex z-10 pointer-events-none">
        {/* Maroon */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            transform: built ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 1100ms cubic-bezier(0.7, 0, 0.3, 1)",
          }}
        >
          <div
            className="absolute inset-0 bg-primary"
            style={{
              transform: opened ? "translateY(-100%)" : "translateY(0)",
              transition: "transform 1400ms cubic-bezier(0.83, 0, 0.17, 1)",
            }}
          />
        </div>
        {/* Peach / accent */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            transform: built ? "translateY(0)" : "translateY(100%)",
            transition: "transform 1100ms 120ms cubic-bezier(0.7, 0, 0.3, 1)",
          }}
        >
          <div
            className="absolute inset-0 bg-accent"
            style={{
              transform: opened ? "translateY(100%)" : "translateY(0)",
              transition: "transform 1400ms 80ms cubic-bezier(0.83, 0, 0.17, 1)",
            }}
          />
        </div>
        {/* Secondary */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            transform: built ? "translateX(0)" : "translateX(100%)",
            transition: "transform 1100ms 240ms cubic-bezier(0.7, 0, 0.3, 1)",
          }}
        >
          <div
            className="absolute inset-0 bg-secondary"
            style={{
              transform: opened ? "translateY(-100%)" : "translateY(0)",
              transition: "transform 1400ms 160ms cubic-bezier(0.83, 0, 0.17, 1)",
            }}
          />
        </div>
      </div>

      {/* Subtle vignette to frame the logo */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-[1200ms] z-20 ${
          opened ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, hsl(350 30% 15% / 0.15) 100%)",
        }}
      />

      {/* Faint film grain */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply z-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Letterbox bars */}
      <div
        className="absolute top-0 left-0 right-0 bg-[hsl(350_25%_8%)] z-40 transition-all duration-[1000ms] ease-[cubic-bezier(0.7,0,0.3,1)]"
        style={{ height: stage === "curtain" ? "0%" : "10%" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 bg-[hsl(350_25%_8%)] z-40 transition-all duration-[1000ms] ease-[cubic-bezier(0.7,0,0.3,1)]"
        style={{ height: stage === "curtain" ? "0%" : "10%" }}
      />

      {/* Logo + tagline */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 z-30">
        <div
          className="flex flex-col items-center"
          style={{
            animation: showLogo ? "intro-dolly 4.6s ease-out both" : undefined,
          }}
        >
          {showLogo && (
            <img
              src={logo}
              alt="Perfy"
              className="h-56 sm:h-72 md:h-[24rem] lg:h-[30rem] w-auto drop-shadow-[0_30px_60px_hsl(350_50%_15%_/_0.4)]"
              style={{
                animation: "intro-rise 2.4s cubic-bezier(0.22, 1, 0.36, 1) both",
              }}
            />
          )}

        </div>
      </div>

      <style>{`
        @keyframes intro-rise {
          0%   { opacity: 0; transform: translateY(55vh) scale(0.92); filter: blur(6px); }
          55%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes intro-dolly {
          0%   { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
