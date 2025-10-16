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
              maxWidth: 800,
              quality: 85,
              withWebp: true,
              loading: "lazy",
              linkImagesToOriginal: false,
              backgroundColor: "transparent",
              disableBgImageOnAlpha: true,
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
        icon: "src/images/favicon-32x32.png", // Add your icon file here
      },
    },
  ],
};

export default config;
