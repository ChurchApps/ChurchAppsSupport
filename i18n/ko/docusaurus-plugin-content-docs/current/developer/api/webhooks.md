---
title: "웹훅"
---

# 웹훅

<div class="article-intro">

웹훅을 사용하면 교회가 실시간 알림을 서드파티 도구(Zapier, Make, n8n 같은 자동화 플랫폼, CRM, 회계 시스템, 또는 HTTP POST를 받을 수 있는 그 무엇이든)로 푸시할 수 있습니다. B1에서 사람, 그룹, 또는 가구가 변경되면 B1은 그 이벤트를 구독하는 모든 URL로 서명된 JSON 페이로드를 전송합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **교회 설정 편집** 권한을 가진 교회 관리자가 웹훅을 등록하고 관리합니다
- 수신 엔드포인트는 공개 주소에서 **HTTPS**로 접근 가능해야 합니다
- 서명 비밀 값을 안전하게 저장할 방법을 마련해 두세요 -- 이 값은 한 번만 표시됩니다

</div>

## 개요

웹훅은 **아웃바운드** 전용입니다: B1이 여러분의 엔드포인트를 호출하는 것이며, 여러분이 B1을 호출하지는 않습니다. 각 웹훅은 대상 URL, 서명 비밀 값, 구독 이벤트 목록으로 구성된 교회별 구독입니다.

전달에는 **내구성 있는 아웃박스(durable outbox)**가 사용됩니다: 구독된 이벤트가 발생하면 B1은 전달용 행(row)을 기록하고, 백그라운드 워커가 약 1분 이내에 이를 POST합니다. 실패한 전달은 지수 백오프로 재시도됩니다. 전달이 느리거나 엔드포인트가 잠시 다운되더라도 아무것도 유실되지 않습니다.

## 웹훅 등록하기

### B1Admin에서

**설정 → 개발자 → 웹훅 → 새 웹훅**으로 이동합니다. 이름, 페이로드 URL을 입력하고 구독할 이벤트를 선택합니다. 저장하면 **서명 비밀 값이 한 번만 표시됩니다** -- 즉시 복사하여 여러분의 통합 설정과 함께 저장해 두세요. 이후로는 다시 표시되지 않습니다(나중에 회전은 가능하지만 원본 값은 다시 조회할 수 없습니다).

### API를 통해

모든 엔드포인트는 Membership 모듈의 기본 경로인 `/membership/webhooks` 아래에 있으며, `Settings / Edit` 권한을 가진 교회 관리자의 JWT, **또는 `settings:write` 범위로 발급된 [API 키](./api-keys)** 중 하나가 필요합니다. 동일한 라우트가 둘 다 허용합니다. 이 덕분에 Zap이나 시나리오가 켜질 때 Zapier와 Make가 교회를 대신해 웹훅을 등록할 수 있습니다.

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

생성 응답 -- 그리고 **오직** 생성 응답만 -- `secret`을 포함합니다.

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
| `GET /membership/webhooks` | 교회의 웹훅 목록 조회(비밀 값 제외) |
| `GET /membership/webhooks/events` | 유효한 이벤트 이름 카탈로그 |
| `GET /membership/webhooks/:id` | 웹훅 하나 로드 |
| `POST /membership/webhooks` | 생성(`id` 없음) 또는 수정(`id` 있음) |
| `POST /membership/webhooks/:id/regenerate-secret` | 서명 비밀 값 회전; 새 값을 한 번 반환 |
| `DELETE /membership/webhooks/:id` | 웹훅 삭제 |
| `GET /membership/webhooks/:id/deliveries` | 해당 웹훅의 최근 전달 시도 내역 |
| `GET /membership/webhooks/deliveries/:deliveryId` | 특정 전달 건의 전체 페이로드 및 응답 |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | 전달 재대기열 등록 |

## 이벤트 카탈로그

이벤트 이름은 `{entity}.{action}` 패턴을 따릅니다. 최신 목록은 `GET /membership/webhooks/events`에서 가져올 수 있습니다.

