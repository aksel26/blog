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
  const metaImage = image ? `${site.siteMetadata.siteUrl}${image}` : null;
  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null;

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
          property: "google-site-verification",
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
        ...keywords.map((keyword) => ({
          name: "keywords",
          content: keyword,
        })),
      ].concat(
        metaImage
          ? [
              {
                property: "og:image",
                content: metaImage,
              },
              {
                name: "twitter:image",
                content: metaImage,
              },
            ]
          : []
      )}
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
