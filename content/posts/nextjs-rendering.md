---
title: "Next.js 렌더링 방식 완벽 정리: SSR, SSG, ISR 언제 써야 할까?"
date: "2025-09-24"
modified: "2025-01-12"
category: "기술"
tags: ["Next.js", "SSR", "SSG", "ISR", "렌더링"]
excerpt: "프로젝트에 맞는 렌더링 방식을 선택하는 방법과 각 방식의 실전 활용 사례"
---

## 인트로

Next.js로 프로젝트를 시작하면 가장 먼저 마주하는 선택지가 바로 **렌더링 방식**입니다.

"우리 서비스는 SSR이 맞을까, SSG가 맞을까?"  
"ISR은 언제 쓰는 거지?"

저도 처음 Next.js를 배울 때 이 개념들이 헷갈렸는데, **실무에서 프로젝트 요구사항에 맞는 렌더링 방식을 선택하지 못하면 성능 문제나 SEO 문제로 이어질 수 있습니다.**

이 글에서는:

- SSR, SSG, ISR의 차이를 명확하게 이해하고
- 각 방식의 장단점을 비교하며
- 실제 프로젝트에서 어떤 상황에 어떤 방식을 써야 하는지

실전 예시와 함께 정리해드리겠습니다.

---

## 📌 렌더링 방식이 중요한 이유

### 잘못된 선택의 결과

제가 처음 Next.js로 블로그를 만들 때 모든 페이지를 SSR로 구현했습니다. 결과는?

- **페이지 로딩이 느려짐** (서버가 매번 HTML을 생성)
- **서버 비용 증가** (Vercel 무료 티어 초과)
- **불필요한 서버 부하** (변경되지 않는 글도 매번 렌더링)

**블로그처럼 정적인 콘텐츠는 SSG가 적합했는데**, 모든 것을 SSR로 처리한 것이 문제였습니다.

### 올바른 선택의 중요성

렌더링 방식은 다음 3가지에 직접적인 영향을 줍니다:

1. **성능**: 사용자가 느끼는 로딩 속도
2. **비용**: 서버 리소스 및 CDN 비용
3. **SEO**: 검색 엔진 노출 품질

따라서 프로젝트 특성에 맞는 렌더링 방식을 선택하는 것이 매우 중요합니다.

---

## 본론: 3가지 렌더링 방식 완벽 비교

### 1. SSR (Server-Side Rendering)

#### 개념

**매 요청마다 서버에서 HTML을 생성해 클라이언트에 전달하는 방식**

```javascript
// Next.js SSR 구현
export async function getServerSideProps(context) {
  // 매 요청마다 실행됨
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();

  return {
    props: { data }, // 페이지 컴포넌트에 props로 전달
  };
}

export default function Page({ data }) {
  return <div>{data.title}</div>;
}
```

#### 동작 흐름

```
사용자 요청
  → 서버가 데이터 fetch
  → 서버에서 HTML 생성
  → 완성된 HTML 전송
  → 브라우저 렌더링
```

#### 장점

- **실시간 데이터 반영** - 요청 시점의 최신 데이터 표시
- **SEO 친화적** - 완성된 HTML을 크롤러에 제공
- **사용자별 맞춤 콘텐츠** - 로그인 정보 기반 개인화 가능

#### 단점

- **초기 로딩 느림** - 서버에서 HTML 생성 시간만큼 지연
- **서버 부하** - 요청마다 서버 리소스 사용
- **TTFB 증가** - Time To First Byte가 길어짐

#### 실전 활용 사례

**1. 사용자 대시보드**

```javascript
// 사용자별로 다른 데이터를 보여줘야 함
export async function getServerSideProps(context) {
  const session = await getSession(context);

  const userStats = await fetch(`https://api.example.com/stats/${session.userId}`);

  return { props: { userStats } };
}
```

**2. 실시간 주식/환율 정보**

```javascript
// 요청 시점의 정확한 가격 표시 필요
export async function getServerSideProps() {
  const stockPrice = await fetch("https://api.stock.com/price");

  return { props: { stockPrice } };
}
```

**3. 검색 결과 페이지**

```javascript
// 검색어에 따라 동적으로 콘텐츠 생성 + SEO 필요
export async function getServerSideProps(context) {
  const { query } = context.query;
  const results = await searchAPI(query);

  return { props: { results } };
}
```

---

### 2. SSG (Static Site Generation)

#### 개념

**빌드 타임에 미리 HTML을 생성해두고, 요청 시 정적 파일을 제공하는 방식**

```javascript
// Next.js SSG 구현
export async function getStaticProps() {
  // 빌드 시 한 번만 실행됨
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();

  return {
    props: { posts },
  };
}

export default function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

#### 동작 흐름

