---
title: "알림 및 알림 엔진 아키텍처"
description: "B1 Admin API가 하나의 전달 깔때기와 기본 설정 게이트를 통해 알림, 예약된 알림 엔진, 교회 이메일 한도, 문자 수신 거부를 어떻게 처리하는지 설명합니다."
---

# 알림 및 알림 엔진 아키텍처

<div class="article-intro">

교인이 보고 있는 페이지 바깥에서 보는 모든 메시지(배지 숫자, 푸시 알림, 요약 이메일)는 MessagingApi의 두 문 중 하나를 거칩니다. 이 페이지는 그 깔때기, 일정에 따라 깔때기에 공급하는 알림 엔진, 그리고 실제로 사람에게 무엇이 도달할지 결정하는 설정 모델을 설명합니다.

</div>

## 개요 — 두 개의 문 {#overview--two-doors}

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
scheduled staff push ─▶ scheduledNotifications (1-minute timer) ───────────┤
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **사람에게 무엇인가를 알리는 모든 것**은 메시징 모듈의 `NotificationHelper.createNotifications()`를 거칩니다. 이것은 `notifications` 행을 저장하고, 소켓 → 푸시 → 이메일 순으로 에스컬레이션합니다. 채널마다 `PreferenceGateHelper`를 평가하며, 레벨 0의 `in_app`도 포함합니다.
2. **예약된 모든 것**은 `reminderDefinition`(사람 단위 또는 범위 단위)이며, 이것은 `reminderOccurrences`로 확장되고, 반복 타이머에서 `ReminderEngine.scan()`이 발송합니다. 확장기 하나, 발송기 하나, 발송 원장(`reminderSentLog`) 하나입니다. 예외가 하나 있습니다. B1Admin의 **모바일 > 푸시 알림** 페이지나 그룹의 **알림** 대화상자에서 예약한 직원 푸시입니다. 이것은 `scheduledNotifications` 행(대상 `church` 또는 `group`)이며, 1분 타이머에서 `ScheduledNotificationHelper.dispatchDue()`가 발송합니다. 첫 시도에서 `sendAt`보다 30분 이상 지난 행은 늦게 보내는 대신 `missed send window`로 실패 처리되며, 발송이 실패하면 최대 3번까지 재시도합니다. 수신자는 발송 시점에 즉시 그룹 발송에서 쓰는 것과 같은 헬퍼인 `PushAudienceHelper`가 결정하며, `churchPushNotification`(설정 카테고리 `announcements`) 또는 `groupPushNotification`으로 `createNotifications()`를 통해 전달됩니다.
3. **직접 이메일**은 `TransactionalEmailHelper.sendTransactional()` 뒤에서만 존재합니다. ESLint 규칙이 컴파일 시점에 이를 강제합니다. 아래를 참고하세요.

:::tip 이메일 문은 관례가 아니라 린트로 강제됩니다
`Api/tools/eslint-rules/email-door.cjs`는 `no-direct-email-helper` 규칙을 정의합니다. `NotificationHelper.ts`나 `TransactionalEmailHelper.ts` 바깥에서 `EmailHelper.sendTemplatedEmail()` 또는 `EmailHelper.sendEmail()`을 호출하면 린트가 실패합니다. 이메일을 보내야 한다면 깔때기를 통하거나(`emailImmediate`를 사용한 `createNotifications`), `TransactionalEmailHelper.sendTransactional()`을 통해 보내야 합니다. CI를 통과하는 세 번째 방법은 없습니다.
:::

## 알림 깔때기 {#the-notification-funnel}

`NotificationHelper.createNotifications()`는 예약되지도 않고 거래성(transactional)도 아닌 모든 것의 단일 진입점입니다.

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

