---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

ChatGPT를 교회의 B1 데이터에 연결하고 평범한 말로 질문하세요 — 실시간 교회 기록을 바탕으로 답해 줍니다. B1 Admin에서 여러 단계가 걸리는 일을 도와 달라고 요청할 수도 있습니다.

**물어볼 수 있는 몇 가지 예:**
- *"지난주에 출석했지만 소그룹에 배정되지 않은 모든 사람을 보여 주세요"*
- *"이번 달 기부를 기금별로 요약해 주세요"*
- *"최근 새 교인은 누구이며 그들에게 후속 연락을 했나요?"*
- *"B1에서 X를 어떻게 하는지 모르겠어요 — 안내해 줄 수 있나요?"*

</div>

<div class="prereqs">
<h4>필요한 것</h4>

- Mac 또는 Windows용 **ChatGPT 데스크톱 앱**
- **유료 ChatGPT 요금제** (Plus 이상). 무료 ChatGPT 계정은 B1에 연결할 수 없습니다.
- 교회 설정을 관리할 권한이 있는 **B1 로그인** (키를 만드는 데 필요). 없으신가요? 교회의 B1 관리자에게 요청하세요.

</div>

:::tip 추천: 먼저 Claude를 사용해 보세요 — 무료입니다
[Claude](./claude) 는 **무료 요금제** 로 B1에 연결되며 3분도 안 되어 설정됩니다 — B1을 커넥터로 추가하고 B1 계정으로 로그인하기만 하면 됩니다. 키가 필요 없습니다. 비용을 내기 전에 교회가 B1과 함께 AI를 사용해 보는 가장 쉬운 방법입니다.
:::

## 설정하기

사용하는 ChatGPT 버전에 따라 화면이 약간 다를 수 있습니다.

---

**1단계 — B1 키 만들기**

키는 ChatGPT가 *귀 교회의* B1에 들어갈 수 있게 해 주는 것입니다 — ChatGPT 전용 비밀번호라고 생각하시면 됩니다.

