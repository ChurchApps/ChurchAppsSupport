---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks를 통해 교회는 실시간 알림을 타사 도구로 푸시할 수 있습니다. 자동화 플랫폼 (Zapier, Make, n8n), CRM, 회계 시스템 또는 HTTP POST를 수락하는 모든 것입니다. B1에서 사람, 그룹 또는 가족이 변경되면 B1은 해당 이벤트를 구독하는 모든 URL로 서명된 JSON 페이로드를 보냅니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **교회 설정 편집** 권한이 있는 교회 관리자가 webhooks를 등록하고 관리합니다
- 수신 엔드포인트는 공개 주소에서 **HTTPS** 위에서 도달 가능해야 합니다
- 서명 암호를 안전하게 저장할 방법이 필요합니다. 한 번만 표시됩니다

</div>

## 개요

Webhooks는 **아웃바운드 전용**입니다: B1이 엔드포인트를 호출하고 반대가 아닙니다. 각 webhook는 대상 URL, 서명 암호, 구독한 이벤트 목록으로 구성된 교회별 구독입니다.

배달은 **지속 가능한 아웃박스**를 사용합니다: 구독한 이벤트가 발생하면 B1은 배달 행을 기록하고 백그라운드 워커가 약 1분 이내에 이를 POST합니다. 실패한 배달은 지수 백오프로 재시도됩니다. 배달이 느리거나 엔드포인트가 일시적으로 다운되어도 아무것도 손실되지 않습니다.

## Webhook 등록

### B1Admin에서

**설정 → 개발자 → Webhooks → 새로운 Webhook**으로 이동합니다. 이름, 페이로드 URL을 입력하고 구독할 이벤트를 선택합니다. 저장 시 **서명 암호가 한 번 표시됩니다**. 즉시 복사하여 통합과 함께 저장합니다. 다시 표시되지 않습니다 (나중에 회전할 수 있지만 원본을 검색할 수 없음).

### API를 통해

모든 엔드포인트는 Membership 모듈 기본 경로 `/membership/webhooks` 아래에 있으며 `Settings / Edit` 권한이 있는 교회 관리자로부터의 JWT 또는 **`settings:write` 범위로 민팅된 [API 키](./api-keys)** 중 하나가 필요합니다. 동일한 라우트가 모두 수락합니다. 이것이 Zap 또는 시나리오가 켜질 때 Zapier와 Make가 교회를 대신하여 webhooks를 등록할 수 있게 합니다.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

생성 응답 (그리고 **생성 응답만**) `secret`을 포함합니다:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| 메서드 및 경로 | 목적 |
|---|---|
| `GET /membership/webhooks` | 교회의 webhooks 나열 (암호 생략) |
| `GET /membership/webhooks/events` | 유효한 이벤트 이름의 카탈로그 |
| `GET /membership/webhooks/:id` | 하나의 webhook 로드 |
| `POST /membership/webhooks` | 생성 (id 없음) 또는 업데이트 (id 포함) |
| `POST /membership/webhooks/:id/regenerate-secret` | 서명 암호 회전; 새 값을 한 번 반환 |
| `DELETE /membership/webhooks/:id` | Webhook 삭제 |
| `GET /membership/webhooks/:id/deliveries` | Webhook의 최근 배달 시도 |
| `GET /membership/webhooks/deliveries/:deliveryId` | 한 배달의 전체 페이로드 및 응답 |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | 배달 재대기열 |

## 이벤트 카탈로그

이벤트 이름은 `{entity}.{action}` 패턴을 따릅니다. `GET /membership/webhooks/events`에서 라이브 목록을 가져옵니다.

| 이벤트 | 발생하는 경우 |
|---|---|
| `person.created` | 사람이 추가됨 |
| `person.updated` | 사람 기록이 변경됨 |
| `person.destroyed` | 사람이 삭제됨 |
| `household.created` | 가족이 추가됨 |
| `household.updated` | 가족이 변경됨 |
| `household.destroyed` | 가족이 삭제됨 |
| `group.created` | 그룹이 추가됨 |
| `group.updated` | 그룹이 변경됨 |
| `group.destroyed` | 그룹이 삭제됨 |
| `group.member.added` | 사람이 그룹에 추가됨 |
| `group.member.removed` | 사람이 그룹에서 제거됨 |
| `donation.created` | 선물이 기록됨 - 수동 입력, 온라인 또는 대기 중 → 완료 전환 |
| `donation.updated` | 기부 기록이 편집됨 |
| `attendance.recorded` | 방문이 로깅됨 (수동 입력 또는 체크인) |
| `session.created` | 새로운 참석 세션이 생성됨 (수동 또는 첫 체크인에서 자동) |
| `form.submission.created` | 양식이 제출됨 |
| `event.created` | 달력 이벤트가 추가됨 |
| `event.updated` | 달력 이벤트가 편집됨 |
| `event.destroyed` | 달력 이벤트가 삭제됨 |

## 페이로드 형식

모든 배달은 JSON 본문 및 다음 헤더가 있는 HTTP `POST`입니다:

| 헤더 | 설명 |
|---|---|
| `Content-Type` | 항상 `application/json` |
| `X-B1-Event` | 이벤트 이름 (예: `person.created`) |
| `X-B1-Delivery-Id` | 이 배달 시도의 고유 id. 중복 제거에 사용합니다 |
| `X-B1-Signature` | 원본 본문의 HMAC-SHA256 서명 (아래 참조) |
| `X-B1-Timestamp` | 요청이 전송되었을 때 Unix epoch 초 |
| `User-Agent` | `B1-Webhooks/1.0` |

본문은 변경된 리소스를 작은 봉투로 래핑합니다:

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

`*.destroyed` 이벤트의 경우 `data`에는 삭제된 기록의 `id`와 `churchId`만 포함됩니다.

다른 기록을 id로 참조하는 페이로드를 가진 이벤트는 배달 시간에 해결되는 사람 가능 이름도 제공합니다: 그룹 구성원 이벤트에 `personName`과 `groupName`, 참석, 기부 및 리스트 구성원 이벤트에 `personName`, `session.created`에 `groupName`, 그리고 `form.submission.created`에 `formName` (제출이 사람에 연결되어 있을 때 `personName`).

## 커넥터 유형

기본 배달 형식은 위의 JSON 봉투입니다 - `connectorType: "standard"`. [Slack 및 Discord](/docs/b1-admin/integrations/slack-discord)의 경우 동일한 webhook 엔진은 대신 이 서비스가 직접 수락하는 채팅 형태의 메시지를 게시합니다:

| `connectorType` | 전송된 본문 | 사용하는 경우 |
|---|---|---|
| `"standard"` (기본값) | `{event, churchId, occurredAt, data}` 봉투, 서명됨 | 자신의 통합을 작성 중이거나 Zapier / Make / 사용자 정의 서버를 지정하고 있음 |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Slack 수신 Webhook URL로 직접 게시 중 |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Discord 채널 webhook URL로 직접 게시 중 |
| `"mailchimp"` | 해당 사항 없음 - 커넥터가 Mailchimp API 자체를 호출함 | [청중 동기화](/docs/b1-admin/integrations/services/mailchimp)를 원함. 호스팅할 URL 없음 |

커넥터 유형은 webhook 편집기의 **커넥터 유형** 드롭다운 또는 `POST /membership/webhooks` 본문의 `connectorType`을 통해 설정됩니다. 서명된 `X-B1-Signature` 헤더는 여전히 Slack/Discord 배달을 위해 전송됩니다 (무해하게 무시함). 따라서 나중에 webhook을 다시 `standard`로 전환해도 재서명이 필요하지 않습니다.

Slack과 Discord는 순수 본문 개형입니다. 엔진은 여전히 교회 제공 URL로 POST합니다. `mailchimp`은 대신 HTTP 교환을 소유하는 첫 번째 커넥터입니다: 이벤트당 Mailchimp API (`MailchimpConnector.deliver`)에 대해 인증된 upsert/archive/tag 요청을 발행하며, 자격 증명 (`{apiKey, audienceId}`)은 `webhooks.connectorConfig`에서 AES 암호화로 저장되고 API를 통해 쓰기 전용입니다. Mailchimp webhooks는 사람, 그룹 구성원 및 리스트 구성원 이벤트만 수락합니다. 저장 라우트는 수락하기 전에 키와 청중을 Mailchimp에 대해 확인합니다. 매핑되지 않은 상황 (이메일이 없는 사람, 매핑이 없는 이벤트)은 재시도를 소모하는 대신 `Skipped:` 응답 본문으로 성공 처리됩니다.

## 테스트 배달

