import React, { useState, useEffect } from "react"

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const headings = content.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi) || []
    const tocItems: TOCItem[] = headings.map((heading) => {
      const level = parseInt(heading.match(/<h([1-6])/)?.[1] || "1")
      const title = heading.replace(/<[^>]*>/g, "")
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim()
      
      return { id, title, level }
    })
    
    setToc(tocItems)
  }, [content])

  useEffect(() => {
    const handleScroll = () => {
      const headings = toc.map(item => document.getElementById(item.id)).filter(Boolean)
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        if (heading && heading.offsetTop <= window.scrollY + 100) {
          setActiveId(heading.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [toc])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (toc.length === 0) return null

  return (
    <nav className="sticky top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        목차
      </h3>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToHeading(item.id)}
              className={`
                block w-full text-left transition-colors duration-200
                ${item.level === 1 ? "font-medium" : ""}
                ${item.level === 2 ? "ml-4 text-sm" : ""}
                ${item.level >= 3 ? "ml-8 text-sm" : ""}
                ${
                  activeId === item.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }
              `}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents