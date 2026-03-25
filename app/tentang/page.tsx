import Image from "next/image";
import TeamCard from "../components/Card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TentangPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-[rgba(245,245,245,1)] pb-10">

        {/* HERO */}
      <section className="bg-[#25B868] px-[30px] py-25 flex items-center justify-between relative overflow-hidden">
  
        {/* TEXT */}
        <div className="max-w-[804px] ml-25">
          <h1 className="text-[50px] font-bold leading-tight text-[rgba(255,255,255,1)] font-[Nunito]">
            Temani Perjalanan Belajar Anak Bersama Empathify
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

      {/* TENTANG */}
      <section className="px-0 py-16 max-w-[1400px] mx-auto flex items-center justify-between">

        {/* TEXT */}
        <div className="max-w-[1000px]">
          <h2 className="text-[46px] font-extrabold text-[rgba(37,184,104,1)] font-[Nunito] mb-4">
            Tentang Empathify
          </h2>

          <p className="text-[24px] font-medium text-[rgba(119,119,119,1)] font-[Nunito] text-justify">
            Empathify adalah platform pembelajaran interaktif berbasis AI
            yang dirancang untuk membantu anak dengan autisme dan ADHD
            dalam mengembangkan keterampilan sosial, komunikasi,
            serta pemahaman emosi.
          </p>
        </div>

        {/* IMAGE */}
        <div className="w-[250px] h-[250px] right-[30] relative">
          <Image
            src="/anim2.png"
            alt="tentang"
            fill
            className="object-contain"
          />
        </div>

      </section>

      {/* MISI */}
      <section className="px-0 py-1 max-w-[1400px] mx-auto">

        {/* TITLE */}
        <div className="space-y-10">
          <h2 className="text-[46px] font-extrabold text-[rgba(37,184,104,1)] font-[Nunito] mb-10">
            Misi Kami
          </h2>

  

          {/* Item 1 */}
          <div className="flex items-center justify-center gap-20 pb-6">
            <Image src="/anim1.png" alt="anim" width={250} height={250} />

            <div className="max-w-[937px] space-y-3">
              <h3 className="text-[30px] font-[Nunito] text-[rgba(60,60,60,1)] font-bold">
                Membantu anak belajar
              </h3>
              <p className="text-[24px] font-medium text-[rgba(119,119,119,1)] font-[Nunito] text-justify">
                Empathify hadir untuk membantu anak dengan gangguan autisme & ADHD memahami berbagai keterampilan dasar dengan cara yang lebih sederhana, terarah, dan menyenangkan.
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[rgba(220,220,220,1)] my-15"></div>

          {/* Item 2 */}
          <div className="flex items-center justify-center flex-row-reverse gap-20 pb-6">
            <Image src="/anim1.png" alt="anim" width={250} height={250} />

            <div className="max-w-[937px] space-y-3">
              <h3 className="text-[30px] font-[Nunito] text-[rgba(60,60,60,1)] font-bold">
                Belajar sambil bermain.
              </h3>
              <p className="text-[24px] font-medium text-[rgba(119,119,119,1)] font-[Nunito] text-justify">
                Kami percaya bahwa belajar akan lebih efektif jika dilakukan dengan cara yang menyenangkan.
              </p>
              <p className="text-[24px] font-medium text-[rgba(119,119,119,1)] font-[Nunito] text-justify">
                Melalui aktivitas interaktif dan permainan, anak dapat melatih fokus, komunikasi, dan keterampilan sosial tanpa merasa terbebani.
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[rgba(220,220,220,1)] my-15"></div>

          {/* Item 3 */}
          <div className="flex items-center justify-center gap-20 pb-6">
            <Image src="/anim1.png" alt="anim" width={250} height={250} />

            <div className="max-w-[937px] space-y-3">
              <h3 className="text-[30px] font-[Nunito] text-[rgba(60,60,60,1)] font-bold">
                Akses mudah untuk semua
              </h3>
              <p className="text-[24px] font-medium text-[rgba(119,119,119,1)] font-[Nunito] text-justify">
                Kami percaya setiap anak berhak mendapatkan dukungan yang mereka butuhkan
              </p>
              <p className="text-[24px] font-medium text-[rgba(119,119,119,1)] font-[Nunito] text-justify">
                Karena itu, Empathify dirancang agar mudah digunakan dan dapat diakses secara luas, sehingga lebih banyak keluarga bisa mendapatkan manfaatnya tanpa terbebani biaya.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* TEAM */}
      <section className="px-0 py-0 mt-16 max-w-[1400px] mx-auto">

        {/* TITLE */}
        <div className="space-y-25">
          <h2 className="text-[46px] font-extrabold text-[rgba(37,184,104,1)] font-[Nunito]">
            Profil Tim
          </h2>

          {/* KARTU */}
          <div className="grid grid-cols-4 gap-5 px-30">
            {[
              { img: "/kakkino.png", name: "Nur Satria Jatikusumah", role: "PM & Designer" },
              { img: "/kakadit.png", name: "Aditri Surya Nugraha", role: "Frontend Dev" },
              { img: "/alin.png", name: "Allyndra Dyalista D.", role: "Frontend Dev" },
              { img: "/kakgantang.png", name: "Gantang Satria Yudha", role: "Backend Dev" },
            ].map((item, i) => (
              <TeamCard
                key={i}
                img={item.img}
                name={item.name}
                role={item.role}
              />
            ))}
          </div>

        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}