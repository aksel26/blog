import React, { useState, useMemo } from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import DevLogCard from "../components/DevLogCard";
import LifeLogCard from "../components/LifeLogCard";

interface CategoryData {
  allMdx: {
    nodes: Array<{
      frontmatter: {
        title: string;
        date: string;
        category: string;
        tags: string[];
        excerpt: string;
        thumbnail?: string;
        thumbnailFile?: {
          publicURL: string;
        };
      };
      fields: {
        slug: string;
      };
      parent?: {
        relativePath?: string;
        relativeDirectory?: string;
      };
    }>;
  };
  allFile: {
    nodes: Array<{
      publicURL: string;
      relativePath: string;
      relativeDirectory: string;
    }>;
  };
}

interface CategoryPageContext {
  category: string;
  mappedCategory: string;
}

const CategoryTemplate: React.FC<PageProps<CategoryData, CategoryPageContext>> = ({ data, pageContext }) => {
  const { category, mappedCategory } = pageContext;
  const allPosts = data.allMdx.nodes;
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // Extract unique tags with counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allPosts.forEach((post) => {
      post.frontmatter.tags?.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [allPosts]);

  // Sort tags alphabetically (ㄱ-ㅎ, A-Z, a-z)
  const sortedTags = useMemo(() => {
    return Object.entries(tagCounts).sort((a, b) => a[0].localeCompare(b[0], "ko-KR"));
  }, [tagCounts]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    const newSelectedTags = new Set(selectedTags);
    if (newSelectedTags.has(tag)) {
      newSelectedTags.delete(tag);
    } else {
      newSelectedTags.add(tag);
    }
    setSelectedTags(newSelectedTags);
  };

  // Clear all selected tags
  const clearAllTags = () => {
    setSelectedTags(new Set());
  };

  // Filter posts by selected tags (OR logic - post must have at least one selected tag)
  const posts = useMemo(() => {
    if (selectedTags.size === 0) return allPosts;
    return allPosts.filter((post) => {
      return Array.from(selectedTags).some((tag) => post.frontmatter.tags?.includes(tag));
    });
  }, [allPosts, selectedTags]);

  // Helper function to get thumbnail URL
  const getThumbnailUrl = (post: CategoryData["allMdx"]["nodes"][0]) => {
    const { thumbnail, thumbnailFile } = post.frontmatter;

    // 이미 thumbnailFile이 있으면 사용
    if (thumbnailFile?.publicURL) {
      return thumbnailFile.publicURL;
    }

    // 외부 URL이면 그대로 사용
    if (thumbnail && (thumbnail.startsWith("http://") || thumbnail.startsWith("https://"))) {
      return thumbnail;
    }

    // 상대 경로인 경우 매칭
    if (thumbnail && post.parent && post.parent.relativeDirectory) {
      const thumbnailFileName = thumbnail.replace("./", "");
      const matchedFile = data.allFile.nodes.find(
        (file) => file.relativeDirectory === post.parent!.relativeDirectory && file.relativePath.endsWith(thumbnailFileName)
      );

      if (matchedFile) {
        return matchedFile.publicURL;
      }
    }

    return thumbnail;
  };

  const categoryInfo = {
    기술: {
      title: "DevLog",
      subtitle: "개발 여정의 기록",
      description: "코드로 문제를 해결하고, 새로운 기술을 학습하며, 개발 과정에서 얻은 인사이트를 기록합니다.",
      icon: <img src="/devLogCard.webp" alt="devLogCard" />,
    },
    일상: {
      title: "LifeLog",
      subtitle: "일상 속 소중한 순간들",
      description: "여행, 경험, 그리고 삶에서 발견한 작은 기쁨들을 이야기로 나눕니다.",
      icon: <img src="/lifeLogCard.webp" alt="lifeLogCard" />,
    },
  };

  const info = categoryInfo[category as keyof typeof categoryInfo] || {
    title: category,
    subtitle: "",
    description: `${category} 관련 포스트들입니다.`,
    icon: null,
  };

  const isDevLog = category === "기술";
  const isLifeLog = category === "일상";

  return (
    <Layout>
      <SEO title={info.title} description={info.description} pathname={`/${mappedCategory}`} />

      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center mb-4">
            {info.icon && <div className="w-30 h-30  mr-6">{info.icon}</div>}
            <div>
              <h1
                className="text-4xl font-bold mb-2"
                style={{
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {info.title}
              </h1>
              <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                {info.subtitle}
              </p>
            </div>
          </div>
          <p className="text-base leading-relaxed max-w-3xl" style={{ color: "var(--text-secondary)" }}>
            {info.description}
          </p>
          <div className="mt-6">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-secondary)",
              }}
            >
              총 {posts.length}개의 포스트
            </span>
          </div>

          {/* Tags Section */}
          {Object.keys(tagCounts).length > 0 && (
            <div className="mt-6">
              {/* Selected Tags Display */}
              {selectedTags.size > 0 && (
                <div className="mb-4 flex items-center flex-wrap gap-2">
                  {Array.from(selectedTags).map((tag) => (
                    <div
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: "var(--text-primary)",
                        color: "var(--bg-primary)",
                      }}
                    >
                      {tag}
                      <button
                        onClick={() => toggleTag(tag)}
                        className="ml-2 hover:opacity-70 transition-opacity"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--bg-primary)",
                          fontSize: "16px",
                          lineHeight: "1",
                          padding: "0",
                        }}
                        aria-label={`Remove ${tag} tag`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={clearAllTags}
                    className="text-sm px-3 py-1.5 rounded-full hover:opacity-70 transition-opacity"
                    style={{
                      backgroundColor: "var(--bg-tertiary)",
                      color: "var(--text-secondary)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    모두 지우기
                  </button>
                </div>
              )}

              {/* Tag Search - Commented out for now */}
              {/* {sortedTags.length > 10 && (
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="태그 검색..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg text-sm"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-color)",
                      outline: "none",
                    }}
                  />
                </div>
              )} */}

              {/* Tag Buttons - Max 2 rows with horizontal scroll */}
              <div
                className="pb-2"
                style={{
                  display: "grid",
                  gridAutoFlow: "column",
                  gridTemplateRows: "repeat(2, minmax(0, 1fr))",
                  gap: "0.5rem",
                  overflowX: "auto",
                  overflowY: "hidden",
                  scrollbarWidth: "thin",
                }}
              >
                {sortedTags.map(([tag, count]) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: selectedTags.has(tag) ? "var(--text-primary)" : "var(--bg-tertiary)",
                      color: selectedTags.has(tag) ? "var(--bg-primary)" : "var(--text-secondary)",
                      border: selectedTags.has(tag) ? "2px solid var(--text-primary)" : "2px solid transparent",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag} ({count})
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {posts.length > 0 ? (
          isDevLog ? (
            // DevLog: List format
            <div className="flex space-y-3 flex-col">
              {posts.map((post) => (
                <DevLogCard
                  key={post.fields.slug}
                  title={post.frontmatter.title}
                  excerpt={post.frontmatter.excerpt}
                  date={post.frontmatter.date}
                  tags={post.frontmatter.tags}
                  slug={post.fields.slug}
                  readTime={5}
                  thumbnail={getThumbnailUrl(post)}
                />
              ))}
            </div>
          ) : isLifeLog ? (
            // LifeLog: Custom layout with first row 6:4, then 3 columns
            <div className="mb-8">
              {posts.length > 0 && (
                <>
                  {/* First row: 6:4 layout */}
                  {posts.length >= 2 ? (
                    <div className="grid grid-cols-10 gap-4 mb-6">
                      {/* First post - 6/10 columns */}
                      <div className="col-span-10 md:col-span-6">
                        <LifeLogCard
                          key={`category-first-${posts[0].fields.slug}`}
                          title={posts[0].frontmatter.title}
                          excerpt={posts[0].frontmatter.excerpt}
                          date={posts[0].frontmatter.date}
                          tags={posts[0].frontmatter.tags}
                          slug={posts[0].fields.slug}
                          readTime={5}
                          size="large"
                          thumbnail={getThumbnailUrl(posts[0])}
                        />
                      </div>
                      {/* Second post - 4/10 columns */}
                      <div className="col-span-10 md:col-span-4">
                        <LifeLogCard
                          key={`category-second-${posts[1].fields.slug}`}
                          title={posts[1].frontmatter.title}
                          excerpt={posts[1].frontmatter.excerpt}
                          date={posts[1].frontmatter.date}
                          tags={posts[1].frontmatter.tags}
                          slug={posts[1].fields.slug}
                          readTime={5}
                          size="medium"
                          thumbnail={getThumbnailUrl(posts[1])}
                        />
                      </div>
                    </div>
                  ) : (
                    /* Only one post */
                    <div className="mb-6">
                      <LifeLogCard
                        key={`category-single-${posts[0].fields.slug}`}
                        title={posts[0].frontmatter.title}
                        excerpt={posts[0].frontmatter.excerpt}
                        date={posts[0].frontmatter.date}
                        tags={posts[0].frontmatter.tags}
                        slug={posts[0].fields.slug}
                        readTime={5}
                        size="large"
                        thumbnail={getThumbnailUrl(posts[0])}
                      />
                    </div>
                  )}

                  {/* Remaining posts: 3 columns grid */}
                  {posts.length > 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {posts.slice(2).map((post, index) => (
                        <LifeLogCard
                          key={`category-grid-${index}-${post.fields.slug}`}
                          title={post.frontmatter.title}
                          excerpt={post.frontmatter.excerpt}
                          date={post.frontmatter.date}
                          tags={post.frontmatter.tags}
                          slug={post.fields.slug}
                          readTime={5}
                          size="medium"
                          thumbnail={getThumbnailUrl(post)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            // Default: Grid format
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <DevLogCard
                  key={post.fields.slug}
                  title={post.frontmatter.title}
                  excerpt={post.frontmatter.excerpt}
                  date={post.frontmatter.date}
                  tags={post.frontmatter.tags}
                  slug={post.fields.slug}
                  readTime={5}
                  thumbnail={getThumbnailUrl(post)}
                />
              ))}
            </div>
          )
        ) : (
          <div className="toss-card p-12 text-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
            <div className="mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                <svg className="w-8 h-8" fill="none" stroke="var(--text-tertiary)" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              아직 포스트가 없습니다
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              새로운 {info.title} 포스트가 곧 업데이트될 예정입니다.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryTemplate;

export const query = graphql`
  query PostsByCategory($category: String!) {
    allMdx(filter: { frontmatter: { category: { eq: $category } } }, sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY년 MM월 DD일")
          category
          tags
          excerpt
          thumbnail
          thumbnailFile {
            publicURL
          }
        }
        fields {
          slug
        }
        parent {
          ... on File {
            relativePath
            relativeDirectory
          }
        }
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "posts" } }) {
      nodes {
        publicURL
        relativePath
        relativeDirectory
      }
    }
  }
`;
