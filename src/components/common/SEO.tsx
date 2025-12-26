import React from "react";
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
  category?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords = [], image, article = false, pathname = "", datePublished, dateModified, author, category }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            keywords
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const metaTitle = title ? `${title} | ${site.siteMetadata.title}` : site.siteMetadata.title;

  // 이미지 URL 처리: 외부 URL이면 그대로, 내부 경로면 siteUrl 추가, 없으면 기본 이미지
  const metaImage =
    image && typeof image === "string"
      ? image.startsWith("http://") || image.startsWith("https://")
        ? image
        : `${site.siteMetadata.siteUrl}${image}`
      : `${site.siteMetadata.siteUrl}/og-default.png`;

  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : site.siteMetadata.siteUrl;
  const url = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : site.siteMetadata.siteUrl;

  // 키워드 병합
  const siteKeywords = site.siteMetadata.keywords || [];
  const allKeywords = [...new Set([...keywords, ...siteKeywords])];

  // 카테고리 URL 매핑
  const getCategoryUrl = (cat: string) => {
    if (cat === "기술") return `${site.siteMetadata.siteUrl}/devlog`;
    if (cat === "일상") return `${site.siteMetadata.siteUrl}/lifelog`;
    if (cat === "Notion") return `${site.siteMetadata.siteUrl}/notion`;
    return site.siteMetadata.siteUrl;
  };

  // JSON-LD structured data
  const getStructuredData = () => {
    if (article && datePublished) {
      // BlogPosting Schema for articles
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title || site.siteMetadata.title,
        description: metaDescription,
        image: {
          "@type": "ImageObject",
          url: metaImage,
          width: 1200,
          height: 630,
        },
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        author: {
          "@type": "Person",
          name: author || site.siteMetadata.author,
          url: site.siteMetadata.siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: site.siteMetadata.title,
          logo: {
            "@type": "ImageObject",
            url: `${site.siteMetadata.siteUrl}/og-default.png`,
            width: 600,
            height: 60,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        keywords: allKeywords.join(", "),
        articleSection: category || keywords[0] || "기술",
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
      };
    } else {
      // Website Schema for homepage
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.siteMetadata.title,
        description: metaDescription,
        url: site.siteMetadata.siteUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${site.siteMetadata.siteUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
      };
    }
  };

  // BreadcrumbList Schema
  const breadcrumbSchema =
    pathname && pathname !== "/"
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "홈",
              item: site.siteMetadata.siteUrl,
            },
            ...(category
              ? [
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: category,
                    item: getCategoryUrl(category),
                  },
                ]
              : []),
            {
              "@type": "ListItem",
              position: category ? 3 : 2,
              name: title || "페이지",
              item: url,
            },
          ],
        }
      : null;

  const structuredData = getStructuredData();

  return (
    <>
      <html lang="ko" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={title || site.siteMetadata.title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={title || site.siteMetadata.title} />

      <meta name="google-site-verification" content="3Z0N6Zgzw95Uk6Xwd0iJX_xcWRFAPxL2iozSpiLpukM" />
      <meta name="naver-site-verification" content="b8551eee139d8570cac6b62587127de0de5c7d9d" />

      {article && datePublished && (
        <>
          <meta property="article:published_time" content={datePublished} />
          <meta property="article:modified_time" content={dateModified || datePublished} />
          <meta property="article:author" content={author || site.siteMetadata.author} />
          <meta property="article:section" content={category} />
          {keywords.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {canonical && <link rel="canonical" href={canonical} />}

      {structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}
      {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
    </>
  );
};

export default SEO;
