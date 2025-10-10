import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Blog Site",
    description: "A personal blog for tech and daily life posts",
    author: "@blogauthor",
    siteUrl: "https://your-blog-site.com",
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
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
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
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {
                sh: "bash",
                js: "javascript",
                ts: "typescript",
              },
              showLineNumbers: true,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /\b(?:superif|superelse)\b/,
                    },
                  },
                },
              ],
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
            },
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
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
