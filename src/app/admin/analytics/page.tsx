import { readDb } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
  const db = readDb();

  const totalStats = {
    totalClicks: db.analytics.reduce((sum, a) => sum + a.totalClicks, 0),
    totalCtaClicks: db.analytics.reduce((sum, a) => sum + a.ctaClicks, 0),
    totalMobileClicks: db.analytics.reduce((sum, a) => sum + a.mobileClicks, 0),
    totalDesktopClicks: db.analytics.reduce((sum, a) => sum + a.desktopClicks, 0),
    investorsWithClicks: db.analytics.filter((a) => a.totalClicks > 0).length,
  };

  const conversionRate =
    totalStats.totalClicks > 0
      ? Math.round((totalStats.totalCtaClicks / totalStats.totalClicks) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c]">Analytics Dashboard</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Track engagement, clicks, and conversions for each investor's unique link.
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
            Total Clicks
          </div>
          <div className="mt-2 text-2xl font-semibold text-[#7d471e] dark:text-[#c9a86c]">
            {totalStats.totalClicks}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
            CTA Clicks
          </div>
          <div className="mt-2 text-2xl font-semibold text-[#cda22b]">
            {totalStats.totalCtaClicks}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
            Conversion Rate
          </div>
          <div className="mt-2 text-2xl font-semibold text-[#7d471e] dark:text-[#c9a86c]">
            {conversionRate}%
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
            Mobile Clicks
          </div>
          <div className="mt-2 text-2xl font-semibold text-[#7d471e] dark:text-[#c9a86c]">
            {totalStats.totalMobileClicks}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
            Desktop Clicks
          </div>
          <div className="mt-2 text-2xl font-semibold text-[#7d471e] dark:text-[#c9a86c]">
            {totalStats.totalDesktopClicks}
          </div>
        </div>
      </div>

      {/* Per-Investor Analytics */}
      <div className="rounded-2xl border border-slate-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 p-5">
        <h3 className="text-sm font-semibold text-[#7d471e] dark:text-[#c9a86c]">
          Per-Investor Analytics
        </h3>
        {db.investors.length === 0 ? (
          <p className="mt-3 text-xs text-[#7d471e] dark:text-[#c9a86c]0">
            No investors yet. Add investors to start tracking analytics.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-600">
              <table className="min-w-full border-separate border-spacing-0 text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-zinc-700/50 text-slate-600 dark:text-slate-400">
                    <th className="px-3 py-2 text-left font-medium">Investor</th>
                    <th className="px-3 py-2 text-left font-medium">Total Clicks</th>
                    <th className="px-3 py-2 text-left font-medium">CTA Clicks</th>
                    <th className="px-3 py-2 text-left font-medium">Mobile</th>
                    <th className="px-3 py-2 text-left font-medium">Desktop</th>
                    <th className="px-3 py-2 text-left font-medium">First Click</th>
                    <th className="px-3 py-2 text-left font-medium">Last Click</th>
                  </tr>
                </thead>
                <tbody>
                  {db.investors.map((inv) => {
                    const analytics = db.analytics.find((a) => a.investorId === inv.id);
                    const stats = analytics || {
                      totalClicks: 0,
                      ctaClicks: 0,
                      mobileClicks: 0,
                      desktopClicks: 0,
                      firstClickAt: null,
                      lastClickAt: null,
                    };

                    return (
                      <tr key={inv.id} className="border-t border-slate-200 dark:border-zinc-600">
                        <td className="px-3 py-2 text-[#7d471e] dark:text-[#c9a86c] font-medium">
                          {inv.name}
                        </td>
                        <td className="px-3 py-2 text-[#7d471e] dark:text-[#c9a86c]">
                          {stats.totalClicks}
                        </td>
                        <td className="px-3 py-2 text-[#cda22b]">
                          {stats.ctaClicks}
                        </td>
                        <td className="px-3 py-2 text-slate-600 dark:text-slate-400">
                          {stats.mobileClicks}
                        </td>
                        <td className="px-3 py-2 text-slate-600 dark:text-slate-400">
                          {stats.desktopClicks}
                        </td>
                        <td className="px-3 py-2 text-[#7d471e] dark:text-[#c9a86c]0">
                          {stats.firstClickAt
                            ? new Date(stats.firstClickAt).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-3 py-2 text-[#7d471e] dark:text-[#c9a86c]0">
                          {stats.lastClickAt
                            ? new Date(stats.lastClickAt).toLocaleDateString()
                            : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Note about tracking */}
      <div className="rounded-xl border border-slate-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 p-4">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          <strong className="text-[#7d471e] dark:text-[#c9a86c]">Note:</strong> Analytics tracking is
          implemented and ready. When visitors click on unique investor links (with{" "}
          <code className="rounded bg-slate-950 px-1 py-0.5 text-[#cda22b]">
            ?ref=
          </code>
          ), their activity will be logged automatically. CTA button clicks on the
          landing page are also tracked.
        </p>
      </div>
    </div>
  );
}
