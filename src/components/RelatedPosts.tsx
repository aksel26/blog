import React from "react";
import { Link } from "gatsby";

interface RelatedPost {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    category: string;
    tags: string[];
  };
}

interface RelatedPostsProps {
  currentPostSlug: string;
  currentTags: string[];
  allPosts: RelatedPost[];
  maxPosts?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPostSlug, currentTags, allPosts, maxPosts = 3 }) => {
  // Calculate relevance score for each post
  const calculateRelevance = (post: RelatedPost): number => {
    if (post.fields.slug === currentPostSlug) return -1; // Exclude current post

    const postTags = post.frontmatter.tags || [];
    const commonTags = postTags.filter(tag => currentTags.includes(tag));

    return commonTags.length;
  };

  // Get related posts sorted by relevance
  const relatedPosts = allPosts
    .map(post => ({
      post,
      relevance: calculateRelevance(post),
    }))
    .filter(item => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, maxPosts)
    .map(item => item.post);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2
        className="text-2xl font-bold mb-8"
        style={{ color: "var(--text-primary)" }}
      >
        관련 포스트
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.fields.slug}
            to={post.fields.slug}
            style={{ textDecoration: "none" }}
          >
            <article
              className="p-6 rounded-lg transition-all duration-300 h-full"
              style={{
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--accent-blue-light)",
                      color: "var(--accent-blue)",
                    }}
                  >
                    {post.frontmatter.category}
                  </span>
                  <time
                    className="text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {post.frontmatter.date}
                  </time>
                </div>

                <h3
                  className="text-lg font-bold mb-2 line-clamp-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {post.frontmatter.title}
                </h3>

                <p
                  className="text-sm mb-4 line-clamp-3 flex-grow"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {post.frontmatter.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {post.frontmatter.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: "var(--bg-tertiary)",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
