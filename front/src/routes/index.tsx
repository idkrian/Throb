import { Routes, Route } from "react-router";
import Calendar from "../pages/calendar/Calendar";
import Dashboard from "../pages/Dashboard";
import TrainingSplits from "../pages/training-splits/TrainingSplits";
import TrainingSplitsDetails from "../pages/training-splits/TrainingSplitsDetails";
import Exercises from "../pages/exercises/Exercises";
import ExerciseDetails from "../pages/exercises/ExerciseDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/exercises/:muscle" element={<ExerciseDetails />} />
      <Route path="/training-splits" element={<TrainingSplits />} />
      <Route path="/training-splits/:id" element={<TrainingSplitsDetails />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
}
