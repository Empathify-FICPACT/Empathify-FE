import { Suspense } from "react";
import Emosi from "@/components/latihan/Emosi";

export default function EmosiPage() {
  return (
    <Suspense fallback={null}>
      <Emosi />
    </Suspense>
  );
}
