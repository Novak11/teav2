import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUXURIA | Curated Luxury Fashion",
  description: "Discover exceptional pieces from the world's most prestigious fashion houses. Shop luxury clothing, bags, shoes, and jewelry.",
  keywords: ["luxury fashion", "designer clothing", "high-end fashion", "luxury bags", "designer shoes"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
