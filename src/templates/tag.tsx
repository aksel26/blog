import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { Layout } from "../components/layout";
import SEO from "../components/common/SEO";
import { BlogCard } from "../components/post";

interface TagPageData {
  allMdx: {
    nodes: Array<{
      id: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
        date: string;
        excerpt: string;
        category: string;
        tags: string[];
        thumbnail?: string;
      };
    }>;
    totalCount: number;
  };
}

interface TagPageContext {
  tag: string;
}

const TagTemplate: React.FC<PageProps<TagPageData, TagPageContext>> = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const posts = data.allMdx.nodes;
  const totalCount = data.allMdx.totalCount;

  return (
    <Layout>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="/devLog"
              className="text-sm"
              style={{ color: "var(--text-tertiary)" }}
            >
              ← 전체 포스트
            </Link>
          </div>

          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            #{tag}
          </h1>

          <p
            className="text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {totalCount}개의 포스트
          </p>
        </header>

        {/* Posts Grid */}
        <div className="grid gap-8">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              excerpt={post.frontmatter.excerpt}
              category={post.frontmatter.category}
              tags={post.frontmatter.tags}
              slug={post.fields.slug}
              thumbnail={post.frontmatter.thumbnail}
            />
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <p
              className="text-lg mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              이 태그에 해당하는 포스트가 없습니다.
            </p>
            <Link
              to="/devLog"
              className="inline-block px-6 py-3 rounded-lg"
              style={{
                backgroundColor: "var(--accent-blue)",
                color: "#ffffff",
              }}
            >
              전체 포스트 보기
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TagTemplate;

export const Head: React.FC<PageProps<TagPageData, TagPageContext>> = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const totalCount = data.allMdx.totalCount;

  return (
    <SEO
      title={`"${tag}" 태그 포스트`}
      description={`"${tag}" 태그가 포함된 ${totalCount}개의 포스트를 확인해보세요.`}
      keywords={[tag, "블로그", "포스트"]}
    />
  );
};

export const query = graphql`
  query TagPage($tag: String!) {
    allMdx(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY년 MM월 DD일")
          excerpt
          category
          tags
          thumbnail
        }
      }
      totalCount
    }
  }
`;
