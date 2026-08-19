const AboutSection = () => {
  const highlights = [
    { title: "INNOVATE", desc: "Push boundaries with cutting-edge projects" },
    { title: "COLLABORATE", desc: "Build together, learn together, grow together" },
    { title: "COMPETE", desc: "Hackathons, coding contests & tech challenges" },
  ];

  return (
    <section id="about">
      <h2>About Us</h2>
      <p>
        We are the ACM Student Chapter at IIT Mandi — a community of passionate
        coders, builders, and innovators exploring the frontiers of computing.
      </p>
      <ul>
        {highlights.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutSection;