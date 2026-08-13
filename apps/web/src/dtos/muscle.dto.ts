import type { ExerciseDto } from "./exercise.dto";

export const MuscleGroup = {
  CHEST: "CHEST",
  BACK: "BACK",
  SHOULDERS: "SHOULDERS",
  ARMS: "ARMS",
  LEGS: "LEGS",
  GLUTES: "GLUTES",
  CORE: "CORE",
} as const;

export type MuscleGroupType = (typeof MuscleGroup)[keyof typeof MuscleGroup];

export const Muscle = {
  // Chest
  CHEST_GENERAL: "CHEST_GENERAL",
  UPPER_CHEST: "UPPER_CHEST",
  MIDDLE_CHEST: "MIDDLE_CHEST",
  LOWER_CHEST: "LOWER_CHEST",

  // Back
  BACK_GENERAL: "BACK_GENERAL",
  LATS: "LATS",
  TRAPS: "TRAPS",
  LOWER_BACK: "LOWER_BACK",
  RHOMBOIDS: "RHOMBOIDS",

  // Shoulders
  SHOULDERS_GENERAL: "SHOULDERS_GENERAL",
  FRONT_DELTOID: "FRONT_DELTOID",
  SIDE_DELTOID: "SIDE_DELTOID",
  REAR_DELTOID: "REAR_DELTOID",

  // Arms
  ARMS_GENERAL: "ARMS_GENERAL",
  BICEPS_LONG_HEAD: "BICEPS_LONG_HEAD",
  BICEPS_SHORT_HEAD: "BICEPS_SHORT_HEAD",
  TRICEPS_LONG_HEAD: "TRICEPS_LONG_HEAD",
  TRICEPS_LATERAL_HEAD: "TRICEPS_LATERAL_HEAD",
  TRICEPS_MEDIAL_HEAD: "TRICEPS_MEDIAL_HEAD",

  // Forearms
  FOREARMS_GENERAL: "FOREARMS_GENERAL",
  BRACHIORADIALIS: "BRACHIORADIALIS",
  PRONATOR_TERES: "PRONATOR_TERES",
  FLEXORS: "FLEXORS",
  EXTENSORS: "EXTENSORS",

  // Legs
  LEGS_GENERAL: "LEGS_GENERAL",
  QUADRICEPS: "QUADRICEPS",
  HAMSTRINGS: "HAMSTRINGS",
  CALVES: "CALVES",

  // Glutes
  GLUTES_GENERAL: "GLUTES_GENERAL",
  GLUTEUS_MAXIMUS: "GLUTEUS_MAXIMUS",
  GLUTEUS_MEDIUS: "GLUTEUS_MEDIUS",
  GLUTEUS_MINIMUS: "GLUTEUS_MINIMUS",

  // Core
  CORE_GENERAL: "CORE_GENERAL",
  ABS: "ABS",
  OBLIQUES: "OBLIQUES",
} as const;

export type MuscleType = (typeof Muscle)[keyof typeof Muscle];

export const MuscleLabel: Record<MuscleType, string> = {
  CHEST_GENERAL: "Chest General",
  UPPER_CHEST: "Upper Chest",
  MIDDLE_CHEST: "Middle Chest",
  LOWER_CHEST: "Lower Chest",

  BACK_GENERAL: "Back General",
  LATS: "Lats",
  TRAPS: "Traps",
  LOWER_BACK: "Lower Back",
  RHOMBOIDS: "Rhomboids",

  SHOULDERS_GENERAL: "Shoulders General",
  FRONT_DELTOID: "Front Deltoid",
  SIDE_DELTOID: "Side Deltoid",
  REAR_DELTOID: "Rear Deltoid",

  ARMS_GENERAL: "Arms General",
  BICEPS_LONG_HEAD: "Biceps Long Head",
  BICEPS_SHORT_HEAD: "Biceps Short Head",
  TRICEPS_LONG_HEAD: "Triceps Long Head",
  TRICEPS_LATERAL_HEAD: "Triceps Lateral Head",
  TRICEPS_MEDIAL_HEAD: "Triceps Medial Head",

  FOREARMS_GENERAL: "Forearms General",
  BRACHIORADIALIS: "Brachioradialis",
  PRONATOR_TERES: "Pronator Teres",
  FLEXORS: "Flexors",
  EXTENSORS: "Extensors",

  LEGS_GENERAL: "Legs General",
  QUADRICEPS: "Quadriceps",
  HAMSTRINGS: "Hamstrings",
  CALVES: "Calves",

  GLUTES_GENERAL: "Glutes General",
  GLUTEUS_MAXIMUS: "Gluteus Maximus",
  GLUTEUS_MEDIUS: "Gluteus Medius",
  GLUTEUS_MINIMUS: "Gluteus Minimus",

  CORE_GENERAL: "Core General",
  ABS: "Abs",
  OBLIQUES: "Obliques",
};

export const MusclesByGroup: Record<
  MuscleGroupType,
  { text: string; value: MuscleType }[]
