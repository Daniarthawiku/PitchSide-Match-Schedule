import { TransformedMatchData } from "@/hooks/useFetchMatch";

interface MatchStatsTabProps {
    match: TransformedMatchData;
}

export function MatchStatsTab({ match }: MatchStatsTabProps) {
    const getBarWidth = (homeVal: string | number, awayVal: string | number, isHome: boolean) => {
    const h = parseInt(String(homeVal).replace('%', '')) || 0;
    const a = parseInt(String(awayVal).replace('%', '')) || 0;
    const total = h + a;
    if (total === 0) return "0%";
    return isHome ? `${(h / total) * 100}%` : `${(a / total) * 100}%`;
    };

    const matchStats = match.stats || [];

    if (matchStats.length === 0) {
    return (
        <div className="w-full p-10 text-center border border-dashed border-white/20 rounded-2xl text-white/60 bg-white/5">
        Statistik pertandingan belum tersedia.
        </div>
    );
    }

    return (
    <div className="w-full max-w-4xl mx-auto bg-white/12 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col gap-6">
        <h3 className="text-[24px] font-bold text-[#39ff14] uppercase text-center tracking-widest mb-4">Team Statistics</h3>
        {matchStats.map((stat, idx) => (
        <div key={idx} className="flex flex-col w-full gap-2">
            <div className="flex justify-between items-center w-full px-2">
                <span className="text-white font-bold text-lg w-12 text-left">{stat.home}</span>
                <span className="text-white/60 text-sm font-medium uppercase tracking-widest text-center flex-1">{stat.type}</span>
                <span className="text-white font-bold text-lg w-12 text-right">{stat.away}</span>
            </div>
            <div className="flex justify-center items-center w-full gap-1 h-2">
                <div className="w-1/2 h-full bg-black/40 rounded-l-full flex justify-end overflow-hidden">
                    <div className="h-full bg-[#39ff14] rounded-l-full transition-all duration-1000 ease-out" 
                    style={{ width: getBarWidth(stat.home, stat.away, true) }}>    
                    </div>
                </div>
            <div className="w-1/2 h-full bg-black/40 rounded-r-full flex justify-start overflow-hidden">
                <div className="h-full bg-[#EB177D] rounded-r-full transition-all duration-1000 ease-out" 
                style={{ width: getBarWidth(stat.home, stat.away, false) }}>
                </div>
            </div>
          </div>
        </div>
        ))}
    </div>
    );
}