import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">

      <div className="hero-container">

        {/* LEFT CONTENT */}

        <div className="hero-content">

          <p className="hero-label">
            <span className="hero-label-line"></span>
            DIGITAL SOLUTIONS AGENCY
          </p>

          <h1 id="hero-title">
            Build.
            <br />
            Create.
            <br />
            <span>Grow</span>
          </h1>

          <p className="hero-description">
            We transform ideas into powerful digital experiences.
            From websites and applications to branding and digital
            marketing, we help businesses move forward.
          </p>

          <div className="hero-buttons">

            <Link
              href="/contact"
              className="button button-primary"
            >
              Start a Project
              <span>↗</span>
            </Link>

            <Link
              href="/#services"
              className="button button-secondary"
            >
              Explore Services
              <span>→</span>
            </Link>

          </div>

          <div className="hero-bottom-text">
            <span>CREATIVITY</span>
            <span className="hero-dot"></span>
            <span>TECHNOLOGY</span>
            <span className="hero-dot"></span>
            <span>GROWTH</span>
          </div>

        </div>


        {/* RIGHT VISUAL */}

        <div className="hero-visual">

          <div className="hero-visual-glow"></div>

          <div className="hero-visual-card">

            <div className="hero-visual-top">

              <div className="hero-visual-logo">
                <span>S</span>
                SKYMARK
              </div>

              <span className="hero-visual-status">
                DIGITAL EXPERIENCE
              </span>

            </div>


            <div className="hero-visual-main">

              <p className="hero-visual-small">
                YOUR VISION.
                OUR EXPERTISE.
              </p>

              <h2>
                Ideas into
                <span> reality</span>
              </h2>

              <div className="hero-visual-line"></div>

              <p className="hero-visual-description">
                Creating meaningful digital experiences
                that help businesses stand out.
              </p>

            </div>


            <div className="hero-visual-services">

              <div className="hero-service-item">
                <span>01</span>
                <p>Web Development</p>
                <span>↗</span>
              </div>

              <div className="hero-service-item">
                <span>02</span>
                <p>Digital Marketing</p>
                <span>↗</span>
              </div>

              <div className="hero-service-item">
                <span>03</span>
                <p>Branding & Design</p>
                <span>↗</span>
              </div>

              <div className="hero-service-item">
                <span>04</span>
                <p>Video & Content</p>
                <span>↗</span>
              </div>

            </div>

          </div>


          {/* FLOATING ELEMENTS */}

          <div className="hero-floating-card hero-floating-top">
            <span className="hero-floating-icon">✦</span>
            <div>
              <strong>Creative Thinking</strong>
              <small>Ideas without limits</small>
            </div>
          </div>

          <div className="hero-floating-card hero-floating-bottom">
            <span className="hero-floating-icon">↗</span>
            <div>
              <strong>Digital Growth</strong>
              <small>Built for what's next</small>
            </div>
          </div>

        </div>

      </div>


      {/* BOTTOM INDICATOR */}

      <div className="hero-scroll-indicator">
        <span></span>
        SCROLL TO EXPLORE
      </div>

    </section>
  );
}