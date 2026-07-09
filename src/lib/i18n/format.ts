import type { Language } from "./languages";

const LOCALE_MAP: Record<Language, string> = {
  en: "en-US",
  vi: "vi-VN",
  ru: "ru-RU",
  uk: "uk-UA",
};

export function localeForLanguage(lang: Language): string {
  return LOCALE_MAP[lang] ?? "en-US";
}

export function formatDate(
  lang: Language,
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString(localeForLanguage(lang), options);
}

export function formatTime(
  lang: Language,
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleTimeString(localeForLanguage(lang), options);
}

export function formatDateTime(
  lang: Language,
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleString(localeForLanguage(lang), options);
}

export function formatNumber(
  lang: Language,
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return value.toLocaleString(localeForLanguage(lang), options);
}
