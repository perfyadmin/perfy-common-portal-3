import { useEffect, useState } from "react";
import { loadConfig, saveConfig, type PerfyConfig } from "@/lib/store";

export function useConfig() {
  const [cfg, setCfg] = useState<PerfyConfig>(() => loadConfig());
  useEffect(() => {
    const h = () => setCfg(loadConfig());
    window.addEventListener("perfy:config", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("perfy:config", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  const update = (next: PerfyConfig) => {
    saveConfig(next);
    setCfg(next);
  };
  return { cfg, update };
}
