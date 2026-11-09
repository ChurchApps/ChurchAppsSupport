---
title: "알림 및 리마인더 아키텍처"
description: "B1 Admin API가 알림, 예약된 리마인더, 교회 이메일 한도, 문자 수신 거부를 하나의 전달 통로와 설정 게이트를 거쳐 어떻게 처리하는지 설명합니다."
---

# 알림 및 리마인더 아키텍처

<div class="article-intro">

교인이 현재 보고 있는 페이지 밖에서 보는 모든 메시지(배지 숫자, 푸시 알림, 요약 이메일)는 MessagingApi의 두 문 중 하나를 통과합니다. 이 페이지는 그 통로, 그 통로에 일정에 따라 공급되는 리마인더 엔진, 그리고 실제로 누구에게 무엇이 전달될지를 정하는 설정 모델을 설명합니다.

</div>

## 개요 — 두 개의 문

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
scheduled staff push ─▶ scheduledNotifications (1-minute timer) ───────────┤
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **무언가를 사람에게 알리는 모든 것**은 messaging 모듈의 `NotificationHelper.createNotifications()`를 거칩니다. 이 함수는 `notifications` 행을 저장하고, `PreferenceGateHelper`로 채널별 허용 여부를 평가하면서 소켓 → 푸시 → 이메일 순으로 전달을 확대합니다. 레벨 0의 `in_app`도 포함됩니다.
2. **예약되는 모든 것**은 `reminderDefinition`(개체 수준 또는 범위 수준)이며, 이것이 `reminderOccurrences`로 펼쳐지고 `ReminderEngine.scan()`이 주기적인 타이머에서 발송합니다. 펼치는 로직, 발송하는 로직, 발송 기록(`reminderSentLog`)은 각각 하나씩만 있습니다. 예외는 B1Admin의 **Mobile > Push Notifications** 페이지나 그룹의 **Notify** 대화 상자에서 예약한 직원용 푸시입니다. 이것은 `scheduledNotifications` 행(대상이 `church` 또는 `group`)이며, 1분 타이머에서 `ScheduledNotificationHelper.dispatchDue()`가 발송합니다. 첫 시도에서 `sendAt`보다 30분 넘게 지난 행은 늦게 보내는 대신 `missed send window`로 실패 처리되며, 발송이 실패하면 최대 3회까지 재시도합니다. 수신자는 발송 시점에 즉시 그룹 발송에 쓰이는 것과 같은 `PushAudienceHelper`가 해석하고, `createNotifications()`를 통해 `churchPushNotification`(설정 분류 `announcements`) 또는 `groupPushNotification`으로 전달됩니다.
3. **직접 이메일**은 `TransactionalEmailHelper.sendTransactional()` 뒤에서만 허용됩니다. ESLint 규칙이 이를 컴파일 시점에 강제합니다. 아래를 참고하세요.

:::tip 이메일 문은 린트로 강제됩니다. 관례에만 의존하지 않습니다
`Api/tools/eslint-rules/email-door.cjs`는 `no-direct-email-helper` 규칙을 정의합니다. `NotificationHelper.ts` 또는 `TransactionalEmailHelper.ts` 바깥에서 `EmailHelper.sendTemplatedEmail()` 또는 `EmailHelper.sendEmail()`을 호출하면 린트에 실패합니다. 이메일을 보내야 한다면, 통로(`emailImmediate`를 붙인 `createNotifications`)를 거치거나 `TransactionalEmailHelper.sendTransactional()`을 쓰세요. CI를 통과하는 다른 방법은 없습니다.
:::

## 알림 통로

`NotificationHelper.createNotifications()`는 예약되지 않았고 거래성도 아닌 모든 것의 단일 진입점입니다:

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

수신자마다 `notifications`에 행을 저장하고 `attemptDeliveryWithEscalation`을 호출하며, 이 함수는 아래의 채널 사다리를 따라갑니다. 같은 `(contentType, contentId)`에 대해 아직 읽지 않은 행이 있으면 다시 만들지 않습니다(중복 방지). 이 중복 방지 검사는 `emailImmediate` 발송(리마인더 오프셋, 직원의 "모두에게 이메일", 워크플로 단계는 자체 중복 방지를 가짐)과 직접 메시지에서는 건너뜁니다. 직접 메시지는 항상 소켓에 신호를 보냅니다.

`shared/helpers/NotificationService.ts`는 messaging 모듈 밖의 호출자를 위해 같은 시그니처(`NotificationServiceOptions`)를 제공하며, 부팅 시 messaging 모듈에 등록됩니다.

