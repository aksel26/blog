import React from "react"
import { Link } from "gatsby"

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  slug: string
  readTime?: number
  viewCount?: number
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  date,
  category,
  tags,
  slug,
  readTime,
  viewCount
}) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded-full">
            {category}
          </span>
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {date}
          </time>
        </div>
        
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
          <Link to={slug}>
            {title}
          </Link>
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            {readTime && (
              <span>읽는 시간: {readTime}분</span>
            )}
            {viewCount && (
              <span>조회수: {viewCount}</span>
            )}
          </div>
          <Link 
            to={slug}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            더 읽기 →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BlogCard