| 이벤트 | 발생 시점 |
|---|---|
| `person.created` | 사람이 추가됨 |
| `person.updated` | 사람 레코드가 변경됨 |
| `person.destroyed` | 사람이 삭제됨 |
| `household.created` | 가구가 추가됨 |
| `household.updated` | 가구가 변경됨 |
| `household.destroyed` | 가구가 삭제됨 |
| `group.created` | 그룹이 추가됨 |
| `group.updated` | 그룹이 변경됨 |
| `group.destroyed` | 그룹이 삭제됨 |
| `group.member.added` | 사람이 그룹에 추가됨 |
| `group.member.removed` | 사람이 그룹에서 제거됨 |
| `donation.created` | 헌금이 기록됨 -- 수동 입력, 온라인, 또는 pending → complete 전환 |
| `donation.updated` | 헌금 레코드가 수정됨 |
| `attendance.recorded` | 출석이 기록됨(수동 입력 또는 체크인) |
| `session.created` | 새 출석 세션이 생성됨(수동 또는 첫 체크인 시 자동) |
| `form.submission.created` | 양식이 제출됨 |
| `event.created` | 캘린더 이벤트가 추가됨 |
| `event.updated` | 캘린더 이벤트가 수정됨 |
| `event.destroyed` | 캘린더 이벤트가 삭제됨 |

## 페이로드 형식

모든 전달은 다음 헤더를 가진 JSON 본문의 HTTP `POST`입니다.

| 헤더 | 설명 |
|---|---|
| `Content-Type` | 항상 `application/json` |
| `X-B1-Event` | 이벤트 이름, 예: `person.created` |
| `X-B1-Delivery-Id` | 해당 전달 시도의 고유 ID -- 중복 제거에 사용 |
| `X-B1-Signature` | 원본 본문의 HMAC-SHA256 서명(아래 참조) |
| `X-B1-Timestamp` | 요청이 전송된 시각(Unix epoch 초) |
| `User-Agent` | `B1-Webhooks/1.0` |

본문은 변경된 리소스를 작은 봉투(envelope) 형태로 감쌉니다.

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

`*.destroyed` 이벤트의 경우 `data`에는 삭제된 레코드의 `id`와 `churchId`만 포함됩니다.

페이로드가 다른 레코드를 id로 참조하는 이벤트에는 전달 시점에 해석된 사람이 읽을 수 있는 이름도 함께 실립니다: 그룹 멤버십 이벤트의 `personName`과 `groupName`, 출석·헌금·목록 멤버십 이벤트의 `personName`, `session.created`의 `groupName`, 그리고 `form.submission.created`의 `formName`(제출이 특정 사람과 연결되어 있으면 `personName`도 함께)이 그 예입니다.

## 커넥터 유형

기본 전달 형식은 위의 JSON 봉투이며 -- `connectorType: "standard"`입니다. [Slack과 Discord](/docs/b1-admin/integrations/slack-discord)의 경우 동일한 웹훅 엔진이 대신 해당 서비스가 직접 받아들일 수 있는 채팅 형태의 메시지를 게시합니다.

| `connectorType` | 전송되는 본문 | 사용 시점 |
|---|---|---|
| `"standard"`(기본값) | `{event, churchId, occurredAt, data}` 봉투, 서명됨 | 직접 통합을 작성하거나, Zapier / Make / 커스텀 서버를 대상으로 할 때 |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Slack Incoming Webhook URL로 바로 게시할 때 |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Discord 채널 웹훅 URL로 바로 게시할 때 |

커넥터 유형은 웹훅 편집기의 **커넥터 유형** 드롭다운에서, 또는 `POST /membership/webhooks` 본문의 `connectorType`을 통해 설정합니다. 서명된 `X-B1-Signature` 헤더는 Slack/Discord 전달에도 여전히 전송됩니다(둘 다 이를 무해하게 무시합니다). 따라서 나중에 웹훅을 다시 `standard`로 전환하더라도 재서명이 필요하지 않습니다.

## 테스트 전달

모든 웹훅 편집기에는 **테스트 이벤트 보내기** 버튼이 있습니다 -- 이에 대응하는 API 호출은 `POST /membership/webhooks/:id/test`입니다. 이 테스트 경로는 첫 번째 구독 이벤트에 대한 합성 페이로드를 만들어 실제 서명 전달 경로를 통해 동기적으로 발송하고(Slack/Discord의 경우 `formatForConnector`도 거칩니다), `responseStatus`와 `responseBody`를 포함한 결과 전달 행을 반환합니다. 실제로 통합을 켜기 전에 연결 상태와 서명 처리를 확인하는 데 사용하세요.

