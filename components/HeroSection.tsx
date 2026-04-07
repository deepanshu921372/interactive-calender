import { HERO_IMAGES, MONTH_NAMES } from '@/lib/constants';

interface HeroSectionProps {
  currentDate: Date;
}

export default function HeroSection({ currentDate }: HeroSectionProps) {
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();

  return (
    <div className="relative h-40 md:h-48 overflow-hidden bg-gray-200">
      <img
        src={HERO_IMAGES[monthIndex]}
        alt={`${MONTH_NAMES[monthIndex]} scenery`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <svg
        viewBox="0 0 800 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <polygon points="480,0 800,0 800,400 200,400" fill="#2980b9" />
        <polygon points="160,400 220,400 520,0 460,0" fill="#3498db" opacity="0.7" />
      </svg>

      <div className="absolute bottom-4 right-6 text-right z-10">
        <div className="text-3xl md:text-4xl font-light text-white tracking-widest">
          {year}
        </div>
        <div className="text-xl md:text-2xl font-bold text-white tracking-widest mt-1">
          {MONTH_NAMES[monthIndex]}
        </div>
      </div>
    </div>
  );
}
