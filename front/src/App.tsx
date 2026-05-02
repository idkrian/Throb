import {
  LuLayoutDashboard,
  LuBicepsFlexed,
  LuClipboardList,
  LuCalendar,
} from "react-icons/lu";
import AppRoutes from "./routes";
import { Link } from "react-router";

function App() {
  return (
    <div className="w-screen h-screen px-24 py-8 bg-backgroundBlack">
      <div className="flex flex-col w-full h-full shadow-xl rounded-xl p-8 bg-darkGrey overflow-hidden">
        <div className="flex flex-col w-full h-full gap-4 min-h-0">
          <h1 className="text-3xl font-bold mx-auto text-indigo shrink-0">
            CHEST DAY!
          </h1>
          <div className="flex gap-4 justify-center items-center w-full shrink-0">
            <Link to="/">
              <div className="bg-mediumGrey p-2 rounded-xl group cursor-pointer shadow-lg hover:shadow-indigo-500/50">
                <LuLayoutDashboard size={32} className="text-indigo" />
              </div>
            </Link>
            <Link to="/exercises">
              <div className="bg-mediumGrey p-2 rounded-xl group cursor-pointer shadow-lg hover:shadow-indigo-500/50">
                <LuBicepsFlexed size={32} className="text-indigo" />
              </div>
            </Link>
            <Link to="/training-splits">
              <div className="bg-mediumGrey p-2 rounded-xl group cursor-pointer shadow-lg hover:shadow-indigo-500/50">
                <LuClipboardList size={32} className="text-indigo" />
              </div>
            </Link>
            <Link to="/calendar">
              <div className="bg-mediumGrey p-2 rounded-xl group cursor-pointer shadow-lg hover:shadow-indigo-500/50">
                <LuCalendar size={32} className="text-indigo" />
              </div>
            </Link>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto pr-2 -mr-2">
            <AppRoutes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
