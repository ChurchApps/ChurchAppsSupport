---
title: "메시징 엔드포인트"
---
# 메시징 엔드포인트
<div class="article-intro">
메시징 모듈은 실시간 대화, 채팅 메시지, 푸시 알림, SMS/이메일 전달, WebSocket 연결, 개인 메시징, 디바이스 등록, 문자 제공자를 관리합니다.
</div>

**기본 경로:** `/messaging`

## 대화

기본 경로: `/messaging/conversations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/timeline/ids?ids=` | JWT | — | ID별 대화 로드 |
| GET | `/messages/:contentType/:contentId` | JWT | — | 콘텐츠별 대화 로드 |
| POST | `/` | JWT | — | 대화 생성 또는 업데이트 |
| DELETE | `/:churchId/:id` | JWT | — | 대화 삭제 |

## 메시지

기본 경로: `/messaging/messages`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/conversation/:conversationId` | JWT | — | 대화의 모든 메시지 로드 |
| POST | `/` | JWT | — | 메시지 저장 |
| DELETE | `/:churchId/:id` | JWT | — | 메시지 삭제 |

## 알림

기본 경로: `/messaging/notifications`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | 현재 사용자의 알림 로드 |
| POST | `/` | JWT | — | 알림 생성 또는 업데이트 |
| DELETE | `/:churchId/:id` | JWT | — | 알림 삭제 |

## 관련 페이지

- [실시간 아키텍처](../../realtime)
- [웹 푸시 알림](../../web-push)
