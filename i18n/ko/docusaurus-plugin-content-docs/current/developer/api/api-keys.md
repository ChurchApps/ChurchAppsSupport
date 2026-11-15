---
title: "API 키"
description: "서버 스크립트와 Zapier, Make, Google Sheets 커넥터를 위해 B1 Admin에서 B1 API 키를 만들고, 범위를 지정하고, 폐기하세요. 전체 OAuth 흐름은 필요하지 않습니다."
---

# API 키

<div class="article-intro">

API 키(개인 액세스 토큰)는 서버 측 스크립트, 타사 커넥터(Zapier, Make, Google Sheets), 또는 전체 OAuth 흐름이 과한 모든 환경에서 B1 API에 인증하는 가장 간단한 방법입니다. 키는 특정 교회의 특정 사람에게 연결되며, 그 사람의 권한을 그대로 물려받되 선택적으로 지정하는 범위(scope)로 권한을 좁힐 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **설정 편집** 권한이 있는 교회 관리자가 키를 만들고 관리합니다.
- 원본 키는 생성할 때 **한 번만** 표시됩니다. 즉시 안전한 곳에 보관하세요.
- 모든 API 요청은 **HTTPS**를 사용해야 합니다.

</div>

## 키 형식 {#key-format}

B1 API 키는 다음과 같은 형태입니다.

```
cak_<prefix>.<secret>
```

- `cak_` — 고정 식별자입니다(인증 계층이 일치시키는 API 키 접두사).
- `<prefix>` — 8자의 공개 조회용 부분입니다.
- `<secret>` — 48자의 비밀 값입니다. 서버에는 SHA-256 해시만 저장됩니다.

전체 키는 표준 Bearer 헤더로 서버에 전달합니다.

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

API 인증 계층은 `cak_`로 시작하는 모든 토큰을 API 키 경로로 보내고, 비밀 값을 해시한 다음 접두사로 조회하여 키 소유자의 현재 권한을 확인합니다. 따라서 B1Admin에서 권한을 취소하면 다음 요청부터 즉시 적용되며, 키가 역할과 어긋나는 일은 없습니다.

## 키 만들기 (B1Admin) {#creating-a-key-b1admin}

1. **설정 편집** 권한이 있는 사용자로 B1Admin에 로그인합니다.
2. **설정 → 개발자 → API 키**를 엽니다.
3. **새 API 키**를 클릭하고, 알아보기 쉬운 **이름**(예: "Zapier — 헌금 동기화")을 입력합니다. 키에 부여할 **범위**를 최소 하나 이상 고르고, 필요하면 **만료일**을 선택합니다(만료되지 않는 키로 만들려면 비워 둡니다). 그다음 **저장**합니다.
4. 전체 `cak_…` 키가 대화상자에 **한 번만** 표시됩니다. 닫기 전에 연동 프로그램의 설정에 복사하세요. 나중에는 다시 조회할 방법이 없습니다. 필요하면 언제든 새 키를 만들 수 있습니다.

## 범위 {#scopes}

범위는 키가 할 수 있는 일을 **좁히는** 역할만 합니다. 기반 사용자가 가지지 않은 권한을 부여할 수는 없습니다. 범위가 없으면 키는 사용자의 전체 권한을 갖습니다. B1Admin에서는 항상 범위를 최소 하나 이상 고르도록 요구하므로, 범위가 없는 키는 API를 통해서만 만들 수 있습니다.

| 범위 | 허용 내용 |
|---|---|
| `people:read` / `people:write` | 교인, 가구, 그룹 구성원 조회 / 편집 |
| `groups:read` / `groups:write` | 그룹과 구성원 자격 조회 / 편집 |
| `donations:read` / `donations:write` | 헌금 조회 / 기록 |
| `attendance:read` / `attendance:write` | 출석, 세션, 체크인 조회 / 기록 |
| `forms:write` | 양식 관리(읽기 권한은 쓰기 권한에 포함됨) |
| `content:read` / `content:write` | 웹사이트 콘텐츠, 등록, 스트리밍 조회 / 편집 |
| `messaging:read` / `messaging:write` | 메시지 읽기, 쓰기 권한에는 SMS 발송도 포함 |
| `roles:read` / `roles:write` | 역할 정의 조회 / 편집 |
| `settings:read` / `settings:write` | 교회 설정 조회 / 편집(프로그램 방식으로 웹훅을 등록하려면 **필수**) |
| `workflows:read` / `workflows:write` | 워크플로와 할 일 조회 / 워크플로 실행 및 편집. 워크플로를 실행하면 이메일과 문자를 보내거나, 웹훅을 실행하거나, 그룹 구성원 자격을 바꿀 수 있습니다 |
| `offline_access` | 장기 갱신 토큰 허용(OAuth 흐름에서만 적용되며, API 키에는 영향이 없습니다) |

