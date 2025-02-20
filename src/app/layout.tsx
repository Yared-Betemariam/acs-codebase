import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "dd",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${font.className} antialiased flex flex-col relative bg-black text-white min-h-screen`}
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
