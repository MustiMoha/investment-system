import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { readDb } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const db = readDb();

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/opportunities", label: "Opportunities" },
    { href: "/admin/investors", label: "Investors" },
    { href: "/admin/analytics", label: "Analytics" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#7d471e] dark:bg-[var(--dark-bg)] dark:text-[var(--dark-text)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-[var(--dark-border)] pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#cda22b]">
              Finjan.vc
            </p>
            <h1 className="mt-1 text-xl font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
              Investment Distribution Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-[var(--dark-text-muted)]">
              Manage investors, opportunities, personalized links and WhatsApp
              outreach.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="text-right text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
              <div className="font-medium text-[#7d471e] dark:text-[var(--dark-text)]">
                {db.opportunities.length} Opportunities
              </div>
              <div>{db.investors.length} Investors</div>
            </div>
            <span className="rounded-full border border-slate-300 dark:border-[var(--dark-border)] bg-slate-50 dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] px-3 py-1 text-xs text-[#7d471e] dark:text-[var(--dark-text)]">
              Private Admin
            </span>
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-[var(--dark-border)] pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] px-4 py-2 text-sm font-medium text-[#7d471e] dark:text-[var(--dark-text)] transition hover:bg-slate-50 dark:hover:bg-[var(--dark-surface-alt)] hover:text-[#cda22b] dark:hover:text-[var(--dark-accent)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
