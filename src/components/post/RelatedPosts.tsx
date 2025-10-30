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
    const commonTags = postTags.filter((tag) => currentTags.includes(tag));

    return commonTags.length;
  };

  // Get related posts sorted by relevance
  const relatedPosts = allPosts
    .map((post) => ({
      post,
      relevance: calculateRelevance(post),
    }))
    .filter((item) => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, maxPosts)
    .map((item) => item.post);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t" style={{ borderColor: "var(--border-color)", paddingTop: "4rem" }}>
      <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text-secondary)" }}>
        관련 포스트
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.fields.slug} to={post.fields.slug} style={{ textDecoration: "none" }}>
            <article
              className="p-5 transition-all duration-200 h-full rounded-xl"
              style={{
                border: "0.5px solid var(--border-color)",
                opacity: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              <div className="flex flex-col h-full">
                <h3 className="text-base font-semibold mb-2 line-clamp-2" style={{ color: "var(--text-primary)" }}>
                  {post.frontmatter.title}
                </h3>

                <p className="text-sm line-clamp-2 mb-3" style={{ color: "var(--text-secondary)" }}>
                  {post.frontmatter.excerpt}
                </p>

                <time className="text-xs mt-auto" style={{ color: "var(--text-tertiary)" }}>
                  {post.frontmatter.date}
                </time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
