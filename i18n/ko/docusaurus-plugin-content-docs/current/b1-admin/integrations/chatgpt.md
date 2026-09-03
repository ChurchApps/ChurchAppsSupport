---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

OpenAI의 ChatGPT를 교회의 B1 데이터에 연결하고 무거운 작업을 처리하도록 합니다. 연결되면 ChatGPT가 라이브 교회 기록을 보고 B1 Admin에서 여러 단계가 걸리는 작업을 수행하거나 어떻게 하는지 전혀 알 수 없는 작업을 수행하도록 도울 수 있습니다.

**당신이 그것을 요청할 수 있는 몇 가지 사항:**
- *"주일학교 교실을 설정하고 각 교사를 자신의 그룹에 따라 올바른 객실에 배치하세요"*
- *"지난주에 출석했지만 소그룹에 할당되지 않은 모든 사람을 보여주세요"*
- *"이달의 기부를 기금별로 요약하세요"*
- *"우리의 최신 구성원이 누구이며 그들을 팔로업했습니까?"*
- *"B1에서 X를 어떻게 해야 할지 모르겠습니다 — 저를 안내하거나 해주시겠습니까?"*

ChatGPT는 B1 데이터에서 직접 답변을 가져오고 조치를 취하며 교회에만 범위가 지정됩니다.

:::tip 권장: Claude Code
가장 원활한 MCP 경험을 위해 [Claude Code](./claude)가 권장 클라이언트입니다 — 설정은 한 명령으로 진행되며 기본으로 작동합니다. ChatGPT도 작동하며 팀이 이미 사용 중인 경우 좋은 선택입니다.
:::

**MCP 커넥터**(ChatGPT에 내장됨) 및 팀이 공유 가능한 보조자를 원하는 경우를 위한 **사용자 정의 GPT**의 두 경로가 지원됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- B1 Admin의 **설정 편집** 권한이 있는 교회 관리자(API 키를 만드는 데 필요)
- **ChatGPT Plus, Pro, Team 또는 Enterprise** 계정

</div>

## 빠른 설정 가이드

**ChatGPT 데스크탑 앱**(Mac/Windows)에서 다음 단계를 따르세요. 다른 버전의 화면은 약간 다를 수 있습니다.

---

**1단계 — 먼저 B1 Admin에서 API 키 받기**

ChatGPT에 손을 대기 전에 B1 Admin에서 API 키를 만들어 붙일 준비가 되어 있어야 합니다:

1. B1 Admin에서 **설정 → 개발자 → API 키**로 이동합니다
2. **새 API 키**를 클릭하고 이름을 `ChatGPT`로 지정한 후 범위를 선택합니다(`people:read`, `groups:read`, `attendance:read`, `donations:read`로 시작) **저장** 클릭
3. `cak_…` 키 복사 — 한 번만 표시됩니다

---

**2단계 — ChatGPT의 왼쪽 하단에서 이름을 클릭합니다**

![프로필 이름을 클릭합니다](/img/guides/chatgpt-mcp/01.png)

---

**3단계 — 설정 클릭**

![메뉴에서 설정을 클릭합니다](/img/guides/chatgpt-mcp/02.png)

---

**4단계 — 왼쪽 사이드바에서 플러그인 클릭**

![통합 아래에서 플러그인을 클릭합니다](/img/guides/chatgpt-mcp/03.png)

---

**5단계 — MCPs 탭 클릭**

![MCPs 탭을 클릭합니다](/img/guides/chatgpt-mcp/04.png)

이미 추가한 모든 MCP 서버가 여기에 표시됩니다.

---

**6단계 — 추가 클릭 → MCP 서버 추가**

![추가를 클릭한 후 MCP 서버 추가](/img/guides/chatgpt-mcp/06.png)

---

**7단계 — 양식을 입력하고 저장을 클릭합니다**

![사용자 정의 MCP 양식에 연결합니다](/img/guides/chatgpt-mcp/07.png)

**스트림 가능한 HTTP**를 클릭한 후 입력합니다:

| 필드 | 입력할 내용 |
|---|---|
| **이름** | `B1 Church`(또는 원하는 모든 이름) |
| **유형** | **스트림 가능한 HTTP** 클릭 |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer 토큰 환경 변수** | 비워 두기 |
| **헤더** | **+ 헤더 추가** 클릭 → 키: `Authorization` → 값: 아래 참조 |

![키에 인증 표시 및 값에 Bearer 키를 표시하는 입력된 예시](/img/guides/chatgpt-mcp/08.png)

