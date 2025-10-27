import type { GatsbyNode } from "gatsby";
import path from "path";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type MdxFrontmatter {
      thumbnail: String
      thumbnailFile: File @link(by: "id")
    }
  `;

  createTypes(typeDefs);
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode, getNodesByType }) => {
  const { createNodeField, createParentChildLink } = actions;

  if (node.internal.type === "Mdx") {
    const fileNode = getNode(node.parent!);
    const frontmatter = (node as any).frontmatter;
    const category = frontmatter?.category?.toLowerCase() || "posts";

    // Map categories to new navigation structure
    const categoryMap: Record<string, string> = {
      기술: "devLog",
      일상: "lifeLog",
    };

    const mappedCategory = categoryMap[frontmatter?.category] || category;
    const fileName = path.basename((fileNode as any)?.relativePath || "untitled", ".md");
    const slug = `/${mappedCategory}/${fileName}`;

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });

    // thumbnail 파일 처리
    if (frontmatter?.thumbnail && !frontmatter.thumbnail.startsWith("http")) {
      const directory = path.dirname((fileNode as any)?.relativePath || "");
      const thumbnailFileName = frontmatter.thumbnail.replace("./", "");
      const thumbnailRelativePath = path.join(directory, thumbnailFileName);

      // File 노드 찾기
      const allFileNodes = getNodesByType("File");
      const thumbnailFileNode = allFileNodes.find((f: any) => f.sourceInstanceName === "posts" && f.relativePath === thumbnailRelativePath);

      if (thumbnailFileNode) {
        // frontmatter에 File ID 설정
        if (!node.frontmatter) {
          (node as any).frontmatter = {};
        }
        (node as any).frontmatter.thumbnailFile = thumbnailFileNode.id;
      }
    }
  }
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Create 404 page explicitly
  // createPage({
  //   path: "/404/",
  //   component: path.resolve("./src/pages/404.tsx"),
  //   context: {},
  // })

  const result = await graphql(`
    {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
            category
            excerpt
            date
            thumbnail
          }
          internal {
            contentFilePath
          }
          parent {
            ... on File {
              relativeDirectory
            }
          }
        }
      }
      allFile(filter: { extension: { regex: "/(jpg|jpeg|png|gif|webp|mp4|mov|avi)/" }, sourceInstanceName: { eq: "posts" } }) {
        nodes {
          publicURL
          relativePath
          relativeDirectory
          name
          extension
        }
      }
    }
  `);

  // if (result.errors) {
  //   reporter.panicOnBuild("Error loading MDX result", result.errors)
  //   return
  // }

  const posts = (result.data as any).allMdx.nodes;
  const allFiles = (result.data as any).allFile.nodes;

  // Helper function to find thumbnail publicURL
  const findThumbnailUrl = (post: any): string | undefined => {
    if (!post.frontmatter.thumbnail || post.frontmatter.thumbnail.startsWith("http")) {
      return post.frontmatter.thumbnail;
    }

    const postDirectory = post.parent?.relativeDirectory || "";
    const thumbnailFileName = post.frontmatter.thumbnail.replace("./", "");
    const thumbnailRelativePath = path.join(postDirectory, thumbnailFileName);

    const thumbnailFile = allFiles.find((file: any) => file.relativePath === thumbnailRelativePath);
    return thumbnailFile?.publicURL || post.frontmatter.thumbnail;
  };

  // Create blog post pages
  const blogPostTemplate = path.resolve("./src/templates/blog-post.tsx");
  const lifeLogPostTemplate = path.resolve("./src/templates/lifelog-post.tsx");

  posts.forEach((post: any) => {
    // 같은 카테고리의 포스트들만 필터링
    const sameCategoryPosts = posts.filter((p: any) => p.frontmatter.category === post.frontmatter.category);
    const currentIndexInCategory = sameCategoryPosts.findIndex((p: any) => p.fields.slug === post.fields.slug);

    const previousPost = currentIndexInCategory === sameCategoryPosts.length - 1 ? null : sameCategoryPosts[currentIndexInCategory + 1];
    const nextPost = currentIndexInCategory === 0 ? null : sameCategoryPosts[currentIndexInCategory - 1];

    // Resolve thumbnail URLs for previous and next posts
    const previous = previousPost ? {
      ...previousPost,
      frontmatter: {
        ...previousPost.frontmatter,
        thumbnailUrl: findThumbnailUrl(previousPost)
      }
    } : null;

    const next = nextPost ? {
      ...nextPost,
      frontmatter: {
        ...nextPost.frontmatter,
        thumbnailUrl: findThumbnailUrl(nextPost)
      }
    } : null;

    // 카테고리에 따라 다른 템플릿 사용
    const template = post.frontmatter.category === "일상" ? lifeLogPostTemplate : blogPostTemplate;
    const componentPath = `${template}?__contentFilePath=${post.internal.contentFilePath}`;
    console.log("Creating page:", post.fields.slug, "with component:", componentPath);

    createPage({
      path: post.fields.slug,
      component: componentPath,
      context: {
        slug: post.fields.slug,
        id: post.id,
        previous,
        next,
      },
    });
  });

  // Create category pages
  const categories = Array.from(new Set(posts.map((post: any) => post.frontmatter.category).filter(Boolean)));
  const categoryTemplate = path.resolve("./src/templates/category.tsx");

  categories.forEach((category: unknown) => {
    if (typeof category === "string") {
      // Map categories to new navigation structure
      const categoryMap: Record<string, string> = {
        기술: "devLog",
        일상: "lifeLog",
      };

      const mappedCategory = categoryMap[category] || category.toLowerCase();

      createPage({
        path: `/${mappedCategory}`,
        component: categoryTemplate,
        context: {
          category,
          mappedCategory,
        },
      });
    }
  });

  // Create tag pages
  const tagTemplate = path.resolve("./src/templates/tag.tsx");
  const tags = new Set<string>();

  posts.forEach((post: any) => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach((tag: string) => {
        tags.add(tag);
      });
    }
  });

  Array.from(tags).forEach((tag) => {
    createPage({
      path: `/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  });
};
