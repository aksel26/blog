import React from "react";
import type { PageProps } from "gatsby";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import RecentActivities from "../components/RecentActivities";

interface IndexPageData {
  site: {
    siteMetadata: {
      title: string;
      description: string;
    };
  };
}

const IndexPage: React.FC<PageProps<IndexPageData>> = ({ data }) => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section
          className="text-center py-16 mb-16 rounded-lg"
          style={{
            backgroundImage: "url('/blue.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1
            className="text-5xl font-bold mb-6"
            style={{
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
            }}
          >
            개발과 일상을
            <br />
            기록하는 공간
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            코드를 통해 배운 것들과 삶에서 경험한 소중한 순간들을 나누는 블로그입니다.
          </p>
        </section>

        {/* Navigation Cards */}
        <section className="grid md:grid-cols-2 gap-12 mb-16">
          <Link to="/devLog" style={{ textDecoration: "none" }}>
            <div
              className="relative p-8 px-0 h-full transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img src="/devLogCard.webp" alt="devCardImage" className="absolute right-0 bottom-0 w-32 h-32 sm:w-42 sm:h-42 opacity-10" />

              <h2 className="text-2xl mb-4 font-bold" style={{ color: "var(--text-primary)" }}>
                DevLog
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                개발 과정에서 배운 기술, 문제 해결 과정, <br />
                그리고 새로운 트렌드에 대한 기록
              </p>
              <div className="flex items-center text-sm font-medium" style={{ color: "var(--accent-blue)" }}>
                개발 포스트 보기
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <Link to="/lifeLog" style={{ textDecoration: "none" }}>
            <div
              className="relative p-8 px-0 h-full transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img src="/lifeLogCard.png" alt="devCardImage" className="absolute right-0 bottom-0 w-32 h-32 sm:w-42 sm:h-42 opacity-10" />
              <h2 className="text-2xl mb-4 font-bold" style={{ color: "var(--text-primary)" }}>
                LifeLog
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                일상에서 발견한 소중한 순간들, 여행 경험, <br />
                그리고 삶의 작은 인사이트들
              </p>
              <div className="flex items-center text-sm font-medium" style={{ color: "var(--accent-blue)" }}>
                일상 포스트 보기
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </section>

        {/* Recent Activity */}
        <RecentActivities />
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <title>Blog - 개발과 일상을 기록하는 공간</title>
    <meta name="description" content="개발 과정에서 배운 것들과 일상의 소중한 순간들을 나누는 개인 블로그입니다." />
    <meta name="google-site-verification" content="3Z0N6Zgzw95Uk6Xwd0iJX_xcWRFAPxL2iozSpiLpukM" />
    <meta name="naver-site-verification" content="b8551eee139d8570cac6b62587127de0de5c7d9d" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://aksel26.netlify.app/" />
    <meta property="og:title" content="개발과 일상을 기록하는 공간" />
    <meta property="og:description" content="개발 과정에서 배운 것들과 일상의 소중한 순간들을 나누는 개인 블로그입니다." />
    <meta property="og:site_name" content="개발과 일상을 기록하는 공간" />
    <meta property="og:locale" content="ko_KR" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="개발과 일상을 기록하는 공간" />
    <meta name="twitter:description" content="개발 과정에서 배운 것들과 일상의 소중한 순간들을 나누는 개인 블로그입니다." />
  </>
);

export const query = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
