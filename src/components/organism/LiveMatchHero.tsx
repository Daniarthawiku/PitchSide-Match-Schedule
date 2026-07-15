import Link from "next/link";
import Image from "next/image";

export interface MatchData {
  id: string;
  time: string;
  round: string;
  stadium: string;
  status: "finished" | "live" | "upcoming";
  homeTeam: { name: string; flagUrl: string; score: number | null; penaltyScore?: number | null }; 
  awayTeam: { name: string; flagUrl: string; score: number | null; penaltyScore?: number | null }; 
}

export function LiveMatchHero({ match }: { match: MatchData }) {
  const getShortName = (name: string) => name.substring(0, 3).toUpperCase()

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
    <Link href={`/match/${match.id}`} className="block w-full group">
      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br 
      from-[#1E153A] via-[#EC577D] to-[#FFA400] p-6 pt-6 cursor-pointer transition-transform 
      duration-300 group-hover:scale-[1.01]">
        
        <div className="flex justify-between items-center mb-6">
          {/* sementara dimatiin karena gaada live match & upcoming */}
          {/* {match.status === "live" ? (
            <div className="bg-[#39ff14] animate-pulse text-[12px] text-black font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(57,255,20,0.5)]">
              • LIVE
            </div>
          ) : match.status === "finished" ? (
            <div className="bg-white/20 backdrop-blur-md text-white border border-white/40 text-[12px] font-bold px-3 py-1 rounded-full">
              FULL TIME
            </div>
          ) : (
            <div className="bg-white/20 backdrop-blur-md text-white border border-white/40 text-[12px] font-bold px-3 py-1 rounded-full">
              {match.time}
            </div>
          )} */}
          <div className="bg-[#39ff14] animate-pulse text-xs font-bold px-3 py-1
          rounded-full shadow-[0_0_10px_rgba(57,255,20,0.5)]">
            • LIVE 76'
          </div>
          <div className="text-white/80 font-medium text-[16px] text-right">{match.round}</div>
        </div>

        {/* main content */}
        <div className="flex justify-between items-center px-4 md:px-12">
          {/* home team */}
          <div className="flex flex-col items-center gap-3 w-24">
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 border-2 
            border-white/50 flex items-center justify-center shadow-inner overflow-hidden backdrop-blur-sm p-3">
              <Image src={match.homeTeam.flagUrl} alt={match.homeTeam.name} fill sizes="80px" className="object-contain p-2" />
            </div>
            <span className="font-bold text-white tracking-widest text-lg md:text-xl">{getShortName(match.homeTeam.name)}</span>
          </div>

          {/* score */}
          <div className="md:text-7xl font-bold text-[#39ff14]">
            <span className={isHomeWinner ? "text-[#39ff14]" : "text-white"}>
              {match.homeTeam.score ?? "-"}
              {match.homeTeam.penaltyScore !== null && (
                <span className="text-[20px] ml-2">({match.homeTeam.penaltyScore})</span>
              )}
            </span>
            
            <span className="text-white/50 text-4xl md:text-6xl mx-2">-</span>

            <span className={isAwayWinner ? "text-[#39ff14]" : "text-white"}>
              {match.awayTeam.score ?? "-"}
              {match.awayTeam.penaltyScore !== null && (
                <span className="text-[20px] ml-2">({match.awayTeam.penaltyScore})</span>
              )}
            </span>
          </div>

          {/* away Team */}
          <div className="flex flex-col items-center gap-3 w-24">
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10
            border-2 border-white/50 flex items-center justify-center shadow-inner overflow-hidden backdrop-blur-sm p-3">
              <Image src={match.awayTeam.flagUrl} alt={match.awayTeam.name} fill sizes="80px" className="object-contain p-2" />
            </div>
            <span className="font-bold text-white tracking-widest text-lg md:text-xl">{getShortName(match.awayTeam.name)}</span>
          </div>
        </div>

        {/* possession bar */}
        <div className="mt-10">
          <div className="flex justify-between text-xs text-white/90 mb-2 font-medium tracking-wide">
            <span>58%</span>
            <span className="uppercase text-white/60">Possession</span>
            <span>42%</span>
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden flex shadow-inner">
            <div className="h-full bg-[#39ff14] w-[58%]"></div>
            <div className="h-full bg-white/80 w-[42%]"></div>
          </div>
        </div>
        <div className="pt-4 text-center">
          <span className="text-white/80 text-sm font-medium tracking-widest uppercase">
            {match.stadium}
          </span>
        </div>
        
      </div>
    </Link>
  );
}