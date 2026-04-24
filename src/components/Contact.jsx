import theme from "../styles/theme";
import FadeIn from "./FadeIn";
import {
  CONTACT_LINKS,
  CERTIFICATIONS,
  REFERENCES,
} from "../data/portfolioData";

function Contact() {
  const s = theme;

  return (
    <section
      id="contact"
      style={{ padding: "5rem clamp(1rem,5vw,3rem)", background: s.bg2 }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <FadeIn>
          <div
            style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: s.accent,
              marginBottom: "0.5rem",
            }}
          >
            Contact
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem,3.5vw,2.5rem)",
              fontFamily: "Georgia,serif",
              marginBottom: "2.5rem",
              lineHeight: 1.2,
            }}
          >
            Let's Work Together
          </h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "3.5rem",
          }}
        >
          {/* Left – contact links */}
          <div>
            <p
              style={{
                color: s.muted,
                marginBottom: "2rem",
                lineHeight: 1.7,
                fontSize: "1rem",
              }}
            >
              I'm actively looking for internship opportunities in business
              analysis, data analytics, or system design. Feel free to reach out
              — I'd love to connect!
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {CONTACT_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    background: s.bg3,
                    border: s.border,
                    borderRadius: "11px",
                    padding: "1rem 1.25rem",
                    textDecoration: "none",
                    color: s.text,
                    transition: "border-color 0.2s, transform 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(63,207,142,0.45)";
                    e.currentTarget.style.transform = "translateX(5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(63,207,142,0.15)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "9px",
                      background: "rgba(63,207,142,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: s.muted,
                        marginBottom: "2px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right – certifications + references */}
          <div>
            <h3
              style={{
                fontSize: "1.2rem",
                fontFamily: "Georgia,serif",
                marginBottom: "1.25rem",
              }}
            >
              Certifications &amp; Community
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                marginBottom: "2rem",
              }}
            >
              {CERTIFICATIONS.map(({ type, text }) => (
                <div
                  key={text}
                  style={{
                    background: s.bg3,
                    border: s.border,
                    borderRadius: "10px",
                    padding: "0.9rem 1.2rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: s.accent,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "4px",
                    }}
                  >
                    {type}
                  </div>
                  <div
                    style={{ fontSize: "0.88rem", color: s.muted, lineHeight: 1.5 }}
                  >
                    {text}
                  </div>
                </div>
              ))}
            </div>

            <h3
              style={{
                fontSize: "1.2rem",
                fontFamily: "Georgia,serif",
                marginBottom: "1.25rem",
              }}
            >
              References
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {REFERENCES.map(({ name, role, email }) => (
                <div
                  key={name}
                  style={{
                    background: s.bg3,
                    border: s.border,
                    borderRadius: "10px",
                    padding: "0.9rem 1.2rem",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      marginBottom: "2px",
                    }}
                  >
                    {name}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: s.muted }}>
                    {role}
                  </div>
                  <a
                    href={`mailto:${email}`}
                    style={{
                      fontSize: "0.78rem",
                      color: s.accent,
                      textDecoration: "none",
                    }}
                  >
                    {email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
