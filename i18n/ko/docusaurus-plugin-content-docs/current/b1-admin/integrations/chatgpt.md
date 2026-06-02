---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

OpenAI의 ChatGPT를 교회의 B1 데이터에 연결하여 "이 분기에 그룹에 참여하지 않은 사람은 누구인가?" 또는 "이번 달 건물 기금 헌금을 요약해 주세요"와 같은 질문을 할 수 있으며 ChatGPT가 B1에서 직접 답변을 가져오도록 합니다. **Custom GPT**(모든 ChatGPT Plus 플랜에서 작동)와 **MCP 서버**(지원하는 개발자 도구)라는 두 가지 경로가 지원됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **설정 편집** 권한이 있는 교회 관리자(API 키를 생성하기 위해)
- **ChatGPT Plus, Pro, Team 또는 Enterprise** 계정(무료 계층은 Custom GPT 또는 커넥터를 사용할 수 없음)
- B1 API의 전체 URL -- 호스팅된 교회의 경우 일반적으로 `https://api.churchapps.org` 또는 자체 호스팅 Api 호스트

</div>

## 올바른 경로 선택

| 경로 | 필요한 플랜 | 노력 | 얻는 것 |
|---|---|---|---|
| **작업이 있는 Custom GPT** | ChatGPT Plus / Team / Enterprise | 10분 | 모든 팀 구성원이 사용할 수 있는 공유 가능한 GPT로 B1의 REST API를 호출합니다. |
| **OpenAI 도구를 통한 MCP** | 개발자 / Agent SDK / Pro 커넥터 | 더 많음 | MCP 서버를 통한 전체 검색으로 코딩 도구 및 에이전트 플랫폼에 적합합니다. |

대부분의 교회에서 **Custom GPT** 경로가 올바른 답입니다. 개발자 설정이 필요하지 않으며 일반 ChatGPT 앱 및 모바일 클라이언트 내에서 작동하며 팀과 공유할 수 있습니다. MCP 경로는 OpenAI의 개발자 도구 또는 에이전트 플랫폼을 사용하는 기술 직원을 위해 아래에 문서화되어 있습니다.

## 경로 A -- 작업이 있는 Custom GPT

이는 ChatGPT를 B1 REST API에 직접 연결합니다. Custom GPT는 그것을 사용하는 사람을 대신하여 B1 레코드를 읽고 선택적으로 쓸 수 있습니다.

### 1. API 키 만들기

1. B1Admin에서 **설정 → 개발자 → API 키**로 이동합니다.
2. **새 API 키**를 클릭하고 이름을 `ChatGPT`로 지정하고 범위를 선택합니다. 일반적인 시작 집합:
   - **읽기 전용 도우미:** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **읽기 + 쓰기:** 일치하는 `:write` 범위 추가
3. 저장하고 전체 `cak_…` 키를 복사합니다.

[API 키](/docs/developer/api/api-keys)에서 전체 범위 목록을 참조하세요.

### 2. Custom GPT 빌드

1. ChatGPT에서 프로필 → **My GPTs** → **Create a GPT**를 클릭합니다.
2. **Configure** 탭으로 전환하고 GPT에 이름을 지정합니다(예: "B1 Assistant") 및 다음과 같은 지침:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. **작업** → **새 작업 만들기** → **인증**으로 스크롤합니다.
   - **인증 유형:** API 키
   - **API 키:** `cak_<prefix>.<secret>`
   - **인증 유형:** Bearer
   - 저장합니다.
4. **스키마** 상자에 GPT가 사용할 엔드포인트를 설명하는 최소 OpenAPI 사양을 붙여넣습니다. 가장 일반적인 읽기를 포함하는 시작:

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

   필요에 따라 더 많은 엔드포인트로 스키마를 확장합니다. B1의 모든 인증된 경로는 동일한 `cak_…` 키를 허용합니다. [REST API 참조](/docs/developer/api/endpoints)에 사용 가능한 항목이 나열됩니다.

5. 작업을 저장합니다. "교회에 몇 명의 사람이 있나요?"와 같은 프롬프트로 테스트합니다. ChatGPT가 `listPeople`을 호출하고 답합니다.
6. GPT를 **게시**합니다(나만 / 링크가 있는 누구나 / 조직) 및 팀과 공유합니다.

### 3. 사용

GPT와 공유하는 사람은 자연어 질문을 할 수 있습니다. ChatGPT가 올바른 작업을 선택하고 B1을 호출하고 답합니다. 키의 범위는 여전히 적용됩니다. 읽기 전용 키는 스키마에 정의된 작업에 관계없이 쓰기를 거부합니다.

