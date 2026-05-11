import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

export const PerfyFooter = () => (
  <footer className="border-t border-white/5 mt-32">
    <div className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-4 gap-10">
      <div className="space-y-4">
        <Logo size="md" />
        <p className="text-sm text-[hsl(var(--perfy-muted))] max-w-xs">
          A performance-empowerment ecosystem engineering high-performance businesses through systems, execution, and discipline.
        </p>
      </div>
      <div>
        <h4 className="text-white text-sm font-semibold mb-4">Explore</h4>
        <ul className="space-y-2 text-sm text-[hsl(var(--perfy-muted))]">
          <li><Link to="/" className="hover:text-white">Home</Link></li>
          <li><Link to="/ecosystem" className="hover:text-white transition-colors">Ecosystem</Link></li>
          <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
          <li><Link to="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white text-sm font-semibold mb-4">Engagement</h4>
        <ul className="space-y-2 text-sm text-[hsl(var(--perfy-muted))]">
          <li>Diagnose</li><li>Architect</li><li>Execute</li><li>Optimize</li><li>Scale</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white text-sm font-semibold mb-4">Contact</h4>
        <p className="text-sm text-[hsl(var(--perfy-muted))]">Led by <span className="text-white font-medium">Prem</span>, Managing Director.</p>
        <a href="mailto:perfy.admin@gmail.com" className="mt-3 block text-sm text-[hsl(var(--perfy-muted))] hover:text-white">perfy.admin@gmail.com</a>
        <Link to="/#contact" className="mt-4 inline-block text-sm text-electric font-medium hover:translate-x-0.5 transition-transform">Get in touch →</Link>
      </div>
    </div>
    <div className="border-t border-white/5 py-6 text-center text-xs text-[hsl(var(--perfy-muted))]">
      © {new Date().getFullYear()} PERFY · Engineering High-Performance Businesses
    </div>
  </footer>
);
