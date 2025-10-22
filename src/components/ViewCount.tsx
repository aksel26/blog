import React, { useEffect, useState } from "react";

interface ViewCountProps {
  slug: string;
  className?: string;
}

const ViewCount: React.FC<ViewCountProps> = ({ slug, className = "" }) => {
  const [viewCount, setViewCount] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof window === "undefined") return;

    // 로컬 스토리지에서 조회수 데이터 가져오기
    const getViewCounts = (): Record<string, number> => {
      try {
        const stored = localStorage.getItem("blog-view-counts");
        return stored ? JSON.parse(stored) : {};
      } catch (error) {
        console.error("Error reading view counts:", error);
        return {};
      }
    };

    // 조회수 저장
    const saveViewCounts = (counts: Record<string, number>) => {
      try {
        localStorage.setItem("blog-view-counts", JSON.stringify(counts));
      } catch (error) {
        console.error("Error saving view counts:", error);
      }
    };

    // 현재 세션에서 이미 조회했는지 확인
    const hasViewedInSession = (): boolean => {
      try {
        const sessionViews = sessionStorage.getItem("blog-session-views");
        const viewedSlugs = sessionViews ? JSON.parse(sessionViews) : [];
        return viewedSlugs.includes(slug);
      } catch (error) {
        console.error("Error reading session views:", error);
        return false;
      }
    };

    // 세션 조회 기록 저장
    const markAsViewedInSession = () => {
      try {
        const sessionViews = sessionStorage.getItem("blog-session-views");
        const viewedSlugs = sessionViews ? JSON.parse(sessionViews) : [];
        if (!viewedSlugs.includes(slug)) {
          viewedSlugs.push(slug);
          sessionStorage.setItem("blog-session-views", JSON.stringify(viewedSlugs));
        }
      } catch (error) {
        console.error("Error saving session view:", error);
      }
    };

    const counts = getViewCounts();

    // 현재 포스트의 조회수 가져오기
    const currentCount = counts[slug] || 0;

    // 세션에서 아직 조회하지 않았다면 조회수 증가
    if (!hasViewedInSession()) {
      const newCount = currentCount + 1;
      counts[slug] = newCount;
      saveViewCounts(counts);
      markAsViewedInSession();
      setViewCount(newCount);
    } else {
      setViewCount(currentCount);
    }
  }, [slug]);

  if (!isClient) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={{ color: "var(--text-tertiary)" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      <span style={{ color: "var(--text-tertiary)" }}>
        {viewCount.toLocaleString()} views
      </span>
    </div>
  );
};

export default ViewCount;
