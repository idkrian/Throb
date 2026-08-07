import { useEffect, useMemo, useState } from "react";
import { LuPlay, LuLogOut } from "react-icons/lu";
import { Link, NavLink } from "react-router";
import { getTrainingSplitDays } from "@/api/training-split-day";
import { getAllWorkouts } from "@/api/workout";
import type { TrainingSplitDayMap } from "@/dtos/training-split-day.dto";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/assets/icons/pulse-gradient.svg";
import { navItems } from "./nav-items";

const DAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"];

const startOfWeek = (d: Date) => {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  out.setDate(out.getDate() - out.getDay());
  return out;
};

type WeekCell = {
  letter: string;
  index: number;
  isTraining: boolean;
  isToday: boolean;
  isCompleted: boolean;
};

const WeekStrip = ({ cells }: { cells: WeekCell[] }) => (
  <div className="flex gap-1">
    {cells.map(({ letter, index, isTraining, isToday, isCompleted }) => {
      let cellClass = "text-lightGrey/30";
      if (isTraining) cellClass = "text-lightGrey/70";
      if (isCompleted) cellClass = "text-lightIndigo";
      if (isToday) cellClass = "text-lightIndigo border-b border-lightIndigo";

      let title = "Rest";
      if (isTraining) title = "Scheduled";
      if (isCompleted) title = "Trained";
      if (isToday) title = "Today";

      return (
        <div
          key={index}
          className={`flex h-7 w-7 items-center justify-center text-[11px] font-medium tracking-wider ${cellClass}`}
          title={title}
        >
          {isTraining || isCompleted ? letter : "·"}
        </div>
      );
    })}
  </div>
);

const Navbar = () => {
  const { user, logout } = useAuth();
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

  const weekCells = useMemo<WeekCell[]>(
    () =>
      DAY_LETTERS.map((letter, index) => ({
        letter,
        index,
        isTraining: Boolean(byDay[index] && !byDay[index].restDay),
        isToday: index === today,
        isCompleted: completedDays.has(index),
      })),
    [byDay, completedDays, today],
  );

  const logoutTitle = user ? `Sair (${user.name})` : "Sair";

  return (
    <>
      <header className="flex shrink-0 flex-col gap-3 border-b border-mediumGrey pb-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="relative flex shrink-0 items-center">
            <div className="absolute inset-0 rounded-xl bg-indigo/40 blur-xl" />
            <img src={Logo} alt="Throb" className="relative size-9" />
          </Link>

          <WeekStrip cells={weekCells} />

          <button
            onClick={logout}
            title={logoutTitle}
            aria-label={logoutTitle}
            className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-mediumGrey text-lightGrey/50 transition-colors active:border-red-500/40 active:text-red-400"
          >
            <LuLogOut size={16} />
          </button>
        </div>

        {todaySplit ? (
          <Link
            to={`/workout/${todaySplit.id}`}
            className="flex items-center justify-between gap-3 rounded-lg border border-indigo/40 bg-indigo/15 px-3 py-2.5"
          >
            <span className="flex min-w-0 flex-col">
              <span className="text-[10px] uppercase tracking-wider text-lightGrey/50">
                Today
              </span>
              <span className="truncate text-sm font-semibold text-lightIndigo">
                {todaySplit.title}
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 rounded-md bg-indigo px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white">
              <LuPlay size={11} />
              Start
            </span>
          </Link>
        ) : (
          <div className="rounded-lg border border-mediumGrey px-3 py-2 text-center text-xs uppercase tracking-wider text-lightGrey/50">
            Rest Day
          </div>
        )}
      </header>

      <header className="hidden shrink-0 items-center justify-between gap-6 border-b border-mediumGrey pb-4 lg:flex">
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-indigo/40 blur-xl transition group-hover:bg-indigo/60" />
            <img src={Logo} alt="Throb" className="size-12" />
          </div>
        </Link>

        <nav className="flex items-center gap-6">
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
                    className={`absolute -bottom-1 left-0 right-0 h-px bg-lightIndigo transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-5">
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <WeekStrip cells={weekCells} />

            {todaySplit ? (
              <Link
                to={`/workout/${todaySplit.id}`}
                className="group flex items-center gap-2 text-xs"
              >
                <span className="uppercase tracking-wider text-lightGrey/50">
                  Today
                </span>
                <span className="font-semibold text-lightIndigo">
                  {todaySplit.title}
                </span>
                <span className="flex items-center gap-1 rounded-md border border-indigo/40 bg-indigo/20 px-2 py-0.5 text-lightIndigo transition group-hover:bg-indigo group-hover:text-white">
                  <LuPlay size={10} />
                  Start
                </span>
              </Link>
            ) : (
              <span className="text-xs uppercase tracking-wider text-lightGrey/50">
                Rest Day
              </span>
            )}
          </div>

          <button
            onClick={logout}
            title={logoutTitle}
            aria-label={logoutTitle}
            className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-mediumGrey text-lightGrey/50 transition-colors hover:border-red-500/40 hover:text-red-400"
          >
            <LuLogOut
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
