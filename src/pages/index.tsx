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
    description: "개발 과정에서 배운 기술, 문제 해결 과정, \n그리고 새로운 트렌드에 대한 기록",
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

export const Head = () => (
  <>
    <title>Blog - 개발과 일상을 기록하는 공간</title>
    <meta name="description" content="개발 과정에서 배운 것들과 일상의 소중한 순간들을 나누는 개인 블로그입니다." />
    <meta name="google-site-verification" content="3Z0N6Zgzw95Uk6Xwd0iJX_xcWRFAPxL2iozSpiLpukM" />
    <meta name="naver-site-verification" content="b8551eee139d8570cac6b62587127de0de5c7d9d" />

    {/* Favicon */}
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://aksel26.netlify.app/" />
    <meta property="og:title" content="개발과 일상을 기록하는 공간" />
    <meta property="og:description" content="개발 과정에서 배운 것들과 일상의 소중한 순간들을 나누는 개인 블로그입니다." />
    <meta property="og:site_name" content="개발과 일상을 기록하는 공간" />
    <meta property="og:locale" content="ko_KR" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="개발과 일상을 기록하는 공간" />
    <meta name="twitter:description" content="개발 과정에서 배운 것들과 일상의 소중한 순간들을 나누는 개인 블로그입니다." />
  </>
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
