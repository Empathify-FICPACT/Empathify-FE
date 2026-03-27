import { Suspense } from "react";
import SimulasiPercakapan from "@/components/latihan/SimulasiPercakapan";

export default function SimulasiPercakapanPage() {
  return (
    <Suspense fallback={null}>
      <SimulasiPercakapan />
    </Suspense>
  );
}
