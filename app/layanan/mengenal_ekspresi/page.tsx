import Image from "next/image";

export default function LayananEkspresi() {
  return (
    <div className="bg-[rgba(245,245,245,1)]">

      {/* HERO */}
      <section className="bg-[#25B868] px-[30px] py-15 flex items-center justify-between relative overflow-hidden">
  
        {/* TEXT */}
        <div className="max-w-[804px] ml-55">
          <h1 className="text-[55px] font-bold leading-tight text-[rgba(255,255,255,1)] font-[Nunito] mb-5">
            Mengenal Ekspresi
          </h1>
          <h2 className="text-[24px] font-semibold leading-tight text-[rgba(255,255,255,1)] font-[Nunito] mb-20">
            Pelajari dan ekspresikan berbagai ekspresi wajah.
          </h2>
        </div>

        {/* BUTTON */}
        <button
          className="absolute bottom-[50px] ml-55 w-[256px] h-[60px] flex items-center justify-center bg-[#FFC200] text-[#E9F8F0] text-[24px] font-bold rounded-[50px] border-[5px] border-[#FFDE00] shadow-[0px_0px_4px_rgba(0,0,0,0.5)]"
        >
          Mulai Latihan!
        </button>

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

      {/* TENTANG */}
      <section className="px-0 py-5 max-w-[1400px] mx-auto">

        {/* TEXT */}
        <div className="mt-16 max-w-[1400px]">
          <h2 className="text-[46px] font-extrabold text-[rgba(37,184,104,1)] font-[Nunito] mb-4">
            Tentang Latihan
          </h2>

          <p className="text-[26px] font-medium text-[rgba(119,119,119,1)] font-[Nunito] text-justify mb-2">
            Latihan ini membantu anak mengenali berbagai ekspresi wajah yang sering ditemui dalam kehidupan sehari-hari, 
            seperti senang, sedih, marah, dan lainnya. Setiap ekspresi ditampilkan melalui gambar yang jelas serta 
            dilengkapi dengan penjelasan singkat untuk membantu anak memahami arti dari ekspresi tersebut.
          </p>
          <p className="text-[26px] font-medium text-[rgba(119,119,119,1)] font-[Nunito] text-justify">
           Melalui latihan ini, anak diharapkan dapat lebih peka terhadap ekspresi wajah orang lain serta memahami bagaimana emosi dapat ditunjukkan melalui wajah.
          </p>
        </div>

        <div className="mt-11 w-full h-[1px] bg-[rgba(220,220,220,1)]"></div>

      </section>

      {/* MANFAAT */}
      <section className="px-0 py-5 max-w-[1400px] mx-auto">

        {/* TEXT */}
        <div className="max-w-[1400px]">
          <h2 className="text-[46px] font-extrabold text-[rgba(37,184,104,1)] font-[Nunito] mb-4">
            Manfaat Latihan
          </h2>

           <ul className="list-disc pl-6 text-[26px] font-medium text-[rgba(119,119,119,1)] font-[Nunito] text-justify">
            <li>Mengenali berbagai ekspresi wajah dengan lebih jelas</li>
            <li>Memahami arti dari setiap ekspresi</li>
            <li>Melatih kemampuan mengamati detail wajah</li>
            <li>Meningkatkan kepekaan terhadap emosi orang lain</li>
           </ul>
        </div>

        <div className="mt-11 w-full h-[1px] bg-[rgba(220,220,220,1)]"></div>

      </section>


      {/* TENTANG */}
      <section className="px-0 py-5 max-w-[1400px] mx-auto">

        {/* TEXT */}
        <div className="max-w-[1400px]">
          <h2 className="text-[46px] font-extrabold text-[rgba(37,184,104,1)] font-[Nunito] mb-4">
            Cara Bermain
          </h2>

            <ol className="pb-16 list-decimal pl-6 space-y-3 text-[26px] font-medium text-[rgba(119,119,119,1)] font-[Nunito] text-justify">
                <li>Perhatikan gambar ekspresi yang ditampilkan</li>
                <li>Baca penjelasan singkat untuk memahami arti ekspresi</li>
                <li>Amati detail wajah seperti mata, alis, dan mulut</li>
                <li>Tirukan ekspresi tersebut dengan wajahmu</li>
                <li>Ambil gambar menggunakan kamera</li>
                <li>Lanjutkan ke ekspresi berikutnya</li>
            </ol>
        </div>

      </section>

    </div>
  );
}