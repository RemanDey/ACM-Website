import { useState, useEffect, useRef } from "react";
import InfiniteMenu from "./InfiniteMenu";

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

  const aboutContent = [
    {
      image: './about/innovation.jpg',
      link: '#',
      title: 'INNOVATION',
      description: ''
    },
    {
      image: './about/community.png',
      link: '#',
      title: 'COMMUNITY',
      description: ''
    },
    {
      image: './about/events.png',
      link: '#',
      title: 'EVENTS',
      description: ''
    },
  ];

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

          {/* Right Side - About Title + InfiniteMenu */}
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

            {/* InfiniteMenu */}
            <div className="relative h-[600px] w-full">


              <InfiniteMenu items={aboutContent} scale={1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;