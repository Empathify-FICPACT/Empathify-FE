import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EdukasiPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center bg-[rgba(245,245,245,1)] pt-20 pb-20">
        <h1 className="text-4xl font-bold text-[#25B868] mb-4">Halaman Edukasi</h1>
        <p className="text-lg text-gray-500 font-medium">Materi edukasi akan segera hadir di sini.</p>
      </main>
      <Footer />
    </div>
  );
}
