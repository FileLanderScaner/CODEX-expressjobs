import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExpressJobs",
  description: "Microtrabajos locales para Uruguay y LATAM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-UY">
      <body>{children}</body>
    </html>
  );
}
