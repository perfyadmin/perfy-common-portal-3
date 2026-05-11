import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { openSalesDialog } from "@/components/SalesDialogController";

type NavLink = { href: string; label: string; action?: "sales"; external?: boolean };
const links: NavLink[] = [
  { href: "/", label: "Home", external: true },
  { href: "/about", label: "About", external: true },
  { href: "/services", label: "Services", external: true },
  { href: "/#ecosystem", label: "Ecosystem", external: true },
  { href: "/#partners", label: "Partners", external: true },
  { href: "#contact", label: "Contact", action: "sales" },
];

export const Header = ({ onCta }: { onCta: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all ${
          scrolled
            ? "backdrop-blur-2xl bg-white/70 border-b border-white/60 shadow-card"
            : "bg-transparent"
        } rounded-none`}
      >
        <nav className="flex items-center justify-between gap-4 py-2">
          <a href="#home" className="flex items-center gap-2">
            <Logo size={scrolled ? "sm" : "xl"} className={scrolled ? "drop-shadow-md" : "drop-shadow-lg"} />
          </a>
          <ul className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                {l.action === "sales" ? (
                  <button onClick={() => openSalesDialog()} className="text-foreground/80 hover:text-primary transition-colors">{l.label}</button>
                ) : (
                  <a href={l.href} className="text-foreground/80 hover:text-primary transition-colors">{l.label}</a>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Button onClick={onCta} variant="hero" size="sm" className="hidden sm:inline-flex">Explore Our Products</Button>
            <button className="lg:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="lg:hidden glass rounded-2xl p-4 mt-2 mb-3 animate-fade-in">
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  {l.action === "sales" ? (
                    <button onClick={() => { setOpen(false); openSalesDialog(); }} className="block py-1 font-medium text-left w-full">{l.label}</button>
                  ) : (
                    <a href={l.href} onClick={() => setOpen(false)} className="block py-1 font-medium">{l.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
