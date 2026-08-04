---
title: "배포"
---

# 배포

<div class="article-intro">

ChurchApps는 프로젝트 유형에 따라 서로 다른 배포 전략을 사용합니다. API는 AWS Lambda에 배포되고, 웹 앱은 정적 사이트로 S3와 CloudFront에 배포되며, 모바일 앱은 Expo EAS와 앱 스토어를 통해 빌드 및 배포됩니다.

</div>

## 프로젝트 유형별 배포

| 프로젝트 유형 | 배포 대상 | 도구 |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3(Node.js 22.x 런타임) |
| [웹 앱](./web-apps) | S3 + CloudFront | 정적 빌드, S3 동기화, CloudFront 무효화 |
| [모바일 앱](./mobile) | 앱 스토어 | Expo EAS Build + OTA 업데이트 |
| [자체 호스팅(Railway)](./railway-template) | Railway | 원클릭 템플릿: MySQL + Api + B1Admin + B1App |
| [자체 호스팅(Docker)](./docker) | 모든 Docker 호스트 | B1Admin 저장소에서 `docker compose up` |
| [Caddy 사용자 지정 도메인 프록시](./caddy-proxy) | Windows EC2(탄력적 IP `3.23.251.61`) | 정적 Caddyfile + WinSW 서비스 + 예약된 맵 동기화 |
| FreeShow | 직접 다운로드 | Electron Builder(크로스 플랫폼 바이너리) |

## 환경

| 환경 | 목적 |
|-------------|---------|
| `dev` | 로컬 개발 |
| `demo` | 공개 데모 인스턴스 |
| `staging` | 프로덕션 전 테스트 |
| `prod` | 프로덕션 |

:::info
각 환경은 자체 API 엔드포인트, 데이터베이스, 구성 세트를 가지고 있습니다. 환경별 설정은 로컬에서는 `.env` 파일로, 배포된 환경에서는 AWS SSM Parameter Store로 관리됩니다.
:::
