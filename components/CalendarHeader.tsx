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
        className="p-2 hover:bg-gray-100 rounded transition cursor-pointer"
        aria-label="Previous month"
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
          {currentDate.toLocaleDateString("en-US", { month: "long" })}
        </div>
        <div className="text-sm text-gray-500">{currentDate.getFullYear()}</div>
      </div>

      <button
        onClick={onNextMonth}
        className="p-2 hover:bg-gray-100 rounded transition cursor-pointer"
        aria-label="Next month"
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
  );
}
