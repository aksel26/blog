---
title: "파일 I/O: Buffer, Blob, API Routes를 통한 바이너리 데이터 스트리밍"
date: "2025-11-04"
modified: "2025-11-04"
category: "기술"
tags: ["console.log", "웹 성능 최적화", "프론트엔드", "웹 보안", "디버깅"]
excerpt: "Buffer, Blob, API Routes를 통한 바이너리 데이터 스트리밍 데이터 교환 원리를 공유합니다."
---

웹 애플리케이션에서 파일 입출력을 다루는 것은 텍스트 기반의 JSON 데이터 처리와는 근본적으로 다릅니다. 이 과정은 __이진 데이터(binary data)__ 를 클라이언트와 서버 간에 손실 없이 전송하고, 각 환경에 맞는 데이터 형식으로 변환하는 작업을 포함합니다.

이 글에서는 Next.js 환경을 기준으로, 파일 업로드 시 __`File`__ 객체를 __`Buffer`__ 로 변환하는 과정부터, API Route를 통해 파일을 클라이언트로 전송하고 __`Blob`__ 으로 받아 다운로드하는 전 과정을 기술적으로 상세히 분석합니다.

---

### 1\. 클라이언트 ➔ 서버: 파일 업로드와 `Buffer` 변환

사용자가 파일을 업로드하면, 브라우저는 이를 `File` 객체로 관리합니다. 이 `File` 객체를 HTTP를 통해 Node.js 서버(Next.js API Route)로 전송하기 위해서는 서버가 이해할 수 있는 이진 데이터 형식, 즉 `Buffer`로 변환하는 과정이 필요할 수 있습니다. (예: `multipart/form-data`가 아닌 API 요청으로 직접 전송 시)

```javascript
// 'file'은 <input type="file">에서 얻은 File 객체
const arrayBuffer = await file.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);
```

#### `file.arrayBuffer()`

- `File` 객체는 `Blob`의 확장된 형태로, 파일 메타데이터(이름, 타입 등)를 포함합니다.
- `file.arrayBuffer()` 메서드는 `File` 객체의 원시 이진 데이터를 비동기적으로 읽어 __`ArrayBuffer`__ 객체로 반환합니다.
- __`ArrayBuffer`__ 는 브라우저와 JavaScript 엔진에서 사용되는 __범용 고정 길이 원시 이진 데이터 버퍼__ 입니다. 이는 데이터 그 자체의 "저장소"일 뿐, 직접 내용을 조작할 수는 없습니다. (내용을 읽으려면 `TypedArray`나 `DataView`가 필요합니다.)

#### `Buffer.from(arrayBuffer)`

- __`Buffer`__ 는 __Node.js 환경__ 에서 바이너리 데이터를 다루기 위해 특별히 설계된 클래스입니다.
- `Buffer`는 `Uint8Array`를 상속받아 구현되었으며, Node.js의 파일 시스템(fs), 네트워크(net) 등 저수준 I/O 작업에 최적화되어 있습니다.
- `Buffer.from(arrayBuffer)`는 브라우저에서 생성된 범용 `ArrayBuffer`를 Node.js 환경에서 효율적으로 처리할 수 있는 `Buffer` 인스턴스로 변환합니다. 이 `buffer`는 이제 Node.js 서버에서 파일로 저장되거나 다른 처리를 하기에 적합한 상태가 됩니다.

---

### 2\. 서버 ➔ 클라이언트: API Route를 이용한 파일 응답

클라이언트가 특정 파일의 다운로드를 요청할 때, Next.js API Route는 서버의 파일 시스템에서 파일을 읽어 HTTP 응답으로 전송해야 합니다.

```javascript
// app/api/download/[filename]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  const { filename } = params;
  const filePath = join(process.cwd(), "public", "reports", filename);

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // 1. Node.js 'Buffer'로 파일 읽기
  const fileBuffer = readFileSync(filePath);

  // 2. HTTP 응답 헤더 설정
  const headers = new Headers();
  headers.set("Content-Type", "application/octet-stream");
  headers.set("Content-Disposition", `attachment; filename="${encodeURIComponent(filename)}"`);

  // 3. Buffer를 NextResponse 본문으로 전송
  return new NextResponse(fileBuffer, {
    status: 200,
    headers: headers,
  });
}
```

#### `readFileSync(filePath)`

- Node.js의 `fs.readFileSync`는 지정된 경로의 파일을 동기적으로 읽어 그 내용을 __`Buffer`__ 객체로 반환합니다. 이 `fileBuffer`는 파일의 모든 이진 데이터를 메모리에 보유합니다.

#### HTTP 응답 헤더 분석

파일 다운로드 응답에서 헤더는 브라우저의 동작을 결정하는 핵심 요소입니다.

