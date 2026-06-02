---
title: "Slack & Discord"
---

# Slack & Discord

<div class="article-intro">

B1에서 직접 Slack 또는 Discord 채널로 읽기 쉬운 알림을 게시합니다 — 새 사람, 기부, 그룹 가입, 양식 제출, 캘린더 이벤트 등. 제3자 계정 없음, 유지할 Zap 없음: B1은 이벤트를 형식을 바꾸어 채팅 메시지로 만들고 자신의 웹훅 URL로 POST합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- B1Admin의 **설정 편집** 권한 필요
- 채널의 수신 웹훅을 생성할 Slack 작업 영역 또는 Discord 서버의 관리자
- 알림이 필요한 채널을 결정하세요(여러 이벤트 유형에 동일한 채널을 사용하거나 채널 간에 분할할 수 있음)

</div>

## 작동 방식

B1은 채팅 플랫폼의 **커넥터 유형**이 있습니다. **Slack** 또는 **Discord** 커넥터 유형으로 웹훅을 생성하면 웹훅 엔진은 여전히 배달 + 재시도 + 서명된 헤더 작업을 하지만 송부하는 본문은 B1의 일반 `{event,churchId,data}` 봉투에서 해당 서비스가 예상하는 작은 `{text}`(Slack) 또는 `{content}`(Discord) 메시지로 변형됩니다.

B1 서버는 기존 아웃바운드 웹훅 흐름 외에 교회 기준 Slack에 도달하지 않습니다 — 호스팅할 새 항목이 없고 지불할 추가 항목이 없습니다.

## Slack — 단계별

### 1. Slack 수신 웹훅 URL 가져오기

