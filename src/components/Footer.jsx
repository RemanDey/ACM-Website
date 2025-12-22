const Footer = () => {
  // Reuse the pixel border style from your ContactSection for consistency
  const pixelBorder = {
    boxShadow: "inset -4px -4px 0px #373737, inset 4px 4px 0px #ffffff",
    backgroundColor: "#c6c6c6",
    border: "4px solid #000",
  };

  const menuButtonStyle = "px-4 py-2 border-2 border-black bg-[#7c7c7c] text-white text-sm hover:bg-[#8c8c8c] hover:text-[#ffffa0] transition-all active:translate-y-1";

  return (
    <footer className="relative w-full bg-[#1a1a1a] pt-12 pb-6 overflow-hidden">
      
      {/* THE "BLOCK" TOP EDGE - Mimics a layer of deepslate blocks */}
      <div className="absolute top-0 left-0 w-full h-4 bg-[#2c2c2c] border-b-4 border-black shadow-[inset_0_4px_0_#444]" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* COLUMN 1: BRANDING */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tighter" style={{ fontFamily: "'Minecraft', monospace" }}>
              ACM <span className="text-[#7cfc00]">CHAPTER</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "'Minecraft', monospace" }}>
              Exploring the depths of the trial chambers since 2021. Built with 
              <span className="text-red-500"> ❤️ </span> 
              and a lot of Redstone.
            </p>
          </div>

          {/* COLUMN 2: QUICK LINKS (Styled like Menu Buttons) */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[#adff2f] text-xs mb-2 font-bold uppercase tracking-widest">Navigation</h4>
            <div className="grid grid-cols-2 gap-2" style={{ fontFamily: "'Minecraft', monospace" }}>
              <button className={menuButtonStyle} style={{ boxShadow: "inset -2px -2px 0 #373737, inset 2px 2px 0 #afafaf" }}>TEAM</button>
              <button className={menuButtonStyle} style={{ boxShadow: "inset -2px -2px 0 #373737, inset 2px 2px 0 #afafaf" }}>EVENTS</button>
              <button className={menuButtonStyle} style={{ boxShadow: "inset -2px -2px 0 #373737, inset 2px 2px 0 #afafaf" }}>ABOUT</button>
              <button className={menuButtonStyle} style={{ boxShadow: "inset -2px -2px 0 #373737, inset 2px 2px 0 #afafaf" }}>STORE</button>
            </div>
          </div>

          {/* COLUMN 3: SERVER STATUS */}
          <div className="p-1" style={pixelBorder}>
            <div className="bg-[#c6c6c6] p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#3f3f3f] font-bold text-xs uppercase">Server Status:</span>
                <span className="flex items-center gap-2 text-[#008000] text-xs font-bold animate-pulse">
                  <div className="w-2 h-2 bg-[#7cfc00] border border-black" /> ONLINE
                </span>
              </div>
              <div className="bg-black/10 p-2 border-2 border-dashed border-[#888]">
                <p className="text-[#3f3f3f] text-[10px] font-bold">IP: PLAY.YOURSERVER.COM</p>
                <p className="text-[#3f3f3f] text-[10px] font-bold">PLAYERS: 128 / 500</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">
            © 2025 Minecraft Project. Not an official Minecraft product.
          </p>
          
          {/* SOCIALS */}
          <div className="flex gap-4">
            {['Discord', 'Twitter', 'YouTube'].map((social) => (
              <a 
                key={social}
                href="#" 
                className="text-gray-400 hover:text-[#7cfc00] text-xs transition-colors"
                style={{ fontFamily: "'Minecraft', monospace" }}
              >
                [{social}]
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* BACKGROUND PIXEL DETAIL */}
      <div 
        className="absolute bottom-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(#adff2f 2px, transparent 2px)', 
          backgroundSize: '12px 12px',
          imageRendering: 'pixelated' 
        }}
      />
    </footer>
  );
};

export default Footer;