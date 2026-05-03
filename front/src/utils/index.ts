import type { MuscleGroupItemsDto, MuscleGroupType } from "../dtos/muscle.dto";

export const getWeekDays = () => {
  const days = [];
  const today = new Date();
  const dayOfWeek = today.getDay();

  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(today);
  monday.setDate(today.getDate() + daysToMonday);

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    days.push({
      date: date,
      dayName: date.toLocaleDateString("pt-BR", { weekday: "long" }),
      day: `${date.getDate()}/${date.getMonth() + 1}`,
      dayNumber: date.getDay() - 1,
    });
  }

  return days;
};

export const getExercisesByMuscleGroup = (
  muscleGroupExercises: MuscleGroupItemsDto[],
  group: MuscleGroupType,
) => {
  return (
    muscleGroupExercises.find((mg) => mg.muscleGroup === group)?.items || []
  );
};

export const getMusclesByMuscleGroup = (
  muscleGroupExercises: MuscleGroupItemsDto[],
  group: MuscleGroupType,
) => {
  const exercises = getExercisesByMuscleGroup(muscleGroupExercises, group);
  const musclesSet = [...new Set(exercises.map((m) => m.muscle))];
  return musclesSet;
};

export const REST_PRESETS = [60, 90, 120, 180];
export const DEFAULT_REST = 90;

export const formatTime = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = m.toString().padStart(2, "0");
  const ss = s.toString().padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

export const rpeColor = (rpe: number) => {
  if (rpe <= 5) return "bg-emerald-500";
  if (rpe <= 7) return "bg-amber-500";
  if (rpe <= 9) return "bg-orange-500";
  return "bg-red-500";
};
