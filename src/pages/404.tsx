import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="404: 페이지를 찾을 수 없습니다" />
      
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="mb-8">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "var(--bg-tertiary)" }}
          >
            <svg 
              className="w-12 h-12" 
              fill="none" 
              stroke="var(--text-tertiary)" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
          
          <h1 
            className="text-6xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            404
          </h1>
          
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            페이지를 찾을 수 없습니다
          </h2>
          
          <p 
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. 
            아래 링크를 통해 다른 페이지로 이동해보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div 
              className="toss-card p-6 h-full transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-medium)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-light)";
              }}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: "var(--accent-blue-light)" }}
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="var(--accent-blue)" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                    />
                  </svg>
                </div>
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  홈으로
                </h3>
              </div>
              <p 
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                메인 페이지로 돌아가기
              </p>
            </div>
          </Link>

          <Link to="/devLog" style={{ textDecoration: "none" }}>
            <div 
              className="toss-card p-6 h-full transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-medium)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-light)";
              }}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: "var(--accent-blue-light)" }}
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="var(--accent-blue)" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
                    />
                  </svg>
                </div>
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  DevLog
                </h3>
              </div>
              <p 
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                개발 관련 포스트 보기
              </p>
            </div>
          </Link>

          <Link to="/lifeLog" style={{ textDecoration: "none" }}>
            <div 
              className="toss-card p-6 h-full transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-medium)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-light)";
              }}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: "var(--accent-blue-light)" }}
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="var(--accent-blue)" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </div>
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  LifeLog
                </h3>
              </div>
              <p 
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                일상 관련 포스트 보기
              </p>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <p 
            className="text-sm mb-4"
            style={{ color: "var(--text-tertiary)" }}
          >
            또는 브라우저의 뒤로가기 버튼을 눌러주세요.
          </p>
          
          <button
            onClick={() => window.history.back()}
            className="toss-card px-6 py-3 transition-all duration-300"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-medium)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-light)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div className="flex items-center space-x-2">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              <span>이전 페이지로</span>
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => (
  <>
    <title>404: 페이지를 찾을 수 없습니다 - Blog</title>
    <meta name="description" content="요청하신 페이지를 찾을 수 없습니다. 다른 페이지로 이동해보세요." />
  </>
);