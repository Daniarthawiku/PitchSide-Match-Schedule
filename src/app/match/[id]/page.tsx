"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

const MOCK_MATCH_DETAIL = {
  id: "1", 
  time: "14:00",
  round: "Round 16 - Matchday 2",
  stadium: "Luzhniki Stadium",
  status: "live",
  minute: "76'",
  homeTeam: { 
    name: "BRAZIL", 
    flagUrl: "https://flagcdn.com/w40/br.png", 
    score: 2,
    coach: "Carlo Ancelotti",
    lineup: [
      { num: 12, name: "Ederson", pos: "(GK)" },
      { num: 14, name: "Eder Militao", pos: "" },
      { num: 17, name: "Bruno Guimaraes", pos: "" },
      { num: 21, name: "Gabriel Martinelli", pos: "" },
      { num: 9, name: "Richarlison", pos: "" },
    ],
    subs: [
      { num: 1, name: "Alisson", pos: "(GK)" },
      { num: 22, name: "Antony", pos: "" },
      { num: 10, name: "Neymar Jr", pos: "" },
    ]
  },
  awayTeam: { 
    name: "GERMANY", 
    flagUrl: "https://flagcdn.com/w40/de.png", 
    score: 1,
    coach: "Julian Nagelsmann",
    lineup: [
      { num: 1, name: "Manuel Neuer", pos: "(GK)" },
      { num: 2, name: "Antonio Rudiger", pos: "" },
      { num: 6, name: "Joshua Kimmich", pos: "" },
      { num: 8, name: "Toni Kroos", pos: "" },
      { num: 10, name: "Jamal Musiala", pos: "" },
    ],
    subs: [
      { num: 22, name: "Ter Stegen", pos: "(GK)" },
      { num: 11, name: "Marco Reus", pos: "" },
      { num: 9, name: "Niclas Fullkrug", pos: "" },
    ]
  },
};

type TabType = "lineup" | "substitutes" | "stats";

