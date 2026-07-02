export function LiveMatchHero() {
  return (
    <div className="relative w-full rounded-4xl overflow-hidden bg-gradient-to-r from-[#73204C] via-[#C75D52] to-[#E5B250] 
    p-6 md:p-8 mb-8 shadow-2xl">
      <div className="flex justify-between items-center mb-24">
        <div className="bg-green-500 animate-pulse text-white text-[24px] font-bold px-8 py-2 rounded-2xl ">
          • LIVE 75'
        </div>
        <div className="text-white text-[24px] px-4">Round 16</div>
      </div>

      <div className="flex justify-between items-center px-18 mb-24">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-[120px] h-[120px] rounded-full bg-black/20 border-2 
          flex items-center justify-center">
             🇧🇷 {/* Placeholder bendera */}
          </div>
          <span className="font-bold text-[60px] tracking-widest">BRA</span>
        </div>

        {/* Score */}
        <div className="text-[120px] font-black text-[#79FF5B] tracking-tighter">
          2 - 1
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-[120px] h-[120px] rounded-full bg-black/20 border-2 
          flex items-center justify-center">
            🇩🇪 {/* Placeholder bendera */}
          </div>
          <span className="font-bold text-[60px] tracking-widest">GER</span>
        </div>
      </div>

      {/* Possession Bar */}
      <div className="mt-8 mb-2">
        <div className="flex justify-between text-[24px] mb-4 px-2">
          <span>58%</span>
          <span>Possession</span>
          <span>42%</span>
        </div>
        <div className="w-full h-1.5 bg-white rounded-full overflow-hidden flex">
          <div className="h-full bg-blue-300 w-[58%]"></div>
          <div className="h-full bg-orange-300 w-[42%]"></div>
        </div>
      </div>
    </div>
  );
}