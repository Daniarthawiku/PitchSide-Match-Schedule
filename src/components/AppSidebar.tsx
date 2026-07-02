"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, BarChart2, Newspaper, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Matches", href: "/matches", icon: Trophy },
  { name: "Stats", href: "/stats", icon: BarChart2 },
  { name: "Favorite", href: "/favorite", icon: Newspaper },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname(); 

  return (
    <aside className="w-120 p-6 hidden md:block">
      {/* Floating Glass Container */}
      <nav className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 flex flex-col gap-2 shadow-2xl ">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-300 font-medium ${
                isActive
                  ? "bg-[#39ff14] text-black shadow-[0_0_20px_rgba(57,255,20,0.3)]" 
                  : "text-gray-300 hover:bg-white/10 hover:text-white "
              }`}
            >
              <Icon className={`w-8 h-8 ${isActive ? "text-black" : "text-gray-400"}`} />
              <span className="text-[28px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>
                  
    </aside>
  );
}