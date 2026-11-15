---
title: "Slack & Discord"
description: "수신 웹훅을 사용하여 새 사람, 헌금, 양식 제출과 같은 B1 Admin 이벤트를 Slack 또는 Discord 채널에 게시하세요. Zapier는 필요하지 않습니다."
---

# Slack & Discord

<div class="article-intro">

새 사람, 헌금, 그룹 신청, 양식 제출, 캘린더 행사 등을 B1에서 Slack 또는 Discord 채널로 바로 읽기 쉬운 알림으로 보내세요. 제3자 계정도, 관리할 Zap도 필요 없습니다. B1이 이벤트를 채팅 메시지 형식으로 바꾸어 채널의 웹훅 URL로 직접 POST합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- B1Admin에서 **Edit Settings** 권한이 필요합니다
- 채널의 수신 웹훅을 만들 수 있는 Slack 워크스페이스 또는 Discord 서버의 관리자
- 알림을 받을 채널을 정하세요(여러 이벤트 유형에 같은 채널을 쓰거나, 채널을 나눌 수 있습니다)

</div>

## 작동 방식 {#how-it-works}

B1에는 채팅 플랫폼용 기본 **Connector Type**이 있습니다. 유형을 **Slack** 또는 **Discord**로 한 웹훅을 만들면, 웹훅 엔진은 평소와 같이 전송, 재시도, 서명된 헤더 처리를 수행하지만, 보내는 본문은 B1의 일반 `{event,churchId,data}` 봉투에서 해당 서비스가 요구하는 작은 `{text}`(Slack) 또는 `{content}`(Discord) 메시지 형식으로 바뀝니다.

기존 아웃바운드 웹훅 흐름 외에는 B1 서버가 교회별로 Slack에 직접 접속하지 않습니다. 새로 호스팅할 것도, 추가로 낼 비용도 없습니다.

## Slack — 단계별 안내 {#slack--step-by-step}

### 1. Slack 수신 웹훅 URL 받기 {#1-get-a-slack-incoming-webhook-url}