모든 webhook 편집기에는 **테스트 이벤트 전송** 버튼이 있습니다. 해당 API 호출은 `POST /membership/webhooks/:id/test`입니다. 테스트 라우트는 첫 번째 구독 이벤트에 대한 종합 페이로드를 작성하고 실제 서명 배달 경로 (그리고 Slack/Discord의 경우 `formatForConnector`를 통해)를 통해 이를 동기적으로 전달하며 `responseStatus`와 `responseBody`를 포함한 결과 배달 행을 반환합니다. 통합을 실제로 켜기 전에 연결성 및 서명 처리를 확인하는 데 사용합니다. `mailchimp` webhooks의 경우 테스트는 대신 저장된 자격 증명을 Mailchimp API에 대해 검증 (종합 이벤트는 교회의 실제 청중에 가짜 구독자를 쓸 것임)하고 행을 생성하지 않고 배달 형태의 결과를 반환합니다.

## 서명 확인

페이로드를 신뢰하기 전에 항상 `X-B1-Signature`를 확인합니다. 서명은 `sha256=` 뒤에 **원본 요청 본문**의 hex HMAC-SHA256이고 서명 암호로 키 설정됩니다. 받은 바이트에 대해 계산합니다. 파싱된 JSON을 다시 직렬화하지 않습니다.

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

서명이 일치하지 않는 모든 요청을 거부합니다. 선택적으로 재생 윈도우를 제한하기 위해 `X-B1-Timestamp`가 몇 분 이상 오래된 요청도 거부합니다.

## SDK 지원

Node.js의 경우, `@churchapps/integration-sdk`는 형식화된 검증자 및 원본 본문 캡처, 서명 확인 및 봉투 파싱을 처리하는 Express 미들웨어를 제공합니다:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// JSON 파싱 전에 원본 본문을 캡처합니다. 서명이 계속 검증되려면 필수입니다.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

SDK는 비 Express 런타임 (서버리스 함수, Fastify 등)을 위해 `WebhookVerifier.verify(secret, rawBody, signatureHeader)`도 노출합니다. npm의 패키지를 참조합니다.

## 배달 및 재시도

엔드포인트는 `2xx` 상태로 가능한 한 빨리 응답해야 합니다. 이상적으로는 처리한 후가 아닌 작업을 큐에 대기한 후입니다. 0이 아닌 `2xx` 응답, 연결 실패 또는 **10초**보다 느린 응답은 실패한 배달로 계산됩니다.

실패한 배달은 지수 백오프로 재시도됩니다. **대략 5일에 걸쳐 16회 시도**. 간격은 1분에서 시간으로 증가하고 최종 시도의 경우 3일 간격까지 증가합니다. 16번째 실패 시도 후 배달이 `exhausted`로 표시되고 포기됩니다.

배달은 **최소한 한 번**입니다: 배달은 두 번 이상 도착할 수 있습니다 (예: 엔드포인트가 성공하지만 응답이 손실된 경우). `X-B1-Delivery-Id` 헤더를 사용하여 중복 제거합니다. 각 id를 한 번만 처리하고 반복을 무작동으로 취급합니다.

### 자동 비활성화

Webhook이 **3개의 연속된 소진 배달**을 생성하면 B1이 자동으로 비활성화합니다. 엔드포인트를 수정한 후 B1Admin에서 webhook을 다시 활성화합니다 (또는 `POST /membership/webhooks`를 `"active": true`로 통해).

## 검사 및 재배달

B1Admin의 webhook 편집기는 **최근 배달** 테이블을 보여줍니다. 이벤트, 상태, 시도 횟수, 응답 코드 및 타임스탬프입니다. 행을 선택하면 전송된 전체 페이로드와 반환된 응답이 표시됩니다.

**재배달**을 사용하여 과거 배달을 원본 페이로드로 재대기열합니다. 엔드포인트의 버그를 수정한 후 또는 엔드포인트가 다운된 동안 놓친 이벤트를 채우는 데 유용합니다.

## URL 요구 사항

Webhook URL은 교회 제공이므로 B1은 서버 측 요청 위조에 대한 가드를 적용합니다. Webhook URL은 거부됩니다. 등록 및 모든 배달 전에 다시 확인됨. URL이 다음인 경우:

- **`https`**를 사용하지 않는 경우
- `localhost`, `.local` / `.internal` 호스트명, 또는
- **개인, 루프백, 링크 로컬, 또는 클라우드 메타데이터** IP 주소로 확인되는 경우

엔드포인트는 공개적으로 도달 가능한 HTTPS 서비스여야 합니다.
