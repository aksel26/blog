import React, { useState } from "react";
import { Link } from "gatsby";
import DarkModeToggle from "./DarkModeToggle";
import SearchDialog from "./SearchDialog";

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: "var(--bg-primary)",
        borderBottom: "1px solid var(--border-color)",
        backdropFilter: "blur(20px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <nav className="container mx-auto px-6 py-4 max-w-6xl">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-medium"
            style={{
              color: "var(--text-primary)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            HMKIM
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/devLog"
              className="px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              DevLog
            </Link>
            <Link
              to="/lifeLog"
              className="px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              LifeLog
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              About
            </Link>

            <div className="w-px h-6 mx-2" style={{ backgroundColor: "var(--border-color)" }}></div>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg transition-all duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <DarkModeToggle />
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <DarkModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg transition-all duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t" style={{ borderColor: "var(--border-color)" }}>
            <div className="flex flex-col space-y-2">
              <Link
                to="/devLog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ color: "var(--text-secondary)", textDecoration: "none" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                DevLog
              </Link>
              <Link
                to="/lifeLog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ color: "var(--text-secondary)", textDecoration: "none" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                LifeLog
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ color: "var(--text-secondary)", textDecoration: "none" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
