"use client";

import { useState } from "react";
import { generateCalendarDays } from "@/lib/calendar-utils";
import { DAYS_OF_WEEK } from "@/lib/constants";
import { DateRange, Note } from "@/lib/types";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import NotesSection from "./NotesSection";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [notes, setNotes] = useState<Note[]>([]);

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

  const clearSelection = () => {
    setSelectedRange({ start: null, end: null });
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
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Selected Range:
              </p>
              <p className="text-gray-800">
                {selectedRange.start.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                {selectedRange.end && (
                  <>
                    {" "}
                    →{" "}
                    {selectedRange.end.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </>
                )}
              </p>
            </div>
            <button
              onClick={clearSelection}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <NotesSection notes={notes} />
    </div>
  );
}
