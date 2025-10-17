---
title: "Throttle vs Debounce: 성능 최적화의 핵심 기법 완벽 이해하기"
date: "2024-10-19"
modified: "2024-10-19"
category: "기술"
tags: ["JavaScript", "성능 최적화", "Throttle", "Debounce", "이벤트 핸들링", "프론트엔드"]
excerpt: "웹 성능 최적화의 필수 기법인 Throttle과 Debounce의 개념과 차이점을 쉬운 비유와 함께 알아보고, 실전에서 어떻게 활용하는지 살펴봅니다."
thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=425&fit=crop"
---

# ⚡ Throttle vs Debounce: 성능 최적화의 핵심 기법 완벽 이해하기

웹 애플리케이션에서 빈번하게 발생하는 이벤트를 효율적으로 제어하는 방법, Throttle과 Debounce를 쉬운 비유와 실전 예제로 완벽하게 이해해봅시다.

## 📋 목차

1. Throttle(스로틀링)이란?
2. Debounce(디바운싱)이란?
3. 핵심 차이점
4. 실전 구현 코드
5. 사용 사례별 선택 가이드

## 🎯 Throttle(스로틀링)이란?

### 실생활 비유로 이해하기

좋아하는 연예인의 팬미팅에 갔다고 상상해보세요. 너무 신나서 "사랑해요!"를 1초에 10번씩 소리치고 싶지만, 연예인은 한 번에 여러 목소리를 다 들을 수 없습니다. 

이때 팬미팅 진행 요원이 등장합니다:
> "한 사람당 1초에 한 번만 소리치세요!"

바로 이 진행 요원의 역할이 **Throttle**입니다.

### 기술적 정의

**Throttle(스로틀링)**은 **특정 함수가 정해진 시간 간격(예: 1초에 한 번) 동안 최대 한 번만 실행되도록 제한하는 기술**입니다.

```javascript
// 스로틀링 개념 시각화
이벤트 발생: |||||||||||||||||||||||
실제 실행:   ↓     ↓     ↓     ↓
시간(초):    0     1     2     3
```

아무리 많은 이벤트가 발생해도, 정해진 시간 간격 내에서 딱 한 번만 함수가 실행됩니다.

### 왜 Throttle이 필요할까?

#### 1. 성능 최적화 🚀

```javascript
// ❌ 스로틀링 없이 (성능 저하)
window.addEventListener('scroll', () => {
  console.log('스크롤 이벤트 발생!');
  // 복잡한 계산...
  // DOM 업데이트...
});
// 결과: 1초에 수백 번 실행 → 브라우저 버벅임

// ✅ 스로틀링 적용 (최적화)
window.addEventListener('scroll', throttle(() => {
  console.log('스로틀링된 스크롤 이벤트');
  // 복잡한 계산...
  // DOM 업데이트...
}, 200));
// 결과: 200ms에 1번 실행 → 부드러운 동작
```

#### 2. 서버 부하 감소 💾

검색창에서 글자를 입력할 때마다 서버에 요청을 보낸다면?

```
사용자 입력: "리액트"
요청 발생: ㄹ → 리 → 리ㅇ → 리액 → 리액ㅌ → 리액트 (6번 요청!)

Throttle 적용 시:
요청 발생: 리 → 리액 → 리액트 (3번 요청)
```

## 🎪 Debounce(디바운싱)이란?

### 실생활 비유로 이해하기

이번엔 진행 요원이 다른 규칙을 만들었습니다:
> "일단 조용히 하시고, 마지막으로 '사랑해요!'라고 외친 후 **1초 동안 아무도 소리치지 않으면**, 그때 그 마지막 목소리를 연예인에게 전달할게요!"

만약 1초가 지나기 전에 누군가 또 외치면? 타이머가 다시 시작됩니다.

### 기술적 정의

**Debounce(디바운싱)**은 **연속된 이벤트가 끝난 후 일정 시간이 지나면 마지막 이벤트에 대해 함수를 한 번만 실행**하는 기술입니다.

