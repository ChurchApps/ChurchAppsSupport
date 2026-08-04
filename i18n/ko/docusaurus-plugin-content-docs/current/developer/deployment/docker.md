---
title: "Docker로 셀프 호스팅"
---

# Docker로 셀프 호스팅

<div class="article-intro">

홈 서버, $5 VPS, 또는 사내 박스 등 Docker가 있는 모든 머신에서 B1 Admin, B1 회원 포털, API, MySQL 데이터베이스의 자체 비공개 인스턴스를 실행하세요. `docker compose up` 한 번으로 모든 것을 빌드하고 시작합니다. 서버를 전혀 관리하고 싶지 않다면 관리형 대안인 [Railway에서 셀프 호스팅](./railway-template)을 참조하세요.

</div>

## 빠른 시작

<div class="prereqs">
<h4>필요한 것</h4>

- Compose v2가 있는 [Docker Engine](https://docs.docker.com/engine/install/) (Docker Desktop에 포함됨)
- 초기 빌드 중 사용 가능한 ~4GB RAM (웹 앱은 소스에서 빌드됩니다)
- Git, 또는 원시 `docker-compose.yml` 파일만

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

첫 실행은 10-20분이 걸립니다: 클론에서 B1Admin을 빌드하고 GitHub 저장소에서 직접 API와 B1App을 빌드합니다. 이후 시작은 몇 초입니다.

네 서비스가 모두 실행되면:

1. **http://localhost:3101** (B1 Admin)을 엽니다.
2. **등록**을 클릭하고 계정을 만듭니다. 첫 계정은 자동으로 서버 관리자가 됩니다.
3. 앱 내 안내에 따라 첫 교회를 만듭니다.

데이터베이스 스키마는 API 컨테이너의 시작 마이그레이션에 의해 자동으로 생성됩니다 — 수동 SQL이 필요하지 않습니다.

| 서비스 | URL |
|--------|-----|
| B1Admin (직원/관리자) | http://localhost:3101 |
| B1App (회원 포털 / 웹사이트) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | 내부 전용 (compose 네트워크에서 `mysql:3306`) |

## 구성

모든 설정은 `docker-compose.yml` 옆의 `.env` 파일에 있습니다. 모든 변수는 localhost용 작동 기본값을 가지므로 사용자 정의하기 전까지 파일은 선택사항입니다.

```bash
# .env — 모든 것이 선택사항입니다; 기본값과 함께 표시됨
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # 정확히 32자

# 공개 URL (localhost를 넘어 노출할 때 이것들을 변경하세요)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084

# 이메일 — 제공자 워크스루는 Railway 가이드의 이메일 섹션을 참조하세요
MAIL_SYSTEM=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

실제 사용 전에 `MYSQL_ROOT_PASSWORD`, `JWT_SECRET`, `ENCRYPTION_KEY` (아무 32자 문자열)를 변경하세요.

:::warning
`*_URL` 값은 **웹 앱에 빌드 시간에 구워집니다** (표준 Vite/Next.js 동작). `.env`에서 변경하려면 재시작이 아니라 재빌드가 필요합니다:

```bash
docker compose up -d --build
```
:::

첫 실행 후 MySQL 비밀번호를 변경하려면 MySQL 내부의 비밀번호도 업데이트해야 합니다 — 볼륨이 이전 자격증을 유지합니다.

## 인터넷에 노출하기

모든 리버스 프록시를 앞에 두고 각 서비스에 호스트 이름을 부여하세요. [Caddy](https://caddyserver.com/)를 사용하면 다음과 같습니다:

```
admin.yourchurch.org { reverse_proxy localhost:3101 }
app.yourchurch.org   { reverse_proxy localhost:3000 }
api.yourchurch.org   { reverse_proxy localhost:8084 }
```

그 후 `.env`에서 URL을 설정하고 재빌드합니다:

```bash
API_URL=https://api.yourchurch.org
B1ADMIN_URL=https://admin.yourchurch.org
B1APP_URL=https://app.yourchurch.org
SOCKET_URL=wss://api.yourchurch.org
```

```bash
docker compose up -d --build
```

채팅 및 라이브 알림에 사용되는 WebSocket은 API의 포트를 공유하므로 `SOCKET_URL`은 단순히 `wss://`가 있는 API URL입니다.

## 이메일, 기부, 멀티 사이트, 통합

이것들은 Railway 배포와 동일하게 작동합니다 — 동일한 환경 변수를, Railway 대시보드 대신 `.env` 파일에 설정합니다 (compose 파일이 이를 API로 전달합니다):

- **[이메일 / SMTP](./railway-template#1-email-highly-recommended)** — 강력히 권장됨; 없으면 회원이 비밀번호를 재설정할 수 없습니다
- **[멀티 사이트](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — 인스턴스당 무제한 교회, 관리자 UI에서 관리됨
- **[온라인 기부](./railway-template#4-online-giving-stripe--paypal)** — 관리자 UI에서 교회별로 구성됨, env 변수를 통해서가 아님
- **[선택적 통합](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`

## 데이터, 백업, 파일 저장소

두 개의 명명된 Docker 볼륨이 모든 상태를 보유합니다:

| 볼륨 | 내용 |
|------|------|
| `mysql-data` | 모든 데이터베이스 스키마 |
| `api-content` | 업로드된 파일 — 사진, 문서, 웹사이트 이미지 (`/app/content`에 마운트됨) |

한 줄로 데이터베이스를 백업하세요 (cron으로 예약하세요):

```bash
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

볼륨을 복사하여 업로드된 파일을 백업하세요:

```bash
docker run --rm -v b1admin_api-content:/data -v "$PWD":/backup alpine tar czf /backup/content-$(date +%F).tgz -C /data .
```

대용량 미디어 라이브러리의 경우 파일 저장소를 로컬 볼륨 대신 S3로 전환할 수 있습니다 — [Railway 가이드의 파일 저장소 섹션](./railway-template#5-file-storage)에 설명된 `FILE_STORE=S3` 더하기 `AWS_*` 변수를 설정하세요.

## 업데이트

API와 B1App은 자신의 GitHub 저장소의 `main` 브랜치에서 빌드됩니다; B1Admin은 로컬 클론에서 빌드됩니다.

```bash
git pull                              # B1Admin 업데이트
docker compose build --pull           # 최신 main에 대해 모든 이미지 재빌드
docker compose up -d
```

데이터베이스 마이그레이션은 API 컨테이너가 시작될 때 자동으로 실행됩니다.

`main`을 추적하는 대신 버전을 고정하려면 빌드 컨텍스트를 `.env`의 태그로 지정하세요:

```bash
API_CONTEXT=https://github.com/ChurchApps/Api.git#v1.2.3
B1APP_CONTEXT=https://github.com/ChurchApps/B1App.git#v1.2.3
```

개발자는 동일한 변수를 로컬 체크아웃으로 가리킬 수 있습니다 (예: `API_CONTEXT=../Api`).

## 문제 해결

| 증상 | 가능한 원인 | 수정 |
|------|-----------|------|
| `api` 컨테이너가 반복적으로 재시작됨 | MySQL이 준비되지 않았거나 마이그레이션 실패 | `docker compose logs api` — 마이그레이션은 어떤 모듈이 실패했는지 출력합니다 |
| 로그인이 `api.churchapps.org`로 리디렉트됨 | `custom` 스테이지 인수 없이 빌드된 웹 앱 | 재빌드: `docker compose build --no-cache b1admin b1app` |
| `.env`에서 URL을 변경했지만 아무 일도 일어나지 않음 | URL은 빌드 시간에 구워집니다 | `docker compose up -d --build` |
| "이메일을 확인하세요"이지만 이메일이 도착하지 않음 | 잘못된 자격증으로 `MAIL_SYSTEM=SMTP` | 자격증을 수정하거나 이메일을 비활성화하려면 `MAIL_SYSTEM`을 설정 해제하세요 |
| 채팅 / 라이브 기능이 조용함 | 브라우저에서 `SOCKET_URL`에 도달할 수 없음 | HTTPS 뒤에서 `wss://`여야 하고 포트 8084로 프록시되어야 합니다 |
| 작은 VPS에서 빌드가 실패함 | `next build` 중 메모리 부족 | 스왑을 추가하거나 다른 머신에서 빌드하고 `docker save`/`load`를 사용하세요 |

여전히 막혔나요? `docker compose logs`의 출력과 함께 [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues)에서 이슈를 여세요.

## 관련 문서

- **[Railway에서 셀프 호스팅](./railway-template)** — 관리형 호스팅 대안, 더하기 공유된 배포 후 구성 가이드
- **[초기 설정](../../getting-started/initial-setup)** — 교회가 생성된 후 첫 단계
- **[로컬 API 설정](../api/local-setup)** — 개발을 위해 스택을 직접 실행하기
</content>
