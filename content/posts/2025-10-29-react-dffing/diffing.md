---
title: "React Diffing 알고리즘의 원리와 최적화 전략"
date: "2025-10-29"
modified: "2025-10-29"
category: "기술"
tags: ["React", "알고리즘", "Virtual DOM", "성능 최적화", "Reconciliation"]
excerpt: "React의 조화 과정에서 사용되는 Diffing 알고리즘이 휴리스틱을 통해 O(n³)에서 O(n)으로 최적화되는 원리를 설명합니다."
---

# React Diffing 알고리즘의 원리와 최적화 전략

React의 성능을 이해하는 핵심은 바로 Diffing 알고리즘입니다. 이 글에서는 React가 Virtual DOM을 효율적으로 비교하고 업데이트하는 방식, 그리고 그 과정에서 적용되는 최적화 기법에 대해 자세히 알아보겠습니다.

---

## Virtual DOM과 Reconciliation

### Virtual DOM이란?

Virtual DOM은 실제 DOM의 가벼운 JavaScript 객체 표현입니다. React는 상태가 변경될 때마다 새로운 Virtual DOM 트리를 생성하고, 이전 트리와 비교하여 실제 DOM에 필요한 최소한의 변경만 적용합니다.

### Reconciliation (조화) 과정

Reconciliation은 React가 두 개의 Virtual DOM 트리를 비교하여 변경사항을 찾아내는 과정입니다. 이 과정의 핵심이 바로 **Diffing 알고리즘**입니다.

```javascript
// 상태 변경 전
<div>
  <h1>Hello</h1>
  <p>World</p>
</div>

// 상태 변경 후
<div>
  <h1>Hello React</h1>
  <p>World</p>
</div>

// React는 <h1>의 텍스트만 변경하고, 나머지는 그대로 유지
```

---

## 1. 트리 탐색 방식: BFS vs DFS

### 레벨별 비교 방식

React의 Diffing 알고리즘은 **너비 우선 탐색(BFS, Breadth-First Search)**과 유사한 방식으로 작동합니다. 트리의 **같은 레벨(깊이)에 있는 노드들을 먼저 비교**합니다.

```
이전 트리:              새로운 트리:
    Root                    Root
   /    \                  /    \
  A      B                A      C
 / \    / \              / \    / \
D   E  F   G            D   E  F   H

레벨 0: Root ↔ Root (비교)
레벨 1: A, B ↔ A, C (비교)
레벨 2: D, E, F, G ↔ D, E, F, H (비교)
```

### 왜 BFS 방식인가?

1. **같은 레벨의 형제 노드들이 비슷한 구조를 가질 가능성이 높음**
2. **부모 노드의 변경이 자식 노드에 영향을 미치는 경우 효율적**
3. **전체 트리를 깊이 탐색할 필요 없이 레벨별로 빠르게 비교 가능**

```javascript
// React의 레벨별 비교 예시
function Component() {
  return (
    <div>
      {" "}
      {/* 레벨 0 */}
      <Header /> {/* 레벨 1 */}
      <Main>
        {" "}
        {/* 레벨 1 */}
        <Article /> {/* 레벨 2 */}
        <Aside /> {/* 레벨 2 */}
      </Main>
    </div>
  );
}
```

---

## 2. 성능 문제: O(n³) 시간 복잡도

### 일반적인 트리 비교 알고리즘의 한계

컴퓨터 과학에서 두 트리의 차이를 찾는 최소 편집 거리 알고리즘(Minimum Edit Distance)은 **O(n³)**의 시간 복잡도를 가집니다.

#### O(n³)가 발생하는 이유

1. **n개의 노드를 각각 비교**: O(n²)
2. **각 노드 쌍에 대해 최소 변환 경로 계산**: O(n)
3. **결과**: O(n³)

#### 실제 문제점

```javascript
// 1,000개의 노드를 가진 트리
n = 1000

// O(n³) 알고리즘의 경우
연산 횟수 = 1000³ = 1,000,000,000 (10억 번)

// 60fps를 유지하려면
프레임당 시간 = 16.67ms
→ 10억 번 연산은 불가능!
```

이러한 시간 복잡도는 웹 애플리케이션에 적용하기에는 **매우 비효율적**입니다. 특히 대규모 컴포넌트 트리를 가진 현대 웹 애플리케이션에서는 사용자 경험을 크게 해칠 수 있습니다.

