import { Routes, Route } from "react-router";

import Dashboard from "../pages/Dashboard";
import Muscles from "../pages/Muscles";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/muscles" element={<Muscles />} />
    </Routes>
  );
}
