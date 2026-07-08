import Link from "next/link";
// Jika Anda belum punya file ini, pastikan import Image ini ada jika nanti Anda menambahkan bendera
// import Image from "next/image";

// Tambahkan interface props agar bisa menerima ID
interface LiveMatchHeroProps {
  matchId?: string;
}

export function LiveMatchHero({ matchId = "1" }: LiveMatchHeroProps) {
  return (
    // Bungkus hero component dengan Link
    <Link href={`/match/${matchId}`} className="block w-full group">
      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-rose-700 via-orange-600 to-amber-500 p-6 md:p-8 mb-8 shadow-2xl cursor-pointer transition-transform duration-300 group-hover:scale-[1.01] group-hover:shadow-[0_10px_30px_rgba(225,29,72,0.3)]">
        
        <div className="flex justify-between items-center mb-6">
          <div className="bg-[#39ff14] animate-pulse text-black text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(57,255,20,0.5)]">
            • LIVE 76'
          </div>
          <div className="text-white/80 text-sm font-medium">Round 16 - Matchday 2</div>
        </div>

        <div className="flex justify-between items-center px-4 md:px-12">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-black/40 border-2 border-white/50 flex items-center justify-center text-2xl shadow-inner">
               🇧🇷 {/* Ganti dengan komponen Image nanti jika diperlukan */}
            </div>
            <span className="font-bold text-white tracking-widest text-lg md:text-xl">BRA</span>
          </div>

          {/* Score */}
          <div className="text-5xl md:text-7xl font-black text-[#39ff14] tracking-tighter drop-shadow-md">
            2 - 1
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-black/40 border-2 border-white/50 flex items-center justify-center text-2xl shadow-inner">
              🇩🇪
            </div>
            <span className="font-bold text-white tracking-widest text-lg md:text-xl">GER</span>
          </div>
        </div>

        {/* Possession Bar */}
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
        
      </div>
    </Link>
  );
}