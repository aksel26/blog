---
title: "React 18의 새로운 기능들"
date: "2024-03-15"
modified: "2024-03-15"
category: "기술"
tags: ["React", "JavaScript", "Frontend"]
excerpt: "React 18에서 새롭게 추가된 Concurrent Features와 Automatic Batching에 대해 알아보겠습니다."
---

# React 18의 새로운 기능들

React 18이 출시되면서 많은 새로운 기능들이 추가되었습니다. 이번 포스트에서는 주요 변경사항들을 살펴보겠습니다.

## Concurrent Features

React 18의 가장 큰 변화는 **Concurrent Features**입니다. 이 기능들은 React가 더 부드러운 사용자 경험을 제공할 수 있게 해줍니다.

### Suspense 개선

```jsx
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ProfilePage />
    </Suspense>
  );
}
```

### useTransition Hook

긴급하지 않은 업데이트를 처리할 때 사용합니다:

```jsx
import { useTransition, useState } from 'react';

function SearchBox() {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleChange = (e) => {
    startTransition(() => {
      setSearchTerm(e.target.value);
    });
  };
  
  return (
    <input 
      onChange={handleChange}
      style={{ opacity: isPending ? 0.5 : 1 }}
    />
  );
}
```

## Automatic Batching

React 18에서는 더 많은 경우에 자동 배칭이 적용됩니다.

### 이전 버전 (React 17)

```jsx
// React 17에서는 이벤트 핸들러 내에서만 배칭됨
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // 한 번의 리렌더링
}

// Promise, setTimeout에서는 배칭되지 않음
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // 두 번의 리렌더링
}, 1000);
```

### React 18에서의 개선

```jsx
// React 18에서는 모든 곳에서 배칭됨
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // 한 번의 리렌더링!
}, 1000);
```

## 새로운 Root API

React 18에서는 새로운 Root API를 사용해야 합니다:

```jsx
// React 17
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, container);

// React 18
import { createRoot } from 'react-dom/client';
const root = createRoot(container);
root.render(<App />);
```

## useDeferredValue Hook

값의 업데이트를 지연시킬 수 있습니다:

```jsx
import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  return <ExpensiveList query={deferredQuery} />;
}
```

## 결론

React 18은 성능과 사용자 경험 향상에 초점을 맞춘 메이저 업데이트입니다. Concurrent Features를 통해 더 부드러운 UI를 만들 수 있게 되었고, Automatic Batching으로 성능이 더욱 개선되었습니다.

새로운 Hooks들을 적절히 활용한다면 더 나은 React 애플리케이션을 만들 수 있을 것입니다.