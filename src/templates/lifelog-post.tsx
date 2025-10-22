import { MDXProvider } from "@mdx-js/react";
import { graphql, PageProps } from "gatsby";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import GalleryWall from "../components/GalleryWall";
import GiscusComments from "../components/GiscusComments";
import Layout from "../components/Layout";
import PostNavigation from "../components/PostNavigation";
import RelatedPosts from "../components/RelatedPosts";
import SEO from "../components/SEO";
import SocialShare from "../components/SocialShare";
import ViewCount from "../components/ViewCount";

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
    };
    fields: {
      slug: string;
    };
    internal: {
      contentFilePath: string;
    };
    parent: {
      relativePath: string;
      relativeDirectory: string;
    };
  };
  allFile: {
    nodes: Array<{
      publicURL: string;
      relativePath: string;
      relativeDirectory: string;
      name: string;
      extension: string;
    }>;
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

const LifeLogPostTemplate: React.FC<PageProps<BlogPostData, BlogPostPageContext>> = ({ data, pageContext, children }) => {
  const post = data.mdx;
  const { title, date, dateISO, modified, modifiedISO, category, tags, excerpt, thumbnail } = post.frontmatter;
  const { previous, next } = pageContext;

  // 현재 포스트의 디렉토리를 가져옵니다
  const postDirectory = post.parent?.relativeDirectory || "";

  // 현재 포스트 디렉토리의 이미지 및 비디오 파일만 필터링
  let galleryMedia = data.allFile.nodes
    .filter((file) => file.relativeDirectory === postDirectory)
    .map((file) => ({
      url: file.publicURL,
      type: (["mp4", "mov", "avi"].includes(file.extension.toLowerCase()) ? "video" : "image") as "image" | "video",
    }));

  // thumbnail은 이제 { publicURL: string } 형태이므로 처리 불필요
  // 모든 이미지는 이미 galleryImages에 포함됨

  // Custom MDX components
  const mdxComponents = {
    img: () => {
      // 이미지를 본문에는 표시하지 않음 (갤러리에만 표시)
      return null;
    },
    video: () => {
      // 비디오를 본문에는 표시하지 않음 (갤러리에만 표시)
      return null;
    },
    code: (props: any) => {
      const { children, className, ...rest } = props;
      const match = /language-(\w+)/.exec(className || "");

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

  return (
    <Layout>
      <SEO
        title={title}
        description={excerpt}
        keywords={tags}
        image={thumbnail}
        article={true}
        pathname={post.fields.slug}
        datePublished={dateISO}
        dateModified={modifiedISO}
        author="HMKIM"
      />

      <div className="max-w-8xl mx-auto">
        {/* 헤더 */}
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

          <div className="flex items-center gap-6 text-sm mb-6">
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

        {/* 6:4 비율 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* 좌측: 갤러리 (60%) */}
          <div className="lg:col-span-6">
            <GalleryWall media={galleryMedia} />
          </div>

          {/* 우측: 컨텐츠 (40%) */}
          <article className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
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
          </article>
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
      </div>
    </Layout>
  );
};

export default LifeLogPostTemplate;

export const query = graphql`
  query LifeLogPostBySlug($slug: String!) {
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
      }
      fields {
        slug
      }
      internal {
        contentFilePath
      }
      parent {
        ... on File {
          relativePath
          relativeDirectory
        }
      }
    }
    allFile(filter: { extension: { regex: "/(jpg|jpeg|png|gif|webp|mp4|mov|avi)/" }, sourceInstanceName: { eq: "posts" } }) {
      nodes {
        publicURL
        relativePath
        relativeDirectory
        name
        extension
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
