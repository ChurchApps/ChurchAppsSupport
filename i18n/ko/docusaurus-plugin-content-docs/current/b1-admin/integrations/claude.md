---
title: "Claude"
---

# Claude {#claude}

<div class="article-intro">

Anthropic의 Claude를 교회의 B1 데이터와 연결하세요. claude.ai에 B1을 사용자 지정 커넥터로 추가하고 로그인하거나, Claude Code 또는 Claude Desktop에서 API 키를 사용할 수 있습니다. 몇 분 정도 설정하면 "이번 주일에 처음 방문한 사람은 몇 명이었어?"나 "이번 달 건축 헌금을 낸 사람들에게 보낼 감사 이메일 초안을 써 줘"와 같은 질문을 Claude에게 할 수 있습니다. Claude는 교회 기록에서 직접 답을 읽어 오며, 그 범위는 귀하의 권한에 따릅니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Claude Pro/Max/Team/Enterprise** 계정(claude.ai 사용자 지정 커넥터용), 또는 **Claude Code**(CLI / IDE 확장 프로그램), 또는 **Claude Desktop**(Mac/Windows)
- API 키 설정을 위해서는 교회 관리자 중 **설정 편집** 권한이 있는 사람(API 키를 만들기 위해)
- B1 API의 전체 URL — 호스팅 교회라면 보통 `https://api.churchapps.org`, 직접 호스팅하는 경우 자체 Api 호스트

</div>

## Claude가 볼 수 있는 내용 {#what-claude-can-see}

Claude는 B1 API에 내장된 **모델 컨텍스트 프로토콜(MCP) 서버**를 통해 B1과 통신합니다. Claude가 하는 모든 호출은 B1Admin의 요청과 같은 인증, 권한, 교회 범위 규칙을 거칩니다. 즉, Claude는 다음과 같습니다.

- **귀하의** 교회 데이터만 볼 수 있습니다
- API 키나 로그인이 가진 **권한과 범위**로만 제한됩니다
- 웹훅, OAuth 관리자 엔드포인트, 기타 운영자 전용 경로에는 접근할 수 없습니다(차단 목록에 있습니다)

`donations:read` 키는 Claude가 헌금을 요약하도록 하지만 헌금을 기록할 수는 없습니다. `people:write` 키는 사람을 추가할 수 있지만 헌금은 볼 수 없습니다. 작업에 맞는 범위를 고르세요.

## 설정 {#setup}

연결 방법은 두 가지입니다.

- **Claude.ai 사용자 지정 커넥터** — 가장 쉬운 방법입니다. B1에 로그인하고 브라우저에서 접근을 승인하면 되며, 복사할 키가 없습니다. 계정에 추가되면 Claude Desktop과 Claude 모바일 앱에서도 이 커넥터를 사용할 수 있습니다.
- **API 키** — Claude Code나 Claude Desktop 구성 파일에서 사용합니다. 키를 만들고 Claude 설정에 붙여 넣습니다.

### Claude.ai(웹) — 사용자 지정 커넥터 {#claudeai-web--custom-connector}

1. Claude에서 **설정 → 커넥터**를 열고 **사용자 지정 커넥터 추가**를 클릭합니다. (Team과 Enterprise 요금제에서는 소유자가 먼저 조직을 위해 추가해야 할 수 있습니다.)
2. 이름을 `B1`으로 지정하고 서버 URL `https://api.churchapps.org/mcp`을 입력한 다음 **추가**를 클릭합니다.
3. **연결**을 클릭합니다. B1 로그인 창이 열립니다. B1 계정으로 로그인하고, 요청하면 교회를 선택합니다.
4. **인증 필요** 페이지에는 앱의 이름, 앱이 요청하는 데이터(예: **사람, 가구 및 연락처 세부 정보 보기**, 또는 더 좁은 범위를 요청하지 않았다면 **B1 계정이 접근할 수 있는 모든 것**), 그리고 선택 후 돌아갈 주소가 표시됩니다. 그 주소가 **claude.ai**인지 확인하세요.
5. **허용**을 클릭합니다. Claude로 돌아가며, B1이 연결됨으로 표시됩니다.

