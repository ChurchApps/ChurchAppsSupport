---
title: "알림 및 리마인더 아키텍처"
---

# 알림 및 리마인더 아키텍처 {#notifications--reminders-architecture}

<div class="article-intro">

교회 회원이 지금 보고 있는 페이지 밖에서 보게 되는 모든 메시지(배지 숫자, 푸시 알림, 요약 이메일)는 MessagingApi의 두 입구 중 하나를 거칩니다. 이 페이지는 그 깔때기, 일정에 따라 깔때기에 값을 공급하는 리마인더 엔진, 그리고 실제로 누구에게 무엇이 도달할지 결정하는 환경설정 모델을 설명합니다.

</div>

## 개요 — 두 개의 입구 {#overview--two-doors}

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **사람에게 무언가를 알리는 모든 것**은 messaging 모듈의 `NotificationHelper.createNotifications()`를 거칩니다. 이 함수는 `notifications` 행을 저장하고, `PreferenceGateHelper`를 채널별로 평가하면서 소켓 → 푸시 → 이메일로 단계를 올립니다. 레벨 0의 `in_app`도 포함됩니다.
2. **예약된 모든 것**은 `reminderDefinition`(엔터티 수준 또는 범위 수준)이며, 이것이 `reminderOccurrences`로 펼쳐지고 반복 타이머에서 `ReminderEngine.scan()`이 발송합니다. 펼치는 장치 하나, 발송 장치 하나, 발송 원장(`reminderSentLog`) 하나입니다.
3. **직접 이메일**은 `TransactionalEmailHelper.sendTransactional()` 뒤에서만 가능합니다. ESLint 규칙이 컴파일 시점에 이를 강제합니다. 아래를 참조하세요.

:::tip 이메일 입구는 관례가 아니라 린트로 강제됩니다
`Api/tools/eslint-rules/email-door.cjs`는 `no-direct-email-helper`를 정의합니다. `NotificationHelper.ts`나 `TransactionalEmailHelper.ts` 바깥에서 `EmailHelper.sendTemplatedEmail()` 또는 `EmailHelper.sendEmail()`을 호출하면 린트에 실패합니다. 이메일을 보내야 한다면, 깔때기를 거치거나(`emailImmediate`를 붙인 `createNotifications`), `TransactionalEmailHelper.sendTransactional()`을 거쳐야 합니다. CI를 통과하는 세 번째 방법은 없습니다.
:::

## 알림 깔때기 {#the-notification-funnel}

`NotificationHelper.createNotifications()`는 예약되지도, 거래성도 아닌 모든 것의 단일 진입점입니다.

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

수신자마다 `notifications`에 행을 저장하고, 아래의 채널 사다리를 따르는 `attemptDeliveryWithEscalation`을 호출합니다. 같은 `(contentType, contentId)`에 대해 아직 읽지 않은 행이 있으면 재생성을 막습니다. 이 중복 방지 검사는 `emailImmediate` 발송(리마인더 오프셋, 직원의 "모두에게 이메일", 워크플로 단계는 자체 중복 방지를 가짐)과 항상 소켓을 울리는 직접 메시지에서는 건너뜁니다.

`shared/helpers/NotificationService.ts`는 messaging 모듈 밖의 호출자를 위해 같은 시그니처(`NotificationServiceOptions`)를 미러링하며, 부팅 시 messaging 모듈에 등록됩니다.

## 채널 에스컬레이션 체인 {#channel-escalation-chain}

발송은 레벨(기본 0, 리마인더나 명시적 발송에서는 더 높음)에서 시작하며, 이전 채널이 성공하지 못한 경우에만 다음 채널로 진행합니다. 각 레벨은 무언가를 시도하기 전에 `PreferenceGateHelper`로 먼저 게이트됩니다.

