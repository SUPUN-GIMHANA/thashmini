import theme from "../styles/theme";
import FadeIn from "./FadeIn";
import { PROJECTS } from "../data/portfolioData";

function ProjectCard({ project }) {
  const s = theme;
  const p = project;

  return (
    <div
      style={{
        background: s.bg3,
        border: s.border,
        borderRadius: "16px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "border-color 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(63,207,142,0.4)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(63,207,142,0.15)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Number */}
      <div
        style={{
          fontSize: "3rem",
          fontFamily: "Georgia,serif",
          color: "rgba(63,207,142,0.18)",
          lineHeight: 1,
          marginBottom: "0.5rem",
        }}
      >
        {p.num}
      </div>

      {/* Badge */}
      <div
        style={{
          display: "inline-block",
          alignSelf: "flex-start",
          background: "rgba(63,207,142,0.1)",
          border: "1px solid rgba(63,207,142,0.2)",
          color: s.accent,
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "2px 10px",
          borderRadius: "100px",
          marginBottom: "0.75rem",
        }}
      >
        {p.badge}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "1.05rem",
          fontWeight: 600,
          marginBottom: "0.75rem",
          lineHeight: 1.3,
        }}
      >
        {p.title}
      </h3>

      {/* Description */}
      <p
        style={{
          color: s.muted,
          fontSize: "0.875rem",
          lineHeight: 1.65,
          flex: 1,
        }}
      >
        {p.desc}
      </p>

      {/* Tags */}
      <div
        style={{
          marginTop: "1.25rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        {p.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: s.muted,
              fontSize: "0.73rem",
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

function Projects() {
  const s = theme;

  return (
    <section
      id="projects"
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
            Projects
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem,3.5vw,2.5rem)",
              fontFamily: "Georgia,serif",
              marginBottom: "2.5rem",
              lineHeight: 1.2,
            }}
          >
            Things I've Built
          </h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "1.5rem",
          }}
        >
          {PROJECTS.map((project, i) => (
            <FadeIn key={project.num} delay={i * 80}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
