import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="about-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="about-hero">

        <div className="about-hero-content">

          <p className="section-label">
            ABOUT SKYMARK
          </p>

          <h1>
            We build digital
            <span> experiences.</span>
          </h1>

          <p>
            SkyMark is a digital solutions agency helping
            businesses build their presence, connect with
            their audience and grow through technology,
            creativity and strategy.
          </p>

        </div>

      </section>


      {/* =====================================
          WHO WE ARE
      ===================================== */}

      <section className="about-section">

        <div className="about-grid">

          <div className="about-heading">

            <p className="section-label">
              WHO WE ARE
            </p>

            <h2>
              Technology meets
              <span> creativity.</span>
            </h2>

          </div>


          <div className="about-text">

            <p>
              We believe that every business deserves a
              strong digital presence. Whether you are
              launching a new business, improving your
              brand or looking for better ways to connect
              with your customers, we help turn ideas into
              digital experiences.
            </p>

            <p>
              Our work combines web development, digital
              marketing, video and content creation, and
              branding and design.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          WHAT WE DO
      ===================================== */}

      <section className="about-services">

        <div className="section-header">

          <p className="section-label">
            WHAT WE DO
          </p>

          <h2>
            Everything you need
            <span> to grow.</span>
          </h2>

        </div>


        <div className="about-services-grid">

          <article className="about-service-card">

            <span>01</span>

            <h3>
              Web Development
            </h3>

            <p>
              Modern, responsive websites and web
              applications designed around your business
              goals.
            </p>

          </article>


          <article className="about-service-card">

            <span>02</span>

            <h3>
              Digital Marketing
            </h3>

            <p>
              Digital strategies that help your business
              reach the right audience and build a stronger
              online presence.
            </p>

          </article>


          <article className="about-service-card">

            <span>03</span>

            <h3>
              Video & Content
            </h3>

            <p>
              Creative content and professional video
              editing designed to capture attention and
              communicate your message.
            </p>

          </article>


          <article className="about-service-card">

            <span>04</span>

            <h3>
              Branding & Design
            </h3>

            <p>
              Visual identities and creative design that
              help businesses stand out and remain
              memorable.
            </p>

          </article>

        </div>

      </section>


      {/* =====================================
          OUR APPROACH
      ===================================== */}

      <section className="about-approach">

        <div className="about-grid">

          <div className="about-heading">

            <p className="section-label">
              OUR APPROACH
            </p>

            <h2>
              Simple ideas.
              <span> Powerful execution.</span>
            </h2>

          </div>


          <div className="about-text">

            <div className="approach-item">

              <span>01</span>

              <div>

                <h3>
                  Understand
                </h3>

                <p>
                  We start by understanding your business,
                  your audience and your goals.
                </p>

              </div>

            </div>


            <div className="approach-item">

              <span>02</span>

              <div>

                <h3>
                  Create
                </h3>

                <p>
                  We develop a clear digital solution that
                  combines strategy, technology and creative
                  thinking.
                </p>

              </div>

            </div>


            <div className="approach-item">

              <span>03</span>

              <div>

                <h3>
                  Grow
                </h3>

                <p>
                  We focus on creating solutions that help
                  your business improve, connect and grow.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          CALL TO ACTION
      ===================================== */}

      <section className="about-cta">

        <p className="section-label">
          LET&apos;S WORK TOGETHER
        </p>

        <h2>
          Ready to build
          <span> something great?</span>
        </h2>

        <p>
          Tell us about your project and let&apos;s discuss
          how SkyMark can help bring your ideas to life.
        </p>

        <Link
          href="/contact"
          className="button button-primary"
        >
          Start a Project →
        </Link>

      </section>

    </main>
  );
}