---
title: "JavaScript에서 한글 자모 분리 현상 해결하기"
date: "2025-01-16"
modified: "2025-01-16"
category: "기술"
tags: ["JavaScript", "Frontend", "한글 처리", "Unicode"]
excerpt: "AWS Lightsail에서 파일명 검색 실패? 한글 자모 분리 현상의 원인과 normalize() 메서드를 활용한 해결 방법을 알아봅니다."
thumbnail: "./2025-01-16-jamo-thumbnail.png"
---

# JavaScript에서 한글 자모 분리 현상 해결하기

## 문제 상황

AWS Lightsail bucket에 저장된 엑셀 파일을 불러오는 작업을 진행하던 중, 이상한 문제에 직면했습니다.

분명히 파일명이 동일한데 **"파일을 찾을 수 없습니다"**라는 에러가 계속 발생하는 것이었습니다.

```javascript
// 파일명이 똑같아 보이는데...
const fileName = "보고서_2025.xlsx";
const result = await findFile(fileName); // Error: File not found
```

아무리 디버깅해봐도 파일명은 정확했고, 파일도 분명히 존재했습니다. 그런데 왜 찾지 못할까요?

---

## 원인: 한글 자모 분리 현상

문득 **자모 분리 현상**이 떠올랐습니다. JavaScript에서 한글을 처리할 때 종종 발생하는 문제였죠.

### 유니코드 정규화 문제

한글은 유니코드에서 두 가지 방식으로 표현될 수 있습니다:

1. **NFC (Normalization Form Canonical Composition)**: 완성형
   - 예: `"가"` → U+AC00 (하나의 코드)

2. **NFD (Normalization Form Canonical Decomposition)**: 조합형
   - 예: `"가"` → U+1100(ㄱ) + U+1161(ㅏ) (분리된 코드)

```javascript
const nfc = "가"; // 완성형
const nfd = "가"; // 조합형 (겉보기엔 같지만 내부적으로 다름)

console.log(nfc === nfd); // false!
console.log(nfc.length); // 1
console.log(nfd.length); // 2
```

파일 시스템에서 저장된 파일명과 JavaScript에서 다루는 문자열의 정규화 방식이 달라서 문제가 발생한 것이었습니다.

---

## 해결 방법

### 1. normalize() 메서드 사용 (권장)

`normalize()` 메서드를 사용하면 문자열을 일관된 형식으로 정규화할 수 있습니다.

```javascript
const fileName = "보고서_2025.xlsx";
const normalizedFileName = fileName.normalize("NFC");

const result = await findFile(normalizedFileName); // 성공!
```

**NFC 옵션**을 사용하면 자모가 합쳐진 완성형으로 변환됩니다.

```javascript
const str = "가나다라";
const normalizedStr = str.normalize("NFC");
console.log(normalizedStr); // '가나다라' (완성형)
```

### normalize() 메서드의 옵션들

| 옵션 | 설명 | 사용 사례 |
|------|------|-----------|
| `NFC` | 정규 정규화 결합 (완성형) | 대부분의 경우 권장 |
| `NFD` | 정규 정규화 분해 (조합형) | 텍스트 분석, 검색 |
| `NFKC` | 호환성 정규화 결합 | 전각/반각 통일 |
| `NFKD` | 호환성 정규화 분해 | 특수한 텍스트 처리 |

---

## 실전 활용 예제

### 2. 파일명 비교 시 정규화

```javascript
function compareFileName(inputName, storedName) {
  const normalizedInput = inputName.normalize("NFC");
  const normalizedStored = storedName.normalize("NFC");

  return normalizedInput === normalizedStored;
}

// 사용 예
const userInput = "보고서_2025.xlsx";
const fileInStorage = "보고서_2025.xlsx"; // 자모 분리된 상태

console.log(compareFileName(userInput, fileInStorage)); // true
```

### 3. 정규 표현식을 사용한 문자열 검색

검색 기능을 구현할 때도 자모 분리 현상을 고려해야 합니다.

```javascript
function searchInText(text, keyword) {
  const normalizedText = text.normalize("NFC");
  const normalizedKeyword = keyword.normalize("NFC");
  const regex = new RegExp(normalizedKeyword, "gi");

  return normalizedText.match(regex);
}

const content = "가나다라 마바사아";
const searchTerm = "나";

const matches = searchInText(content, searchTerm);
console.log(matches); // ['나']
```

### 4. 배열 정렬 시 정규화

한글 데이터를 정렬할 때도 정규화가 필요합니다.

```javascript
function sortKoreanNames(names) {
  return names
    .map(name => name.normalize("NFC"))
    .sort((a, b) => a.localeCompare(b, "ko-KR"));
}

const names = ["김철수", "이영희", "박민수"];
const sorted = sortKoreanNames(names);
console.log(sorted); // ['김철수', '박민수', '이영희']
```

### 5. 폼 입력값 정규화

사용자 입력을 받을 때 자동으로 정규화하는 것이 좋습니다.

```javascript
function handleInput(event) {
  const input = event.target.value;
  const normalized = input.normalize("NFC");

  // 서버로 전송하거나 저장
  saveData(normalized);
}

// React 예제
function SearchInput() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const normalized = e.target.value.normalize("NFC");
    setValue(normalized);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="검색어를 입력하세요"
    />
  );
}
```

