---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com)는 SMS 플러스 드립 워크플로우 및 연결 카드 자동화를 번들로 제공합니다. Zapier 앱은 양방향을 노출합니다 — B1 이벤트를 Text In Church 워크플로우로 파이프하고 연결 카드 또는 새 연락처 트리거를 다른 쪽에서 B1로 끌어옵니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- Zapier 통합이 포함된 계획의 [Text In Church](https://textinchurch.com) 계정
- [Zapier](https://zapier.com) 계정
- **설정 편집** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 것

| 방향 | 트리거 | 작업 |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | 사람 생성/업데이트 + 그룹에 추가 |
| B1 → Text In Church | B1 `form.submission.created` | 관련 팀을 통해 텍스트 메시지 전송 |
| B1 → Text In Church | B1 `group.member.added` | 그룹에 추가(그룹 멤버십 미러) |
| Text In Church → B1 | 연결 카드 제출 | B1: 사람 생성 + 그룹 멤버 추가 |
| Text In Church → B1 | 사람 생성 | B1: 사람 생성 |
| Text In Church → B1 | 사람이 그룹에 가입 | B1: 그룹 멤버 추가 |

Text In Church 작업도 *텍스트 메시지 전송*, *음성 방송 전송*, *작업 생성*, *사람/그룹 찾기* 및 그룹 멤버십 추가/제거를 포함합니다.

## 설정

### 1. B1 API 키 발급

**설정 → 개발자 → API 키 → 새 API 키**:

- `settings:write` — B1 기반 Zap에 필요
- `people:read`, `people:write` — 사람을 찾거나 생성하기 위해
- `groups:write` — 그룹 동기화의 경우
- (선택 사항) `donations:write` — TIC에 선물 확인을 연결할 경우

### 2. Zapier에 Text In Church 연결

[Text In Church의 Zapier 통합 가이드](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration)를 따릅니다. TIC 대시보드 내에서 API 토큰을 생성합니다.

### 3. "연결 카드-B1" Zap 빌드

가장 일반적인 방향. TIC에서 실행된 연결 카드는 새 B1 사람이 자동으로 됩니다.

1. **트리거** — Text In Church: 연결 카드 제출.
2. **작업** — B1.church: 사람 찾기(이메일로).
3. **경로** — 발견/발견되지 않음에 분기:
   - 발견되지 않음 → B1.church: 사람 생성.
   - 발견됨 → 계속.
4. **작업** — B1.church: 그룹 멤버 추가 — "새 연락처" 그룹.

Zap을 켭니다. TIC를 통해 제출된 다음 연결 카드는 **B1Admin → 사람**에 자동으로 착륙합니다.

## 일반적인 레시피

### B1 양식에서 연결 카드 스타일 워크플로우 트리거

- **트리거** — B1.church: 새로운 양식 제출("여기 처음이에요" 양식 id로 필터)
- **작업** — Text In Church: 사람 생성/업데이트, 양식의 이메일 / 전화 / 이름 답변 매핑
- **작업** — Text In Church: 그룹에 추가(그룹에는 사전 구축된 환영 워크플로우가 첨부됨)

### 그룹 멤버십 미러

- **트리거** — B1.church: 새 그룹 멤버, 특정 `groupId`로 필터
- **작업** — Text In Church: 그룹에 추가(동일한 사람, 미러 그룹). 전체 동기화를 원하면 `group.member.removed` Zap과 쌍을 이룹니다.

### 누군가 가입할 때 리더에게 페이징

- **트리거** — B1.church: 새 그룹 멤버
- **작업** — Text In Church: 텍스트 메시지 전송, 수신자 = 그룹 리더의 전화, 본문 = `"{first} {last}가 방금 {group}에 가입했습니다"`.

## 제한 및 주의사항

- **TIC의 Zapier 앱은 계획 계층 뒤에 있습니다.** TIC 대시보드의 Zapier 통합이 회색으로 표시되면 TIC 지원에 계획에서 활성화하도록 문의합니다.
- **그룹 id는 TIC의 것이며 B1의 것이 아닙니다.** 미러링할 때 어딘가에 매핑 테이블을 유지합니다(Zapier *Lookup Table* 또는 Zap별 하드코드).
- **텍스트 메시지 비용 크레딧을 전송합니다.** 텍스트 전송을 실행하는 각 Zap은 TIC SMS 할당량에서 소비합니다.

## 문제 해결

- **연결 카드 트리거가 실행되지 않음** — TIC는 Zapier 통합 토글을 켜야 합니다. 또한 테스트한 양식이 일반 설문조사가 아닌 "연결 카드"로 구성되어 있는지 확인합니다.
- **B1에서 사람 생성이 401로 실패함** — API 키가 잘못되었거나 취소되었거나 `people:write`가 없습니다. 다시 발급하세요.
- **동일한 이벤트의 중복 B1 사람** — TIC는 동일한 이벤트에 대해 *사람 생성* 및 *연결 카드 제출*을 모두 전송합니다. 하나를 진실의 원천으로 선택하고 다른 하나에 Zapier 필터를 추가합니다.

## 참고도 보기

- [Clearstream](./clearstream) — 유사한 Zapier 모양의 대체 SMS 플랫폼
- [Zapier(개요)](../zapier) — 모든 Zapier 레시피의 B1 측
- [Text In Church Zapier 가이드](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration)(TIC의 문서)
