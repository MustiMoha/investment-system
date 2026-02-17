import fs from "fs";
import path from "path";

export type Opportunity = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

export type Investor = {
  id: string;
  name: string;
  mobile: string;
  countryCode: string;
  notes?: string;
  opportunityId: string | null;
  uniqueLink: string;
  createdAt: string;
};

export type Analytics = {
  investorId: string;
  totalClicks: number;
  firstClickAt: string | null;
  lastClickAt: string | null;
  mobileClicks: number;
  desktopClicks: number;
  ctaClicks: number;
};

export type Database = {
  opportunities: Opportunity[];
  investors: Investor[];
  analytics: Analytics[];
};

const DATA_FILE = path.join(process.cwd(), "data", "db.json");

function ensureDataFile(): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const initial: Database = {
      opportunities: [],
      investors: [],
      analytics: [],
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf-8");
  }
}

export function readDb(): Database {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Database;
}

export function writeDb(db: Database): void {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf-8");
}

export function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
  );
}

