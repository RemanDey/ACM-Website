import { useState, useEffect, useRef } from "react";
import MinecraftHotbar from "./MinecraftHotbar";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen bg-black text-white relative overflow-hidden flex items-center py-20"
    >
      {/* Background - Same as Hero */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: 'url(/minecraft_bg2.png)',
          filter: 'blur(0px)',
          imageRendering: 'pixelated',
        }}
      />

      {/* Dark overlay - Same as Hero */}
      <div className="absolute inset-0  from-black/60 via-black/50 to-black/70 z-0" />
      <MinecraftHotbar />
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Image */}
          <div
            className={`relative transition-all duration-1000 ease-out ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
              }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden">
              {/* PNG Image */}
              <video
                src="/steve-dance-transparent.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain pointer-events-none"
                style={{
                  mixBlendMode: "screen",
                  backgroundColor: "transparent",
                  imageRendering: "pixelated",
                }}
              />


             
            </div>
          </div>

          {/* Right Side - About Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ease-out ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
              }`}
            style={{ transitionDelay: "400ms" }}
          >
            {/* Section Title */}
            <div className="space-y-2">
              <h2
                className="text-5xl md:text-6xl lg:text-7xl font-bold"
                style={{
                  fontFamily: "'Minecraft', monospace",
                  textShadow: "4px 4px 0 #000000",
                  color: "#ffffff",
                  letterSpacing: "0.05em",
                }}
              >
                ABOUT US
              </h2>
              <div
                className="h-1 w-32 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4)",
                }}
              />
            </div>

            {/* About Description */}
            <div className="space-y-4">
              <div
                className="p-6 backdrop-blur-sm rounded-lg hover:scale-[1.02] transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))",
                  border: "2px solid rgba(139, 92, 246, 0.3)",
                  boxShadow: "0 8px 32px rgba(139, 92, 246, 0.2)",
                }}
              >
                <p
                  className="text-gray-300 text-base md:text-lg leading-relaxed"
                  style={{
                    fontFamily: "'Minecraft', monospace",
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  ACM (Association for Computing Machinery) is the world's largest
                  educational and scientific computing society, uniting computing
                  educators, researchers, and professionals to inspire dialogue,
                  share resources, and address the field's challenges.
                </p>
              </div>

              <div
                className="p-6 backdrop-blur-sm rounded-lg hover:scale-[1.02] transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))",
                  border: "2px solid rgba(59, 130, 246, 0.3)",
                  boxShadow: "0 8px 32px rgba(59, 130, 246, 0.2)",
                }}
              >
                <p
                  className="text-gray-300 text-base md:text-lg leading-relaxed"
                  style={{
                    fontFamily: "'Minecraft', monospace",
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  Our student chapter brings together passionate individuals who
                  share a common interest in technology, innovation, and
                  professional development. We organize workshops, hackathons,
                  tech talks, and networking events to foster growth in the
                  computing community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;