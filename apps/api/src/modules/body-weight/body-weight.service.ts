import { bodyWeightRepository } from "./body-weight.repository.js";
import type { BodyWeightDto } from "./body-weight.model.js";
import type { CreateBodyWeightRequestDto } from "./body-weight.scheme.js";

type BodyWeightRow = {
  id: number;
  weight: { toString(): string };
  createdAt: Date;
};

const formatBodyWeightResponse = (row: BodyWeightRow): BodyWeightDto => ({
  id: row.id,
  weight: Number(row.weight),
  createdAt: row.createdAt.toISOString(),
});

export const bodyWeightService = {
  async createBodyWeight(
    userId: number,
    data: CreateBodyWeightRequestDto,
  ): Promise<BodyWeightDto> {
    const saved = await bodyWeightRepository.upsertTodayBodyWeight(
      userId,
      data.weight,
    );
    return formatBodyWeightResponse(saved);
  },

  async getBodyWeights(userId: number): Promise<BodyWeightDto[]> {
    const rows = await bodyWeightRepository.getBodyWeights(userId);
    return rows.map(formatBodyWeightResponse);
  },

  async getLatestBodyWeight(userId: number): Promise<BodyWeightDto | null> {
    const row = await bodyWeightRepository.getLatestBodyWeight(userId);
    return row ? formatBodyWeightResponse(row) : null;
  },
};
