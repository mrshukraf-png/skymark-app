"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Dashboard", href: "/admin", icon: "▦" },
    { name: "Projects", href: "/admin/projects", icon: "▣" },
    { name: "Tasks", href: "/admin/tasks", icon: "✓" },
    { name: "Clients", href: "/admin/clients", icon: "♙" },
   
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        className="admin-mobile-menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={closeMenu}
          aria-label="Close navigation"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`admin-sidebar ${menuOpen ? "is-open" : ""}`}
      >
        <div className="admin-sidebar-logo">
          <div className="admin-logo-mark">S</div>

          <div>
            <strong>SkyMark</strong>
            <span>MANAGEMENT</span>
          </div>
        </div>

        <div className="admin-sidebar-section">
          <p>WORKSPACE</p>

          <nav>
            {links.map((link) => {
              const isActive =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={
                    isActive
                      ? "admin-nav-link active"
                      : "admin-nav-link"
                  }
                >
                  <span className="admin-nav-icon">
                    {link.icon}
                  </span>

                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="admin-sidebar-bottom">
          <Link
            href="/"
            className="admin-nav-link"
            onClick={closeMenu}
          >
            <span className="admin-nav-icon">←</span>
            <span>Back to Website</span>
          </Link>

          <div className="admin-user">
            <div className="admin-user-avatar">S</div>

            <div>
              <strong>Admin</strong>
              <span>SkyMark</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}