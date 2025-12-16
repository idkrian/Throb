export const getWeekDays = () => {
  const days = [];
  const today = new Date();
  const dayOfWeek = today.getDay();

  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(today);
  monday.setDate(today.getDate() + daysToMonday);

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    days.push({
      date: date,
      dayName: date.toLocaleDateString("pt-BR", { weekday: "long" }),
      day: `${date.getDate()}/${date.getMonth() + 1}`,
    });
  }

  return days;
};