> = {
  CHEST: [
    { text: MuscleLabel[Muscle.CHEST_GENERAL], value: Muscle.CHEST_GENERAL },
    { text: MuscleLabel[Muscle.UPPER_CHEST], value: Muscle.UPPER_CHEST },
    { text: MuscleLabel[Muscle.MIDDLE_CHEST], value: Muscle.MIDDLE_CHEST },
    { text: MuscleLabel[Muscle.LOWER_CHEST], value: Muscle.LOWER_CHEST },
  ],
  BACK: [
    { text: MuscleLabel[Muscle.BACK_GENERAL], value: Muscle.BACK_GENERAL },
    { text: MuscleLabel[Muscle.LATS], value: Muscle.LATS },
    { text: MuscleLabel[Muscle.TRAPS], value: Muscle.TRAPS },
    { text: MuscleLabel[Muscle.LOWER_BACK], value: Muscle.LOWER_BACK },
    { text: MuscleLabel[Muscle.RHOMBOIDS], value: Muscle.RHOMBOIDS },
  ],
  SHOULDERS: [
    {
      text: MuscleLabel[Muscle.SHOULDERS_GENERAL],
      value: Muscle.SHOULDERS_GENERAL,
    },
    { text: MuscleLabel[Muscle.FRONT_DELTOID], value: Muscle.FRONT_DELTOID },
    { text: MuscleLabel[Muscle.SIDE_DELTOID], value: Muscle.SIDE_DELTOID },
    { text: MuscleLabel[Muscle.REAR_DELTOID], value: Muscle.REAR_DELTOID },
  ],
  ARMS: [
    { text: MuscleLabel[Muscle.ARMS_GENERAL], value: Muscle.ARMS_GENERAL },
    {
      text: MuscleLabel[Muscle.BICEPS_LONG_HEAD],
      value: Muscle.BICEPS_LONG_HEAD,
    },
    {
      text: MuscleLabel[Muscle.BICEPS_SHORT_HEAD],
      value: Muscle.BICEPS_SHORT_HEAD,
    },
    {
      text: MuscleLabel[Muscle.TRICEPS_LONG_HEAD],
      value: Muscle.TRICEPS_LONG_HEAD,
    },
    {
      text: MuscleLabel[Muscle.TRICEPS_LATERAL_HEAD],
      value: Muscle.TRICEPS_LATERAL_HEAD,
    },
    {
      text: MuscleLabel[Muscle.TRICEPS_MEDIAL_HEAD],
      value: Muscle.TRICEPS_MEDIAL_HEAD,
    },
    {
      text: MuscleLabel[Muscle.FOREARMS_GENERAL],
      value: Muscle.FOREARMS_GENERAL,
    },
    {
      text: MuscleLabel[Muscle.BRACHIORADIALIS],
      value: Muscle.BRACHIORADIALIS,
    },
    {
      text: MuscleLabel[Muscle.PRONATOR_TERES],
      value: Muscle.PRONATOR_TERES,
    },
    { text: MuscleLabel[Muscle.FLEXORS], value: Muscle.FLEXORS },
    { text: MuscleLabel[Muscle.EXTENSORS], value: Muscle.EXTENSORS },
  ],
  LEGS: [
    { text: MuscleLabel[Muscle.LEGS_GENERAL], value: Muscle.LEGS_GENERAL },
    { text: MuscleLabel[Muscle.QUADRICEPS], value: Muscle.QUADRICEPS },
    { text: MuscleLabel[Muscle.HAMSTRINGS], value: Muscle.HAMSTRINGS },
    { text: MuscleLabel[Muscle.CALVES], value: Muscle.CALVES },
  ],
  GLUTES: [
    {
      text: MuscleLabel[Muscle.GLUTES_GENERAL],
      value: Muscle.GLUTES_GENERAL,
    },
    {
      text: MuscleLabel[Muscle.GLUTEUS_MAXIMUS],
      value: Muscle.GLUTEUS_MAXIMUS,
    },
    {
      text: MuscleLabel[Muscle.GLUTEUS_MEDIUS],
      value: Muscle.GLUTEUS_MEDIUS,
    },
    {
      text: MuscleLabel[Muscle.GLUTEUS_MINIMUS],
      value: Muscle.GLUTEUS_MINIMUS,
    },
  ],
  CORE: [
    { text: MuscleLabel[Muscle.CORE_GENERAL], value: Muscle.CORE_GENERAL },
    { text: MuscleLabel[Muscle.ABS], value: Muscle.ABS },
    { text: MuscleLabel[Muscle.OBLIQUES], value: Muscle.OBLIQUES },
  ],
};

export const MuscleGroupLabel: Record<MuscleGroupType, string> = {
  CHEST: "Chest",
  BACK: "Back",
  SHOULDERS: "Shoulders",
  ARMS: "Arms",
  LEGS: "Legs",
  GLUTES: "Glutes",
  CORE: "Core",
};

export interface MuscleGroupItemsDto {
  muscleGroup: MuscleGroupType;
  items: ExerciseDto[];
}

export type ExerciseFilter = MuscleGroupType | "ALL";
