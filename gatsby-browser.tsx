import "./src/styles/global.css";

// Import Prism.js core first
import "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

// Import Prism.js language packs
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";

// Import Prism.js plugins
import "prismjs/plugins/line-numbers/prism-line-numbers";

import React from "react";
import { navigate, GatsbyBrowser } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Custom components for MDX
const components = {
  code: (props: any) => {
    const { children, className, ...rest } = props;

    const match = /language-(\w+)/.exec(className || "");

    if (match) {
      // Code block with language
      return (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: "1.7142857em 0",
            borderRadius: "8px",
            fontSize: "0.875em",
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
  pre: (props: any) => {
    return <pre {...props} />;
  },
  table: (props: any) => {
    return <table {...props} />;
  },
};

// Wrap page element with MDXProvider
export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>;
};

// Handle client-side routing for 404 pages
export const onRouteUpdate = ({ location }: { location: { pathname: string } }) => {
  // In development, manually navigate to 404 page for non-existent routes
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const validRoutes = ["/", "/devLog", "/lifeLog", "/about", "/404"];
    const isValidRoute =
      validRoutes.includes(location.pathname) ||
      location.pathname.startsWith("/devLog/") ||
      location.pathname.startsWith("/lifeLog/") ||
      location.pathname.startsWith("/about/");

    if (!isValidRoute && location.pathname !== "/404/") {
      setTimeout(() => {
        navigate("/404/");
      }, 100);
    }
  }
};