`write` 범위에는 대응하는 `read` 권한이 포함됩니다. 서버 및 도메인 관리자 권한은 범위로 노출되지 않습니다. 따라서 범위가 지정된 자격 증명으로는 사이트 관리 권한을 얻을 수 없습니다.

:::tip
웹훅 등록(예: Zapier나 Make 연동용)에 키를 사용한다면 `settings:write` 범위가 필요합니다. `people:read`만 있는 키는 `POST /membership/webhooks`에서 조용히 403 오류를 반환합니다.
:::

## 키 사용하기 {#using-a-key}

다른 Bearer 토큰과 같습니다. 인증이 필요한 모든 엔드포인트는 JWT를 받는 것과 똑같이 API 키를 받습니다.

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

키의 범위가 부족한 요청에는 권한 거부 오류와 같은 형식의 **403 Forbidden** 응답이 돌아옵니다.

## API로 키 관리하기 {#managing-keys-via-the-api}

모든 엔드포인트는 Membership 모듈의 `/membership/apiKeys` 경로 아래에 있으며, **설정 편집** 권한이 있는 교회 관리자의 JWT(API 키가 아님)가 필요합니다.

| 메서드와 경로 | 용도 |
|---|---|
| `GET /membership/apiKeys` | 교회의 키 목록 조회(비밀 값은 제외하고 `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`만 반환) |
| `GET /membership/apiKeys/scopes` | 사용 가능한 모든 범위 이름 목록. 키 생성 UI에 사용 |
| `POST /membership/apiKeys` | 새 키 생성. 본문: `{ "name": "...", "scopes": ["people:read"] }`. 응답에 원본 `cak_…` 키가 **한 번만** 포함됩니다. |
| `DELETE /membership/apiKeys/:id` | 키 폐기. 다음 요청부터 적용됩니다. |

폐기된 키는 즉시 무효화되며, 유예 기간은 없습니다.

## 권장 사항 {#best-practices}

- **연동 하나당 키 하나.** 문제가 생기면 다른 연동에 영향을 주지 않고 해당 키 하나만 폐기할 수 있습니다.
- **작동하는 가장 좁은 범위만 부여하세요.** Google Sheets 내보내기에는 `settings:write`가 아니라 `people:read`만 있으면 충분합니다.
- **실제 직원이 아닌 서비스 계정에 키를 연결하세요.** 직원이 떠나면 그 직원의 B1 접근 권한이 끝나고, 그 직원의 신원으로 만든 키도 함께 사라집니다.
- **키는 비밀 관리 도구에 보관하세요**(호스팅 제공업체의 환경 변수, AWS Secrets Manager 등). 소스 관리 시스템에 절대 넣지 마세요.
- 노출이 의심되면 **키를 교체하세요**. 새 키를 만들고, 연동을 업데이트한 다음, 이전 키를 삭제합니다.

## OAuth와의 차이 {#how-it-differs-from-oauth}

API 키는 **교회 한 곳만 연동을 사용할 때** 적합합니다. B1 커뮤니티 전체에서 공유되는 SaaS 앱처럼, 여러 교회가 각자 명시적으로 동의하여 접근을 허용하는 커넥터에는 [OAuth 및 연결된 앱](./connected-apps.md)을 사용하세요.

| | API 키 | OAuth |
|---|---|---|
| 설치하는 사람 | 교회 관리자 한 명 | 각 교회의 관리자가 앱을 승인 |
| 인증 헤더 | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| 토큰 수명 | 폐기 전까지 | 액세스 약 7일, 갱신 약 90일 |
| 적합한 용도 | 내부 스크립트, Zapier/Make/Sheets 커넥터 | 여러 교회를 대상으로 하는 타사 앱 |
