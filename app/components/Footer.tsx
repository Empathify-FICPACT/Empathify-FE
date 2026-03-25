import Image from "next/image";
import { FaYoutube, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1C8A4E] text-white flex justify-center">
      
      <div className="w-full max-w-[1920px] px-20 py-15">
        
        {/* TOP */}
        <div className="flex items-center justify-between">
          
          {/* logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={160} height={72} />
          </div>

          {/* menu */}
          <nav className="flex gap-8 text-[22px] font-medium">
            <a href="#">Beranda</a>
            <a href="#">Layanan</a>
            <a href="#">Edukasi</a>
            <a href="#">Tentang Kami</a>
          </nav>
        </div>

        {/* ini garis tegngah itu */}
        <div className="w-full h-[1px] bg-white/50 my-15"></div>

        {/* BOTTOM */}
        <div className="flex items-center justify-between text-[22px]">
          
          {/* copyright */}
          <p className="text-[16px]">
              Copyright © 2026 Empathify Indonesia
          </p>

          {/* social mediaaa */}
          <div className="flex gap-5 text-white text-18px">
             <FaYoutube />
             <FaFacebookF />
             <FaXTwitter />
              <FaInstagram />
             <FaLinkedinIn />
          </div>

        </div>

      </div>
    </footer>
  );
}