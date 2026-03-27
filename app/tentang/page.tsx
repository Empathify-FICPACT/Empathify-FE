import Image from "next/image";
import TeamCard from "../../components/Card";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function TentangPage() {
  return (
    <div className="bg-[rgba(245,245,245,1)] pt-20 md:pt-[88px]">
      <Header />

      {/* HERO */}
      <section className="bg-[#25B868] px-6 md:px-7.5 py-16 md:py-25 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
  
        {/* TEXT */}
        <div className="max-w-201 md:ml-25 text-center md:text-left z-10">
          <h1 className="text-[32px] md:text-[50px] font-bold leading-tight text-white font-[Nunito]">
            Temani Perjalanan Belajar Anak Bersama Empathify
          </h1>
        </div>

        {/* IMAGE */}
        <div className="absolute inset-0 md:inset-auto md:right-45 md:-bottom-15 w-full md:w-140.75 h-full md:h-100.75 z-0">

          {/* BACK IMAGE */}
          <div className="absolute left-20 md:left-47.5 -bottom-11.25 md:-bottom-7.5 w-75 md:w-140.25 h-65 md:h-125 z-0">
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
      <section className="px-6 min-[760px]:pl-10 min-[1100px]:px-10 min-[1500px]:px-0 py-12 md:py-16 max-w-350 mx-auto 
      flex flex-col min-[1400px]:flex-row items-center justify-between gap-10">

        {/* TEXT */}
        <div className="max-w-250 text-center min-[1400px]:text-left">
          <h2 className="text-[32px] md:text-[46px] font-extrabold text-[#25B868] font-[Nunito] mb-4">
            Tentang Empathify
          </h2>

          <p className="text-[18px] md:text-[24px] font-medium text-[#777] font-[Nunito] text-justify">
            Empathify adalah platform pembelajaran interaktif berbasis AI
            yang dirancang untuk membantu anak dengan autisme dan ADHD
            dalam mengembangkan keterampilan sosial, komunikasi,
            serta pemahaman emosi.
          </p>
        </div>

        {/* IMAGE */}
        <div className="w-45 md:w-62.5 h-45 md:h-62.5 relative hover:scale-105 transition duration-300">
          <Image
            src="/anim2.png"
            alt="tentang"
            fill
            className="object-contain"
          />
        </div>

      </section>

      {/* MISI */}
      <section className="px-6 min-[760px]:pl-10 min-[1100px]:px-10 min-[1500px]:px-0 py-6 md:py-1 max-w-350 mx-auto">

        <div className="space-y-12 md:space-y-10">
          <h2 className="text-[32px] md:text-[46px] font-extrabold text-[#25B868] font-[Nunito] mb-10 text-center min-[1400px]:text-left">
            Misi Kami
          </h2>

          {/* Item 1 */}
          <div className="flex flex-col min-[1400px]:flex-row items-center justify-center gap-8 md:gap-20 pb-6">
            <Image src="/anim1.png" alt="anim" width={200} height={200} className="hover:scale-105 transition duration-300"/>

            <div className="max-w-234.25 space-y-3 text-center md:text-left">
              <h3 className="text-[22px] md:text-[30px] font-bold text-[#3C3C3C] font-[Nunito]">
                Membantu anak belajar
              </h3>
              <p className="text-[18px] md:text-[24px] font-medium text-[#777] font-[Nunito] text-justify">
                Empathify hadir untuk membantu anak dengan gangguan autisme & ADHD memahami berbagai keterampilan dasar dengan cara yang lebih sederhana, terarah, dan menyenangkan.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-[#DCDCDC] my-10 md:my-15"></div>

          {/* Item 2 */}
          <div className="flex flex-col min-[1400px]:flex-row-reverse items-center justify-center gap-8 md:gap-20 pb-6">
            <Image src="/anim1.png" alt="anim" width={200} height={200} className="hover:scale-105 transition duration-300"/>

            <div className="max-w-234.25 space-y-3 text-center md:text-left">
              <h3 className="text-[22px] md:text-[30px] font-bold text-[#3C3C3C] font-[Nunito]">
                Belajar sambil bermain.
              </h3>
              <p className="text-[18px] md:text-[24px] font-medium text-[#777] font-[Nunito] text-justify">
                Kami percaya bahwa belajar akan lebih efektif jika dilakukan dengan cara yang menyenangkan.
              </p>
              <p className="text-[18px] md:text-[24px] font-medium text-[#777] font-[Nunito] text-justify">
                Melalui aktivitas interaktif dan permainan, anak dapat melatih fokus, komunikasi, dan keterampilan sosial tanpa merasa terbebani.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-[#DCDCDC] my-10 md:my-15"></div>

          {/* Item 3 */}
          <div className="flex flex-col min-[1400px]:flex-row items-center justify-center gap-8 md:gap-20 pb-6">
            <Image src="/anim1.png" alt="anim" width={200} height={200} className="hover:scale-105 transition duration-300"/>

            <div className="max-w-234.25 space-y-3 text-center md:text-left">
              <h3 className="text-[22px] md:text-[30px] font-bold text-[#3C3C3C] font-[Nunito]">
                Akses mudah untuk semua
              </h3>
              <p className="text-[18px] md:text-[24px] font-medium text-[#777] font-[Nunito] text-justify">
                Kami percaya setiap anak berhak mendapatkan dukungan yang mereka butuhkan
              </p>
              <p className="text-[18px] md:text-[24px] font-medium text-[#777] font-[Nunito] text-justify">
                Karena itu, Empathify dirancang agar mudah digunakan dan dapat diakses secara luas, sehingga lebih banyak keluarga bisa mendapatkan manfaatnya tanpa terbebani biaya.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* TEAM */}
      <section className="px-6 min-[760px]:pl-10 min-[1100px]:px-10 min-[1500px]:px-0 py-0 mt-16 max-w-350 mx-auto">

        <div className="space-y-12 md:space-y-25">
          <h2 className="text-[32px] md:text-[46px] font-extrabold text-[#25B868] font-[Nunito] text-center min-[1400px]:text-left">
            Profil Tim
          </h2>

          {/* KARTU */}
          <div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[1400px]:grid-cols-4 gap-6 md:gap-5 px-0 md:px-30 justify-items-center min-[1400px]:justify-items-stretch">
            {[
              { img: "/kakkino.png", name: "Nur Satria Jatikusumah", role: "PM & Designer" },
              { img: "/kakadit.png", name: "Aditri Surya Nugraha", role: "Frontend Dev" },
              { img: "/alin.png", name: "Allyndra Dyalista D.", role: "Frontend Dev" },
              { img: "/kakgantang.png", name: "Gantang Satria Yudha", role: "Backend Dev" },
            ].map((item, i) => (
              <div key={i} className="hover:scale-105 transition duration-300">
                <TeamCard
                  img={item.img}
                  name={item.name}
                  role={item.role}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}