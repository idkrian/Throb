import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MuscleGroupLabel, MuscleLabel } from "@/dtos/muscle.dto";
import type { ExerciseDto } from "@/dtos/exercise.dto";
import type { ExerciseStatsDto } from "@/dtos/exercise.dto";
import MuscleIcon from "@/components/exercises/MuscleIcon";
import { getExerciseStats } from "@/api/exercise";

type Props = {
  exercise: ExerciseDto | null;
  onClose: () => void;
};

const ExerciseDrawer = ({ exercise, onClose }: Props) => {
  const open = !!exercise;
  const [stats, setStats] = useState<ExerciseStatsDto | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!exercise) return;
    setStats(null);
    setLoading(true);
    getExerciseStats(exercise.id)
      .then(setStats)
      .finally(() => setLoading(false));
  }, [exercise?.id]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-96 max-w-full bg-darkGrey border-l border-mediumGrey z-50 transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {exercise && (
          <>
            <div className="flex items-center justify-between p-5 border-b border-mediumGrey">
              <p className="text-xs uppercase tracking-wider text-lightGrey/60 font-semibold">
                Exercise Details
              </p>
              <IoClose
                size={22}
                className="cursor-pointer text-lightGrey/70 hover:text-white"
                onClick={onClose}
              />
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-mediumGrey flex items-center justify-center">
                  <MuscleIcon group={exercise.muscleGroup} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{exercise.title}</h2>
                  <p className="text-sm text-lightGrey/60">
                    {MuscleGroupLabel[exercise.muscleGroup]}
                  </p>
                </div>
              </div>

              <Section label="Primary Muscle">
                <span className="inline-block text-sm px-3 py-1.5 rounded-md bg-darkIndigo/40 text-lightIndigo border border-indigo/30">
                  {MuscleLabel[exercise.muscle]}
                </span>
              </Section>

              <Section label="Personal Best">
                {loading ? (
                  <Placeholder />
                ) : stats?.personalBest ? (
                  <div className="flex items-center gap-2">
                    {stats.personalBest.weight !== null && (
                      <Stat value={`${stats.personalBest.weight} kg`} />
                    )}
                    <Stat value={`${stats.personalBest.reps} reps`} />
                  </div>
                ) : (
                  <Empty text="No data yet — log a workout to see your PRs." />
                )}
              </Section>

              <Section label="Last Performed">
                {loading ? (
                  <Placeholder />
                ) : stats?.lastPerformed ? (
                  <p className="text-sm text-lightGrey">
                    {new Date(stats.lastPerformed).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                ) : (
                  <Empty text="Not performed yet." />
                )}
              </Section>

              <Section label="History">
                {loading ? (
                  <Placeholder />
                ) : stats && stats.history.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {stats.history.map((entry, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <p className="text-xs text-lightGrey/50">
                          {new Date(entry.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <div className="flex flex-col gap-1">
                          {entry.sets.map((set) => (
                            <p
                              key={set.setNumber}
                              className="text-sm text-lightGrey"
                            >
                              Set {set.setNumber}:{" "}
                              <span className="font-medium">
                                {set.reps} reps
                                {set.weight !== null
                                  ? ` × ${set.weight} kg`
                                  : ""}
                              </span>
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty text="Volume and weight trends will appear here." />
                )}
              </Section>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <p className="text-xs uppercase tracking-wider text-lightGrey/50 font-semibold">
      {label}
    </p>
    {children}
  </div>
);

const Stat = ({ value }: { value: string }) => (
  <span className="text-sm font-semibold px-3 py-1.5 rounded-md bg-mediumGrey text-white">
    {value}
  </span>
);

const Empty = ({ text }: { text: string }) => (
  <p className="text-sm text-lightGrey/60 italic">{text}</p>
);

const Placeholder = () => (
  <div className="h-5 w-32 rounded bg-mediumGrey animate-pulse" />
);

export default ExerciseDrawer;