| 레벨 | 채널 | 동작 |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app` 게이트를 먼저 확인합니다. 억제된 경우(음소거), 행은 `isNew=false`로 저장되고 발송은 완전히 멈춥니다. 소켓 ping도, 배지도, 추가 에스컬레이션도 없습니다. 그렇지 않으면 서버는 사람의 `alerts` 룸에 열려 있는 소켓 연결을 찾아 `notification`(또는 `privateMessage`) 프레임을 푸시합니다. 일반 알림의 경우 소켓 발송이 성공하면 체인은 여기서 멈추며, 30분 타이머가 나중에 읽지 않은 항목을 다시 확인하고 에스컬레이션합니다. 직접 메시지는 소켓에서 절대 멈추지 않습니다. 설치된 PWA는 백그라운드에서 알림 소켓을 열어 둘 수 있는데, 그러면 OS 수준 푸시가 억제되기 때문입니다. |
| 1 | **push** | `allowPush` / 카테고리 거부 / 방해 금지 시간에 따라 게이트됩니다. 사람의 `devices` 행에서 찾은 Expo 푸시 토큰과 Web Push 구독 모두에 보내며, 과정에서 엔드포인트 기준으로 중복을 제거하고 오래된 토큰을 정리합니다. |
| 2 | **email** | `emailFrequency`와 카테고리 거부에 따라 게이트됩니다. 즉시 발송(`emailImmediate`)은 바로 렌더링하고 `deliveryLogs` 행을 기록합니다. 그 밖의 경우 알림은 아래에 설명된 일괄 요약을 위해 대기 상태로 남습니다. |
| — | **sms** | 에스컬레이션 사다리의 레벨이 아닙니다. 게이트되는 유일한 SMS 생성자는 리마인더 엔진입니다. 정의의 `channels`에 `sms`가 포함되면, `ReminderEngine.sendSms()`가 푸시/이메일 알림**에 더해** 각 수신자에게 문자를 보냅니다([텍스트 리마인더](#text-reminders) 참조). 대량 문자(`TextingController` / `@churchapps/texting`), 섬김 개요의 **봉사자에게 문자** 발송(`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`), 워크플로의 **문자 보내기** 단계 작업(`StepActionHelper.sendText` → `sendPersonText`)은 모두 교회의 제공업체를 통해 직접 문자를 보내므로, 알림 환경설정과 방해 금지 시간이 적용되지 않습니다. 사람의 `optedOut` 플래그만 존중됩니다. |

소켓이나 푸시 단계에 남은 읽지 않은 알림은 30분 타이머(`NotificationHelper.escalateDelivery`)가 에스컬레이션합니다. 일괄 이메일은 `NotificationHelper.sendEmailNotifications(frequency)`가 발송하며, 각 사람의 `emailFrequency` 환경설정에 따라 실행됩니다. `individual`은 30분 타이머에서, `daily`는 야간 타이머에서 실행됩니다. (`weekly`도 유효한 환경설정 값이지만, 아직 전용 일괄 실행은 없습니다.)

## 리마인더 엔진 {#reminder-engine}

예약된 리마인더(이벤트 리마인더, 작업 마감일, 섬김/일정 배정 리마인더)는 모두 기능별 맞춤 cron 로직이 아니라 하나의 일반화된 엔진을 거칩니다.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**정의**(`reminderDefinitions`)는 엔터티 수준(`entityId`가 설정됨. 특정 이벤트, 작업, 또는 일정) 또는 범위 수준(`entityId`는 null, `scopeId`가 설정됨. 예: 섬김 일정 유형 아래의 모든 일정)입니다. 정의에는 분 단위 오프셋의 CSV(`offsets`, 예: 하루 전과 한 시간 전이면 `"1440,60"`), 현지 발송 시각(`sendLocalTime`), 채널의 CSV(`channels`. `email`이 포함되면 발송 시점에 즉시 리치 이메일을 보냄), `recipientMode`, 선택적 사용자 지정 `message`가 있습니다.

**펼치기**(expansion)는 앞으로의 기간(롤링 여러 날의 창)에 대한 발화 행을 구체화합니다. 야간 타이머에서 실행되며, 정의가 저장될 때마다 동기적으로도 실행되므로 막바지에 만든 이벤트의 리마인더도 발화합니다. 범위 정의는 어댑터의 `loadScopeEntities`를 통해 펼쳐져, 구체적인 엔터티마다 하나의 발생 집합을 만듭니다. 엔터티 수준 발생의 키는 `definitionId:occurrenceISO:offset`이고, 범위 발생은 엔터티 ID로 네임스페이스가 나뉘므로 서로 충돌하지 않습니다. 발생을 upsert하면 이전에 취소된 행이 **부활**합니다. 기반 엔터티가 바뀐 뒤 리마인더를 다시 맞추는 표준 방법은 취소 후 다시 펼치기입니다. 이미 `sent`, `failed`, `processing` 상태인 행은 건드리지 않습니다.

**발송**(`ReminderEngine.scan()`)은 30분 타이머에서 실행됩니다. 기한이 된 발생을 임대(lease)로 가져오며(이중 처리 방지), 엔터티의 어댑터로 수신자를 불러오고, 해당 발생에 대해 `reminderSentLog`에 이미 기록된 사람을 걸러낸 다음, `deliveryStartLevel: 1`(바로 푸시로 건너뜀)과 정의의 채널에 이메일이 포함된 경우 `emailImmediate`/`emailByPerson`을 붙여 `createNotifications`를 호출합니다.

### 텍스트 리마인더 {#text-reminders}

정의의 `channels`에 `sms`가 포함되면, `scan()`은 푸시/이메일 알림이 생성된 뒤 같은 새 수신자에 대해 `ReminderEngine.sendSms()`를 호출합니다. 문자 수신은 회원별 옵트인입니다.

- 각 수신자는 `PreferenceGateHelper.evaluate(..., "sms", ...)`를 거치므로, `allowSms`가 켜져 있어야 하며(기본값은 꺼져 있고 B1App의 **문자 메시지** 스위치로 설정됨), 카테고리의 `sms` 채널이 꺼져 있으면 안 됩니다. `event_reminders`, `serving_schedule`, `tasks`는 `defaultChannels`와 `allowedChannels` 모두에 `sms`를 나열합니다.
- `mobilePhone`이 없거나 `optedOut`이 설정된 사람은 억제됩니다. 교회에 문자 제공업체가 없으면 나머지 배치는 `no_provider` 사유로 억제됩니다.
- 본문은 `ReminderEngine.smsBody()`가 만듭니다. `"<Church name>: <message> Reply STOP to opt out."` 형태이며, 한 개의 160자 세그먼트로 잘립니다.
- 각 수신자는 `channel: "sms"`와 상태 `sent` / `suppressed` / `failed`를 가진 자체 `reminderSentLog` 행을 받습니다. 이 행은 푸시/이메일 행과 별도의 키로 관리되므로, 문자가 실패해도 푸시나 이메일이 다시 발송되지 않습니다.

편집기는 `GET /messaging/texting/status`가 `{ enabled: true }`(교회의 첫 번째 문자 제공업체가 활성화됨)를 반환할 때만 **문자**를 제공합니다.

**STOP 수신 거부.** `POST /messaging/texting/inbound/:churchId/:token`은 교회가 제공업체에 붙여 넣는 익명 웹훅입니다(B1Admin은 문자 설정에서 `GET /messaging/texting/inboundUrl`의 URL을 보여 줌). 토큰은 교회 ID의 HMAC입니다(`SmsOptOutHelper.token`). `SmsOptOutHelper.parse`는 Twilio 스타일의 폼 필드와 Clearstream/TextInChurch 스타일의 JSON을 받아들입니다. 응답이 정확히 통신사 수신 중지 단어(`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`)이면, 휴대폰 번호가 일치하는 교회의 삭제되지 않은 모든 사람에게 `people.optedOut = true`와 `allowSms = false`가 설정됩니다. 그 밖의 응답은 확인만 하고 무시합니다.

내부 이벤트 버스는 야간 펼치기를 기다리지 않고 엔터티 변경에 반응합니다. 콘텐츠 이벤트(웹훅 디스패처를 통해)와 일정/작업 업데이트 이벤트는 영향받는 엔터티에 대해 즉시 다시 펼치기나 취소를 트리거하며, 일정 업데이트는 그 일정 유형에 연결된 범위 정의도 다시 펼칩니다.

### 어댑터 {#adapters}

엔진은 엔터티 유형을 가리지 않으며, 지원되는 각 엔터티 유형은 어댑터(`helpers/adapters/`)를 통해 연결됩니다.

| 엔터티 유형 | 어댑터 | 비고 |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | 수신자는 이벤트와 `recipientMode`에 따라 등록자 또는 그룹 구성원으로 범위가 정해짐. |
| `plan` | `PlanReminderAdapter` | 수신자는 수락 및 미확인 일정 배정. `buildEmails`는 `DoingModuleGateway.buildPlanReminderEmails`를 호출하며, 이는 `doing/helpers/PlanReminderEmailHelper`를 통해 위치, 메모, 사용자 지정 메시지를 렌더링합니다. `ReminderTokenHelper`가 서명한 수락/거절 버튼을 포함하며, 이 버튼은 공개 배정 응답 엔드포인트로 POST합니다. |
| `task` | `TaskReminderAdapter` | 수신자는 작업의 담당자. |

### 엔드포인트 {#endpoints}

| 메서드 | 경로 | 용도 |
|--------|------|------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 엔터티 하나의 리마인더 정의를 불러오거나 저장합니다. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 범위 수준(상속된) 리마인더 정의를 불러오거나 저장합니다. |
| `DELETE` | `/messaging/reminders/:defId` | 정의를 삭제하고 대기 중인 발생을 취소합니다. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 저장 전에 이벤트 리마인더의 수신자 수와 다음 발화 시각을 미리 봅니다. |
| `GET` | `/messaging/reminders/log` | 교회의 최근 리마인더 발생 기록. |
| `POST` | `/messaging/reminders/mute` | 특정 엔터티의 리마인더를 음소거합니다. |

정의를 저장하면 그 엔터티나 범위에 대해 동기 재펼치기가 실행되므로, 편집자는 야간 작업을 기다리지 않고 최신 "다음 발화" 시각을 볼 수 있습니다.

## 직접 메시지 {#direct-messages}

직접 메시지는 별도의 에스컬레이션 경로가 아니라, 다른 모든 것과 같은 깔때기를 탑니다. 읽지 않은 대화마다 `notifications`에 **그림자 행** 하나가 생기며(`contentType='privateMessage'`, `contentId` = 비공개 메시지 ID, `category='direct_messages'`), 이 행이 발송 상태 전부를 소유합니다. 소켓/푸시/이메일 에스컬레이션, 읽음 추적 등이 모두 여기에 있습니다. `privateMessages` 테이블은 메시지 페이로드와 `notifyPersonId` 열을 보관합니다. 이 열이 읽지 않음 배지의 근거이며, 수신자가 대화를 읽으면 지워집니다.

그림자 행은 알림 종에서는 보이지 않습니다. 읽지 않은 개수 쿼리, 알림 목록 쿼리, 읽음 처리/삭제 쿼리에서 모두 제외되며, 이 쿼리들은 `contentType <> 'privateMessage'`로 필터링합니다. 모든 DM ping은 읽지 않음 상태와 관계없이 소켓을 울립니다(실시간 채팅 의미. 중복 제거 없음). DM은 일반 알림처럼 소켓 발송에서 멈추지 않는데, 백그라운드 PWA는 소켓을 열어 둔 채로도 OS 수준 푸시가 필요할 수 있기 때문입니다. 사람이 DM 알림을 음소거하면 그림자 행은 보류됩니다(`isNew=false`, `notifyPersonId` 지워짐). 대화 안에서는 여전히 보이지만, 배지나 알림은 없습니다.

## 환경설정과 게이팅 {#preferences--gating}

모든 발송은 `PreferenceGateHelper.evaluate()`를 거칩니다. 이 함수는 순수 함수입니다(모든 상태를 인자로 받으며, 핫 패스에서 DB 호출이 없음). 결과는 `allow`, `suppress`, `defer` 중 하나입니다. 계층은 순서대로 실행되며, 먼저 결정하는 계층이 이깁니다.

1. **잠긴 카테고리** — 일부 카테고리는 필수(tier 0)이며 다른 모든 계층을 우회합니다.
2. **마스터 음소거 / 채널 차단** — `masterMute`, `allowPush`, `allowSms`(기본값은 꺼짐. 회원이 옵트인), 또는 `emailFrequency='never'`가 즉시 억제합니다.
3. **방해 금지 시간** — 푸시와 SMS에만 적용합니다(이메일은 방해가 적은 것으로 간주함). 사람의 시간대 기준 현재 벽시계 시간이 방해 금지 구간에 들어가면, 거래성 카테고리는 그대로 전달되고, 비거래성 카테고리는 방해 금지 구간의 끝으로 미뤄집니다. 이 시각은 `TimezoneHelper.wallClockToUtc`를 통해 DST를 고려한 UTC 시각으로 계산합니다.
4. **카테고리별 환경설정 재정의** — 카테고리 하나와 채널 하나의 쌍에 대한 명시적 거부입니다. 없으면 카테고리 기본값을 따릅니다.
5. **엔터티별 음소거** — 특정 엔터티(예: 이벤트 하나, 일정 하나)에 기록된 음소거로, 카테고리 수준 설정보다 더 제한합니다. 호출자가 알림과 함께 엔터티 ID/유형을 제공한 경우에만 적용됩니다.

관련 테이블은 `notificationPreferences`(전역. `masterMute`, `emailFrequency`(`individual|daily|weekly|never`), `allowPush`, 방해 금지 구간과 시간대, `allowSms`), `notificationPreferenceOverrides`(카테고리 × 채널별), `notificationEntityMutes`(엔터티별)입니다.

이 게이트는 깔때기 안에서 인앱(레벨 0), 푸시(레벨 1), 이메일(레벨 2)에 대해 강제되며, 즉시 리마인더/요약 이메일도 포함됩니다. 리마인더 문자는 `ReminderEngine.sendSms()`에서 강제됩니다. 거래성 이메일(인증 코드, 비밀번호 재설정, 초대, 헌금 영수증)은 설계상 게이트를 우회합니다. 이것이 두 번째 입구가 존재하는 이유입니다.

## 교회가 작성한 이메일의 한도 {#church-authored-email-limits}

교회가 내용을 쓴 이메일은 ChurchApps의 공유 SES 신원에서 발송되므로, `Api/src/shared/helpers/ChurchEmailLimiter.ts`가 교회별로 발송량을 제한합니다. 세 경로가 이를 호출합니다. 그룹/템플릿 발송(`EmailTemplateController`, 콘텐츠 유형 `email`), 양식 후속 이메일(`FormSubmissionController`, `formFollowUp`), 워크플로 **이메일 보내기** 작업(`churchAuthored`, `workflowEmail`을 가진 `NotificationHelper`). 시스템 메일(인증 코드, 영수증, 리마인더)과 역할 및 그룹 초대(`UserController.sendInviteEmail`, 고정 템플릿)는 제한되지 않습니다.

- **승인 게이트.** 서버 관리자가 `churches.emailApprovedDate`를 설정하기 전까지 교회는 아무것도 보내지 못합니다(`POST /membership/churches/:id/emailApproval`. 서버 관리자 → 교회 → **그룹 이메일** 칩). 보관된 교회는 항상 차단됩니다. B1Admin의 이메일 보내기 대화상자는 `GET /messaging/emailTemplates/sendStatus`(`approved`, `paused`, `remaining`, `requested`)를 읽고, 승인되지 않았다면 편집기 대신 **검토 요청** 카드를 보여 줍니다. `POST /messaging/emailTemplates/requestApproval`은 지원팀에 이메일을 보내며, 교회당 주 1회까지만 가능합니다.
- **획득한 허용량.** 승인된 교회는 `max(150, 2 × 지난 30일 중 교회가 작성한 이메일의 최고 발송일 발송량)`을 받으며, 이는 롤링 24시간당 2,000건으로 상한이 있습니다. 현재 24시간은 "최고 발송일" 계산에서 제외되므로, 한 번의 폭주가 자신의 한도를 올릴 수 없습니다.
- **예약 후 정산.** `reserve()`는 발송 전에 수신자마다 `deliveryLogs` 행을 하나씩 쓰고, 그 행들을 포함하여 허용량을 다시 확인하며, 두 요청이 한도를 동시에 넘었다면 되돌립니다(발송은 429를 반환). `settle()`은 각 행을 sent 또는 failed로 표시합니다.
- **불만 일시 중지.** `sesFeedback` Lambda(`Api/src/lambda/ses-feedback-handler.ts`, SES → SNS로 공급됨)는 영구 반송이나 불만마다 그 주소에 그 무렵 도달한 교회가 작성한 이메일을 보낸 교회를 찾아, `deliveryMethod` `sesBounce` / `sesComplaint`로 기록합니다. 7일 동안 불만 2건 이상(발송의 0.3% 이상) 또는 하드 반송 10건 이상(5% 이상)이면 교회는 일시 중지됩니다.

## 스케줄링 {#scheduling}

리마인더 엔진과 알림 요약은 모두 새 인프라를 도입하지 않고 기존 예약 타이머에 올라탑니다.

| 타이머 | 일정 | 실행 내용 |
|-------|----------|------|
| 30분 타이머 | 30분마다 | 읽지 않은 알림 에스컬레이션. `individual` 빈도 요약 이메일 발송. 기한이 된 리마인더 발생 발송(`ReminderEngine.scan`). 승인 요약. 기한이 된 자동화 실행 |
| 야간 타이머 | 05:00 UTC | 그룹 출석 리마인더. 반복 스트리밍 서비스 진행. 자동 새로 고침 목록 갱신. 다음 기간의 리마인더 발생 펼치기(`ReminderEngine.expandAll`). `daily` 빈도 요약 이메일 발송 |

로컬에서는 `Api` 프로젝트에서 `npm run timer:30min`과 `npm run timer:midnight`으로 같은 로직을 필요할 때 실행할 수 있습니다.

## 파일 목록 {#file-inventory}

| 영역 | 파일 |
|------|------|
| 깔때기 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| 공유 진입점 | `Api/src/shared/helpers/NotificationService.ts` |
| 거래성 입구 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, 린트 규칙 `Api/tools/eslint-rules/email-door.cjs` |
| 교회 이메일 한도 | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| 리마인더 엔진 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| 문자 / STOP 수신 거부 | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts`(`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts`(섬김 개요의 **봉사자에게 문자**) |
| 리마인더 리포지토리 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| 섬김/일정 이메일 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| 리마인더 편집기(B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| 리마인더 편집기 / 환경설정(B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## 관련 문서 {#related-pages}

- [실시간 아키텍처](../realtime) — 인앱 발송 레벨이 기반으로 삼는 WebSocket 프로토콜과 클라이언트 기본 요소(`SocketHelper`, `SubscriptionManager`, `ConversationStore`)
- [웹 푸시 알림](../web-push) — 푸시 에스컬레이션 레벨이 사용하는 VAPID 설정과 브라우저 Push API 경로
- [메시징 엔드포인트](../api/endpoints/messaging) — 메시지, 대화, 연결, 알림/리마인더 라우트에 대한 전체 REST 인터페이스
