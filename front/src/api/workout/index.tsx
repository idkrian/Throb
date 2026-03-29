import axios from "axios";

interface WorkoutSet {
    setNumber: number;
    reps: number;
    weight: number;
}

interface WorkoutExercisePayload {
    exerciseId: number;
    sets: WorkoutSet[];
}

export interface CreateWorkoutPayload {
    id: number;
    title: string;
    durationSeconds: number;
    exercises: WorkoutExercisePayload[];
}

export interface MuscleGroupStat {
    muscleGroup: string;
    totalSets: number;
}

export const createWorkout = async (payload: CreateWorkoutPayload): Promise<void> => {
    await axios.post("http://localhost:3000/workout", payload);
};


export const getWorkoutMuscleGroupsStats = async (): Promise<MuscleGroupStat[]> => {
    const response = await axios.get("http://localhost:3000/workout/stats/muscle-groups");
    return response.data.data;
};

export const getWorkoutSummaryStats = async (): Promise<void> => {
    const response = await axios.get("http://localhost:3000/workout/stats/summary");
    return response.data;
};
