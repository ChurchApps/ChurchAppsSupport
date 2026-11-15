---
title: "Mobile Message"
description: "Zapier 또는 Make 웹훅을 사용하여 B1 Admin 이벤트를 호주의 SMS API인 Mobile Message에 연결하고, 환영, 헌금, 알림 문자를 보내세요."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au)는 호주의 SMS API입니다. Clearstream이나 Text In Church는 미국 중심인 반면, Mobile Message는 현지 번호를 제공하고 호주 요금이 경쟁력이 있어 호주 교회에서 인기가 많습니다. Mobile Message에는 현재 기본 Zapier 앱이 없지만, 공개 REST API를 제공하므로 **Webhooks by Zapier**(또는 Make의 HTTP 모듈)를 통해 몇 분 안에 B1 이벤트를 Mobile Message 문자에 연결할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 등록된 발신자 ID와 API 인증 정보(*Account → API Settings*의 API 사용자 이름 + 비밀번호)가 있는 [Mobile Message](https://mobilemessage.com.au) 계정
- [Zapier](https://zapier.com) 계정(또는 [Make](https://www.make.com))
- **Edit Settings** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 항목 {#what-you-can-wire-up}

Mobile Message의 API는 "SMS 보내기" 형태이며, 트리거가 없고 발신 문자만 있습니다. 따라서 활용 예시는 모두 B1 → SMS 방향입니다:

| 방향 | B1 트리거 | 결과 |
|---|---|---|
| B1 → Mobile Message | `person.created` | 새 사람에게 환영 문자 |
| B1 → Mobile Message | `donation.created` | 헌금자에게 감사 문자 |
| B1 → Mobile Message | `form.submission.created` | 당직 팀 호출 |
| B1 → Mobile Message | `event.created` | 목록에 알림 일괄 발송 |

## 설정 {#setup}

### 1. B1 API 키 만들기 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**에서 다음을 설정하세요:

- `settings:write` — 트리거 웹훅을 등록하기 위해
- `people:read` — `personId`로 수신자의 전화번호를 찾기 위해

### 2. Webhooks by Zapier로 Zap 만들기 {#2-build-the-zap-with-webhooks-by-zapier}

1. **Trigger** — B1.church: 원하는 이벤트를 선택하세요(예: New Donation).
2. **Action** — B1.church: Find Person(`data.personId` 사용)으로 전화번호와 이름을 가져오세요.
3. **Action** — Webhooks by Zapier: **POST**. 아래와 같이 설정하세요.

POST 단계의 설정:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json`(Webhooks by Zapier가 자동으로 추가합니다)
- **Basic Auth** — *Basic Auth* 필드에 `<api_username>|<api_password>`를 입력하세요(Zapier가 올바른 `Authorization: Basic …` 헤더로 변환합니다)

Zap을 켜세요. B1Admin에서 테스트 헌금을 하나 입력해 문자가 도착하는지 확인하세요.

## 자주 쓰는 활용 예시 {#common-recipes}

### 행사 당일 아침 알림 {#event-reminders-the-morning-of}

- **Trigger** — Schedule by Zapier(매일 오전 7시)
- **Action** — 오늘의 행사 목록을 Google 시트(또는 Zapier가 읽을 수 있는 다른 앱)에 보관하고 오늘 행을 조회하세요. B1의 Zapier 앱에는 행사를 찾는 작업이 없습니다.
- **Action** — Webhooks by Zapier: 등록된 구독자 그룹에게 행사 목록과 함께 Mobile Message로 POST

### 목록 일괄 발송에 batch 엔드포인트 사용하기 {#use-the-batch-endpoint-for-a-list-broadcast}

Mobile Message의 `/v1/messages` 엔드포인트는 한 번의 호출에 최대 10,000개의 메시지를 받습니다. B1 그룹에 일괄 발송하려면:

- **Trigger** — B1.church: New Form Submission(특정 양식으로 필터링)
- **Action** — Webhooks by Zapier: `/membership/groupmembers?groupId=…`에 GET 요청을 보내 대상 그룹의 구성원을 가져오세요(B1의 Zapier 앱에는 이를 위한 목록 작업이 없습니다. API 키는 `Authorization: Bearer cak_…` 헤더로 보내세요)
- **Action** — Formatter by Zapier → Utilities → Line-itemize: 응답을 `messages` 배열로 변환
- **Action** — Webhooks by Zapier: 전체 배열을 `/v1/messages`에 POST

### Make 대안 {#make-alternative}

Make를 선호한다면, B1 Watch Events 트리거 뒤에 **HTTP — Make a request** 모듈을 놓고 같은 방식(POST, Basic Auth, JSON 본문)으로 설정하세요. B1 쪽 설정은 [Make 개요](../make.md)를 참고하세요. B1.church Make 앱은 아직 출시되지 않았다는 점에 유의하세요.

## 제한 사항 및 참고 {#limits--notes}

- **Basic Auth가 유일한 인증 방식입니다** — Mobile Message는 대시보드에서 사용자 이름과 비밀번호를 발급합니다. 두 가지 모두 비밀로 취급하세요.
- **`sender`는 Mobile Message 계정에 등록된 발신자 ID여야 합니다.** 그렇지 않으면 `400 Invalid sender`가 반환됩니다. 호주 규정에 따라 발신자 등록이 필요합니다.
- **호주 전화번호**는 `0412345678`(국내 형식) 또는 `+61412345678`(국제 형식)으로 입력할 수 있습니다. API는 둘 다 받아들이지만, 해외에도 보낸다면 `+61…` 형식으로 통일하세요.
- **요청당 최대 10,000개 메시지** — 일괄 발송에 유용하지만, 단일 B1 웹훅 전송에서 이렇게 큰 목록이 나오는 경우는 드뭅니다. batch 엔드포인트는 예약된 대량 Zap을 위해 남겨 두세요.

## 문제 해결 {#troubleshooting}

- **POST가 `401 Unauthorized`를 반환함** — Basic Auth 인증 정보가 잘못되었습니다. Mobile Message 대시보드의 *Account → API Settings*에서 다시 복사하세요. 사용자 이름은 기본적으로 별도의 API 키가 아니라 계정 이메일이라는 점에 유의하세요.
- **POST가 `400 Invalid sender`를 반환함** — `sender` 값이 계정에 등록된 발신자 ID가 아닙니다. 먼저 Mobile Message 대시보드에서 등록하세요.
- **문자는 도착하지만 잘림** — Mobile Message는 약 160자를 넘는 메시지를 여러 부분으로 나누며, 부분마다 요금이 청구됩니다. 응답 본문에서 부분 수를 확인할 수 있습니다.

## 함께 보기 {#see-also}

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — 기본 Zapier 앱이 있는 대안 SMS 제공자(Webhooks by Zapier 단계가 필요 없습니다)
- [Zapier(개요)](../zapier.md) — 모든 Zapier 활용 예시의 B1 쪽 설정
- [Mobile Message API 문서](https://mobilemessage.com.au/api-documentation)
