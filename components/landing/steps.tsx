import Image from "next/image";

export default function Steps() {
  const steps = [
    {
      id: 1,
      icon: "/steps/Steps 1.svg",
      title: "Buat Profil Anak",
      description: "Mulai dengan membuat profil dan memilih avatar.",
    },
    {
      id: 2,
      icon: "/steps/Steps 2.svg",
      title: "Ikuti Latihan Seru",
      description: "Belajar melalui aktivitas interaktif yang menyenangkan.",
    },
    {
      id: 3,
      icon: "/steps/Steps 3.svg",
      title: "Lihat Perkembangan",
      description: "Pantau progres anak secara bertahap dan konsisten.",
    },
  ];

  return (
    <section className="py-20 bg-[#f8f9fa] w-full">
      <div className="container mx-auto px-4 max-w-8xl">
        {/* Header Section */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2cb46c] mb-4">
            Mulai dalam 3 Langkah
          </h2>
          <p className="text-[#555555] text-base md:text-lg lg:text-2xl font-semibold">
            tiga langkah sederhana untuk belajar bersama Empathify.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-3xl p-5 md:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-4 md:mb-6 flex-shrink-0">
                <Image
                  src={step.icon}
                  alt={step.title}
                  fill
                  className="object-contain"
                />
              </div>

              <h3 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2 md:mb-4">
                {step.title}
              </h3>

              <p className="text-sm md:text-base text-black font-semibold leading-relaxed max-w-[220px] md:max-w-[250px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
