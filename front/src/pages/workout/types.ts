export type LoggedSet = {
  weight: number;
  reps: number;
  rpe: number;
  completed: boolean;
};

export type ExerciseProgress = {
  sets: LoggedSet[];
  notes: string;
};
