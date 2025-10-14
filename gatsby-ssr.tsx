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
