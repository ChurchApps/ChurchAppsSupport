---
title: "알림 및 미리 알림 아키텍처"
---

# 알림 및 미리 알림 아키텍처

<div class="article-intro">

교회 회원이 보고 있는 페이지 외부에서 볼 수 있는 모든 메시지 — 배지 개수, 푸시 알림, 다이제스트 이메일 — MessagingApi의 두 가지 문 중 하나를 통과합니다. 이 페이지는 이 깔때기, 일정에 따라 주입하는 미리 알림 엔진, 그리고 실제로 사람에게 도달하는지를 결정하는 선호도 모델을 설명합니다.

</div>

## 개요 — 두 개의 문

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **사람에게 뭔가를 알리는 모든 것**은 메시징 모듈의 `NotificationHelper.createNotifications()`을 통과합니다. 이는 `notifications` 행을 유지하고 `PreferenceGateHelper`를 채널별로 평가하여 socket → push → email로 에스컬레이션합니다 — 레벨 0에서 `in_app` 포함.
2. **일정이 있는 모든 것**은 `reminderDefinition` (엔티티 수준 또는 범위 수준)이며 `reminderOccurrences`로 확장되고 반복 타이머에서 `ReminderEngine.scan()`으로 디스패치됩니다. 하나의 확장기, 하나의 디스패처, 하나의 전송 원장 (`reminderSentLog`).
3. **직접 이메일**은 `TransactionalEmailHelper.sendTransactional()` 뒤에만 존재합니다. ESLint 규칙은 컴파일 시간에 이를 강제합니다 — 아래를 참조하세요.

:::tip 이메일 문은 린트 강제, 단순 관례가 아닙니다.
`Api/tools/eslint-rules/email-door.cjs`는 `no-direct-email-helper`를 정의합니다: `NotificationHelper.ts` 또는 `TransactionalEmailHelper.ts` 외부에서 `EmailHelper.sendTemplatedEmail()` 또는 `EmailHelper.sendEmail()` 호출은 lint를 실패하게 합니다. 이메일을 보낼 필요가 있으면 깔때기 (`emailImmediate`를 사용한 `createNotifications`) 또는 `TransactionalEmailHelper.sendTransactional()` 통해 라우팅하세요 — CI를 통과하는 세 번째 방법은 없습니다.
:::

## 알림 깔때기

`NotificationHelper.createNotifications()`는 일정이 있거나 거래 관련이 아닌 모든 것의 단일 진입점입니다:

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

각 수신자에 대해 `notifications`에 행을 저장하고 `attemptDeliveryWithEscalation`을 호출하며, 이는 아래 채널 사다리를 걷습니다. 동일한 `(contentType, contentId)`에 대한 아직 읽지 않은 행은 재생성을 억제합니다 — 이 중복 제거 보호는 `emailImmediate` 전송 (미리 알림 오프셋, 직원 "모두 이메일")과 직접 메시지에 대해 건너뛰어집니다. 직접 메시지는 항상 socket을 핑합니다.

`shared/helpers/NotificationService.ts`는 메시징 모듈 외부의 호출자를 위해 동일한 서명 (`NotificationServiceOptions`)을 미러링하고 부팅 시 메시징 모듈에 등록됩니다.

## 채널 에스컬레이션 체인

전달은 수준에서 시작하고 (기본 0, 또는 미리 알림/명시적 전송의 경우 더 높음) 이전 채널이 성공하지 않은 경우에만 다음 채널로 진행합니다. 각 수준은 `PreferenceGateHelper` 게이트됩니다.

