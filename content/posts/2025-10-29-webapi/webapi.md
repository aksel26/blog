---
title: "Web API 종류와 개념 설명"
date: "2025-10-29"
modified: "2025-10-29"
category: "기술"
tags: ["Javascript", "WebAPI"]
excerpt: "웹 애플리케이션 개발에 필수적인 Web API들을 기능별로 소개합니다."
---

# 현대 웹 개발을 위한 필수 Web API 완벽 가이드

웹 애플리케이션 개발에 필수적인 Web API들을 기능별로 정리하여 소개합니다. 각 API의 개념과 실제 활용 사례를 통해 현대 웹 개발의 핵심 기술을 이해할 수 있습니다.

---

## 1. 백그라운드 & 오프라인 (Background & Offline)

웹페이지가 닫혀있거나 여러 탭에 걸쳐 작동하는 강력한 기능들입니다.

### Service Workers (서비스 워커)

**웹사이트의 오프라인 매니저**

#### 개념

브라우저 백그라운드에서 실행되는 독립적인 스크립트입니다. 네트워크 요청을 가로채고(Proxy) 응답을 제어하여, 오프라인 상태에서도 캐시된 데이터를 보여주거나 푸시 알림을 받는 등 앱과 유사한 경험을 제공합니다. PWA(Progressive Web App)의 핵심 기술입니다.

#### 활용 예시

웹사이트를 '앱처럼 설치'하면 서비스 워커가 함께 설치됩니다. 인터넷이 끊겨도 미리 저장해 둔 페이지를 보여줘서 앱이 오프라인에서도 작동하게 만듭니다. 또한 웹사이트가 닫혀 있어도 서버의 푸시 알림을 받아 사용자에게 표시할 수 있습니다.

```javascript
// Service Worker 등록
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => console.log("Service Worker 등록 성공"))
    .catch((error) => console.log("Service Worker 등록 실패:", error));
}

// sw.js - 캐싱 전략
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

---

### Shared Worker (공유 워커)

**여러 탭이 함께 쓰는 공용 비서**

#### 개념

동일한 출처(Origin)를 가진 여러 탭, 창, iframe 간에 **동일한 워커 인스턴스를 공유**하는 백그라운드 스크립트입니다. 탭 간의 상태 공유(예: 웹소켓 연결 중앙 관리)나 리소스 절약에 사용됩니다.

#### 활용 예시

은행 사이트 탭 3개(조회, 이체, 카드)가 공유 워커 1개와 통신합니다. 이체 탭에서 송금하면, 워커가 즉시 다른 탭들에게 "잔액 변경"을 알려서 모든 탭의 상태를 실시간으로 동기화합니다.

```javascript
// Shared Worker 생성
const worker = new SharedWorker("shared-worker.js");

worker.port.start();
worker.port.postMessage({ type: "connect", tabId: "tab-1" });

worker.port.onmessage = (event) => {
  console.log("워커로부터 메시지:", event.data);
};
```

---

## 2. 데이터 저장소 (Data Storage)

브라우저에 데이터를 저장하여 오프라인 접근이나 사용자 설정 유지를 돕습니다.

### Web Storage API (localStorage & sessionStorage)

**브라우저의 간편 저장소**

#### 개념

`key-value` 쌍으로 데이터를 간단하게 저장하는 API입니다.

- **localStorage**: 브라우저를 닫아도 데이터가 영구적으로 보존됩니다.
- **sessionStorage**: 탭/창이 닫히면 데이터가 삭제됩니다.

#### 활용 예시

`localStorage`는 다크 모드 설정처럼 계속 기억해야 할 것을 저장합니다. `sessionStorage`는 이 탭에서만 잠시 기억할 것(예: 폼 임시 작성 내용)을 저장하는 임시 저장소입니다.

```javascript
// localStorage - 영구 저장
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme"); // 'dark'

