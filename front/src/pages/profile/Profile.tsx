import { useEffect, useState } from "react";
import { LuScale, LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import { createBodyWeight, getBodyWeights } from "@/api/body-weight";
import BodyWeightChart from "@/components/charts/BodyWeightChart";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import type { BodyWeightDto } from "@/dtos/body-weight.dto";
import type { UnitPreference } from "@/dtos/auth.dto";
import { formatWeight, toCanonicalWeight, unitLabel } from "@/utils/units";
import { formatDate } from "@/utils/date";

const UNITS: UnitPreference[] = ["KG", "LB"];

const Profile = () => {
  const { user, unit, updateProfile } = useAuth();
  const [entries, setEntries] = useState<BodyWeightDto[]>([]);
  const [weightInput, setWeightInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getBodyWeights().then(setEntries).catch(console.error);
  }, []);

  const latest = entries.at(-1) ?? null;
  const previous = entries.at(-2) ?? null;
  const delta = latest && previous ? latest.weight - previous.weight : null;

  const logWeight = async () => {
    const typed = Number(weightInput);
    if (!typed || typed <= 0 || saving) return;

    setSaving(true);
    try {
      const created = await createBodyWeight({
        weight: toCanonicalWeight(typed, unit),
      });
      setEntries((prev) => {
        const rest = prev.filter((e) => e.id !== created.id);
        return [...rest, created];
      });
      setWeightInput("");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const changeUnit = async (next: UnitPreference) => {
    if (next === unit) return;
    try {
      await updateProfile({ unitPreference: next });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-3 overflow-hidden">
      <div className="grid grid-cols-3 gap-3 shrink-0">
        <div className="flex items-center gap-3 rounded-lg bg-mediumGrey px-4 py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-darkIndigo/40">
            <LuScale className="h-4 w-4 text-lightIndigo" />
          </div>
          <div className="min-w-0">
            <p className="text-xl font-bold leading-tight text-white">
              {latest ? formatWeight(latest.weight, unit) : "--"}
            </p>
            <p className="truncate text-xs text-lightGrey/60">Current weight</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-mediumGrey px-4 py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-darkIndigo/40">
            {delta !== null && delta < 0 ? (
              <LuTrendingDown className="h-4 w-4 text-emerald-400" />
            ) : (
              <LuTrendingUp className="h-4 w-4 text-lightIndigo" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xl font-bold leading-tight text-white">
              {delta !== null
                ? `${delta > 0 ? "+" : ""}${formatWeight(delta, unit)}`
                : "--"}
            </p>
            <p className="truncate text-xs text-lightGrey/60">
              Since last entry
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-lg bg-mediumGrey px-4 py-2.5">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p className="truncate text-xs text-lightGrey/60">{user?.email}</p>
          </div>
          <div className="flex gap-1 shrink-0">
            {UNITS.map((option) => (
              <button
                key={option}
                onClick={() => changeUnit(option)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase transition-colors cursor-pointer ${
                  unit === option
                    ? "bg-indigo text-white"
                    : "bg-darkGrey/60 text-lightGrey/60 hover:text-white"
                }`}
              >
                {unitLabel(option)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid flex-1 min-h-0 grid-cols-[280px_1fr] gap-3">
        <div className="flex flex-col gap-3 rounded-lg bg-mediumGrey p-4 min-h-0">
          <p className="text-sm font-semibold text-white">Log body weight</p>
          <p className="text-xs text-lightGrey/60">
            Weigh yourself at the same time of day for a consistent trend.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step={0.1}
              value={weightInput}
              placeholder="0"
              onChange={(e) => setWeightInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && logWeight()}
              className="w-full bg-darkGrey/60 rounded-md px-3 py-2 text-sm font-semibold text-white outline-none focus:bg-darkGrey transition-colors"
            />
            <span className="text-xs font-semibold uppercase text-lightGrey/60 shrink-0">
              {unitLabel(unit)}
            </span>
          </div>
          <Button
            fullWidth
            label={saving ? "Saving..." : "Log Weight"}
            onClick={logWeight}
          />

          <div className="flex flex-col gap-1.5 mt-2 min-h-0 overflow-y-auto">
            {[...entries]
              .reverse()
              .slice(0, 10)
              .map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between text-xs px-2 py-1.5 rounded-md bg-darkGrey/40"
                >
                  <span className="text-lightGrey/60">
                    {formatDate(entry.createdAt, {
                      month: "short",
                      day: "numeric",
                    }, "en-US")}
                  </span>
                  <span className="font-semibold text-white">
                    {formatWeight(entry.weight, unit)}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <BodyWeightChart entries={entries} />
      </div>
    </div>
  );
};

export default Profile;
