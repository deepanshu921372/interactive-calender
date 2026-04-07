"use client";

import { useState, useEffect } from "react";
import { generateCalendarDays } from "@/lib/calendar-utils";
import { DAYS_OF_WEEK, MONTH_NAMES } from "@/lib/constants";
import { DateRange, Note } from "@/lib/types";
import { saveNotes, loadNotes } from "@/lib/storage";
import SpiralBinding from "./SpiralBinding";
import HeroSection from "./HeroSection";
import CalendarGrid from "./CalendarGrid";
import NotesSection from "./NotesSection";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loaded = loadNotes();
    setNotes(loaded);
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

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

  const addNote = (text: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      text,
      dateRange: selectedRange.start ? { ...selectedRange } : null,
      createdAt: new Date(),
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const calendarDays = generateCalendarDays(currentDate);

  return (
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full h-[calc(100vh-4rem)] flex flex-col">
      <SpiralBinding />

      <HeroSection currentDate={currentDate} />

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="md:w-64 border-r border-gray-200 overflow-y-auto">
          <NotesSection
            notes={notes}
            selectedRange={selectedRange}
            onAddNote={addNote}
            onDeleteNote={deleteNote}
            onClearSelection={clearSelection}
          />
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {MONTH_NAMES[currentDate.getMonth()]}
              </div>
              <div className="text-sm text-gray-500">
                {currentDate.getFullYear()}
              </div>
            </div>

            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-gray-100 rounded transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAYS_OF_WEEK.map((day, i) => (
              <div
                key={day}
                className={`text-center text-xs font-semibold py-2 ${
                  i >= 5 ? "text-blue-600" : "text-gray-600"
                }`}
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

          <div className="flex justify-center gap-4 mt-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 border-2 border-blue-500 rounded" />
              <span>Today</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-blue-500 rounded" />
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-blue-100 rounded" />
              <span>Range</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
