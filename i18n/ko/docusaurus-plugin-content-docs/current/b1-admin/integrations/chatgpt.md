---
title: "ChatGPT"
description: "API 키로 ChatGPT를 교회의 B1 데이터에 연결하면, B1 Admin의 사람, 헌금, 출석에 대해 일상 언어로 질문할 수 있습니다."
---

# ChatGPT

<div class="article-intro">

ChatGPT를 교회의 B1 데이터에 연결하고 일상 언어로 질문하세요. 실시간 교회 기록을 바탕으로 답변합니다. B1 Admin에서 여러 단계가 필요한 작업도 도움을 받을 수 있습니다.

**질문 예시:**
- *"지난주에 출석했지만 아직 소그룹에 배정되지 않은 사람을 모두 보여 줘"*
- *"이번 달 기금별 헌금을 요약해 줘"*
- *"최근 새로 등록한 성도는 누구이고, 우리가 그들에게 연락했나?"*
- *"B1에서 X를 어떻게 하는지 모르겠어. 단계별로 안내해 줄래?"*

</div>

<div class="prereqs">
<h4>필요한 것</h4>

- Mac 또는 Windows용 **ChatGPT 데스크톱 앱**
- **유료 ChatGPT 요금제**(Plus 이상). 무료 ChatGPT 계정으로는 B1에 연결할 수 없습니다.
- 교회 설정을 관리할 권한이 있는 **B1 로그인**(키를 만들 때 필요합니다). 로그인 정보가 없다면 교회의 B1 관리자에게 문의하세요.

</div>

:::tip 권장: 먼저 Claude를 사용해 보세요. 무료입니다
[Claude](./claude.md)는 **무료 요금제**에서도 B1에 연결되며, 3분 이내에 설정할 수 있습니다. B1을 계정으로 추가하고 B1 계정으로 로그인하기만 하면 됩니다. 키는 필요하지 않습니다. 비용을 내기 전에 교회가 B1과 함께 AI를 시험해 보기에 가장 쉬운 방법입니다.
:::

## 설정하기 {#set-it-up}

ChatGPT 버전에 따라 화면이 조금 다르게 보일 수 있습니다.

---

**1단계 — B1 키 만들기**

키는 ChatGPT가 *우리 교회*의 B1에 접속할 수 있도록 해 주는 것입니다. ChatGPT만을 위한 비밀번호라고 생각하세요.

