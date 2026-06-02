---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Subsplash를 사용하여 교회 앱, 기부 또는 양식을 사용하지만 B1을 사람 및 기부의 시스템 레코드로 원하는 경우 Subsplash의 Zapier 앱은 기부, 새 프로필 및 양식 응답을 실시간으로 B1에 파이프할 수 있습니다. Subsplash의 Zapier 앱은 현재 **트리거만** — 연결은 일방향(Subsplash → B1)입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **API + Zapier** 액세스를 포함하는 계획의 Subsplash 계정(확실하지 않으면 Subsplash 클라이언트 성공 관리자에게 확인 — 이들은 계획 계층 뒤에 있음)
- [Zapier](https://zapier.com) 계정
- **설정 편집** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 것

아래의 모든 트리거는 Subsplash의 것입니다. 작업은 B1의 것입니다.

| Subsplash 트리거 | B1 작업 |
|---|---|
| 새로운 기부 | 사람 찾기 → 기부 추가(누락된 경우 사람 생성) |
| 새로운 약속 | 기부 추가(`notes` = "약속: …") |
| 새 사람 생성 | 사람 생성 |
| 사람 프로필 업데이트 | (직접 B1 작업 없음 — 수동 검토를 위해 Google 시트에 로깅) |
| 새 양식 응답 | 사람 생성 +(선택 사항) 양식을 기반으로 그룹 멤버 추가 |

Subsplash → B1은 Subsplash의 앱이 지원하는 유일한 방향입니다.

## 설정

### 1. B1 API 키 발급

B1Admin에서: **설정 → 개발자 → API 키 → 새 API 키**. 범위:

- `people:read` — 기부자를 이메일로 찾아보기 위해
- `people:write` — 존재하지 않으면 생성하기 위해
- `donations:write` — 선물을 기록하기 위해
- (B1이 아닌 Subsplash가 트리거를 소유하므로 `settings:write` 필요 없음)

### 2. Zapier에 Subsplash 연결

[Subsplash의 Zapier 통합 가이드](https://support.subsplash.com/en/articles/9825926-zapier-integration)를 따릅니다. Subsplash 대시보드 내에서 API 토큰을 발급하여 Zapier가 트리거 측을 인증하는 데 사용합니다.

### 3. "기부 기록" Zap 빌드

1. **트리거** — Subsplash: 새로운 기부
2. **작업** — B1.church: 사람 찾기(이메일로)
3. **필터 / 경로** — "사람 발견"에 분기:
   - **발견됨:** B1.church: 기부 추가. 금액, 날짜, 기금, 방법 = "온라인", 참고 = Subsplash 거래 id를 매핑합니다.
   - **발견되지 않음:** B1.church: 사람 생성 → B1.church: 기부 추가(새로 생성된 사람의 id를 사용).

Zap을 켭니다. 향후 Subsplash 기부는 몇 초 내에 **B1Admin → 기부** 내에서 흐릅니다.

## 일반적인 레시피

### 첫 선물이 도착할 때 감사 전송

- **트리거** — Subsplash: 새로운 기부
- **작업** — Zapier로 필터: 첫 번째 선물인 경우에만 계속(Lookup Table을 과거 기부자의 Google 시트에 기부자 이메일에 사용하거나 기부자 생성 날짜의 Zapier *경로* 단계)
- **작업** — Mailchimp / SMTP / SendGrid: 첫 선물 감사 메시지 전송
- **작업** — B1.church: 기부 추가(일반적으로)

### 일반 기부 흐름에서 약속 필터

- **트리거** — Subsplash: 새로운 약속
- **작업** — B1.church: `notes = "약속 — Subsplash"`와 `Pledges` 기금이 있는 기부 추가(운영 기금과 분리) 그래서 **B1Admin → 기부 → 보고서**에서 약속을 독립적으로 보고할 수 있습니다.

### 새로운 앱 사용자를 B1 사람으로 동기화

- **트리거** — Subsplash: 새 사람 생성
- **작업** — B1.church: 사람 생성, 이름, 이메일, 전화를 채웁니다. "Subsplash 앱 사용자" 같은 그룹에 추가하여 B1에서 태그합니다.

## 제한 및 주의사항

- **Subsplash의 Zapier 앱은 트리거만입니다.** B1 측 변경(예: 새 B1 사람을 Subsplash에도 착륙)을 원하는 경우 맞춤 *Zapier 웹훅 — POST* 작업으로 B1의 Zapier 앱 트리거에서 Subsplash의 REST API로 연결을 빌드해야 합니다. 그것은 레시피가 아닌 맞춤 통합입니다.
- **API 액세스는 계획 제한입니다.** Zapier 연결이 `403 Forbidden`으로 실패하면 Subsplash 계획에 API 액세스가 없을 가능성이 있습니다 — 클라이언트 성공 관리자에게 문의합니다.
- **기금 매핑은 수동입니다.** Subsplash는 캠페인이나 카테고리 이름을 전달합니다. B1은 수치 기금 id가 필요합니다. 어딘가(Zapier *Lookup Table* 또는 Zap별 하드코드)에서 Subsplash 캠페인을 B1 기금으로 매핑하는 매핑 테이블을 유지합니다.

## 문제 해결

- **기부 후 트리거가 실행되지 않음** — Subsplash의 Zapier 대시보드에서 연결이 여전히 *연결됨*을 표시하는지 확인합니다. Subsplash 측에서 API 토큰이 회전된 경우 Zap은 자동으로 중지됩니다. Zapier를 다시 연결하세요.
- **B1 *기부 추가*가 422로 실패함** — 대부분 누락되었거나 인식되지 않는 `fundId`입니다. **B1Admin → 기부 → 기금**을 나열하고 정확한 id를 Zap 단계에 복사합니다.
- **단일 선물에서 첫 선물이 두 번 트리거됨** — Subsplash는 Zapier가 승인을 놓친 경우 트리거를 다시 전달하기도 합니다. Zapier *경로*를 기부 id에 추가합니다(Subsplash는 페이로드에서 하나를 보냄) 중복을 드롭합니다.

## 참고도 보기

- [Donorbox](./donorbox) — 동일한 레시피 모양, 다른 기부 플랫폼
- [Zapier(개요)](../zapier) — 모든 Zapier 레시피의 B1 측
- [Subsplash Zapier 통합 가이드](https://support.subsplash.com/en/articles/9825926-zapier-integration)(Subsplash의 문서)
