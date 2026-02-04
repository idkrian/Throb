import type { TrainingSplitDto } from "./training-splits.dto";

export interface TrainingSplitDayDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  dayOfWeek: number;
  restDay: boolean;
  trainingSplit: TrainingSplitDto;
}
