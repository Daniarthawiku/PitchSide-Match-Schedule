"use strict";
"use client";

import { useState } from "react";
import { LiveMatchHero } from "@/components/organism/LiveMatchHero";
import { Combobox } from "@/components/ui/combobox";

const ROUND_OPTIONS = [
  { value: "round-32", label: "Round 32" },
  { value: "round-16", label: "Round 16" },
  { value: "round-8", label: "Round 8" },
  { value: "semifinal", label: "Semifinal" },
  { value: "final", label: "Final" },
];

export default function Home() {
  const [selectedRound, setSelectedRound] = useState<string>("");

  return (
    <main>
      <div className="w-full mb-10">
        <span className="text-[24px] font-bold text-white mb-4 block tracking-wide">
          Live Matches
        </span>
        <LiveMatchHero />
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[24px] font-bold text-white tracking-wide">
            Fixtures
          </span>
          
          <div className="flex items-center gap-4">
            <Combobox 
              options={ROUND_OPTIONS} 
              value={selectedRound} 
              onChange={setSelectedRound} 
              placeholder="All Rounds"
            />
          </div>
        </div>

          {/* Nantinya di sini Anda bisa melakukan mapping data komponen MatchCard 
            yang sudah difilter berdasarkan nilai dari `selectedRound`.
          */}
      </div>
    </main>
  );
}