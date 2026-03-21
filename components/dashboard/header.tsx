import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-end items-center mt-6 px-10 bg-transparent w-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-100 overflow-hidden relative flex-shrink-0 flex items-center justify-center border border-teal-200">
          {/* Avatar SVG fallback for the yellow chick from the mockup */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.686 2 6 4.686 6 8C6 10.662 7.733 12.915 10.151 13.682C9.553 14.542 9.176 15.546 9.053 16.632C7.309 17.518 6 19.348 6 21.5C6 21.776 6.224 22 6.5 22H17.5C17.776 22 18 21.776 18 21.5C18 19.348 16.691 17.518 14.947 16.632C14.824 15.546 14.447 14.542 13.849 13.682C16.267 12.915 18 10.662 18 8C18 4.686 15.314 2 12 2Z" fill="#FBBF24"/>
            <circle cx="9.5" cy="8.5" r="1.5" fill="#1F2937"/>
            <circle cx="14.5" cy="8.5" r="1.5" fill="#1F2937"/>
            <path d="M11 11.5L12 12.5L13 11.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="font-bold text-black text-base lg:text-xl ">Febrian Faiq</span>
      </div>
    </header>
  );
}
