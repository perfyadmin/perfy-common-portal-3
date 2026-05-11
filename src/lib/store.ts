// Lightweight admin-controlled config persisted in localStorage.
// In production this would live in Perfy Infrastructure; for now it's a single source of truth on the client.

export type ModuleCategory = "Performance" | "Organization" | "Operations" | "Compliance" | "Strategy" | "Learning";

export interface ModuleItem {
  id: string;
  name: string;
  category: ModuleCategory;
  description: string;
  enabled: boolean;
  redirect: string;
  price: number;
  showPrice: boolean;
}

export interface PricingItem {
  id: string;
  label: string;
  value: number;
  enabled: boolean;
  defaultSelected: boolean;
}

export interface PerfyConfig {
  mainProductRedirect: string;
  otherServicesEnabled: boolean;
  studentReportUrl: string;
  employerReportUrl: string;
  modules: ModuleItem[];
  pricingItems: PricingItem[];
  institutionMultiplier: number;
  pricingCurrency: string;
}

const KEY = "perfy.config.v1";

const defaults: PerfyConfig = {
  mainProductRedirect: "https://perfy-brain-mapping.netlify.app/",
  otherServicesEnabled: true,
  studentReportUrl: "/reports/STUDENT.pdf",
  employerReportUrl: "/reports/EMPLOYEE.pdf",
  modules: [
    // Performance
    { id: "workflow", name: "Workflow Module", category: "Performance", description: "Design and orchestrate cross-team workflows.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "tasks", name: "Task Management", category: "Performance", description: "Plan, assign, and track tasks across teams.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "kpi", name: "KPI / KRI Tracking", category: "Performance", description: "Track key performance and risk indicators.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "perf-reports", name: "Performance Reports", category: "Performance", description: "Auto-generated performance reports.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "pip", name: "Performance Improvement Plans", category: "Performance", description: "Structured PIPs with milestones.", enabled: false, redirect: "", price: 0, showPrice: false },
    // Organization
    { id: "org-structure", name: "Organization Structure", category: "Organization", description: "Visual org chart and hierarchies.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "rbac", name: "Role-based Access", category: "Organization", description: "Granular role and permission system.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "notifications", name: "Notifications (hierarchy-based)", category: "Organization", description: "Smart notifications routed by hierarchy.", enabled: false, redirect: "", price: 0, showPrice: false },
    // Operations
    { id: "inventory", name: "Inventory", category: "Operations", description: "End-to-end inventory tracking.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "vendor", name: "Vendor Management", category: "Operations", description: "Onboard and manage vendors.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "client", name: "Client Management", category: "Operations", description: "Centralized client relationships.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "crm", name: "CRM", category: "Operations", description: "Sales pipeline and customer journeys.", enabled: false, redirect: "", price: 0, showPrice: false },
    // Compliance
    { id: "policy", name: "Policy Drafting", category: "Compliance", description: "Draft and version policies with approvals.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "risk", name: "Risk & Issue Management", category: "Compliance", description: "Track risks, issues, and mitigations.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "safety", name: "Safety & Maintenance", category: "Compliance", description: "Safety protocols and maintenance logs.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "geo", name: "Geo-Fencing", category: "Compliance", description: "Location-aware compliance triggers.", enabled: false, redirect: "", price: 0, showPrice: false },
    // Strategy
    { id: "strategy", name: "Strategic Management", category: "Strategy", description: "OKRs, initiatives, and strategic reviews.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "waste", name: "Waste Management", category: "Strategy", description: "Reduce operational waste with insights.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "finance", name: "Finance Management", category: "Strategy", description: "Budgets, forecasts, and finance ops.", enabled: false, redirect: "", price: 0, showPrice: false },
    // Learning
    { id: "lms", name: "Learning Management System", category: "Learning", description: "Courses, cohorts, and progress.", enabled: false, redirect: "", price: 0, showPrice: false },
    { id: "edp", name: "Employee Development Plans", category: "Learning", description: "Personalized growth plans.", enabled: false, redirect: "", price: 0, showPrice: false },
  ],
  pricingItems: [
    { id: "basic", label: "Basic Assessment", value: 999, enabled: true, defaultSelected: true },
    { id: "deep", label: "Deep Analysis", value: 1499, enabled: true, defaultSelected: true },
    { id: "career", label: "Career Mapping", value: 999, enabled: true, defaultSelected: false },
    { id: "perf", label: "Performance Insights", value: 1299, enabled: true, defaultSelected: false },
    { id: "swot", label: "SWOT & Action Plan", value: 799, enabled: true, defaultSelected: false },
    { id: "roadmap", label: "10-Year Career Roadmap", value: 999, enabled: true, defaultSelected: false },
  ],
  institutionMultiplier: 4.5,
  pricingCurrency: "₹",
};

export function loadConfig(): PerfyConfig {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as PerfyConfig;
    const ids = new Set(parsed.modules.map((m) => m.id));
    const merged = [...parsed.modules, ...defaults.modules.filter((m) => !ids.has(m.id))];
    const pIds = new Set((parsed.pricingItems ?? []).map((p) => p.id));
    const pricingMerged = [...(parsed.pricingItems ?? []), ...defaults.pricingItems.filter((p) => !pIds.has(p.id))];
    return { ...defaults, ...parsed, modules: merged, pricingItems: pricingMerged };
  } catch {
    return defaults;
  }
}

export function saveConfig(cfg: PerfyConfig) {
  localStorage.setItem(KEY, JSON.stringify(cfg));
  window.dispatchEvent(new CustomEvent("perfy:config"));
}

export function resetConfig() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("perfy:config"));
}

// Admin auth (client-side gate; replace with real auth when Perfy Infrastructure is wired).
const ADMIN_KEY = "perfy.admin.session";
export const ADMIN_EMAIL = "perfy.admin@gmail.com";
export const ADMIN_PASSWORD = "perfy@admin";

export function isAdmin() {
  return localStorage.getItem(ADMIN_KEY) === "1";
}
export function loginAdmin(email: string, password: string) {
  if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_KEY, "1");
    return true;
  }
  return false;
}
export function logoutAdmin() {
  localStorage.removeItem(ADMIN_KEY);
}
