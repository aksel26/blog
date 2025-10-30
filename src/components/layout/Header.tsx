import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "../common/DarkModeToggle";
import SearchDialog from "../common/SearchDialog";
import { NavLink, SearchButton, MobileMenuButton, Logo } from "./HeaderComponents";
import { useKeyboardShortcut, useMobileMenu } from "../../hooks";

const NAV_LINKS = [
  { to: "/devLog", label: "DevLog" },
  { to: "/lifeLog", label: "LifeLog" },
  { to: "/about", label: "About" },
];

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  // Keyboard shortcut: Cmd+K (Mac) or Ctrl+K (Windows/Linux)
  useKeyboardShortcut({
    key: "k",
    callback: openSearch,
  });

  return (
    <header
      style={{
        backgroundColor: "var(--bg-primary)",
        backdropFilter: "blur(20px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <nav className="container mx-auto px-6 py-3 max-w-6xl">
        <div className="flex justify-between items-center">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}

            <div className="w-px h-6 mx-2" style={{ backgroundColor: "var(--border-color)" }}></div>

            <SearchButton onClick={openSearch} />
            <DarkModeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <SearchButton onClick={openSearch} showShortcut={false} />
            <DarkModeToggle />
            <MobileMenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
          </div>
        </div>

        <SearchDialog isOpen={isSearchOpen} onClose={closeSearch} />

        {/* Mobile Menu Dropdown */}
        {isMounted && (
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden mt-4 py-4 border-t overflow-hidden"
                style={{ borderColor: "var(--border-color)" }}
              >
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col space-y-2"
                >
                  {NAV_LINKS.map((link) => (
                    <NavLink key={link.to} to={link.to} onClick={closeMobileMenu} className="py-3">
                      {link.label}
                    </NavLink>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </nav>
    </header>
  );
};

export default Header;
