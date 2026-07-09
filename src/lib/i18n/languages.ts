export const UI_LANGUAGES = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "vi", label: "VI", flag: "🇻🇳" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
  { code: "uk", label: "UK", flag: "🇺🇦" },
] as const;

export type Language = (typeof UI_LANGUAGES)[number]["code"];

export const SUPPORTED_LANGUAGES: Language[] = UI_LANGUAGES.map((l) => l.code);

export function isLanguage(value: string): value is Language {
  return SUPPORTED_LANGUAGES.includes(value as Language);
}

export function detectBrowserLanguage(): Language {
  const nav = (typeof navigator !== "undefined" ? navigator.language : "en").toLowerCase();
  if (nav.startsWith("vi")) return "vi";
  if (nav.startsWith("uk")) return "uk";
  if (nav.startsWith("ru")) return "ru";
  return "en";
}
