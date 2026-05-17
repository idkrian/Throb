import type { WorkoutSessionDto } from "@/dtos/workout-session.dto";
import { isSameDay } from "./index";

export const sessionVolume = (session: WorkoutSessionDto): number =>
  session.workoutExerciseLogs.reduce(
    (sum, log) =>
      sum +
      log.workoutSets.reduce(
        (a, s) => a + (s.weight ?? 0) * (s.reps ?? 0),
        0,
      ),
    0,
  );

export const sessionTotalSets = (session: WorkoutSessionDto): number =>
  session.workoutExerciseLogs.reduce(
    (sum, log) => sum + log.workoutSets.length,
    0,
  );

export const findSessionOnDate = (
  sessions: WorkoutSessionDto[],
  date: Date,
): WorkoutSessionDto | undefined =>
  sessions.find((s) => isSameDay(new Date(s.createdAt), date));

export const sessionsInRange = (
  sessions: WorkoutSessionDto[],
  start: Date,
  end: Date,
): WorkoutSessionDto[] =>
  sessions.filter((s) => {
    const t = new Date(s.createdAt).getTime();
    return t >= start.getTime() && t <= end.getTime();
  });

export const formatVolume = (volume: number): string => {
  if (volume >= 1000) return `${(volume / 1000).toFixed(1)}k`;
  return `${volume}`;
};

export const computeStreak = (sessions: WorkoutSessionDto[]): number => {
  if (sessions.length === 0) return 0;
  const dates = new Set(
    sessions.map((s) => {
      const d = new Date(s.createdAt);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    }),
  );
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  // If today has no session, start counting from yesterday so an in-progress day doesn't reset the streak.
  if (!dates.has(cursor.getTime())) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let streak = 0;
  while (dates.has(cursor.getTime())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};
