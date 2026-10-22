---
title: "Claude"
---

# Claude

<div class="article-intro">

교회에 대해 Claude에게 평범한 말로 물어보면 B1 데이터를 바탕으로 답해 줍니다. *"지난 일요일에 처음 방문한 사람이 몇 명이었나요?"* 또는 *"이번 달에 소그룹에 가입한 사람은 누구인가요?"* 같은 질문을 하거나, *"웹사이트에 이벤트라는 새 페이지를 추가해 주세요."* 처럼 일을 맡길 수도 있습니다. 설정은 3분도 걸리지 않으며 기술적인 지식이나 설치할 소프트웨어가 필요하지 않습니다.

</div>

<div class="prereqs">
<h4>필요한 것</h4>

- **Claude 계정.** **무료 요금제로도 됩니다** — 한번 사용해 보기에 좋은 방법입니다. 다만 무료 계정에는 하루 메시지 한도가 있고, B1에서 정보를 찾으면 메시지가 빨리 소진되므로 정기적으로 사용한다면 **Claude Pro** (월 약 $20)를 권장합니다.
- **B1 로그인** — B1 Admin에서 사용하는 것과 같은 로그인입니다.

</div>

:::tip 추천 — 무료로 사용해 보기
Claude는 B1을 AI에 연결하는 가장 쉬운 방법이며, Claude의 **무료 요금제** 에서도 작동합니다 — 비용을 내기 전에 교회가 먼저 사용해 보기에 딱 좋은 방법입니다.
:::

연결 방법은 두 가지입니다. **옵션 1이 가장 쉽습니다** — 키도 필요 없고 설치할 것도 없습니다.

## 옵션 1 — B1으로 로그인하기 (가장 쉬움)

Claude 웹사이트, Claude 데스크톱 앱, Claude 휴대폰 앱에서 모두 작동합니다 — 한 번만 설정하면 모든 곳에서 사용할 수 있습니다.

### 1단계 — Claude의 커넥터 설정 열기

