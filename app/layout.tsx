import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/components/shared/tanstack-provider";
import { AuthProvider } from "@/components/shared/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mobility UAE Scooters",
  description: "Bringing comfort to every step",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className="scroll-smooth">
        <TanstackProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased `}
          >
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster
              position="top-center"
              toastOptions={
                {
                  // style: {
                  //   color: "ButtonText",
                  // },
                }
              }
            />
          </body>
        </TanstackProvider>
      </html>
    </AuthProvider>
  );
}
