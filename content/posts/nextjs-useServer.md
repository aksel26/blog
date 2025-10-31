---
title: "Next.js 14 Server Actions vs API Routes: 완벽 비교 가이드"
date: "2024-10-16"
modified: "2024-10-16"
category: "기술"
tags: ["Next.js", "Server Actions", "API Routes", "React", "Supabase", "보안"]
excerpt: "Next.js 14의 'use server' Server Actions와 전통적인 API Routes를 비교 분석하고, 프로젝트 상황별 최적의 선택 가이드를 제공합니다."
thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=640&h=425&fit=crop"
---

Next.js 14에서 도입된 `'use server'` Server Actions와 전통적인 API Routes, 어떤 것을 선택해야 할까요? 두 방식의 차이점과 사용 케이스를 상세히 비교해드립니다.

## 📋 목차

1. Server Actions (`'use server'`)
2. API Routes (app/api)
3. 핵심 차이점 비교
4. 사용 사례별 선택 가이드
5. Client vs Server 데이터 조회

## 1. Server Actions (`'use server'`)

### 기본 구조

```tsx
// app/actions/login.ts
export async function login(formData: FormData) {
  "use server"; // 서버 측 실행 선언

  // 서버 측 로직 직접 작성
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const supabase = await createClient();
  return await supabase.auth.signInWithPassword(data);
}
```

### 💡 주요 특징

- **직접 통합**: 컴포넌트와 동일한 파일/디렉토리에서 관리
- **자동 직렬화**: FormData를 자동으로 파싱
- **Zero-Config**: 별도 라우트 설정 불필요
- **클라이언트 직접 호출**: `form action={login}` 방식으로 직접 연결
- **점진적 향상**: JavaScript 비활성화 환경에서도 동작

## 2. API Routes (app/api)

### 기본 구조

```tsx
// app/api/login/route.ts
export async function POST(request: Request) {
  const formData = await request.formData();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const supabase = await createClient();
  const result = await supabase.auth.signInWithPassword(data);

  return Response.json(result);
}
```

### 💡 주요 특징

- **전통적인 REST API**: 명시적 HTTP 메소드 처리
- **라우트 분리**: 별도 엔드포인트 관리 (예: `/api/login`)
- **수동 파싱**: 요청 데이터 직접 처리 필요
- **CORS 처리**: 외부 호출 가능
- **HTTP 표준 준수**: 다른 시스템과의 통합 용이

## 3. 핵심 차이점 비교

| 항목                     | Server Actions (`'use server'`)                 | API Routes (app/api)            |
| ------------------------ | ----------------------------------------------- | ------------------------------- |
| **실행 위치**            | 서버 측 함수                                    | 전통적 API 엔드포인트           |
| **호출 방식**            | 컴포넌트에서 직접 호출                          | fetch/axios로 HTTP 요청         |
| **데이터 전송**          | FormData 자동 처리                              | 수동 파싱 (JSON/FormData 등)    |
| **라우팅**               | 파일 시스템 기반 아님                           | 파일 시스템 기반 라우팅         |
| **사용 사례**            | 폼 제출, 컴포넌트 특화 로직                     | 외부 시스템 연동, REST API 제공 |
| **에러 처리**            | try/catch로 직접 처리                           | HTTP 상태 코드 반환             |
| **재검증(Revalidation)** | `revalidatePath`/`revalidateTag` 즉시 사용 가능 | 캐시 헤더로 제어                |
| **보안**                 | CSRF 보호 자동 적용                             | 수동 보안 처리 필요             |
| **타입 안전성**          | Zod 등으로 유효성 검사 가능                     | 수동 유효성 검사 구현 필요      |
| **클라이언트 번들**      | 번들 크기 영향 없음                             | API 핸들러 코드 포함            |

## 4. 사용 사례별 선택 가이드

### ✅ Server Actions 추천 경우

**적합한 상황:**

1. 폼 제출 처리 (로그인/회원가입)
2. 데이터 재검증이 필요한 업데이트
3. 컴포넌트와 긴밀한 상호작용이 필요한 경우
4. 클라이언트 JavaScript 없이 작동해야 하는 기능

**사용 예시:**

```tsx
<form action={login}>
  <input name="email" />
  <input name="password" type="password" />
  <button>로그인</button>
</form>
```

### ✅ API Routes 추천 경우

**적합한 상황:**

1. 타 시스템과의 REST API 통신
2. 서드파티 웹훅(Webhook) 처리
3. CORS가 필요한 외부 호출
4. OpenAPI 사양이 필요한 경우

**사용 예시:**

```tsx
fetch("/api/login", {
  method: "POST",
  body: JSON.stringify({ email, password }),
});
```

