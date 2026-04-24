import { useState, useEffect } from "react";

/**
 * useInView – returns true once the referenced element scrolls into the viewport.
 * Stays true after the first intersection (one-shot animation trigger).
 */
function useInView(ref, threshold = 0.1) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return visible;
}

export default useInView;
