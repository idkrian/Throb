export const APP_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const dayKey = (d: Date | string, tz: string = APP_TZ): string =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(d));

export const isSameDay = (a: Date | string, b: Date | string): boolean =>
  dayKey(a) === dayKey(b);

export const todayKey = (): string => dayKey(new Date());

export const formatDate = (
  d: Date | string,
  opts: Intl.DateTimeFormatOptions,
  locale = "en-US",
): string =>
  new Intl.DateTimeFormat(locale, { timeZone: APP_TZ, ...opts }).format(
    new Date(d),
  );
