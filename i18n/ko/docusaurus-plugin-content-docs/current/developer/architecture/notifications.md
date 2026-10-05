---
title: "알림 및 미리 알림 아키텍처"
---

# 알림 및 미리 알림 아키텍처

<div class="article-intro">

교회 회원이 보고 있는 페이지 외부에서 보는 모든 메시지(배지 수, 푸시 알림, 다이제스트 이메일)는 MessagingApi의 두 가지 중 하나를 통과합니다. 이 페이지는 그 경로, 일정에 따라 이를 공급하는 미리 알림 엔진, 그리고 실제로 사람에게 전달되는 항목을 결정하는 기본 설정 모델을 문서화합니다.

</div>

## 개요 - 두 가지 경로

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **누군가에게 뭔가를 알려주는 모든 것**은 메시징 모듈의 `NotificationHelper.createNotifications()`을 통과합니다. 이는 `notifications` 행을 유지하고 socket → push → email로 에스컬레이션하면서 채널당 `PreferenceGateHelper`을 평가합니다 - 레벨 0에서 `in_app` 포함.
2. **일정이 잡혀 있는 모든 것**은 `reminderDefinition`(엔티티 수준 또는 범위 수준)으로 `reminderOccurrences`로 확장되고 반복 타이머에서 `ReminderEngine.scan()`으로 발송됩니다. 하나의 expander, 하나의 dispatcher, 하나의 송신 원장(`reminderSentLog`).
3. **직접 이메일**은 `TransactionalEmailHelper.sendTransactional()` 뒤에만 존재합니다. ESLint 규칙은 컴파일 타임에 이를 강제합니다 - 아래를 참조하세요.

:::tip 이메일 경로는 관례가 아니라 린트로 강제됩니다
`Api/tools/eslint-rules/email-door.cjs`는 `no-direct-email-helper`를 정의합니다: `NotificationHelper.ts` 또는 `TransactionalEmailHelper.ts` 외부에서 `EmailHelper.sendTemplatedEmail()` 또는 `EmailHelper.sendEmail()`을 호출하면 린트가 실패합니다. 이메일을 보내야 한다면, 경로를 통해 라우팅하세요(`emailImmediate`가 있는 `createNotifications`) 또는 `TransactionalEmailHelper.sendTransactional()`을 통해 - CI를 통과하는 세 번째 방법은 없습니다.
:::

## 알림 경로

`NotificationHelper.createNotifications()`은 일정이 정해지지 않거나 트랜잭션이 아닌 모든 것의 단일 진입점입니다:

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

각 수신자에 대해 `notifications`에서 행을 저장하고 아래 채널 사다리를 따라가는 `attemptDeliveryWithEscalation`을 호출합니다. 같은 `(contentType, contentId)`에 대한 아직 읽지 않은 행은 재작성을 억제합니다 - 이 중복 제거 가드는 `emailImmediate` 송신(미리 알림 오프셋, 직원 "모두 이메일", 워크플로우 단계 자신의 중복 제거)과 항상 소켓을 핑하는 직접 메시지에 대해 건너뜁니다.

`shared/helpers/NotificationService.ts`는 메시징 모듈 외부의 발신자에 대해 동일한 서명(`NotificationServiceOptions`)을 미러링하고 부팅 시 메시징 모듈에 등록됩니다.

## 채널 에스컬레이션 체인

배달은 수준(기본값 0 또는 미리 알림/명시적 송신의 경우 더 높음)에서 시작하고 이전 채널이 성공하지 않은 경우에만 다음 채널로 진행됩니다. 각 수준은 시도하기 전에 `PreferenceGateHelper`로 게이팅됩니다.

