import React, { useState, useMemo } from "react";
import { graphql, PageProps } from "gatsby";
import { Layout } from "../components/layout";
import SEO from "../components/common/SEO";
import { DevLogCard } from "../components/post";

interface NotionListData {
  allNotion: {
    nodes: Array<{
      title: string;
      properties: {
        Description: {
          value: string;
        };
      };
      fields: {
        slug: string;
      };
      createdAt: string;
    }>;
  };
}

interface NotionListPageContext {
  category: string;
}

const NotionListTemplate: React.FC<PageProps<NotionListData, NotionListPageContext>> = ({ data }) => {
  const posts = data.allNotion.nodes;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center mb-4">
            <div>
              <h1
                className="text-4xl font-bold mb-2"
                style={{
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                Notion Posts
              </h1>
              <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                Notion에서 작성한 포스트
              </p>
            </div>
          </div>
          <p className="text-base leading-relaxed max-w-3xl" style={{ color: "var(--text-secondary)" }}>
            Notion 데이터베이스에서 가져온 포스트들을 확인할 수 있습니다.
          </p>
          <div className="mt-6">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-secondary)",
              }}
            >
              총 {posts.length}개의 포스트
            </span>
          </div>
        </header>

        {/* Posts List */}
        <div className="flex space-y-3 flex-col">
          {posts.length > 0 ? (
            posts.map((post) => (
              <DevLogCard
                key={post.fields.slug}
                title={post.title}
                excerpt={post.properties.Description.value}
                date={post.createdAt}
                tags={[]}
                slug={post.fields.slug}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                아직 포스트가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotionListTemplate;

export const Head: React.FC<PageProps<NotionListData>> = () => {
  return (
    <SEO
      title="Notion Posts"
      description="Notion 데이터베이스에서 가져온 포스트들을 확인할 수 있습니다."
      keywords={["Notion", "블로그", "포스트"]}
      category="Notion"
    />
  );
};

export const query = graphql`
  query NotionList {
    allNotion(filter: { properties: { Status: { value: { name: { eq: "Published" } } } } }, sort: { createdAt: DESC }) {
      nodes {
        title
        properties {
          Description {
            value
          }
        }
        fields {
          slug
        }
        createdAt(formatString: "YYYY년 MM월 DD일")
      }
    }
  }
`;
