import { useState } from "react";
import { Note, DateRange } from "@/lib/types";

interface NotesSectionProps {
  notes: Note[];
  selectedRange: DateRange;
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string) => void;
  onClearSelection: () => void;
}

export default function NotesSection({
  notes,
  selectedRange,
  onAddNote,
  onDeleteNote,
  onClearSelection,
}: NotesSectionProps) {
  const [noteText, setNoteText] = useState("");

  const handleSubmit = () => {
    if (noteText.trim()) {
      onAddNote(noteText);
      setNoteText("");
    }
  };

  const formatDateRange = (note: Note) => {
    if (!note.dateRange?.start) return null;

    const start = note.dateRange.start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    if (!note.dateRange.end) return start;

    const end = note.dateRange.end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return `${start} - ${end}`;
  };

  return (
    <div className="p-5">
      <h3 className="text-sm font-bold tracking-widest text-gray-700 mb-4">
        NOTES
      </h3>

      <div className="relative mb-4">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-b border-gray-300" />
          ))}
        </div>
      </div>

      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write a note..."
        className="w-full p-2 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        rows={3}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.metaKey) {
            handleSubmit();
          }
        }}
      />

      {selectedRange.start && (
        <div className="text-xs text-gray-500 mb-2">
          For:{" "}
          {selectedRange.start.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
          {selectedRange.end &&
            ` - ${selectedRange.end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!noteText.trim()}
        className="w-full py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition disabled:bg-gray-300"
      >
        ADD NOTE
      </button>

      {selectedRange.start && (
        <button
          onClick={onClearSelection}
          className="w-full mt-2 py-1 text-xs text-gray-500 underline hover:text-gray-700"
        >
          Clear Selection
        </button>
      )}

      <div className="mt-6 space-y-2 max-h-64 overflow-y-auto">
        {notes.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">
            No notes yet. Add one above!
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded-r group relative"
            >
              <p className="text-xs text-gray-800 pr-6">{note.text}</p>
              {note.dateRange?.start && (
                <p className="text-[10px] text-blue-600 mt-1">
                  📅 {formatDateRange(note)}
                </p>
              )}
              <button
                onClick={() => onDeleteNote(note.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 font-bold"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
