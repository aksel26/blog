---
title: "조합/순열 완벽 정리 - 코딩테스트 필수 템플릿"
date: "2025-10-21"
modified: "2025-10-21"
category: "기술"
tags: ["알고리즘", "코딩테스트", "JavaScript", "순열", "조합"]
excerpt: "코딩테스트에서 자주 출제되는 조합과 순열 문제를 완벽하게 정리했습니다. JavaScript 구현 코드와 실전 예제를 통해 쉽게 이해할 수 있습니다."
---

코딩테스트에서 순열과 조합은 자주 등장하는 주제입니다. 이 글에서는 JavaScript로 구현한 순열, 조합, 중복순열, 중복조합의 모든 것을 다룹니다.

## 핵심 개념 비교표

| 구분     | 순서 고려 | 중복 허용 | 예시 (1,2에서 2개)         |
| -------- | --------- | --------- | -------------------------- |
| 순열     | O         | X         | [1,2], [2,1]               |
| 조합     | X         | X         | [1,2]                      |
| 중복순열 | O         | O         | [1,1], [1,2], [2,1], [2,2] |
| 중복조합 | X         | O         | [1,1], [1,2], [2,2]        |

---

## 1. 순열 (Permutation) - nPr

**설명:** n개 중에서 r개를 뽑아 순서를 고려하여 나열

**공식:** `nPr = n! / (n-r)!`

**언제 사용?**

- 비밀번호 경우의 수 (예: 1,2,3,4로 만들 수 있는 3자리 비밀번호)
- 달리기 시합 순위 (1등, 2등, 3등이 누가 될지)
- 좌석 배치 (A, B, C가 앉을 수 있는 3개 좌석 배치)

```jsx
function getPermutations(arr, r) {
  const result = [];
  if (r === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, idx) => {
    const rest = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    const perms = getPermutations(rest, r - 1);
    const attached = perms.map((v) => [fixed, ...v]);
    result.push(...attached);
  });

  return result;
}

// 사용 예시
getPermutations([1, 2, 3], 2);
// [[1,2], [1,3], [2,1], [2,3], [3,1], [3,2]]
// 결과: 6가지 (3P2 = 3!/(3-2)! = 6)
```

**동작 원리:**

1. 배열의 각 요소를 고정(fixed)
2. 나머지 요소들로 재귀 호출
3. 고정된 요소와 재귀 결과를 합침

---

## 2. 조합 (Combination) - nCr

**설명:** n개 중에서 r개를 뽑되 순서를 고려하지 않음

**공식:** `nCr = n! / (r! × (n-r)!)`

**언제 사용?**

- 로또 번호 선택 (45개 중 6개 선택)
- 팀 구성 (10명 중 5명을 뽑아 팀 구성)
- 메뉴 조합 (A, B, C, D 중 2가지 선택)

```jsx
function getCombinations(arr, r) {
  const result = [];
  if (r === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, idx) => {
    const rest = arr.slice(idx + 1); // 핵심: idx+1부터 시작해 중복 방지
    const combos = getCombinations(rest, r - 1);
    const attached = combos.map((v) => [fixed, ...v]);
    result.push(...attached);
  });

  return result;
}

// 사용 예시
getCombinations([1, 2, 3], 2);
// [[1,2], [1,3], [2,3]]
// 결과: 3가지 (3C2 = 3!/(2!×1!) = 3)
```

**순열과의 차이:**

- 순열: `rest = [...arr.slice(0, idx), ...arr.slice(idx + 1)]` → 앞뒤 모두 포함
- 조합: `rest = arr.slice(idx + 1)` → 뒤쪽만 포함 (순서 무시)

---

## 3. 중복 순열 (Permutation with Repetition)

**설명:** 같은 것을 여러 번 선택 가능, 순서 고려

**공식:** `n^r`

**언제 사용?**

- 주사위를 3번 던질 때 나올 수 있는 경우의 수
- 중복이 허용되는 비밀번호 (0~9를 사용한 4자리 비밀번호 = 10^4)
- 동전을 5번 던질 때의 경우의 수 (2^5 = 32)

```jsx
function getPermutationsWithRepetition(arr, r) {
  const result = [];
  if (r === 1) return arr.map((v) => [v]);

  arr.forEach((fixed) => {
    // 핵심: 모든 arr 사용 (자기 자신 포함)
    const perms = getPermutationsWithRepetition(arr, r - 1);
    const attached = perms.map((v) => [fixed, ...v]);
    result.push(...attached);
  });

  return result;
}

// 사용 예시
getPermutationsWithRepetition([1, 2], 2);
// [[1,1], [1,2], [2,1], [2,2]]
// 결과: 4가지 (2^2 = 4)

// 실전 예시: 주사위 2번 던지기
getPermutationsWithRepetition([1, 2, 3, 4, 5, 6], 2);
// 결과: 36가지 (6^2 = 36)
```

