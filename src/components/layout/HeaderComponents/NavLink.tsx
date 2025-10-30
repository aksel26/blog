import React, { useState, useCallback } from "react";
import { Link } from "gatsby";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, onClick, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${className}`}
      style={{
        color: isHovered ? "var(--text-primary)" : "var(--text-secondary)",
        backgroundColor: isHovered ? "var(--bg-secondary)" : "transparent",
        textDecoration: "none",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
};

export default React.memo(NavLink);
