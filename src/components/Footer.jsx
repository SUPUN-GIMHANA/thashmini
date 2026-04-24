import theme from "../styles/theme";

function Footer() {
  const s = theme;

  return (
    <footer
      style={{
        background: s.bg,
        borderTop: s.border,
        textAlign: "center",
        padding: "2rem",
        color: s.muted,
        fontSize: "0.85rem",
      }}
    >
      Crafted with care by{" "}
      <span style={{ color: s.accent }}>Thashmini Jayasooriya</span> ·
      2025
    </footer>
  );
}

export default Footer;
