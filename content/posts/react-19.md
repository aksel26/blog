---
title: "React 19가 뭐가 달라졌길래? 핵심 업데이트 정리"
date: "2025-11-09"
modified: "2025-11-09"
category: "기술"
tags: ["React", "React19", "Frontend", "JavaScript"]
excerpt: "React 19의 가장 큰 변화는 '개발자가 할 일을 줄여준다'는 것. 컴파일러 도입부터 새로운 훅까지, 주요 업데이트 사항을 쉽게 정리했습니다."
---

# React 19가 뭐가 달라졌길래? 핵심 업데이트 정리

React 19가 나왔다는 소식 들으셨나요? 이번 업데이트의 핵심을 한 문장으로 요약하면 **"이제 우리가 신경 쓸 게 훨씬 줄었다"** 입니다.

새로운 기능을 배워야 한다는 부담보다는, 그동안 귀찮게 작성했던 보일러플레이트 코드들이 사라진다는 점에서 반가운 업데이트인데요. 어떤 점들이 달라졌는지 하나씩 살펴보겠습니다.

## 1. React 컴파일러가 알아서 최적화해준다

### 이제 메모이제이션은 잊어도 된다

React 19의 가장 큰 변화는 바로 **React 컴파일러**의 도입입니다. 그동안 성능 최적화를 위해 우리가 직접 써왔던 `useCallback`, `useMemo`, `memo` 같은 것들 기억하시죠? 이제는 컴파일러가 알아서 처리해줍니다.

```javascript
// Before React 19
const ExpensiveComponent = memo(({ data, onClick }) => {
  const processedData = useMemo(() => heavyProcessing(data), [data]);

  const handleClick = useCallback(() => {
    onClick(processedData);
  }, [onClick, processedData]);

  return <div onClick={handleClick}>{processedData}</div>;
});

// After React 19
const ExpensiveComponent = ({ data, onClick }) => {
  const processedData = heavyProcessing(data);

  const handleClick = () => {
    onClick(processedData);
  };

  return <div onClick={handleClick}>{processedData}</div>;
};
```

보시는 것처럼 코드가 훨씬 깔끔해졌죠. 컴파일러가 코드를 분석해서 필요한 곳에 자동으로 최적화를 적용해주니, 우리는 비즈니스 로직에만 집중하면 됩니다.

## 2. forwardRef 없이 ref 전달하기

ref를 자식 컴포넌트에 전달할 때 `forwardRef`로 감싸는 게 얼마나 번거로웠는지 아실 겁니다. 이제는 그냥 prop처럼 넘기면 끝입니다.

```javascript
// Before React 19
const Button = forwardRef((props, ref) => <button ref={ref} {...props} />);

// After React 19
const Button = ({ ref, ...props }) => <button ref={ref} {...props} />;
```

정말 간단해졌죠?

## 3. 만능 훅 use()의 등장

새로운 `use()` 훅은 프로미스나 컨텍스트를 다룰 때 아주 유용합니다. 특히 데이터 페칭이 훨씬 간단해졌어요.

### 데이터 페칭이 이렇게 간단해진다

```javascript
// 기존 방식
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}

// React 19 방식
function UserProfile({ userId }) {
  const user = use(fetchUser(userId));
  return <div>{user.name}</div>;
}
```

Suspense와 함께 사용하면 로딩 상태도 자동으로 처리됩니다. 코드가 확 줄었죠?

### Context도 더 간단하게

```javascript
// Before
const theme = useContext(ThemeContext);

// After
const theme = use(ThemeContext);
```

## 4. 클라이언트/서버 컴포넌트 구분하기

Next.js를 써보신 분들은 익숙하실 텐데, 이제 React에서도 Directives를 지원합니다. 파일 최상단에 한 줄만 추가하면 됩니다.

```javascript
"use client"; // 클라이언트에서 실행

// 또는

"use server"; // 서버에서 실행
```

## 5. 폼 처리가 훨씬 편해졌다

React 19에서는 폼 관련 작업이 대폭 개선되었습니다. 새로운 훅들이 추가되어 폼 상태 관리가 훨씬 간편해졌어요.

### useFormStatus() - 폼 제출 상태 관리

```javascript
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>{pending ? "제출 중..." : "제출하기"}</button>
  );
}
```

### useOptimistic() - 낙관적 업데이트

사용자가 좋아요를 누르면 서버 응답을 기다리지 않고 바로 UI를 업데이트할 수 있습니다.

```javascript
function LikeButton({ initialLikes }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    initialLikes,
    (state, newLike) => [...state, newLike]
  );

  async function handleLike(formData) {
    addOptimisticLike(formData.get("like"));
    await submitLike(formData);
  }

  return (
    <form action={handleLike}>
      <span>{optimisticLikes.length} likes</span>
      <button name="like" value="👍">
        Like
      </button>
    </form>
  );
}
```

## 마무리하며

React 19는 "더 적은 코드로 더 많은 일을 하자"는 철학이 잘 드러나는 업데이트입니다. 특히 React 컴파일러의 도입으로 성능 최적화에 대한 부담이 크게 줄어든 점이 인상적이네요.

기존 프로젝트를 당장 React 19로 마이그레이션할 필요는 없지만, 새 프로젝트를 시작한다면 충분히 고려해볼 만한 가치가 있습니다. 무엇보다 코드가 간결해지고 개발자 경험이 한층 개선된 점이 마음에 듭니다.

더 자세한 내용이 궁금하시다면 [React 공식 문서](https://react.dev)나 [React Bootcamp](https://reactbootcamp.dev)를 참고해보세요. 실제 코드 예제와 함께 더 깊이 있는 내용을 확인하실 수 있습니다.
