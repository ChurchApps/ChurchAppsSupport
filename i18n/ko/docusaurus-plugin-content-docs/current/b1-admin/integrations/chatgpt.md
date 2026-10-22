---
title: "ChatGPT"
---

# ChatGPT {#chatgpt}

<div class="article-intro">

OpenAI의 ChatGPT를 교회의 B1 데이터와 연결하여 무거운 작업을 맡겨 보세요. 연결하면 ChatGPT가 실시간 교회 기록을 보고, B1 Admin에서 여러 단계가 필요하거나 아예 방법을 찾기 어려운 작업을 대신 처리하도록 도울 수 있습니다.

**ChatGPT에 요청할 수 있는 작업의 예:**
- *"주일학교 교실을 설정하고, 각 교사를 그룹에 맞는 교실에 배치해 줘"*
- *"지난주에 출석했지만 소그룹에 배정되지 않은 사람을 모두 보여 줘"*
- *"이번 달 헌금을 재정 항목별로 요약해 줘"*
- *"우리 교회의 새로 온 교인은 누구이고, 그들에게 후속 조치를 했는지 알려 줘"*
- *"B1에서 X를 어떻게 하는지 모르겠어. 단계별로 안내하거나 대신 해 줄 수 있어?"*

ChatGPT는 귀하의 B1 데이터에서 직접 답을 찾아 작업을 수행하며, 범위는 귀하의 교회로만 제한됩니다.

:::tip 권장: Claude Code
가장 매끄러운 MCP 환경을 원한다면 [Claude Code](./claude)를 권장합니다. 설정이 명령어 한 줄이면 끝나고 바로 작동합니다. ChatGPT도 작동하며, 팀이 이미 사용하고 있다면 좋은 선택입니다.
:::

두 가지 방법을 지원합니다. 하나는 **MCP 커넥터**(ChatGPT에 내장)이고, 다른 하나는 팀과 공유할 수 있는 어시스턴트를 원하는 경우의 **사용자 지정 GPT**입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- B1 Admin에서 **설정 편집** 권한이 있는 교회 관리자(API 키를 만들려면 필요합니다)
- **ChatGPT Plus, Pro, Team 또는 Enterprise** 계정

</div>

## 빠른 설정 안내 {#quick-setup-guide}

**ChatGPT 데스크톱 앱**(Mac/Windows)에서 다음 단계를 따르세요. 다른 버전에서는 화면이 조금 다를 수 있습니다.

---

**1단계 — ChatGPT를 열기 전에 B1 Admin에서 API 키 받기**

ChatGPT를 열기 전에, 붙여 넣을 수 있도록 B1 Admin에서 API 키를 먼저 만드세요.

1. B1 Admin에서 **설정 → 개발자 → API 키**로 이동합니다
2. **새 API 키**를 클릭하고, 이름을 `ChatGPT`로 지정한 다음, 범위를 선택합니다(`people:read`, `groups:read`, `attendance:read`, `donations:read`부터 시작하세요). 그런 다음 **저장**을 클릭합니다
3. `cak_…` 키를 복사합니다. 한 번만 표시됩니다

---

**2단계 — ChatGPT 왼쪽 하단에서 이름 클릭하기**

![프로필 이름 클릭하기](/img/guides/chatgpt-mcp/01.png)

---

**3단계 — 설정 클릭하기**

![메뉴에서 설정 클릭하기](/img/guides/chatgpt-mcp/02.png)

---

**4단계 — 왼쪽 사이드바에서 플러그인 클릭하기**

![통합 아래의 플러그인 클릭하기](/img/guides/chatgpt-mcp/03.png)

---

**5단계 — MCP 탭 클릭하기**

![MCP 탭 클릭하기](/img/guides/chatgpt-mcp/04.png)

이미 추가한 MCP 서버가 여기에 표시됩니다.

---

**6단계 — 추가 → MCP 서버 추가 클릭하기**

![추가를 클릭한 다음 MCP 서버 추가 클릭하기](/img/guides/chatgpt-mcp/06.png)

---

**7단계 — 양식을 작성하고 저장 클릭하기**

![사용자 지정 MCP 연결 양식](/img/guides/chatgpt-mcp/07.png)

**Streamable HTTP**를 클릭한 다음 다음 항목을 입력합니다.

| 필드 | 입력할 내용 |
|---|---|
| **이름** | `B1 Church`(또는 원하는 이름) |
| **유형** | **Streamable HTTP**를 클릭 |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer 토큰 환경 변수** | 비워 둠 |
| **헤더** | **+ 헤더 추가**를 클릭 → 키: `Authorization` → 값: 아래 참조 |

