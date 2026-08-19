const EventsSection = () => {
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
    {
      title: "Hacktoberfest Drive",
      desc: "Guided open-source contributions with mentors throughout October.",
      date: "Oct 2026",
    },
  ];

  return (
    <section id="events" className="section">
      <div className="container section__grid">
        <div className="section__aside">
          <p className="eyebrow">02 · Events</p>
        </div>
        <div className="section__main">
          <h2>Events</h2>
          <p className="lede">
            Hackathons, contests, and workshops — there's always something
            happening at the chapter.
          </p>
          <ul className="events">
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
        </div>
      </div>
    </section>
  );
};

export default EventsSection;