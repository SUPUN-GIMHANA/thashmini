import theme from "../styles/theme";
import FadeIn from "./FadeIn";

const HIGHLIGHTS = [
  ["📍", "Colombo, Sri Lanka"],
  ["🎓", "BSc (Hons) IT for Business"],
  ["🌐", "English & Sinhala"],
  ["🏛️", "IEEE Member 2025"],
];

const STATS = [
  ["6+", "Projects Completed"],
  ["2+", "Years of Study"],
  ["10+", "Tech Skills"],
  ["IEEE", "Active Member"],
];

const QUALIFICATION_SUMMARY =
  "Highly motivated Information Systems student with expertise in Business Analysis, Product Management, and Project Management. Proven track record in translating complex business problems into functional technical solutions through market research, requirements engineering, and data-driven insights using Power BI. Experienced in managing product backlogs within Agile/Scrum frameworks and analyzing ERP systems to drive operational efficiency. Adept at bridging the gap between stakeholders and technical teams to deliver high-quality, user-centric software solutions.";

const RESPONSIBILITIES = [
  "Support coordination and follow-up of training and certification programs, including domain and upskilling initiatives.",
  "Assist in monitoring competency framework activities by tracking program status, coordinating assessments, and supporting results analysis.",
  "Help coordinate individual training plans and maintain related documentation and trackers.",
  "Support KPI monitoring through data collection, tracking, and follow-ups with relevant teams.",
  "Assist in consolidating and maintaining KPI-related data for reporting purposes.",
  "Coordinate logistics and readiness for university engagement programs such as career fairs and sessions.",
  "Support preparation of management reports by collecting and organizing cross-functional data.",
  "Assist in maintaining dashboards, trackers, and status updates for ongoing programs.",
  "Provide coordination support for cross-functional initiatives, including technology lifecycle activities.",
  "Perform general administrative and project coordination tasks as required.",
  "Engage with stakeholders to understand business requirements and document them effectively.",
  "Regularly communicate project progress to stakeholders, including clients.",
  "Manage requirement changes efficiently and communicate impacts to stakeholders.",
  "Represent the client to internal teams while providing leadership, guidance, and support for business requirements.",
  "Manage multiple projects and tasks in parallel.",
  "Assist in gathering and documenting business requirements.",
  "Coordinate business and technical activities with cross-functional teams.",
  "Attend meetings to understand project objectives and scope.",
  "Help translate requirements into functional specifications.",
  "Support the creation of project documentation.",
  "Contribute to continuous improvement of business analysis practices, tools, and methodologies.",
];

function About() {
  const s = theme;

  return (
    <section
      id="about"
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
            About Me
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: "3.5rem",
              alignItems: "start",
            }}
          >
            {/* Bio */}
            <div>
              <h2
                style={{
                  fontSize: "clamp(1.8rem,3.5vw,2.5rem)",
                  fontFamily: "Georgia,serif",
                  marginBottom: "1.5rem",
                  lineHeight: 1.2,
                }}
              >
                Bridging Business
                <br />
                &amp; Technology
              </h2>

              <p style={{ color: s.muted, marginBottom: "1rem", lineHeight: 1.7 }}>
                I'm a motivated Information Systems undergraduate at NIBM
                (Coventry University, UK) with a strong foundation in business
                analysis, system design, and data analytics.
              </p>
              <p style={{ color: s.muted, marginBottom: "1rem", lineHeight: 1.7 }}>
                Through my diploma and higher diploma projects I've gained
                hands-on experience in requirements gathering, UML modeling, UI
                wireframing, Power BI dashboards, and Agile/Scrum
                methodologies.
              </p>
              <p
                style={{ color: s.muted, marginBottom: "1.5rem", lineHeight: 1.7 }}
              >
                I thrive at the intersection of business problems and technical
                solutions — turning complex requirements into clear, actionable
                system designs.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {HIGHLIGHTS.map(([icon, label]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: s.muted,
                      fontSize: "0.85rem",
                    }}
                  >
                    <span style={{ color: s.accent }}>{icon}</span> {label}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "1.8rem",
                  background: s.bg3,
                  border: s.border,
                  borderRadius: "12px",
                  padding: "1rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.95rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: s.accent,
                    marginBottom: "0.7rem",
                  }}
                >
                  Professional Summary
                </h3>
                <p style={{ color: s.muted, lineHeight: 1.7, marginBottom: 0 }}>
                  {QUALIFICATION_SUMMARY}
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {STATS.map(([num, label]) => (
                <div
                  key={label}
                  style={{
                    background: s.bg3,
                    border: s.border,
                    borderRadius: "12px",
                    padding: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.2rem",
                      fontFamily: "Georgia,serif",
                      color: s.accent,
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </div>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: s.muted,
                      marginTop: "6px",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}

              <div
                style={{
                  gridColumn: "1 / -1",
                  background: s.bg3,
                  border: s.border,
                  borderRadius: "12px",
                  padding: "1.2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.95rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: s.accent,
                    marginBottom: "0.8rem",
                  }}
                >
                  Key Qualifications & Responsibilities
                </h3>

                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "1.1rem",
                    color: s.muted,
                    lineHeight: 1.7,
                    display: "grid",
                    gap: "0.5rem",
                  }}
                >
                  {RESPONSIBILITIES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default About;
