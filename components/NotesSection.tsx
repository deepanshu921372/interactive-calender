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
    <div className="p-4">
      <h3 className="text-xs font-bold tracking-widest text-gray-700 mb-3">
        NOTES
      </h3>

      <div className="relative mb-3">
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-b border-gray-300" />
          ))}
        </div>
      </div>

      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write a note..."
        className="w-full p-2 border border-gray-300 rounded text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 cursor-text"
        rows={2}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.metaKey) {
            handleSubmit();
          }
        }}
      />

      {selectedRange.start && (
        <div className="text-[10px] text-gray-500 mb-2">
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
        className="w-full py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition disabled:bg-gray-300                    
  disabled:cursor-not-allowed cursor-pointer"
      >
        ADD NOTE
      </button>

      {selectedRange.start && (
        <button
          onClick={onClearSelection}
          className="w-full mt-1.5 py-1 text-[10px] text-gray-500 underline hover:text-gray-700 cursor-pointer"
        >
          Clear Selection
        </button>
      )}

      <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
        {notes.length === 0 ? (
          <p className="text-[10px] text-gray-400 text-center py-3">
            No notes yet. Add one above!
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded-r group relative"
            >
              <p className="text-[10px] text-gray-800 pr-6">{note.text}</p>
              {note.dateRange?.start && (
                <p className="text-[9px] text-blue-600 mt-1">
                  📅 {formatDateRange(note)}
                </p>
              )}
              <button
                onClick={() => onDeleteNote(note.id)}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 font-bold text-sm cursor-pointer       
  transition"
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
