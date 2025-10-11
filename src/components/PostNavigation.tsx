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

  return (
    <nav className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border-color)" }}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Previous Post */}
        <div className="md:col-span-1">
          {previous ? (
            <Link to={previous.fields.slug} style={{ textDecoration: "none" }}>
              <div 
                className="toss-card p-6 h-full transition-all duration-300 group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-medium)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-light)";
                }}
              >
                <div className="flex items-start space-x-4">
                  {/* Direction Indicator */}
                  <div className="flex-shrink-0 mt-1">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--accent-blue-light)" }}
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="var(--accent-blue)" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p 
                      className="text-sm font-medium mb-2"
                      style={{ color: "var(--accent-blue)" }}
                    >
                      이전 {previous.frontmatter.category === "기술" ? "DevLog" : "LifeLog"}
                    </p>
                    
                    <h3 
                      className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {previous.frontmatter.title}
                    </h3>
                    
                    <p 
                      className="text-sm line-clamp-2 mb-3"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {previous.frontmatter.excerpt}
                    </p>

                    <div className="flex items-center space-x-3">
                      <span 
                        className="inline-block px-2 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: "var(--bg-tertiary)",
                          color: "var(--text-tertiary)"
                        }}
                      >
                        {previous.frontmatter.category}
                      </span>
                      <time 
                        className="text-xs"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {previous.frontmatter.date}
                      </time>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  {previous.frontmatter.thumbnail && (
                    <div className="flex-shrink-0 hidden sm:block">
                      <div 
                        className="w-16 h-16 rounded-lg bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${previous.frontmatter.thumbnail})`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ) : (
            <div className="h-full flex items-center justify-center opacity-50">
              <p 
                className="text-sm"
                style={{ color: "var(--text-tertiary)" }}
              >
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
                className="toss-card p-6 h-full transition-all duration-300 group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-medium)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-light)";
                }}
              >
                <div className="flex items-start space-x-4">
                  {/* Thumbnail */}
                  {next.frontmatter.thumbnail && (
                    <div className="flex-shrink-0 hidden sm:block order-first md:order-last">
                      <div 
                        className="w-16 h-16 rounded-lg bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${next.frontmatter.thumbnail})`,
                        }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0 md:text-right">
                    <p 
                      className="text-sm font-medium mb-2"
                      style={{ color: "var(--accent-blue)" }}
                    >
                      다음 {next.frontmatter.category === "기술" ? "DevLog" : "LifeLog"}
                    </p>
                    
                    <h3 
                      className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {next.frontmatter.title}
                    </h3>
                    
                    <p 
                      className="text-sm line-clamp-2 mb-3"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {next.frontmatter.excerpt}
                    </p>

                    <div className="flex items-center space-x-3 md:justify-end">
                      <span 
                        className="inline-block px-2 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: "var(--bg-tertiary)",
                          color: "var(--text-tertiary)"
                        }}
                      >
                        {next.frontmatter.category}
                      </span>
                      <time 
                        className="text-xs"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {next.frontmatter.date}
                      </time>
                    </div>
                  </div>

                  {/* Direction Indicator */}
                  <div className="flex-shrink-0 mt-1 order-last">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--accent-blue-light)" }}
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="var(--accent-blue)" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="h-full flex items-center justify-center opacity-50">
              <p 
                className="text-sm"
                style={{ color: "var(--text-tertiary)" }}
              >
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