---

## 3. 해결책: 휴리스틱을 통한 O(n) 최적화

### 휴리스틱(Heuristic)이란?

휴리스틱은 **"빠른 시간 내에 합리적인(충분히 좋은) 해를 찾기 위한 경험적 지침"**입니다.

#### 핵심 특징

- **최적해 보장 X**: 모든 경우에 완벽한 해를 찾지는 못함
- **실용적 해 제공 O**: 대부분의 실제 상황에서 충분히 좋은 결과
- **성능 향상**: 시간 복잡도를 획기적으로 줄임

### React의 최적화 전략

React는 실제 웹 애플리케이션에서 나타나는 패턴을 분석하여, **두 가지 핵심 가정**을 통해 알고리즘을 **O(n)**으로 최적화했습니다.

```javascript
// O(n³) → O(n) 최적화 효과
n = 1000

// 이전: O(n³)
연산 횟수 = 1,000,000,000

// 이후: O(n)
연산 횟수 = 1,000

// 성능 개선: 100만 배!
```

---

## 4. React의 핵심 휴리스틱 규칙

### 규칙 1: 서로 다른 타입의 엘리먼트는 다른 트리를 생성한다

#### 개념

서로 다른 타입의 엘리먼트(예: `<div>`와 `<span>`)는 완전히 다른 트리를 만든다고 가정합니다.

#### 작동 방식

```javascript
// 이전
<div>
  <Counter />
</div>

// 이후
<span>
  <Counter />
</span>

// React의 처리:
// 1. <div> 트리 전체를 제거 (Counter도 언마운트)
// 2. <span> 트리를 새로 생성 (Counter도 새로 마운트)
```

#### 실제 예시

```javascript
function App() {
  const [isDiv, setIsDiv] = useState(true);

  return isDiv ? (
    <div className="container">
      <ExpensiveComponent /> {/* 타입이 바뀌면 다시 마운트 */}
    </div>
  ) : (
    <section className="container">
      <ExpensiveComponent /> {/* 새로운 인스턴스 생성 */}
    </section>
  );
}
```

#### 최적화 팁

```javascript
// ❌ 나쁜 예: 타입을 동적으로 변경
function BadExample({ isImportant }) {
  return isImportant ? <h1>Title</h1> : <p>Title</p>;
}

// ✅ 좋은 예: 같은 타입 유지, 스타일로 변경
function GoodExample({ isImportant }) {
  return (
    <p className={isImportant ? "title-important" : "title-normal"}>Title</p>
  );
}
```

---

### 규칙 2: `key` prop을 통한 리스트 최적화

#### 개념

리스트 렌더링 시, 개발자가 제공하는 고유한 `key` prop을 사용하여 엘리먼트의 변화를 효율적으로 추적합니다.

#### key가 없을 때의 문제

```javascript
// key 없는 리스트
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
</ul>

// 맨 앞에 새 항목 추가
<ul>
  <li>Avocado</li>  {/* React는 Apple → Avocado로 변경 */}
  <li>Apple</li>    {/* React는 Banana → Apple로 변경 */}
  <li>Banana</li>   {/* React는 Cherry → Banana로 변경 */}
  <li>Cherry</li>   {/* 새로 생성 */}
</ul>

// 결과: 4번의 DOM 조작 (비효율적)
```

#### key가 있을 때의 효율성

```javascript
// key 있는 리스트
<ul>
  <li key="apple">Apple</li>
  <li key="banana">Banana</li>
  <li key="cherry">Cherry</li>
</ul>

// 맨 앞에 새 항목 추가
<ul>
  <li key="avocado">Avocado</li>  {/* 새로 생성 */}
  <li key="apple">Apple</li>      {/* 그대로 유지 */}
  <li key="banana">Banana</li>    {/* 그대로 유지 */}
  <li key="cherry">Cherry</li>    {/* 그대로 유지 */}
</ul>

// 결과: 1번의 DOM 조작 (효율적)
```

#### key 사용 가이드

