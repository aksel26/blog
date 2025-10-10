import React, { useEffect, useRef } from "react"

interface GiscusCommentsProps {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping?: string
  reactionsEnabled?: boolean
  emitMetadata?: boolean
  inputPosition?: "top" | "bottom"
  theme?: string
  lang?: string
}

const GiscusComments: React.FC<GiscusCommentsProps> = ({
  repo = "your-username/your-repo", // 실제 GitHub 레포로 변경 필요
  repoId = "your-repo-id", // 실제 레포 ID로 변경 필요
  category = "General",
  categoryId = "your-category-id", // 실제 카테고리 ID로 변경 필요
  mapping = "pathname",
  reactionsEnabled = true,
  emitMetadata = false,
  inputPosition = "bottom",
  theme = "preferred_color_scheme",
  lang = "ko"
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // 기존 script 태그가 있다면 제거
    const existingScript = ref.current.querySelector("script")
    if (existingScript) {
      existingScript.remove()
    }

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.setAttribute("data-repo", repo)
    script.setAttribute("data-repo-id", repoId)
    script.setAttribute("data-category", category)
    script.setAttribute("data-category-id", categoryId)
    script.setAttribute("data-mapping", mapping)
    script.setAttribute("data-strict", "0")
    script.setAttribute("data-reactions-enabled", reactionsEnabled ? "1" : "0")
    script.setAttribute("data-emit-metadata", emitMetadata ? "1" : "0")
    script.setAttribute("data-input-position", inputPosition)
    script.setAttribute("data-theme", theme)
    script.setAttribute("data-lang", lang)
    script.setAttribute("data-loading", "lazy")
    script.crossOrigin = "anonymous"
    script.async = true

    ref.current.appendChild(script)
  }, [repo, repoId, category, categoryId, mapping, reactionsEnabled, emitMetadata, inputPosition, theme, lang])

  // 다크모드 변경 감지를 위한 효과
  useEffect(() => {
    const handleThemeChange = () => {
      const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
      if (iframe && iframe.contentWindow) {
        const isDark = document.documentElement.classList.contains('dark')
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { theme: isDark ? 'dark' : 'light' } } },
          'https://giscus.app'
        )
      }
    }

    // 다크모드 토글 시 테마 변경
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          handleThemeChange()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="mt-8">
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          💬 댓글
        </h3>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            GitHub 계정으로 로그인하여 댓글을 남겨보세요. 
            블로그에 대한 피드백이나 질문을 환영합니다! 🙋‍♂️
          </p>
        </div>
        <div ref={ref} className="giscus-container" />
      </div>
    </div>
  )
}

export default GiscusComments