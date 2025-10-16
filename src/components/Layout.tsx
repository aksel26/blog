import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Header />
      <main className="container mx-auto px-4 py-6  flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
