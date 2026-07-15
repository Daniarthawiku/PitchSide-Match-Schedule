import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/AppSidebar";
import { Calendar, Bell } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";

const ibmSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PitchSide - World Cup 2026",
  description: "Your personal football lifestyle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ibmSans.className}>
        <div className="flex flex-col h-screen overflow-hidden">
          {/* top header */}
          <header className="flex justify-between items-center bg-[#0a0f18]/50 
          backdrop-blur-sm border-b border-white/10 z-10 px-24 py-2">
            <Link href={"/"}> 
            <h1 className="text-[36px] font-bold tracking-widest uppercase text-[#39ff14] cursor-pointer transition">
              PITCHSIDE
            </h1>
            </Link>
            <div className="flex gap-8">
              <Calendar className="size-[24px] text-gray-400 hover:text-white cursor-pointer transition"/>
              <Bell className="size-[24px] text-gray-400 hover:text-white cursor-pointer transition" />
            </div>
          </header>

          {/* main layout area */}
          <div className="flex flex-1 overflow-hidden">
            {/* floating left sidebar */}
            <SidebarProvider>
              <AppSidebar />
            </SidebarProvider>

            {/* dynamic content */}
            <main className="flex-1 overflow-y-auto md:p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}