---

## 4. 중복 조합 (Combination with Repetition)

**설명:** 같은 것을 여러 번 선택 가능, 순서 무관

**공식:** `H(n,r) = C(n+r-1, r)`

**언제 사용?**

- 아이스크림 3개 고르기 (같은 맛 중복 가능)
- 과일 5개 담기 (사과, 바나나, 오렌지 중복 허용)
- 동전 개수 세기 (100원 2개, 500원 1개 등)

```jsx
function getCombinationsWithRepetition(arr, r) {
  const result = [];
  if (r === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, idx) => {
    // 핵심: idx부터 시작 (자기 자신 포함, 앞은 제외)
    const rest = arr.slice(idx);
    const combos = getCombinationsWithRepetition(rest, r - 1);
    const attached = combos.map((v) => [fixed, ...v]);
    result.push(...attached);
  });

  return result;
}

// 사용 예시
getCombinationsWithRepetition([1, 2], 2);
// [[1,1], [1,2], [2,2]]
// 결과: 3가지 (H(2,2) = C(3,2) = 3)

// 실전 예시: 아이스크림 2개 고르기 (딸기, 초코, 바닐라)
getCombinationsWithRepetition(["딸기", "초코", "바닐라"], 2);
// [['딸기','딸기'], ['딸기','초코'], ['딸기','바닐라'],
//  ['초코','초코'], ['초코','바닐라'], ['바닐라','바닐라']]
```

**조합과의 차이:**

- 조합: `rest = arr.slice(idx + 1)` → 자기 자신 제외
- 중복조합: `rest = arr.slice(idx)` → 자기 자신 포함

---

## 5. 부분집합 (Power Set)

**설명:** 모든 부분집합 생성 (공집합 포함)

```jsx
function getPowerSet(arr) {
  const result = [[]];

  for (const el of arr) {
    const len = result.length;
    for (let i = 0; i < len; i++) {
      result.push([...result[i], el]);
    }
  }

  return result;
}

// 사용 예시
getPowerSet([1, 2, 3]);
// [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
```

---

## 예시 문제

### 문제 1: 소수 찾기 (프로그래머스 Level 2)

숫자 카드로 만들 수 있는 모든 숫자 중 소수의 개수를 구하는 문제

```jsx
function findPrimes(numbers) {
  const nums = numbers.split("");
  const set = new Set();

  // 모든 순열 생성
  for (let i = 1; i <= nums.length; i++) {
    const perms = getPermutations(nums, i);
    perms.forEach((perm) => {
      const num = parseInt(perm.join(""));
      if (num > 1) set.add(num);
    });
  }

  // 소수 판별
  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  return [...set].filter(isPrime).length;
}

// 테스트
findPrimes("17"); // 3개 (7, 17, 71)
```

### 문제 2: 모의고사 (프로그래머스 Level 1)

반복 패턴을 이용한 경우의 수 문제

```jsx
function solution(answers) {
  const patterns = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];

  const scores = patterns.map((pattern) => answers.filter((ans, i) => ans === pattern[i % pattern.length]).length);

  const maxScore = Math.max(...scores);
  return scores.map((score, idx) => (score === maxScore ? idx + 1 : -1)).filter((v) => v > 0);
}

// 테스트
solution([1, 2, 3, 4, 5]); // [1]
```

---

## 추천 문제

### 백준 (기본 연습)

| 문제 번호 | 제목      | 난이도 | 핵심 개념 |
| --------- | --------- | ------ | --------- |
| 15649     | N과 M (1) | 실버3  | 순열 기본 |
| 15650     | N과 M (2) | 실버3  | 조합 기본 |

- **15649번 - N과 M (1)**: https://www.acmicpc.net/problem/15649
  - 1부터 N까지 자연수 중 M개를 고른 순열
- **15650번 - N과 M (2)**: https://www.acmicpc.net/problem/15650
  - 1부터 N까지 자연수 중 M개를 고른 조합 (오름차순)

### 프로그래머스 (실전 활용)

| 문제        | 레벨    | 핵심 개념        |
| ----------- | ------- | ---------------- |
| 소수 찾기   | Level 2 | 순열 + 소수 판별 |
| 메뉴 리뉴얼 | Level 2 | 조합 + 해시맵    |

- **소수 찾기**: https://school.programmers.co.kr/learn/courses/30/lessons/42839
  - 흩어진 숫자 카드로 만들 수 있는 소수 찾기
- **메뉴 리뉴얼**: https://school.programmers.co.kr/learn/courses/30/lessons/72411
  - 가장 많이 함께 주문된 메뉴 조합 찾기

---

## 선택 가이드

