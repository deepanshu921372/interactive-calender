export default function SpiralBinding() {
  return (
    <div className="relative h-10 bg-gradient-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400 flex items-center justify-center gap-6 px-8">
      {/* Spiral Rings */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="w-5 h-6 rounded-full border-2 border-gray-500 bg-gradient-to-br from-gray-300 to-gray-400"
        />
      ))}
    </div>
  );
}
