---
title: "Claude"
description: "B1 Admin을 Claude에 연결해 출석, 헌금, 그룹에 관해 평이한 말로 질문합니다. 로그인 옵션과 권한이 제한된 키 옵션을 제공합니다."
---

# Claude

<div class="article-intro">

Claude에게 교회에 대해 평범한 말로 물어보면, B1 데이터(FreePlay 공과와 교실 포함)를 바탕으로 답해 줍니다. *"일요일에 처음 방문한 사람이 몇 명이었나요?"* 또는 *"이번 달에 소그룹에 가입한 사람은 누구인가요?"* 같은 질문을 하거나, *"웹사이트에 Events라는 새 페이지를 추가해 줘."*처럼 작업을 시킬 수도 있습니다. 설정은 3분도 걸리지 않으며, 설치할 소프트웨어나 기술적 지식도 필요 없습니다.

</div>

<div class="prereqs">
<h4>필요한 것</h4>

- **Claude 계정.** **무료 요금제로도 사용할 수 있으며**, 가볍게 체험해 보기에 좋습니다. 다만 무료 계정에는 하루 메시지 한도가 있고, B1에서 정보를 조회하면 메시지가 빨리 소진되므로, 정기적으로 쓴다면 **Claude Pro**(월 약 20달러)를 권장합니다.
- **B1 로그인 정보.** B1 Admin에 사용하는 것과 같은 정보입니다.

</div>

:::tip 권장 -- 무료로 체험 가능
Claude는 B1을 AI와 연결하는 가장 쉬운 방법이며, Claude의 **무료 요금제**에서도 작동합니다. 돈을 내기 전에 교회에서 먼저 체험해 보기에 좋습니다.
:::

연결하는 방법은 두 가지입니다. **옵션 1이 가장 쉽습니다.** 키도 필요 없고 따로 설치할 것도 없습니다.

## 옵션 1 -- B1로 로그인하기(가장 쉬움)

Claude 웹사이트, Claude 데스크톱 앱, Claude 휴대폰 앱에서 모두 작동합니다. 한 번 설정하면 모든 곳에서 사용할 수 있습니다.

### 1단계 -- Claude의 커넥터 설정 열기

