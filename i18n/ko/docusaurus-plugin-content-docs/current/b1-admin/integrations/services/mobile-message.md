---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au)는 호주 SMS API입니다 — Clearstream과 Text In Church가 미국 중심이기 때문에 AU 교회에 인기가 있으며 경쟁력 있는 AU 가격을 제공합니다. Mobile Message는 오늘 1등급 Zapier 앱이 없지만 공개 REST API를 게시합니다. **Zapier 웹훅**(또는 Make의 HTTP 모듈)을 통해 몇 분 내에 B1 이벤트를 Mobile Message 텍스트로 연결할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 등록된 발신자 ID와 API 자격 증명(API 사용자명 + *계정 → API 설정* 아래 암호)이 있는 [Mobile Message](https://mobilemessage.com.au) 계정
- [Zapier](https://zapier.com) 계정(또는 [Make](https://www.make.com))
- **설정 편집** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 것

Mobile Message의 API는 "SMS 전송" 모양입니다 — 트리거 없음, 아웃바운드 텍스트만. 따라서 레시피는 모두 B1 → SMS입니다:

| 방향 | B1 트리거 | 결과 |
|---|---|---|
| B1 → Mobile Message | `person.created` | 새 사람에게 환영 텍스트 |
| B1 → Mobile Message | `donation.created` | 기부자에게 감사 텍스트 |
| B1 → Mobile Message | `form.submission.created` | 대기 중인 팀 페이징 |
| B1 → Mobile Message | `event.created` | 목록에 미리 알림 방송 |

## 설정

### 1. B1 API 키 발급

**설정 → 개발자 → API 키 → 새 API 키**:

- `settings:write` — 트리거 웹훅을 등록하기 위해
- `people:read` — `personId`에서 수신자의 전화 번호를 찾아보기 위해

### 2. Zapier 웹훅으로 Zap 빌드

1. **트리거** — B1.church: 원하는 이벤트를 선택합니다(예: 새로운 기부).
2. **작업** — B1.church: 사람 찾기(`data.personId`를 사용하여) 전화 번호와 이름을 가져옵니다.
3. **작업** — Zapier 웹훅: **POST**. 아래와 같이 구성합니다.

POST 단계의 설정:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **페이로드 유형** — JSON
- **데이터** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "선물해주셔서 감사합니다, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **헤더** — `Content-Type: application/json`(Zapier 웹훅이 자동으로 추가함)
- **기본 인증** — *기본 인증* 필드를 `<api_username>|<api_password>`로 설정합니다(Zapier는 이것을 올바른 `Authorization: Basic …` 헤더로 변환합니다)

Zap을 켭니다. B1Admin에서 테스트 선물을 전송하여 텍스트가 도착하는 것을 확인합니다.

## 일반적인 레시피

### 당일 아침 이벤트 미리 알림

- **트리거** — Zapier로 스케줄(매일, 오전 7시)
- **작업** — B1.church: 오늘 이벤트 찾기(또는 고정 날짜 필터와 함께 찾기 단계를 사용하거나 오늘 이벤트 목록을 Google 시트에 저장)
- **작업** — Zapier 웹훅: 등록된 구독자 그룹에 이벤트 목록으로 Mobile Message에 POST합니다

### 목록 브로드캐스트에 배치 엔드포인트 사용

Mobile Message의 `/v1/messages` 엔드포인트는 호출당 최대 10,000개 메시지를 허용합니다. B1 그룹으로 브로드캐스트:

- **트리거** — B1.church: 새로운 양식 제출(특정 양식으로 필터)
- **작업** — B1.church: 대상 그룹의 그룹 멤버 나열(*Zapier 웹훅 — GET* 단계 사용 `/membership/groupmembers?groupId=…`)
- **작업** — Zapier 형식화 → 유틸리티 → 응답을 `messages` 배열로 라인 항목화
- **작업** — Zapier 웹훅: 전체 배열을 `/v1/messages`에 POST합니다

### Make 대안

Make를 선호하는 경우 B1 Watch Events 트리거 후 **HTTP — 요청 만들기** 모듈을 놓고 동일하게 구성합니다(POST, 기본 인증, JSON 본문). B1 측은 [Make 개요](../make)를 참조하세요.

## 제한 및 주의사항

- **기본 인증이 유일한 인증 방법입니다** — Mobile Message는 대시보드에서 사용자명과 암호를 발급합니다. 둘 다 비밀로 취급하세요.
- **`sender`는 등록된 발신자 ID여야 합니다** — Mobile Message 계정에 있거나 전송이 `400 Invalid sender`를 반환합니다. AU 규정에는 발신자 등록이 필요합니다.
- **호주 전화 번호**는 `0412345678`(지역) 또는 `+61412345678`(국제)이 될 수 있습니다. API는 둘 다 허용하지만 해외로도 전송하는 경우 `+61…`로 정규화합니다.
- **요청당 최대 10,000개 메시지** — 브로드캐스트에 유용하지만 단일 B1 웹훅 전달은 드물게 해당 크기의 목록을 내보냅니다. 예약된 벌크 Zap에 대해 배치 엔드포인트를 예약하세요.

## 문제 해결

- **POST가 `401 Unauthorized` 반환** — 기본 인증 자격 증명이 잘못되었습니다. Mobile Message 대시보드 *계정 → API 설정*에서 다시 복사합니다. 사용자명은 기본적으로 계정 이메일이며 별도의 API 키가 아닙니다.
- **POST가 `400 Invalid sender` 반환** — `sender` 값이 계정의 등록된 발신자 ID가 아닙니다. 먼저 Mobile Message 대시보드에서 등록합니다.
- **텍스트가 도착하지만 잘려 있음** — Mobile Message는 메시지를 ~160자로 나눕니다. 여러 부분으로 분할되면 부분별로 청구됩니다. 응답 본문을 확인합니다 — 부분 수를 알려줍니다.

## 참고도 보기

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — 네이티브 Zapier 앱이 있는 대체 SMS 제공자(Zapier 웹훅 단계 필요 없음)
- [Zapier(개요)](../zapier) — 모든 Zapier 레시피의 B1 측
- [Mobile Message API 문서](https://mobilemessage.com.au/api-documentation)
