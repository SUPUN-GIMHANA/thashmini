import theme from "../styles/theme";
import FadeIn from "./FadeIn";
import { SKILLS } from "../data/portfolioData";

function SkillCard({ skill }) {
  const s = theme;

  return (
    <div
      style={{
        background: "rgba(21,32,25,0.9)",
        border: s.border,
        borderRadius: "14px",
        padding: "1.5rem",
        height: "100%",
        transition: "border-color 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(63,207,142,0.45)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(63,207,142,0.15)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "9px",
          background: "rgba(63,207,142,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          marginBottom: "1rem",
        }}
      >
        {skill.icon}
      </div>

      <h3
        style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "1rem" }}
      >
        {skill.title}
      </h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {skill.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "rgba(63,207,142,0.07)",
              border: "1px solid rgba(63,207,142,0.18)",
              color: s.accent,
              fontSize: "0.75rem",
              fontWeight: 500,
              padding: "3px 10px",
              borderRadius: "100px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const s = theme;

  return (
    <section
      id="skills"
      style={{ padding: "5rem clamp(1rem,5vw,3rem)", background: s.bg }}
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
            Technical Skills
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem,3.5vw,2.5rem)",
              fontFamily: "Georgia,serif",
              marginBottom: "2.5rem",
              lineHeight: 1.2,
            }}
          >
            What I Work With
          </h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "1.25rem",
          }}
        >
          {SKILLS.map((skill, i) => (
            <FadeIn key={skill.title} delay={i * 80}>
              <SkillCard skill={skill} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
