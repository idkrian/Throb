import { IoClose } from "react-icons/io5";
import { MuscleGroupLabel, MuscleLabel } from "@/dtos/muscle.dto";
import type { ExerciseDto } from "@/dtos/exercise.dto";
import MuscleIcon from "@/components/exercises/MuscleIcon";

type Props = {
  exercise: ExerciseDto | null;
  onClose: () => void;
};

const ExerciseDrawer = ({ exercise, onClose }: Props) => {
  const open = !!exercise;
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
                <p className="text-sm text-lightGrey/60 italic">
                  No data yet — log a workout to see your PRs.
                </p>
              </Section>

              <Section label="Last Performed">
                <p className="text-sm text-lightGrey/60 italic">
                  Not performed yet.
                </p>
              </Section>

              <Section label="History">
                <p className="text-sm text-lightGrey/60 italic">
                  Volume and weight trends will appear here.
                </p>
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

export default ExerciseDrawer;