- **키:** `Authorization`
- **값:** `Bearer cak_yourkey` — Bearer라는 단어, 공백, 그 다음 키

**저장**을 클릭합니다.

그게 다입니다! 채팅으로 돌아가서 *"우리 교회에 몇 명이 있습니까?"* 같은 것을 물어보면 ChatGPT가 B1에서 직접 답변을 가져옵니다.

---

## 1단계 — B1 Admin에서 API 키 만들기

B1에 대한 모든 연결은 만드는 API 키를 사용합니다. 이 키는 교회를 식별하고 ChatGPT가 볼 수 있는 것을 제어하며 언제든지 해지할 수 있습니다.

1. **B1 Admin**을 열고 **설정 → 개발자 → API 키**로 이동합니다.
2. **새 API 키**를 클릭합니다.
3. 키에 이름을 지정합니다 — `ChatGPT`가 잘 작동합니다.
4. ChatGPT가 가져야 할 범위(권한)를 선택합니다. 읽기 전용 보조자를 위한 좋은 시작 집합:
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. **저장**을 클릭합니다.
6. 나타나는 전체 키를 복사합니다 — `cak_`로 시작하며 **한 번만** 표시됩니다. 안전한 곳에 붙여넣으세요.

:::tip
ChatGPT의 액세스를 해지해야 하는 경우 **설정 → 개발자 → API 키**로 돌아가서 키를 삭제합니다. 액세스가 즉시 종료됩니다.
:::

---

## 경로 A — ChatGPT MCP 커넥터(권장)

이것은 가장 간단한 연결 방법입니다. ChatGPT에는 B1의 MCP 서버와 직접 작동하는 "사용자 정의 MCP에 연결" 대화 상자가 기본 제공됩니다 — 사용자 지정 GPT가 필요하지 않습니다.

### 필요한 것

- 1단계의 `cak_…` 키

### ChatGPT에서 MCP 커넥터 열기

ChatGPT에서 **설정 → 플러그인 → MCPs**로 이동한 후 **추가 → MCP 서버 추가**를 클릭합니다.

### 대화 상자 입력

**스트림 가능한 HTTP**를 클릭한 후 다음 값을 사용합니다:

| 필드 | 값 |
|---|---|
| **이름** | `B1 Church`(또는 원하는 모든 이름) |
| **유형** | **스트림 가능한 HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer 토큰 환경 변수** | 비워 두기 |
| **헤더** | 키: `Authorization` / 값: `Bearer cak_yourprefix.yoursecret` |

값 필드의 경우 `Bearer`라는 단어를 입력하고 한 칸을 띄운 후 키를 붙여넣습니다 — 모두 같은 상자에 있습니다. 예: `Bearer cak_prefix.secret`.

**저장**을 클릭합니다.

### ChatGPT에게 뭔가 묻기

연결되면 평문 언어로 물어보세요 — 특수 명령이 필요하지 않습니다:

- *"우리 교회에 몇 명이 있습니까?"*
- *"지난 30일 동안 누가 가입했습니까?"*
- *"지금 활동 중인 그룹은 무엇입니까?"*
- *"이달의 기부를 기금별로 요약하세요."*

ChatGPT는 백그라운드에서 B1을 호출하고 라이브 데이터에서 답변합니다.

---

## 경로 B — 작업이 있는 사용자 정의 GPT

사용자 정의 GPT를 사용하면 전체 팀이 공유할 수 있는 전용 보조자를 만들 수 있습니다 — 링크를 열고 질문을 시작하며 끝에 설정이 필요하지 않습니다. ChatGPT Plus, Team 또는 Enterprise 계정과 약 10분이 필요합니다.

### 1. API 키 만들기

아직 하지 않았다면 위의 1단계를 따르세요.

### 2. 사용자 정의 GPT 구축

1. ChatGPT에서 프로필 → **내 GPT** → **GPT 생성**을 클릭합니다.
2. **구성** 탭으로 전환하고 GPT에 이름을 지정합니다(예: "B1 보조자") 지침을 추가합니다:

   ```
   당신은 교회 직원이 B1 기록을 쿼리하도록 도와줍니다. B1 API 작업을 사용하여
   사람, 그룹, 출석, 기부 및 콘텐츠를 찾습니다. 항상 범위를 지정합니다
   사용자가 볼 수 있는 권한이 있는 데이터의 답변. 간결합니다.
   ```

