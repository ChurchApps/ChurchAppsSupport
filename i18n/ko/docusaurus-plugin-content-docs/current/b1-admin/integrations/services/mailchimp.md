---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

새로운 B1 사람, 기부자 또는 그룹 멤버를 Mailchimp 오디언스로 파이프하여 다음 환영 시리즈, 연말 호소 또는 자원봉사자 뉴스레터가 항상 최신 목록에서 끌어오도록 할 수 있습니다. B1에는 내장된 Mailchimp 동기화가 없습니다. 배선은 전적으로 Zapier(또는 Make)에서 이루어집니다: B1이 이벤트를 발생시키면 Mailchimp이 구독자를 수집합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- B1 사람을 푸시하려는 최소 1개의 오디언스가 있는 [Mailchimp](https://mailchimp.com) 계정
- [Zapier](https://zapier.com) 계정(무료 계층은 소규모 교회 커버)
- API 키를 생성할 수 있도록 **Edit Settings** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 것

| 방향 | B1 트리거 | Mailchimp 작업 |
|---|---|---|
| B1 → Mailchimp | `person.created` | Add/Update Subscriber |
| B1 → Mailchimp | `donation.created` | Add Subscriber to Tag (예: "Gave in 2026") |
| B1 → Mailchimp | `group.member.added` | Add Subscriber to Tag scoped to that group |
| Mailchimp → B1 | New Subscriber | B1 *Create Person* |

Mailchimp 측은 더 많은 것을 노출합니다(캠페인, 세그먼트, 자동화). 전체 목록은 [Mailchimp의 Zapier 트리거](https://zapier.com/apps/mailchimp/integrations)를 참조하세요. B1 봉투에서 매핑할 수 있는 모든 것이 가능합니다.

## 설정

### 1. B1 API 키 생성

B1Admin에서 **Settings → Developer → API Keys → New API Key**로 이동합니다. Zap에 필요한 범위를 지정합니다:

- `settings:write` -- 트리거가 webhook을 등록하는 데 필요
- `people:read` -- Zap이 이름/성, 이메일 등을 읽을 수 있도록
- (선택 사항) Mailchimp → B1 방향도 계획하는 경우 `people:write`

저장하고 `cak_…` 문자열을 복사합니다. 한 번만 표시됩니다.

### 2. Zap 빌드

1. **트리거:** `B1.church — New Person`. 처음 사용할 때 Zapier는 *Sign in to B1.church*를 요청합니다. API 키를 붙여넣습니다.
2. **작업:** `Mailchimp — Add/Update Subscriber`. 트리거 출력을 매핑합니다:
   - `data.contactInfo.email` → Email Address
   - `data.name.first` → First Name
   - `data.name.last` → Last Name
   - (선택 사항) `data.id` → B1의 person id를 나란히 유지하려면 Mailchimp merge 필드
3. Zap을 켭니다. Zapier는 B1에 `person.created` webhook을 등록합니다. **Settings → Developer → Webhooks**에서 "Zapier — person.created"라는 행이 나타나는지 확인합니다.

완료입니다. B1Admin에서 사람을 추가하여 확인합니다. 새 구독자가 몇 초 내에 Mailchimp에 나타납니다.

## 일반적인 레시피

### 기부자에 자동으로 태그 지정

- **트리거** -- B1: New Donation
- **작업** -- B1: Find Person (`personId`로 조회) 이메일을 가져옵니다
- **작업** -- Mailchimp: Add Subscriber to Tag (태그 `Gave-2026`)

### 그룹별 환영 시리즈 시작

- **트리거** -- B1: New Group Member, `data.groupId`로 필터링
- **작업** -- Mailchimp: Add Subscriber to Tag 그룹 이름; 해당 태그에서 기존 자동화 트리거

### 양방향: 새 Mailchimp 가입자가 B1 연락처가 됨

- **트리거** -- Mailchimp: New Subscriber
- **작업** -- B1: Create Person (First/Last/Email 매핑)

## Make 대안

Make의 [Mailchimp 앱](https://www.make.com/en/integrations/mailchimp)은 44개 모듈을 다룹니다. 배선은 동일하며 B1 *Watch Events* 트리거가 Zapier를 대체합니다. B1 측은 [Make 개요 문서](../make)를 참조하세요.

## 제한 사항 및 참고 사항

- **Mailchimp의 무료 계층은 연락처 및 오디언스를 제한합니다** -- 무료 오디언스를 한계를 넘어 범위하는 Zap은 `4xx Member limit reached`로 오류가 발생하기 시작합니다. Mailchimp의 로그가 이를 명확하게 합니다.
- **Mailchimp은 이메일로 중복을 제거합니다**. 동일한 B1 사람에 대해 Zap을 다시 실행하면 제자리에서 업데이트됩니다. 중복을 만들지 않습니다.
- **Mailchimp의 구독 취소는 B1으로 다시 흐르지 않습니다.** Mailchimp 구독 취소가 B1의 "Send Mail" 환경설정을 지우길 원하면 역방향 Zap을 명시적으로 빌드합니다.

## 문제 해결

- **Zap이 작동하지 않습니다** -- `Settings → Developer → Webhooks`에서 `Zapier — person.created` 행을 확인합니다. 없으면 Zap이 켜질 때 API 키에 `settings:write`가 없었습니다. 다시 생성, 다시 연결, Zap 끄고 켜기를 전환합니다.
- **Add/Update에 `Member exists` 경고** -- 작업을 *Add Subscriber*에서 *Add/Update Subscriber*로 전환합니다(동사가 중요합니다). upsert 변형은 멱등입니다.
- **이름 / 성이 공백으로 표시됩니다** -- B1의 `data.name.first` 및 `data.name.last`는 해당 필드가 사람에 대해 설정된 경우에만 채워집니다. `data.name.display`를 폴백으로 매핑합니다.

## 참고 항목

- [Zapier (overview)](../zapier) -- 모든 Zapier 레시피의 B1 측
- [Make (overview)](../make) -- 동일한 아이디어, 시각적 빌더
- [Webhooks (developer reference)](/docs/developer/api/webhooks#event-catalog)
