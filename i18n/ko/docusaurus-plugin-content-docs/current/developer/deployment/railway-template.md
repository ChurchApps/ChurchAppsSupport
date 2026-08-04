---
title: "Railway에서 자체 호스팅하기"
---

# Railway에서 자체 호스팅하기

<div class="article-intro">

ChurchApps는 원클릭 [Railway](https://railway.com) 템플릿을 제공하며, 이를 통해 여러분의 교회는 B1 Admin, B1 회원 포털, API, MySQL 데이터베이스로 이루어진 자체 비공개 인스턴스를 -- 여러분이 소유하고 직접 비용을 지불하는 인프라 위에서 -- 가질 수 있습니다. 이 가이드는 약 15분 만에 서비스를 라이브로 올리는 방법을 안내하고, 이어서 대부분의 교회가 결국 필요로 하게 되는 배포 후 구성 작업을 설명합니다.

</div>

## 빠른 시작

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. 위의 **Deploy on Railway** 버튼을 클릭합니다.
2. Railway에 로그인(또는 무료 계정을 생성)하고 결제 수단을 추가합니다.
3. 아무것도 바꾸지 않고 **Deploy**를 클릭합니다 -- 모든 변수에는 합리적인 기본값이 설정되어 있습니다.
4. 네 개의 서비스가 초록색이 될 때까지 5~10분 기다립니다.
5. **B1Admin** 서비스 URL을 열고 **Register**를 클릭해 계정을 만듭니다. 첫 번째 계정은 자동으로 서버 관리자가 됩니다.
6. 앱 안내에 따라 첫 번째 교회를 생성합니다.

이것으로 끝입니다. 이제 완전히 동작하는 ChurchApps 인스턴스를 갖게 되었습니다. 아래 내용은 모두 선택적인 마무리 작업입니다.

:::tip
이 배포는 현재 **베타** 단계입니다. 문서에서 다루지 않는 문제를 만나면 배포 로그를 첨부해 [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues)에 이슈를 열어 주세요.
:::

<div class="prereqs">
<h4>필요한 것</h4>

- 무료 [Railway](https://railway.com) 계정
- Railway에 등록할 신용카드(소규모 교회 기준 월 약 $15~25; [비용](#costs) 참조)
- 초기 배포에 소요되는 약 15분
- *선택 사항이지만 나중에 강력히 권장:* SMTP 자격 증명과 사용자 지정 도메인

</div>

## 배포되는 항목

이 템플릿은 단일 Railway 프로젝트 안에 네 개의 서비스를 프로비저닝합니다.

| 서비스 | 목적 | 배포 후 URL |
|---------|---------|------------------|
| **MySQL** | 모든 데이터를 저장(단일 인스턴스, 여러 스키마) | 내부 전용 |
| **Api** | membership, content, giving, attendance 등을 위한 백엔드 | `https://api-<id>.up.railway.app` |
| **B1Admin** | 직원/관리자용 웹 앱 | `https://b1admin-<id>.up.railway.app` |
| **B1App** | 회원용 웹 앱 및 교회 웹사이트 | `https://b1app-<id>.up.railway.app` |

데이터베이스 스키마는 API의 시작 마이그레이션에 의해 최초 실행 시 자동으로 생성됩니다.

## 최초 구성

이제 서비스가 올라왔으니, 대부분의 교회가 대략 우선순위 순서로 다음에 설정하는 항목들입니다.

### 1. 이메일(강력 권장)

이메일이 없어도 회원은 여전히 등록하고 시스템을 사용할 수 있지만, **잊어버린 비밀번호를 스스로 재설정할 수는 없습니다** -- 관리자가 대신해 줘야 합니다. SMTP 설정에는 약 5분이 걸립니다.

Railway 대시보드에서 **Api** 서비스 → **Variables**를 열고 다음을 추가합니다.

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

알아 둘 만한 세 가지 제공자는 다음과 같습니다.

#### Resend -- 가장 간단한 무료 옵션(하루 100통)

1. [resend.com](https://resend.com)에서 가입합니다.
2. 발신 도메인을 인증합니다(또는 우선 `onboarding@resend.dev` 테스트 발신자로 시작합니다).
3. API 키를 생성합니다.
4. `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`로 설정합니다.

#### Gmail -- 개인용 무료(하루 약 500통)

1. Google 계정에서 2단계 인증을 활성화합니다.
2. [앱 비밀번호](https://myaccount.google.com/apppasswords)를 생성합니다.
3. `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<16자리 앱 비밀번호>`로 설정합니다.

#### AWS SES -- 대규모에서 가장 저렴

1. AWS에서 발신 도메인을 인증합니다.
2. 인증되지 않은 주소로 보낼 예정이면 SES 샌드박스에서 벗어납니다.
3. **SES → SMTP Settings → Create credentials**에서 SMTP 자격 증명을 만듭니다.
4. `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP 비밀번호>`로 설정합니다.

변수를 저장하면 Api 서비스가 자동으로 재배포됩니다. 테스트 계정에서 비밀번호 재설정을 트리거해 확인해 보세요.

:::warning
잘못된 자격 증명으로 `MAIL_SYSTEM=SMTP`를 설정하면 등록은 성공한 것처럼 보이지만 인증 이메일이 전혀 도착하지 않습니다. 자격 증명을 수정하거나 `MAIL_SYSTEM`을 해제해 이메일 없는 모드로 되돌리세요.
:::

### 2. 사용자 지정 도메인

기본 `*.up.railway.app` URL도 동작하지만, 대부분의 교회는 자신만의 도메인을 원합니다.

각 웹 서비스(B1Admin과 B1App)에 대해:

1. Railway에서 해당 서비스를 연 뒤 **Settings** → **Networking**으로 이동합니다.
2. **+ Custom Domain**을 클릭하고 호스트명을 입력합니다.
   - B1Admin의 경우 `admin.yourchurch.org`
   - B1App의 경우 `app.yourchurch.org`(또는 `www`)
3. Railway가 보여주는 CNAME 레코드를 여러분의 DNS 제공자에 추가합니다.
4. DNS가 전파되기까지 몇 분 기다립니다. Railway가 TLS 인증서를 자동으로 프로비저닝합니다.

그런 다음 이메일 안의 링크가 새 도메인을 사용하도록 **Api** 서비스 변수를 업데이트합니다.

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

그리고 **B1Admin** 서비스에서는 다음과 같이 설정합니다.

```
REACT_APP_API_BASE=https://api.yourchurch.org   (if you also set a custom API domain)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

`{subdomain}` 토큰은 리터럴 그대로 두는 값입니다 -- 런타임에 각 교회의 서브도메인으로 치환됩니다(아래 멀티사이트 항목 참조).

### 3. 멀티사이트(하나의 인스턴스에서 여러 교회 운영)

ChurchApps는 설계상 멀티테넌트입니다 -- 하나의 배포로 얼마든지 많은 교회를 호스팅할 수 있으며, 각 교회는 자체 사람, 그룹, 웹사이트를 가집니다. 새 교회는 전적으로 관리자 UI를 통해 추가되며, 인프라 변경은 필요하지 않습니다.

#### 추가 교회 등록하기

1. **B1 Admin**에서 **Settings → Manage Church → Switch Church → Create New**로 이동합니다.
2. 각 교회는 고유한 **서브도메인 슬러그**(예: `firstchurch`, `gracecommunity`)를 가집니다.
3. 새 교회는 자체 데이터, 회원, 웹사이트, 헌금 설정을 가지며 동일 인스턴스의 다른 교회들로부터 완전히 격리됩니다.

#### 각 교회를 자체 URL로 라우팅하기

교회를 공개적으로 노출하는 두 가지 방법이 있습니다.

| 패턴 | 예시 | 설정 |
|---------|---------|-------|
| **경로 기반**(기본 동작) | `app.yourchurch.org/firstchurch` | 추가 설정 불필요 |
| **서브도메인 기반**(더 깔끔한 URL) | `firstchurch.yourchurch.org` | 와일드카드 DNS + 와일드카드 사용자 지정 도메인 |

Railway에서 **서브도메인 기반** 라우팅을 사용하려면:

1. DNS 제공자에서 와일드카드 CNAME을 만듭니다: `*.yourchurch.org → <b1app railway target>`.
2. Railway의 B1App 서비스 → **Settings → Networking**에서 `*.yourchurch.org`를 사용자 지정 도메인으로 추가합니다.
3. **B1Admin** 서비스에서 `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`를 설정합니다.

재배포 후에는 각 교회의 사이트가 자동으로 `<their-subdomain>.yourchurch.org`에서 제공됩니다.

:::info
와일드카드 사용자 지정 도메인은 Railway 유료 플랜이 필요합니다. 경로 기반 라우팅은 모든 플랜에서 동작하며 기능적으로 동일합니다 -- 단지 URL 표시줄이 조금 덜 깔끔할 뿐입니다.
:::

### 4. 온라인 헌금(Stripe / PayPal)

헌금은 환경 변수가 아니라 **관리자 UI 안에서 교회별로** 구성됩니다 -- 이 방식 덕분에 각 교회가 자기만의 가맹점 계정을 사용할 수 있습니다.

1. [Stripe](https://dashboard.stripe.com/)(Developers → API keys) 또는 [PayPal](https://developer.paypal.com/)(My Apps & Credentials)에서 개발자 자격 증명을 발급받습니다.
2. B1 Admin에서 **Settings → Giving Settings**로 이동합니다.
3. 제공자를 선택하고 Public/Secret 키를 붙여넣은 다음 수수료 처리 방식을 구성합니다.
4. 선택적으로 Railway의 **Api** 서비스에 `GOOGLE_RECAPTCHA_SECRET_KEY`를 추가해 공개 헌금 양식을 봇으로부터 보호합니다.

### 5. 파일 저장소

템플릿은 회원 사진, 설교 파일, 업로드된 문서를 위해 Api 서비스에 마운트되는 **1GB 영구 볼륨**을 프로비저닝합니다.

용량을 늘리려면: Api 서비스 → **Volumes**를 열고 크기 슬라이더를 조정합니다.

더 큰 규모(100GB 이상 또는 다수의 동시 업로드)로 배포할 때는 **Api** 서비스에 다음을 설정해 S3로 전환하세요.

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

볼륨에 있던 기존 파일은 자동으로 마이그레이션되지 않습니다 -- 변수를 전환하기 전에 버킷으로 직접 복사하세요.

### 6. 선택적 기능 통합

아래 항목들은 특정 기능을 활성화하며 모두 나중에 Railway 대시보드에서 추가할 수 있습니다. **Api** 서비스에 설정하세요.

| 변수 | 활성화되는 기능 |
|----------|--------------------|
| `OPENAI_API_KEY` *또는* `OPENROUTER_API_KEY` | AI 지원 검색 및 콘텐츠 제안 |
| `YOUTUBE_API_KEY` | YouTube 설교 검색 및 임베드 |
| `PEXELS_KEY` | 웹사이트 빌더용 스톡 이미지 선택기 |
| `VIMEO_TOKEN` | Vimeo 설교 지원 |
| `API_BIBLE_KEY` | 레슨 및 콘텐츠의 성경 구절 조회 |
| `YOUVERSION_API_KEY` | YouVersion 성경 통합 |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | 브라우저 푸시 알림(VAPID 키 쌍 생성 필요) |
| `HUBSPOT_KEY` | 신규 등록에 대한 선택적 CRM 동기화 |

## 업데이트하기

각 서비스는 각자의 GitHub 저장소에 연결되어 있습니다. `ChurchApps/Api`, `ChurchApps/B1Admin`, `ChurchApps/B1App`의 `main`에 대한 푸시는 자동 재배포를 트리거합니다.

특정 버전을 고정하려면 각 서비스의 **Branch** 설정을 태그나 릴리스 브랜치로 변경하세요. 이는 프로덕션에 권장되는 설정입니다 -- `main`에서 자동 배포하면 진행 중인 작업까지 함께 물려받게 됩니다.

## 비용

소규모 교회(회원 200명 미만, 가벼운 트래픽) 기준 현실적인 범위는 다음과 같습니다.

| 구성 요소 | 대략적인 월 비용 |
|-----------|---------------------|
| Railway 기본 요금 | $5 |
| MySQL 플러그인 | $5 + 저장 공간 약 $1 |
| 웹 서비스 3개 컴퓨트 | 합산 $3~10 |
| 1GB 볼륨 | $0.25 |
| **합계** | **약 $15~25/월** |

비용은 트래픽, 사진 업로드, 데이터베이스 크기에 비례해 늘어납니다. Railway는 프로젝트의 **Usage** 탭에서 실시간 사용량을 보여줍니다 -- 지출 한도를 설정해 노출 위험을 제한하세요.

## 문제 해결

| 증상 | 가능성 있는 원인 | 해결 방법 |
|---------|--------------|-----|
| `EBUSY: rmdir '/app/node_modules/.cache'`로 빌드 실패 | Nixpacks 캐시 마운트 충돌 | 영향받는 서비스에 `NIXPACKS_NO_CACHE=true` 설정 |
| B1Admin에서 `Missing: @types/...`로 빌드 실패 | `package-lock.json` 동기화 불일치 | 최신 `main`을 가져오기 |
| Api 배포가 "Deploying" 상태에서 멈춤 | 헬스체크 실패 -- `/health`가 200을 반환하지 않음 | 배포 로그 확인; 보통 필수 환경 변수 누락 |
| B1Admin이 "이메일을 확인하세요"라고 표시하지만 이메일이 오지 않음 | `MAIL_SYSTEM=SMTP`는 설정됐지만 자격 증명이 누락/오류 | 자격 증명을 수정하거나 `MAIL_SYSTEM`을 해제해 이메일을 비활성화 |
| 로그인이 `api.churchapps.org`로 리다이렉트됨 | `REACT_APP_STAGE`가 `prod`로 설정됨 | B1Admin 서비스에서 `REACT_APP_STAGE=custom`으로 설정 |
| 서브도메인 교회들이 모두 같은 콘텐츠를 표시함 | `REACT_APP_B1_WEBSITE_URL`에 `{subdomain}` 토큰이 없음 | 예: `https://{subdomain}.yourchurch.org`로 설정 |
| 사용자 지정 도메인에서 "Application not found" 표시 | DNS가 아직 전파되지 않았거나 Railway 인증서 발급 대기 중 | 5분 기다린 후 `dig admin.yourchurch.org`로 DNS 확인 |

이 목록에 없는 문제를 만나면 배포 로그를 첨부해 [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues)에 이슈를 열어 주세요.

## 관련 문서

- **[Docker로 자체 호스팅하기](./docker)** -- 자체 하드웨어나 VPS에서 동일한 스택 운영하기
- **[초기 설정](../../getting-started/initial-setup)** -- 교회 생성 후 첫 단계
- **[웹사이트 초기 설정](../../b1-admin/website/initial-setup)** -- 교회의 공개 사이트 구성하기
- **[헌금 설정](../../b1-admin/donations/online-giving-setup)** -- Stripe 또는 PayPal 연동하기
- **[로컬 API 설정](../api/local-setup)** -- 개발용으로 스택을 로컬에서 실행하기
- **[API 배포(AWS)](./apis)** -- 공식 ChurchApps SaaS의 배포 방식
