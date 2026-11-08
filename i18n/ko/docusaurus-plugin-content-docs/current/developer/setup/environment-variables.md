---
title: "환경 변수"
description: "ChurchApps 프로젝트의 .env 파일을 설정하고, 공유 데모 API 또는 로컬 API 중 하나를 고르고, B1 Admin, B1.church, B1 Checkin 등의 변수를 입력하는 방법을 알아봅니다."
---

# 환경 변수

<div class="article-intro">

모든 ChurchApps 프로젝트는 로컬 설정에 `.env` 파일을 사용합니다. 각 프로젝트에는 복사한 뒤 원하는 값으로 수정할 수 있는 샘플 파일이 포함되어 있습니다. 이 페이지에서는 API, 웹 앱, 모바일 앱의 환경 변수를 다루며, 데모 API와 로컬 API 중 어느 쪽을 사용할지 선택하는 방법도 설명합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 작업할 프로젝트의 [사전 요구 사항](./prerequisites.md)을 설치합니다
- 작업할 프로젝트 저장소를 클론합니다
- [프로젝트 개요](./project-overview.md)를 읽고 프로젝트에 필요한 API 모듈을 확인합니다

</div>

## 일반적인 방법

1. 프로젝트 루트에서 `dotenv.sample.txt` 또는 `.env.sample` 파일을 찾습니다.
2. 이 파일을 `.env`로 복사합니다.
3. 필요에 따라 값을 수정합니다.

```bash
# .env.sample 파일이 있는 프로젝트의 예
cp .env.sample .env

# dotenv.sample.txt 파일이 있는 프로젝트의 예
cp dotenv.sample.txt .env
```

:::warning
**`.env` 파일을 버전 관리 시스템에 커밋하지 마세요.** 이 파일에는 데이터베이스 자격 증명, API 키, JWT 시크릿 같은 비밀 정보가 들어 있습니다. 모든 ChurchApps 프로젝트는 `.gitignore`에 `.env`를 포함하고 있지만, 커밋하기 전에 항상 한 번 더 확인하세요.
:::

## API 대상 선택하기

가장 중요한 결정은 프론트엔드가 API 호출을 어디로 보낼지 정하는 것입니다. 선택지는 두 가지입니다.

### 옵션 1: 데모 API (프론트엔드 개발에 권장)

공유 데모 환경을 사용합니다. 로컬 API나 데이터베이스를 따로 설정할 필요가 없습니다. 이 환경은 `main` 브랜치의 최신 코드를 실행하며, 샘플 데이터는 매일 밤 다시 채워집니다.

```bash
# 기본 URL 형식
https://api.demo.churchapps.org/{module}

# 모듈 URL 예시
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
스테이징 환경(`api.staging.churchapps.org`, `api.staging.lessons.church` 및 관련 호스트)은 더 이상 운영되지 않습니다. 일부 샘플 `.env` 파일에는 아직 스테이징 URL이 남아 있을 수 있으므로, 이 페이지에 나온 데모 또는 로컬 값으로 바꿔 주세요. 공유 비운영 Lessons API는 없습니다. 필요하다면 [LessonsApi](https://github.com/ChurchApps/LessonsApi)를 로컬에서 실행하세요(포트 `8090`에서 동작합니다).
:::

### 옵션 2: 로컬 API

자신의 컴퓨터에서 Api 프로젝트를 실행합니다. MySQL 8.0 이상이 필요하며, 모듈별 데이터베이스를 미리 만들어 두어야 합니다. 자세한 내용은 [API 로컬 설정](../api/local-setup.md) 가이드를 참고하세요.

```bash
# 기본 URL 형식
http://localhost:8084/{module}

# 모듈 URL 예시
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API 환경 변수

핵심 **Api** 프로젝트(`.env.sample`)에 가장 많은 설정이 있습니다. 주요 변수는 다음과 같습니다.

### 공통 설정

