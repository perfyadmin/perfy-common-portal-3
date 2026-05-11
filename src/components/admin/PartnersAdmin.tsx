import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Upload, Save } from "lucide-react";
import { toast } from "sonner";

interface PartnerRow {
  id: string;
  name: string;
  designation: string | null;
  company: string | null;
  bio: string | null;
  photo_url: string | null;
  company_logo_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  website_url: string | null;
  sort_order: number;
  is_active: boolean;
}

const empty = (): Omit<PartnerRow, "id"> => ({
  name: "",
  designation: "",
  company: "",
  bio: "",
  photo_url: "",
  company_logo_url: "",
  linkedin_url: "",
  twitter_url: "",
  website_url: "",
  sort_order: 0,
  is_active: true,
});

export const PartnersAdmin = () => {
  const [rows, setRows] = useState<PartnerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const logoRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [uploadingLogoId, setUploadingLogoId] = useState<string | null>(null);

  const uploadLogo = async (p: PartnerRow, file: File) => {
    if (file.size > 4 * 1024 * 1024) return toast.error("Logo must be under 4MB");
    setUploadingLogoId(p.id);
    try {
      const ext = (file.name.split(".").pop() || "png").toLowerCase();
      const path = `${p.id}/logo-${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from("partner-photos")
        .upload(path, file, { upsert: true, contentType: file.type || "image/png", cacheControl: "3600" });
      if (error) return toast.error(error.message);
      const { data } = supabase.storage.from("partner-photos").getPublicUrl(path);
      const url = `${data.publicUrl}?t=${Date.now()}`;
      const next = [p.company_logo_url, url].filter(Boolean).join(", ");
      update(p.id, { company_logo_url: next });
      await supabase.from("partners").update({ company_logo_url: next }).eq("id", p.id);
      toast.success("Logo added");
    } catch (e: any) {
      toast.error(e?.message || "Logo upload failed");
    } finally {
      setUploadingLogoId(null);
    }
  };

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) toast.error(error.message);
    setRows((data as PartnerRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addNew = async () => {
    const { data, error } = await supabase
      .from("partners")
      .insert([{ ...empty(), name: "New Partner", sort_order: rows.length }])
      .select()
      .single();
    if (error) return toast.error(error.message);
    setRows((r) => [...r, data as PartnerRow]);
  };

  const update = (id: string, patch: Partial<PartnerRow>) =>
    setRows((r) => r.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const save = async (p: PartnerRow) => {
    const { id, ...rest } = p;
    const { error } = await supabase.from("partners").update(rest).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Saved");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this partner?")) return;
    const { error } = await supabase.from("partners").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((r) => r.filter((x) => x.id !== id));
  };

  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const upload = async (id: string, file: File) => {
    if (!/^image\/(jpeg|jpg|png|webp|heic|heif)$/i.test(file.type) && !/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) {
      return toast.error("Please upload a JPG, PNG or WebP image");
    }
    if (file.size > 8 * 1024 * 1024) return toast.error("Image must be under 8MB");
    setUploadingId(id);
    try {
      // Auto-orient + center-crop + resize to a uniform 800x800 square so every partner card looks consistent at every breakpoint.
      const square = await cropToSquare(file, 800);
      const path = `${id}/${Date.now()}.jpg`;
      const { error } = await supabase.storage
        .from("partner-photos")
        .upload(path, square, { upsert: true, contentType: "image/jpeg", cacheControl: "3600" });
      if (error) return toast.error(error.message);
      const { data } = supabase.storage.from("partner-photos").getPublicUrl(path);
      const cacheBusted = `${data.publicUrl}?t=${Date.now()}`;
      update(id, { photo_url: cacheBusted });
      await supabase.from("partners").update({ photo_url: cacheBusted }).eq("id", id);
      toast.success("Photo uploaded · auto-fit to card");
    } catch (e: any) {
      toast.error(e?.message || "Upload failed");
    } finally {
      setUploadingId(null);
    }
  };

  const cropToSquare = async (file: File, size: number): Promise<Blob> => {
    // Prefer createImageBitmap so EXIF orientation is auto-corrected on modern browsers.
    let bitmap: ImageBitmap | HTMLImageElement;
    try {
      bitmap = await createImageBitmap(file, { imageOrientation: "from-image" } as any);
    } catch {
      bitmap = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Invalid image"));
        img.src = URL.createObjectURL(file);
      });
    }
    const w = (bitmap as any).width as number;
    const h = (bitmap as any).height as number;
    if (!w || !h) throw new Error("Could not read image dimensions");
    const min = Math.min(w, h);
    const sx = (w - min) / 2;
    const sy = (h - min) / 2;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap as any, sx, sy, min, min, 0, 0, size, size);
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Conversion failed"))), "image/jpeg", 0.92)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-lg">Leadership & Partners</h3>
          <p className="text-sm text-muted-foreground">Manage the partner cards shown on the PERFY homepage and About page.</p>
        </div>
        <Button variant="hero" onClick={addNew}><Plus className="size-4" /> Add partner</Button>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

      <div className="grid gap-4">
        {rows.map((p) => (
          <div key={p.id} className="glass rounded-2xl p-5 grid lg:grid-cols-12 gap-4">
            <div className="lg:col-span-3 flex flex-col items-center gap-3">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-muted border flex items-center justify-center">
                {p.photo_url ? (
                  <img src={p.photo_url} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl text-muted-foreground">{p.name.charAt(0) || "?"}</span>
                )}
              </div>
              <input
                ref={(el) => (fileRefs.current[p.id] = el)}
                type="file" accept="image/*" hidden
                onChange={(e) => e.target.files?.[0] && upload(p.id, e.target.files[0])}
              />
              <Button size="sm" variant="outline" disabled={uploadingId === p.id} onClick={() => fileRefs.current[p.id]?.click()}>
                <Upload className="size-4" /> {uploadingId === p.id ? "Uploading…" : "Upload photo"}
              </Button>
              <p className="text-[10px] text-muted-foreground text-center max-w-[8rem]">Auto center-crops &amp; fits every card.</p>
            </div>

            <div className="lg:col-span-9 grid sm:grid-cols-2 gap-3">
              <div><Label className="text-xs">Name</Label><Input value={p.name} onChange={(e) => update(p.id, { name: e.target.value })} /></div>
              <div><Label className="text-xs">Designation</Label><Input value={p.designation || ""} onChange={(e) => update(p.id, { designation: e.target.value })} /></div>
              <div><Label className="text-xs">Company</Label><Input value={p.company || ""} onChange={(e) => update(p.id, { company: e.target.value })} /></div>
              <div><Label className="text-xs">Sort order</Label><Input type="number" value={p.sort_order} onChange={(e) => update(p.id, { sort_order: Number(e.target.value) })} /></div>
              <div className="sm:col-span-2">
                <Label className="text-xs">Company logo URL(s) — comma-separated for multiple</Label>
                <div className="flex gap-2">
                  <Input className="flex-1" placeholder="https://logo1.png, https://logo2.png" value={p.company_logo_url || ""} onChange={(e) => update(p.id, { company_logo_url: e.target.value })} />
                  <input
                    ref={(el) => (logoRefs.current[p.id] = el)}
                    type="file" accept="image/*" hidden
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadLogo(p, f); e.target.value = ""; }}
                  />
                  <Button size="sm" variant="outline" disabled={uploadingLogoId === p.id} onClick={() => logoRefs.current[p.id]?.click()}>
                    <Upload className="size-4" /> {uploadingLogoId === p.id ? "…" : "Add logo"}
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Upload one logo at a time — appends to the list. For Natheen-style multi-company partners, add each company's logo separately.</p>
              </div>
              <div className="sm:col-span-2"><Label className="text-xs">Short bio</Label><Textarea rows={3} value={p.bio || ""} onChange={(e) => update(p.id, { bio: e.target.value })} /></div>
              <div><Label className="text-xs">LinkedIn URL</Label><Input value={p.linkedin_url || ""} onChange={(e) => update(p.id, { linkedin_url: e.target.value })} /></div>
              <div><Label className="text-xs">Twitter URL</Label><Input value={p.twitter_url || ""} onChange={(e) => update(p.id, { twitter_url: e.target.value })} /></div>
              <div className="sm:col-span-2"><Label className="text-xs">Website URL</Label><Input value={p.website_url || ""} onChange={(e) => update(p.id, { website_url: e.target.value })} /></div>

              <div className="sm:col-span-2 flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <Label className="text-xs">Active</Label>
                  <Switch checked={p.is_active} onCheckedChange={(v) => update(p.id, { is_active: v })} />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => remove(p.id)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                  <Button size="sm" variant="hero" onClick={() => save(p)}>
                    <Save className="size-4" /> Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {!loading && rows.length === 0 && (
          <p className="text-sm text-muted-foreground italic">No partners yet — click "Add partner" to start.</p>
        )}
      </div>
    </div>
  );
};