1. 알림이 필요한 Slack 작업 영역에서 [api.slack.com/apps](https://api.slack.com/apps)을 엽니다.
2. **새 앱 생성 → 처음부터** 클릭, 이름은 "B1 알림" 정도, 작업 영역을 선택합니다.
3. 왼쪽 탐색에서 **수신 웹훅**을 선택하고 **수신 웹훅 활성화**를 *켜기*로 전환합니다.
4. **작업 영역에 새 웹훅 추가**를 클릭, 채널(예: `#donations`) 선택 후 **허용**.
5. Slack이 페이지를 새 **웹훅 URL**로 돌려보냅니다 — `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…` 같은 모양. 복사하세요 — 이것이 B1이 필요로 하는 유일한 정보입니다.

:::caution
Slack 웹훅 URL을 비밀로 취급합니다. 채널로 임의의 메시지를 게시할 수 있습니다. 실수로 노출했으면 Slack 앱 페이지에서 재생성합니다(재생성은 URL을 회전하기만 합니다. B1을 업데이트하려면 일치시켜야 함).
:::

### 2. B1Admin에서 연결

1. B1Admin에서 **설정 → 개발자 → 웹훅**으로 이동합니다.
2. **새 웹훅**을 클릭합니다.
3. 채우세요:
   - **이름** — "기부 → #donations" 같은 읽을 수 있는 항목. 팀만 봅니다.
   - **커넥터 유형** — **Slack** 선택.
   - **페이로드 URL** — 1단계의 Slack URL을 붙여넣습니다.
   - **이벤트** — 메시지로 원하는 이벤트를 틱합니다. 기부 채널의 경우 `donation.created`만. #people 채널의 경우 `person.created` 및 `group.member.added` 시도.
4. **저장**을 클릭합니다. "서명 비밀" 대화가 나타납니다 — Slack(Slack이 B1 서명을 검증하지 않음)의 경우 무시할 수 있고 닫을 수 있습니다.

### 3. 테스트

목록에서 웹훅을 다시 열고 **테스트 이벤트 전송**을 클릭합니다. 1~2초 내에 메시지

> 💝 새 기부: $50.00

Slack 채널에 나타나고 같은 화면의 **최근 배달** 테이블에 `succeeded` 상태를 가진 새 행이 나타납니다. 완료됨.

## Discord — 단계별

### 1. Discord 웹훅 URL 가져오기

1. Discord 서버에서 알림이 필요한 채널 위에 마우스를 올리고 **⚙ 톱니바퀴**(채널 편집)를 클릭합니다.
2. **통합 → 웹훅 → 새 웹훅** 열기.
3. 이름을 지정하고(선택 사항적으로) 아바타를 지정한 후 **웹훅 URL 복사** — `https://discord.com/api/webhooks/123…/abc…` 같은 모양.

### 2. B1Admin에서 연결

Slack 흐름 위와 동일, **커넥터 유형**을 **Discord**로 설정. **페이로드 URL**에 Discord URL을 붙여넣고 저장합니다.

:::tip
Discord URL의 끝에 `/slack`을 추가할 필요가 없습니다 — B1은 Slack 호환 항목이 아닌 Discord 기본 `{content}` 페이로드를 보냅니다. Discord가 준 URL을 그냥 붙여넣으세요.
:::

### 3. 테스트

동일한 **테스트 이벤트 전송** 버튼 — Discord가 선택한 채널의 메시지를 표시하고 배달 로그가 `succeeded`로 뒤집힙니다.

## 메시지 모양

| 이벤트 | 예시 메시지 |
|---|---|
| `person.created` | 👤 새 사람 추가: Jordan Rivera |
| `person.updated` | 👤 사람 업데이트: Jordan Rivera |
| `group.created` | 👥 새 그룹 생성: 화요일 성경 공부 |
| `group.member.added` | ➕ 누군가 그룹에 추가되었습니다 |
| `donation.created` | 💝 새 기부: $50.00 |
| `donation.updated` | 💝 기부 업데이트: $75.00 |
| `attendance.recorded` | ✅ 출석 기록됨 |
| `form.submission.created` | 📝 새로운 양식 제출 수신됨 |
| `event.created` | 📅 새 이벤트: 부활절 예배 |

전체 목록은 [웹훅 이벤트 카탈로그](/docs/developer/api/webhooks#event-catalog)에 있습니다 — 그 곳의 모든 이벤트는 Slack/Discord로 라우팅될 수 있습니다.

## 주제별 하나의 채널

모든 이벤트를 한 곳에 두지 않아도 됩니다. 대부분의 교회는 몇 개의 웹훅을 설정합니다:

- **#donations** 채널이 `donation.created`만 수신
- **#new-people** 채널 `person.created` 및 `group.member.added`
- **#admin-alerts** 채널 — `form.submission.created` 같은 낮은 용량의 것

교회당 웹훅 수에는 제한이 없습니다. 각각은 독립적입니다 — 하나를 삭제하거나 비활성화해도 다른 것에는 영향을 주지 않습니다.

## 배달 검사

웹훅 편집기의 **최근 배달** 테이블은 마지막 50회 시도를 보여줍니다. 행을 클릭하여 정확한 송부된 페이로드와 받은 응답을 보세요. Slack 커넥터의 경우 페이로드는 `{"text":"💝 새 기부: $50.00"}` — B1이 배달 전에 변형하기 때문에 원본 `{event,churchId,...}` 봉투가 아닙니다.

뭔가 실패했으면(빨간색 `failed` 또는 `exhausted` 배지) 대화가 HTTP 상태 및 응답 본문을 표시합니다. Slack이나 Discord가 무엇을 싫어했는지 볼 수 있습니다 — 보통 URL에 복사-붙여넣기 오류입니다.

## 문제 해결

- **메시지가 나타나지 않음 + 배달 상태 `400`** — 보통 커넥터 유형이 **표준**이지만 URL은 Slack/Discord의 것입니다. Slack/Discord는 원본 봉투를 거부합니다. **Slack** 또는 **Discord**로 드롭다운을 전환하고 테스트를 다시 보냅니다.
- **웹훅 자동 비활성화** — 3회 연속 배달 실패 후 B1이 웹훅을 끕니다. URL을 수정합니다(또는 Slack/Discord에서 회전) 그리고 **활성**을 다시 켭니다.
- **메시지가 도착했지만 상세가 누락됨** — 모든 채팅 플랫폼이 메시지 크기를 제한합니다. B1의 메시지는 설계상 한 줄입니다. 더 풍부한 알림은 [Zapier](./zapier) 또는 [Make](./make)를 사용하여 Slack 작업을 통해 더 전체 Slack 메시지를 구성합니다.

## 나중에 커넥터 유형 전환

기존 웹훅의 커넥터 유형을 변경할 수 있습니다 — 다음 배달에 적용됩니다. Slack에서 표준으로 전환하면 URL을 자신의 HTTPS 엔드포인트로 가리키고 동일한 서명 비밀(웹훅이 생성될 때 발급됨)이 원본 봉투로 검증 가능해지기 시작합니다.

## 참고도 보기

- [Zapier](./zapier) — B1 이벤트로 트리거된 다단계 워크플로우
- [Make](./make) — 시각적 시나리오 빌더
- [웹훅(개발자 참조)](/docs/developer/api/webhooks) — 웹훅을 자신의 서버로 가리킬 때 전체 페이로드 + 서명 형식
