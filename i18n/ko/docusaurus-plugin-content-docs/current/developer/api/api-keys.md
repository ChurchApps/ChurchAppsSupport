---
title: "API 키"
---

# API 키

<div class="article-intro">

API 키(개인 액세스 토큰)는 서버 측 스크립트, 타사 커넥터(Zapier, Make, Google Sheets) 또는 전체 OAuth 흐름이 과하지 않은 곳에서 B1 API에 대해 인증하는 가장 간단한 방법입니다. 키는 특정 교회의 특정 사람에게 바인딩되고 그 사람의 권한을 상속하며, 선택 사항 범위 집합으로 축소됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **설정 편집** 권한이 있는 교회 관리자가 키를 생성 및 관리합니다
- 원본 키는 생성 시 **한 번** 표시됩니다 -- 즉시 안전한 곳에 저장합니다
- 모든 API 요청은 **HTTPS**를 사용해야 합니다

</div>

## 키 형식

B1 API 키는 다음과 같습니다:

```
cak_<prefix>.<secret>
```

- `cak_` -- 고정 식별자 (인증 계층이 일치하는 API 키 접두사)
- `<prefix>` -- 8자 공개 조회 세그먼트
- `<secret>` -- 48자 비밀; 서버 측에만 SHA-256 해시 저장됨

전체 키는 표준 bearer 헤더로 서버에 제공됩니다:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

API 인증 계층은 `cak_`로 시작하는 모든 토큰을 API 키 경로로 라우팅하고, 비밀을 해시하며, 접두사로 조회하고, 키의 사람의 현재 권한을 해결합니다 -- 따라서 B1 Admin에서 권한을 철회하면 다음 요청에 적용되고, 키는 절대 역할과 동기화되지 않습니다.

## 키 생성 (B1 Admin)

1. **설정 편집** 권한이 있는 사용자로 B1 Admin에 로그인합니다.
2. **설정 → 개발자 → API 키**를 엽니다.
3. **새 API 키**를 클릭하고 인식 가능한 이름(예: "Zapier -- 기부금 동기화")을 지정하고 키가 가져야 할 범위를 선택한 후 **저장**합니다.
4. 전체 `cak_…` 키가 대화 상자에 **한 번** 표시됩니다. 닫기 전에 통합의 구성에 복사합니다 -- 나중에 검색할 수 있는 방법이 없습니다. 언제든지 새 키를 생성할 수 있습니다.

## 범위

범위는 키가 수행할 수 있는 작업을 **좁히며** -- 기본 사람이 가지지 않은 권한을 절대 부여할 수 없습니다. 빈 / 범위 없음은 키가 사람의 전체 권한 집합을 가집니다.

| 범위 | 허용 |
|---|---|
| `people:read` / `people:write` | 사람, 가정, 그룹 구성원 보기 / 편집 |
| `groups:read` / `groups:write` | 그룹 및 그 멤버십 보기 / 편집 |
| `donations:read` / `donations:write` | 기부금 보기 / 기록 |
| `attendance:read` / `attendance:write` | 출석, 세션, 체크인 보기 / 기록 |
| `forms:write` | 양식 관리 (읽기 액세스는 쓰기에 암시됨) |
| `content:read` / `content:write` | 웹사이트 콘텐츠, 등록, 스트리밍 보기 / 편집 |
| `messaging:read` / `messaging:write` | 메시지 읽기; 쓰기는 SMS 전송도 허용 |
| `roles:read` / `roles:write` | 역할 정의 보기 / 편집 |
| `settings:read` / `settings:write` | 교회 설정 보기 / 편집 (**프로그래매틱으로 웹훅 등록에 필요**) |
| `offline_access` | 장기 새로고침 토큰 허용 (OAuth 흐름만 -- API 키에 효과 없음) |

`write` 범위는 일치하는 `read`를 암시적으로 포함합니다. 서버 및 도메인 관리자 권한은 의도적으로 범위로 노출되지 않습니다 -- 범위 지정된 자격 증명은 사이트 관리로 결코 상승할 수 없습니다.

:::tip
웹훅을 등록하는 데 키를 사용하는 경우(예: Zapier 또는 Make 통합), 키에 `settings:write`가 필요합니다. `people:read`만 하는 키는 `POST /membership/webhooks`에서 자동으로 403을 합니다.
:::

## 키 사용

bearer 토큰과 동일합니다 -- 모든 인증 끝점은 API 키를 JWT와 정확히 동일하게 허용합니다:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

범위가 부족한 키의 요청은 **403 금지됨**이고 권한 거부 오류는 동일한 모양을 사용합니다.

## API를 통해 키 관리

모든 끝점은 Membership 모듈의 `/membership/apiKeys` 경로에 있으며 **설정 편집** 권한이 있는 교회 관리자의 JWT(API 키 아님)를 요구합니다.

| 방법 및 경로 | 목적 |
|---|---|
| `GET /membership/apiKeys` | 교회의 키 나열 (비밀 없음 -- `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`만) |
| `GET /membership/apiKeys/scopes` | 사용 가능한 모든 범위 이름 목록 -- 키 생성 UI의 경우 |
| `POST /membership/apiKeys` | 새 키를 생성합니다. 본문: `{ "name": "...", "scopes": ["people:read"] }`. 응답은 원본 `cak_…` 키를 **한 번** 포함합니다. |
| `DELETE /membership/apiKeys/:id` | 키를 철회합니다 -- 다음 요청에 적용됩니다 |

철회된 키는 즉시 사라집니다 -- 유예 기간이 없습니다.

## 모범 사례

- **통합당 하나의 키.** 뭔가 손상되면 다른 것을 깨지 않고 단일 키를 철회합니다.
- **작동하는 가장 좁은 범위를 발급합니다.** Google Sheets 내보내기는 `settings:write`가 아닌 `people:read`만 필요합니다.
- **키를 실제 직원이 아닌 서비스 계정에 바인딩합니다.** 직원이 떠나면 B1 액세스가 끝나고, 그들의 ID 하에서 발급된 모든 키도 마찬가지입니다.
- **비밀 관리자에 키를 저장합니다** (호스팅 제공자의 환경 변수, AWS Secrets Manager 등) -- 절대 소스 제어에 저장하지 마세요.
- **의심 노출 시 키를 회전합니다:** 새 키를 생성하고, 통합을 업데이트한 후 이전 키를 삭제합니다.

## OAuth와의 차이점

API 키는 **교회만 통합을 사용하는 경우**에 적절합니다. B1 커뮤니티를 통해 공유되는 각 교회의 명시적 동의로 많은 교회에 액세스해야 하는 커넥터의 경우 -- SaaS 앱과 같은 -- 대신 [OAuth 및 연결된 앱](./connected-apps)을 사용합니다.

| | API 키 | OAuth |
|---|---|---|
| 누가 설치하나요 | 한 교회 관리자 | 각 교회 관리자가 앱을 인증합니다 |
| 인증 헤더 | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| 토큰 수명 | 철회될 때까지 | 액세스 ≈ 7일, 새로고침 ≈ 90일 |
| 최적 사용 처 | 내부 스크립트, Zapier/Make/Sheets 커넥터 | 멀티테넌트 타사 앱 |
