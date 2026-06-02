---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com)(이전 Integromat)는 시각적 워크플로우 자동화 플랫폼입니다 — Zapier와 정신이 비슷하지만 더 유연한 로직과 규모에 따른 더 저렴한 청구서입니다. 공식 B1.church Make 앱을 사용하면 B1 이벤트에 즉시 반응하고 B1에 기록을 다시 쓰는 "시나리오"를 빌드할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- [Make](https://www.make.com) 계정(무료 계층은 작은 워크플로우를 포함)
- B1Admin의 **설정 편집** 권한이 있는 교회 관리자
- 빌드하려는 시나리오에 대한 대략적인 아이디어

</div>

## 모듈

| 유형 | 무엇 | B1 이벤트 / 엔드포인트 |
|---|---|---|
| **즉시 트리거** | 이벤트 감시 | 구독된 B1 이벤트(`person.created`, `donation.created`, …) |
| **작업** | 사람 생성 | 새 사람 추가 |
| **작업** | 기부 추가 | 기부 기록 |
| **작업** | 그룹 멤버 추가 | 사람을 그룹에 추가 |
| **검색** | 사람 검색 | 이름 또는 이메일로 사람 찾기 |

즉시 트리거를 사용하면 수신 대기할 이벤트를 선택할 수 있습니다 — 시나리오당 하나의 트리거 모듈, 이벤트별로 구성됨.

## 설정

### 1. B1 API 키 생성

1. B1Admin에서 **설정 → 개발자 → API 키**로 이동합니다.
2. **새 API 키**를 클릭하고 이름을 "Make"로 지정한 후 필요한 범위를 부여합니다.
3. **`settings:write`를 포함하세요** — 시나리오가 즉시 트리거를 사용하는 경우 Make는 당신을 대신하여 웹훅을 등록합니다.
4. 또한 작업 모듈이 필요로 하는 범위를 부여합니다(예: 기부 추가 모듈의 경우 `donations:write`).
5. 저장하고 `cak_…` 키를 복사합니다.

### 2. 연결 설치

1. Make에서 새 시나리오를 빌드하고 **B1.church** 트리거 모듈을 캔버스에 놓습니다.
2. 메시지가 표시되면 **연결 생성**을 합니다. API 키를 *API 키* 필드에 붙여넣고 *API 기본 URL*을 `https://api.churchapps.org`로 둡니다(스테이징에 대해 테스트하는 경우 제외).
3. **저장**을 클릭합니다 — Make는 교회 프로필을 읽음으로써 키를 테스트합니다.

연결은 Make 계정에 저장되며 시나리오 전체에서 재사용됩니다.

### 3. 트리거 구성

1. **이벤트 감시** 모듈의 설정을 엽니다.
2. 원하는 이벤트를 선택하세요 — 예: `donation.created`.
3. 저장합니다. Make는 고유한 웹훅 URL을 생성하고 내부적으로 저장합니다.

### 4. 다운스트림 모듈 추가

Make의 수백 개 앱 모듈 — Mailchimp, Google Sheets, Slack, HubSpot, 자신의 HTTP 엔드포인트 등을 캔버스에 놓습니다. 트리거의 출력(`event`, `churchId`, `data.id`, `data.amount`, …)을 해당 입력 필드에 매핑합니다. Make의 평탄화 / 반복자 / 라우터 / 집계 모듈은 Zapier에서 어려울 분기 및 병렬 흐름을 빌드할 수 있게 합니다.

### 5. 시나리오 켜기

시나리오 헤더에서 **활성**을 전환합니다. Make는 B1의 `POST /membership/webhooks`을 호출하여 URL을 등록합니다. 그 순간부터 모든 일치하는 B1 이벤트는 실시간으로 시나리오를 통과합니다.

시나리오를 끄면 `DELETE /membership/webhooks/{id}`가 호출되므로 고아 구독이 없습니다.

## 일반적인 레시피

### 기부를 Google 시트에 동기화하여 재무 검토

- **트리거** — B1: 이벤트 감시(`donation.created`)
- **작업** — Google Sheets: 행 추가. `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId`를 시트의 열로 매핑합니다.

### 기부 금액별 조건부 Slack 알림

- **트리거** — B1: 이벤트 감시(`donation.created`)
- **라우터**:
  - 분기 A — 필터: `data.amount >= 1000` → Slack: `#major-gifts` 게시
  - 분기 B — 통과 → Slack: `#donations` 게시

### 새 사람 → CRM + 환영 이메일 + Slack

- **트리거** — B1: 이벤트 감시(`person.created`)
- **작업** — HubSpot: 연락처 생성
- **작업** — Mailgun: 환영 이메일 전송
- **작업** — Slack: `#new-people` 알림(병렬 — Make의 라우터 사용)

## 즉시 트리거 작동 방식

즉시 트리거는 폴링이 아닌 웹훅 기반입니다 — 활성화될 때 Make는 생성된 URL과 선택한 이벤트로 `POST /membership/webhooks`를 호출합니다. B1에서 이벤트가 실행되면 B1은 봉투를 Make의 URL에 POST하고 시나리오는 몇 초 내에 실행됩니다. 시나리오를 비활성화하면 웹훅이 제거됩니다.

트리거는 **시나리오가 활성일 때** 발생하는 이벤트에만 실행됩니다. 역채우기가 없습니다.

## 제한 및 주의사항

- **이벤트당 하나의 Watch Events 모듈.** 하나의 시나리오에서 여러 이벤트를 수신하려면 여러 트리거 모듈을 별도 시나리오에 놓습니다(또는 합집합된 이벤트 목록이 있는 단일 모듈 사용 — 아래 참조).
- **서명 검증이 노출되지 않습니다** — Make는 시나리오에 `X-B1-Signature`를 통과하지 않습니다. 신뢰 경계는 Make의 추측 불가능한 시나리오별 웹훅 URL입니다. 이것은 정상적인 Make 관행입니다. 명시적 서명 검사가 필요한 경우 대신 [SDK](/docs/developer/api/webhooks#sdk-support)로 맞춤 통합을 빌드하세요.
- **작업 수** — 작업 모듈의 모든 API 호출은 B1 측의 어떤 항목도 아닌 Make 작업 할당량에 계산됩니다.

## 문제 해결

- **연결 테스트 실패** — 대부분 API 키의 오타입니다. B1Admin에서 다시 복사하세요(전체 키는 한 번만 표시됨. 잃어버렸다면 새 키를 생성하세요).
- **트리거 모듈이 활성화되지 않음** — B1Admin에서 **설정 → 개발자 → 웹훅**을 확인하세요. 시나리오를 활성화한 후 "Make — &lt;event&gt;" 행이 표시되지 않으면 키에 `settings:write`가 없습니다. 키를 업데이트하고 시나리오를 다시 활성화하세요.
- **작업이 `403 Forbidden`을 반환함** — API 키에는 해당 엔드포인트의 범위가 없습니다. 예를 들어 기부 추가에는 `donations:write`가 필요합니다. B1Admin에서 키를 업데이트하고 다시 테스트하세요.

## 앱 사용자 정의

B1.church Make 앱은 오픈소스입니다 — JSON 정의는 `B1Integrations/Make/` 저장소에 있습니다. 존재하지 않는 모듈이 필요한 경우(예: 다루지 않은 엔드포인트에 대한 새 작업) 거기에서 문제 또는 PR을 열어주세요.

## 참고도 보기

- [Zapier](./zapier) — 더 간단한 UI와 더 큰 앱 카탈로그를 가진 동일한 패턴
- [Slack & Discord](./slack-discord) — Make 없이 내장 채팅 알림
- [웹훅(개발자 참조)](/docs/developer/api/webhooks)
