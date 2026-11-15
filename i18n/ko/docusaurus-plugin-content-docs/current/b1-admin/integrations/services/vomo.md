---
title: "VOMO"
description: "Zapier로 VOMO 봉사자 신청과 키오스크 체크인을 B1 Admin의 사람과 그룹에 연결하세요. API 키 권한 범위와 설정 단계를 포함합니다."
---

# VOMO

<div class="article-intro">

VOMO는 봉사자 참여 플랫폼입니다. 사람들은 프로젝트에 신청하고, 키오스크에서 체크인하며, 봉사 시간을 쌓아 갑니다. 봉사 일정 관리에는 VOMO를, 사람 기록에는 B1을 사용한다면, Zapier가 두 시스템 사이에서 구성원 자격과 체크인을 동기화하여 어느 한쪽이 어긋나지 않도록 할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- Zapier를 지원하는 요금제의 [VOMO](https://vomo.org) 계정(확실하지 않다면 VOMO 지원팀에 확인하세요)
- [Zapier](https://zapier.com) 계정
- **Edit Settings** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 항목 {#what-you-can-wire-up}

VOMO의 Zapier 앱은 즉시 트리거 4개와 작업 4개를 제공합니다. 대부분의 교회가 원하는 활용 예시는 다음과 같습니다:

| 방향 | 트리거 | 작업 |
|---|---|---|
| VOMO → B1 | VOMO Membership (생성됨) | B1: Find Person → Create Person(새 사람인 경우) |
| VOMO → B1 | VOMO Kiosk 체크인 | B1: "Currently Serving" 그룹에 Add Group Member, 또는 출석으로 기록 |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer(이메일 기준); 없으면 사용자 지정 단계 |
| 양방향 | VOMO Participation (신청) | B1: 프로젝트 전용 그룹에 Add Group Member |

VOMO 작업은 현재 **프로젝트 초안 작성**과 기존 주최자/프로젝트 **찾기**로만 제한됩니다. "이 사람을 VOMO 프로젝트에 추가" 작업은 아직 없습니다. 주로 흥미로운 연결은 VOMO → B1 방향입니다.

## 설정 {#setup}

### 1. B1 API 키 만들기 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**. 권한 범위:

- `settings:write` — Zapier는 연결할 때 모든 B1 키를 B1의 웹훅 목록과 대조하므로, 이 권한이 없으면 연결이 실패합니다
- `people:read`, `people:write` — 봉사자를 B1 사람으로 찾고 만들기 위해
- `groups:write` — 봉사팀 그룹에 추가하기 위해
- (선택 사항) 키오스크 체크인을 출석으로 취급한다면 `attendance:write`

### 2. 구성원 동기화 Zap 만들기 {#2-build-the-membership-sync-zap}

1. **Trigger** — VOMO: Membership(event = `created`).
2. **Action** — B1.church: Find Person, 이메일로 일치 확인.
3. **Action** — B1.church: Add Group Member. 2단계의 사람을 적절한 봉사자 그룹에 추가하세요.

   B1의 *Find Person*은 일치하는 사람이 없으면 "No person found" 오류와 함께 Zap을 중단합니다. 아직 B1에 없는 봉사자를 위해, Find Person 단계에 Zapier의 오류 처리를 켜고 오류 경로에서 B1.church: Create Person을 실행한 다음 Add Group Member를 실행하세요.
4. 켜세요. 이제 새 VOMO 봉사자가 올바른 그룹 구성원 자격과 함께 B1에 나타납니다.

### 3. (선택 사항) 키오스크 체크인 Zap 만들기 {#3-optional-build-the-kiosk-check-in-zap}

1. **Trigger** — VOMO: Kiosk
2. **Action** — B1.church: Find Person(이메일 기준)
3. **Action** — 선택 사항:
   - *출석으로 취급하는 경우* — B1의 `/attendance/visits` 엔드포인트에 Webhooks by Zapier POST(B1의 Zapier 앱에는 아직 기본 *Record Attendance* 작업이 없습니다). B1 [API 키](/docs/developer/api/api-keys)는 `Authorization: Bearer cak_…` 헤더에 넣으세요.
   - *그룹 구성원 자격으로 취급하는 경우* — "Currently Serving (Today)" 그룹에 B1.church: Add Group Member를 사용하고, 같은 날 나중에 예약된 정리 작업을 통해 두 번째 Zap이 이들을 제거하도록 하세요.

## 자주 쓰는 활용 예시 {#common-recipes}

### 프로젝트별 그룹 동기화 {#per-project-group-sync}

- **Trigger** — VOMO: Participation (created)
- **Action** — Filter by Zapier: 프로젝트 id로 필터링한 다음
- **Action** — B1.church: Add Group Member. VOMO 프로젝트 이름을 본뜬 B1 그룹에 추가하세요.

VOMO 프로젝트가 끝나면 B1 그룹을 수동으로 비우거나, 이 Zap과 *Participation deleted* 트리거를 짝지어 구성원을 제거하세요.

### 문자로 "신청해 주셔서 감사합니다" 보내기 {#send-a-thanks-for-signing-up-text-via-sms}

같은 Zap에서 VOMO Participation → Clearstream Send Text 또는 Text In Church Send Message를 연결하세요. 둘 다 기본 Zapier 작업을 제공합니다. [Clearstream](./clearstream.md)과 [Text In Church](./text-in-church.md)를 참고하세요.

### 이탈 감지하기 {#detect-drop-off}

매일 Zapier *Schedule* 트리거를 실행하여, 이번 달 봉사팀에 합류한 B1 사람 목록을 가지고 VOMO의 Find Organizer를 호출하세요. VOMO가 "not found"를 반환하면 VOMO를 활성화하지 않은 사람이므로 알림을 보낼 필요가 있습니다.

## 제한 사항 및 참고 {#limits--notes}

- **이메일이 연결 키입니다.** VOMO 페이로드는 사용자 이메일을 제공하지만 B1 사람 id는 제공하지 않습니다. 두 시스템에서 서로 다른 이메일을 쓰는 사람은 중복을 만듭니다.
- **현재 VOMO Zapier 앱에는 "Add to Project" 작업이 없습니다.** B1 → VOMO 프로젝트 등록이 필요하다면, *Webhooks by Zapier* 단계에서 VOMO의 REST API로 POST해야 하며, 이것은 맞춤 통합입니다.
- **VOMO의 무료 또는 하위 요금제에는 Zapier가 포함되지 않을 수 있습니다.** 연결 일정을 약속하기 전에 VOMO 지원팀에 확인하세요.

## 문제 해결 {#troubleshooting}

- **트리거가 전혀 실행되지 않음** — VOMO의 즉시 트리거는 API 토큰이 계속 유효해야 합니다. Zap을 다시 테스트하고, 토큰이 교체되었다면 VOMO를 다시 연결하세요.
- **B1 *Add Group Member*가 실패함** — 작업의 그룹이 더 이상 존재하지 않습니다. 단계의 **Group** 드롭다운에서 그룹을 다시 고르거나, B1Admin(**People > Groups**)에서 그룹을 열고 웹 주소 끝의 id를 복사하세요.
- **봉사자 한 명이 B1 사람 중복을 만듦** — 이미 B1에 있던 이메일과 다른 이메일로 신청했을 가능성이 높습니다. 이메일 형식을 표준화하거나, 생성 전에 전화번호로도 검색하는 Zapier *Path*를 추가하세요.

## 함께 보기 {#see-also}

- [Zapier(개요)](../zapier.md) — 모든 Zapier 활용 예시의 B1 쪽 설정
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — 봉사 신청에 문자 확인을 짝지어 보내기
- [웹훅(개발자 참고)](/docs/developer/api/webhooks) — VOMO가 트리거할 수 있는 이벤트
