import Link from "next/link";
import { TeamBadge } from "../atoms/TeamBadge";

export interface MatchData {
  id: string;
  time: string;
  round: string;
  stadium: string;
  status: "finished" | "live" | "upcoming";
  homeTeam: { name: string; flagUrl: string; score: number | null; penaltyScore?: number | null }; 
  awayTeam: { name: string; flagUrl: string; score: number | null; penaltyScore?: number | null }; 
}

export function MatchCard({ match }: { match: MatchData }) {
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
    <Link href={`/match/${match.id}`} className="block group">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 
      transition-all duration-300 cursor-pointer group-hover:bg-white/10 group-hover:border-white/30 
      group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:scale-[1.01]">
        
        {/* Header Info */}
        <div className="flex justify-between items-center text-[12px] text-[#F5F2FF] mb-5 pb-3 
        border-b border-white/10 uppercase tracking-wider">
          <span>{match.time} WIB</span>
          <span>{match.round}</span>
          <span className="truncate ml-2 text-right">{match.stadium}</span>
        </div>
        
        {/* Daftar Tim & Skor */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <TeamBadge name={match.homeTeam.name} flagUrl={match.homeTeam.flagUrl} />
            <span className={`font-bold text-lg ${isHomeWinner ? "text-[#39ff14]" : "text-white"}`}>
              {match.homeTeam.score ?? "-"} 
              {match.homeTeam.penaltyScore !== null && (
                <span className="text-sm ml-1">({match.homeTeam.penaltyScore})</span>
              )}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <TeamBadge name={match.awayTeam.name} flagUrl={match.awayTeam.flagUrl} />
            <span className={`font-bold text-lg ${isAwayWinner ? "text-[#39ff14]" : "text-white"}`}>
              {match.awayTeam.score ?? "-"} 
              {match.awayTeam.penaltyScore !== null && (
                <span className="text-sm ml-1">({match.awayTeam.penaltyScore})</span>
              )}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}