```
빌드 시점
  → 모든 데이터 fetch
  → HTML 파일 생성
  → CDN에 배포

사용자 요청
  → CDN에서 정적 파일 제공 (초고속)
```

#### 장점

- **극도로 빠른 로딩** - CDN에서 정적 파일 제공
- **서버 부하 없음** - 서버 연산 불필요
- **SEO 최적화** - 완벽한 HTML 제공
- **비용 절감** - 서버리스 또는 저렴한 호스팅 가능

#### 단점

- **데이터 최신화 어려움** - 변경 시 재빌드 필요
- **빌드 시간 증가** - 페이지 많을수록 빌드 오래 걸림
- **동적 콘텐츠 불가** - 사용자별 맞춤화 어려움

#### 실전 활용 사례

**1. 블로그 글**

```javascript
// 글은 자주 변경되지 않으므로 SSG 최적
export async function getStaticProps({ params }) {
  const post = await getPostData(params.id);

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  // 모든 글의 경로 미리 생성
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}
```

**2. 랜딩 페이지**

```javascript
// 마케팅 페이지는 정적 콘텐츠로 충분
export async function getStaticProps() {
  const features = await getFeatureList();

  return {
    props: { features },
  };
}
```

**3. 제품 소개 페이지**

```javascript
// 제품 정보는 자주 바뀌지 않음
export async function getStaticProps() {
  const products = await getProducts();

  return {
    props: { products },
  };
}
```

---

### 3. ISR (Incremental Static Regeneration)

#### 개념

**SSG처럼 정적 파일을 제공하되, 지정된 시간 간격으로 백그라운드에서 페이지를 재생성하는 방식**

```javascript
// Next.js ISR 구현
export async function getStaticProps() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 60, // 60초마다 재생성
  };
}
```

#### 동작 흐름

```
빌드 시점
  → 초기 HTML 생성

사용자 요청 (60초 이내)
  → 캐시된 정적 파일 제공 (빠름)

사용자 요청 (60초 경과 후)
  → 캐시된 파일 제공 (여전히 빠름)
  → 백그라운드에서 페이지 재생성
  → 다음 요청부터 새로운 버전 제공
```

#### 장점

- **SSG의 속도 유지** - 정적 파일 제공
- **데이터 자동 갱신** - 재배포 없이 업데이트
- **서버 부하 최소화** - 주기적으로만 재생성
- **대규모 사이트 적합** - 모든 페이지 빌드 불필요

#### 단점

- **완전한 실시간 불가** - revalidate 시간만큼 지연
- **첫 재생성 시 지연** - 캐시 만료 후 첫 요청자는 대기
- **복잡도 증가** - 캐싱 전략 이해 필요

#### 실전 활용 사례

**1. 뉴스 사이트**

```javascript
// 10분마다 최신 뉴스로 갱신
export async function getStaticProps() {
  const news = await fetch("https://api.news.com/latest");

  return {
    props: { news },
    revalidate: 600, // 10분
  };
}
```

**2. 전자상거래 제품 가격**

```javascript
// 5분마다 가격 정보 업데이트
export async function getStaticProps({ params }) {
  const product = await getProduct(params.id);

  return {
    props: { product },
    revalidate: 300, // 5분
  };
}
```

**3. 블로그 조회수**

```javascript
// 1시간마다 조회수 갱신
export async function getStaticProps({ params }) {
  const post = await getPostWithViews(params.slug);

  return {
    props: { post },
    revalidate: 3600, // 1시간
  };
}
```

---

## 렌더링 방식 비교표

| 항목              | SSR                   | SSG                     | ISR                     |
| ----------------- | --------------------- | ----------------------- | ----------------------- |
| **렌더링 시점**   | 요청 시마다           | 빌드 시                 | 빌드 시 + 주기적 재생성 |
| **로딩 속도**     | 느림 (서버 처리 시간) | 빠름 (CDN)              | 빠름 (CDN)              |
| **데이터 최신화** | 즉시                  | 재배포 필요             | 주기적 자동 갱신        |
| **서버 부하**     | 높음 (매 요청)        | 없음                    | 낮음 (주기적)           |
| **SEO**           | 우수                  | 최적                    | 우수                    |
| **비용**          | 높음                  | 낮음                    | 낮음                    |
| **빌드 시간**     | 불필요                | 오래 걸림 (많은 페이지) | 초기만 필요             |

---

## 선택 가이드: 내 프로젝트는 어떤 방식?

### 의사결정 플로우차트

```
데이터가 사용자별로 다른가?
│
├─ YES → SSR 사용
│         (예: 대시보드, 장바구니, 프로필)
│
└─ NO → 데이터가 자주 변경되는가?
         │
         ├─ 거의 안 바뀜 → SSG 사용
         │                 (예: 블로그, 문서, 랜딩 페이지)
         │
         ├─ 주기적으로 변경 → ISR 사용
         │                    (예: 뉴스, 제품 가격)
         │
         └─ 실시간 필수 → SSR 사용
                          (예: 주식 시세, 실시간 채팅)
```

