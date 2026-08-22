import React, { useState } from "react";

const ContactSectionCompact = () => {
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
    <section id="contact" className="section section--compact">
      <div className="container">
        <div className="section__header">
          <p className="eyebrow">Contact</p>
          <h2>Get in touch</h2>
        </div>
        <p className="lede">
          Questions, collaborations, or ideas — we'd love to hear from you.
        </p>
        <form className="form form--compact" onSubmit={handleSubmit}>
          <div className="form__row">
            <div className="form__field">
              <label htmlFor="name-home">Name</label>
              <input
                id="name-home"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form__field">
              <label htmlFor="email-home">Email</label>
              <input
                id="email-home"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form__field">
            <label htmlFor="subject-home">Subject</label>
            <input
              id="subject-home"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="message-home">Message</label>
            <textarea
              id="message-home"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={3}
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
        <div className="section__cta">
          <a href="/contact" className="btn btn--ghost">Full contact page →</a>
        </div>
      </div>
    </section>
  );
};

export default ContactSectionCompact;