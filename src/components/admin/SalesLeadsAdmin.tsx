import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { ADMIN_PASSWORD } from "@/lib/store";
import { Download, RefreshCw, Loader2, Mail, Phone, Search, Inbox } from "lucide-react";
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  company: string | null;
  message: string | null;
  selected_modules: string[];
  email_sent: boolean;
  email_error: string | null;
  created_at: string;
}

export const SalesLeadsAdmin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("list-sales-leads", {
        body: { password: ADMIN_PASSWORD },
      });
      if (error) throw error;
      setLeads((data as { leads: Lead[] }).leads ?? []);
    } catch (e) {
      toast.error("Could not load leads");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const filtered = leads.filter((l) => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return [l.name, l.email, l.mobile, l.company || "", l.message || ""].some((v) =>
      v.toLowerCase().includes(s),
    );
  });

  const exportCsv = () => {
    if (filtered.length === 0) {
      toast.error("Nothing to export");
      return;
    }
    const headers = ["Date", "Name", "Email", "Mobile", "Company", "Modules", "Message", "Email Sent", "Email Error"];
    const rows = filtered.map((l) => [
      new Date(l.created_at).toISOString(),
      l.name,
      l.email,
      l.mobile,
      l.company || "",
      (l.selected_modules || []).join(" | "),
      l.message || "",
      l.email_sent ? "Yes" : "No",
      l.email_error || "",
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `perfy-sales-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filtered.length} lead${filtered.length === 1 ? "" : "s"}`);
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-display font-semibold text-lg flex items-center gap-2">
            <Inbox className="size-5 text-primary" /> Sales Leads History
          </h3>
          <p className="text-sm text-muted-foreground">All "Talk to Sales" submissions, newest first.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchLeads} disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
            Refresh
          </Button>
          <Button variant="hero" size="sm" onClick={exportCsv} disabled={filtered.length === 0}>
            <Download className="size-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, company…" className="pl-9" />
      </div>

      {loading ? (
        <div className="py-12 text-center text-muted-foreground">
          <Loader2 className="size-5 animate-spin mx-auto" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          {leads.length === 0 ? "No leads yet — they'll appear here as visitors submit the form." : "No matches for that search."}
        </div>
      ) : (
        <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
          {filtered.map((l) => (
            <div key={l.id} className="rounded-xl border bg-card p-4 hover:shadow-card transition">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{l.name}</span>
                    {l.company && <Badge variant="outline">{l.company}</Badge>}
                    {l.email_sent ? (
                      <Badge className="bg-secondary/15 text-secondary border-secondary/30 hover:bg-secondary/15">Email sent</Badge>
                    ) : (
                      <Badge variant="outline" className="text-destructive border-destructive/40">Email pending</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5 flex-wrap">
                    <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1 hover:text-primary">
                      <Mail className="size-3" /> {l.email}
                    </a>
                    <a href={`tel:${l.mobile}`} className="inline-flex items-center gap-1 hover:text-primary">
                      <Phone className="size-3" /> {l.mobile}
                    </a>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground tabular-nums">
                  {new Date(l.created_at).toLocaleString()}
                </div>
              </div>

              {l.selected_modules?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {l.selected_modules.map((m, i) => (
                    <Badge key={i} variant="outline" className="text-[10px]">{m}</Badge>
                  ))}
                </div>
              )}

              {l.message && (
                <p className="mt-3 text-sm text-foreground/80 whitespace-pre-wrap rounded-lg bg-muted/40 p-3">
                  {l.message}
                </p>
              )}

              {l.email_error && (
                <p className="mt-2 text-xs text-destructive">Email error: {l.email_error}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
