import { TeamBadge } from "../atoms/TeamBadge";

interface MatchCardProps {
  time: string;
  round: string;
  stadium: string;
  homeTeam: { name: string; flagUrl: string; score?: number };
  awayTeam: { name: string; flagUrl: string; score?: number };
}

export function MatchCard({ time, round, stadium, homeTeam, awayTeam }: MatchCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition duration-300">
      <div className="flex justify-between items-center text-xs text-gray-400 mb-4 pb-2 border-b border-white/10">
        <span>{time} WIB</span>
        <span>{round}</span>
        <span>{stadium}</span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <TeamBadge name={homeTeam.name} flagUrl={homeTeam.flagUrl} />
          <span className="font-bold text-lg">{homeTeam.score ?? '-'}</span>
        </div>
        <div className="flex justify-between items-center">
          <TeamBadge name={awayTeam.name} flagUrl={awayTeam.flagUrl} />
          <span className="font-bold text-lg">{awayTeam.score ?? '-'}</span>
        </div>
      </div>
    </div>
  );
}