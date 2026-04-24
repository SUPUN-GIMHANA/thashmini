import { useState, useEffect } from "react";

const SECTIONS = ["hero", "about", "skills", "projects", "education", "contact"];

/**
 * useActiveSection – tracks which section is currently in view
 * based on the scroll position, returning its id string.
 */
function useActiveSection() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      // Iterate sections in reverse so the last match (topmost visible) wins
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
}

export default useActiveSection;
