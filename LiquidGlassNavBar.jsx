import React, { useState, useRef, useEffect } from "react";

/**
 * LiquidGlassNavBar
 * 
 * A floating, pill-shaped "liquid glass" navigation bar in the style of Apple's iOS tab bars.
 * 
 * Specifications:
 * - Floating pill capsule with visible rounded margins & bottom lift
 * - Translucent white ~6% background with blur(24px) saturate(180%)
 * - 1px hairline border + soft lift shadow + dual inset thickness highlights
 * - 1px top sheen reflection line
 * - 58x52px touch targets with 1.8px line SVG icons
 * - Sliding solid white-to-light-gray capsule indicator behind active item
 * - Optional red notification dot indicator on items (e.g. Chat)
 */
export default function LiquidGlassNavBar({ activeTab = "home", onTabChange }) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 6, width: 58 });
  const navRef = useRef(null);
  const itemRefs = useRef({});

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
        </svg>
      ),
    },
    {
      id: "map",
      label: "Map",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />
          <path d="M9 3v15" />
          <path d="M15 6v15" />
        </svg>
      ),
    },
    {
      id: "chat",
      label: "Chat",
      hasNotification: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      ),
    },
    {
      id: "recent",
      label: "Recent",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 15" />
        </svg>
      ),
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
    },
  ];

  // Update sliding indicator position
  const updateIndicator = (tabId) => {
    const el = itemRefs.current[tabId];
    if (el && navRef.current) {
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  };

  useEffect(() => {
    updateIndicator(currentTab);
  }, [currentTab]);

  useEffect(() => {
    const handleResize = () => updateIndicator(currentTab);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentTab]);

  const handleSelect = (id) => {
    setCurrentTab(id);
    if (onTabChange) onTabChange(id);
  };

  return (
    <nav
      ref={navRef}
      className="fixed bottom-[22px] left-1/2 -translate-x-1/2 z-40 flex items-center justify-between px-[6px] h-[64px] rounded-[36px] select-none"
      style={{
        width: "calc(100% - 44px)",
        maxWidth: "356px",
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.45),
          inset 0 1px 1px rgba(255, 255, 255, 0.25),
          inset 0 -1px 1px rgba(0, 0, 0, 0.3)
        `,
      }}
    >
      {/* 1px curved sheen line near top inner edge */}
      <div
        className="absolute top-[1px] left-[24px] right-[24px] h-[1px] pointer-events-none rounded-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.45) 50%, transparent 100%)",
        }}
      />

      {/* Sliding Active Capsule Background Indicator */}
      <div
        className="absolute top-[6px] h-[52px] rounded-[26px] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] z-[1]"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
          background: "linear-gradient(180deg, #ffffff 0%, #f4f4f5 100%)",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.28), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
        }}
      />

      {/* Nav Items */}
      {navItems.map((item) => {
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            ref={(el) => (itemRefs.current[item.id] = el)}
            onClick={() => handleSelect(item.id)}
            type="button"
            className="relative z-[2] flex flex-col items-center justify-center w-[58px] h-[52px] rounded-[26px] border-none bg-transparent cursor-pointer p-0 transition-colors duration-200 outline-none"
            style={{
              color: isActive ? "#09090b" : "rgba(255, 255, 255, 0.5)",
            }}
          >
            {/* Icon + Optional Red Dot Badge */}
            <div className="relative flex items-center justify-center">
              <span className={`transition-transform duration-200 ${isActive ? "scale-105" : ""}`}>
                {item.icon}
              </span>

              {item.hasNotification && (
                <span
                  className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-[4.5px] h-[4.5px] rounded-full pointer-events-none"
                  style={{
                    backgroundColor: isActive ? "#dc2626" : "#ef4444",
                    boxShadow: isActive ? "0 0 4px rgba(220, 38, 38, 0.7)" : "0 0 5px rgba(239, 68, 68, 0.85)",
                  }}
                />
              )}
            </div>

            {/* Label */}
            <span
              className="text-[10px] tracking-[-0.1px] leading-none mt-[3px] transition-colors duration-200"
              style={{
                fontWeight: isActive ? 700 : 600,
                color: isActive ? "#09090b" : "inherit",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}