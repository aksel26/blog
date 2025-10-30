import { useMemo } from "react";

interface Post {
  frontmatter: {
    title?: string;
    date: string;
    category: string;
    tags?: string[];
    excerpt?: string;
    thumbnail?: string;
    thumbnailFile?: {
      publicURL: string;
    };
  };
  fields?: {
    slug?: string;
  };
  parent?: {
    relativePath?: string;
    relativeDirectory?: string;
  };
  timeToRead?: number;
}

type TabType = "all" | "devLog" | "lifeLog";

interface UsePostFilterOptions {
  posts: Post[];
  activeTab: TabType;
  visibleMonths: number;
}

export const usePostFilter = ({ posts, activeTab, visibleMonths }: UsePostFilterOptions) => {
  const filteredPosts = useMemo(() => {
    const now = new Date();
    const cutoffDate = new Date(now.getFullYear(), now.getMonth() - visibleMonths, now.getDate());

    let filtered = posts.filter((post) => {
      const postDate = new Date(post.frontmatter.date);
      return postDate >= cutoffDate;
    });

    if (activeTab === "devLog") {
      filtered = filtered.filter((post) => post.frontmatter.category === "기술");
    } else if (activeTab === "lifeLog") {
      filtered = filtered.filter((post) => post.frontmatter.category === "일상");
    }

    return filtered;
  }, [posts, activeTab, visibleMonths]);

  const hasMorePosts = useMemo(() => {
    const now = new Date();
    const nextCutoffDate = new Date(now.getFullYear(), now.getMonth() - (visibleMonths + 3), now.getDate());

    return posts.some((post) => {
      const postDate = new Date(post.frontmatter.date);
      return (
        postDate >= nextCutoffDate &&
        postDate < new Date(now.getFullYear(), now.getMonth() - visibleMonths, now.getDate())
      );
    });
  }, [posts, visibleMonths]);

  const getCategoryCount = useMemo(() => {
    return (category: "기술" | "일상" | "all") => {
      const now = new Date();
      const cutoffDate = new Date(now.getFullYear(), now.getMonth() - visibleMonths, now.getDate());

      return posts.filter((post) => {
        const postDate = new Date(post.frontmatter.date);
        const isInDateRange = postDate >= cutoffDate;

        if (category === "all") return isInDateRange;
        return isInDateRange && post.frontmatter.category === category;
      }).length;
    };
  }, [posts, visibleMonths]);

  return {
    filteredPosts,
    hasMorePosts,
    getCategoryCount,
  };
};
