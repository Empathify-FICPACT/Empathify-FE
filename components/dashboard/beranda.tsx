import Badge from "./badge";

export default function Beranda() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-4 lg:px-6 py-6 lg:py-10 bg-[#f9fafb] min-h-screen">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start relative">
        {/* Right Sidebar Component injected here */}
        <Badge showMisi={true} />

        {/* Main Content */}
        <div className="flex-1 w-full order-2 xl:order-1 min-w-0">
          <h2 className="text-xl md:text-[28px] font-semibold text-gray-900 ">
            Halo, Febrian Faiq
          </h2>
           <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 ">
            Selamat Datang di Empathify!
          </h1>
        </div>
      </div>
    </div>
  );
}
