import { Suspense } from "react";
import InvestmentLanding from "./opportunity/InvestmentLanding";
import type { Locale } from "@/lib/translations";

export const dynamic = "force-dynamic";

type HomeProps = {
  searchParams?: { ref?: string; lang?: string };
};

export default function Home({ searchParams }: HomeProps) {
  const refCode = searchParams?.ref ?? null;
  const lang =
    searchParams?.lang === "ar" ? ("ar" as Locale) : ("en" as Locale);

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <InvestmentLanding refCode={refCode} lang={lang} />
    </Suspense>
  );
}
