import type { TrainingSplitDto } from "./training-splits.dto";

export interface TrainingSplitDayDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  dayOfWeek: number;
  restDay: boolean;
  trainingSplit: TrainingSplitDto;
}

export interface TrainingSplitDayEntry {
  id: number;
  restDay: boolean;
  trainingSplit: TrainingSplitDto;
}

export type TrainingSplitDayMap = Record<number, TrainingSplitDayEntry>;

export interface SwapTarget {
  date: Date;
  dayName: string;
  dayNumber: number;
  entry?: TrainingSplitDayEntry;
}