## 채널 확대 사다리

전달은 한 레벨(기본 0, 리마인더나 명시적 발송에서는 더 높음)에서 시작하며, 이전 채널이 성공하지 못했을 때만 다음 채널로 넘어갑니다. 각 레벨은 시도하기 전에 `PreferenceGateHelper`의 확인을 거칩니다.

| 레벨 | 채널 | 동작 |
|-------|---------|----------|
| 0 | **in_app / socket** | 먼저 `in_app` 게이트를 확인합니다. 억제된 경우(음소거)에는 행이 `isNew=false`로 저장되고 전달은 완전히 멈춥니다. 소켓 신호도, 배지도, 이후 확대도 없습니다. 그렇지 않으면 서버가 그 사람의 `alerts` 방에 열린 소켓 연결을 찾아 `notification`(또는 `privateMessage`) 프레임을 보냅니다. 일반 알림의 경우 소켓 전달이 성공하면 여기서 사다리가 멈춥니다. 30분 타이머가 읽지 않은 항목을 다시 확인하고 나중에 확대합니다. 직접 메시지는 소켓에서 멈추지 않습니다. 설치된 PWA는 백그라운드에서 알림 소켓을 열어 둘 수 있으며, 그렇게 되면 OS 수준의 푸시가 억제되기 때문입니다. |
| 1 | **push** | `allowPush`, 분류별 거부, 조용한 시간에 따라 게이트됩니다. 사람의 `devices` 행에서 찾은 Expo 푸시 토큰과 Web Push 구독 모두에 보내며, 엔드포인트 기준으로 중복을 제거하고 만료된 토큰은 정리합니다. |
| 2 | **email** | `emailFrequency`와 분류별 거부에 따라 게이트됩니다. 즉시 발송(`emailImmediate`)은 바로 렌더링되고 `deliveryLogs` 행을 씁니다. 그 밖의 경우 알림은 아래에 설명하는 일괄 요약을 위해 대기 상태로 남습니다. |
| — | **sms** | 확대 사다리의 레벨이 아닙니다. SMS를 게이트하는 유일한 생산자는 리마인더 엔진입니다. 정의의 `channels`에 `sms`가 포함되면 `ReminderEngine.sendSms()`가 각 수신자에게 push/email 알림과 **함께** 문자를 보냅니다([문자 리마인더](#text-reminders) 참고). 대량 문자(`TextingController` / `@churchapps/texting`), 섬김 개요의 **Text Volunteers** 발송(`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`), 워크플로 **Send Text** 단계 작업(`StepActionHelper.sendText` → `sendPersonText`)은 모두 교회의 제공업체를 통해 직접 문자를 보냅니다. 따라서 알림 설정과 조용한 시간은 적용되지 않으며, 사람의 `optedOut` 플래그만 존중됩니다. |

소켓이나 푸시에 남은 읽지 않은 알림은 30분 타이머(`NotificationHelper.escalateDelivery`)가 확대합니다. 일괄 이메일은 `NotificationHelper.sendEmailNotifications(frequency)`가 보내며, 각 사람의 `emailFrequency` 설정에 따라 실행됩니다. `individual`은 30분 타이머에서, `daily`는 야간 타이머에서 실행됩니다. (`weekly`도 유효한 설정 값이지만, 아직 전용 일괄 실행은 없습니다.)

## 리마인더 엔진

예약된 리마인더(행사 알림, 할 일 마감일, 섬김/계획 배정 알림)는 모두 기능별 맞춤 cron 로직 대신 하나의 일반화된 엔진을 거칩니다.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**정의**(`reminderDefinitions`)는 개체 수준(`entityId`가 설정됨, 특정 행사, 할 일, 계획) 또는 범위 수준(`entityId`가 null이고 `scopeId`가 설정됨, 예: 계획 유형 아래의 모든 계획)입니다. 정의에는 분 단위 오프셋의 CSV(`offsets`, 예: 하루 전과 한 시간 전이면 `"1440,60"`), 현지 발송 시각(`sendLocalTime`), 채널의 CSV(`channels`, `email`이 포함되면 발송 시점에 즉시 서식 있는 이메일을 보냄), `recipientMode`, 선택적인 사용자 정의 `message`가 들어갑니다.

**펼치기**(expansion)는 앞으로의 구간(여러 날에 걸친 롤링 기간)에 대해 발송 행을 구체화합니다. 야간 타이머에서 실행되며, 정의를 저장할 때마다 동기적으로도 실행되므로 막판에 만든 행사의 리마인더도 발송됩니다. 범위 정의는 어댑터의 `loadScopeEntities`를 통해 펼쳐져, 구체적인 개체마다 하나의 발생 집합을 만듭니다. 개체 수준 발생은 `definitionId:occurrenceISO:offset` 키를 쓰고, 범위 발생은 개체 ID로 네임스페이스를 나누므로 서로 충돌하지 않습니다. 발생을 upsert하면 이전에 취소된 행이 **부활**합니다. 기반 개체가 바뀐 뒤 리마인더를 다시 맞추는 표준 방법은 취소한 뒤 다시 펼치는 것입니다. 이미 `sent`, `failed`, `processing` 상태인 행은 건드리지 않습니다.

**발송**(`ReminderEngine.scan()`)은 30분 타이머에서 실행됩니다. 기한이 된 발생을 확보하고(임대 방식으로 중복 처리를 막음), 개체의 어댑터를 통해 수신자를 읽고, `reminderSentLog`에 이미 기록된 사람을 걸러 낸 뒤, `deliveryStartLevel: 1`(바로 푸시로 건너뜀)과, 정의의 채널에 이메일이 포함되면 `emailImmediate`/`emailByPerson`을 붙여 `createNotifications`를 호출합니다.

### 문자 리마인더 {#text-reminders}

정의의 `channels`에 `sms`가 포함되면, `scan()`은 push/email 알림이 만들어진 뒤 같은 새 수신자들에게 `ReminderEngine.sendSms()`를 호출합니다. 문자는 사람별로 동의한 경우에만 보냅니다:

- 각 수신자는 `PreferenceGateHelper.evaluate(..., "sms", ...)`를 거칩니다. 따라서 `allowSms`가 켜져 있어야 하고(기본값은 꺼짐이며, B1App의 **Text messages** 스위치로 설정됩니다), 분류의 `sms` 채널이 꺼지도록 재정의되어 있으면 안 됩니다. `event_reminders`, `serving_schedule`, `tasks`는 `defaultChannels`와 `allowedChannels` 모두에 `sms`를 나열합니다.
- `mobilePhone`이 없거나 `optedOut`이 설정된 사람은 억제됩니다. 교회에 문자 제공업체가 없다면, 나머지 묶음 전체가 `no_provider` 사유로 억제됩니다.
- 본문은 `ReminderEngine.smsBody()`가 만듭니다. 형식은 `"<Church name>: <message> Reply STOP to opt out."`이며, 한 개의 160자 세그먼트로 잘립니다.
- 각 수신자는 `channel: "sms"`와 `sent` / `suppressed` / `failed` 상태를 가진 자신만의 `reminderSentLog` 행을 받습니다. 이 행은 push/email 행과 따로 관리되므로, 문자가 실패해도 push나 email이 다시 발송되지 않습니다.

편집기는 `GET /messaging/texting/status`가 `{ enabled: true }`를 반환할 때만 **Text**를 제공합니다(교회의 첫 번째 문자 제공업체가 활성화된 상태).

**STOP 수신 거부.** `POST /messaging/texting/inbound/:churchId/:token`은 교회가 제공업체에 붙여 넣는 익명 웹훅입니다(B1Admin은 문자 설정에서 `GET /messaging/texting/inboundUrl`이 반환하는 URL을 보여 줍니다). 토큰은 교회 ID의 HMAC입니다(`SmsOptOutHelper.token`). `SmsOptOutHelper.parse`는 Twilio 스타일 폼 필드와 Clearstream/TextInChurch 스타일 JSON을 모두 받습니다. 응답이 정확히 통신사 수신 거부 단어(`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) 중 하나이면, 휴대폰 번호가 일치하는 교회 내 삭제되지 않은 모든 사람에 대해 `people.optedOut = true`와 `allowSms = false`가 설정됩니다. 그 밖의 응답은 확인만 하고 무시합니다.

내부 이벤트 버스는 야간 펼치기를 기다리지 않고 개체 변경에 반응합니다. 콘텐츠 이벤트(웹훅 디스패처를 통해)와 계획/할 일 갱신 이벤트는 영향받는 개체의 즉시 재펼치기나 취소를 일으키며, 계획 갱신은 그 계획 유형에 연결된 범위 정의도 다시 펼칩니다.

### 어댑터

엔진은 개체 종류를 가리지 않으며, 지원되는 각 개체 유형은 어댑터(`helpers/adapters/`)를 통해 연결됩니다:

| 개체 유형 | 어댑터 | 비고 |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | 행사와 `recipientMode`에 따라 등록자 또는 그룹 구성원으로 수신자를 한정합니다. |
| `plan` | `PlanReminderAdapter` | 수신자는 게시된(임시가 아닌) 계획의 수락 및 미확인 배정입니다. 봉사 확인 워크플로를 통해 발행된 미확인 배정은 수락될 때까지 제외됩니다(아래 참고). `buildEmails`는 `DoingModuleGateway.buildPlanReminderEmails`를 호출하며, 이는 `doing/helpers/PlanReminderEmailHelper`를 통해 직책, 메모, 사용자 정의 메시지를 렌더링하고, 공개 배정 응답 엔드포인트로 POST하는 `ReminderTokenHelper`로 서명된 수락/거절 버튼을 포함합니다. |
| `task` | `TaskReminderAdapter` | 수신자는 할 일의 담당자입니다. |

### 엔드포인트

| 메서드 | 경로 | 목적 |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 개체 하나의 리마인더 정의를 읽거나 저장합니다. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 범위 수준(상속된) 리마인더 정의를 읽거나 저장합니다. |
| `DELETE` | `/messaging/reminders/:defId` | 정의를 삭제하고 대기 중인 발생을 취소합니다. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 저장하기 전에 행사 리마인더의 수신자 수와 다음 발송 시각을 미리 봅니다. |
| `GET` | `/messaging/reminders/log` | 교회의 최근 리마인더 발생 기록입니다. |
| `POST` | `/messaging/reminders/mute` | 특정 개체의 리마인더를 음소거합니다. |

정의를 저장하면 그 개체 또는 범위에 대해 동기식 재펼치기가 실행되므로, 편집자는 야간 작업을 기다리지 않고 최신 "다음 발송" 시각을 볼 수 있습니다.

## 직접 메시지

직접 메시지는 별도의 확대 경로를 쓰지 않고, 다른 모든 것과 같은 통로를 탑니다. 읽지 않은 대화마다 `notifications`에 **그림자 행**(`contentType='privateMessage'`, `contentId` = 개인 메시지 ID, `category='direct_messages'`) 하나가 생기며, 이 행이 전달 상태 전부(소켓/푸시/이메일 확대, 읽음 추적)를 소유합니다. `privateMessages` 테이블은 메시지 본문과 `notifyPersonId` 열을 보관합니다. 이 열이 읽지 않음 배지의 원천이며, 수신자가 대화를 읽으면 비워집니다.

그림자 행은 알림 종 아이콘에는 보이지 않습니다. 읽지 않은 수 쿼리, 알림 목록 쿼리, 읽음 표시/삭제 쿼리에서 모두 제외되며, 이 쿼리들은 `contentType <> 'privateMessage'`로 걸러집니다. 모든 DM 신호는 읽음 상태와 무관하게 소켓으로 전달됩니다(라이브 채팅 의미, 중복 방지 없음). DM은 일반 알림처럼 소켓 전달에서 멈추지 않습니다. 백그라운드 PWA가 소켓을 열어 둔 상태에서도 OS 수준 푸시가 필요하기 때문입니다. 사람이 DM 알림을 음소거하면 그림자 행은 보류됩니다(`isNew=false`, `notifyPersonId` 비움). 대화 안에서는 여전히 보이지만, 배지나 경고는 나타나지 않습니다.

## 설정과 게이트

모든 발송은 `PreferenceGateHelper.evaluate()`를 거칩니다. 이 함수는 순수 함수입니다(모든 상태를 인자로 받고, 핫 경로에서 DB를 호출하지 않음). 결과는 `allow`, `suppress`, `defer` 중 하나입니다. 계층은 순서대로 실행되며, 먼저 결정하는 계층이 이깁니다:

1. **잠긴 분류** — 일부 분류는 필수(tier 0)이며 다른 모든 계층을 우회합니다.
2. **마스터 음소거 / 채널 차단** — `masterMute`, `allowPush`, `allowSms`(기본값 꺼짐, 구성원이 동의해야 켜짐), 또는 `emailFrequency='never'`는 즉시 억제합니다.
3. **조용한 시간** — 푸시와 SMS에만 적용됩니다(이메일은 방해가 적다고 보고 제외). 사람의 시간대 기준 현재 벽시계 시각이 조용한 구간에 들면, 거래성 분류는 통과하고, 그 밖의 분류는 조용한 구간의 끝까지 `defer`됩니다. 이 끝 시각은 `TimezoneHelper.wallClockToUtc`를 통해 DST에 맞는 UTC 시각으로 계산됩니다.
4. **분류별 설정 재정의** — 분류 하나 × 채널 하나에 대한 명시적 거부입니다. 없으면 분류의 기본값을 씁니다.
5. **개체별 음소거** — 특정 개체(예: 행사 하나, 계획 하나)에 기록된 음소거로, 분류 수준 설정보다 더 제한합니다. 호출자가 알림과 함께 개체 ID/유형을 제공할 때만 적용됩니다.

관련 테이블은 `notificationPreferences`(전역: `masterMute`, `emailFrequency`는 `individual|daily|weekly|never`, `allowPush`, 조용한 시간 구간과 시간대, `allowSms`), `notificationPreferenceOverrides`(분류 × 채널별), `notificationEntityMutes`(개체별)입니다.

이 게이트는 통로 안에서 앱 내 알림(레벨 0), 푸시(레벨 1), 이메일(레벨 2)에 강제되며, 즉시 발송되는 리마인더/요약 이메일도 포함합니다. 리마인더 문자는 `ReminderEngine.sendSms()`에서 강제됩니다. 거래성 이메일(인증 코드, 비밀번호 재설정, 초대, 헌금 영수증)은 설계상 게이트를 우회합니다. 그것이 두 번째 문의 존재 이유입니다.

### 봉사 확인 워크플로

계획은 `workflowType = "assignmentConfirmation"` 워크플로(`plans.confirmationWorkflowId`)에 가입할 수 있습니다. 게시/알림 시에는 배정마다 알림을 보내는 대신 `POST /doing/plans/:id/issueRequests`를 호출합니다. 새로 생긴 미확인 배정마다 `notified` 표시와 `confirmationWorkflowId`, 워크플로 카드 하나(`tasks.assignmentId`, 고유한 `followupKey`)가 생깁니다. 카드는 앱 전용 알림(`appOnly: true`, 푸시/이메일 확대 없음)을 보낸 다음, 워크플로의 `sendAssignmentRequest` 작업을 실행합니다. 이 작업은 `MessagingModuleGateway.sendServingWorkflowMessage`를 거칩니다. 이메일은 `NotificationHelper.sendWorkflowEmail`을 통해(알림 게이트 + `ChurchEmailLimiter`, `workflowEmail`로 계량), 문자는 `allowSms`와 `serving_schedule` 분류 게이트를 통과한 경우에만 `sendPersonText`를 통해 보냅니다. 수락/거절(이벤트 버스의 `assignment.updated`)은 카드를 닫습니다. 30분 타이머(`AssignmentWorkflowHelper.processPending`)는 놓친 시작과 이벤트를 복구하고, 응답 없는 요청이 후속 기한에 이르면 리더 검토 할 일로 바꿉니다. 전체 수명 주기는 `Api/docs/assignment-confirmation-workflows.md`를 참고하세요.

## 교회가 작성한 이메일 한도

교회가 작성한 내용의 이메일은 공유 ChurchApps SES 식별자에서 나가므로, `Api/src/shared/helpers/ChurchEmailLimiter.ts`가 교회별로 계량합니다. 네 경로가 이를 호출합니다. 그룹/템플릿 발송(`EmailTemplateController`, 콘텐츠 유형 `email`), 양식 후속 이메일(`FormSubmissionController`, `formFollowUp`), 워크플로 **Send email** 작업(`NotificationHelper`의 `churchAuthored`, `workflowEmail`), 봉사 확인 요청 이메일(`NotificationHelper.sendWorkflowEmail`, `workflowEmail`)입니다. 시스템 메일(인증 코드, 영수증, 리마인더)과 역할 및 그룹 초대(`UserController.sendInviteEmail`, 고정 템플릿)는 계량되지 않습니다.

- **승인 게이트.** 서버 관리자가 `churches.emailApprovedDate`를 설정하기 전까지 교회는 아무것도 보낼 수 없습니다(`POST /membership/churches/:id/emailApproval`, 서버 관리 → 교회 → **Group Email** 칩). 보관된 교회는 항상 차단됩니다. B1Admin의 이메일 보내기 대화 상자는 `GET /messaging/emailTemplates/sendStatus`(`approved`, `paused`, `remaining`, `requested`)를 읽고, 승인되지 않은 경우 편집기 대신 **Request review** 카드를 보여 줍니다. 워크플로 단계 편집기도 같은 엔드포인트를 읽어(`groupMembers.edit`뿐 아니라 `tasks.admin`에도 열려 있음), 교회가 승인되지 않았거나 일시 중지된 경우 **Send email** 작업에 경고를 보입니다. 발송 시점에 `ChurchEmailLimiter.remaining()`이 1 미만이면, `MessagingModuleGateway.sendTemplatedEmail`은 알림을 만들지 않고 `false`를 반환합니다. 그래서 카드 기록에 버려진 메일에 대해 **Email sent**가 남는 일이 없습니다. `POST /messaging/emailTemplates/requestApproval`은 교회당 주 1회 이하로 지원팀에 이메일을 보냅니다.
- **획득한 허용량.** 승인된 교회는 `max(150, 지난 30일 중 가장 많이 보낸 날의 2배)`를 얻으며, 롤링 24시간당 최대 2,000통으로 제한됩니다. 현재 24시간은 "가장 많이 보낸 날" 계산에서 제외되므로, 폭주가 자신의 한도를 올릴 수 없습니다.
- **예약 후 확정.** `reserve()`는 발송 전에 수신자마다 `deliveryLogs` 행을 하나씩 쓰고, 그 행들을 포함해 허용량을 다시 확인하며, 두 요청이 한도를 함께 넘어서면 되돌립니다(발송은 429를 반환). `settle()`은 각 행을 sent 또는 failed로 표시합니다.
- **불만 일시 중지.** `sesFeedback` Lambda(`Api/src/lambda/ses-feedback-handler.ts`, SES → SNS에서 공급)는 각 영구 반송이나 불만을, 그 주소에 교회가 작성한 이메일이 도달한 시점 근처의 교회에 연결하여 `deliveryMethod` `sesBounce` / `sesComplaint`로 저장합니다. 7일 동안 불만 2건 이상(발송의 0.3% 이상) 또는 하드 반송 10건 이상(5% 이상)이면 교회가 일시 중지됩니다.

## 일정

리마인더 엔진과 알림 요약은 모두 새 인프라를 도입하지 않고, 기존 주기 타이머에 올라탑니다.

| 타이머 | 주기 | 실행 내용 |
|-------|----------|----------|
| 30분 타이머 | 30분마다 | 읽지 않은 알림 확대, `individual` 주기 요약 이메일 발송, 기한이 된 리마인더 발생 발송(`ReminderEngine.scan`), 승인 요약, 기한이 된 자동화 실행 |
| 1분 타이머(`timerWebhooks`) | 매분 | 기한이 된 예약 푸시 발송(`ScheduledNotificationHelper.dispatchDue`, 작업 `scheduledNotifications`) |
| 야간 타이머 | 05:00 UTC | 그룹 출석 리마인더, 반복 스트리밍 서비스 진행, 자동 갱신 목록 새로 고침, 다음 기간의 리마인더 발생 펼치기(`ReminderEngine.expandAll`), `daily` 주기 요약 이메일 발송 |

로컬에서는 `Api` 프로젝트에서 `npm run timer:30min`과 `npm run timer:midnight`로 같은 로직을 수동으로 실행할 수 있습니다.

## 파일 목록

| 영역 | 파일 |
|------|-------|
| 통로 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| 공유 진입점 | `Api/src/shared/helpers/NotificationService.ts` |
| 거래성 문 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, 린트 규칙 `Api/tools/eslint-rules/email-door.cjs` |
| 교회 이메일 한도 | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| 리마인더 엔진 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| 문자 / STOP 수신 거부 | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts`(`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts`(섬김 개요 **Text Volunteers**) |
| 리마인더 리포지토리 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| 섬김/계획 이메일 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| 리마인더 편집기(B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| 리마인더 편집기 / 설정(B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## 관련 페이지

- [실시간 아키텍처](../realtime.md) — 앱 내 전달 레벨이 의존하는 WebSocket 프로토콜과 클라이언트 기본 요소(`SocketHelper`, `SubscriptionManager`, `ConversationStore`)
- [웹 푸시 알림](../web-push.md) — 푸시 확대 레벨에서 쓰는 VAPID 설정과 브라우저 Push API 경로
- [메시징 엔드포인트](../api/endpoints/messaging.md) — 메시지, 대화, 연결, 알림/리마인더 라우트를 포함한 전체 REST 표면
