import Link from "next/link";
import { notFound } from "next/navigation";

const projects = {
skymark: {
title: "Websites & Applications",
eyebrow: "WEB DEVELOPMENT",
description:
"We design and develop modern digital experiences that help businesses establish their online presence, connect with customers and grow.",
website: "https://skymark.netlify.app/",
websiteLabel: "Explore Website",
services: [
{
title: "Business Websites",
description:
"Professional, responsive websites that introduce your business, showcase your services and build trust with potential customers.",
},
{
title: "E-commerce Websites",
description:
"Online stores designed to showcase products, support online shopping and help businesses sell their products digitally.",
},
{
title: "Web Applications",
description:
"Interactive web applications tailored to business needs, from dashboards and booking systems to custom digital tools.",
},
{
title: "Landing Pages",
description:
"Focused, conversion-oriented pages for campaigns, products, promotions and lead generation.",
},
{
title: "Responsive Design",
description:
"Web experiences designed to work smoothly across desktop computers, tablets and smartphones.",
},
{
title: "Website Redesign",
description:
"Refresh an existing website with an improved layout, clearer content and a more modern visual identity.",
},
],
galleryTitle: "Web Design & Development",
galleryDescription:
"A dedicated space for screenshots of websites, application interfaces and responsive designs.",
images: [
{
src: "/img/comsat%20.png",
alt: "Website project preview",
caption: "Website Design",
},
{
src: "/img/comsat.png",
alt: "Digital project preview",
caption: "Digital Experience",
},
{
src: "/img/travel%20tracker.png",
alt: "Creative project preview",
caption: "Creative Direction",
},
],
videos: [],
},

aurant: {
title: "Photography & Visual Experiences",
eyebrow: "PHOTOGRAPHY & GALLERIES",
description:
"Explore visual experiences for photographers, creatives and businesses that want to present their images and content professionally.",
website: "https://aurant.io/",
websiteLabel: "Explore Aurant",
services: [
{
title: "Photography Websites",
description:
"Elegant websites that help photographers showcase their portfolios and present their visual identity.",
},
{
title: "Online Galleries",
description:
"Organised image galleries that make it easier for visitors to browse and appreciate visual content.",
},
{
title: "Creative Portfolios",
description:
"Visual portfolios designed to present photography, creative projects and selected work.",
},
{
title: "Responsive Image Layouts",
description:
"Layouts that adapt to different screen sizes while keeping images clear and visually appealing.",
},
],
galleryTitle: "Visual Inspiration",
galleryDescription:
"Add your own photography, gallery screenshots and visual presentation examples here.",
images: [
{
src: "/img/second%20digital%20marketing.webp",
alt: "Photography and gallery preview",
caption: "Visual Presentation",
},
{
src: "/img/business%20.jpg",
alt: "Website layout preview",
caption: "Digital Portfolio",
},
],
videos: [],
},

comsat: {
title: "Technology & Digital Solutions",
eyebrow: "TECHNOLOGY",
description:
"Discover technology-focused digital experiences and the opportunities available when businesses combine technology with effective online communication.",
website: "https://comsat.co.za/",
websiteLabel: "Explore Comsat",
services: [
{
title: "Technology Websites",
description:
"Professional websites that explain technical products, services and solutions in a clear and accessible way.",
},
{
title: "Business Digital Presence",
description:
"Structured digital experiences that help technology businesses communicate their expertise and services.",
},
{
title: "Custom Web Solutions",
description:
"Web-based tools and interfaces designed around specific business processes and customer needs.",
},
{
title: "Service Presentation",
description:
"Clear service pages that help visitors understand what a business offers and how to get in touch.",
},
],
galleryTitle: "Technology & Interfaces",
galleryDescription:
"Add screenshots of technology websites, interfaces and relevant projects here.",
images: [
{
src: "/img/faceboock%20digital%20marketing.png",
alt: "Technology project preview",
caption: "Digital Solutions",
},
{
src: "/img/instagram%20digital%20marketing.png",
alt: "Business website preview",
caption: "Business Interface",
},
],
videos: [],
},

picha: {
title: "Digital Platforms",
eyebrow: "DIGITAL PLATFORMS",
description:
"Explore digital platforms and user experiences that bring information, services and digital functionality together in one place.",
website: "https://picha.io/",
websiteLabel: "Explore Picha",
services: [
{
title: "Interactive Platforms",
description:
"Digital experiences that allow users to navigate information and interact with online services.",
},
{
title: "User Interface Design",
description:
"Clear, consistent interfaces designed to make digital products easier to understand and use.",
},
{
title: "Platform Websites",
description:
"Structured websites that bring together content, services and useful functionality.",
},
{
title: "Responsive Experiences",
description:
"Layouts designed to remain accessible and usable across desktop and mobile devices.",
},
],
galleryTitle: "Digital Experiences",
galleryDescription:
"Add screenshots of platform interfaces, website pages and digital product demonstrations here.",
images: [
{
src: "/img/business%20.jpg",
alt: "Digital platform preview",
caption: "Digital Experience",
},
{
src: "/img/second%20digital%20marketing.webp",
alt: "Website interface preview",
caption: "Interface Design",
},
],
videos: [],
},
};

