"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleThemeChange() {
    toggleTheme();
    closeMenu();
  }

  const themeLabel = theme === "dark" ? "Light mode" : "Dark mode";
  const themeIcon = theme === "dark" ? "☀" : "☾";

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}

        <Link
          href="/"
          className="logo"
          onClick={closeMenu}
          aria-label="SkyMark Home"
        >
          SKY<span>MARK</span>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav className="nav-links">
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/#services" onClick={closeMenu}>Services</Link>
          <Link href="/#portfolio" onClick={closeMenu}>Portfolio</Link>
          <Link href="/about" onClick={closeMenu}>About</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
        </nav>

        {/* DESKTOP ACTIONS */}

        <div className="nav-actions">

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={themeLabel}
          >
            <span className="theme-toggle-icon">{themeIcon}</span>
            <span className="theme-toggle-text">{themeLabel}</span>
          </button>

          <Link href="/login" className="login-link">
            Login
          </Link>

          <Link href="/contact" className="nav-button">
            Start a Project <span>↗</span>
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          className="mobile-menu-button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE NAVIGATION */}

      {menuOpen && (
        <div className="mobile-menu">

          <nav className="mobile-nav-links">
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/#services" onClick={closeMenu}>Services</Link>
            <Link href="/#portfolio" onClick={closeMenu}>Portfolio</Link>
            <Link href="/about" onClick={closeMenu}>About</Link>
            <Link href="/contact" onClick={closeMenu}>Contact</Link>
          </nav>

          <div className="mobile-nav-actions">

            <button
              type="button"
              className="theme-toggle mobile-theme-toggle"
              onClick={handleThemeChange}
            >
              <span className="theme-toggle-icon">{themeIcon}</span>
              <span>{themeLabel}</span>
            </button>

            <Link
              href="/login"
              className="mobile-login-link"
              onClick={closeMenu}
            >
              Login
            </Link>

            <Link
              href="/contact"
              className="mobile-nav-button"
              onClick={closeMenu}
            >
              Start a Project ↗
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}