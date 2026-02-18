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
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/opportunities", label: "Opportunities", icon: "💼" },
    { href: "/admin/investors", label: "Investors", icon: "👥" },
    { href: "/admin/analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#7d471e] dark:text-[#c9a86c] dark:bg-black dark:text-[#d4b896]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-zinc-600 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#cda22b]">
              Finjan.vc
            </p>
            <h1 className="mt-1 text-xl font-semibold text-[#7d471e] dark:text-[#c9a86c]">
              Investment Distribution Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Manage investors, opportunities, personalized links and WhatsApp
              outreach.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="text-right text-xs text-slate-600 dark:text-slate-400">
              <div className="font-medium text-[#7d471e] dark:text-[#c9a86c]">
                {db.opportunities.length} Opportunities
              </div>
              <div>{db.investors.length} Investors</div>
            </div>
            <span className="rounded-full border border-slate-300 dark:border-zinc-600 bg-slate-50 dark:bg-zinc-700 px-3 py-1 text-xs text-[#7d471e] dark:text-[#c9a86c]">
              Private Admin
            </span>
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-zinc-600 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 px-4 py-2 text-sm font-medium text-[#7d471e] dark:text-[#c9a86c] transition hover:bg-slate-50 dark:hover:bg-zinc-600 hover:text-[#cda22b] dark:hover:text-[#cda22b]"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
