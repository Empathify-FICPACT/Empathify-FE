import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  bgColor: string;
  onClick?: () => void;
}

export default function ServiceCard({
  title,
  description,
  image,
  bgColor,
  onClick,
}: ServiceCardProps) {
  return (
    <div
      className={`group relative h-[260px] w-full max-w-[640px] overflow-hidden rounded-[24px] p-7 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:h-[270px] ${bgColor}`}
    >
      {/* TEXT */}
      <div className="relative z-10 flex h-full w-[70%] flex-col sm:w-[65%]">
        <h3 className="text-xl font-bold font-[Nunito] lg:text-2xl">{title}</h3>
        <p className="mt-3 text-sm font-semibold leading-relaxed font-[Nunito] opacity-95 lg:text-base">
          {description}
        </p>

        {/* BUTTON */}
        <button
          onClick={onClick}
          disabled={!onClick}
          className="mt-auto inline-flex items-center text-xs font-bold tracking-[0.1em] uppercase transition-opacity duration-200 hover:opacity-80 disabled:cursor-default disabled:opacity-70 lg:text-sm"
        >
          Lihat Detail
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* IMAGE */}
      <div className="absolute -right-6 -bottom-2 h-[190px] w-[190px] sm:h-[220px] sm:w-[220px] lg:h-[250px] lg:w-[250px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}
