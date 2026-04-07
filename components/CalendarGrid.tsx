import { isToday } from "@/lib/calendar-utils";

interface CalendarGridProps {
  calendarDays: (number | null)[];
  currentDate: Date;
  onDateClick?: (day: number) => void;
}

export default function CalendarGrid({
  calendarDays,
  currentDate,
  onDateClick,
}: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {calendarDays.map((day, index) => (
        <div
          key={index}
          onClick={() => day && onDateClick?.(day)}
          className={`                                                                                                                                                      
              aspect-square flex items-center justify-center                                                                                                                  
              border rounded-lg p-2 transition-colors                                                                                                                         
              ${day ? "hover:bg-blue-50 cursor-pointer border-gray-200" : "border-transparent"}                                                                               
              ${day ? "text-gray-800 font-medium" : ""}                                                                                                                       
              ${isToday(day, currentDate) ? "bg-blue-500 text-white hover:bg-blue-600 border-blue-500" : ""}                                                                  
            `}
        >
          {day || ""}
        </div>
      ))}
    </div>
  );
}
