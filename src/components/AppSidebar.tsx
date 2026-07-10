"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Home, Trophy, Newspaper} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "News", href: "/News", icon: Newspaper },
  { name: "Matches", href: "/matches", icon: Trophy },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpen, state } = useSidebar();

  useEffect(() => {
    if (pathname.includes("/match/")) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [pathname, setOpen]);

  return (
    <aside className= {`pl-20 w-64 p-6 hidden md:block transition-all duration-300 ${state === "collapsed" ? "w-0 p-0 overflow-hidden opacity-0" : "opacity-100"}`}>
      <nav className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 flex flex-col gap-2 shadow-2xl min-w-[200px]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium ${
                isActive
                  ? "bg-[#39ff14] text-black shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-black" : "text-gray-400"}`} />
              <span className="text-[15px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}