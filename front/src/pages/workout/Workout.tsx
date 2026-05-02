import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  LuChevronLeft,
  LuChevronRight,
  LuCheck,
  LuMinus,
  LuPlus,
  LuPlay,
  LuPause,
  LuRotateCw,
  LuTimer,
  LuFlame,
  LuTrophy,
  LuStickyNote,
  LuCircleCheck,
} from "react-icons/lu";
import { getTrainingSplitById } from "@/api/training-split";
import { createWorkout } from "@/api/workout";
import type { TrainingSplitDto } from "@/dtos/training-splits.dto";
import Button from "@/components/ui/Button";

type LoggedSet = {
  weight: number;
  reps: number;
  rpe: number;
  completed: boolean;
};

type ExerciseProgress = {
  sets: LoggedSet[];
  notes: string;
};

const REST_PRESETS = [60, 90, 120, 180];
const DEFAULT_REST = 90;

const formatTime = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = m.toString().padStart(2, "0");
  const ss = s.toString().padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

const rpeColor = (rpe: number) => {
  if (rpe <= 5) return "bg-emerald-500";
  if (rpe <= 7) return "bg-amber-500";
  if (rpe <= 9) return "bg-orange-500";
  return "bg-red-500";
};

const Workout = () => {
  const { splitId } = useParams();
  const navigate = useNavigate();

  const [split, setSplit] = useState<TrainingSplitDto | null>(null);
  const [progress, setProgress] = useState<Record<number, ExerciseProgress>>(
    {},
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const [workoutSeconds, setWorkoutSeconds] = useState(0);
  const [workoutRunning, setWorkoutRunning] = useState(true);

  const [restRemaining, setRestRemaining] = useState(0);
  const [restTotal, setRestTotal] = useState(DEFAULT_REST);
  const [restRunning, setRestRunning] = useState(false);

  const [showSummary, setShowSummary] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pulseVolume, setPulseVolume] = useState(false);
  const [recentPR, setRecentPR] = useState<string | null>(null);
  const prTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (splitId) getTrainingSplitById(splitId).then(setSplit);
  }, [splitId]);

  useEffect(() => {
    if (!split) return;
    const initial: Record<number, ExerciseProgress> = {};
    split.exercises
      .sort((a, b) => a.order - b.order)
      .forEach((ex) => {
        initial[ex.id] = {
          sets: Array.from({ length: ex.sets }, () => ({
            weight: 0,
            reps: 0,
            rpe: 7,
            completed: false,
          })),
          notes: "",
        };
      });
    setProgress(initial);
  }, [split]);

  useEffect(() => {
    if (!workoutRunning) return;
    const id = window.setInterval(() => setWorkoutSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [workoutRunning]);

  useEffect(() => {
    if (!restRunning) return;
    const id = window.setInterval(() => {
      setRestRemaining((s) => {
        if (s <= 1) {
          setRestRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [restRunning]);

  const orderedExercises = useMemo(
    () => (split ? [...split.exercises].sort((a, b) => a.order - b.order) : []),
    [split],
  );

  const activeExercise = orderedExercises[activeIndex];

  const totalCompletedSets = useMemo(
    () =>
      Object.values(progress).reduce(
        (acc, p) => acc + p.sets.filter((s) => s.completed).length,
        0,
      ),
    [progress],
  );
  const totalSets = useMemo(
    () => Object.values(progress).reduce((acc, p) => acc + p.sets.length, 0),
    [progress],
  );
  const overallPct = totalSets ? (totalCompletedSets / totalSets) * 100 : 0;

  const totalVolume = useMemo(
    () =>
      Object.values(progress).reduce(
        (acc, p) =>
          acc +
          p.sets
            .filter((s) => s.completed)
            .reduce((a, s) => a + s.weight * s.reps, 0),
        0,
      ),
    [progress],
  );

  const exerciseFinishedCount = orderedExercises.filter((ex) =>
    progress[ex.id]?.sets.every((s) => s.completed),
  ).length;

  const updateSet = (
    exerciseId: number,
    setIdx: number,
    patch: Partial<LoggedSet>,
  ) => {
    setProgress((prev) => {
      const ex = prev[exerciseId];
      if (!ex) return prev;
      const sets = ex.sets.map((s, i) =>
        i === setIdx ? { ...s, ...patch } : s,
      );
      return { ...prev, [exerciseId]: { ...ex, sets } };
    });
  };

  const triggerPR = (label: string) => {
    setRecentPR(label);
    if (prTimeout.current) clearTimeout(prTimeout.current);
    prTimeout.current = window.setTimeout(() => setRecentPR(null), 2500);
  };

  const logSet = (exerciseId: number, setIdx: number) => {
    const target = progress[exerciseId]?.sets[setIdx];
    if (!target || target.completed) return;
    if (target.weight <= 0 || target.reps <= 0) return;

    updateSet(exerciseId, setIdx, { completed: true });
    setPulseVolume(true);
    setTimeout(() => setPulseVolume(false), 600);

    const previousBest = Math.max(
      0,
      ...progress[exerciseId].sets
        .filter((_, i) => i !== setIdx)
        .map((s) => s.weight),
    );
    if (target.weight > previousBest && previousBest > 0) {
      triggerPR(`New top weight on ${activeExercise?.exercise.title}`);
    }

    setRestRemaining(restTotal);
    setRestRunning(true);

    const allDone = progress[exerciseId].sets.every((s, i) =>
      i === setIdx ? true : s.completed,
    );
    if (allDone && activeIndex < orderedExercises.length - 1) {
      setTimeout(() => setActiveIndex((i) => i + 1), 800);
    }
  };

  const finishWorkout = async () => {
    if (!split) return;
    setSubmitting(true);
    try {
      await createWorkout({
        id: split.id,
        title: split.title,
        durationSeconds: workoutSeconds,
        exercises: orderedExercises
          .map((ex) => ({
            exerciseId: ex.exerciseId,
            sets: progress[ex.id].sets
              .filter((s) => s.completed)
              .map((s, i) => ({
                setNumber: i + 1,
                reps: s.reps,
                weight: s.weight,
              })),
          }))
          .filter((ex) => ex.sets.length > 0),
      });
      navigate("/");
    } catch (e) {
      console.error(e);
      setSubmitting(false);
    }
  };

  if (!split || !activeExercise) {
    return (
      <div className="flex w-full h-full items-center justify-center text-white">
        <LuRotateCw size={36} className="animate-spin text-indigo" />
      </div>
    );
  }

  const activeProgress = progress[activeExercise.id];
  const activeCompletedSets =
    activeProgress?.sets.filter((s) => s.completed).length ?? 0;
  const activeTargetReps = activeExercise.reps;

  const restPct = restTotal > 0 ? (restRemaining / restTotal) * 100 : 0;
  const restRingColor =
    restPct > 60 ? "#10b981" : restPct > 30 ? "#f59e0b" : "#ef4444";

  return (
    <div className="flex flex-col w-full h-full min-h-0 gap-4 text-white relative">
      {/* PR toast */}
      <div
        className={`fixed top-12 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          recentPR
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-linear-to-r from-amber-500 to-orange-600 shadow-lg shadow-orange-500/40">
          <LuFlame size={20} />
          <span className="font-semibold">{recentPR}</span>
        </div>
      </div>

      {/* Header: timer, progress, volume */}
      <div className="grid grid-cols-3 gap-4 shrink-0">
        <div className="bg-mediumGrey rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo/20 text-lightIndigo">
            <LuTimer size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-lightGrey/60 uppercase tracking-wider">
              Workout time
            </span>
            <span className="text-2xl font-bold tabular-nums">
              {formatTime(workoutSeconds)}
            </span>
          </div>
          <div className="ml-auto flex gap-1">
            <button
              className="p-2 rounded-lg hover:bg-darkGrey transition-colors cursor-pointer"
              onClick={() => setWorkoutRunning((r) => !r)}
            >
              {workoutRunning ? <LuPause size={20} /> : <LuPlay size={20} />}
            </button>
            <button
              className="p-2 rounded-lg hover:bg-darkGrey transition-colors cursor-pointer"
              onClick={() => {
                setWorkoutSeconds(0);
                setWorkoutRunning(true);
              }}
            >
              <LuRotateCw size={20} />
            </button>
          </div>
        </div>

        <div className="bg-mediumGrey rounded-xl p-4 flex flex-col justify-center gap-2">
          <div className="flex justify-between text-xs text-lightGrey/60 uppercase tracking-wider">
            <span>Progress</span>
            <span>
              {exerciseFinishedCount} / {orderedExercises.length} exercises
            </span>
          </div>
          <div className="h-2 bg-darkGrey rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-indigo to-lightIndigo rounded-full transition-all duration-500 ease-out"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <span className="text-xs text-lightGrey/60 tabular-nums">
            {totalCompletedSets} of {totalSets} sets done
          </span>
        </div>

        <div className="bg-mediumGrey rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo/20 text-lightIndigo">
            <LuTrophy size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-lightGrey/60 uppercase tracking-wider">
              Volume
            </span>
            <span
              className={`text-2xl font-bold tabular-nums transition-all duration-300 ${
                pulseVolume ? "text-lightIndigo scale-110" : ""
              }`}
            >
              {totalVolume.toLocaleString()} kg
            </span>
          </div>
        </div>
      </div>

      {/* Main row: active card | (rest timer + up next column) */}
      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
        {/* Active exercise card */}
        <div className="col-span-2 relative bg-linear-to-br from-mediumGrey to-darkGrey rounded-2xl p-5 shadow-xl shadow-indigo/10 border border-indigo/10 flex flex-col min-h-0 gap-4 overflow-hidden">
          <div className="flex items-center justify-between shrink-0">
            <button
              className="p-1.5 rounded-lg bg-darkGrey hover:bg-indigo/30 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
              disabled={activeIndex === 0}
            >
              <LuChevronLeft size={18} />
            </button>

            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest text-lightIndigo">
                Exercise {activeIndex + 1} of {orderedExercises.length}
              </p>
              <h2 className="text-xl font-bold leading-tight">
                {activeExercise.exercise.title}
              </h2>
              <p className="text-xs text-lightGrey/60">
                Target: {activeExercise.sets} × {activeTargetReps} reps
              </p>
            </div>

            <button
              className="p-1.5 rounded-lg bg-darkGrey hover:bg-indigo/30 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() =>
                setActiveIndex((i) =>
                  Math.min(orderedExercises.length - 1, i + 1),
                )
              }
              disabled={activeIndex === orderedExercises.length - 1}
            >
              <LuChevronRight size={18} />
            </button>
          </div>

          {/* Per-exercise progress dots */}
          <div className="flex gap-1.5 justify-center shrink-0">
            {activeProgress?.sets.map((s, i) => (
              <div
                key={i}
                className={`h-1 w-8 rounded-full transition-all duration-300 ${
                  s.completed
                    ? "bg-linear-to-r from-indigo to-lightIndigo"
                    : "bg-darkGrey"
                }`}
              />
            ))}
          </div>

          {/* Sets table */}
          <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto pr-1">
            <div className="grid grid-cols-[28px_1fr_70px_1.2fr_56px] gap-2 px-2 text-[10px] uppercase tracking-wider text-lightGrey/50 shrink-0">
              <span>Set</span>
              <span>Weight (kg)</span>
              <span className="text-center">Reps</span>
              <span>RPE</span>
              <span></span>
            </div>

            {activeProgress?.sets.map((set, i) => (
              <div
                key={i}
                className={`grid grid-cols-[28px_1fr_70px_1.2fr_56px] gap-2 items-center px-3 py-2.5 rounded-lg flex-1 min-h-11 transition-all duration-300 ${
                  set.completed
                    ? "bg-emerald-500/10 border border-emerald-500/30"
                    : "bg-darkGrey/60 border border-transparent"
                }`}
              >
                <span
                  className={`font-bold text-sm ${
                    set.completed ? "text-emerald-400" : "text-lightIndigo"
                  }`}
                >
                  {i + 1}
                </span>

                {/* Weight stepper */}
                <div className="flex items-center gap-1">
                  <button
                    disabled={set.completed}
                    onClick={() =>
                      updateSet(activeExercise.id, i, {
                        weight: Math.max(0, set.weight - 2.5),
                      })
                    }
                    className="p-1 rounded-md bg-mediumGrey hover:bg-indigo/40 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <LuMinus size={12} />
                  </button>
                  <input
                    type="number"
                    step={0.5}
                    disabled={set.completed}
                    value={set.weight || ""}
                    placeholder="0"
                    onChange={(e) =>
                      updateSet(activeExercise.id, i, {
                        weight: Number(e.target.value),
                      })
                    }
                    className="w-full text-center bg-transparent font-semibold text-sm outline-none focus:bg-mediumGrey rounded-md py-0.5 transition-colors"
                  />
                  <button
                    disabled={set.completed}
                    onClick={() =>
                      updateSet(activeExercise.id, i, {
                        weight: set.weight + 2.5,
                      })
                    }
                    className="p-1 rounded-md bg-mediumGrey hover:bg-indigo/40 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <LuPlus size={12} />
                  </button>
                </div>

                {/* Reps */}
                <input
                  type="number"
                  disabled={set.completed}
                  value={set.reps || ""}
                  placeholder={activeTargetReps}
                  onChange={(e) =>
                    updateSet(activeExercise.id, i, {
                      reps: Number(e.target.value),
                    })
                  }
                  className="w-full text-center bg-mediumGrey/60 font-semibold text-sm outline-none rounded-md py-1 focus:bg-mediumGrey transition-colors disabled:bg-transparent"
                />

                {/* RPE slider */}
                <div className="flex items-center gap-1.5">
                  <input
                    type="range"
                    min={1}
                    max={10}
                    disabled={set.completed}
                    value={set.rpe}
                    onChange={(e) =>
                      updateSet(activeExercise.id, i, {
                        rpe: Number(e.target.value),
                      })
                    }
                    className="flex-1 min-w-0 accent-indigo cursor-pointer disabled:cursor-not-allowed"
                  />
                  <span
                    className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded min-w-6 text-center ${rpeColor(
                      set.rpe,
                    )}`}
                  >
                    {set.rpe}
                  </span>
                </div>

                {/* Log button */}
                <button
                  disabled={set.completed || set.weight <= 0 || set.reps <= 0}
                  onClick={() => logSet(activeExercise.id, i)}
                  className={`flex items-center justify-center h-7 rounded-md font-semibold transition-all duration-200 cursor-pointer ${
                    set.completed
                      ? "bg-emerald-500/20 text-emerald-400 cursor-default"
                      : "bg-indigo hover:bg-darkIndigo hover:scale-105 disabled:bg-mediumGrey disabled:text-lightGrey/30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  }`}
                >
                  <LuCheck size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="flex items-start gap-2 shrink-0">
            <LuStickyNote
              size={14}
              className="mt-1.5 text-lightIndigo shrink-0"
            />
            <textarea
              value={activeProgress?.notes ?? ""}
              placeholder="Notes — how did this exercise feel?"
              onChange={(e) =>
                setProgress((prev) => ({
                  ...prev,
                  [activeExercise.id]: {
                    ...prev[activeExercise.id],
                    notes: e.target.value,
                  },
                }))
              }
              className="flex-1 bg-darkGrey/60 rounded-lg px-2 py-1.5 text-xs outline-none focus:bg-darkGrey resize-none"
              rows={1}
            />
          </div>

          <p className="text-[10px] text-lightGrey/40 text-center shrink-0">
            {activeCompletedSets} / {activeProgress?.sets.length ?? 0} sets
            logged
          </p>
        </div>

        {/* Right column: rest timer + up next */}
        <div className="flex flex-col gap-4 min-h-0">
          {/* Rest timer */}
          <div className="bg-mediumGrey rounded-2xl p-3 flex items-center gap-3">
            <div className="relative size-20 shrink-0">
              <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#14141f"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={restRingColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - restPct / 100)}`}
                  className="transition-all duration-500 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold tabular-nums">
                  {formatTime(restRemaining)}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <span className="text-[10px] uppercase tracking-widest text-lightGrey/60">
                Rest Timer
              </span>
              <div className="flex gap-1 flex-wrap">
                {REST_PRESETS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setRestTotal(s);
                      setRestRemaining(s);
                      setRestRunning(true);
                    }}
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-full transition-colors cursor-pointer ${
                      restTotal === s
                        ? "bg-indigo text-white"
                        : "bg-darkGrey hover:bg-indigo/40"
                    }`}
                  >
                    {s}s
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setRestRunning((r) => !r)}
                  className="p-1.5 rounded-md bg-darkGrey hover:bg-indigo/40 transition-colors cursor-pointer"
                >
                  {restRunning ? <LuPause size={12} /> : <LuPlay size={12} />}
                </button>
                <button
                  onClick={() => {
                    setRestRunning(false);
                    setRestRemaining(0);
                  }}
                  className="p-1.5 rounded-md bg-darkGrey hover:bg-indigo/40 transition-colors cursor-pointer"
                >
                  <LuRotateCw size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Next-up list */}
          <div className="bg-mediumGrey rounded-2xl p-3 flex-1 min-h-0 flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-lightGrey/60 shrink-0">
              Up Next
            </span>
            <div className="flex flex-col gap-1.5 mt-2 overflow-y-auto pr-1 flex-1">
              {orderedExercises.map((ex, i) => {
                const done = progress[ex.id]?.sets.every((s) => s.completed);
                const isActive = i === activeIndex;
                return (
                  <button
                    key={ex.id}
                    onClick={() => setActiveIndex(i)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-indigo/30 border border-indigo"
                        : done
                          ? "bg-emerald-500/10 opacity-60 hover:opacity-100"
                          : "bg-darkGrey hover:bg-darkGrey/60"
                    }`}
                  >
                    <span
                      className={`size-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        done
                          ? "bg-emerald-500/30 text-emerald-400"
                          : isActive
                            ? "bg-indigo text-white"
                            : "bg-mediumGrey text-lightGrey/60"
                      }`}
                    >
                      {done ? <LuCircleCheck size={12} /> : i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs truncate">
                        {ex.exercise.title}
                      </p>
                      <p className="text-[10px] text-lightGrey/50">
                        {ex.sets} × {ex.reps}
                      </p>
                    </div>
                    <span className="text-[10px] text-lightGrey/40 tabular-nums">
                      {progress[ex.id]?.sets.filter((s) => s.completed)
                        .length ?? 0}
                      /{ex.sets}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Finish */}
      <div className="flex justify-end shrink-0">
        <Button label="Finish Workout" onClick={() => setShowSummary(true)} />
      </div>

      {/* Summary modal */}
      {showSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-8">
          <div className="bg-linear-to-br from-mediumGrey to-darkGrey rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-indigo/30">
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="p-3 rounded-full bg-indigo/20">
                <LuTrophy size={36} className="text-lightIndigo" />
              </div>
              <h2 className="text-3xl font-bold">Workout Complete</h2>
              <p className="text-lightGrey/60">{split.title}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-darkGrey rounded-xl p-4 text-center">
                <p className="text-xs uppercase text-lightGrey/50">Time</p>
                <p className="text-2xl font-bold tabular-nums mt-1">
                  {formatTime(workoutSeconds)}
                </p>
              </div>
              <div className="bg-darkGrey rounded-xl p-4 text-center">
                <p className="text-xs uppercase text-lightGrey/50">Volume</p>
                <p className="text-2xl font-bold tabular-nums mt-1">
                  {totalVolume.toLocaleString()}
                  <span className="text-sm text-lightGrey/50"> kg</span>
                </p>
              </div>
              <div className="bg-darkGrey rounded-xl p-4 text-center">
                <p className="text-xs uppercase text-lightGrey/50">Sets</p>
                <p className="text-2xl font-bold tabular-nums mt-1">
                  {totalCompletedSets}
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowSummary(false)}
                className="px-4 py-2 rounded-md text-lightGrey hover:bg-darkGrey transition-colors cursor-pointer"
              >
                Keep going
              </button>
              <Button
                label="SAVE"
                onClick={finishWorkout}
                loading={submitting}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workout;
