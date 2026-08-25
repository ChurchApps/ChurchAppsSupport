---
title: "ChatGPT"
---
# ChatGPT
<div class="article-intro">
OpenAI의 ChatGPT를 교회 B1 데이터와 연결하세요. ChatGPT는 교회 기록을 볼 수 있고, B1 Admin에서 여러 단계를 거쳐야 하는 작업을 수행하도록 도와줍니다.
</div>
<div class="prereqs">
<h4>시작하기 전에</h4>
- B1 Admin의 **설정 편집** 권한이 있는 교회 관리자
- **ChatGPT Plus, Pro, Team, 또는 Enterprise** 계정
</div>
## 빠른 설정 가이드
**Step 1 — B1 Admin에서 API 키 가져오기**
1. B1 Admin에서 **설정 → 개발자 → API 키**로 이동
2. **새 API 키**를 클릭하고 이름을 입력한 후 범위를 선택합니다
3. `cak_…` 키를 복사합니다
**Step 2 — ChatGPT 설정**
1. ChatGPT에서 프로필을 클릭합니다
2. **설정**을 클릭합니다
3. **플러그인** → **MCPs**를 클릭합니다
4. **추가** → **MCP 서버 추가**를 클릭합니다
5. 다음 값을 입력합니다:
   - **이름**: `B1 Church`
   - **유형**: **Streamable HTTP**
   - **URL**: `https://api.churchapps.org/mcp`
   - **헤더**: Key: `Authorization` Value: `Bearer cak_yourkey`
6. **저장**을 클릭합니다
## 다음 단계
- [API 키](../api/api-keys) 참고
- [MCP 서버](../api/mcp) 참고
