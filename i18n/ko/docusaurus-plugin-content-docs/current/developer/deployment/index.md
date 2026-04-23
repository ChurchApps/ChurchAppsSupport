---
title: "배포"
---

# 배포

<div class="article-intro">

ChurchApps는 프로젝트 유형에 따라 다른 배포 전략을 사용합니다. API는 AWS Lambda에 배포되고, 웹 앱은 S3과 CloudFront로 static 사이트로 배포되며, 모바일 앱은 Expo EAS 및 앱 스토어를 통해 빌드되고 배포됩니다.

</div>

## 프로젝트 유형별 배포

| 프로젝트 유형 | 배포 대상 | 도구 |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x runtime) |
| [웹 앱](./web-apps) | S3 + CloudFront | Static 빌드, S3 sync, CloudFront 무효화 |
| [모바일 앱](./mobile) | 앱 스토어 | Expo EAS 빌드 + OTA 업데이트 |
| FreeShow | 직접 다운로드 | Electron Builder (크로스플랫폼 바이너리) |

## 환경

| 환경 | 목적 |
|-------------|---------|
| `dev` | 로컬 개발 |
| `demo` | Public 데모 인스턴스 |
| `staging` | 사전 프로덕션 테스트 |
| `prod` | 프로덕션 |

:::info
각 환경은 자신의 API 엔드포인트, 데이터베이스, 구성을 가집니다. 환경별 설정은 로컬의 `.env` 파일 및 배포된 환경의 AWS SSM 매개변수 저장소를 통해 관리됩니다.
:::
