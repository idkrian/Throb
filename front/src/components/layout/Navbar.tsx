import { useEffect, useMemo, useState } from "react";
import {
  LuLayoutDashboard,
  LuBicepsFlexed,
  LuClipboardList,
  LuCalendar,
  LuDumbbell,
  LuPlay,
} from "react-icons/lu";
import { Link, NavLink } from "react-router";
import { getTrainingSplitDays } from "@/api/training-split-day";
import { getAllWorkouts } from "@/api/workout";
import type { TrainingSplitDayMap } from "@/dtos/training-split-day.dto";

const navItems = [
  { to: "/", label: "Dashboard", Icon: LuLayoutDashboard, end: true },
  { to: "/exercises", label: "Exercises", Icon: LuBicepsFlexed, end: false },
  {
    to: "/training-splits",
    label: "Splits",
    Icon: LuClipboardList,
    end: false,
  },
  { to: "/calendar", label: "Calendar", Icon: LuCalendar, end: false },
];

const DAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"];

const startOfWeek = (d: Date) => {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  out.setDate(out.getDate() - out.getDay());
  return out;
};

const Navbar = () => {
  const [byDay, setByDay] = useState<TrainingSplitDayMap>({});
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

  useEffect(() => {
    getTrainingSplitDays().then(setByDay);
    getAllWorkouts().then((sessions) => {
      const weekStart = startOfWeek(new Date()).getTime();
      const weekEnd = weekStart + 7 * 24 * 60 * 60 * 1000;
      const days = new Set<number>();
      sessions.forEach((s) => {
        const t = new Date(s.createdAt).getTime();
        if (t >= weekStart && t < weekEnd) {
          days.add(new Date(s.createdAt).getDay());
        }
      });
      setCompletedDays(days);
    });
  }, []);

  const today = new Date().getDay();
  const todayEntry = byDay[today];
  const todaySplit =
    todayEntry && !todayEntry.restDay ? todayEntry.trainingSplit : undefined;

  const weekCells = useMemo(
    () =>
      DAY_LETTERS.map((letter, i) => {
        const entry = byDay[i];
        const isTraining = entry && !entry.restDay;
        const isToday = i === today;
        const isCompleted = completedDays.has(i);
        return { letter, i, isTraining, isToday, isCompleted };
      }),
    [byDay, completedDays, today],
  );

  return (
    <header className="flex items-center justify-between gap-6 shrink-0 pb-4 border-b border-mediumGrey">
      <Link to="/" className="flex items-center gap-3 group shrink-0">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo/40 blur-lg rounded-xl group-hover:bg-indigo/60 transition" />
          <div className="relative bg-linear-to-br from-indigo to-darkIndigo p-2.5 rounded-xl border border-lightIndigo/40">
            <LuDumbbell size={24} className="text-white" />
          </div>
        </div>
        <span className="text-2xl font-extrabold tracking-tight bg-linear-to-r from-lightIndigo via-indigo to-lightIndigo bg-clip-text text-transparent">
          FitForge
        </span>
      </Link>

      <nav className="flex gap-6 items-center">
        {navItems.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `relative flex items-center gap-2 py-1 transition-colors ${
                isActive
                  ? "text-lightIndigo"
                  : "text-lightGrey/50 hover:text-lightGrey"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} />
                <span className="text-xs font-medium uppercase tracking-wider">
                  {label}
                </span>
                <span
                  className={`absolute left-0 right-0 -bottom-1 h-px bg-lightIndigo transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <div className="flex gap-1">
          {weekCells.map(({ letter, i, isTraining, isToday, isCompleted }) => {
            let cellClass = "text-lightGrey/30";
            if (isTraining) cellClass = "text-lightGrey/70";
            if (isCompleted) cellClass = "text-lightIndigo";
            if (isToday)
              cellClass = "text-lightIndigo border-b border-lightIndigo";
            return (
              <div
                key={i}
                className={`w-7 h-7 flex items-center justify-center text-[11px] font-medium tracking-wider ${cellClass}`}
                title={
                  isToday
                    ? "Today"
                    : isCompleted
                      ? "Trained"
                      : isTraining
                        ? "Scheduled"
                        : "Rest"
                }
              >
                {isTraining || isCompleted ? letter : "·"}
              </div>
            );
          })}
        </div>

        {todaySplit ? (
          <Link
            to={`/workout/${todaySplit.id}`}
            className="group flex items-center gap-2 text-xs"
          >
            <span className="text-lightGrey/50 uppercase tracking-wider">
              Today
            </span>
            <span className="font-semibold text-lightIndigo">
              {todaySplit.title}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo/20 border border-indigo/40 text-lightIndigo group-hover:bg-indigo group-hover:text-white transition">
              <LuPlay size={10} />
              Start
            </span>
          </Link>
        ) : (
          <span className="text-xs text-lightGrey/50 uppercase tracking-wider">
            Rest Day
          </span>
        )}
      </div>
    </header>
  );
};

export default Navbar;
