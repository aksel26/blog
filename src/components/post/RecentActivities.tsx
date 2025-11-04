import React, { useState, useCallback } from "react";
import { graphql, useStaticQuery } from "gatsby";
import DevLogCard from "./DevLogCard";
import LifeLogCard from "./LifeLogCard";
import { usePostFilter } from "../../hooks";

interface Post {
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
  timeToRead?: number;
}

interface RecentActivitiesData {
  allMdx: {
    nodes: Post[];
  };
  allFile: {
    nodes: Array<{
      publicURL: string;
      relativePath: string;
      relativeDirectory: string;
    }>;
  };
}

// Helper function to get thumbnail URL
const getThumbnailUrl = (post: any, allFiles: RecentActivitiesData["allFile"]["nodes"]): string | undefined => {
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
    const matchedFile = allFiles.find((file) => file.relativeDirectory === post.parent!.relativeDirectory && file.relativePath.endsWith(thumbnailFileName));

    if (matchedFile) {
      return matchedFile.publicURL;
    }
  }

  return thumbnail;
};

const RecentActivities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "devLog" | "lifeLog">("all");
  const [visibleMonths, setVisibleMonths] = useState(3);

  const data = useStaticQuery<RecentActivitiesData>(graphql`
    query RecentActivitiesQuery {
      allMdx(sort: { frontmatter: { date: DESC } }, filter: { frontmatter: { date: { ne: null } } }) {
        nodes {
          frontmatter {
            title
            date
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
  `);

  const { filteredPosts, hasMorePosts, getCategoryCount } = usePostFilter({
    posts: data.allMdx.nodes,
    activeTab,
    visibleMonths,
  });

  const loadMore = useCallback(() => {
    setVisibleMonths((prev) => prev + 3);
  }, []);

  const tabConfig = [
    { key: "all" as const, label: "전체", count: getCategoryCount("all") },
    { key: "devLog" as const, label: "DevLog", count: getCategoryCount("기술") },
    { key: "lifeLog" as const, label: "LifeLog", count: getCategoryCount("일상") },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          최근 활동
        </h3>
        <span
          className="text-sm px-3 py-1 rounded-full"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-secondary)",
          }}
        >
          최근 {visibleMonths}개월
        </span>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-6 border-b" style={{ borderColor: "var(--border-color)" }}>
        {tabConfig.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
              activeTab === tab.key ? "border-blue-500" : "border-transparent hover:border-gray-300"
            }`}
            style={{
              color: activeTab === tab.key ? "var(--accent-blue)" : "var(--text-secondary)",
            }}
          >
            {tab.label}
            <span
              className="ml-2 px-2 py-0.5 text-xs rounded-full"
              style={{
                backgroundColor: activeTab === tab.key ? "var(--accent-blue-light)" : "var(--bg-tertiary)",
                color: activeTab === tab.key ? "var(--accent-blue)" : "var(--text-tertiary)",
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Posts Display */}
      {filteredPosts.length > 0 ? (
        <>
          {activeTab === "devLog" ? (
            // DevLog: List format
            <div className="space-y-3 mb-8">
              {filteredPosts.map((post) => {
                if (!post.fields?.slug || !post.frontmatter.title) return null;
                return (
                  <DevLogCard
                    key={post.fields.slug}
                    title={post.frontmatter.title}
                    excerpt={post.frontmatter.excerpt || ""}
                    date={post.frontmatter.date}
                    tags={post.frontmatter.tags || []}
                    slug={post.fields.slug}
                    thumbnail={getThumbnailUrl(post, data.allFile.nodes)}
                  />
                );
              })}
            </div>
          ) : activeTab === "lifeLog" ? (
            // LifeLog: Grid format with bottom-aligned text
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {filteredPosts.map((post) => {
                if (!post.fields?.slug || !post.frontmatter.title) return null;
                return (
                  <LifeLogCard
                    key={post.fields.slug}
                    title={post.frontmatter.title}
                    excerpt={post.frontmatter.excerpt || ""}
                    date={post.frontmatter.date}
                    tags={post.frontmatter.tags || []}
                    slug={post.fields.slug}
                    thumbnail={getThumbnailUrl(post, data.allFile.nodes)}
                    size="medium"
                  />
                );
              })}
            </div>
          ) : (
            // All: Unified DevLog format
            <div className="space-y-6 mb-8">
              {filteredPosts.map((post) => {
                if (!post.fields?.slug || !post.frontmatter.title) return null;
                return (
                  <DevLogCard
                    key={`unified-${post.fields.slug}`}
                    title={post.frontmatter.title}
                    excerpt={post.frontmatter.excerpt || ""}
                    date={post.frontmatter.date}
                    tags={post.frontmatter.tags || []}
                    slug={post.fields.slug}
                    thumbnail={getThumbnailUrl(post, data.allFile.nodes)}
                  />
                );
              })}
            </div>
          )}

          {/* Load More Button */}
          {hasMorePosts && (
            <div className="flex justify-center">
              <button
                onClick={loadMore}
                className="px-6 py-3 transition-all duration-300 hover:transform hover:-translate-y-1 rounded-xl"
                style={{
                  color: "var(--text-primary)",
                  border: "0.4px solid var(--border-color)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-medium)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-light)";
                }}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium">더보기</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </div>
          )}
        </>
      ) : (
        // Empty State
        <div className="toss-card p-8 text-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "var(--bg-tertiary)" }}>
              <svg className="w-8 h-8" fill="none" stroke="var(--text-tertiary)" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            최근 {visibleMonths}개월 동안 {activeTab === "all" ? "" : activeTab === "devLog" ? "개발 " : "일상 "}포스트가 없습니다
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            새로운 포스트들이 곧 업데이트될 예정입니다. ✨
          </p>
        </div>
      )}
    </section>
  );
};

export default React.memo(RecentActivities);
