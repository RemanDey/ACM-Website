import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section">
      <div className="container section__grid">
        <div className="section__aside">
          <p className="eyebrow">03 · Contact</p>
          <p className="text">
            Questions, collaborations, or ideas — we'd love to hear from you.
          </p>
        </div>
        <div className="section__main">
          <h2>Get in touch</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__row">
              <div className="form__field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form__field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn">
              Send message
            </button>
            {submitted && (
              <p className="form__note" role="status">
                Thank you — your message has been noted.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;