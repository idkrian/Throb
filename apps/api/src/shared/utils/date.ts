export function subtractMonths(data: Date, meses: number): Date {
  const result = new Date(data);
  const today = result.getDate();

  result.setMonth(result.getMonth() - meses);

  if (result.getDate() !== today) {
    result.setDate(0);
  }

  return result;
}

export function lastWeek(data: Date): Date {
  const result = new Date(data);
  result.setDate(result.getDate() - 7);
  return result;
}
