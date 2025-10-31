---
title: "AWS Lightsail + Nginx + SSL로 Node.js 앱 배포하기"
date: "2024-08-03"
modified: "2024-08-03"
category: "기술"
tags: ["AWS", "Lightsail", "Nginx", "SSL", "Let's Encrypt", "DevOps", "배포"]
excerpt: "AWS Lightsail에서 도메인 연결, Nginx 포트포워딩, SSL 인증서 설정까지 Node.js 애플리케이션 배포 과정을 단계별로 알아봅니다."
thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=640&h=425&fit=crop"
---

AWS Lightsail에서 Node.js 애플리케이션을 배포하면서 도메인 연결, Nginx 설정, SSL 인증서 적용까지 완료한 과정을 공유합니다. 처음 배포하시는 분들께 도움이 되길 바랍니다.

## 📋 목차

1. 도메인 & DNS 설정
2. Nginx 설정
3. SSL 인증서 적용

## 1. 도메인 & DNS 설정

### 🔧 초기 설정

먼저 AWS Lightsail에서 고정 IP를 받고, 도메인을 연결해야 합니다.

```
AWS 인스턴스 고정 IP: 13.125.54.11
```

**설정 단계:**

1. **Lightsail 콘솔** 접속
2. **도메인 및 DNS** → 도메인 등록 (Route53에 등록)
3. **인스턴스** → 도메인 → 도메인 지정 등록

### ⚠️ 첫 번째 문제: 도메인 접속 불가

Route53에 도메인을 등록한 후 `example.com`으로 접속하면 연결이 안 됩니다.

**원인:**

- 도메인이 HTTP 프로토콜(`http://example.com`)로 접속
- 기본 HTTP 포트인 **80번**으로 접속 시도
- Lightsail 네트워크 설정에서 80번 포트가 막혀있음

**해결:**

- Lightsail 네트워킹 탭에서 **80번 포트 허용**

### ⚠️ 두 번째 문제: 80번 포트 허용 후에도 접속 불가

80번 포트를 열어도 여전히 접속이 안 됩니다.

**원인:**

- Node.js 앱이 **3000번 포트**에서 실행 중
- 80번 포트로 들어온 요청을 3000번으로 전달해주는 **포트포워딩** 필요

**해결 방법 비교:**

| 방법           | 장점              | 단점                    |
| -------------- | ----------------- | ----------------------- |
| **로드밸런싱** | AWS 관리형 서비스 | 비용 높음 (월 약 3만원) |
| **Nginx** ✅   | 무료, 가볍고 빠름 | 직접 설정 필요          |

→ **Nginx를 선택**하여 포트포워딩 구현

## 2. Nginx 설정

### 📦 Nginx 설치

SSH로 서버에 접속하여 Nginx를 설치합니다.

```bash
sudo apt install nginx
```

### ⚙️ Nginx 설정 파일 수정

설정 파일을 열어 수정합니다.

```bash
sudo nano /etc/nginx/sites-available/default
```

**주요 설정 사항:**

1. `server_name`: 도메인 설정
2. `root`: 프로젝트 소스 경로 설정

```nginx
server {
    server_name meal.acg-playground.com;
    root /home/ubuntu/acg-extension/public;

    # 모든 요청 경로에 대한 처리 규칙
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 정적 파일 처리 (디자인 소스)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|mp4|json|svg)$ {
        root /home/ubuntu/acg-extension/public/;
        expires max;
        log_not_found off;
    }
}
```

### 📝 Proxy 설정 상세 설명

각 설정의 역할:

- `proxy_pass http://localhost:3000;`: 모든 요청을 3000번 포트로 전달
- `proxy_http_version 1.1;`: HTTP 1.1 프로토콜 사용
- `proxy_set_header Upgrade $http_upgrade;`: WebSocket 연결 지원
- `proxy_set_header Connection 'upgrade';`: WebSocket 추가 설정
- `proxy_set_header Host $host;`: 원래 요청의 Host 헤더 유지
- `proxy_cache_bypass $http_upgrade;`: 특정 조건에서 캐시 우회

### ✅ 설정 검증 및 적용

문법 오류 체크:

```bash
sudo nginx -t
```

Nginx 재시작:

```bash
sudo systemctl restart nginx
```

## 3. SSL 인증서 적용 (Let's Encrypt)

이제 HTTP에서 HTTPS로 업그레이드하여 보안을 강화합니다.

### 🔐 Certbot 설치

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 📜 SSL 인증서 발급

```bash
sudo certbot --nginx
```

### 🔄 HTTP → HTTPS 리다이렉트 설정

인증서 발급 과정에서 다음 선택지가 나타납니다:

```
Please choose whether or not to redirect HTTP traffic to HTTPS
-------------------------------------------------------------------------------
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access.
-------------------------------------------------------------------------------
Select the appropriate number [1-2] then [enter] (press 'c' to cancel):
```

**추천: 2번 선택** → HTTP 요청을 자동으로 HTTPS로 리다이렉트

### 📄 자동 추가된 Nginx 설정

SSL 설정 후 Nginx 파일에 자동으로 추가되는 내용:

```nginx
server {
    server_name meal.acg-playground.com;
    root /home/ubuntu/acg-extension/public;

    location / {
        # ... 기존 설정
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|mp4|json|svg)$ {
        # ... 기존 설정
    }

    # Certbot이 자동으로 추가한 SSL 설정
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/meal.acg-playground.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/meal.acg-playground.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```

## 🔄 SSL 인증서 갱신 자동화

Let's Encrypt 인증서는 **90일마다 갱신**이 필요합니다. 자동 갱신 설정으로 편리하게 관리할 수 있습니다.

### 자동화 타이머 확인

```bash
sudo systemctl list-timers snap.certbot.renew.service
```

### 갱신 설정 파일 수정

```bash
sudo nano /etc/letsencrypt/renewal/meal.acg-playground.com.conf
```

**추가할 설정:**

```conf
# 만료 30일 전에 갱신하기
renew_before_expiry = 30 days

# 갱신 시 자동으로 Nginx 재시동
renew_hook = systemctl reload nginx
```

## 🎯 마무리

이제 다음과 같은 완벽한 배포 환경이 구축되었습니다:

- ✅ 도메인으로 접속 가능 (`https://meal.acg-playground.com`)
- ✅ Nginx를 통한 포트포워딩 (80 → 3000)
- ✅ SSL 인증서로 HTTPS 보안 통신
- ✅ 자동 인증서 갱신 설정

### 💡 핵심 포인트

1. **포트포워딩**: Nginx로 80번 포트를 앱의 3000번 포트로 연결
2. **SSL 인증**: Let's Encrypt로 무료 SSL 인증서 발급
3. **자동화**: 인증서 자동 갱신으로 관리 부담 감소

### 🔗 참고 자료

- [Nginx 공식 문서](https://nginx.org/en/docs/)
- [Let's Encrypt 가이드](https://letsencrypt.org/getting-started/)
- [AWS Lightsail 문서](https://lightsail.aws.amazon.com/ls/docs)

처음 배포를 진행하시는 분들께 도움이 되었기를 바랍니다! 궁금한 점은 댓글로 남겨주세요. 🚀
