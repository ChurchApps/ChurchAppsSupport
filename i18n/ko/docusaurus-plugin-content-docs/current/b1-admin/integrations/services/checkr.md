---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com)는 직원 및 자원봉사자에 대한 신원조회(background screening)를 실행합니다. 이는 어린이 또는 청소년 프로그램을 운영하는 모든 교회에서 거의 보편적으로 필요한 기능입니다. B1에는 **신원조회 기능이 내장되어 있지 않습니다**. 검사 주문, 결과 추적, 검사 규정 준수는 모두 Checkr에서 관리되며, 아래 레시피는 B1 이벤트를 연결할 뿐입니다. Checkr은 Zapier 앱이 없지만 [Make.com의 Checkr 통합](https://www.make.com/en/integrations/checkr)은 검증되었으며 B1 이벤트에서 검사를 시작하는 데 필요한 작업을 노출합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- [Checkr](https://checkr.com) 계정이 있고 API 액세스 및 최소 1개의 검사 패키지가 구성됨
- [Make](https://www.make.com) 계정
- **Edit Settings** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 것

Make의 Checkr 앱은 1개의 트리거와 6개의 작업을 노출합니다:

| 방향 | B1 / Make 트리거 | 작업 |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (자원봉사자 그룹으로 필터링) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook (초대장 / 보고서 이벤트) | B1: 사람의 기록 업데이트(예: "Checkr cleared" 태그) |

Make의 Checkr 작업: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. 그리고 4개의 검색 모듈.

## 설정

### 1. B1 API 키 생성

**Settings → Developer → API Keys → New API Key**:

- `settings:write` -- 트리거 webhook용
- `people:read` -- 검사를 시작할 때 사람의 이름/이메일을 조회하기 위해
- (선택 사항) 보고서 상태를 사용자 정의 필드 또는 태그로 다시 작성하려면 `people:write`

### 2. Make에서 "자원봉사자 등록 시 검사 시작" 시나리오 구축

1. **트리거** -- B1.church: Watch Events (`group.member.added`).
2. **필터** -- `data.groupId`가 "Children's Volunteers"(또는 동등한) 그룹과 일치하는 경우에만 계속합니다.
3. **작업** -- B1.church: Find Person (`data.personId`로) 이메일 + 이름/성을 가져옵니다.
4. **작업** -- Checkr: Create Candidate. 3단계에서 이름/성/이메일을 매핑합니다.
5. **작업** -- Checkr: Create Background Check Invitation. 4단계의 새 후보 ID를 *candidate_id* 필드에 매핑합니다. 검사 패키지를 선택합니다(예: `tasker_standard` 또는 계정이 노출하는 것).
6. (선택 사항) **작업** -- Slack: 검사가 시작되었음을 안전 사역 조율자에게 알립니다.

시나리오를 켭니다. 대상 그룹의 새 자원봉사자는 이메일로 자동 Checkr 초대를 받습니다. 휴대폰이나 노트북에서 완료하고 Checkr이 검사를 실행합니다.

### 3. (선택 사항) 보고서 받기

1. **트리거** -- Checkr: Watch Events (webhook). Make는 활성화 시 Checkr webhook을 등록합니다.
2. **필터** -- `event_type = report.completed`인 경우에만 계속합니다.
3. **작업** -- Checkr: Get Report (webhook에서 보고서 ID 사용).
4. **작업** -- B1.church: Find Person (후보 이메일로).
5. **작업** -- Conditional Slack / Email: `clear` / `consider` / `suspended` 상태로 조율자에게 알립니다.

참고: B1에는 현재 내장된 "background-check status" 필드가 없습니다. 실용적인 옵션은 (a) 검토를 위해 비공개 Slack 채널에 결과를 게시, (b) 감사를 위해 Google Sheet에 작성, (c) `clear` 시 "Cleared volunteers" B1 그룹에 사람 추가입니다.

## 일반적인 레시피

### 2년마다 자원봉사자 재검사

위의 Make 일정 트리거와 쌍을 이루세요:

- **트리거** -- Make: Schedule (월간)
- **작업** -- B1.church: List Group Members for "Cleared volunteers"
- **작업** -- Make로 필터링: 22개월 이상 된 cleared 날짜
- **작업** -- Checkr: Create Background Check Invitation (초기 흐름과 동일)

### 검사가 완료될 때까지 단계 1 액세스 차단

교회가 B1 그룹 멤버십을 사용하여 액세스를 제어하는 경우(예: "Cleared" 그룹 멤버만 예배 일정에 나타남), Checkr `report.completed` 이벤트가 그들을 전환할 때까지 새 자원봉사자를 대기 그룹에 보관합니다.

## 제한 사항 및 참고 사항

- **Checkr은 미국 전용입니다** 대부분의 검사 패키지의 경우. 호주, 영국 및 캐나다 교회는 다른 옵션이 필요합니다.
- **가격**은 검사당입니다. Make의 모든 Create Invitation은 실제 검사를 소비합니다. 먼저 Checkr의 샌드박스 / 스테이징 계정에서 테스트합니다(Make의 Checkr 앱은 연결에 전달하는 자격 증명을 존중하므로 자격 증명을 바꾸면 샌드박스/실시간 간에 전환됩니다).
- **Checkr API 액세스는 계획 기반입니다.** 더 작은 Checkr 계정은 UI 전용 계층에 있을 수 있습니다. API를 사용하려면 Checkr에 문의하세요.

## 문제 해결

- **Create Candidate가 `403`으로 실패합니다** -- Checkr API 토큰이 읽기 전용이거나 올바른 계정 권한이 없습니다. Checkr 대시보드에서 쓰기 범위로 다시 발급합니다.
- **초대장이 도착하지 않습니다** -- 3단계에서 후보의 이메일을 확인합니다. B1이 해당 사람에 대해 비어있는 이메일 필드를 가질 수 있습니다. Checkr 단계 전에 이메일 필수 필터를 추가합니다.
- **Webhook 트리거가 작동하지 않습니다** -- Make 계정이 아웃바운드 webhook을 지원하는 유료 계층에 없으면 Checkr의 webhook 등록이 때때로 무음으로 실패합니다. Checkr 대시보드 *Webhooks* 페이지에서 Make의 URL이 나열되어 있는지 확인합니다.

## 참고 항목

- [Make (overview)](../make) -- 모든 Make 시나리오의 B1 측
- [Mobile Message](./mobile-message) -- SMS-providers-without-Zapier-apps의 경우, Checkr Make 배선과 동일한 Webhooks/HTTP 패턴
- [Checkr API docs](https://docs.checkr.com/)
