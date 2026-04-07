import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <main className="h-screen p-4 md:p-8 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
      <Calendar />
    </main>
  );
}
