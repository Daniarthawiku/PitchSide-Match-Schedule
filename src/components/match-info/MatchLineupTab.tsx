import { TransformedMatchData } from "@/hooks/useFetchMatch";

interface MatchLineupTabProps {
    match: TransformedMatchData;
    activeTab: "lineup" | "substitutes";
}

export function MatchLineupTab({ match, activeTab }: MatchLineupTabProps) {
    return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_640px_1fr] gap-6 w-full">
        {/* home team */}
        <div className="bg-[#FFFFFF]/12 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col h-full">
            <h3 className="mb-4 flex w-full justify-between items-center">
                <span className="text-[#FFA400] font-bold text-[24px] uppercase">{match.homeTeam.name} 
                {activeTab === "lineup" ? " Lineup" : " Subs"}</span>
                <span className="font-medium text-[16px] text-right text-white/80">{match.homeTeam.coach}</span>
            </h3>
            <div className="flex-1 space-y-4">
            {(activeTab === "lineup" ? match.homeTeam.lineup : match.homeTeam.subs).map((player, idx) => (
                <div key={idx} className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-6"> 
                        <span className="text-[#F5F2FF] font-bold w-6">{player.num}</span>
                        <span className="text-[#F5F2FF] font-medium">{player.name}</span>
                    </div> 
                <span className="text-[#FFA400] text-[14px] font-bold tracking-wider">{player.pos}</span>
                </div>
            ))}
            </div>
        </div>

        {/* tactical setup pitch */}
        <div className="bg-white/12 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center h-full">
            <h3 className="text-[#39ff14] font-bold text-[28px] uppercase mb-4 w-full text-left">TACTICAL SETUP</h3>
            <div className="relative w-full aspect-[4/3] border-2 border-white/20 rounded-sm bg-[#538059] overflow-hidden shadow-inner">
                <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/20 -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/4 bottom-1/4 left-0 w-1/6 border-2 border-l-0 border-white/20"></div>
                <div className="absolute top-1/4 bottom-1/4 right-0 w-1/6 border-2 border-r-0 border-white/20"></div>
                    
                {/* home grid */}
                {match.homeTeam.lineup.map((player, idx, arr) => {
                if (!player.grid) return null;
                const [row, col] = player.grid.split(':').map(Number);
                const countInRow = arr.filter(p => p.grid && p.grid.startsWith(`${row}:`)).length;
                const leftPos = `${row * 15}%`; 
                const topPos = `${(col / (countInRow + 1)) * 100}%`; 
                    return (
                    <div key={`home-${idx}`} className="absolute w-7 h-7 bg-[#FFA400] border-2 border-[#595059] rounded-full flex justify-center 
                    items-center text-[12px] text-black font-bold shadow-lg transform -translate-x-1/2 -translate-y-1/2 cursor-pointer 
                    transition-transform hover:scale-125 z-10 group" style={{ left: leftPos, top: topPos }}>
                    {player.num}
                        <div className="absolute bottom-full mb-1 hidden group-hover:block w-max max-w-[120px] text-center bg-black/90 text-white 
                        text-[10px] px-2 py-1 rounded border border-white/20 z-20">{player.name}</div>
                    </div>
                    );
                })}

                {/* away grid */}
                {match.awayTeam.lineup.map((player, idx, arr) => {
                if (!player.grid) return null;
                const [row, col] = player.grid.split(':').map(Number);
                const countInRow = arr.filter(p => p.grid && p.grid.startsWith(`${row}:`)).length;
                const rightPos = `${row * 15}%`; 
                const topPos = `${(col / (countInRow + 1)) * 100}%`;
                    return (
                    <div key={`away-${idx}`} className="absolute w-7 h-7 bg-[#EB177D] border-2 border-[#595059] rounded-full flex justify-center 
                    items-center text-[12px] text-white font-bold shadow-lg transform translate-x-1/2 -translate-y-1/2 cursor-pointer 
                    transition-transform hover:scale-125 z-10 group" style={{ right: rightPos, top: topPos }}>
                    {player.num}
                    <div className="absolute bottom-full mb-1 hidden group-hover:block w-max max-w-[120px] text-center bg-black/90
                    text-white text-[10px] px-2 py-1 rounded border border-white/20 z-20">{player.name}</div>
                </div>
                );
                })}
            </div>
        </div>

        {/* away team list */}
        <div className="bg-[#FFFFFF]/12 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col h-full">
            <h3 className="mb-4 flex w-full justify-between items-center">
                <span className="text-[#EB177D] font-bold text-[24px] uppercase">{match.awayTeam.name} 
                {activeTab === "lineup" ? " Lineup" : " Subs"}</span>
                <span className="font-medium text-[16px] text-right text-white/80">{match.awayTeam.coach}</span>
            </h3>
            <div className="flex-1 space-y-4">
                {(activeTab === "lineup" ? match.awayTeam.lineup : match.awayTeam.subs).map((player, idx) => (
                <div key={idx} className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-6"> 
                        <span className="text-[#F5F2FF] font-bold w-6">{player.num}</span>
                        <span className="text-[#F5F2FF] font-medium">{player.name}</span>
                    </div> 
                    <span className="text-[#EB177D] text-[14px] font-bold tracking-wider">{player.pos}</span>
                </div>
                ))}
            </div>
        </div>
    </div>
    );
}