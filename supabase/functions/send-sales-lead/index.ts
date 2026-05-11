// Edge function: persist a sales lead and email the admin.
// Triggered when a visitor submits the "Talk to Sales" form.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ADMIN_EMAIL = "perfy.admin@gmail.com";

interface LeadBody {
  name: string;
  email: string;
  mobile: string;
  company?: string;
  message?: string;
  selected_modules?: string[];
  scope?: "individual" | "institution";
}

const isString = (v: unknown, max = 2000): v is string =>
  typeof v === "string" && v.trim().length > 0 && v.length <= max;

const isEmail = (v: unknown): v is string =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 200;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Validation
  if (
    !isString(body.name, 120) ||
    !isEmail(body.email) ||
    !isString(body.mobile, 30) ||
    (body.company !== undefined && body.company !== null && typeof body.company !== "string") ||
    (body.message !== undefined && body.message !== null && typeof body.message !== "string") ||
    (body.selected_modules !== undefined && !Array.isArray(body.selected_modules))
  ) {
    return new Response(JSON.stringify({ error: "Validation failed" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Insert lead first so nothing is lost even if email fails
  const { data: lead, error: insErr } = await supabase
    .from("sales_leads")
    .insert({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      mobile: body.mobile.trim(),
      company: body.company?.trim() || null,
      message: body.message?.trim() || null,
      selected_modules: (body.selected_modules ?? []).slice(0, 50),
    })
    .select()
    .single();

  if (insErr) {
    return new Response(JSON.stringify({ error: insErr.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Send email via Resend if configured
  const resendKey = Deno.env.get("RESEND_API_KEY");
  let emailSent = false;
  let emailError: string | null = null;

  if (resendKey) {
    try {
      const modulesHtml =
        (body.selected_modules ?? []).length > 0
          ? `<ul>${(body.selected_modules ?? [])
              .map((m) => `<li>${escapeHtml(m)}</li>`)
              .join("")}</ul>`
          : "<p><em>No modules selected</em></p>";

      const html = `
        <div style="font-family: Arial, sans-serif; color: #1a1a1a; max-width: 600px;">
          <h2 style="color: #8B1A2B; margin-bottom: 4px;">New Sales Lead — Perfy</h2>
          <p style="color: #666; margin-top: 0;">Submitted ${new Date().toLocaleString()}</p>
          <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding:8px; background:#faf5f1; font-weight:600;">Name</td><td style="padding:8px;">${escapeHtml(body.name)}</td></tr>
            <tr><td style="padding:8px; background:#faf5f1; font-weight:600;">Email</td><td style="padding:8px;">${escapeHtml(body.email)}</td></tr>
            <tr><td style="padding:8px; background:#faf5f1; font-weight:600;">Mobile</td><td style="padding:8px;">${escapeHtml(body.mobile)}</td></tr>
            <tr><td style="padding:8px; background:#faf5f1; font-weight:600;">Company</td><td style="padding:8px;">${escapeHtml(body.company || "—")}</td></tr>
            <tr><td style="padding:8px; background:#faf5f1; font-weight:600;">Scope</td><td style="padding:8px;">${escapeHtml(body.scope || "—")}</td></tr>
          </table>
          <h3 style="margin-top:24px; color:#8B1A2B;">Modules of interest</h3>
          ${modulesHtml}
          <h3 style="margin-top:24px; color:#8B1A2B;">Message</h3>
          <p style="white-space:pre-wrap;">${escapeHtml(body.message || "—")}</p>
          <hr style="margin:24px 0; border:none; border-top:1px solid #eee;" />
          <p style="font-size:12px; color:#888;">Lead ID: ${lead.id}</p>
        </div>`;

      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Perfy Leads <onboarding@resend.dev>",
          to: [ADMIN_EMAIL],
          reply_to: body.email,
          subject: `New Sales Lead — ${body.name}${body.company ? ` (${body.company})` : ""}`,
          html,
        }),
      });

      if (!r.ok) {
        emailError = `Resend ${r.status}: ${await r.text()}`;
      } else {
        emailSent = true;
      }
    } catch (e) {
      emailError = e instanceof Error ? e.message : String(e);
    }
  } else {
    emailError = "RESEND_API_KEY not configured";
  }

  // Best-effort: update lead row with email status
  await supabase
    .from("sales_leads")
    .update({ email_sent: emailSent, email_error: emailError })
    .eq("id", lead.id);

  return new Response(
    JSON.stringify({ ok: true, id: lead.id, email_sent: emailSent, email_error: emailError }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
