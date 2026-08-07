import {
  LuLayoutDashboard,
  LuBicepsFlexed,
  LuClipboardList,
  LuCalendar,
  LuUser,
} from "react-icons/lu";

export const navItems = [
  { to: "/", label: "Dashboard", Icon: LuLayoutDashboard, end: true },
  { to: "/exercises", label: "Exercises", Icon: LuBicepsFlexed, end: false },
  {
    to: "/training-splits",
    label: "Splits",
    Icon: LuClipboardList,
    end: false,
  },
  { to: "/calendar", label: "Calendar", Icon: LuCalendar, end: false },
  { to: "/profile", label: "Profile", Icon: LuUser, end: false },
];
