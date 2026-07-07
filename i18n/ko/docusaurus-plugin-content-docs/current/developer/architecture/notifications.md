---
title: "알림 및 미리 알림 아키텍처"
---

# 알림 및 미리 알림 아키텍처

<div class="article-intro">

교회 회원이 자신이 보고 있는 페이지 외부에서 보는 모든 메시지 — 배지 수, 푸시 알림, 다이제스트 이메일 — MessagingApi의 두 가지 문 중 하나를 통과합니다. 이 페이지는 깔때기, 일정에 따라 공급하는 미리 알림 엔진, 실제로 사람에게 도달하는 것을 결정하는 선호도 모델을 문서화합니다.

</div>

## 개요 — 두 가지 문

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **사람에게 무언가를 알려주는 모든 것**은 메시징 모듈의 `NotificationHelper.createNotifications()`를 통해 갑니다. `notifications` 행을 지속하고 socket → push → email로 에스컬레이션하고 채널당 `PreferenceGateHelper`를 평가합니다. 레벨 0에 포함된 `in_app`.
2. **일정된 모든 것**은 `reminderDefinition` (엔터티 레벨 또는 범위 레벨)입니다. `reminderOccurrences`로 확장되고 반복되는 타이머에서 `ReminderEngine.scan()`으로 디스패치됩니다. 하나의 확장기, 하나의 디스패처, 하나의 전송 원장 (`reminderSentLog`).
3. **직접 이메일**은 `TransactionalEmailHelper.sendTransactional()` 뒤에만 존재합니다. ESLint 규칙은 컴파일 타임에 이를 시행합니다. 아래를 참조하세요.

:::tip 이메일 문은 관례가 아니라 린트 시행됩니다
`Api/tools/eslint-rules/email-door.cjs`는 `no-direct-email-helper`를 정의합니다. `NotificationHelper.ts` 또는 `TransactionalEmailHelper.ts` 외부에서 `EmailHelper.sendTemplatedEmail()` 또는 `EmailHelper.sendEmail()`에 대한 모든 호출은 린트에 실패합니다. 이메일을 보내야 하면 깔때기를 통해 라우트하세요 (`createNotifications` with `emailImmediate`) 또는 `TransactionalEmailHelper.sendTransactional()`를 통해. CI를 통과하는 세 번째 방법이 없습니다.
:::

## 알림 깔때기

`NotificationHelper.createNotifications()`은 일정되지 않았거나 트랜잭션이 아닌 모든 것의 단일 진입점입니다.

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

각 수신자에 대해 `notifications`에 행을 저장하고 `attemptDeliveryWithEscalation`을 호출하고 이는 아래 채널 사다리를 걷습니다. 동일한 `(contentType, contentId)`에 대해 읽지 않은 행은 재생성을 억제합니다. 이 중복 제거 가드는 `emailImmediate` 전송 (미리 알림 오프셋, 직원 "모두에게 이메일", 워크플로우 단계 자신의 중복 제거)과 직접 메시지에 대해 건너뜁니다. 항상 소켓을 핑합니다.

`shared/helpers/NotificationService.ts`는 메시징 모듈 외부의 호출자를 위해 동일한 서명 (`NotificationServiceOptions`)을 미러링하고 부팅 시 메시징 모듈에 등록됩니다.

## 채널 에스컬레이션 체인

배달은 레벨 (기본값 0, 또는 미리 알림/명시적 전송의 경우 더 높음)에서 시작하고 이전 채널이 성공하지 않은 경우에만 다음 채널로 진행합니다. 각 레벨은 시도되기 전에 `PreferenceGateHelper`로 게이트됩니다.

