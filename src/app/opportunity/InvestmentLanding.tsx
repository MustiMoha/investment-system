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
      className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-emerald-50/20 text-[#7d471e] dark:from-[var(--dark-bg)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-bg)] dark:text-[var(--dark-text)]"
      dir={isRtl ? "rtl" : "ltr"}
      lang={liveLang}
    >
      <SetRtl lang={liveLang} />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-8 md:px-8 lg:px-12">
        {/* Top: Theme toggle left, Language + ref right (mobile symmetry) */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between md:left-8 md:right-8 lg:left-12 lg:right-12">
          <ThemeToggle />
          <div className="flex items-center gap-3">
          {liveRefCode && (
            <span className="rounded-full border border-emerald-300 bg-white dark:bg-[var(--dark-surface)] px-3 py-1 text-xs text-[#cda22b] dark:border-[var(--dark-border)] dark:bg-[var(--dark-surface)] dark:text-[var(--dark-accent)]">
              {t.personalizedLink} {liveRefCode}
            </span>
          )}
          <LanguageToggle currentLang={liveLang} refCode={liveRefCode} />
          </div>
        </div>

        {/* Center-aligned logos - mobile: ~1/3 screen height */}
        <header className="flex min-h-[33vh] justify-center border-b border-slate-200 dark:border-[var(--dark-border)] py-6 pb-8 pt-2 md:min-h-0 md:py-2 bg-gradient-to-r from-transparent via-amber-50/40 to-transparent dark:border-[var(--dark-border)] dark:via-[var(--dark-surface)]/50">
          <div className="grid w-full max-w-md grid-cols-2 place-items-center gap-6 md:max-w-none md:flex md:flex-nowrap md:items-center md:justify-center md:gap-14 lg:gap-20">
            <a href="https://finjan.vc" target="_blank" rel="noopener noreferrer" className="order-1 flex shrink-0 items-center justify-self-center md:justify-self-auto">
              <div className="relative h-[16.1vh] min-h-[5.2rem] w-[16.1vh] min-w-[5.2rem] shrink-0 sm:h-[4.64rem] sm:min-h-0 sm:w-[4.64rem] sm:min-w-0 md:h-[7.54rem] md:w-[7.54rem] lg:h-[9.05rem] lg:w-[9.05rem]">
                <Image
                  src="/finjan-logo.png"
                  alt="Finjan"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 25vw, 145px"
                />
              </div>
            </a>
            <a href={madakUrl} target="_blank" rel="noopener noreferrer" className="order-3 col-span-2 flex shrink-0 items-center justify-center md:order-2 md:col-span-1 md:justify-self-auto">
              <div className="relative h-[12vh] min-h-[4rem] w-[20vh] min-w-[6rem] shrink-0 sm:h-14 sm:min-h-0 sm:w-20 sm:min-w-0 md:h-24 md:w-36">
                <Image
                  src="/madak-logo.png"
                  alt="Madak"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 35vw, 144px"
                />
              </div>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="order-2 flex shrink-0 items-center justify-self-center md:order-3 md:justify-self-auto">
              <div className="relative h-[14vh] min-h-[4.5rem] w-[14vh] min-w-[4.5rem] shrink-0 sm:h-14 sm:min-h-0 sm:w-14 sm:min-w-0 md:h-24 md:w-24">
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
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-[var(--dark-border)] bg-gradient-to-r from-emerald-50 to-amber-50/60 px-3 py-1 text-xs font-medium text-[#cda22b] shadow-[0_0_12px_rgba(16,185,129,0.2)] dark:from-[var(--dark-surface-alt)] dark:to-[var(--dark-surface-alt)] dark:text-[var(--dark-accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                {t.liveBadge}
              </div>
              <span className="rounded-full border border-slate-300 dark:border-[var(--dark-border)] bg-white dark:bg-[var(--dark-surface)] px-3 py-1 text-xs font-medium text-[#7d471e] dark:text-[var(--dark-text)]">
                {t.professionalOnly}
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#7d471e] dark:text-[var(--dark-text)] sm:text-5xl lg:text-6xl">
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
              <p className="max-w-xl text-pretty text-base text-[#7d471e] dark:text-[var(--dark-text-muted)] sm:text-lg">
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
              <div className="flex flex-col text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                <span>{t.directConversation}</span>
                <span className="text-[#7d471e] dark:text-[var(--dark-text)]">{t.noObligation}</span>
              </div>
            </div>

            {/* Ticket & Pricing - Finjan's investment terms (QAR) */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                {t.ticketPricingTitle}
              </h2>
              <p className="text-lg font-medium text-[#7d471e] dark:text-[var(--dark-text)]">{t.ticketCount}</p>
              <p className="text-sm text-slate-600 dark:text-[var(--dark-text-muted)]">
                {t.ticketsPurchased}, {t.ticketsRemaining}.
              </p>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-gradient-to-br from-white to-slate-50/50 shadow-[0_0_20px_-8px_rgba(125,71,30,0.08)] dark:border-[var(--dark-border)] dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] dark:shadow-none">
                <div className="grid gap-4 border-slate-200 dark:border-[var(--dark-border)] p-5 sm:grid-cols-3">
                  <div className="flex flex-col rounded-lg bg-slate-50 dark:bg-[var(--dark-surface-alt)] p-4">
                    <span className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-[var(--dark-text-muted)]">{t.ticketLabel}</span>
                    <span className="mt-2 text-xl font-semibold tabular-nums text-[#7d471e] dark:text-[var(--dark-text)]">
                      {QATARI_RIYAL} 25,000
                    </span>
                  </div>
                  <div className="flex flex-col rounded-lg bg-slate-50 dark:bg-[var(--dark-surface-alt)] p-4">
                    <span className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-[var(--dark-text-muted)]">{t.netInvestLabel}</span>
                    <span className="mt-2 text-xl font-semibold tabular-nums text-[#7d471e] dark:text-[var(--dark-text)]">
                      {QATARI_RIYAL} 21,900
                    </span>
                  </div>
                  <div className="flex flex-col rounded-lg bg-slate-50 dark:bg-[var(--dark-surface-alt)] p-4">
                    <span className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-[var(--dark-text-muted)]">{t.spvLabel}</span>
                    <span className="mt-2 text-xl font-semibold tabular-nums text-[#7d471e] dark:text-[var(--dark-text)]">
                      {QATARI_RIYAL} 3,100
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-xl border-2 border-amber-200/80 dark:border-[var(--dark-border)] bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/50 p-5 shadow-[0_0_28px_-8px_rgba(205,162,43,0.2),inset_0_0_0_1px_rgba(205,162,43,0.08)] dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)]">
                <p className="text-base font-medium text-[#7d471e] dark:text-[var(--dark-text)]">{t.membershipNote}</p>
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
                    className="inline-flex items-center gap-2 rounded-full border-2 border-amber-300/80 bg-white dark:bg-[var(--dark-surface)] px-6 py-2.5 text-sm font-semibold text-[#7d471e] dark:text-[var(--dark-text)] shadow-sm transition hover:border-[#cda22b] hover:bg-amber-50/50"
                  >
                    {t.contactEmail}
                  </a>
                </div>
              </div>
            </section>

            {/* Round Overview - Finjan's round (no Madak metrics here) */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                {t.roundOverview}
              </h2>
              <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-[var(--dark-text-muted)]">
                  {t.currentRound}
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-[var(--dark-text-muted)]">{t.preValuation}</span>
                    <span className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                      $10M
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-[var(--dark-text-muted)]">{t.postValuation}</span>
                    <span className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                      $10.32M
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 dark:border-[var(--dark-border)] pt-2">
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
              className="border-t-2 border-b-2 border-slate-300 dark:border-[var(--dark-border)] bg-gradient-to-r from-slate-100 via-amber-50/50 to-slate-100 px-6 py-8 dark:from-[var(--dark-surface)] dark:via-[var(--dark-surface-alt)] dark:to-[var(--dark-surface)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-[#7d471e] dark:text-[var(--dark-text)] sm:text-2xl">
                    {t.overviewOfMadak}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-800 dark:text-[var(--dark-text-muted)] sm:text-base">
                    {t.madakSectionSubtitle}
                  </p>
                </div>
                <div className="grid min-w-[280px] flex-1 grid-cols-2 gap-3">
                  <a
                    href={madakUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[52px] w-full items-center justify-center rounded-xl border border-amber-200/80 dark:border-[var(--dark-border)] bg-gradient-to-r from-white to-amber-50/40 text-sm font-medium text-[#7d471e] shadow-[0_0_16px_-6px_rgba(205,162,43,0.15)] transition hover:border-[#cda22b]/60 hover:shadow-[0_0_24px_-8px_rgba(205,162,43,0.25)] dark:text-[var(--dark-text)] dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)]"
                  >
                    {t.visitMadak}
                  </a>
                  <a
                    href="/Madak-Pitch-Dec25.pdf"
                    download
                    className="flex min-h-[52px] w-full items-center justify-center rounded-xl border border-amber-200/80 dark:border-[var(--dark-border)] bg-gradient-to-r from-white to-amber-50/40 text-sm font-medium text-[#7d471e] shadow-[0_0_16px_-6px_rgba(205,162,43,0.15)] transition hover:border-[#cda22b]/60 dark:text-[var(--dark-text)] dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)]"
                  >
                    {t.viewThePitch}
                  </a>
                </div>
              </div>
            </div>

            {/* Madak's Key Metrics - first section under Overview of Madak */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-xl">
                {t.madakKeyMetrics}
              </h3>
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-[#7d471e] dark:text-[var(--dark-text)]">{t.revenue}</div>
                  <div className="text-base font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {SAUDI_RIYAL} 260K <span className="text-slate-500 dark:text-[var(--dark-text-muted)] font-normal">({sarToUsd(260000)})</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e] dark:text-[var(--dark-text)]">{t.totalGmv}</div>
                  <div className="text-base font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {SAUDI_RIYAL} 4M <span className="text-slate-500 dark:text-[var(--dark-text-muted)] font-normal">({sarToUsd(4000000)})</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e] dark:text-[var(--dark-text)]">{t.ltv}</div>
                  <div className="text-base font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {SAUDI_RIYAL} 7,000 <span className="text-slate-500 dark:text-[var(--dark-text-muted)] font-normal">({sarToUsd(7000)})</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e] dark:text-[var(--dark-text)]">CAC</div>
                  <div className="text-base font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {SAUDI_RIYAL} 200 <span className="text-slate-500 dark:text-[var(--dark-text-muted)] font-normal">({sarToUsd(200)})</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e] dark:text-[var(--dark-text)]">{t.grossMargin}</div>
                  <div className="text-base font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">10%</div>
                </div>
                <div>
                  <div className="text-xs text-[#7d471e] dark:text-[var(--dark-text)]">{t.burnRate}</div>
                  <div className="text-base font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {SAUDI_RIYAL} 100K/mo <span className="text-slate-500 dark:text-[var(--dark-text-muted)] font-normal">({sarToUsd(100000)}/mo)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Highlights - Madak platform (4 cards, balanced) */}
            <div className="grid gap-4 rounded-2xl border border-slate-200 dark:border-[var(--dark-border)] bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-[0_0_30px_-10px_rgba(205,162,43,0.08)] dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-200 dark:border-emerald-700 bg-gradient-to-br from-emerald-50/60 to-white p-4 text-center shadow-[inset_0_0_20px_-10px_rgba(16,185,129,0.15)] dark:from-[var(--dark-surface-alt)] dark:to-[var(--dark-surface)]">
                <div className="text-2xl font-bold text-[#cda22b] sm:text-3xl">1st</div>
                <div className="mt-1 text-sm text-slate-600 dark:text-[var(--dark-text-muted)]">{t.licensedPlatform}</div>
                <div className="mt-0.5 text-sm text-slate-500 dark:text-[var(--dark-text-muted)]">{t.inSaudiArabia}</div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-amber-200/60 dark:border-[var(--dark-border)] bg-gradient-to-br from-amber-50/40 to-white p-4 text-center dark:from-[var(--dark-surface-alt)] dark:to-[var(--dark-surface)]">
                <div className="text-2xl font-bold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-3xl">100%</div>
                <div className="mt-1 text-sm text-slate-600 dark:text-[var(--dark-text-muted)]">{t.digitalPlatform}</div>
                <div className="mt-0.5 text-sm text-slate-500 dark:text-[var(--dark-text-muted)]">{t.fullyAutomated}</div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-4 text-center">
                <div className="text-2xl font-bold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-3xl">✓</div>
                <div className="mt-1 text-sm text-slate-600 dark:text-[var(--dark-text-muted)]">{t.builtInLiquidity}</div>
                <div className="mt-0.5 text-sm text-slate-500 dark:text-[var(--dark-text-muted)]">{t.resaleMarketplace}</div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-4 text-center">
                <div className="text-2xl font-bold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-3xl">◎</div>
                <div className="mt-1 text-sm text-slate-600 dark:text-[var(--dark-text-muted)]">{t.fractionalOwnership}</div>
                <div className="mt-0.5 text-sm text-slate-500 dark:text-[var(--dark-text-muted)]">{t.fractionalSubtext}</div>
              </div>
            </div>

            {/* Traction Metrics */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-xl">
                {t.madakProvenTraction}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative overflow-hidden rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#cda22b]">
                    {t.platformUsers}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#cda22b]">
                    13,000+
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.growingUserBase}
                  </div>
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-300/40 blur-2xl" />
                  <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-amber-200/30 blur-xl" />
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.activeInvestors}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e] dark:text-[var(--dark-text)]">700+</div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.engagedInvestors}
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-[var(--dark-text-muted)]">
                    <strong>{t.earlyTractionGmvBold}</strong> {t.earlyTractionGmvRest}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {SAUDI_RIYAL} 2.6M <span className="text-sm font-normal text-slate-500 dark:text-[var(--dark-text-muted)]">({sarToUsd(2600000)})</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.grossMerchandiseValue}
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.retentionRate}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e] dark:text-[var(--dark-text)]">60%</div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.strongRetention}
                  </div>
                </div>
              </div>
            </section>

            {/* Investment Performance */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-xl">
                {t.madakInvestmentPerformance}
              </h3>
              <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-gradient-to-br from-white to-amber-50/30 p-6 shadow-[0_0_24px_-10px_rgba(205,162,43,0.06)] dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)]">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#cda22b]">
                      {SAUDI_RIYAL} 3.18M <span className="text-sm font-normal text-slate-500 dark:text-[var(--dark-text-muted)]">({sarToUsd(3180000)})</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                      {t.raisedAcross}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#cda22b]">10%</div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                      {t.returnsDelivered}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#cda22b]">1,070+</div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                      {t.investorsParticipated}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Unit Economics */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-xl">
                {t.madakUnitEconomics}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-[var(--dark-text-muted)]">
                        CAC
                      </div>
                      <div className="mt-1 text-2xl font-bold text-[#cda22b]">
                        {SAUDI_RIYAL} 200 <span className="text-sm font-normal text-slate-500 dark:text-[var(--dark-text-muted)]">({sarToUsd(200)})</span>
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
                  <div className="mt-2 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.lowCac}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-[var(--dark-text-muted)]">
                        {t.marketingEfficiency}
                      </div>
                      <div className="mt-1 text-2xl font-bold text-[#7d471e] dark:text-[var(--dark-text)]">35x</div>
                    </div>
                    <div className="text-lg text-[#7d471e] dark:text-[var(--dark-text)]">↑</div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.sarRaisedPerSpent}
                  </div>
                </div>
              </div>
            </section>

            {/* Problem & Solution */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                {t.problemMadakSolves}
              </h3>
              <p className="text-sm leading-relaxed text-[#7d471e] dark:text-[var(--dark-text)]">
                {t.problemSummary}
              </p>
            </section>

            {/* Solution */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-xl">{t.madakSolution}</h3>
              <div className="rounded-xl border border-emerald-200 dark:border-[var(--dark-border)] bg-gradient-to-br from-emerald-50/40 to-white p-5 shadow-[0_0_24px_-10px_rgba(16,185,129,0.1)] dark:from-[var(--dark-surface-alt)] dark:to-[var(--dark-surface)]">
                <div className="mb-3 text-lg text-emerald-600">✓</div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-[#cda22b]">
                      {t.forInvestors}
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm text-[#7d471e] dark:text-[var(--dark-text)]">
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
                    <ul className="mt-2 space-y-1.5 text-sm text-[#7d471e] dark:text-[var(--dark-text)]">
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
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-xl">
                {t.madakMarketOpportunity}
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.globalMarket}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {SAUDI_RIYAL} 37T <span className="text-slate-500 dark:text-[var(--dark-text-muted)] font-normal">({sarToUsd(37_000_000_000_000)})</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.annualTransactionVolume}
                  </div>
                  <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-slate-800/50 blur-xl" />
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.gccMarket}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {SAUDI_RIYAL} 1.3T <span className="text-slate-500 dark:text-[var(--dark-text-muted)] font-normal">({sarToUsd(1_300_000_000_000)})</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.realEstateMarketSize}
                  </div>
                  <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-slate-800/50 blur-xl" />
                </div>
                <div className="relative overflow-hidden rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#cda22b]">
                    {t.saudiMarket}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#cda22b]">
                    {SAUDI_RIYAL} 400B <span className="text-slate-500 dark:text-[var(--dark-text-muted)] font-normal">({sarToUsd(400_000_000_000)})</span>
                  </div>
                  <div className="mt-1 text-xs text-[#cda22b]/70">
                    {t.annualTransactions}
                  </div>
                  <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-white dark:bg-[var(--dark-surface)] blur-xl" />
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-4">
                <div className="text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                  {t.marketTrends}
                </div>
              </div>
            </section>

            {/* Business Model */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-xl">{t.madakBusinessModel}</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="mb-2 text-lg text-[#7d471e] dark:text-[var(--dark-text)]">◎</div>
                  <div className="text-sm font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {t.transactionCommissions}
                  </div>
                  <div className="mt-2 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.revenueFromTransactions}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="mb-2 text-lg text-[#7d471e] dark:text-[var(--dark-text)]">▫</div>
                  <div className="text-sm font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {t.platformSubscriptions}
                  </div>
                  <div className="mt-2 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.recurringRevenue}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="mb-2 text-lg text-[#7d471e] dark:text-[var(--dark-text)]">▥</div>
                  <div className="text-sm font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {t.ownershipShareFees}
                  </div>
                  <div className="mt-2 text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">
                    {t.feesFromManagement}
                  </div>
                </div>
              </div>
            </section>

            {/* Competitive Advantage */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-xl">
                {t.madakCompetitiveAdvantages}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="mb-1.5 text-sm font-semibold text-[#cda22b]">
                    {t.regulatoryAdvantage}
                  </div>
                  <div className="text-sm text-[#7d471e] dark:text-[var(--dark-text)]">
                    {t.regulatoryAdvantageDesc}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="mb-1.5 text-sm font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {t.liquidityAdvantage}
                  </div>
                  <div className="text-sm text-[#7d471e] dark:text-[var(--dark-text)]">
                    {t.liquidityAdvantageDesc}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="mb-1.5 text-sm font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {t.technologyAdvantage}
                  </div>
                  <div className="text-sm text-[#7d471e] dark:text-[var(--dark-text)]">
                    {t.technologyAdvantageDesc}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                  <div className="mb-1.5 text-sm font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                    {t.marketAdvantage}
                  </div>
                  <div className="text-sm text-[#7d471e] dark:text-[var(--dark-text)]">
                    {t.marketAdvantageDesc}
                  </div>
                </div>
              </div>
            </section>

            {/* Growth Strategy */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-xl">{t.madakGrowthStrategy}</h3>
              <div className="rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                <div className="flex items-start gap-3">
                  <div className="text-base text-[#7d471e] dark:text-[var(--dark-text)]">●</div>
                  <div className="flex-1 space-y-3">
                    <div className="text-sm text-[#7d471e] dark:text-[var(--dark-text)]">
                      {t.growth1}
                    </div>
                    <div className="text-sm text-[#7d471e] dark:text-[var(--dark-text)]">
                      {t.growth2}
                    </div>
                    <div className="text-sm text-[#7d471e] dark:text-[var(--dark-text)]">
                      {t.growth3}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Investment Thesis */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-xl">{t.investmentThesis}</h3>
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
                <div className="mb-3 text-sm font-semibold text-[#cda22b]">
                  {t.whyInvest}
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e] dark:text-[var(--dark-text)]">{t.thesis1}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e] dark:text-[var(--dark-text)]">{t.thesis2}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e] dark:text-[var(--dark-text)]">{t.thesis3}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e] dark:text-[var(--dark-text)]">{t.thesis4}</span>
                  </div>
                  <div className="flex items-start gap-2 md:col-span-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span className="text-sm text-[#7d471e] dark:text-[var(--dark-text)]">{t.thesis5}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Team */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-xl">{t.madakFoundingTeam}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3 rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
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
                      <p className="text-sm font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                        Hussain Hameed Aldeen
                      </p>
                      <p className="text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">{t.hussainTitle}</p>
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
                  <p className="text-xs leading-relaxed text-[#7d471e] dark:text-[var(--dark-text)]">
                    {t.hussainBio}
                  </p>
                </div>
                <div className="space-y-3 rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-5">
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
                      <p className="text-sm font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                        Abdulaziz Alardi
                      </p>
                      <p className="text-xs text-slate-600 dark:text-[var(--dark-text-muted)]">{t.abdulazizTitle}</p>
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
                  <p className="text-xs leading-relaxed text-[#7d471e] dark:text-[var(--dark-text)]">
                    {t.abdulazizBio}
                  </p>
                </div>
              </div>
            </section>

            {/* Recognition */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)] sm:text-xl">{t.recognition}</h3>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-[var(--dark-border)] bg-white dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)] p-6">
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
            <div className="rounded-3xl border border-emerald-200 dark:border-[var(--dark-border)] bg-gradient-to-br from-emerald-50/40 via-white to-amber-50/30 p-6 shadow-[0_0_40px_-8px_rgba(16,185,129,0.25),0_0_20px_-10px_rgba(205,162,43,0.1)] dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#cda22b]">
                {t.dealSnapshot}
              </p>
              <div className="mt-5 space-y-3 text-sm text-[#7d471e] dark:text-[var(--dark-text)]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-[var(--dark-text-muted)]">{t.preValuation}</span>
                  <span className="font-medium text-[#7d471e] dark:text-[var(--dark-text)]">$10M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-[var(--dark-text-muted)]">{t.postValuation}</span>
                  <span className="font-medium text-[#7d471e] dark:text-[var(--dark-text)]">$10.32M</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 dark:border-[var(--dark-border)] pt-3">
                  <span className="text-slate-600 dark:text-[var(--dark-text-muted)]">{t.fundraisingAsk}</span>
                  <span className="text-lg font-bold text-[#cda22b]">$150K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-[var(--dark-text-muted)]">{t.status}</span>
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
              <p className="mt-3 text-[11px] leading-relaxed text-[#7d471e] dark:text-[var(--dark-text)]">
                {t.whatsappRedirectNote}
              </p>
            </div>

            {/* Final Call To Action */}
            <div className="rounded-3xl border border-slate-200 dark:border-[var(--dark-border)] bg-gradient-to-br from-white to-slate-50/60 p-6 shadow-[0_0_24px_-10px_rgba(125,71,30,0.06)] dark:bg-gradient-to-b dark:from-[var(--dark-surface-alt)] dark:via-[var(--dark-surface)] dark:to-[var(--dark-surface)]">
              <h2 className="text-lg font-semibold text-[#7d471e] dark:text-[var(--dark-text)]">
                {t.connectWithFinjan}
              </h2>
              <p className="mt-2 text-sm text-[#7d471e] dark:text-[var(--dark-text)]">{t.connectDesc}</p>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={FINJAN_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-emerald-300 bg-white dark:border-[var(--dark-border)] dark:bg-[var(--dark-surface)] px-6 py-2.5 text-sm font-semibold text-[#cda22b] transition hover:bg-amber-50 dark:hover:bg-[var(--dark-surface-alt)]"
                >
                  {t.connectWithUs}
                </a>
                <div className="space-y-1 text-xs text-[#7d471e] dark:text-[var(--dark-text)]">
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
              <p className="mt-4 text-[11px] text-[#7d471e] dark:text-[var(--dark-text)]">{t.legalDisclaimer}</p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
