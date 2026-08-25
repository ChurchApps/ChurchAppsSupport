---
title: "통합 & 확장 표면"
---
# 통합 & 확장 표면
<div class="article-intro">
제3자가 플러그인할 수 있는 모든 것은 하나의 API와 하나의 인증 모델을 통해 실행됩니다. 이 페이지는 맵입니다: 모든 통합 표면의 이름을 지정하고, 연결 방식을 보여주며, 각각에 대한 자세한 참고 자료로 연결합니다.
</div>

## 표면 한눈에

6가지 방법이 있으며, 모두 동일한 인증 계층을 공유합니다:

- **[REST API](../api/api-keys)** — 전체 제품 표면, 모든 언어에서 호출 가능
- **[API 키](../api/api-keys)** — 가장 간단한 자격 증명: 한 교회의 한 사람과 연결된 `cak_…` 토큰
- **[OAuth 2.0 & 연결된 앱](../api/connected-apps)** — 다중 테넌트 앱용 교회별 동의
- **[웹훅](../api/webhooks)** — 서명된, 안정적으로 전달되는 아웃바운드 이벤트
- **[MCP 서버](../api/mcp)** — AI 대면 REST API 래퍼
- **[콘텐츠 제공자](../freeplay-content-provider)** — 외부 미디어 라이브러리의 인바운드 경로

## 공유 인증 모델

모든 자격 증명 — 사용자의 로그인 JWT, OAuth 액세스 토큰, 또는 API 키 — 은 동일한 `Principal`로 해석됩니다.

### JWT 구조

B1 액세스 토큰은 `Api/src/modules/membership/auth/AuthenticatedUser.ts`에서 발급되는 HS256 JWT입니다.

| 클레임 | 의미 |
|---|---|
| `id`, `email`, `firstName`, `lastName` | 토큰 뒤에 있는 사람 |
| `churchId` | 이 토큰이 작동하는 단일 교회 |
| `personId` | 그 교회 내의 사람 기록 |
| `permissions` | RBAC 권한 문자열의 배열 |

## 관련 페이지

- [API 키](../api/api-keys)
- [연결된 앱 & OAuth](../api/connected-apps)
- [웹훅](../api/webhooks)
- [MCP 서버](../api/mcp)
- [콘텐츠 제공자](../freeplay-content-provider)
