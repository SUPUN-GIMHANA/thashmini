import { useState, useEffect, useRef, useCallback } from "react";
import { PHOTOS } from "./data/photos";

/* ─── Floating Particles / Hearts ─── */
function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 6 + 2;
        this.speedY = -(Math.random() * 0.5 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.isHeart = Math.random() > 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.color =
          Math.random() > 0.5
            ? `rgba(201, 162, 75, ${this.opacity})`
            : `rgba(230, 57, 80, ${this.opacity})`;
      }
      drawHeart(ctx, x, y, size) {
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size);
        ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotSpeed;
        if (this.y < -20) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        if (this.isHeart) {
          this.drawHeart(ctx, 0, 0, this.size * 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    for (let i = 0; i < 40; i++) {
      const p = new Particle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

/* ─── Heart Burst Easter Egg ─── */
function HeartBurst({ bursts, onDone }) {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {bursts.map((b) => (
        <HeartExplosion key={b.id} x={b.x} y={b.y} onDone={() => onDone(b.id)} />
      ))}
    </div>
  );
}

function HeartExplosion({ x, y, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1500);
    return () => clearTimeout(timer);
  }, [onDone]);

  const hearts = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const dist = 60 + Math.random() * 80;
    return {
      id: i,
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist,
      size: 10 + Math.random() * 16,
      delay: Math.random() * 0.2,
      color: Math.random() > 0.5 ? "#c9a24b" : "#e63950",
    };
  });

  return (
    <>
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: "absolute",
            left: x,
            top: y,
            fontSize: h.size,
            color: h.color,
            animation: `heartBurst 1.2s ${h.delay}s ease-out forwards`,
            "--tx": h.tx + "px",
            "--ty": h.ty + "px",
            filter: `drop-shadow(0 0 6px ${h.color})`,
          }}
        >
          ♥
        </span>
      ))}
    </>
  );
}

/* ─── Navigation Dots ─── */
function NavDots({ sections, active }) {
  return (
    <nav style={navDotStyle}>
      {sections.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          title={s.label}
          style={{
            ...dotBase,
            background: active === i ? "var(--accent-gold)" : "var(--text-muted)",
            transform: active === i ? "scale(1.4)" : "scale(1)",
            boxShadow: active === i ? "var(--glow-gold)" : "none",
          }}
        />
      ))}
    </nav>
  );
}

const navDotStyle = {
  position: "fixed",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  zIndex: 100,
};

const dotBase = {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  transition: "all 0.3s ease",
  cursor: "pointer",
  border: "none",
};

/* ─── Hero Section ─── */
function Hero({ onMonogramClick }) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" style={heroSectionStyle}>
      {/* Background layers */}
      <div style={heroBgLayer1} />
      <div style={heroBgLayer2} />
      <div style={heroBgVignette} />

      {/* Decorative corner ornaments */}
      <div style={{ ...heroOrnamentStyle, top: "2.5rem", left: "2rem" }}>✦</div>
      <div style={{ ...heroOrnamentStyle, top: "2.5rem", right: "2rem" }}>✦</div>
      <div style={{ ...heroOrnamentStyle, bottom: "6rem", left: "2rem" }}>✦</div>
      <div style={{ ...heroOrnamentStyle, bottom: "6rem", right: "2rem" }}>✦</div>

      <div style={heroContentStyle}>
        {/* Decorative line above */}
        <div style={heroLineDecorStyle}>
          <span style={heroLineSideStyle} />
          <span style={heroLineDiamondStyle}>◆</span>
          <span style={heroLineSideStyle} />
        </div>

        {/* Monogram with double ring */}
        <div
          onClick={onMonogramClick}
          style={monogramOuterRingStyle}
          title="Tap me!"
        >
          <div style={monogramInnerRingStyle}>
            <span style={monogramLetterStyle}>S</span>
            <span
              style={{
                ...monogramHeartStyle,
                transform: pulse ? "scale(1.3)" : "scale(1)",
                textShadow: pulse
                  ? "0 0 40px rgba(230,57,80,0.9), 0 0 80px rgba(230,57,80,0.4)"
                  : "0 0 15px rgba(230,57,80,0.5)",
              }}
            >
              ♥
            </span>
            <span style={monogramLetterStyle}>R</span>
          </div>
        </div>

        {/* Decorative line below */}
        <div style={{ ...heroLineDecorStyle, marginTop: "2rem" }}>
          <span style={heroLineSideStyle} />
          <span style={heroLineDiamondStyle}>◆</span>
          <span style={heroLineSideStyle} />
        </div>

        <h1 style={heroHeadingStyle}>
          <span style={heroHeadingLine1Style}>Our First Year</span>
          <span style={heroHeadingLine2Style}>of Love</span>
        </h1>

        <div style={heroDateWrapStyle}>
          <span style={heroDateDashStyle}>—</span>
          <p style={heroDateStyle}>27 · 07 · 2026</p>
          <span style={heroDateDashStyle}>—</span>
        </div>

        <p style={heroTaglineStyle}>A celebration of S & R</p>

        <div style={scrollHintStyle}>
          <div style={scrollMouseStyle}>
            <div style={scrollDotStyle} />
          </div>
        </div>
      </div>
    </section>
  );
}

const heroSectionStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  background: "#0d0d0f",
};

const heroBgLayer1 = {
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(40,15,25,0.9) 0%, transparent 70%)",
};

const heroBgLayer2 = {
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(circle at 25% 35%, rgba(201,162,75,0.06) 0%, transparent 40%), radial-gradient(circle at 75% 60%, rgba(230,57,80,0.05) 0%, transparent 35%), radial-gradient(circle at 50% 80%, rgba(201,162,75,0.03) 0%, transparent 30%)",
};

const heroBgVignette = {
  position: "absolute",
  inset: 0,
  background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
};

const heroOrnamentStyle = {
  position: "absolute",
  fontSize: "0.6rem",
  color: "rgba(201,162,75,0.25)",
  zIndex: 2,
  animation: "heroFloat 6s ease-in-out infinite",
};

const heroContentStyle = {
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  padding: "0 2rem",
  animation: "heroFadeIn 1.5s ease forwards",
  opacity: 0,
};

const heroLineDecorStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  marginBottom: "2rem",
  animation: "heroFadeIn 1.8s 0.3s ease forwards",
  opacity: 0,
};

const heroLineSideStyle = {
  display: "inline-block",
  width: "60px",
  height: "1px",
  background: "linear-gradient(90deg, transparent, rgba(201,162,75,0.5), transparent)",
};

const heroLineDiamondStyle = {
  color: "rgba(201,162,75,0.4)",
  fontSize: "0.5rem",
};

const monogramOuterRingStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "clamp(180px, 40vw, 240px)",
  height: "clamp(180px, 40vw, 240px)",
  borderRadius: "50%",
  border: "1px solid rgba(201,162,75,0.25)",
  cursor: "pointer",
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
  position: "relative",
  boxShadow: "0 0 60px rgba(201,162,75,0.08), 0 0 120px rgba(230,57,80,0.05)",
  animation: "monogramGlow 4s ease-in-out infinite",
};

const monogramInnerRingStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "calc(100% - 16px)",
  height: "calc(100% - 16px)",
  borderRadius: "50%",
  border: "1px solid rgba(201,162,75,0.15)",
  background: "radial-gradient(circle, rgba(201,162,75,0.04) 0%, rgba(230,57,80,0.02) 60%, transparent 100%)",
  fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
  fontFamily: "var(--font-heading)",
  gap: "0.3rem",
};

const monogramLetterStyle = {
  color: "var(--accent-gold)",
  fontWeight: 700,
  textShadow: "0 0 25px rgba(201,162,75,0.4), 0 2px 4px rgba(0,0,0,0.3)",
};

const monogramHeartStyle = {
  color: "var(--accent-crimson)",
  fontSize: "0.7em",
  transition: "all 0.6s ease",
  textShadow: "0 0 15px rgba(230,57,80,0.5)",
};

const heroHeadingStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "1.5rem",
  marginBottom: "0.5rem",
};

const heroHeadingLine1Style = {
  fontFamily: "var(--font-heading)",
  fontSize: "clamp(1.4rem, 4.5vw, 2.6rem)",
  fontWeight: 400,
  fontStyle: "italic",
  color: "var(--text-primary)",
  display: "block",
  animation: "heroSlideUp 1s 0.4s ease forwards",
  opacity: 0,
  letterSpacing: "0.02em",
};

