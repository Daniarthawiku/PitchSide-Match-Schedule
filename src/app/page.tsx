import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";
import { TeamBadge } from "@/components/atoms/TeamBadge";
import { LiveMatchHero } from "@/components/organism/LiveMatchHero";


export default function Home() {
  return (
    <main>
        <div>
          <LiveMatchHero />
          <Button>Click me</Button>

          <Button className="bg-[#10b981] hover:bg-[#059669] text-white rounded-md">
        Live Match
      </Button>
        </div>
    </main>
  )
}