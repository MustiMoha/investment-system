"use client";

import Link from "next/link";
import type { Locale } from "@/lib/translations";

type LanguageToggleProps = {
  currentLang: Locale;
  refCode: string | null;
};

export default function LanguageToggle({
  currentLang,
  refCode,
}: LanguageToggleProps) {
  const href =
    currentLang === "en"
      ? refCode
        ? `/?lang=ar&ref=${encodeURIComponent(refCode)}`
        : "/?lang=ar"
      : refCode
        ? `/?ref=${encodeURIComponent(refCode)}`
        : "/";

  const label = currentLang === "en" ? "العربية" : "English";

  return (
    <Link
      href={href}
      className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-[#7d471e] transition hover:border-[#cda22b] hover:text-[#cda22b] dark:border-[var(--dark-border)] dark:bg-[var(--dark-surface)] dark:text-[var(--dark-text)] dark:hover:border-[var(--dark-accent)] dark:hover:text-[var(--dark-accent)]"
      aria-label={currentLang === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      {label}
    </Link>
  );
}