### 실전 시나리오별 추천

#### 기업 홈페이지

- **메인/서비스 소개**: SSG
- **뉴스/공지사항**: ISR (revalidate: 3600)
- **채용 공고**: ISR (revalidate: 86400)

#### 뉴스 미디어

- **메인 페이지**: ISR (revalidate: 300)
- **개별 기사**: ISR (revalidate: 600)
- **실시간 속보**: SSR

#### 이커머스

- **제품 목록**: ISR (revalidate: 1800)
- **제품 상세**: ISR (revalidate: 600)
- **장바구니/결제**: SSR (사용자별)
- **재고 표시**: SSR (실시간 필요)

#### 블로그/포트폴리오

- **글 목록**: SSG
- **개별 글**: SSG
- **태그 페이지**: SSG
- **조회수만**: ISR (revalidate: 3600)

---

## 주의사항 및 실수하기 쉬운 부분

### 1. ISR의 stale-while-revalidate 동작 이해하기

```javascript
// revalidate: 60 설정 시

// 0초: 사용자 A 방문 → 캐시된 페이지 제공
// 61초: 사용자 B 방문 → 여전히 이전 캐시 제공
//                      → 백그라운드에서 재생성 시작
// 65초: 재생성 완료
// 70초: 사용자 C 방문 → 새로운 페이지 제공
```

**주의**: revalidate 시간이 지나도 즉시 새 데이터가 보이지 않습니다!

### 2. SSG에서 동적 경로 처리

```javascript
// [잘못된 방법] fallback 없이 모든 경로 생성
export async function getStaticPaths() {
  const paths = await get100000Paths(); // 빌드 시간 폭발!
  return { paths, fallback: false };
}

// [올바른 방법] 인기 경로만 빌드 + fallback
export async function getStaticPaths() {
  const paths = await getTop100Paths(); // 인기 100개만
  return {
    paths,
    fallback: "blocking", // 나머지는 요청 시 생성
  };
}
```

### 3. SSR에서 불필요한 서버 호출 피하기

```javascript
// [나쁜 예] 정적 데이터를 SSR로
export async function getServerSideProps() {
  const categories = await getCategories(); // 거의 안 바뀜
  return { props: { categories } };
}

// [좋은 예] 정적 데이터는 클라이언트에서
export default function Page() {
  const categories = STATIC_CATEGORIES; // 상수로 정의
}
```

---

## 성능 최적화 팁

### 1. ISR + On-Demand Revalidation 조합

```javascript
// pages/api/revalidate.js
export default async function handler(req, res) {
  // 특정 이벤트(DB 업데이트 등)가 발생하면 즉시 재생성
  try {
    await res.revalidate("/posts/my-post");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
```

### 2. 하이브리드 전략

```javascript
// 한 프로젝트 내에서 페이지별로 다른 방식 적용
pages/
  index.js          → SSG (랜딩 페이지)
  blog/[slug].js    → ISR (블로그 글)
  dashboard.js      → SSR (사용자 대시보드)
  about.js          → SSG (회사 소개)
```

### 3. CDN 캐싱 활용

```javascript
// Vercel에서 SSR 응답 캐싱
export async function getServerSideProps({ res }) {
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  const data = await fetchData();
  return { props: { data } };
}
```

---

## 결론

### 핵심 3줄 요약

1. **SSR**: 실시간 데이터 + 사용자별 맞춤 콘텐츠가 필요하면 사용
2. **SSG**: 변하지 않는 콘텐츠는 무조건 SSG (속도 최강)
3. **ISR**: 자주 바뀌지만 실시간은 아닐 때, SSG와 SSR의 중간 타협

### 실무 팁

- **기본은 SSG, 필요한 곳만 ISR/SSR** 전략이 가장 안전
- **성능 측정**: Lighthouse로 각 방식의 실제 성능 비교
- **비용 계산**: Vercel/AWS 사용량 모니터링 필수
- **점진적 마이그레이션**: 한 번에 바꾸지 말고 페이지별로 최적화

---

## 참고 자료

- [Next.js 공식 문서 - Data Fetching](https://nextjs.org/docs/basic-features/data-fetching)
- [Vercel - Understanding Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)
- [Web.dev - Rendering on the Web](https://web.dev/rendering-on-the-web/)

### 관련 포스팅

- Next.js 13 App Router의 새로운 렌더링 전략 (작성 예정)
- Vercel Edge Functions로 SSR 최적화하기 (작성 예정)

---

**궁금한 점이나 피드백은 댓글로 남겨주세요!**

#NextJS #SSR #SSG #ISR #프론트엔드 #성능최적화
