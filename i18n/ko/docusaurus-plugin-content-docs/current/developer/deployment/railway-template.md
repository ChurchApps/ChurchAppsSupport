---
title: "Railway에서 자체 호스팅"
---

# Railway에서 자체 호스팅

<div class="article-intro">

ChurchApps는 원클릭 [Railway](https://railway.com) 템플릿을 게시하여 교회에 B1 Admin, B1 회원 포털, API, MySQL 데이터베이스의 자신의 비공개 인스턴스를 제공합니다 -- 모두 자신이 소유하고 직접 지불하는 인프라에서 실행됩니다. 이 가이드는 약 15분 안에 라이브 상태로 만들고 대부분의 교회가 결국 원하는 배포 후 구성을 안내합니다.

</div>

## 빠른 시작

[![Railway에 배포](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. 위의 **Railway에 배포** 버튼을 클릭합니다.
2. Railway(또는 무료 계정 생성)에 로그인하고 결제 방법을 추가합니다.
3. 아무것도 변경하지 않고 **배포**를 클릭합니다 -- 모든 변수는 합리적인 기본값을 가집니다.
4. 4개 서비스가 초록색으로 변할 때까지 5-10분을 기다립니다.
5. **B1Admin** 서비스 URL을 열고, **등록**을 클릭하고, 계정을 생성합니다. 첫 번째 계정은 자동으로 서버 관리자입니다.
6. 앱 내 메시지를 따라 첫 번째 교회를 생성합니다.

그게 다입니다. 이제 완전히 작동하는 ChurchApps 인스턴스를 가졌습니다. 아래의 모든 것은 선택적 마무리입니다.

:::tip
배포는 현재 **베타**입니다. 문서가 다루지 않는 것을 발생하면 배포 로그와 함께 [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues)에서 문제를 열어주세요.
:::

<div class="prereqs">
<h4>필요한 것</h4>

- 무료 [Railway](https://railway.com) 계정
- Railway에서 파일에 있는 신용 카드 (작은 회중의 경우 월 약 15-25달러; [비용](#costs) 참고)
- 초기 배포를 위한 약 15분
- *나중에 강력히 권장되지만 선택:* SMTP 자격 증명 및 사용자 정의 도메인

</div>

## 배포되는 것

템플릿은 단일 Railway 프로젝트에서 4개 서비스를 프로비저닝합니다:

| 서비스 | 목적 | 배포 후 URL |
|---------|---------|------------------|
| **MySQL** | 모든 데이터 저장 (한 인스턴스, 여러 스키마) | 내부만 |
| **Api** | 회원, 콘텐츠, 기부금, 출석 등에 대한 백엔드 | `https://api-<id>.up.railway.app` |
| **B1Admin** | 직원/관리자 웹 앱 | `https://b1admin-<id>.up.railway.app` |
| **B1App** | 회원 면향 웹 앱 및 교회 웹사이트 | `https://b1app-<id>.up.railway.app` |

데이터베이스 스키마는 첫 번째 시작 시 API의 시작 마이그레이션에 의해 자동으로 생성됩니다.

## 첫 번째 구성

이제 나타났으므로, 대부분의 교회가 다음으로 설정하는 것이 있습니다. 대략 우선순위 순서대로:

### 1. 이메일 (강력히 권장)

이메일이 없으면 구성원은 여전히 등록하고 시스템을 사용할 수 있지만, **그들은 잊혀진 암호를 재설정할 수 없습니다** -- 관리자가 그들을 위해 해야 합니다. SMTP 설정에는 약 5분이 소요됩니다.

Railway 대시보드에서 **Api** 서비스 → **변수**를 열고 다음을 추가합니다:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

알아둘 가치가 있는 3개의 제공자:

#### Resend -- 간단한 무료 옵션 (100 이메일/일)

1. [resend.com](https://resend.com)에 등록합니다.
2. 전송 도메인을 확인합니다(또는 `onboarding@resend.dev` 테스트 발신자를 사용하여 시작합니다).
3. API 키를 생성합니다.
4. `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`로 설정합니다.

#### Gmail -- 개인용 무료 (~500/일)

1. Google 계정에서 2단계 인증을 활성화합니다.
2. [앱 비밀번호](https://myaccount.google.com/apppasswords)를 생성합니다.
3. `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<16자 앱 비밀번호>`로 설정합니다.

#### AWS SES -- 규모에서 가장 저렴함

1. AWS에서 전송 도메인을 확인합니다.
2. SES 샌드박스를 벗어나십시오(비확인 주소로 전송하는 경우).
3. **SES → SMTP 설정 → 자격 증명 생성**에서 SMTP 자격 증명을 생성합니다.
4. `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP 비밀번호>`로 설정합니다.

변수를 저장한 후 Api 서비스가 자동으로 다시 배포됩니다. 테스트 계정에서 비밀번호 재설정을 트리거하여 테스트합니다.

:::warning
나쁜 자격 증명으로 `MAIL_SYSTEM=SMTP`를 설정하면 등록이 성공한 것처럼 보이지만 확인 이메일이 절대 도착하지 않습니다. 자격 증명을 수정하거나 `MAIL_SYSTEM`을 설정 해제하여 이메일 없음 모드로 돌아갑니다.
:::

### 2. 사용자 정의 도메인

기본 `*.up.railway.app` URL은 작동하지만 대부분의 교회는 자신의 것을 원합니다.

각 웹 서비스(B1Admin 및 B1App)에 대해:

1. Railway에서 서비스를 열고 → **설정** → **네트워킹**을 선택합니다.
2. **+ 사용자 정의 도메인**을 클릭하고 호스트명을 입력합니다:
   - B1Admin의 경우 `admin.yourchurch.org`
   - B1App의 경우 `app.yourchurch.org` (또는 `www`)
3. Railway가 표시하는 CNAME 기록을 DNS 제공자에 추가합니다.
4. DNS가 전파될 때까지 몇 분을 기다립니다. Railway는 자동으로 TLS 인증서를 프로비저닝합니다.

그런 다음 **Api** 서비스 변수를 업데이트하므로 이메일의 링크가 새 도메인을 사용합니다:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

**B1Admin** 서비스에서:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (if you also set a custom API domain)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

`{subdomain}` 토큰은 리터럴입니다 -- 각 교회의 서브도메인으로 런타임에 대체됩니다(아래 멀티사이트 참고).

### 3. 멀티사이트 (한 인스턴스에 여러 교회)

ChurchApps는 멀티테넌트 설계입니다 -- 한 배포가 여러 교회를 호스팅할 수 있으며, 각각 자신의 사람, 그룹, 웹사이트를 가집니다. 새 교회는 관리자 UI를 통해 완전히 추가됩니다; 인프라 변경이 필요하지 않습니다.

#### 추가 교회 추가

1. **B1 Admin**에서 **설정 → 교회 관리 → 교회 전환 → 새로 생성**으로 이동합니다.
2. 각 교회는 고유한 **서브도메인 슬래그**(예: `firstchurch`, `gracecommunity`)를 가집니다.
3. 새 교회는 자신의 데이터, 구성원, 웹사이트, 기부금 설정을 얻고, 같은 인스턴스의 다른 교회로부터 완전히 격리됩니다.

#### 각 교회를 자신의 URL으로 라우팅

공개적으로 교회를 노출하는 2가지 방법:

| 패턴 | 예 | 설정 |
|---------|---------|-------|
| **경로 기반** (기본적으로 작동) | `app.yourchurch.org/firstchurch` | 추가 설정 없음 |
| **서브도메인 기반** (더 깨끗한 URL) | `firstchurch.yourchurch.org` | 와일드카드 DNS + 와일드카드 사용자 정의 도메인 |

Railway의 **서브도메인 기반** 라우팅의 경우:

1. DNS 제공자에서 와일드카드 CNAME을 생성합니다: `*.yourchurch.org → <b1app railway target>`.
2. Railway에서 B1App 서비스 → **설정 → 네트워킹**에서 `*.yourchurch.org`를 사용자 정의 도메인으로 추가합니다.
3. **B1Admin** 서비스에서 `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`를 설정합니다.

재배포 후 각 교회의 사이트는 `<their-subdomain>.yourchurch.org`에서 자동으로 제공됩니다.

:::info
와일드카드 사용자 정의 도메인은 유료 Railway 계획이 필요합니다. 경로 기반 라우팅은 모든 계획에서 작동하고 기능적으로 동일합니다 -- 단지 URL 바에서 덜 예쁠 뿐입니다.
:::

### 4. 온라인 기부금 (Stripe / PayPal)

기부금은 환경 변수를 통해가 아닌 관리자 UI **내부에서 교회별로 구성됩니다** -- 그 방법 각 교회는 자신의 가맹점 계정을 사용할 수 있습니다.

1. [Stripe](https://dashboard.stripe.com/) (개발자 → API 키) 또는 [PayPal](https://developer.paypal.com/) (내 앱 & 자격 증명)에서 개발자 자격 증명을 가져옵니다.
2. B1 Admin에서 **설정 → 기부금 설정**으로 이동합니다.
3. 제공자를 선택하고, 공개 및 비밀 키를 붙여넣고, 수수료 처리를 구성합니다.
4. 선택적으로 **Api** 서비스의 Railway에 `GOOGLE_RECAPTCHA_SECRET_KEY`를 추가하여 공개 기부금 양식을 봇으로부터 보호합니다.

### 5. 파일 저장소

템플릿은 Api 서비스에 마운트된 **1GB 지속적 볼륨**을 프로비저닝합니다. 회원 사진, 설교 파일, 업로드된 문서에 사용됩니다.

커지게: Api 서비스 → **볼륨**을 열고 크기 슬라이더를 조정합니다.

더 큰 배포(100+ GB 또는 많은 동시 업로드)의 경우, 다음을 **Api** 서비스에 설정하여 S3으로 전환합니다:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

볼륨의 기존 파일은 자동으로 마이그레이션되지 않습니다 -- 변수를 플립하기 전에 버킷에 복사합니다.

### 6. 선택적 기능 통합

이것들은 특정 기능을 잠금 해제하고 모두 나중에 Railway 대시보드를 통해 추가할 수 있습니다. **Api** 서비스에서 설정합니다.

| 변수 | 활성화하는 기능 |
|----------|--------------------|
| `OPENAI_API_KEY` *또는* `OPENROUTER_API_KEY` | AI 지원 검색 및 콘텐츠 제안 |
| `YOUTUBE_API_KEY` | YouTube 설교 검색 및 임베딩 |
| `PEXELS_KEY` | 웹사이트 빌더용 스톡 이미지 선택기 |
| `VIMEO_TOKEN` | Vimeo 설교 지원 |
| `API_BIBLE_KEY` | 수업 및 콘텐츠의 성경 구절 조회 |
| `YOUVERSION_API_KEY` | YouVersion 성경 통합 |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | 브라우저 푸시 알림 (VAPID 키페어 생성) |
| `HUBSPOT_KEY` | 새 등록을 위한 선택적 CRM 동기화 |

## 업데이트

각 서비스는 각각의 GitHub 저장소에 연결됩니다. `ChurchApps/Api`, `ChurchApps/B1Admin` 또는 `ChurchApps/B1App`의 `main`에 대한 푸시는 자동 재배포를 트리거합니다.

특정 버전을 고정하려면 각 서비스의 **분기** 설정을 태그 또는 릴리스 분기로 변경합니다. 이것은 프로덕션 권장 설정입니다 -- `main`에서 자동 배포는 진행 중인 작업을 상속한다는 의미입니다.

## 비용

작은 교회(200명 미만 회원, 가벼운 트래픽)에 대한 실제 범위:

| 구성 요소 | 약 월별 비용 |
|-----------|---------------------|
| Railway 기본 | $5 |
| MySQL 플러그인 | $5 + ~$1 저장소 |
| 3개 웹 서비스 계산 | $3-10 합산 |
| 1GB 볼륨 | $0.25 |
| **합계** | **~$15-25/월** |

비용은 트래픽, 사진 업로드, 데이터베이스 크기로 선형으로 확장됩니다. Railway는 프로젝트의 **사용 현황** 탭에서 라이브 사용을 표시합니다 -- 노출을 캡핑할 지출 제한을 설정합니다.

## 문제 해결

| 증상 | 가능한 원인 | 수정 |
|---------|--------------|-----|
| 빌드 실패 `EBUSY: rmdir '/app/node_modules/.cache'` | Nixpacks 캐시 마운트 충돌 | 영향을 받은 서비스에 `NIXPACKS_NO_CACHE=true`로 설정 |
| B1Admin에서 빌드 실패 `Missing: @types/...` | 동기화되지 않은 `package-lock.json` | 최신 `main`을 가져옵니다 |
| Api 배포 "배포 중에" 걸림 | 건강 검사 실패 -- `/health`가 200을 반환하지 않음 | 배포 로그를 봅니다; 일반적으로 누락된 필수 환경 변수 |
| B1Admin은 "이메일 확인" 하지만 이메일이 도착하지 않음 | `MAIL_SYSTEM=SMTP` 설정되었지만 자격 증명 누락/잘못됨 | 자격 증명을 수정하거나 `MAIL_SYSTEM`을 설정 해제하여 이메일을 비활성화합니다 |
| 로그인이 `api.churchapps.org`로 리디렉션 | `REACT_APP_STAGE`는 `prod` | B1Admin 서비스에서 `REACT_APP_STAGE=custom`으로 설정 |
| 서브도메인 교회가 모두 동일한 콘텐츠 표시 | `REACT_APP_B1_WEBSITE_URL`에 `{subdomain}` 토큰이 없음 | 예를 들어 `https://{subdomain}.yourchurch.org`로 설정합니다 |
| 사용자 정의 도메인이 "애플리케이션을 찾을 수 없음"을 표시 | DNS가 아직 전파되지 않았거나 Railway 인증서 보류 중 | 5분 기다립니다; `dig admin.yourchurch.org`로 DNS 확인 |

이 목록에 없는 것을 발생하면 배포 로그와 함께 [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues)에서 문제를 열어주세요.

## 관련 문서

- **[초기 설정](../../getting-started/initial-setup)** -- 교회가 생성된 후 첫 단계
- **[웹사이트 초기 설정](../../b1-admin/website/initial-setup)** -- 교회의 공개 사이트 구성
- **[기부금 설정](../../b1-admin/donations/online-giving-setup)** -- Stripe 또는 PayPal 설정
- **[로컬 API 설정](../api/local-setup)** -- 개발용 스택 로컬 실행
- **[API 배포 (AWS)](./apis)** -- 공식 ChurchApps SaaS 배포 방법
