"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { translations, type Locale } from "@/lib/translations";
import { SAUDI_RIYAL_EN, SAUDI_RIYAL_AR, QATARI_RIYAL_EN, QATARI_RIYAL_AR } from "@/lib/constants";
import { qarToUsd, sarToUsd } from "@/lib/currency";
import LanguageToggle from "@/components/LanguageToggle";
import SetRtl from "@/components/SetRtl";

const PRIMARY_WHATSAPP_INTEREST =
  "https://wa.me/97455518955?text=Hi%20there%20Im%20interested%20in%20this%20deal";

const FINJAN_WHATSAPP = "https://wa.me/97455518955";

type InvestmentLandingProps = {
  refCode: string | null;
  lang: Locale;
};

export default function InvestmentLanding({
  refCode,
  lang,
}: InvestmentLandingProps) {
  const searchParams = useSearchParams();

  const liveLang = useMemo<Locale>(() => {
    const p = searchParams?.get("lang");
    if (p === "ar") return "ar";
    if (p === "en") return "en";
    return lang;
  }, [searchParams, lang]);

  const liveRefCode = useMemo(() => {
    const p = searchParams?.get("ref");
    return p ?? refCode;
  }, [searchParams, refCode]);

  const t = translations[liveLang];
  const isRtl = liveLang === "ar";
  const SAUDI_RIYAL = liveLang === "ar" ? SAUDI_RIYAL_AR : SAUDI_RIYAL_EN;
  const QATARI_RIYAL = liveLang === "ar" ? QATARI_RIYAL_AR : QATARI_RIYAL_EN;

  return (
    <div
      className="min-h-screen bg-white text-[#7d471e]"
      dir={isRtl ? "rtl" : "ltr"}
      lang={liveLang}
    >
      <SetRtl lang={liveLang} />
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-8 md:px-8 lg:px-12">
        {/* Top nav / brand */}
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src="/finjan-logo.png"
                alt="Finjan Logo"
                fill
                className="object-contain"
                priority
                sizes="64px"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#cda22b]">
                Finjan.vc
              </p>
              <p className="text-sm text-slate-600">{t.brandTagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium text-[#7d471e]">
            <LanguageToggle currentLang={liveLang} refCode={liveRefCode} />
            <span className="hidden rounded-full border border-slate-300 bg-white px-3 py-1 md:inline-block">
              {t.professionalOnly}
            </span>
            {liveRefCode && (
              <span className="hidden rounded-full border border-emerald-300 bg-white px-3 py-1 text-[#cda22b] md:inline-block">
                {t.personalizedLink} {liveRefCode}
              </span>
            )}
          </div>
        </header>

        {/* Hero */}
        <main className="mt-10 grid flex-1 gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
          <section className="space-y-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-[#cda22b]">
              <span className="h-1.5 w-1.5 rounded-full bg-white0 animate-pulse" />
              {t.liveBadge}
            </div>
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#7d471e] sm:text-5xl lg:text-6xl">
                {t.heroTitle1}{" "}
                <span className="bg-gradient-to-r from-[#cda22b] via-[#9db47e] to-[#9db47e] bg-clip-text text-transparent">
                  {t.heroTitle2}
                </span>
                : {t.heroTitle3}{" "}
                <span className="bg-gradient-to-r from-[#cda22b] via-[#9db47e] to-[#9db47e] bg-clip-text text-transparent">
                  {t.heroTitle4}
                </span>
              </h1>
              <p className="max-w-xl text-pretty text-base text-[#7d471e] sm:text-lg">
                {t.heroDesc}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={PRIMARY_WHATSAPP_INTEREST}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-700"
              >
                {t.expressInterest}
              </a>
              <div className="flex flex-col text-xs text-slate-600">
                <span>{t.directConversation}</span>
                <span className="text-[#7d471e]0">{t.noObligation}</span>
              </div>
            </div>

            {/* Ticket & Pricing - Finjan's investment terms (QAR) */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#7d471e]">
                {t.ticketPricingTitle}
              </h2>
              <p className="text-lg font-medium text-[#7d471e]">{t.ticketCount}</p>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="grid border-b border-slate-200 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                  {/* Key figures */}
                  <div className="border-slate-200 bg-slate-50/50 p-5 md:border-e">
                    <div className="space-y-3">
                      <div className="flex justify-between gap-4 md:flex-col">
                        <span className="text-xs uppercase tracking-[0.15em] text-slate-600">
                          {t.ticketLabel}
                        </span>
                        <span className="text-lg font-semibold tabular-nums text-[#7d471e]">
                          {QATARI_RIYAL} 25,000 <span className="text-sm font-normal text-slate-500">({qarToUsd(25000)})</span>
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 border-t border-slate-200 pt-3 md:flex-col">
                        <span className="text-xs uppercase tracking-[0.15em] text-slate-600">
                          {t.netInvestLabel}
                        </span>
                        <span className="text-lg font-semibold tabular-nums text-[#7d471e]">
                          {QATARI_RIYAL} 21,900 <span className="text-sm font-normal text-slate-500">({qarToUsd(21900)})</span>
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 border-t border-slate-200 pt-3 md:flex-col">
                        <span className="text-xs uppercase tracking-[0.15em] text-slate-600">
                          {t.spvLabel}
                        </span>
                        <span className="text-lg font-semibold tabular-nums text-[#7d471e]">
                          {QATARI_RIYAL} 3,100 <span className="text-sm font-normal text-slate-500">({qarToUsd(3100)})</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Pricing scenarios */}
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[280px] border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/50">
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-600" />
                          <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#7d471e]">
                            {t.scenarioF}
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#7d471e]">
                            {t.scenarioG}
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#7d471e]">
                            {t.scenarioW}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-[#7d471e]">
                        <tr className="border-b border-slate-100">
                          <td className="px-4 py-3 text-slate-600">
                            {t.mgmtPctLabel}
                          </td>
                          <td className="px-4 py-3 text-center tabular-nums">
                            3.75%
                          </td>
                          <td className="px-4 py-3 text-center tabular-nums">
                            4.50%
                          </td>
                          <td className="px-4 py-3 text-center tabular-nums">
                            7.50%
                          </td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="px-4 py-3 text-slate-600">
                            {t.mgmtQafLabel}
                          </td>
                          <td className="px-4 py-3 text-center tabular-nums">
                            {QATARI_RIYAL} 937.5 <span className="text-slate-500">({qarToUsd(937.5)})</span>
                          </td>
                          <td className="px-4 py-3 text-center tabular-nums">
                            {QATARI_RIYAL} 1,125 <span className="text-slate-500">({qarToUsd(1125)})</span>
                          </td>
                          <td className="px-4 py-3 text-center tabular-nums">
                            {QATARI_RIYAL} 1,875 <span className="text-slate-500">({qarToUsd(1875)})</span>
                          </td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="px-4 py-3 text-slate-600">
                            {t.ticketLabel}
                          </td>
                          <td className="px-4 py-3 text-center tabular-nums">
                            {QATARI_RIYAL} 25,000 <span className="text-slate-500">({qarToUsd(25000)})</span>
                          </td>
                          <td className="px-4 py-3 text-center tabular-nums">
                            {QATARI_RIYAL} 25,000 <span className="text-slate-500">({qarToUsd(25000)})</span>
                          </td>
                          <td className="px-4 py-3 text-center tabular-nums">
                            {QATARI_RIYAL} 25,000 <span className="text-slate-500">({qarToUsd(25000)})</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-[#7d471e]">
                            {t.totalTicketLabel}
                          </td>
                          <td className="px-4 py-3 text-center tabular-nums font-semibold text-[#cda22b]">
                            {QATARI_RIYAL} 25,937.5 <span className="text-slate-500 font-normal">({qarToUsd(25937.5)})</span>
                          </td>
                          <td className="px-4 py-3 text-center tabular-nums font-semibold text-[#cda22b]">
                            {QATARI_RIYAL} 26,125 <span className="text-slate-500 font-normal">({qarToUsd(26125)})</span>
                          </td>
                          <td className="px-4 py-3 text-center tabular-nums font-semibold text-[#cda22b]">
                            {QATARI_RIYAL} 26,875 <span className="text-slate-500 font-normal">({qarToUsd(26875)})</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Round Overview - Finjan's round (no Madak metrics here) */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#7d471e]">
                {t.roundOverview}
              </h2>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-600">
                  {t.currentRound}
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{t.preValuation}</span>
                    <span className="text-lg font-semibold text-[#7d471e]">
                      $10M
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{t.postValuation}</span>
                    <span className="text-lg font-semibold text-[#7d471e]">
                      $10.32M
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-2">
                    <span className="text-sm font-medium text-[#cda22b]">
                      {t.fundraisingAsk}
                    </span>
                    <span className="text-xl font-bold text-[#cda22b]">
                      $320K
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ——— OVERVIEW OF MADAK ——— Clear break between Finjan's terms and Madak's details */}
            <div
              role="separator"
              aria-label={t.overviewOfMadak}
              className="border-t-2 border-b-2 border-slate-400 bg-slate-200/60 px-6 py-8"
            >
              <h2 className="text-3xl font-bold tracking-tight text-[#7d471e] sm:text-4xl">
                {t.overviewOfMadak}
              </h2>
              <p className="mt-3 max-w-2xl text-base font-bold leading-relaxed text-slate-800">
                {t.madakSectionSubtitle}
              </p>
            </div>

            {/* Madak's Key Metrics - first section under Overview of Madak */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-[#7d471e]">
                {t.madakKeyMetrics}
              </h3>
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-[#7d471e]0">{t.revenue}</div>
                  <div className="text-sm font-semibold text-[#7d471e]">
                    {SAUDI_RIYAL} 260K <span className="text-slate-500 font-normal">({sarToUsd(260000)})</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e]0">{t.gmv}</div>
                  <div className="text-sm font-semibold text-[#7d471e]">
                    {SAUDI_RIYAL} 4M <span className="text-slate-500 font-normal">({sarToUsd(4000000)})</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e]0">{t.ltv}</div>
                  <div className="text-sm font-semibold text-[#7d471e]">
                    {SAUDI_RIYAL} 7,000 <span className="text-slate-500 font-normal">({sarToUsd(7000)})</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e]0">CAC</div>
                  <div className="text-sm font-semibold text-[#7d471e]">
                    {SAUDI_RIYAL} 200 <span className="text-slate-500 font-normal">({sarToUsd(200)})</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e]0">{t.grossMargin}</div>
                  <div className="text-sm font-semibold text-[#7d471e]">10%</div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e]0">{t.burnRate}</div>
                  <div className="text-sm font-semibold text-[#7d471e]">
                    {SAUDI_RIYAL} 100K/mo <span className="text-slate-500 font-normal">({sarToUsd(100000)}/mo)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Highlights - Madak platform (4 cards, balanced) */}
            <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-200 bg-white p-4 text-center">
                <div className="text-2xl font-bold text-[#cda22b]">1st</div>
                <div className="mt-1 text-xs text-slate-600">{t.licensedPlatform}</div>
                <div className="mt-0.5 text-xs text-slate-500">{t.inSaudiArabia}</div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center">
                <div className="text-2xl font-bold text-[#7d471e]">100%</div>
                <div className="mt-1 text-xs text-slate-600">{t.digitalPlatform}</div>
                <div className="mt-0.5 text-xs text-slate-500">{t.fullyAutomated}</div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center">
                <div className="text-2xl font-bold text-[#7d471e]">✓</div>
                <div className="mt-1 text-xs text-slate-600">{t.builtInLiquidity}</div>
                <div className="mt-0.5 text-xs text-slate-500">{t.resaleMarketplace}</div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center">
                <div className="text-2xl font-bold text-[#7d471e]">◎</div>
                <div className="mt-1 text-xs text-slate-600">{t.fractionalOwnership}</div>
                <div className="mt-0.5 text-xs text-slate-500">{t.fractionalSubtext}</div>
              </div>
            </div>

            {/* Traction Metrics */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e]">
                {t.madakProvenTraction}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative overflow-hidden rounded-xl border border-emerald-200 bg-white p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#cda22b]">
                    {t.platformUsers}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#cda22b]">
                    13,000+
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    {t.growingUserBase}
                  </div>
                  <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-emerald-200/50 blur-2xl" />
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-600">
                    {t.activeInvestors}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e]">700+</div>
                  <div className="mt-1 text-xs text-slate-600">
                    {t.engagedInvestors}
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-600">
                    {t.gmv}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e]">
                    {SAUDI_RIYAL} 2.6M <span className="text-sm font-normal text-slate-500">({sarToUsd(2600000)})</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    {t.grossMerchandiseValue}
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-600">
                    {t.retentionRate}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e]">60%</div>
                  <div className="mt-1 text-xs text-slate-600">
                    {t.strongRetention}
                  </div>
                </div>
              </div>
            </section>

            {/* Investment Performance */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e]">
                {t.madakInvestmentPerformance}
              </h3>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#cda22b]">
                      {SAUDI_RIYAL} 3.18M <span className="text-sm font-normal text-slate-500">({sarToUsd(3180000)})</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-600">
                      {t.raisedAcross}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#cda22b]">10%</div>
                    <div className="mt-2 text-xs text-slate-600">
                      {t.returnsDelivered}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#cda22b]">1,070+</div>
                    <div className="mt-2 text-xs text-slate-600">
                      {t.investorsParticipated}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center rounded-lg bg-slate-50 px-4 py-2">
                  <span className="text-xs text-slate-600">
                    {t.fastestClosed}
                  </span>
                </div>
              </div>
            </section>

            {/* Unit Economics */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e]">
                {t.madakUnitEconomics}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-emerald-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.15em] text-slate-600">
                        CAC
                      </div>
                      <div className="mt-1 text-2xl font-bold text-[#cda22b]">
                        {SAUDI_RIYAL} 224 <span className="text-sm font-normal text-slate-500">({sarToUsd(224)})</span>
                      </div>
                    </div>
                    <div className="text-lg text-[#cda22b]">▥</div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                      style={{ width: "45%" }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    {t.lowCac}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.15em] text-slate-600">
                        {t.marketingEfficiency}
                      </div>
                      <div className="mt-1 text-2xl font-bold text-[#7d471e]">17x</div>
                    </div>
                    <div className="text-lg text-[#7d471e]">↑</div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    {t.sarRaisedPerSpent}
                  </div>
                </div>
              </div>
            </section>

            {/* Problem & Solution */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e]">
                {t.problemMadakSolves}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-red-200 bg-white p-5">
                  <div className="mb-2 text-base text-red-600">×</div>
                  <p className="text-sm font-semibold text-red-700">
                    {t.forInvestors}
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#7d471e]">
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{t.problemInvestors1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{t.problemInvestors2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{t.problemInvestors3}</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-orange-200 bg-white p-5">
                  <div className="mb-2 text-base text-red-600">×</div>
                  <p className="text-sm font-semibold text-orange-700">
                    {t.forDevelopers}
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#7d471e]">
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{t.problemDevs1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{t.problemDevs2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{t.problemDevs3}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Solution */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e]">{t.madakSolution}</h3>
              <div className="rounded-xl border border-emerald-200 bg-white p-5">
                <div className="mb-3 text-lg text-emerald-600">✓</div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-[#cda22b]">
                      {t.forInvestors}
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm text-[#7d471e]">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-emerald-400">✓</span>
                        <span>{t.solutionInvestors1}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-emerald-400">✓</span>
                        <span>{t.solutionInvestors2}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-emerald-400">✓</span>
                        <span>{t.solutionInvestors3}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-emerald-400">✓</span>
                        <span>{t.solutionInvestors4}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#cda22b]">
                      {t.forDevelopers}
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm text-[#7d471e]">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-emerald-400">✓</span>
                        <span>{t.solutionDevs1}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-emerald-400">✓</span>
                        <span>{t.solutionDevs2}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-emerald-400">✓</span>
                        <span>{t.solutionDevs3}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Market Opportunity */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e]">
                {t.madakMarketOpportunity}
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-600">
                    {t.globalMarket}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e]">
                    {SAUDI_RIYAL} 37T <span className="text-slate-500 font-normal">({sarToUsd(37_000_000_000_000)})</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    {t.annualTransactionVolume}
                  </div>
                  <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-slate-800/50 blur-xl" />
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-600">
                    {t.gccMarket}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e]">
                    {SAUDI_RIYAL} 1.3T <span className="text-slate-500 font-normal">({sarToUsd(1_300_000_000_000)})</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    {t.realEstateMarketSize}
                  </div>
                  <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-slate-800/50 blur-xl" />
                </div>
                <div className="relative overflow-hidden rounded-xl border border-emerald-200 bg-white p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#cda22b]">
                    {t.saudiMarket}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#cda22b]">
                    {SAUDI_RIYAL} 400B <span className="text-slate-500 font-normal">({sarToUsd(400_000_000_000)})</span>
                  </div>
                  <div className="mt-1 text-xs text-[#cda22b]/70">
                    {t.annualTransactions}
                  </div>
                  <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-white blur-xl" />
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-xs text-slate-600">
                  {t.marketTrends}
                </div>
              </div>
            </section>

            {/* Business Model */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e]">{t.madakBusinessModel}</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-2 text-lg text-[#7d471e]">◎</div>
                  <div className="text-sm font-semibold text-[#7d471e]">
                    {t.transactionCommissions}
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    {t.revenueFromTransactions}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-2 text-lg text-[#7d471e]">▫</div>
                  <div className="text-sm font-semibold text-[#7d471e]">
                    {t.platformSubscriptions}
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    {t.recurringRevenue}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-2 text-lg text-[#7d471e]">▥</div>
                  <div className="text-sm font-semibold text-[#7d471e]">
                    {t.ownershipShareFees}
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    {t.feesFromManagement}
                  </div>
                </div>
              </div>
            </section>

            {/* Competitive Advantage */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e]">
                {t.madakCompetitiveAdvantages}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-emerald-200 bg-white p-5">
                  <div className="mb-1.5 text-sm font-semibold text-[#cda22b]">
                    {t.regulatoryAdvantage}
                  </div>
                  <div className="text-sm text-[#7d471e]">
                    {t.regulatoryAdvantageDesc}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-1.5 text-sm font-semibold text-[#7d471e]">
                    {t.liquidityAdvantage}
                  </div>
                  <div className="text-sm text-[#7d471e]">
                    {t.liquidityAdvantageDesc}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-1.5 text-sm font-semibold text-[#7d471e]">
                    {t.technologyAdvantage}
                  </div>
                  <div className="text-sm text-[#7d471e]">
                    {t.technologyAdvantageDesc}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-1.5 text-sm font-semibold text-[#7d471e]">
                    {t.marketAdvantage}
                  </div>
                  <div className="text-sm text-[#7d471e]">
                    {t.marketAdvantageDesc}
                  </div>
                </div>
              </div>
            </section>

            {/* Growth Strategy */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e]">{t.madakGrowthStrategy}</h3>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-3">
                  <div className="text-base text-[#7d471e]">●</div>
                  <div className="flex-1 space-y-3">
                    <div className="text-sm text-[#7d471e]">
                      {t.growth1}
                    </div>
                    <div className="text-sm text-[#7d471e]">
                      {t.growth2}
                    </div>
                    <div className="text-sm text-[#7d471e]">
                      {t.growth3}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Investment Thesis */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e]">{t.investmentThesis}</h3>
              <div className="rounded-xl border border-emerald-200 bg-white p-5">
                <div className="mb-3 text-sm font-semibold text-[#cda22b]">
                  {t.whyInvest}
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e]">{t.thesis1}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e]">{t.thesis2}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e]">{t.thesis3}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e]">{t.thesis4}</span>
                  </div>
                  <div className="flex items-start gap-2 md:col-span-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e]">{t.thesis5}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Team */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e]">{t.madakFoundingTeam}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src="/team/hussain-hamed-aldeen.png"
                        alt="Hussain Hameed Aldeen"
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#7d471e]">
                        Hussain Hameed Aldeen
                      </p>
                      <p className="text-xs text-slate-600">{t.hussainTitle}</p>
                      <a
                        href="https://www.linkedin.com/in/hn1na1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs text-[#0a66c2] hover:underline"
                      >
                        {t.viewLinkedIn} →
                      </a>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-[#7d471e]">
                    {t.hussainBio}
                  </p>
                </div>
                <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src="/team/abdulaziz-alardi.png"
                        alt="Abdulaziz Alardi"
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#7d471e]">
                        Abdulaziz Alardi
                      </p>
                      <p className="text-xs text-slate-600">{t.abdulazizTitle}</p>
                      <a
                        href="https://www.linkedin.com/in/abdulaziz-alardi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs text-[#0a66c2] hover:underline"
                      >
                        {t.viewLinkedIn} →
                      </a>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-[#7d471e]">
                    {t.abdulazizBio}
                  </p>
                </div>
              </div>
            </section>

            {/* Risk & Mitigation */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e]">
                {t.madakRiskMitigation}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold text-[#7d471e]">{t.keyRisks}</p>
                  <ul className="mt-3 space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>{t.risk1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>{t.risk2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>{t.risk3}</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold text-[#7d471e]">
                    {t.mitigationLevers}
                  </p>
                  <ul className="mt-3 space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>{t.mitigation1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>{t.mitigation2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>{t.mitigation3}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-[#7d471e]0">{t.riskDisclaimer}</p>
            </section>
          </section>

          {/* Right column – highlight card & final CTA */}
          <aside className="space-y-6 lg:sticky lg:top-10">
            <div className="rounded-3xl border border-emerald-300 bg-white p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#cda22b]">
                {t.dealSnapshot}
              </p>
              <div className="mt-5 space-y-3 text-sm text-[#7d471e]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">{t.preValuation}</span>
                  <span className="font-medium text-[#7d471e]">$10M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">{t.postValuation}</span>
                  <span className="font-medium text-[#7d471e]">$10.32M</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                  <span className="text-slate-600">{t.fundraisingAsk}</span>
                  <span className="text-lg font-bold text-[#cda22b]">$320K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">{t.status}</span>
                  <span className="font-medium text-[#cda22b]">
                    {t.openForInterest}
                  </span>
                </div>
              </div>
              <a
                href={PRIMARY_WHATSAPP_INTEREST}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-400/40 transition hover:bg-emerald-700"
              >
                {t.expressInterestWhatsApp}
              </a>
              <p className="mt-3 text-[11px] leading-relaxed text-[#7d471e]0">
                {t.whatsappRedirectNote}
              </p>
            </div>

            {/* Final Call To Action */}
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-6">
              <h2 className="text-lg font-semibold text-[#7d471e]">
                {t.connectWithFinjan}
              </h2>
              <p className="mt-2 text-sm text-[#7d471e]">{t.connectDesc}</p>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={FINJAN_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-emerald-300 bg-white px-6 py-2.5 text-sm font-semibold text-[#cda22b] transition hover:bg-white"
                >
                  {t.connectWithUs}
                </a>
                <div className="space-y-1 text-xs text-[#7d471e]">
                  <p>
                    {t.website}{" "}
                    <Link
                      href="https://www.finjan.vc"
                      className="text-[#cda22b] underline underline-offset-4"
                    >
                      www.Finjan.vc
                    </Link>
                  </p>
                  <p>
                    {t.email}{" "}
                    <a
                      href="mailto:info@finjan.vc"
                      className="text-[#cda22b] underline underline-offset-4"
                    >
                      info@finjan.vc
                    </a>
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[11px] text-[#7d471e]0">{t.legalDisclaimer}</p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