| 레벨 | 채널 | 동작 |
|------|------|------|
| 0 | **in_app / socket** | `in_app` 게이트가 먼저 확인됩니다. 억제된 경우 (음소거됨) 행은 `isNew=false`로 지속되고 배달이 완전히 중지됩니다. 소켓 핑, 배지, 추가 에스컬레이션이 없습니다. 그렇지 않으면 서버는 사람의 `alerts` 방에 대해 열린 소켓 연결을 찾고 `notification` (또는 `privateMessage`) 프레임을 푸시합니다. 일반 알림의 경우 성공적인 소켓 배달은 여기 체인을 중지합니다. 30분 타이머는 읽지 않은 항목을 다시 확인하고 나중에 에스컬레이션합니다. 직접 메시지는 소켓에서 절대 중지하지 않습니다. 설치된 PWA는 배경에서 alerts 소켓을 열린 상태로 유지할 수 있고 이는 OS 레벨 푸시를 억제할 수 있기 때문입니다. |
| 1 | **push** | `allowPush` / 카테고리 옵트아웃 / 조용한 시간에 게이트됩니다. 사람의 `devices` 행에서 찾은 Expo 푸시 토큰 및 웹 푸시 구독으로 전송되고 엔드포인트별로 중복 제거되며 경로를 따라 stale 토큰을 제거합니다. |
| 2 | **email** | `emailFrequency` 및 카테고리 옵트아웃에 게이트됩니다. 즉시 전송 (`emailImmediate`)은 바로 렌더링하고 `deliveryLogs` 행을 기록합니다. 그렇지 않으면 알림은 배치 다이제스트에 대해 보류 상태로 남겨집니다. 아래 설명되었습니다. |
| — | **sms** | 선호도 배선 (`allowSms`, 카테고리별 채널 목록)은 이미 SMS 채널을 설명합니다. 하지만 어떤 제작자도 오늘 이를 통해 전송하지 않습니다. 대량 SMS 제품을 위해 예약된 상태로 유지되며 이는 `TextingController` / `@churchapps/texting`를 통해 별도의 분리된 흐름으로 실행됩니다. |

소켓 또는 푸시에 남겨진 읽지 않은 알림은 30분 타이머 (`NotificationHelper.escalateDelivery`)로 에스컬레이션됩니다. 배치 이메일은 `NotificationHelper.sendEmailNotifications(frequency)`에서 전송되고 각 사람의 `emailFrequency` 선호도에 의해 구동됩니다: `individual`은 30분 타이머에서 실행되고 `daily`는 야간 타이머에서 실행됩니다. (`weekly`는 유효한 선호도 값이지만 아직 전용 배치 실행이 없습니다.)

## 미리 알림 엔진

일정된 미리 알림 — 이벤트 미리 알림, 작업 기한, 봉사/계획 할당 미리 알림 — 모두 기능별 맞춤형 크론 논리가 아니라 하나의 일반화된 엔진을 통해 갑니다.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**정의** (`reminderDefinitions`)는 엔터티 레벨 (`entityId` 설정 — 특정 이벤트, 작업, 또는 계획) 또는 범위 레벨 (`entityId` null, `scopeId` 설정 — 예: 봉사 계획 유형 아래 모든 계획)입니다. 정의는 분 오프셋 CSV (`offsets`, 예: 하루 및 한 시간 전 `"1440,60"`), 로컬 전송 시간 (`sendLocalTime`), 채널 CSV (`channels` — `email` 포함 전송 시간에 즉각적인 풍부한 이메일 트리거), `recipientMode`, 및 선택사항 사용자 정의 `message`를 전달합니다.

**확장**은 앞의 지평선에 대해 발화 행을 구체화합니다 (롤링 다중 일 윈도우). 야간 타이머에서 실행되고 정의가 저장될 때마다 동기적으로 실행되므로 마지막 순간 이벤트에 대한 미리 알림이 여전히 발화합니다. 범위 정의는 어댑터의 `loadScopeEntities`를 통해 팬아웃하고 구체적인 엔터티당 하나의 발생 세트를 생성합니다. 엔터티 레벨 발생은 키 `definitionId:occurrenceISO:offset`을 사용하고 범위가 지정된 발생은 엔터티 id로 네임스페이스하므로 충돌하지 않습니다. 발생을 upsert하면 **부활**시킵니다. 이전에 취소된 행을 취소한 후 재확장은 기본 엔터티가 변경된 후 미리 알림을 다시 동기화하는 표준 방법입니다. `sent`, `failed`, 또는 `processing` 행은 건드린 상태로 남겨집니다.

**디스패치** (`ReminderEngine.scan()`)은 30분 타이머에서 실행됩니다. 예정된 발생을 청구합니다 (리스 이중 처리 방지), 엔터티의 어댑터를 통해 수신자를 로드하고, 그 발생에 대해 `reminderSentLog`에 이미 기록된 모든 사람을 필터링하고, `deliveryStartLevel: 1` (푸시로 곧바로 건너뛰기)과 함께 `createNotifications`을 호출합니다. 정의의 채널에 이메일이 포함될 때 `emailImmediate`/`emailByPerson`.

