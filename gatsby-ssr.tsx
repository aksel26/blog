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
      key="favicon-ico"
      rel="icon"
      type="image/x-icon"
      href="/favicon.ico"
    />,
    <link
      key="favicon-png-32"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32x32.png"
    />,
    <link
      key="favicon-png-16"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16x16.png"
    />,
    <link
      key="apple-touch-icon"
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png"
    />,
  ]);
};
