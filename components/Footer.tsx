import Image from "next/image";
import Link from "next/link";
import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const navItems = [
  { label: "Beranda", href: "/landing" },
  { label: "Layanan", href: "/layanan" },
  { label: "Tentang Kami", href: "/tentang" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#1C8A4E] text-white flex justify-center">
      <div className="w-full max-w-[1920px] px-6 md:px-20 py-10 md:py-15">
        {/* TOP */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* LOGO */}
          <Link href="/landing" aria-label="Ke beranda">
            <Image src="/logo.png" alt="logo" width={140} height={60} />
          </Link>

          {/* MENU */}
          <nav className="flex items-center flex-wrap justify-center gap-6 text-base md:text-xl font-medium">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:scale-105 transition duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* LINE */}
        <div className="w-full h-[1px] bg-white/50 my-8 md:my-12"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          {/* COPYRIGHT */}
          <p className="text-[14px] md:text-[16px]">
            Copyright © 2026 Empathify Indonesia
          </p>

          {/* SOCIAL */}
          <div className="flex gap-5 text-lg">
            {[
              FaYoutube,
              FaFacebookF,
              FaXTwitter,
              FaInstagram,
              FaLinkedinIn,
            ].map((Icon, index) => (
              <Icon
                key={index}
                className="cursor-pointer transition duration-300 hover:scale-125 hover:text-[#FFC200]"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