1. [claude.ai](https://claude.ai) 로 이동하여 로그인하세요(또는 무료 계정을 만드세요).
2. 왼쪽 아래 모서리에 있는 이름을 클릭한 다음 **Settings** (설정) → **Connectors** (커넥터)를 클릭하세요.

### 2단계 — B1 추가하기

1. **Add** (추가)를 클릭한 다음 **Add custom connector** (사용자 정의 커넥터 추가)를 클릭하세요.
2. **Name** (이름): `B1` 을 입력하세요.
3. **URL:** `https://api.churchapps.org/mcp` 를 붙여넣으세요.
4. 다른 옵션은 그대로 두고 **Add** (추가)를 클릭하세요.

### 3단계 — B1에 로그인하기

1. **Connect** (연결)를 클릭하세요. B1 로그인 페이지가 열립니다.
2. B1 계정으로 로그인하세요. 여러 교회에 속해 있다면 상단에 올바른 교회가 표시되는지 확인하세요.
3. B1이 Claude가 요청하는 작업을 나열하고, **claude.ai** 로 돌아가게 된다는 것을 확인해 줍니다. **Allow** (허용)를 클릭하세요.

Claude로 돌아오면 B1이 연결된 것으로 표시됩니다.

### 4단계 — 무언가 물어보기

**새 채팅** 을 시작하고 다음을 시도해 보세요:

- *"우리 교회에 몇 명이 있나요?"*
- *"활동 중인 그룹을 나열해 주세요."*
- *"이번 달 기부를 기금별로 요약해 주세요."*
- *"최근 30일 동안 교회에 등록한 사람은 누구인가요?"*

처음에는 Claude가 B1 사용 권한을 요청합니다 — **Allow** (허용)를 클릭하세요.

## 옵션 2 — B1 키를 사용하는 데스크톱 확장 프로그램

제한된 권한(예: 보기 전용)을 가진 키를 Claude에 주고 싶다면 이 방법을 사용하세요. Mac 또는 Windows용 Claude 데스크톱 앱에서 작동하며, 키를 만들려면 B1에서 교회 설정을 관리할 권한이 필요합니다.

### 1단계 — Claude 앱 받기

[claude.com/download](https://claude.com/download) 에서 Claude 앱을 다운로드하여 설치하고, 연 다음 로그인하세요.

### 2단계 — B1 키 만들기

키는 Claude가 *귀 교회의* B1에 들어갈 수 있게 해 주는 것입니다 — Claude 전용 비밀번호라고 생각하시면 됩니다.

1. [B1 Admin](https://admin.b1.church) 에 로그인하고 [설정 → 개발자](https://admin.b1.church/settings/developer) 로 이동합니다.
2. **API 키** 탭에서 **새 API 키** 를 클릭합니다.
3. **이름:** `Claude` 를 입력합니다.
4. **범위:** Claude가 할 수 있는 일을 선택합니다. 각 영역에는 **read** 상자(보기만)와 **write** 상자(변경하기)가 있습니다. 잘 모르겠다면 처음에는 **read** 상자만 선택하세요 — 나중에 더 많은 권한을 가진 새 키를 만들 수 있습니다.
5. **저장** 을 클릭한 다음 키를 **복사** 합니다. 키는 한 번만 표시되므로 바로 3단계로 넘어가세요.

### 3단계 — Claude에 B1 추가하기

1. [B1 확장 프로그램 다운로드](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. 다운로드한 파일( `b1-churchapps.mcpb` )을 **더블클릭** 하세요. Claude가 열리고 **B1 (ChurchApps)** 가 표시됩니다.
3. **Install** (설치)을 클릭하세요.
4. **B1 API key** (B1 API 키)를 묻는 화면이 나오면 2단계에서 복사한 키를 붙여넣고 저장하세요.
5. **Claude를 완전히 종료** 한 후(Mac: **Cmd+Q** · Windows: 작업 표시줄의 Claude 아이콘을 마우스 오른쪽 버튼으로 클릭 → **Quit** (종료)) 다시 여세요.

더블클릭해도 Claude가 열리지 않으면 Claude에서 **Settings → Extensions → Advanced settings → Install Extension…** (설정 → 확장 프로그램 → 고급 설정 → 확장 프로그램 설치…)으로 이동하여 다운로드한 파일을 선택하세요. 그런 다음 새 채팅을 시작하고 무언가 물어보세요.

## 안전한가요?

- Claude는 **귀 교회의** 데이터만 볼 수 있습니다.
- **로그인 방식(옵션 1):** Claude는 본인의 B1 로그인으로 할 수 있는 것 이상은 절대 할 수 없습니다. B1 로그인 페이지에는 **Allow** (허용)를 클릭하기 전에 Claude가 할 수 있는 모든 일이 나열됩니다.
- **키 사용(옵션 2):** Claude는 키가 허용하는 일만 할 수 있습니다 — **read** 상자만 선택된 키는 볼 수만 있고 아무것도 변경할 수 없습니다.
- **사용 중지 방법:** B1 Admin에서 **설정 → 개발자** 로 이동하여 **연결된 앱** 에서 앱을 취소하거나(옵션 1) **API 키** 에서 키를 삭제하세요(옵션 2). 액세스가 즉시 중단됩니다. Claude에서 B1 커넥터의 **Disconnect** (연결 해제)를 클릭할 수도 있습니다.

## 비용은 얼마인가요?

B1 연결은 무료입니다 — ChurchApps의 일부입니다. Claude 자체에도 무료 요금제가 있으며, Claude Pro(월 약 $20)를 사용하면 훨씬 더 많이 사용할 수 있습니다. [claude.com/pricing](https://claude.com/pricing) 을 참조하세요.

## 기술 세부 정보

이 페이지의 나머지 부분은 기술 사용자와 AI 어시스턴트를 위한 내용입니다: 범위, 다른 연결 방법, 작동 방식.

### 범위

Claude는 B1 API에 내장된 **Model Context Protocol(MCP) 서버** ( `https://api.churchapps.org/mcp` )를 통해 B1과 통신합니다. 모든 호출은 B1 Admin의 요청과 동일한 인증, 권한 및 교회 범위 규칙을 통과합니다. Claude는 API 키의 **권한 및 범위** 로 제한되며, 웹훅, OAuth 관리 엔드포인트 또는 기타 운영자 전용 경로에 도달할 수 없습니다.

일반적인 시작 범위 세트:

- **읽기 전용 어시스턴트:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **읽기 + 메모/작업 추가:** `people:write` 추가
- **완전한 운영 어시스턴트:** 원하는 일치하는 `:write` 범위 추가

`donations:read` 키를 사용하면 Claude는 기부를 요약할 수 있지만 헌금을 기록할 수는 없습니다. `people:write` 키는 사람을 추가할 수 있지만 기부를 볼 수 없습니다. 각 범위가 허용하는 항목은 [API 키](/docs/developer/api/api-keys) 를 참조하세요.

### 다른 연결 방법

#### Claude Code(CLI)

터미널에서:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

완료되었습니다. Claude Code 세션 내에서 `/mcp` 를 입력하여 `b1` 서버가 연결되었는지 확인한 후 Claude에 교회에 대한 질문을 하세요.

#### Claude Desktop — 수동 설정(고급)

확장 프로그램을 사용하지 않으려면 Claude Desktop의 설정 파일을 편집하세요:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

`mcp-remote` 를 통해 B1에 연결하는 `b1` 서버 항목을 추가합니다([Node.js](https://nodejs.org) 필요):

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Claude Desktop을 다시 시작하세요. 채팅 작성기의 커넥터 메뉴에 `b1` 과 해당 도구가 표시됩니다.

#### Claude.ai(웹) — 사용자 정의 커넥터

위의 **옵션 1** 을 참조하세요. 이 커넥터는 OAuth 2.1을 사용합니다: Claude는 `https://api.churchapps.org/.well-known/oauth-protected-resource` 에서 B1의 인증 서버를 찾고, Dynamic Client Registration(동적 클라이언트 등록)으로 자신을 등록한 다음, PKCE로 로그인합니다. Team 및 Enterprise 요금제에서는 소유자가 먼저 조직에 커넥터를 추가해야 할 수 있습니다. Claude는 특정 범위를 요청하지 않으므로, 동의 페이지에는 로그인한 B1 계정이 액세스할 수 있는 모든 항목이 제시됩니다. B1 Admin의 **설정 → 개발자 → 연결된 앱** 에서 취소할 수 있습니다.

### 작동 방식

B1 API는 `/mcp` 에서 단일 MCP 엔드포인트를 노출합니다. Claude는 이것에 연결하여 `cak_…` 키로 인증하고 네 가지 도구에 액세스합니다:

| 도구 | 기능 |
|---|---|
| `list_endpoints` | Claude가 호출할 수 있는 REST 엔드포인트를 나열하며, 경로로 필터링 가능합니다. 탐색에 사용됩니다. |
| `describe_endpoint` | 특정 엔드포인트에 대한 짧은 요약과 예시 요청/응답을 반환합니다. |
| `api_call` | 인증된 사용자로 REST 엔드포인트를 실제로 호출합니다. |
| `describe_page_builder` | 교회 웹사이트 페이지를 만들고 편집하기 위한 가이드로, Claude가 웹사이트 콘텐츠 작업 전에 읽습니다. |

이는 B1Admin이 사용하는 것과 동일한 `/membership/people`, `/giving/donations`, `/attendance/visits` 등의 표면입니다 — 모든 권한 규칙이 동일하게 적용됩니다.

### 안전성 및 제한

- **교회별 격리.** API 키는 한 교회로 확인됩니다. Claude는 다른 교회의 데이터를 볼 방법이 없습니다.
- **권한 범위 지정.** B1Admin에서 키를 발급한 사람의 권한을 제거하면 Claude도 다음 호출에서 즉시 그 권한을 잃습니다.
- **취소 가능.** **설정 → 개발자 → API 키** 에서 키를 삭제하면 Claude의 액세스가 즉시 종료됩니다.
- **차단 목록.** 공급자 웹훅, OAuth 클라이언트 관리 엔드포인트 및 운영자 전용 `apiEmails` 경로는 MCP를 통해 호출할 수 없습니다.
- **응답 크기 제한.** 단일 도구 응답은 64KB로 제한되므로 긴 목록이 Claude의 컨텍스트를 초과하지 않습니다 — 이 경우 Claude는 필터로 쿼리를 좁힙니다.
- **감사 추적.** 변경 사항은 B1Admin 작업과 동일한 감사 로그를 통과합니다. **설정 → 감사 로그** 에서 검토할 수 있습니다.

### 문제 해결

**Claude가 "Unauthorized" 또는 401을 보고함:** 베어러 토큰이 누락되었거나 형식이 잘못되었거나 키가 취소되었습니다. 확장 프로그램을 사용한 경우 Claude에서 **Settings → Extensions → B1 (ChurchApps)** 를 열고 키를 다시 붙여넣으세요. 그렇지 않으면 `Authorization: Bearer cak_…` 헤더를 다시 확인하세요(공백과 리터럴 `Bearer` 에 주의하세요).

**도구 호출이 403을 반환함:** API 키에 해당 엔드포인트의 범위가 없습니다. **설정 → 개발자 → API 키** 에서 범위를 추가하세요(범위는 제자리에서 변경할 수 없으므로 새 키를 생성해야 함). 그런 다음 새 키를 확장 프로그램 설정 또는 Claude의 설정에 붙여넣으세요.

**Claude가 엔드포인트를 찾을 수 없음:** Claude에 필터를 사용하여 `list_endpoints` 를 호출하도록 요청하세요. 예: *"'donations' 필터로 list_endpoints를 사용해서 올바른 경로를 찾아 줘"*. 경로 목록은 라이브 API에서 생성되므로 `curl` 로 도달할 수 있는 모든 항목이 있습니다.

**로컬 개발:** `https://api.churchapps.org/mcp` 를 `http://localhost:8084/mcp` 로 바꾸세요 — 동일한 인증, 동일한 도구입니다.

## 관련

- [API 키](/docs/developer/api/api-keys) — 전체 범위 참조
- [MCP 서버(개발자 참조)](/docs/developer/api/mcp) — 프로토콜 세부정보 및 도구 스키마
- [ChatGPT](./chatgpt) — OpenAI의 모델을 위한 동일한 개념
