import theme from "../styles/theme";
import FadeIn from "./FadeIn";
import { EDUCATION } from "../data/portfolioData";

function Education() {
  const s = theme;

  return (
    <section
      id="education"
      style={{ padding: "5rem clamp(1rem,5vw,3rem)", background: s.bg }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
            Education
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem,3.5vw,2.5rem)",
              fontFamily: "Georgia,serif",
              marginBottom: "2.5rem",
              lineHeight: 1.2,
            }}
          >
            Academic Journey
          </h2>
        </FadeIn>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "8px",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "rgba(63,207,142,0.2)",
            }}
          />

          {EDUCATION.map((edu, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div style={{ position: "relative", marginBottom: "2.5rem" }}>
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-2.1rem",
                    top: "6px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: s.accent,
                    border: `2px solid ${s.bg}`,
                    boxShadow: "0 0 0 4px rgba(63,207,142,0.12)",
                  }}
                />

                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: s.accent,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  {edu.period}
                </div>

                <div
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    marginBottom: "4px",
                    fontFamily: "Georgia,serif",
                  }}
                >
                  {edu.degree}
                </div>

                <div
                  style={{
                    color: s.accent,
                    fontSize: "0.88rem",
                    marginBottom: "6px",
                  }}
                >
                  {edu.school}
                </div>

                <div
                  style={{ color: s.muted, fontSize: "0.82rem", lineHeight: 1.6 }}
                >
                  {edu.details}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
