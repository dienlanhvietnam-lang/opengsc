"use client";

import { useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import { localeForLanguage } from "./format";

export default function LocaleHtmlSync() {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = localeForLanguage(language).split("-")[0];
    document.title = t("metaTitle");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("metaDescription"));
  }, [language, t]);

  return null;
}
