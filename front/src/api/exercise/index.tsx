import axios from "axios";
import type { MuscleGroupItemsDto } from "@/dtos/muscle.dto";
import type { ExerciseDto } from "@/dtos/exercise.dto";

export const getMuscleGroups = async (): Promise<MuscleGroupItemsDto[]> => {
    const response = await axios.get("http://localhost:3000/exercise/muscle-groups");
    return response.data.data;
};

export const getAllExercises = async (): Promise<ExerciseDto[]> => {
    const response = await axios.get("http://localhost:3000/exercise");
    return response.data.data;
};
