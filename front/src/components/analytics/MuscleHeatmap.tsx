import { useEffect, useState } from "react";
import Model from "react-body-highlighter";
import { getWorkoutMuscleStats, type MuscleStatsPeriod } from "@/api/workout";
import {
  buildHighlighterData,
  type NormalizedMuscleStat,
} from "@/utils/muscle-highlighter-map";

const HEATMAP_COLORS = ["#3b82f6", "#22d3ee", "#22c55e", "#f59e0b", "#ef4444"];

type MuscleHeatmapProps = {
  period: MuscleStatsPeriod;
};

const MuscleHeatmap = ({ period }: MuscleHeatmapProps) => {
  const [data, setData] = useState<NormalizedMuscleStat[]>([]);

  useEffect(() => {
    getWorkoutMuscleStats(period).then((stats) => {
      setData(buildHighlighterData(stats, period));
    });
  }, [period]);

  return (
    <div className="flex flex-col items-center gap-3 h-full">
      <p className="text-white text-base font-semibold">Muscle Activity</p>

      {data.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <p className="text-3xl opacity-60">🫥</p>
          <p className="text-lightGrey text-sm">
            No workout data for this period
          </p>
        </div>
      ) : (
        <>
          <div className="flex gap-3 flex-1 min-h-0 items-center">
            <Model
              data={data}
              highlightedColors={HEATMAP_COLORS}
              bodyColor="#374151"
              style={{ height: "100%", maxHeight: 450 }}
            />
            <Model
              data={data}
              type="posterior"
              highlightedColors={HEATMAP_COLORS}
              bodyColor="#374151"
              style={{ height: "100%", maxHeight: 450 }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-lightGrey">Undertrained</span>
            {HEATMAP_COLORS.map((color, index) => (
              <div key={color} className="flex flex-col items-center gap-1">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: color }}
                />
                {index === 2 && (
                  <span className="text-[10px] text-lightGrey">Optimal</span>
                )}
              </div>
            ))}
            <span className="text-xs text-lightGrey">Overtrained</span>
          </div>
        </>
      )}
    </div>
  );
};

export default MuscleHeatmap;
