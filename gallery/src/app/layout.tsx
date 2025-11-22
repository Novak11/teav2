import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VOID. | Digital Art Gallery",
  description: "Avant-garde digital art gallery showcasing generative, glitch, and experimental digital artists.",
  keywords: ["digital art", "generative art", "glitch art", "contemporary art", "gallery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
