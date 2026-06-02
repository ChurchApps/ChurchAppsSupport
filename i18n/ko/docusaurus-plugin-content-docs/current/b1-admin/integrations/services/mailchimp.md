---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

새 B1 사람, 기부자 또는 그룹 멤버를 Mailchimp 오디언스로 파이프합니다 — 다음 환영 시리즈, 연말 호소 또는 자원봉사자 뉴스레터는 항상 최신 상태인 목록에서 가져옵니다. 연결은 완전히 Zapier(또는 Make)에 있습니다 — B1은 이벤트를 실행하고 Mailchimp는 구독자를 수집합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- B1 사람을 푸시할 오디언스가 최소 하나 있는 [Mailchimp](https://mailchimp.com) 계정
- [Zapier](https://zapier.com) 계정(무료 계층은 작은 교회를 포함)
- API 키를 발급할 수 있도록 **설정 편집** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 것

| 방향 | B1 트리거 | Mailchimp 작업 |
|---|---|---|
| B1 → Mailchimp | `person.created` | 구독자 추가/업데이트 |
| B1 → Mailchimp | `donation.created` | 태그에 구독자 추가(예: "2026년에 기부") |
| B1 → Mailchimp | `group.member.added` | 해당 그룹으로 범위가 지정된 태그에 구독자 추가 |
| Mailchimp → B1 | 새로운 구독자 | B1 *사람 생성* |

Mailchimp 측은 훨씬 더 많이 노출됩니다(캠페인, 세그먼트, 자동화) — 전체 목록은 [Mailchimp의 Zapier 트리거](https://zapier.com/apps/mailchimp/integrations)를 참조하세요. B1 봉투에서 매핑 가능한 모든 것이 공정한 게임입니다.

## 설정

### 1. B1 API 키 발급

B1Admin에서 **설정 → 개발자 → API 키 → 새 API 키**로 이동합니다. Zap이 필요한 범위를 지정합니다:

- `settings:write` — 트리거가 웹훅을 등록하는 데 필요
- `people:read` — 이름, 이메일 등을 읽을 수 있도록
- (선택 사항) `people:write` — Mailchimp → B1 방향도 계획하는 경우

저장하고 `cak_…` 문자열을 복사합니다 — 한 번만 표시됩니다.

### 2. Zap 빌드

1. **트리거:** `B1.church — 새 사람`. 첫 사용 시 Zapier는 *B1.church에 로그인*을 요청합니다. API 키를 붙여넣으세요.
2. **작업:** `Mailchimp — 구독자 추가/업데이트`. 트리거 출력을 매핑합니다:
   - `data.contactInfo.email` → 이메일 주소
   - `data.name.first` → 이름
   - `data.name.last` → 성
   - (선택 사항) `data.id` → Mailchimp 병합 필드 — B1의 사람 id를 곁에 두고 싶으면
3. Zap을 켭니다. Zapier는 B1에서 `person.created` 웹훅을 등록합니다 — **설정 → 개발자 → 웹훅**에서 "Zapier — person.created"이라는 행이 나타나는 것을 확인합니다.

그게 다입니다. B1Admin에 사람을 추가하여 확인하세요 — 새 구독자가 몇 초 내에 Mailchimp에 나타납니다.

## 일반적인 레시피

### 기부자에게 자동 태그

- **트리거** — B1: 새로운 기부
- **작업** — B1: 사람 찾기(lookup by `personId`) 이메일을 가져옵니다
- **작업** — Mailchimp: 구독자를 태그에 추가(tag `Gave-2026`)

### 그룹 특정 환영 시리즈 떨어뜨리기

- **트리거** — B1: 새 그룹 멤버, `data.groupId`로 필터링
- **작업** — Mailchimp: 구독자를 그룹 이름의 태그에 추가; 해당 태그에서 기존 자동화를 트리거합니다

### 양방향: 새로운 Mailchimp 가입이 B1 연락처가 됩니다

- **트리거** — Mailchimp: 새 구독자
- **작업** — B1: 사람 생성(이름/성/이메일 매핑)

## Make 대안

Make의 [Mailchimp 앱](https://www.make.com/en/integrations/mailchimp)은 44개 모듈을 포함합니다 — 연결은 동일하며 Zapier의 B1 *Watch Events* 트리거를 대체합니다. [Make 개요 문서](../make)에서 B1 측을 참조하세요.

## 제한 및 주의사항

- **Mailchimp의 무료 계층은 연락처 및 오디언스를 제한합니다** — Zap이 무료 오디언스를 한계를 초과하여 홍수로 만들면 `4xx Member limit reached`로 오류가 발생하기 시작합니다. Mailchimp의 로그는 이것을 분명히 합니다.
- **Mailchimp은 이메일로 중복 제거합니다** — 동일한 B1 사람에서 Zap을 다시 실행하면 제자리에서 업데이트합니다. 중복을 생성하지 않습니다.
- **Mailchimp의 가입 해제는 B1로 다시 흐르지 않습니다.** Mailchimp 가입 해제가 B1의 "메일 전송" 환경 설정을 지워야 하는 경우 역 Zap을 명시적으로 빌드하세요.

## 문제 해결

- **Zap이 실행되지 않음** — `설정 → 개발자 → 웹훅`에서 `Zapier — person.created` 행을 확인합니다. 없으면 API 키가 Zap을 켤 때 `settings:write`가 없었습니다. 다시 발급, 다시 연결, Zap을 껐다가 켜세요.
- **추가/업데이트에 `Member exists` 경고** — 작업을 *구독자 추가*에서 *구독자 추가/업데이트*로 전환합니다(동사가 중요합니다). upsert 변형은 멱등입니다.
- **이름 / 성이 비어 있음** — B1의 `data.name.first` 및 `data.name.last`는 해당 필드가 사람에 설정된 경우에만 채워집니다. 폴백으로 `data.name.display`를 매핑합니다.

## 참고도 보기

- [Zapier(개요)](../zapier) — 모든 Zapier 레시피의 B1 측
- [Make(개요)](../make) — 동일한 개념, 시각적 빌더
- [웹훅(개발자 참조)](/docs/developer/api/webhooks#event-catalog)
