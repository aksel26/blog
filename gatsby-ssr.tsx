import React from "react";
import { GatsbySSR } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const components = {
  code: (props: any) => {
    const { children, className, ...rest } = props;
    const match = /language-(\w+)/.exec(className || "");

    if (match) {
      // Code block with language
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

    // Inline code
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },
};

// Wrap page element with MDXProvider for SSR
export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>;
};

// Add Google Fonts and Favicon to HTML head
export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="google-fonts-preconnect"
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />,
    <link
      key="google-fonts-preconnect-gstatic"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="google-fonts-sacramento"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap"
    />,
    // Favicon links for SEO optimization
    <link
      key="favicon-png-32"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon/favicon-32x32.png"
    />,
    <link
      key="favicon-png-16"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon/favicon-16x16.png"
    />,
    // Apple touch icons
    <link
      key="apple-icon-180"
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicon/apple-icon-180x180.png"
    />,
    <link
      key="apple-icon-152"
      rel="apple-touch-icon"
      sizes="152x152"
      href="/favicon/apple-icon-152x152.png"
    />,
    <link
      key="apple-icon-144"
      rel="apple-touch-icon"
      sizes="144x144"
      href="/favicon/apple-icon-144x144.png"
    />,
    <link
      key="apple-icon-120"
      rel="apple-touch-icon"
      sizes="120x120"
      href="/favicon/apple-icon-120x120.png"
    />,
    <link
      key="apple-icon-114"
      rel="apple-touch-icon"
      sizes="114x114"
      href="/favicon/apple-icon-114x114.png"
    />,
    <link
      key="apple-icon-76"
      rel="apple-touch-icon"
      sizes="76x76"
      href="/favicon/apple-icon-76x76.png"
    />,
    <link
      key="apple-icon-72"
      rel="apple-touch-icon"
      sizes="72x72"
      href="/favicon/apple-icon-72x72.png"
    />,
    <link
      key="apple-icon-60"
      rel="apple-touch-icon"
      sizes="60x60"
      href="/favicon/apple-icon-60x60.png"
    />,
    <link
      key="apple-icon-57"
      rel="apple-touch-icon"
      sizes="57x57"
      href="/favicon/apple-icon-57x57.png"
    />,
    // Mobile web app metadata
    <meta
      key="apple-mobile-web-app-title"
      name="apple-mobile-web-app-title"
      content="HMKIM-Blog"
    />,
    <meta
      key="apple-mobile-web-app-capable"
      name="apple-mobile-web-app-capable"
      content="yes"
    />,
    <meta
      key="apple-mobile-web-app-status-bar-style"
      name="apple-mobile-web-app-status-bar-style"
      content="default"
    />,
  ]);
};
