---
title: "Gatsby 빌드 시 Google Fonts가 적용되지 않는 문제 해결하기"
date: "2025-10-14"
modified: "2025-10-14"
category: "기술"
tags: ["Gatsby", "React", "SSR", "Google Fonts", "웹 폰트"]
excerpt: "Gatsby 프로젝트에서 개발 환경에서는 잘 보이던 Google Fonts가 빌드 후 적용되지 않는 문제의 원인과 해결 방법을 알아봅니다."
thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&h=425&fit=crop"
---

# 🎨 Gatsby 빌드 시 Google Fonts가 적용되지 않는 문제 해결하기

블로그에 Sacramento 폰트를 적용하는 과정에서 흥미로운 문제를 발견했습니다. `gatsby develop`에서는 폰트가 잘 적용되는데, `gatsby build`로 빌드한 후 `gatsby serve`로 실행하면 폰트가 적용되지 않는 현상이 발생했죠.

## 🔍 문제 상황

처음에는 CSS 파일에서 Google Fonts를 import하는 일반적인 방법을 사용했습니다.

```css
/* src/styles/global.css */
@import "tailwindcss";

/* Font imports */
@import url("https://fonts.googleapis.com/css2?family=Sacramento&display=swap");
```

이 방법은 개발 환경(`gatsby develop`)에서는 완벽하게 작동했습니다. 하지만 프로덕션 빌드(`gatsby build`)를 실행하고 `gatsby serve`로 확인해보니 Sacramento 폰트가 적용되지 않았습니다.

## 🤔 원인 분석

### 1. CSS @import의 한계

CSS 파일에서 `@import`를 사용하면 몇 가지 문제가 발생할 수 있습니다:

- **렌더링 블로킹**: `@import`는 CSS 파일을 순차적으로 로드하므로 렌더링 성능이 저하됩니다.
- **빌드 최적화 문제**: Gatsby의 빌드 프로세스에서 외부 URL을 가진 `@import`가 제대로 처리되지 않을 수 있습니다.
- **SSR 환경**: Server-Side Rendering 환경에서 외부 리소스 로딩 타이밍 이슈가 발생할 수 있습니다.

### 2. Gatsby의 SSR(Server-Side Rendering)

Gatsby는 빌드 시 페이지를 정적으로 생성합니다. 이 과정에서:

1. 서버에서 HTML을 미리 렌더링
2. CSS를 포함한 모든 리소스를 최적화
3. 외부 폰트 로딩이 적절히 처리되지 않으면 폰트가 누락될 수 있음

## ✅ 해결 방법

Gatsby에서 Google Fonts를 올바르게 로드하려면 **Gatsby SSR API**를 사용해야 합니다.

### 1. gatsby-ssr.tsx 수정

`gatsby-ssr.tsx` 파일에서 `onRenderBody` API를 사용하여 HTML `<head>` 태그에 폰트 링크를 추가합니다.

```tsx
// gatsby-ssr.tsx
import React from "react";
import { GatsbySSR } from "gatsby";

// 기존 코드...

// Add Google Fonts to HTML head
export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="google-fonts-preconnect"
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />,
    <link
      key="google-fonts-preconnect-gstatic"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="google-fonts-sacramento"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap"
    />,
  ]);
};
```

### 2. CSS @import 제거

`global.css`에서 Google Fonts `@import`를 제거합니다.

```css
/* src/styles/global.css */
@import "tailwindcss";

/* Font imports */
/* @import url("https://fonts.googleapis.com/css2?family=Sacramento&display=swap"); - 제거 */

@font-face {
  font-family: "Freesentation";
  src: url("../fonts/FreesentationVF.ttf") format("truetype-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

### 3. 컴포넌트에서 폰트 사용

이제 컴포넌트에서 폰트를 자유롭게 사용할 수 있습니다.

```tsx
// src/components/Header.tsx
<Link
  to="/"
  style={{
    fontFamily: "Sacramento, cursive",
    fontSize: "1.75rem",
  }}
>
  <span>hmkim</span>
</Link>
```

## 🚀 빌드 및 테스트

수정 후 다음 명령어로 테스트합니다:

```bash
# 캐시 정리
gatsby clean

# 프로덕션 빌드
gatsby build

# 빌드된 사이트 실행
gatsby serve
```

이제 `http://localhost:9000`에서 폰트가 정상적으로 적용된 것을 확인할 수 있습니다!

## 🎯 핵심 포인트

### onRenderBody API의 장점

1. **SSR 호환성**: 서버 사이드 렌더링 시 HTML head에 직접 삽입되므로 확실하게 로드됩니다.
2. **성능 최적화**: `preconnect`를 통해 DNS lookup과 TCP 연결을 미리 수행하여 폰트 로딩 속도를 개선합니다.
3. **빌드 안정성**: Gatsby 빌드 프로세스에 통합되어 일관된 결과를 보장합니다.

### preconnect의 역할

```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

- `preconnect`는 브라우저에게 특정 도메인과의 연결을 미리 준비하도록 지시합니다.
- Google Fonts는 CSS는 `googleapis.com`에서, 실제 폰트 파일은 `gstatic.com`에서 제공하므로 두 도메인 모두 preconnect가 필요합니다.

## 📚 추가 팁

### 여러 폰트 로드하기

여러 Google Fonts를 사용한다면 한 번의 요청으로 로드하는 것이 효율적입니다:

```tsx
<link
  key="google-fonts"
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Sacramento&family=Roboto:wght@400;700&display=swap"
/>
```

### 폰트 로딩 전략

`display=swap` 파라미터는 폰트 로딩 전략을 지정합니다:

- `swap`: 폰트가 로드되기 전에는 시스템 폰트를 보여주고, 로드 후 교체
- `block`: 폰트가 로드될 때까지 텍스트를 숨김 (최대 3초)
- `fallback`: 짧은 블록 기간(100ms) 후 폴백 폰트 표시
- `optional`: 네트워크 상태에 따라 폰트 사용 여부 결정

## 🎓 배운 점

1. **환경별 테스트의 중요성**: 개발 환경에서 잘 작동한다고 프로덕션에서도 동일하게 작동한다는 보장은 없습니다.
2. **프레임워크 API 활용**: Gatsby와 같은 프레임워크를 사용할 때는 프레임워크가 제공하는 API를 활용하는 것이 더 안정적입니다.
3. **SSR 이해의 필요성**: SSR 환경에서는 클라이언트 사이드와 다른 접근 방식이 필요할 수 있습니다.

## 🔗 참고 자료

- [Gatsby SSR APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/)
- [Google Fonts Best Practices](https://web.dev/font-best-practices/)
- [Resource Hints: preconnect](https://web.dev/preconnect-and-dns-prefetch/)

---

비슷한 문제를 겪고 계신 분들께 도움이 되었으면 좋겠습니다! 궁금한 점이나 다른 해결 방법이 있다면 댓글로 공유해주세요. 🙌
