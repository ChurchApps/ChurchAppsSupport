---
title: "알림 및 리마인더 아키텍처"
---

# 알림 및 리마인더 아키텍처

<div class="article-intro">

교인이 보고 있는 페이지 밖에서 보게 되는 모든 메시지(배지 숫자, 푸시 알림, 요약 이메일)는 MessagingApi의 두 개의 통로 중 하나를 거칩니다. 이 페이지에서는 이 통로의 구조, 일정에 따라 통로에 메시지를 공급하는 리마인더 엔진, 그리고 실제로 사람에게 무엇이 전달될지 결정하는 환경설정 모델을 설명합니다.

</div>

## 개요 — 두 개의 통로

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **사람에게 무언가를 알리는 모든 것**은 messaging 모듈의 `NotificationHelper.createNotifications()`를 거칩니다. 이 함수는 `notifications` 행을 저장하고, 채널마다 `PreferenceGateHelper`를 평가하면서 socket → push → email 순으로 전달 단계를 올립니다. 레벨 0의 `in_app`도 여기에 포함됩니다.
2. **예약된 모든 것**은 `reminderDefinition`(엔티티 단위 또는 범위 단위)이며, 이는 `reminderOccurrences`로 펼쳐진 뒤 반복 타이머에서 `ReminderEngine.scan()`이 발송합니다. 펼치는 로직, 발송 로직, 발송 기록(`reminderSentLog`)은 각각 하나씩만 존재합니다.
3. **직접 이메일**은 `TransactionalEmailHelper.sendTransactional()`을 통해서만 허용됩니다. ESLint 규칙이 컴파일 시점에 이를 강제하며, 아래에서 자세히 설명합니다.

:::tip 이메일 통로는 관례가 아니라 린트로 강제됩니다
`Api/tools/eslint-rules/email-door.cjs`에 정의된 `no-direct-email-helper` 규칙은 `NotificationHelper.ts` 또는 `TransactionalEmailHelper.ts` 바깥에서 `EmailHelper.sendTemplatedEmail()` 또는 `EmailHelper.sendEmail()`을 호출하면 린트에 실패하게 합니다. 이메일을 보내야 한다면 통로를 거치세요(`emailImmediate`를 사용하는 `createNotifications`). 또는 `TransactionalEmailHelper.sendTransactional()`을 사용하세요. CI를 통과하는 다른 방법은 없습니다.
:::

## 알림 통로

`NotificationHelper.createNotifications()`는 예약되지 않았거나 트랜잭션 성격이 아닌 모든 알림의 단일 진입점입니다.

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

수신자 한 명마다 `notifications`에 행을 저장하고, 아래의 채널 단계를 따라가는 `attemptDeliveryWithEscalation`을 호출합니다. 같은 `(contentType, contentId)`에 대해 아직 읽지 않은 행이 있으면 새로 만들지 않습니다. 이 중복 방지 가드는 `emailImmediate` 발송(리마인더 오프셋, 직원의 "모두에게 이메일", 워크플로 단계는 자체 중복 방지를 가짐)과 직접 메시지에서는 건너뛰며, 직접 메시지는 항상 socket으로 알림을 보냅니다.

`shared/helpers/NotificationService.ts`는 messaging 모듈 외부의 호출자를 위해 같은 시그니처(`NotificationServiceOptions`)를 제공하며, 부팅 시 messaging 모듈에 등록됩니다.

## 채널 단계 체인

전달은 한 단계에서 시작하며(기본값은 0, 리마인더나 명시적 발송의 경우 더 높은 단계), 이전 채널이 성공하지 않은 경우에만 다음 채널로 넘어갑니다. 각 단계는 시도하기 전에 `PreferenceGateHelper`의 검사를 거칩니다.