1. [B1 Admin](https://admin.b1.church) 에 로그인하고 [설정 → 개발자](https://admin.b1.church/settings/developer) 로 이동합니다.
2. **API 키** 탭에서 **새 API 키** 를 클릭하고 이름을 `ChatGPT` 로 지정합니다.
3. **범위:** ChatGPT가 할 수 있는 일을 선택합니다. 각 영역에는 **read** 상자(보기만)와 **write** 상자(변경하기)가 있습니다. 잘 모르겠다면 처음에는 **read** 상자만 선택하세요.
4. **저장** 을 클릭한 다음 키를 **복사** 합니다( `cak_` 로 시작). 키는 한 번만 표시됩니다.

---

**2단계 — ChatGPT 왼쪽 하단에서 이름을 클릭합니다**

![프로필 이름을 클릭합니다](/img/guides/chatgpt-mcp/01.png)

---

**3단계 — Settings (설정) 클릭**

![메뉴에서 Settings를 클릭합니다](/img/guides/chatgpt-mcp/02.png)

---

**4단계 — 왼쪽 사이드바에서 Plugins (플러그인) 클릭**

![Integrations 아래에서 Plugins를 클릭합니다](/img/guides/chatgpt-mcp/03.png)

---

**5단계 — MCPs 탭 클릭**

![MCPs 탭을 클릭합니다](/img/guides/chatgpt-mcp/04.png)

이미 추가한 모든 MCP 서버가 여기에 표시됩니다.

---

**6단계 — Add → Add MCP server 클릭**

![Add를 클릭한 후 Add MCP server 클릭](/img/guides/chatgpt-mcp/06.png)

---

**7단계 — 양식을 입력하고 Save (저장) 클릭**

![사용자 정의 MCP 연결 양식](/img/guides/chatgpt-mcp/07.png)

**Streamable HTTP** 를 클릭한 후 다음을 입력합니다:

| 필드 | 입력할 내용 |
|---|---|
| **Name** | `B1 Church` (또는 원하는 아무 이름) |
| **Type** | **Streamable HTTP** 클릭 |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | 비워 두기 |
| **Headers** | **+ Add header** 클릭 → Key: `Authorization` → Value: 아래 참조 |

![Key에 Authorization, Value에 Bearer 키가 입력된 예시](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — Bearer라는 단어, 공백 하나, 그다음 키

**Save** 를 클릭합니다.

이제 끝입니다! 채팅으로 돌아가서 *"우리 교회에 몇 명이 있나요?"* 같은 질문을 하면 ChatGPT가 B1에서 바로 답을 가져옵니다.

---

## 안전한가요?

- ChatGPT는 **귀 교회의** 데이터만 볼 수 있습니다.
- 키가 허용하는 일만 할 수 있습니다 — **read** 상자만 선택된 키는 볼 수만 있고 아무것도 변경할 수 없습니다.
- 사용을 중지하려면 B1 Admin의 **설정 → 개발자** 에서 키를 삭제하세요. 액세스가 즉시 중단됩니다.

## 비용은 얼마인가요?

B1 연결은 무료입니다 — ChurchApps의 일부입니다. ChatGPT는 연결하려면 유료 요금제(Plus 이상)가 필요합니다. OpenAI의 요금 안내를 참조하세요.

## 기술 세부 정보

이 페이지의 나머지 부분은 기술 사용자와 AI 어시스턴트를 위한 내용입니다. B1의 MCP 서버는 `https://api.churchapps.org/mcp` (Streamable HTTP)에 있으며 API 키를 `Authorization: Bearer cak_…` 헤더로 받습니다. [MCP 서버 개발자 참조](/docs/developer/api/mcp) 를 참조하세요.

### 작업(Actions)이 있는 사용자 정의 GPT

사용자 정의 GPT를 사용하면 전체 팀이 공유할 수 있는 전용 어시스턴트를 만들 수 있습니다 — 팀원은 링크를 열고 별도의 설정 없이 바로 질문을 시작할 수 있습니다. ChatGPT Plus, Team 또는 Enterprise 계정과 약 10분이 필요합니다.

#### 1. API 키 만들기

아직 하지 않았다면 위 "설정하기"의 1단계를 따르세요.

#### 2. 사용자 정의 GPT 만들기

1. ChatGPT에서 프로필 → **My GPTs** → **Create a GPT** 를 클릭합니다.
2. **Configure** 탭으로 전환하고 GPT에 이름을 지정한 다음(예: "B1 Assistant") 지침을 추가합니다:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. **Actions** → **Create new action** → **Authentication** 으로 스크롤합니다.
   - **Authentication type:** API Key
   - **API Key:** `cak_…` 키를 붙여넣으세요
   - **Auth Type:** Bearer
   - 저장합니다.

4. **Schema** 상자에 이 시작용 OpenAPI 사양을 붙여넣으세요:

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

5. 작업을 저장합니다. 테스트: *"how many people are in the church?"* — ChatGPT가 `listPeople` 을 호출하고 답변합니다.
6. GPT를 **Publish** (게시)하고(Only me / Anyone with link / Organization) 팀과 링크를 공유합니다.

#### 3. 사용하기

링크가 있는 사람은 누구나 자연어로 질문할 수 있습니다. 키의 범위는 여전히 적용됩니다 — 읽기 전용 키는 작업 스키마의 내용과 관계없이 쓰기를 거부합니다.

---

### 안전 및 제한

- **교회별 격리.** API 키는 하나의 교회로만 확인됩니다. ChatGPT는 다른 교회의 데이터를 볼 수 없습니다.
- **권한 범위 지정.** 키는 부여한 범위만 가집니다. 범위를 제거하면(키를 삭제하고 다시 만들어서) 다음 호출부터 해당 액세스가 차단됩니다.
- **즉시 취소 가능.** **설정 → 개발자 → API 키** 에서 키를 삭제하면 액세스가 즉시 종료됩니다.
- **사용자 정의 GPT를 공유하면 데이터도 공유됩니다.** GPT에 액세스할 수 있는 모든 사람이 키의 범위가 허용하는 모든 것을 볼 수 있습니다. 널리 공유되는 GPT에는 더 좁은 범위(예: `donations:read` 제외)를 사용하세요.
- **감사 추적.** ChatGPT를 통해 이루어진 모든 변경은 B1 Admin 작업과 동일한 감사 로그를 거칩니다 — **설정 → 감사 로그** 에서 확인하세요.

### 문제 해결

**MCP 커넥터가 "Unauthorized"라고 표시하거나 401 오류를 표시함:** API 키가 누락되었거나 잘못되었습니다. 커넥터 설정을 열고 **Authorization** 헤더를 확인하세요. 값은 `Bearer` 라는 단어, 공백 한 칸, 그리고 추가 공백 없는 전체 `cak_…` 키여야 합니다.

**ChatGPT가 특정 데이터를 찾을 수 없다고 함:** 키에 올바른 범위가 없을 수 있습니다. **설정 → 개발자 → API 키** 에서 추가 범위로 새 키를 만들고 커넥터를 업데이트하세요.

**사용자 정의 GPT 작업이 401을 반환함:** 작업의 인증 패널에서 **Auth Type: Bearer** 가 선택되어 있고 키에 `Bearer` 라는 단어가 포함되지 않았는지 확인하세요(ChatGPT가 자동으로 추가합니다).

**사용자 정의 GPT 작업이 403을 반환함:** 키에 해당 엔드포인트에 대한 범위가 없습니다. 올바른 범위로 새 키를 만들고 GPT를 업데이트하세요.

**작업 스키마가 거부됨:** ChatGPT에는 최소 하나의 `paths` 항목과 `servers` URL이 있는 OpenAPI 3.1이 필요합니다. 붙여넣기 전에 [editor.swagger.io](https://editor.swagger.io) 에서 YAML을 검증하세요.

## 관련

- [API 키](/docs/developer/api/api-keys) — 전체 범위 참조
- [MCP 서버(개발자 참조)](/docs/developer/api/mcp) — 프로토콜 세부 정보 및 도구 스키마
- [Claude](./claude) — 동일한 아이디어, Anthropic의 모델용
- [REST API 참조](/docs/developer/api/endpoints) — 사용자 정의 GPT 작업이 호출할 수 있는 모든 엔드포인트
