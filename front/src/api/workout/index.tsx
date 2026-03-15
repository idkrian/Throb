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

export const createWorkout = async (payload: CreateWorkoutPayload): Promise<void> => {
    await axios.post("http://localhost:3000/workout", payload);
};
