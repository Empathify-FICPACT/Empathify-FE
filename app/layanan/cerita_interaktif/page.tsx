import Image from "next/image";

export default function LayananCerita() {
  return (
    <div className="bg-[rgba(245,245,245,1)] pt-[100px]">
    
          {/* HERO */}
          <section className="bg-[#25B868] px-6 md:px-[30px] py-16 md:py-25 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
    
            {/* LEFT SIDE */}
            <div className="max-w-[804px] md:ml-25 text-center md:text-left z-10 flex flex-col h-full">
    
              {/* TEXT */}
              <div>
                <h1 className="text-[32px] md:text-[55px] font-bold leading-tight text-white font-[Nunito] mb-4">
                  Cerita Interaktif
                </h1>
    
                <h2 className="text-[18px] md:text-[24px] font-semibold leading-tight text-white font-[Nunito]">
                  Belajar lewat cerita dengan pilihan yang membentuk perilaku sosial.
                </h2>
              </div>
    
              {/* BUTTON */}
              <button
                className="mt-10 md:mt-20 w-[220px] md:w-[256px] h-[50px] md:h-[60px] flex items-center justify-center bg-[#FFC200] text-[#E9F8F0] text-[18px] md:text-[24px] font-bold rounded-[50px] border-[4px] md:border-[5px] border-[#FFDE00] shadow-[0px_0px_4px_rgba(0,0,0,0.5)] transition duration-300 hover:scale-105 active:scale-95 self-center md:self-start"
              >
                Mulai Latihan!
              </button>
    
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

      {/* TENTANG */}
      <section className="px-6 md:px-0 py-5 max-w-[1400px] mx-auto">

        <div className="mt-10 md:mt-16 max-w-[1400px] text-center md:text-left">
          <h2 className="text-[32px] md:text-[46px] font-extrabold text-[#25B868] font-[Nunito] mb-4">
            Tentang Latihan
          </h2>

          <p className="text-[18px] md:text-[26px] font-medium text-[#777] font-[Nunito] text-justify mb-2">
            Latihan ini mengajak anak memahami berbagai situasi sosial melalui cerita pendek yang interaktif. 
            Setiap cerita menggambarkan kejadian tertentu yang mungkin terjadi dalam kehidupan sehari-hari, 
            seperti bertemu teman, membantu orang lain, atau menghadapi masalah kecil.
          </p>
        </div>

        <div className="mt-8 md:mt-11 w-full h-[1px] bg-[#DCDCDC]"></div>

      </section>

      {/* MANFAAT */}
      <section className="px-6 md:px-0 py-5 max-w-[1400px] mx-auto">

        <div className="max-w-[1400px] text-center md:text-left">
          <h2 className="text-[32px] md:text-[46px] font-extrabold text-[#25B868] font-[Nunito] mb-4">
            Manfaat Latihan
          </h2>

          <ul className="list-disc pl-6 text-[18px] md:text-[26px] font-medium text-[#777] font-[Nunito] text-justify space-y-2">
            <li>Melatih kemampuan mengambil keputusan</li>
            <li>Membantu anak memahami perilaku yang baik dalam situasi sosial</li>
            <li>Meningkatkan kemampuan berpikir dan mempertimbangkan pilihan</li>
            <li>Mengembangkan empati dan kepedulian terhadap orang lain</li>
          </ul>
        </div>

        <div className="mt-8 md:mt-11 w-full h-[1px] bg-[#DCDCDC]"></div>

      </section>

      {/* CARA BERMAIN */}
      <section className="px-6 md:px-0 py-5 max-w-[1400px] mx-auto">

        <div className="max-w-[1400px] text-center md:text-left">
          <h2 className="text-[32px] md:text-[46px] font-extrabold text-[#25B868] font-[Nunito] mb-4">
            Cara Bermain
          </h2>

          <ol className="pb-10 md:pb-16 list-decimal pl-6 space-y-3 text-[18px] md:text-[26px] font-medium text-[#777] font-[Nunito] text-justify">
            <li>Baca cerita yang diberikan dengan baik</li>
            <li>Pahami situasi yang sedang terjadi</li>
            <li>Pilih tindakan yang menurutmu paling tepat dari pilihan yang tersedia</li>
            <li>Lihat hasil dari pilihanmu</li>
            <li>Lanjutkan ke cerita berikutnya</li>
          </ol>
        </div>

      </section>

    </div>
  );
}