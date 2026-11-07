---
title: "Railway에서 자체 호스팅하기"
description: "약 15분 만에 Railway에 개인용 ChurchApps 인스턴스를 배포한 뒤, B1 Admin과 B1App의 이메일, 커스텀 도메인, 다중 교회 라우팅, 헌금, 파일 저장소를 설정하세요."
---

# Railway에서 자체 호스팅하기

<div class="article-intro">

ChurchApps는 한 번의 클릭으로 배포할 수 있는 [Railway](https://railway.com) 템플릿을 제공합니다. 이 템플릿으로 교회는 B1 Admin, B1 교인 포털, API, MySQL 데이터베이스의 개인 인스턴스를 가질 수 있으며, 모두 직접 소유하고 직접 비용을 지불하는 인프라에서 실행됩니다. 이 가이드를 따르면 약 15분 안에 서비스를 시작할 수 있고, 이후 대부분의 교회가 결국 원하게 되는 배포 후 설정을 차례로 안내합니다.

</div>

## 빠른 시작

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. 위의 **Deploy on Railway** 버튼을 클릭하세요.
2. Railway에 로그인하거나(무료 계정 만들기) 결제 수단을 추가하세요.
3. 아무것도 바꾸지 말고 **Deploy**를 클릭하세요. 모든 변수에는 합리적인 기본값이 있습니다.
4. 네 개의 서비스가 초록색으로 바뀔 때까지 5~10분 기다리세요.
5. **B1Admin** 서비스 URL을 열고 **Register**를 클릭해 계정을 만드세요. 처음 만든 계정은 자동으로 서버 관리자가 됩니다.
6. 앱 안내에 따라 첫 번째 교회를 만드세요.

이것으로 끝입니다. 이제 ChurchApps 인스턴스가 완전히 작동합니다. 아래 내용은 모두 선택 사항입니다.

:::tip
배포는 현재 **베타** 단계입니다. 문서에 없는 문제가 발생하면 배포 로그를 첨부해 [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues)에 이슈를 등록해 주세요.
:::

<div class="prereqs">
<h4>필요한 것</h4>

- 무료 [Railway](https://railway.com) 계정
- Railway에 등록된 신용카드(소규모 교회 기준 월 약 15~25달러. [비용](#costs) 참고)
- 초기 배포에 약 15분
- *선택 사항이지만 나중에 강력히 권장:* SMTP 자격 증명과 사용자 지정 도메인

</div>

## 배포되는 항목

템플릿은 하나의 Railway 프로젝트에 네 개의 서비스를 만듭니다.

| 서비스 | 목적 | 배포 후 URL |
|---------|------------------|---------|
| **MySQL** | 모든 데이터 저장(하나의 인스턴스, 여러 스키마) | 내부 전용 |
| **Api** | 교인, 콘텐츠, 헌금, 출석 등을 위한 백엔드 | `https://api-<id>.up.railway.app` |
| **B1Admin** | 직원/관리자용 웹 앱 | `https://b1admin-<id>.up.railway.app` |
| **B1App** | 교인용 웹 앱 및 교회 웹사이트 | `https://b1app-<id>.up.railway.app` |

데이터베이스 스키마는 처음 시작할 때 API의 시작 마이그레이션이 자동으로 만듭니다.

## 최초 설정

이제 서비스가 실행 중입니다. 대부분의 교회가 다음으로 설정하는 항목을 우선순위 순서대로 정리했습니다.

### 1. 이메일(강력히 권장) {#1-email-highly-recommended}

이메일이 없어도 교인은 등록하고 시스템을 사용할 수 있지만, **잊어버린 비밀번호를 재설정할 수는 없습니다**. 관리자가 대신 처리해야 합니다. SMTP 설정은 약 5분이면 됩니다.

Railway 대시보드에서 **Api** 서비스 → **Variables**를 열고 다음을 추가하세요.

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

알아 둘 만한 제공자 세 곳은 다음과 같습니다.

#### Resend -- 가장 간단한 무료 옵션(하루 100통)

1. [resend.com](https://resend.com)에서 가입하세요.
2. 발신 도메인을 인증하세요(시작할 때는 테스트용 발신자 `onboarding@resend.dev`를 사용할 수 있습니다).
3. API 키를 만드세요.
4. `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`로 설정하세요.

#### Gmail -- 개인 사용은 무료(하루 약 500통)

1. Google 계정의 2단계 인증을 켜세요.
2. [앱 비밀번호](https://myaccount.google.com/apppasswords)를 만드세요.
3. `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<16자리 앱 비밀번호>`로 설정하세요.

#### AWS SES -- 대량 발송 시 가장 저렴함

1. AWS에서 발신 도메인을 인증하세요.
2. 인증되지 않은 주소로 보내야 한다면 SES 샌드박스에서 벗어나세요.
3. **SES → SMTP Settings → Create credentials**에서 SMTP 자격 증명을 만드세요.
4. `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP 비밀번호>`로 설정하세요.

변수를 저장하면 Api 서비스가 자동으로 다시 배포됩니다. 테스트 계정으로 비밀번호 재설정을 요청해 확인하세요.

:::warning
잘못된 자격 증명으로 `MAIL_SYSTEM=SMTP`를 설정하면, 등록은 성공한 것처럼 보이지만 인증 이메일이 절대 도착하지 않습니다. 자격 증명을 고치거나, `MAIL_SYSTEM`을 비워서 이메일 없는 모드로 돌아가세요.
:::

### 2. 사용자 지정 도메인

기본 `*.up.railway.app` URL도 작동하지만, 대부분의 교회는 자체 도메인을 원합니다.

웹 서비스(B1Admin과 B1App) 각각에 대해 다음과 같이 하세요.

1. Railway에서 서비스를 열고 **Settings** → **Networking**으로 이동하세요.
2. **+ Custom Domain**을 클릭하고 호스트 이름을 입력하세요.
   - B1Admin은 `admin.yourchurch.org`
   - B1App은 `app.yourchurch.org`(또는 `www`)
3. Railway가 보여 주는 CNAME 레코드를 DNS 제공자에 추가하세요.
4. DNS가 반영될 때까지 몇 분 기다리세요. Railway가 TLS 인증서를 자동으로 발급합니다.

그다음 이메일의 링크가 새 도메인을 사용하도록 **Api** 서비스 변수를 수정하세요.

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

그리고 **B1Admin** 서비스에는 다음을 설정하세요.

```
REACT_APP_API_BASE=https://api.yourchurch.org   (사용자 지정 API 도메인도 설정한 경우)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

`{subdomain}` 토큰은 문자 그대로 입력하는 값입니다. 실행할 때 각 교회의 서브도메인으로 바뀝니다(아래 다중 사이트 참고).

### 3. 다중 사이트(인스턴스 하나에 여러 교회) {#3-multi-site-multiple-churches-on-one-instance}

ChurchApps는 설계상 다중 테넌트입니다. 배포 하나로 각자 교인, 그룹, 웹사이트를 가진 교회를 원하는 만큼 호스팅할 수 있습니다. 새 교회는 전적으로 관리자 화면에서 추가하며, 인프라를 바꿀 필요가 없습니다.

#### 교회 추가하기

1. **B1 Admin**에서 **설정 → Manage Church → Switch Church → Create New**로 이동하세요.
2. 각 교회에는 고유한 **서브도메인 슬러그**(예: `firstchurch`, `gracecommunity`)가 있습니다.
3. 새 교회는 자체 데이터, 교인, 웹사이트, 헌금 설정을 갖게 되며, 같은 인스턴스의 다른 교회와 완전히 분리됩니다.

#### 각 교회를 자체 URL로 연결하기

교회를 공개하는 방법은 두 가지입니다.

| 방식 | 예시 | 설정 |
|---------|---------|-------|
| **경로 기반**(기본으로 작동) | `app.yourchurch.org/firstchurch` | 추가 설정 없음 |
| **서브도메인 기반**(더 깔끔한 URL) | `firstchurch.yourchurch.org` | 와일드카드 DNS + 와일드카드 사용자 지정 도메인 |

Railway에서 **서브도메인 기반** 라우팅을 하려면 다음과 같이 하세요.

1. DNS 제공자에서 와일드카드 CNAME을 만드세요. `*.yourchurch.org → <b1app railway target>`
2. Railway에서 B1App 서비스 → **Settings** → **Networking**으로 가서 `*.yourchurch.org`를 사용자 지정 도메인으로 추가하세요.
3. **B1Admin** 서비스에서 `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`를 설정하세요.

다시 배포되면 각 교회의 사이트가 자동으로 `<서브도메인>.yourchurch.org`에서 제공됩니다.

:::info
와일드카드 사용자 지정 도메인은 유료 Railway 요금제가 필요합니다. 경로 기반 라우팅은 모든 요금제에서 작동하며 기능은 동일합니다. 주소창에 보이는 모양만 덜 깔끔할 뿐입니다.
:::

### 4. 온라인 헌금(Stripe / PayPal) {#4-online-giving-stripe--paypal}

헌금은 환경 변수가 아니라 **교회별로 관리자 화면에서** 설정합니다. 그래야 각 교회가 자체 가맹점 계정을 사용할 수 있습니다.

1. [Stripe](https://dashboard.stripe.com/)(Developers → API keys) 또는 [PayPal](https://developer.paypal.com/)(My Apps & Credentials)에서 개발자 자격 증명을 받으세요.
2. B1 Admin에서 **설정 → Giving Settings**로 이동하세요.
3. 제공자를 선택하고 공개 키와 비밀 키를 붙여 넣은 뒤, 수수료 처리 방식을 설정하세요.
4. 선택 사항으로, Railway의 **Api** 서비스에 `GOOGLE_RECAPTCHA_SECRET_KEY`를 추가하면 공개 헌금 양식을 봇으로부터 보호할 수 있습니다.

### 5. 파일 저장소 {#5-file-storage}

템플릿은 교인 사진, 설교 파일, 업로드된 문서를 위해 Api 서비스에 연결된 **1GB 영구 볼륨**을 만듭니다.

용량을 늘리려면 Api 서비스 → **Volumes**를 열고 크기 슬라이더를 조정하세요.

더 큰 배포(100GB 이상 또는 동시 업로드가 많은 경우)에는 **Api** 서비스에 다음을 설정해 S3로 전환하세요.

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

볼륨에 있던 기존 파일은 자동으로 옮겨지지 않습니다. 변수를 바꾸기 전에 버킷으로 직접 복사하세요.

### 6. 선택 기능 연동 {#6-optional-feature-integrations}

다음 변수는 특정 기능을 활성화하며, 나중에 Railway 대시보드에서 언제든 추가할 수 있습니다. **Api** 서비스에 설정하세요.

| 변수 | 활성화되는 기능 |
|----------|--------------------|
| `OPENAI_API_KEY` *또는* `OPENROUTER_API_KEY` | AI 기반 검색과 콘텐츠 제안 |
| `YOUTUBE_API_KEY` | YouTube 설교 검색 및 삽입 |
| `PEXELS_KEY` | 웹사이트 빌더용 스톡 이미지 선택기 |
| `VIMEO_TOKEN` | Vimeo 설교 지원 |
| `API_BIBLE_KEY` | 공과와 콘텐츠에서 성경 구절 조회 |
| `YOUVERSION_API_KEY` | YouVersion 성경 연동 |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | 브라우저 푸시 알림([VAPID 키 쌍 만들기](./docker.md#push-notifications)) |
| `HUBSPOT_KEY` | 새 등록을 위한 선택적 CRM 동기화 |

## 업데이트

각 서비스는 해당 GitHub 저장소와 연결되어 있습니다. `ChurchApps/Api`, `ChurchApps/B1Admin`, `ChurchApps/B1App`의 `main`에 푸시하면 자동으로 다시 배포됩니다.

특정 버전으로 고정하려면 각 서비스의 **Branch** 설정을 태그나 릴리스 브랜치로 바꾸세요. 운영 환경에는 이 설정을 권장합니다. `main`에서 자동 배포하면 진행 중인 작업이 그대로 반영되기 때문입니다.

## 비용 {#costs}

교인 200명 미만, 트래픽이 적은 소규모 교회의 실제 비용 범위는 다음과 같습니다.

| 구성 요소 | 대략적인 월 비용 |
|-----------|---------------------|
| Railway 기본 요금 | $5 |
| MySQL 플러그인 | $5 + 저장 공간 약 $1 |
| 웹 서비스 3개의 컴퓨팅 | 합계 $3~10 |
| 1GB 볼륨 | $0.25 |
| **합계** | **약 월 $15~25** |

비용은 트래픽, 사진 업로드, 데이터베이스 크기에 따라 선형으로 늘어납니다. Railway의 프로젝트 **Usage** 탭에서 실시간 사용량을 볼 수 있으며, 여기서 지출 한도를 설정해 노출을 제한할 수 있습니다.

## 문제 해결

| 증상 | 가능한 원인 | 해결 방법 |
|---------|--------------|-----------|
| `EBUSY: rmdir '/app/node_modules/.cache'`와 함께 빌드 실패 | Nixpacks 캐시 마운트 충돌 | 해당 서비스에 `NIXPACKS_NO_CACHE=true`를 설정하세요 |
| B1Admin 빌드가 `Missing: @types/...`와 함께 실패 | `package-lock.json`이 동기화되지 않음 | 최신 `main`을 가져오세요 |
| Api 배포가 "Deploying"에서 멈춤 | 상태 확인 실패 -- `/health`가 200을 반환하지 않음 | 배포 로그를 보세요. 보통 필수 환경 변수가 없는 경우입니다 |
| B1Admin에 "check your email"이 표시되지만 이메일이 도착하지 않음 | `MAIL_SYSTEM=SMTP`는 설정되었지만 자격 증명이 없거나 잘못됨 | 자격 증명을 고치거나, `MAIL_SYSTEM`을 비워서 이메일을 끄세요 |
| 로그인하면 `api.churchapps.org`로 이동함 | `REACT_APP_STAGE`가 `prod`임 | B1Admin 서비스에 `REACT_APP_STAGE=custom`을 설정하세요 |
| 서브도메인 교회들이 모두 같은 내용을 보여 줌 | `REACT_APP_B1_WEBSITE_URL`에 `{subdomain}` 토큰이 없음 | 예: `https://{subdomain}.yourchurch.org`로 설정하세요 |
| 사용자 지정 도메인에 "Application not found"가 표시됨 | DNS가 아직 반영되지 않았거나 Railway 인증서가 대기 중임 | 5분 기다리세요. `dig admin.yourchurch.org`로 DNS를 확인하세요 |

이 목록에 없는 문제가 생기면, 배포 로그를 첨부해 [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues)에 이슈를 등록하세요.

## 관련 문서

- **[Docker로 자체 호스팅하기](./docker.md)** -- 같은 스택을 직접 가진 하드웨어나 VPS에서 실행
- **[초기 설정](../../getting-started/initial-setup.md)** -- 교회를 만든 뒤 처음 할 일
- **[웹사이트 초기 설정](../../b1-admin/website/initial-setup.md)** -- 교회의 공개 사이트 구성
- **[헌금 설정](../../b1-admin/donations/online-giving-setup.md)** -- Stripe 또는 PayPal 연결
- **[API 로컬 설정](../api/local-setup.md)** -- 개발을 위해 스택을 로컬에서 실행
- **[API 배포(AWS)](./apis.md)** -- 공식 ChurchApps SaaS가 배포되는 방식
