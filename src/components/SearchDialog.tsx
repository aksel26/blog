import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { Link, useStaticQuery, graphql } from "gatsby";

interface SearchPost {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    category: string;
    excerpt: string;
    date: string;
    thumbnail?: string;
  };
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const data = useStaticQuery(graphql`
    query SearchQuery {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            category
            excerpt
            date(formatString: "YYYY년 MM월 DD일")
            thumbnail {
              publicURL
            }
          }
        }
      }
    }
  `);

  const allPosts: SearchPost[] = data.allMdx.nodes;

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];

    return allPosts
      .filter((post) =>
        post.frontmatter.title.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8); // 최대 8개 결과만 표시
  }, [query, allPosts]);

  // Dialog가 열릴 때 포커스
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 검색어 변경 시 선택 인덱스 초기화
  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  // 키보드 네비게이션
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredPosts.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredPosts.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredPosts.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && filteredPosts[selectedIndex]) {
          window.location.href = filteredPosts[selectedIndex].fields.slug;
        }
        break;
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 flex items-start justify-center pt-16 px-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed",
      }}
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
        style={{
          backgroundColor: "var(--bg-primary)",
          border: "1px solid var(--border-color)",
        }}
      >
        {/* Search Input */}
        <div
          className="p-6 border-b"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="var(--text-tertiary)"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="포스트 제목을 검색하세요..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-3 text-lg rounded-lg border focus:outline-none"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                onClick={onClose}
                className="p-1 rounded-md transition-colors"
                style={{ color: "var(--text-tertiary)" }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim() && (
            <div className="p-6">
              {filteredPosts.length > 0 ? (
                <div ref={resultsRef} className="flex flex-col space-y-3">
                  {filteredPosts.map((post, index) => (
                    <Link
                      key={post.fields.slug}
                      to={post.fields.slug}
                      onClick={onClose}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-200`}
                        style={{
                          backgroundColor:
                            index === selectedIndex
                              ? "var(--accent-blue-light)"
                              : "var(--bg-secondary)",
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Thumbnail */}
                          {post.frontmatter.thumbnail && (
                            <div
                              className="w-12 h-12 rounded-md bg-cover bg-center flex-shrink-0"
                              style={{
                                backgroundImage: `url(${post.frontmatter.thumbnail})`,
                              }}
                            />
                          )}

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3
                                className="font-medium text-sm truncate"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {post.frontmatter.title}
                              </h3>
                              <span
                                className="px-2 py-0.5 text-xs rounded-full flex-shrink-0"
                                style={{
                                  backgroundColor: "var(--bg-tertiary)",
                                  color: "var(--text-tertiary)",
                                }}
                              >
                                {post.frontmatter.category === "기술"
                                  ? "DevLog"
                                  : "LifeLog"}
                              </span>
                            </div>
                            <p
                              className="text-xs line-clamp-2 mb-1"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {post.frontmatter.excerpt}
                            </p>
                            <time
                              className="text-xs"
                              style={{ color: "var(--text-tertiary)" }}
                            >
                              {post.frontmatter.date}
                            </time>
                          </div>

                          {/* Enter Icon for Selected Item */}
                          {index === selectedIndex && (
                            <div className="flex-shrink-0 mt-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="var(--accent-blue)"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 opacity-50"
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
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    "{query}"에 대한 검색 결과가 없습니다.
                  </p>
                </div>
              )}
            </div>
          )}

          {!query.trim() && (
            <div className="text-center py-12 px-6">
              <svg
                className="w-12 h-12 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="var(--text-tertiary)"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                검색할 포스트 제목을 입력하세요
              </p>
              <p
                className="text-xs mt-2"
                style={{ color: "var(--text-tertiary)" }}
              >
                ↑↓ 화살표로 이동, Enter로 선택, ESC로 닫기
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Use portal to render outside of header component
  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
};

export default SearchDialog;
