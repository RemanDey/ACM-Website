import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link className="wordmark" to="/">
            <img className="wordmark__logo" src="/acm-logo.png" alt="ACM IIT Mandi logo" />
            <span>ACM IIT Mandi</span>
          </Link>
          <nav className="site-nav">
            <Link to="/about">About</Link>
            <Link to="/events">Events</Link>
            <Link to="/contact">Contact</Link>
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