import React from 'react';

const AboutSectionCompact = () => {
  const highlights = [
    { title: "Innovate", desc: "Push boundaries with cutting-edge projects" },
    { title: "Collaborate", desc: "Build together, learn together, grow together" },
    { title: "Compete", desc: "Hackathons, coding contests & tech challenges" },
  ];

  return (
    <section id="about" className="section section--compact">
      <div className="container">
        <div className="section__header">
          <p className="eyebrow">About</p>
          <h2>About Us</h2>
        </div>
        <p className="lede">
          We are the <strong>ACM Student Chapter</strong> at IIT Mandi — a
          community of passionate coders, builders, and innovators exploring
          the frontiers of computing.
        </p>
        <ul className="highlights highlights--compact">
          {highlights.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
        <div className="section__cta">
          <a href="/about" className="btn btn--ghost">Read more →</a>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionCompact;