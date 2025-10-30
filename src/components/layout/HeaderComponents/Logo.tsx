import React, { useState, useCallback } from "react";
import { Link } from "gatsby";

const Logo: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <Link
      to="/"
      className="text-xl font-medium logo-link"
      style={{
        color: "var(--text-primary)",
        textDecoration: "none",
        letterSpacing: "0.05em",
        fontWeight: 500,
        fontFamily: "Sacramento, cursive",
        fontSize: "1.75rem",
        padding: "0px 12px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        style={{
          color: isHovered ? "var(--bg-primary)" : "var(--text-primary)",
          transition: "color 0.2s ease",
        }}
      >
        hmkim
      </span>
    </Link>
  );
};

export default React.memo(Logo);
