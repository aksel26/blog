import React from "react";
import { Link } from "gatsby";

interface LifeLogCardProps {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  slug: string;
  readTime?: number;
  size?: "small" | "medium" | "large";
}

const LifeLogCard: React.FC<LifeLogCardProps> = ({ title, excerpt, date, tags, slug, readTime, size = "medium" }) => {
  const sizeClasses = {
    small: "row-span-2",
    medium: "row-span-3",
    large: "row-span-4",
  };

  const cardHeight = {
    small: "200px",
    medium: "300px",
    large: "400px",
  };

  return (
    <Link to={slug} style={{ textDecoration: "none" }}>
      <article
        className={`p-6 transition-all shadow-none duration-300 ${sizeClasses[size]} relative overflow-hidden`}
        style={{
          minHeight: cardHeight[size],
          background: `linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
        }}
      >
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1">
            <h2
              className={`font-bold mb-3 leading-tight ${
                size === "large" ? "text-xl" : size === "medium" ? "text-lg" : "text-base"
              }`}
              style={{ color: "var(--text-primary)" }}
            >
              {title}
            </h2>

            {size !== "small" && (
              <p
                className={`leading-relaxed mb-4 ${size === "large" ? "text-base" : "text-sm"} line-clamp-3`}
                style={{ color: "var(--text-secondary)" }}
              >
                {excerpt}
              </p>
            )}

            {size === "large" && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: "var(--accent-blue-light)",
                      color: "var(--accent-blue)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <time className="text-xs font-medium" style={{ color: "var(--text-tertiary)" }}>
                {date}
              </time>
              {readTime && size !== "small" && (
                <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  {readTime}분
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div
          className="absolute top-0 right-0 w-16 h-16 opacity-5"
          style={{
            background: "var(--accent-blue)",
            clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)",
          }}
        />

        {size === "large" && (
          <div
            className="absolute bottom-0 left-0 w-24 h-24 opacity-5"
            style={{
              background: "var(--accent-blue)",
              clipPath: "polygon(0% 100%, 100% 0%, 0% 0%)",
            }}
          />
        )}
      </article>
    </Link>
  );
};

export default LifeLogCard;