export default function MatchInfo({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<TabType>("substitutes"); 
  const match = MOCK_MATCH_DETAIL;

  const getBgGradient = (status: string) => {
    if (status === "live") {
      return "from-[#73204C] via-[#C75D52] to-[#E5B250]"; 
    } else if (status === "upcoming") {
      return "from-[#0A2E5C] via-[#2D7F7D] to-[#7FB881]"; 
    } else if (status === "finished") {
      return "from-[#0802A3] via-[#83279A] to-[#FF4B91]"; 
    }
    return "from-[#0A2E5C] via-[#2D7F7D] to-[#7FB881]"; // Fallback
  };

  return (
    <div className="relative w-full h-full overflow-x-hidden no-scrollbar pb-10">
      <div 
        className={`fixed inset-0 z-[-1] bg-gradient-to-br ${getBgGradient(match.status)} transition-colors duration-1000`} 
      />
      
      {/* --- TOP NAVIGATION & TABS --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <Link href="/" className="flex items-center text-white/80 hover:text-white transition group">
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform text-[#F5F2FF]" />
          <span>Back</span>
        </Link>

        {/* Tab Navigation */}
        <div className="flex gap-6 border-b border-white/20">
          {(["lineup", "substitutes", "stats"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize pb-2 text-[15px] font-medium transition relative ${
                activeTab === tab ? "text-[#39ff14]" : "text-[#F5F2FF]/60 hover:text-[#F5F2FF]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#39ff14] shadow-[0_0_10px_#39ff14]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* --- HERO MATCH SCORE CARD --- */}
      <div className="bg-[#201F1F] backdrop-blur-md border border-white/10 rounded-2xl 
      p-6 md:p-10 mb-4 flex flex-col items-center shadow-xl">
        <div className="flex justify-center items-center gap-3 mb-6">
          {match.status === "live" && (
            <span className="bg-[#39ff14] text-black text-xs font-bold px-3 py-1 rounded-full 
            animate-pulse shadow-[0_0_15px_rgba(57,255,20,0.5)]">
              LIVE - {match.minute}
            </span>
          )}
          <span className="text-[#F5F2FF]/60 text-sm">{match.round}</span>
        </div>

        <div className="flex w-full justify-between items-center max-w-2xl mx-auto">
          {/* Home */}
          <div className="flex flex-col items-center gap-3 w-1/3">
             <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 border border-white/20 
             relative overflow-hidden flex items-center justify-center p-4">
               <Image src={match.homeTeam.flagUrl} alt={match.homeTeam.name} fill className="object-cover scale-150" />
             </div>
             <span className="font-bold text-[#F5F2FF] text-lg tracking-widest uppercase text-center">{match.homeTeam.name}</span>
          </div>

          {/* Score */}
          <div className="text-4xl md:text-5xl font-black text-[#39ff14] tracking-tighter w-1/3 text-center">
            {match.status === "upcoming" ? "- : -" : `${match.homeTeam.score} - ${match.awayTeam.score}`}
          </div>

          {/* Away */}
          <div className="flex flex-col items-center gap-3 w-1/3">
             <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 border border-white/20 
             relative overflow-hidden flex items-center justify-center p-4">
               <Image src={match.awayTeam.flagUrl} alt={match.awayTeam.name} fill className="object-cover scale-150" />
             </div>
             <span className="font-bold text-[#F5F2FF] text-lg tracking-widest uppercase text-center">{match.awayTeam.name}</span>
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      {activeTab === "stats" ? (
        <div className="bg-[#201F1F] backdrop-blur-md border border-white/10 rounded-2xl 
        p-8 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
             <h3 className="text-2xl font-bold text-white mb-2">Match Statistics</h3>
             <p className="text-gray-400">Data visualization will be built here.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column (Home Team List) */}
          <div className="lg:col-span-1 bg-[#201F1F] rounded-2xl p-6 flex flex-col">
            <h3 className="text-[#39ff14] font-bold mb-6 text-lg uppercase tracking-wide">
              {match.homeTeam.name} {activeTab === "lineup" ? "Lineup" : "Subs"}
            </h3>
            <div className="flex-1 space-y-3">
              {(activeTab === "lineup" ? match.homeTeam.lineup : match.homeTeam.subs).map((player, idx) => (
                <div key={idx} className="flex gap-3 text-sm">
                  <span className="text-gray-400 font-mono w-5">{player.num}</span>
                  <span className="text-gray-200">{player.name} {player.pos}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Column (Tactical Setup Pitch) */}
          <div className="lg:col-span-2 bg-[#201F1F] rounded-2xl p-6 flex flex-col items-center">
            <h3 className="text-[#39ff14] font-bold mb-6 text-lg w-full text-left">Tactical Setup</h3>
            <div className="relative w-full max-w-[500px] aspect-[4/3] border-2 border-white/20 rounded-sm">
              <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/20 -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/20 rounded-full 
              -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/4 bottom-1/4 left-0 w-1/6 border-2 border-l-0 border-white/20"></div>
              <div className="absolute top-1/4 bottom-1/4 right-0 w-1/6 border-2 border-r-0 border-white/20"></div>
              
              <div className="absolute top-1/2 left-4 w-6 h-6 bg-[#73204C] border-2 border-purple-400 
              rounded-full flex justify-center items-center text-[10px] text-white -translate-y-1/2 shadow-lg">1</div>
              <div className="absolute top-1/2 right-4 w-6 h-6 bg-white border-2 border-gray-400
               rounded-full flex justify-center items-center text-[10px] text-black -translate-y-1/2 shadow-lg">1</div>
              <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-[#73204C] border-2 border-purple-400
               rounded-full flex justify-center items-center text-[10px] text-white -translate-y-1/2
                -translate-x-6 shadow-lg">9</div>
            </div>
          </div>

          {/* Right Column (Away Team List) */}
          <div className="lg:col-span-1 bg-[#201F1F] rounded-2xl p-6 flex flex-col">
            <h3 className="text-[#39ff14] font-bold mb-6 text-lg uppercase tracking-wide">
              {match.awayTeam.name} {activeTab === "lineup" ? "Lineup" : "Subs"}
            </h3>
            <div className="flex-1 space-y-3">
              {(activeTab === "lineup" ? match.awayTeam.lineup : match.awayTeam.subs).map((player, idx) => (
                <div key={idx} className="flex gap-3 text-sm">
                  <span className="text-gray-400 font-mono w-5">{player.num}</span>
                  <span className="text-gray-200">{player.name} {player.pos}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}