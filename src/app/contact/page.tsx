"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.error ||
            "Something went wrong. Please try again."
        );

        return;
      }

      setSuccess(
        "Your message has been sent successfully. We will get back to you soon."
      );

      form.reset();

    } catch (error) {

      console.error(
        "CONTACT FORM ERROR:",
        error
      );

      setError(
        "Unable to send your message. Please try again."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <main className="contact-page">

      {/* =====================================
          CONTACT HERO
      ===================================== */}

      <section className="contact-hero">

        <div className="contact-hero-content">

          <p className="section-label">
            GET IN TOUCH
          </p>

          <h1>
            Let&apos;s build
            <span> something great.</span>
          </h1>

          <p>
            Have a project in mind? Tell us what you are
            looking to build, and let&apos;s discuss how SkyMark
            can help your business grow.
          </p>

        </div>

      </section>


      {/* =====================================
          CONTACT SECTION
      ===================================== */}

      <section className="contact-section">

        <div className="contact-grid">

          {/* LEFT SIDE */}

          <div className="contact-info">

            <p className="section-label">
              CONTACT US
            </p>

            <h2>
              Tell us about
              <span> your project.</span>
            </h2>

            <p>
              Whether you need a website, digital marketing,
              content creation or branding, we&apos;d love to hear
              from you.
            </p>


            <div className="contact-details">

              <div className="contact-detail">

                <span>
                  EMAIL
                </span>

                <a href="mailto:hello@skymark.com">
                  hello@skymark.com
                </a>

              </div>


              <div className="contact-detail">

                <span>
                  LOCATION
                </span>

                <p>
                  Cape Town, South Africa
                </p>

              </div>

            </div>

          </div>


          {/* =====================================
              FORM
          ===================================== */}

          <div className="contact-form-container">

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">

                <label htmlFor="name">
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="company">
                  Company
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Company name"
                />

              </div>


              <div className="form-group">

                <label htmlFor="service">
                  What do you need?
                </label>

                <select
                  id="service"
                  name="service"
                  defaultValue=""
                  required
                >

                  <option
                    value=""
                    disabled
                  >
                    Select a service
                  </option>

                  <option value="Web Development">
                    Web Development
                  </option>

                  <option value="Digital Marketing">
                    Digital Marketing
                  </option>

                  <option value="Video & Content">
                    Video & Content
                  </option>

                  <option value="Branding & Design">
                    Branding & Design
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label htmlFor="message">
                  Tell us about your project
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us about your project, goals and timeline..."
                  required
                />

              </div>


              {/* =====================================
                  SUCCESS MESSAGE
              ===================================== */}

              {success && (
                <div className="form-success">
                  ✓ {success}
                </div>
              )}


              {/* =====================================
                  ERROR MESSAGE
              ===================================== */}

              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}


              {/* =====================================
                  SUBMIT
              ===================================== */}

              <button
                type="submit"
                className="contact-submit"
                disabled={loading}
              >

                {loading
                  ? "Sending..."
                  : "Send Message →"}

              </button>

            </form>

          </div>

        </div>

      </section>


      {/* =====================================
          CTA
      ===================================== */}

      <section className="contact-cta">

        <p className="section-label">
          SKYMARK
        </p>

        <h2>
          Your next idea
          <span> starts here.</span>
        </h2>

      </section>

    </main>
  );
}