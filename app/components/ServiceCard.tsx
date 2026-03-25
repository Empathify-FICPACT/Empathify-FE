import Image from "next/image";

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
      className={`relative w-[675px] h-[369px] rounded-[20px] p-6 overflow-hidden ${bgColor}`}
    >
      {/* TEXT */}
      <div className="px-5 py-5 relative z-10">
        <h3 className="max-w-[440px] text-white text-[42px] font-bold font-[Nunito]">
          {title}
        </h3>
        <p className="max-w-[440px] text-white text-[24px] mt-2 font-semibold font-[Nunito]">
          {description}
        </p>

        {/* BUTTON */}
        <button
          onClick={onClick}
          className="absolute bottom-[-100px] w-[230px] h-[60px] flex items-center justify-center bg-[#FFC200] text-[#E9F8F0] text-[24px] font-bold rounded-[50px] border-[5px] border-[#FFDE00] shadow-[0px_0px_4px_rgba(0,0,0,0.5)]"
        >
          Lihat Detail
        </button>
      </div>

      {/* IMAGE */}
      <div className="absolute right-[-40px] bottom-0 w-[322px] h-[317px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}