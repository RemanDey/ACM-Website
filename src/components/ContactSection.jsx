import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

/* ===================== */
/* STEVE MODEL */
/* ===================== */
function SteveModel() {
  const ref = useRef();
  const { scene } = useGLTF("/steve.glb");

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.006;
  });

  return (
    <group ref={ref} scale={0.13} position={[0, -0.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/steve.glb");

/* ===================== */
/* CONTACT SECTION */
/* ===================== */
const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const pixelBorder = {
    boxShadow: "inset -4px -4px 0px #555, inset 4px 4px 0px #fff",
    backgroundColor: "#c6c6c6",
    border: "4px solid #000",
  };

  const inputStyle = {
    backgroundColor: "#000",
    border: "2px solid #555",
    fontFamily: "'Minecraft', monospace",
    color: "#fff",
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen relative overflow-hidden flex items-center py-20 bg-[#313131]"
    >
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "url(/minecraft_bg3.png)",
          backgroundSize: "cover",
          imageRendering: "pixelated",
        }}
      />

      {/* TOP FADE */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,1) 0%,
              rgba(0,0,0,0.9) 10%,
              rgba(0,0,0,0.6) 40%,
              rgba(0,0,0,0) 70%
            )
          `,
        }}
      />

      {/* BOTTOM FADE */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `
            linear-gradient(
              to top,
              rgba(0,0,0,1) 0%,
              rgba(0,0,0,0.9) 15%,
              rgba(0,0,0,0.6) 40%,
              rgba(0,0,0,0) 75%
            )
          `,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* LEFT — FORM (ORIGINAL) */}
          <div
            className={`transition-all duration-700 p-1 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
            style={pixelBorder}
          >
            <div className="p-6 md:p-10 space-y-6 bg-[#c6c6c6]">
              <h2
                className="text-4xl md:text-5xl font-bold text-[#3f3f3f] text-center mb-8"
                style={{ fontFamily: "'Minecraft', monospace" }}
              >
                MESSAGE BOX
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#3f3f3f] text-sm font-bold">NAME</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="p-3 outline-none"
                      style={inputStyle}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[#3f3f3f] text-sm font-bold">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="p-3 outline-none"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3f3f3f] text-sm font-bold">SUBJECT</label>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="p-3 outline-none"
                    style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3f3f3f] text-sm font-bold">MESSAGE</label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="p-3 outline-none resize-none"
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-white text-xl font-bold active:translate-y-1 transition-all"
                  style={{
                    backgroundColor: "#7c7c7c",
                    border: "4px solid #000",
                    boxShadow:
                      "inset -4px -4px 0px #373737, inset 4px 4px 0px #afafaf",
                    textShadow: "2px 2px 0 #000",
                  }}
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>

                {submitStatus === "success" && (
                  <div className="text-[#008000] text-center font-bold animate-pulse">
                    ! ITEM SENT TO INBOX
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* RIGHT — STEVE MODEL */}
          <div
            className={`flex items-center justify-center transition-all duration-1000 delay-300 ${
              isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <div className="w-[420px] h-[420px] md:w-[520px] md:h-[520px]">
              <Canvas camera={{ position: [0, 1.5, 5], fov: 50 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <directionalLight position={[-5, 5, -5]} intensity={0.6} />
                <pointLight position={[0, 3, 3]} intensity={0.8} />

                <SteveModel />

                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
