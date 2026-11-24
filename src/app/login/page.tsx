"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Invalid email or password.");
      }

      const next = searchParams.get("next") || "/admin";
      router.push(next);
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to sign in right now."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="login-page">
        <section className="login-shell">
          <div className="login-panel">
            <p className="section-label">SKYMARK ACCESS</p>
            <h1>Welcome back.</h1>
            <p className="login-copy">
              Sign in to manage projects, client work, and campaign delivery.
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  autoComplete="username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </div>

              {error && <p className="login-error">{error}</p>}

              <button
                type="submit"
                className="button button-primary login-button"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
