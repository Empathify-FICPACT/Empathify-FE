import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Fitur() {
  const features = [
    {
      title: "Simulasi Percakapan",
      description: "Latih komunikasi dalam situasi nyata dengan feedback langsung.",
      bgColor: "bg-[#4cbf7d]",
      image: "/pinguin/PinguinHijau.svg",
      link: "#",
    },
    {
      title: "Mengenal Ekspresi",
      description: "Pelajari dan ekspresikan berbagai ekspresi wajah.",
      bgColor: "bg-[#00cadd]",
      image: "/pinguin/PinguinBiru.svg",
      link: "#",
    },
    {
      title: "Memahami Emosi",
      description: "Kenali emosi dari berbagai situasi sehari-hari.",
      bgColor: "bg-[#b48ec9]",
      image: "/pinguin/PinguinUngu.svg",
      link: "#",
    },
    {
      title: "Cerita Interaktif",
      description: "Belajar lewat cerita dengan pilihan yang membentuk perilaku sosial.",
      bgColor: "bg-[#ffbc11]",
      image: "/pinguin/PinguinKuning.svg",
      link: "#",
    },
    {
      title: "Chatbot",
      description: "Bantuan cepat untuk menjawab segala pertanyaan.",
      bgColor: "bg-[#fe6b60]",
      image: "/pinguin/PinguinMerah.svg",
      link: "#",
    },
  ];

  return (
    <section className="py-20 bg-[#f8f9fa] w-full">
      <div className="container mx-auto px-4 lg:px-8 max-w-8xl">
        {/* Header Section */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2cb46c] mb-4">
            Jelajahi Latihan Interaktif Kami
          </h2>
          <p className="text-[#555555] text-base md:text-lg lg:text-xl font-semibold">
            Pilih latihan yang ingin kamu coba
          </p>
        </div>

        {/* Features Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-[24px] p-8 text-white ${feature.bgColor} w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-h-[200px] lg:min-h-[250px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group`}
            >
              <div className="relative z-10 w-[70%] sm:w-[65%] flex flex-col h-full">
                <h3 className="text-xl lg:text-2xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm lg:text-base leading-relaxed mb-6 opacity-95">
                  {feature.description}
                </p>

                <div className="mt-auto pt-2">
                  <Link
                    href={feature.link}
                    className="inline-flex items-center text-xs lg:text-sm font-bold tracking-[0.1em] hover:opacity-80 transition-opacity uppercase"
                  >
                    LIHAT DETAIL
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Character Illustration */}
              <div className="absolute -bottom-2 -right-6 w-50 h-50 sm:w-55 sm:h-55 lg:w-65 lg:h-65">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-contain object-bottom right-0 bottom-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
