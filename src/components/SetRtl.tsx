"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/translations";

type SetRtlProps = {
  lang: Locale;
};

export default function SetRtl({ lang }: SetRtlProps) {
  useEffect(() => {
    const html = document.documentElement;
    if (lang === "ar") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
    }
    return () => {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
    };
  }, [lang]);
  return null;
}
