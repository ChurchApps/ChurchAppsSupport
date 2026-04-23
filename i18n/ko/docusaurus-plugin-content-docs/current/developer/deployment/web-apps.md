---
title: "웹 앱 배포"
---

# 웹 앱 배포

<div class="article-intro">

ChurchApps 웹 애플리케이션은 **Amazon S3**과 CDN인 **CloudFront**로 static 사이트로 배포됩니다. 배포는 GitHub Actions를 통해 자동화되지만 필요할 때 수동으로도 실행할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 웹 앱을 로컬에서 설정하고 빌드 확인 -- [웹 앱](../web-apps/) 참조
- S3 및 CloudFront 액세스로 AWS 자격증명 구성
- 대상 S3 버킷 이름 및 CloudFront 배포 ID 알기

</div>

## 배포 단계

1. **앱 빌드** -- static 출력 생성:

   ```bash
   npm run build
   ```

2. **S3에 동기화** -- 빌드 출력을 S3 버킷에 업로드:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **CloudFront 무효화** -- CDN 캐시 지우기: 사용자가 최신 버전을 받도록:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## 자동 배포

GitHub Actions 워크플로우는 `main` 브랜치에 푸시할 때 자동으로 배포를 처리합니다. 워크플로우는 위의 3단계를 모두 수행합니다 -- 빌드, S3 동기화, CloudFront 무효화 -- 수동 개입 없이.

:::info
일반적으로 이 명령을 수동으로 실행할 필요가 없습니다. `main`에 풀 요청을 병합하면 자동 배포 파이프라인이 트리거됩니다.
:::

:::tip
배포하기 전에 로컬에서 빌드를 확인하려면 `npm run build`를 실행하고 `build/` 디렉토리의 출력을 검사하세요. static 파일 서버로 로컬에서 제공하여 모든 것이 작동하는지 확인할 수 있습니다.
:::

## 관련 문서

- **[웹 앱](../web-apps/)** -- B1Admin, B1App, LessonsApp 설정 가이드
- **[API 배포](./apis)** -- 백엔드 API 배포
- **[모바일 배포](./mobile)** -- 모바일 앱을 앱 스토어에 배포
