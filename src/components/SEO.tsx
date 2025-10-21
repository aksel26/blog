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
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image,
  article = false,
  pathname = "",
  datePublished,
  dateModified,
  author
}) => {
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
  const metaImage = image && typeof image === 'string'
    ? (image.startsWith('http://') || image.startsWith('https://')
        ? image
        : `${site.siteMetadata.siteUrl}${image}`)
    : `${site.siteMetadata.siteUrl}/og-default.png`;

  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : site.siteMetadata.siteUrl;
  const url = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : site.siteMetadata.siteUrl;

  // JSON-LD structured data for BlogPosting
  const structuredData = article && datePublished ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title || site.siteMetadata.title,
    "description": metaDescription,
    "image": metaImage,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": author || site.siteMetadata.author,
      "url": site.siteMetadata.siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": site.siteMetadata.title,
      "logo": {
        "@type": "ImageObject",
        "url": `${site.siteMetadata.siteUrl}/og-default.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": keywords.join(", "),
    "articleSection": keywords[0] || "기술",
    "inLanguage": "ko-KR"
  } : null;

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
        // Article-specific meta tags
        ...(article && datePublished
          ? [
              {
                property: "article:published_time",
                content: datePublished,
              },
              {
                property: "article:modified_time",
                content: dateModified || datePublished,
              },
              {
                property: "article:author",
                content: author || site.siteMetadata.author,
              },
              ...keywords.map((tag) => ({
                property: "article:tag",
                content: tag,
              })),
            ]
          : []),
      ]}
      script={
        structuredData
          ? [
              {
                type: "application/ld+json",
                innerHTML: JSON.stringify(structuredData),
              },
            ]
          : []
      }
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
