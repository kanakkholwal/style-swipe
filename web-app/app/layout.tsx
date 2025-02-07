import { Toaster as ShadToaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ClientProvider from "./client-provider";
import "./globals.css";

const font = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin-ext", "latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--plus-jakarta",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "StyleSwipe - Discover Your Perfect Outfit",
  description: "Swipe through stylish outfits tailored just for you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <ClientProvider>{children}</ClientProvider>
        <ShadToaster />
        <Toaster />
      </body>
    </html>
  );
}
