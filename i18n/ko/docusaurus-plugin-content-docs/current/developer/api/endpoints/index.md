---
title: "엔드포인트 참고"
---

# 엔드포인트 참고

<div class="article-intro">

이 섹션은 ChurchApps API에서 노출한 모든 REST 엔드포인트를 문서화합니다. 각 모듈 페이지는 HTTP 메서드, 경로, 인증 요구사항, 필수 권한과 함께 모든 경로를 나열합니다.

</div>

## 기본 URL

| 환경 | URL |
|-------------|-----|
| 로컬 개발 | `http://localhost:8084` |
| 프로덕션 | `https://api.churchapps.org` |

## 요청 규칙

- **Content-Type:** 모든 요청 및 응답 본문은 `application/json`을 사용합니다
- **다중 테넌트:** 모든 인증된 요청은 JWT 토큰에서 추출한 `churchId`로 범위가 지정됩니다 -- URL에 `churchId`를 전달하지 마세요
- **배치 저장:** 대부분의 `POST` 엔드포인트는 **객체 배열**을 허용합니다. API는 새 기록(필드 `id` 없음)을 삽입하고 기존 기록(필드 `id` 있음)을 단일 호출로 업데이트합니다
- **ID:** 모든 엔터티 ID는 UUID입니다

### 예: 배치 저장

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

첫 번째 객체는 생성됩니다(새로움); 두 번째는 업데이트됩니다(ID 있음).

## 응답 형식

성공적인 응답은 JSON을 반환합니다 -- 단일 객체 또는 배열. 오류 응답은 표준 HTTP 상태 코드를 사용합니다:

| 코드 | 의미 |
|------|---------|
| `200` | 성공 |
| `400` | 잘못된 요청 (검증 오류) |
| `401` | 허가되지 않음 (누락되었거나 유효하지 않은 토큰 또는 권한 부족) |
| `404` | 찾을 수 없음 |
| `500` | 서버 오류 |

검증 오류 반환:

```json
{
  "errors": [
    { "msg": "유효한 이메일 주소를 입력하세요", "param": "email", "location": "body" }
  ]
}
```

## 엔드포인트 테이블을 읽는 방법

각 모듈 페이지는 컨트롤러별로 엔드포인트를 구성합니다. 테이블은 다음 열을 사용합니다:

| 열 | 설명 |
|--------|-------------|
| **Method** | HTTP 메서드 (`GET`, `POST`, `DELETE`) |
| **Path** | 컨트롤러의 기본 경로와 관련된 경로 |
| **Auth** | **JWT** = Bearer 토큰 필요, **Public** = 인증 필요 없음 |
| **Permission** | 필수 권한 (예: `People.Edit`). `—` = 인증된 모든 사용자 |
| **Description** | 엔드포인트가 하는 것 |

표준 CRUD 기본 클래스를 확장하는 컨트롤러는 4개의 엔드포인트를 자동으로 제공합니다: `GET /` (모두 나열), `GET /:id` (ID로 가져오기), `POST /` (생성/업데이트), `DELETE /:id` (삭제).

## 보고 모듈

보고 모듈은 다른 모듈과 다르게 작동합니다. 데이터베이스 기반 CRUD 대신, 디스크의 JSON 파일에서 보고서 정의를 로드하고 매개변수화된 SQL 쿼리를 실행합니다.

| 메서드 | 경로 | 인증 | 설명 |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | 키 이름별로 보고서 정의 로드 |
| GET | `/reporting/reports/:keyName/run` | JWT | 보고서 실행 및 결과 반환 |

보고서 매개변수는 쿼리 문자열 값으로 전달됩니다 (예: `?startDate=2024-01-01&endDate=2024-12-31`). `churchId` 매개변수는 JWT 토큰에서 자동으로 삽입됩니다. 각 보고서 정의는 자신의 권한 요구사항을 지정할 수 있습니다.

## 모듈 인덱스

| 모듈 | 기본 경로 | 설명 |
|--------|-----------|-------------|
| [인증](./authentication) | `/membership/users`, `/membership/oauth` | 로그인, 등록, JWT 토큰, OAuth, 권한 |
| [회원](./membership) | `/membership/*` | 사람, 교회, 그룹, 가구, 역할, 양식, 설정 |
| [참석](./attendance) | `/attendance/*` | 캠퍼스, 서비스, 세션, 방문, 체크인 기록 |
| [컨텐츠](./content) | `/content/*` | 페이지, 설교, 이벤트, 파일, 갤러리, 성경, 스트리밍 |
| [헌금](./giving) | `/giving/*` | 기부금, 펀드, 결제 게이트웨이, 구독 |
| [메시징](./messaging) | `/messaging/*` | 대화, 알림, 장치, SMS |
| [할 일](./doing) | `/doing/*` | 계획, 작업, 할당, 자동화, 스케줄링 |
