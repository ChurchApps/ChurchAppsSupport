---
title: "Claude"
---

# Claude

<div class="article-intro">

Anthropic의 Claude를 교회 B1 데이터에 연결하세요. API 키와 몇 분의 설정만으로 "지난 일요일에 초방문자 몇 명이 왔나요?" 또는 "이번 달에 건축 기금에 기부한 사람들에게 감사 이메일 초안 작성해주세요"와 같은 질문을 Claude에 할 수 있습니다. Claude는 교회 기록에서 직접 답변을 읽으며 귀하의 권한으로 범위가 제한됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **설정 편집** 권한이 있는 교회 관리자(API 키 발급용)
- 다음 중 하나: **Claude Code**(CLI / IDE 확장), **Claude Desktop**(Mac/Windows) 또는 **Claude Pro/Max/Team** 계정
- B1 API의 전체 URL — 일반적으로 호스팅된 교회의 경우 `https://api.churchapps.org` 또는 자체 호스팅 Api 호스트

</div>

## Claude가 볼 수 있는 것

Claude는 B1 API에 내장된 **Model Context Protocol(MCP) 서버**를 통해 B1과 통신합니다. Claude가 만드는 모든 호출은 B1Admin의 요청과 동일한 인증, 권한 및 교회 범위 규칙을 통과합니다. 즉, Claude는:

- **귀 교회의** 데이터만 볼 수 있습니다
- 주어진 API 키가 가진 **권한 및 범위**로 제한됩니다
- 웹훅, OAuth 관리 엔드포인트 또는 기타 운영자 전용 경로에 도달할 수 없습니다(이러한 경로는 차단됨)

`donations:read` 키를 사용하면 Claude는 기부를 요약할 수 있지만 선물을 기록할 수 없습니다. `people:write` 키는 사람을 추가할 수 있지만 기부를 볼 수 없습니다. 작업과 일치하는 범위를 선택하세요.

## 설정

### 1. API 키 생성

1. B1Admin에서 **설정 → 개발자 → API 키**로 이동합니다.
2. **새 API 키**를 클릭하고 이름을 `Claude`로 지정한 후 Claude가 가져야 할 범위를 선택합니다. 일반적인 시작 세트:
   - **읽기 전용 어시스턴트:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **읽기 + 메모/작업 추가:** `people:write` 추가
   - **완전한 운영 어시스턴트:** 원하는 일치하는 `:write` 범위 추가
3. 저장합니다. 전체 `cak_…` 키가 **한 번만** 표시됩니다 — 복사하세요.

각 범위가 허용하는 항목은 [API 키](/docs/developer/api/api-keys)를 참조하세요.

### 2. Claude 연결

사용하는 Claude 클라이언트를 선택하세요:

#### Claude Code(CLI)

터미널에서:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

완료되었습니다. Claude Code 세션 내에서 `/mcp`를 입력하여 `b1` 서버가 연결되었는지 확인한 후 Claude에 교회에 대한 질문을 하세요.

#### Claude Desktop

Claude Desktop의 설정 파일을 편집하세요:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

`b1` 서버 항목을 추가합니다. 최신 버전의 Claude Desktop은 기본적으로 HTTP MCP를 지원합니다:

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

Claude Desktop 버전이 stdio 서버만 지원하는 경우 `mcp-remote`를 통해 연결하세요:

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

Claude Desktop을 다시 시작하세요. 채팅 작성기의 커넥터 아이콘에 `b1`과 세 가지 도구(`list_endpoints`, `describe_endpoint`, `api_call`)가 표시됩니다.

#### Claude.ai(웹) — 사용자 정의 커넥터

Claude.ai의 "사용자 정의 커넥터 추가" 기능에는 OAuth가 필요하며, B1 MCP 서버는 현재 이를 지원하지 않습니다. 대신 Claude Code 또는 Claude Desktop을 사용하세요.

### 3. Claude에 무언가를 물어보세요

연결되면 특별한 구문이 필요하지 않습니다 — Claude는 즉시 사용 가능한 항목을 발견합니다. 예시:

