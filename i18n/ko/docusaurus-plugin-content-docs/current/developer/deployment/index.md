---
title: "배포"
---

# 배포

<div class="article-intro">

ChurchApps는 프로젝트 유형에 따라 다양한 배포 전략을 사용합니다. API는 AWS Lambda에 배포되고, 웹 앱은 S3의 정적 사이트로 CloudFront에 배포되며, 모바일 앱은 Expo EAS 및 앱 스토어를 통해 구축 및 배포됩니다.

</div>

## 프로젝트 유형별 배포

| 프로젝트 유형 | 배포 대상 | 도구 |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x runtime) |
| [웹 앱](./web-apps) | S3 + CloudFront | 정적 빌드, S3 동기화, CloudFront 무효화 |
| [모바일 앱](./mobile) | 앱 스토어 | Expo EAS Build + OTA 업데이트 |
| [Caddy 사용자 정의 도메인 프록시](./caddy-proxy) | Windows EC2 (탄력적 IP `3.23.251.61`) | 정적 Caddyfile + WinSW 서비스 + 예약된 맵 동기화 |
| FreeShow | 직접 다운로드 | Electron Builder (크로스 플랫폼 바이너리) |

## 환경

| 환경 | 용도 |
|-------------|---------|
| `dev` | 로컬 개발 |
| `demo` | 공개 데모 인스턴스 |
| `staging` | 사전 프로덕션 테스트 |
| `prod` | 프로덕션 |

:::info
각 환경에는 자신의 API 엔드포인트, 데이터베이스 및 구성 세트가 있습니다. 환경별 설정은 로컬에서는 `.env` 파일을 통해, 배포된 환경에서는 AWS SSM 매개변수 저장소를 통해 관리됩니다.
:::
