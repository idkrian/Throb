import { useEffect, useState } from "react";
import Model from "react-body-highlighter";
import { getWorkoutMuscleStats } from "@/api/workout";
import {
  buildHighlighterData,
  type NormalizedMuscleStat,
} from "@/utils/muscle-highlighter-map";

const HEATMAP_COLORS = ["#f97316", "#ef4444", "#dc2626", "#b91c1c", "#7f1d1d"];

const MuscleHeatmap = () => {
  const [data, setData] = useState<NormalizedMuscleStat[]>([]);

  useEffect(() => {
    getWorkoutMuscleStats().then((stats) => {
      setData(buildHighlighterData(stats));
    });
  }, []);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-lightGrey text-sm">No workout data yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 h-full">
      <p className="text-white text-base font-semibold">Muscle Activity</p>
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
        <span className="text-xs text-lightGrey">Low</span>
        {HEATMAP_COLORS.map((color) => (
          <div
            key={color}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: color }}
          />
        ))}
        <span className="text-xs text-lightGrey">High</span>
      </div>
    </div>
  );
};

export default MuscleHeatmap;