내부 이벤트 버스는 야간 확장을 기다리지 않고 엔터티 변이에 반응합니다. 콘텐츠 이벤트 (웹훅 디스패처를 통해) 및 계획/작업 업데이트 이벤트는 영향을 받는 엔터티에 대한 즉각적인 재확장 또는 취소를 트리거하고 계획 업데이트는 또한 계획 유형에 연결된 모든 범위 정의를 재확장합니다.

### 어댑터

엔진은 엔터티 불가지론적입니다. 지원되는 각 엔터티 유형은 어댑터 (`helpers/adapters/`)를 통해 플러그인합니다.

| 엔터티 유형 | 어댑터 | 주석 |
|-----------|--------|------|
| `event` | `EventReminderAdapter` | 수신자는 이벤트 및 `recipientMode`에 따라 등록자 또는 그룹 회원으로 범위 지정됩니다. |
| `plan` | `PlanReminderAdapter` | 수신자는 받아들인 + 미확인 계획 할당입니다. `buildEmails`는 `DoingModuleGateway.buildPlanReminderEmails`로 호출하고 이는 위치, 주석, 사용자 정의 메시지를 렌더링합니다. `doing/helpers/PlanReminderEmailHelper`를 통해 `ReminderTokenHelper`로 서명된 승인/거부 버튼 포함. 공개 할당 응답 엔드포인트로 게시합니다. |
| `task` | `TaskReminderAdapter` | 수신자는 작업의 담당자입니다. |

### 엔드포인트

| 메서드 | 경로 | 목적 |
|--------|------|------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 한 엔터티에 대한 미리 알림 정의를 로드하거나 저장합니다. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 범위 레벨 (상속) 미리 알림 정의를 로드하거나 저장합니다. |
| `DELETE` | `/messaging/reminders/:defId` | 정의를 삭제하고 보류 중인 발생을 취소합니다. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 저장하기 전에 이벤트 미리 알림의 수신자 수 및 다음 발화 시간을 미리봅니다. |
| `GET` | `/messaging/reminders/log` | 교회의 최근 미리 알림 발생 이력. |
| `POST` | `/messaging/reminders/mute` | 특정 엔터티에 대한 미리 알림을 음소거합니다. |

정의를 저장하면 그 엔터티 또는 범위에 대한 동기식 재확장을 트리거하므로 편집자는 야간 작업을 기다리지 않고 최신 "다음 발화"를 봅니다.

## 직접 메시지

직접 메시지는 별도의 에스컬레이션 경로가 아니라 모든 것과 동일한 깔때기를 탑승합니다. 읽지 않은 각 대화는 `notifications`에서 하나의 **섀도우 행**을 가져옵니다 (`contentType='privateMessage'`, `contentId` = 비공개 메시지 id, `category='direct_messages'`). 모든 배달 상태를 소유합니다. socket/push/email 에스컬레이션, 읽음 추적, 모든 것. `privateMessages` 테이블 자체는 메시지 페이로드 및 `notifyPersonId` 열을 유지하고 이는 읽지 않은 배지의 소스이고 수신자가 대화를 읽을 때 지워집니다.

섀도우 행은 알림 벨에 불가시입니다. 읽지 않은 수 쿼리, 알림 목록 쿼리, 표시 읽음/삭제 쿼리에서 제외되고 모두 `contentType <> 'privateMessage'`를 필터링합니다. 모든 DM 핑은 읽지 않은 상태와 관계없이 소켓을 핑합니다 (라이브 채팅 의미 — 중복 제거 없음), DM은 일반 알림처럼 소켓 배달에서 절대 중지하지 않습니다. 배경이 있는 PWA는 소켓을 열린 상태로 유지할 수 있기 때문입니다. OS 레벨 푸시가 필요합니다. 사람이 DM 알림을 음소거하면 섀도우 행이 주차됩니다 (`isNew=false`, `notifyPersonId` 지워짐). 여전히 대화 자체 내에서 보이지만 배지나 알림이 없습니다.

## 선호도 및 게이팅

모든 전송은 `PreferenceGateHelper.evaluate()`를 통과하고 순수 함수입니다 (모든 상태가 전달되고 핫 경로의 DB 호출 없음). `allow`, `suppress`, 또는 `defer`를 반환합니다. 계층은 순서대로 실행되고 먼저 결정하는 계층이 이기합니다.

