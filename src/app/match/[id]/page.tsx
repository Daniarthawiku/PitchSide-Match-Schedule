"use client";

import { useState, use } from "react"; 
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useFetchMatch } from "@/hooks/useFetchMatch";


import { MatchHeroCard } from "@/components/match-info/MatchHeroCard";
import { MatchStatsTab } from "@/components/match-info/MatchStatsTab";
import { MatchLineupTab } from "@/components/match-info/MatchLineupTab";

type TabType = "lineup" | "substitutes" | "stats";

export default function MatchInfo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<TabType>("lineup"); 
  const { data: match, isLoading, error } = useFetchMatch(id);
  
  if (isLoading) return <div className="w-full h-screen flex items-center justify-center text-[#39ff14]">Memuat Data Pertandingan...</div>;
  if (error || !match) return <div className="w-full h-screen flex items-center justify-center text-red-500">{error || "Data tidak ditemukan"}</div>;

  {/* sementara dimatiin karena gaada live match & upcoming */}
  // const getBgGradient = (status: string) => {
  //   if (status === "live") return "from-[#1E153A] via-[#EC577D] to-[#FFA400]"; 
  //   if (status === "upcoming") return "from-[#0A2E5C] via-[#2D7F7D] to-[#7FB881]"; 
  //   if (status === "finished") return "from-[#0802A3] via-[#83279A] to-[#FF4B91]";
  // };

  return (
    <div className="relative w-full h-full overflow-x-hidden no-scrollbar pt-2 px-20 pb-20">
      <div className={`fixed inset-0 z-[-1] bg-from-[#0A2E5C] via-[#2D7F7D] to-[#7FB881] transition-colors duration-1000`} />
      
      {/* TOP NAVIGATION & TABS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <Link href="/" className="flex items-center text-white/80 hover:text-white transition group">
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform text-[#F5F2FF]" />
          <span>Back</span>
        </Link>

        {/* tab buttons */}
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
              {activeTab === tab && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#39ff14] shadow-[0_0_10px_#39ff14]"></div>}
            </button>
          ))}
        </div>
      </div>

      {/* hero score card */}
      <MatchHeroCard match={match} />

      {/* conditional rendering */}
      {activeTab === "stats" ? (
        <MatchStatsTab match={match} />
      ) : (
        <MatchLineupTab match={match} activeTab={activeTab} />
      )}
    </div>
  );
}