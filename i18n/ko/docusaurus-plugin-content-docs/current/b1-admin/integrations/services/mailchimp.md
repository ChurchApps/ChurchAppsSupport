---
title: "Mailchimp"
description: "B1 Admin의 사람과 그룹 또는 저장된 목록 구성원을 태그로 Mailchimp 대상자에 동기화하세요. 설정, 초기 가져오기, 문제 해결 단계를 안내합니다."
---

# Mailchimp

<div class="article-intro">

Mailchimp 대상자를 B1과 자동으로 동기화 상태로 유지하세요. 사람은 이름, 이메일, 전화번호와 함께 들어오고, 그룹과 목록 구성원 자격은 Mailchimp 태그가 되며, 삭제된 사람은 보관 처리됩니다. 이 동기화는 B1에 내장되어 있습니다. 제3자 서비스도, 작업별 과금도 없으며, 변경 사항은 밤마다 한 번이 아니라 거의 실시간으로 반영됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- B1이 관리하기를 원하는 대상자가 있는 [Mailchimp](https://mailchimp.com) 계정
- Mailchimp **API 키**(Mailchimp: 프로필 아이콘 → **Account & billing → Extras → API keys**)
- **Audience ID**(Mailchimp: **Audience → Settings → Audience name and defaults**)
- **Edit Settings** 권한이 있는 B1Admin 사용자

</div>

## 동기화되는 항목 {#what-syncs}

| B1의 변경 | Mailchimp에서의 결과 |
|---|---|
| 사람 추가 또는 업데이트 | 구독자 추가/업데이트(이름, 성, 전화번호. 새 구독자는 `subscribed` 상태로 들어옴) |
| 사람 삭제(또는 GDPR에 따른 삭제) | 구독자 보관 처리 |
| 사람이 그룹에 가입 | 그룹 이름을 딴 태그 추가 |
| 사람이 그룹에서 탈퇴 | 해당 태그 제거 |
| 사람이 저장된 목록에 들어감 | 목록 이름을 딴 태그 추가 |
| 사람이 저장된 목록에서 나감 | 해당 태그 제거 |

**저장된 목록이 대개 더 나은 태그 원천입니다.** B1 [저장된 목록](/docs/b1-admin/people/lists)은 규칙 기반 대상자로, 스스로 다시 평가됩니다. 예를 들어 "북쪽 캠퍼스의 모든 사람", "목회 이메일을 수신하기로 동의한 구성원"과 같습니다. Mailchimp 세그먼트를 목록 태그에 연결하면 동기화가 이를 자동으로 유지합니다. 사역팀 메일에는 그룹 태그를 사용하세요.

동기화는 **단방향**(B1 → Mailchimp)이며 Mailchimp의 표준 필드만 건드리므로, Mailchimp 안에서 관리하는 병합 필드나 세그먼트와 충돌하지 않습니다.

## 설정 {#setup}

1. B1Admin에서 **Settings → Developer → Webhooks → New Webhook**으로 이동하세요.
2. **Connector Type**을 **Mailchimp**로 설정하세요.
3. **Mailchimp API Key**와 **Audience ID**를 붙여넣으세요. 키는 암호화되어 저장되며 다시 표시되지 않습니다.
4. 관련 이벤트는 미리 선택되어 있습니다. 원하지 않는 항목은 선택을 해제하세요(예: 사람 이벤트는 켜 두고 그룹 태그는 건너뛰기).
5. 저장하세요. B1은 저장을 받아들이기 전에 Mailchimp에서 키와 대상자를 확인합니다. 오타가 있으면 즉시 이유와 함께 실패합니다.

웹훅을 다시 열고 언제든지 **Send Test Event**를 클릭하여 연결을 다시 확인할 수 있습니다(Mailchimp의 경우 샘플 구독자를 보내는 대신 키와 대상자를 확인합니다). 모든 동기화 시도는 Mailchimp의 실제 응답과 함께 웹훅의 전송 기록에 남으며, 실패한 전송은 약 5일 동안 점진적으로 자동 재시도됩니다.

## 초기 가져오기 {#initial-import}

연결 도구는 켜진 시점부터의 *변경 사항*만 동기화하며, 기존 디렉터리를 소급해서 채우지는 않습니다. 설정 당일에는 다음과 같이 하세요:

1. B1Admin에서 **People**로 이동하여 원하는 사람을 검색하거나(또는 저장된 목록을 실행) **Export**를 클릭하여 CSV를 내려받으세요.
2. Mailchimp에서 **Audience → Import contacts**를 사용하여 CSV를 불러오고, 가져오는 동안 태그를 적용하세요.

초기 불러오기를 Mailchimp의 가져오기 기능으로 하면 동의 여부를 직접 통제할 수 있습니다. 실제로 이메일 수신에 동의한 사람만 가져오세요. 디렉터리 전체를 구독 연락처로 일괄 가져오면 Mailchimp 약관과 스팸 방지 법규(CAN-SPAM/GDPR)를 위반할 수 있습니다.

## 제한 사항 및 참고 {#limits--notes}

- **단방향 동기화.** Mailchimp에서 구독 취소, 반송, 수정한 내용은 B1으로 돌아오지 않습니다. Mailchimp에서 구독을 취소한 사람도 B1에서 직접 보낸 이메일은 계속 받을 수 있습니다. 대량 메일 동의의 원본은 Mailchimp로 보세요.
- **이메일이 없는 사람은 건너뜁니다**(전송 기록에 그렇게 기록됩니다). Mailchimp 구독자는 이메일로 구분되기 때문입니다.
- **이메일 주소를 바꾸면 새 구독자가 생성됩니다.** Mailchimp는 이메일로 사람을 구분하므로, B1에서 누군가의 이메일을 바꾸면 새 주소로 추가됩니다. 이전 구독자는 Mailchimp에서 직접 보관 처리하기 전까지 남아 있습니다.
- **표준 필드만 동기화됩니다** — 이름, 성, 전화번호. 교인 상태, 캠퍼스, B1의 사용자 지정 필드는 이 버전에서 Mailchimp 병합 필드에 매핑되지 않으므로, 세그먼트는 목록 태그로 나누세요.
- **태그 이름은 그룹/목록 이름입니다.** 그룹이나 목록의 이름을 바꾸면 새 이름으로 태그가 붙기 시작합니다. 기존 구독자에게 있던 이전 태그는 Mailchimp에서 직접 제거하기 전까지 남아 있습니다.
- **Mailchimp의 연락처 한도는 여전히 적용됩니다** — 동기화로 무료 요금제 대상자가 한도를 넘으면 전송 기록에 `Member limit reached` 오류가 기록됩니다.

## 기타 활용 예시 (Zapier / Make) {#other-recipes-zapier--make}

대상자 동기화 이외의 작업, 예를 들어 `donation.created`에서 헌금자에게 태그 붙이기, Mailchimp → B1 역방향 동기화, 또는 완전히 다른 이메일 플랫폼(Constant Contact, Brevo 등)과의 동기화는 여전히 [Zapier](../zapier.md) 또는 [Make](../make.md)로 할 수 있습니다. 두 도구 모두 같은 웹훅 이벤트에서 트리거됩니다:

- **헌금자에게 태그 붙이기:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **양방향:** Mailchimp *New Subscriber* → B1 *Create Person*

이전에 사람/그룹 동기화를 Zapier로 연결해 두었다면, 기본 연결 도구를 켠 뒤 해당 Zap을 끄세요. 둘 다 실행하면 모든 이벤트가 두 번 처리되고, 쓸데없이 Zapier 작업이 소모됩니다.

## 문제 해결 {#troubleshooting}

- **저장 실패: "Mailchimp rejected the API key"** — 키가 취소되었거나 오타가 있습니다. 키는 `-us21`과 같은 데이터 센터 접미사로 끝나야 합니다.
- **저장 실패: "audience not found"** — 해당 계정에 Audience ID가 없습니다. **Audience → Settings → Audience name and defaults**에서 복사하세요(대상자의 이름이 아닙니다).
- **사람이 Mailchimp에 나타나지 않음** — 웹훅의 전송 기록을 확인하세요. "Skipped: person has no email address"는 말 그대로 이메일 주소가 없다는 뜻입니다. Mailchimp의 `4xx` 응답은 응답 본문에 이유가 나옵니다.
- **전송이 완전히 멈춤** — 전송이 반복해서 모두 실패하면 웹훅이 자동으로 비활성화됩니다. 원인(보통 취소된 키)을 해결하고, 다시 활성화한 다음 **Send Test Event**로 확인하세요.

## 함께 보기 {#see-also}

- [웹훅(개발자 참고)](/docs/developer/api/webhooks) — 기반 엔진, 이벤트 카탈로그, 전송/재시도 방식
- [저장된 목록](/docs/b1-admin/people/lists) — Mailchimp 태그에 자연스럽게 대응하는 규칙 기반 대상자
- [Zapier(개요)](../zapier.md) — 대상자 동기화 이외의 활용 예시