| 레벨 | 채널 | 동작 |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app` 게이트를 먼저 확인합니다. 억제되면(음소거) 행은 `isNew=false`로 유지되고 배달이 완전히 중지됩니다 - 소켓 핑 없음, 배지 없음, 추가 에스컬레이션 없음. 그렇지 않으면 서버는 사람의 `alerts` 방에 대한 열린 소켓 연결을 찾고 `notification`(또는 `privateMessage`) 프레임을 푸시합니다. 일반 알림의 경우 성공적인 소켓 배달이 여기서 체인을 중지합니다 - 30분 타이머가 읽지 않은 항목을 다시 확인하고 나중에 에스컬레이션합니다. 직접 메시지는 소켓에서 절대 중지하지 않습니다: 설치된 PWA는 백그라운드에서 경고 소켓을 열어 둘 수 있으므로 OS 수준의 푸시를 억제합니다. |
| 1 | **push** | `allowPush` / 카테고리 옵트 아웃 / 조용한 시간에 게이팅됩니다. 사람의 `devices` 행에서 찾은 Expo 푸시 토큰 및 웹 푸시 구독 모두에 보내며, 엔드포인트로 중복 제거하고 경로를 따라 오래된 토큰을 정리합니다. |
| 2 | **email** | `emailFrequency` 및 카테고리 옵트 아웃에 게이팅됩니다. 즉시 송신(`emailImmediate`)은 즉시 렌더링되고 `deliveryLogs` 행을 작성합니다; 그렇지 않으면 알림은 배치 다이제스트를 위해 pending 상태로 유지되며, 아래에 설명되어 있습니다. |
| — | **sms** | 기본 설정 배관(`allowSms`, 카테고리당 채널 목록)은 이미 SMS 채널을 고려하고 있지만 오늘날 어떤 생산자도 이를 통해 보내지 않습니다 - 그것은 `TextingController` / `@churchapps/texting`을 통해 별도의 격리된 흐름으로 실행되는 대량 SMS 제품을 위해 예약되어 있습니다. 워크플로우 **텍스트 보내기** 단계 작업(`StepActionHelper.sendText` → `MessagingModuleGateway.sendPersonText`)도 이 경로를 우회합니다: 이는 교회의 제공자를 통해 카드의 사람에게 직접 텍스트를 보내므로 알림 기본 설정과 조용한 시간이 적용되지 않습니다 - 사람의 `optedOut` 플래그만 존경됩니다. |

소켓이나 푸시에서 남겨진 읽지 않은 알림은 30분 타이머(`NotificationHelper.escalateDelivery`)로 에스컬레이션됩니다. 배치 이메일은 `NotificationHelper.sendEmailNotifications(frequency)`로 보내지며, 각 사람의 `emailFrequency` 기본 설정에 의해 주도됩니다: `individual`은 30분 타이머에서 실행되고, `daily`는 밤 타이머에서 실행됩니다. (`weekly`는 유효한 기본 설정 값이지만 아직 전용 배치 실행이 없습니다.)

## 미리 알림 엔진

예약된 미리 알림 - 이벤트 미리 알림, 작업 마감일, 봉사/계획 할당 미리 알림 - 모두 기능당 임시 cron 로직이 아니라 하나의 일반화된 엔진을 통과합니다.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**정의**(`reminderDefinitions`)는 엔티티 수준(`entityId` 설정 - 특정 이벤트, 작업 또는 계획) 또는 범위 수준(`entityId` null, `scopeId` 설정 - 예를 들어 봉사 계획 유형 아래의 모든 계획)입니다. 정의는 분 오프셋(`offsets`, 예: `"1440,60"` 하루 전 및 1시간 전)의 CSV, 로컬 송신 시간(`sendLocalTime`), 채널의 CSV(`channels` - `email` 포함은 송신 시간에 즉시 리치 이메일을 트리거함), `recipientMode`, 그리고 선택적 사용자 정의 `message`를 전달합니다.

**확장**은 앞서 있는 지평선(순환 다중 일 창)에 대한 파이어 행을 구체화합니다. 밤 타이머에서 실행되고 정의가 저장될 때마다 동기식으로 실행되므로 마지막 순간 이벤트에 대한 미리 알림은 여전히 실행됩니다. 범위 정의는 어댑터의 `loadScopeEntities`를 통해 실행되어 구체적인 엔티티당 하나의 발생 집합을 생성합니다; 엔티티 수준의 발생은 `definitionId:occurrenceISO:offset` 키를 사용하는 반면, 범위이 발생은 엔티티 ID로 네임스페이스되어 충돌하지 않습니다. 발생을 업서트하면 **이전에 취소된 행을 부활**시킵니다 - cancel-then-re-expand는 기본 엔티티 변경 후 미리 알림을 다시 동기화하는 표준 방법입니다; 이미 `sent`, `failed`, 또는 `processing` 상태인 행은 그대로 유지됩니다.

**발송**(`ReminderEngine.scan()`)은 30분 타이머에서 실행됩니다. 이는 만료된 발생을 청구합니다(리스를 통해 이중 처리 방지), 엔티티의 어댑터를 통해 수신자를 로드하고, 그 발생에 대한 `reminderSentLog`에 이미 기록된 사람을 필터링하고, `deliveryStartLevel: 1`(푸시로 직접 건너뛰기)과 함께 `createNotifications`를 호출합니다 정의의 채널에 이메일이 포함될 때 `emailImmediate`/`emailByPerson`.

내부 이벤트 버스는 밤 확장을 기다리지 않고 엔티티 변경에 반응합니다: 콘텐츠 이벤트(웹훅 디스패처를 통해) 및 계획/작업 업데이트 이벤트는 영향을 받는 엔티티에 대한 즉각적인 재확장 또는 취소를 트리거하고, 계획 업데이트는 또한 그 계획 유형과 연결된 모든 범위 정의를 재확장합니다.

### 어댑터

엔진은 엔티티에 무관합니다; 지원되는 각 엔티티 유형은 어댑터(`helpers/adapters/`)를 통해 플러그인합니다:

| 엔티티 유형 | 어댑터 | 참고 |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | 수신자는 이벤트 및 `recipientMode`에 따라 등록자 또는 그룹 구성원으로 범위가 지정됩니다. |
| `plan` | `PlanReminderAdapter` | 수신자는 승인됨 + 미확인 계획 할당입니다. `buildEmails`는 `DoingModuleGateway.buildPlanReminderEmails`로 호출하며, 이는 위치, 노트 및 사용자 정의 메시지를 `doing/helpers/PlanReminderEmailHelper`를 통해 렌더링하고 `ReminderTokenHelper`로 서명한 수락/거부 버튼을 포함하며 공개 할당 응답 엔드포인트에 POST합니다. |
| `task` | `TaskReminderAdapter` | 수신자는 작업의 담당자입니다. |

### 엔드포인트

| 메서드 | 경로 | 목적 |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 하나의 엔티티에 대한 미리 알림 정의를 로드하거나 저장합니다. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 범위 수준(상속된) 미리 알림 정의를 로드하거나 저장합니다. |
| `DELETE` | `/messaging/reminders/:defId` | 정의를 삭제하고 pending 발생을 취소합니다. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 저장하기 전에 이벤트 미리 알림에 대한 수신자 수와 다음 발화 시간을 미리 봅니다. |
| `GET` | `/messaging/reminders/log` | 교회에 대한 최근 미리 알림 발생 기록. |
| `POST` | `/messaging/reminders/mute` | 특정 엔티티에 대한 미리 알림을 음소거합니다. |

정의를 저장하면 그 엔티티 또는 범위에 대한 동기식 재확장이 트리거되므로 편집자는 밤 작업을 기다리지 않고 최신 "다음 발화"를 봅니다.

## 직접 메시지

직접 메시지는 별도의 에스컬레이션 경로 대신 다른 모든 것처럼 동일한 경로를 따릅니다. 읽지 않은 각 대화는 `notifications`(`contentType='privateMessage'`, `contentId` = 개인 메시지 id, `category='direct_messages'`)에서 하나의 **섀도 행**을 가지며, 모든 배달 상태를 소유합니다 - socket/push/email 에스컬레이션, 읽기 추적, 모든 것. `privateMessages` 테이블 자체는 메시지 페이로드와 `notifyPersonId` 열을 유지하며, 이는 읽지 않은 배지의 원본이며 수신자가 대화를 읽을 때 지워집니다.

섀도 행은 알림 벨에 대해 보이지 않습니다: 읽지 않은 수 쿼리, 알림 목록 쿼리, 표시-읽음/삭제 쿼리에서 제외되어 있으며, 모두 `contentType <> 'privateMessage'`를 필터링합니다. 모든 DM 핑은 읽지 않은 상태와 관계없이 소켓을 치고(라이브 채팅 의미론 - 중복 제거 없음), DM은 배경이 된 PWA가 소켓을 열어 놓으면서도 OS 수준의 푸시가 필요할 수 있으므로 일반 알림처럼 소켓 배달에서 절대 중지하지 않습니다. 사람이 DM 알림을 음소거하면 섀도 행은 주차됩니다(`isNew=false`, `notifyPersonId` 지워짐) - 여전히 대화 자체 내에서 보이지만 배지나 경고 없음.

## 기본 설정 및 게이팅

모든 송신은 `PreferenceGateHelper.evaluate()`을 통과합니다, 순수 함수(모든 상태가 전달되고 핫 경로에서 DB 호출 없음)는 `allow`, `suppress`, 또는 `defer`를 반환합니다. 계층은 순서대로 실행되고 먼저 결정하는 것이 이깁니다:

1. **고정 카테고리** - 일부 카테고리는 필수(계층 0)이고 다른 모든 계층을 우회합니다.
2. **마스터 음소거 / 채널 킬** - `masterMute`, `allowPush`, `allowSms`, 또는 `emailFrequency='never'`는 완전히 억제합니다.
3. **조용한 시간** - 푸시 및 SMS만(이메일은 비침습적인 것으로 간주됨). 사람의 타임존에서 현재 벽시계 시간이 그들의 조용한 창에 떨어지면, 트랜잭션 카테고리는 여전히 통과합니다; 비트랜잭션 카테고리는 조용한 창의 끝으로 연기되며, `TimezoneHelper.wallClockToUtc`를 통해 DST 정정 UTC 순간으로 계산됩니다.
4. **카테고리별 기본 설정 재정의** - 하나의 카테고리 × 채널 쌍에 대한 명시적 옵트 아웃; 부재는 카테고리의 기본값을 의미합니다.
5. **엔티티별 음소거** - 특정 엔티티(예: 하나의 이벤트, 하나의 계획)에 대해 기록된 음소거는 카테고리 수준 설정보다 추가로 제한하지만, 발신자가 알림과 함께 엔티티 ID/유형을 제공할 때만 적용됩니다.

관련 테이블: `notificationPreferences`(전역 - `masterMute`, `emailFrequency` of `individual|daily|weekly|never`, `allowPush`, 조용한 시간 창 + 타임존, `allowSms`), `notificationPreferenceOverrides`(카테고리 × 채널당), 그리고 `notificationEntityMutes`(엔티티당).

이 게이트는 in-app(레벨 0), 푸시(레벨 1) 및 이메일(레벨 2) 내에서 경로 내에서 강제됩니다 - 즉시 미리 알림/다이제스트 이메일 포함. 트랜잭션 이메일(인증 코드, 비밀번호 재설정, 초대, 기부금 영수증)은 설계상 이를 우회합니다; 그것이 두 번째 경로의 전체 요점입니다.

## 교회 저작 이메일 제한

교회가 작성한 콘텐츠가 있는 이메일은 공유 ChurchApps SES ID에서 나가므로 `Api/src/shared/helpers/ChurchEmailLimiter.ts`로 교회별로 미터링됩니다. 네 가지 경로가 이를 호출합니다: 그룹/템플릿 송신(`EmailTemplateController`, 콘텐츠 유형 `email`), 양식 후속 이메일(`FormSubmissionController`, `formFollowUp`), 워크플로우 **이메일 보내기** 작업(`NotificationHelper` with `churchAuthored`, `workflowEmail`), 그리고 B1 계정 초대(`UserController.sendInviteEmail`, `invite`). 시스템 메일(인증 코드, 영수증, 미리 알림)은 미터링되지 않습니다.

- **승인 게이트.** 교회는 서버 관리자가 `churches.emailApprovedDate`를 설정할 때까지 아무것도 보내지 않습니다(`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** 칩). 보관된 교회는 항상 차단됩니다. B1Admin의 Send Email 대화는 `GET /messaging/emailTemplates/sendStatus`(`approved`, `paused`, `remaining`, `requested`)를 읽고 승인되지 않은 경우 **Request review** 카드 대신 편집기를 표시합니다. `POST /messaging/emailTemplates/requestApproval`은 지원에 이메일을 보냅니다, 교회당 주당 최대 한 번.
- **획득한 수당.** 승인된 교회는 `max(150, 2 × its best church-authored day in the prior 30 days)`, 롤링 24시간당 2,000으로 제한됩니다. 현재 24시간은 "최고 일"에서 제외되므로 버스트는 자신의 제한을 높일 수 없습니다.
- **예약, 그 다음 정산.** `reserve()`는 보내기 전에 수신자당 하나의 `deliveryLogs` 행을 작성하고, 그 행이 계산된 수당을 다시 확인하고, 두 요청이 제한을 지나가면 백아웃합니다(송신은 429를 반환합니다). `settle()`은 각 행을 전송됨 또는 실패로 표시합니다.
- **불만 일시 중지.** `sesFeedback` Lambda(`Api/src/lambda/ses-feedback-handler.ts`, SES → SNS로 공급됨)는 각 영구적 바운스 또는 불만을 그 주변 시간에 그 주소에 도달한 교회 저작 이메일을 소유한 교회에 핀합니다, `deliveryMethod` `sesBounce` / `sesComplaint`로 저장됩니다. 교회는 7일 이상 2+ 불만(≥ 0.3% 송신) 또는 10+ 하드 바운스(≥ 5%)에서 일시 중지됩니다.