| 변수 | 설명 | 예시 |
|----------|-------------|---------|
| `ENVIRONMENT` | 실행 환경 | `dev` |
| `SERVER_PORT` | 로컬 개발 서버의 HTTP 포트 | `8084` |
| `ENCRYPTION_KEY` | 민감한 데이터를 위한 192비트 암호화 키 | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | JSON Web Token 서명에 사용하는 시크릿 | `jwt-secret-dev` |
| `FILE_STORE` | 업로드된 파일을 저장할 위치 (`disk` 또는 `s3`) | `disk` |
| `CORS_ORIGIN` | 허용할 CORS 출처 (로컬 개발에서는 `*`) | `*` |

### 데이터베이스 연결

하나의 기본 URL로 API가 MySQL에 연결됩니다. API는 이 기본 URL을 바탕으로 모듈마다 데이터베이스 하나(`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`)를 자동으로 결정합니다.

| 변수 | 예시 |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
`root:password` 부분을 실제 MySQL 자격 증명으로 바꾸세요. API를 실행하기 전에 모듈별 데이터베이스가 모두 있어야 합니다. 모든 모듈의 스키마를 만들려면 `npm run initdb`를, 모듈 하나만 만들려면 `npm run initdb:membership`을 사용하세요.
:::

### WebSocket 설정

| 변수 | 설명 | 예시 |
|----------|-------------|---------|
| `SOCKET_PORT` | WebSocket 서버의 포트 | `8087` |
| `SOCKET_URL` | 클라이언트가 연결할 WebSocket URL | `ws://localhost:8087` |

---

## 웹 앱 환경 변수

### B1Admin (React + Vite)

샘플 파일: `.env.sample`

| 변수 | 설명 | 예시 (데모) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | 환경 이름 | `demo` |
| `PORT` | 개발 서버 포트 | `3101` |
| `REACT_APP_API_BASE` | 모든 ChurchApps API의 단일 기본 URL (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`은 자동으로 붙습니다) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | 콘텐츠 전송 URL | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (선택 사항) | `UA-123456789-1` |

로컬 API로 개발하려면 기본 URL을 로컬 스택으로 지정하세요.

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

샘플 파일: `.env.sample`

| 변수 | 설명 | 예시 (데모) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | 모든 ChurchApps API의 단일 기본 URL (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`은 자동으로 붙습니다) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | 콘텐츠 전송 URL | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (선택 사항) | `UA-123456789-1` |

:::info
Next.js에서 브라우저에 노출해야 하는 환경 변수에는 반드시 `NEXT_PUBLIC_` 접두사를 붙여야 합니다. 서버 전용 변수에는 이 접두사가 필요하지 않습니다.
:::

### LessonsApp (Next.js)

샘플 파일: `dotenv.sample.txt`

| 변수 | 설명 | 예시 (로컬 LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | 환경 단계 (로컬 개발에서는 설정하지 않거나 `dev`로 둡니다) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API URL | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | 콘텐츠 전송 URL | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | 로그인에 사용하는 ChurchApps API 기본 URL (`STAGE`가 설정되지 않았거나 `dev`일 때만 적용됨) | `https://api.demo.churchapps.org` |

---

## 모바일 앱 환경 변수

### B1Checkin (React Native / Expo)

샘플 파일: `dotenv.sample.txt`

| 변수 | 설명 | 예시 |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | 앱이 연결할 API 세트를 선택합니다. `dev`(로컬 API `http://127.0.0.1:8084`), `staging`, `prod`(설정하지 않으면 기본값) 중 하나입니다 | `dev` |

B1Checkin은 Membership 및 Attendance API 모듈과 콘텐츠 전송 URL만 사용합니다. 각 단계별 주소는 `src/helpers/EnvironmentHelper.ts`에서 설정합니다.

:::info
Expo는 `EXPO_PUBLIC_` 접두사가 붙은 변수만 앱 번들에 포함합니다. `.env`를 변경한 후에는 `yarn start --reset-cache`로 개발 서버를 다시 시작하세요.
:::

---

## 빠른 참조: 샘플 파일 위치

| 프로젝트 | 샘플 파일 |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
