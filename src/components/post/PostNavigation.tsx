import React from "react";
import { Link } from "gatsby";

interface NavigationPost {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    category: string;
    excerpt: string;
    date: string;
    thumbnail?: string;
    thumbnailUrl?: string;
  };
}

interface PostNavigationProps {
  previous?: NavigationPost | null;
  next?: NavigationPost | null;
  currentCategory?: string;
}

const PostNavigation: React.FC<PostNavigationProps> = ({ previous, next, currentCategory }) => {
  if (!previous && !next) return null;

  const categoryName = currentCategory === "기술" ? "DevLog" : "LifeLog";

  // Helper function to check if URL is a video
  const isVideoUrl = (url?: string) => {
    if (!url) return false;
    return /\.(mp4|mov|avi|webm)$/i.test(url);
  };

  return (
    <nav className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border-color)" }}>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Previous Post */}
        <div className="md:col-span-1">
          {previous ? (
            <Link to={previous.fields.slug} style={{ textDecoration: "none" }}>
              <div
                className="rounded-xl overflow-hidden h-full transition-all duration-300 group"
                style={{ backgroundColor: "var(--bg-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-medium)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-center h-full">
                  {/* Thumbnail */}
                  {(previous.frontmatter.thumbnailUrl || previous.frontmatter.thumbnail) && (
                    <div className="flex-shrink-0 w-32 h-32">
                      {isVideoUrl(previous.frontmatter.thumbnailUrl || previous.frontmatter.thumbnail) ? (
                        <video
                          className="w-full h-full object-cover"
                          src={previous.frontmatter.thumbnailUrl || previous.frontmatter.thumbnail}
                          muted
                          loop
                          autoPlay
                          playsInline
                        />
                      ) : (
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${previous.frontmatter.thumbnailUrl || previous.frontmatter.thumbnail})`,
                          }}
                        />
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-4 flex items-center">
                    <div className="flex items-center gap-3 w-full">
                      {/* Chevron Icon */}
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="var(--text-tertiary)" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium mb-1" style={{ color: "var(--text-tertiary)" }}>
                          이전 글
                        </p>
                        <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors" style={{ color: "var(--text-primary)" }}>
                          {previous.frontmatter.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="h-32 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--bg-secondary)", opacity: 0.5 }}>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                이전 {categoryName}이 없습니다
              </p>
            </div>
          )}
        </div>

        {/* Next Post */}
        <div className="md:col-span-1">
          {next ? (
            <Link to={next.fields.slug} style={{ textDecoration: "none" }}>
              <div
                className="rounded-xl overflow-hidden h-full transition-all duration-300 group"
                style={{ backgroundColor: "var(--bg-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-medium)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-center h-full">
                  {/* Content */}
                  <div className="flex-1 p-4 flex items-center">
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-1 min-w-0 text-right">
                        <p className="text-xs font-medium mb-1" style={{ color: "var(--text-tertiary)" }}>
                          다음 글
                        </p>
                        <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors" style={{ color: "var(--text-primary)" }}>
                          {next.frontmatter.title}
                        </h3>
                      </div>

                      {/* Chevron Icon */}
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="var(--text-tertiary)" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  {(next.frontmatter.thumbnailUrl || next.frontmatter.thumbnail) && (
                    <div className="flex-shrink-0 w-32 h-32">
                      {isVideoUrl(next.frontmatter.thumbnailUrl || next.frontmatter.thumbnail) ? (
                        <video
                          className="w-full h-full object-cover"
                          src={next.frontmatter.thumbnailUrl || next.frontmatter.thumbnail}
                          muted
                          loop
                          autoPlay
                          playsInline
                        />
                      ) : (
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${next.frontmatter.thumbnailUrl || next.frontmatter.thumbnail})`,
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ) : (
            <div className="h-32 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--bg-secondary)", opacity: 0.5 }}>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                다음 {categoryName}이 없습니다
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PostNavigation;
