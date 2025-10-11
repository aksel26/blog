import React from "react";
import { Link } from "gatsby";

interface DevLogCardProps {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  slug: string;
  readTime?: number;
  thumbnail?: string;
}

const DevLogCard: React.FC<DevLogCardProps> = ({ title, excerpt, date, tags, slug, readTime, thumbnail }) => {
  return (
    <Link to={slug} style={{ textDecoration: "none" }}>
      <article
        className="p-6 transition-all duration-300 border-none shadow-none"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`flex-1 ${thumbnail ? 'pr-4' : ''}`}>
            <h2 className="text-lg font-semibold mb-2 leading-tight " style={{ color: "var(--text-primary)" }}>
              {title}
            </h2>
            <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
              {excerpt}
            </p>
          </div>
          
          {/* Thumbnail */}
          {thumbnail && (
            <div className="flex-shrink-0">
              <div 
                className="w-20 h-20 rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url(${thumbnail})`,
                }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-1 text-xs rounded"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-tertiary)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <time className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            {date}
          </time>
          {readTime && (
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              {readTime}분 읽기
            </span>
          )}
        </div>
      </article>
    </Link>
  );
};

export default DevLogCard;
