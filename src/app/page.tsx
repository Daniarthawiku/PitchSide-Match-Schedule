"use strict";
"use client";

import { useState } from "react";
import { LiveMatchHero } from "@/components/organism/LiveMatchHero";
import { Combobox } from "@/components/ui/combobox";
import { MatchCard} from "@/components/molecules/MatchCard";
import { useFetchFixtures } from "@/hooks/useFetchFixtures";

const ROUND_MAPPING: Record<string, string> = {
  "group-stage-1": "Group Stage - 1",
  "group-stage-2": "Group Stage - 2",
  "group-stage-3": "Group Stage - 3",
  "round-of-32": "Round of 32",
  "round-of-16": "Round of 16",
  "quarter-finals": "Quarter-finals",
  "semi-final": "Semi-final",
  "final": "Final",
};

const ROUND_OPTIONS = [
  { value: "all-rounds", label: "ALL ROUNDS" },

  ...Object.entries(ROUND_MAPPING).map(([key, val]) => ({
    value: key,
    label: val.toUpperCase(),
  })),
];

export default function Home() {
  const [selectedRound, setSelectedRound] = useState<string>("all-rounds");
  const { fixtures, isLoading, error } = useFetchFixtures();
  const filteredMatches = fixtures.filter((match) => {
    if (!selectedRound || selectedRound === "all-rounds") return true;

    const targetRoundString = ROUND_MAPPING[selectedRound];

    return targetRoundString 
      ? match.round.toLowerCase().includes(targetRoundString.toLowerCase()) 
      : false;
  });
  const heroMatch = fixtures.find(m => m.status === "live") || fixtures[0];

  return (
    <main className="pl-10 pr-20 pb-10">
      
      {/* Hero Section*/}
      <div className="w-full mb-8">
        <span className="text-[24px] font-bold text-[#F5F2FF] mb-4 block tracking-wide">
          Live Matches
        </span>
        {!isLoading && heroMatch ? (
           <LiveMatchHero matchId={heroMatch.id} />
        ) : (
           <div className="w-full h-64 bg-white/5 animate-pulse rounded-2xl flex items-center justify-center border border-white/10 text-white/50">
             Load Live Match...
           </div>
        )}
      </div>

      {/* Fixtures */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <span className="text-[24px] font-bold tracking-wide text-[#F5F2FF]">
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

        {/* State Berdasarkan Kondisi Fetching */}
        {isLoading ? (
          // Loading Skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="w-full h-40 bg-white/5 animate-pulse rounded-xl border border-white/10"></div>
            ))}
          </div>
        ) : error ? (
          // Error State
          <div className="w-full p-10 text-center border border-red-500/50 bg-red-500/10 rounded-2xl text-red-400">
            {error}
          </div>
        ) : filteredMatches.length > 0 ? (
          // Success State - Grid Match Cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          // Empty State (Data kosong setelah difilter)
          <div className="w-full p-10 text-center border border-dashed border-white/20 rounded-2xl text-white/60">
            Couldnt find any matches for the selected round. Please try a different round.
          </div>
        )}
        
      </div>
    </main>
  );
}