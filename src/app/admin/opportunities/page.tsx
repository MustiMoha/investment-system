import { createOpportunity } from "../actions";
import { readDb } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function OpportunitiesPage() {
  const db = readDb();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#7d471e]">Manage Opportunities</h2>
        <p className="mt-1 text-sm text-slate-600">
          Create and manage investment opportunities that investors can be assigned to.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* Create Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-[#7d471e]">
            Create Opportunity
          </h3>
          <p className="mt-1 text-xs text-slate-600">
            Define a new investment opportunity to link investors against.
          </p>
          <form action={createOpportunity} className="mt-4 space-y-3">
            <div className="space-y-1 text-sm">
              <label className="text-[#7d471e]">Name</label>
              <input
                required
                name="name"
                placeholder="e.g. Gulf Growth Opportunity Fund I"
                className="w-full rounded-lg border border-slate-700 bg-slate-50 px-3 py-2 text-sm text-[#7d471e] outline-none ring-emerald-500/40 focus:ring-2"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="text-[#7d471e]">
                Slug (optional, URL-safe)
              </label>
              <input
                name="slug"
                placeholder="gulf-growth-fund-i"
                className="w-full rounded-lg border border-slate-700 bg-slate-50 px-3 py-2 text-sm text-[#7d471e] outline-none ring-emerald-500/40 focus:ring-2"
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-300"
            >
              Save Opportunity
            </button>
          </form>
        </div>

        {/* Opportunities List */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-[#7d471e]">
            All Opportunities
          </h3>
          {db.opportunities.length === 0 ? (
            <p className="mt-3 text-xs text-[#7d471e]0">
              No opportunities yet. Create one to get started.
            </p>
          ) : (
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
              <table className="min-w-full border-separate border-spacing-0 text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600">
                    <th className="px-3 py-2 text-left font-medium">Name</th>
                    <th className="px-3 py-2 text-left font-medium">Slug</th>
                    <th className="px-3 py-2 text-left font-medium">Investors</th>
                    <th className="px-3 py-2 text-left font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {db.opportunities.map((o) => {
                    const investorCount = db.investors.filter(
                      (i) => i.opportunityId === o.id,
                    ).length;
                    return (
                      <tr key={o.id} className="border-t border-slate-200">
                        <td className="px-3 py-2 text-[#7d471e] font-medium">
                          {o.name}
                        </td>
                        <td className="px-3 py-2 text-slate-600">{o.slug}</td>
                        <td className="px-3 py-2 text-slate-600">
                          {investorCount} investor{investorCount !== 1 ? "s" : ""}
                        </td>
                        <td className="px-3 py-2 text-[#7d471e]0">
                          {new Date(o.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
