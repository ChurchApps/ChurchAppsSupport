---
title: "Docker로 직접 호스팅하기"
---

# Docker로 직접 호스팅하기

<div class="article-intro">

Docker가 설치된 모든 머신(홈 서버, 소형 VPS 또는 온프레미스 장비)에서 B1 Admin, B1 멤버 포털 및 웹사이트, API, MySQL 데이터베이스의 개인 인스턴스를 직접 실행할 수 있습니다. 명령 한 줄로 설치하고, 명령 한 줄로 업그레이드하며, 모든 업그레이드는 먼저 백업을 수행합니다. 서버를 직접 관리하고 싶지 않다면 관리형 대안인 [Railway에서 직접 호스팅하기](./railway-template)를 참조하세요.

</div>

## 빠른 시작

<div class="prereqs">
<h4>필요한 것</h4>

- [Docker Engine](https://docs.docker.com/engine/install/)과 Compose v2가 설치된 Linux 머신(또는 WSL이나 Git Bash를 사용하는 macOS / Windows — `b1` 도우미는 bash 스크립트입니다)(Compose v2는 Docker Desktop에 포함됨)
- 약 2GB의 RAM과 5GB의 디스크 공간
- 공개 사이트의 경우: 머신을 가리키는 도메인 이름과 80번 및 443번 포트에 접근 가능한 상태

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

`--domain`을 생략하면 `http://localhost`에서 실행됩니다. 설치 프로그램은 `b1church` 폴더를 만들고, 새로 생성된 비밀 값이 들어 있는 `.env`를 작성하며, GitHub Container Registry에서 미리 빌드된 이미지를 가져온 다음 API가 정상 상태를 보고할 때까지 기다립니다. 본인의 머신에서 빌드하지 않으므로 첫 실행에는 1~2분이 걸립니다.

설치가 끝나면:

1. **https://church.example.org/admin**(또는 http://localhost/admin)을 열고 **등록**를 클릭합니다. 처음 만든 계정은 자동으로 서버 관리자가 됩니다.
2. 앱 내 안내에 따라 첫 번째 교회를 만듭니다. 교회가 생성되는 즉시 웹사이트와 멤버 포털이 **https://church.example.org/**에서 활성화됩니다.

모든 것은 하나의 도메인 아래에서 실행됩니다.

| 경로 | 서비스 |
|------|---------|
| `/` | B1App — 교회 웹사이트 및 멤버 포털 |
| `/admin` | B1Admin — 교직원 대시보드 |
| `/api` | API, 업로드된 파일 및 실시간 업데이트용 웹소켓 |

HTTPS는 자동으로 적용됩니다. 번들된 [Caddy](https://caddyserver.com/) 프록시가 `.env`에 설정된 도메인에 대해 Let's Encrypt 인증서를 발급받고 갱신합니다. 80번과 443번 포트만 외부에 노출되며, 데이터베이스는 Docker 네트워크 내부에서만 접근할 수 있습니다.

## `b1` 명령어

설치 프로그램은 `docker-compose.yml` 옆에 `deploy/b1` 스크립트를 남깁니다. 일상적으로 필요한 것은 이것뿐입니다.

| 명령어 | 설명 |
|---------|--------------|
| `./deploy/b1 upgrade` | 현재 릴리스를 가져오고, 백업을 만들고, 재시작한 후 API가 정상인지 확인 |
| `./deploy/b1 upgrade 2026.10.1` | 위와 동일하지만 특정 릴리스로 고정 |
| `./deploy/b1 backup` | 데이터베이스, 업로드된 파일 및 `.env`의 스냅샷을 `backups/<timestamp>/`에 저장 |
| `./deploy/b1 restore backups/<timestamp>` | 스냅샷을 복원(실행 중에는 API가 중지됨) |
| `./deploy/b1 rollback` | 가장 최근 백업을 복원하며, 백업이 만들어질 당시의 릴리스도 포함 |
| `./deploy/b1 status` | 설치된 버전과 컨테이너 상태 |
| `./deploy/b1 logs api` | 서비스 로그를 실시간으로 확인 |

릴리스는 하나의 버전이 지정된 번들로 게시되므로 세 이미지는 항상 일치합니다. `.env`의 `B1_VERSION=stable`은 최신 릴리스를 따르며, 특정 버전으로 설정하면 고정됩니다. 릴리스 노트는 [B1Admin 릴리스](https://github.com/ChurchApps/B1Admin/releases)에서 확인할 수 있습니다.

## 구성

모든 설정은 `docker-compose.yml` 옆의 `.env`에 저장됩니다. 설치 프로그램이 필수 항목을 채워 줍니다.

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # what Caddy serves; http://localhost for a local install
PUBLIC_URL=https://church.example.org    # how browsers and emails reach the site
MYSQL_ROOT_PASSWORD=…                    # generated
JWT_SECRET=…                             # generated
ENCRYPTION_KEY=…                         # generated, exactly 32 characters — never change it after storing credentials

# Email — strongly recommended; without it members can't reset their own passwords
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

`.env`를 편집한 후에는 `docker compose up -d`로 적용합니다. 웹 앱은 브라우저의 주소를 기준으로 어떤 API에 연결할지 결정하므로, 도메인을 변경하려면 `SITE_ADDRESS`와 `PUBLIC_URL`만 업데이트하고 재시작하면 됩니다. 다시 빌드할 필요는 없습니다.

:::warning
`.env`를 안전하게 보관하세요. `ENCRYPTION_KEY`는 저장된 결제 게이트웨이 및 스토리지 자격 증명을 보호하며, 이 키가 없는 백업으로는 해당 자격 증명을 복호화할 수 없습니다. `./deploy/b1 backup`에는 이러한 이유로 키 사본이 포함됩니다.
:::

### 나중에 도메인으로 전환하기

`localhost`에 설치한 후 공개 접근을 원한다면, DNS가 머신을 가리키도록 설정하고 `.env`에서 `DOMAIN`, `SITE_ADDRESS`(도메인만), `PUBLIC_URL`(`https://` + 도메인)을 설정한 다음 `docker compose up -d`를 실행합니다. Caddy가 첫 요청 시 인증서를 가져옵니다.

## 이메일, 헌금, 다중 사이트 및 통합

이 기능들은 Railway에서와 정확히 동일하게 작동합니다. 동일한 환경 변수를 Railway 대시보드 대신 `.env`에 설정합니다.

- **[이메일 / SMTP](./railway-template#1-email-highly-recommended)** — Resend, Brevo, Gmail에 대한 단계별 안내
- **[다중 사이트](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — 인스턴스당 교회 수 제한 없음. `/`는 슬러그가 `DEFAULT_CHURCH_SLUG`인 교회를 제공합니다(첫 번째 교회는 `church`). 추가 도메인을 서버로 연결한 후 B1Admin의 **설정 → 도메인**에서 매핑하세요.
- **[온라인 헌금](./railway-template#4-online-giving-stripe--paypal)** — 교회별로 관리자 UI에서 구성
- **[선택적 통합](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_*`, `GOOGLE_RECAPTCHA_SECRET_KEY`

초대장과 교회가 발송하는 기타 이메일은 자체 호스팅 인스턴스에서 자동으로 활성화됩니다(호스팅 서비스는 발신자 평판을 보호하기 위해 이러한 기능을 수동 검토 뒤에 둡니다).

## 데이터, 백업 및 파일 스토리지

세 개의 명명된 Docker 볼륨이 모든 상태를 저장합니다.

| 볼륨 | 내용 |
|--------|----------|
| `b1church_mysql-data` | 모든 데이터베이스 스키마 |
| `b1church_api-content` | 업로드된 파일 — 사진, 문서, 웹사이트 이미지 |
| `b1church_caddy-data` | TLS 인증서 |

`./deploy/b1 backup`은 앞의 두 볼륨과 `.env`의 일관된 스냅샷을 `backups/<timestamp>/`에 기록합니다. cron으로 예약하고 폴더를 머신 외부로 복사하세요.

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

대용량 미디어 라이브러리의 경우 파일 스토리지를 S3로 전환할 수 있습니다. `FILE_STORE=S3`와 [Railway 가이드의 파일 스토리지 섹션](./railway-template#5-file-storage)에 설명된 `AWS_*` 변수를 설정하세요. 데이터베이스 백업에는 S3 객체가 포함되지 않으므로 해당 버킷에서 버전 관리를 활성화하세요.

## 업데이트

```bash
./deploy/b1 upgrade
```

순서대로: 릴리스를 가져오고, 백업을 만들고, 컨테이너를 다시 생성하고, API가 시작되면서 대기 중인 데이터베이스 마이그레이션을 실행하고, API 상태 점검이 통과하기를 기다립니다. 실패하면 중지되고 `./deploy/b1 rollback`을 실행하라는 메시지가 표시됩니다. 이 명령은 해당 백업과 이전 릴리스를 복원합니다. 마이그레이션은 순방향으로만 진행되므로, 롤백은 항상 스냅샷을 복원하는 것을 의미합니다.

베타 compose 파일(소스에서 이미지를 빌드하던 파일)에서 업그레이드하는 경우에도 `.env`가 있다면 동일한 방식으로 진행됩니다. 해당 파일은 기본적으로 `MYSQL_ROOT_PASSWORD=churchapps`를 사용했으므로, 이 값을 `PUBLIC_URL` 및 `SITE_ADDRESS`와 함께 `.env`에 넣고, `docker-compose.yml`과 `deploy/`를 현재 파일로 교체한 다음 `./deploy/b1 upgrade`를 실행하세요.

## 소스에서 빌드하기

개발자는 이미지를 가져오는 대신 로컬에서 빌드할 수 있습니다.

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`.env`의 `API_CONTEXT`와 `B1APP_CONTEXT`는 빌드가 로컬 체크아웃(예: `../Api`) 또는 git ref를 사용하도록 지정합니다.

## 문제 해결

| 증상 | 가능한 원인 | 해결 방법 |
|---------|--------------|-----|
| `api` 컨테이너가 반복해서 재시작됨 | 마이그레이션 실패 또는 잘못된 데이터베이스 비밀번호 | `./deploy/b1 logs api` — 마이그레이션 출력에 실패한 모듈이 표시됨 |
| `api` 로그에 "ENCRYPTION_KEY must be exactly 32 characters" 표시 | `.env`의 키가 수동으로 편집되었거나 잘림 | 원래의 32자 키를 복원(저장된 자격 증명이 아직 없는 경우에만 새 키 생성) |
| 브라우저에 인증서 경고 표시 | DNS가 아직 여기를 가리키지 않거나 80/443 포트가 차단됨 | DNS / 방화벽 수정; Caddy가 자동으로 재시도 |
| `/`에 웹사이트 대신 대시보드가 표시됨 | 교회가 아직 없거나 `DEFAULT_CHURCH_SLUG`가 일치하지 않음 | 교회를 만들거나 **설정 → 교회**에서 슬러그 설정 |
| "Check your email"이 표시되지만 이메일이 도착하지 않음 | `MAIL_SYSTEM=SMTP`에 잘못된 자격 증명 | 자격 증명을 수정하거나, `MAIL_SYSTEM`을 해제하여 이메일 비활성화 |
| 채팅 / 실시간 기능이 작동하지 않음 | 앞단의 다른 프록시가 웹소켓을 차단함 | 소켓은 동일한 포트의 `/api/`에 있음; `Upgrade` 헤더 허용 |
| `install`이 거부됨: "database volume already exists" | 이전 설치의 잔여물 | `docker compose down -v`로 삭제하거나 `.env`를 작성한 후 `upgrade` 사용 |

여전히 해결되지 않나요? [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues)에 `./deploy/b1 logs`의 출력과 함께 이슈를 등록하세요.

## 관련 문서

- **[Railway에서 직접 호스팅하기](./railway-template)** — 관리형 호스팅 대안, 그리고 공통 배포 후 구성 가이드
- **[초기 설정](../../getting-started/initial-setup)** — 교회 생성 후 첫 단계
- **[로컬 API 설정](../api/local-setup)** — 개발을 위해 스택을 직접 실행하기
