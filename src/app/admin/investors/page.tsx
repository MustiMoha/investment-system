import { createInvestor, regenerateLink } from "../actions";
import { readDb } from "@/lib/data";

const COUNTRIES = [
  { code: "974", label: "Qatar (+974)", flag: "🇶🇦" },
  { code: "971", label: "UAE (+971)", flag: "🇦🇪" },
  { code: "966", label: "Saudi (+966)", flag: "🇸🇦" },
  { code: "965", label: "Kuwait (+965)", flag: "🇰🇼" },
  { code: "1", label: "USA (+1)", flag: "🇺🇸" },
  { code: "44", label: "UK (+44)", flag: "🇬🇧" },
];

export const dynamic = "force-dynamic";

export default function InvestorsPage() {
  const db = readDb();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">Manage Investors</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-[var(--dark-text-muted)]">
          Add investors and generate unique, trackable investment links for each one.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* Create Form */}
        <div className="rounded-2xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
          <h3 className="text-sm font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">Add Investor</h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
            Capture investor details and instantly generate a unique, trackable link.
          </p>
          <form action={createInvestor} className="mt-4 space-y-3">
            <div className="space-y-1 text-sm">
              <label className="text-[#7d471e] dark:text-[var(--dark-text)]">Investor Name</label>
              <input
                required
                name="name"
                placeholder="Full name"
                className="w-full rounded-lg border border-slate-700 dark:border-[var(--dark-border)] bg-slate-50 dark:bg-[var(--dark-surface-alt)] px-3 py-2 text-sm text-[#7d471e] dark:text-[var(--dark-text)] outline-none ring-emerald-500/40 focus:ring-2"
              />
            </div>
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              <div className="space-y-1 text-sm">
                <label className="text-[#7d471e] dark:text-[var(--dark-text)]">Country Code</label>
                <select
                  required
                  name="countryCode"
                  className="w-full rounded-lg border border-slate-700 dark:border-[var(--dark-border)] bg-slate-50 dark:bg-[var(--dark-surface-alt)] px-3 py-2 text-sm text-[#7d471e] dark:text-[var(--dark-text)] outline-none ring-emerald-500/40 focus:ring-2"
                >
                  <option value="">Select</option>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1 text-sm">
                <label className="text-[#7d471e] dark:text-[var(--dark-text)]">Mobile Number</label>
                <input
                  required
                  name="mobile"
                  placeholder="Without leading 0"
                  className="w-full rounded-lg border border-slate-700 dark:border-[var(--dark-border)] bg-slate-50 dark:bg-[var(--dark-surface-alt)] px-3 py-2 text-sm text-[#7d471e] dark:text-[var(--dark-text)] outline-none ring-emerald-500/40 focus:ring-2"
                />
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <label className="text-[#7d471e] dark:text-[var(--dark-text)]">Assign Opportunity</label>
              <select
                name="opportunityId"
                className="w-full rounded-lg border border-slate-700 dark:border-[var(--dark-border)] bg-slate-50 dark:bg-[var(--dark-surface-alt)] px-3 py-2 text-sm text-[#7d471e] dark:text-[var(--dark-text)] outline-none ring-emerald-500/40 focus:ring-2"
              >
                <option value="">Unassigned</option>
                {db.opportunities.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1 text-sm">
              <label className="text-[#7d471e] dark:text-[var(--dark-text)]">Notes (optional)</label>
              <textarea
                name="notes"
                rows={2}
                placeholder="Investor preferences, ticket size, etc."
                className="w-full rounded-lg border border-slate-700 dark:border-[var(--dark-border)] bg-slate-50 dark:bg-[var(--dark-surface-alt)] px-3 py-2 text-sm text-[#7d471e] dark:text-[var(--dark-text)] outline-none ring-emerald-500/40 focus:ring-2"
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              Save Investor & Generate Link
            </button>
          </form>
        </div>

        {/* Investors List */}
        <div className="rounded-2xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
          <h3 className="text-sm font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
            All Investors & Unique Links
          </h3>
          {db.investors.length === 0 ? (
            <p className="mt-3 text-xs text-[#7d471e] dark:text-[var(--dark-text)]">
              No investors yet. Use the form to add your first investor and generate a
              personalized link.
            </p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-[var(--dark-border)]">
                <table className="min-w-full border-separate border-spacing-0 text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[var(--dark-surface-alt)] text-slate-600 dark:text-[var(--dark-text-muted)]">
                      <th className="px-3 py-2 text-left font-medium">Investor</th>
                      <th className="px-3 py-2 text-left font-medium">Mobile</th>
                      <th className="px-3 py-2 text-left font-medium">Opportunity</th>
                      <th className="px-3 py-2 text-left font-medium">Unique Link</th>
                      <th className="px-3 py-2 text-left font-medium">WhatsApp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {db.investors.map((inv) => {
                      const opp =
                        inv.opportunityId &&
                        db.opportunities.find((o) => o.id === inv.opportunityId);
                      const fullNumber = `${inv.countryCode}${inv.mobile}`;
                      const waUrl = `https://wa.me/${fullNumber}?text=${encodeURIComponent(
                        `Hello ${inv.name}, sharing with you this exclusive investment opportunity: ${inv.uniqueLink}`,
                      )}`;
                      return (
                        <tr
                          key={inv.id}
                          className="border-t border-slate-200 dark:border-[var(--dark-border)] align-top"
                        >
                          <td className="px-3 py-2 text-[#7d471e] dark:text-[var(--dark-text)]">
                            <div className="font-medium">{inv.name}</div>
                            {inv.notes && (
                              <div className="mt-0.5 text-[11px] text-[#7d471e] dark:text-[var(--dark-text)]">
                                {inv.notes}
                              </div>
                            )}
                          </td>
                          <td className="px-3 py-2 text-slate-600 dark:text-[var(--dark-text-muted)]">
                            +{inv.countryCode} {inv.mobile}
                          </td>
                          <td className="px-3 py-2 text-slate-600 dark:text-[var(--dark-text-muted)]">
                            {opp ? opp.name : "Unassigned"}
                          </td>
                          <td className="px-3 py-2">
                            <div className="max-w-xs break-all text-[11px] text-[#cda22b]">
                              <a
                                href={inv.uniqueLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {inv.uniqueLink}
                              </a>
                            </div>
                            <form
                              action={async () => {
                                "use server";
                                await regenerateLink(inv.id);
                              }}
                            >
                              <button
                                type="submit"
                                className="mt-1 text-[11px] text-[#7d471e] dark:text-[var(--dark-text)] underline underline-offset-2 hover:text-[#cda22b]"
                              >
                                Regenerate
                              </button>
                            </form>
                          </td>
                          <td className="px-3 py-2">
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-700"
                            >
                              Open WhatsApp
                            </a>
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
      </div>
    </div>
  );
}
