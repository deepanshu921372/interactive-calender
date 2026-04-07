import {
  isToday,
  isDateInRange,
  isStartDate,
  isEndDate,
} from "@/lib/calendar-utils";
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
        const isStart = isStartDate(day, currentDate, selectedRange);
        const isEnd = isEndDate(day, currentDate, selectedRange);

        const isWeekend = index % 7 >= 5;

        return (
          <div
            key={index}
            onClick={() => day && onDateClick?.(day)}
            className={`                                                                                                                                   
                aspect-square flex items-center justify-center                                                                                               
                rounded transition-all text-sm                                                                                                               
                ${day ? "cursor-pointer hover:bg-gray-50" : ""}                                                                                              
                ${day && !inRange ? "text-gray-700" : ""}                                                                                                    
                ${day && isWeekend && !inRange ? "text-blue-600 font-semibold" : ""}                                                                         
                ${isTodayDate && !inRange ? "ring-2 ring-blue-500 ring-inset" : ""}                                                                          
                ${inRange && !isStart && !isEnd ? "bg-blue-50 text-gray-800" : ""}                                                                           
                ${isStart || isEnd ? "bg-blue-600 text-white font-bold" : ""}                                                                                
                ${!day ? "text-gray-300" : ""}                                                                                                               
              `}
          >
            {day || ""}
          </div>
        );
      })}
    </div>
  );
}