1. [claude.ai](https://claude.ai)에 접속해 로그인하세요(또는 무료 계정을 만드세요).
2. 왼쪽 아래의 이름을 클릭한 다음 **Settings** → **Connectors**를 선택하세요.

### 2단계 -- B1 추가하기

1. **Add**를 클릭한 다음 **Add custom connector**를 클릭하세요.
2. **Name:** `B1`이라고 입력하세요.
3. **URL:** `https://api.churchapps.org/mcp`를 붙여 넣으세요.
4. 다른 옵션은 그대로 두고 **Add**를 클릭하세요.

### 3단계 -- B1에 로그인하기

1. **Connect**를 클릭하세요. B1 로그인 페이지가 열립니다.
2. B1 계정으로 로그인하세요. 여러 교회에 소속되어 있다면, 화면 위쪽에 올바른 교회가 표시되는지 확인하세요.
3. B1은 Claude가 요청하는 작업 목록을 보여 주고, 이후 **claude.ai**로 돌아간다는 안내를 표시합니다. **Allow**를 클릭하세요.

Claude 화면으로 돌아오면 B1이 연결된 것으로 표시됩니다.

### 4단계 -- 질문해 보기

**새 채팅**을 시작하고 다음을 시도해 보세요.

- *"우리 교회에는 몇 명이 있나요?"*
- *"활동 중인 그룹을 나열해 줘."*
- *"이번 달 펀드별 헌금을 요약해 줘."*
- *"지난 30일 동안 교회에 가입한 사람은 누구인가요?"*

처음 사용할 때 Claude가 B1 사용 권한을 요청하면 **Allow**를 클릭하세요.

## 옵션 2 -- B1 키로 데스크톱 확장 프로그램 사용하기

권한을 제한한 키(예: 읽기 전용)를 Claude에게 주고 싶다면 이 방법을 쓰세요. Mac이나 Windows용 Claude 데스크톱 앱에서 작동하며, 키를 만들려면 B1에서 교회 설정을 관리할 권한이 필요합니다.

### 1단계 -- Claude 앱 준비하기

[claude.com/download](https://claude.com/download)에서 Claude 앱을 내려받아 설치하고, 열고, 로그인하세요.

### 2단계 -- B1 키 만들기

키는 Claude가 *우리 교회의* B1에 들어갈 수 있게 해 주는 것입니다. Claude만을 위한 비밀번호라고 생각하면 됩니다.

1. [B1 Admin](https://admin.b1.church)에 로그인하고 [Settings → Developer](https://admin.b1.church/settings/developer)로 이동하세요.
2. **API Keys** 탭에서 **New API Key**를 클릭하세요.
3. **Name:** `Claude`라고 입력하세요.
4. **Scopes:** Claude가 할 수 있는 작업을 체크하세요. 영역마다 **read**(보기만) 상자와 **write**(변경) 상자가 있습니다. 잘 모르겠다면 우선 **read** 상자만 체크하세요. 나중에 권한이 더 필요하면 새 키를 만들면 됩니다.
5. **Save**를 클릭한 다음 키를 **Copy**하세요. 키는 한 번만 표시되므로, 바로 3단계로 넘어가세요.

### 3단계 -- Claude에 B1 추가하기

1. [B1 확장 프로그램 내려받기](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb)를 클릭하세요.
2. 내려받은 파일(`b1-churchapps.mcpb`)을 **두 번 클릭**하세요. Claude가 열리며 **B1 (ChurchApps)**를 보여 줍니다.
3. **Install**을 클릭하세요.
4. **B1 API key**를 물으면, 2단계에서 복사한 키를 붙여 넣고 저장하세요.
5. **Claude를 완전히 종료**한 다음(Mac: **Cmd+Q**, Windows: 작업 표시줄의 Claude 아이콘을 오른쪽 클릭 → **Quit**) 다시 여세요.

두 번 클릭해도 Claude가 열리지 않으면, Claude의 **Settings → Extensions → Advanced settings → Install Extension…**으로 가서 내려받은 파일을 고르세요. 그다음 새 채팅을 시작해 무언가를 물어보세요.

:::tip 확장 프로그램을 이미 설치했다면?
따로 할 일은 없습니다. FreePlay도 같은 연결을 통해 작동합니다. 예외는 B1 이메일과 비밀번호를 요구했던 1.1.0 버전인데, 이 경우에는 확장 프로그램을 다시 내려받아 설치하면 업데이트됩니다. 키는 그대로 유지됩니다.
:::

## 안전한가요?

- Claude는 **우리 교회의** 데이터만 볼 수 있습니다.
- **로그인한 경우(옵션 1):** Claude는 내 B1 로그인으로 할 수 있는 것 이상은 할 수 없습니다. B1 로그인 페이지는 **Allow**를 누르기 전에 Claude가 할 수 있는 모든 작업을 보여 줍니다.
- **키를 쓰는 경우(옵션 2):** Claude는 B1에서 키가 허용한 작업만 할 수 있습니다. **read** 상자만 체크한 키는 보기만 가능하며, 아무것도 바꿀 수 없습니다. FreePlay도 같은 키로 같은 방식으로 작동합니다.
- **끄는 방법:** B1 Admin에서 **Settings → Developer**로 가서, 옵션 1이라면 **Connected Apps**에서 앱을 해제하고, 옵션 2라면 **API Keys**에서 키를 삭제하세요. 접근은 즉시 중단됩니다. Claude에서 B1 커넥터의 **Disconnect**를 클릭해도 됩니다.

## 비용은 얼마인가요?

B1 연결은 무료입니다. ChurchApps의 일부이기 때문입니다. Claude 자체는 무료 요금제가 있으며, Claude Pro(월 약 20달러)를 쓰면 훨씬 많이 사용할 수 있습니다. [claude.com/pricing](https://claude.com/pricing)을 참고하세요.

## 기술 세부 사항

이 페이지의 나머지 부분은 기술 사용자와 AI 어시스턴트를 위한 내용입니다. 범위(scope), 다른 연결 방법, 작동 원리를 다룹니다.

### 범위(Scopes) {#scopes}

Claude는 B1 API에 내장된 **Model Context Protocol(MCP) 서버**(`https://api.churchapps.org/mcp`)를 통해 B1과 통신합니다. 모든 호출은 B1 Admin에서 오는 요청과 같은 인증, 권한, 교회 범위 규칙을 거칩니다. Claude는 API 키의 **권한과 범위** 안으로 제한되며, 웹훅, OAuth 관리 엔드포인트, 운영자 전용 경로에는 접근할 수 없습니다.

자주 쓰는 시작 범위 조합은 다음과 같습니다.

- **읽기 전용 어시스턴트:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **읽기 + 메모/할 일 추가:** `people:write`를 추가
- **전체 운영 어시스턴트:** 원하는 `:write` 범위를 추가

`donations:read` 키로는 Claude가 헌금을 요약할 수 있지만 헌금을 기록할 수는 없습니다. `people:write` 키로는 사람을 추가할 수 있지만 헌금은 볼 수 없습니다. 각 범위가 허용하는 내용은 [API 키](/docs/developer/api/api-keys)를 참고하세요.

### 다른 연결 방법

#### Claude Code(CLI)

터미널에서 다음을 실행하세요.

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

이것으로 끝입니다. Claude Code 세션에서 `/mcp`를 입력해 `b1` 서버가 연결되었는지 확인한 뒤, 교회에 대해 무엇이든 물어보세요.

#### Claude Desktop -- 수동 설정(고급)

확장 프로그램을 쓰고 싶지 않다면, Claude Desktop의 설정 파일을 편집하세요.

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

`mcp-remote`를 통해 B1에 연결하는 `b1` 서버 항목을 추가하세요([Node.js](https://nodejs.org)가 필요합니다).

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

Claude Desktop을 다시 시작하세요. 채팅 입력창의 커넥터 메뉴에 `b1`과 그 도구들이 나타납니다.

#### Claude.ai(웹) -- 사용자 지정 커넥터

위의 **옵션 1**을 참고하세요. 이 커넥터는 OAuth 2.1을 사용합니다. Claude는 `https://api.churchapps.org/.well-known/oauth-protected-resource`에서 B1의 인증 서버를 찾고, 동적 클라이언트 등록(Dynamic Client Registration)으로 자신을 등록한 뒤, PKCE로 로그인합니다. Team 및 Enterprise 요금제에서는 소유자가 먼저 조직에 커넥터를 추가해야 할 수 있습니다. Claude는 특정 범위를 요청하지 않으므로, 동의 페이지에는 로그인한 B1 계정이 접근할 수 있는 모든 항목이 표시됩니다. 취소하려면 B1 Admin의 **Settings → Developer → Connected Apps**에서 해제하세요.

### 작동 원리

B1 API는 `/mcp`에 단일 MCP 엔드포인트를 노출합니다. Claude는 이 엔드포인트에 연결해 `cak_…` 키로 인증하고, 네 가지 도구에 접근합니다.

| 도구 | 기능 |
|---|---|
| `list_endpoints` | Claude가 호출할 수 있는 REST 엔드포인트를 나열하며, 경로로 거를 수 있음. 탐색용 |
| `describe_endpoint` | 특정 엔드포인트의 짧은 요약과 요청/응답 예시를 반환 |
| `api_call` | 인증된 사용자로서 실제로 REST 엔드포인트를 호출 |
| `describe_page_builder` | 교회 웹사이트 페이지를 만들고 편집하는 안내. Claude가 웹사이트 콘텐츠 작업 전에 읽음 |

이는 B1 Admin이 사용하는 것과 같은 `/membership/people`, `/giving/donations`, `/attendance/visits` 등의 인터페이스입니다. 모든 인가 규칙이 똑같이 적용됩니다. FreePlay(lessons.church) 엔드포인트는 `/lessons/*` 아래에 나열되며, 이에 대한 Claude의 호출은 같은 사용자와 같은 권한으로 FreePlay에 전달됩니다.

### 안전 장치와 제한

- **교회별 격리.** API 키는 하나의 교회에 연결됩니다. Claude는 다른 교회의 데이터를 볼 방법이 없습니다.
- **권한 범위 제한.** B1Admin에서 키를 만든 사람의 권한을 제거하면, Claude는 다음 호출부터 즉시 그 권한을 잃습니다.
- **취소 가능.** **Settings → Developer → API Keys**에서 키를 삭제하면 Claude의 접근이 즉시 끝납니다.
- **차단 목록.** 제공자 웹훅, OAuth 클라이언트 관리 엔드포인트, 운영자 전용 `apiEmails` 경로는 MCP로 호출할 수 없습니다.
- **응답 크기 제한.** 도구 응답 하나는 64KB로 제한되어, 긴 목록이 Claude의 컨텍스트를 넘치지 않게 합니다. 이때 Claude는 필터로 질의를 좁힙니다.
- **감사 추적.** 변경 작업은 B1Admin 작업과 같은 감사 로그를 거치며, **Settings → Audit Log**에서 확인할 수 있습니다.

### 문제 해결

**Claude가 FreePlay를 쓰기 위해 B1 이메일과 비밀번호를 요구함:** 데스크톱 확장 프로그램 1.1.0 버전을 쓰고 있는 것입니다. 다시 내려받아 설치하면 업데이트됩니다. 최신 버전은 키만 사용합니다.

**Claude가 "Unauthorized" 또는 401을 보고함:** 베어러 토큰이 없거나, 형식이 잘못되었거나, 키가 취소되었습니다. 확장 프로그램을 사용했다면 Claude에서 **Settings → Extensions → B1 (ChurchApps)**를 열고 키를 다시 붙여 넣으세요. 그 밖의 경우에는 `Authorization: Bearer cak_…` 헤더를 다시 확인하세요(공백과 문자 그대로의 `Bearer`에 주의).

**도구 호출이 403을 반환함:** API 키에 해당 엔드포인트의 범위가 없습니다. **Settings → Developer → API Keys**에서 범위를 추가하세요(범위는 기존 키에서 바꿀 수 없으므로 새 키를 만들어야 합니다). 그리고 새 키를 확장 프로그램 설정이나 Claude 설정에 붙여 넣으세요.

**Claude가 엔드포인트를 찾지 못함:** *"donations로 필터링해서 list_endpoints를 사용해 올바른 경로를 찾아 줘"*처럼 필터를 지정해 `list_endpoints`를 호출하도록 요청하세요. 경로 목록은 실행 중인 API에서 생성되므로, `curl`로 호출할 수 있는 것은 모두 포함되어 있습니다.

**로컬 개발:** `https://api.churchapps.org/mcp` 대신 `http://localhost:8084/mcp`를 사용하세요. 인증과 도구는 같습니다.

## 관련 문서

- [API 키](/docs/developer/api/api-keys) -- 범위 전체 참고
- [MCP 서버(개발자 참고)](/docs/developer/api/mcp) -- 프로토콜 세부 사항과 도구 스키마
- [ChatGPT](./chatgpt.md) -- OpenAI 모델을 위한 같은 개념
