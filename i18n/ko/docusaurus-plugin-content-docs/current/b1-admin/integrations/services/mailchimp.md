---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

새로운 B1 인물, 기부자, 그룹 회원을 Mailchimp 오디언스로 자동 전달해서, 다음 환영 메일 시리즈, 연말 모금 안내, 자원봉사자 뉴스레터가 항상 최신 목록을 기반으로 하도록 만드세요. B1에는 Mailchimp 동기화 기능이 내장되어 있지 않습니다 — 이 연결은 전적으로 Zapier(또는 Make)에서 이루어집니다. B1이 이벤트를 발생시키면 Mailchimp가 구독자를 받아들입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- B1 인물을 전달할 오디언스가 최소 하나 있는 [Mailchimp](https://mailchimp.com) 계정
- [Zapier](https://zapier.com) 계정(무료 요금제로도 소규모 교회는 충분합니다)
- API 키를 발급할 수 있도록 **설정 편집** 권한을 가진 B1Admin 사용자

</div>

## 연결할 수 있는 것

| 방향 | B1 트리거 | Mailchimp 작업 |
|---|---|---|
| B1 → Mailchimp | `person.created` | 구독자 추가/업데이트 |
| B1 → Mailchimp | `donation.created` | 태그가 있는 구독자 추가(예: "2026년 헌금") |
| B1 → Mailchimp | `group.member.added` | 해당 그룹으로 범위가 지정된 태그로 구독자 추가 |
| Mailchimp → B1 | 신규 구독자 | B1 *인물 생성* |

Mailchimp 쪽에서는 캠페인, 세그먼트, 자동화 등 훨씬 더 많은 기능을 제공합니다 — 전체 목록은 [Mailchimp의 Zapier 트리거](https://zapier.com/apps/mailchimp/integrations)를 참고하세요. B1 이벤트 데이터에서 매핑 가능한 것은 무엇이든 활용할 수 있습니다.

## 설정

### 1. B1 API 키 발급

B1Admin에서 **설정 → 개발자 → API 키 → 새 API 키**로 이동하세요. Zap에 필요한 범위를 지정합니다.

- `settings:write` — 트리거가 웹훅을 등록하는 데 필수
- `people:read` — Zap이 이름, 이메일 등을 읽을 수 있도록 함
- (선택 사항) Mailchimp → B1 방향도 계획한다면 `people:write`

저장한 다음 `cak_…` 문자열을 복사하세요 — 한 번만 표시됩니다.

### 2. Zap 만들기

1. **트리거:** `B1.church — 신규 인물`. 처음 사용할 때 Zapier는 *B1.church에 로그인*하라고 안내합니다. 여기에 API 키를 붙여넣으세요.
2. **작업:** `Mailchimp — 구독자 추가/업데이트`. 트리거 출력을 매핑합니다.
   - `data.contactInfo.email` → 이메일 주소
   - `data.name.first` → 이름
   - `data.name.last` → 성
   - (선택 사항) `data.id` → B1의 인물 ID를 함께 보관하고 싶다면 Mailchimp의 병합 필드로 매핑
3. Zap을 켭니다. Zapier가 B1에 `person.created` 웹훅을 등록합니다 — **설정 → 개발자 → 웹훅**에서 "Zapier — person.created"라는 행이 나타나는지 확인하세요.

이것으로 끝입니다. B1Admin에서 인물을 추가해 보세요 — 몇 초 안에 새 구독자가 Mailchimp에 나타납니다.

## 자주 쓰는 레시피

### 기부자에게 자동으로 태그 지정

- **트리거** — B1: 신규 헌금
- **작업** — B1: 인물 찾기(`personId`로 조회)로 이메일 가져오기
- **작업** — Mailchimp: 태그가 있는 구독자 추가(태그 `Gave-2026`)

### 그룹별 환영 메일 시리즈 시작

- **트리거** — B1: 신규 그룹 회원, `data.groupId`로 필터링
- **작업** — Mailchimp: 그룹 이름을 딴 태그로 구독자 추가; 해당 태그를 기반으로 기존 자동화 실행

### 양방향: 새 Mailchimp 가입자가 B1 연락처가 됨

- **트리거** — Mailchimp: 신규 구독자
- **작업** — B1: 인물 생성(이름/성/이메일 매핑)

## Make 대안

Make의 [Mailchimp 앱](https://www.make.com/en/integrations/mailchimp)은 44개 모듈을 지원합니다 — 연결 방식은 동일하며, B1의 *이벤트 감시* 트리거가 Zapier를 대체합니다. B1 측 설정은 [Make 개요 문서](../make)를 참고하세요.

## 제한 사항 및 참고 사항

- **Mailchimp 무료 요금제는 연락처와 오디언스 수에 제한이 있습니다** — 무료 오디언스의 한도를 넘는 Zap은 `4xx Member limit reached` 오류를 발생시키기 시작합니다. Mailchimp 로그를 보면 명확히 확인할 수 있습니다.
- **Mailchimp는 이메일 기준으로 중복을 제거합니다.** 동일한 B1 인물에 대해 Zap을 다시 실행해도 기존 항목이 업데이트될 뿐 중복이 생기지 않습니다.
- **Mailchimp의 구독 취소는 B1으로 다시 반영되지 않습니다.** Mailchimp에서 구독을 취소했을 때 B1의 "메일 수신" 설정도 해제하고 싶다면, 역방향 Zap을 직접 만들어야 합니다.

## 문제 해결

- **Zap이 실행되지 않음** — `설정 → 개발자 → 웹훅`에서 `Zapier — person.created` 행을 확인하세요. 없다면 Zap을 켤 당시 API 키에 `settings:write` 권한이 없었던 것입니다. 키를 다시 발급하고, 다시 연결한 다음 Zap을 껐다 켜세요.
- **추가/업데이트 시 `Member exists` 경고** — 작업을 *구독자 추가*에서 *구독자 추가/업데이트*로 전환하세요(동사가 중요합니다). upsert 방식은 멱등적으로 동작합니다.
- **이름/성이 비어서 전달됨** — B1의 `data.name.first`와 `data.name.last`는 해당 인물에 그 필드가 설정되어 있어야만 채워집니다. 대체 값으로 `data.name.display`를 매핑하세요.

## 참고 항목

- [Zapier (개요)](../zapier) — 모든 Zapier 레시피의 B1 측 구성
- [Make (개요)](../make) — 동일한 개념의 비주얼 빌더
- [웹훅 (개발자 참고자료)](/docs/developer/api/webhooks#event-catalog)
