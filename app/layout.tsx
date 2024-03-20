import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Moslem - Pray and Read Noble Quran",
  description: "app made by a moslem in Indonesia",
  manifest: "/manifest.json",
  keywords: ["quran", "prayer", "prayer time"],
  appleWebApp: {
    statusBarStyle: "black-translucent",
  },
};

export const viewport:Viewport = {
  initialScale: 1,
  // width: "device-width",
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-notoSerif" style={{WebkitTapHighlightColor:'transparent'}}>
          <ThemeProvider attribute="class" defaultTheme="system">
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
