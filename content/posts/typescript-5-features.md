---
title: "TypeScript 5.0 주요 변경사항"
date: "2024-03-05"
modified: "2024-03-05"
category: "기술"
tags: ["TypeScript", "JavaScript"]
excerpt: "TypeScript 5.0에서 도입된 Decorators, const Type Parameters 등의 새로운 기능들을 살펴봅니다."
---

# TypeScript 5.0 주요 변경사항

TypeScript 5.0이 정식 출시되었습니다! 이번 버전에서는 많은 새로운 기능들과 성능 개선이 있었는데, 주요 변경사항들을 살펴보겠습니다.

## 1. Decorators 정식 지원

드디어 TypeScript에서 ECMAScript Decorators를 정식으로 지원합니다.

### 클래스 데코레이터

```typescript
function logged(value: any, context: ClassDecoratorContext) {
  if (context.kind === "class") {
    return class extends value {
      constructor(...args: any[]) {
        super(...args);
        console.log(`Creating instance of ${context.name}`);
      }
    };
  }
}

@logged
class Person {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}
```

### 메서드 데코레이터

```typescript
function benchmark(target: any, context: ClassMethodDecoratorContext) {
  return function (this: any, ...args: any[]) {
    const start = performance.now();
    const result = target.call(this, ...args);
    const end = performance.now();
    console.log(`${String(context.name)} took ${end - start}ms`);
    return result;
  };
}

class Calculator {
  @benchmark
  heavyCalculation(n: number): number {
    let result = 0;
    for (let i = 0; i < n; i++) {
      result += Math.sqrt(i);
    }
    return result;
  }
}
```

## 2. const Type Parameters

제네릭 타입 파라미터에 `const` 키워드를 사용할 수 있게 되었습니다.

```typescript
// 이전 방식
function oldWay<T extends readonly string[]>(arr: T): T {
  return arr;
}

// TypeScript 5.0 방식
function newWay<const T extends readonly string[]>(arr: T): T {
  return arr;
}

const fruits = ['apple', 'banana', 'cherry'] as const;

// oldWay의 반환 타입: readonly string[]
const result1 = oldWay(fruits);

// newWay의 반환 타입: readonly ["apple", "banana", "cherry"]
const result2 = newWay(fruits);
```

### 실용적인 예제

```typescript
function createConfig<const T>(config: T): T {
  return config;
}

const config = createConfig({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
} as const);

// config의 타입이 정확히 추론됩니다:
// {
//   readonly apiUrl: "https://api.example.com";
//   readonly timeout: 5000;
//   readonly retries: 3;
// }
```

## 3. Supporting Multiple Configuration Files

이제 `extends` 필드에서 여러 설정 파일을 상속받을 수 있습니다.

```json
{
  "extends": [
    "@my-company/typescript-config",
    "./tsconfig.base.json"
  ],
  "compilerOptions": {
    "strict": true
  }
}
```

## 4. Enum 개선사항

### const assertions with Enums

```typescript
const Colors = {
  Red: 'red',
  Green: 'green',
  Blue: 'blue'
} as const;

type Color = typeof Colors[keyof typeof Colors];
// type Color = "red" | "green" | "blue"

// 더 나은 type safety
function setColor(color: Color) {
  // ...
}

setColor(Colors.Red); // ✅ OK
setColor('red');      // ✅ OK
setColor('yellow');   // ❌ Error
```

## 5. --verbatimModuleSyntax 플래그

새로운 컴파일러 옵션으로 import/export 구문을 더 정확하게 처리할 수 있습니다.

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "verbatimModuleSyntax": true
  }
}
```

이 옵션을 사용하면:

```typescript
// 타입만 import할 때 명시적으로 표시해야 함
import type { User } from './types';
import { fetchUser } from './api';

// 잘못된 사용 (verbatimModuleSyntax: true 일 때)
import { User } from './types'; // ❌ Error
```

## 6. 성능 개선

### Package.json의 "exports" 지원

TypeScript 5.0은 `package.json`의 `exports` 필드를 더 잘 지원합니다.

```json
{
  "name": "my-package",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./utils": {
      "types": "./dist/utils.d.ts",
      "import": "./dist/utils.mjs",
      "require": "./dist/utils.js"
    }
  }
}
```

### 빌드 성능 향상

- **프로젝트 참조** 빌드가 최대 10-20% 빠르게 개선
- **타입 체킹** 속도 향상
- **메모리 사용량** 감소

## 7. 새로운 유틸리티 타입들

### Satisfies Operator 개선

```typescript
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  features: {
    auth: true,
    analytics: false
  }
} satisfies Config;

// config의 타입이 정확히 추론되면서도
// Config 인터페이스를 만족하는지 체크됩니다
```

## 마이그레이션 가이드

### Breaking Changes

1. **Node.js 14 지원 종료** - Node.js 16 이상 필요
2. **일부 deprecated API 제거**
3. **lib.d.ts 변경사항**

### 업그레이드 순서

```bash
# 1. TypeScript 업그레이드
npm install typescript@5.0.0

# 2. 타입 정의 업데이트
npm update @types/*

# 3. 빌드 테스트
npm run build

# 4. 타입 체크
npm run typecheck
```

## 결론

TypeScript 5.0은 개발자 경험과 성능을 크게 개선한 버전입니다. 특히:

- **Decorators 정식 지원**으로 메타프로그래밍이 더 쉬워졌습니다
- **const Type Parameters**로 더 정확한 타입 추론이 가능해졌습니다
- **성능 개선**으로 대규모 프로젝트에서도 빠른 빌드가 가능합니다

새로운 기능들을 점진적으로 도입하면서 TypeScript의 강력함을 더욱 활용해보세요!

## 참고 자료

- [TypeScript 5.0 Release Notes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Decorators Proposal](https://github.com/tc39/proposal-decorators)