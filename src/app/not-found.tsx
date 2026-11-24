import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <p className="section-label">404</p>
        <h1>Page not found.</h1>
        <p>
          The page you are looking for may have moved or no longer exists.
        </p>
        <Link href="/" className="button button-primary">
          Return home
        </Link>
      </div>
    </main>
  );
}
