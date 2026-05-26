import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trabajos Rapidos by ExpressJobs",
  description: "Publica trabajos rapidos o encontra tareas cerca tuyo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-UY">
      <body className="antialiased">{children}</body>
    </html>
  );
}