3. **작업** 스크롤 → **새 작업 만들기** → **인증**.
   - **인증 유형:** API 키
   - **API 키:** `cak_…` 키를 붙여 넣으세요
   - **인증 유형:** Bearer
   - 저장합니다.

4. **스키마** 상자에 이 시작 OpenAPI 사양을 붙여 넣으세요:

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
         summary: 교회의 사람들을 나열합니다
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
         summary: id로 단일 사람 가져오기
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
         summary: 교회의 그룹을 나열합니다
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: 기부를 나열합니다
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
         summary: 출석 기록을 나열합니다
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

5. 작업을 저장합니다. 테스트: *"교회에 몇 명이 있습니까?"* — ChatGPT가 `listPeople`을 호출하고 답변합니다.
6. GPT를 **게시**합니다(내게만 / 링크를 가진 누구나 / 조직) 그리고 팀과 링크를 공유합니다.

### 3. 사용해보기

링크가 있는 모든 사람이 평문 질문을 할 수 있습니다. 키의 범위는 여전히 적용됩니다 — 읽기 전용 키는 작업 스키마가 무엇이든 작성을 거부합니다.

---

## 안전 및 제한

- **교회별 격리.** API 키는 하나의 교회로만 해결됩니다. ChatGPT는 다른 교회 데이터를 볼 수 없습니다.
- **권한 범위 지정.** 키는 부여한 범위만 실행합니다. 범위 제거(키 삭제 및 재생성)는 다음 호출에서 해당 액세스를 끊습니다.
- **즉시 해지 가능합니다.** **설정 → 개발자 → API 키**에서 키를 삭제하면 액세스가 즉시 종료됩니다.
- **사용자 정의 GPT 공유는 데이터를 공유합니다.** GPT에 액세스할 수 있는 모든 사람이 키의 범위가 허용하는 모든 것을 볼 수 있습니다. 광범위하게 공유되는 GPT의 경우 더 좁은 범위(예: `donations:read` 생략)를 선호합니다.
- **감사 추적.** ChatGPT를 통해 수행된 모든 변경은 B1 Admin 작업과 동일한 감사 로그를 통과합니다 — **보고서 → 감사 로그** 아래에서 찾습니다.

## 비용

ChurchApps는 무료이고 오픈 소스입니다 — ChatGPT가 호출하는 API는 교회가 이미 실행하는 것의 일부입니다. OpenAI는 자신의 계획에 따라 ChatGPT 사용에 대한 요금을 청구합니다. ChurchApps에서는 호출당 비용이 없습니다.

## 문제 해결

**MCP 커넥터가 "승인 안 됨"이라고 표시하거나 401 오류를 표시합니다:** API 키가 누락되거나 잘못되었습니다. 커넥터 설정을 열고 `Authorization:Bearer` 인수의 키가 추가 공백 없이 전체 `cak_…` 값인지 확인합니다.

**ChatGPT가 특정 데이터를 찾을 수 없다고 말합니다:** 키가 올바른 범위를 갖지 않을 수 있습니다. **설정 → 개발자 → API 키**에서 추가 범위로 새 키를 만들고 커넥터를 업데이트합니다.

**`npx` 명령이 실패합니다:** Node.js가 설치되지 않았을 수 있습니다. [nodejs.org](https://nodejs.org)에서 다운로드하여 설치한 후 커넥터를 다시 저장해 보세요.

**사용자 정의 GPT 작업이 401을 반환합니다:** 작업의 인증 패널에서 **인증 유형: Bearer**가 선택되어 있고 키에 `Bearer`라는 단어가 포함되지 않는지 확인합니다(ChatGPT가 자동으로 추가합니다).

**사용자 정의 GPT 작업이 403을 반환합니다:** 키에 해당 엔드포인트에 대한 범위가 없습니다. 올바른 범위로 새 키를 만들고 GPT를 업데이트합니다.

**작업 스키마가 거부됩니다:** ChatGPT는 최소 하나의 `paths` 항목과 `servers` URL이 있는 OpenAPI 3.1이 필요합니다. [editor.swagger.io](https://editor.swagger.io)에서 YAML을 검증한 후 붙여 넣으세요.

## 관련

- [API 키](/docs/developer/api/api-keys) — 전체 범위 참조
- [MCP 서버(개발자 참조)](/docs/developer/api/mcp) — 프로토콜 세부 정보 및 도구 스키마
- [Claude](./claude) — 동일한 아이디어, Anthropic의 모델용
- [REST API 참조](/docs/developer/api/endpoints) — 사용자 정의 GPT 작업이 호출할 수 있는 모든 엔드포인트
