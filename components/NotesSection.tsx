import { useState } from "react";
import { Note } from "@/lib/types";

interface NotesSectionProps {
  notes: Note[];
  onAddNote: (text: string) => void;
}

export default function NotesSection({ notes, onAddNote }: NotesSectionProps) {
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

    if (!note.dateRange.end) {
      return start;
    }

    const end = note.dateRange.end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return `${start} - ${end}`;
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold mb-3 text-gray-800">Notes</h3>

      <div className="mb-4">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write a note..."
          className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.metaKey) {
              handleSubmit();
            }
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!noteText.trim()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Add Note
        </button>
      </div>

      <div className="space-y-2">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No notes yet. Add one above!
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="p-3 bg-white rounded border border-gray-200"
            >
              <p className="text-gray-800 mb-1">{note.text}</p>
              {note.dateRange?.start && (
                <p className="text-xs text-blue-600 font-medium">
                  📅 {formatDateRange(note)}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
