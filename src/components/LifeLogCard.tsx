import React, { useState } from "react";
import { Link } from "gatsby";

interface LifeLogCardProps {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  slug: string;
  readTime?: number;
  size?: "small" | "medium" | "large";
  thumbnail?: string;
}

const LifeLogCard: React.FC<LifeLogCardProps> = ({ title, excerpt, date, tags, slug, readTime, size = "medium", thumbnail }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sizeClasses = {
    small: "row-span-1",
    medium: "row-span-3",
    large: "row-span-4",
  };

  const cardHeight = {
    small: "200px",
    medium: "300px",
    large: "400px",
  };

  const hasValidThumbnail = thumbnail && !imageError;
  const isVideo = thumbnail && (thumbnail.endsWith('.mp4') || thumbnail.endsWith('.mov') || thumbnail.endsWith('.avi'));

  return (
    <Link to={slug} style={{ textDecoration: "none" }}>
      <article
        className={`transition-all shadow-none duration-300 ${sizeClasses[size]} relative overflow-hidden rounded-lg`}
        style={{
          minHeight: cardHeight[size],
          background: hasValidThumbnail ? "transparent" : `linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
        }}
      >
        {/* Thumbnail Background */}
        {hasValidThumbnail && (
          <>
            {isVideo ? (
              <>
                <video
                  src={thumbnail}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  style={{
                    opacity: imageLoaded ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </>
            ) : (
              <>
                {/* Hidden image for loading detection */}
                <img src={thumbnail} alt="" className="hidden" onLoad={() => setImageLoaded(true)} onError={() => setImageError(true)} />
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${thumbnail})`,
                    opacity: imageLoaded ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </>
            )}
          </>
        )}

        {/* Loading state for thumbnail */}
        {thumbnail && !imageLoaded && !imageError && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

        {/* Content Overlay */}
        <div className={`absolute z-10 h-full flex flex-col justify-end ${hasValidThumbnail ? "p-6" : "p-6"}`}>
          <div>
            <h2
              className={`font-bold mb-3 leading-tight ${size === "large" ? "text-xl" : size === "medium" ? "text-lg" : "text-base"}`}
              style={{
                color: hasValidThumbnail ? "white" : "var(--text-primary)",
                textShadow: hasValidThumbnail ? "0 2px 4px rgba(0,0,0,0.5)" : "none",
              }}
            >
              {title}
            </h2>

            {size !== "small" && (
              <p
                className={`leading-relaxed mb-4 ${size === "large" ? "text-base" : "text-sm"} line-clamp-3`}
                style={{
                  color: hasValidThumbnail ? "rgba(255, 255, 255, 0.95)" : "var(--text-secondary)",
                  textShadow: hasValidThumbnail ? "0 1px 2px rgba(0,0,0,0.7)" : "none",
                }}
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
                      backgroundColor: hasValidThumbnail ? "rgba(255, 255, 255, 0.2)" : "var(--accent-blue-light)",
                      color: hasValidThumbnail ? "white" : "var(--accent-blue)",
                      backdropFilter: hasValidThumbnail ? "blur(10px)" : "none",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <time
                className="text-xs font-medium"
                style={{
                  color: hasValidThumbnail ? "rgba(255, 255, 255, 0.9)" : "var(--text-tertiary)",
                  textShadow: hasValidThumbnail ? "0 1px 2px rgba(0,0,0,0.7)" : "none",
                }}
              >
                {date}
              </time>
              {readTime && size !== "small" && (
                <span
                  className="text-xs"
                  style={{
                    color: hasValidThumbnail ? "rgba(255, 255, 255, 0.9)" : "var(--text-tertiary)",
                    textShadow: hasValidThumbnail ? "0 1px 2px rgba(0,0,0,0.7)" : "none",
                  }}
                >
                  {readTime}분
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Background Pattern - only show when no thumbnail */}
        {!hasValidThumbnail && (
          <>
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
          </>
        )}
      </article>
    </Link>
  );
};

export default LifeLogCard;
