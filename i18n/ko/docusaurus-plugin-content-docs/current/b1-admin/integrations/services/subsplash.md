---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

교회 앱, 헌금, 양식에 Subsplash를 사용하고 있지만 사람과 기부 정보의 기준 시스템(system of record)으로 B1을 사용하고 싶다면, Subsplash의 Zapier 앱이 기부, 새 프로필, 양식 응답을 실시간으로 B1에 전달할 수 있습니다. 다만 Subsplash의 Zapier 앱은 현재 **트리거 전용**이므로, 연동은 한 방향(Subsplash → B1)뿐입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **API + Zapier** 액세스가 포함된 요금제의 Subsplash 계정(이 기능은 요금제에 따라 제한되므로 Subsplash 고객 성공 매니저에게 확인하세요)
- [Zapier](https://zapier.com) 계정
- **설정 편집** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 항목

아래의 모든 트리거는 Subsplash의 것이며, 작업은 B1의 것입니다.

| Subsplash 트리거 | B1 작업 |
|---|---|
| 새 기부 | 사람 찾기 → 기부 추가 (사람이 없으면 사람 생성) |
| 새 약정 | 기부 추가 (`notes` = "Pledge: …") |
| 새 사람 생성 | 사람 생성 |
| 사람 프로필 업데이트 | (B1에 직접 대응하는 작업 없음 — 수동 검토를 위해 Google Sheet에 기록) |
| 새 양식 응답 | 사람 생성 + (선택 사항) 양식에 따라 그룹 구성원 추가 |

현재 Subsplash 앱이 지원하는 방향은 Subsplash → B1뿐입니다.

## 설정

### 1. B1 API 키 발급

B1Admin에서 **Settings → Developer → API Keys → New API Key**로 이동합니다. 범위는 다음과 같습니다.

- `people:read` — 이메일로 기부자를 찾기 위해
- `people:write` — 기부자가 없을 경우 생성하기 위해
- `donations:write` — 기부 내역을 기록하기 위해
- (`settings:write`는 필요하지 않습니다 — 여기서 트리거는 B1이 아니라 Subsplash가 관리합니다.)

### 2. Subsplash를 Zapier에 연결

[Subsplash의 Zapier 연동 가이드](https://support.subsplash.com/en/articles/9825926-zapier-integration)를 따르세요. Subsplash 대시보드에서 발급하는 API 토큰을 사용하여 Zapier가 트리거 쪽을 인증합니다.

### 3. "기부 기록" Zap 만들기

1. **트리거** — Subsplash: 새 기부
2. **작업** — B1.church: 사람 찾기 (이메일 기준)
3. **필터 / 경로** — "사람을 찾았는지" 여부에 따라 분기:
   - **찾음:** B1.church: 기부 추가. 금액, 날짜, 펀드, 방법 = "Online", 메모 = Subsplash 거래 ID를 매핑합니다.
   - **찾지 못함:** B1.church: 사람 생성 → B1.church: 기부 추가(새로 생성된 사람의 ID 사용)

Zap을 켜세요. 이후 Subsplash 기부는 몇 초 안에 **B1Admin → Donations**에 반영됩니다.

## 자주 쓰는 레시피

### 처음 헌금한 사람에게 감사 메시지 보내기

- **트리거** — Subsplash: 새 기부
- **작업** — Zapier 필터: 기부자의 첫 헌금인 경우에만 진행합니다(기부자 이메일을 과거 헌금자 Google Sheet와 비교하는 *Lookup Table*을 사용하거나, 기부자 생성일에 대한 Zapier *Paths* 단계를 사용합니다)
- **작업** — Mailchimp / SMTP / SendGrid: 첫 헌금 감사 메시지 보내기
- **작업** — B1.church: 기부 추가 (평소와 같이)

### 약정 헌금을 일반 헌금 흐름에서 분리하기

- **트리거** — Subsplash: 새 약정
- **작업** — B1.church: `notes = "Pledge — Subsplash"`로 기부 추가하고, `Pledges`라는 펀드(운영 펀드와 별도)에 넣습니다. 그러면 **B1Admin → Donations → Summary**에서 약정을 독립적으로 보고할 수 있습니다.

### 새 앱 사용자를 B1 사람으로 동기화하기

- **트리거** — Subsplash: 새 사람 생성
- **작업** — B1.church: 사람 생성, 이름, 이메일, 전화번호를 채웁니다. "Subsplash App Users" 같은 그룹에 새 사람을 추가하여 B1에서 태그를 지정합니다.

## 제한 사항 및 참고

- **Subsplash의 Zapier 앱은 트리거 전용입니다.** B1 쪽의 변경 사항(예: B1에 새 사람이 추가되면 Subsplash에도 반영)이 필요하다면, B1의 Zapier 앱 트리거에서 *Webhooks by Zapier — POST* 작업을 사용하여 Subsplash의 REST API를 호출하는 방식으로 직접 연결을 만들어야 합니다. 이는 단순한 레시피가 아니라 맞춤형 연동입니다.
- **API 액세스는 요금제에 따라 제한됩니다.** Zapier 연결이 `403 Forbidden`으로 실패하면, Subsplash 요금제에 API 액세스가 포함되지 않았을 가능성이 높습니다. 고객 성공 매니저에게 문의하세요.
- **펀드 매핑은 수동입니다.** Subsplash는 캠페인이나 카테고리 이름을 전달하지만, B1은 숫자형 펀드 ID가 필요합니다. Zap에 펀드를 고정해서 입력하거나, Subsplash 캠페인을 B1 펀드에 매핑하는 Zapier *Lookup Table*을 관리하세요.

## 문제 해결

- **기부 후 트리거가 실행되지 않는 경우** — Subsplash의 Zapier 대시보드에서 연결이 여전히 *Connected*로 표시되는지 확인하세요. Subsplash 측에서 API 토큰이 교체되었다면 Zap이 조용히 멈추므로 다시 연결하세요.
- **B1 *기부 추가*가 422로 실패하는 경우** — 대부분 `fundId`가 없거나 인식되지 않는 경우입니다. **B1Admin → Donations → Funds**에서 펀드 목록을 확인하고, 정확한 ID를 Zap 단계에 복사하세요.
- **첫 헌금이 두 번 트리거되는 경우** — Subsplash는 Zapier가 응답 확인(ack)을 놓치면 트리거를 다시 보내는 경우가 있습니다. 중복을 제거하려면 기부 ID(Subsplash가 페이로드에 포함합니다)에 대해 *Filter by Zapier*를 추가하세요.

## 함께 보기

- [Donorbox](./donorbox) — 같은 레시피 형태, 다른 기부 플랫폼
- [Zapier (개요)](../zapier) — 모든 Zapier 레시피의 B1 쪽 설명
- [Subsplash Zapier 연동 가이드](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplash 문서)
