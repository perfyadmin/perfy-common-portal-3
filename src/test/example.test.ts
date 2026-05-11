import { createElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PartnerCard, type Partner } from "@/components/perfy/PartnerCard";

const basePartner: Partner = {
  id: "partner-1",
  name: "Peter Prem Kumar R",
  designation: "Founder · Operations & Business Strategist",
  company: "PERFY",
  bio: "Bio",
  photo_url: "https://example.com/prem.jpg",
  linkedin_url: null,
  twitter_url: null,
  website_url: null,
};

describe("PartnerCard", () => {
  it("renders a partner image when a photo URL exists", () => {
    render(createElement(PartnerCard, { p: basePartner }));

    const image = screen.getByRole("img", { name: /peter prem kumar r/i });
    expect(image).toHaveAttribute("src", "https://example.com/prem.jpg");
  });

  it("falls back to the placeholder portrait when the image fails", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(createElement(PartnerCard, { p: basePartner }));

    fireEvent.error(screen.getByRole("img", { name: /peter prem kumar r/i }));

    expect(screen.getByRole("img", { name: /placeholder portrait/i })).toBeInTheDocument();
    errorSpy.mockRestore();
  });

  it("builds a public storage URL when the saved path is relative", () => {
    render(createElement(PartnerCard, {
      p: {
        ...basePartner,
        photo_url: "partner-photos/prem.jpg",
      },
    }));

    const image = screen.getByRole("img", { name: /peter prem kumar r/i });
    expect(image.getAttribute("src")).toContain("/storage/v1/object/public/partner-photos/prem.jpg");
  });
});
