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
                ${inRange && !isStart && !isEnd ? "bg-blue-100 border-blue-300" : ""}                                                                                         
                ${isStart || isEnd ? "bg-blue-500 text-white border-blue-600 font-bold hover:bg-blue-600" : ""}                                                               
              `}
          >
            {day || ""}
          </div>
        );
      })}
    </div>
  );
}