const heroHeadingLine2Style = {
  fontFamily: "var(--font-heading)",
  fontSize: "clamp(1.6rem, 5.5vw, 3rem)",
  fontWeight: 700,
  fontStyle: "italic",
  background: "linear-gradient(135deg, var(--accent-gold), #f4d79a, var(--accent-crimson))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  display: "block",
  animation: "heroSlideUp 1s 0.6s ease forwards",
  opacity: 0,
  letterSpacing: "0.04em",
};

const heroDateWrapStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  marginTop: "0.75rem",
  animation: "heroFadeIn 1s 0.9s ease forwards",
  opacity: 0,
};

const heroDateDashStyle = {
  color: "rgba(201,162,75,0.3)",
  fontSize: "0.9rem",
};

const heroDateStyle = {
  fontSize: "1rem",
  color: "var(--text-secondary)",
  letterSpacing: "0.35em",
  fontWeight: 300,
  fontFamily: "var(--font-body)",
};

const heroTaglineStyle = {
  marginTop: "0.5rem",
  fontSize: "0.8rem",
  color: "var(--text-muted)",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  fontWeight: 300,
  animation: "heroFadeIn 1s 1.1s ease forwards",
  opacity: 0,
};

const scrollHintStyle = {
  marginTop: "3rem",
  display: "flex",
  justifyContent: "center",
  animation: "heroFadeIn 1s 1.5s ease forwards",
  opacity: 0,
};

const scrollMouseStyle = {
  width: "22px",
  height: "34px",
  border: "1.5px solid rgba(201,162,75,0.35)",
  borderRadius: "11px",
  display: "flex",
  justifyContent: "center",
  paddingTop: "6px",
};

const scrollDotStyle = {
  width: "3px",
  height: "8px",
  borderRadius: "2px",
  background: "var(--accent-gold)",
  animation: "scrollDot 2s ease-in-out infinite",
};

/* ─── Countdown Section ─── */
function Countdown() {
  const target = new Date("2026-07-27T00:00:00").getTime();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = target - now;
  const past = diff <= 0;

  const days = past ? 0 : Math.floor(diff / 86400000);
  const hours = past ? 0 : Math.floor((diff % 86400000) / 3600000);
  const minutes = past ? 0 : Math.floor((diff % 3600000) / 60000);
  const seconds = past ? 0 : Math.floor((diff % 60000) / 1000);

  return (
    <section id="countdown" className="fade-in">
      <h2 className="section-title">{past ? "Happy Anniversary" : "Counting Down"}</h2>
      <p className="section-subtitle">
        {past ? "Happy Anniversary S & R 🎉" : "Until July 27, 2026"}
      </p>

      <div style={countdownGridStyle}>
        {[
          { val: days, label: "Days" },
          { val: hours, label: "Hours" },
          { val: minutes, label: "Minutes" },
          { val: seconds, label: "Seconds" },
        ].map(({ val, label }) => (
          <div key={label} style={countdownCardStyle}>
            <span style={countdownDigitStyle}>
              {String(val).padStart(2, "0")}
            </span>
            <span style={countdownLabelStyle}>{label}</span>
          </div>
        ))}
      </div>

      {past && (
        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.3rem", color: "var(--accent-gold)" }}>
          🎉 Happy 1st Anniversary, S & R! 🎉
        </p>
      )}
    </section>
  );
}

const countdownGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "0.75rem",
  maxWidth: "600px",
  margin: "0 auto",
};

const countdownCardStyle = {
  background: "var(--bg-card)",
  borderRadius: "var(--border-radius)",
  padding: "1.2rem 0.5rem",
  textAlign: "center",
  border: "1px solid rgba(201,162,75,0.15)",
  boxShadow: "var(--glow-gold)",
};

const countdownDigitStyle = {
  display: "block",
  fontFamily: "var(--font-heading)",
  fontSize: "clamp(1.8rem, 6vw, 2.8rem)",
  fontWeight: 700,
  background: "linear-gradient(135deg, var(--accent-gold), var(--accent-crimson))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const countdownLabelStyle = {
  display: "block",
  fontSize: "0.7rem",
  color: "var(--text-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginTop: "0.3rem",
};

