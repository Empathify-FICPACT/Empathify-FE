"use client";
import { useRouter } from "next/navigation";
import ServiceCard from "../components/ServiceCard";
import Image from "next/image";

export default function LayananPage() {
  const router = useRouter();

  return (
    <div className="bg-[rgba(245,245,245,1)] pt-[100px] min-h-screen">

      {/* HERO */}
      <section className="bg-[#25B868] px-6 md:px-[30px] py-16 md:py-25 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
        
        {/* TEXT */}
        <div className="max-w-[804px] md:ml-25 text-center md:text-left z-10">
          <h1 className="text-[32px] md:text-[50px] font-bold leading-tight text-white font-[Nunito]">
            Perjalanan Belajar yang Lebih Seru Dimulai di Sini
          </h1>
        </div>
      
        {/* IMAGE */}
        <div className="absolute inset-0 md:inset-auto md:right-[180px] md:bottom-[-60px] w-full md:w-[563px] h-full md:h-[403px] z-0">
      
          {/* BACK IMAGE */}
          <div className="absolute left-[80px] md:left-[190px] bottom-[-45px] md:bottom-[-30px] w-[300px] md:w-[561px] h-[260px] md:h-[500px] z-0">
            <Image
              src="/animjudul2.png"
              alt="bg"
              fill
              className="object-contain"
            />
          </div>
      
          <Image
            src="/animjudul1.png"
            alt="hero"
            fill
            className="object-contain hidden min-[1560px]:block"
          />
        </div>
      
      </section>

      {/* LATIHAN HARIAN */}
      <section className="px-6 min-[760px]:pl-10 min-[1100px]:px-10 min-[1500px]:px-0 py-12 md:py-16 max-w-[1400px] mx-auto">

        <div className="mb-10 text-center min-[1400px]:text-left">
          <h2 className="text-[32px] md:text-[46px] font-extrabold text-[#25B868] font-[Nunito] mb-4">
            Latihan Harian
          </h2>

          <p className="text-[18px] md:text-[24px] text-[#777] font-[Nunito] text-justify">
            Belajar setiap hari dengan cara yang seru dan interaktif.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 min-[1450px]:grid-cols-2 gap-y-8 gap-x-8 justify-items-center">

        <div className="w-full min-[750px]:w-[50%] min-[1500px]:w-full flex justify-center">
          <div className="md:scale-100 scale-50 origin-top transition hover:scale-80 transition">
            <ServiceCard
              title="Simulasi Percakapan"
              description="Latih komunikasi dalam situasi nyata dengan feedback langsung."
              image="/penguin1fiks.png"
              bgColor="bg-[rgba(63,192,123,1)]"
              onClick={() => router.push("/layanan/simulasi_percakapan")}
            />
          </div>
        </div>

        <div className="w-full min-[750px]:w-[50%] min-[1500px]:w-full flex justify-center -mt-50 md:mt-0">
          <div className="md:scale-100 scale-50 origin-top transition hover:scale-80 transition">
            <ServiceCard
              title="Mengenal Ekspresi"
              description="Pelajari dan ekspresikan berbagai ekspresi wajah."
              image="/penguin2.png"
              bgColor="bg-[rgba(0,192,195,1)]"
              onClick={() => router.push("/layanan/mengenal_ekspresi")}
            />
          </div>
        </div>

        <div className="w-full min-[750px]:w-[50%] min-[1500px]:w-full flex justify-center -mt-50 md:mt-0">
          <div className="md:scale-100 scale-50 origin-top transition hover:scale-80 transition">
            <ServiceCard
              title="Memahami Emosi"
              description="Kenali emosi dari berbagai situasi sehari-hari."
              image="/penguin3fiks.png"
              bgColor="bg-[rgba(175,137,190,1)]"
              onClick={() => router.push("/layanan/memahami_emosi")}
            />
          </div>
        </div>

        <div className="w-full min-[750px]:w-[50%] min-[1500px]:w-full flex justify-center -mb-70 md:mb-0 -mt-50 md:mt-0">
          <div className="md:scale-100 scale-50 origin-top transition hover:scale-80 transition">
            <ServiceCard
              title="Cerita Interaktif"
              description="Belajar lewat cerita dengan pilihan yang membentuk perilaku sosial."
              image="/penguin4.png"
              bgColor="bg-[rgba(244,184,3,1)]"
              onClick={() => router.push("/layanan/cerita_interaktif")}
            />
          </div>
        </div>

        </div>
      </section>

      {/* LAYANAN PENDUKUNG */}
      <section className="px-6 min-[760px]:pl-10 min-[1100px]:px-10 min-[1500px]:px-0 py-12 md:py-16 max-w-[1400px] mx-auto">

        {/* TITLE */}
        <div className="mb-10 text-center min-[1500px]:text-left">
          <h2 className="text-[32px] md:text-[46px] font-extrabold text-[#25B868] font-[Nunito] mb-4">
            Layanan Pendukung
          </h2>

          <p className="text-[18px] md:text-[24px] text-[#777] font-[Nunito] text-justify">
            Dukungan untuk pengalaman belajar yang lebih baik.
          </p>
        </div>

        {/* CARD */}
        <div className="flex justify-center min-[1500px]:justify-start gap-6 w-full -mb-30 md:mb-0">
          <div className="md:scale-100 scale-50 origin-top transition hover:scale-80">
            <ServiceCard
              title="Chatbot"
              description="Bantuan cepat untuk menjawab segala pertanyaan."
              image="/penguin5.png"
              bgColor="bg-[rgba(255,109,89,1)]"
            />
          </div>
        </div>

      </section>

    </div>
  );
}