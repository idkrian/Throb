import {
  LuLayoutDashboard,
  LuBicepsFlexed,
  LuClipboardList,
} from "react-icons/lu";
import AppRoutes from "./routes";
import { Link } from "react-router";

function App() {
  return (
    <div className="w-screen h-screen px-24 py-20 bg-backgroundBlack">
      <div className="flex flex-col w-full h-full shadow-xl rounded-xl p-8 bg-darkGrey">
        <div className="flex flex-col w-full h-full gap-4">
          <h1 className="text-3xl font-bold mx-auto text-indigo">CHEST DAY!</h1>
          <div className="flex gap-4 justify-center items-center w-full">
            <Link to="/">
              <div className="bg-mediumGrey p-2 rounded-xl group cursor-pointer shadow-lg hover:shadow-indigo-500/50">
                <LuLayoutDashboard size={32} className="text-indigo" />
              </div>
            </Link>
            <Link to="/muscles">
              <div className="bg-mediumGrey p-2 rounded-xl group cursor-pointer shadow-lg hover:shadow-indigo-500/50">
                <LuBicepsFlexed size={32} className="text-indigo" />
              </div>
            </Link>
            <Link to="/training-splits">
              <div className="bg-mediumGrey p-2 rounded-xl group cursor-pointer shadow-lg hover:shadow-indigo-500/50">
                <LuClipboardList size={32} className="text-indigo" />
              </div>
            </Link>
          </div>
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
