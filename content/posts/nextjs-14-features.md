---
title: "Next.js 14 App Router 마이그레이션 경험기"
date: "2025-01-12"
modified: "2025-01-12"
category: "기술"
tags: ["Next.js", "React", "App Router", "마이그레이션"]
excerpt: "기존 Pages Router에서 Next.js 14 App Router로 마이그레이션하면서 겪은 경험과 해결책을 공유합니다."
thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&h=425&fit=crop"
---

# Next.js 14 App Router 마이그레이션 경험기

회사 프로젝트를 Next.js 13 Pages Router에서 Next.js 14 App Router로 마이그레이션하게 되었습니다. 약 3주간의 작업을 통해 얻은 경험과 노하우를 정리해보겠습니다.

## 🎯 마이그레이션 배경

### 기존 환경
- **Next.js**: 13.4.12 (Pages Router)
- **React**: 18.2.0
- **TypeScript**: 5.0.4
- **스타일링**: Tailwind CSS + styled-components

### 마이그레이션 이유
1. **Server Components** 활용을 통한 성능 개선
2. **새로운 라우팅 시스템**의 직관적인 구조
3. **스트리밍**과 **Suspense**를 통한 UX 개선
4. **향후 업데이트 대응**을 위한 선제적 마이그레이션

## 📋 마이그레이션 계획

### Phase 1: 환경 설정 및 기본 구조 (1주)
- Next.js 14 업그레이드
- app 디렉토리 생성
- 기본 라우트 구조 설계

### Phase 2: 핵심 페이지 마이그레이션 (1주)
- 홈페이지, 로그인, 대시보드
- 레이아웃 컴포넌트 재구성
- 메타데이터 처리

### Phase 3: 세부 기능 및 최적화 (1주)
- API Routes 마이그레이션
- 이미지 최적화
- 성능 측정 및 개선

## 🔧 주요 변경사항

### 1. 폴더 구조 변경

**기존 (Pages Router):**
```
pages/
├── index.tsx
├── about.tsx
├── blog/
│   ├── index.tsx
│   └── [slug].tsx
└── api/
    └── posts.ts
```

**변경후 (App Router):**
```
app/
├── page.tsx
├── layout.tsx
├── about/
│   └── page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
└── api/
    └── posts/
        └── route.ts
```

### 2. 레이아웃 시스템

App Router의 가장 큰 장점 중 하나는 중첩 레이아웃입니다.

```tsx
// app/layout.tsx (Root Layout)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

// app/blog/layout.tsx (Blog Layout)  
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto">
      <aside className="sidebar">
        <BlogNavigation />
      </aside>
      <div className="content">
        {children}
      </div>
    </div>
  )
}
```

### 3. Server Components 도입

**기존 방식 (CSR):**
```tsx
// pages/blog/index.tsx
function BlogPage() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(setPosts)
  }, [])

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

**변경후 (Server Components):**
```tsx
// app/blog/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache' // Static 생성
  })
  return res.json()
}

export default async function BlogPage() {
  const posts = await getPosts()
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

## 🚧 마주친 문제들과 해결책

### 1. useState/useEffect가 Server Component에서 작동하지 않음

**문제:** Server Component에서 클라이언트 상태 관리 불가

**해결책:** 'use client' 지시어를 통한 Client Component 분리

```tsx
// components/InteractiveButton.tsx
'use client'

import { useState } from 'react'

export default function InteractiveButton() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
```

### 2. styled-components SSR 이슈

**문제:** styled-components가 App Router에서 hydration 에러 발생

**해결책:** StyledComponentsRegistry 컴포넌트 생성

```tsx
// lib/styled-components-registry.tsx
'use client'

import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}
```

### 3. 동적 라우팅 변경

**기존:**
```tsx
// pages/blog/[slug].tsx
import { useRouter } from 'next/router'

function BlogPost() {
  const router = useRouter()
  const { slug } = router.query
  
  return <div>Post: {slug}</div>
}
```

**변경후:**
```tsx
// app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string }
}

export default function BlogPost({ params }: Props) {
  return <div>Post: {params.slug}</div>
}
```

## 📊 성능 개선 결과

### Core Web Vitals 비교

| 메트릭 | 마이그레이션 전 | 마이그레이션 후 | 개선율 |
|--------|----------------|----------------|--------|
| LCP | 2.8s | 1.9s | 32% ⬆️ |
| FID | 180ms | 95ms | 47% ⬆️ |
| CLS | 0.15 | 0.08 | 47% ⬆️ |

### Bundle Size 개선

```bash
# Before
First Load JS: 247 kB
Chunks: 89 kB

# After  
First Load JS: 198 kB (-20%)
Chunks: 67 kB (-25%)
```

## 💡 배운 점들

### 1. Server vs Client Component 선택 기준

**Server Component 사용시:**
- 데이터 페칭이 필요한 경우
- SEO가 중요한 콘텐츠
- 정적인 UI 컴포넌트

**Client Component 사용시:**
- 사용자 인터랙션이 필요한 경우
- 브라우저 전용 API 사용
- 상태 관리가 필요한 경우

### 2. 점진적 마이그레이션의 중요성

전체를 한 번에 바꾸려 하지 말고, 페이지별로 점진적으로 마이그레이션하는 것이 안전합니다.

### 3. 캐싱 전략의 중요성

App Router는 다양한 캐싱 옵션을 제공합니다:

```tsx
// Static 생성
fetch('...', { cache: 'force-cache' })

// 매번 새로운 데이터
fetch('...', { cache: 'no-store' })

// 시간 기반 재검증
fetch('...', { next: { revalidate: 3600 } })
```

## 🎯 앞으로의 계획

### 1. 추가 최적화
- 이미지 최적화 (next/image)
- 폰트 최적화 (next/font)
- 번들 분석 및 최적화

### 2. 새로운 기능 도입
- Streaming UI with Suspense
- Parallel Routes
- Intercepting Routes

### 3. 모니터링 강화
- Real User Monitoring 도입
- 성능 메트릭 대시보드 구축

## 📚 참고 자료

- [Next.js App Router 공식 문서](https://nextjs.org/docs/app)
- [React Server Components 이해하기](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023)
- [App Router 마이그레이션 가이드](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

## 💭 마무리

App Router로의 마이그레이션은 초기 러닝커브는 있었지만, 성능과 개발 경험 측면에서 분명한 이점이 있었습니다. 특히 Server Components를 통한 초기 로딩 성능 개선과 중첩 레이아웃을 통한 코드 재사용성이 크게 향상되었습니다.

다음 포스트에서는 App Router의 고급 기능들(Parallel Routes, Intercepting Routes)에 대해 더 자세히 다뤄보겠습니다! 🚀