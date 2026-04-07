interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onPreviousMonth}
        className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Previous
      </button>

      <h2 className="text-2xl font-bold">
        {currentDate.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </h2>

      <button
        onClick={onNextMonth}
        className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Next
      </button>
    </div>
  );
}
