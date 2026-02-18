import Link from "next/link";
import { readDb } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const db = readDb();

  const stats = {
    totalOpportunities: db.opportunities.length,
    totalInvestors: db.investors.length,
    assignedInvestors: db.investors.filter((i) => i.opportunityId).length,
    totalClicks: db.analytics.reduce((sum, a) => sum + a.totalClicks, 0),
    totalCtaClicks: db.analytics.reduce((sum, a) => sum + a.ctaClicks, 0),
  };

  const recentInvestors = db.investors
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">Dashboard Overview</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-[var(--dark-text-muted)]">
          Quick overview of your investment distribution system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-[var(--dark-text-muted)]">
            Opportunities
          </div>
          <div className="mt-2 text-2xl font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
            {stats.totalOpportunities}
          </div>
          <Link
            href="/admin/opportunities"
            className="mt-2 text-xs text-[#cda22b] hover:underline"
          >
            Manage →
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-[var(--dark-text-muted)]">
            Total Investors
          </div>
          <div className="mt-2 text-2xl font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
            {stats.totalInvestors}
          </div>
          <Link
            href="/admin/investors"
            className="mt-2 text-xs text-[#cda22b] hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-[var(--dark-text-muted)]">
            Assigned
          </div>
          <div className="mt-2 text-2xl font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
            {stats.assignedInvestors}
          </div>
          <div className="mt-2 text-xs text-[#7d471e] dark:text-[var(--dark-text)]">
            {stats.totalInvestors > 0
              ? Math.round((stats.assignedInvestors / stats.totalInvestors) * 100)
              : 0}
            % assigned
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-[var(--dark-text-muted)]">
            Total Clicks
          </div>
          <div className="mt-2 text-2xl font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
            {stats.totalClicks}
          </div>
          <Link
            href="/admin/analytics"
            className="mt-2 text-xs text-[#cda22b] hover:underline"
          >
            View Analytics →
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-[var(--dark-text-muted)]">
            CTA Clicks
          </div>
          <div className="mt-2 text-2xl font-semibold text-[#cda22b]">
            {stats.totalCtaClicks}
          </div>
          <div className="mt-2 text-xs text-[#7d471e] dark:text-[var(--dark-text)]">
            {stats.totalClicks > 0
              ? Math.round((stats.totalCtaClicks / stats.totalClicks) * 100)
              : 0}
            % conversion
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
          <h3 className="text-sm font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">Quick Actions</h3>
          <div className="mt-4 space-y-2">
            <Link
              href="/admin/opportunities"
              className="block rounded-lg border border-slate-200 dark:border-[var(--dark-border)] bg-slate-50 dark:bg-[var(--dark-surface-alt)] px-4 py-3 text-sm font-medium text-[#7d471e] dark:text-[var(--dark-text)] transition hover:bg-slate-100 dark:hover:bg-[var(--dark-surface-alt)] hover:text-[#cda22b]"
            >
              ⊕ Create New Opportunity
            </Link>
            <Link
              href="/admin/investors"
              className="block rounded-lg border border-slate-200 dark:border-[var(--dark-border)] bg-slate-50 dark:bg-[var(--dark-surface-alt)] px-4 py-3 text-sm font-medium text-[#7d471e] dark:text-[var(--dark-text)] transition hover:bg-slate-100 dark:hover:bg-[var(--dark-surface-alt)] hover:text-[#cda22b]"
            >
              ○ Add New Investor
            </Link>
            <Link
              href="/admin/analytics"
              className="block rounded-lg border border-slate-200 dark:border-[var(--dark-border)] bg-slate-50 dark:bg-[var(--dark-surface-alt)] px-4 py-3 text-sm font-medium text-[#7d471e] dark:text-[var(--dark-text)] transition hover:bg-slate-100 dark:hover:bg-[var(--dark-surface-alt)] hover:text-[#cda22b]"
            >
              ▥ View Detailed Analytics
            </Link>
          </div>
        </div>

        {/* Recent Investors */}
        <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
              Recent Investors
            </h3>
            <Link
              href="/admin/investors"
              className="text-xs text-[#cda22b] hover:underline"
            >
              View All →
            </Link>
          </div>
          {recentInvestors.length === 0 ? (
            <p className="mt-4 text-xs text-[#7d471e] dark:text-[var(--dark-text)]">
              No investors yet. Add your first investor to get started.
            </p>
          ) : (
            <div className="mt-4 space-y-2">
              {recentInvestors.map((inv) => {
                const opp =
                  inv.opportunityId &&
                  db.opportunities.find((o) => o.id === inv.opportunityId);
                return (
                  <div
                    key={inv.id}
                    className="rounded-lg border border-slate-200 dark:border-[var(--dark-border)] bg-slate-50 dark:bg-[var(--dark-surface-alt)] p-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-medium text-[#7d471e] dark:text-[var(--dark-text)]">
                          {inv.name}
                        </div>
                        <div className="mt-1 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                          +{inv.countryCode} {inv.mobile}
                        </div>
                        {opp && (
                          <div className="mt-1 text-xs text-[#7d471e] dark:text-[var(--dark-text)]">
                            {opp.name}
                          </div>
                        )}
                      </div>
                      <a
                        href={inv.uniqueLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#cda22b] hover:underline"
                      >
                        View Link →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
