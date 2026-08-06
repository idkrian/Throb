import type { UnitPreference } from "@/dtos/auth.dto";

const LB_PER_KG = 2.20462;

export const unitLabel = (unit: UnitPreference): string =>
  unit === "LB" ? "lb" : "kg";

export const toDisplayWeight = (kg: number, unit: UnitPreference): number =>
  unit === "LB" ? Math.round(kg * LB_PER_KG * 10) / 10 : kg;

export const toCanonicalWeight = (
  value: number,
  unit: UnitPreference,
): number =>
  unit === "LB" ? Math.round((value / LB_PER_KG) * 100) / 100 : value;

export const formatWeight = (kg: number, unit: UnitPreference): string => {
  const value = toDisplayWeight(kg, unit);
  const rounded = Math.round(value * 100) / 100;
  return `${rounded} ${unitLabel(unit)}`;
};

export const weightStep = (unit: UnitPreference): number =>
  unit === "LB" ? 5 : 2.5;
