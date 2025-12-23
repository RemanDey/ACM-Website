import { useState, useEffect, useRef } from "react";

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
      {/* Background - Same as Hero but with minecraft_bg2.png */}
      <div
        className={`absolute inset-0 z-0 bg-cover bg-center scale-105 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          backgroundImage: 'url(/minecraft_bg2.png)',
          filter: 'blur(0px)',
          imageRendering: 'pixelated',
        }}
      />
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 0.9) 10%,
              rgba(0, 0, 0, 0.7) 40%,
              rgba(0, 0, 0, 0.4) 60%,
              rgba(0, 0, 0, 0) 70%
            )
          `,
        }}
      />
      {/* BOTTOM → PURE BLACK FADE */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
        style={{
          background: `
      linear-gradient(
        to top,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0.9) 15%,
        rgba(0, 0, 0, 0.7) 35%,
        rgba(0, 0, 0, 0.4) 55%,
        rgba(0, 0, 0, 0) 75%
      )
    `,
        }}
      />

   

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Side - Video */}
          <div
            className={`relative transition-all duration-1000 ease-out ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
              }mt-24 md:mt-36`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative aspect-square overflow-hidden">
              {/* Glow effect behind video */}
              <div className="absolute inset-0 -z-10">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full animate-pulse"
                  style={{
                    filter: "blur(60px)",
                  }}
                />
              </div>

              <video
                src="/steve-dance-transparent.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain pointer-events-none"
                style={{
                  imageRendering: "pixelated",
                }}
              />
            </div>
          </div>

          {/* Right Side - About Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ease-out ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
              }`}
            style={{ transitionDelay: "400ms" }}
          >
            {/* Section Title */}
            <div className="space-y-4">
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

            {/* Description */}
            <p
              className="text-lg md:text-xl text-gray-300 leading-relaxed"
              style={{
                fontFamily: "'Minecraft', monospace",
                textShadow: "2px 2px 0 #000000",
              }}
            >
              We are the <span className="text-emerald-400">ACM Student Chapter</span> at IIT Mandi — a community of passionate coders, builders, and innovators exploring the frontiers of computing.
            </p>

            {/* Key Highlights */}
            <div className="space-y-4 pt-4">
              {[
                {title: "INNOVATE", desc: "Push boundaries with cutting-edge projects" },
                {title: "COLLABORATE", desc: "Build together, learn together, grow together" },
                {title: "COMPETE", desc: "Hackathons, coding contests & tech challenges" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-500 hover:scale-105 ${isVisible ? "opacity-400 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  style={{
                    transitionDelay: `${600 + index * 150}ms`,
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "2px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div>
                    <h3
                      className="text-2xl font-bold text-white mb-1"
                      style={{
                        fontFamily: "'Minecraft', monospace",
                        textShadow: "2px 2px 0 #000000",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-gray-300 text-lg"
                      style={{
                        fontFamily: "'Minecraft', monospace",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;