import type { GatsbyNode } from "gatsby"
import path from "path"

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
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
  }
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            category
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors)
    return
  }

  const posts = (result.data as any).allMarkdownRemark.nodes

  // Create blog post pages
  const blogPostTemplate = path.resolve("./src/templates/blog-post.tsx")
  
  posts.forEach((post: any) => {
    createPage({
      path: post.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.fields.slug,
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