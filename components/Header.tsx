import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#25B868] flex justify-center">
      
      <div className="w-full max-w-[1920px] min-h-[70px] flex items-center justify-between px-10">
        
        {/* KIRI: pokoknya yg logo ama menu ntuh*/}
        <div className="flex items-center gap-5">
          <Image src="/logo/Logo putih.svg" alt="Logo" width={120} height={32} />

          <nav className="flex gap-5 text-white text-[14px] font-bold">
            <Link href="/landing" className="hover:text-green-100 transition-colors">Beranda</Link>
            <Link href="/layanan" className="hover:text-green-100 transition-colors">Layanan</Link>
            <Link href="/edukasi" className="hover:text-green-100 transition-colors">Edukasi</Link>
            <Link href="/tentang" className="hover:text-green-100 transition-colors">Tentang Kami</Link>
          </nav>
        </div>

        {/* KANAN: ini bgian login2an */}
        <div className="flex gap-3">
          <Link href="/register">
            <button className="w-[100px] h-[40px] bg-[#E9F8F0] text-[#25B868] hover:bg-white text-[14px] font-bold px-5 py-2 rounded-[16px] transition-colors">
              Daftar
            </button>
          </Link>

          <Link href="/login">
            <button className="w-[100px] h-[40px] flex items-center justify-center bg-[#FFC200] text-[#E9F8F0] hover:bg-[#ffb300] hover:border-[#ffcc00] text-[14px] font-bold px-5 py-2 rounded-[16px] border-[4px] border-[#FFDE00] transition-colors">
              Masuk
            </button>
          </Link>
        </div>

      </div>
    </header>
  );
}