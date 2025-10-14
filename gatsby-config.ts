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
    "gatsby-transformer-sharp",
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
    // {
    //   resolve: "gatsby-plugin-manifest",
    //   options: {
    //     name: "Blog Site",
    //     short_name: "Blog",
    //     start_url: "/",
    //     background_color: "#ffffff",
    //     theme_color: "#000000",
    //     display: "minimal-ui",
    //     icon: "src/images/icon.png", // Add your icon file here
    //   },
    // },
  ],
};

export default config;
