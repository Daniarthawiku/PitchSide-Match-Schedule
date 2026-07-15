"use client";

import Link from "next/link";
import Image from "next/image";
import { useFetchFixtures } from "@/hooks/useFetchFixtures";
// import { MatchData } from "@/components/molecules/MatchCard"; 

const getShortName = (name?: string) => {
  if (!name) return "TBA";
  return name.substring(0, 3).toUpperCase();
};

export interface MatchData {
  id: string;
  time: string;
  round: string;
  stadium: string;
  status: "finished" | "live" | "upcoming";
  homeTeam: { name: string; flagUrl: string; score: number | null; penaltyScore?: number | null }; 
  awayTeam: { name: string; flagUrl: string; score: number | null; penaltyScore?: number | null }; 
}

// match node
const MatchNode = ({ match }: { match: MatchData }) => {
  // skeleton
  if (!match) {
    return (
      <div className="block relative z-10 w-40 md:w-48 opacity-40">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-sm font-bold text-white/40">TBA</span>
          </div>
          <div className="w-full h-[1px] bg-white/10"></div>
          <div className="flex justify-between items-center h-5">
            <span className="text-sm font-bold text-white/40">TBA</span>
          </div>
        </div>
      </div>
    );
  }

  const homePen = match.homeTeam.penaltyScore;
  const awayPen = match.awayTeam.penaltyScore;
  const homeScore = match.homeTeam.score;
  const awayScore = match.awayTeam.score;

  const isHomeWinner = homePen !== null && awayPen !== null 
    ? homePen > awayPen 
    : (homeScore !== null && awayScore !== null ? homeScore > awayScore : false);
  
  const isAwayWinner = homePen !== null && awayPen !== null 
    ? awayPen > homePen 
    : (homeScore !== null && awayScore !== null ? awayScore > homeScore : false);

  return (
    <Link href={`/match/${match.id}`} className="block relative group z-10 w-40 md:w-48">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex flex-col gap-2 transition-all duration-300 cursor-pointer group-hover:bg-white/10 group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:scale-[1.02]">
        
        {/* home team */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden relative border border-white/20 bg-black/40">
              {match.homeTeam.flagUrl && (
                <Image src={match.homeTeam.flagUrl} alt={match.homeTeam.name} fill sizes="20px" className="object-cover scale-150" />
              )}
            </div>
            <span className="text-sm font-bold text-white uppercase">{getShortName(match.homeTeam.name)}</span>
          </div>
          <span className={`font-bold text-[16px] ${isHomeWinner ? "text-[#39ff14]" : "text-white"}`}>
              {match.homeTeam.score ?? "-"} 
              {match.homeTeam.penaltyScore !== null && (
                <span className="text-[16px] ml-1">({match.homeTeam.penaltyScore})</span>
              )}
          </span>
        </div>

        {/* separator */}
        <div className="w-full h-[1px] bg-white/10"></div>

        {/* away Team */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden relative border border-white/20 bg-black/40">
              {match.awayTeam.flagUrl && (
                <Image src={match.awayTeam.flagUrl} alt={match.awayTeam.name} fill sizes="20px" className="object-cover scale-150" />
              )}
            </div>
            <span className="text-sm font-bold text-white uppercase">{getShortName(match.awayTeam.name)}</span>
          </div>
          <span className={`font-bold text-[16px] ${isAwayWinner ? "text-[#39ff14]" : "text-white"}`}>
              {match.awayTeam.score ?? "-"} 
              {match.awayTeam.penaltyScore !== null && (
                <span className="text-[16px] ml-1">({match.awayTeam.penaltyScore})</span>
              )}
            </span>
        </div>
      </div>
    </Link>
  );
};

export default function MatchesPage() {
  const { fixtures, isLoading, error } = useFetchFixtures();

  const roundOf16 = fixtures.filter(m => m.round.toLowerCase().includes("16"));
  const quarterFinals = fixtures.filter(m => m.round.toLowerCase().includes("quarter"));
  const semiFinals = fixtures.filter(m => m.round.toLowerCase().includes("semi"));
  const finalMatch = fixtures.find(m => 
    m.round.toLowerCase().includes("final") && 
    !m.round.toLowerCase().includes("quarter") && 
    !m.round.toLowerCase().includes("semi") && 
    !m.round.toLowerCase().includes("3rd")
  );
    return (
    <div className="w-full h-full flex flex-col pl-8">
      <div className="mb-6 pt-2">
        <h1 className="text-3xl font-bold text-[#F5F2FF] tracking-wider uppercase">Knockout Stage</h1>
        <p className="text-[#F5F2FF]/60">Road to the World Cup Final</p>
      </div>

      {/* error handler */}
      {error && (
        <div className="w-full max-w-4xl p-4 mb-4 text-center border border-red-500/50 bg-red-500/10 rounded-xl text-red-400">
          {error}
        </div>
      )}

      {/* container bracket */}
      <div className="w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
        <div className="flex flex-row justify-between items-center min-w-max gap-8 lg:gap-12 pr-10">

          {/* LEFT BRACKET */}
          {/* round of 16 */}
          <div className="flex flex-col gap-[4.5rem]">
            {Array.from({ length: 4 }).map((_, i) => (
              <MatchNode key={`l16-${i}`} match={roundOf16[i]} />
            ))}
          </div>

          {/* quarter final */}
          <div className="flex flex-col gap-[12.5rem]">
            {Array.from({ length: 2 }).map((_, i) => (
              <MatchNode key={`lqf-${i}`} match={quarterFinals[i]} />
            ))}
          </div>

          {/* semi final */}
          <div className="flex flex-col">
            <MatchNode match={semiFinals[0]} />
          </div>


          {/* FINAL */}
          <div className="flex flex-col items-center mx-4 relative">
            <div className="mb-6 animate-bounce">
              <div className="w-16 h-20 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-t-lg rounded-b-3xl shadow-[0_0_30px_rgba(253,224,71,0.4)] flex items-center justify-center border-2 border-yellow-200 text-3xl">
                🏆
              </div>
            </div>
            
            {/* glow effect */}
            <div className="relative p-1 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 rounded-xl shadow-[0_0_20px_rgba(252,211,77,0.5)]">
              <MatchNode match={finalMatch} />
            </div>
            <span className="mt-4 font-black tracking-widest text-yellow-400 uppercase drop-shadow-md">Final</span>
          </div>


          {/* RIGHT BRACKET */}
          {/* semi final */}
          <div className="flex flex-col">
            <MatchNode match={semiFinals[1]} />
          </div>

          {/* quarter final */}
          <div className="flex flex-col gap-[12.5rem]">
            {Array.from({ length: 2 }).map((_, i) => (
              <MatchNode key={`rqf-${i}`} match={quarterFinals[i + 2]} />
            ))}
          </div>

          {/* round of 16 */}
          <div className="flex flex-col gap-[4.5rem]">
            {Array.from({ length: 4 }).map((_, i) => (
              <MatchNode key={`r16-${i}`} match={roundOf16[i + 4]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}