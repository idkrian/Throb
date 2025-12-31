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
  CHEST_GENERAL: "Chest",
  UPPER_CHEST: "Upper Chest",
  MIDDLE_CHEST: "Middle Chest",
  LOWER_CHEST: "Lower Chest",

  BACK_GENERAL: "Back",
  LATS: "Lats",
  TRAPS: "Traps",
  LOWER_BACK: "Lower Back",
  RHOMBOIDS: "Rhomboids",

  SHOULDERS_GENERAL: "Shoulders",
  FRONT_DELTOID: "Front Deltoid",
  SIDE_DELTOID: "Side Deltoid",
  REAR_DELTOID: "Rear Deltoid",

  ARMS_GENERAL: "Arms",
  BICEPS_LONG_HEAD: "Biceps Long Head",
  BICEPS_SHORT_HEAD: "Biceps Short Head",
  TRICEPS_LONG_HEAD: "Triceps Long Head",
  TRICEPS_LATERAL_HEAD: "Triceps Lateral Head",
  TRICEPS_MEDIAL_HEAD: "Triceps Medial Head",

  FOREARMS_GENERAL: "Forearms",
  BRACHIORADIALIS: "Brachioradialis",
  PRONATOR_TERES: "Pronator Teres",
  FLEXORS: "Flexors",
  EXTENSORS: "Extensors",

  LEGS_GENERAL: "Legs",
  QUADRICEPS: "Quadriceps",
  HAMSTRINGS: "Hamstrings",
  CALVES: "Calves",

  GLUTES_GENERAL: "Glutes",
  GLUTEUS_MAXIMUS: "Gluteus Maximus",
  GLUTEUS_MEDIUS: "Gluteus Medius",
  GLUTEUS_MINIMUS: "Gluteus Minimus",

  CORE_GENERAL: "Core",
  ABS: "Abs",
  OBLIQUES: "Obliques",
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
  items: MuscleDto[];
}

export interface MuscleDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  muscleGroup: MuscleGroupType;
  muscle: MuscleType;
}
