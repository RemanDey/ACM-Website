const HeroSection = () => {
  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <a className="wordmark" href="/">
            <img className="wordmark__logo" src="/acm-logo.png" alt="ACM IIT Mandi logo" />
            <span>ACM IIT Mandi</span>
          </a>
          <nav className="site-nav">
            <a href="#about">About</a>
            <a href="#events">Events</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <p className="eyebrow">Student Chapter · Association for Computing Machinery</p>
          <h1 className="hero__title">ACM IIT Mandi</h1>
          <p className="hero__sub">
            Advancing computing as a science and profession.
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;