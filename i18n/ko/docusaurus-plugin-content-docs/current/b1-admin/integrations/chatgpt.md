---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

ChatGPT를 교회의 B1 데이터에 연결하고 일상 언어로 질문하세요. 답변은 교회의 실시간 기록을 바탕으로 합니다. B1 Admin에서 여러 단계가 필요한 작업도 ChatGPT에게 도와 달라고 요청할 수 있습니다.

**요청할 수 있는 예시:**
- *"지난주에 출석했지만 소그룹에 배정되지 않은 사람을 모두 보여 줘"*
- *"이번 달 헌금을 항목별로 요약해 줘"*
- *"최근에 등록한 새 교인은 누구이고, 우리가 연락을 했나?"*
- *"B1에서 X를 하는 방법을 모르겠어. 단계별로 안내해 줄래?"*

</div>

<div class="prereqs">
<h4>필요한 것</h4>

- Mac 또는 Windows용 **ChatGPT 데스크톱 앱**
- **유료 ChatGPT 요금제**(Plus 이상). 무료 ChatGPT 계정으로는 B1에 연결할 수 없습니다.
- 교회 설정을 관리할 권한이 있는 **B1 로그인**(키를 만드는 데 필요). 로그인 정보가 없다면 교회의 B1 관리자에게 문의하세요.

</div>

:::tip 권장: 먼저 Claude를 사용해 보세요 — 무료입니다
[Claude](./claude)는 **무료 요금제**로 B1에 연결되며, 3분 이내에 설정할 수 있습니다. B1을 커넥터로 추가하고 B1 계정으로 로그인하기만 하면 됩니다. 키는 필요하지 않습니다. 교회가 비용을 내기 전에 B1과 함께 AI를 시험해 보기에 가장 쉬운 방법입니다.
:::

## 설정하기

ChatGPT 버전에 따라 화면이 조금 다르게 보일 수 있습니다.

---

**1단계 — B1 키 만들기**

키는 ChatGPT가 *여러분의* 교회 B1에 접속할 수 있게 해 주는 열쇠입니다. ChatGPT 전용 비밀번호라고 생각하면 됩니다.