/* ─── Photo Gallery ─── */
function Gallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const touchRef = useRef(null);

  const goTo = useCallback(
    (dir) => {
      setActive((prev) => (prev + dir + PHOTOS.length) % PHOTOS.length);
    },
    []
  );

  const handleTouchStart = (e) => {
    touchRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchRef.current === null) return;
    const diff = touchRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? 1 : -1);
    touchRef.current = null;
  };

  return (
    <section id="gallery" className="fade-in">
      <h2 className="section-title">Our Moments</h2>
      <p className="section-subtitle">Swipe to see our memories</p>

      <div
        style={carouselWrapStyle}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button onClick={() => goTo(-1)} style={carouselBtnStyle} aria-label="Previous">‹</button>

        <div style={carouselImageWrapStyle}>
          {PHOTOS.map((p, i) => (
            <img
              key={p.id}
              src={p.url}
              alt={p.alt}
              onClick={() => setLightbox(p)}
              style={{
                ...carouselImgStyle,
                opacity: i === active ? 1 : 0,
                transform: `scale(${i === active ? 1 : 0.85})`,
                zIndex: i === active ? 2 : 1,
                pointerEvents: i === active ? "auto" : "none",
              }}
            />
          ))}
        </div>

        <button onClick={() => goTo(1)} style={carouselBtnStyle} aria-label="Next">›</button>
      </div>

      <div style={dotsRowStyle}>
        {PHOTOS.map((_, i) => (
          <span
            key={i}
            onClick={() => setActive(i)}
            style={{
              ...galleryDot,
              background: i === active ? "var(--accent-gold)" : "var(--text-muted)",
            }}
          />
        ))}
      </div>

      {lightbox && (
        <div style={lightboxOverlayStyle} onClick={() => setLightbox(null)}>
          <img src={lightbox.url} alt={lightbox.alt} style={lightboxImgStyle} />
          <span style={lightboxCloseStyle}>✕</span>
        </div>
      )}
    </section>
  );
}

const carouselWrapStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  maxWidth: "500px",
  margin: "0 auto",
};

const carouselBtnStyle = {
  background: "none",
  border: "1px solid var(--accent-gold)",
  color: "var(--accent-gold)",
  fontSize: "2rem",
  cursor: "pointer",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "all 0.3s",
};

const carouselImageWrapStyle = {
  position: "relative",
  width: "100%",
  aspectRatio: "3/4",
  borderRadius: "var(--border-radius)",
  overflow: "hidden",
  background: "var(--bg-card)",
};

const carouselImgStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "var(--border-radius)",
  transition: "all 0.5s ease",
  boxShadow: "0 4px 30px rgba(0,0,0,0.4), 0 0 15px rgba(201,162,75,0.1)",
  border: "1px solid rgba(201,162,75,0.2)",
};

const dotsRowStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "8px",
  marginTop: "1rem",
};

const galleryDot = {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "all 0.3s",
};

const lightboxOverlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.92)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const lightboxImgStyle = {
  maxWidth: "90vw",
  maxHeight: "90vh",
  borderRadius: "var(--border-radius)",
  boxShadow: "0 0 60px rgba(201,162,75,0.2)",
};

const lightboxCloseStyle = {
  position: "absolute",
  top: "2rem",
  right: "2rem",
  color: "white",
  fontSize: "2rem",
  cursor: "pointer",
};

