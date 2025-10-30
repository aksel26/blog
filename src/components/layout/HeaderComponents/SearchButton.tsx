import React, { useState, useCallback } from "react";

interface SearchButtonProps {
  onClick: () => void;
  showShortcut?: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick, showShortcut = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg transition-all duration-200 ${showShortcut ? "flex items-center gap-2" : ""}`}
      style={{
        color: isHovered ? "var(--text-primary)" : "var(--text-secondary)",
        backgroundColor: isHovered ? "var(--bg-secondary)" : "transparent",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title="Search (⌘K)"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {showShortcut && (
        <span
          className="text-xs font-medium px-2 py-0.5 rounded"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-tertiary)",
            fontFamily: "monospace",
          }}
        >
          ⌘K
        </span>
      )}
    </button>
  );
};

export default React.memo(SearchButton);
