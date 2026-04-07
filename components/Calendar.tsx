"use client";

import { useState } from "react";
import { generateCalendarDays, isToday } from "@/lib/calendar-utils";
import { DAYS_OF_WEEK } from "@/lib/constants";
import CalendarHeader from "./CalendarHeader";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const calendarDays = generateCalendarDays(currentDate);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <CalendarHeader
        currentDate={currentDate}
        onPreviousMonth={() => changeMonth(-1)}
        onNextMonth={() => changeMonth(1)}
      />

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
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
    </div>
  );
}
