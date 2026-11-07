---
title: "Docker로 자체 호스팅하기"
description: "Docker로 개인용 B1 Admin, 회원 포털, API, MySQL 스택을 본인 컴퓨터에 설치하고, b1 명령으로 업그레이드하고 백업하세요."
---

# Docker로 자체 호스팅하기

<div class="article-intro">

Docker가 설치된 모든 컴퓨터(홈 서버, 소규모 VPS, 자체 설치 장비)에서 B1 Admin, B1 교인 포털과 웹사이트, API, MySQL 데이터베이스의 개인 인스턴스를 직접 실행할 수 있습니다. 명령 한 줄로 설치하고, 명령 한 줄로 업그레이드하며, 업그레이드할 때마다 먼저 백업을 만듭니다. 서버를 직접 관리하고 싶지 않다면 관리형 대안인 [Railway에서 자체 호스팅하기](./railway-template.md)를 참고하세요.

</div>

## 빠른 시작

<div class="prereqs">
<h4>필요한 것</h4>

- [Docker Engine](https://docs.docker.com/engine/install/)과 Compose v2가 설치된 Linux 컴퓨터(또는 WSL이나 Git Bash를 사용하는 macOS/Windows. `b1` 도우미는 bash 스크립트입니다. Compose v2는 Docker Desktop에 포함되어 있습니다)
- 약 2GB의 RAM과 5GB의 디스크
- 공개 사이트를 운영하려면: 컴퓨터를 가리키는 도메인 이름과 접근 가능한 80번 및 443번 포트

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

`http://localhost`에서 실행하려면 `--domain`을 빼세요. 설치 프로그램은 `b1church` 폴더를 만들고, 새로 생성한 비밀 값을 담은 `.env` 파일을 쓰고, GitHub Container Registry에서 미리 빌드된 이미지를 내려받고, API가 정상 상태를 보고할 때까지 기다립니다. 컴퓨터에서 아무것도 빌드하지 않으므로 처음 시작하는 데 1~2분 정도 걸립니다.

설치가 끝나면 다음과 같이 하세요.

1. `https://church.example.org/admin`(또는 http://localhost/admin)을 열고 **Register**를 클릭하세요. 처음 만든 계정은 자동으로 서버 관리자가 됩니다.
2. 앱 안내에 따라 첫 번째 교회를 만드세요. 교회가 만들어지는 즉시 웹사이트와 교인 포털이 `https://church.example.org/`에서 운영됩니다.

모든 서비스는 하나의 도메인 뒤에서 실행됩니다.

| 경로 | 서비스 |
|------|---------|
| `/` | B1App -- 교회 웹사이트 및 교인 포털 |
| `/admin` | B1Admin -- 직원용 대시보드 |
| `/api` | API, 업로드된 파일, 실시간 업데이트 웹소켓 |

HTTPS는 자동으로 적용됩니다. 번들된 [Caddy](https://caddyserver.com/) 프록시가 `.env`에 있는 도메인의 Let's Encrypt 인증서를 발급하고 갱신합니다. 외부에 열리는 포트는 80번과 443번뿐이며, 데이터베이스는 Docker 네트워크 내부에서만 접근할 수 있습니다.

## `b1` 명령

설치 프로그램은 `docker-compose.yml` 옆에 `deploy/b1` 스크립트를 남깁니다. 일상적으로 필요한 것은 이것뿐입니다.

| 명령 | 동작 |
|---------|--------------|
| `./deploy/b1 upgrade` | 현재 릴리스를 내려받고, 백업을 만들고, 재시작한 뒤 API가 정상인지 확인 |
| `./deploy/b1 upgrade 2026.10.1` | 같은 동작이지만 특정 릴리스로 고정 |
| `./deploy/b1 backup` | 데이터베이스, 업로드된 파일, `.env`를 `backups/<timestamp>/`에 스냅샷으로 저장 |
| `./deploy/b1 restore backups/<timestamp>` | 스냅샷을 되돌림(실행 중에는 API가 멈춤) |
| `./deploy/b1 rollback` | 가장 최근 백업을 복원. 백업을 만들 때 사용하던 릴리스도 포함 |
| `./deploy/b1 status` | 설치된 버전과 컨테이너 상태 |
| `./deploy/b1 logs api` | 서비스 로그를 실시간으로 보기 |

릴리스는 버전이 붙은 하나의 번들로 배포되므로, 이미지 세 개가 항상 서로 맞습니다. `.env`의 `B1_VERSION=stable`은 최신 릴리스를 따라가며, 특정 버전을 지정하면 그 버전으로 고정됩니다. 릴리스 노트는 [B1Admin 릴리스](https://github.com/ChurchApps/B1Admin/releases)에 있습니다.

## 구성

모든 설정은 `docker-compose.yml` 옆의 `.env`에 있습니다. 설치 프로그램이 필수 항목을 채워 줍니다.

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # Caddy가 제공하는 주소. 로컬 설치라면 http://localhost
PUBLIC_URL=https://church.example.org    # 브라우저와 이메일이 사이트에 접근하는 주소
MYSQL_ROOT_PASSWORD=…                    # 자동 생성
JWT_SECRET=…                             # 자동 생성
ENCRYPTION_KEY=…                         # 자동 생성, 정확히 32자 -- 자격 증명을 저장한 뒤에는 절대 바꾸지 마세요

# 이메일 -- 강력히 권장. 없으면 교인이 스스로 비밀번호를 재설정할 수 없습니다
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

`.env`를 수정한 뒤에는 `docker compose up -d`로 적용하세요. 웹 앱은 브라우저의 주소를 보고 어떤 API와 통신할지 판단하므로, 도메인을 바꿀 때는 `SITE_ADDRESS`와 `PUBLIC_URL`만 수정하고 재시작하면 됩니다. 다시 빌드할 필요는 없습니다.

:::warning
`.env`를 안전하게 보관하세요. `ENCRYPTION_KEY`는 저장된 결제 게이트웨이와 스토리지 자격 증명을 보호합니다. 이 키 없이 만든 백업으로는 해당 자격 증명을 복호화할 수 없습니다. `./deploy/b1 backup`에는 이 이유로 `.env` 사본이 포함됩니다.
:::

### 나중에 도메인으로 옮기기

`localhost`에 설치했다가 나중에 공개하고 싶다면, DNS가 컴퓨터를 가리키도록 설정하고, `.env`에서 `DOMAIN`, `SITE_ADDRESS`(도메인만 입력), `PUBLIC_URL`(`https://` + 도메인)을 설정한 뒤 `docker compose up -d`를 실행하세요. Caddy는 첫 요청 때 인증서를 가져옵니다.

## 이메일, 헌금, 다중 사이트, 연동

다음 기능은 Railway와 정확히 같은 방식으로 작동합니다. 같은 환경 변수를 Railway 대시보드 대신 `.env`에 설정하면 됩니다.

- **[이메일 / SMTP](./railway-template.md#1-email-highly-recommended)** -- Resend, Brevo, Gmail 설정 안내
- **[다중 사이트](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)** -- 인스턴스 하나에 교회를 제한 없이 둘 수 있습니다. `/`는 슬러그가 `DEFAULT_CHURCH_SLUG`인 교회를 제공합니다(첫 번째 교회의 슬러그는 `church`). 추가 도메인은 이 컴퓨터를 가리키게 하고, B1Admin의 **설정 → 도메인**에서 연결하세요.
- **[온라인 헌금](./railway-template.md#4-online-giving-stripe--paypal)** -- 교회별로 관리자 화면에서 설정합니다.
- **[선택 연동 기능](./railway-template.md#6-optional-feature-integrations)** -- `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[푸시 알림](#push-notifications)** -- `WEB_PUSH_*`. 설치 프로그램은 이 값을 비워 두므로, 직접 추가하기 전까지 푸시는 꺼져 있습니다.

자체 호스팅 인스턴스에서는 초대장과 교회가 보내는 기타 이메일이 자동으로 켜집니다. (호스팅 서비스는 발신자 평판을 보호하기 위해 이 기능을 수동 검토 뒤에 둡니다.)

## 푸시 알림 {#push-notifications}

서버에 VAPID 키 쌍이 생기기 전까지 브라우저와 모바일 웹 푸시는 꺼져 있습니다. 설치 프로그램은 키를 만들지 않습니다. 키를 추가하기 전까지 모바일 웹 앱의 알림 페이지에는 이 사이트에서 푸시가 켜져 있지 않다고 표시됩니다.

1. 키 쌍을 만드세요. Docker만 있으면 됩니다.

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. 두 값을 `.env`에 추가하세요. `WEB_PUSH_SUBJECT`는 선택 사항이며, 푸시 서비스가 보게 되는 연락처 주소입니다.

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. 적용하세요.

   ```bash
   docker compose up -d
   ```

4. 확인하려면 B1Admin에서 **Server Admin → Server Health**를 여세요. Web Push 키 두 개가 모두 설정됨으로 표시되어야 합니다. 그러면 교인이 모바일 웹 앱에서 알림을 켤 수 있습니다.

:::warning
교인이 한 번 등록한 뒤에는 같은 키를 계속 사용하세요. 키를 바꾸면 기존 구독이 모두 무효화되고, 모든 기기가 다시 등록해야 합니다.
:::

## 데이터, 백업, 파일 저장소

세 개의 명명된 Docker 볼륨이 모든 상태를 보관합니다.

| 볼륨 | 내용 |
|--------|----------|
| `b1church_mysql-data` | 모든 데이터베이스 스키마 |
| `b1church_api-content` | 업로드된 파일 -- 사진, 문서, 웹사이트 이미지 |
| `b1church_caddy-data` | TLS 인증서 |

`./deploy/b1 backup`은 앞의 두 볼륨과 `.env`의 일관된 스냅샷을 `backups/<timestamp>/`에 저장합니다. cron으로 예약하고, 폴더를 컴퓨터 밖의 다른 곳으로 복사하세요.

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

미디어 라이브러리가 큰 경우 `FILE_STORE=S3`와 [Railway 가이드의 파일 저장소 섹션](./railway-template.md#5-file-storage)에 설명된 `AWS_*` 변수를 설정해 파일 저장소를 S3로 바꿀 수 있습니다. 데이터베이스 백업에는 S3 객체가 포함되지 않으므로, 해당 버킷에서 버전 관리를 켜세요.

## 업데이트

```bash
./deploy/b1 upgrade
```

이 명령은 순서대로 릴리스를 내려받고, 백업을 만들고, 컨테이너를 다시 만들고, API가 시작되면서 대기 중인 데이터베이스 마이그레이션을 실행하고, API 상태 확인이 통과할 때까지 기다립니다. 어떤 단계라도 실패하면 중단하고 `./deploy/b1 rollback`을 실행하라고 안내합니다. 이 명령은 해당 백업과 이전 릴리스를 복원합니다. 마이그레이션은 앞으로만 진행되므로, 되돌리려면 항상 스냅샷을 복원해야 합니다.

베타 compose 파일(소스에서 이미지를 빌드하던 파일)에서 업그레이드하는 경우에도, `.env`만 있으면 같은 방식으로 진행됩니다. 베타 파일은 기본값으로 `MYSQL_ROOT_PASSWORD=churchapps`를 사용했으므로, 이 값을 `PUBLIC_URL` 및 `SITE_ADDRESS`와 함께 `.env`에 넣으세요. 그다음 `docker-compose.yml`과 `deploy/`를 최신 파일로 교체하고 `./deploy/b1 upgrade`를 실행하세요.

## 소스에서 빌드하기

개발자는 이미지를 내려받는 대신 로컬에서 빌드할 수 있습니다.

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`.env`의 `API_CONTEXT`와 `B1APP_CONTEXT`는 빌드가 로컬 체크아웃(예: `../Api`) 또는 git ref를 사용하도록 지정합니다.

## 문제 해결

| 증상 | 가능한 원인 | 해결 방법 |
|---------|--------------|--------------|
| `api` 컨테이너가 계속 재시작됨 | 마이그레이션 실패 또는 잘못된 데이터베이스 비밀번호 | `./deploy/b1 logs api` 실행 -- 마이그레이션 출력에 실패한 모듈이 표시됨 |
| `api` 로그에 "ENCRYPTION_KEY must be exactly 32 characters"가 표시됨 | `.env`의 키가 직접 수정되었거나 잘림 | 원래 32자 키를 복원하세요(아직 저장된 자격 증명이 없을 때만 새 키를 만드세요) |
| 브라우저에 인증서 경고가 표시됨 | DNS가 아직 이 컴퓨터를 가리키지 않음, 또는 80/443번 포트가 차단됨 | DNS나 방화벽을 고치세요. Caddy가 스스로 재시도합니다 |
| `/`에 웹사이트 대신 대시보드가 표시됨 | 아직 교회가 없음, 또는 `DEFAULT_CHURCH_SLUG`가 맞지 않음 | 교회를 만들거나, **설정 → 교회**에서 슬러그를 설정하세요 |
| "Check your email"이 표시되지만 이메일이 도착하지 않음 | `MAIL_SYSTEM=SMTP`인데 자격 증명이 잘못됨 | 자격 증명을 고치거나, `MAIL_SYSTEM`을 비워서 이메일을 끄세요 |
| 모바일 웹 앱에 푸시 알림이 켜져 있지 않다고 표시됨 | 서버에 VAPID 키가 없음 | [푸시 알림](#push-notifications)에 설명된 대로 키를 추가하세요 |
| 채팅이나 실시간 기능이 작동하지 않음 | 앞단의 다른 프록시가 웹소켓을 차단함 | 소켓은 같은 포트의 `/api/`에 있습니다. `Upgrade` 헤더를 허용하세요 |
| `install`이 "database volume already exists"로 거부됨 | 이전 설치의 잔여물 | `docker compose down -v`로 지우거나, `.env`를 작성한 뒤 `upgrade`를 사용하세요 |

그래도 해결되지 않나요? `./deploy/b1 logs`의 출력과 함께 [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues)에 이슈를 등록하세요.

## 관련 문서

- **[Railway에서 자체 호스팅하기](./railway-template.md)** -- 관리형 호스팅 대안과 공통 배포 후 구성 가이드
- **[초기 설정](../../getting-started/initial-setup.md)** -- 교회를 만든 뒤 처음 할 일
- **[API 로컬 설정](../api/local-setup.md)** -- 개발을 위해 스택을 직접 실행하기
