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

export interface MuscleGroupItemsDto {
  muscleGroup: MuscleGroupType;
  items: MuscleDto[];
}

export interface MuscleDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  muscleGroup: string;
  muscle: string;
}
