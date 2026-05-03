import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { getMuscleGroups } from "@/api/exercise";
import {
  MuscleGroup,
  MuscleGroupLabel,
  MuscleLabel,
  type ExerciseFilter,
  type MuscleGroupItemsDto,
  type MuscleGroupType,
} from "@/dtos/muscle.dto";
import type { ExerciseDto } from "@/dtos/exercise.dto";
import CreateExerciseModal from "@/components/modals/CreateExerciseModal";
import ExerciseSidebar from "@/components/exercises/ExerciseSidebar";
import ExerciseCard from "@/components/exercises/ExerciseCard";
import ExercisesEmptyState from "@/components/exercises/ExercisesEmptyState";
import ExerciseDrawer from "@/components/exercises/ExerciseDrawer";

const Exercises = () => {
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroupItemsDto[]>([]);
  const [filter, setExerciseFilter] = useState<ExerciseFilter>("ALL");
  const [search, setSearch] = useState("");
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDto | null>(
    null,
  );
  const [createOpen, setCreateOpen] = useState<MuscleGroupType | null>(null);

  const fetchData = () => getMuscleGroups().then(setMuscleGroups);

  useEffect(() => {
    fetchData();
  }, []);

  const allExercises: ExerciseDto[] = useMemo(
    () =>
      muscleGroups.flatMap((g) =>
        g.items.map((item) => ({ ...item, muscleGroup: g.muscleGroup })),
      ),
    [muscleGroups],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { ALL: allExercises.length };
    muscleGroups.forEach((g) => {
      map[g.muscleGroup] = g.items.length;
    });
    return map;
  }, [muscleGroups, allExercises]);

  const visibleExercises = useMemo(() => {
    const base =
      filter === "ALL"
        ? allExercises
        : allExercises.filter((e) => e.muscleGroup === filter);
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        MuscleLabel[e.muscle].toLowerCase().includes(q),
    );
  }, [allExercises, filter, search]);

  const headerLabel =
    filter === "ALL"
      ? "All Exercises"
      : MuscleGroupLabel[filter as MuscleGroupType];

  const openCreate = () =>
    setCreateOpen(filter === "ALL" ? MuscleGroup.CHEST : filter);

  return (
    <div className="flex h-full w-full text-white overflow-hidden">
      <ExerciseSidebar filter={filter} counts={counts} onChange={setExerciseFilter} />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center gap-4 px-8 py-6 border-b border-darkGrey">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{headerLabel}</h1>
            <p className="text-sm text-lightGrey/60">
              {visibleExercises.length}{" "}
              {visibleExercises.length === 1 ? "exercise" : "exercises"}
            </p>
          </div>
          <div className="flex-1" />
          <div className="relative w-80 max-w-full">
            <LuSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-lightGrey/50"
              size={16}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exercises..."
              className="w-full bg-mediumGrey rounded-lg pl-9 pr-3 py-2 text-sm outline-none border border-transparent focus:border-indigo transition-colors"
            />
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-indigo hover:bg-lightIndigo transition-colors rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer"
          >
            <FaPlus size={12} />
            New Exercise
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {visibleExercises.length === 0 ? (
            <ExercisesEmptyState filter={filter} onCreate={openCreate} />
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
              {visibleExercises.map((ex) => (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  onClick={() => setSelectedExercise(ex)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <ExerciseDrawer
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />

      {createOpen && (
        <CreateExerciseModal
          open={!!createOpen}
          onClose={() => setCreateOpen(null)}
          muscle={createOpen}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
};

export default Exercises;