type ProjectSlug = keyof typeof projects;

export function generateStaticParams() {
return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function ProjectPage({
params,
}: {
params: Promise<{ slug: string }>;
}) {
const { slug } = await params;

if (!Object.prototype.hasOwnProperty.call(projects, slug)) {
notFound();
}

const project = projects[slug as ProjectSlug];

return ( <main className="project-detail-page"> <div className="project-detail-container"> <Link href="/#portfolio" className="project-back-link">
← Back to Home </Link>


    <header className="project-detail-header">
      <p className="section-label">{project.eyebrow}</p>

      <h1>{project.title}</h1>

      <p>{project.description}</p>

      <div className="project-actions">
        <Link href="/contact" className="button-primary">
          Start Your Project ↗
        </Link>

        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="project-website-link"
        >
          {project.websiteLabel} ↗
        </a>
      </div>
    </header>

    <section className="project-services-section">
      <div className="section-header">
        <p className="section-label">WHAT WE CAN DO</p>
        <h2>
          Solutions designed
          <span> around your needs.</span>
        </h2>
        <p>
          Every business is different. We help turn your ideas into
          practical digital experiences.
        </p>
      </div>

      <div className="project-services-grid">
        {project.services.map((service, index) => (
          <article className="project-service-card" key={service.title}>
            <span className="project-service-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3>{service.title}</h3>

            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="project-gallery-section">
      <div className="section-header">
        <p className="section-label">VISUAL SHOWCASE</p>
        <h2>{project.galleryTitle}</h2>
        <p>{project.galleryDescription}</p>
      </div>

      <div className="project-gallery">
        {project.images.map((image, index) => (
          <figure className="project-gallery-item" key={image.src}>
            <div className="project-gallery-image">
              <img src={image.src} alt={image.alt} loading="lazy" />
            </div>

            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>

    
    <section className="project-detail-cta">
      <p className="section-label">HAVE AN IDEA?</p>
      <h2>
        Let&apos;s build something
        <span> meaningful.</span>
      </h2>
      <p>
        Tell us about your business, your goals and the digital solution
        you have in mind.
      </p>

      <Link href="/contact" className="button-primary">
        Discuss Your Project ↗
      </Link>
    </section>

    <footer className="project-detail-footer">
      <Link href="/#portfolio" className="project-back-link">
        ← Explore More
      </Link>

      <a
        href={project.website}
        target="_blank"
        rel="noopener noreferrer"
        className="project-website-link"
      >
        {project.websiteLabel} ↗
      </a>
    </footer>
  </div>
</main>


);
}