```javascript
// 디바운싱 개념 시각화
이벤트 발생: |||||||||||||||    (멈춤)
타이머:      🔄🔄🔄🔄🔄🔄...  ⏳ 1초 대기...
실제 실행:                      ↓ (마지막 이벤트 후 1초 뒤)
```

### 주요 사용 사례

#### 검색창 자동완성 🔍

```javascript
// ❌ 디바운싱 없이
input.addEventListener('input', (e) => {
  searchAPI(e.target.value);
});
// "리액트" 입력 시: 6번의 API 호출!

// ✅ 디바운싱 적용
input.addEventListener('input', debounce((e) => {
  searchAPI(e.target.value);
}, 300));
// "리액트" 입력 후 300ms 대기 → 1번만 API 호출!
```

## 🔄 핵심 차이점 비교

### 시각적 비교

```
이벤트 발생: |||||||||||||||||||||||||||||||||||||

Throttle (300ms):
실행 시점:   ↓      ↓      ↓      ↓      ↓
            규칙적인 간격으로 실행

Debounce (300ms):
실행 시점:                                   ↓
            모든 이벤트 종료 후 300ms 뒤 실행
```

### 상세 비교표

| 구분 | Throttle | Debounce |
|------|----------|----------|
| **실행 타이밍** | 일정 시간 **간격마다** 실행 | 이벤트 **종료 후** 실행 |
| **주기성** | 규칙적 (`tick-tock-tick-tock`) | 비규칙적 (`......(멈춤)......`) |
| **첫 실행** | 즉시 실행 가능 | 대기 시간 필요 |
| **중간 값** | 주기마다 처리 | 무시됨 |
| **최종 값** | 마지막 주기에 포함 | 반드시 처리됨 |

### 동작 방식 차이

| 시나리오 | Throttle | Debounce |
|---------|----------|----------|
| **스크롤** | 스크롤 중에도 주기적 업데이트 | 스크롤 멈춘 후 1번 업데이트 |
| **검색 입력** | 입력 중 주기적 검색 | 입력 완료 후 1번 검색 |
| **버튼 클릭** | 연속 클릭 제한 (쿨다운) | 마지막 클릭만 처리 |

## 💻 실전 구현 코드

### Throttle 구현

```javascript
function throttle(func, delay) {
  let timeoutId = null;
  let lastExecutedTime = 0;

  return function (...args) {
    const currentTime = Date.now();
    const timeSinceLastExecution = currentTime - lastExecutedTime;

    if (timeSinceLastExecution >= delay) {
      // 즉시 실행
      lastExecutedTime = currentTime;
      func.apply(this, args);
    } else {
      // 남은 시간 후 실행 예약
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        lastExecutedTime = Date.now();
        func.apply(this, args);
      }, delay - timeSinceLastExecution);
    }
  };
}
```

### Debounce 구현

```javascript
function debounce(func, delay) {
  let timeoutId = null;

  return function (...args) {
    // 이전 타이머 취소
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 새 타이머 시작
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

### Lodash 라이브러리 사용 (권장)

```javascript
import _ from 'lodash';

// Throttle
const throttledScroll = _.throttle(handleScroll, 200);
window.addEventListener('scroll', throttledScroll);

// Debounce
const debouncedSearch = _.debounce(handleSearch, 300);
input.addEventListener('input', debouncedSearch);
```

## 🎨 실전 사용 예제

### 1. 무한 스크롤 (Throttle)

```javascript
const handleInfiniteScroll = throttle(() => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadMoreItems();
  }
}, 200);

window.addEventListener('scroll', handleInfiniteScroll);
```

### 2. 검색 자동완성 (Debounce)

```javascript
const searchInput = document.querySelector('#search');

const handleSearch = debounce(async (query) => {
  if (query.length < 2) return;
  
  const results = await fetchSearchResults(query);
  displaySearchResults(results);
}, 300);

searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});
```

### 3. 창 크기 조절 (Throttle)

```javascript
const handleResize = throttle(() => {
  const width = window.innerWidth;
  console.log(`현재 너비: ${width}px`);
  
  // 반응형 레이아웃 조정
  adjustLayout(width);
}, 250);

