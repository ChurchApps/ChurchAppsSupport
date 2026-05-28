---
title: "웹훅"
---

# 웹훅

<div class="article-intro">

웹훅을 사용하면 교회가 실시간 알림을 타사 도구(Zapier, Make, n8n과 같은 자동화 플랫폼, CRM, 회계 시스템 또는 HTTP POST를 허용하는 모든 것)로 푸시할 수 있습니다. B1에서 사람, 그룹 또는 가구가 변경되면 B1은 서명된 JSON 페이로드를 해당 이벤트에 구독된 모든 URL로 보냅니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **교회 설정 편집** 권한이 있는 교회 관리자가 웹훅을 등록하고 관리합니다
- 수신 엔드포인트는 공개 주소에서 **HTTPS**를 통해 연결할 수 있어야 합니다
- 서명 비밀을 안전하게 저장할 방법이 있어야 합니다 - 한 번만 표시됩니다

</div>

## 개요

웹훅은 **아웃바운드** 전용입니다. B1이 엔드포인트를 호출하며 B1을 호출하지 않습니다. 각 웹훅은 대상 URL, 서명 비밀 및 구독된 이벤트 목록으로 구성된 교회별 구독입니다.

전달은 **내구성 있는 아웃박스**를 사용합니다. 구독된 이벤트가 발생하면 B1은 전달 행을 기록하고 백그라운드 작업자가 약 1분 이내에 POST합니다. 실패한 전달은 지수 백오프로 재시도됩니다. 전달이 느리거나 엔드포인트가 일시적으로 다운된 경우에도 아무것도 손실되지 않습니다.

## 웹훅 등록

### B1Admin에서

**설정 → 웹훅 → 새 웹훅**으로 이동합니다. 이름, 페이로드 URL을 입력하고 구독할 이벤트를 선택합니다. 저장 시 **서명 비밀이 한 번 표시됩니다** -- 즉시 복사하여 통합과 함께 저장합니다. 다시는 표시되지 않습니다(나중에 회전할 수 있지만 원본을 검색할 수 없습니다).

### API를 통해

모든 엔드포인트는 Membership 모듈 기본 경로 `/membership/webhooks` 아래에 있으며 `Settings / Edit` 권한이 있는 교회 관리자의 JWT가 필요합니다.

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

생성 응답 - 그리고 **생성 응답만** - `secret`를 포함합니다.

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
| `GET /membership/webhooks` | 교회의 웹훅 나열 (비밀 생략) |
| `GET /membership/webhooks/events` | 유효한 이벤트 이름 카탈로그 |
| `GET /membership/webhooks/:id` | 하나의 웹훅 로드 |
| `POST /membership/webhooks` | 생성 (`id` 없음) 또는 업데이트 (`id` 포함) |
| `POST /membership/webhooks/:id/regenerate-secret` | 서명 비밀 회전; 새 값을 한 번 반환 |
| `DELETE /membership/webhooks/:id` | 웹훅 삭제 |
| `GET /membership/webhooks/:id/deliveries` | 웹훅의 최근 전달 시도 |
| `GET /membership/webhooks/deliveries/:deliveryId` | 하나의 전달에 대한 전체 페이로드 및 응답 |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | 전달 재대기 |

## 이벤트 카탈로그

이벤트 이름은 `{entity}.{action}` 패턴을 따릅니다. `GET /membership/webhooks/events`에서 라이브 목록을 가져옵니다.

| 이벤트 | 발생 시기 |
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

## 페이로드 형식

모든 전달은 JSON 본문 및 다음 헤더가 있는 HTTP `POST`입니다.

| 헤더 | 설명 |
|---|---|
| `Content-Type` | 항상 `application/json` |
| `X-B1-Event` | 이벤트 이름, 예: `person.created` |
| `X-B1-Delivery-Id` | 이 전달 시도의 고유 ID - 중복 제거에 사용 |
| `X-B1-Signature` | 원시 본문의 HMAC-SHA256 서명 (아래 참조) |
| `X-B1-Timestamp` | 요청이 전송된 Unix epoch 초 |
| `User-Agent` | `B1-Webhooks/1.0` |

본문은 변경된 리소스를 작은 봉투에 래핑합니다.

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

`*.destroyed` 이벤트의 경우 `data`에는 삭제된 레코드의 `id` 및 `churchId`만 포함됩니다.

## 서명 확인

페이로드를 신뢰하기 전에 항상 `X-B1-Signature`를 확인하세요. 서명은 `sha256=` 다음에 서명 비밀로 키가 지정된 **원시 요청 본문**의 16진수 HMAC-SHA256이 옵니다. 수신한 바이트에 대해 계산합니다 - 구문 분석된 JSON을 다시 직렬화하지 마세요.

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

서명이 일치하지 않는 요청은 거부합니다. 선택적으로 `X-B1-Timestamp`가 몇 분 이상 오래된 요청도 거부하여 재생 창을 제한합니다.

## 전달 및 재시도

엔드포인트는 가능한 한 빨리 `2xx` 상태로 응답해야 합니다 - 이상적으로는 작업을 처리한 후가 아니라 대기열에 추가한 후입니다. `2xx`가 아닌 응답, 연결 실패 또는 **10초**보다 느린 응답은 전달 실패로 간주됩니다.

실패한 전달은 지수 백오프로 재시도됩니다 - **약 5일 동안 16번 시도**. 간격은 1분에서 시작하여 시간을 거쳐 최종 시도의 경우 최대 3일 간격으로 증가합니다. 16번째 실패 시도 후 전달은 `exhausted`로 표시되고 중단됩니다.

전달은 **최소 한 번**입니다. 전달이 두 번 이상 도착할 수 있습니다(예: 엔드포인트가 성공했지만 응답이 손실된 경우). `X-B1-Delivery-Id` 헤더를 사용하여 중복 제거합니다 - 각 ID를 한 번만 처리하고 반복을 no-op로 처리합니다.

### 자동 비활성화

웹훅이 **연속 3개의 소진된 전달**을 생성하면 B1이 자동으로 비활성화합니다. 엔드포인트를 수정한 다음 B1Admin에서 웹훅을 다시 활성화합니다(또는 `"active": true`와 함께 `POST /membership/webhooks`를 통해).

## 검사 및 재전달

B1Admin의 웹훅 편집기는 **최근 전달** 테이블(이벤트, 상태, 시도 횟수, 응답 코드 및 타임스탬프)을 표시합니다. 행을 선택하면 전송된 전체 페이로드와 반환된 응답이 표시됩니다.

**재전달**을 사용하여 원래 페이로드로 과거 전달을 재대기합니다 - 엔드포인트의 버그를 수정한 후 또는 엔드포인트가 다운되어 있는 동안 놓친 이벤트를 백필하는 데 유용합니다.

## URL 요구 사항

웹훅 URL은 교회가 제공하므로 B1은 서버 측 요청 위조에 대한 보호를 시행합니다. 웹훅 URL은 등록 시 및 모든 전달 전에 다시 확인될 때 다음과 같은 경우 거부됩니다.

- **`https`**를 사용하지 않음
- `localhost`, `.local` / `.internal` 호스트 이름을 가리킴, 또는
- **개인, 루프백, 링크 로컬 또는 클라우드 메타데이터** IP 주소로 확인됨

엔드포인트는 공개적으로 연결 가능한 HTTPS 서비스여야 합니다.