![키에 Authorization, 값에 Bearer 키를 입력한 예시](/img/guides/chatgpt-mcp/08.png)

- **키:** `Authorization`
- **값:** `Bearer cak_여기에키` — 단어 Bearer, 공백 한 칸, 그리고 키

**저장**을 클릭합니다.

이제 끝입니다! 채팅으로 돌아가 *"우리 교회에 몇 명이 있어?"*와 같이 물어보세요. ChatGPT가 B1에서 바로 답을 가져올 것입니다.

---

## 1단계 — B1 Admin에서 API 키 만들기 {#step-1--create-an-api-key-in-b1-admin}

B1과의 모든 연결은 귀하가 만드는 API 키를 사용합니다. 이 키는 교회를 식별하고, ChatGPT가 볼 수 있는 범위를 제어하며, 언제든지 취소할 수 있습니다.

1. **B1 Admin**을 열고 **설정 → 개발자 → API 키**로 이동합니다.
2. **새 API 키**를 클릭합니다.
3. 키의 이름을 지정합니다. `ChatGPT`가 좋습니다.
4. ChatGPT가 가져야 할 범위(권한)를 선택합니다. 읽기 전용 어시스턴트를 위한 좋은 시작 세트는 다음과 같습니다.
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. **저장**을 클릭합니다.
6. 나타나는 전체 키를 복사합니다. 키는 `cak_`로 시작하며 **한 번만** 표시됩니다. 안전한 곳에 붙여 넣어 두세요.

:::tip
ChatGPT의 접근을 취소해야 하는 경우, **설정 → 개발자 → API 키**로 돌아가 키를 삭제하세요. 접근은 즉시 끊깁니다.
:::

---

## 경로 A — ChatGPT MCP 커넥터(권장) {#path-a--chatgpt-mcp-connector-recommended}

가장 간단한 연결 방법입니다. ChatGPT에는 "사용자 지정 MCP에 연결" 대화상자가 내장되어 있어, 사용자 지정 GPT 없이도 B1의 MCP 서버와 직접 작동합니다.

### 필요한 것 {#what-you-need}

- 1단계에서 받은 `cak_…` 키

### ChatGPT에서 MCP 커넥터 열기 {#open-the-mcp-connector-in-chatgpt}

ChatGPT에서 **설정 → 플러그인 → MCP**로 이동하고 **추가 → MCP 서버 추가**를 클릭합니다.

### 대화상자 작성하기 {#fill-in-the-dialog}

**Streamable HTTP**를 클릭한 다음 다음 값을 사용합니다.

| 필드 | 값 |
|---|---|
| **이름** | `B1 Church`(또는 원하는 이름) |
| **유형** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer 토큰 환경 변수** | 비워 둠 |
| **헤더** | 키: `Authorization` / 값: `Bearer cak_yourprefix.yoursecret` |

값 필드에는 단어 `Bearer`, 공백 한 칸, 그리고 키를 같은 상자 안에 입력합니다. 예: `Bearer cak_prefix.secret`.

**저장**을 클릭합니다.

### ChatGPT에 질문하기 {#ask-chatgpt-something}

연결되면 특별한 명령 없이 평범한 말로 물어보기만 하면 됩니다.

- *"우리 교회에 몇 명이 있어?"*
- *"지난 30일 동안 등록한 사람은 누구야?"*
- *"지금 활동 중인 그룹은 무엇이 있어?"*
- *"이번 달 헌금을 재정 항목별로 요약해 줘."*

ChatGPT가 배후에서 B1을 호출하여 실시간 데이터로 답합니다.

---

## 경로 B — 작업이 있는 사용자 지정 GPT {#path-b--custom-gpt-with-actions}

사용자 지정 GPT를 사용하면 팀 전체가 공유할 수 있는 전용 어시스턴트를 만들 수 있습니다. 팀원은 링크를 열고 별도의 설정 없이 질문을 시작하면 됩니다. ChatGPT Plus, Team 또는 Enterprise 계정과 약 10분이 필요합니다.

### 1. API 키 만들기 {#1-create-an-api-key}

아직 하지 않았다면 위의 1단계를 따르세요.

### 2. 사용자 지정 GPT 만들기 {#2-build-the-custom-gpt}