/* ─── Proposal ─── */
function Proposal({ onCelebrate }) {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 24, y: 24 });
  const [noButtonTilt, setNoButtonTilt] = useState(-8);
  const stageRef = useRef(null);
  const noButtonRef = useRef(null);

  const moveNoButton = useCallback(() => {
    const stage = stageRef.current;
    const button = noButtonRef.current;
    if (!stage || !button) return;

    const padding = 18;
    const stageWidth = stage.clientWidth;
    const stageHeight = stage.clientHeight;
    const buttonWidth = button.offsetWidth || 88;
    const buttonHeight = button.offsetHeight || 44;
    const maxX = Math.max(padding, stageWidth - buttonWidth - padding);
    const maxY = Math.max(padding, stageHeight - buttonHeight - padding);
    const x = padding + Math.random() * Math.max(0, maxX - padding);
    const y = padding + Math.random() * Math.max(0, maxY - padding);

    setNoButtonPos({ x, y });
    setNoButtonTilt((prev) => prev + (Math.random() > 0.5 ? 24 : -24));
  }, []);

  useEffect(() => {
    const timer = setTimeout(moveNoButton, 60);
    return () => clearTimeout(timer);
  }, [moveNoButton]);

  const handleNoAttempt = (event) => {
    event.preventDefault();
    event.stopPropagation();
    moveNoButton();
  };

  const handleYes = (event) => {
    setAccepted(true);
    onCelebrate?.(event);
  };

  return (
    <section id="proposal" className="fade-in">
      <h2 className="section-title">One More Question</h2>
      <p className="section-subtitle">Would you like to go out with me on our anniversary?</p>

      <div style={proposalShellStyle} ref={stageRef}>
        <div style={{ ...proposalCardStyle, ...(accepted ? proposalCardAcceptedStyle : null) }}>
          <div style={proposalGlowStyle} />

          {!accepted ? (
            <div style={proposalContentStyle}>
              <div style={proposalCopyStyle}>
                <p style={proposalKickerStyle}>This answer is the whole story now.</p>
                <h3 style={proposalHeadlineStyle}>Say yes and let the celebration start.</h3>
                <p style={proposalBodyStyle}>
                  One tap on Yes brings the hearts, the glow, and the moment we keep forever.
                </p>

                <div style={proposalActionsStyle}>
                  <button type="button" onClick={handleYes} style={proposalYesButtonStyle}>
                    Yes
                  </button>

                  <button
                    type="button"
                    ref={noButtonRef}
                    onPointerEnter={handleNoAttempt}
                    onPointerDown={handleNoAttempt}
                    onMouseEnter={handleNoAttempt}
                    onFocus={handleNoAttempt}
                    onTouchStart={handleNoAttempt}
                    onClick={handleNoAttempt}
                    style={{
                      ...proposalNoButtonStyle,
                      left: `${noButtonPos.x}px`,
                      top: `${noButtonPos.y}px`,
                      transform: `rotate(${noButtonTilt}deg)`,
                    }}
                  >
                    No
                  </button>
                </div>
              </div>

              <div style={proposalBadgeStyle}>
                <div style={proposalHeartOrbStyle}>
                  <span style={{ animation: "proposalPulse 1.2s ease-in-out infinite" }}>♥</span>
                </div>
                <p style={proposalBadgeTextStyle}>Tap Yes. The rest is handled.</p>
              </div>
            </div>
          ) : (
            <div style={proposalAcceptedStyle}>
              <div style={proposalAcceptedOrbStyle}>♥</div>
              <h3 style={proposalAcceptedTitleStyle}>She said yes.</h3>
              <p style={proposalAcceptedTextStyle}>Happy anniversary, forever starts with this one.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const proposalShellStyle = {
  position: "relative",
  maxWidth: "960px",
  margin: "0 auto",
};

const proposalCardStyle = {
  position: "relative",
  overflow: "hidden",
  minHeight: "420px",
  borderRadius: "var(--border-radius)",
  border: "1px solid rgba(201,162,75,0.16)",
  background:
    "linear-gradient(135deg, rgba(18,12,16,0.98), rgba(35,18,24,0.92) 54%, rgba(16,16,22,0.98))",
  boxShadow: "0 18px 60px rgba(0,0,0,0.45), 0 0 40px rgba(201,162,75,0.08)",
};

const proposalCardAcceptedStyle = {
  borderColor: "rgba(230,57,80,0.35)",
};

const proposalGlowStyle = {
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(circle at 20% 20%, rgba(201,162,75,0.14), transparent 34%), radial-gradient(circle at 80% 30%, rgba(230,57,80,0.16), transparent 28%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.05), transparent 30%)",
  pointerEvents: "none",
};

const proposalContentStyle = {
  position: "relative",
  zIndex: 1,
  display: "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  gap: "1.5rem",
  alignItems: "center",
  padding: "clamp(1.5rem, 4vw, 3rem)",
};

const proposalCopyStyle = {
  position: "relative",
  minHeight: "300px",
};

const proposalKickerStyle = {
  margin: 0,
  color: "var(--accent-gold)",
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  fontSize: "0.72rem",
};

const proposalHeadlineStyle = {
  margin: "0.7rem 0 0",
  fontFamily: "var(--font-heading)",
  fontSize: "clamp(2rem, 5vw, 3.6rem)",
  lineHeight: 1.05,
  color: "var(--text-primary)",
};

const proposalBodyStyle = {
  margin: "1rem 0 0",
  maxWidth: "28rem",
  color: "var(--text-secondary)",
  fontSize: "1rem",
  lineHeight: 1.8,
};

const proposalActionsStyle = {
  position: "relative",
  marginTop: "2rem",
  minHeight: "160px",
  borderRadius: "calc(var(--border-radius) - 6px)",
  border: "1px dashed rgba(201,162,75,0.18)",
  background: "rgba(255,255,255,0.02)",
  overflow: "hidden",
};

const proposalYesButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "0.95rem 1.8rem",
  fontSize: "1rem",
  fontWeight: 700,
  cursor: "pointer",
  background: "linear-gradient(135deg, var(--accent-gold), #f4d79a)",
  color: "var(--bg-primary)",
  boxShadow: "0 10px 25px rgba(201,162,75,0.3)",
  position: "absolute",
  left: "18px",
  top: "18px",
};

const proposalNoButtonStyle = {
  position: "absolute",
  border: "1px solid rgba(255,255,255,0.22)",
  borderRadius: "999px",
  padding: "0.9rem 1.7rem",
  fontSize: "1rem",
  fontWeight: 700,
  cursor: "pointer",
  background: "rgba(255,255,255,0.05)",
  color: "var(--text-primary)",
  transition: "transform 0.18s ease, left 0.18s ease, top 0.18s ease",
  touchAction: "none",
};

const proposalBadgeStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  minHeight: "300px",
  textAlign: "center",
};

