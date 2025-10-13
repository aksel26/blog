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
      <SEO title="About" description="블로그 운영자에 대한 소개페이지입니다." pathname="/about" />

      <div className="max-w-4xl mx-auto">
        {/* Hero Section with Image Area */}
        <section className="text-center mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            {/* Profile Image Area */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 mx-auto rounded-xl overflow-hidden" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                {/* Placeholder for profile image */}
                <div className="w-full h-full flex items-center justify-center" style={{ color: "var(--text-tertiary)" }}>
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                김현민
              </h1>
              <p className="text-xl mb-4" style={{ color: "var(--text-secondary)" }}>
                사용자 경험을 중시하는 프론트엔드 개발자
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                React와 TypeScript를 주력으로 하며, 깔끔한 코드와 직관적인 UI를 만들기 위해 노력합니다. 개발 과정에서 얻은 지식과 일상의 소중한 순간들을 이
                공간에서 나누고 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mb-16">
          <div className="toss-card p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              👋 안녕하세요!
            </h2>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                개발자로서 성장하는 과정과 일상에서 발견한 소중한 이야기들을 기록하고 있습니다.
              </p>
              <p className="leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                코드의 정확성과 사용자 경험을 중시하며, 새로운 기술을 학습하고 적용하는 것을 좋아합니다. 실무에서 직접 경험한 내용들을 중심으로 실용적이고
                도움이 되는 정보를 공유하려고 노력합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Sections */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text-primary)" }}>
            📚 블로그 운영 방침
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="toss-card p-6">
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: "var(--accent-blue-light)" }}>
                <svg className="w-6 h-6" fill="none" stroke="var(--accent-blue)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                DevLog
              </h3>
              <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                실무에서 직접 사용해본 기술들과 문제 해결 과정을 중심으로 작성합니다. 코드의 정확성과 재현 가능성을 중요하게 생각합니다.
              </p>
            </div>

            <div className="toss-card p-6">
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
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                LifeLog
              </h3>
              <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                여행, 맛집, 일상의 경험들을 솔직하게 기록합니다. 실제 경험을 바탕으로 한 실용적인 정보 제공을 목표로 합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <div className="toss-card p-8 text-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              💌 연락하기
            </h2>
            <p className="mb-6 text-lg" style={{ color: "var(--text-secondary)" }}>
              블로그에 대한 피드백이나 협업 제안이 있으시면 언제든 연락주세요!
            </p>
            <div className="flex justify-center space-x-8">
              <a
                href="mailto:your-email@example.com"
                className="flex flex-col items-center space-y-2 transition-transform hover:scale-105"
                style={{ color: "var(--accent-blue)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--accent-blue-light)" }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">Email</span>
              </a>
              <a
                href="https://github.com/your-github"
                className="flex flex-col items-center space-y-2 transition-transform hover:scale-105"
                style={{ color: "var(--accent-blue)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--accent-blue-light)" }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href="/in/your-linkedin"
                className="flex flex-col items-center space-y-2 transition-transform hover:scale-105"
                style={{ color: "var(--accent-blue)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--accent-blue-light)" }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="text-center">
          <div
            className="toss-card p-8"
            style={{
              background: "linear-gradient(135deg, var(--accent-blue-light) 0%, var(--bg-secondary) 100%)",
            }}
          >
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              🎯 목표
            </h2>
            <p className="text-lg mb-4" style={{ color: "var(--text-secondary)" }}>
              개발자로서 성장하면서 얻은 지식을 공유하고, 다른 개발자들과 소통하며 함께 성장하는 것이 목표입니다.
            </p>
            <p className="text-base font-medium" style={{ color: "var(--accent-blue)" }}>
              "배운 것을 나누고, 나눈 것을 통해 더 배우자" 💪
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
