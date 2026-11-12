---
title: "Subsplash"
description: "Zapier로 Subsplash 헌금, 새 사람, 양식 응답을 B1에 연결하여, 헌금과 프로필이 B1 Admin에 자동으로 들어가도록 하세요."
---

# Subsplash

<div class="article-intro">

교회 앱, 헌금 또는 양식에 Subsplash를 사용하면서도 사람과 헌금의 기준 시스템으로 B1을 사용하고 싶다면, Subsplash의 Zapier 앱이 헌금, 새 프로필, 양식 응답을 실시간으로 B1에 전달할 수 있습니다. 다만 Subsplash의 Zapier 앱은 현재 **트리거 전용**이므로 연결은 단방향(Subsplash → B1)입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **API + Zapier** 액세스가 포함된 요금제의 Subsplash 계정(요금제 등급에 따라 제한되므로 Subsplash 고객 성공 담당자에게 확인하세요)
- [Zapier](https://zapier.com) 계정
- **Edit Settings** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 항목 {#what-you-can-wire-up}

아래의 모든 트리거는 Subsplash의 것이며, 작업은 B1의 것입니다.

| Subsplash 트리거 | B1 작업 |
|---|---|
| New Donation | Find Person → Add Donation (없으면 Create Person) |
| New Pledge | Add Donation(`notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (직접 대응하는 B1 작업 없음 — 수동 검토를 위해 Google 시트에 기록) |
| New Form Response | Create Person + (선택 사항) 양식을 기준으로 Add Group Member |

현재 Subsplash 앱이 지원하는 방향은 Subsplash → B1뿐입니다.

## 설정 {#setup}

### 1. B1 API 키 만들기 {#1-mint-a-b1-api-key}

B1Admin에서: **Settings → Developer → API Keys → New API Key**. 권한 범위:

- `people:read` — 이메일로 헌금자를 찾기 위해
- `people:write` — 없는 경우 새로 만들기 위해
- `donations:write` — 헌금을 기록하기 위해
- `settings:write` — Zapier는 연결할 때 모든 B1 키를 B1의 웹훅 목록과 대조하므로, 이 권한이 없으면 연결이 실패합니다(여기서 트리거를 소유하는 것은 B1이 아니라 Subsplash이지만 필요합니다)

### 2. Subsplash를 Zapier에 연결하기 {#2-connect-subsplash-to-zapier}

[Subsplash의 Zapier 연동 가이드](https://support.subsplash.com/en/articles/9825926-zapier-integration)를 따르세요. Subsplash 대시보드에서 발급한 API 토큰을 Zapier가 트리거 쪽 인증에 사용합니다.

### 3. "헌금 기록" Zap 만들기 {#3-build-the-record-a-donation-zap}

1. **Trigger** — Subsplash: New Donation
2. **Action** — B1.church: Find Person(이메일 기준)
3. **Action** — B1.church: Add Donation. 2단계에서 가져온 사람의 id를 사용하고, 금액, 날짜, 기금, 방법 = "Online", 메모 = Subsplash 거래 id를 매핑하세요.

B1의 *Find Person*은 일치하는 사람이 없으면 "No person found" 오류와 함께 Zap을 중단하므로, Filter나 Path 단계로는 분기할 수 없습니다. 첫 헌금자를 처리하려면 Find Person 단계에 Zapier의 오류 처리를 켜고, 오류 경로에서 B1.church: Create Person → B1.church: Add Donation(새로 만든 사람의 id 사용)을 실행하세요.

Zap을 켜세요. 이후의 Subsplash 헌금은 몇 초 안에 **B1Admin → Donations**에 들어옵니다.

## 자주 쓰는 활용 예시 {#common-recipes}

### 첫 헌금이 들어오면 감사 메시지 보내기 {#send-a-thank-you-when-a-first-time-gift-lands}

- **Trigger** — Subsplash: New Donation
- **Action** — Filter by Zapier: 헌금자의 첫 헌금인 경우에만 계속 진행(헌금자 이메일을 과거 헌금자 Google 시트와 대조하는 *Lookup Table*을 사용하거나, 헌금자 생성 날짜에 대한 Zapier *Paths* 단계를 사용)
- **Action** — Mailchimp / SMTP / SendGrid: 첫 헌금 감사 메시지 보내기
- **Action** — B1.church: Add Donation(평소와 같이)

### 약정 헌금을 일반 헌금 흐름에서 분리하기 {#filter-pledges-off-the-regular-giving-flow}

- **Trigger** — Subsplash: New Pledge
- **Action** — B1.church: Add Donation. `notes = "Pledge — Subsplash"`와 `Pledges`라는 기금(운영 기금과 별도)을 사용하면, **B1Admin → Donations → Summary**에서 약정을 독립적으로 보고할 수 있습니다.

### 새 앱 사용자를 B1 사람으로 동기화하기 {#sync-new-app-users-as-b1-people}

- **Trigger** — Subsplash: New Person Created
- **Action** — B1.church: Create Person. 이름, 이메일, 전화번호를 채우세요. "Subsplash App Users"와 같은 그룹에 새 사람을 추가하여 B1에서 태그를 붙이세요.

## 제한 사항 및 참고 {#limits--notes}

- **Subsplash의 Zapier 앱은 트리거 전용입니다.** B1 쪽 변경(예: 새 B1 사람을 Subsplash에도 반영)이 필요하다면, B1의 Zapier 앱 트리거에서 사용자 지정 *Webhooks by Zapier — POST* 작업으로 Subsplash의 REST API를 호출하는 연결을 직접 만들어야 합니다. 이것은 활용 예시가 아니라 맞춤 통합입니다.
- **API 액세스는 요금제에 따라 제한됩니다.** Zapier 연결이 `403 Forbidden`으로 실패하면, Subsplash 요금제에 API 액세스가 포함되지 않았을 가능성이 높습니다. 고객 성공 담당자에게 문의하세요.
- **기금 매핑은 수동입니다.** Subsplash는 캠페인이나 카테고리 이름을 전달하지만, B1은 자체 기금 중 하나를 필요로 합니다. Add Donation 단계의 **Fund** 드롭다운에서 기금을 고르거나, Subsplash 캠페인을 B1 기금에 연결하는 Zapier *Lookup Table*을 유지하세요.

## 문제 해결 {#troubleshooting}

- **헌금 후 트리거가 실행되지 않음** — Subsplash의 Zapier 대시보드에서 연결이 여전히 *Connected*로 표시되는지 확인하세요. Subsplash 쪽에서 API 토큰이 교체되었다면 Zap이 조용히 멈춥니다. 다시 연결하세요.
- **B1 *Add Donation*이 기금 없이 헌금을 기록함** — **Fund** 필드가 비어 있었거나, B1 기금 id가 아닌 값에 매핑되었습니다. 단계의 **Fund** 드롭다운에서 기금을 고르세요(B1Admin의 **Donations > Funds**에 있는 기금이 나열됩니다). 또는 B1 기금 id를 출력하는 Lookup Table을 매핑하세요.
- **첫 헌금이 두 번 트리거됨** — Zapier가 확인 응답을 놓치면 Subsplash가 트리거를 가끔 다시 보냅니다. 페이로드에 포함된 헌금 id로 *Filter by Zapier*를 추가하여 중복을 제거하세요.

## 함께 보기 {#see-also}

- [Donorbox](./donorbox.md) — 같은 활용 예시 구조, 다른 헌금 플랫폼
- [Zapier(개요)](../zapier.md) — 모든 Zapier 활용 예시의 B1 쪽 설정
- [Subsplash Zapier 연동 가이드](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplash 문서)
