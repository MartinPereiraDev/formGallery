import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import DarkVeil from "src/components/backgrounds/DarkVeil";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galería de Formularios",
  description: "Colección de formularios modernos y responsivos para React y Next.js",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: '#000' }}
      >
        {/* Fondo animado DarkVeil */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          <DarkVeil
            hueShift={20}
            noiseIntensity={0}         // <--- Sin puntitos ni grano
            scanlineIntensity={0}      // <--- Sin líneas
            speed={1}
            scanlineFrequency={2.5}
            warpAmount={0.13}
            resolutionScale={1}        // <--- Máxima nitidez
          />
        </div>
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}