import { LuFlame, LuPlay, LuMoon, LuDumbbell, LuLayers, LuTrophy } from "react-icons/lu";
import type { TrainingSplitDayEntry } from "@/dtos/training-split-day.dto";
import type { WorkoutSessionDto } from "@/dtos/workout-session.dto";
import { DEFAULT_ACCENT, formatDate, muscleGroupAccent, summarizeSplit } from "@/utils";
import { formatVolume, sessionVolume } from "@/utils/workout-history";

interface CalendarLeftPanelProps {
  todayEntry?: TrainingSplitDayEntry;
  todaySession?: WorkoutSessionDto;
  weekVolume: number;
  sessionsCompleted: number;
  sessionsPlanned: number;
  streak: number;
  onStartWorkout: () => void;
}

const CalendarLeftPanel = ({
  todayEntry,
  todaySession,
  weekVolume,
  sessionsCompleted,
  sessionsPlanned,
  streak,
  onStartWorkout,
}: CalendarLeftPanelProps) => {
  const today = new Date();
  const split = todayEntry?.trainingSplit;
  const isRest = todayEntry?.restDay ?? !split;
  const summary = split ? summarizeSplit(split) : null;
  const accent =
    summary?.primaryGroup != null
      ? muscleGroupAccent[summary.primaryGroup]
      : DEFAULT_ACCENT;

  return (
    <div
      className={`flex flex-col items-center justify-between bg-linear-to-b ${accent.gradient} w-[25%] p-6 gap-6`}
    >
      <div className="flex flex-col items-center">
        <p className="text-white font-bold text-8xl leading-none">
          {formatDate(today, { day: "numeric" })}
        </p>
        <p className="text-white/90 font-semibold text-3xl capitalize mt-1">
          {formatDate(today, { weekday: "long" })}
        </p>
        <p className="text-white/60 text-sm capitalize">
          {formatDate(today, { month: "long", year: "numeric" })}
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        {!isRest && !todaySession && (
          <p className="text-white/70 font-semibold text-sm uppercase tracking-wider">
            Treino do Dia
          </p>
        )}
        {todaySession ? (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <LuTrophy size={36} className="text-yellow-300" />
            <p className="text-white font-bold text-2xl">Workout Done!</p>
            <p className="text-white/70 text-sm">
              {split ? split.title : "Great session"} completed
            </p>
            <div className="grid grid-cols-2 gap-2 w-full mt-1">
              <div className="flex flex-col items-center rounded-md bg-black/20 py-1.5 text-white">
                <span className="text-sm font-semibold">
                  {todaySession.workoutExerciseLogs?.length ?? 0} ex
                </span>
              </div>
              <div className="flex flex-col items-center rounded-md bg-black/20 py-1.5 text-white">
                <span className="text-sm font-semibold">
                  {formatVolume(sessionVolume(todaySession))}
                </span>
              </div>
            </div>
          </div>
        ) : isRest ? (
          <div className="flex flex-col items-center gap-2 py-4">
            <LuMoon size={36} className="text-white/80" />
            <p className="text-white font-bold text-2xl">Rest Day</p>
            <p className="text-white/60 text-xs text-center">
              No training scheduled — recover well.
            </p>
          </div>
        ) : split && summary ? (
          <>
            <p className="text-center text-white font-bold text-4xl">
              {split.title}
            </p>
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="flex items-center justify-center gap-1.5 rounded-md bg-black/20 py-1.5 text-white">
                <LuDumbbell size={14} />
                <span className="text-sm font-semibold">
                  {summary.exerciseCount} ex
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 rounded-md bg-black/20 py-1.5 text-white">
                <LuLayers size={14} />
                <span className="text-sm font-semibold">
                  {summary.totalSets} sets
                </span>
              </div>
            </div>
            <button
              onClick={onStartWorkout}
              className="flex items-center justify-center gap-2 w-full h-11 rounded-md bg-white text-darkGrey font-bold cursor-pointer transition hover:scale-[1.02]"
            >
              <LuPlay size={16} />
              Start Workout
            </button>
          </>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <p className="text-white/70 font-semibold text-xs uppercase tracking-wider text-center">
          This Week
        </p>
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="flex flex-col items-center rounded-md bg-black/25 py-2">
            <span className="text-white font-bold text-lg leading-none">
              {sessionsCompleted}/{sessionsPlanned}
            </span>
            <span className="text-white/60 text-[10px] uppercase tracking-wide mt-1">
              sessions
            </span>
          </div>
          <div className="flex flex-col items-center rounded-md bg-black/25 py-2">
            <span className="text-white font-bold text-lg leading-none">
              {formatVolume(weekVolume)}
            </span>
            <span className="text-white/60 text-[10px] uppercase tracking-wide mt-1">
              volume
            </span>
          </div>
          <div className="flex flex-col items-center rounded-md bg-black/25 py-2">
            <div className="flex items-center gap-1 text-white">
              <LuFlame size={14} className="text-orange-300" />
              <span className="font-bold text-lg leading-none">{streak}</span>
            </div>
            <span className="text-white/60 text-[10px] uppercase tracking-wide mt-1">
              streak
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarLeftPanel;
