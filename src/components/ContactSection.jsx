import { useState, useEffect, useRef } from "react";
import ModelViewer from "./ModelViewer";

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
    // Simulating a Minecraft "Saving World" delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  // Minecraft UI styles for reuse
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
      {/* BACKGROUND - Tiled dirt/stone pattern */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "url(/minecraft_bg3.png)", // Use the dark chamber image you generated
          backgroundSize: "cover",
          imageRendering: "pixelated",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* LEFT — THE FORM (Styled like a Chest or Inventory) */}
          <div
            className={`transition-all duration-700 p-1 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
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
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="p-3 outline-none focus:border-[#7cfc00]"
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
                      className="p-3 outline-none focus:border-[#7cfc00]"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3f3f3f] text-sm font-bold">SUBJECT</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="p-3 outline-none focus:border-[#7cfc00]"
                    style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3f3f3f] text-sm font-bold">MESSAGE</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="p-3 outline-none focus:border-[#7cfc00] resize-none"
                    style={inputStyle}
                  />
                </div>

                {/* MINECRAFT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-white text-xl font-bold relative group active:translate-y-1 transition-all"
                  style={{
                    backgroundColor: "#7c7c7c",
                    border: "4px solid #000",
                    boxShadow: "inset -4px -4px 0px #373737, inset 4px 4px 0px #afafaf",
                    textShadow: "2px 2px 0 #000",
                  }}
                >
                  <span className="group-hover:text-[#ffffa0]">
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  </span>
                </button>

                {submitStatus === "success" && (
                  <div className="text-[#008000] text-center font-bold animate-pulse">
                    ! ITEM SENT TO INBOX
                  </div>
                )}
              </form>
            </div>
          </div>
 
          <div
            className={`flex flex-col items-center justify-center transition-all duration-1000 delay-300 ${isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
          >
            <div className="relative group">
              {/* Decorative floating label */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#000000aa] border-2 border-[#5555ff] px-4 py-1 whitespace-nowrap hidden group-hover:block z-20">
                <p className="text-[#55ffff] text-sm" style={{ fontFamily: "'Minecraft', monospace" }}>
                  Player: Steve
                </p>
              </div>

              <ModelViewer
                url="/steve.glb"
                width={600}
                height={600}
                autoFrame={false}          // Set to false so defaultZoom works
                defaultZoom={3.2}          // Adjust this value to zoom in/out (3 to 4 is usually best)
                minZoomDistance={2.0}      // Prevents users from zooming in too close
                maxZoomDistance={6.0}      // Prevents users from zooming out too far
                modelYOffset={-0.2}        // Optional: moves model slightly down in the frame
              />
            </div>

            {/* STATS BUBBLES */}
            <div className="flex gap-4 mt-8">
              {[
                { label: "MAIL", value: "2" },
                { label: "LVL", value: "13" }
              ].map((stat, i) => (
                <div key={i} className="px-6 py-2" style={pixelBorder}>
                  <p className="text-[#3f3f3f] font-bold text-xs">{stat.label}</p>
                  <p className="text-black font-bold text-xl">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;