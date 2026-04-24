import { useState } from "react";
import theme from "../styles/theme";
import { NAV_LINKS } from "../data/portfolioData";
import useActiveSection from "../hooks/useActiveSection";

function scrollTo(id, setMenuOpen) {
  const el = document.getElementById(id.toLowerCase());
  if (el) el.scrollIntoView({ behavior: "smooth" });
  setMenuOpen(false);
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const s = theme;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 clamp(1rem,4vw,2.5rem)",
          height: "60px",
          background: "rgba(11,15,14,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: s.border,
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            color: s.accent,
            letterSpacing: "0.04em",
          }}
        >
          TN
        </span>

        {/* Desktop links */}
        <div
          className="desktop-nav"
          style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link, setMenuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color:
                  activeSection === link.toLowerCase() ? s.accent : s.muted,
                fontSize: "0.88rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                transition: "color 0.2s",
                padding: "4px 0",
                borderBottom:
                  activeSection === link.toLowerCase()
                    ? `2px solid ${s.accent}`
                    : "2px solid transparent",
              }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          id="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: s.text,
                borderRadius: "2px",
                transform:
                  menuOpen && i === 0
                    ? "rotate(45deg) translate(5px,5px)"
                    : menuOpen && i === 2
                    ? "rotate(-45deg) translate(5px,-5px)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
                transition: "all 0.25s",
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "60px",
            left: 0,
            right: 0,
            zIndex: 999,
            background: s.bg2,
            borderBottom: s.border,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link, setMenuOpen)}
              style={{
                background: "none",
                border: "none",
                borderBottom: s.border,
                color: s.text,
                fontSize: "1rem",
                fontWeight: 500,
                padding: "1rem 1.5rem",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default Navbar;
