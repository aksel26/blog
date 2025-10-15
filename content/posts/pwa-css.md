---
title: "PWA를 네이티브 앱처럼 보이게 만들기: Safe Area와 CSS 완벽 가이드"
date: "2024-08-04"
modified: "2024-08-04"
category: "기술"
tags: ["PWA", "Frontend", "CSS", "모바일", "iOS"]
excerpt: "PWA를 iPhone에 설치했는데 노치 부분이 이상하다? Safe Area와 viewport-fit을 활용해 네이티브 앱처럼 자연스러운 UI를 만드는 방법을 알아봅니다."
---

# PWA를 네이티브 앱처럼 보이게 만들기

## 문제 상황

PWA(Progressive Web App)를 개발하고 iPhone 홈 화면에 설치해서 실행했을 때, 다음과 같은 문제들을 마주했습니다:

1. **노치 부분이 비어있어 이상하게 보임**
2. **상단 상태바가 앱 콘텐츠를 가림**
3. **의도하지 않은 스크롤이 발생**
4. **모달 배경이 노치 부분을 덮지 못함**

분명 네이티브 앱처럼 만들고 싶었는데, 웹 페이지처럼 보이는 이 상황... 어떻게 해결할 수 있을까요?

---

## 목표

PWA를 진짜 앱처럼 보이게 만들기 위한 두 가지 핵심 목표:

1. **화면을 노치 부분까지 꽉 채워서 보여주기**
2. **앱 자체의 불필요한 스크롤 방지**

---

## 핵심 개념: Safe Area 이해하기

### Safe Area란?

**Safe Area**는 기기의 물리적 특성(노치, 스와이프바 등)으로 인해 콘텐츠가 가려질 수 있는 영역을 제외한 안전한 영역을 의미합니다.

```
┌─────────────────────┐
│   ◀ 노치 영역 ▶     │  ← safe-area-inset-top
├─────────────────────┤
│                     │
│   Safe Area         │
│   (콘텐츠 영역)     │
│                     │
├─────────────────────┤
│   스와이프바 영역   │  ← safe-area-inset-bottom
└─────────────────────┘
```

### Safe Area Inset 값

CSS에서 `env()` 함수로 접근할 수 있는 4가지 값:

| 값                            | 의미                      | 주요 사용처          |
| ----------------------------- | ------------------------- | -------------------- |
| `env(safe-area-inset-top)`    | 상단 노치 영역 높이       | 헤더 패딩            |
| `env(safe-area-inset-bottom)` | 하단 스와이프바 영역 높이 | 하단 네비게이션 패딩 |
| `env(safe-area-inset-left)`   | 좌측 안전 영역            | 가로 모드 대응       |
| `env(safe-area-inset-right)`  | 우측 안전 영역            | 가로 모드 대응       |

---

## 해결 방법

### 1단계: Viewport 설정

먼저 HTML `<head>` 태그에 올바른 메타 태그를 추가해야 합니다.

```html
<!-- 기본 viewport 설정 + viewport-fit=cover 필수! -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />

<!-- PWA를 독립 실행형 앱으로 실행 -->
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- 상태바 스타일: 노치 부분을 투명하게 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

#### 각 메타 태그 설명

**1. viewport-fit=cover**

```html
<meta name="viewport" content="viewport-fit=cover" />
```

- 화면 전체를 사용하도록 설정
- 이 값이 있어야 `env(safe-area-inset-*)` 사용 가능
- 없으면 노치 부분이 비어 보임

**2. apple-mobile-web-app-capable**

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
```

- 홈 화면에 추가한 PWA를 독립 실행형 모드로 실행
- Safari의 상단/하단 UI가 사라지고 전체 화면 사용

**3. apple-mobile-web-app-status-bar-style**

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

옵션:

- `default`: 흰색 배경에 검은색 텍스트
- `black`: 검은색 배경에 흰색 텍스트
- `black-translucent`: 투명 배경 (콘텐츠가 상태바 아래까지 확장)

---

### 2단계: Safe Area Inset을 활용한 CSS 적용

#### 기본 레이아웃 설정

```css
body {
  /* 노치 부분만큼 상단 패딩 추가 */
  padding-top: env(safe-area-inset-top);

  /* 스와이프바 부분만큼 하단 패딩 추가 */
  padding-bottom: env(safe-area-inset-bottom);

  /* 가로 모드 대응 */
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);

  /* 높이 100vh 사용 시 safe area 고려 */
  height: 100vh;
  overflow: hidden;
}
```

