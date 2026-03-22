import Image from "next/image";

export default function TeamCard({ img = "", name = "", role = "" }) {
  return (
    <div className="w-[180px] h-[300px] relative">

      {/* STACK WRAPPER */}
      <div className="absolute inset-0 flex flex-col items-center">

        {/* GREEN SECTION */}
        <div className="w-full h-[150px] bg-[rgba(37,184,104,1)] rounded-t-xl" />

        {/* WHITE SECTION */}
        <div className="w-full h-[50px] bg-white rounded-b-xl shadow flex flex-col items-center justify-end pb-4 text-center">
        </div>

      </div>

      {/* IMAGE */}
      <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-[195px] h-[235px] z-10">
        <Image
          src={img}
          alt={name}
          fill
          className="object-contain drop-shadow-lg"
        />
      </div>

      {/* CONTAINER PUTIHHH */}
      <div className="gap-1 absolute bottom-20 left-1/2 -translate-x-1/2 w-[183] h-[70px] bg-white rounded-b-xl shadow z-20 flex flex-col items-center pb-3 pt-2 text-center">
        <h3 className="font-[Nunito] font-bold text-[14px] text-[rgba(33,39,42,1)]">
          {name}
        </h3>
        <span className="w-[150px] h-[40px] flex items-center justify-center bg-[#FFC200] text-[#E9F8F0] text-[12px] font-bold rounded-[16px] border-[2px] border-[#FFDE00]">
          {role}
        </span>
      </div>

    </div>
  );
}