export const generateCalendarDays = (currentDate: Date): (number | null)[] => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return calendarDays;
};

export const isToday = (day: number | null, currentDate: Date): boolean => {
  if (!day) return false;

  const today = new Date();
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isDateInRange = (
  day: number | null,
  currentDate: Date,
  selectedRange: { start: Date | null; end: Date | null },
): boolean => {
  if (!day || !selectedRange.start) return false;

  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  date.setHours(0, 0, 0, 0);

  const start = new Date(selectedRange.start);
  start.setHours(0, 0, 0, 0);

  if (!selectedRange.end) {
    return date.getTime() === start.getTime();
  }

  const end = new Date(selectedRange.end);
  end.setHours(0, 0, 0, 0);

  return date >= start && date <= end;
};
