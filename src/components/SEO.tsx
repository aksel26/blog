import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  article?: boolean;
  pathname?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords = [], image, article = false, pathname = "" }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const metaTitle = title ? `${title} | ${site.siteMetadata.title}` : site.siteMetadata.title;

  // 이미지 URL 처리: 외부 URL이면 그대로, 내부 경로면 siteUrl 추가, 없으면 기본 이미지
  const metaImage = image
    ? (image.startsWith('http://') || image.startsWith('https://')
        ? image
        : `${site.siteMetadata.siteUrl}${image}`)
    : `${site.siteMetadata.siteUrl}/og-default.png`;

  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : site.siteMetadata.siteUrl;
  const url = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : site.siteMetadata.siteUrl;

  return (
    <Helmet
      htmlAttributes={{
        lang: "ko",
      }}
      title={metaTitle}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: metaTitle,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: article ? "article" : "website",
        },
        {
          property: "og:site_name",
          content: site.siteMetadata.title,
        },
        {
          property: "og:url",
          content: url,
        },
        {
          property: "og:locale",
          content: "ko_KR",
        },
        {
          name: "google-site-verification",
          content: "3Z0N6Zgzw95Uk6Xwd0iJX_xcWRFAPxL2iozSpiLpukM",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:creator",
          content: site.siteMetadata.author,
        },
        {
          name: "twitter:title",
          content: metaTitle,
        },
        {
          name: "twitter:description",
          content: metaDescription,
        },
        {
          property: "og:image",
          content: metaImage,
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
        {
          name: "twitter:image",
          content: metaImage,
        },
        ...keywords.map((keyword) => ({
          name: "keywords",
          content: keyword,
        })),
      ]}
      link={
        canonical
          ? [
              {
                rel: "canonical",
                href: canonical,
              },
            ]
          : []
      }
    />
  );
};

export default SEO;
