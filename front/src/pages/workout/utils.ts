export const REST_PRESETS = [60, 90, 120, 180];
export const DEFAULT_REST = 90;

export const formatTime = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = m.toString().padStart(2, "0");
  const ss = s.toString().padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

export const rpeColor = (rpe: number) => {
  if (rpe <= 5) return "bg-emerald-500";
  if (rpe <= 7) return "bg-amber-500";
  if (rpe <= 9) return "bg-orange-500";
  return "bg-red-500";
};
