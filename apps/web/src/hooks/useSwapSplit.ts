import { useState } from "react";
import {
  createTrainingSplitDay,
  deleteTrainingSplitDay,
  updateTrainingSplitDay,
} from "@/api/training-split-day";
import type { SwapTarget } from "@/dtos/training-split-day.dto";

export const useSwapSplit = (onChange: () => void | Promise<void>) => {
  const [swapTarget, setSwapTarget] = useState<SwapTarget | null>(null);

  const openSwap = (target: SwapTarget) => setSwapTarget(target);
  const closeSwap = () => setSwapTarget(null);

  const handleAssign = async (trainingSplitId: number, restDay: boolean) => {
    if (!swapTarget) return;
    const { dayNumber, entry } = swapTarget;
    if (entry) {
      await updateTrainingSplitDay(entry.id, { trainingSplitId, restDay });
    } else {
      await createTrainingSplitDay({
        dayOfWeek: dayNumber,
        trainingSplitId,
        restDay,
      });
    }
    await onChange();
    setSwapTarget(null);
  };

  const handleRemove = async () => {
    if (!swapTarget?.entry) return;
    await deleteTrainingSplitDay(swapTarget.entry.id);
    await onChange();
    setSwapTarget(null);
  };

  return { swapTarget, openSwap, closeSwap, handleAssign, handleRemove };
};