Claude는 처음 연결할 때 B1에 스스로 등록합니다. 그래서 이 페이지에는 앱이 스스로 등록되었다는 것과, 귀하의 B1 계정이 할 수 있는 것보다 더 많은 일은 절대 할 수 없다는 안내도 함께 나옵니다. 나중에 연결을 끊으려면 B1Admin에서 **설정 → 개발자 → 연결된 앱**으로 가서 접근을 취소하세요.

### API 키 사용하기 {#using-an-api-key}

#### 1. API 키 만들기 {#1-create-an-api-key}

1. B1Admin에서 **설정 → 개발자 → API 키**로 이동합니다.
2. **새 API 키**를 클릭하고, 이름을 `Claude`로 지정한 다음 Claude가 가져야 할 범위를 선택합니다. 자주 쓰는 기본 세트는 다음과 같습니다.
   - **읽기 전용 어시스턴트:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **읽기 + 메모/작업 추가:** `people:write` 추가
   - **전체 운영 어시스턴트:** 필요한 `:write` 범위를 추가
3. 저장합니다. 전체 `cak_…` 키는 **한 번만** 표시되므로 복사하세요.

각 범위가 허용하는 내용은 [API 키](/docs/developer/api/api-keys)를 참조하세요.

#### 2. Claude 연결하기 {#2-connect-claude}

사용하는 Claude 클라이언트를 선택하세요.

##### Claude Code (CLI) {#claude-code-cli}

터미널에서 다음을 실행합니다.

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

이것으로 끝입니다. Claude Code 세션 안에서 `/mcp`를 입력하여 `b1` 서버가 연결되었는지 확인한 다음, 교회에 관한 질문을 Claude에게 하세요.

##### Claude Desktop {#claude-desktop}

Claude Desktop의 구성 파일을 편집합니다.

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

`b1` 서버 항목을 추가합니다. 최신 버전의 Claude Desktop은 HTTP MCP를 기본으로 지원합니다.

```json
{
  "mcpServers": {
    "b1": {
      "url": "https://api.churchapps.org/mcp",
      "headers": {
        "Authorization": "Bearer cak_<prefix>.<secret>"
      }
    }
  }
}
```

사용 중인 Claude Desktop 버전이 stdio 서버만 지원한다면 `mcp-remote`를 통해 연결하세요.

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

Claude Desktop을 다시 시작하세요. 채팅 입력란의 커넥터 아이콘에 `b1`과 세 가지 도구(`list_endpoints`, `describe_endpoint`, `api_call`)가 표시됩니다.

### Claude에게 질문하기 {#ask-claude-something}

연결되면 특별한 문법이 필요 없습니다. Claude가 사용 가능한 항목을 그때그때 찾아냅니다. 예를 들면 다음과 같습니다.

- *"교회에 사람이 몇 명 있고, 활동 중인 그룹은 무엇이 있어?"*
- *"이번 달 헌금을 재정 항목별로 요약해 줘."*
- *"지난 일요일 오전 10시 예배에 출석했지만 지난 60일 동안 수요일 그룹에 나오지 않은 사람을 나열해 줘."*
- *"이번 주에 추가된 네 명에게 이름을 부르며 보낼 환영 이메일 초안을 써 줘."*

배후에서 Claude는 MCP 도구를 호출합니다. 먼저 올바른 엔드포인트를 찾고, 그다음 데이터를 가져와서 쉬운 말로 답합니다.

## 작동 방식 {#how-it-works}

B1 API는 `/mcp`에 단일 MCP 엔드포인트를 노출합니다. Claude는 이 엔드포인트에 연결하고, `cak_…` 키나 승인한 로그인으로 인증한 다음, 세 가지 도구에 접근합니다.