## 서명 검증하기

페이로드를 신뢰하기 전에 항상 `X-B1-Signature`를 검증하세요. 서명은 `sha256=` 뒤에, 여러분의 서명 비밀 값으로 키를 지정한 **원본 요청 본문**의 16진수 HMAC-SHA256 값이 붙는 형태입니다. 수신한 바이트 그대로에 대해 계산해야 합니다 -- 파싱된 JSON을 다시 직렬화하지 마세요.

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

서명이 일치하지 않는 요청은 모두 거부하세요. 선택적으로 `X-B1-Timestamp`가 몇 분 이상 오래된 요청도 거부하여 재생(replay) 가능 시간을 제한할 수 있습니다.

## SDK 지원

Node.js의 경우 `@churchapps/integration-sdk`가 타입이 지정된 검증기와, 원본 본문 캡처·서명 검증·봉투 파싱을 대신 처리해 주는 Express 미들웨어를 제공합니다.

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Capture the raw body before JSON parsing — required so the signature still verifies.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

SDK는 Express가 아닌 런타임(서버리스 함수, Fastify 등)을 위해 `WebhookVerifier.verify(secret, rawBody, signatureHeader)`도 제공합니다. 자세한 내용은 npm의 해당 패키지를 참조하세요.

## 전달 및 재시도

여러분의 엔드포인트는 가능한 한 빨리 `2xx` 상태로 응답해야 합니다 -- 이상적으로는 작업을 처리한 후가 아니라 큐에 넣기만 한 후입니다. `2xx`가 아닌 응답, 연결 실패, 또는 **10초**보다 느린 응답은 전달 실패로 간주됩니다.

실패한 전달은 지수 백오프로 재시도됩니다 -- **약 5일에 걸쳐 16회 시도**됩니다. 간격은 1분에서 시작해 시간 단위로 늘어나며, 마지막 시도들에서는 최대 3일 간격까지 커집니다. 16번째 시도가 실패하면 해당 전달은 `exhausted`로 표시되고 중단됩니다.

전달은 **최소 한 번(at-least-once)** 방식입니다: 예를 들어 엔드포인트가 성공했지만 응답이 유실된 경우처럼 동일한 전달이 두 번 이상 도착할 수 있습니다. `X-B1-Delivery-Id` 헤더로 중복을 제거하세요 -- 각 id를 한 번만 처리하고 반복된 요청은 아무 동작도 하지 않도록 다루세요.

### 자동 비활성화

웹훅이 **연속 3회 소진(exhausted)된 전달**을 만들어내면 B1이 자동으로 해당 웹훅을 비활성화합니다. 엔드포인트를 수정한 다음 B1Admin에서(또는 `"active": true`와 함께 `POST /membership/webhooks`를 호출해) 웹훅을 다시 활성화하세요.

## 확인 및 재전달

B1Admin의 웹훅 편집기에는 이벤트, 상태, 시도 횟수, 응답 코드, 타임스탬프를 보여주는 **최근 전달** 테이블이 있습니다. 행을 선택하면 전송된 전체 페이로드와 돌아온 응답을 확인할 수 있습니다.

**재전달**을 사용하면 원래 페이로드로 과거 전달을 다시 큐에 넣을 수 있습니다 -- 엔드포인트의 버그를 고친 후, 또는 다운되어 있는 동안 놓친 이벤트를 소급 처리할 때 유용합니다.

## URL 요구 사항

웹훅 URL은 교회가 제공하는 값이므로, B1은 서버 측 요청 위조(SSRF)를 막기 위한 보호 장치를 적용합니다. 웹훅 URL은 등록 시점 및 매 전달 전 재확인 시점에 다음 중 하나에 해당하면 거부됩니다.

- **`https`**를 사용하지 않음
- `localhost`, `.local` / `.internal` 호스트 이름을 가리킴, 또는
- **사설(private), 루프백, 링크 로컬, 또는 클라우드 메타데이터** IP 주소로 해석됨

엔드포인트는 공개적으로 접근 가능한 HTTPS 서비스여야 합니다.
