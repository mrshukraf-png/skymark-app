import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="legal-page">
        <div className="legal-container">
          <p className="section-label">TERMS OF SERVICE</p>
          <h1>Working with SkyMark</h1>

          <div className="legal-content">
            <section>
              <h2>1. Scope of work</h2>
              <p>
                These terms outline the working relationship between SkyMark and the client.
                Project scope, timelines, milestones, and deliverables should be agreed before
                work begins.
              </p>
            </section>

            <section>
              <h2>2. Payment and timelines</h2>
              <p>
                Fees and payment schedules are discussed during the proposal stage. Any deferred
                or additional work outside the agreed scope may require a revised quote and new
                timeline.
              </p>
            </section>

            <section>
              <h2>3. Client responsibilities</h2>
              <p>
                Clients are expected to provide timely feedback, required content, approvals,
                and relevant assets needed to complete the project without unnecessary delay.
              </p>
            </section>

            <section>
              <h2>4. Intellectual property</h2>
              <p>
                Final approved assets belong to the client, while SkyMark may retain internal
                examples and portfolio references unless otherwise agreed in writing.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