**어떤 함수를 써야 할까?**

```
순서가 중요한가?
├─ YES → 순열 계열
│   ├─ 중복 선택 가능? → 중복순열
│   └─ 중복 선택 불가? → 순열
│
└─ NO → 조합 계열
    ├─ 중복 선택 가능? → 중복조합
    └─ 중복 선택 불가? → 조합

```

---

## 실전 팁과 주의사항

### 1. 시간복잡도 주의

- **순열**: O(n!)
- **조합**: O(n! / (r! × (n-r)!))
- **중복순열**: O(n^r)

**⚠️ 위험 신호:**

- n > 10일 때는 순열/조합 사용 시 시간 초과 가능
- 이런 경우 백트래킹, DP, 그리디 등 다른 접근 필요

### 2. 메모리 최적화

위 코드들은 모든 경우의 수를 배열로 반환합니다. 경우의 수가 많을 때는 제너레이터를 사용하거나 필요한 것만 계산하세요.

```jsx
// 개수만 필요한 경우
function getPermutationCount(n, r) {
  let result = 1;
  for (let i = 0; i < r; i++) {
    result *= n - i;
  }
  return result;
}

function getCombinationCount(n, r) {
  if (r > n - r) r = n - r; // 최적화
  let result = 1;
  for (let i = 0; i < r; i++) {
    result *= n - i;
    result /= i + 1;
  }
  return result;
}
```

### 3. 중복 제거

문자열이나 중복 요소가 있는 배열에서는 Set을 활용하세요.

```jsx
// 중복 숫자가 포함된 배열의 순열
function getUniquePermutations(arr, r) {
  const result = getPermutations(arr, r);
  return [...new Set(result.map(JSON.stringify))].map(JSON.parse);
}

// 예: [1,1,2]의 2개 순열
getUniquePermutations([1, 1, 2], 2);
// [[1,1], [1,2], [2,1]] (중복 제거됨)
```

### 4. 실무 체크리스트

코딩테스트에서 순열/조합 문제를 만났을 때:

- [ ] 순서가 중요한가? → YES면 순열, NO면 조합
- [ ] 중복 선택이 가능한가? → YES면 중복순열/중복조합
- [ ] n의 크기는? → n > 10이면 다른 방법 고려
- [ ] 모든 경우가 필요한가, 개수만 필요한가?
- [ ] 배열에 중복 요소가 있는가? → Set으로 중복 제거

---

## 추가 예제

### 예제 3: 전화번호 조합 만들기

프로그래머스 "전화번호 목록"과 유사한 문제

```jsx
// 숫자 키패드 매핑
const keypad = {
  2: "abc",
  3: "def",
  4: "ghi",
  5: "jkl",
  6: "mno",
  7: "pqrs",
  8: "tuv",
  9: "wxyz",
};

function letterCombinations(digits) {
  if (!digits) return [];

  const result = [];

  function backtrack(idx, current) {
    if (idx === digits.length) {
      result.push(current);
      return;
    }

    const letters = keypad[digits[idx]];
    for (const letter of letters) {
      backtrack(idx + 1, current + letter);
    }
  }

  backtrack(0, "");
  return result;
}

letterCombinations("23");
// ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

### 예제 4: N-Queen 문제 (백트래킹)

n×n 체스판에 n개의 퀸을 배치하는 문제

```jsx
function solveNQueens(n) {
  const result = [];
  const board = Array(n)
    .fill()
    .map(() => Array(n).fill("."));

  function isValid(row, col) {
    // 같은 열 체크
    for (let i = 0; i < row; i++) {
      if (board[i][col] === "Q") return false;
    }

    // 왼쪽 대각선 체크
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === "Q") return false;
    }

    // 오른쪽 대각선 체크
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === "Q") return false;
    }

    return true;
  }

  function backtrack(row) {
    if (row === n) {
      result.push(board.map((r) => r.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = "Q";
        backtrack(row + 1);
        board[row][col] = "."; // 백트래킹
      }
    }
  }

  backtrack(0);
  return result;
}

solveNQueens(4);
// [[".Q..","...Q","Q...","..Q."],
//  ["..Q.","Q...","...Q",".Q.."]]
```

---

## 마무리

순열과 조합은 코딩테스트의 기본이자 핵심입니다. 각 함수의 차이점을 정확히 이해하고, 문제에 맞게 선택하는 연습이 필요합니다.

**핵심 기억하기:**

- **순서 중요 + 중복 X** = 순열
- **순서 무관 + 중복 X** = 조합
- **순서 중요 + 중복 O** = 중복순열
- **순서 무관 + 중복 O** = 중복조합

이 템플릿을 복사해두고 필요할 때마다 꺼내 쓰세요. 코딩테스트 합격을 응원합니다! 🚀
