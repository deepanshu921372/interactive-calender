export default function SpiralBinding() {
  return (
    <div className="relative h-12 bg-gradient-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400 flex items-center justify-center gap-8 px-8">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="w-6 h-8 rounded-full border-3 border-gray-500 bg-gradient-to-br from-gray-300 to-gray-400"
          style={{ borderWidth: "3px" }}
        />
      ))}
    </div>
  );
}
