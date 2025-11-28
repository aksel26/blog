import React from "react";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";
import { Layout } from "../components/layout";
import SEO from "../components/common/SEO";
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
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Hero Section */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* 프로필 이미지 */}
            <div className="flex-shrink-0">
              <img src="/profile.webp" alt="profile" className="w-40 h-40 md:w-56 md:h-56 rounded-2xl object-cover shadow-sm" />
            </div>

            {/* 소개 */}
            <div className="flex-1 relative">
              <div className="flex gap-x-4 absolute right-0 top-0">
                <a
                  href="mailto:kevinxkim2023@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 transition-colors duration-200"
                  aria-label="Email"
                >
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-[var(--text-primary)] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>

                <a
                  href="https://github.com/aksel26/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-[var(--text-primary)] transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              <div className="mt-2">
                <h1
                  className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  김현민
                </h1>

                


                <p className="text-xl md:text-2xl mb-8 font-medium" style={{ color: "var(--text-tertiary)" }}>
                완벽하지 않아도 기록하고, 배운 것을 나눕니다.
                </p>

                <div className="space-y-6 text-lg leading-loose" style={{ color: "var(--text-tertiary)" }}>
                  <p>프론트엔드 개발자로 일하고 있습니다.<br/>꾸준함의 힘을 믿으며, 매일 조금씩 성장하는 것을 목표로 하고 있습니다.</p>
                  <p>
                    <strong className="font-medium" style={{ color: "var(--text-primary)" }}>개발 이야기</strong>부터 <strong className="font-medium" style={{ color: "var(--text-primary)" }}>맛집, 여행, 일상</strong>까지 — 기록하고 싶은 것들을 자유롭게 남기는 공간입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Focus */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-8 tracking-tight" style={{ color: "var(--text-primary)" }}>
            Current Focus
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className=" transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "transparent",
              }}
            >
              <h3 className="text-xl font-medium mb-4 flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
                Tech & Work
              </h3>
              <p className="leading-relaxed text-lg" style={{ color: "var(--text-tertiary)" }}>
                <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>React</strong>와{" "}
                <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>Next.js</strong>를 기본으로 견고한 웹을 만들고, 최근에는{" "}
                <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>AI 활용</strong>과 검색 엔진 최적화(
                <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>SEO</strong>)에 깊은 관심을 가지고 연구하고 있습니다.
              </p>
            </div>
            <div
              className=" transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "transparent",
              }}
            >
              <h3 className="text-xl font-medium mb-4 flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
                Life & Interest
              </h3>
              <p className="leading-relaxed text-lg" style={{ color: "var(--text-tertiary)" }}>
                코드 밖의 세상에서는 <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>맛집</strong>과{" "}
                <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>커피</strong>를 찾아다니는 미식가이자,{" "}
                <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>공연</strong>과{" "}
                <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>영화</strong>를 즐기는 문화인입니다. 미래를 위해{" "}
                <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>주식투자</strong>와{" "}
                <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>재테크</strong>에도 진심입니다.
              </p>
            </div>
          </div>
        </section>

        {/* Inspiration */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-8 tracking-tight" style={{ color: "var(--text-primary)" }}>
            Inspiration
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                Books
              </h3>
              <p className="leading-relaxed text-lg" style={{ color: "var(--text-secondary)" }}>
                개인과 팀의 발전을 위해 <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>조직 관리</strong>와{" "}
                <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>성장</strong>에 관한 책과 글에 관심이 많습니다.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                YouTube Channels
              </h3>
              <p className="leading-relaxed mb-6 text-lg" style={{ color: "var(--text-secondary)" }}>
                쉴 때는 <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>과학</strong>과{" "}
                <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>IT</strong> 유튜브를 즐겨보며 세상의 원리를 탐구합니다.
              </p>
              <div className="flex flex-wrap gap-3">
                {["취미는 과학", "안될과학", "보다", "범준에 물리다"].map((channel) => (
                  <span
                    key={channel}
                    className="px-4 py-2 rounded-full text-sm font-medium border transition-colors hover:border-[var(--text-primary)]"
                    style={{
                      borderColor: "var(--border-color)",
                      color: "var(--text-secondary)",
                      backgroundColor: "transparent",
                    }}
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8 tracking-tight" style={{ color: "var(--text-primary)" }}>
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                className="p-4 rounded-xl flex items-center gap-4 transition-all duration-200 hover:bg-[var(--bg-secondary)]"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                <img src={tech.icon} alt={tech.name} className="w-8 h-8 object-contain" />
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const Head = () => <SEO title="About" description="프론트엔드 개발자 김현민의 블로그입니다." pathname="/about" />;

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
