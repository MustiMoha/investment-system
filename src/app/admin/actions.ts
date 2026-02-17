"use server";

import { revalidatePath } from "next/cache";
import {
  readDb,
  writeDb,
  type Investor,
  type Opportunity,
  getBaseUrl,
} from "@/lib/data";
import crypto from "crypto";

function generateId() {
  return crypto.randomBytes(8).toString("hex");
}

export async function createOpportunity(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return;

  const slug =
    String(formData.get("slug") || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || name.toLowerCase().replace(/\s+/g, "-");

  const db = readDb();
  const exists = db.opportunities.find((o) => o.slug === slug);
  if (exists) {
    revalidatePath("/admin");
    return;
  }

  const opportunity: Opportunity = {
    id: generateId(),
    name,
    slug,
    createdAt: new Date().toISOString(),
  };

  db.opportunities.push(opportunity);
  writeDb(db);
  revalidatePath("/admin");
}

export async function createInvestor(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const mobile = String(formData.get("mobile") || "").trim();
  const countryCode = String(formData.get("countryCode") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  const opportunityIdRaw = String(formData.get("opportunityId") || "").trim();
  const opportunityId = opportunityIdRaw || null;

  if (!name || !mobile || !countryCode) {
    return;
  }

  const db = readDb();

  const existing = db.investors.find(
    (inv) =>
      inv.mobile === mobile &&
      inv.countryCode === countryCode &&
      inv.opportunityId === opportunityId,
  );
  if (existing) {
    revalidatePath("/admin");
    return;
  }

  const baseUrl = getBaseUrl();
  const ref = `${countryCode}${mobile}`;
  const uniqueLink = `${baseUrl}/?ref=${encodeURIComponent(ref)}`;

  const investor: Investor = {
    id: generateId(),
    name,
    mobile,
    countryCode,
    notes: notes || undefined,
    opportunityId,
    uniqueLink,
    createdAt: new Date().toISOString(),
  };

  db.investors.push(investor);
  writeDb(db);
  revalidatePath("/admin");
}

export async function regenerateLink(investorId: string) {
  const db = readDb();
  const investor = db.investors.find((i) => i.id === investorId);
  if (!investor) return;

  const baseUrl = getBaseUrl();
  const ref = `${investor.countryCode}${investor.mobile}`;
  investor.uniqueLink = `${baseUrl}/?ref=${encodeURIComponent(ref)}`;

  writeDb(db);
  revalidatePath("/admin");
}