## 5. Client vs Server 데이터 조회

Supabase를 예시로 클라이언트 단과 서버 단에서의 데이터 조회 비교입니다.

### 🔒 Server Action 데이터 조회 (추천)

```tsx
// app/actions/tables.ts
"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchTables() {
  const supabase = createClient();
  const { data, error } = await supabase.from("information_schema.tables").select("table_name").eq("table_schema", "public");

  if (error) throw new Error("테이블 조회 실패");
  return data;
}
```

**적합한 경우:**

- 테이블 구조/메타데이터가 **민감정보**일 때
- **관리자 전용 페이지**에서 사용할 때
- **RBAC(Role-Based Access Control)** 이 필요한 경우
- **서버 사이드 캐싱**이 필요할 때
- **정적 사이트 생성(SSG)** 이 필요한 경우

### 💻 Client-Side 데이터 조회

```tsx
// components/TableList.tsx
"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TableList() {
  const supabase = createClient();

  useEffect(() => {
    const loadTables = async () => {
      const { data } = await supabase.from("information_schema.tables").select("table_name").eq("table_schema", "public");
      console.log(data);
    };
    loadTables();
  }, []);

  return <div>테이블 목록 로딩...</div>;
}
```

**적합한 경우:**

- **개발자 도구** 같은 **비보안 환경**에서 사용할 때
- **실시간 동기화**가 필요한 경우
- **CLI 툴**이나 **로컬 전용 앱**에서 사용할 때
- **빠른 프로토타이핑**이 필요할 때

## 📊 결정 매트릭스

| 기준              | Server Action 우선      | Client-Side 우선       |
| ----------------- | ----------------------- | ---------------------- |
| **보안 중요도**   | 높음 (민감정보 포함)    | 낮음 (공개 정보)       |
| **데이터 민감성** | 스키마 구조가 보호 필요 | 공개 가능한 메타데이터 |
| **접근 제어**     | RBAC 필수               | Anonymous 접근 허용    |
| **성능 요구사항** | 캐싱/재검증 필요        | 실시간성 우선          |
| **사용자 권한**   | 관리자 전용             | 모든 사용자 접근 가능  |
| **빌드 최적화**   | SSG/ISR 필요            | CSR만으로 충분         |

## ⚠️ 보안 주의사항

### ❌ 위험한 클라이언트 사용 패턴

```tsx
// ❌ 위험: 시스템 테이블 직접 접근
const { data } = await supabase
  .from("pg_tables") // 시스템 테이블 직접 접근
  .select("*");
```

**보안 원칙:**

- `information_schema`나 `pg_catalog` 접근 시 **반드시 서버 단에서 처리**
- **Row Level Security(RLS)** 가 시스템 테이블에 적용되지 않을 수 있음

## 🏆 최종 권장사항

### 1. 프로덕션 환경

```tsx
// ✅ 추천: 서버에서 필터링된 데이터만 전달
export async function fetchSafeTables() {
  const tables = await fetchTables();
  return tables.filter((table) => !table.name.includes("private_"));
}
```

- **무조건 Server Action 사용**
- `createClient()` 대신 `createServerClient()` 사용
- RLS 정책과 결합

### 2. 개발 환경

- `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL` 제한적으로 ��출
- Client-Side 사용 가능 (신중하게)

### 3. 아키텍처 선택 기준

- **프로젝트 규모**: 소규모 → Server Actions, 대규모 → API Routes
- **클라이언트 요구사항**: SPA 필요 → API Routes, SSR 중심 → Server Actions
- **팀 숙련도**: 풀스택 개발 편의 → Server Actions, 백엔드 분리 → API Routes
- **기술 스택**: tRPC/gRPC 사용 → API Routes, React Query 사용 → Server Actions

## 📈 성능 비교

```
Server-Side (Cold Start 기준)
- 초기 로딩: 300~500ms
- 재요청(캐싱): 50~100ms

Client-Side
- 초기 로딩: 150~300ms
- 재요청: 200~400ms (캐싱 어려움)
```

## 🎯 결론

보안과 안정성이 중요한 경우 **Server Actions**을, 개발 편의성과 실시간성이 중요한 경우 **Client-Side** 호출을 선택하세요.

**프로덕션 환경에서는 95% 이상 서버 측 처리를 권장합니다.**

두 방식 모두 장단점이 있으므로 프로젝트 요구사항에 맞게 혼용해서 사용하는 것이 가장 효과적입니다. 예를 들어:

- 인증 처리 → Server Actions
- 외부 서비스 연동 → API Routes

### 🔗 참고 자료

- [Next.js Server Actions 문서](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Next.js API Routes 문서](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
