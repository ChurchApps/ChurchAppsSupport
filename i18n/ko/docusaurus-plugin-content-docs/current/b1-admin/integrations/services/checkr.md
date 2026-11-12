---
title: "Checkr"
description: "Make.com을 사용하여 B1 Admin의 봉사자 신청을 Checkr 신원 조회와 연결하고, 안전 사역 담당자를 위한 보고서 상태 알림을 선택적으로 설정하세요."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com)은 직원과 봉사자를 대상으로 신원 조회(배경 조사)를 수행합니다. 어린이나 청소년 프로그램을 운영하는 교회라면 거의 모두 필요로 하는 기능입니다. B1에는 **내장된 신원 조회 기능이 없습니다**. 조회 요청, 결과 추적, 심사 규정 준수는 모두 Checkr에서 이루어집니다. 아래 활용 예시는 B1 이벤트를 Checkr에 연결하기만 합니다. Checkr에는 Zapier 앱이 없지만, [Make.com의 Checkr 연동](https://www.make.com/en/integrations/checkr)은 검증되어 있으며, B1 이벤트에서 조회를 시작하는 데 필요한 작업을 제공합니다.

</div>

:::caution
이 활용 예시는 아직 출시되지 않은 B1.church Make 앱을 사용합니다([Make](../make.md) 참고). 출시되기 전까지는 이 시나리오의 B1 쪽을 Make의 **HTTP** 모듈로 B1의 [REST API](/docs/developer/api)를 호출하여 구성해야 합니다.
:::

<div class="prereqs">
<h4>시작하기 전에</h4>

- API 액세스가 가능하고 최소 하나의 심사 패키지가 설정된 [Checkr](https://checkr.com) 계정
- [Make](https://www.make.com) 계정
- **Edit Settings** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 항목 {#what-you-can-wire-up}

Make의 Checkr 앱은 트리거 1개와 작업 6개를 제공합니다:

| 방향 | B1 / Make 트리거 | 작업 |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (봉사자 그룹으로 필터링) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr 웹훅 (초대 / 보고서 이벤트) | B1: 사람의 기록 업데이트 (예: "Checkr cleared" 태그 추가) |

Make의 Checkr 작업: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. 그 외 검색 모듈 4개가 있습니다.

## 설정 {#setup}

### 1. B1 API 키 만들기 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**에서 다음을 설정하세요:

- `settings:write` — 트리거 웹훅용
- `people:read` — 조회를 시작할 때 사람의 이름과 이메일을 찾기 위해
- (선택 사항) 보고서 상태를 사용자 지정 필드나 태그로 다시 기록하려면 `people:write`

### 2. Make에서 "봉사자 신청 시 조회 시작" 시나리오 만들기 {#2-build-the-kick-off-a-check-on-volunteer-signup-scenario-in-make}

1. **Trigger** — B1.church: Watch Events (`group.member.added`).
2. **Filter** — `data.groupId`가 "Children's Volunteers"(또는 이에 해당하는 그룹)와 일치할 때만 계속 진행하세요.
3. **Action** — B1.church: Find Person(`data.personId` 기준)으로 이메일과 이름, 성을 가져오세요.
4. **Action** — Checkr: Create Candidate. 3단계의 이름, 성, 이메일을 매핑하세요.
5. **Action** — Checkr: Create Background Check Invitation. 4단계에서 만든 candidate id를 *candidate_id* 필드에 매핑하세요. 심사 패키지를 선택하세요(예: `tasker_standard` 또는 계정에서 제공하는 다른 패키지).
6. (선택 사항) **Action** — Slack: 안전 사역 담당자에게 조회가 시작되었다고 알리세요.

시나리오를 켜세요. 대상 그룹의 새 봉사자는 이메일로 Checkr 초대를 자동으로 받습니다. 봉사자가 휴대폰이나 노트북에서 이를 완료하면, Checkr이 심사를 진행합니다.

### 3. (선택 사항) 보고서 결과 받기 {#3-optional-receive-the-report-back}

1. **Trigger** — Checkr: Watch Events(웹훅). 시나리오를 켜면 Make가 Checkr 웹훅을 등록합니다.
2. **Filter** — `event_type = report.completed`인 경우에만 계속 진행하세요.
3. **Action** — Checkr: Get Report(웹훅의 보고서 id 사용).
4. **Action** — B1.church: Find Person(후보자 이메일 기준).
5. **Action** — 조건부 Slack / 이메일: `clear` / `consider` / `suspended` 상태를 담당자에게 알리세요.

참고: 현재 B1에는 "신원 조회 상태" 필드가 내장되어 있지 않습니다. 현실적인 방법은 (a) 검토를 위해 비공개 Slack 채널에 결과를 게시하거나, (b) 감사용으로 Google 시트에 기록하거나, (c) `clear`인 경우 사람을 B1의 "Cleared volunteers" 그룹에 추가하는 것입니다.

## 자주 쓰는 활용 예시 {#common-recipes}

### 봉사자를 2년마다 다시 조회하기 {#re-screen-volunteers-every-2-years}

위의 시나리오에 Make 일정 트리거를 결합하세요:

- **Trigger** — Make: Schedule (매월)
- **Action** — HTTP — Make a request: "Cleared volunteers" 그룹의 B1 `/membership/groupmembers?groupId=…`에 GET 요청(B1.church 앱에는 목록 작업이 없습니다)
- **Action** — Make 필터: 통과 날짜가 22개월보다 오래된 경우
- **Action** — Checkr: Create Background Check Invitation(초기 흐름과 동일)

### 조회가 끝날 때까지 1단계 접근 차단하기 {#block-stage-1-access-until-check-completes}

교회가 B1 그룹 구성원 자격으로 접근을 제한한다면(예: "Cleared" 그룹 구성원만 봉사 일정에 나타나도록), Checkr `report.completed` 이벤트가 상태를 바꿀 때까지 새 봉사자를 임시 그룹에 두세요.

## 제한 사항 및 참고 {#limits--notes}

- **Checkr은 대부분의 심사 패키지가 미국 전용입니다.** 호주, 영국, 캐나다의 교회는 다른 대안이 필요합니다.
- **요금은 조회 건당 부과됩니다.** Make에서 Create Invitation을 실행할 때마다 실제 조회가 1건씩 차감됩니다. 먼저 Checkr의 샌드박스 또는 스테이징 계정에서 테스트하세요(Make의 Checkr 앱은 연결에 입력한 인증 정보를 따르므로, 인증 정보를 바꾸면 샌드박스와 실제 환경이 전환됩니다).
- **Checkr API 액세스는 요금제에 따라 제한됩니다.** 규모가 작은 Checkr 계정은 UI 전용 요금제일 수 있으므로, API를 활성화하려면 Checkr에 문의하세요.

## 문제 해결 {#troubleshooting}

- **Create Candidate가 `403`으로 실패함** — Checkr API 토큰이 읽기 전용이거나 해당 계정 권한이 부족합니다. Checkr 대시보드에서 쓰기 권한이 있는 토큰을 다시 발급하세요.
- **초대가 도착하지 않음** — 3단계의 후보자 이메일을 확인하세요. B1에서 해당 사람의 이메일 필드가 비어 있을 수 있습니다. Checkr 단계 전에 이메일 필수 필터를 추가하세요.
- **웹훅 트리거가 실행되지 않음** — Make 계정이 발신 웹훅을 지원하는 유료 요금제가 아니면 Checkr의 웹훅 등록이 조용히 실패할 수 있습니다. Checkr 대시보드의 *Webhooks* 페이지에서 Make의 URL이 등록되어 있는지 확인하세요.

## 함께 보기 {#see-also}

- [Make(개요)](../make.md) — 모든 Make 시나리오의 B1 쪽 설정
- [Mobile Message](./mobile-message.md) — Zapier 앱이 없는 SMS 제공자용, Checkr Make 연결과 같은 웹훅/HTTP 방식
- [Checkr API 문서](https://docs.checkr.com/)
