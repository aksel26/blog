---
title: "new Array와 Array.from의 차이"
date: "2025-10-28"
modified: "2025-10-28"
category: "기술"
tags: ["Javascript", "기초", "배열"]
excerpt: "배열을 다루는 new Array와 Array.from의 차이점에 대해서 공유합니다."
---

평소에 배열을 초기화할 때 `Array.from`을 주로 사용한다.

`{length}`로 길이를 명확하게 정의할 수 있고, 콜백 함수를 통해 `new Array().fill()`보다 원하는 값을 더 쉽게 채울 수 있기 때문이다.

그런데 다른 사람들의 코드를 보니 `new Array(5).fill(0)` 같은 방식으로 초기화하는 경우도 있었다.

문득 궁금해졌다. 둘의 차이가 뭘까?

두 메서드 모두 배열을 만들지만, 사용 목적과 동작 방식이 완전히 다르다.

핵심 차이는 이렇다.

- **`new Array()`**: 길이를 지정해 빈 배열을 만드는 생성자
- **`Array.from()`**: 유사 배열 객체나 이터러블을 복사하거나 변환해서 새 배열을 만드는 정적 메서드

---

## 1\. `new Array()` (배열 생성자)

`new Array()`는 인자의 개수와 타입에 따라 다르게 동작해서 혼란을 줄 수 있다.

### 동작 1: 인자가 1개이고 숫자인 경우

해당 숫자만큼의 길이를 가진 **희소 배열(sparse array)**을 만든다. 값은 비어있다.

```javascript
const arr = new Array(5);
console.log(arr); // [ <5 empty items> ]
console.log(arr.length); // 5
console.log(arr[0]); // undefined
```

**주의할 점**이 있다. 이 배열은 `map()`, `forEach()` 같은 메서드가 동작하지 않는다. 값이 `undefined`가 아니라 슬롯 자체가 비어있기 때문이다.

```javascript
// map()이 동작하지 않음
const mappedArr = new Array(5).map((val, index) => index);
console.log(mappedArr); // [ <5 empty items> ]
```

### 동작 2: 인자가 2개 이상이거나, 1개라도 숫자가 아닌 경우

전달된 인자들을 요소로 가지는 배열을 만든다.

```javascript
const arr1 = new Array(1, 2, 3, 4, 5);
console.log(arr1); // [1, 2, 3, 4, 5]

const arr2 = new Array("hello");
console.log(arr2); // ['hello']
```

이 방식은 배열 리터럴(`[]`)을 쓰는 게 훨씬 낫다. 가독성도 좋고 명확하기 때문이다.

- `new Array(1, 2, 3)` ❌
- `[1, 2, 3]` ✅

---

## 2\. `Array.from()` (정적 메서드)

`Array.from()`은 "어떤 것으로부터 배열을 만든다"는 의미로, `new Array()`보다 훨씬 명확하고 강력하다.

### 주요 용도 1: 유사 배열(Array-like) 객체 변환

`length` 속성과 인덱스를 가진 객체(예: `NodeList`, `arguments`)를 실제 배열로 변환한다.

```javascript
// 브라우저에서 DOM 요소를 가져오는 NodeList (유사 배열)
const nodeList = document.querySelectorAll("div");

// nodeList.map is not a function 오류 발생
// nodeList.map(node => ...);

// Array.from으로 실제 배열로 변환해야 map, filter 등 사용 가능
const divArray = Array.from(nodeList);
divArray.map((node) => node.textContent);
```

### 주요 용도 2: 이터러블(Iterable) 객체 변환

`Set`, `Map`, `String` 등 반복 가능한 객체를 배열로 변환한다.

```javascript
// String
const arrFromStr = Array.from("hello");
console.log(arrFromStr); // ['h', 'e', 'l', 'l', 'o']

// Set (중복 제거)
const mySet = new Set([1, 1, 2, 3, 3]);
const arrFromSet = Array.from(mySet);
console.log(arrFromSet); // [1, 2, 3]
```

### 주요 용도 3: `map` 기능 내장 (매우 유용)

`Array.from()`은 두 번째 인자로 `map` 함수를 받을 수 있다. 이 기능이 `new Array(N)`의 문제를 완벽하게 해결한다.

`{ length: 5 }`는 유사 배열 객체다. `Array.from`은 이 객체를 배열로 변환하면서 각 요소를 `undefined`로 채운다. (희소 배열이 아님!)

```javascript
// 1. 길이 5짜리 배열을 만들고 0, 1, 2, 3, 4로 채우기
const arr = Array.from({ length: 5 }, (value, index) => index);
console.log(arr); // [0, 1, 2, 3, 4]
```

`new Array(5)`와 비교해보자.

```javascript
// new Array(5)는 비어있어서 map()이 동작 안 함
new Array(5).map((v, i) => i); // [ <5 empty items> ]

// Array.from은 비어있지 않고 'undefined'로 채워진 배열을 만들고 map을 실행함
Array.from({ length: 5 }).map((v, i) => i); // [0, 1, 2, 3, 4]

// Array.from의 2번째 인자를 쓰면 더 간결함
Array.from({ length: 5 }, (v, i) => i); // [0, 1, 2, 3, 4]
```

---

## 핵심 비교 요약

| 구분                            | `new Array()`                            | `Array.from()`                                            |
| :------------------------------ | :--------------------------------------- | :-------------------------------------------------------- |
| **주요 목적**                   | 새 배열 **생성** (주로 길이 지정)        | 기존 값에서 새 배열 **변환/복사**                         |
| **`new Array(5)`**              | `[ <5 empty items> ]` (희소 배열)        | (해당 없음)                                               |
| **`Array.from({ length: 5 })`** | (해당 없음)                              | `[undefined, undefined, undefined, undefined, undefined]` |
| **`'hello'` 인자**              | `['hello']` (요소 1개)                   | `['h', 'e', 'l', 'l', 'o']` (문자열 순회)                 |
| **Map 기능**                    | 없음 (생성 후 별도 `.fill().map()` 필요) | 2번째 인자로 `map` 함수 내장                              |
| **모호성**                      | **높음** (인자에 따라 동작이 다름)       | **낮음** (동작이 명확함)                                  |

## 결론

### `new Array()`는 사용하지 않는 게 좋다

- 인자가 1개일 때(길이)와 여러 개일 때(요소)의 동작이 달라서 혼란스럽다
- `[1, 2, 3]`처럼 배열 리터럴(`[]`)을 쓰는 게 항상 더 명확하다

### `Array.from()`을 적극 활용하자

- `NodeList`, `Set`, `Map` 등을 실제 배열로 변환할 때 필수다
- `Array.from({ length: N }, (v, i) => i)` 패턴은 원하는 길이의 배열을 만들고 즉시 초기화할 때 가장 좋은 방법이다
