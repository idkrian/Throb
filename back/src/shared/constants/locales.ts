export const SUPPORTED_LOCALES = ["en", "pt"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

const isSupported = (value: string): value is Locale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(value);

export const resolveLocale = (header: string | undefined): Locale => {
  if (!header) return DEFAULT_LOCALE;

  for (const part of header.split(",")) {
    const tag = part.split(";")[0]?.trim().toLowerCase();
    if (!tag) continue;
    const primary = tag.split("-")[0]!;
    if (isSupported(primary)) return primary;
  }

  return DEFAULT_LOCALE;
};
