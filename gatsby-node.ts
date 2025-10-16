import type { GatsbyNode } from "gatsby"
import path from "path"

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const fileNode = getNode(node.parent!)
    const frontmatter = (node as any).frontmatter
    const category = frontmatter?.category?.toLowerCase() || "posts"

    // Map categories to new navigation structure
    const categoryMap: Record<string, string> = {
      "기술": "devLog",
      "일상": "lifeLog"
    }

    const mappedCategory = categoryMap[frontmatter?.category] || category
    const fileName = path.basename((fileNode as any)?.relativePath || "untitled", ".md")
    const slug = `/${mappedCategory}/${fileName}`

    createNodeField({
      node,
      name: "slug",
      value: slug,
    })

    // thumbnail URL 처리
    if (frontmatter?.thumbnail) {
      const thumbnail = frontmatter.thumbnail
      // 외부 URL인 경우 그대로 사용
      if (thumbnail.startsWith('http://') || thumbnail.startsWith('https://')) {
        createNodeField({
          node,
          name: "thumbnailUrl",
          value: thumbnail,
        })
      } else {
        // 상대 경로인 경우 publicURL로 변환
        // ./thumbnail.webp -> /static/thumbnail-xxx.webp 형태로 변환됨
        const directory = path.dirname((fileNode as any)?.relativePath || "")
        const thumbnailPath = path.join(directory, thumbnail.replace('./', ''))
        createNodeField({
          node,
          name: "thumbnailPath",
          value: thumbnailPath,
        })
      }
    }
  }
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Create 404 page explicitly
  createPage({
    path: "/404/",
    component: path.resolve("./src/pages/404.tsx"),
    context: {},
  })

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
            thumbnail {
              publicURL
            }
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors)
    return
  }

  const posts = (result.data as any).allMdx.nodes

  // Create blog post pages
  const blogPostTemplate = path.resolve("./src/templates/blog-post.tsx")
  const lifeLogPostTemplate = path.resolve("./src/templates/lifelog-post.tsx")

  posts.forEach((post: any) => {
    // 같은 카테고리의 포스트들만 필터링
    const sameCategoryPosts = posts.filter((p: any) => p.frontmatter.category === post.frontmatter.category)
    const currentIndexInCategory = sameCategoryPosts.findIndex((p: any) => p.fields.slug === post.fields.slug)

    const previousPost = currentIndexInCategory === sameCategoryPosts.length - 1 ? null : sameCategoryPosts[currentIndexInCategory + 1]
    const nextPost = currentIndexInCategory === 0 ? null : sameCategoryPosts[currentIndexInCategory - 1]

    // thumbnail을 객체에서 문자열로 변환
    const previous = previousPost ? {
      ...previousPost,
      frontmatter: {
        ...previousPost.frontmatter,
        thumbnail: previousPost.frontmatter.thumbnail?.publicURL || null
      }
    } : null

    const next = nextPost ? {
      ...nextPost,
      frontmatter: {
        ...nextPost.frontmatter,
        thumbnail: nextPost.frontmatter.thumbnail?.publicURL || null
      }
    } : null

    // 카테고리에 따라 다른 템플릿 사용
    const template = post.frontmatter.category === "일상" ? lifeLogPostTemplate : blogPostTemplate
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
    })
  })

  // Create category pages
  const categories = Array.from(new Set(posts.map((post: any) => post.frontmatter.category).filter(Boolean)))
  const categoryTemplate = path.resolve("./src/templates/category.tsx")

  categories.forEach((category: unknown) => {
    if (typeof category === 'string') {
      // Map categories to new navigation structure
      const categoryMap: Record<string, string> = {
        "기술": "devLog",
        "일상": "lifeLog"
      }
      
      const mappedCategory = categoryMap[category] || category.toLowerCase()
      
      createPage({
        path: `/${mappedCategory}`,
        component: categoryTemplate,
        context: {
          category,
          mappedCategory,
        },
      })
    }
  })
}