---
title: "Vite + React에서 이미지 다루기: PNG vs SVG 완벽 가이드"
date: "2024-10-18"
modified: "2024-10-18"
category: "기술"
tags: ["Vite", "React", "PNG", "SVG", "이미지 최적화", "프론트엔드"]
excerpt: "Vite + React 프로젝트에서 PNG와 SVG 이미지를 효율적으로 사용하는 방법과 각각의 사용 사례를 자세히 알아봅니다."
thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=640&h=425&fit=crop"
---

# 🖼️ Vite + React에서 이미지 다루기: PNG vs SVG 완벽 가이드

Vite + React 프로젝트에서 이미지를 어떻게 불러오고 사용해야 할까요? PNG와 SVG 각각의 특징과 최적의 사용 방법을 알아봅니다.

## 📋 목차

1. PNG 파일 사용법
2. SVG 파일 사용법
3. Vite 설정
4. PNG vs SVG 비교

## 🖼️ PNG 파일 사용법

PNG는 비트맵 이미지 형식으로 사진이나 복잡한 그래픽에 적합합니다.

### 1. Import 방식 (권장)

정적 import로 이미지를 불러오는 가장 일반적인 방법입니다.

```jsx
import myImage from "./assets/image.png";

function MyComponent() {
  return <img src={myImage} alt="설명" />;
}
```

**장점:**
- ✅ 빌드 시 최적화됨
- ✅ 파일 해시가 자동으로 추가되어 캐싱 효율적
- ✅ TypeScript 타입 지원
- ✅ 존재하지 않는 파일은 빌드 에러 발생

**빌드 결과:**
```html
<!-- 실제 빌드 결과 -->
<img src="/assets/image-a1b2c3d4.png" alt="설명" />
```

### 2. Public 폴더 사용

`public` 폴더의 파일은 빌드 시 그대로 복사됩니다.

```jsx
// public/images/photo.png 파일의 경우
function MyComponent() {
  return <img src="/images/photo.png" alt="설명" />;
}
```

**적합한 경우:**
- 파일명이 동적으로 결정되는 경우
- 외부 HTML에서 참조해야 하는 경우
- robots.txt, favicon.ico 같은 특수 파일

**주의사항:**
```jsx
// ❌ 잘못된 사용
<img src="./images/photo.png" /> // 상대 경로 사용 불가

// ✅ 올바른 사용
<img src="/images/photo.png" /> // 절대 경로로 시작
```

### 3. 동적 Import

런타임에 이미지를 동적으로 로드해야 할 때 사용합니다.

```jsx
import { useState, useEffect } from "react";

function MyComponent() {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    import("./assets/image.png").then((module) => {
      setImageSrc(module.default);
    });
  }, []);

  return <img src={imageSrc} alt="설명" />;
}
```

**적합한 경우:**
- 조건부 로딩이 필요한 경우
- 코드 스플리팅이 필요한 큰 이미지
- 사용자 인터랙션 후에만 로드하는 경우

## 🎨 SVG 파일 사용법

SVG는 벡터 이미지 형식으로 아이콘과 로고에 최적화되어 있습니다.

### 1. 일반 이미지로 사용

PNG와 동일한 방식으로 사용할 수 있습니다.

```jsx
import logoSvg from "./assets/logo.svg";

function MyComponent() {
  return <img src={logoSvg} alt="로고" />;
}
```

**장점:**
- 간단한 사용법
- 기존 이미지와 동일한 방식

**단점:**
- CSS로 스타일링 불가
- 색상 변경 불가

### 2. React 컴포넌트로 사용 (권장) ⭐

SVG를 React 컴포넌트로 변환하여 사용하는 가장 강력한 방법입니다.

```jsx
// Vite 방식
import Logo from "./assets/logo.svg?react";

function MyComponent() {
  return <Logo className="logo" style={{ fill: 'red' }} />;
}
```

```jsx
// Create React App 방식 (참고)
import { ReactComponent as Logo } from "./assets/logo.svg";

function MyComponent() {
  return <Logo className="logo" />;
}
```

**장점:**
- ✅ CSS로 색상/크기 변경 가능
- ✅ props로 스타일 전달 가능
- ✅ 애니메이션 적용 가능
- ✅ 조건부 렌더링 가능

**실전 예시:**

```jsx
import SearchIcon from "./icons/search.svg?react";

function SearchButton({ isActive }) {
  return (
    <button>
      <SearchIcon 
        className={isActive ? 'active' : 'inactive'}
        style={{ 
          width: 24, 
          height: 24,
          fill: isActive ? '#007bff' : '#6c757d'
        }}
      />
      검색
    </button>
  );
}
```

### 3. 인라인 SVG

간단한 아이콘은 직접 JSX에 작성할 수 있습니다.

```jsx
function MyComponent() {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
```

**적합한 경우:**
- 매우 간단한 아이콘
- 외부 파일 관리가 불필요한 경우
- 동적으로 생성해야 하는 도형

## ⚙️ Vite 설정

### 기본 플러그인 설치

SVG를 React 컴포넌트로 사용하려면 플러그인이 필요합니다.

```bash
npm install @vitejs/plugin-react-swc
```

