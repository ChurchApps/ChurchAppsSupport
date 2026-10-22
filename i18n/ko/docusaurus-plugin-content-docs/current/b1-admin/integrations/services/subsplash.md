---
title: "Subsplash"
---

# Subsplash {#subsplash}

<div class="article-intro">

교회 앱, 헌금, 또는 양식에 Subsplash를 사용하면서도 사람과 헌금의 기준 시스템(system of record)으로 B1을 쓰고 싶다면, Subsplash의 Zapier 앱이 헌금, 새 프로필, 양식 응답을 실시간으로 B1에 전달할 수 있습니다. 다만 Subsplash의 Zapier 앱은 현재 **트리거 전용**이므로 연결은 한 방향(Subsplash → B1)입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **API + Zapier** 접근이 포함된 요금제의 Subsplash 계정(요금제 등급에 따라 제한되므로 Subsplash 고객 성공 담당자에게 확인하세요)
- [Zapier](https://zapier.com) 계정
- **설정 편집** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 항목 {#what-you-can-wire-up}

아래의 모든 트리거는 Subsplash의 것입니다. 작업은 B1의 것입니다.

| Subsplash 트리거 | B1 작업 |
|---|---|
| 새 헌금 | 사람 찾기 → 헌금 추가(사람이 없으면 사람 만들기) |
| 새 약정 | 헌금 추가(`notes` = "약정: …") |
| 새 사람 생성됨 | 사람 만들기 |
| 사람이 프로필 업데이트함 | (B1에 직접 대응하는 작업 없음 — 수동 검토를 위해 Google 스프레드시트에 기록) |
| 새 양식 응답 | 사람 만들기 + (선택 사항) 양식을 기준으로 그룹 구성원 추가 |

Subsplash → B1이 현재 Subsplash 앱이 지원하는 유일한 방향입니다.

## 설정 {#setup}

### 1. B1 API 키 만들기 {#1-mint-a-b1-api-key}

B1Admin에서 **설정 → 개발자 → API 키 → 새 API 키**로 이동합니다. 범위는 다음과 같습니다.

- `people:read` — 이메일로 헌금자를 찾기 위해
- `people:write` — 헌금자가 없다면 만들기 위해
- `donations:write` — 헌금을 기록하기 위해
- (`settings:write`는 필요 없습니다. 여기서 트리거를 소유하는 것은 B1이 아니라 Subsplash입니다.)

### 2. Subsplash를 Zapier에 연결하기 {#2-connect-subsplash-to-zapier}

[Subsplash의 Zapier 연동 가이드](https://support.subsplash.com/en/articles/9825926-zapier-integration)를 따르세요. Subsplash 대시보드 안에서 발급하는 API 토큰을 Zapier가 사용하여 트리거 쪽을 인증합니다.

### 3. "헌금 기록" Zap 만들기 {#3-build-the-record-a-donation-zap}

1. **트리거** — Subsplash: 새 헌금
2. **작업** — B1.church: 사람 찾기(이메일 기준)
3. **필터 / 경로** — "사람 찾음" 여부에 따라 분기:
   - **찾음:** B1.church: 헌금 추가. 금액, 날짜, 재정 항목, 방법 = "온라인", 메모 = Subsplash 거래 ID를 매핑합니다.
   - **찾지 못함:** B1.church: 사람 만들기 → B1.church: 헌금 추가(새로 만든 사람의 ID 사용).

Zap을 켭니다. 이후의 Subsplash 헌금은 몇 초 안에 **B1Admin → 헌금**으로 들어옵니다.

## 자주 쓰는 레시피 {#common-recipes}

### 처음 헌금한 사람에게 감사 메시지 보내기 {#send-a-thank-you-when-a-first-time-gift-lands}

- **트리거** — Subsplash: 새 헌금
- **작업** — Zapier 필터: 헌금자의 첫 헌금인 경우에만 진행합니다(헌금자 이메일을 과거 헌금자 목록이 있는 Google 스프레드시트와 대조하는 *Lookup Table*을 사용하거나, 헌금자 생성 날짜를 기준으로 하는 Zapier *Paths* 단계를 사용)
- **작업** — Mailchimp / SMTP / SendGrid: 첫 헌금 감사 메시지 보내기
- **작업** — B1.church: 헌금 추가(평소와 같이)

### 약정을 일반 헌금 흐름에서 분리하기 {#filter-pledges-off-the-regular-giving-flow}

- **트리거** — Subsplash: 새 약정
- **작업** — B1.church: 헌금 추가. `notes = "약정 — Subsplash"`와 `Pledges`라는 재정 항목(운영 재정과 별도)을 지정하면, **B1Admin → 헌금 → 요약**에서 약정을 따로 보고할 수 있습니다.

### 새 앱 사용자를 B1 사람으로 동기화하기 {#sync-new-app-users-as-b1-people}

- **트리거** — Subsplash: 새 사람 생성됨
- **작업** — B1.church: 사람 만들기. 이름, 이메일, 전화번호를 채웁니다. "Subsplash App Users" 같은 그룹에 새 사람을 추가하여 B1에서 태그를 붙입니다.

## 제한 사항 및 참고 {#limits--notes}

- **Subsplash의 Zapier 앱은 트리거 전용입니다.** B1 쪽의 변경(예: B1의 새 사람이 Subsplash에도 등록되도록 하는 경우)을 원한다면, B1의 Zapier 앱 트리거에서 *Webhooks by Zapier — POST* 작업을 통해 Subsplash의 REST API를 호출하는 연결을 직접 만들어야 합니다. 이는 기본 레시피가 아니라 사용자 지정 통합입니다.
- **API 접근은 요금제에 따라 제한됩니다.** Zapier 연결이 `403 Forbidden`으로 실패하면 Subsplash 요금제에 API 접근이 포함되어 있지 않을 가능성이 큽니다. 고객 성공 담당자에게 문의하세요.
- **재정 항목 매핑은 수동입니다.** Subsplash는 캠페인이나 카테고리 이름을 전달하지만, B1에는 숫자형 재정 항목 ID가 필요합니다. Zap에 재정 항목을 고정 입력하거나, Subsplash 캠페인을 B1 재정 항목에 연결하는 Zapier *Lookup Table*을 관리하세요.

## 문제 해결 {#troubleshooting}

- **헌금 후 트리거가 실행되지 않음** — Subsplash의 Zapier 대시보드에서 연결이 여전히 *연결됨*으로 표시되는지 확인하세요. Subsplash 쪽에서 API 토큰이 교체되었다면 Zap이 조용히 멈추므로 다시 연결하세요.
- **B1 *헌금 추가*가 422로 실패함** — 대부분 `fundId`가 없거나 인식되지 않는 경우입니다. **B1Admin → 헌금 → 재정 항목**에서 재정 항목 목록을 보고, 정확한 ID를 Zap 단계에 복사하세요.
- **첫 헌금이 두 번 트리거됨** — Zapier가 확인 응답을 놓치면 Subsplash가 트리거를 다시 보내는 경우가 가끔 있습니다. 헌금 ID(Subsplash가 페이로드에 포함합니다)에 *Filter by Zapier*를 추가하여 중복을 제거하세요.

## 함께 보기 {#see-also}

- [Donorbox](./donorbox) — 같은 레시피 구조, 다른 헌금 플랫폼
- [Zapier(개요)](../zapier) — 모든 Zapier 레시피의 B1 쪽 설명
- [Subsplash Zapier 연동 가이드](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplash 문서)
