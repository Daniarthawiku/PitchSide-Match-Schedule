"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useFetchMatch } from "@/hooks/useFetchMatch";

type TabType = "lineup" | "substitutes" | "stats";

export default function MatchInfo({ params }: { params: Promise<{ id: string }>}) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<TabType>("lineup"); 
  const { data: match, isLoading, error } = useFetchMatch(id);

  if (isLoading) {
    return <div className="w-full h-screen flex items-center justify-center text-[#39ff14]">Load Match Data...</div>;
  }
  // if (error || !match) {
  //   return <div className="w-full h-screen flex items-center justify-center text-red-500">{error || "Match Data Not Foud"}</div>;
  // }

  const getBarWidth = (homeVal: string | number, awayVal: string | number, isHome: boolean) => {
    const h = parseInt(String(homeVal).replace('%', '')) || 0;
    const a = parseInt(String(awayVal).replace('%', '')) || 0;
    const total = h + a;
    if (total === 0) return "0%"; 
    return isHome ? `${(h / total) * 100}%` : `${(a / total) * 100}%`;
  };

  const matchStats = match.stats || [
    { type: "Ball Possession", home: "58%", away: "42%" },
    { type: "Total Shots", home: 14, away: 9 },
    { type: "Shots on Goal", home: 6, away: 3 },
    { type: "Corner Kicks", home: 7, away: 4 },
    { type: "Fouls", home: 11, away: 15 },
    { type: "Yellow Cards", home: 2, away: 4 },
    { type: "Red Cards", home: 0, away: 0 },
    { type: "Total passes", home: 542, away: 390 },
    { type: "Passes accurate", home: 480, away: 310 }
  ];
  
  return (
    <div className="relative w-full h-full overflow-x-hidden no-scrollbar pt-2 px-20">
      <div 
        className={`fixed inset-0 z-[-1] bg-from-[#0802A3] via-[#83279A] to-[#FF4B91] transition-colors duration-1000`} 
      />
      
      {/* TOP NAVIGATION & TABS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <Link href="/" className="flex items-center text-white/80 hover:text-white transition group">
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform text-[#F5F2FF]" />
          <span>Back</span>
        </Link>

        {/* tab navigation */}
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

      {/* HERO MATCH SCORE CARD */}
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
      </div>

      {/* CONTENT AREA */}
      {activeTab === "stats" ? (
        <div className="w-full max-w-4xl mx-auto bg-white/12 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col gap-6">
          <h3 className="text-[24px] font-bold text-[#39ff14] uppercase text-center tracking-widest mb-4">Team Statistics</h3>
          
          {matchStats.map((stat, idx) => (
            <div key={idx} className="flex flex-col w-full gap-2">
              {/* labels (home Val | stat Name | away Val) */}
              <div className="flex justify-between items-center w-full px-2">
                <span className="text-white font-bold text-lg w-12 text-left">{stat.home}</span>
                <span className="text-white/60 text-sm font-medium uppercase tracking-widest text-center flex-1">{stat.type}</span>
                <span className="text-white font-bold text-lg w-12 text-right">{stat.away}</span>
              </div>
              
              {/* comparative progress bar */}
              <div className="flex justify-center items-center w-full gap-1 h-2">
                {/* home bar */}
                <div className="w-1/2 h-full bg-black/40 rounded-l-full flex justify-end overflow-hidden">
                  <div 
                    className="h-full bg-[#39ff14] rounded-l-full transition-all duration-1000 ease-out" 
                    style={{ width: getBarWidth(stat.home, stat.away, true) }}
                  ></div>
                </div>
                {/* away bar */}
                <div className="w-1/2 h-full bg-black/40 rounded-r-full flex justify-start overflow-hidden">
                  <div 
                    className="h-full bg-[#EC577D] rounded-r-full transition-all duration-1000 ease-out" 
                    style={{ width: getBarWidth(stat.home, stat.away, false) }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_640px_1fr] gap-6 w-full">
          
          {/* home team */}
          <div className="bg-white/12 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col h-full">
            <h3 className="mb-4 flex w-full justify-between items-center">
              <span className="text-[#39ff14] font-bold text-[28px] uppercase">{match.homeTeam.name} {activeTab === "lineup" ? "Lineup" : "Subs"}</span>
              <span className="font-medium text-[16px] text-right">{match.homeTeam.coach} </span>
            </h3>
            <div className="flex-1 space-y-4">
              {(activeTab === "lineup" ? match.homeTeam.lineup : match.homeTeam.subs).map((player, idx) => (
                <div key={idx} className="flex justify-between items-center w-full ">
                  <div className="flex items-center gap-6"> 
                    <span className="text-[#F5F2FF] font-bold w-6">{player.num}</span>
                    <span className="text-[#F5F2FF] font-medium">{player.name}</span>
                  </div> 
                  <span className="text-[#39ff14] font-bold tracking-wider">{player.pos}</span>
                </div>
              ))}
            </div>
          </div>

          {/* tactical setup pitch*/}
          <div className="bg-white/12 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center h-full">
            <h3 className="text-[#39ff14] font-bold text-[28px] uppercase mb-4 w-full text-left">TACTICAL SETUP</h3>
            
            <div className="relative w-full aspect-[4/3] border-2 border-white/20 rounded-sm bg-[#538059] overflow-hidden shadow-inner">
              {/* pitch */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/20 -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/4 bottom-1/4 left-0 w-1/6 border-2 border-l-0 border-white/20"></div>
              <div className="absolute top-1/4 bottom-1/4 right-0 w-1/6 border-2 border-r-0 border-white/20"></div>
              
              {/* home side */}
              {match.homeTeam.lineup.map((player, idx, arr) => {
                if (!player.grid) return null;
                const [row, col] = player.grid.split(':').map(Number);                
                const countInRow = arr.filter(p => p.grid && p.grid.startsWith(`${row}:`)).length;
                const leftPos = `${row * 15}%`; 
                const topPos = `${(col / (countInRow + 1)) * 100}%`; 

                return (
                  <div 
                    key={`home-${idx}`} 
                    className="absolute w-7 h-7 bg-[#39ff14] border-2 border-green-800 rounded-full flex justify-center items-center text-[11px] text-black font-bold shadow-[0_4px_10px_rgba(0,0,0,0.3)] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125 z-10 group"
                    style={{ left: leftPos, top: topPos }}
                  >
                    {player.num}
                    {/* tooltip */}
                    <div className="absolute bottom-full mb-1 hidden group-hover:block w-max max-w-[120px] text-center bg-black/90 text-white text-[10px] px-2 py-1 rounded border border-white/20 z-20">
                      {player.name}
                    </div>
                  </div>
                );
              })}

              {/* away side */}
              {match.awayTeam.lineup.map((player, idx, arr) => {
                if (!player.grid) return null;
                const [row, col] = player.grid.split(':').map(Number);                
                const countInRow = arr.filter(p => p.grid && p.grid.startsWith(`${row}:`)).length;
                const rightPos = `${row * 15}%`; 
                const topPos = `${(col / (countInRow + 1)) * 100}%`;

                return (
                  <div 
                    key={`away-${idx}`} 
                    className="absolute w-7 h-7 bg-[#EC577D] border-2 border-pink-900 rounded-full flex justify-center items-center text-[11px] text-white font-bold shadow-[0_4px_10px_rgba(0,0,0,0.3)] transform translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125 z-10 group"
                    style={{ right: rightPos, top: topPos }}
                  >
                    {player.num}
                    {/* tooltip */}
                    <div className="absolute bottom-full mb-1 hidden group-hover:block w-max max-w-[120px] text-center bg-black/90 text-white text-[10px] px-2 py-1 rounded border border-white/20 z-20">
                      {player.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* away team */}
          <div className="bg-white/12 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col h-full">
            <h3 className="mb-4 flex w-full justify-between items-center">
              <span className="text-[#39ff14] font-bold text-[28px] uppercase">{match.awayTeam.name} {activeTab === "lineup" ? "Lineup" : "Subs"}</span>
              <span className="font-medium text-[16px] text-right">{match.awayTeam.coach} </span>
            </h3>
            <div className="flex-1 space-y-4">
              {(activeTab === "lineup" ? match.awayTeam.lineup : match.awayTeam.subs).map((player, idx) => (
                <div key={idx} className="flex justify-between items-center w-full ">
                  <div className="flex items-center gap-6"> 
                    <span className="text-[#F5F2FF] font-bold w-6">{player.num}</span>
                    <span className="text-[#F5F2FF] font-medium">{player.name}</span>
                  </div> 
                  <span className="text-[#39ff14] font-bold tracking-wider">{player.pos}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}