- *"교회에 몇 명이 있고 활동 중인 그룹은 무엇인가요?"*
- *"이번 달 기부를 기금별로 요약해주세요."*
- *"지난 일요일 오전 10시 예배에 참석했지만 지난 60일 동안 수요일 모임에 가지 않은 사람들을 나열해주세요."*
- *"이 주에 추가된 네 사람을 위해 이름으로 된 환영 이메일 초안을 작성해주세요."*

내면적으로 Claude는 MCP 도구를 호출합니다. 먼저 올바른 엔드포인트를 발견하고 데이터를 가져온 후 일반 언어로 답변합니다.

## 작동 방식

B1 API는 `/mcp`에서 단일 MCP 엔드포인트를 노출합니다. Claude는 이것에 연결하여 `cak_…` 키로 인증하고 세 가지 도구에 액세스합니다:

| 도구 | 기능 |
|---|---|
| `list_endpoints` | Claude가 호출할 수 있는 REST 엔드포인트를 나열하며, 경로로 필터링 가능합니다. 발견에 사용됩니다. |
| `describe_endpoint` | 특정 엔드포인트에 대한 짧은 요약과 예시 요청/응답을 반환합니다. |
| `api_call` | 인증된 사용자로 REST 엔드포인트를 실제로 호출합니다. |

이는 B1Admin이 사용하는 동일한 `/membership/people`, `/giving/donations`, `/attendance/visits` 등의 표면입니다 — 모든 권한 규칙이 동일하게 적용됩니다.

## 안전성 및 제한

- **교회별 격리.** API 키는 한 교회로 확인됩니다. Claude는 다른 교회의 데이터를 볼 방법이 없습니다.
- **권한 범위 지정.** B1Admin에서 키를 발급한 사람의 권한을 제거하면 Claude는 다음 호출에서 즉시 손실됩니다.
- **취소 가능.** **설정 → 개발자 → API 키**에서 키를 삭제하면 Claude의 액세스가 즉시 종료됩니다.
- **차단 목록.** 공급자 웹훅, OAuth 클라이언트 관리 엔드포인트 및 운영자 전용 `apiEmails` 경로는 MCP를 통해 호출할 수 없습니다.
- **응답 크기 제한.** 단일 도구 응답은 64KB로 제한되므로 긴 목록이 Claude의 컨텍스트를 초과하지 않습니다 — Claude는 이 경우 필터로 쿼리를 좁힙니다.
- **감사 추적.** 변경 사항은 B1Admin 작업과 동일한 감사 로그를 통과합니다. **보고서 → 감사 로그**에서 검토할 수 있습니다.

## 비용

ChurchApps는 무료 오픈소스입니다 — MCP 서버는 교회가 이미 실행 중인 API의 일부입니다. Anthropic은 자신의 계획에 따라 Claude 사용료를 부과합니다. ChurchApps에서는 호출당 추가 비용이 없습니다.

## 문제 해결

**Claude가 "권한 없음" 또는 401을 보고함:** 베어러 토큰이 누락되었거나 형식이 잘못되었거나 키가 취소되었습니다. `Authorization: Bearer cak_…` 헤더를 다시 확인하세요(공백과 리터럴 `Bearer`에 주의하세요).

**도구 호출이 403을 반환함:** API 키에 해당 엔드포인트의 범위가 없습니다. **설정 → 개발자 → API 키**에서 범위를 추가하세요(제자리에 변경할 수 없으므로 새 키를 생성해야 함) 그리고 Claude의 설정을 업데이트하세요.

**Claude가 엔드포인트를 찾을 수 없음:** Claude에 필터를 사용하여 `list_endpoints`를 호출하도록 요청하세요. 예: *"'donations' 필터를 사용하여 list_endpoints를 호출하여 올바른 경로 찾기"*. 경로 목록은 라이브 API에서 생성되므로 `curl`로 도달할 수 있는 모든 항목이 있습니다.

**로컬 개발:** `https://api.churchapps.org/mcp`를 `http://localhost:8084/mcp`로 바꾸세요 — 동일한 인증, 동일한 도구입니다.

## 관련

- [API 키](/docs/developer/api/api-keys) — 전체 범위 참조
- [MCP 서버(개발자 참조)](/docs/developer/api/mcp) — 프로토콜 세부정보 및 도구 스키마
- [ChatGPT](./chatgpt) — OpenAI의 모델을 위한 동일한 개념
