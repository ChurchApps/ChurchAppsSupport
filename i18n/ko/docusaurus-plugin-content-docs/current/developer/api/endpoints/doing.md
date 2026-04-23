---
title: "할 일 엔드포인트"
---

# 할 일 엔드포인트

<div class="article-intro">

할 일 모듈은 서비스 계획, 자원봉사자 스케줄링, 작업 관리, 자동화를 관리합니다. 시간 및 위치를 가진 서비스 계획 생성, 자원봉사자 할당, 차단 날짜 관리, 서비스 순서 항목 작성, 외부 컨텐츠 공급자 연결, 자동화된 워크플로우 구성을 위한 도구를 제공합니다.

</div>

**기본 경로:** `/doing`

## 계획

기본 경로: `/doing/plans`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 계획 나열 |
| GET | `/:id` | JWT | — | ID로 계획 가져오기 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 가져오기 |
| GET | `/types/:planTypeId` | JWT | — | 계획 유형별 계획 가져오기 |
| GET | `/presenter` | JWT | — | 향후 7일의 계획 가져오기 (프리젠터 보기) |
| GET | `/public/current/:planTypeId` | Public | — | 계획 유형의 현재 계획 가져오기 |
| POST | `/` | JWT | — | 계획 생성 또는 업데이트 (단일 객체 또는 배열 허용) |
| POST | `/copy/:id` | JWT | — | 위치, 시간, 할당, 서비스 순서 항목을 포함한 계획 복사. 본문: `copyMode` ("none", "positions", "all") 및 `copyServiceOrder` (boolean) 포함 |
| POST | `/autofill/:id` | JWT | — | 계획의 자원봉사자 할당 자동 채우기. 본문: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | 계획 및 모든 관련 시간, 할당, 위치, 계획 항목 삭제 |

### 예: 계획 복사

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## 할당

기본 경로: `/doing/assignments`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 현재 사용자의 할당 가져오기 |
| GET | `/:id` | JWT | — | ID로 할당 가져오기 |
| GET | `/plan/ids?planIds=` | JWT | — | 쉼표로 구분된 계획 ID별 여러 계획의 할당 가져오기 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 할당 가져오기 |
| POST | `/` | JWT | — | 할당 생성 또는 업데이트 (상태 기본값 "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | 할당 수락 (할당된 사람이어야 함) |
| POST | `/decline/:id` | JWT | — | 할당 거부 (할당된 사람이어야 함) |
| DELETE | `/:id` | JWT | — | 할당 삭제 |

### 예: 할당 수락

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## 자동화

기본 경로: `/doing/automations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 자동화 나열 |
| GET | `/:id` | JWT | — | ID로 자동화 가져오기 |
| GET | `/check` | Public | — | 모든 자동화의 확인 트리거 |
| POST | `/` | JWT | — | 자동화 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 자동화 삭제 |

## 관련 페이지

- [회원 엔드포인트](./membership) — 사람, 그룹, 역할, 권한
- [참석 엔드포인트](./attendance) — 서비스 및 방문 추적
- [모듈 구조](../module-structure) — 코드 구성 패턴