1. 알림을 받으려는 Slack 워크스페이스에서 [api.slack.com/apps](https://api.slack.com/apps)를 여세요.
2. **Create New App → From scratch**를 클릭하고 "B1 Notifications" 같은 이름을 붙인 다음 워크스페이스를 고르세요.
3. 왼쪽 메뉴에서 **Incoming Webhooks**를 선택하고 **Activate Incoming Webhooks**를 *On*으로 전환하세요.
4. **Add New Webhook to Workspace**를 클릭하고 채널(예: `#donations`)을 고른 다음 **Allow**를 클릭하세요.
5. Slack이 새 **Webhook URL**이 표시된 페이지로 돌아갑니다. URL은 `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…` 형식입니다. 복사하세요. B1에 필요한 정보는 이것뿐입니다.

:::caution
Slack 웹훅 URL은 비밀로 취급하세요. 이 URL을 가진 누구나 채널에 임의의 메시지를 게시할 수 있습니다. 실수로 노출했다면 Slack 앱 페이지에서 다시 생성하세요(재생성하면 URL만 바뀌므로, B1에서도 새 URL로 업데이트하세요).
:::

### 2. B1Admin에서 연결하기 {#2-connect-it-in-b1admin}

1. B1Admin에서 **Settings → Developer → Webhooks**로 이동하세요.
2. **New Webhook**을 클릭하세요.
3. 다음을 입력하세요:
   - **Name** — "Donations → #donations"처럼 알아보기 쉬운 이름. 팀원만 볼 수 있습니다.
   - **Connector Type** — **Slack**을 선택하세요.
   - **Payload URL** — 1단계의 Slack URL을 붙여넣으세요.
   - **Events** — 메시지로 받고 싶은 이벤트를 체크하세요. 헌금 채널이라면 `donation.created`만 체크하세요. #people 채널이라면 `person.created`와 `group.member.added`를 시도해 보세요.
4. **Save**를 클릭하세요. "Signing Secret" 대화상자가 나타나는데, Slack은 B1 서명을 확인하지 않으므로 무시하고 닫으셔도 됩니다.

### 3. 테스트하기 {#3-test-it}

목록에서 웹훅을 다시 열고 **Send Test Event**를 클릭하세요. B1은 체크한 이벤트 중 첫 번째 이벤트의 샘플을 보냅니다. 몇 초 안에 다음과 같은 메시지가 Slack 채널에 나타나야 합니다:

> 💝 New donation: $50.00

같은 화면의 **Recent Deliveries** 표에도 상태 `succeeded`인 새 행이 나타납니다. 끝났습니다.

## Discord — 단계별 안내 {#discord--step-by-step}

### 1. Discord 웹훅 URL 받기 {#1-get-a-discord-webhook-url}

1. Discord 서버에서 알림을 받을 채널 위에 마우스를 올리고 **⚙ 톱니바퀴**(Edit Channel)를 클릭하세요.
2. **Integrations → Webhooks → New Webhook**을 여세요.
3. 이름을 정하고(선택 사항으로 아바타도), **Copy Webhook URL**을 클릭하세요. URL은 `https://discord.com/api/webhooks/123…/abc…` 형식입니다.

### 2. B1Admin에서 연결하기 {#2-connect-it-in-b1admin-1}

위의 Slack 절차와 같지만, **Connector Type**만 **Discord**로 설정하세요. Discord URL을 **Payload URL**에 붙여넣고 저장하세요.

:::tip
Discord URL 끝에 `/slack`을 붙일 **필요가 없습니다**. B1은 Slack 호환 형식이 아니라 Discord 고유의 `{content}` 페이로드를 보냅니다. Discord가 준 URL을 그대로 붙여넣으세요.
:::

### 3. 테스트하기 {#3-test-it-1}

같은 **Send Test Event** 버튼을 사용하세요. Discord는 선택한 채널에 메시지를 표시하고, 전송 기록이 `succeeded`로 바뀝니다.

## 메시지 모습 {#what-the-messages-look-like}

| 이벤트 | 메시지 예시 |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

전체 목록은 [웹훅 이벤트 카탈로그](/docs/developer/api/webhooks#event-catalog)에 있습니다. 그곳의 어떤 이벤트든 Slack/Discord로 보낼 수 있습니다.

## 주제별로 채널 하나씩 {#one-channel-per-topic}

모든 이벤트를 한곳에 넣을 필요는 없습니다. 대부분의 교회는 웹훅을 몇 개 설정합니다:

- `donation.created`만 듣는 **#donations** 채널
- `person.created`와 `group.member.added`를 위한 **#new-people** 채널
- `form.submission.created`처럼 메시지가 적은 항목을 위한 **#admin-alerts** 채널

교회당 웹훅 개수에는 제한이 없습니다. 각 웹훅은 독립적이므로, 하나를 삭제하거나 비활성화해도 다른 웹훅에는 영향이 없습니다.

## 전송 내역 확인하기 {#inspecting-deliveries}

웹훅 편집기의 **Recent Deliveries** 표는 최근 시도 50개를 보여 줍니다. 행을 클릭하면 실제로 보낸 페이로드와 돌아온 응답을 볼 수 있습니다. Slack 커넥터의 경우 페이로드는 원시 `{event,churchId,...}` 봉투가 아니라 `{"text":"💝 New donation: $50.00"}`입니다. B1이 전송 전에 형식을 바꾸기 때문입니다.

실패한 경우(B1이 아직 재시도 중이면 노란색 `failed` 배지, 재시도를 포기했으면 빨간색 `exhausted` 배지)에는 **Response** 열에 HTTP 상태가 표시되고, 행의 대화상자에 응답 본문이 표시됩니다. 그래서 Slack이나 Discord가 무엇을 거부했는지 정확히 확인할 수 있습니다. 보통 URL을 잘못 복사/붙여넣기한 것입니다. 해당 전송을 다시 보내려면 **Redeliver**를 클릭하세요.

## 문제 해결 {#troubleshooting}

- **메시지가 나타나지 않고 전송 상태가 `400`** — 대부분 Connector Type이 **Standard**로 되어 있는데 URL은 Slack/Discord URL이기 때문입니다. Slack/Discord는 원시 봉투를 거부합니다. 드롭다운을 **Slack** 또는 **Discord**로 바꾸고 테스트를 다시 보내세요.
- **웹훅이 자동으로 비활성화됨** — B1은 실패한 전송을 약 5일 동안 재시도합니다. 연속으로 세 번의 전송이 재시도를 모두 소진하면 B1은 웹훅을 끕니다(상태가 **Disabled**로 표시됨). URL을 고치거나(Slack/Discord에서 교체), **Active**를 다시 켜고 저장하세요.
- **메시지는 도착했지만 세부 내용이 빠짐** — 모든 채팅 플랫폼은 메시지 크기를 제한합니다. B1의 메시지는 설계상 한 줄짜리입니다. 더 풍부한 알림이 필요하다면 [Zapier](./zapier.md)나 [Make](./make.md)를 사용하여 Slack 작업으로 더 자세한 Slack 메시지를 만드세요.

## 나중에 커넥터 유형 바꾸기 {#switching-connector-types-later}

기존 웹훅의 Connector Type은 바꿀 수 있으며, 다음 전송부터 적용됩니다. Slack에서 Standard로 바꾼다면, URL을 자체 HTTPS 엔드포인트로 지정하세요. 웹훅을 만들 때 발급된 같은 서명 비밀을 사용하면 원시 봉투를 검증할 수 있습니다.

## 함께 보기 {#see-also}

- [Zapier](./zapier.md) — B1 이벤트로 트리거되는 다단계 워크플로용
- [Make](./make.md) — 시각적 시나리오 빌더
- [웹훅(개발자 참고)](/docs/developer/api/webhooks) — 웹훅을 자체 서버로 보낼 때 필요한 전체 페이로드와 서명 형식
