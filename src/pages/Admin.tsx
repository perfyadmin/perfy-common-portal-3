import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useConfig } from "@/hooks/useConfig";
import { ADMIN_EMAIL, isAdmin, loginAdmin, logoutAdmin, resetConfig, type ModuleCategory } from "@/lib/store";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, Save, RotateCcw, Plus, Trash2 } from "lucide-react";
import { SalesLeadsAdmin } from "@/components/admin/SalesLeadsAdmin";
import { PartnersAdmin } from "@/components/admin/PartnersAdmin";

const cats: ModuleCategory[] = ["Performance", "Organization", "Operations", "Compliance", "Strategy", "Learning"];

const Admin = () => {
  const [authed, setAuthed] = useState(isAdmin());
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const { cfg, update } = useConfig();

  if (!authed) {
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (loginAdmin(email, pw)) { setAuthed(true); toast.success("Welcome, Admin"); }
            else toast.error("Invalid credentials");
          }}
          className="w-full max-w-md glass rounded-3xl p-8 space-y-5"
        >
          <Logo size="lg" className="mx-auto" />
          <h1 className="font-display text-2xl font-bold text-center">Admin Console</h1>
          <p className="text-sm text-center text-muted-foreground">Sign in to control the Perfy ecosystem.</p>
          <div className="space-y-2"><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={ADMIN_EMAIL} /></div>
          <div className="space-y-2"><Label>Password</Label><Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" /></div>
          <Button variant="hero" type="submit" className="w-full">Sign in</Button>
          <p className="text-xs text-center text-muted-foreground">Default: {ADMIN_EMAIL} / perfy@admin</p>
          <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-primary">← Back to site</Link>
        </form>
      </div>
    );
  }

  const updateModule = (id: string, patch: Partial<typeof cfg.modules[number]>) => {
    update({ ...cfg, modules: cfg.modules.map((m) => (m.id === id ? { ...m, ...patch } : m)) });
  };

  const bulk = (cat: ModuleCategory, enabled: boolean) => {
    update({ ...cfg, modules: cfg.modules.map((m) => (m.category === cat ? { ...m, enabled } : m)) });
    toast.success(`${cat}: ${enabled ? "all enabled" : "all disabled"}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <Badge>Admin</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild><Link to="/">View site</Link></Button>
            <Button variant="ghost" size="sm" onClick={() => { resetConfig(); toast.success("Config reset"); }}><RotateCcw className="size-4" /> Reset</Button>
            <Button variant="ghost" size="sm" onClick={() => { logoutAdmin(); setAuthed(false); }}><LogOut className="size-4" /> Logout</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <Tabs defaultValue="global">
          <TabsList>
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="product">Main Product</TabsTrigger>
            <TabsTrigger value="leads">Sales Leads</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="mt-6 space-y-4">
            <div className="glass rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold">Other Services Section</h3>
                <p className="text-sm text-muted-foreground">Toggle the entire enterprise modules section on the website.</p>
              </div>
              <Switch checked={cfg.otherServicesEnabled} onCheckedChange={(v) => update({ ...cfg, otherServicesEnabled: v })} />
            </div>
          </TabsContent>

          <TabsContent value="modules" className="mt-6 space-y-8">
            {cats.map((cat) => (
              <div key={cat} className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-lg">{cat}</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => bulk(cat, true)}>Enable all</Button>
                    <Button size="sm" variant="ghost" onClick={() => bulk(cat, false)}>Disable all</Button>
                  </div>
                </div>
                <div className="space-y-3">
                  {cfg.modules.filter((m) => m.category === cat).map((m) => (
                    <div key={m.id} className="rounded-xl border p-4 grid lg:grid-cols-12 gap-3 items-end">
                      <div className="lg:col-span-3 space-y-1">
                        <Label className="text-xs">Name</Label>
                        <Input value={m.name} onChange={(e) => updateModule(m.id, { name: e.target.value })} />
                        <Label className="text-xs mt-1">Description</Label>
                        <Input value={m.description} onChange={(e) => updateModule(m.id, { description: e.target.value })} />
                      </div>
                      <div className="lg:col-span-4">
                        <Label className="text-xs">Redirect Link</Label>
                        <Input value={m.redirect} placeholder="https://…" onChange={(e) => updateModule(m.id, { redirect: e.target.value })} />
                      </div>
                      <div className="lg:col-span-2">
                        <Label className="text-xs">Price (₹)</Label>
                        <Input type="number" value={m.price} onChange={(e) => updateModule(m.id, { price: Number(e.target.value) })} />
                      </div>
                      <div className="lg:col-span-1 flex flex-col items-center text-xs">
                        <Label className="text-xs">Show ₹</Label>
                        <Switch checked={m.showPrice} onCheckedChange={(v) => updateModule(m.id, { showPrice: v })} />
                      </div>
                      <div className="lg:col-span-2 flex items-center justify-between gap-2">
                        <Badge variant={m.enabled ? "default" : "outline"} className={m.enabled ? "bg-secondary text-secondary-foreground" : ""}>
                          {m.enabled ? "Active" : "Disabled"}
                        </Badge>
                        <Switch checked={m.enabled} onCheckedChange={(v) => updateModule(m.id, { enabled: v })} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="pricing" className="mt-6 space-y-4">
            <div className="glass rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold">Pricing Checklist</h3>
                  <p className="text-sm text-muted-foreground">Add, rename, re-price, enable/disable, or set defaults for each option shown on the Pricing section.</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => update({ ...cfg, pricingItems: [...cfg.pricingItems, { id: `item-${Date.now()}`, label: "New Option", value: 0, enabled: true, defaultSelected: false }] })}>
                  <Plus className="size-4" /> Add option
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Currency Symbol</Label>
                  <Input value={cfg.pricingCurrency} onChange={(e) => update({ ...cfg, pricingCurrency: e.target.value })} />
                </div>
                <div>
                  <Label className="text-xs">Institution Multiplier (×)</Label>
                  <Input type="number" step="0.1" value={cfg.institutionMultiplier} onChange={(e) => update({ ...cfg, institutionMultiplier: Number(e.target.value) || 1 })} />
                </div>
              </div>

              <div className="space-y-3">
                {cfg.pricingItems.map((p, idx) => (
                  <div key={p.id} className="rounded-xl border p-4 grid lg:grid-cols-12 gap-3 items-end">
                    <div className="lg:col-span-5">
                      <Label className="text-xs">Label</Label>
                      <Input value={p.label} onChange={(e) => update({ ...cfg, pricingItems: cfg.pricingItems.map((it, i) => i === idx ? { ...it, label: e.target.value } : it) })} />
                    </div>
                    <div className="lg:col-span-2">
                      <Label className="text-xs">Price</Label>
                      <Input type="number" value={p.value} onChange={(e) => update({ ...cfg, pricingItems: cfg.pricingItems.map((it, i) => i === idx ? { ...it, value: Number(e.target.value) } : it) })} />
                    </div>
                    <div className="lg:col-span-2 flex flex-col items-start">
                      <Label className="text-xs">Enabled</Label>
                      <Switch checked={p.enabled} onCheckedChange={(v) => update({ ...cfg, pricingItems: cfg.pricingItems.map((it, i) => i === idx ? { ...it, enabled: v } : it) })} />
                    </div>
                    <div className="lg:col-span-2 flex flex-col items-start">
                      <Label className="text-xs">Default ✓</Label>
                      <Switch checked={p.defaultSelected} onCheckedChange={(v) => update({ ...cfg, pricingItems: cfg.pricingItems.map((it, i) => i === idx ? { ...it, defaultSelected: v } : it) })} />
                    </div>
                    <div className="lg:col-span-1 flex justify-end">
                      <Button size="sm" variant="ghost" onClick={() => update({ ...cfg, pricingItems: cfg.pricingItems.filter((_, i) => i !== idx) })}>
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-6 space-y-4">
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-display font-semibold">Sample Report URLs</h3>
              <p className="text-sm text-muted-foreground">Update the public URLs used on the homepage. Upload your file to a CDN or /public folder, then paste the URL.</p>
              <div>
                <Label>Student Report URL</Label>
                <Input value={cfg.studentReportUrl} onChange={(e) => update({ ...cfg, studentReportUrl: e.target.value })} />
              </div>
              <div>
                <Label>Employer Report URL</Label>
                <Input value={cfg.employerReportUrl} onChange={(e) => update({ ...cfg, employerReportUrl: e.target.value })} />
              </div>
              <Button variant="hero" onClick={() => toast.success("Saved")}><Save className="size-4" /> Saved</Button>
            </div>
          </TabsContent>

          <TabsContent value="product" className="mt-6">
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-display font-semibold">Main Product Redirect</h3>
              <p className="text-sm text-muted-foreground">Where the "Take Your Assessment" button sends users.</p>
              <Input value={cfg.mainProductRedirect} onChange={(e) => update({ ...cfg, mainProductRedirect: e.target.value })} />
              <Button variant="hero" onClick={() => toast.success("Saved")}><Save className="size-4" /> Saved</Button>
            </div>
          </TabsContent>

          <TabsContent value="leads" className="mt-6">
            <SalesLeadsAdmin />
          </TabsContent>

          <TabsContent value="partners" className="mt-6">
            <PartnersAdmin />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
