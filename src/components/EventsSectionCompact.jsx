import React from 'react';

const EventsSectionCompact = () => {
  const events = [
    {
      title: "HackTheHimalayas",
      desc: "24-hour flagship hackathon — build, break, and ship in the mountains.",
      date: "Oct 2026",
    },
    {
      title: "Competitive Programming Bootcamp",
      desc: "Weekly problem-solving sessions on DSA, algorithms, and contest strategy.",
      date: "Ongoing",
    },
    {
      title: "Tech Talks & Workshops",
      desc: "Industry speakers and hands-on sessions across AI, systems, and web.",
      date: "Monthly",
    },
  ];

  return (
    <section id="events" className="section section--compact">
      <div className="container">
        <div className="section__header">
          <p className="eyebrow">Events</p>
          <h2>Events</h2>
        </div>
        <p className="lede">
          Hackathons, contests, and workshops — there's always something
          happening at the chapter.
        </p>
        <ul className="events events--compact">
          {events.map((item) => (
            <li key={item.title} className="events__item">
              <div className="events__date">{item.date}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="section__cta">
          <a href="/events" className="btn btn--ghost">View all events →</a>
        </div>
      </div>
    </section>
  );
};

export default EventsSectionCompact;