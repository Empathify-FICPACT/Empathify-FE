import { Suspense } from "react";
import Ekspresi from "@/components/latihan/Ekspresi";

export default function EkspresiPage() {
  return (
    <Suspense fallback={null}>
      <Ekspresi />
    </Suspense>
  );
}