// sessionStorage - 세션 동안만 저장
sessionStorage.setItem("formData", JSON.stringify({ name: "John" }));
const formData = JSON.parse(sessionStorage.getItem("formData"));
```

---

### IndexedDB API

**브라우저의 개인용 데이터베이스**

#### 개념

대용량의 구조화된 데이터(객체, 파일 등)를 저장할 수 있는 저수준(low-level)의 트랜잭션 기반 데이터베이스입니다. 오프라인 앱을 위한 복잡한 데이터 관리에 사용됩니다.

#### 활용 예시

Web Storage가 간단한 메모 수준이라면, `IndexedDB`는 엑셀이나 정식 데이터베이스 프로그램입니다. 수천 개의 데이터를 저장하고, 검색하고, 정렬해야 하는 복잡한 오프라인 작업을 처리할 수 있습니다.

```javascript
// IndexedDB 데이터베이스 열기
const request = indexedDB.open("MyDatabase", 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const objectStore = db.createObjectStore("users", { keyPath: "id" });
  objectStore.createIndex("name", "name", { unique: false });
};

request.onsuccess = (event) => {
  const db = event.target.result;
  const transaction = db.transaction(["users"], "readwrite");
  const objectStore = transaction.objectStore("users");

  objectStore.add({ id: 1, name: "John", age: 30 });
};
```

---

## 3. 애니메이션 & 렌더링 (Animation & Rendering)

화면을 부드럽게 그리고 사용자 인터랙션을 효율적으로 감지합니다.

### requestAnimationFrame (rAF)

**화면 주사율에 맞춘 스마트 타이머**

#### 개념

브라우저의 다음 리페인트(Repaint) 타이밍에 맞춰 콜백 함수를 실행하도록 요청합니다. 모니터 주사율(일반적으로 60Hz)과 동기화되어 `setTimeout`보다 훨씬 부드럽고 효율적인 애니메이션을 만듭니다.

#### 활용 예시

플립북(손으로 넘기는 만화책)을 넘길 때, '0.016초마다 넘겨'(setTimeout)가 아니라, "다음 장 넘길 준비가 완벽하게 됐을 때 신호 줘"(rAF)라고 요청하는 것입니다. 덕분에 그림이 끊기지 않고 가장 부드럽게 보입니다.

```javascript
let position = 0;

