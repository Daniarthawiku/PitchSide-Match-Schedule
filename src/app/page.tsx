"use strict";
"use client";

import { useState } from "react";
import { LiveMatchHero } from "@/components/organism/LiveMatchHero";
import { Combobox } from "@/components/ui/combobox";
import { MatchCard, MatchData } from "@/components/molecules/MatchCard";

const ROUND_OPTIONS = [
  { value: "all-rounds", label: "All Rounds" },
  { value: "round-32", label: "Round 32" },
  { value: "round-16", label: "Round 16" },
  { value: "round-8", label: "Round 8" },
  { value: "semifinal", label: "Semifinal" },
  { value: "final", label: "Final" },
];

// Data Dummy
const MOCK_MATCHES: MatchData[] = [
  {
    id: "1",
    time: "14:00",
    round: "Round 16",
    stadium: "Luzhniki Stadium",
    status: "finished",
    homeTeam: { name: "France", flagUrl: "https://flagcdn.com/w40/fr.png", score: 2 },
    awayTeam: { name: "Australia", flagUrl: "https://flagcdn.com/w40/au.png", score: 1 },
  },
  {
    id: "2",
    time: "17:00",
    round: "Round 16",
    stadium: "Spartak Stadium",
    status: "upcoming",
    homeTeam: { name: "Denmark", flagUrl: "https://flagcdn.com/w40/dk.png", score: null },
    awayTeam: { name: "Peru", flagUrl: "https://flagcdn.com/w40/pe.png", score: null },
  },
  {
    id: "3",
    time: "20:00",
    round: "Quarter Final",
    stadium: "Kazan Arena",
    status: "upcoming",
    homeTeam: { name: "Croatia", flagUrl: "https://flagcdn.com/w40/hr.png", score: null },
    awayTeam: { name: "Nigeria", flagUrl: "https://flagcdn.com/w40/ng.png", score: null },
  },
];

export default function Home() {
  const [selectedRound, setSelectedRound] = useState<string>("");
  const filteredMatches = MOCK_MATCHES.filter((match) => {
    if (!selectedRound) return true;
    return match.round === selectedRound;
  });

  return (
    <main className="pl-10 pr-20">
      <div className="w-full mb-4">
        <span className="text-[24px] font-bold text-[#F5F2FF] mb-4 block tracking-wide">
          Live Matches
        </span>
        <LiveMatchHero matchId = "1" />
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
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

          {/* Grid Match Cards */}
        {filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="w-full p-10 text-center border border-dashed border-white/20 rounded-2xl text-white">
            Couldnt find any matches for the selected round. Please try a different round.
          </div>
        )}
      </div>
    </main>
  );
}