#### 헤더 영역 처리

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  /* 배경을 노치 부분까지 확장 */
  padding-top: env(safe-area-inset-top);

  /* 실제 콘텐츠는 safe area 아래에 */
  padding-left: 1rem;
  padding-right: 1rem;

  background-color: #ffffff;
  z-index: 100;
}

/* 헤더 내부 콘텐츠는 추가 padding 없이 */
.header-content {
  height: 56px; /* 헤더 높이 */
  display: flex;
  align-items: center;
}
```

#### 하단 네비게이션 처리

```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  /* 스와이프바 위에 배치 */
  padding-bottom: env(safe-area-inset-bottom);

  background-color: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.bottom-nav-content {
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
```

---

### 3단계: 모달 Overlay 처리 (중요!)

제가 겪었던 가장 까다로운 문제가 바로 **모달 배경이 노치 부분을 덮지 못하는 현상**이었습니다.

#### 문제 원인

```css
body {
  padding-top: env(safe-area-inset-top); /* 예: 44px */
}

/* ❌ 잘못된 모달 overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
```

body에 이미 `padding-top`이 적용되어 있어서, overlay의 `top: 0`이 실제로는 노치 아래부터 시작됩니다.

#### 해결 방법

```css
/* ✅ 올바른 모달 overlay */
.modal-overlay {
  position: fixed;

  /* safe-area만큼 위로 끌어올리기 */
  top: calc(0px - env(safe-area-inset-top));
  bottom: calc(0px - env(safe-area-inset-bottom));
  left: 0;
  right: 0;

  /* 높이도 safe-area만큼 늘리기 */
  height: calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom));

  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
```

#### 모달 콘텐츠는 Safe Area 안에

```css
.modal-content {
  position: fixed;

  /* safe area를 고려한 위치 설정 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 또는 상단에 붙는 모달의 경우 */
  /* top: env(safe-area-inset-top); */

  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 90%;
  max-height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 2rem);
  overflow-y: auto;
}
```

---

### 4단계: 스크롤 제어

앱 자체의 불필요한 스크롤을 방지하는 CSS:

```css
body {
  /* 오버스크롤(바운스) 효과 제거 */
  overscroll-behavior: none;

  /* iOS에서 고무줄 효과 제거 */
  -webkit-overflow-scrolling: touch;

  /* 기본 스크롤 제거 */
  overflow: hidden;

  /* 높이를 정확히 뷰포트 높이로 설정 */
  height: 100vh;
  height: -webkit-fill-available; /* iOS Safari 대응 */
}

/* 스크롤이 필요한 컨테이너만 스크롤 허용 */
.scrollable-content {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  /* safe area를 고려한 높이 계산 */
  height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 56px /* 헤더 높이 */ - 60px /* 하단 네비게이션 높이 */);
}
```

#### overscroll-behavior 옵션

```css
/* 스크롤 경계 동작 제어 */
.container {
  /* none: 바운스 효과 없음, 부모로 스크롤 전파 안 됨 */
  overscroll-behavior: none;

  /* contain: 바운스 효과 있음, 부모로 스크롤 전파 안 됨 */
  overscroll-behavior: contain;

  /* auto: 기본 동작 (바운스 + 스크롤 전파) */
  overscroll-behavior: auto;
}

/* 축별 제어 */
.vertical-scroll {
  overscroll-behavior-y: none; /* 세로 스크롤만 제어 */
  overscroll-behavior-x: auto; /* 가로는 기본 동작 */
}
```

---

## 실전 예제: 완전한 PWA 레이아웃

### HTML 구조

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <title>My PWA</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <!-- 헤더 -->
    <header class="header">
      <div class="header-content">
        <h1>My App</h1>
      </div>
    </header>

    <!-- 메인 콘텐츠 -->
    <main class="main-content">
      <div class="scrollable-area">
        <!-- 스크롤 가능한 콘텐츠 -->
      </div>
    </main>

    <!-- 하단 네비게이션 -->
    <nav class="bottom-nav">
      <div class="bottom-nav-content">
        <button>Home</button>
        <button>Search</button>
        <button>Profile</button>
      </div>
    </nav>

    <!-- 모달 -->
    <div class="modal" style="display: none;">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <h2>Modal Title</h2>
        <p>Modal content...</p>
      </div>
    </div>
  </body>
</html>
```

