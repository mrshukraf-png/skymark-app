import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="legal-page">
        <div className="legal-container">
          <p className="section-label">PRIVACY POLICY</p>
          <h1>Privacy at SkyMark</h1>

          <div className="legal-content">
            <section>
              <h2>1. Information we collect</h2>
              <p>
                We collect information that helps us understand your business, answer your
                inquiries, and deliver our services effectively. This may include your name,
                email address, company name, project brief, and relevant communication details.
              </p>
            </section>

            <section>
              <h2>2. How we use your information</h2>
              <p>
                We use your information to respond to project inquiries, manage client work,
                deliver marketing or creative services, maintain business records, and improve
                the quality of our communication and execution.
              </p>
            </section>

            <section>
              <h2>3. Data protection</h2>
              <p>
                We take reasonable measures to protect personal information from unauthorized
                access, use, or disclosure. We do not sell your information to third parties.
              </p>
            </section>

            <section>
              <h2>4. Contact</h2>
              <p>
                If you have any questions about this policy, please contact us at
                skymark@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
