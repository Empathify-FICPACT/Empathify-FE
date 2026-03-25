"use client";
import { useRouter } from "next/navigation";
import ServiceCard from "../components/ServiceCard";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayananPage() {
    const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-[rgba(245,245,245,1)] pb-10">

        {/* HERO */}
        <section className="bg-[#25B868] px-[30px] py-25 flex items-center justify-between relative overflow-hidden">
        
            {/* TEXT */}
            <div className="max-w-[804px] ml-25">
                <h1 className="text-[50px] font-bold leading-tight text-[rgba(255,255,255,1)] font-[Nunito]">
                    Perjalanan Belajar yang Lebih Seru Dimulai di Sini
                </h1>
            </div>
      
            {/* IMAGE */}
            <div className="absolute right-[180px] bottom-[-60px] w-[563px] h-[403px]">
      
                {/* BACK IMAGE */}
                <div className="absolute left-[190px] bottom-[-30px] w-[561px] h-[500px] z-0">
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
                  className="object-contain"
                />
            </div>
      
        </section>

      {/* LATIHAN HARIAN */}
      <section className="py-10 max-w-[1400px] mx-auto">

        {/* TITLE */}
        <div className="mb-[60px] mt-10">
          <h2 className="text-[46px] font-extrabold text-[rgba(37,184,104,1)] font-[Nunito] mb-[10px]">
            Latihan Harian
          </h2>
          <p className="text-[26px] font-medium text-[rgba(119,119,119,1)] font-[Nunito] text-justify">
            Belajar setiap hari dengan cara yang seru dan interaktif.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-6">
          <ServiceCard
            title="Simulasi Percakapan"
            description="Latih komunikasi dalam situasi nyata dengan feedback langsung."
            image="/penguin1fiks.png"
            bgColor="bg-[rgba(63,192,123,1)]"
            onClick={() => router.push("/layanan/simulasi_percakapan")}
          />

          <ServiceCard
            title="Mengenal Ekspresi"
            description="Pelajari dan ekspresikan berbagai ekspresi wajah."
            image="/penguin2.png"
            bgColor="bg-[rgba(0,192,195,1)]"
            onClick={() => router.push("/layanan/mengenal_ekspresi")}
          />

          <ServiceCard
            title="Memahami Emosi"
            description="Kenali emosi dari berbagai situasi sehari-hari."
            image="/penguin3fiks.png"
            bgColor="bg-[rgba(175,137,190,1)]"
            onClick={() => router.push("/layanan/memahami_emosi")}
          />

          <ServiceCard
            title="Cerita Interaktif"
            description="Belajar lewat cerita dengan pilihan yang membentuk perilaku sosial."
            image="/penguin4.png"
            bgColor="bg-[rgba(244,184,3,1)]"
            onClick={() => router.push("/layanan/cerita_interaktif")}
          />
        </div>
      </section>

      {/* LAYANAN PENDUKUNG */}
      <section className="py-16 max-w-[1400px] mx-auto">

        <div className="mb-[60px]">
          <h2 className="text-[46px] font-extrabold text-[rgba(37,184,104,1)] font-[Nunito] mb-[10px]">
            Layanan Pendukung
          </h2>
          <p className="text-[26px] font-medium text-[rgba(119,119,119,1)] font-[Nunito] text-justify">
            Dukungan untuk pengalaman belajar yang lebih baik.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-6">
          <ServiceCard
            title="Chatbot"
            description="Bantuan cepat untuk menjawab segala pertanyaan."
            image="/penguin5.png"
            bgColor="bg-[rgba(255,109,89,1)]"
          />
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}