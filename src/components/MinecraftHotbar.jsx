import { useState, useEffect } from 'react';

const MinecraftHotbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = [
    { name: "Team", icon: "💎", path: "/team" },
    { name: "Events", icon: "🪓", path: "/events" },
    { name: "About", icon: "⚔️", path: "#about" },
    { name: "Contact", icon: "🌿", path: "#contact" },
    { name: "", icon: "" },
    { name: "", icon: "" },
    { name: "", icon: "" },
    { name: "", icon: "" },
    { name: "", icon: "" },
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = parseInt(e.key);
      if (key >= 1 && key <= 9) {
        setActiveIndex(key - 1);
        handleNavigation(key - 1);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleNavigation = (index) => {
    const item = navItems[index];
    if (!item || !item.path) return;

    if (item.path.startsWith("#")) {
      document.querySelector(item.path)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = item.path;
    }
  };

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 select-none flex flex-col items-center z-100">
      
      {/* HOVER LABEL */}
      <div className="h-6 mb-2"> 
        {hoveredIndex !== null && navItems[hoveredIndex].name && (
          <div 
            className="text-white text-xl transition-opacity duration-150 ease-out"
            style={{ textShadow: '2px 2px 0px #3f3f3f' }}
          >
            {navItems[hoveredIndex].name}
          </div>
        )}
      </div>

      {/* XP BAR */}
      <div className="relative w-[364px] mb-1">
        <div className="w-full h-[10px] bg-[#000000CC] border-[2px] border-black flex items-center p-[1px]">
          <div className="h-full bg-[#7cfc00] w-[15%] shadow-[inset_0_2px_0_#adff2f]" />
        </div>
        <span
          className="absolute -top-5 left-1/2 -translate-x-1/2 text-[#7cfc00] text-lg font-bold tracking-tight"
          style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000' }}
        >
          13
        </span>
      </div>

      {/* HOTBAR */}
      <div className="relative flex items-center bg-[#00000066] border-[4px] border-black p-[1px]">
        <div className="absolute inset-0 flex">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-full w-[2px] bg-black/40" style={{ marginLeft: '42px' }} />
          ))}
        </div>

        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setActiveIndex(index);
              handleNavigation(index);
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative w-[42px] h-[42px] flex items-center justify-center cursor-pointer z-10"
          >
            <span className="text-2xl drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
              {item.icon}
            </span>
          </div>
        ))}

        {/* SELECTOR */}
        <div 
          className="absolute -top-[4px] -left-[4px] w-[50px] h-[50px] transition-all duration-75 ease-out pointer-events-none"
          style={{ transform: `translateX(${activeIndex * 42}px)` }}
        >
          <div className="absolute inset-0 border-[4px] border-[#FFFFFFEE]" />
          <div className="absolute inset-[2px] border-[2px] border-[#00000088]" />
          <div className="absolute -inset-[2px] border-[2px] border-[#00000044]" />
        </div>
      </div>

      <style jsx global>{`
        body { 
          background-image: url('https://www.transparenttextures.com/patterns/dark-matter.png');
          background-color: #4a5a3a;
        }
        * { 
          image-rendering: pixelated; 
          font-family: 'Courier New', Courier, monospace;
        }
      `}</style>
    </nav>
  );
};

export default MinecraftHotbar;
