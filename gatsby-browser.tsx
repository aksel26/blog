import "./src/styles/global.css"

// Import Prism.js core first
import "prismjs"
import "prismjs/themes/prism.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

// Import Prism.js language packs
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-scss"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-yaml"

// Import Prism.js plugins
import "prismjs/plugins/line-numbers/prism-line-numbers"

import { navigate } from "gatsby"

// Handle client-side routing for 404 pages
export const onRouteUpdate = ({ location }: { location: { pathname: string } }) => {
  // In development, manually navigate to 404 page for non-existent routes
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const validRoutes = ["/", "/devLog", "/lifeLog", "/404"]
    const isValidRoute = validRoutes.includes(location.pathname) || 
                        location.pathname.startsWith("/devLog/") || 
                        location.pathname.startsWith("/lifeLog/")
    
    if (!isValidRoute && location.pathname !== "/404/") {
      setTimeout(() => {
        navigate("/404/")
      }, 100)
    }
  }
}