1. **잠긴 카테고리** — 일부 카테고리는 필수 (티어 0)이고 다른 모든 계층을 우회합니다.
2. **마스터 음소거 / 채널 종료** — `masterMute`, `allowPush`, `allowSms`, 또는 `emailFrequency='never'`는 완전히 억제합니다.
3. **조용한 시간** — 푸시 및 SMS만 (이메일은 비침투적으로 간주됨). 사람의 시간대의 현재 벽시계 시간이 조용한 윈도우에 속하면 트랜잭션 카테고리는 여전히 통과합니다. 비트랜잭션 카테고리는 조용한 윈도우의 끝까지 연기되고 `TimezoneHelper.wallClockToUtc`를 통해 DST 정정 UTC 인스턴트로 계산됩니다.
4. **카테고리별 선호도 무시** — 한 카테고리 × 채널 쌍에 대한 명시적 옵트아웃; 부재는 카테고리의 기본값을 의미합니다.
5. **엔터티별 음소거** — 특정 엔터티 (예: 하나의 이벤트, 하나의 계획)에 대해 기록된 음소거. 카테고리 레벨 설정보다 제한적이지만 호출자가 알림과 함께 엔터티 id/유형을 제공할 때만 적용됩니다.

포함된 테이블: `notificationPreferences` (글로벌 — `masterMute`, `emailFrequency` of `individual|daily|weekly|never`, `allowPush`, 조용한 시간 윈도우 + 시간대, `allowSms`), `notificationPreferenceOverrides` (카테고리 × 채널당), 및 `notificationEntityMutes` (엔터티당).

이 게이트는 깔때기 내에서 인앱 (레벨 0), 푸시 (레벨 1), 이메일 (레벨 2)에 대해 시행됩니다. 즉시 미리 알림/다이제스트 이메일 포함. 트랜잭션 이메일 (인증 코드, 비밀번호 재설정, 초대, 기부 영수증)은 의도적으로 이를 우회합니다. 이것이 두 번째 문의 핵심입니다.

## 스케줄링

미리 알림 엔진과 알림 다이제스트 모두 새 인프라를 도입하는 대신 기존 예약된 타이머를 사용합니다.

| 타이머 | 일정 | 실행 |
|--------|------|------|
| 30분 타이머 | 30분마다 | 읽지 않은 알림을 에스컬레이션합니다. `individual` 빈도 다이제스트 이메일을 보냅니다. 예정된 미리 알림 발생을 디스패치합니다 (`ReminderEngine.scan`). 승인 다이제스트를 합니다. 자동화 실행을 합니다. |
| 야간 타이머 | 05:00 UTC | 그룹 참석 미리 알림입니다. 반복 스트리밍 서비스를 진행합니다. 자동 새로고침 목록을 새로고칩니다. 다음 지평선을 위한 미리 알림 발생을 확장합니다 (`ReminderEngine.expandAll`). `daily` 빈도 다이제스트 이메일을 보냅니다. |

로컬에서 같은 논리를 `Api` 프로젝트에서 `npm run timer:30min` 및 `npm run timer:midnight`으로 요청 시 트리거할 수 있습니다.

## 파일 목록

| 영역 | 파일 |
|------|------|
| 깔때기 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| 공유 진입점 | `Api/src/shared/helpers/NotificationService.ts` |
| 트랜잭션 문 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, 린트 규칙 `Api/tools/eslint-rules/email-door.cjs` |
| 미리 알림 엔진 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| 미리 알림 저장소 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| 봉사/계획 이메일 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| 미리 알림 편집기 (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| 미리 알림 편집기 / 선호도 (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## 관련 페이지

- [실시간 아키텍처](../realtime) — 인앱 배달 레벨이 탑승하는 WebSocket 프로토콜 및 클라이언트 프리미티브 (`SocketHelper`, `SubscriptionManager`, `ConversationStore`)
- [웹 푸시 알림](../web-push) — 푸시 에스컬레이션 레벨이 사용하는 VAPID 설정 및 브라우저 Push API 경로
- [메시징 엔드포인트](../api/endpoints/messaging) — 메시지, 대화, 연결, 알림/미리 알림 경로에 대한 전체 REST 표면
