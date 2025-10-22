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

      <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <div className="inline-block mb-6">
              <img src="/profile.webp" alt="profile" className="w-48" />
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
            <p className="text-xl md:text-2xl mb-2" style={{ color: "var(--text-secondary)" }}>
              Frontend Developer
            </p>
            <p className="text-base" style={{ color: "var(--text-tertiary)" }}>
              사용자 경험을 중시하는 프론트엔드 개발자
            </p>
          </div>
        </section>

        {/* About Me */}
        <section className="mb-16">
          <div
            className="p-8 rounded-xl"
            style={{
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <span>👋</span>
              <span>안녕하세요</span>
            </h2>
            <div className="space-y-4" style={{ color: "var(--text-secondary)" }}>
              <p className="leading-relaxed">React와 TypeScript를 주력으로 사용하며, 깔끔한 코드와 직관적인 UI를 만들기 위해 노력합니다.</p>
              <p className="leading-relaxed">실무에서 직면한 문제들과 해결 과정을 기록하고, 일상에서 발견한 소중한 순간들을 이 공간에서 나누고 있습니다.</p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            💻 Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["React", "TypeScript", "Next.js", "Gatsby", "Tailwind CSS", "Node.js", "Git", "Figma"].map((tech) => (
              <div
                key={tech}
                className="p-4 rounded-lg text-center transition-all duration-200"
                style={{
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-blue)";
                  e.currentTarget.style.backgroundColor = "var(--accent-blue-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                }}
              >
                <span className="text-sm font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Info */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            📝 블로그 소개
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* DevLog Card */}
            <div
              className="p-6 rounded-xl"
              style={{
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: "var(--accent-blue-light)" }}>
                <svg className="w-6 h-6" fill="none" stroke="var(--accent-blue)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                DevLog
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                개발 과정에서 배운 기술과 문제 해결 과정을 실용적으로 정리합니다.
              </p>
            </div>

            {/* LifeLog Card */}
            <div
              className="p-6 rounded-xl"
              style={{
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: "var(--accent-blue-light)" }}>
                <svg className="w-6 h-6" fill="none" stroke="var(--accent-blue)" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                LifeLog
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                일상에서 발견한 소중한 순간들과 여행, 맛집 경험을 공유합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            📬 Contact
          </h2>
          <div
            className="p-8 rounded-xl text-center"
            style={{
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <p className="mb-8 text-lg" style={{ color: "var(--text-secondary)" }}>
              협업 제안이나 문의사항이 있으시면 편하게 연락주세요!
            </p>

            <div className="flex justify-center gap-8 flex-wrap">
              {/* Email */}
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
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--accent-blue-light)",
                    color: "var(--accent-blue)",
                  }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  Email
                </span>
              </a>

              {/* GitHub */}
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
                  style={{
                    backgroundColor: "var(--accent-blue-light)",
                    color: "var(--accent-blue)",
                  }}
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  GitHub
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section>
          <div
            className="p-8 rounded-xl text-center"
            style={{
              background: "linear-gradient(135deg, var(--accent-blue-light) 0%, var(--bg-secondary) 100%)",
              border: "1px solid var(--accent-blue)",
            }}
          >
            <p className="text-xl font-medium italic mb-2" style={{ color: "var(--text-primary)" }}>
              "배운 것을 나누고, 나눈 것을 통해 더 배우자"
            </p>
            <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
              Learn, Share, Grow Together
            </p>
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
