import Link from "next/link";

const projects = [
  {
    slug: "skymark",
    title: "Website development",
    category: "Web Development",
    description:
      "A digital marketing agency website showcasing digital solutions, branding and creative services.",
    image: "/img/business%20.jpg",
    label: "Agency Website",
    number: "01",
  },
  {
    slug: "aurant",
    title: "Photography and video production",
    category: "Photography & Galleries",
    description:
      "A photography platform reference for presenting visual content and online galleries.",
    image: "/img/second%20video%20production.jpg",
    label: "Photography Platform",
    number: "02",
  },
  {
    slug: "comsat",
    title: "Digital marketing ",
    category: "Technology & Communications",
    description:
      "A technology-focused website reference covering digital and telecommunications services.",
    image: "/img/second%20digital%20marketing.webp",
    label: "Technology Website",
    number: "03",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="portfolio section"
      aria-labelledby="portfolio-title"
    >
      <div className="portfolio-container">

        {/* SECTION HEADER */}

        <div className="portfolio-header">

          <div>
            <p className="section-label">
              SELECTED WORK & INSPIRATION
            </p>

            <h2 id="portfolio-title">
              Projects that make
              <span> an impact</span>
            </h2>
          </div>

          <p className="portfolio-intro">
            Discover digital experiences, creative concepts
            and technology-driven solutions that demonstrate
            what's possible.
          </p>

        </div>


        {/* PROJECT GRID */}

        <div className="portfolio-grid">

          {projects.map((project) => (

            <article
              className="project-card"
              key={project.slug}
            >

              {/* PROJECT IMAGE */}

              <Link
                href={`/portfolio/${project.slug}`}
                className="project-image project-image-link"
                style={{
                  backgroundImage: `url("${project.image}")`,
                }}
                aria-label={`View ${project.title} project`}
              >

                <span className="project-category">
                  {project.category}
                </span>

                <span className="project-image-arrow">
                  ↗
                </span>

              </Link>


              {/* PROJECT INFORMATION */}

              <div className="project-info">

                <div className="project-info-top">

                  <p className="project-label">
                    {project.label}
                  </p>

                  <span className="project-number">
                    {project.number}
                  </span>

                </div>


                <h3>
                  {project.title}
                </h3>

                <p className="project-description">
                  {project.description}
                </p>


                <Link
                  href={`/portfolio/${project.slug}`}
                  className="project-details-link"
                >
                  Explore Project
                  <span>↗</span>
                </Link>

              </div>

            </article>

          ))}

        </div>


        {/* PORTFOLIO FOOTER */}

        <div className="portfolio-bottom">

          <p>
            Every great project starts with an idea.
            <span> What's yours?</span>
          </p>

          <Link href="/contact">
            Start a Project <span>↗</span>
          </Link>

        </div>

      </div>
    </section>
  );
}