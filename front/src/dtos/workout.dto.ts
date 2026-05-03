export interface LoggedSet {
  weight: number;
  reps: number;
  rpe: number;
  completed: boolean;
}

export interface ExerciseProgress {
  sets: LoggedSet[];
  notes: string;
}