window.addEventListener('resize', handleResize);
```

### 4. 폼 제출 방지 (Debounce)

```javascript
const submitButton = document.querySelector('#submit');

const handleSubmit = debounce(async (formData) => {
  try {
    await submitForm(formData);
    showSuccessMessage();
  } catch (error) {
    showErrorMessage(error);
  }
}, 500);

submitButton.addEventListener('click', () => {
  const formData = new FormData(form);
  handleSubmit(formData);
});
```

## 📊 사용 사례별 선택 가이드

### Throttle을 사용해야 할 때

✅ **권장 사용 사례:**
- 스크롤 이벤트 (무한 스크롤, 스크롤 애니메이션)
- 마우스 이동 추적
- 창 크기 조절 이벤트
- 게임에서의 연속 공격 쿨다운
- 실시간 위치 업데이트

```javascript
// 스크롤 진행률 표시
const updateScrollProgress = throttle(() => {
  const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = `${scrollPercent}%`;
}, 100);
```

### Debounce를 사용해야 할 때

✅ **권장 사용 사례:**
- 검색창 자동완성
- 입력 필드 유효성 검사
- 버튼 중복 클릭 방지
- 자동 저장 기능
- API 요청 최적화

```javascript
// 자동 저장
const autoSave = debounce(async (content) => {
  await saveToServer(content);
  showSavedIndicator();
}, 1000);

textarea.addEventListener('input', (e) => {
  autoSave(e.target.value);
});
```

## ⚠️ 주의사항

### 1. 메모리 누수 방지

```javascript
// ❌ 컴포넌트 언마운트 시 정리 안 함
useEffect(() => {
  const handleScroll = throttle(() => {...}, 200);
  window.addEventListener('scroll', handleScroll);
}, []);

// ✅ 올바른 정리
useEffect(() => {
  const handleScroll = throttle(() => {...}, 200);
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

### 2. 적절한 지연 시간 설정

```javascript
// 너무 짧음 (효과 없음)
throttle(fn, 10);  // ❌ 거의 모든 이벤트 실행

// 적절한 값
throttle(fn, 100-300);  // ✅ 성능과 반응성 균형

// 너무 김 (반응성 저하)
throttle(fn, 2000);  // ❌ 사용자 경험 저하
```

### 3. React에서의 사용

```javascript
import { useCallback } from 'react';
import { debounce } from 'lodash';

function SearchComponent() {
  // ✅ useCallback으로 메모이제이션
  const debouncedSearch = useCallback(
    debounce((query) => {
      fetchResults(query);
    }, 300),
    []
  );

  return (
    <input 
      onChange={(e) => debouncedSearch(e.target.value)}
    />
  );
}
```

## 🎯 결론

### 빠른 선택 가이드

```
주기적인 업데이트가 필요한가?
  ├─ YES → Throttle 사용
  │         예: 스크롤, 창 크기 조절
  │
  └─ NO → 마지막 결과만 중요한가?
            ├─ YES → Debounce 사용
            │         예: 검색, 자동 저장
            │
            └─ NO → 일반 이벤트 핸들러 사용
```

### 핵심 정리

| 기법 | 한마디 설명 | 대표 사례 |
|------|-----------|----------|
| **Throttle** | "일정 간격마다 실행해!" | 스크롤, 리사이즈 |
| **Debounce** | "입력 끝나면 실행해!" | 검색, 자동 저장 |

## 🔗 참고 자료

- [Lodash Throttle 문서](https://lodash.com/docs/#throttle)
- [Lodash Debounce 문서](https://lodash.com/docs/#debounce)
- [MDN 이벤트 최적화](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [참고 블로그](https://jaddong.tistory.com/entry/Throttle와-Debounce-개념-알고-상황에-맞게-쓰기)

웹 성능 최적화의 기본이자 필수인 Throttle과 Debounce를 마스터했습니다! 적재적소에 활용하여 더 나은 사용자 경험을 제공하세요. 🚀
