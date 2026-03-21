import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";
import Landing from "@/app/landing/page";

export default function Home() {
  // redirect('/dashboard/beranda');
  return (
    <main >
      <h1><Landing />
    </h1>
    </main>
  );
}
