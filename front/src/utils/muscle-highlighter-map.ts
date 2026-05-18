import type { Muscle } from "react-body-highlighter";
import type { MuscleType } from "@/dtos/muscle.dto";

export const muscleToHighlighter: Partial<Record<MuscleType, Muscle[]>> = {
  CHEST_GENERAL: ["chest"],
  UPPER_CHEST: ["chest"],
  MIDDLE_CHEST: ["chest"],
  LOWER_CHEST: ["chest"],

  BACK_GENERAL: ["upper-back"],
  LATS: ["upper-back"],
  TRAPS: ["trapezius"],
  LOWER_BACK: ["lower-back"],
  RHOMBOIDS: ["upper-back"],

  SHOULDERS_GENERAL: ["front-deltoids", "back-deltoids"],
  FRONT_DELTOID: ["front-deltoids"],
  SIDE_DELTOID: ["front-deltoids"],
  REAR_DELTOID: ["back-deltoids"],

  ARMS_GENERAL: ["biceps", "triceps"],
  BICEPS_LONG_HEAD: ["biceps"],
  BICEPS_SHORT_HEAD: ["biceps"],
  TRICEPS_LONG_HEAD: ["triceps"],
  TRICEPS_LATERAL_HEAD: ["triceps"],
  TRICEPS_MEDIAL_HEAD: ["triceps"],

  FOREARMS_GENERAL: ["forearm"],
  BRACHIORADIALIS: ["forearm"],
  PRONATOR_TERES: ["forearm"],
  FLEXORS: ["forearm"],
  EXTENSORS: ["forearm"],

  LEGS_GENERAL: ["quadriceps", "hamstring"],
  QUADRICEPS: ["quadriceps"],
  HAMSTRINGS: ["hamstring"],
  CALVES: ["calves"],

  GLUTES_GENERAL: ["gluteal"],
  GLUTEUS_MAXIMUS: ["gluteal"],
  GLUTEUS_MEDIUS: ["gluteal"],
  GLUTEUS_MINIMUS: ["gluteal"],

  CORE_GENERAL: ["abs"],
  ABS: ["abs"],
  OBLIQUES: ["obliques"],
};

export type NormalizedMuscleStat = {
  name: string;
  muscles: Muscle[];
  frequency: number;
};

export function buildHighlighterData(
  stats: { muscle: string; totalSets: number }[],
  buckets = 5,
): NormalizedMuscleStat[] {
  const maxSets = Math.max(...stats.map((s) => s.totalSets), 1);

  const aggregated = new Map<Muscle, { totalSets: number; names: string[] }>();

  for (const stat of stats) {
    const highlighterMuscles =
      muscleToHighlighter[stat.muscle as MuscleType] ?? [];

    for (const hMuscle of highlighterMuscles) {
      const existing = aggregated.get(hMuscle);
      if (existing) {
        existing.totalSets += stat.totalSets;
        existing.names.push(stat.muscle);
      } else {
        aggregated.set(hMuscle, {
          totalSets: stat.totalSets,
          names: [stat.muscle],
        });
      }
    }
  }

  const aggregatedMax = Math.max(
    ...[...aggregated.values()].map((v) => v.totalSets),
    maxSets,
  );

  return [...aggregated.entries()].map(([muscle, data]) => ({
    name: muscle,
    muscles: [muscle],
    frequency: Math.max(1, Math.ceil((data.totalSets / aggregatedMax) * buckets)),
  }));
}
