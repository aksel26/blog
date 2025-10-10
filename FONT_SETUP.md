# 폰트 설정 가이드

## FreesentationVF.ttf 설치

블로그에 **Freesentation** 폰트를 적용하려면 다음 단계를 따라주세요:

### 1. 폰트 파일 다운로드
- [Freesentation 폰트 다운로드](https://fonts.google.com/specimen/Freesentation) 또는 다른 소스에서 `FreesentationVF.ttf` 파일을 다운로드하세요.

### 2. 폰트 파일 배치
다운로드한 `FreesentationVF.ttf` 파일을 다음 경로에 배치하세요:
```
src/fonts/FreesentationVF.ttf
```

### 3. 적용 완료
폰트 파일이 올바른 위치에 배치되면 자동으로 적용됩니다. 개발 서버를 재시작할 필요는 없습니다.

## 폰트 스택
현재 설정된 폰트 스택:
```css
font-family: "Freesentation", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

## 대체 방법
만약 Freesentation 폰트를 사용하지 않으려면, `src/styles/global.css`에서 `@font-face` 선언을 제거하고 `body`의 `font-family`를 수정하면 됩니다.

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  /* 나머지 스타일 */
}
```