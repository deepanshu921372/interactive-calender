import { Note } from "@/lib/types";

interface NotesSectionProps {
  notes: Note[];
}

export default function NotesSection({ notes }: NotesSectionProps) {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold mb-3 text-gray-800">Notes</h3>

      <div className="mb-4">
        <textarea
          placeholder="Write a note..."
          className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
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
              <p className="text-gray-800">{note.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
