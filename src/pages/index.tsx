import React from "react"
import type { PageProps } from "gatsby"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import RecentActivities from "../components/RecentActivities"

interface IndexPageData {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
}

const IndexPage: React.FC<PageProps<IndexPageData>> = ({ data }) => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center py-16 mb-16">
          <h1 
            className="text-5xl font-bold mb-6"
            style={{ 
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: "1.1"
            }}
          >
            개발과 일상을<br />기록하는 공간
          </h1>
          <p 
            className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            코드를 통해 배운 것들과 삶에서 경험한 소중한 순간들을 나누는 블로그입니다.
          </p>
        </section>

        {/* Navigation Cards */}
        <section className="grid md:grid-cols-2 gap-6 mb-16">
          <Link to="/devLog" style={{ textDecoration: "none" }}>
            <div 
              className="toss-card p-8 h-full transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-heavy)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-light)";
              }}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundColor: "var(--accent-blue-light)" }}
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="var(--accent-blue)" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h2 
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  DevLog
                </h2>
              </div>
              <p 
                className="text-base leading-relaxed mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                개발 과정에서 배운 기술, 문제 해결 과정, 그리고 새로운 트렌드에 대한 깊이 있는 기록
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
              className="toss-card p-8 h-full transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-heavy)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-light)";
              }}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundColor: "var(--accent-blue-light)" }}
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="var(--accent-blue)" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  LifeLog
                </h2>
              </div>
              <p 
                className="text-base leading-relaxed mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                일상에서 발견한 소중한 순간들, 여행 경험, 그리고 삶의 작은 인사이트들
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
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>Blog - 개발과 일상을 기록하는 공간</title>
    <meta name="description" content="개발 과정에서 배운 것들과 일상의 소중한 순간들을 나누는 개인 블로그입니다." />
  </>
)

export const query = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`