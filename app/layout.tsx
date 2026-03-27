import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ErrorMassage from "@/components/ErrorMassage";


const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
});

const feather = localFont({
  src: "../public/font/Feather.ttf",
  variable: "--font-feather",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Empathify",
  description: "belajar, bermain, dan berkembang setiap hari",
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} ${feather.variable}`}>
        {children}
        <ErrorMassage />
      </body>
    </html>
  );
}
