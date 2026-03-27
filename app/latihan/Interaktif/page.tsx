import { Suspense } from "react";
import Interaktif from "@/components/latihan/Interaktif";

export default function InteraktifPage() {
  return (
    <Suspense fallback={null}>
      <Interaktif />
    </Suspense>
  );
}