1. ChatGPT에서 프로필을 클릭한 다음 → **내 GPT** → **GPT 만들기**를 클릭합니다.
2. **구성** 탭으로 전환하고, GPT의 이름(예: "B1 Assistant")을 정한 다음 지침을 추가합니다.

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. **작업**으로 스크롤한 다음 → **새 작업 만들기** → **인증**을 클릭합니다.
   - **인증 유형:** API 키
   - **API 키:** `cak_…` 키를 붙여 넣습니다
   - **인증 종류:** Bearer
   - 저장합니다.

4. **스키마** 상자에 다음의 시작용 OpenAPI 사양을 붙여 넣습니다.

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. 작업을 저장합니다. 테스트해 보세요. *"교회에 몇 명이 있어?"* 라고 물으면 ChatGPT가 `listPeople`을 호출하여 답합니다.
6. GPT를 **게시**(나만 / 링크가 있는 모든 사용자 / 조직)하고 링크를 팀과 공유합니다.

### 3. 사용하기 {#3-use-it}

링크가 있는 누구나 자연어로 질문할 수 있습니다. 키의 범위는 여전히 적용됩니다. 읽기 전용 키는 작업 스키마가 무엇을 말하든 쓰기 요청을 거부합니다.

---

## 안전 및 제한 사항 {#safety-and-limits}

- **교회별 격리.** API 키는 한 교회에만 연결됩니다. ChatGPT는 다른 교회의 데이터를 볼 수 없습니다.
- **권한 범위 적용.** 키는 귀하가 부여한 범위만 가집니다. 범위를 제거하면(키를 삭제하고 다시 만들어서) 다음 호출부터 그 접근이 끊깁니다.
- **즉시 취소 가능.** **설정 → 개발자 → API 키**에서 키를 삭제하면 접근이 즉시 끝납니다.
- **사용자 지정 GPT를 공유하면 데이터도 공유됩니다.** GPT에 접근할 수 있는 모든 사람은 키의 범위가 허용하는 내용을 볼 수 있습니다. 널리 공유하는 GPT에는 범위를 더 좁게(예: `donations:read` 제외) 설정하는 것이 좋습니다.
- **감사 기록.** ChatGPT를 통해 이루어진 모든 변경은 B1 Admin 작업과 같은 감사 로그를 거칩니다. **설정 → 감사 로그**에서 확인할 수 있습니다.

## 비용 {#cost}

ChurchApps는 무료이며 오픈 소스입니다. ChatGPT가 호출하는 API는 교회가 이미 운영하고 있는 시스템의 일부입니다. ChatGPT 사용료는 OpenAI의 요금제에 따라 OpenAI가 청구합니다. ChurchApps가 호출당 요금을 부과하지는 않습니다.

## 문제 해결 {#troubleshooting}

**MCP 커넥터에 "Unauthorized"가 표시되거나 401 오류가 나타남:** API 키가 없거나 잘못되었습니다. 커넥터 설정을 열고 `Authorization:Bearer` 인수의 키가 공백 없이 전체 `cak_…` 값인지 확인하세요.

**ChatGPT가 특정 데이터를 찾을 수 없다고 말함:** 키에 필요한 범위가 없을 수 있습니다. **설정 → 개발자 → API 키**에서 추가 범위를 포함한 새 키를 만들고 커넥터를 업데이트하세요.

**`npx` 명령이 실패함:** Node.js가 설치되어 있지 않을 수 있습니다. [nodejs.org](https://nodejs.org)에서 내려받아 설치한 다음 커넥터 저장을 다시 시도하세요.

**사용자 지정 GPT 작업이 401을 반환함:** 작업의 인증 패널에서 **인증 종류: Bearer**가 선택되어 있는지 확인하고, 키에 `Bearer`라는 단어가 포함되어 있지 않은지 확인하세요(ChatGPT가 자동으로 추가합니다).

**사용자 지정 GPT 작업이 403을 반환함:** 키에 해당 엔드포인트의 범위가 없습니다. 올바른 범위로 새 키를 만들고 GPT를 업데이트하세요.

**작업 스키마가 거부됨:** ChatGPT는 최소 하나의 `paths` 항목과 `servers` URL이 있는 OpenAPI 3.1을 요구합니다. 붙여 넣기 전에 [editor.swagger.io](https://editor.swagger.io)에서 YAML을 검증하세요.

## 관련 문서 {#related}

- [API 키](/docs/developer/api/api-keys) — 전체 범위 참조
- [MCP 서버(개발자 참조)](/docs/developer/api/mcp) — 프로토콜 세부 정보와 도구 스키마
- [Claude](./claude) — 같은 개념, Anthropic의 모델용
- [REST API 참조](/docs/developer/api/endpoints) — 사용자 지정 GPT 작업이 호출할 수 있는 모든 엔드포인트
