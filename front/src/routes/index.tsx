import { Routes, Route } from "react-router";
import Calendar from "../pages/calendar/Calendar";
import Dashboard from "../pages/Dashboard";
import TrainingSplits from "../pages/training-splits/TrainingSplits";
import TrainingSplitsDetails from "../pages/training-splits/TrainingSplitsDetails";
import Exercises from "../pages/exercises/Exercises";
import Workout from "@/pages/workout/Workout";
import TrainingSplitCreate from "@/pages/training-splits/TrainingSplitCreate";
import Login from "@/pages/login/Login";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/training-splits" element={<TrainingSplits />} />
          <Route
            path="/training-splits/:id"
            element={<TrainingSplitsDetails />}
          />
          <Route
            path="/training-splits/create"
            element={<TrainingSplitCreate />}
          />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/workout/:splitId" element={<Workout />} />
        </Route>
      </Route>
    </Routes>
  );
}
