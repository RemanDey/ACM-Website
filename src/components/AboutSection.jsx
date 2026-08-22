const AboutSection = () => {
  const highlights = [
    { title: "Innovate", desc: "Push boundaries with cutting-edge projects" },
    { title: "Collaborate", desc: "Build together, learn together, grow together" },
    { title: "Compete", desc: "Hackathons, coding contests & tech challenges" },
  ];

  const languages = [
    { name: "C++", icon: "cplusplus" },
    { name: "Python", icon: "python" },
    { name: "Java", icon: "openjdk" },
    { name: "JavaScript", icon: "javascript" },
    { name: "Go", icon: "go" },
    { name: "Rust", icon: "rust" },
  ];

  const tools = [
    { name: "React", icon: "react" },
    { name: "Node.js", icon: "nodedotjs" },
    { name: "Django", icon: "django" },
    { name: "Flask", icon: "flask" },
    { name: "Docker", icon: "docker" },
    { name: "Kubernetes", icon: "kubernetes" },
    { name: "Git", icon: "git" },
  ];

  return (
    <section id="about" className="section">
      <div className="container section__grid">
        <div className="section__aside">
          <p className="eyebrow">About</p>
        </div>
        <div className="section__main">
          <h2>About Us</h2>
          <p className="lede">
            We are the <strong>ACM Student Chapter</strong> at IIT Mandi — a
            community of passionate coders, builders, and innovators exploring
            the frontiers of computing.
          </p>
          <ul className="highlights">
            {highlights.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>

          <div className="tech">
            <h3 className="tech__title">Technologies</h3>
            <div className="tech__group">
              <h4>Languages</h4>
              <ul className="tech__grid">
                {languages.map((item) => (
                  <li key={item.name} className="tech__item">
                    <img
                      className="tech__logo"
                      src={`https://cdn.simpleicons.org/${item.icon}`}
                      alt={item.name}
                    />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tech__group">
              <h4>Frameworks &amp; Tools</h4>
              <ul className="tech__grid">
                {tools.map((item) => (
                  <li key={item.name} className="tech__item">
                    <img
                      className="tech__logo"
                      src={`https://cdn.simpleicons.org/${item.icon}`}
                      alt={item.name}
                    />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;