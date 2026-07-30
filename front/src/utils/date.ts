// Single source of truth for "what day is this".
//
// Timestamps come from the API as UTC instants (e.g. "2026-07-25T07:43:56.941Z").
// The device's timezone decides which calendar day that instant falls on, so any
// logic that mixes a UTC instant with local getters (getDate/setHours/getDay) is
// fragile. Everything date-related routes through the helpers below, which resolve
// a day in one explicit timezone — the viewer's own, auto-detected — so the whole
// app agrees on the same definition of a day regardless of where it runs.
//
// To make the app timezone deterministic instead (e.g. always Brazil) or to honor a
// per-user preference, override APP_TZ or pass an explicit `tz` into dayKey.
export const APP_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * The calendar day of an instant as "YYYY-MM-DD" in the given timezone.
 * Comparing these strings is unambiguous — no time-of-day, no offset math.
 */
export const dayKey = (d: Date | string, tz: string = APP_TZ): string =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(d));

/** True when both instants fall on the same calendar day in APP_TZ. */
export const isSameDay = (a: Date | string, b: Date | string): boolean =>
  dayKey(a) === dayKey(b);

/** Today's day key in APP_TZ. */
export const todayKey = (): string => dayKey(new Date());

/**
 * Formats an instant for display in APP_TZ, so a date always *shows* on the same
 * day it is bucketed to. Defaults to pt-BR; pass a locale for other formats.
 */
export const formatDate = (
  d: Date | string,
  opts: Intl.DateTimeFormatOptions,
  locale = "pt-BR",
): string =>
  new Intl.DateTimeFormat(locale, { timeZone: APP_TZ, ...opts }).format(
    new Date(d),
  );
