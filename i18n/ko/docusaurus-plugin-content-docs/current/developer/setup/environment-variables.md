---
title: "환경 변수"
---

# 환경 변수

<div class="article-intro">

모든 ChurchApps 프로젝트는 로컬 구성에 `.env` 파일을 사용합니다. 각 프로젝트에는 복사하여 수정할 샘플 파일이 포함되어 있습니다. 이 페이지에서는 API, 웹 앱, 모바일 앱의 환경 변수와 데모 API 및 로컬 API 대상 중 선택하는 방법을 다룹니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 프로젝트에 필요한 [사전 요구 사항](./prerequisites)을 설치하십시오
- 작업하려는 프로젝트 저장소를 클론하십시오
- [프로젝트 개요](./project-overview)를 검토하여 프로젝트에 필요한 API 모듈을 확인하십시오

</div>

## 일반 패턴

1. 프로젝트 루트에서 `dotenv.sample.txt` 또는 `.env.sample`을 찾으십시오.
2. `.env`로 복사하십시오.
3. 필요에 따라 값을 수정하십시오.

```bash
# Example for a project with .env.sample
cp .env.sample .env

# Example for a project with dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**`.env` 파일을 버전 관리에 커밋하지 마십시오.** 데이터베이스 자격 증명, API 키, JWT 시크릿 같은 비밀 정보가 들어 있습니다. 모든 ChurchApps 프로젝트는 `.gitignore`에 `.env`를 포함하고 있지만, 커밋하기 전에 항상 다시 확인하십시오.
:::

## API 대상 선택하기

가장 중요한 결정은 프론트엔드가 API 호출을 어디로 보낼지 정하는 것입니다. 두 가지 옵션이 있습니다:

### 옵션 1: 데모 API (프론트엔드 개발에 권장)

공유 데모 환경을 사용하십시오. 로컬 API나 데이터베이스 설정이 필요하지 않습니다. `main`의 최신 코드를 실행하며, 샘플 데이터는 매일 밤 다시 채워집니다.

```bash
# Base URL pattern
https://api.demo.churchapps.org/{module}

# Example module URLs
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
스테이징 환경(`api.staging.churchapps.org`, `api.staging.lessons.church` 및 관련 호스트)은 폐지되었습니다. 일부 샘플 `.env` 파일에는 여전히 스테이징 URL이 있을 수 있습니다. 이 페이지에 나온 데모 또는 로컬 값으로 교체하십시오. 공유 비프로덕션 Lessons API는 없습니다. 필요한 경우 [LessonsApi](https://github.com/ChurchApps/LessonsApi)를 로컬에서 실행하십시오(포트 `8090`에서 수신).
:::

### 옵션 2: 로컬 API

자신의 컴퓨터에서 Api 프로젝트를 실행하십시오. 각 모듈용 데이터베이스가 생성된 MySQL 8.0 이상이 필요합니다. [API 로컬 설정](../api/local-setup) 가이드를 참조하십시오.

```bash
# Base URL pattern
http://localhost:8084/{module}

# Example module URLs
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API 환경 변수

핵심 **Api** 프로젝트(`.env.sample`)에는 가장 많은 구성이 있습니다. 주요 변수는 다음과 같습니다:

### 공유 설정

| 변수 | 설명 | 예시 |
|----------|-------------|---------|
| `ENVIRONMENT` | 런타임 환경 | `dev` |
| `SERVER_PORT` | 로컬 개발 서버의 HTTP 포트 | `8084` |
| `ENCRYPTION_KEY` | 민감한 데이터용 192비트 암호화 키 | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | JSON Web Token 서명용 시크릿 | `jwt-secret-dev` |
| `FILE_STORE` | 업로드된 파일을 저장할 위치(`disk` 또는 `s3`) | `disk` |
| `CORS_ORIGIN` | 허용되는 CORS 출처(로컬 개발에는 `*`) | `*` |

### 데이터베이스 연결

단일 기본 URL이 API를 MySQL에 연결합니다. API는 이 기본 URL에서 모듈별 데이터베이스(`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`)를 자동으로 결정합니다.

| 변수 | 예시 |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
`root:password`를 실제 MySQL 자격 증명으로 바꾸십시오. API를 실행하기 전에 모듈별 데이터베이스가 모두 있어야 합니다. 모든 모듈의 스키마를 만들려면 `npm run initdb`를, 단일 모듈만 만들려면 `npm run initdb:membership`을 사용하십시오.
:::

### WebSocket 설정

| 변수 | 설명 | 예시 |
|----------|-------------|---------|
| `SOCKET_PORT` | WebSocket 서버 포트 | `8087` |
| `SOCKET_URL` | 클라이언트가 연결할 WebSocket URL | `ws://localhost:8087` |

---

## 웹 앱 환경 변수

### B1Admin (React + Vite)

샘플 파일: `.env.sample`

| 변수 | 설명 | 예시 (데모) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | 환경 이름 | `demo` |
| `PORT` | 개발 서버 포트 | `3101` |
| `REACT_APP_API_BASE` | 모든 ChurchApps API의 단일 기본 URL(`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`은 자동으로 추가됨) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | 콘텐츠 전송 URL | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID(선택 사항) | `UA-123456789-1` |

로컬 API 개발의 경우 기본 URL을 로컬 스택으로 지정하십시오:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

샘플 파일: `.env.sample`

| 변수 | 설명 | 예시 (데모) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | 모든 ChurchApps API의 단일 기본 URL(`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`은 자동으로 추가됨) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | 콘텐츠 전송 URL | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID(선택 사항) | `UA-123456789-1` |

:::info
Next.js에서는 브라우저에서 사용해야 하는 환경 변수에 `NEXT_PUBLIC_` 접두사가 필요합니다. 서버 전용 변수에는 이 접두사가 필요하지 않습니다.
:::

### LessonsApp (Next.js)

샘플 파일: `dotenv.sample.txt`

| 변수 | 설명 | 예시 (로컬 LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | 환경 단계(로컬 개발에서는 설정하지 않거나 `dev`로 둠) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API URL | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | 콘텐츠 전송 URL | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | 로그인에 사용되는 ChurchApps API 기본 URL(`STAGE`가 설정되지 않았거나 `dev`인 경우에만 적용됨) | `https://api.demo.churchapps.org` |

---

## 모바일 앱 환경 변수

### B1Mobile (React Native / Expo)

샘플 파일: `dotenv.sample.txt`

| 변수 | 설명 | 예시 (데모) |
|----------|-------------|----------------|
| `STAGE` | 환경 이름 | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | ChurchApps API 모듈마다 하나의 URL(설정하지 않으면 각각 프로덕션이 기본값) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons API(별도 호스트; 공유 비프로덕션 환경은 없음) | `https://api.lessons.church` |
| `CONTENT_ROOT` | 콘텐츠 전송 URL | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | Lessons 사이트 URL | `https://lessons.church` |

:::info
모바일 앱은 `REACT_APP_` 또는 `NEXT_PUBLIC_` 접두사를 사용하지 않습니다. 환경 변수 접근은 Expo 구성에서 처리됩니다.
:::

---

## 빠른 참조: 샘플 파일 위치

| 프로젝트 | 샘플 파일 |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
