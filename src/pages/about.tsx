import React from "react";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
interface AboutPageData {
  site: {
    siteMetadata: {
      title: string;
      description: string;
    };
  };
}

const AboutPage: React.FC<PageProps<AboutPageData>> = ({ data }) => {
  return (
    <Layout>
      <SEO title="About" description="프론트엔드 개발자 김현민의 블로그입니다." pathname="/about" />

      <div className="max-w-3xl mx-auto py-8">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
            {/* 프로필 이미지 - 왼쪽 */}
            <div className="flex-shrink-0">
              <img src="/profile.webp" alt="profile" className="w-48 rounded-xl" />
            </div>

            {/* 소개 - 오른쪽 */}
            <div className="flex-1 relative">
              <div className="flex gap-x-3 absolute right-0">
                <a
                  href="mailto:kevinxkim2023@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center"
                    style={
                      {
                        // backgroundColor: "var(--bg-secondary)",
                        // color: "var(--accent-blue)",
                      }
                    }
                  >
                    <svg className="w-7 h-7" fill="none" stroke="gray" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </a>

                <a
                  href="https://github.com/aksel26/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={
                      {
                        // backgroundColor: "var(--accent-blue-light)",
                        // color: "var(--accent-blue)",
                      }
                    }
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </a>
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                김현민
              </h1>
              <p className="text-xl md:text-2xl mb-4" style={{ color: "var(--text-secondary)" }}>
                Frontend Developer
              </p>
              <p className="text-base mb-4" style={{ color: "var(--text-tertiary)" }}>
                사용자 경험을 중시하는 프론트엔드 개발자
              </p>

              {/* 소개글 */}
              <div className="mt-6" style={{ color: "var(--text-secondary)" }}>
                <p className="leading-relaxed">
                  사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.
                  <br />
                  React와 TypeScript를 주로 사용하며, 깔끔한 코드와 직관적인 UI를 만드는 걸 좋아합니다.
                </p>
                <p className="leading-relaxed">이곳에서는 개발 과정에서 마주한 문제와 해결 과정을 기록하고, 일상생활을 함께 기록하고 있습니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React", icon: "/reactjs.webp" },
              { name: "TypeScript", icon: "/typescript.webp" },
              { name: "Next.js", icon: "/nextjs.webp" },
              { name: "Gatsby", icon: "/gatsby.webp" },
              { name: "Tailwind CSS", icon: "/tailwind.webp" },
              { name: "Node.js", icon: "/nodejs.webp" },
              { name: "Git", icon: "/git.webp" },
              { name: "GitHub", icon: "/github.webp" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="p-4 rounded-lg flex flex-col items-center gap-3 transition-all duration-200"
                style={{
                  // border: "1px solid var(--border-color)",
                  // backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-secondary)",
                }}
                // onMouseEnter={(e) => {
                //   e.currentTarget.style.borderColor = "var(--accent-blue)";
                //   e.currentTarget.style.backgroundColor = "var(--accent-blue-light)";
                // }}
                // onMouseLeave={(e) => {
                //   e.currentTarget.style.borderColor = "var(--border-color)";
                //   e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                // }}
              >
                <img src={tech.icon} alt={tech.name} className="w-8 h-8 object-contain" />
                <span className="text-xs font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const query = graphql`
  query AboutPage {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