수신자마다 `notifications`에 행을 저장하고 `attemptDeliveryWithEscalation`을 호출하며, 이 함수는 아래의 채널 사다리를 따라갑니다. 같은 `(contentType, contentId)`에 대해 아직 읽지 않은 행이 있으면 재생성을 막습니다. 이 중복 방지 장치는 `emailImmediate` 발송(알림 오프셋, 직원의 "모두에게 이메일", 워크플로 단계는 자체 중복 방지를 가짐)과, 항상 소켓을 울리는 직접 메시지에는 적용되지 않습니다.

`shared/helpers/NotificationService.ts`는 메시징 모듈 외부의 호출자를 위해 같은 시그니처(`NotificationServiceOptions`)를 제공하며, 부팅 시 메시징 모듈에 등록됩니다.

## 채널 에스컬레이션 사슬 {#channel-escalation-chain}

전달은 레벨에서 시작하며(기본값은 0, 알림이나 명시적 발송의 경우 더 높음), 이전 채널이 성공하지 못했을 때만 다음 채널로 넘어갑니다. 각 레벨은 무언가를 시도하기 전에 `PreferenceGateHelper`로 게이트됩니다.

| 레벨 | 채널 | 동작 |
|-------|---------|----------|
| 0 | **앱 내 / 소켓** | `in_app` 게이트를 먼저 확인합니다. 억제된(음소거된) 경우 행을 `isNew=false`로 저장하고 전달을 완전히 멈춥니다. 소켓 ping도, 배지도, 추가 에스컬레이션도 없습니다. 그렇지 않으면 서버는 그 사람의 `alerts` 룸에 열려 있는 소켓 연결을 찾아 `notification`(또는 `privateMessage`) 프레임을 보냅니다. 일반 알림은 소켓 전달이 성공하면 여기서 사슬이 멈추며, 30분 타이머가 읽지 않은 항목을 다시 확인하고 나중에 에스컬레이션합니다. 직접 메시지는 소켓에서 절대 멈추지 않습니다. 설치된 PWA는 백그라운드에서 알림 소켓을 열어 둘 수 있으며, 그러면 OS 수준의 푸시가 억제되기 때문입니다. |
| 1 | **푸시** | `allowPush` / 카테고리 수신 거부 / 조용한 시간으로 게이트됩니다. 사람의 `devices` 행에서 찾은 Expo 푸시 토큰과 웹 푸시 구독 모두에 보내며, 엔드포인트 기준으로 중복을 제거하고 오래된 토큰을 정리합니다. |
| 2 | **이메일** | `emailFrequency`와 카테고리 수신 거부로 게이트됩니다. 즉시 발송(`emailImmediate`)은 바로 렌더링하고 `deliveryLogs` 행을 씁니다. 그 밖의 경우 알림은 아래에 설명하는 일괄 요약을 위해 대기 상태로 남습니다. |
| — | **sms** | 에스컬레이션 사다리의 레벨이 아닙니다. 게이트가 적용되는 유일한 SMS 생산자는 알림 엔진입니다. 정의의 `channels`에 `sms`가 포함되면 `ReminderEngine.sendSms()`가 푸시/이메일 알림 **외에** 각 수신자에게 문자를 보냅니다([문자 알림](#text-reminders) 참고). 일괄 문자(`TextingController` / `@churchapps/texting`), 섬김 개요의 **자원봉사자에게 문자** 발송(`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`), 워크플로의 **문자 보내기** 단계 동작(`StepActionHelper.sendText` → `sendPersonText`)은 모두 교회의 제공업체를 통해 직접 문자를 보냅니다. 따라서 알림 설정과 조용한 시간은 적용되지 않으며, 사람의 `optedOut` 플래그만 존중됩니다. |

소켓이나 푸시 단계에 남은 읽지 않은 알림은 30분 타이머(`NotificationHelper.escalateDelivery`)가 에스컬레이션합니다. 일괄 이메일은 `NotificationHelper.sendEmailNotifications(frequency)`가 보내며, 각 사람의 `emailFrequency` 설정에 따라 움직입니다. `individual`은 30분 타이머에서, `daily`는 야간 타이머에서 실행됩니다. (`weekly`도 유효한 설정 값이지만, 아직 전용 일괄 실행은 없습니다.)

## 알림 엔진 {#reminder-engine}

예약된 알림(행사 알림, 할 일 마감일, 섬김/계획 배정 알림)은 모두 기능마다 따로 만든 cron 로직이 아니라, 하나의 일반화된 엔진을 거칩니다.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**정의**(`reminderDefinitions`)는 사람 단위(`entityId`가 설정됨, 특정 행사, 할 일, 계획) 또는 범위 단위(`entityId`가 null이고 `scopeId`가 설정됨, 예: 섬김 계획 유형 아래의 모든 계획)입니다. 정의에는 분 단위 오프셋의 CSV(`offsets`, 예: 하루 전과 한 시간 전이면 `"1440,60"`), 현지 발송 시각(`sendLocalTime`), 채널의 CSV(`channels`. `email`이 포함되면 발송 시점에 즉시 서식 있는 이메일을 보냄), `recipientMode`, 선택 사항인 사용자 지정 `message`가 들어 있습니다.

**확장**은 앞으로의 범위(여러 날에 걸친 이동 창)에 대해 발생 행을 구체화합니다. 야간 타이머에서 실행되며, 정의가 저장될 때마다 동기적으로도 실행되므로 촉박하게 잡힌 행사의 알림도 발송됩니다. 범위 정의는 어댑터의 `loadScopeEntities`를 통해 펼쳐져서, 구체적인 엔티티마다 발생 집합을 하나씩 만듭니다. 사람 단위 발생은 `definitionId:occurrenceISO:offset` 키를 쓰고, 범위 발생은 엔티티 ID로 네임스페이스를 나누어 서로 충돌하지 않습니다. 발생을 업서트하면 이전에 취소된 행이 **되살아납니다**. 기반 엔티티가 바뀐 뒤 알림을 다시 맞추는 표준 방법은 취소한 다음 다시 확장하는 것입니다. 이미 `sent`, `failed`, `processing` 상태인 행은 건드리지 않습니다.

**발송**(`ReminderEngine.scan()`)은 30분 타이머에서 실행됩니다. 기한이 된 발생을 가져가고(임대(lease)가 중복 처리를 막음), 엔티티의 어댑터로 수신자를 불러오고, 그 발생에 대해 `reminderSentLog`에 이미 기록된 사람을 걸러 낸 다음, `deliveryStartLevel: 1`(바로 푸시로 건너뜀)과, 정의의 채널에 이메일이 포함된 경우 `emailImmediate`/`emailByPerson`을 붙여 `createNotifications`를 호출합니다.

### 문자 알림 {#text-reminders}

정의의 `channels`에 `sms`가 포함되면, 푸시/이메일 알림이 만들어진 뒤 같은 새 수신자에 대해 `scan()`이 `ReminderEngine.sendSms()`를 호출합니다. 문자는 구성원마다 동의해야 합니다.

- 각 수신자는 `PreferenceGateHelper.evaluate(..., "sms", ...)`를 거치므로, `allowSms`가 켜져 있어야 합니다(기본값은 꺼짐이며, B1App의 **문자 메시지** 스위치에서 설정합니다). 또한 카테고리의 `sms` 채널이 꺼짐으로 재정의되어 있으면 안 됩니다. `event_reminders`, `serving_schedule`, `tasks`는 `defaultChannels`와 `allowedChannels` 모두에 `sms`를 나열합니다.
- `mobilePhone`이 없거나 `optedOut`이 설정된 사람은 억제됩니다. 교회에 문자 제공업체가 없다면, 나머지 일괄 발송은 `no_provider` 사유로 억제됩니다.
- 본문은 `ReminderEngine.smsBody()`가 만듭니다. `"<교회 이름>: <메시지> Reply STOP to opt out."` 형식이며, 한 개의 160자 세그먼트로 잘립니다.
- 수신자마다 `channel: "sms"`인 `reminderSentLog` 행이 하나씩 생기며, 상태는 `sent` / `suppressed` / `failed` 중 하나입니다. 이 행은 푸시/이메일 행과 따로 키가 매겨지므로, 문자가 실패해도 푸시나 이메일이 다시 발송되지 않습니다.

편집기는 `GET /messaging/texting/status`가 `{ enabled: true }`를 반환할 때(교회의 첫 번째 문자 제공업체가 활성화되어 있을 때)만 **문자** 옵션을 보여 줍니다.

**STOP 수신 거부.** `POST /messaging/texting/inbound/:churchId/:token`은 교회가 제공업체에 붙여넣는 익명 웹훅입니다(B1Admin은 문자 설정에서 `GET /messaging/texting/inboundUrl`의 URL을 보여 줍니다). 토큰은 교회 ID의 HMAC입니다(`SmsOptOutHelper.token`). `SmsOptOutHelper.parse`는 Twilio 스타일의 폼 필드와 Clearstream/TextInChurch 스타일의 JSON을 모두 받습니다. 답장이 정확히 통신사 중지 단어(`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) 중 하나라면, 휴대폰 번호가 일치하는 교회 내 삭제되지 않은 모든 사람의 `people.optedOut = true`, `allowSms = false`가 됩니다. 다른 답장은 확인만 하고 무시합니다.

내부 이벤트 버스는 야간 확장을 기다리지 않고 엔티티 변경에 반응합니다. 콘텐츠 이벤트(웹훅 디스패처를 통해)와 계획/할 일 업데이트 이벤트는 영향을 받은 엔티티에 대해 즉시 재확장이나 취소를 트리거합니다. 계획 업데이트는 그 계획 유형에 연결된 범위 정의도 다시 확장합니다.

### 어댑터 {#adapters}

엔진은 엔티티 종류를 가리지 않습니다. 지원되는 엔티티 유형은 각각 어댑터(`helpers/adapters/`)를 통해 연결됩니다.

| 엔티티 유형 | 어댑터 | 참고 |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | 행사와 `recipientMode`에 따라 등록자 또는 그룹 구성원으로 수신자 범위가 정해집니다. |
| `plan` | `PlanReminderAdapter` | 수신자는 게시된(초안이 아닌) 계획의 수락됨 + 미확정 배정입니다. 섬김 확인 워크플로를 통해 발행된 미확정 배정은 수락될 때까지 제외됩니다(아래 참고). `buildEmails`는 `DoingModuleGateway.buildPlanReminderEmails`를 호출하며, 이는 `doing/helpers/PlanReminderEmailHelper`를 통해 자리, 메모, 사용자 지정 메시지를 렌더링하고, 공개 배정 응답 엔드포인트로 POST하는 `ReminderTokenHelper`로 서명된 수락/거절 버튼을 포함합니다. |
| `task` | `TaskReminderAdapter` | 수신자는 할 일의 담당자입니다. |

### 엔드포인트 {#endpoints}

| 메서드 | 경로 | 용도 |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 엔티티 하나의 알림 정의를 조회하거나 저장합니다. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 범위 단위(상속된) 알림 정의를 조회하거나 저장합니다. |
| `DELETE` | `/messaging/reminders/:defId` | 정의를 삭제하고 대기 중인 발생을 취소합니다. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 저장하기 전에 행사 알림의 수신자 수와 다음 발송 시각을 미리 봅니다. |
| `GET` | `/messaging/reminders/log` | 교회의 최근 알림 발생 기록입니다. |
| `POST` | `/messaging/reminders/mute` | 특정 엔티티의 알림을 음소거합니다. |

정의를 저장하면 해당 엔티티나 범위에 대해 동기 재확장이 트리거되므로, 편집자는 야간 작업을 기다리지 않고도 최신 "다음 발송" 정보를 볼 수 있습니다.

## 직접 메시지 {#direct-messages}

직접 메시지는 별도의 에스컬레이션 경로가 아니라, 다른 모든 것과 같은 깔때기를 탑니다. 읽지 않은 대화마다 `notifications`에 **그림자 행** 하나가 생기며(`contentType='privateMessage'`, `contentId` = 개인 메시지 ID, `category='direct_messages'`), 이 행이 모든 전달 상태(소켓/푸시/이메일 에스컬레이션, 읽음 추적 등 전부)를 소유합니다. `privateMessages` 테이블 자체는 메시지 내용과 `notifyPersonId` 열을 보관합니다. 이 열이 읽지 않은 배지의 근거이며, 수신자가 대화를 읽으면 지워집니다.

그림자 행은 알림 종 아이콘에 보이지 않습니다. 읽지 않은 수 쿼리, 알림 목록 쿼리, 읽음 표시/삭제 쿼리에서 모두 제외되며, 이들은 모두 `contentType <> 'privateMessage'`로 걸러집니다. 모든 DM 알림 ping은 읽지 않은 상태와 관계없이 소켓에 도달합니다(라이브 채팅 방식, 중복 제거 없음). DM은 일반 알림처럼 소켓 전달에서 멈추지 않습니다. 백그라운드 PWA가 소켓을 열어 둔 채로도 OS 수준의 푸시가 여전히 필요할 수 있기 때문입니다. 사람이 DM 알림을 음소거하면 그림자 행은 보류됩니다(`isNew=false`, `notifyPersonId` 지워짐). 대화 안에서는 여전히 보이지만 배지나 알림은 없습니다.

## 설정 및 게이트 {#preferences--gating}

모든 발송은 `PreferenceGateHelper.evaluate()`를 거칩니다. 이것은 순수 함수입니다(모든 상태를 인자로 받으며, 핫 패스에서 DB 호출이 없습니다). 결과는 `allow`, `suppress`, `defer` 중 하나입니다. 계층은 순서대로 실행되며, 먼저 결정하는 계층이 이깁니다.

1. **잠긴 카테고리** -- 일부 카테고리는 필수(tier 0)이며, 다른 모든 계층을 우회합니다.
2. **마스터 음소거 / 채널 차단** -- `masterMute`, `allowPush`, `allowSms`(기본값은 꺼짐, 구성원이 동의해야 함), 또는 `emailFrequency='never'`는 즉시 억제합니다.
3. **조용한 시간** -- 푸시와 SMS에만 적용됩니다(이메일은 방해가 적다고 봅니다). 사람의 시간대 기준 현재 시각이 조용한 시간 창에 들어가면, 거래성 카테고리는 그래도 전달되며, 거래성이 아닌 카테고리는 조용한 시간 창이 끝날 때까지 `defer`됩니다. 이 시각은 `TimezoneHelper.wallClockToUtc`를 통해 DST에 맞는 UTC 순간으로 계산됩니다.
4. **카테고리별 설정 재정의** -- 카테고리 하나와 채널 하나의 쌍에 대한 명시적 수신 거부입니다. 없으면 카테고리의 기본값을 따릅니다.
5. **엔티티별 음소거** -- 특정 엔티티(예: 행사 하나, 계획 하나)에 기록된 음소거는 카테고리 수준 설정보다 더 제한적입니다. 단, 호출자가 알림과 함께 엔티티 ID/유형을 제공했을 때만 적용됩니다.

관련 테이블은 다음과 같습니다. `notificationPreferences`(전역 — `masterMute`, `emailFrequency`(`individual|daily|weekly|never`), `allowPush`, 조용한 시간 창과 시간대, `allowSms`), `notificationPreferenceOverrides`(카테고리 × 채널별), `notificationEntityMutes`(엔티티별).

이 게이트는 깔때기 안에서 앱 내(레벨 0), 푸시(레벨 1), 이메일(레벨 2)에 대해 강제되며, 즉시 발송되는 알림/요약 이메일도 포함합니다. 알림 문자는 `ReminderEngine.sendSms()`에서 강제됩니다. 거래성 이메일(인증 코드, 비밀번호 재설정, 초대, 헌금 영수증)은 설계상 이 게이트를 우회합니다. 두 번째 문이 존재하는 이유가 바로 이것입니다.

### 섬김 확인 워크플로 {#serving-confirmation-workflows}

계획은 `workflowType = "assignmentConfirmation"` 워크플로(`plans.confirmationWorkflowId`)에 가입할 수 있습니다. 게시/알림은 배정마다 개별 알림을 보내는 대신 `POST /doing/plans/:id/issueRequests`를 호출합니다. 새로 생긴 미확정 배정마다 `notified` + `confirmationWorkflowId`와 워크플로 카드 하나(`tasks.assignmentId`, 고유한 `followupKey`)가 생깁니다. 카드는 앱 전용 알림(`appOnly: true`, 푸시/이메일 에스컬레이션 없음)을 보낸 다음, 워크플로의 `sendAssignmentRequest` 동작을 실행합니다. 이 동작은 `MessagingModuleGateway.sendServingWorkflowMessage`를 거칩니다. 이메일은 `NotificationHelper.sendWorkflowEmail`(설정 게이트 + `ChurchEmailLimiter`, `workflowEmail`로 계량됨)을 통해 보내고, SMS는 `allowSms`와 `serving_schedule` 카테고리 게이트가 모두 켜져 있을 때만 `sendPersonText`로 보냅니다. 수락/거절(이벤트 버스의 `assignment.updated`)은 카드를 닫습니다. 30분 타이머(`AssignmentWorkflowHelper.processPending`)는 놓친 시작과 이벤트를 복구하고, 후속 마감일까지 응답하지 않은 요청은 리더 검토 할 일로 바꿉니다. 전체 수명 주기는 `Api/docs/assignment-confirmation-workflows.md`를 참고하세요.

## 교회가 작성한 이메일 한도 {#church-authored-email-limits}

교회가 작성한 내용의 이메일은 ChurchApps의 공용 SES 식별자에서 발송되므로, `Api/src/shared/helpers/ChurchEmailLimiter.ts`가 교회별로 계량합니다. 네 가지 경로가 이것을 호출합니다. 그룹/템플릿 발송(`EmailTemplateController`, 콘텐츠 유형 `email`), 양식 후속 이메일(`FormSubmissionController`, `formFollowUp`), 워크플로 **이메일 보내기** 동작(`churchAuthored`, `workflowEmail`로 `NotificationHelper`), 섬김 확인 요청 이메일(`NotificationHelper.sendWorkflowEmail`, `workflowEmail`)입니다. 시스템 메일(인증 코드, 영수증, 알림)과 역할 및 그룹 초대(`UserController.sendInviteEmail`, 고정 템플릿)는 계량되지 않습니다.

- **승인 게이트.** 서버 관리자가 `churches.emailApprovedDate`를 설정하기 전까지 교회는 아무것도 보내지 않습니다(`POST /membership/churches/:id/emailApproval`, 서버 관리자 → 교회 → **그룹 이메일** 칩). 보관된 교회는 항상 차단됩니다. B1Admin의 이메일 보내기 대화상자는 `GET /messaging/emailTemplates/sendStatus`(`approved`, `paused`, `remaining`, `requested`)를 읽으며, 승인되지 않았다면 편집기 대신 **검토 요청** 카드를 보여 줍니다. 워크플로 단계 편집기도 같은 엔드포인트를 읽어(`groupMembers.edit`뿐만 아니라 `tasks.admin`에게도 열려 있음), 교회가 승인되지 않았거나 일시 중지되었을 때 **이메일 보내기** 동작에 경고합니다. 발송 시점에 `ChurchEmailLimiter.remaining()`이 1 미만이면 `MessagingModuleGateway.sendTemplatedEmail`은 알림을 만들지 않고 `false`를 반환합니다. 그래서 카드의 기록이 버려진 메일에 대해 **이메일 발송됨**이라고 주장하는 일이 없습니다. `POST /messaging/emailTemplates/requestApproval`은 교회당 주 1회 이하로 지원팀에 이메일을 보냅니다.
- **획득한 허용량.** 승인된 교회는 `max(150, 2 × 직전 30일 중 교회 작성 이메일이 가장 많이 나간 날)`을 받으며, 24시간 롤링 기준 최대 2,000통입니다. 현재 24시간은 "가장 많이 나간 날" 계산에서 제외되므로, 한 번의 폭주가 자기 한도를 올릴 수 없습니다.
- **예약 후 확정.** `reserve()`는 발송 전에 수신자마다 `deliveryLogs` 행을 하나씩 쓰고, 그 행들을 포함하여 허용량을 다시 확인하며, 두 요청이 한도를 동시에 넘어섰다면 취소합니다(발송은 429를 반환합니다). `settle()`은 각 행을 발송됨 또는 실패로 표시합니다.
- **신고 일시 중지.** `sesFeedback` Lambda(`Api/src/lambda/ses-feedback-handler.ts`, SES → SNS에서 입력을 받음)는 영구 반송이나 신고를, 그 주소에 그 무렵 교회 작성 이메일이 도달한 교회에 고정하여 `deliveryMethod` `sesBounce` / `sesComplaint`로 저장합니다. 7일 동안 신고가 2건 이상(발송의 0.3% 이상)이거나 하드 반송이 10건 이상(5% 이상)이면 교회가 일시 중지됩니다.

## 일정 {#scheduling}

알림 엔진과 알림 요약은 모두 새로운 인프라를 도입하지 않고 기존의 예약 타이머를 사용합니다.

| 타이머 | 일정 | 실행 내용 |
|-------|----------|----------|
| 30분 타이머 | 30분마다 | 읽지 않은 알림 에스컬레이션, `individual` 빈도 요약 이메일 발송, 기한이 된 알림 발생 발송(`ReminderEngine.scan`), 승인 요약, 기한이 된 자동화 실행 |
| 1분 타이머(`timerWebhooks`) | 매분 | 기한이 된 예약 푸시 알림 발송(`ScheduledNotificationHelper.dispatchDue`, 작업 `scheduledNotifications`) |
| 야간 타이머 | 05:00 UTC | 그룹 출석 알림, 반복 스트리밍 서비스 진행, 자동 갱신 목록 새로 고침, 다음 범위까지 알림 발생 확장(`ReminderEngine.expandAll`), `daily` 빈도 요약 이메일 발송 |

로컬에서는 `Api` 프로젝트에서 `npm run timer:30min`과 `npm run timer:midnight`으로 같은 로직을 필요할 때 실행할 수 있습니다.

## 파일 목록 {#file-inventory}

| 영역 | 파일 |
|------|-------|
| 깔때기 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| 공유 진입점 | `Api/src/shared/helpers/NotificationService.ts` |
| 거래성 문 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, 린트 규칙 `Api/tools/eslint-rules/email-door.cjs` |
| 교회 이메일 한도 | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| 알림 엔진 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| 문자 / STOP 수신 거부 | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts`(`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts`(섬김 개요 **자원봉사자에게 문자**) |
| 알림 리포지토리 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| 섬김/계획 이메일 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| 알림 편집기(B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| 알림 편집기 / 설정(B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## 관련 문서 {#related-pages}

- [실시간 아키텍처](../realtime.md) -- 앱 내 전달 레벨이 의존하는 WebSocket 프로토콜과 클라이언트 기본 요소(`SocketHelper`, `SubscriptionManager`, `ConversationStore`)
- [웹 푸시 알림](../web-push.md) -- 푸시 에스컬레이션 레벨이 사용하는 VAPID 설정과 브라우저 Push API 경로
- [메시징 엔드포인트](../api/endpoints/messaging.md) -- 메시지, 대화, 연결, 알림/알림 엔진 경로를 포함한 전체 REST 인터페이스