| 단계 | 채널 | 동작 |
|-------|---------|----------|
| 0 | **in_app / socket** | 먼저 `in_app` 게이트를 확인합니다. 차단되면(음소거 상태) 행은 `isNew=false`로 저장되고 전달은 완전히 멈춥니다. socket 알림도, 배지도, 이후 단계도 없습니다. 차단되지 않았다면 서버는 해당 사람의 `alerts` 방에 열려 있는 socket 연결을 찾아 `notification`(또는 `privateMessage`) 프레임을 보냅니다. 일반 알림의 경우 socket 전달이 성공하면 여기서 체인이 멈춥니다. 30분 타이머가 읽지 않은 항목을 다시 확인하고 나중에 단계를 올립니다. 직접 메시지는 socket에서 멈추지 않습니다. 설치된 PWA가 백그라운드에서 알림 socket을 열어 두고 있으면 OS 수준의 푸시 알림을 막을 수 있기 때문입니다. |
| 1 | **push** | `allowPush`, 카테고리별 수신 거부, 방해 금지 시간에 따라 제어됩니다. 사람의 `devices` 행에서 찾은 Expo 푸시 토큰과 Web Push 구독 모두에 보내며, 엔드포인트 기준으로 중복을 제거하고 그 과정에서 오래된 토큰을 정리합니다. |
| 2 | **email** | `emailFrequency`와 카테고리별 수신 거부에 따라 제어됩니다. 즉시 발송(`emailImmediate`)은 바로 렌더링되어 `deliveryLogs` 행을 기록합니다. 그 외에는 알림이 아래에서 설명할 일괄 요약 이메일을 위해 대기 상태로 남습니다. |
| — | **sms** | 알림 체인의 단계가 아닙니다. 게이트를 거치는 유일한 SMS 발신자는 리마인더 엔진입니다. 정의의 `channels`에 `sms`가 포함되면 `ReminderEngine.sendSms()`가 각 수신자에게 push/email 알림에 **추가로** 문자를 보냅니다([텍스트 알림](#text-reminders) 참고). 대량 문자(`TextingController` / `@churchapps/texting`), 서빙 개요의 **Text Volunteers** 발송(`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`), 워크플로의 **Send Text** 단계 동작(`StepActionHelper.sendText` → `sendPersonText`)은 모두 교회의 제공자를 통해 직접 문자를 보냅니다. 따라서 알림 환경설정과 방해 금지 시간은 적용되지 않으며, 사람의 `optedOut` 플래그만 지켜집니다. |

socket이나 push 단계에서 읽지 않은 알림은 30분 타이머(`NotificationHelper.escalateDelivery`)가 다시 단계를 올립니다. 일괄 이메일은 `NotificationHelper.sendEmailNotifications(frequency)`가 보내며, 각 사람의 `emailFrequency` 환경설정에 따라 실행됩니다. `individual`은 30분 타이머에서, `daily`는 매일 밤 타이머에서 실행됩니다. (`weekly`는 유효한 환경설정 값이지만, 아직 전용 일괄 실행이 없습니다.)

## 리마인더 엔진

예약된 리마인더(행사 알림, 작업 마감일, 봉사/계획 배정 알림)는 기능마다 따로 만든 cron 로직이 아니라 하나의 일반화된 엔진을 거칩니다.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**정의**(`reminderDefinitions`)는 엔티티 단위(`entityId`가 설정됨, 특정 행사, 작업, 계획)이거나 범위 단위(`entityId`가 null이고 `scopeId`가 설정됨, 예: 봉사 계획 유형 아래의 모든 계획)입니다. 정의에는 분 단위 오프셋의 CSV(`offsets`, 예: 하루 전과 한 시간 전이면 `"1440,60"`), 현지 발송 시각(`sendLocalTime`), 채널의 CSV(`channels`, `email`이 포함되면 발송 시점에 즉시 서식이 있는 이메일을 보냅니다), `recipientMode`, 선택적인 사용자 지정 `message`가 포함됩니다.

**펼치기**는 앞으로의 기간(며칠 단위의 이동 구간)에 대해 발송 행을 실체화합니다. 밤마다 타이머로 실행되며, 정의가 저장될 때마다 동기적으로도 실행되므로 임박한 행사의 리마인더도 빠짐없이 발송됩니다. 범위 정의는 어댑터의 `loadScopeEntities`를 통해 펼쳐져 구체적인 엔티티마다 하나의 발생 집합을 만듭니다. 엔티티 단위 발생은 `definitionId:occurrenceISO:offset` 키를 사용하고, 범위 단위 발생은 엔티티 ID로 네임스페이스를 나누어 서로 충돌하지 않습니다. 발생을 upsert하면 이전에 취소된 행이 **부활**합니다. 기초 엔티티가 바뀐 뒤 리마인더를 다시 맞추는 표준 방법은 취소한 뒤 다시 펼치는 것입니다. 이미 `sent`, `failed`, `processing` 상태인 행은 건드리지 않습니다.

**발송**(`ReminderEngine.scan()`)은 30분 타이머에서 실행됩니다. 기한이 된 발생을 확보하고(임대 방식으로 이중 처리를 막습니다), 엔티티의 어댑터를 통해 수신자를 불러오고, 해당 발생에 대해 `reminderSentLog`에 이미 기록된 사람은 제외한 뒤, `deliveryStartLevel: 1`(바로 push로 이동)과, 정의의 채널에 이메일이 포함된 경우 `emailImmediate`/`emailByPerson`을 함께 넣어 `createNotifications`를 호출합니다.

### 텍스트 알림

정의의 `channels`에 `sms`가 포함되면, `scan()`은 push/email 알림을 만든 뒤 같은 새 수신자에게 `ReminderEngine.sendSms()`를 호출합니다. 문자 알림은 구성원별로 동의한 경우에만 보냅니다.

- 각 수신자는 `PreferenceGateHelper.evaluate(..., "sms", ...)`를 거치므로, `allowSms`가 켜져 있어야 합니다(기본값은 꺼짐이며 B1App의 **Text messages** 스위치로 설정합니다). 또한 해당 카테고리의 `sms` 채널이 꺼져 있으면 안 됩니다. `event_reminders`, `serving_schedule`, `tasks`는 `defaultChannels`와 `allowedChannels` 모두에 `sms`를 포함합니다.
- `mobilePhone`이 없거나 `optedOut`이 설정된 사람은 발송에서 제외됩니다. 교회에 문자 제공자가 없으면 나머지 배치 전체가 `no_provider` 사유로 제외됩니다.
- 본문은 `ReminderEngine.smsBody()`가 만들며, `"<교회 이름>: <메시지> Reply STOP to opt out."` 형식이고 160자 한 세그먼트에 맞게 잘립니다.
- 수신자마다 `reminderSentLog`에 `channel: "sms"`와 `sent` / `suppressed` / `failed` 상태의 행이 하나씩 생깁니다. 이 행은 push/email 행과 따로 관리되므로, 문자가 실패해도 push나 email이 다시 발송되지 않습니다.

편집기에서는 `GET /messaging/texting/status`가 `{ enabled: true }`를 반환할 때(교회의 첫 번째 문자 제공자가 활성화된 경우)에만 **Text** 옵션이 나타납니다.

**STOP 수신 거부.** `POST /messaging/texting/inbound/:churchId/:token`은 교회가 문자 제공자에 붙여 넣는 익명 웹훅입니다(B1Admin은 문자 설정에서 `GET /messaging/texting/inboundUrl`이 반환하는 URL을 보여 줍니다). 토큰은 교회 ID의 HMAC입니다(`SmsOptOutHelper.token`). `SmsOptOutHelper.parse`는 Twilio 스타일의 폼 필드와 Clearstream/TextInChurch 스타일의 JSON을 모두 받아들입니다. 응답이 정확히 통신사의 수신 거부 단어(`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) 중 하나이면, 해당 교회에서 삭제되지 않은 모든 사람 중 휴대전화 번호가 일치하는 사람에게 `people.optedOut = true`와 `allowSms = false`가 설정됩니다. 그 밖의 응답은 확인만 하고 무시합니다.

내부 이벤트 버스는 야간 펼치기를 기다리지 않고 엔티티 변경에 반응합니다. 콘텐츠 이벤트(웹훅 디스패처를 통해)와 계획/작업 업데이트 이벤트는 영향받는 엔티티를 즉시 다시 펼치거나 취소하며, 계획 업데이트는 해당 계획 유형에 연결된 범위 정의도 다시 펼칩니다.

### 어댑터

엔진은 엔티티 종류에 의존하지 않습니다. 지원되는 각 엔티티 유형은 어댑터(`helpers/adapters/`)를 통해 연결됩니다.

| 엔티티 유형 | 어댑터 | 비고 |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | 행사와 `recipientMode`에 따라 수신자가 등록자 또는 그룹 구성원으로 한정됩니다. |
| `plan` | `PlanReminderAdapter` | 수신자는 게시된(초안이 아닌) 계획의 수락 및 미확인 배정입니다. 봉사 확인 워크플로를 통해 발급된 미확인 배정은 수락될 때까지 제외됩니다(아래 참고). `buildEmails`는 `DoingModuleGateway.buildPlanReminderEmails`를 호출하며, 이 함수는 `doing/helpers/PlanReminderEmailHelper`를 통해 위치, 메모, 사용자 지정 메시지를 렌더링합니다. 여기에는 `ReminderTokenHelper`로 서명된 수락/거절 버튼도 포함되며, 이 버튼은 공개 배정 응답 엔드포인트로 요청을 보냅니다. |
| `task` | `TaskReminderAdapter` | 수신자는 작업의 담당자입니다. |

### 엔드포인트

| 메서드 | 경로 | 목적 |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 엔티티 하나의 리마인더 정의를 불러오거나 저장합니다. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 범위 단위(상속된) 리마인더 정의를 불러오거나 저장합니다. |
| `DELETE` | `/messaging/reminders/:defId` | 정의를 삭제하고 대기 중인 발생을 취소합니다. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 저장 전에 행사 리마인더의 수신자 수와 다음 발송 시각을 미리 봅니다. |
| `GET` | `/messaging/reminders/log` | 교회의 최근 리마인더 발생 이력입니다. |
| `POST` | `/messaging/reminders/mute` | 특정 엔티티의 리마인더를 음소거합니다. |

정의를 저장하면 해당 엔티티나 범위에 대해 동기적으로 다시 펼치므로, 편집자는 야간 작업을 기다리지 않고 최신 "다음 발송" 시각을 볼 수 있습니다.

## 직접 메시지

직접 메시지는 별도의 단계 체인 대신 다른 모든 알림과 같은 통로를 사용합니다. 읽지 않은 대화마다 `notifications`에 **섀도 행** 하나(`contentType='privateMessage'`, `contentId` = 비공개 메시지 ID, `category='direct_messages'`)가 생기며, 이 행이 전달 상태 전체를 관리합니다. socket/push/email 단계, 읽음 추적 등 모든 것이 여기에 속합니다. `privateMessages` 테이블에는 메시지 본문과 `notifyPersonId` 열이 남아 있습니다. 이 열이 읽지 않은 배지의 근거이며, 수신자가 대화를 읽으면 비워집니다.

섀도 행은 알림 종 아이콘에 보이지 않습니다. 읽지 않은 개수 쿼리, 알림 목록 쿼리, 읽음 처리/삭제 쿼리에서 모두 제외되며, 이 쿼리들은 `contentType <> 'privateMessage'`로 필터링합니다. 모든 DM 알림은 읽음 상태와 관계없이 socket으로 전송됩니다(실시간 채팅 방식이므로 중복 제거를 하지 않습니다). DM은 일반 알림처럼 socket 전달에서 멈추지 않습니다. 백그라운드 PWA가 socket을 열어 둔 상태라도 OS 수준의 푸시가 여전히 필요할 수 있기 때문입니다. 사람이 DM 알림을 음소거하면 섀도 행은 보류 상태가 됩니다(`isNew=false`, `notifyPersonId` 비움). 이 경우 대화 안에서는 여전히 보이지만, 배지나 경고는 표시되지 않습니다.

## 환경설정 및 게이팅

모든 발송은 `PreferenceGateHelper.evaluate()`를 거칩니다. 이 함수는 순수 함수이며(모든 상태를 인자로 받고, 핫 패스에서 DB 호출을 하지 않습니다), `allow`, `suppress`, `defer` 중 하나를 반환합니다. 계층은 순서대로 실행되며, 먼저 결정을 내린 계층이 적용됩니다.

1. **잠긴 카테고리** — 일부 카테고리는 필수(티어 0)이며, 다른 모든 계층을 건너뜁니다.
2. **전체 음소거 / 채널 차단** — `masterMute`, `allowPush`, `allowSms`(기본적으로 꺼짐, 구성원이 직접 켭니다), `emailFrequency='never'`는 즉시 발송을 막습니다.
3. **방해 금지 시간** — 푸시와 SMS에만 적용됩니다(이메일은 방해가 적은 것으로 간주합니다). 사람의 시간대 기준 현재 시각이 방해 금지 구간에 들어가면, 트랜잭션 카테고리는 그대로 전달되고, 그렇지 않은 카테고리는 방해 금지 구간이 끝나는 시점으로 미뤄집니다. 이 시점은 `TimezoneHelper.wallClockToUtc`를 통해 일광 절약 시간을 올바르게 반영한 UTC 시각으로 계산합니다.
4. **카테고리별 환경설정 재정의** — 카테고리와 채널 한 쌍에 대한 명시적 수신 거부입니다. 설정이 없으면 카테고리의 기본값을 따릅니다.
5. **엔티티별 음소거** — 특정 엔티티(예: 행사 하나, 계획 하나)에 기록된 음소거는 카테고리 수준 설정보다 더 엄격하게 제한합니다. 다만 발송 호출자가 알림과 함께 엔티티 ID/유형을 제공한 경우에만 적용됩니다.

관련 테이블은 `notificationPreferences`(전역 — `masterMute`, `emailFrequency`는 `individual|daily|weekly|never` 중 하나, `allowPush`, 방해 금지 시간대와 시간대, `allowSms`), `notificationPreferenceOverrides`(카테고리 × 채널 단위), `notificationEntityMutes`(엔티티 단위)입니다.

이 게이트는 통로 안에서 앱 내 알림(레벨 0), 푸시(레벨 1), 이메일(레벨 2)에 적용되며, 즉시 발송되는 리마인더/요약 이메일도 포함됩니다. 리마인더 문자는 `ReminderEngine.sendSms()`에서 이 게이트를 거칩니다. 트랜잭션 이메일(인증 코드, 비밀번호 재설정, 초대, 기부 영수증)은 설계상 게이트를 우회합니다. 이것이 두 번째 통로가 존재하는 이유입니다.

### 봉사 확인 워크플로

계획은 `workflowType = "assignmentConfirmation"` 워크플로(`plans.confirmationWorkflowId`)를 선택할 수 있습니다. 게시/알림 버튼은 배정마다 개별 알림을 보내는 대신 `POST /doing/plans/:id/issueRequests`를 호출합니다. 새로 생긴 미확인 배정마다 `notified`와 `confirmationWorkflowId`가 설정되고, 워크플로 카드 하나(`tasks.assignmentId`, 고유한 `followupKey`)가 생성됩니다. 카드는 앱 전용 알림(`appOnly: true`, 푸시/이메일 단계 없음)을 보낸 뒤, 워크플로의 `sendAssignmentRequest` 동작을 실행합니다. 이 동작은 `MessagingModuleGateway.sendServingWorkflowMessage`를 통해 이루어집니다. 이메일은 `NotificationHelper.sendWorkflowEmail`(환경설정 게이트 + `ChurchEmailLimiter`, `workflowEmail`로 계량)을 통해 보내고, SMS는 `allowSms`와 `serving_schedule` 카테고리 게이트가 모두 켜진 경우에만 `sendPersonText`로 보냅니다. 수락/거절(이벤트 버스의 `assignment.updated`)은 카드를 닫습니다. 30분 타이머(`AssignmentWorkflowHelper.processPending`)는 놓친 시작과 이벤트를 복구하며, 후속 마감일까지 응답이 없는 요청은 담당자 검토 작업으로 전환합니다. 전체 수명 주기는 `Api/docs/assignment-confirmation-workflows.md`를 참고하세요.

## 교회가 작성한 이메일 한도

교회가 작성한 내용의 이메일은 ChurchApps의 공용 SES 식별자에서 발송되므로, `Api/src/shared/helpers/ChurchEmailLimiter.ts`가 교회별로 사용량을 계량합니다. 이 함수는 네 가지 경로에서 호출됩니다. 그룹/템플릿 발송(`EmailTemplateController`, 콘텐츠 유형 `email`), 양식 후속 이메일(`FormSubmissionController`, `formFollowUp`), 워크플로 **Send email** 동작(`churchAuthored`를 사용하는 `NotificationHelper`, `workflowEmail`), 봉사 확인 요청 이메일(`NotificationHelper.sendWorkflowEmail`, `workflowEmail`)입니다. 시스템 메일(인증 코드, 영수증, 리마인더)과 역할 및 그룹 초대(`UserController.sendInviteEmail`, 고정 템플릿)는 계량하지 않습니다.

- **승인 게이트.** 서버 관리자가 `churches.emailApprovedDate`를 설정하기 전까지 교회는 아무것도 보낼 수 없습니다(`POST /membership/churches/:id/emailApproval`, 서버 관리자 → 교회 → **Group Email** 칩). 보관된 교회는 항상 차단됩니다. B1Admin의 Send Email 대화상자는 `GET /messaging/emailTemplates/sendStatus`(`approved`, `paused`, `remaining`, `requested`)를 읽고, 승인되지 않은 경우 편집기 대신 **Request review** 카드를 보여 줍니다. 워크플로 단계 편집기도 같은 엔드포인트를 읽으며(`groupMembers.edit`뿐 아니라 `tasks.admin`에도 열려 있습니다), 교회가 미승인이거나 일시 중지된 상태이면 **Send email** 동작에 대해 경고합니다. 발송 시점에 `ChurchEmailLimiter.remaining()`이 1 미만이면 `MessagingModuleGateway.sendTemplatedEmail`은 알림을 만들지 않고 `false`를 반환하므로, 카드 이력이 버려진 메일에 대해 **Email sent**를 기록하지 않습니다. `POST /messaging/emailTemplates/requestApproval`은 교회당 주 1회 이하로 지원팀에 이메일을 보냅니다.
- **획득한 허용량.** 승인된 교회는 `max(150, 2 × 지난 30일 중 교회 작성 이메일이 가장 많이 발송된 하루)`의 허용량을 받으며, 롤링 24시간당 최대 2,000통으로 제한됩니다. 현재 24시간은 "가장 많이 보낸 날" 계산에서 제외되므로, 한꺼번에 보낸 메일이 자기 자신의 한도를 올릴 수 없습니다.
- **예약 후 정산.** `reserve()`는 발송 전에 수신자마다 `deliveryLogs` 행을 하나씩 기록하고, 이 행을 포함해 허용량을 다시 확인합니다. 두 요청이 한도를 동시에 넘어섰다면 되돌리고 요청을 거절합니다(429 응답). `settle()`은 각 행을 발송 완료 또는 실패로 표시합니다.
- **불만 신고에 따른 일시 중지.** `sesFeedback` Lambda(`Api/src/lambda/ses-feedback-handler.ts`, SES → SNS에서 입력을 받음)는 영구 반송이나 불만 신고마다, 그 시점 전후로 해당 주소에 교회 작성 이메일이 도달한 교회에 연결하여 `deliveryMethod`를 `sesBounce` / `sesComplaint`로 저장합니다. 7일 동안 불만 신고가 2건 이상(발송의 0.3% 이상) 또는 하드 반송이 10건 이상(5% 이상)이면 교회는 일시 중지됩니다.

## 스케줄링

리마인더 엔진과 알림 요약 모두 새로운 인프라를 도입하지 않고, 기존의 예약 타이머에 올라타서 실행됩니다.

| 타이머 | 일정 | 실행 내용 |
|-------|----------|------|
| 30분 타이머 | 30분마다 | 읽지 않은 알림 단계 올리기, `individual` 빈도의 요약 이메일 발송, 기한이 된 리마인더 발생 발송(`ReminderEngine.scan`), 승인 요약, 기한이 된 자동화 실행 |
| 야간 타이머 | 매일 05:00 UTC | 그룹 출석 리마인더, 반복 스트리밍 서비스 진행, 자동 새로고침 목록 갱신, 다음 기간의 리마인더 발생 펼치기(`ReminderEngine.expandAll`), `daily` 빈도의 요약 이메일 발송 |

로컬에서는 `Api` 프로젝트에서 `npm run timer:30min`과 `npm run timer:midnight`를 실행하여 같은 로직을 즉시 실행할 수 있습니다.

## 파일 목록

| 영역 | 파일 |
|------|------|
| 알림 통로 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| 공용 진입점 | `Api/src/shared/helpers/NotificationService.ts` |
| 트랜잭션 통로 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, 린트 규칙 `Api/tools/eslint-rules/email-door.cjs` |
| 교회 이메일 한도 | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| 리마인더 엔진 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| 문자 / STOP 수신 거부 | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (서빙 개요 **Text Volunteers**) |
| 리마인더 리포지토리 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| 봉사/계획 이메일 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| 리마인더 편집기(B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| 리마인더 편집기 / 환경설정(B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## 관련 페이지

- [실시간 아키텍처](../realtime) — 앱 내 전달 단계가 기반으로 삼는 WebSocket 프로토콜과 클라이언트 기본 구성 요소(`SocketHelper`, `SubscriptionManager`, `ConversationStore`)
- [웹 푸시 알림](../web-push) — 푸시 단계에서 사용하는 VAPID 설정과 브라우저 Push API 경로
- [메시징 엔드포인트](../api/endpoints/messaging) — 메시지, 대화, 연결, 알림/리마인더 경로를 포함한 전체 REST 인터페이스