1. [B1 Admin](https://admin.b1.church)에 로그인하고 [Settings → Developer(설정 → 개발자)](https://admin.b1.church/settings/developer)로 이동합니다.
2. **API Keys** 탭에서 **New API Key**를 클릭하고 이름을 `ChatGPT`로 지정합니다.
3. **Scopes(범위):** ChatGPT가 할 수 있는 작업을 체크합니다. 각 영역에는 **read**(읽기) 상자(보기만 가능)와 **write**(쓰기) 상자(변경 가능)가 있습니다. 잘 모르겠다면 처음에는 **read** 상자만 체크하세요.
4. **Save**를 클릭한 다음 키를 **Copy**합니다(키는 `cak_`로 시작합니다). 키는 한 번만 표시됩니다.

---

**2단계 — ChatGPT 왼쪽 아래의 이름을 클릭하기**

![프로필 이름 클릭](/img/guides/chatgpt-mcp/01.png)

---

**3단계 — Settings 클릭하기**

![메뉴에서 Settings 클릭](/img/guides/chatgpt-mcp/02.png)

---

**4단계 — 왼쪽 사이드바에서 Plugins 클릭하기**

![Integrations 아래의 Plugins 클릭](/img/guides/chatgpt-mcp/03.png)

---

**5단계 — MCPs 탭 클릭하기**

![MCPs 탭 클릭](/img/guides/chatgpt-mcp/04.png)

이미 추가한 MCP 서버가 있다면 여기에 표시됩니다.

---

**6단계 — Add → Add MCP server 클릭하기**

![Add를 클릭한 다음 Add MCP server 클릭](/img/guides/chatgpt-mcp/06.png)

---

**7단계 — 양식을 작성하고 Save 클릭하기**

![사용자 지정 MCP 양식에 연결](/img/guides/chatgpt-mcp/07.png)

**Streamable HTTP**를 클릭한 다음 다음 내용을 입력합니다.

| 필드 | 입력할 내용 |
|---|---|
| **Name**(이름) | `B1 Church` (또는 원하는 이름) |
| **Type**(유형) | **Streamable HTTP**를 클릭 |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var**(Bearer 토큰 환경 변수) | 비워 둠 |
| **Headers**(헤더) | **+ Add header**를 클릭 → Key: `Authorization` → Value: 아래 참고 |

![Key에 Authorization, Value에 Bearer 키를 넣은 입력 예시](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — 단어 Bearer, 공백 하나, 그리고 키

**Save**를 클릭합니다.

이것으로 끝입니다! 채팅으로 돌아가 *"우리 교회에 몇 명이 있어?"*와 같이 질문해 보세요. ChatGPT가 B1에서 바로 답을 가져옵니다.

---

## 안전한가요?

- ChatGPT는 **여러분 교회의** 데이터만 볼 수 있습니다.
- 키가 허용한 작업만 할 수 있습니다. **read** 상자만 체크한 키는 보기만 가능하며 아무것도 변경할 수 없습니다.
- 연결을 끄려면 B1 Admin의 **Settings → Developer**에서 키를 삭제하세요. 접근이 즉시 중단됩니다.

## 비용은 얼마인가요?

B1 연결은 무료입니다. ChatGPT는 연결하려면 유료 요금제(Plus 이상)가 필요합니다. OpenAI의 가격 정책을 확인하세요.

## 기술 세부 정보

이 페이지의 나머지 내용은 기술 사용자와 AI 도우미를 위한 것입니다. B1의 MCP 서버는 `https://api.churchapps.org/mcp`(Streamable HTTP)에 있으며, API 키를 `Authorization: Bearer cak_…` 헤더로 받습니다. [MCP 서버 개발자 참고 자료](/docs/developer/api/mcp)를 참고하세요.

### 사용자 지정 GPT와 Actions

사용자 지정 GPT를 사용하면 팀 전체가 함께 쓸 수 있는 전용 도우미를 만들 수 있습니다. 팀원은 링크를 열고 별도 설정 없이 바로 질문을 시작할 수 있습니다. ChatGPT Plus, Team, 또는 Enterprise 계정이 필요하며 약 10분이 걸립니다.

#### 1. API 키 만들기

아직 하지 않았다면 위의 **설정하기**의 1단계를 따르세요.

#### 2. 사용자 지정 GPT 만들기

1. ChatGPT에서 프로필을 클릭한 다음 **My GPTs** → **Create a GPT**를 클릭합니다.
2. **Configure** 탭으로 이동하여 GPT에 이름(예: "B1 Assistant")을 지정하고 지침을 추가합니다.

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. **Actions** → **Create new action** → **Authentication**으로 이동합니다.
   - **Authentication type:** API Key
   - **API Key:** `cak_…` 키를 붙여 넣습니다.
   - **Auth Type:** Bearer
   - 저장합니다.

4. **Schema** 상자에 다음 시작용 OpenAPI 명세를 붙여 넣습니다.

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

5. 액션을 저장합니다. 테스트해 보세요: *"교회에 사람이 몇 명 있어?"* — ChatGPT가 `listPeople`을 호출하여 답합니다.
6. GPT를 **Publish**(게시)(Only me / Anyone with link / Organization 중 선택)하고 링크를 팀과 공유합니다.

#### 3. 사용하기

링크를 가진 누구나 일상 언어로 질문할 수 있습니다. 키의 범위는 여전히 적용됩니다. 읽기 전용 키는 액션 스키마가 무엇을 말하든 쓰기 요청을 거부합니다.

---

### 안전성과 제한

- **교회별 격리.** API 키는 한 교회에만 연결됩니다. ChatGPT는 다른 교회의 데이터를 볼 수 없습니다.
- **권한 범위 제한.** 키에는 부여한 범위만 포함됩니다. 범위를 제거하면(키를 삭제하고 다시 만들어) 다음 호출부터 해당 접근이 차단됩니다.
- **즉시 취소 가능.** **Settings → Developer → API Keys**에서 키를 삭제하면 접근이 즉시 끝납니다.
- **사용자 지정 GPT를 공유하면 데이터도 공유됩니다.** GPT에 접근할 수 있는 모든 사람은 키의 범위가 허용하는 데이터를 볼 수 있습니다. 널리 공유하는 GPT에는 더 좁은 범위(예: `donations:read` 제외)를 사용하세요.
- **감사 기록.** ChatGPT를 통해 이루어진 모든 변경 사항은 B1 Admin 작업과 같은 감사 로그를 거칩니다. **Settings → Audit Log**에서 확인할 수 있습니다.

### 문제 해결

**MCP 커넥터에 "Unauthorized"가 표시되거나 401 오류가 나타남:** API 키가 없거나 잘못되었습니다. 커넥터 설정을 열고 **Authorization** 헤더를 확인하세요. 값은 단어 `Bearer`, 공백 하나, 그리고 추가 공백 없이 전체 `cak_…` 키여야 합니다.

**ChatGPT가 특정 데이터를 찾을 수 없다고 함:** 키에 필요한 범위가 없을 수 있습니다. **Settings → Developer → API Keys**에서 추가 범위를 포함한 새 키를 만들고 커넥터를 업데이트하세요.

**사용자 지정 GPT 액션이 401을 반환함:** 액션의 인증 패널에서 **Auth Type: Bearer**가 선택되어 있는지 확인하고, 키에 `Bearer`라는 단어가 포함되지 않았는지 확인하세요(ChatGPT가 자동으로 추가합니다).

**사용자 지정 GPT 액션이 403을 반환함:** 키에 해당 엔드포인트의 범위가 없습니다. 올바른 범위로 새 키를 만들고 GPT를 업데이트하세요.

**액션 스키마가 거부됨:** ChatGPT는 최소 하나의 `paths` 항목과 `servers` URL이 있는 OpenAPI 3.1을 요구합니다. 붙여 넣기 전에 [editor.swagger.io](https://editor.swagger.io)에서 YAML을 검증하세요.

## 관련 문서

- [API Keys(API 키)](/docs/developer/api/api-keys) — 전체 범위 참고 자료
- [MCP Server(개발자 참고 자료)](/docs/developer/api/mcp) — 프로토콜 세부 정보와 도구 스키마
- [Claude](./claude) — 같은 개념을 Anthropic 모델에 적용
- [REST API 참고 자료](/docs/developer/api/endpoints) — 사용자 지정 GPT 액션이 호출할 수 있는 모든 엔드포인트