| 수준 | 채널 | 동작 |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app` 게이트가 먼저 확인됩니다. 억제되면 (음소거됨) 행은 `isNew=false`로 유지되고 전달이 중단됩니다 — socket 핑 없음, 배지 없음, 추가 에스컬레이션 없음. 그렇지 않으면 서버는 사람의 `alerts` 방에서 열린 socket 연결을 조회하고 `notification` (또는 `privateMessage`) 프레임을 푸시합니다. 일반 알림의 경우, 성공한 socket 전달은 여기서 체인을 중단합니다 — 30분 타이머는 읽지 않은 항목을 다시 확인하고 나중에 에스컬레이션합니다. 직접 메시지는 절대 socket에서 중단되지 않습니다: 설치된 PWA는 백그라운드에서 alerts socket을 열어 둘 수 있으며, 그렇지 않으면 OS 수준 푸시를 억제할 것입니다. |
| 1 | **push** | `allowPush` / 카테고리 거부 / 조용한 시간에서 게이트됩니다. 사람의 `devices` 행에서 찾은 Expo 푸시 토큰 및 Web Push 구독 모두에 전송되며, 끝점별로 중복 제거 및 푸시 경로를 따라 오래된 토큰 정리. |
| 2 | **email** | `emailFrequency` 및 카테고리 거부에서 게이트됩니다. 즉시 전송 (`emailImmediate`)은 즉시 렌더링하고 `deliveryLogs` 행을 씁니다. 그렇지 않으면 알림은 아래 설명된 배치 다이제스트에 대해 보류 중으로 남겨집니다. |
| — | **sms** | 선호도 배관 (`allowSms`, 카테고리별 채널 목록)은 이미 SMS 채널을 고려합니다. 하지만 오늘날의 생산자는 통해 전송하지 않습니다 — 그것은 별도의 고립된 흐름인 벌크 SMS 제품을 위해 예약됩니다. `TextingController` / `@churchapps/texting`를 통해 실행됩니다. |

socket 또는 push에서 남겨진 읽지 않은 알림은 30분 타이머 (`NotificationHelper.escalateDelivery`)에 의해 에스컬레이션됩니다. 배치 이메일은 각 사람의 `emailFrequency` 선호도에 의해 구동되는 `NotificationHelper.sendEmailNotifications(frequency)`에 의해 전송됩니다: `individual`은 30분 타이머에서 실행되고, `daily`는 야간 타이머에서 실행됩니다. (`weekly`는 유효한 선호도 값이지만 아직 전용 배치 실행은 없습니다.)

## 미리 알림 엔진

일정이 있는 미리 알림 — 이벤트 미리 알림, 작업 마감일, 종사/계획 할당 미리 알림 — 모두 기능별 기능별 cron 로직보다는 하나의 일반화된 엔진을 통해 이동합니다.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**정의** (`reminderDefinitions`)는 엔티티 수준 (`entityId` 설정 — 특정 이벤트, 작업 또는 계획) 또는 범위 수준 (`entityId` null, `scopeId` 설정 — 예. 종사 계획 유형 아래의 모든 계획). 정의는 분 오프셋의 CSV(`offsets`, 예 `"1440,60"` 하나의 날과 한 시간 전), 로컬 전송 시간 (`sendLocalTime`), 채널의 CSV(`channels` — `email` 포함은 전송 시간에 즉시 풍부한 이메일을 트리거), `recipientMode`, 그리고 선택적 사용자 지정 `message`를 전달합니다.

**확장** 앞의 지평선 (롤링 다중 일 창)에 대한 화재 행을 구체화합니다. 야간 타이머에서 실행되고, 정의가 저장될 때마다 동기적으로 실행되므로 마지막 순간 이벤트에 대한 미리 알림이 여전히 화재합니다. 범위 정의는 어댑터의 `loadScopeEntities`를 통해 팬 아웃하여 구체적 엔티티당 하나의 발생 세트를 생산합니다. 엔티티 수준 발생은 키 `definitionId:occurrenceISO:offset`를 사용하고, 범위 발생은 엔티티 ID로 네임스페이싱되므로 절대 충돌하지 않습니다. 발생 업서팅은 **이전에 취소된 행을 부활**시킵니다 — 취소-다음-재확장은 기본 엔티티 변경 후 미리 알림을 다시 동기화하는 표준 방법입니다. 행이 `sent`, `failed`, 또는 `processing`이 이미 남겨져 있습니다.

**발송** (`ReminderEngine.scan()`)은 30분 타이머에서 실행됩니다. 만기된 발생 (리스 이중 처리를 방지)을 선언하고, 엔티티의 어댑터를 통해 수신자를 로드하고, 해당 발생에 대한 `reminderSentLog`에 이미 기록된 사람을 필터링하고, `deliveryStartLevel: 1` (푸시로 직접 건너뛰기) 및 정의의 채널에 `emailImmediate`/`emailByPerson` 포함할 때 `createNotifications`을 호출합니다.

내부 이벤트 버스는 야간 확장을 기다리지 않고 엔티티 변경에 반응합니다: 콘텐츠 이벤트 (웹훅 디스패처 통해) 및 계획/작업 업데이트 이벤트는 영향을 받는 엔티티에 대한 즉시 재확장 또는 취소를 트리거하고, 계획 업데이트는 또한 해당 계획 유형과 관련된 범위 정의를 재확장합니다.

### 어댑터

엔진은 엔티티 불가지론적입니다. 각 지원 엔티티 유형은 어댑터 (`helpers/adapters/`)를 통해 연결합니다:

| 엔티티 유형 | 어댑터 | 참고 |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | 수신자는 등록자 또는 이벤트 및 `recipientMode`에 따라 그룹 회원으로 범위 지정됩니다. |
| `plan` | `PlanReminderAdapter` | 수신자는 받아들인 + 미확인 계획 할당입니다. `buildEmails`은 위치, 메모, 그리고 `ReminderTokenHelper`로 서명한 Accept/Decline 버튼을 포함한 사용자 지정 메시지를 렌더링하는 `DoingModuleGateway.buildPlanReminderEmails`로 호출하며, 공개 할당-응답 끝점에 게시합니다. |
| `task` | `TaskReminderAdapter` | 수신자는 작업의 피할당자입니다. |

### 끝점

| 메서드 | 경로 | 목적 |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 하나의 엔티티에 대한 미리 알림 정의를 로드하거나 저장합니다. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 범위 수준 (상속된) 미리 알림 정의를 로드하거나 저장합니다. |
| `DELETE` | `/messaging/reminders/:defId` | 정의를 삭제하고 보류 중인 발생을 취소합니다. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 저장하기 전에 이벤트 미리 알림에 대한 수신자 개수 및 다음 화재 시간을 미리 봅니다. |
| `GET` | `/messaging/reminders/log` | 교회의 최근 미리 알림 발생 기록입니다. |
| `POST` | `/messaging/reminders/mute` | 특정 엔티티에 대한 미리 알림을 음소거합니다. |

정의를 저장하면 해당 엔티티 또는 범위에 대한 동기적 재확장을 트리거하므로 편집자는 야간 작업을 기다리지 않고 최신 "다음 화재"를 봅니다.

## 직접 메시지

직접 메시지는 별도의 에스컬레이션 경로가 아닌 다른 모든 것과 동일한 깔때기를 탑니다. 각 읽지 않은 대화는 `notifications`에서 하나의 **섀도우 행**을 가져옵니다 (`contentType='privateMessage'`, `contentId` = 비공개 메시지 ID, `category='direct_messages'`). 이는 모든 전달 상태 — socket/push/email 에스컬레이션, 읽기 추적, 모든 것을 소유합니다. `privateMessages` 테이블 자체는 메시지 페이로드와 `notifyPersonId` 열을 유지하며, 이는 읽지 않은 배지의 소스이고 수신자가 대화를 읽을 때 지워집니다.

섀도우 행은 알림 종 외부에서 보이지 않습니다: 읽지 않은 개수 쿼리, 알림 목록 쿼리, 마크-읽기/삭제 쿼리에서 제외되며, 모두 `contentType <> 'privateMessage'`를 필터합니다. 모든 DM 핑은 읽지 않은 상태와 관계없이 socket을 히트합니다 (라이브 채팅 의미 — 중복 제거 없음). DM은 절대 일반 알림처럼 socket 전달에서 중단되지 않습니다. 백그라운드된 PWA가 socket을 열어 두는 동안 여전히 OS 수준 푸시가 필요하므로. 사람이 DM 알림을 음소거하면 섀도우 행은 주차됩니다 (`isNew=false`, `notifyPersonId` 지워짐) — 여전히 대화 내에서 보이지만 배지나 경고 없음.

## 선호도 및 게이팅

모든 전송은 `PreferenceGateHelper.evaluate()` (순수 함수, 모든 상태 통과, 핫 경로에서 DB 호출 없음)을 통과하며, 이는 `allow`, `suppress`, 또는 `defer`를 반환합니다. 레이어는 순서대로 실행되고 첫 번째로 결정하는 것이 승리합니다:

1. **잠긴 카테고리** — 일부 카테고리는 필수 (계층 0)이고 다른 모든 레이어를 우회합니다.
2. **마스터 음소거 / 채널 킬** — `masterMute`, `allowPush`, `allowSms`, 또는 `emailFrequency='never'`는 완전히 억제합니다.
3. **조용한 시간** — 푸시 및 SMS만 (이메일은 비침투적 간주). 사람의 시간대에서 현재 벽시계 시간이 조용한 창에 떨어지면, 거래 카테고리는 여전히 통과합니다. 비거래 카테고리는 조용한 창의 끝으로 연기되며, `TimezoneHelper.wallClockToUtc`를 통해 DST 올바른 UTC 인스턴트로 계산됩니다.
4. **카테고리별 선호도 재정의** — 하나의 카테고리 × 채널 쌍에 대한 명시적 거부. 부재는 카테고리의 기본값을 의미합니다.
5. **엔티티별 음소거** — 특정 엔티티 (예. 하나의 이벤트, 하나의 계획)에 대해 기록된 음소거는 카테고리 수준 설정보다 추가로 제한하지만, 호출자가 엔티티 ID/유형을 알림 옆에 공급할 때만 적용합니다.

관련된 테이블: `notificationPreferences` (전역 — `masterMute`, `emailFrequency` `individual|daily|weekly|never`, `allowPush`, 조용한-시간 창 + 시간대, `allowSms`), `notificationPreferenceOverrides` (카테고리 × 채널 당), 그리고 `notificationEntityMutes` (엔티티 당).

이 게이트는 깔때기 내에서 in-app (수준 0), push (수준 1), 그리고 email (수준 2) — 즉시 미리 알림/다이제스트 이메일 포함에 강제됩니다. 거래 이메일 (인증 코드, 암호 재설정, 초대, 기부 영수증)은 설계에 의해 우회합니다. 그것이 두 번째 문의 전체 포인트입니다.

## 교회 작성 이메일 제한

콘텐츠를 교회가 쓴 이메일은 공유 ChurchApps SES 아이디에서 나가므로 `Api/src/shared/helpers/ChurchEmailLimiter.ts`에 의해 교회별로 미터링됩니다. 네 개의 경로는 그것을 호출합니다: 그룹/템플릿 전송 (`EmailTemplateController`, 콘텐츠 유형 `email`), 양식 팔로우업 이메일 (`FormSubmissionController`, `formFollowUp`), 워크플로우 **이메일 전송** 작업 (`NotificationHelper` with `churchAuthored`, `workflowEmail`), 그리고 B1 계정 초대 (`UserController.sendInviteEmail`, `invite`). 시스템 메일 (인증 코드, 영수증, 미리 알림)은 미터링되지 않습니다.

- **승인 게이트.** 교회는 서버 관리자가 `churches.emailApprovedDate`를 설정할 때까지 아무것도 전송하지 않습니다 (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** 칩). 보관된 교회는 항상 차단됩니다. B1Admin의 Send Email 대화는 `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`)를 읽고, 미승인 시 **Request review** 카드를 편집자 대신 표시합니다. `POST /messaging/emailTemplates/requestApproval`는 지원을 이메일합니다. 교회당 주당 최대 한 번.
- **획득한 허용량.** 승인된 교회는 `max(150, 2 × its best church-authored day in the prior 30 days)`를 가져오고, 롤링 24시간당 2,000으로 제한됩니다. 현재 24시간은 "최고의 날"에서 제외되므로 버스트는 자신의 제한을 올릴 수 없습니다.
- **예약, 그 후 정산.** `reserve()`은 전송하기 전에 수신자당 하나의 `deliveryLogs` 행을 쓰고, 그 행을 계산하여 허용량을 다시 확인하고, 두 요청이 제한을 초과하여 경쟁하면 백업합니다 (전송은 429를 반환). `settle()`은 각 행을 전송됨 또는 실패로 표시합니다.
- **불만 일시 중지.** `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, SES → SNS에서 공급)는 각 영구 반송 또는 불만을 그 주소 근처에서 교회 작성 이메일에 도달한 교회에 고정하고, `deliveryMethod` `sesBounce` / `sesComplaint`로 저장합니다. 교회는 7일 이상 2+ 불만 (≥ 0.3% 전송) 또는 10+ 하드 반송 (≥ 5%)에서 일시 중지됩니다.

