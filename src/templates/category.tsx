import React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import DevLogCard from "../components/DevLogCard";
import LifeLogCard from "../components/LifeLogCard";

interface CategoryData {
  allMarkdownRemark: {
    nodes: Array<{
      frontmatter: {
        title: string;
        date: string;
        category: string;
        tags: string[];
        excerpt: string;
        thumbnail?: string;
      };
      fields: {
        slug: string;
      };
      timeToRead: number;
    }>;
  };
}

interface CategoryPageContext {
  category: string;
  mappedCategory: string;
}

const CategoryTemplate: React.FC<PageProps<CategoryData, CategoryPageContext>> = ({ data, pageContext }) => {
  const { category, mappedCategory } = pageContext;
  const posts = data.allMarkdownRemark.nodes;

  const categoryInfo = {
    기술: {
      title: "DevLog",
      subtitle: "개발 여정의 기록",
      description: "코드로 문제를 해결하고, 새로운 기술을 학습하며, 개발 과정에서 얻은 인사이트를 기록합니다.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="var(--accent-blue)" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    일상: {
      title: "LifeLog",
      subtitle: "일상 속 소중한 순간들",
      description: "여행, 경험, 그리고 삶에서 발견한 작은 기쁨들을 이야기로 나눕니다.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="var(--accent-blue)" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
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
            {info.icon && (
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mr-6"
                style={{ backgroundColor: "var(--accent-blue-light)" }}
              >
                {info.icon}
              </div>
            )}
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
                  readTime={post.timeToRead}
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
                          readTime={posts[0].timeToRead}
                          size="large"
                          thumbnail={posts[0].frontmatter.thumbnail}
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
                          readTime={posts[1].timeToRead}
                          size="medium"
                          thumbnail={posts[1].frontmatter.thumbnail}
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
                        readTime={posts[0].timeToRead}
                        size="large"
                        thumbnail={posts[0].frontmatter.thumbnail}
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
                          readTime={post.timeToRead}
                          size="medium"
                          thumbnail={post.frontmatter.thumbnail}
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
                  readTime={post.timeToRead}
                />
              ))}
            </div>
          )
        ) : (
          <div className="toss-card p-12 text-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
            <div className="mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "var(--bg-tertiary)" }}
              >
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
    allMarkdownRemark(filter: { frontmatter: { category: { eq: $category } } }, sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY년 MM월 DD일")
          category
          tags
          excerpt
          thumbnail
        }
        fields {
          slug
        }
        timeToRead
      }
    }
  }
`;
