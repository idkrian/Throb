import type { MuscleStatsPeriod } from "@/api/workout";

const PERIODS: { key: MuscleStatsPeriod; label: string }[] = [
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "trimester", label: "3 Months" },
  { key: "semester", label: "6 Months" },
];

type PeriodSelectorProps = {
  period: MuscleStatsPeriod;
  onChange: (period: MuscleStatsPeriod) => void;
};

const PeriodSelector = ({ period, onChange }: PeriodSelectorProps) => (
  <div className="flex w-full items-center gap-1 rounded-lg bg-darkGrey p-1 lg:w-auto">
    {PERIODS.map(({ key, label }) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        className={`flex-1 cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-200 lg:flex-none ${
          period === key
            ? "bg-indigo text-white"
            : "text-lightGrey hover:bg-mediumGrey"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

export default PeriodSelector;
