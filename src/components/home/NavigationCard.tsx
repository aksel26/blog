import React from "react";
import { Link } from "gatsby";
import { useHover } from "../../hooks";

interface NavigationCardProps {
  to: string;
  title: string;
  description: string;
  linkText: string;
  imageSrc: string;
  imageAlt: string;
}

const NavigationCard: React.FC<NavigationCardProps> = ({
  to,
  title,
  description,
  linkText,
  imageSrc,
  imageAlt,
}) => {
  const { hoverProps } = useHover();

  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <div
        className="relative p-8 px-0 h-full transition-all duration-300"
        {...hoverProps}
        style={{
          transform: "translateY(0)",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute right-0 bottom-0 w-32 h-32 sm:w-42 sm:h-42 opacity-10"
        />

        <h2
          className="text-2xl mb-4 font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h2>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
        <div
          className="flex items-center text-sm font-medium"
          style={{ color: "var(--accent-blue)" }}
        >
          {linkText}
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(NavigationCard);
