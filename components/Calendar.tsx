"use client";

import { useState } from "react";
import { generateCalendarDays } from "@/lib/calendar-utils";
import { DAYS_OF_WEEK } from "@/lib/constants";
import { DateRange } from "@/lib/types";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: null,
    end: null,
  });

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: clickedDate, end: null });
    } else {
      if (clickedDate < selectedRange.start) {
        setSelectedRange({ start: clickedDate, end: selectedRange.start });
      } else {
        setSelectedRange({ ...selectedRange, end: clickedDate });
      }
    }
  };

  const calendarDays = generateCalendarDays(currentDate);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <CalendarHeader
        currentDate={currentDate}
        onPreviousMonth={() => changeMonth(-1)}
        onNextMonth={() => changeMonth(1)}
      />

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

      <CalendarGrid
        calendarDays={calendarDays}
        currentDate={currentDate}
        selectedRange={selectedRange}
        onDateClick={handleDateClick}
      />

      {selectedRange.start && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <strong>Selected:</strong> {selectedRange.start.toDateString()}
          {selectedRange.end && ` to ${selectedRange.end.toDateString()}`}
        </div>
      )}
    </div>
  );
}
