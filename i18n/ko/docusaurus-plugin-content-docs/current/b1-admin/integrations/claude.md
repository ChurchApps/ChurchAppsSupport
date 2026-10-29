---
title: "Claude"
---

# Claude

<div class="article-intro">

Claude에게 교회에 대해 일상 언어로 물어보면, B1 데이터(FreePlay 수업과 교실 포함)를 바탕으로 답해 줍니다. *"일요일에 처음 방문한 사람이 몇 명이었나요?"* 또는 *"이번 달에 소그룹에 가입한 사람은 누구인가요?"*처럼 질문하거나, *"우리 웹사이트에 Events라는 새 페이지를 추가해 주세요."*처럼 작업을 요청할 수도 있습니다. 설정은 3분도 걸리지 않으며, 설치에 어떤 기술이나 소프트웨어 지식도 필요하지 않습니다.

</div>

<div class="prereqs">
<h4>필요한 것</h4>

- **Claude 계정.** **무료 요금제도 사용할 수 있습니다** -- 한번 시도해 보기에 좋습니다. 다만 무료 계정에는 하루 메시지 한도가 있고, B1에서 정보를 조회하면 메시지를 빠르게 사용하므로, 자주 사용할 계획이라면 **Claude Pro**(월 약 $20)를 권장합니다.
- **B1 로그인 정보.** B1 Admin에 사용하는 것과 같은 로그인 정보입니다.

</div>

:::tip 추천 -- 무료로 시험해 볼 수 있습니다
Claude는 B1을 AI와 연결하는 가장 쉬운 방법이며, Claude의 **무료 요금제**에서도 작동합니다. 비용을 내기 전에 교회에서 시험해 보기에 알맞습니다.
:::

연결 방법은 두 가지입니다. **옵션 1이 가장 쉽습니다** -- 키가 필요 없고 따로 설치할 것도 없습니다.

## 옵션 1 — B1로 로그인하기 (가장 쉬움)

Claude 웹사이트, Claude 데스크톱 앱, Claude 휴대폰 앱에서 모두 작동합니다. 한 번만 설정하면 모든 곳에서 사용할 수 있습니다.

### 1단계 — Claude의 커넥터 설정 열기

