import type { GatsbyConfig } from "gatsby";
import remarkGfm from "remark-gfm";
import remarkExternalLinks from "remark-external-links";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "개발과 일상을 기록하는 공간",
    description: "코드를 통해 배운 것들과 삶에서 경험한 소중한 순간들을 나누는 블로그입니다.",
    author: "@aksel26",
    siteUrl: "https://aksel26.netlify.app/",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/",
        excludes: ["/dev-404-page", "/404", "/404.html"],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: () => "https://aksel26.netlify.app",
        resolvePages: ({ allSitePage: { nodes: allPages } }: any) => {
          return allPages.map((page: any) => {
            return { ...page };
          });
        },
        serialize: ({ path }: any) => {
          return {
            url: path,
            changefreq: "weekly",
            priority: path === "/" ? 1.0 : 0.7,
          };
        },
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://aksel26.netlify.app",
        sitemap: "https://aksel26.netlify.app/sitemap-index.xml",
        policy: [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/dev-404-page/", "/404/", "/404.html"],
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "./content/posts/",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".md", ".mdx"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200,
              quality: 90,
              withWebp: true,
              withAvif: true,
              loading: "lazy",
              linkImagesToOriginal: false,
              backgroundColor: "transparent",
              disableBgImageOnAlpha: true,
              showCaptions: true,
              markdownCaptions: false,
              tracedSVG: false,
              srcSetBreakpoints: [320, 640, 960, 1280, 1920],
            },
          },
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              offsetY: 100,
              icon: false,
              className: "anchor-link",
              maintainCase: false,
              removeAccents: true,
            },
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
        mdxOptions: {
          remarkPlugins: [remarkGfm, [remarkExternalLinks, { target: false }]],
          rehypePlugins: [],
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        // "2.1. GA 에 프로젝트 추가" 에서 마지막에 얻은 아이디를 넣자.
        trackingIds: ["G-5BW8NGZEQK"],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "개발과 일상을 기록하는 공간",
        short_name: "HMKIM-Blog",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        display: "minimal-ui",
        icon: "src/images/favicon.png", // Add your icon file here
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }: any) => {
              return allMdx.nodes.map((node: any) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.excerpt || node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [
                    { "content:encoded": node.excerpt },
                    { "dc:creator": site.siteMetadata.author || "HMKIM" },
                  ],
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: {frontmatter: {date: DESC}}
                  filter: {frontmatter: {category: {eq: "기술"}}}
                ) {
                  nodes {
                    excerpt
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      excerpt
                      category
                    }
                  }
                }
              }
            `,
            output: "/rss-devlog.xml",
            title: "DevLog - 개발과 일상을 기록하는 공간",
            description: "개발 과정에서 배운 기술과 문제 해결 과정을 공유합니다.",
          },
          {
            serialize: ({ query: { site, allMdx } }: any) => {
              return allMdx.nodes.map((node: any) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.excerpt || node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [
                    { "content:encoded": node.excerpt },
                    { "dc:creator": site.siteMetadata.author || "HMKIM" },
                  ],
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: {frontmatter: {date: DESC}}
                  filter: {frontmatter: {category: {eq: "일상"}}}
                ) {
                  nodes {
                    excerpt
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      excerpt
                      category
                    }
                  }
                }
              }
            `,
            output: "/rss-lifelog.xml",
            title: "LifeLog - 개발과 일상을 기록하는 공간",
            description: "일상에서 발견한 소중한 순간들과 여행 경험을 공유합니다.",
          },
          {
            serialize: ({ query: { site, allMdx } }: any) => {
              return allMdx.nodes.map((node: any) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.excerpt || node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [
                    { "content:encoded": node.excerpt },
                    { "dc:creator": site.siteMetadata.author || "HMKIM" },
                  ],
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: {frontmatter: {date: DESC}}
                ) {
                  nodes {
                    excerpt
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      excerpt
                      category
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "개발과 일상을 기록하는 공간 - 전체 RSS Feed",
            description: "코드를 통해 배운 것들과 삶에서 경험한 소중한 순간들을 나누는 블로그입니다.",
          },
        ],
      },
    },
  ],
};

export default config;
