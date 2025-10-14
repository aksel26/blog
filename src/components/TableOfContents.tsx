import React, { useState, useEffect } from "react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content?: string;
  isMobile?: boolean;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content = "", isMobile = false }) => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // DOM이 렌더링된 후에 실제 헤딩 요소들을 찾아서 TOC 생성
    const timer = setTimeout(() => {
      // 본문 컨테이너 내의 헤딩만 선택 (prose 클래스 내부)
      const articleContent = document.querySelector(".prose, article");
      if (!articleContent) return;

      const headingElements = articleContent.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const tocItems: TOCItem[] = Array.from(headingElements).map((element) => {
        const level = parseInt(element.tagName.charAt(1));
        const title = element.textContent || "";

        // 실제 DOM 요소의 ID를 사용 (gatsby-remark-autolink-headers가 생성한 ID)
        let id = element.id;

        // ID가 없는 경우 생성
        if (!id) {
          id = title
            .toLowerCase()
            .replace(/[^\w\s가-힣-]/g, "") // 한글 지원
            .replace(/\s+/g, "-")
            .trim();
          element.id = id; // DOM 요소에 ID 설정
        }

        return { id, title, level };
      });

      setToc(tocItems);
      console.log("TOC generated:", tocItems);
    }, 100); // DOM 렌더링 완료 후 실행

    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = toc.map((item) => document.getElementById(item.id)).filter(Boolean);

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= window.scrollY + 100) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const scrollToHeading = (id: string) => {
    console.log("Scrolling to heading:", id);
    const element = document.getElementById(id);
    console.log("Found element:", element);

    if (element) {
      // 헤더 높이를 고려한 오프셋 추가 (100px)
      const offsetTop = element.offsetTop - 100;
      console.log("Scrolling to position:", offsetTop);

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    } else {
      console.log("Element not found for id:", id);
    }
  };

  if (toc.length === 0) return null;

  // 모바일용 콜랩서블 TOC
  if (isMobile) {
    return (
      <nav className="mb-8 border rounded-lg" style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-secondary)" }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 text-left"
          style={{ color: "var(--text-primary)" }}
        >
          <h3 className="text-lg font-semibold">목차</h3>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isOpen ? `${toc.length * 40 + 32}px` : "0px",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <ul className="px-4 pb-4 space-y-2">
            {toc.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    scrollToHeading(item.id);
                    setIsOpen(false); // 클릭 후 자동으로 닫기
                  }}
                  className={`
                    block w-full text-left transition-colors duration-200
                    ${item.level === 1 ? "font-medium" : ""}
                    ${item.level === 2 ? "ml-4 text-sm" : ""}
                    ${item.level >= 3 ? "ml-8 text-sm" : ""}
                  `}
                  style={{
                    color: activeId === item.id ? "var(--accent-blue)" : "var(--text-secondary)",
                  }}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  // 데스크톱용 스티키 TOC
  return (
    <nav className="sticky top-24 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto w-max overflow-x-hidden">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">목차</h3>
      <ul className="space-y-2">
        {toc.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => scrollToHeading(item.id)}
              className={`
                block w-full text-left transition-colors duration-200
                ${item.level === 1 ? "font-medium" : ""}
                ${item.level === 2 ? "ml-4 text-sm" : ""}
                ${item.level >= 3 ? "ml-8 text-sm" : ""}
                ${activeId === item.id ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}
              `}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
