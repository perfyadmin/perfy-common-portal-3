import { createElement } from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PartnerCard, type Partner } from "@/components/perfy/PartnerCard";

// --- WCAG contrast helpers -------------------------------------------------
const hexToRgb = (hex: string) => {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16)) as [number, number, number];
};
const relLum = ([r, g, b]: [number, number, number]) => {
  const a = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};
const contrast = (fg: string, bg: string) => {
  const L1 = relLum(hexToRgb(fg));
  const L2 = relLum(hexToRgb(bg));
  const [a, b] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (a + 0.05) / (b + 0.05);
};

// Worst-case backgrounds the partner-name overlay must remain readable on.
// The card always paints an opaque black scrim (from-black) at the bottom band,
// so effective bg behind the text is near-black even on bright photos.
const SCRIM_BG = "#0a0a0a"; // from-black + via-black/80 effective at text band
const CYAN = "#22d3ee"; // approx hsl(var(--perfy-cyan))

const partners: Partner[] = [
  {
    id: "abdul",
    name: "Abdul Rahman",
    designation: "Auditing and Finance Analyst",
    company: "Viora",
    bio: null, photo_url: "https://example.com/a.jpg",
    linkedin_url: null, twitter_url: null, website_url: null,
  },
  {
    id: "varakees",
    name: "Varakees",
    designation: "Founder / CEO",
    company: "Arangam Originals",
    bio: null, photo_url: "https://example.com/v.jpg",
    linkedin_url: null, twitter_url: null, website_url: null,
  },
  {
    id: "vipin",
    name: "Vipin",
    designation: "Founder · Software Development",
    company: "Viora Creations",
    bio: null, photo_url: "https://example.com/vipin.jpg",
    linkedin_url: null, twitter_url: null, website_url: null,
  },
];

describe("PartnerCard contrast & readability regression", () => {
  it.each(partners)("$name renders readable name + designation + company + CTA", (p) => {
    const { unmount } = render(createElement(PartnerCard, { p }));
    const card = screen.getByRole("button", { name: new RegExp(`view ${p.name}`, "i") });
    const scope = within(card);

    const name = scope.getByTestId("partner-name");
    const desg = scope.getByTestId("partner-designation");
    const comp = scope.getByTestId("partner-company");
    const cta = scope.getByTestId("partner-cta");
    const scrim = scope.getByTestId("partner-scrim");

    // Text content matches input
    expect(name).toHaveTextContent(p.name);
    expect(desg).toHaveTextContent(p.designation!);
    expect(comp).toHaveTextContent(p.company!);
    expect(cta).toHaveTextContent(/click to view/i);

    // Opaque dark scrim sits behind the text band
    expect(scrim.className).toMatch(/from-black/);

    // White text + text-shadow guarantees contrast even before scrim
    expect(name.className).toMatch(/text-\[#ffffff\]/);
    expect(name.className).toMatch(/text-shadow/);
    expect(comp.className).toMatch(/text-\[#ffffff\]/);
    expect(cta.className).toMatch(/text-\[#ffffff\]/);

    // CTA chip has its own dark pill background ring — readable on any photo
    expect(cta.className).toMatch(/bg-black\/60/);
    expect(cta.className).toMatch(/ring-/);

    // WCAG AA: white on the scrim band must exceed 4.5:1
    expect(contrast("#ffffff", SCRIM_BG)).toBeGreaterThanOrEqual(4.5);
    // Cyan designation on the scrim band must exceed AA large-text (3:1)
    expect(contrast(CYAN, SCRIM_BG)).toBeGreaterThanOrEqual(3);

    unmount();
  });

  it("renders correctly across mobile, tablet and desktop card widths", () => {
    for (const w of [360, 768, 1366, 1920]) {
      Object.defineProperty(window, "innerWidth", { configurable: true, value: w });
      window.dispatchEvent(new Event("resize"));
      const { unmount } = render(createElement(PartnerCard, { p: partners[0] }));
      expect(screen.getByTestId("partner-name")).toBeInTheDocument();
      expect(screen.getByTestId("partner-cta")).toBeVisible();
      unmount();
    }
  });
});
