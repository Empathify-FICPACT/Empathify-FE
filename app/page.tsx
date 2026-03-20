import Sidebar from "@/components/sidebar";
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard/beranda');
}