1.  __`Content-Type: "application/octet-stream"`__

    - 이는 표준 MIME 타입으로, "8비트(octet) 바이트의 스트림"을 의미합니다.
    - 브라우저에게 이 응답 본문이 텍스트, HTML, 이미지 등 특정 형식이 아닌 __임의의 이진 데이터__ 임을 알립니다. 브라우저는 이 MIME 타입을 보면 렌더링을 시도하지 않고 다운로드로 처리하려는 경향이 있습니다.

2.  __`Content-Disposition: "attachment; filename=..."`__

    - 이것이 __가장 결정적인 HTTP 헤더__ 입니다.
    - `Content-Disposition`은 응답 본문이 어떻게 처리되어야 하는지를 제어합니다.
    - `attachment`: 브라우저에게 이 콘텐츠를 인라인(inline, 화면에 표시)으로 처리하지 말고, __첨부 파일__ 로 취급하여 __"다른 이름으로 저장" 대화상자__ 를 표시하도록 명시적으로 지시합니다.
    - `filename="..."`: 다운로드 시 기본 파일 이름을 지정합니다. 파일 이름에 공백이나 특수 문자가 포함될 수 있으므로 `encodeURIComponent`를 사용해 안전하게 인코딩하는 것이 좋습니다.

#### `new NextResponse(fileBuffer, ...)`

- Next.js 13+의 `NextResponse`는 `Buffer`를 응답 본문으로 직접 지원합니다. Next.js는 이 `Buffer`를 클라이언트로 효율적으로 스트리밍합니다.

---

### 3\. 클라이언트: `Blob`을 이용한 파일 수신 및 다운로드

서버가 전송한 이진 데이터를 클라이언트(브라우저)에서 받아 처리하는 과정입니다.

```javascript
// 클라이언트 측 Axios 요청
async function downloadFile(report) {
  const response = await axios.get(`/api/download/${report.filename}`, {
    responseType: "blob", // ★★★ 핵심: 응답 타입을 'blob'으로 지정
  });

  // response.data는 서버가 보낸 파일 데이터가 담긴 'Blob' 객체
  const blob = response.data;

  // 1. Blob 데이터를 가리키는 임시 URL 생성
  const url = window.URL.createObjectURL(blob);

  // 2. 동적 <a> 태그를 사용한 다운로드 트리거
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", report.filename); // 'download' 속성 지정
  document.body.appendChild(link);
  link.click();

  // 3. 메모리 해제
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
```

#### `responseType: "blob"`

- `axios` 요청 시 이 설정이 가장 중요합니다. 기본적으로 `axios`는 응답을 JSON (또는 텍스트)으로 파싱하려고 시도합니다.
- `responseType: "blob"`으로 설정하면, `axios`는 서버로부터 받은 이진 스트림을 파싱하지 않고, 브라우저의 __`Blob` (Binary Large Object)__ 객체로 래핑하여 `response.data`에 할당합니다.
- __`Blob`__ 은 브라우저 환경에서 파일과 같은 불변의 원시 이진 데이터를 다루는 표준 객체입니다.

#### `window.URL.createObjectURL(blob)`

- 이 메서드는 브라우저의 메모리에 존재하는 `Blob` 객체를 가리키는 고유한 __임시 URL__ 을 생성합니다. (예: `blob:http://localhost:3000/1234abcd-....`)
- 이 URL은 데이터를 복사하는 것이 아니라, 메모리상의 데이터에 대한 __참조(포인터)__ 를 생성합니다. 이는 대용량 파일을 효율적으로 처리하게 해줍니다.

#### `<a>` 태그와 `download` 속성

- `link.href = url`: 생성된 `blob:` URL을 `<a>` 태그의 `href` 속성에 연결합니다.
- `link.setAttribute("download", report.filename)`: `<a>` 태그의 `download` 속성은 HTML5의 표준 기능입니다. 이 속성이 존재하면, 브라우저는 `href`의 리소스로 이동하는 대신, 해당 리소스를 `download` 속성에 지정된 파일 이름으로 다운로드합니다.

#### `window.URL.revokeObjectURL(url)`

- `createObjectURL`로 생성된 URL은 해당 문서를 닫을 때까지 메모리 참조를 유지합니다.
- 다운로드가 완료된 후 `revokeObjectURL`을 호출하여 이 참조를 명시적으로 해제해야 합니다. 이는 __메모리 누수(Memory Leak)를 방지__ 하는 필수적인 과정입니다.

---

### 요약

파일 I/O의 전 과정은 각 환경에 최적화된 바이너리 데이터 객체를 중심으로 이루어집니다.

1.  __클라이언트 (업로드)__: `File` 객체 ➔ `ArrayBuffer` (범용 데이터) ➔ `Buffer` (Node.js용)
2.  __서버 (응답)__: `fs.readFileSync()` ➔ `Buffer` (Node.js 데이터) ➔ `NextResponse` (HTTP 스트림)
3.  __클라이언트 (다운로드)__: `axios({ responseType: "blob" })` ➔ `Blob` (브라우저용 데이터) ➔ `URL.createObjectURL` (메모리 참조 URL) ➔ `<a>.click()` (다운로드 실행)