| 도구 | 기능 |
|---|---|
| `list_endpoints` | Claude가 호출할 수 있는 REST 엔드포인트를 경로로 필터링하여 나열합니다. 탐색에 사용합니다. |
| `describe_endpoint` | 특정 엔드포인트에 대한 짧은 요약과 요청/응답 예시를 반환합니다. |
| `api_call` | 인증된 사용자로서 REST 엔드포인트를 실제로 호출합니다. |

이는 B1Admin이 사용하는 것과 같은 `/membership/people`, `/giving/donations`, `/attendance/visits` 등의 인터페이스입니다. 모든 권한 규칙이 똑같이 적용됩니다.

## 안전 및 제한 사항 {#safety-and-limits}

- **교회별 격리.** API 키나 로그인은 한 교회에 연결됩니다. Claude는 다른 교회의 데이터를 볼 수 있는 방법이 없습니다.
- **권한 범위 적용.** B1Admin에서 키를 만든 사람(또는 로그인한 사람)의 권한을 제거하면, Claude는 다음 호출에서 즉시 그 권한을 잃습니다.
- **취소 가능.** **설정 → 개발자 → API 키**에서 키를 삭제하거나, **설정 → 개발자 → 연결된 앱**에서 claude.ai 연결을 취소하면 Claude의 접근이 즉시 끝납니다.
- **차단 목록.** 제공업체 웹훅, OAuth 클라이언트 관리 엔드포인트, 운영자 전용 `apiEmails` 경로는 MCP로 호출할 수 없습니다.
- **응답 크기 제한.** 도구 응답 하나는 64KB로 제한되어, 긴 목록이 Claude의 컨텍스트를 넘치게 하지 않습니다. 이런 일이 생기면 Claude가 필터로 질의를 좁힙니다.
- **감사 기록.** 변경 작업은 B1Admin 작업과 같은 감사 로그를 거칩니다. **설정 → 감사 로그**에서 확인할 수 있습니다.

## 비용 {#cost}

ChurchApps는 무료이며 오픈 소스입니다. MCP 서버는 교회가 이미 운영하고 있는 API의 일부입니다. Anthropic은 요금제에 따라 Claude 사용료를 청구합니다. ChurchApps가 호출당 요금을 부과하지는 않습니다.

## 문제 해결 {#troubleshooting}

**Claude가 "Unauthorized" 또는 401을 보고함:** 베어러 토큰이 없거나 형식이 잘못되었거나, 키가 취소되었습니다. `Authorization: Bearer cak_…` 헤더를 다시 확인하세요(공백과 문자 그대로의 `Bearer`에 유의하세요). claude.ai에서는 B1 커넥터의 연결을 끊었다가 다시 연결하여 다시 로그인하세요.

**도구 호출이 403을 반환함:** API 키에 해당 엔드포인트의 범위가 없습니다. **설정 → 개발자 → API 키**에서 범위를 추가하세요(범위는 기존 키에서 바꿀 수 없으므로 새 키를 만들어야 합니다). 그런 다음 Claude의 구성을 업데이트하세요.

**Claude가 엔드포인트를 찾지 못함:** 필터를 지정하여 `list_endpoints`를 호출하도록 요청하세요. 예: *"list_endpoints를 필터 'donations'로 사용해서 올바른 경로를 찾아 줘"*. 경로 목록은 실시간 API에서 생성되므로, `curl`로 접근할 수 있는 것은 모두 포함되어 있습니다.

**로컬 개발:** `https://api.churchapps.org/mcp`을 `http://localhost:8084/mcp`로 바꾸세요. 인증과 도구는 동일합니다.

## 관련 문서 {#related}

- [API 키](/docs/developer/api/api-keys) — 전체 범위 참조
- [MCP 서버(개발자 참조)](/docs/developer/api/mcp) — 프로토콜 세부 정보와 도구 스키마
- [ChatGPT](./chatgpt) — 같은 개념, OpenAI의 모델용
