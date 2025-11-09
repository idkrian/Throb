import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Sidebar from "./ui/layout/Sidebar.tsx";
import Home from "./Home.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="w-screen h-screen p-24 bg-[#0B0B12]">
      <div className="flex w-full h-full shadow-xl rounded-xl p-8 bg-[#14141F]">
        <Sidebar />
        <Home />
      </div>
    </div>
  </StrictMode>
);
