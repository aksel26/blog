import { MDXProvider } from "@mdx-js/react";
import { graphql, PageProps } from "gatsby";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import GiscusComments from "../components/GiscusComments";
import Layout from "../components/Layout";
import PostNavigation from "../components/PostNavigation";
import RelatedPosts from "../components/RelatedPosts";
import ScrollToBottom from "../components/ScrollToBottom";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
import SocialShare from "../components/SocialShare";
import TableOfContents from "../components/TableOfContents";
import ViewCount from "../components/ViewCount";
// 사용자 입력 언어를 react-syntax-highlighter가 인식하는 이름으로 매핑

// Custom MDX components
const mdxComponents = {
  code: (props: any) => {
    const { children, className, ...rest } = props;
    const match = /language-(\w+)/.exec(className || "");
    console.log("match:", match);

    if (match) {
      return (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          customStyle={{
            borderRadius: "8px",
            fontSize: "12px",
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }

    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },
};

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

interface BlogPostData {
  mdx: {
    body: string;
    frontmatter: {
      title: string;
      date: string;
      dateISO: string;
      modified?: string;
      modifiedISO?: string;
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
    tableOfContents?: {
      items?: Array<{
        url: string;
        title: string;
      }>;
    };
    internal: {
      contentFilePath: string;
    };
  };
  allMdx: {
    nodes: Array<{
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
    }>;
  };
}

interface BlogPostPageContext {
  slug: string;
  previous?: NavigationPost | null;
  next?: NavigationPost | null;
}

const BlogPostTemplate: React.FC<PageProps<BlogPostData, BlogPostPageContext>> = ({ data, pageContext, children }) => {
  const post = data.mdx;
  const { title, date, dateISO, modified, modifiedISO, category, tags, excerpt, thumbnail, thumbnailFile } = post.frontmatter;
  const { previous, next } = pageContext;

  // thumbnailFile이 있으면 publicURL을 사용, 없으면 thumbnail 사용
  const thumbnailUrl = thumbnailFile?.publicURL || thumbnail;

  return (
    <Layout>
      <SEO
        title={title}
        description={excerpt}
        keywords={tags}
        image={thumbnailUrl}
        article={true}
        pathname={post.fields.slug}
        datePublished={dateISO}
        dateModified={modifiedISO}
        author="HMKIM"
      />

      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-block px-3 py-1 text-sm font-medium rounded-full"
              style={{
                backgroundColor: "var(--accent-blue-light)",
                color: "var(--accent-blue)",
              }}
            >
              {category}
            </span>
            <time className="text-sm font-medium" style={{ color: "var(--text-tertiary)" }}>
              {date}
            </time>
            {modified && modified !== date && (
              <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                수정: {modified}
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

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-sm rounded-full"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-secondary)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Mobile TOC - collapsible above content */}
        <div className="lg:hidden mb-8">
          <TableOfContents isMobile={true} />
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-3">
            <MDXProvider components={mdxComponents}>
              <div
                className="prose prose-lg max-w-none mdx-content"
                style={{
                  color: "var(--text-primary)",
                  lineHeight: "1.7",
                }}
              >
                {children || <div>No content available</div>}
              </div>
            </MDXProvider>
          </div>

          {/* Desktop TOC - sticky on the right */}
          <div className="hidden lg:block lg:col-span-1">
            <TableOfContents isMobile={false} />
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border-color)" }}>
          <SocialShare
            url={`https://aksel26.netlify.app${post.fields.slug}`}
            title={title}
            description={excerpt}
            className="mb-8"
          />
        </div>

        {/* Related Posts */}
        <RelatedPosts
          currentPostSlug={post.fields.slug}
          currentTags={tags}
          allPosts={data.allMdx.nodes}
          maxPosts={3}
        />

        {/* Post Navigation */}
        <PostNavigation previous={previous} next={next} currentCategory={category} />

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

            <GiscusComments repo="aksel26/blog" repoId="R_kgDOP_11hQ" category="comments" categoryId="DIC_kwDOP_11hc4CwvVR" />
          </div>
        </footer>
      </article>

      <ScrollToTop />
      <ScrollToBottom />
    </Layout>
  );
};

export default BlogPostTemplate;

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "YYYY년 MM월 DD일")
        dateISO: date
        modified(formatString: "YYYY년 MM월 DD일")
        modifiedISO: modified
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
      tableOfContents
      internal {
        contentFilePath
      }
    }
    allMdx(
      sort: { frontmatter: { date: DESC } }
      limit: 100
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY년 MM월 DD일")
          excerpt
          category
          tags
        }
      }
    }
  }
`;
