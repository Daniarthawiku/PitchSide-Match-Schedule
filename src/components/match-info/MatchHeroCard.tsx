import Image from "next/image";
import { TransformedMatchData } from "@/hooks/useFetchMatch";

interface MatchHeroCardProps {
    match: TransformedMatchData;
}

export function MatchHeroCard({ match }: MatchHeroCardProps) {
    return (
        <div className="bg-white/12 backdrop-blur-sm border border-white/10 rounded-xl md:p-10 mb-6">
            <div className="flex justify-center items-center gap-3 mb-6">
            {match.status === "live" && (
                <span className="bg-[#39ff14] text-xs font-bold px-3 py-1 rounded-full 
                animate-pulse shadow-[0_0_15px_rgba(57,255,20,0.5)]">
                LIVE - {match.minute}
                </span>
                )}
                <span className="text-[#F5F2FF] text-sm">{match.round}</span>
            </div>
        
            <div className="flex w-full justify-between items-center max-w-2xl mx-auto pb-2">
                {/* home */}
                <div className="flex flex-col items-center gap-3 w-1/3">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 border border-white/20 
                    relative overflow-hidden flex items-center justify-center p-4">
                        <Image src={match.homeTeam.flagUrl} alt={match.homeTeam.name} fill className="object-cover scale-150" />
                    </div>
                    <span className="font-bold text-[#F5F2FF] text-lg tracking-widest uppercase text-center">{match.homeTeam.name}</span>
                </div>
        
                {/* score */}
                <div className="text-[28px] md:text-5xl font-bold text-[#39ff14] tracking-tighter w-1/3 text-center">
                    {match.status === "upcoming" ? "- : -" : `${match.homeTeam.score} - ${match.awayTeam.score}`}
                </div>
        
                {/* away */}
                <div className="flex flex-col items-center gap-3 w-1/3">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 border border-white/20 
                    relative overflow-hidden flex items-center justify-center p-4">
                        <Image src={match.awayTeam.flagUrl} alt={match.awayTeam.name} fill className="object-cover scale-150" />
                    </div>
                    <span className="font-bold text-[#F5F2FF] text-lg tracking-widest uppercase text-center">{match.awayTeam.name}</span>
                </div>
            </div>
        
            {/* list goal*/}
            <div className="flex w-full justify-between items-center max-w-2xl mx-auto">
                {/* home list goal*/}
                <div className="flex flex-row items-right gap-1 mt-1 flex-wrap w-[200px]">
                    {match.homeTeam.scorers?.map((goal, idx) => (
                    <span key={idx} className="text-[#F5F2FF]/80 text-[12px] font-medium tracking-wider flex items-center gap-1">
                        {goal.playerName} {goal.elapsed}'{goal.extra ? `+${goal.extra}` : ""}
                        {goal.detail === "Penalty" && <span className="text-[#FF2400] text-[10px]">(P)</span>}
                        {goal.detail === "Own Goal" && <span className="text-[#880808] text-[10px]">(OG)</span>}
                    </span>
                    ))}
                </div>
                <div className="invisible"></div>
                {/* away list goal*/}
                <div className="flex flex-row items-left gap-1 mt-1 flex-wrap w-[200px]">
                    {match.awayTeam.scorers?.map((goal, idx) => (
                    <span key={idx} className="text-[#F5F2FF]/80 text-[12px] font-medium tracking-wider flex items-center gap-1">
                            {goal.playerName} {goal.elapsed}'{goal.extra ? `+${goal.extra}` : ""}
                            {goal.detail === "Penalty" && <span className="text-[#FF2400] text-[10px]">(P)</span>}
                            {goal.detail === "Own Goal" && <span className="text-[#880808] text-[10px]">(OG)</span>}
                        </span>
                    ))}
                </div>  
            </div>
        </div>
    );
}