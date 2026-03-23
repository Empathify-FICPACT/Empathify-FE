import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-[#25B868] flex justify-center">
      
      <div className="w-full max-w-[1920px] min-h-[110px] flex items-center justify-between px-15">
        
        {/* KIRI: pokoknya yg logo ama menu ntuh*/}
        <div className="flex items-center gap-10">
          <Image src="/logo.png" alt="Logo" width={160} height={72} />

          <nav className="flex gap-8 text-white text-[22px] font-bold">
            <a href="#">Beranda</a>
            <a href="#">Layanan</a>
            <a href="#">Edukasi</a>
            <a href="#">Tentang Kami</a>
          </nav>
        </div>

        {/* KANAN: ini bgian login2an */}
        <div className="flex gap-5">
          <button className="w-[130px] h-[50px] bg-[#E9F8F0] text-[#25B868] text-[20px] font-bold px-5 py-2 rounded-[16px]">
            Daftar
          </button>

          <button className="w-[130px] h-[50px] flex items-center justify-center bg-[#FFC200] text-[#E9F8F0] text-[20px] font-bold px-5 py-2 rounded-[16px] border-[4px] border-[#FFDE00]">
            Masuk
          </button>
        </div>

      </div>
    </header>
  );
}