1. [B1 Admin](https://admin.b1.church)에 로그인하고 [Settings → Developer](https://admin.b1.church/settings/developer)로 이동하세요.
2. **API Keys** 탭에서 **New API Key**를 클릭하고 이름을 `ChatGPT`로 지정하세요.
3. **Scopes:** ChatGPT가 할 수 있는 작업을 체크하세요. 각 영역에는 **read** 상자(보기만 가능)와 **write** 상자(변경 가능)가 있습니다. 잘 모르겠다면 우선 **read** 상자만 체크하세요.
4. **Save**를 클릭한 다음 키를 **Copy**하세요(`cak_`로 시작합니다). 키는 한 번만 표시됩니다.

---

**2단계 — ChatGPT 왼쪽 아래의 이름을 클릭하세요**

![프로필 이름 클릭](/img/guides/chatgpt-mcp/01.png)

---

**3단계 — Settings를 클릭하세요**

![메뉴에서 Settings 클릭](/img/guides/chatgpt-mcp/02.png)

---

**4단계 — 왼쪽 사이드바에서 Plugins를 클릭하세요**

![Integrations 아래의 Plugins 클릭](/img/guides/chatgpt-mcp/03.png)

---

**5단계 — MCPs 탭을 클릭하세요**

![MCPs 탭 클릭](/img/guides/chatgpt-mcp/04.png)

이미 추가한 MCP 서버가 있다면 여기에 표시됩니다.

---

**6단계 — Add → Add MCP server를 클릭하세요**

![Add를 클릭한 다음 Add MCP server 클릭](/img/guides/chatgpt-mcp/06.png)

---

**7단계 — 양식을 작성하고 Save를 클릭하세요**

![사용자 지정 MCP 양식에 연결](/img/guides/chatgpt-mcp/07.png)

**Streamable HTTP**를 클릭한 다음 다음과 같이 입력하세요:

| 필드 | 입력할 내용 |
|---|---|
| **Name** | `B1 Church` (또는 원하는 이름) |
| **Type** | **Streamable HTTP**를 클릭 |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | 비워 두기 |
| **Headers** | **+ Add header**를 클릭 → Key: `Authorization` → Value: 아래 참고 |

![Key에 Authorization, Value에 Bearer 키가 입력된 예시](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — 단어 Bearer, 공백 한 칸, 그다음 키

**Save**를 클릭하세요.

이제 완료되었습니다! 채팅으로 돌아가 *"우리 교회에 사람이 몇 명 있어?"*처럼 질문해 보세요. ChatGPT가 B1에서 바로 답을 가져옵니다.

---

## 안전한가요? {#is-it-safe}

- ChatGPT는 **우리 교회의** 데이터만 볼 수 있습니다.
- 키에서 허용한 작업만 할 수 있습니다. **read** 상자만 체크한 키는 보기만 가능하며 아무것도 변경할 수 없습니다.
- 끄고 싶다면 B1 Admin의 **Settings → Developer**에서 키를 삭제하세요. 접근은 즉시 중단됩니다.

## 비용은 얼마인가요? {#what-does-it-cost}

B1 연결은 무료입니다. ChurchApps의 일부이기 때문입니다. ChatGPT를 연결하려면 유료 요금제(Plus 이상)가 필요합니다. 자세한 내용은 OpenAI의 요금 안내를 참고하세요.

## 기술 세부 정보 {#technical-details}

이 페이지의 나머지 부분은 기술 사용자와 AI 어시스턴트를 위한 내용입니다. B1의 MCP 서버는 `https://api.churchapps.org/mcp`(Streamable HTTP)에 있으며, API 키는 `Authorization: Bearer cak_…` 헤더로 전달합니다. [MCP 서버 개발자 참고 문서](/docs/developer/api/mcp)를 참고하세요.

### 액션이 있는 Custom GPT {#custom-gpt-with-actions}

Custom GPT를 사용하면 팀 전체가 공유할 수 있는 전용 어시스턴트를 만들 수 있습니다. 팀원은 링크를 열기만 하면 별도 설정 없이 질문을 시작할 수 있습니다. ChatGPT Plus, Team 또는 Enterprise 계정이 필요하며 약 10분이 걸립니다.

#### 1. API 키 만들기 {#1-create-an-api-key}

아직 하지 않았다면 위의 '설정하기' 1단계를 따르세요.

#### 2. Custom GPT 만들기 {#2-build-the-custom-gpt}

1. ChatGPT에서 프로필을 클릭한 다음 **My GPTs → Create a GPT**를 클릭하세요.
2. **Configure** 탭으로 전환하고, GPT에 이름(예: "B1 Assistant")을 붙이고 지침을 추가하세요:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. **Actions**까지 스크롤한 다음 **Create new action → Authentication**을 클릭하세요.
   - **Authentication type:** API Key
   - **API Key:** `cak_…` 키를 붙여넣기
   - **Auth Type:** Bearer
   - 저장하세요.

4. **Schema** 상자에 다음 시작용 OpenAPI 명세를 붙여넣으세요:

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
         summary: List everyone in the church
         responses:
           "200":
             description: OK
     /membership/people/search:
       get:
         operationId: searchPeople
         summary: Find people by name, or by exact email
         parameters:
           - in: query
             name: term
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
         summary: List donations for one person, or between two dates (send both startDate and endDate as YYYY-MM-DD)
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
     /attendance/attendancerecords/search:
       get:
         operationId: listAttendance
         summary: List attendance records between two dates, optionally for one campus, service, service time, or group
         parameters:
           - in: query
             name: startDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: endDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: campusId
             schema: { type: string }
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: groupId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. 액션을 저장하고 테스트하세요: *"교회에 사람이 몇 명 있어?"* — ChatGPT가 `listPeople`을 호출하고 답변합니다.
6. GPT를 **Publish**(Only me / Anyone with link / Organization)하고 링크를 팀과 공유하세요.

#### 3. 사용하기 {#3-use-it}

링크를 가진 누구나 일상 언어로 질문할 수 있습니다. 키의 권한 범위는 여전히 적용됩니다. 읽기 전용 키는 액션 스키마와 관계없이 변경 요청을 거부합니다.

---

### 안전 및 제한 사항 {#safety-and-limits}

- **교회별 격리.** API 키는 한 교회에만 연결됩니다. ChatGPT는 다른 교회의 데이터를 볼 수 없습니다.
- **권한 범위 제한.** 키에는 부여한 권한 범위만 포함됩니다. 권한 범위를 줄이려면(키를 삭제하고 다시 만들어) 다음 호출부터 해당 접근이 차단됩니다.
- **즉시 취소 가능.** **Settings → Developer → API Keys**에서 키를 삭제하면 접근이 즉시 끝납니다.
- **Custom GPT를 공유하면 데이터도 공유됩니다.** GPT에 접근할 수 있는 모든 사람은 키의 권한 범위가 허용하는 내용을 볼 수 있습니다. 널리 공유하는 GPT에는 더 좁은 권한 범위를 사용하세요(예: `donations:read` 생략).
- **감사 기록.** ChatGPT를 통해 이루어진 모든 변경은 B1 Admin 작업과 같은 감사 로그를 거칩니다. **Settings → Audit Log**에서 확인할 수 있습니다.

### 문제 해결 {#troubleshooting}

**MCP 커넥터에 "Unauthorized" 또는 401 오류가 표시됨:** API 키가 없거나 잘못되었습니다. 커넥터 설정을 열고 **Authorization** 헤더를 확인하세요. 값은 단어 `Bearer`, 공백 한 칸, 그리고 추가 공백 없이 전체 `cak_…` 키여야 합니다.

**ChatGPT가 특정 데이터를 찾을 수 없다고 함:** 키에 올바른 권한 범위가 없을 수 있습니다. **Settings → Developer → API Keys**에서 추가 권한 범위를 포함한 새 키를 만들고 커넥터를 업데이트하세요.

**Custom GPT 액션이 401을 반환함:** 액션의 인증 패널에서 **Auth Type: Bearer**가 선택되어 있는지 확인하고, 키에 `Bearer`라는 단어가 포함되지 않았는지 확인하세요(ChatGPT가 자동으로 추가합니다).

**Custom GPT 액션이 403을 반환함:** 키에 해당 엔드포인트의 권한 범위가 없습니다. 올바른 권한 범위로 새 키를 만들고 GPT를 업데이트하세요.

**액션 스키마가 거부됨:** ChatGPT는 최소 하나의 `paths` 항목과 `servers` URL이 있는 OpenAPI 3.1을 요구합니다. 붙여넣기 전에 [editor.swagger.io](https://editor.swagger.io)에서 YAML을 검증하세요.

## 관련 문서 {#related}

- [API 키](/docs/developer/api/api-keys) — 전체 권한 범위 참고
- [MCP 서버(개발자 참고)](/docs/developer/api/mcp) — 프로토콜 세부 정보 및 도구 스키마
- [Claude](./claude.md) — 같은 개념, Anthropic의 모델용
- [REST API 참고](/docs/developer/api/endpoints) — Custom GPT 액션이 호출할 수 있는 모든 엔드포인트
