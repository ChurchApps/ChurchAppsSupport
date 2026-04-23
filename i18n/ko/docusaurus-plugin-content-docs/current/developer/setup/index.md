---
title: "설정"
---

# 설정

<div class="article-intro">

이 섹션은 ChurchApps 프로젝트에 대한 로컬 개발 환경 설정을 안내합니다. 프론트엔드를 공유 스테이징 API를 가리키거나 빠른 개발을 위해 전체 스택을 로컬에서 실행할 수 있습니다.

</div>

## 두 가지 접근 방식

위치에 따라 로컬에서 개발하는 두 가지 방법이 있습니다:

### 1. 스테이징 API 가리키기 (가장 쉬움)

**프론트엔드 프로젝트**(웹 앱, 모바일 앱, 데스크톱 앱)에서 작업 중이면, 로컬 앱을 공유 스테이징 API를 가리키는 것이 가장 빠른 경로입니다. 데이터베이스 또는 백엔드 설정이 필요하지 않습니다.

스테이징 API 기본 URL:

```
https://api.staging.churchapps.org
```

각 API 모듈은 이 기반 아래 경로에서 사용 가능합니다, 예:

```
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/giving
```

:::tip
이 접근 방식을 통해 몇 분 안에 프론트엔드 변경을 시작할 수 있습니다. 대부분의 기여자에게 권장되는 경로입니다.
:::

### 2. 모든 것을 로컬에서 실행

API 코드를 수정해야 하거나 오프라인으로 작업해야 하는 경우, 전체 스택을 로컬에서 실행할 수 있습니다. 이는 MySQL 8.0+과 추가 구성이 필요합니다. 자세한 지침은 [API 로컬 설정](../api/local-setup) 가이드를 참조하세요.

## 시작하기

다음 페이지를 순서대로 따르세요:

1. **[필수 조건](prerequisites)** -- 필수 도구 설치 (Node.js, Git, MySQL 등)
2. **[프로젝트 개요](project-overview)** -- 어떤 프로젝트가 존재하는지 이해
3. **[환경 변수](environment-variables)** -- `.env` 파일을 구성하여 모든 것 연결

:::info
각 ChurchApps 프로젝트는 독립적인 Git 저장소입니다. 작업하려는 특정 프로젝트만 복제하면 됩니다.
:::
