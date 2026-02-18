"use client";

// Investment landing page - Finjan / Madak / Falak
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { translations, type Locale } from "@/lib/translations";
import { SAUDI_RIYAL_EN, SAUDI_RIYAL_AR, QATARI_RIYAL_EN, QATARI_RIYAL_AR } from "@/lib/constants";
import { qarToUsd, sarToUsd } from "@/lib/currency";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import SetRtl from "@/components/SetRtl";

const PRIMARY_WHATSAPP_INTEREST =
  "https://wa.me/97455518955?text=" +
  encodeURIComponent(
    "Hello Finjan Team. I am confirming my interest in participating in this investment. Here are my details:\n\nName:\nEmail:"
  );

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
  const madakUrl =
    liveLang === "ar" ? "https://www.madak.app" : "https://www.madak.app/en";
  const SAUDI_RIYAL = liveLang === "ar" ? SAUDI_RIYAL_AR : SAUDI_RIYAL_EN;
  const QATARI_RIYAL = liveLang === "ar" ? QATARI_RIYAL_AR : QATARI_RIYAL_EN;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-emerald-50/20 text-[#7d471e] dark:from-black dark:via-zinc-950 dark:to-black dark:text-[#d4b896]"
      dir={isRtl ? "rtl" : "ltr"}
      lang={liveLang}
    >
      <SetRtl lang={liveLang} />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-8 md:px-8 lg:px-12">
        {/* Top-right: Language toggle + optional ref */}
        <div className="absolute top-4 right-4 flex items-center gap-3 md:right-8 lg:right-12">
          <ThemeToggle />
          {liveRefCode && (
            <span className="rounded-full border border-emerald-300 bg-white dark:bg-zinc-700 px-3 py-1 text-xs text-[#cda22b] dark:border-emerald-600 dark:bg-zinc-700 dark:text-[#cda22b]">
              {t.personalizedLink} {liveRefCode}
            </span>
          )}
          <LanguageToggle currentLang={liveLang} refCode={liveRefCode} />
        </div>

        {/* Center-aligned logos */}
        <header className="flex justify-center border-b border-slate-200 dark:border-zinc-500 pb-8 pt-2 bg-gradient-to-r from-transparent via-amber-50/40 to-transparent dark:border-zinc-500 dark:via-zinc-700/50">
          <div className="grid grid-cols-2 place-items-center md:flex md:flex-nowrap md:items-center md:justify-center gap-4 sm:gap-8 md:gap-14 lg:gap-20">
            <a href="https://finjan.vc" target="_blank" rel="noopener noreferrer" className="order-1 flex shrink-0 items-center justify-self-center md:justify-self-auto">
              <div className="relative h-12 w-12 shrink-0 sm:h-16 sm:w-16 md:h-[6.5rem] md:w-[6.5rem] lg:h-[7.8rem] lg:w-[7.8rem]">
                <Image
                  src="/finjan-logo.png"
                  alt="Finjan"
                  fill
                  className="object-contain"
                  priority
                  sizes="125px"
                />
              </div>
            </a>
            <a href={madakUrl} target="_blank" rel="noopener noreferrer" className="order-3 col-span-2 flex shrink-0 items-center justify-center md:order-2 md:col-span-1 md:justify-self-auto">
              <div className="relative h-10 w-14 shrink-0 sm:h-14 sm:w-20 md:h-24 md:w-36">
                <Image
                  src="/madak-logo.png"
                  alt="Madak"
                  fill
                  className="object-contain object-center"
                  sizes="144px"
                />
              </div>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="order-2 flex shrink-0 items-center justify-self-center md:order-3 md:justify-self-auto">
              <div className="relative h-10 w-10 shrink-0 sm:h-14 sm:w-14 md:h-24 md:w-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/falak-logo.png"
                  alt="Falak"
                  className="h-full w-full object-contain dark:invert"
                />
              </div>
            </a>
          </div>
        </header>

        {/* Hero */}
        <main className="mt-10 grid flex-1 gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
          <section className="space-y-10">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-700 bg-gradient-to-r from-emerald-50 to-amber-50/60 px-3 py-1 text-xs font-medium text-[#cda22b] shadow-[0_0_12px_rgba(16,185,129,0.2)] dark:border-emerald-700/50 dark:from-emerald-900/30 dark:to-amber-900/30 dark:text-[#cda22b]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                {t.liveBadge}
              </div>
              <span className="rounded-full border border-slate-300 dark:border-zinc-500 bg-white dark:bg-zinc-700 px-3 py-1 text-xs font-medium text-[#7d471e] dark:text-[#c9a86c]">
                {t.professionalOnly}
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#7d471e] dark:text-[#d4b896] sm:text-5xl lg:text-6xl">
                {t.heroTitle1}{" "}
                <a
                  href={madakUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#cda22b] via-[#9db47e] to-[#9db47e] bg-clip-text text-transparent hover:underline"
                >
                  {t.heroTitle2}
                </a>
                : {t.heroTitle3}{" "}
                <span className="bg-gradient-to-r from-[#cda22b] via-[#9db47e] to-[#9db47e] bg-clip-text text-transparent">
                  {t.heroTitle4}
                </span>
              </h1>
              <p className="max-w-xl text-pretty text-base text-[#7d471e] dark:text-[#c9a86c]/90 sm:text-lg">
                {t.heroDesc}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={PRIMARY_WHATSAPP_INTEREST}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:shadow-emerald-500/50 hover:shadow-xl"
              >
                {t.expressInterest}
              </a>
              <div className="flex flex-col text-xs text-slate-600 dark:text-slate-400 dark:text-slate-400">
                <span>{t.directConversation}</span>
                <span className="text-[#7d471e] dark:text-[#c9a86c]">{t.noObligation}</span>
              </div>
            </div>

            {/* Ticket & Pricing - Finjan's investment terms (QAR) */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                {t.ticketPricingTitle}
              </h2>
              <p className="text-lg font-medium text-[#7d471e] dark:text-[#c9a86c]">{t.ticketCount}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 dark:text-slate-400">
                {t.ticketsPurchased}, {t.ticketsRemaining}.
              </p>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-500 bg-gradient-to-br from-white to-slate-50/50 shadow-[0_0_20px_-8px_rgba(125,71,30,0.08)] dark:border-zinc-500 dark:from-zinc-700 dark:to-zinc-700/80 dark:shadow-none">
                <div className="grid gap-4 border-slate-200 dark:border-zinc-500 p-5 sm:grid-cols-3">
                  <div className="flex flex-col rounded-lg bg-slate-50 dark:bg-zinc-700/50 p-4">
                    <span className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400">{t.ticketLabel}</span>
                    <span className="mt-2 text-xl font-semibold tabular-nums text-[#7d471e] dark:text-[#c9a86c]">
                      {QATARI_RIYAL} 25,000
                    </span>
                  </div>
                  <div className="flex flex-col rounded-lg bg-slate-50 dark:bg-zinc-700/50 p-4">
                    <span className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400">{t.netInvestLabel}</span>
                    <span className="mt-2 text-xl font-semibold tabular-nums text-[#7d471e] dark:text-[#c9a86c]">
                      {QATARI_RIYAL} 21,900
                    </span>
                  </div>
                  <div className="flex flex-col rounded-lg bg-slate-50 dark:bg-zinc-700/50 p-4">
                    <span className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400">{t.spvLabel}</span>
                    <span className="mt-2 text-xl font-semibold tabular-nums text-[#7d471e] dark:text-[#c9a86c]">
                      {QATARI_RIYAL} 3,100
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-xl border-2 border-amber-200/80 dark:border-amber-700/60 bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/50 p-5 shadow-[0_0_28px_-8px_rgba(205,162,43,0.2),inset_0_0_0_1px_rgba(205,162,43,0.08)] dark:from-zinc-700/80 dark:via-zinc-700 dark:to-zinc-700/80">
                <p className="text-base font-medium text-[#7d471e] dark:text-[#c9a86c]">{t.membershipNote}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={FINJAN_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:shadow-emerald-500/40"
                  >
                    {t.contactWhatsApp}
                  </a>
                  <a
                    href="mailto:info@finjan.vc"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-amber-300/80 bg-white dark:bg-zinc-700 px-6 py-2.5 text-sm font-semibold text-[#7d471e] dark:text-[#c9a86c] shadow-sm transition hover:border-[#cda22b] hover:bg-amber-50/50"
                  >
                    {t.contactEmail}
                  </a>
                </div>
              </div>
            </section>

            {/* Round Overview - Finjan's round (no Madak metrics here) */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                {t.roundOverview}
              </h2>
              <div className="rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
                  {t.currentRound}
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{t.preValuation}</span>
                    <span className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                      $10M
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{t.postValuation}</span>
                    <span className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                      $10.32M
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 dark:border-zinc-500 pt-2">
                    <span className="text-sm font-medium text-[#cda22b]">
                      {t.fundraisingAsk}
                    </span>
                    <span className="text-xl font-bold text-[#cda22b]">
                      $150K
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* OVERVIEW OF MADAK: Clear break between Finjan's terms and Madak's details */}
            <div
              role="separator"
              aria-label={t.overviewOfMadak}
              className="border-t-2 border-b-2 border-slate-300 dark:border-zinc-500 bg-gradient-to-r from-slate-100 via-amber-50/50 to-slate-100 px-6 py-8 dark:from-zinc-700 dark:via-zinc-600/80 dark:to-zinc-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-[#7d471e] dark:text-[#c9a86c] sm:text-2xl">
                    {t.overviewOfMadak}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-300 sm:text-base">
                    {t.madakSectionSubtitle}
                  </p>
                </div>
                <div className="grid min-w-[280px] flex-1 grid-cols-2 gap-3">
                  <a
                    href={madakUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[52px] w-full items-center justify-center rounded-xl border border-amber-200/80 dark:border-amber-700/60 bg-gradient-to-r from-white to-amber-50/40 text-sm font-medium text-[#7d471e] shadow-[0_0_16px_-6px_rgba(205,162,43,0.15)] transition hover:border-[#cda22b]/60 hover:shadow-[0_0_24px_-8px_rgba(205,162,43,0.25)] dark:text-[#c9a86c] dark:from-zinc-700 dark:to-zinc-700/80"
                  >
                    {t.visitMadak}
                  </a>
                  <a
                    href="/Madak-Pitch-Dec25.pdf"
                    download
                    className="flex min-h-[52px] w-full items-center justify-center rounded-xl border border-amber-200/80 dark:border-amber-700/60 bg-gradient-to-r from-white to-amber-50/40 text-sm font-medium text-[#7d471e] shadow-[0_0_16px_-6px_rgba(205,162,43,0.15)] transition hover:border-[#cda22b]/60 dark:text-[#c9a86c] dark:from-zinc-700 dark:to-zinc-700/80"
                  >
                    {t.viewThePitch}
                  </a>
                </div>
              </div>
            </div>

            {/* Madak's Key Metrics - first section under Overview of Madak */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c] sm:text-xl">
                {t.madakKeyMetrics}
              </h3>
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-[#7d471e] dark:text-[#c9a86c]">{t.revenue}</div>
                  <div className="text-base font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                    {SAUDI_RIYAL} 260K <span className="text-slate-500 dark:text-slate-500 font-normal">({sarToUsd(260000)})</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e] dark:text-[#c9a86c]">{t.totalGmv}</div>
                  <div className="text-base font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                    {SAUDI_RIYAL} 4M <span className="text-slate-500 dark:text-slate-500 font-normal">({sarToUsd(4000000)})</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e] dark:text-[#c9a86c]">{t.ltv}</div>
                  <div className="text-base font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                    {SAUDI_RIYAL} 7,000 <span className="text-slate-500 dark:text-slate-500 font-normal">({sarToUsd(7000)})</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e] dark:text-[#c9a86c]">CAC</div>
                  <div className="text-base font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                    {SAUDI_RIYAL} 200 <span className="text-slate-500 dark:text-slate-500 font-normal">({sarToUsd(200)})</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e] dark:text-[#c9a86c]">{t.grossMargin}</div>
                  <div className="text-base font-semibold text-[#7d471e] dark:text-[#c9a86c]">10%</div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e] dark:text-[#c9a86c]">{t.burnRate}</div>
                  <div className="text-base font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                    {SAUDI_RIYAL} 100K/mo <span className="text-slate-500 dark:text-slate-500 font-normal">({sarToUsd(100000)}/mo)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Highlights - Madak platform (4 cards, balanced) */}
            <div className="grid gap-4 rounded-2xl border border-slate-200 dark:border-zinc-500 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-[0_0_30px_-10px_rgba(205,162,43,0.08)] dark:from-zinc-700 dark:to-zinc-700/80 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-200 dark:border-emerald-700 bg-gradient-to-br from-emerald-50/60 to-white p-4 text-center shadow-[inset_0_0_20px_-10px_rgba(16,185,129,0.15)] dark:from-emerald-900/30 dark:to-zinc-700">
                <div className="text-2xl font-bold text-[#cda22b] sm:text-3xl">1st</div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.licensedPlatform}</div>
                <div className="mt-0.5 text-sm text-slate-500 dark:text-slate-500">{t.inSaudiArabia}</div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-amber-200/60 dark:border-amber-700/60 bg-gradient-to-br from-amber-50/40 to-white p-4 text-center dark:from-amber-900/20 dark:to-zinc-700">
                <div className="text-2xl font-bold text-[#7d471e] dark:text-[#c9a86c] sm:text-3xl">100%</div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.digitalPlatform}</div>
                <div className="mt-0.5 text-sm text-slate-500 dark:text-slate-500">{t.fullyAutomated}</div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-4 text-center">
                <div className="text-2xl font-bold text-[#7d471e] dark:text-[#c9a86c] sm:text-3xl">✓</div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.builtInLiquidity}</div>
                <div className="mt-0.5 text-sm text-slate-500 dark:text-slate-500">{t.resaleMarketplace}</div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-4 text-center">
                <div className="text-2xl font-bold text-[#7d471e] dark:text-[#c9a86c] sm:text-3xl">◎</div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.fractionalOwnership}</div>
                <div className="mt-0.5 text-sm text-slate-500 dark:text-slate-500">{t.fractionalSubtext}</div>
              </div>
            </div>

            {/* Traction Metrics */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c] sm:text-xl">
                {t.madakProvenTraction}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative overflow-hidden rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-zinc-700 p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#cda22b]">
                    {t.platformUsers}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#cda22b]">
                    13,000+
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {t.growingUserBase}
                  </div>
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-300/40 blur-2xl" />
                  <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-amber-200/30 blur-xl" />
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400">
                    {t.activeInvestors}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e] dark:text-[#c9a86c]">700+</div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {t.engagedInvestors}
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400">
                    <strong>{t.earlyTractionGmvBold}</strong> {t.earlyTractionGmvRest}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e] dark:text-[#c9a86c]">
                    {SAUDI_RIYAL} 2.6M <span className="text-sm font-normal text-slate-500 dark:text-slate-500">({sarToUsd(2600000)})</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {t.grossMerchandiseValue}
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400">
                    {t.retentionRate}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e] dark:text-[#c9a86c]">60%</div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {t.strongRetention}
                  </div>
                </div>
              </div>
            </section>

            {/* Investment Performance */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c] sm:text-xl">
                {t.madakInvestmentPerformance}
              </h3>
              <div className="rounded-xl border border-slate-200 dark:border-zinc-500 bg-gradient-to-br from-white to-amber-50/30 p-6 shadow-[0_0_24px_-10px_rgba(205,162,43,0.06)] dark:from-zinc-700 dark:to-zinc-700/80">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#cda22b]">
                      {SAUDI_RIYAL} 3.18M <span className="text-sm font-normal text-slate-500 dark:text-slate-500">({sarToUsd(3180000)})</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                      {t.raisedAcross}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#cda22b]">10%</div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                      {t.returnsDelivered}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#cda22b]">1,070+</div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                      {t.investorsParticipated}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Unit Economics */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c] sm:text-xl">
                {t.madakUnitEconomics}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-zinc-700 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400">
                        CAC
                      </div>
                      <div className="mt-1 text-2xl font-bold text-[#cda22b]">
                        {SAUDI_RIYAL} 200 <span className="text-sm font-normal text-slate-500 dark:text-slate-500">({sarToUsd(200)})</span>
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
                  <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                    {t.lowCac}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400">
                        {t.marketingEfficiency}
                      </div>
                      <div className="mt-1 text-2xl font-bold text-[#7d471e] dark:text-[#c9a86c]">17x</div>
                    </div>
                    <div className="text-lg text-[#7d471e] dark:text-[#c9a86c]">↑</div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                    {t.sarRaisedPerSpent}
                  </div>
                </div>
              </div>
            </section>

            {/* Problem & Solution */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                {t.problemMadakSolves}
              </h3>
              <p className="text-sm leading-relaxed text-[#7d471e] dark:text-[#c9a86c]">
                {t.problemSummary}
              </p>
            </section>

            {/* Solution */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c] sm:text-xl">{t.madakSolution}</h3>
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-gradient-to-br from-emerald-50/40 to-white p-5 shadow-[0_0_24px_-10px_rgba(16,185,129,0.1)] dark:from-emerald-900/20 dark:to-zinc-700">
                <div className="mb-3 text-lg text-emerald-600">✓</div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-[#cda22b]">
                      {t.forInvestors}
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm text-[#7d471e] dark:text-[#c9a86c]">
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
                    <ul className="mt-2 space-y-1.5 text-sm text-[#7d471e] dark:text-[#c9a86c]">
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
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c] sm:text-xl">
                {t.madakMarketOpportunity}
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
                    {t.globalMarket}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e] dark:text-[#c9a86c]">
                    {SAUDI_RIYAL} 37T <span className="text-slate-500 dark:text-slate-500 font-normal">({sarToUsd(37_000_000_000_000)})</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {t.annualTransactionVolume}
                  </div>
                  <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-slate-800/50 blur-xl" />
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
                    {t.gccMarket}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e] dark:text-[#c9a86c]">
                    {SAUDI_RIYAL} 1.3T <span className="text-slate-500 dark:text-slate-500 font-normal">({sarToUsd(1_300_000_000_000)})</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {t.realEstateMarketSize}
                  </div>
                  <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-slate-800/50 blur-xl" />
                </div>
                <div className="relative overflow-hidden rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-zinc-700 p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#cda22b]">
                    {t.saudiMarket}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#cda22b]">
                    {SAUDI_RIYAL} 400B <span className="text-slate-500 dark:text-slate-500 font-normal">({sarToUsd(400_000_000_000)})</span>
                  </div>
                  <div className="mt-1 text-xs text-[#cda22b]/70">
                    {t.annualTransactions}
                  </div>
                  <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-white dark:bg-zinc-700 blur-xl" />
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-4">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {t.marketTrends}
                </div>
              </div>
            </section>

            {/* Business Model */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c] sm:text-xl">{t.madakBusinessModel}</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="mb-2 text-lg text-[#7d471e] dark:text-[#c9a86c]">◎</div>
                  <div className="text-sm font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                    {t.transactionCommissions}
                  </div>
                  <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                    {t.revenueFromTransactions}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="mb-2 text-lg text-[#7d471e] dark:text-[#c9a86c]">▫</div>
                  <div className="text-sm font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                    {t.platformSubscriptions}
                  </div>
                  <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                    {t.recurringRevenue}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="mb-2 text-lg text-[#7d471e] dark:text-[#c9a86c]">▥</div>
                  <div className="text-sm font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                    {t.ownershipShareFees}
                  </div>
                  <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                    {t.feesFromManagement}
                  </div>
                </div>
              </div>
            </section>

            {/* Competitive Advantage */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c] sm:text-xl">
                {t.madakCompetitiveAdvantages}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-zinc-700 p-5">
                  <div className="mb-1.5 text-sm font-semibold text-[#cda22b]">
                    {t.regulatoryAdvantage}
                  </div>
                  <div className="text-sm text-[#7d471e] dark:text-[#c9a86c]">
                    {t.regulatoryAdvantageDesc}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="mb-1.5 text-sm font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                    {t.liquidityAdvantage}
                  </div>
                  <div className="text-sm text-[#7d471e] dark:text-[#c9a86c]">
                    {t.liquidityAdvantageDesc}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="mb-1.5 text-sm font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                    {t.technologyAdvantage}
                  </div>
                  <div className="text-sm text-[#7d471e] dark:text-[#c9a86c]">
                    {t.technologyAdvantageDesc}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="mb-1.5 text-sm font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                    {t.marketAdvantage}
                  </div>
                  <div className="text-sm text-[#7d471e] dark:text-[#c9a86c]">
                    {t.marketAdvantageDesc}
                  </div>
                </div>
              </div>
            </section>

            {/* Growth Strategy */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c] sm:text-xl">{t.madakGrowthStrategy}</h3>
              <div className="rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                <div className="flex items-start gap-3">
                  <div className="text-base text-[#7d471e] dark:text-[#c9a86c]">●</div>
                  <div className="flex-1 space-y-3">
                    <div className="text-sm text-[#7d471e] dark:text-[#c9a86c]">
                      {t.growth1}
                    </div>
                    <div className="text-sm text-[#7d471e] dark:text-[#c9a86c]">
                      {t.growth2}
                    </div>
                    <div className="text-sm text-[#7d471e] dark:text-[#c9a86c]">
                      {t.growth3}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Investment Thesis */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c] sm:text-xl">{t.investmentThesis}</h3>
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-zinc-700 p-5">
                <div className="mb-3 text-sm font-semibold text-[#cda22b]">
                  {t.whyInvest}
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e] dark:text-[#c9a86c]">{t.thesis1}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e] dark:text-[#c9a86c]">{t.thesis2}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e] dark:text-[#c9a86c]">{t.thesis3}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e] dark:text-[#c9a86c]">{t.thesis4}</span>
                  </div>
                  <div className="flex items-start gap-2 md:col-span-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e] dark:text-[#c9a86c]">{t.thesis5}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Team */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c] sm:text-xl">{t.madakFoundingTeam}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3 rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src="/team/abdulaziz-alardi.png"
                        alt="Hussain Hameed Aldeen"
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                        Hussain Hameed Aldeen
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{t.hussainTitle}</p>
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
                  <p className="text-xs leading-relaxed text-[#7d471e] dark:text-[#c9a86c]">
                    {t.hussainBio}
                  </p>
                </div>
                <div className="space-y-3 rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src="/team/hussain-hamed-aldeen.png"
                        alt="Abdulaziz Alardi"
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                        Abdulaziz Alardi
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{t.abdulazizTitle}</p>
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
                  <p className="text-xs leading-relaxed text-[#7d471e] dark:text-[#c9a86c]">
                    {t.abdulazizBio}
                  </p>
                </div>
              </div>
            </section>

            {/* Recognition */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c] sm:text-xl">{t.recognition}</h3>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 p-6">
                <Image
                  src="/recognition-logos.png"
                  alt="Recognition - partner and institutional logos"
                  width={2048}
                  height={1057}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            </section>

          </section>

          {/* Right column: highlight card and final CTA */}
          <aside className="space-y-6 lg:sticky lg:top-10">
            <div className="rounded-3xl border border-emerald-200 dark:border-emerald-700 bg-gradient-to-br from-emerald-50/40 via-white to-amber-50/30 p-6 shadow-[0_0_40px_-8px_rgba(16,185,129,0.25),0_0_20px_-10px_rgba(205,162,43,0.1)] dark:from-emerald-900/20 dark:via-zinc-700 dark:to-zinc-700/80">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#cda22b]">
                {t.dealSnapshot}
              </p>
              <div className="mt-5 space-y-3 text-sm text-[#7d471e] dark:text-[#c9a86c]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t.preValuation}</span>
                  <span className="font-medium text-[#7d471e] dark:text-[#c9a86c]">$10M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t.postValuation}</span>
                  <span className="font-medium text-[#7d471e] dark:text-[#c9a86c]">$10.32M</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 dark:border-zinc-500 pt-3">
                  <span className="text-slate-600 dark:text-slate-400">{t.fundraisingAsk}</span>
                  <span className="text-lg font-bold text-[#cda22b]">$150K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t.status}</span>
                  <span className="font-medium text-[#cda22b]">
                    {t.openForInterest}
                  </span>
                </div>
              </div>
              <a
                href={PRIMARY_WHATSAPP_INTEREST}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-400/40 transition hover:shadow-emerald-400/50"
              >
                {t.expressInterestWhatsApp}
              </a>
              <p className="mt-3 text-[11px] leading-relaxed text-[#7d471e] dark:text-[#c9a86c]">
                {t.whatsappRedirectNote}
              </p>
            </div>

            {/* Final Call To Action */}
            <div className="rounded-3xl border border-slate-200 dark:border-zinc-500 bg-gradient-to-br from-white to-slate-50/60 p-6 shadow-[0_0_24px_-10px_rgba(125,71,30,0.06)] dark:from-zinc-700 dark:to-zinc-700/80">
              <h2 className="text-lg font-semibold text-[#7d471e] dark:text-[#c9a86c]">
                {t.connectWithFinjan}
              </h2>
              <p className="mt-2 text-sm text-[#7d471e] dark:text-[#c9a86c]">{t.connectDesc}</p>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={FINJAN_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-emerald-300 bg-white dark:border-emerald-700 dark:bg-zinc-700 px-6 py-2.5 text-sm font-semibold text-[#cda22b] transition hover:bg-amber-50 dark:hover:bg-zinc-600"
                >
                  {t.connectWithUs}
                </a>
                <div className="space-y-1 text-xs text-[#7d471e] dark:text-[#c9a86c]">
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
              <p className="mt-4 text-[11px] text-[#7d471e] dark:text-[#c9a86c]">{t.legalDisclaimer}</p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
