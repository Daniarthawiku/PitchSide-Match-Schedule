"use client";

import Link from "next/link";
import Image from "next/image";

// --- INTERFACE & DUMMY DATA ---
interface Team {
  code: string;
  flagUrl: string;
  score: number | null;
}

interface KnockoutMatch {
  id: string;
  home: Team;
  away: Team;
  status: "finished" | "upcoming" | "live";
}

const generateDummyMatch = (id: string, homeCode: string, awayCode: string, status: "finished" | "upcoming" = "upcoming"): KnockoutMatch => ({
  id,
  status,
  home: { code: homeCode, flagUrl: `https://flagcdn.com/w40/${homeCode.toLowerCase()}.png`, score: status === "finished" ? Math.floor(Math.random() * 3) : null },
  away: { code: awayCode, flagUrl: `https://flagcdn.com/w40/${awayCode.toLowerCase()}.png`, score: status === "finished" ? Math.floor(Math.random() * 3) : null },
});

// match node
const MatchNode = ({ match }: { match: KnockoutMatch }) => {
  return (
    <Link href={`/match/${match.id}`} className="block relative group z-10 w-40 md:w-48">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex flex-col gap-2 transition-all duration-300 cursor-pointer group-hover:bg-white/10 group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:scale-[1.02]">
        
        {/* Home Team */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden relative border border-white/20">
              <Image src={match.home.flagUrl} alt={match.home.code} fill className="object-cover" />
            </div>
            <span className="text-sm font-bold text-white uppercase">{match.home.code}</span>
          </div>
          <span className="text-sm font-bold text-white">{match.status === "upcoming" ? "-" : match.home.score}</span>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-white/10"></div>

        {/* Away Team */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden relative border border-white/20">
              <Image src={match.away.flagUrl} alt={match.away.code} fill className="object-cover" />
            </div>
            <span className="text-sm font-bold text-white uppercase">{match.away.code}</span>
          </div>
          <span className="text-sm font-bold text-white">{match.status === "upcoming" ? "-" : match.away.score}</span>
        </div>
      </div>
    </Link>
  );
};

export default function MatchesPage() {
    return (
    <div className="w-full h-full flex flex-col pl-10">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-[#F5F2FF] tracking-wider uppercase">Knockout Stage</h1>
        <p className="text-[#F5F2FF]/60">Road to the World Cup Final 2026</p>
      </div>
      {/* Container Bracket dengan Horizontal Scroll */}
      <div className="w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
        {/* Flex container utama untuk menyusun kolom bracket */}
        <div className="flex flex-row justify-between items-center min-w-max gap-8 lg:gap-12">

          {/* LEFT BRACKET */}
          {/* Round of 32 */}
          <div className="flex flex-col gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
               <MatchNode key={`l32-${i}`} match={generateDummyMatch(`L32-${i}`, "br", "ch", "finished")} />
            ))}
          </div>

          {/* Round of 16 */}
          <div className="flex flex-col gap-[4.5rem]">
            {Array.from({ length: 4 }).map((_, i) => (
               <MatchNode key={`l16-${i}`} match={generateDummyMatch(`L16-${i}`, "br", "uy", "finished")} />
            ))}
          </div>

          {/* Quarter Final */}
          <div className="flex flex-col gap-[12.5rem]">
            {Array.from({ length: 2 }).map((_, i) => (
               <MatchNode key={`lqf-${i}`} match={generateDummyMatch(`LQF-${i}`, "br", "hr")} />
            ))}
          </div>

          {/* Semi Final */}
          <div className="flex flex-col">
            <MatchNode match={generateDummyMatch(`LSF-1`, "br", "ar")} />
          </div>


          {/* FINAL */}
          <div className="flex flex-col items-center mx-4">
            <div className="mb-6 animate-bounce">
              <div className="w-16 h-20 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-t-lg rounded-b-3xl shadow-[0_0_30px_rgba(253,224,71,0.4)] flex items-center justify-center border-2 border-yellow-200">
                🏆
              </div>
            </div>
            <div className="relative p-1 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 rounded-xl shadow-[0_0_20px_rgba(252,211,77,0.5)]">
               <MatchNode match={generateDummyMatch(`FINAL`, "br", "fr")} />
            </div>
            <span className="mt-4 font-black tracking-widest text-yellow-400 uppercase drop-shadow-md">Final</span>
          </div>


          {/* RIGHT BRACKET */}
          {/* Semi Final */}
          <div className="flex flex-col">
            <MatchNode match={generateDummyMatch(`RSF-1`, "fr", "en")} />
          </div>

          {/* Quarter Final */}
          <div className="flex flex-col gap-[12.5rem]">
            {Array.from({ length: 2 }).map((_, i) => (
               <MatchNode key={`rqf-${i}`} match={generateDummyMatch(`RQF-${i}`, "fr", "pt")} />
            ))}
          </div>

          {/* Round of 16 */}
          <div className="flex flex-col gap-[4.5rem]">
            {Array.from({ length: 4 }).map((_, i) => (
               <MatchNode key={`r16-${i}`} match={generateDummyMatch(`R16-${i}`, "fr", "es", "finished")} />
            ))}
          </div>

          {/* Round of 32 */}
          <div className="flex flex-col gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
               <MatchNode key={`r32-${i}`} match={generateDummyMatch(`R32-${i}`, "fr", "it", "finished")} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}