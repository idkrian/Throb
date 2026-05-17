import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  createTrainingSplitDay,
  deleteTrainingSplitDay,
  getTrainingSplitDays,
  updateTrainingSplitDay,
} from "@/api/training-split-day";
import { getAllWorkouts } from "@/api/workout";
import type {
  TrainingSplitDayEntry,
  TrainingSplitDayMap,
} from "@/dtos/training-split-day.dto";
import type { WorkoutSessionDto } from "@/dtos/workout-session.dto";
import {
  formatWeekRangeLabel,
  getWeekDays,
  isSameDay,
  startOfDay,
} from "@/utils";
import {
  computeStreak,
  findSessionOnDate,
  sessionVolume,
  sessionsInRange,
} from "@/utils/workout-history";
import CalendarLeftPanel from "@/components/calendar/CalendarLeftPanel";
import WeekNavigator from "@/components/calendar/WeekNavigator";
import DayCard, { type DayStatus } from "@/components/calendar/DayCard";
import SessionDetailModal from "@/components/calendar/SessionDetailModal";
import SwapSplitModal from "@/components/calendar/SwapSplitModal";

const Calendar = () => {
  const navigate = useNavigate();
  const [weekOffset, setWeekOffset] = useState(0);
  const [splitsByDay, setSplitsByDay] = useState<TrainingSplitDayMap>({});
  const [sessions, setSessions] = useState<WorkoutSessionDto[]>([]);

  const [openSession, setOpenSession] = useState<WorkoutSessionDto | null>(
    null,
  );
  const [swapTarget, setSwapTarget] = useState<{
    date: Date;
    dayName: string;
    dayNumber: number;
    entry?: TrainingSplitDayEntry;
  } | null>(null);

  const refreshSchedule = () => getTrainingSplitDays().then(setSplitsByDay);
  const refreshSessions = () => getAllWorkouts().then(setSessions);

  useEffect(() => {
    refreshSchedule();
    refreshSessions();
    const onFocus = () => refreshSessions();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const week = useMemo(() => getWeekDays(weekOffset), [weekOffset]);
  const today = useMemo(() => startOfDay(new Date()), []);
  const todayDayNumber = new Date().getDay();
  const todayEntry = splitsByDay[todayDayNumber];

  const weekRangeLabel = formatWeekRangeLabel(week);

  const { weekStart, weekEnd } = useMemo(() => {
    const start = startOfDay(week[0].date);
    const end = new Date(week[6].date);
    end.setHours(23, 59, 59, 999);
    return { weekStart: start, weekEnd: end };
  }, [week]);

  const weekSessions = useMemo(
    () => sessionsInRange(sessions, weekStart, weekEnd),
    [sessions, weekStart, weekEnd],
  );

  const weekVolume = useMemo(
    () => weekSessions.reduce((a, s) => a + sessionVolume(s), 0),
    [weekSessions],
  );

  const sessionsPlanned = useMemo(
    () =>
      week.filter((d) => {
        const entry = splitsByDay[d.dayNumber];
        return entry && !entry.restDay;
      }).length,
    [week, splitsByDay],
  );

  const sessionsCompleted = weekSessions.length;
  const streak = useMemo(() => computeStreak(sessions), [sessions]);

  const dayStatus = (date: Date, entry?: TrainingSplitDayEntry): DayStatus => {
    const dayStart = startOfDay(date);
    const isToday = isSameDay(dayStart, today);
    const isPast = dayStart.getTime() < today.getTime();
    const session = findSessionOnDate(sessions, dayStart);

    if (session) return "completed";
    if (entry?.restDay) return "rest";
    if (!entry) return isToday ? "today" : "empty";
    if (isToday) return "today";
    if (isPast) return "missed";
    return "upcoming";
  };

  const handleDayClick = (
    date: Date,
    dayName: string,
    dayNumber: number,
    entry: TrainingSplitDayEntry | undefined,
    session: WorkoutSessionDto | undefined,
    status: DayStatus,
  ) => {
    if (session) {
      setOpenSession(session);
      return;
    }
    if (status === "today" && entry && !entry.restDay) {
      navigate(`/workout/${entry.trainingSplit.id}`);
      return;
    }
    setSwapTarget({ date, dayName, dayNumber, entry });
  };

  const handleAssign = async (trainingSplitId: number, restDay: boolean) => {
    if (!swapTarget) return;
    const { dayNumber, entry } = swapTarget;
    if (entry) {
      await updateTrainingSplitDay(entry.id, { trainingSplitId, restDay });
    } else {
      await createTrainingSplitDay({
        dayOfWeek: dayNumber,
        trainingSplitId,
        restDay,
      });
    }
    await refreshSchedule();
    setSwapTarget(null);
  };

  const handleRemove = async () => {
    if (!swapTarget?.entry) return;
    await deleteTrainingSplitDay(swapTarget.entry.id);
    await refreshSchedule();
    setSwapTarget(null);
  };

  const startTodayWorkout = () => {
    if (todayEntry && !todayEntry.restDay) {
      navigate(`/workout/${todayEntry.trainingSplit.id}`);
    }
  };

  return (
    <div className="flex w-full h-full">
      <CalendarLeftPanel
        todayEntry={todayEntry}
        weekVolume={weekVolume}
        sessionsCompleted={sessionsCompleted}
        sessionsPlanned={sessionsPlanned}
        streak={streak}
        onStartWorkout={startTodayWorkout}
      />

      <div className="flex flex-col w-[75%] h-full p-4 gap-4 min-h-0">
        <WeekNavigator
          label={weekRangeLabel}
          weekOffset={weekOffset}
          onPrev={() => setWeekOffset((o) => o - 1)}
          onNext={() => setWeekOffset((o) => o + 1)}
          onToday={() => setWeekOffset(0)}
        />

        <div className="grid grid-cols-7 gap-3 flex-1 min-h-0 overflow-y-auto">
          {week.map((day) => {
            const entry = splitsByDay[day.dayNumber];
            const session = findSessionOnDate(sessions, day.date);
            const status = dayStatus(day.date, entry);
            return (
              <DayCard
                key={day.date.toISOString()}
                date={day.date}
                dayName={day.dayName}
                dayLabel={day.day}
                status={status}
                entry={entry}
                session={session}
                onClick={() =>
                  handleDayClick(
                    day.date,
                    day.dayName,
                    day.dayNumber,
                    entry,
                    session,
                    status,
                  )
                }
              />
            );
          })}
        </div>
      </div>

      <SessionDetailModal
        open={openSession !== null}
        session={openSession}
        onClose={() => setOpenSession(null)}
      />

      {swapTarget && (
        <SwapSplitModal
          open
          date={swapTarget.date}
          dayName={swapTarget.dayName}
          currentEntry={swapTarget.entry}
          onClose={() => setSwapTarget(null)}
          onAssign={handleAssign}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
};

export default Calendar;