const proposalHeartOrbStyle = {
  width: "160px",
  height: "160px",
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  fontSize: "4rem",
  color: "var(--accent-crimson)",
  background:
    "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18), transparent 25%), radial-gradient(circle at center, rgba(230,57,80,0.18), rgba(230,57,80,0.04) 70%, transparent 71%)",
  boxShadow: "0 0 50px rgba(230,57,80,0.2), 0 0 20px rgba(201,162,75,0.18)",
};

const proposalBadgeTextStyle = {
  margin: 0,
  color: "var(--text-muted)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontSize: "0.75rem",
};

const proposalAcceptedStyle = {
  position: "relative",
  zIndex: 1,
  minHeight: "420px",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  padding: "2rem",
  animation: "proposalPop 0.8s ease-out both",
};

const proposalAcceptedOrbStyle = {
  width: "170px",
  height: "170px",
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  fontSize: "4.5rem",
  color: "#fff",
  background: "radial-gradient(circle, rgba(230,57,80,0.95), rgba(201,162,75,0.22) 68%, transparent 72%)",
  boxShadow: "0 0 40px rgba(230,57,80,0.35), 0 0 90px rgba(201,162,75,0.18)",
  animation: "proposalFloat 1.8s ease-in-out infinite",
};

const proposalAcceptedTitleStyle = {
  margin: "1.2rem 0 0",
  fontFamily: "var(--font-heading)",
  fontSize: "clamp(2rem, 6vw, 4rem)",
  color: "var(--text-primary)",
};

const proposalAcceptedTextStyle = {
  margin: "0.8rem 0 0",
  color: "var(--text-secondary)",
  fontSize: "1rem",
};

