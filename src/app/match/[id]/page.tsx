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
      { num: 14, name: "Eder Militao", pos: "CB" },
      { num: 17, name: "Bruno Guimaraes", pos: "CB" },
      { num: 21, name: "Gabriel Martinelli", pos: "CB" },
      { num: 9, name: "Richarlison", pos: "ST" },
    ],
    subs: [
      { num: 1, name: "Alisson", pos: "(GK)" },
      { num: 22, name: "Antony", pos: "(LW)" },
      { num: 10, name: "Neymar Jr", pos: "(ST)" },
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
      return "from-[#1E153A] via-[#EC577D] to-[#FFA400]"; 
    } else if (status === "upcoming") {
      return "from-[#0A2E5C] via-[#2D7F7D] to-[#7FB881]"; 
    } else if (status === "finished") {
      return "from-[#0802A3] via-[#83279A] to-[#FF4B91]"; 
    }
    return "from-[#0A2E5C] via-[#2D7F7D] to-[#7FB881]";
  };

  return (
    <div className="relative w-full h-full overflow-x-hidden no-scrollbar pt-2 px-20">
      <div 
        className={`fixed inset-0 z-[-1] bg-gradient-to-br ${getBgGradient(match.status)} transition-colors duration-1000`} 
      />
      
      {/* TOP NAVIGATION & TABS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <Link href="/" className="flex items-center text-white/80 hover:text-white transition group">
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform text-[#F5F2FF]" />
          <span>Back</span>
        </Link>

        {/* Tab Navigation */}
        <div className="flex gap-8 border-b border-white/20">
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
        <div className="bg-[#201F1F] backdrop-blur-md border border-white/10 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
             <h3 className="text-2xl font-bold text-white mb-2">Match Statistics</h3>
             <p className="text-gray-400">Data visualization will be built here.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_640px_1fr] gap-6 w-full">
          
          {/* Home Team */}
          <div className="bg-white/12 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col h-full">
            <h3 className="font-bold mb-6 text-lg tracking-wide flex w-full justify-between items-center">
              <span className="text-[#39ff14] text-[24px] uppercase">{match.homeTeam.name} {activeTab === "lineup" ? "Lineup" : "Subs"}</span>
              <span>{match.homeTeam.coach} </span>
            </h3>
            <div className="flex-1 space-y-4">
              {(activeTab === "lineup" ? match.homeTeam.lineup : match.homeTeam.subs).map((player, idx) => (
                <div key={idx} className="flex justify-between items-center w-full text-[18px]">
                  <div className="flex items-center gap-4"> 
                    <span className="text-[#73204C] font-bold w-6">{player.num}</span>
                    <span className="text-[#F5F2FF] font-medium">{player.name}</span>
                  </div> 
                  <span className="text-[#73204C] font-bold tracking-wider">{player.pos}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tactical Setup Pitch*/}
          <div className="bg-white/12 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center h-full">
            <h3 className="text-[#39ff14] font-bold mb-6 text-lg w-full text-left">TACTICAL SETUP</h3>
            
            <div className="relative w-full aspect-[4/3] border-2 border-white/20 rounded-sm bg-[#538059] overflow-hidden shadow-inner">
              <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/20 -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/4 bottom-1/4 left-0 w-1/6 border-2 border-l-0 border-white/20"></div>
              <div className="absolute top-1/4 bottom-1/4 right-0 w-1/6 border-2 border-r-0 border-white/20"></div>
              
              <div className="absolute top-1/2 left-4 w-6 h-6 bg-[#73204C] border-2 border-[#AB47BC] rounded-full flex justify-center items-center text-[10px] text-white -translate-y-1/2 shadow-lg">1</div>
              <div className="absolute top-1/2 right-4 w-6 h-6 bg-white border-2 border-gray-400 rounded-full flex justify-center items-center text-[10px] text-black -translate-y-1/2 shadow-lg">1</div>
              <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-[#73204C] border-2 border-[#AB47BC] rounded-full flex justify-center items-center text-[10px] text-white -translate-y-1/2 -translate-x-6 shadow-lg">9</div>
            </div>
          </div>

          {/* Away Team */}
          <div className="bg-white/12 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col h-full">
            <h3 className="font-bold mb-6 text-lg tracking-wide flex w-full justify-between items-center">
              <span className="text-[#39ff14] text-[24px] uppercase">{match.awayTeam.name} {activeTab === "lineup" ? "Lineup" : "Subs"}</span>
              <span>{match.awayTeam.coach} </span>
            </h3>
            <div className="flex-1 space-y-4">
              {(activeTab === "lineup" ? match.awayTeam.lineup : match.awayTeam.subs).map((player, idx) => (
                <div key={idx} className="flex justify-between items-center w-full text-[18px]">
                  <div className="flex items-center gap-4"> 
                    <span className="text-[#73204C] font-bold w-6">{player.num}</span>
                    <span className="text-[#F5F2FF] font-medium">{player.name}</span>
                  </div> 
                  <span className="text-[#73204C] font-bold tracking-wider">{player.pos}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}