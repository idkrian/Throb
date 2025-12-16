import { Routes, Route } from "react-router";
import Calendar from "../pages/calendar/Calendar";
import Dashboard from "../pages/Dashboard";
import Muscles from "../pages/muscles/Muscles";
import TrainingSplits from "../pages/training-splits/TrainingSplits";
import TrainingSplitsDetails from "../pages/training-splits/TrainingSplitsDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/muscles" element={<Muscles />} />
      <Route path="/training-splits" element={<TrainingSplits />} />
      <Route path="/training-splits/:id" element={<TrainingSplitsDetails />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
}