1. [claude.ai](https://claude.ai)로 이동하여 로그인합니다(또는 무료 계정을 만듭니다).
2. 왼쪽 아래의 이름을 클릭한 다음 **Settings** → **Connectors**를 선택합니다.

### 2단계 — B1 추가하기

1. **Add**를 클릭한 다음 **Add custom connector**를 클릭합니다.
2. **Name:** `B1`을 입력합니다.
3. **URL:** `https://api.churchapps.org/mcp`를 붙여 넣습니다.
4. 다른 옵션은 그대로 두고 **Add**를 클릭합니다.

### 3단계 — B1에 로그인하기

1. **Connect**를 클릭합니다. B1 로그인 페이지가 열립니다.
2. B1 계정으로 로그인합니다. 여러 교회에 속해 있다면 맨 위에 올바른 교회가 표시되어 있는지 확인하세요.
3. B1은 Claude가 요청하는 작업을 나열하고, 작업이 끝나면 **claude.ai**로 돌아간다고 알려 줍니다. **Allow**를 클릭합니다.

Claude로 돌아오면 B1이 연결된 상태로 표시됩니다.

### 4단계 — 질문해 보기

**새 채팅**을 시작하고 다음과 같이 물어보세요.

- *"우리 교회에는 몇 명이 있나요?"*
- *"활동 중인 그룹을 나열해 주세요."*
- *"이번 달 펀드별 헌금 요약을 해 주세요."*
- *"지난 30일 동안 교회에 가입한 사람은 누구인가요?"*

처음에는 Claude가 B1을 사용할 권한을 물어봅니다. **Allow**를 클릭하세요.

## 옵션 2 — B1 키로 데스크톱 확장 프로그램 사용하기

Claude에게 권한이 제한된 키(예: 조회만 가능)를 주고 싶다면 이 방법을 사용하세요. Mac 또는 Windows용 Claude 데스크톱 앱에서 작동하며, 키를 만들려면 B1에서 교회 설정을 관리할 권한이 필요합니다.

### 1단계 — Claude 앱 받기

[claude.com/download](https://claude.com/download)에서 Claude 앱을 내려받아 설치하고, 열어서 로그인하세요.

### 2단계 — B1 키 만들기

키는 Claude가 *여러분의* 교회 B1에 접근할 수 있게 해 주는 것입니다. Claude 전용 비밀번호라고 생각하면 됩니다.

1. [B1 Admin](https://admin.b1.church)에 로그인하고 [Settings → Developer](https://admin.b1.church/settings/developer)로 이동합니다.
2. **API Keys** 탭에서 **New API Key**를 클릭합니다.
3. **Name:** `Claude`를 입력합니다.
4. **Scopes:** Claude가 할 수 있는 작업을 체크합니다. 각 영역에는 **read**(조회만 가능) 상자와 **write**(변경 가능) 상자가 있습니다. 잘 모르겠다면 처음에는 **read** 상자만 체크하세요. 나중에 더 많은 권한을 가진 새 키를 만들 수 있습니다.
5. **Save**를 클릭한 다음 키를 **Copy**합니다. 키는 한 번만 표시되므로 바로 3단계로 넘어가세요.

### 3단계 — Claude에 B1 추가하기

1. [B1 확장 프로그램을 내려받으세요](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. 내려받은 파일(`b1-churchapps.mcpb`)을 **더블 클릭**합니다. Claude가 열리며 **B1 (ChurchApps)**를 표시합니다.
3. **Install**을 클릭합니다.
4. **B1 API 키**를 물어보면 2단계에서 복사한 키를 붙여 넣고 저장합니다.
5. Claude를 **완전히 종료**한 다음(Mac: **Cmd+Q** · Windows: 작업 표시줄의 Claude 아이콘을 마우스 오른쪽 버튼으로 클릭 → **Quit**) 다시 엽니다.

더블 클릭해도 Claude가 열리지 않는다면, Claude에서 **Settings → Extensions → Advanced settings → Install Extension…**으로 이동하여 내려받은 파일을 선택하세요. 그다음 새 채팅을 시작하여 질문해 보세요.

:::tip 이미 확장 프로그램을 설치했나요?
따로 할 일은 없습니다. FreePlay도 같은 연결을 통해 작동합니다. 예외는 버전 1.1.0입니다. 이 버전은 B1 이메일과 비밀번호를 요구했으므로, 업데이트하려면 확장 프로그램을 다시 내려받아 설치하세요. 키는 그대로 유지됩니다.
:::

## 안전한가요?

- Claude는 **여러분 교회의** 데이터만 볼 수 있습니다.
- **로그인 방식(옵션 1):** Claude는 여러분 자신의 B1 로그인이 할 수 있는 것 이상은 할 수 없습니다. B1 로그인 페이지에는 **Allow**를 누르기 전에 Claude가 할 수 있는 모든 작업이 나열됩니다.
- **키 방식(옵션 2):** Claude는 B1에서 키가 허용한 작업만 할 수 있습니다. **read** 상자만 체크된 키는 조회만 할 수 있고 아무것도 변경할 수 없습니다. FreePlay도 같은 키로 같은 방식으로 작동합니다.
- **끄는 방법:** B1 Admin에서 **Settings → Developer**로 이동하여, **Connected Apps**에서 앱을 취소하세요(옵션 1). 또는 **API Keys**에서 키를 삭제하세요(옵션 2). 접근은 즉시 중단됩니다. Claude에서 B1 커넥터의 **Disconnect**를 클릭해도 됩니다.

## 비용은 얼마인가요?

B1 연결은 무료입니다. ChurchApps의 일부로 제공됩니다. Claude 자체에도 무료 요금제가 있으며, Claude Pro(월 약 $20)를 사용하면 훨씬 많이 쓸 수 있습니다. [claude.com/pricing](https://claude.com/pricing)을 참고하세요.

## 기술 세부 정보

이 페이지의 나머지 내용은 기술 사용자와 AI 어시스턴트를 위한 것입니다. 권한 범위(scopes), 다른 연결 방법, 작동 원리를 다룹니다.

### 권한 범위(Scopes)

Claude는 B1 API에 내장된 **Model Context Protocol(MCP) 서버**(`https://api.churchapps.org/mcp`)를 통해 B1과 통신합니다. 모든 호출은 B1 Admin의 요청과 같은 인증, 권한, 교회 범위 규칙을 거칩니다. Claude는 API 키의 **권한과 범위**로 제한되며, 웹훅, OAuth 관리자 엔드포인트, 또는 운영자 전용 경로에는 접근할 수 없습니다.

자주 쓰는 기본 권한 범위 조합은 다음과 같습니다.

- **조회 전용 어시스턴트:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **조회 + 메모/할 일 추가:** `people:write`를 추가합니다.
- **전체 운영 어시스턴트:** 원하는 `:write` 권한 범위를 추가합니다.

`donations:read` 키를 사용하면 Claude가 헌금을 요약할 수 있지만 헌금을 기록할 수는 없습니다. `people:write` 키를 사용하면 사람을 추가할 수 있지만 헌금은 볼 수 없습니다. 각 권한 범위가 허용하는 작업은 [API 키](/docs/developer/api/api-keys)를 참고하세요.

### 다른 연결 방법

#### Claude Code (CLI)

터미널에서 다음을 실행합니다.

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

이것으로 끝입니다. Claude Code 세션 안에서 `/mcp`를 입력하여 `b1` 서버가 연결되었는지 확인한 다음, Claude에게 교회에 대해 무엇이든 질문하세요.

#### Claude Desktop — 수동 설정 (고급)

확장 프로그램을 사용하지 않으려면 Claude Desktop의 설정 파일을 직접 편집하세요.

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

`mcp-remote`를 통해 B1로 연결하는 `b1` 서버 항목을 추가합니다([Node.js](https://nodejs.org)가 필요합니다).

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

Claude Desktop을 다시 시작하세요. 채팅 입력창의 커넥터 메뉴에 도구와 함께 `b1`이 표시됩니다.

#### Claude.ai (웹) — 사용자 지정 커넥터

위의 **옵션 1**을 참고하세요. 이 커넥터는 OAuth 2.1을 사용합니다. Claude는 `https://api.churchapps.org/.well-known/oauth-protected-resource`에서 B1의 인증 서버를 찾고, 동적 클라이언트 등록(Dynamic Client Registration)으로 자신을 등록하며, PKCE로 로그인합니다. Team 및 Enterprise 요금제에서는 소유자가 먼저 조직을 위해 커넥터를 추가해야 할 수 있습니다. Claude는 특정 권한 범위를 요청하지 않으므로, 동의 화면에는 로그인한 B1 계정이 접근할 수 있는 모든 항목이 표시됩니다. B1 Admin의 **Settings → Developer → Connected Apps**에서 취소할 수 있습니다.

### 작동 원리

B1 API는 `/mcp`에 하나의 MCP 엔드포인트를 제공합니다. Claude는 이 엔드포인트에 연결하고, `cak_…` 키로 인증한 뒤, 네 가지 도구에 접근합니다.

| 도구 | 기능 |
|---|---|
| `list_endpoints` | Claude가 호출할 수 있는 REST 엔드포인트를 나열하며, 경로로 필터링할 수 있습니다. 탐색용입니다. |
| `describe_endpoint` | 특정 엔드포인트에 대한 짧은 요약과 요청/응답 예시를 반환합니다. |
| `api_call` | 인증된 사용자로서 REST 엔드포인트를 실제로 호출합니다. |
| `describe_page_builder` | 교회 웹사이트의 페이지를 만들고 편집하는 안내서입니다. Claude는 웹사이트 콘텐츠 작업 전에 이를 읽습니다. |

이것은 B1 Admin이 사용하는 것과 같은 `/membership/people`, `/giving/donations`, `/attendance/visits` 등의 인터페이스입니다. 모든 권한 규칙이 똑같이 적용됩니다. FreePlay(lessons.church) 엔드포인트는 `/lessons/*` 아래에 나열되며, Claude의 호출은 같은 사용자로서 같은 권한을 가지고 FreePlay로 전달됩니다.

### 보안 및 제한 사항

- **교회별 격리.** API 키는 하나의 교회에 연결됩니다. Claude는 다른 교회의 데이터를 볼 방법이 없습니다.
- **권한 기반.** B1 Admin에서 키를 발급한 사람의 권한을 제거하면, Claude는 다음 호출부터 즉시 그 권한을 잃습니다.
- **취소 가능.** **Settings → Developer → API Keys**에서 키를 삭제하면 Claude의 접근이 즉시 끝납니다.
- **차단 목록.** 제공업체 웹훅, OAuth 클라이언트 관리 엔드포인트, 운영자 전용 `apiEmails` 경로는 MCP로 호출할 수 없습니다.
- **응답 크기 제한.** 도구 응답 하나는 64KB로 제한되어, 긴 목록이 Claude의 컨텍스트를 넘치지 않게 합니다. 이 경우 Claude는 필터로 쿼리를 좁힙니다.
- **감사 기록.** 데이터 변경은 B1 Admin 작업과 같은 감사 로그를 거치며, **Settings → Audit Log**에서 확인할 수 있습니다.

### 문제 해결

**Claude가 FreePlay를 사용하기 위해 B1 이메일과 비밀번호를 요구합니다:** 데스크톱 확장 프로그램 버전 1.1.0을 사용하고 있습니다. 다시 내려받아 설치하여 업데이트하세요. 최신 버전은 키만 사용합니다.

**Claude가 "Unauthorized" 또는 401을 보고합니다:** 베어러 토큰이 없거나 형식이 잘못되었거나, 키가 취소된 상태입니다. 확장 프로그램을 사용했다면 Claude에서 **Settings → Extensions → B1 (ChurchApps)**을 열고 키를 다시 붙여 넣으세요. 그 밖의 경우에는 `Authorization: Bearer cak_…` 헤더를 다시 확인하세요(공백과 `Bearer`라는 글자가 정확해야 합니다).

**도구 호출이 403을 반환합니다:** API 키에 해당 엔드포인트의 권한 범위가 없습니다. **Settings → Developer → API Keys**에서 권한 범위를 추가하세요(권한 범위는 기존 키에서 바꿀 수 없으므로 새 키를 만들어야 합니다). 그리고 새 키를 확장 프로그램 설정이나 Claude 설정에 붙여 넣으세요.

**Claude가 엔드포인트를 찾지 못합니다:** Claude에게 필터와 함께 `list_endpoints`를 호출하도록 요청하세요. 예: *"list_endpoints를 'donations' 필터로 사용해서 올바른 경로를 찾아 주세요"*. 라우트 목록은 실제 API에서 생성되므로, `curl`로 호출할 수 있는 것은 모두 포함되어 있습니다.

**로컬 개발:** `https://api.churchapps.org/mcp`를 `http://localhost:8084/mcp`로 바꾸세요. 인증과 도구는 같습니다.

## 관련 문서

- [API 키](/docs/developer/api/api-keys) — 권한 범위 전체 참고 자료
- [MCP 서버(개발자 참고)](/docs/developer/api/mcp) — 프로토콜 세부 사항과 도구 스키마
- [ChatGPT](./chatgpt) — OpenAI 모델을 위한 같은 개념
