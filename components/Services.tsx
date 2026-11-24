import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Modern websites, e-commerce platforms and web applications designed to help businesses grow and succeed online.",
    icon: "⌘",
    features: ["Business Websites", "Web Applications", "E-commerce"],
  },
  {
    number: "02",
    title: "Video & Content",
    description:
      "Professional video production, editing and creative content that captures attention and tells your brand's story.",
    icon: "▶",
    features: ["Video Production", "Video Editing", "Social Media Content"],
  },
  {
    number: "03",
    title: "Digital Marketing",
    description:
      "Strategic digital marketing solutions that connect your business with the right audience and build your online presence.",
    icon: "↗",
    features: ["Social Media", "Digital Strategy", "Online Advertising"],
  },
  {
    number: "04",
    title: "Branding & Design",
    description:
      "Distinctive visual identities and creative designs that communicate your brand's personality and make it memorable.",
    icon: "✳",
    features: ["Logo Design", "Brand Identity", "Graphic Design"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="services section"
      aria-labelledby="services-title"
    >
      <div className="services-container">

        {/* SECTION HEADER */}

        <div className="section-header">

          <p className="section-label">
            WHAT WE DO
          </p>

          <h2 id="services-title">
            Solutions designed for
            <span> your next level</span>
          </h2>

          <p className="services-intro">
            We combine technology, creativity and strategy
            to help businesses build stronger brands and
            achieve meaningful digital growth.
          </p>

        </div>


        {/* SERVICES GRID */}

        <div className="services-grid">

          {services.map((service) => (

            <article
              className="service-card"
              key={service.number}
            >

              <div className="service-card-top">

                <span className="service-number">
                  {service.number}
                </span>

                <span
                  className="service-icon"
                  aria-hidden="true"
                >
                  {service.icon}
                </span>

              </div>


              <div className="service-card-content">

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

              </div>


              <div className="service-features">

                {service.features.map((feature) => (

                  <span key={feature}>
                    <span className="service-feature-dot"></span>
                    {feature}
                  </span>

                ))}

              </div>


              <Link
                href="/contact"
                className="service-link"
                aria-label={`Learn more about ${service.title}`}
              >
                Discuss your project
                <span>↗</span>
              </Link>

            </article>

          ))}

        </div>


        {/* BOTTOM MESSAGE */}

        <div className="services-bottom">

          <p>
            Have a different idea in mind?
            <span> Let's make it happen.</span>
          </p>

          <Link href="/contact">
            Let's Talk <span>↗</span>
          </Link>

        </div>

      </div>
    </section>
  );
}