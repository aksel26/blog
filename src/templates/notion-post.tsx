import { graphql, PageProps } from "gatsby";
import React from "react";
import { GiscusComments, SocialShare, ViewCount } from "../components/common";
import SEO from "../components/common/SEO";
import { Layout } from "../components/layout";
import { PostNavigation, RelatedPosts } from "../components/post";
import { ReadingProgressBar, ScrollToBottom, ScrollToTop } from "../components/ui";

interface NavigationPost {
  fields: {
    slug: string;
  };
  title: string;
  excerpt: string;
}

interface NotionPostData {
  notion: {
    title: string;
    markdownString: string;
    properties: {
      Description: {
        value: string;
      };
    };
    fields: {
      slug: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  allNotion: {
    nodes: Array<{
      title: string;
      fields: {
        slug: string;
      };
      properties: {
        Description: {
          value: string;
        };
      };
      createdAt: string;
    }>;
  };
}

interface NotionPostPageContext {
  slug: string;
  previous?: NavigationPost | null;
  next?: NavigationPost | null;
}

const NotionPostTemplate: React.FC<PageProps<NotionPostData, NotionPostPageContext>> = ({ data, pageContext }) => {
  const post = data.notion;
  const title = post.title;
  const excerpt = post.properties.Description.value;
  const createdAt = post.createdAt;
  const updatedAt = post.updatedAt;
  const { previous, next } = pageContext;

  return (
    <Layout>
      <ReadingProgressBar />

      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-block px-3 py-1 text-sm font-medium rounded-full"
              style={{
                backgroundColor: "var(--accent-purple-light)",
                color: "var(--accent-purple)",
              }}
            >
              Notion
            </span>
            <time className="text-sm font-medium" style={{ color: "var(--text-tertiary)" }}>
              {createdAt}
            </time>
            {updatedAt && updatedAt !== createdAt && (
              <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                수정: {updatedAt}
              </span>
            )}
          </div>

          <h1
            className="text-4xl font-bold mb-6 leading-tight"
            style={{
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>

          <div className="flex items-center gap-6 text-sm mb-8">
            <ViewCount slug={post.fields.slug} />
          </div>
        </header>

        <div className="prose prose-lg max-w-none notion-content" style={{ color: "var(--text-primary)", lineHeight: "1.7" }} dangerouslySetInnerHTML={{ __html: post.markdownString }} />

        {/* Social Share Buttons */}
        <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border-color)" }}>
          <SocialShare url={`https://aksel26.netlify.app${post.fields.slug}`} title={title} description={excerpt} className="mb-8" />
        </div>

        {/* Related Posts */}
        <RelatedPosts currentPostSlug={post.fields.slug} currentTags={[]} allPosts={data.allNotion.nodes} maxPosts={3} />

        {/* Post Navigation */}
        <PostNavigation previous={previous} next={next} currentCategory="Notion" />

        <footer className="mt-16 pt-8" style={{ borderTop: "1px solid var(--border-color)" }}>
          <div className=" p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                이 글이 도움이 되셨나요? 💭
              </h3>
              <p className="text-base" style={{ color: "var(--text-secondary)" }}>
                궁금한 점이나 개선할 부분이 있다면 댓글로 알려주세요!
              </p>
            </div>

            <GiscusComments repo="aksel26/blog" repoId="R_kgDOP_11hQ" category="Comments" categoryId="DIC_kwDOP_11hc4CwvVR" />
          </div>
        </footer>
      </article>

      <ScrollToTop />
      <ScrollToBottom />
    </Layout>
  );
};

export default NotionPostTemplate;

export const Head: React.FC<PageProps<NotionPostData>> = ({ data }) => {
  const post = data.notion;
  const title = post.title;
  const excerpt = post.properties.Description.value;

  return (
    <SEO
      title={title}
      description={excerpt}
      keywords={[]}
      article={true}
      pathname={post.fields.slug}
      datePublished={post.createdAt}
      dateModified={post.updatedAt}
      author="HMKIM"
      category="Notion"
    />
  );
};

export const query = graphql`
  query NotionPostBySlug($slug: String!) {
    notion(fields: { slug: { eq: $slug } }) {
      title
      markdownString
      properties {
        Description {
          value
        }
      }
      fields {
        slug
      }
      createdAt(formatString: "YYYY년 MM월 DD일")
      updatedAt(formatString: "YYYY년 MM월 DD일")
    }
    allNotion(sort: { createdAt: DESC }, limit: 100, filter: { properties: { Status: { value: { name: { eq: "Published" } } } } }) {
      nodes {
        title
        fields {
          slug
        }
        properties {
          Description {
            value
          }
        }
        createdAt(formatString: "YYYY년 MM월 DD일")
      }
    }
  }
`;