### 6. 자모 분리된 문자열 복구

이미 자모 분리가 발생한 데이터를 일괄 복구하는 유틸리티 함수:

```javascript
function fixJamoSeparation(str) {
  return str.normalize("NFC");
}

// 배열 전체 처리
function fixJamoInArray(arr) {
  return arr.map(item => {
    if (typeof item === "string") {
      return item.normalize("NFC");
    }
    return item;
  });
}

// 객체 처리
function fixJamoInObject(obj) {
  const fixed = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      fixed[key] = value.normalize("NFC");
    } else {
      fixed[key] = value;
    }
  }
  return fixed;
}

// 사용 예
const data = {
  name: "홍길동", // 자모 분리된 상태
  address: "서울시 강남구"
};

const fixedData = fixJamoInObject(data);
console.log(fixedData);
```

---

## 성능 고려사항

### normalize()의 성능

`normalize()` 메서드는 비교적 빠르지만, 대용량 데이터 처리 시 성능을 고려해야 합니다.

```javascript
// 성능 측정 예제
console.time("normalize");
const largeText = "가나다라".repeat(100000);
const normalized = largeText.normalize("NFC");
console.timeEnd("normalize"); // 약 10-20ms (환경에 따라 다름)
```

### 최적화 팁

```javascript
// 1. 필요한 곳에만 적용
function searchOptimized(items, keyword) {
  const normalizedKeyword = keyword.normalize("NFC"); // 한 번만 정규화

  return items.filter(item => {
    const normalizedItem = item.normalize("NFC");
    return normalizedItem.includes(normalizedKeyword);
  });
}

// 2. 미리 정규화된 데이터 사용
class NormalizedStringStore {
  constructor() {
    this.data = new Map();
  }

  set(key, value) {
    const normalizedKey = key.normalize("NFC");
    const normalizedValue = value.normalize("NFC");
    this.data.set(normalizedKey, normalizedValue);
  }

  get(key) {
    const normalizedKey = key.normalize("NFC");
    return this.data.get(normalizedKey);
  }
}
```

---

## 실무에서 주의할 점

### 1. 데이터 입력 시점부터 정규화

가장 좋은 방법은 데이터가 시스템에 들어오는 시점부터 정규화하는 것입니다.

```javascript
// API 미들웨어에서 정규화
app.use((req, res, next) => {
  if (req.body) {
    req.body = normalizeObject(req.body);
  }
  next();
});

function normalizeObject(obj) {
  if (typeof obj === "string") {
    return obj.normalize("NFC");
  }

  if (Array.isArray(obj)) {
    return obj.map(normalizeObject);
  }

  if (obj && typeof obj === "object") {
    const normalized = {};
    for (const [key, value] of Object.entries(obj)) {
      normalized[key] = normalizeObject(value);
    }
    return normalized;
  }

  return obj;
}
```

### 2. 데이터베이스 저장 전 정규화

```javascript
// MongoDB 스키마 예제
const userSchema = new Schema({
  name: {
    type: String,
    set: (value) => value.normalize("NFC")
  },
  email: {
    type: String,
    set: (value) => value.normalize("NFC").toLowerCase()
  }
});
```

### 3. 파일 시스템 작업 시 항상 정규화

```javascript
const fs = require("fs").promises;

async function saveFile(fileName, content) {
  const normalizedFileName = fileName.normalize("NFC");
  await fs.writeFile(normalizedFileName, content);
}

async function readFile(fileName) {
  const normalizedFileName = fileName.normalize("NFC");
  return await fs.readFile(normalizedFileName, "utf-8");
}
```

---

## 브라우저 호환성

`normalize()` 메서드는 모든 모던 브라우저에서 지원됩니다:

- Chrome: ✅ 34+
- Firefox: ✅ 31+
- Safari: ✅ 10+
- Edge: ✅ 12+
- IE: ❌ 미지원

IE 지원이 필요한 경우 polyfill 사용:

```javascript
// unorm 라이브러리 사용
import { nfc } from "unorm";

const normalized = nfc("가나다라");
```

---

## 결론

### 핵심 요약

1. **한글 자모 분리는 유니코드 정규화 차이**로 발생합니다.
2. **`normalize("NFC")`를 사용**하면 대부분의 문제를 해결할 수 있습니다.
3. **데이터 입력 시점부터 정규화**하는 것이 가장 안전합니다.
4. **파일명, 검색, 정렬 등 한글 처리 시 항상 고려**해야 합니다.

### 실무 적용 체크리스트

- [ ] 사용자 입력값 정규화 (폼, 검색)
- [ ] API 요청/응답 데이터 정규화
- [ ] 파일 시스템 작업 시 정규화
- [ ] 데이터베이스 저장 전 정규화
- [ ] 문자열 비교 시 정규화
- [ ] 정렬 및 검색 로직에 정규화 적용

---

## 참고 자료

- [MDN - String.prototype.normalize()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
- [Unicode Normalization Forms](https://unicode.org/reports/tr15/)
- [JavaScript 한글 처리 완벽 가이드](https://d2.naver.com/helloworld/76650)

---

이 글이 도움이 되었다면 좋아요를 눌러주세요! 궁금한 점은 댓글로 남겨주세요. 🙌