## 스케줄링

미리 알림 엔진과 알림 다이제스트 모두 새로운 인프라를 도입하지 않고 기존 예약 타이머를 타면서 탑니다:

| 타이머 | 스케줄 | 실행 |
|-------|----------|------|
| 30분 타이머 | 30분마다 | 읽지 않은 알림을 에스컬레이션합니다; `individual` 주파수 다이제스트 이메일을 보냅니다; 만료된 미리 알림 발생을 발송합니다(`ReminderEngine.scan`); 승인 다이제스트; 만료된 자동화 실행 |
| 밤 타이머 | 05:00 UTC | 그룹 출석 미리 알림; 반복되는 스트리밍 서비스를 진행합니다; 자동 새로 고침 목록을 새로 고칩니다; 다음 지평선에 대한 미리 알림 발생을 확장합니다(`ReminderEngine.expandAll`); `daily` 주파수 다이제스트 이메일을 보냅니다 |

로컬에서 동일한 로직을 `Api` 프로젝트에서 `npm run timer:30min` 및 `npm run timer:midnight`로 요청 시 트리거할 수 있습니다.

## 파일 목록

| 영역 | 파일 |
|------|-------|
| 경로 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| 공유 진입점 | `Api/src/shared/helpers/NotificationService.ts` |
| 트랜잭션 경로 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, 린트 규칙 `Api/tools/eslint-rules/email-door.cjs` |
| 교회 이메일 제한 | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| 미리 알림 엔진 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| 미리 알림 저장소 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| 봉사/계획 이메일 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| 미리 알림 편집자(B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| 미리 알림 편집자 / 기본 설정(B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## 관련 페이지

- [실시간 아키텍처](../realtime) - WebSocket 프로토콜 및 클라이언트 기본 요소(`SocketHelper`, `SubscriptionManager`, `ConversationStore`) in-app 배달 수준이 타는
- [웹 푸시 알림](../web-push) - VAPID 설정 및 푸시 에스컬레이션 수준이 사용하는 브라우저 Push API 경로
- [메시징 엔드포인트](../api/endpoints/messaging) - 메시지, 대화, 연결 및 알림/미리 알림 경로의 전체 REST 표면
