import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import adaImg from "@img/Ada_Lovelace_squared.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "code_sisters",
  description:
    "Сообщество для женщин в IT всех уровней и стеков. Вдохновляйтесь, общайтесь и помогайте друг другу!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
      <link
          rel="preload"
          as="image"
          href={adaImg.src}
          fetchPriority="high"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div>{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
