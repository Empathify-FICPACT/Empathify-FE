import Sidebar from "@/components/sidebar";
import Header from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      <Sidebar />
      <main className="flex-1 w-full min-w-0 flex flex-col">
        <Header />
        {children}
      </main>
    </div>
  );
}
