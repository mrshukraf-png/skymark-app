import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* =====================================
            BRAND
        ===================================== */}

        <div className="footer-brand">

          <Link
            href="/"
            className="footer-logo"
          >
            SKY<span>MARK</span>
          </Link>

          <p>
            Digital solutions for businesses
            ready to grow.
          </p>

        </div>

        {/* =====================================
            CTA
        ===================================== */}

        <div className="footer-cta">

          <p>
            Ready to grow your business?
          </p>

          <Link
            href="/contact"
            className="footer-button"
          >
            Start a Project →
          </Link>

        </div>

      </div>


      {/* =====================================
          FOOTER BOTTOM
      ===================================== */}

      <div className="footer-bottom">

        <p>
          © {year} SkyMark.
          All rights reserved.
        </p>

        <div className="footer-bottom-links">

          <Link href="/privacy">
            Privacy Policy
          </Link>

          <Link href="/terms">
            Terms
          </Link>

        </div>

      </div>

    </footer>
  );
}