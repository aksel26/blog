import React from "react"

const Footer: React.FC = () => {
  return (
    <footer 
      className="mt-auto py-12"
      style={{ 
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-color)"
      }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="mb-6 md:mb-0">
            <h3 
              className="text-xl font-bold mb-2"
              style={{ 
                color: "var(--text-primary)",
                letterSpacing: "-0.02em"
              }}
            >
              Blog
            </h3>
            <p 
              className="text-sm max-w-md leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              개발과 일상을 기록하며, 배움과 경험을 나누는 공간입니다.
            </p>
          </div>
          
          <div className="flex space-x-8">
            <div>
              <h4 
                className="text-sm font-semibold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                카테고리
              </h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/devLog" 
                    className="text-sm transition-colors duration-200"
                    style={{ 
                      color: "var(--text-secondary)",
                      textDecoration: "none"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-blue)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    DevLog
                  </a>
                </li>
                <li>
                  <a 
                    href="/lifeLog" 
                    className="text-sm transition-colors duration-200"
                    style={{ 
                      color: "var(--text-secondary)",
                      textDecoration: "none"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-blue)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    LifeLog
                  </a>
                </li>
                <li>
                  <a 
                    href="/about" 
                    className="text-sm transition-colors duration-200"
                    style={{ 
                      color: "var(--text-secondary)",
                      textDecoration: "none"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-blue)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 
                className="text-sm font-semibold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                연결
              </h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="mailto:contact@example.com" 
                    className="text-sm transition-colors duration-200"
                    style={{ 
                      color: "var(--text-secondary)",
                      textDecoration: "none"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-blue)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200"
                    style={{ 
                      color: "var(--text-secondary)",
                      textDecoration: "none"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-blue)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div 
          className="pt-6"
          style={{ borderTop: "1px solid var(--border-color)" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p 
              className="text-xs mb-4 md:mb-0"
              style={{ color: "var(--text-tertiary)" }}
            >
              &copy; {new Date().getFullYear()} Blog. All rights reserved.
            </p>
            <p 
              className="text-xs"
              style={{ color: "var(--text-tertiary)" }}
            >
              Built with Gatsby, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer