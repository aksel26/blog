import React from "react";
import { trackShare } from "../utils/analytics";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, description, className = "" }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    kakao: () => {
      if (typeof window !== "undefined" && (window as any).Kakao) {
        const kakao = (window as any).Kakao;
        if (!kakao.isInitialized()) {
          kakao.init("YOUR_KAKAO_APP_KEY"); // 실제 카카오톡 앱 키로 변경 필요
        }
        kakao.Link.sendDefault({
          objectType: "feed",
          content: {
            title: title,
            description: description || "",
            imageUrl: "", // OG 이미지 URL 추가 가능
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
          buttons: [
            {
              title: "웹으로 보기",
              link: {
                mobileWebUrl: url,
                webUrl: url,
              },
            },
          ],
        });
        trackShare("kakao", url, title);
      }
    },
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("링크가 클립보드에 복사되었습니다!");
      trackShare("copy_link", url, title);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    if (platform === "kakao") {
      shareLinks.kakao();
    } else {
      window.open(shareLinks[platform] as string, "_blank", "noopener,noreferrer,width=600,height=400");
      trackShare(platform, url, title);
    }
  };

  return (
    <div className={`social-share ${className}`}>
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          공유하기:
        </span>

        {/* Twitter */}
        <button
          onClick={() => handleShare("twitter")}
          className="share-button twitter"
          aria-label="트위터에 공유"
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid var(--border-color)",
            background: "var(--bg-secondary)",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#1DA1F2";
            e.currentTarget.style.borderColor = "#1DA1F2";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bg-secondary)";
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
          </svg>
          <span className="text-sm">Twitter</span>
        </button>

        {/* Facebook */}
        <button
          onClick={() => handleShare("facebook")}
          className="share-button facebook"
          aria-label="페이스북에 공유"
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid var(--border-color)",
            background: "var(--bg-secondary)",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#1877F2";
            e.currentTarget.style.borderColor = "#1877F2";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bg-secondary)";
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="text-sm">Facebook</span>
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare("linkedin")}
          className="share-button linkedin"
          aria-label="링크드인에 공유"
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid var(--border-color)",
            background: "var(--bg-secondary)",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#0A66C2";
            e.currentTarget.style.borderColor = "#0A66C2";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bg-secondary)";
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <span className="text-sm">LinkedIn</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="share-button copy"
          aria-label="링크 복사"
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid var(--border-color)",
            background: "var(--bg-secondary)",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent-blue)";
            e.currentTarget.style.borderColor = "var(--accent-blue)";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bg-secondary)";
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span className="text-sm">링크 복사</span>
        </button>
      </div>
    </div>
  );
};

export default SocialShare;
