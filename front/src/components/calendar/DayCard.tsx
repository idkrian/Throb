import {
  LuCheck,
  LuMoon,
  LuPencil,
  LuPlay,
  LuPlus,
  LuTriangleAlert,
} from "react-icons/lu";
import type { TrainingSplitDayEntry } from "@/dtos/training-split-day.dto";
import type { WorkoutSessionDto } from "@/dtos/workout-session.dto";
import { DEFAULT_ACCENT, formatDate, muscleGroupAccent, summarizeSplit } from "@/utils";
import {
  formatVolume,
  sessionTotalSets,
  sessionVolume,
} from "@/utils/workout-history";

export type DayStatus =
  | "today"
  | "completed"
  | "missed"
  | "upcoming"
  | "rest"
  | "empty";

interface DayCardProps {
  date: Date;
  dayName: string;
  dayLabel: string;
  status: DayStatus;
  entry?: TrainingSplitDayEntry;
  session?: WorkoutSessionDto;
  onClick: () => void;
  onEdit?: () => void;
}

const statusStyles: Record<DayStatus, string> = {
  today: "border-indigo ring-2 ring-indigo/40",
  completed: "border-emerald-500/60",
  missed: "border-red-500/40",
  upcoming: "border-transparent hover:border-white/15",
  rest: "border-transparent",
  empty: "border-dashed border-white/10 hover:border-white/30",
};

const statusBadge = (status: DayStatus) => {
  switch (status) {
    case "today":
      return (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo text-white uppercase tracking-wider">
          Today
        </span>
      );
    case "completed":
      return (
        <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 uppercase tracking-wider">
          <LuCheck size={10} /> Done
        </span>
      );
    case "missed":
      return (
        <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-300 uppercase tracking-wider">
          <LuTriangleAlert size={10} /> Missed
        </span>
      );
    default:
      return null;
  }
};

const DayCard = ({
  date,
  dayName,
  dayLabel,
  status,
  entry,
  session,
  onClick,
  onEdit,
}: DayCardProps) => {
  const split = entry?.trainingSplit;
  const summary = split ? summarizeSplit(split) : null;
  const accent =
    summary?.primaryGroup != null
      ? muscleGroupAccent[summary.primaryGroup]
      : DEFAULT_ACCENT;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group flex flex-col rounded-xl bg-mediumGrey border-2 ${statusStyles[status]} shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-1 overflow-hidden`}
    >
      <div className="flex items-center justify-between px-3 py-2 bg-darkGrey/50">
        <div className="flex flex-col leading-tight">
          <span className="text-white font-semibold text-sm capitalize">
            {dayName}
          </span>
          <span className="text-white/50 text-xs tabular-nums">{dayLabel}</span>
        </div>
        {statusBadge(status)}
      </div>

      <div className="flex flex-col p-3 gap-2 min-h-[140px]">
        {status === "rest" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-1 text-white/50">
            <LuMoon size={22} />
            <span className="text-sm font-semibold">Rest Day</span>
          </div>
        )}

        {status === "empty" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-1 text-white/30 group-hover:text-white/60 transition">
            <LuPlus size={22} />
            <span className="text-xs">Assign split</span>
          </div>
        )}

        {split && status !== "rest" && status !== "empty" && (
          <>
            <div
              className={`px-2 py-1.5 rounded-md bg-linear-to-br ${accent.gradient}`}
            >
              <p className="text-white font-bold text-sm truncate">
                {split.title}
              </p>
            </div>

            {summary && (
              <div className="grid grid-cols-2 gap-1.5 text-white">
                <div className="flex flex-col items-center rounded-md bg-darkGrey/60 py-1">
                  <span className="text-xs font-bold">
                    {summary.exerciseCount}
                  </span>
                  <span className="text-[9px] text-lightGrey/60 uppercase">
                    ex
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-md bg-darkGrey/60 py-1">
                  <span className="text-xs font-bold">{summary.totalSets}</span>
                  <span className="text-[9px] text-lightGrey/60 uppercase">
                    sets
                  </span>
                </div>
              </div>
            )}

            {status === "completed" && session && (
              <div className="flex items-center justify-between text-[11px] text-emerald-300/80 mt-auto">
                <span>{formatVolume(sessionVolume(session))} kg</span>
                <span>{sessionTotalSets(session)} sets logged</span>
              </div>
            )}

            {status === "today" && (
              <div className="flex items-center gap-1 mt-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                  className="flex flex-1 items-center justify-center gap-1 h-7 rounded-md bg-indigo hover:bg-darkIndigo text-white text-xs font-semibold transition"
                >
                  <LuPlay size={11} />
                  Start
                </button>
                {onEdit && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                    title="Editar treino"
                    aria-label="Editar treino"
                    className="flex items-center justify-center h-7 w-7 shrink-0 rounded-md bg-darkGrey/60 hover:bg-darkGrey text-white/70 hover:text-white transition cursor-pointer"
                  >
                    <LuPencil size={12} />
                  </button>
                )}
              </div>
            )}

            {status === "missed" && (
              <div className="text-center text-[11px] text-red-300/80 mt-auto">
                No workout logged
              </div>
            )}
          </>
        )}

        <span className="sr-only">
          {formatDate(date, { dateStyle: "full" })}
        </span>
      </div>
    </div>
  );
};

export default DayCard;
