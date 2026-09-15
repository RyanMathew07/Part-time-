import React, { useState } from "react";
import LiquidGlassNavBar from "./LiquidGlassNavBar";

/**
 * AppScreen
 * Complete demonstration screen matching the user's provided UI design
 * with the new floating Liquid Glass Bottom Navigation Bar.
 */
export default function AppScreen() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All gigs" },
    { id: "cafe", label: "â˜• Cafe & food" },
    { id: "promo", label: "ðŸ“¢ Promo & sales" },
  ];

  const tiers = [
    { id: "t100", label: "Tier: â‚¹100 Micro" },
    { id: "t500", label: "â‚¹500 Half-day" },
    { id: "t1000", label: "â‚¹1,000 Standard" },
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white flex justify-center items-center py-6 px-3">
      {/* iPhone 15 Pro Max Chassis */}
      <div className="relative w-full max-w-[430px] h-[932px] bg-black rounded-[54px] overflow-hidden border-[10px] border-[#222225] shadow-2xl flex flex-col">
        
        {/* iOS Status Bar */}
        <div className="pt-3 px-7 flex items-center justify-between text-xs text-white select-none z-30">
          <span className="font-semibold text-sm tracking-tight">9:41</span>
          <div className="flex items-center gap-1.5 font-bold">
            <span className="text-[11px]">5G</span>
            <div className="w-5 h-2.5 border border-white/80 rounded-sm p-[1px] flex items-center">
              <div className="w-full h-full bg-emerald-400 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Top Header */}
        <header className="px-5 pt-3 pb-2 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#bef264] text-black font-extrabold flex items-center justify-center text-xs">
              P
            </div>
            <span className="font-bold text-sm tracking-wide">Part-Time</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 max-w-[130px] truncate">
              Express Flyer & Pro...
            </div>
            <div className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono font-bold text-zinc-200">
              PIN 6767
            </div>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto px-5 pb-28 pt-2 space-y-3.5 scrollbar-none">
          
          {/* Card 1: Universal Attendance PIN Active */}
          <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-3.5 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-800/80 flex items-center justify-center text-base">
                ðŸ”‘
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] tracking-wider font-extrabold uppercase text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Universal Attendance PIN Active
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5 max-w-[180px] leading-tight">
                  Share code with on-ground supervisor to check in
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white text-black px-3.5 py-1.5 rounded-xl font-mono font-black text-sm tracking-widest shadow-sm">
              6767
              <span className="text-xs text-zinc-600">ðŸ“‹</span>
            </div>
          </div>

          {/* Card 2: Active Checked-in Shift */}
          <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-4 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-black uppercase text-[#ccff00] tracking-wide">
                  Express Flyer & Promo Distributor
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  Arun's Cafe & Roasters â€¢ â‚¹100
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 block leading-tight">Checked in - On-site</span>
                <span className="text-base font-extrabold text-white">â‚¹100</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
              <div className="text-[11px] text-zinc-400 leading-snug">
                Shift checked in at <strong className="text-white">01:49 PM</strong>
                <br />
                Attendance verified.
              </div>
              <button
                type="button"
                className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors shadow-sm"
              >
                Complete shift
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gigs, cafes, events, Indiranagar..."
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          {/* Filter Chips Row 1 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  type="button"
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                    active
                      ? "bg-white text-black shadow-sm"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Tier Chips Row 2 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {tiers.map((t) => (
              <button
                key={t.id}
                type="button"
                className="text-[11px] font-semibold px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 whitespace-nowrap"
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Subheading */}
          <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 pt-1">
            <span className="w-1 h-1 rounded-full bg-zinc-500" />
            Showing 1 shift within 1 km
          </div>

          {/* Job Card (Arun's Cafe & Roasters) */}
          <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-2xl overflow-hidden shadow-lg">
            {/* Simulated Hero image / Banner with rating */}
            <div className="h-28 bg-gradient-to-t from-zinc-900 to-zinc-800 p-3 flex items-start justify-between relative">
              <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white flex items-center gap-1 border border-white/10">
                ðŸ‘¤ 4.8
              </span>
            </div>

            <div className="p-4 pt-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Arun's Cafe & Roasters</h3>
                  <p className="text-xs text-zinc-400">Express Flyer & Promo...</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-white">â‚¹100</span>
                  <span className="text-[10px] text-zinc-400 block leading-none">/per hour</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2.5">
                <span className="px-2 py-0.5 rounded-full bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/30 text-[10px] font-bold flex items-center gap-1">
                  âš¡ Promotion
                </span>
                <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] font-bold">
                  Urgent
                </span>
              </div>

              <div className="text-[11px] text-zinc-400 mt-2 flex items-center gap-1.5">
                ðŸ“ 800m away â€¢ 2 slots
              </div>
            </div>
          </div>
        </main>

        {/* Floating Liquid Glass Bottom Navigation Bar */}
        <LiquidGlassNavBar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* iOS Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-1 bg-white/70 rounded-full pointer-events-none z-50" />
      </div>
    </div>
  );
}