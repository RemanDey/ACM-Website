const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <h3>ACM Chapter</h3>
            <p>
              Exploring the depths of Computing Machinery and its applications, ACM IIT Mandi Student Chapter is a hub for tech enthusiasts to learn, collaborate, and innovate.
            </p>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul className="footer__nav">
              <li><a href="#">Team</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#">Store</a></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul className="footer__nav">
              <li><a href="#">Discord</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2026 ACM IIT Mandi Student Chapter.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;