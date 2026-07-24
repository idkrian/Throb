import type { UnitPreference } from "@/dtos/auth.dto";

const LB_PER_KG = 2.20462;

/**
 * Weights are always stored in kilograms. The unit preference only changes how
 * they are shown and typed, never what is persisted — otherwise switching units
 * would corrupt existing history.
 */
export const unitLabel = (unit: UnitPreference): string =>
  unit === "LB" ? "lb" : "kg";

/** Canonical (kg) -> what the user sees. */
export const toDisplayWeight = (kg: number, unit: UnitPreference): number =>
  unit === "LB" ? Math.round(kg * LB_PER_KG * 100) / 100 : kg;

/** What the user typed -> canonical (kg). */
export const toCanonicalWeight = (
  value: number,
  unit: UnitPreference,
): number =>
  unit === "LB" ? Math.round((value / LB_PER_KG) * 100) / 100 : value;

/** Display value plus its unit, e.g. "82.5 kg". Trims trailing zeros. */
export const formatWeight = (kg: number, unit: UnitPreference): string => {
  const value = toDisplayWeight(kg, unit);
  const rounded = Math.round(value * 100) / 100;
  return `${rounded} ${unitLabel(unit)}`;
};

/** Step used by weight inputs — plates differ between units. */
export const weightStep = (unit: UnitPreference): number =>
  unit === "LB" ? 5 : 2.5;