### CSS 전체 코드

```css
/* Reset & Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  /* iOS에서 100vh 문제 해결 */
  height: -webkit-fill-available;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Safe area 적용 */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);

  /* 스크롤 제어 */
  height: 100vh;
  height: -webkit-fill-available;
  overflow: hidden;
  overscroll-behavior: none;

  background-color: #f5f5f5;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* 노치까지 배경 확장 */
  padding-top: env(safe-area-inset-top);
  padding-left: max(env(safe-area-inset-left), 1rem);
  padding-right: max(env(safe-area-inset-right), 1rem);
}

.header-content {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Main Content */
.main-content {
  /* 헤더와 하단 네비게이션 사이 공간 */
  margin-top: calc(56px + env(safe-area-inset-top));
  margin-bottom: calc(60px + env(safe-area-inset-bottom));

  height: calc(100vh - 56px - 60px - env(safe-area-inset-top) - env(safe-area-inset-bottom));
}

.scrollable-area {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;

  padding: 1rem;
}

/* Bottom Navigation */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;

  background-color: #ffffff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);

  /* 스와이프바 위에 배치 */
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

.bottom-nav-content {
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.bottom-nav-content button {
  flex: 1;
  height: 100%;
  border: none;
  background: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.bottom-nav-content button:active {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.modal-overlay {
  position: fixed;

  /* Safe area 전체를 덮도록 */
  top: calc(0px - env(safe-area-inset-top));
  bottom: calc(0px - env(safe-area-inset-bottom));
  left: 0;
  right: 0;

  background: rgba(0, 0, 0, 0.5);

  /* 터치 이벤트 차단 */
  touch-action: none;
}

.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: white;
  border-radius: 12px;
  padding: 1.5rem;

  width: 90%;
  max-width: 400px;
  max-height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 4rem);

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
```

---

## 가로 모드 대응

가로 모드에서는 좌우 safe area도 고려해야 합니다:

```css
/* 가로 모드 대응 */
@media (orientation: landscape) {
  .header,
  .bottom-nav,
  .main-content {
    padding-left: max(env(safe-area-inset-left), 1rem);
    padding-right: max(env(safe-area-inset-right), 1rem);
  }

  .modal-overlay {
    left: calc(0px - env(safe-area-inset-left));
    right: calc(0px - env(safe-area-inset-right));
  }
}
```

---

## 디버깅 팁

### Safe Area 값 확인하기

개발 중 safe area 값을 시각적으로 확인하는 방법:

```css
/* 개발용: safe area 시각화 */
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: env(safe-area-inset-top);
  background: rgba(255, 0, 0, 0.3);
  pointer-events: none;
  z-index: 9999;
}

body::after {
  content: "";
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: env(safe-area-inset-bottom);
  background: rgba(0, 0, 255, 0.3);
  pointer-events: none;
  z-index: 9999;
}
```

### JavaScript로 값 확인

```javascript
// Safe area 값을 콘솔에 출력
function logSafeAreaInsets() {
  const top = getComputedStyle(document.documentElement).getPropertyValue("--sat") || "0px";
  const bottom = getComputedStyle(document.documentElement).getPropertyValue("--sab") || "0px";

  console.log("Safe Area Insets:");
  console.log("Top:", top);
  console.log("Bottom:", bottom);
}

// CSS 변수로 저장
document.documentElement.style.setProperty("--sat", "env(safe-area-inset-top)");
document.documentElement.style.setProperty("--sab", "env(safe-area-inset-bottom)");
```

---

## 주의사항

### 1. env() 폴백 값 제공

구형 브라우저나 데스크톱에서는 `env()` 값이 0일 수 있으므로 폴백을 제공하세요:

```css
.header {
  /* 폴백 값 먼저 */
  padding-top: 0px;
  /* env() 값 (지원하는 브라우저에서 오버라이드) */
  padding-top: env(safe-area-inset-top);
}
```

### 2. calc() 사용 시 주의

```css
/* ✅ 올바른 사용 */
height: calc(100vh - env(safe-area-inset-top));

/* ❌ 잘못된 사용 (단위 누락) */
height: calc(100vh - env(safe-area-inset-top) - 60); /* 60px 아님! */

/* ✅ 단위 명시 */
height: calc(100vh - env(safe-area-inset-top) - 60px);
```

