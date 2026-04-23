---
title: "환경 변수"
---

# 환경 변수

<div class="article-intro">

모든 ChurchApps 프로젝트는 로컬 구성을 위해 `.env` 파일을 사용합니다. 각 프로젝트는 복사하고 사용자 정의할 샘플 파일을 포함합니다. 이 페이지는 스테이징과 로컬 API 대상 선택 방법을 포함하여 API, 웹 앱, 모바일 앱의 환경 변수를 다룹니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 프로젝트의 [필수 조건](./prerequisites) 설치
- 작업할 프로젝트 저장소 복제
- [프로젝트 개요](./project-overview)를 검토하여 프로젝트가 필요한 API 모듈 이해

</div>

## 일반 패턴

1. 프로젝트 루트에서 `dotenv.sample.txt` 또는 `.env.sample`을 찾으세요.
2. `.env`로 복사하세요.
3. 필요에 따라 값을 수정하세요.

```bash
# .env.sample을 가진 프로젝트의 예
cp .env.sample .env

# dotenv.sample.txt를 가진 프로젝트의 예
cp dotenv.sample.txt .env
```

:::warning
**.env 파일을 버전 관리에 커밋하지 마세요.** 이들은 데이터베이스 자격증명, API 키, JWT 보안 같은 보안을 포함합니다. 모든 ChurchApps 프로젝트는 `.gitignore`에 `.env`를 포함하지만, 커밋하기 전에 항상 다시 확인하세요.
:::

## API 대상 선택

가장 중요한 결정은 프론트엔드가 API 호출을 위해 어디를 가리키는지입니다. 두 가지 옵션이 있습니다:

### 옵션 1: 스테이징 API (프론트엔드 개발에 권장)

공유 스테이징 환경을 사용하세요. 로컬 API 또는 데이터베이스 설정이 필요하지 않습니다.

```bash
# 기본 URL 패턴
https://api.staging.churchapps.org/{module}

# 예시 모듈 URL
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### 옵션 2: 로컬 API

머신에서 Api 프로젝트를 실행하세요. 각 모듈에 대해 생성된 MySQL 8.0+ 데이터베이스가 필요합니다. [API 로컬 설정](../api/local-setup) 가이드를 참조하세요.

```bash
# 기본 URL 패턴
http://localhost:8084/{module}

# 예시 모듈 URL
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API 환경 변수

핵심 **Api** 프로젝트 (`.env.sample`)에는 가장 많은 구성이 있습니다. 주요 변수:

### 공유 설정

| 변수 | 설명 | 예 |
|----------|-------------|---------|
| `ENVIRONMENT` | 런타임 환경 | `dev` |
| `SERVER_PORT` | 로컬 개발 서버의 HTTP 포트 | `8084` |
| `ENCRYPTION_KEY` | 민감한 데이터를 위한 192비트 암호화 키 | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | JSON 웹 토큰 서명 보안 | `jwt-secret-dev` |
| `FILE_STORE` | 업로드된 파일 저장 위치 (`disk` 또는 `s3`) | `disk` |
| `CORS_ORIGIN` | 허용된 CORS 출처 (로컬 개발은 `*`) | `*` |

### 데이터베이스 연결

각 API 모듈은 자신의 MySQL 데이터베이스 및 연결 문자열을 가집니다:

| 변수 | 데이터베이스 |
|----------|----------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
`root:password`를 실제 MySQL 자격증명으로 업데이트하세요. 각 데이터베이스는 API를 실행하기 전에 생성되어야 합니다. 모든 모듈의 스키마를 생성하려면 `npm run initdb`를 사용하거나, 단일 모듈의 경우 `npm run initdb:membership`을 사용하세요.
:::

### WebSocket 설정

| 변수 | 설명 | 예 |
|----------|-------------|---------|
| `SOCKET_PORT` | WebSocket 서버의 포트 | `8087` |
| `SOCKET_URL` | 클라이언트가 연결할 WebSocket URL | `ws://localhost:8087` |

---

## 웹 앱 환경 변수

### B1Admin (React + Vite)

샘플 파일: `.env.sample`

| 변수 | 설명 | 예 (스테이징) |
|----------|-------------|-------------------|
| `REACT_APP_STAGE` | 환경 이름 | `demo` |
| `PORT` | 개발 서버 포트 | `3101` |
| `REACT_APP_MEMBERSHIP_API` | 회원 API URL | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | 참석 API URL | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | 헌금 API URL | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | 컨텐츠 배달 URL | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google 분석 ID (선택) | `UA-123456789-1` |

로컬 API 개발의 경우 `localhost` 변형을 주석 해제하고 사용:

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App (Next.js)

샘플 파일: `.env.sample`

| 변수 | 설명 | 예 (스테이징) |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | 회원 API URL | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | 참석 API URL | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | 헌금 API URL | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | 메시징 API URL | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | 컨텐츠 API URL | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | 컨텐츠 배달 URL | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps 기본 URL | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google 분석 ID (선택) | `UA-123456789-1` |

:::info
Next.js는 브라우저에서 사용 가능해야 하는 모든 환경 변수에 `NEXT_PUBLIC_` 접두사를 요구합니다. 서버만 변수는 이 접두사가 필요하지 않습니다.
:::

### LessonsApp (Next.js)

샘플 파일: `dotenv.sample.txt`

| 변수 | 설명 | 예 (스테이징) |
|----------|-------------|-------------------|
| `STAGE` | 환경 스테이지 | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API URL | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | 컨텐츠 배달 URL | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps 기본 URL | `https://staging.churchapps.org` |

---

## 모바일 앱 환경 변수

### B1Mobile (React Native / Expo)

샘플 파일: `dotenv.sample.txt`

| 변수 | 설명 | 예 (스테이징) |
|----------|-------------|-------------------|
| `STAGE` | 환경 이름 | `dev` |
| `MEMBERSHIP_API` | 회원 API URL | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | 메시징 API URL | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | 참석 API URL | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | 헌금 API URL | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | 할 일 API URL | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | 컨텐츠 API URL | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | 컨텐츠 배달 URL | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | Lessons 사이트 URL | `https://staging.lessons.church` |

:::info
모바일 앱은 `REACT_APP_` 또는 `NEXT_PUBLIC_` 접두사를 사용하지 않습니다. 환경 변수 액세스는 Expo 구성에서 처리됩니다.
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