/* ─── Love Letter ─── */
function LoveLetter() {
  const letterText = `My Dearest R,

Every day with you feels like a beautiful dream I never want to wake up from. This past year has been the most magical chapter of our lives — filled with laughter, warmth, and a love that grows deeper with each passing moment.

You are my sunshine on cloudy days, my calm in the chaos, and my forever home. Thank you for choosing me, for loving me, and for making every ordinary day extraordinary.

Here's to us, to our love, and to a lifetime of beautiful tomorrows.

Forever & Always,
S ♥`;

  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(letterText.slice(0, i));
      if (i >= letterText.length) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [started, letterText]);

  return (
    <section id="loveletter" className="fade-in" ref={ref}>
      <h2 className="section-title">A Letter For You</h2>
      <p className="section-subtitle">From the heart</p>

      <div style={letterCardStyle}>
        <div style={letterDecorStyle}>♥</div>
        <pre style={letterTextStyle}>{displayed}<span style={{ animation: "blink 1s infinite" }}>|</span></pre>
      </div>
    </section>
  );
}

const letterCardStyle = {
  background: "var(--bg-card)",
  borderRadius: "var(--border-radius)",
  padding: "2.5rem 2rem",
  border: "1px solid rgba(201,162,75,0.15)",
  boxShadow: "var(--glow-gold)",
  position: "relative",
  maxWidth: "550px",
  margin: "0 auto",
};

const letterDecorStyle = {
  position: "absolute",
  top: "-15px",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "1.5rem",
  color: "var(--accent-crimson)",
  background: "var(--bg-card)",
  padding: "0 0.5rem",
  textShadow: "0 0 10px rgba(230,57,80,0.5)",
};

const letterTextStyle = {
  fontFamily: "var(--font-heading)",
  fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
  lineHeight: 1.8,
  color: "var(--text-primary)",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={footerHeartStyle}>
        <span style={{ animation: "heartbeat 1.5s infinite" }}>❤️</span>
      </div>
      <p style={footerTextStyle}>Made with ❤️ by S for R</p>
      <p style={footerCopyStyle}>© 2026 — S & R · Forever & Always</p>
    </footer>
  );
}

const footerStyle = {
  textAlign: "center",
  padding: "3rem 1.5rem 2rem",
  borderTop: "1px solid rgba(201,162,75,0.1)",
};

const footerHeartStyle = {
  fontSize: "1.5rem",
  marginBottom: "0.75rem",
};

const footerTextStyle = {
  fontFamily: "var(--font-heading)",
  fontSize: "1rem",
  color: "var(--text-secondary)",
  fontStyle: "italic",
};

const footerCopyStyle = {
  fontSize: "0.75rem",
  color: "var(--text-muted)",
  marginTop: "0.5rem",
};

/* ─── Main App ─── */
const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "countdown", label: "Countdown" },
  { id: "gallery", label: "Gallery" },
  { id: "proposal", label: "Proposal" },
  { id: "loveletter", label: "Letter" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [bursts, setBursts] = useState([]);

  // Intersection Observer for fade-in + nav dots
  useEffect(() => {
    const fadeEls = document.querySelectorAll(".fade-in");
    const fadeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    fadeEls.forEach((el) => fadeObs.observe(el));

    // Nav dots tracking
    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    const secObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sectionEls.indexOf(e.target);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionEls.forEach((el) => secObs.observe(el));

    return () => {
      fadeObs.disconnect();
      secObs.disconnect();
    };
  }, []);

  const handleMonogramClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const id = Date.now();
    setBursts((prev) => [...prev, { id, x, y }]);
  };

  const removeBurst = (id) => {
    setBursts((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.1); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes heartBurst {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0.3); opacity: 0; }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); opacity: 0.25; }
          50% { transform: translateY(-6px); opacity: 0.4; }
        }
        @keyframes monogramGlow {
          0%, 100% { box-shadow: 0 0 60px rgba(201,162,75,0.08), 0 0 120px rgba(230,57,80,0.05); }
          50% { box-shadow: 0 0 80px rgba(201,162,75,0.14), 0 0 160px rgba(230,57,80,0.08); }
        }
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
        @keyframes proposalPop {
          0% { opacity: 0; transform: scale(0.94); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes proposalFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes proposalPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.16); }
        }
      `}</style>

      <Particles />
      <HeartBurst bursts={bursts} onDone={removeBurst} />
      <NavDots sections={SECTIONS} active={activeSection} />

      <Hero onMonogramClick={handleMonogramClick} />
      <Countdown />
      <Gallery />
      <Proposal onCelebrate={handleMonogramClick} />
      <LoveLetter />
      <Footer />
    </>
  );
}
