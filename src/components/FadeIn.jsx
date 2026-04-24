import { useRef } from "react";
import useInView from "../hooks/useInView";

/**
 * FadeIn – wraps children in a div that fades + slides up
 * once it enters the viewport.
 *
 * Props:
 *  - delay  {number}  CSS transition delay in ms (default 0)
 *  - style  {object}  extra inline styles on the wrapper div
 */
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default FadeIn;