function animate() {
  position += 2;
  element.style.transform = `translateX(${position}px)`;

  if (position < 500) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
```

---

### Web Animations API (WAAPI)

**애니메이션 전용 컨트롤러**

#### 개념

CSS 애니메이션의 성능과 JavaScript의 유연한 제어력을 결합한 고수준 API입니다. `element.animate()`로 애니메이션을 생성하고, 반환된 객체로 재생, 정지, 되감기, 속도 조절(`playbackRate`) 등을 자유롭게 제어합니다.

#### 활용 예시

CSS 애니메이션이 '한번 틀면 끝나는 비디오테이프'라면, WAAPI는 여기에 재생/정지, 되감기, 2배속 기능이 달린 리모컨을 제공합니다. 성능은 CSS처럼 좋으면서 제어는 JavaScript처럼 쉽게 할 수 있습니다.

```javascript
const animation = element.animate(
  [
    { transform: "translateX(0px)", opacity: 1 },
    { transform: "translateX(300px)", opacity: 0.5 },
  ],
  {
    duration: 1000,
    iterations: Infinity,
    direction: "alternate",
  }
);

// 애니메이션 제어
animation.pause();
animation.play();
animation.playbackRate = 2; // 2배속
```

---

### Intersection Observer API

**화면 속 요소 감시 카메라**

#### 개념

특정 요소가 뷰포트(화면에 보이는 영역)에 들어오거나 나가는 것을 비동기적으로 감지합니다. 스크롤 이벤트를 직접 계산하는 것보다 성능이 월등히 뛰어납니다.

#### 활용 예시

스크롤을 내릴 때마다 "이미지 아직 안 보여?"라고 계속 묻는 대신, 이미지 앞에 감시 카메라를 설치합니다. 이미지가 화면에 딱 들어오는 순간 카메라가 "지금 보입니다"라고 알려줘서, 그때 이미지를 로딩(Lazy Loading)하거나 애니메이션을 시작합니다.

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 요소가 화면에 나타남
        entry.target.src = entry.target.dataset.src; // Lazy Loading
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5, // 50% 보일 때 트리거
  }
);

document.querySelectorAll("img[data-src]").forEach((img) => {
  observer.observe(img);
});
```

---

## 4. 네트워크 & 라우팅 (Network & Routing)

서버와 통신하고 웹페이지의 URL을 관리합니다.

### Fetch API

**최신식 데이터 통신 인터페이스**

#### 개념

네트워크 요청 및 응답을 처리하는 현대적인 API입니다. `Promise` 기반으로 작동하여 `XMLHttpRequest`를 대체하며, `async/await`와 함께 비동기 코드를 깔끔하게 작성할 수 있습니다.

#### 활용 예시

서버에 "데이터 좀 주세요"(GET) 또는 "이 데이터 좀 받으세요"(POST)라고 요청합니다. 기존 방식(XHR)보다 Promise 기반으로 작동해 코드가 간결하고 사용하기 훨씬 편리합니다.

```javascript
// GET 요청
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

// POST 요청
async function postData(userData) {
  const response = await fetch("https://api.example.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
}
```

---

### History API

**브라우저의 주소창 컨트롤러**

#### 개념

브라우저의 세션 히스토리(history)를 제어합니다. `pushState()`, `replaceState()` 메서드로 페이지를 새로고침하지 않고도 URL을 동적으로 변경할 수 있게 해줍니다. SPA(Single Page Application)의 핵심 기술입니다.

#### 활용 예시

React 같은 SPA에서 페이지를 이동할 때, 화면은 바뀌지만 브라우저는 새로고침되지 않습니다. 이 API가 "페이지는 새로고침하지 말고, 주소창의 URL만 바꿔줘. 그리고 뒤로 가기 버튼 누르면 기억해 줘"라고 브라우저에 알려주는 역할을 합니다.

```javascript
// URL 변경 (히스토리 추가)
history.pushState({ page: 1 }, "title 1", "/page1");

// URL 교체 (히스토리 추가 없이)
history.replaceState({ page: 2 }, "title 2", "/page2");

// 뒤로 가기/앞으로 가기 이벤트 감지
window.addEventListener("popstate", (event) => {
  console.log("현재 state:", event.state);
});
```

---

## 5. 장치 & OS 통합 (Device & OS Integration)

웹이 단순한 문서를 넘어 OS 및 하드웨어와 소통하게 합니다.

### MediaDevices API (getUserMedia)

**카메라/마이크 접근 권한 관리**

#### 개념

`navigator.mediaDevices.getUserMedia()`를 통해 사용자에게 권한을 요청하고, 기기의 카메라나 마이크로부터 미디어 스트림(MediaStream)을 실시간으로 받아옵니다.

#### 활용 예시

웹 화상 회의에 들어갈 때 "카메라 사용을 허용하시겠습니까?"라는 팝업을 띄우는 API입니다. 허용을 누르면 웹사이트가 웹캠 영상이나 마이크 음성을 실시간으로 받아올 수 있습니다.

```javascript
async function getMediaStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720 },
      audio: true,
    });

    const videoElement = document.querySelector("video");
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("미디어 접근 실패:", error);
  }
}
```

---

### Geolocation API

**사용자의 현재 위치 추적**

#### 개념

사용자의 동의를 얻어 기기의 지리적 위치(위도, 경도)를 파악합니다. HTTPS 프로토콜에서만 작동합니다.

#### 활용 예시

'내 주변 맛집 찾기'나 '현재 위치 날씨' 기능을 구현할 때 "현재 위치 정보를 사용하시겠습니까?"라고 묻는 API입니다. 지도 앱에서 '내 위치' 버튼을 누르면 이 API가 작동합니다.

```javascript
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`위도: ${latitude}, 경도: ${longitude}`);
    },
    (error) => {
      console.error("위치 정보 가져오기 실패:", error);
    },
    {
      enableHighAccuracy: true, // 고정밀 모드
      timeout: 5000,
      maximumAge: 0,
    }
  );
}
```

---

### Notifications API

**웹사이트가 보내는 데스크톱 알림**

#### 개념

웹 애플리케이션이 시스템 수준의 알림(System Notification)을 사용자에게 표시하도록 허용합니다. 사용자의 명시적인 권한이 필요합니다.

#### 활용 예시

Gmail 웹사이트에서 새 메일이 오면 컴퓨터 바탕화면 오른쪽 아래에 뜨는 작은 팝업입니다. 브라우저가 꺼져있지 않는 한, 다른 작업을 하고 있어도 중요한 소식을 OS 알림으로 보내줍니다.

```javascript
async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    new Notification("새 메시지 도착!", {
      body: "확인하지 않은 메시지가 3개 있습니다.",
      icon: "/icon.png",
      tag: "new-message",
    });
  }
}
```

---

### Fullscreen API

**브라우저의 몰입 모드(전체 화면)**

#### 개념

특정 HTML 요소(주로 `<video>`나 게임 캔버스)를 브라우저 UI(주소창, 탭 등) 없이 화면 전체에 채우도록 요청합니다. `element.requestFullscreen()`로 실행합니다.

#### 활용 예시

YouTube 영상을 볼 때 누르는 '전체 화면' 버튼입니다. 영상이나 게임을 화면에 꽉 채워 사용자가 콘텐츠에만 집중할 수 있도록 몰입감을 높여줍니다.

```javascript
const videoElement = document.querySelector("video");

// 전체 화면 진입
videoElement.requestFullscreen();

// 전체 화면 종료
document.exitFullscreen();

// 전체 화면 상태 변경 감지
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    console.log("전체 화면 모드 진입");
  } else {
    console.log("전체 화면 모드 종료");
  }
});
```

---

## Web API 활용 가이드

### 브라우저 호환성 체크

```javascript
// Service Worker 지원 여부
if ("serviceWorker" in navigator) {
  // Service Worker 사용 가능
}

// Intersection Observer 지원 여부
if ("IntersectionObserver" in window) {
  // Intersection Observer 사용 가능
}

// Geolocation 지원 여부
if ("geolocation" in navigator) {
  // Geolocation 사용 가능
}
```

### 권한 관리 베스트 프랙티스

```javascript
// Notification 권한 상태 확인
console.log(Notification.permission); // 'default', 'granted', 'denied'

// 권한 요청은 사용자 액션(클릭 등) 후에
button.addEventListener("click", async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    // 알림 표시
  }
});
```

---

## 마치며

현대 웹 개발은 단순한 문서 표시를 넘어 네이티브 앱에 근접한 경험을 제공할 수 있게 발전했습니다. 이 가이드에서 소개한 Web API들은:

- **오프라인 기능**: Service Workers, IndexedDB로 네트워크 없이도 작동하는 앱
- **성능 최적화**: Intersection Observer, requestAnimationFrame으로 부드러운 UX
- **하드웨어 통합**: MediaDevices, Geolocation으로 기기 기능 활용
- **사용자 경험 향상**: Notifications, Fullscreen으로 몰입감 있는 인터페이스

각 API를 적재적소에 활용하여 사용자 경험을 한 단계 높여보시기 바랍니다. 단, 모든 API는 사용자의 권한과 프라이버시를 최우선으로 고려해야 하며, 브라우저 호환성을 반드시 확인해야 합니다.

### 추천 학습 자료

- [MDN Web Docs](https://developer.mozilla.org) - 모든 Web API의 상세한 문서
- [Can I Use](https://caniuse.com) - 브라우저 호환성 확인
- [Web.dev](https://web.dev) - Google의 웹 개발 가이드
