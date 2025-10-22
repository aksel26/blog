# 검색 엔진 최적화 (SEO) 가이드

이 문서는 블로그가 구글, 네이버 등의 검색 엔진에 잘 노출되도록 설정하는 방법을 안내합니다.

## 📋 목차

1. [현재 적용된 SEO 설정](#현재-적용된-seo-설정)
2. [Google Search Console 설정](#google-search-console-설정)
3. [네이버 서치어드바이저 설정](#네이버-서치어드바이저-설정)
4. [검색 노출 확인 방법](#검색-노출-확인-방법)
5. [SEO 최적화 팁](#seo-최적화-팁)

## 현재 적용된 SEO 설정

### ✅ 자동으로 적용되는 기능

1. **Sitemap (사이트맵)**
   - 위치: `https://aksel26.netlify.app/sitemap-index.xml`
   - 모든 페이지가 자동으로 sitemap에 추가됨
   - 포스트별 우선순위 설정:
     - 홈페이지: priority 1.0 (가장 높음)
     - DevLog/LifeLog 포스트: priority 0.8
     - About 페이지: priority 0.6
   - 업데이트 빈도 자동 설정
   - 포스트 수정일(modified) 자동 추적

2. **Robots.txt**
   - 위치: `https://aksel26.netlify.app/robots.txt`
   - 모든 검색봇 허용 설정
   - sitemap 위치 자동 등록

3. **메타 태그**
   - 각 페이지마다 자동 생성:
     - `<title>`: 페이지 제목
     - `<meta name="description">`: 페이지 설명
     - `<meta name="keywords">`: 키워드 (태그 기반)
     - Open Graph (OG) 태그: 소셜 미디어 공유용
     - Twitter Card: 트위터 공유용
     - Canonical URL: 중복 콘텐츠 방지

4. **구조화된 데이터 (Schema.org)**
   - BlogPosting: 블로그 포스트 정보
   - WebSite: 사이트 전체 정보
   - BreadcrumbList: 탐색 경로
   - 검색봇이 콘텐츠를 더 잘 이해할 수 있도록 지원

5. **검색봇 최적화 메타 태그**
   - `robots`: index, follow, max-image-preview:large
   - `googlebot`: index, follow
   - `bingbot`: index, follow
   - 이미지 및 스니펫 최대 크기 허용

## Google Search Console 설정

### 1단계: Search Console 등록

1. [Google Search Console](https://search.google.com/search-console) 접속
2. "속성 추가" 클릭
3. URL 입력: `https://aksel26.netlify.app`
4. 소유권 확인 방법 선택: **HTML 태그** 선택
5. 제공된 메타 태그의 `content` 값 복사

### 2단계: 메타 태그 확인

이미 `src/components/SEO.tsx`에 다음과 같이 설정되어 있습니다:

```typescript
{
  name: "google-site-verification",
  content: "3Z0N6Zgzw95Uk6Xwd0iJX_xcWRFAPxL2iozSpiLpukM",
}
```

만약 다른 인증 코드를 받았다면 이 값을 변경하세요.

### 3단계: Sitemap 제출

1. Google Search Console에서 좌측 메뉴 "Sitemaps" 클릭
2. 새 사이트맵 추가: `sitemap-index.xml` 입력
3. "제출" 클릭

### 4단계: URL 검사 및 색인 요청

새 포스트를 작성한 후:
1. Google Search Console에서 "URL 검사" 클릭
2. 포스트 URL 입력 (예: `https://aksel26.netlify.app/devlog/my-post`)
3. "색인 생성 요청" 클릭

## 네이버 서치어드바이저 설정

### 1단계: 서치어드바이저 등록

1. [네이버 서치어드바이저](https://searchadvisor.naver.com/) 접속
2. "웹마스터 도구" 클릭
3. 사이트 등록: `https://aksel26.netlify.app` 입력

### 2단계: 사이트 소유 확인

1. **HTML 태그** 방식 선택
2. 제공된 메타 태그의 `content` 값 복사
3. `src/components/SEO.tsx` 파일 수정:

```typescript
{
  name: "naver-site-verification",
  content: "여기에_네이버_인증_코드_입력",
}
```

현재 `"naver_site_verification_code"`를 실제 코드로 교체하세요.

4. 사이트 빌드 및 배포 후 "소유확인" 클릭

### 3단계: 사이트맵 제출

1. 서치어드바이저 > "요청" > "사이트맵 제출" 클릭
2. URL 입력: `https://aksel26.netlify.app/sitemap-index.xml`
3. "확인" 클릭

### 4단계: RSS 제출 (선택사항)

네이버는 RSS를 통해서도 콘텐츠를 수집합니다:
- 전체 RSS: `https://aksel26.netlify.app/rss.xml`
- DevLog RSS: `https://aksel26.netlify.app/rss-devlog.xml`
- LifeLog RSS: `https://aksel26.netlify.app/rss-lifelog.xml`

## 검색 노출 확인 방법

### Google 검색

1. **사이트 전체 색인 확인**
   ```
   site:aksel26.netlify.app
   ```

2. **특정 키워드로 검색**
   ```
   site:aksel26.netlify.app React
   ```

3. **제목으로 검색**
   ```
   intitle:"포스트 제목" site:aksel26.netlify.app
   ```

### 네이버 검색

1. **사이트 전체 색인 확인**
   ```
   site:aksel26.netlify.app
   ```

2. **블로그 탭에서 확인**
   - 네이버 검색 후 "블로그" 탭 클릭
   - 내 블로그 포스트가 노출되는지 확인

### 노출까지 걸리는 시간

- **Google**: 보통 1~7일 (빠르면 몇 시간)
- **네이버**: 보통 3~14일 (사이트 신뢰도에 따라 다름)
- **색인 속도 향상 방법**:
  - Google Search Console에서 URL 색인 요청
  - 네이버 서치어드바이저에서 RSS 제출
  - 포스트에 충실한 콘텐츠와 적절한 키워드 사용

## SEO 최적화 팁

### 1. 포스트 작성 시 체크리스트

**Frontmatter 필수 항목**:
```markdown
---
title: "명확하고 설명적인 제목 (50자 이내 권장)"
excerpt: "포스트 요약 (150자 이내 권장)"
date: "2025-01-15"
category: "기술" 또는 "일상"
tags: ["React", "TypeScript", "웹개발"]
thumbnail: "/path/to/image.jpg" (선택사항)
---
```

### 2. 제목 작성 팁

**좋은 예시**:
- ✅ "React 18의 새로운 Concurrent 렌더링 완벽 가이드"
- ✅ "TypeScript Generic 실전 활용법 5가지"
- ✅ "프론트엔드 성능 최적화: 번들 크기 50% 줄이기"

**나쁜 예시**:
- ❌ "오늘 배운 것"
- ❌ "React 공부"
- ❌ "개발일지 #1"

### 3. 태그(keywords) 선정 가이드

- **구체적인 기술 용어 사용**: "React Hooks", "TypeScript", "Webpack"
- **3~7개 정도가 적당**
- **너무 일반적인 태그 지양**: "개발", "코딩" 대신 "웹 개발", "프론트엔드 개발"
- **검색 의도 파악**: 사람들이 실제로 검색할 만한 키워드 사용

### 4. 내부 링크 활용

다른 포스트를 참조할 때 링크 추가:
```markdown
이전에 [React Hooks 사용법](/devlog/react-hooks)에서 다룬 내용을...
```

### 5. 이미지 최적화

- 적절한 파일명 사용: `react-component-lifecycle.png` (O), `image1.png` (X)
- Alt 텍스트 추가:
  ```markdown
  ![React 컴포넌트 생명주기 다이어그램](./lifecycle.png)
  ```

### 6. 콘텐츠 품질

- **최소 300자 이상** 작성 (검색 엔진이 선호)
- **고유한 콘텐츠**: 다른 사이트 복사 금지
- **정기적인 업데이트**: 오래된 포스트는 `modified` 필드로 업데이트 날짜 표시
- **적절한 헤딩 구조**: H1(제목) > H2(섹션) > H3(하위섹션)

### 7. 페이지 로딩 속도

이미 적용된 최적화:
- ✅ 이미지 lazy loading
- ✅ WebP/AVIF 포맷 지원
- ✅ 반응형 이미지 (srcset)

추가로 할 수 있는 것:
- 이미지 크기 최적화 (1200px 이내)
- 불필요한 플러그인 제거

## 문제 해결

### 검색에 노출되지 않을 때

1. **Google Search Console 확인**
   - "색인 생성" > "페이지" 메뉴에서 오류 확인
   - "URL 검사"로 개별 페이지 상태 확인

2. **일반적인 문제**
   - robots.txt에서 차단되었는지 확인: `https://aksel26.netlify.app/robots.txt`
   - sitemap에 페이지가 포함되었는지 확인: `https://aksel26.netlify.app/sitemap-index.xml`
   - 포스트에 충분한 콘텐츠가 있는지 확인 (최소 300자)

3. **네이버 특이사항**
   - 신규 사이트는 초기에 노출이 잘 안될 수 있음
   - 꾸준한 콘텐츠 업데이트와 시간 필요
   - 네이버 블로그보다 우선순위가 낮을 수 있음

### 검색 순위가 낮을 때

1. **경쟁 분석**
   - 같은 키워드로 검색되는 다른 사이트 분석
   - 더 자세하고 고품질의 콘텐츠 작성

2. **백링크 확보**
   - 다른 블로그/사이트에서 내 포스트 링크
   - 소셜 미디어 공유
   - GitHub README에 블로그 링크

3. **콘텐츠 개선**
   - 제목을 더 명확하게
   - 요약(excerpt)을 더 매력적으로
   - 태그를 더 구체적으로

## 유용한 도구

- [Google Search Console](https://search.google.com/search-console): 구글 검색 성과 분석
- [네이버 서치어드바이저](https://searchadvisor.naver.com/): 네이버 검색 분석
- [Google PageSpeed Insights](https://pagespeed.web.dev/): 페이지 속도 측정
- [Lighthouse](https://developers.google.com/web/tools/lighthouse): SEO 및 성능 감사
- [구글 키워드 플래너](https://ads.google.com/intl/ko_kr/home/tools/keyword-planner/): 키워드 검색량 확인

## 추가 질문이나 문제

SEO 관련 문제가 발생하면:
1. Google Search Console의 "커버리지" 보고서 확인
2. 네이버 서치어드바이저의 "수집 현황" 확인
3. 이 문서의 체크리스트 다시 확인

---

**참고**: 검색 엔진 최적화는 시간이 걸리는 작업입니다. 꾸준히 좋은 콘텐츠를 작성하는 것이 가장 중요합니다!
