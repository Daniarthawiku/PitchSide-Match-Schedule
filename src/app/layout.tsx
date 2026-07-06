import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/AppSidebar";
import { Calendar, Bell } from "lucide-react";


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
          {/* Top Header */}
          <header className="flex justify-between items-center bg-[#0a0f18]/50 
          backdrop-blur-sm border-b border-white/10 z-10 px-24 py-2">
            <h1 className="text-[36px] font-bold tracking-widest uppercase text-[#B9C7E4]">
              PITCHSIDE
            </h1>
            <div className="flex gap-8">
              <Calendar className="size-[24px] text-gray-400 hover:text-white cursor-pointer transition" />
              <Bell className="size-[24px] text-gray-400 hover:text-white cursor-pointer transition" />
            </div>
          </header>

          {/* Main Layout Area */}
          <div className="flex flex-1 overflow-hidden px-20 ">
            {/* Floating Left Sidebar */}
            <AppSidebar />

            {/* Dynamic Content */}
            <main className="flex-1 overflow-y-auto md:p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}