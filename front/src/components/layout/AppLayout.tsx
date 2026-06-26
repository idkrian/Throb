import { Outlet } from "react-router";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="w-screen h-screen px-24 py-8 bg-backgroundBlack">
      <div className="flex flex-col w-full h-full shadow-xl rounded-xl p-8 bg-darkGrey overflow-hidden">
        <div className="flex flex-col w-full h-full gap-4 min-h-0">
          <Navbar />
          <div className="flex-1 min-h-0 overflow-y-auto pr-2 -mr-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
