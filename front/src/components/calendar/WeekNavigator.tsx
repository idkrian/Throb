import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface WeekNavigatorProps {
  label: string;
  weekOffset: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const WeekNavigator = ({
  label,
  weekOffset,
  onPrev,
  onNext,
  onToday,
}: WeekNavigatorProps) => (
  <div className="flex items-center justify-between gap-3 px-4 py-2 rounded-lg bg-mediumGrey/60 border border-darkGrey">
    <div className="flex items-center gap-2">
      <button
        aria-label="Previous week"
        onClick={onPrev}
        className="flex items-center justify-center w-8 h-8 rounded-md bg-darkGrey hover:bg-darkGrey/70 text-white cursor-pointer transition"
      >
        <LuChevronLeft size={18} />
      </button>
      <button
        aria-label="Next week"
        onClick={onNext}
        className="flex items-center justify-center w-8 h-8 rounded-md bg-darkGrey hover:bg-darkGrey/70 text-white cursor-pointer transition"
      >
        <LuChevronRight size={18} />
      </button>
    </div>
    <p className="text-white font-semibold capitalize tracking-wide">{label}</p>
    <button
      onClick={onToday}
      disabled={weekOffset === 0}
      className="px-3 h-8 rounded-md text-xs font-semibold text-white bg-indigo hover:bg-darkIndigo cursor-pointer transition disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Today
    </button>
  </div>
);

export default WeekNavigator;