```javascript
// ❌ 나쁜 예 1: 인덱스를 key로 사용 (순서가 변경되는 경우)
{
  items.map((item, index) => <Item key={index} data={item} />);
}

// ❌ 나쁜 예 2: 안정적이지 않은 값 사용
{
  items.map((item) => <Item key={Math.random()} data={item} />);
}

// ✅ 좋은 예 1: 고유한 ID 사용
{
  items.map((item) => <Item key={item.id} data={item} />);
}

// ✅ 좋은 예 2: 여러 속성 조합 (ID가 없는 경우)
{
  items.map((item) => (
    <Item key={`${item.category}-${item.name}`} data={item} />
  ));
}
```

#### 실전 예시: 할 일 목록

```javascript
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "장보기", completed: false },
    { id: 2, text: "운동하기", completed: true },
    { id: 3, text: "공부하기", completed: false },
  ]);

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id} // ✅ 고유한 ID를 key로 사용
          onClick={() => handleToggle(todo.id)}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

---

## 성능 비교 분석

### 시간 복잡도 비교

| 알고리즘       | 시간 복잡도 | 1,000개 노드 | 10,000개 노드 |
| -------------- | ----------- | ------------ | ------------- |
| 일반 트리 비교 | O(n³)       | 10억 번 연산 | 1조 번 연산   |
| React Diffing  | O(n)        | 1,000번 연산 | 10,000번 연산 |
| **성능 개선**  | **n² 배**   | **100만 배** | **1억 배**    |

### 실제 렌더링 성능

```javascript
// 성능 측정 예시
function measureRenderTime() {
  const start = performance.now();

  // 1000개의 컴포넌트 렌더링
  ReactDOM.render(<List items={Array.from({ length: 1000 })} />, container);

  const end = performance.now();
  console.log(`렌더링 시간: ${end - start}ms`);
}

// O(n³) 알고리즘: ~1000ms (사용 불가능)
// React O(n): ~16ms (60fps 유지 가능)
```

---

## 개발자가 알아야 할 최적화 팁

### 1. 컴포넌트 타입 안정성 유지

```javascript
// ❌ 피해야 할 패턴
function DynamicComponent({ type }) {
  const Component = type === "button" ? "button" : "a";
  return <Component>Click</Component>;
}

// ✅ 권장 패턴
function StableComponent({ type, ...props }) {
  return type === "button" ? (
    <button {...props}>Click</button>
  ) : (
    <a {...props}>Click</a>
  );
}
```

### 2. key prop 올바르게 사용하기

```javascript
// ❌ 안티패턴
{
  items.map((item, idx) => <Item key={idx} {...item} />);
}

// ✅ 올바른 사용
{
  items.map((item) => <Item key={item.id} {...item} />);
}

// ✅ ID가 없는 경우
{
  items.map((item) => <Item key={`${item.name}-${item.category}`} {...item} />);
}
```

### 3. React.memo를 활용한 추가 최적화

```javascript
// props가 변경되지 않으면 리렌더링 방지
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // 복잡한 연산이나 렌더링 로직
  return <div>{data.map(renderComplexItem)}</div>;
});

// 커스텀 비교 함수
const MemoizedComponent = React.memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});
```

### 4. Fragment 사용으로 불필요한 DOM 노드 제거

```javascript
// ❌ 불필요한 <div> 래퍼
function List({ items }) {
  return (
    <div>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}

// ✅ Fragment 사용
function List({ items }) {
  return (
    <>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </>
  );
}
```

---

## 마치며

React의 Diffing 알고리즘은 다음과 같은 핵심 원리로 작동합니다:

### 핵심 요약

1. **BFS 방식의 레벨별 비교**: 같은 깊이의 노드들을 우선 비교하여 효율성 향상
2. **O(n³) → O(n) 최적화**: 휴리스틱을 통해 100만 배 이상의 성능 개선
3. **두 가지 핵심 규칙**:
   - 다른 타입 = 다른 트리 (전체 교체)
   - `key` prop으로 리스트 최적화

### 실무 적용 가이드

- 컴포넌트 타입을 동적으로 변경하지 말 것
- 리스트 렌더링 시 항상 고유한 `key` 사용
- `React.memo`로 불필요한 리렌더링 방지
- React DevTools Profiler로 성능 병목 지점 파악

이러한 최적화 원리를 이해하고 적용하면, 더 빠르고 효율적인 React 애플리케이션을 개발할 수 있습니다.

---

## 참고 자료

- [React 공식 문서 - Reconciliation](https://react.dev/learn/reconciliation)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
- [Virtual DOM and Internals](https://react.dev/reference/react-dom/client/createRoot)
