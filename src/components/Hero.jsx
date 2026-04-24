import { useState, useEffect } from "react";
import theme from "../styles/theme";
import profilePhoto from "../assets/profile-photo.jpeg";

function Hero() {
  const [spinDeg, setSpinDeg] = useState(0);
  const s = theme;

  useEffect(() => {
    const interval = setInterval(() => setSpinDeg((d) => d + 0.5), 30);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "6rem clamp(1rem,5vw,3rem) 4rem",
        background: `radial-gradient(ellipse at 70% 40%, rgba(63,207,142,0.04) 0%, transparent 60%), ${s.bg}`,
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        {/* Text */}
        <div>
          <div
            style={{
              display: "inline-block",
              background: "rgba(63,207,142,0.1)",
              border: s.border,
              color: s.accent,
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "0.3rem 1rem",
              borderRadius: "100px",
              marginBottom: "1.4rem",
            }}
          >
            Available for Internships
          </div>

          <h1
            style={{
              fontSize: "clamp(2.4rem,5vw,3.8rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "1.2rem",
              fontFamily: "Georgia, serif",
            }}
          >
            Thashmini Jayasooriya
          </h1>

          <p
            style={{
              color: s.muted,
              fontSize: "1.05rem",
              maxWidth: "460px",
              marginBottom: "2.2rem",
              lineHeight: 1.7,
            }}
          >
            Information Systems undergraduate passionate about business
            analysis, data analytics & system design — bridging the gap between
            business needs and technical solutions.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("projects")}
              style={{
                background: s.accent,
                color: "#0b0f0e",
                border: "none",
                borderRadius: "8px",
                padding: "0.78rem 1.75rem",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                background: "none",
                border: `1.5px solid ${s.accent}`,
                color: s.accent,
                borderRadius: "8px",
                padding: "0.78rem 1.75rem",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(63,207,142,0.08)")
              }
              onMouseLeave={(e) => (e.target.style.background = "none")}
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Spinning avatar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{ position: "relative", width: "260px", height: "260px" }}
          >
            {/* Spinning ring */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                transform: `rotate(${spinDeg}deg)`,
              }}
              viewBox="0 0 260 260"
            >
              <circle
                cx="130"
                cy="130"
                r="125"
                fill="none"
                stroke="rgba(63,207,142,0.15)"
                strokeWidth="1"
                strokeDasharray="6 9"
              />
              <circle cx="130" cy="5" r="5" fill={s.accent} />
            </svg>

            {/* Inner circle */}
            <div
              style={{
                position: "absolute",
                top: "18px",
                left: "18px",
                right: "18px",
                bottom: "18px",
                borderRadius: "50%",
                overflow: "hidden",
                background: s.bg2,
                border: s.border,
              }}
            >
              <img
                src={profilePhoto}
                alt="Thashmini Jayasooriya"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
