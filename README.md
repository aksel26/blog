# Blog Site v2

Gatsby와 React를 활용한 개인 블로그 사이트입니다. 기술 블로그와 일상 블로그를 분리하여 운영할 수 있도록 설계되었습니다.

## 🚀 주요 기능

### ✨ 블로그 기능
- **카테고리별 포스트 관리** - 기술/일상 블로그 분리
- **검색 기능** - 실시간 포스트 검색
- **태그 시스템** - 포스트 분류 및 검색
- **목차 자동 생성** - 긴 포스트의 가독성 향상
- **읽는 시간 표시** - 포스트 길이 예상 시간

### 🎨 사용자 경험
- **다크 모드 지원** - 시스템 설정 연동 및 수동 토글
- **반응형 디자인** - 모바일, 태블릿, 데스크톱 최적화
- **SEO 최적화** - 메타 태그, Open Graph, Twitter Cards
- **댓글 시스템** - Giscus를 통한 GitHub 기반 댓글

### 🛠️ 기술 스택
- **프레임워크**: Gatsby 5.x
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v4
- **마크다운**: gatsby-transformer-remark
- **코드 하이라이팅**: Prism.js
- **댓글**: Giscus
- **SEO**: React Helmet

## 📁 프로젝트 구조

```
blog-v2/
├── content/posts/          # 마크다운 포스트 파일들
├── src/
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── BlogCard.tsx
│   │   ├── SearchBox.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── DarkModeToggle.tsx
│   │   ├── GiscusComments.tsx
│   │   └── SEO.tsx
│   ├── pages/              # 정적 페이지들
│   │   ├── index.tsx       # 홈페이지
│   │   └── about.tsx       # 소개 페이지
│   ├── templates/          # 동적 페이지 템플릿
│   │   ├── blog-post.tsx   # 블로그 포스트 템플릿
│   │   └── category.tsx    # 카테고리 페이지 템플릿
│   ├── styles/
│   │   └── global.css      # 전역 스타일
│   └── images/             # 이미지 파일들
├── gatsby-config.ts        # Gatsby 설정
├── gatsby-node.ts          # 빌드 타임 페이지 생성
├── gatsby-browser.tsx      # 브라우저 APIs
└── tsconfig.json          # TypeScript 설정
```

## 🏃‍♂️ 시작하기

### 1. 프로젝트 클론 및 설치

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run develop
```

### 2. 환경 설정

#### Giscus 댓글 설정
1. GitHub에서 공개 레포지토리 생성
2. [Giscus 설정 페이지](https://giscus.app/ko)에서 설정값 확인
3. `src/components/GiscusComments.tsx`에서 설정값 업데이트:

```typescript
// 실제 값으로 변경 필요
repo="your-username/your-repo"
repoId="your-repo-id"
category="General"
categoryId="your-category-id"
```

#### 사이트 정보 설정
`gatsby-config.ts`에서 사이트 메타데이터 수정:

```typescript
siteMetadata: {
  title: "Your Blog Title",
  description: "Your blog description",
  author: "@your-handle",
  siteUrl: "https://your-domain.com",
}
```

### 3. 블로그 포스트 작성

`content/posts/` 디렉토리에 마크다운 파일 생성:

```markdown
---
title: "포스트 제목"
date: "2024-03-15"
modified: "2024-03-15"
category: "기술" # 또는 "일상"
tags: ["React", "TypeScript", "웹개발"]
excerpt: "포스트 요약 내용"
---

# 포스트 내용

여기에 마크다운 형태로 포스트 내용을 작성합니다.
```

## 📝 사용 가능한 스크립트

```bash
# 개발 서버 시작 (http://localhost:8000)
npm run develop

# 프로덕션 빌드
npm run build

# 빌드 결과 로컬 서빙
npm run serve

# 캐시 및 빌드 결과 정리
npm run clean

# TypeScript 타입 체크
npm run typecheck
```

## 🎨 커스터마이징

### 색상 테마 변경
`src/styles/global.css`에서 CSS 변수 수정:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --border-color: #dee2e6;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --border-color: #404040;
}
```

### 레이아웃 수정
- `src/components/Layout.tsx`: 전체 레이아웃
- `src/components/Header.tsx`: 헤더 네비게이션
- `src/components/Footer.tsx`: 푸터

### 블로그 포스트 템플릿 수정
`src/templates/blog-post.tsx`에서 포스트 페이지 레이아웃 커스터마이징

## 🚀 배포

### Netlify 배포
1. GitHub에 레포지토리 푸시
2. Netlify에서 사이트 연결
3. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `public`

### Vercel 배포
1. GitHub에 레포지토리 푸시
2. Vercel에서 프로젝트 import
3. 자동으로 빌드 설정 인식

### GitHub Pages 배포
```bash
# gh-pages 패키지 설치
npm install --save-dev gh-pages

# package.json에 스크립트 추가
"deploy": "gatsby build && gh-pages -d public"

# 배포 실행
npm run deploy
```

## 📈 성능 최적화

### 이미지 최적화
- `gatsby-plugin-image` 사용으로 자동 이미지 최적화
- WebP 포맷 자동 변환
- 반응형 이미지 자동 생성

### 코드 스플리팅
- Gatsby의 자동 코드 스플리팅
- 페이지별 번들 최적화

### SEO 최적화
- 자동 메타 태그 생성
- 사이트맵 자동 생성
- robots.txt 지원

## 🤝 기여하기

1. 이슈 생성 또는 기존 이슈 확인
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🙋‍♂️ 지원

문제가 발생하거나 질문이 있으시면 GitHub 이슈를 생성해 주세요.

---

**Happy Blogging! 🎉**