import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";
import { TeamBadge } from "@/components/atoms/TeamBadge";
import { LiveMatchHero } from "@/components/organism/LiveMatchHero";


export default function Home() {
  return (
    <main>
        <div className="mb-8">
          <span className="text-[60px] font-bold text-white mb-4 block">Live Matches</span>
          <LiveMatchHero />
        </div>
        <div className="mb-8">
          <span className="text-[60px] font-bold text-white mb-4 block">Fixtures</span>
        </div>
    </main>
  )
}