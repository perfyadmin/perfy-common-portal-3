import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { GlowButton } from "./GlowButton";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/ecosystem" },
  { label: "Contact", to: "/#contact" },
];

export const PerfyNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname, loc.hash]);

  const goContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.assign("/#contact");
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`glass-perfy glow-border rounded-full pl-4 pr-2 py-2 flex items-center justify-between transition-all duration-500 ${scrolled ? "bg-black/60" : "bg-black/30"}`}>
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Logo size="sm" />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active =
                (l.to === "/" && loc.pathname === "/" && !loc.hash) ||
                (l.to.startsWith("/") && !l.to.includes("#") && loc.pathname === l.to) ||
                (l.to.includes("#") && loc.hash === "#" + l.to.split("#")[1]);
              return (
                <NavLink key={l.to} to={l.to} className={`px-4 py-2 rounded-full text-sm transition-colors ${active ? "text-white bg-white/10" : "text-[hsl(var(--perfy-muted))] hover:text-white"}`}>
                  {l.label}
                </NavLink>
              );
            })}
          </nav>
          <div className="flex items-center gap-1.5">
            <GlowButton
              className="!px-4 sm:!px-5 !py-2 text-[11px] sm:text-xs"
              onClick={goContact}
            >
              Partner With PERFY
            </GlowButton>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            open ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="glass-perfy glow-border rounded-2xl bg-black/70 p-2 flex flex-col">
            {links.map((l) => {
              const active =
                (l.to === "/" && loc.pathname === "/" && !loc.hash) ||
                (l.to.startsWith("/") && !l.to.includes("#") && loc.pathname === l.to) ||
                (l.to.includes("#") && loc.hash === "#" + l.to.split("#")[1]);
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={`px-4 py-3 rounded-xl text-sm transition-colors ${
                    active ? "text-white bg-white/10" : "text-[hsl(var(--perfy-muted))] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
