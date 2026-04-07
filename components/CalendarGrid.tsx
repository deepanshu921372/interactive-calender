import { isToday, isDateInRange } from "@/lib/calendar-utils";
import { DateRange } from "@/lib/types";

interface CalendarGridProps {
  calendarDays: (number | null)[];
  currentDate: Date;
  selectedRange: DateRange;
  onDateClick?: (day: number) => void;
}

export default function CalendarGrid({
  calendarDays,
  currentDate,
  selectedRange,
  onDateClick,
}: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {calendarDays.map((day, index) => {
        const isTodayDate = isToday(day, currentDate);
        const inRange = isDateInRange(day, currentDate, selectedRange);

        return (
          <div
            key={index}
            onClick={() => day && onDateClick?.(day)}
            className={`
              aspect-square flex items-center justify-center
              border rounded-lg p-2 transition-colors
              ${day ? "hover:bg-blue-50 cursor-pointer border-gray-200" : "border-transparent"}
              ${day ? "text-gray-800 font-medium" : ""}
              ${isTodayDate && !inRange ? "ring-2 ring-blue-500 ring-inset" : ""}
              ${inRange ? "bg-blue-500 border-blue-600 text-white font-semibold" : ""}
            `}
          >
            {day || ""}
          </div>
        );
      })}
    </div>
  );
}
