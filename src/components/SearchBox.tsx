import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"

interface SearchResult {
  title: string
  excerpt: string
  slug: string
  category: string
  tags: string[]
}

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const data = useStaticQuery(graphql`
    query SearchData {
      allMdx {
        nodes {
          frontmatter {
            title
            excerpt
            category
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  const posts: SearchResult[] = data.allMdx.nodes.map((node: any) => ({
    title: node.frontmatter.title,
    excerpt: node.frontmatter.excerpt,
    slug: node.fields.slug,
    category: node.frontmatter.category,
    tags: node.frontmatter.tags || [],
  }))

  useEffect(() => {
    if (query.length > 1) {
      const filtered = posts.filter((post) => {
        const searchText = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase()
        return searchText.includes(query.toLowerCase())
      })
      setResults(filtered.slice(0, 5)) // Limit to 5 results
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query, posts])

  const handleResultClick = (slug: string) => {
    navigate(slug)
    setQuery("")
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="toss-input pl-10"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)"
          }}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 rounded-lg z-50 max-h-80 overflow-y-auto"
          style={{
            backgroundColor: "var(--bg-primary)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-medium)"
          }}
        >
          {results.map((result) => (
            <button
              key={result.slug}
              onClick={() => handleResultClick(result.slug)}
              className="w-full px-4 py-3 text-left transition-all duration-200 last:border-b-0"
              style={{
                borderBottom: "1px solid var(--border-color)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                  {result.title}
                </h3>
                <span 
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    backgroundColor: "var(--accent-blue-light)",
                    color: "var(--accent-blue)"
                  }}
                >
                  {result.category}
                </span>
              </div>
              <p className="text-sm line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                {result.excerpt}
              </p>
              {result.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {result.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {isOpen && query.length > 1 && results.length === 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 rounded-lg z-50 p-4"
          style={{
            backgroundColor: "var(--bg-primary)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-medium)"
          }}
        >
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            "{query}"에 대한 검색 결과가 없습니다.
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchBox