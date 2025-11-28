import React from "react";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";
import { Layout } from "../components/layout";
import { RecentActivities } from "../components/post";
import { HeroSection, NavigationCard } from "../components/home";

interface IndexPageData {
  site: {
    siteMetadata: {
      title: string;
      description: string;
    };
  };
}

const navigationCards = [
  {
    to: "/devlog",
    title: "DevLog",
    description: `개발 과정에서 배운 기술, 문제 해결 과정,\n그리고 새로운 트렌드에 대한 기록`,
    linkText: "개발 포스트 보기",
    imageSrc: "/devLogCard.webp",
    imageAlt: "devCardImage",
  },
  {
    to: "/lifelog",
    title: "LifeLog",
    description: "일상에서 발견한 소중한 순간들, 여행 경험, \n그리고 삶의 작은 인사이트들",
    linkText: "일상 포스트 보기",
    imageSrc: "/lifeLogCard.webp",
    imageAlt: "lifeCardImage",
  },
];

const IndexPage: React.FC<PageProps<IndexPageData>> = ({ data }) => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <HeroSection />

        {/* Navigation Cards */}
        <section className="grid md:grid-cols-2 gap-12 mb-16">
          {navigationCards.map((card) => (
            <NavigationCard key={card.to} {...card} />
          ))}
        </section>

        {/* Recent Activity */}
        <RecentActivities />
      </div>
    </Layout>
  );
};

export default IndexPage;

import SEO from "../components/common/SEO";

export const Head = () => (
  <SEO />
);

export const query = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
