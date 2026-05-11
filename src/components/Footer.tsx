import { Logo } from "./Logo";
import { openSalesDialog } from "@/components/SalesDialogController";

export const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid md:grid-cols-3 gap-6 items-center">
      <div>
        <Logo />
        <p className="mt-2 text-sm text-muted-foreground">From effort to impact.</p>
      </div>
      <p className="text-sm text-muted-foreground text-center">© {new Date().getFullYear()} Perfy. All rights reserved.</p>
      <div className="text-sm text-muted-foreground md:text-right">
        <a href="#product" className="hover:text-primary mr-4">Product</a>
        <a href="#services" className="hover:text-primary mr-4">Services</a>
        <button onClick={() => openSalesDialog()} className="hover:text-primary">Contact</button>
      </div>
    </div>
  </footer>
);