## 일정 정하기

미리 알림 엔진과 알림 다이제스트는 모두 기존 예약된 타이머를 타고 새로운 인프라를 도입하는 것이 아닙니다:

| 타이머 | 일정 | 실행 |
|-------|----------|------|
| 30분 타이머 | 30분마다 | 읽지 않은 알림 에스컬레이션; `individual` 빈도 다이제스트 이메일 전송; 만기된 미리 알림 발생 발송 (`ReminderEngine.scan`); 승인 다이제스트; 만기된 자동화 실행 |
| 야간 타이머 | 05:00 UTC | 그룹 참석 미리 알림; 반복 스트리밍 서비스 진행; 자동-새로고침 목록 새로고침; 다음 지평선에 대한 미리 알림 발생 확장 (`ReminderEngine.expandAll`); `daily` 빈도 다이제스트 이메일 전송 |

로컬로, 동일한 로직은 `npm run timer:30min`과 `npm run timer:midnight`을 `Api` 프로젝트에서 요청할 수 있습니다.

## 파일 인벤토리

| 영역 | 파일 |
|------|-------|
| 깔때기 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| 공유 진입점 | `Api/src/shared/helpers/NotificationService.ts` |
| 거래 문 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, 린트 규칙 `Api/tools/eslint-rules/email-door.cjs` |
| 교회 이메일 제한 | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| 미리 알림 엔진 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| 미리 알림 저장소 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| 종사/계획 이메일 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| 미리 알림 편집자 (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| 미리 알림 편집자 / 선호도 (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## 관련 페이지

- [실시간 아키텍처](../realtime) — WebSocket 프로토콜 및 in-app 전달 수준이 탑승하는 클라이언트 기본형 (`SocketHelper`, `SubscriptionManager`, `ConversationStore`)
- [Web Push 알림](../web-push) — VAPID 설정 및 푸시 에스컬레이션 수준에서 사용하는 브라우저 Push API 경로
- [메시징 끝점](../api/endpoints/messaging) — 메시지, 대화, 연결, 그리고 알림/미리 알림 경로의 전체 REST 표면