### vite.config.js 설정

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.svg", "**/*.png", "**/*.jpg"],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});
```

**추가 최적화 설정:**

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    // 이미지 최적화
    assetsInlineLimit: 4096, // 4KB 이하는 base64로 인라인
    rollupOptions: {
      output: {
        // 이미지는 별도 폴더로 분리
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  }
});
```

## 📊 PNG vs SVG 비교

### 특징 비교표

| 특징 | PNG | SVG |
|------|-----|-----|
| **파일 형식** | 비트맵 (래스터) | 벡터 |
| **확대/축소** | 품질 저하됨 | 항상 선명함 |
| **파일 크기** | 큼 (특히 고해상도) | 작음 (단순한 경우) |
| **사용 사례** | 사진, 복잡한 이미지 | 아이콘, 로고, 단순 그래픽 |
| **CSS 스타일링** | ❌ 불가능 | ✅ 가능 |
| **색상 변경** | ❌ 불가능 | ✅ 가능 (컴포넌트 사용 시) |
| **애니메이션** | ❌ 어려움 | ✅ 쉬움 |
| **브라우저 지원** | ✅ 모든 브라우저 | ✅ 모든 최신 브라우저 |
| **SEO** | alt 텍스트만 | 내부 텍스트 읽기 가능 |

### 성능 비교

```
아이콘 (24x24)
PNG: ~2-5KB
SVG: ~1-2KB

로고 (200x200)
PNG: ~20-50KB
SVG: ~5-15KB

사진 (1920x1080)
PNG: ~500KB-2MB
SVG: ❌ 부적합
```

## 🎯 사용 케이스별 권장사항

### PNG 사용 권장

```jsx
// ✅ 사진
<img src={productPhoto} alt="제품 사진" />

// ✅ 복잡한 그래픽
<img src={screenshot} alt="앱 스크린샷" />

// ✅ 그라데이션이 많은 이미지
<img src={artwork} alt="아트워크" />
```

### SVG 사용 권장

```jsx
// ✅ 아이콘
import MenuIcon from "./icons/menu.svg?react";
<MenuIcon className="icon" />

// ✅ 로고
import CompanyLogo from "./logo.svg?react";
<CompanyLogo style={{ fill: 'var(--primary-color)' }} />

// ✅ 단순한 일러스트
import EmptyState from "./illustrations/empty.svg?react";
<EmptyState className="empty-illustration" />
```

## 💡 실전 팁

### 1. 이미지 최적화

```bash
# PNG 최적화 도구
npm install -D vite-plugin-imagemin

# vite.config.js
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false }
        ]
      }
    })
  ]
});
```

### 2. 조건부 이미지 로딩

```jsx
function ResponsiveImage() {
  const isMobile = window.innerWidth < 768;
  
  return (
    <img 
      src={isMobile ? smallImage : largeImage}
      alt="반응형 이미지"
    />
  );
}
```

### 3. 이미지 Lazy Loading

```jsx
function LazyImage({ src, alt }) {
  return (
    <img 
      src={src} 
      alt={alt}
      loading="lazy"
    />
  );
}
```

### 4. SVG 스타일링 예시

```css
/* SVG 컴포넌트 스타일링 */
.logo {
  width: 120px;
  height: 40px;
  fill: currentColor; /* 부모의 color 상속 */
  transition: fill 0.3s ease;
}

.logo:hover {
  fill: #007bff;
}

/* 다크모드 대응 */
[data-theme="dark"] .logo {
  fill: #ffffff;
}
```

## ⚠️ 흔한 실수와 해결

### 1. Import 경로 오류

```jsx
// ❌ 잘못된 예
import logo from "assets/logo.svg"; // 상대 경로 누락

// ✅ 올바른 예
import logo from "./assets/logo.svg";
import logo from "@/assets/logo.svg"; // alias 사용
```

### 2. Public 폴더 오용

```jsx
// ❌ 불필요하게 public 사용
<img src="/logo.png" /> // import로 처리 가능한데 public 사용

// ✅ 적절한 사용
import logo from "./assets/logo.png";
<img src={logo} />
```

### 3. SVG 컴포넌트 import 오류

```jsx
// ❌ 잘못된 Vite 문법
import { ReactComponent as Icon } from "./icon.svg";

// ✅ 올바른 Vite 문법
import Icon from "./icon.svg?react";
```

## 🔗 참고 자료

- [Vite 에셋 핸들링 공식 문서](https://vitejs.dev/guide/assets.html)
- [MDN SVG 튜토리얼](https://developer.mozilla.org/ko/docs/Web/SVG/Tutorial)
- [React 이미지 최적화 가이드](https://web.dev/fast/#optimize-your-images)

## 📝 요약

| 이미지 타입 | 권장 사용처 | 불러오기 방법 |
|------------|-----------|-------------|
| **PNG** | 사진, 복잡한 이미지 | `import img from './image.png'` |
| **SVG** | 아이콘, 로고 | `import Icon from './icon.svg?react'` |
| **Public** | 동적 경로, 외부 참조 | `<img src="/path/file.png" />` |

Vite + React에서 이미지를 효율적으로 다루는 방법을 마스터했습니다! PNG는 사진에, SVG는 아이콘에 사용하고, 필요에 따라 적절한 import 방식을 선택하세요. 🎨