### 3. position: fixed와 transform

```css
/* ⚠️ transform 사용 시 fixed 위치가 변경될 수 있음 */
.parent {
  transform: translateZ(0); /* fixed 기준점이 변경됨 */
}

.child {
  position: fixed; /* 이제 .parent 기준으로 고정됨 */
  top: 0;
}
```

---

## 브라우저 지원

| 기능                     | iOS Safari | Chrome (Android) | Firefox | 비고              |
| ------------------------ | ---------- | ---------------- | ------- | ----------------- |
| `env(safe-area-inset-*)` | ✅ 11.0+   | ✅ 69+           | ✅ 69+  | -                 |
| `viewport-fit`           | ✅ 11.0+   | ✅ 69+           | ✅ 69+  | iOS가 핵심        |
| `overscroll-behavior`    | ✅ 16.0+   | ✅ 63+           | ✅ 59+  | iOS는 비교적 최근 |

---

## 제가 겪었던 시행착오

### 실수 1: padding 때문에 overflow 발생

```css
/* ❌ 문제가 있는 코드 */
body {
  height: 100vh;
  padding-top: env(safe-area-inset-top); /* padding으로 높이 증가 */
}
/* 결과: 100vh + padding = overflow 발생 */

/* ✅ 해결 */
body {
  height: 100vh;
  padding-top: env(safe-area-inset-top);
  box-sizing: border-box; /* padding을 높이에 포함 */
}
```

### 실수 2: 모달 overlay가 노치를 덮지 못함

위에서 설명한 대로 `calc()`를 사용해 음수 top 값으로 해결했습니다.

### 실수 3: 스크롤 이벤트 전파

```css
/* ❌ 문제 */
.scrollable {
  overflow-y: auto;
}
/* 스크롤이 끝에 닿으면 body도 스크롤됨 */

/* ✅ 해결 */
.scrollable {
  overflow-y: auto;
  overscroll-behavior: contain; /* 스크롤 이벤트 전파 차단 */
}
```

---

## 결론

### 핵심 체크리스트

- [ ] `viewport-fit=cover` 메타 태그 추가
- [ ] `apple-mobile-web-app-capable` 설정
- [ ] `env(safe-area-inset-*)` 값을 padding에 적용
- [ ] 모달 overlay는 음수 top/bottom으로 safe area 덮기
- [ ] `overscroll-behavior: none`으로 불필요한 스크롤 제거
- [ ] 가로 모드 대응 (좌우 safe area)
- [ ] 실제 기기에서 테스트 (시뮬레이터는 부족함)

### 핵심 요약

1. **Safe Area는 노치, 스와이프바 같은 물리적 제약을 고려한 안전 영역**입니다.
2. **`env(safe-area-inset-*)`를 padding에 활용**하면 콘텐츠가 가려지지 않습니다.
3. **모달 overlay는 음수 위치 값으로 전체 화면을 덮어야** 자연스럽습니다.
4. **`overscroll-behavior`로 앱 같은 스크롤 경험**을 만들 수 있습니다.

PWA를 네이티브 앱처럼 보이게 만드는 것은 세부 디테일의 싸움입니다. 이 가이드가 여러분의 PWA를 더 완성도 있게 만드는 데 도움이 되었으면 좋겠습니다!

---

## 참고 자료

- [PWA Standalone 레이아웃](https://velog.io/@sangpok/PWA-Standalone-%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83)
- [상단 상태바 제어하기](https://velog.io/@wsd0811/%EA%B0%9C%EB%B0%9C-%EA%B8%B0%EC%88%A0-React-%EC%95%B1-PWA%EB%A1%9C-%EB%B3%80%ED%99%98%EC%8B%9C-%EC%83%81%EB%8B%A8-%EC%83%81%ED%83%9C%EB%B0%94-%EC%A0%9C%EC%96%B4%ED%95%98%EA%B8%B0)
- [PWA Manifest 가이드](https://ux.stories.pe.kr/225)
- [MDN - env()](https://developer.mozilla.org/en-US/docs/Web/CSS/env)
- [WebKit - Designing Websites for iPhone X](https://webkit.org/blog/7929/designing-websites-for-iphone-x/)

---

궁금한 점이나 추가로 다뤘으면 하는 내용이 있다면 댓글로 남겨주세요!