## 경로 B -- OpenAI 도구를 통한 MCP

B1 API는 모든 MCP 인식 OpenAI 도구(예: [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents), Responses API의 MCP 도구 또는 MCP 서버를 사용하는 타사 에이전트 플랫폼)에서 사용할 수 있는 `/mcp`에서 MCP 서버를 포함합니다.

`Authorization: Bearer` 헤더에서 동일한 `cak_…` 키로 인증합니다. 세 가지 도구가 노출됩니다: `list_endpoints`, `describe_endpoint` 및 `api_call`. [MCP 서버 개발자 참조](/docs/developer/api/mcp)에서 프로토콜, 전송 및 도구 스키마를 참조하세요.

ChatGPT의 기본 제공 "커넥터"(Pro/Business/Enterprise)는 현재 특정 `search` 및 `fetch` 도구 모양과 OAuth 기반 인증을 예상하므로 B1 MCP 서버에서 광고하지 않습니다. 소비자 앱 내의 ChatGPT의 경우 위의 Custom GPT 경로가 실용적인 선택입니다.

## 안전 및 제한

- **교회별 격리.** API 키는 하나의 교회로 해결됩니다. ChatGPT는 다른 교회의 데이터를 볼 수 없습니다.
- **권한 범위.** 키를 생성한 사람의 권한을 제거하면 ChatGPT는 다음 호출에서 즉시 이를 잃습니다.
- **취소 가능.** **설정 → 개발자 → API 키**에서 키를 삭제하면 ChatGPT의 액세스가 즉시 종료됩니다.
- **Custom GPT 공유는 데이터 공유입니다.** GPT에 액세스할 수 있는 모든 사람이 물음을 제기하고 키가 범위를 가진 내용을 볼 수 있습니다. 해당 데이터를 볼 수 있어야 하는 직원에게만 공유를 제한하고 더 좁은 범위를 선호합니다(예: 광범위하게 공유되는 GPT의 `donations:read` 생략).
- **감사 추적.** 변경은 B1Admin 작업과 동일한 감사 로그를 통과합니다. **보고서 → 감사 로그**에서 검토합니다.

## 비용

ChurchApps는 무료이고 오픈 소스입니다. Custom GPT가 호출하는 API는 교회가 이미 실행하는 API의 일부입니다. OpenAI는 자신의 플랜에 따라 ChatGPT 사용에 대해 요금을 청구합니다. ChurchApps에서는 호출당 비용이 없습니다.

## 문제 해결

**작업이 401을 반환합니다:** bearer 헤더가 올바르게 설정되지 않았습니다. 작업의 인증 패널에서 **인증 유형: Bearer**가 선택되어 있고 키 값에 `Bearer` 단어가 포함되지 않는지 확인합니다(ChatGPT가 자동으로 추가함).

**작업이 403을 반환합니다:** 키가 해당 엔드포인트의 범위를 가지지 않습니다. 올바른 범위로 새 키를 생성하고 GPT를 업데이트합니다.

**ChatGPT가 잘못된 작업을 호출합니다:** OpenAPI 스키마의 `summary` 및 `description` 필드를 조정하여 모델이 올바른 것을 선택할 수 있도록 합니다. GPT의 지침에 예제 쿼리를 추가하는 것도 도움이 됩니다.

**작업 패널이 스키마를 거부합니다:** ChatGPT에는 최소 하나의 `paths` 항목과 `servers` URL이 있는 OpenAPI 3.1이 필요합니다. 붙여넣기 전에 온라인 OpenAPI 검증기에서 YAML을 검증합니다.

**로컬 개발:** 작업의 `servers` URL을 로컬 Api(예: `http://localhost:8084`)로 지정합니다. 그러나 ChatGPT의 작업은 공용 URL만 호출하므로 로컬 테스트의 경우 `ngrok`과 같은 터널을 사용하거나 `curl`로 API를 직접 호출하여 키를 먼저 확인합니다.

## 관련

- [API 키](/docs/developer/api/api-keys) -- 전체 범위 참조
- [MCP 서버(개발자 참조)](/docs/developer/api/mcp) -- 프로토콜 세부 정보 및 도구 스키마
- [Claude](./claude) -- 같은 아이디어, Anthropic의 모델의 경우
- [REST API 참조](/docs/developer/api/endpoints) -- Custom GPT 작업이 히트할 수 있는 모든 엔드포인트
