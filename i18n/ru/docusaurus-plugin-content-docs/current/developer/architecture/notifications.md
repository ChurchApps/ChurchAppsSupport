---
title: "Архитектура уведомлений и напоминаний"
description: "Как API B1 Admin направляет уведомления, запланированные напоминания, лимиты церковной email-рассылки и отказы от SMS через одну точку доставки и один шлюз настроек."
---

# Архитектура уведомлений и напоминаний

<div class="article-intro">

Каждое сообщение, которое видит участник церкви вне страницы, на которой он находится -- счётчик на значке, push-уведомление, email-дайджест, -- проходит через одну из двух дверей в MessagingApi. На этой странице описаны эта воронка, движок напоминаний, который её наполняет по расписанию, и модель настроек, которая решает, что реально дойдёт до человека.

</div>

## Обзор -- две двери {#overview--two-doors}

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
scheduled staff push ─▶ scheduledNotifications (1-minute timer) ───────────┤
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Всё, что сообщает человеку что-то,** проходит через `NotificationHelper.createNotifications()` в модуле messaging. Она сохраняет строку в `notifications` и поэтапно переходит от socket к push и email, проверяя `PreferenceGateHelper` для каждого канала -- включая `in_app` на уровне 0.
2. **Всё запланированное** -- это `reminderDefinition` (на уровне сущности или области), которое разворачивается в `reminderOccurrences` и отправляется `ReminderEngine.scan()` по регулярному таймеру. Один развёртыватель, один диспетчер, один журнал отправок (`reminderSentLog`). Исключение -- push, запланированный сотрудником на странице **Mobile > Push Notifications** в B1Admin или в диалоге **Notify** группы: это строка `scheduledNotifications` (аудитория `church` или `group`), которую отправляет `ScheduledNotificationHelper.dispatchDue()` по таймеру раз в минуту. Строка, которая опоздала больше чем на 30 минут от `sendAt` при первой попытке, помечается как неудачная с причиной `missed send window` вместо отправки с опозданием, а неудачная отправка повторяется до 3 раз. Получатели определяются в момент отправки `PushAudienceHelper` -- тем же помощником, который использует немедленная групповая отправка, -- и доставляются через `createNotifications()` как `churchPushNotification` (категория настроек `announcements`) или `groupPushNotification`.
3. **Прямая email-рассылка** существует только через `TransactionalEmailHelper.sendTransactional()`. Правило ESLint применяет это на этапе компиляции -- см. ниже.

:::tip Дверь для email защищена линтером, а не только соглашением
`Api/tools/eslint-rules/email-door.cjs` определяет правило `no-direct-email-helper`: любой вызов `EmailHelper.sendTemplatedEmail()` или `EmailHelper.sendEmail()` вне `NotificationHelper.ts` или `TransactionalEmailHelper.ts` не проходит линт. Если нужно отправить email, направьте его через воронку (`createNotifications` с `emailImmediate`) или через `TransactionalEmailHelper.sendTransactional()` -- третьего пути, который проходит CI, нет.
:::

## Воронка уведомлений {#the-notification-funnel}

`NotificationHelper.createNotifications()` -- единая точка входа для всего, что не является запланированным или транзакционным:

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

Для каждого получателя она сохраняет строку в `notifications` и вызывает `attemptDeliveryWithEscalation`, который проходит по лестнице каналов ниже. Строка для той же пары `(contentType, contentId)`, которая ещё не прочитана, подавляет повторное создание -- эта защита от дублей пропускается для отправок с `emailImmediate` (смещения напоминаний, «письмо всем» от сотрудников, шаги рабочего процесса, которые сами управляют дедупликацией) и для личных сообщений, которые всегда пингуют socket.

`shared/helpers/NotificationService.ts` повторяет ту же сигнатуру (`NotificationServiceOptions`) для вызовов вне модуля messaging и регистрируется в модуле messaging при запуске.

## Лестница каналов доставки {#channel-escalation-chain}

Доставка начинается с уровня (по умолчанию 0, или выше для напоминаний и явных отправок) и переходит к следующему каналу, только если предыдущий не сработал. Каждый уровень перед попыткой проверяется `PreferenceGateHelper`.

| Уровень | Канал | Поведение |
|-------|---------|----------|
| 0 | **in_app / socket** | Сначала проверяется шлюз `in_app`. Если доставка подавлена (заглушено), строка сохраняется с `isNew=false`, и доставка полностью останавливается -- без пинга socket, без значка, без дальнейшей эскалации. В противном случае сервер ищет открытые socket-соединения для комнаты `alerts` человека и отправляет кадр `notification` (или `privateMessage`). Для обычных уведомлений успешная доставка через socket останавливает цепочку здесь -- таймер на 30 минут проверяет непрочитанное и эскалирует его позже. Личные сообщения никогда не останавливаются на socket: установленное PWA может держать socket открытым в фоне, и иначе это подавило бы push на уровне ОС. |
| 1 | **push** | Зависит от `allowPush` / отказа от категории / тихих часов. Отправляется как на токены Expo push, так и на подписки Web Push, найденные в строках `devices` человека, с дедупликацией по endpoint и удалением устаревших токенов по пути. |
| 2 | **email** | Зависит от `emailFrequency` и отказа от категории. Немедленные отправки (`emailImmediate`) рендерятся сразу и записывают строку в `deliveryLogs`; в остальных случаях уведомление остаётся ожидать пакетного дайджеста, описанного ниже. |
| — | **sms** | Не уровень лестницы. Единственный производитель SMS с проверкой настроек -- движок напоминаний: когда `channels` определения включают `sms`, `ReminderEngine.sendSms()` отправляет текст каждому получателю **в дополнение** к push/email-уведомлению (см. [Текстовые напоминания](#text-reminders)). Массовая рассылка SMS (`TextingController` / `@churchapps/texting`), рассылка **Text Volunteers** из обзора служения (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) и действие рабочего процесса **Send Text** (`StepActionHelper.sendText` → `sendPersonText`) отправляют текст напрямую через провайдера церкви, поэтому настройки уведомлений и тихие часы на них не действуют -- учитывается только флаг `optedOut` человека. |

Непрочитанные уведомления, оставшиеся на уровнях socket или push, эскалируются таймером на 30 минут (`NotificationHelper.escalateDelivery`). Пакетные email отправляет `NotificationHelper.sendEmailNotifications(frequency)`, которым управляет настройка `emailFrequency` каждого человека: `individual` работает по таймеру на 30 минут, `daily` -- по ночному таймеру. (`weekly` -- допустимое значение настройки, но отдельного пакетного запуска для него пока нет.)

## Движок напоминаний {#reminder-engine}

Запланированные напоминания -- напоминания о мероприятиях, сроки задач, напоминания о назначениях на служение и планах -- все проходят через один обобщённый движок, а не через отдельную логику cron для каждой функции.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Определения** (`reminderDefinitions`) бывают либо на уровне сущности (`entityId` задан -- конкретное событие, задача или план), либо на уровне области (`entityId` null, `scopeId` задан -- например, все планы под типом серийного плана). Определение содержит CSV смещений в минутах (`offsets`, например `"1440,60"` -- за сутки и за час до начала), локальное время отправки (`sendLocalTime`), CSV каналов (`channels` -- в том числе `email` запускает немедленное богатое письмо в момент отправки), `recipientMode` и необязательное пользовательское `message`.

**Развёртывание** (expansion) материализует строки срабатываний на ближайший горизонт (скользящее окно из нескольких дней). Оно запускается по ночному таймеру, а также синхронно при каждом сохранении определения, чтобы напоминание о мероприятии, созданном в последний момент, всё равно сработало. Определения уровня области разворачиваются через `loadScopeEntities` адаптера, создавая отдельный набор вхождений для каждой конкретной сущности; вхождения уровня сущности используют ключ `definitionId:occurrenceISO:offset`, а вхождения области группируются по ID сущности, поэтому они никогда не пересекаются. Вставка вхождения **восстанавливает** ранее отменённую строку -- отмена, а затем повторное развёртывание -- стандартный способ пересинхронизировать напоминание после изменения исходной сущности; строки, которые уже `sent`, `failed` или `processing`, не трогаются.

**Диспетчеризация** (`ReminderEngine.scan()`) запускается по таймеру на 30 минут. Она захватывает подошедшие вхождения (аренда не даёт обработать их дважды), загружает получателей через адаптер сущности, отфильтровывает тех, кто уже записан в `reminderSentLog` для этого вхождения, и вызывает `createNotifications` с `deliveryStartLevel: 1` (сразу к push) плюс `emailImmediate`/`emailByPerson`, если каналы определения включают email.

### Текстовые напоминания {#text-reminders}

Когда `channels` определения включают `sms`, `scan()` вызывает `ReminderEngine.sendSms()` после создания push/email-уведомлений, для тех же свежих получателей. Текстовые сообщения -- добровольная подписка для каждого участника:

- Каждый получатель проходит через `PreferenceGateHelper.evaluate(..., "sms", ...)`, поэтому `allowSms` должен быть включён (по умолчанию выключено; устанавливается переключателем **Текстовые сообщения** в приложении B1App), а канал `sms` категории не должен быть переопределён как выключенный. `event_reminders`, `serving_schedule` и `tasks` указывают `sms` и в `defaultChannels`, и в `allowedChannels`.
- Люди без `mobilePhone` или с установленным `optedOut` подавляются. Если у церкви нет провайдера SMS, остальная часть пакета подавляется с причиной `no_provider`.
- Текст формирует `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, обрезанный до одного сегмента в 160 символов.
- Каждый получатель получает собственную строку `reminderSentLog` с `channel: "sms"` и статусом `sent` / `suppressed` / `failed`, которая хранится отдельно от строки push/email, поэтому неудачное SMS никогда не вызывает повторной отправки push или email.

Редакторы предлагают **Текст** только тогда, когда `GET /messaging/texting/status` возвращает `{ enabled: true }` (включён первый провайдер SMS церкви).

**Отказ через STOP.** `POST /messaging/texting/inbound/:churchId/:token` -- анонимный webhook, который церковь вставляет в своего провайдера (B1Admin показывает URL из `GET /messaging/texting/inboundUrl` в настройках текстовых сообщений). Токен -- это HMAC от ID церкви (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` принимает поля формы в стиле Twilio и JSON в стиле Clearstream/TextInChurch. Если ответ точно совпадает со стоп-словом оператора (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), каждому неудалённому человеку в церкви, чей мобильный номер совпадает, выставляются `people.optedOut = true` и `allowSms = false`. Остальные ответы подтверждаются и игнорируются.

Внутренняя шина событий реагирует на изменения сущностей, не дожидаясь ночного развёртывания: события контента (через диспетчер webhook) и события обновления плана/задачи запускают немедленное повторное развёртывание или отмену для затронутой сущности, а обновление плана также повторно развёртывает определения области, связанные с типом плана.

### Адаптеры {#adapters}

Движок не зависит от типа сущности; каждый поддерживаемый тип сущности подключается через адаптер (`helpers/adapters/`):

| Тип сущности | Адаптер | Примечания |
|-------------|---------|-----------|
| `event` | `EventReminderAdapter` | Получатели ограничены зарегистрированными или участниками группы -- в зависимости от мероприятия и `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Получатели -- назначения со статусом Accepted и Unconfirmed в опубликованных (не черновых) планах. Назначения Unconfirmed, выданные через workflow подтверждения служения, исключаются до принятия (см. ниже). `buildEmails` вызывает `DoingModuleGateway.buildPlanReminderEmails`, который формирует позиции, заметки и пользовательское сообщение через `doing/helpers/PlanReminderEmailHelper`, включая кнопки Accept/Decline, подписанные `ReminderTokenHelper`, которые отправляются на публичный endpoint ответа на назначение. |
| `task` | `TaskReminderAdapter` | Получатели -- исполнители задачи. |

### Эндпоинты {#endpoints}

| Метод | Путь | Назначение |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Загрузить или сохранить определение напоминания для одной сущности. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Загрузить или сохранить определение напоминания уровня области (унаследованное). |
| `DELETE` | `/messaging/reminders/:defId` | Удалить определение и отменить его ожидающие вхождения. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Предпросмотр количества получателей и следующих сроков срабатывания напоминания о мероприятии до сохранения. |
| `GET` | `/messaging/reminders/log` | История недавних вхождений напоминаний для церкви. |
| `POST` | `/messaging/reminders/mute` | Заглушить напоминания для конкретной сущности. |

Сохранение определения запускает синхронное повторное развёртывание для этой сущности или области, поэтому редакторы видят актуальные «следующие срабатывания» без ожидания ночной задачи.

## Личные сообщения {#direct-messages}

Личные сообщения идут через ту же воронку, что и всё остальное, а не через отдельный путь эскалации. Для каждой непрочитанной переписки создаётся одна **теневая строка** в `notifications` (`contentType='privateMessage'`, `contentId` = ID личного сообщения, `category='direct_messages'`), которая владеет всем состоянием доставки -- эскалацией через socket/push/email, отслеживанием прочтения, всем остальным. Таблица `privateMessages` хранит только содержимое сообщения и столбец `notifyPersonId` -- он служит источником счётчика непрочитанных и сбрасывается, когда получатель прочитает переписку.

Теневые строки невидимы для колокольчика уведомлений: они исключаются из запроса счётчика непрочитанных, из запроса списка уведомлений и из запросов отметки прочтения и удаления, которые все фильтруют по `contentType <> 'privateMessage'`. Каждое уведомление о личном сообщении пингует socket независимо от статуса прочтения (семантика живого чата -- без дедупликации), а личные сообщения никогда не останавливаются на доставке через socket, как обычные уведомления, так как фоновое PWA может держать socket открытым, но по-прежнему нуждаться в push на уровне ОС. Если человек заглушил уведомления о личных сообщениях, теневая строка приостанавливается (`isNew=false`, `notifyPersonId` сбрасывается) -- она по-прежнему видна внутри самой переписки, только без значков и оповещений.

## Настройки и шлюз {#preferences--gating}

Каждая отправка проходит через `PreferenceGateHelper.evaluate()` -- чистую функцию (всё состояние передаётся на вход, без обращений к БД на горячем пути), которая возвращает `allow`, `suppress` или `defer`. Слои выполняются по порядку, и решает первый, который принимает решение:

1. **Заблокированная категория** -- некоторые категории обязательны (уровень 0) и обходят все остальные слои.
2. **Общее отключение / отключение канала** -- `masterMute`, `allowPush`, `allowSms` (по умолчанию выключено -- участники подписываются сами) или `emailFrequency='never'` подавляют отправку сразу.
3. **Тихие часы** -- только push и SMS (email считается ненавязчивым). Если текущее местное время человека попадает в его тихое окно, транзакционная категория всё равно проходит; нетранзакционная откладывается до конца тихого окна, вычисленного как корректный с учётом перехода на летнее время момент UTC через `TimezoneHelper.wallClockToUtc`.
4. **Переопределение настроек категории** -- явный отказ для пары категория × канал; отсутствие записи означает значение категории по умолчанию.
5. **Заглушение сущности** -- заглушение, записанное для конкретной сущности (например, одного мероприятия или одного плана), ограничивает сильнее, чем настройка на уровне категории, но применяется только когда вызывающий код передаёт ID/тип сущности вместе с уведомлением.

Задействованные таблицы: `notificationPreferences` (глобальные -- `masterMute`, `emailFrequency` со значениями `individual|daily|weekly|never`, `allowPush`, окно тихих часов и часовой пояс, `allowSms`), `notificationPreferenceOverrides` (на пару категория × канал) и `notificationEntityMutes` (на сущность).

Этот шлюз применяется для уведомлений в приложении (уровень 0), push (уровень 1) и email (уровень 2) внутри воронки -- включая немедленные письма-напоминания и дайджесты -- а также для текстов-напоминаний в `ReminderEngine.sendSms()`. Транзакционные email (коды входа, сброс пароля, приглашения, квитанции о пожертвованиях) обходят его по замыслу; для этого и существует вторая дверь.

### Workflow подтверждения служения {#serving-confirmation-workflows}

План может подключить workflow `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Тогда Publish/Notify вызывает `POST /doing/plans/:id/issueRequests` вместо уведомления по каждому назначению: каждое новое назначение Unconfirmed получает `notified` + `confirmationWorkflowId` и одну карточку рабочего процесса (`tasks.assignmentId`, уникальный `followupKey`). Карточка отправляет оповещение только в приложение (`appOnly: true` -- без эскалации в push/email), затем выполняет действия workflow `sendAssignmentRequest`, которые проходят через `MessagingModuleGateway.sendServingWorkflowMessage`: email -- через `NotificationHelper.sendWorkflowEmail` (шлюз настроек + `ChurchEmailLimiter`, учитывается как `workflowEmail`), SMS -- через `sendPersonText` только при `allowSms` и проверке категории `serving_schedule`. Accept/Decline (`assignment.updated` в шине событий) закрывает карточку; таймер на 30 минут (`AssignmentWorkflowHelper.processPending`) исправляет пропущенные старты и события и превращает неотвеченный запрос к сроку follow-up в задачу проверки для руководителя. Полный жизненный цикл: `Api/docs/assignment-confirmation-workflows.md`.

## Лимиты email, написанного церковью {#church-authored-email-limits}

Письмо, содержание которого написала церковь, отправляется с общей идентичности SES ChurchApps, поэтому оно учитывается по каждой церкви через `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Четыре пути обращаются к нему: отправка группам/по шаблону (`EmailTemplateController`, тип контента `email`), письма-продолжения формы (`FormSubmissionController`, `formFollowUp`), действие рабочего процесса **Send email** (`NotificationHelper` с `churchAuthored`, `workflowEmail`) и письма с запросом подтверждения служения (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Системная почта (коды входа, квитанции, напоминания) и приглашения в роли и группы (`UserController.sendInviteEmail`, фиксированный шаблон) не учитываются.

- **Шлюз одобрения.** Церковь ничего не отправляет, пока серверный администратор не установит `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → чип **Group Email**). Архивные церкви всегда заблокированы. Диалог Send Email в B1Admin читает `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) и, если церковь не одобрена, показывает карточку **Request review** вместо редактора. Редактор шагов рабочего процесса читает тот же endpoint (открыт и для `tasks.admin`, и для `groupMembers.edit`), чтобы предупреждать о действиях **Send email**, когда церковь не одобрена или приостановлена. Во время отправки `MessagingModuleGateway.sendTemplatedEmail` возвращает `false` без создания уведомления, если `ChurchEmailLimiter.remaining()` меньше 1, поэтому история карточки никогда не покажет **Email sent** для письма, которое было отброшено. `POST /messaging/emailTemplates/requestApproval` отправляет письмо в поддержку не чаще одного раза в неделю для каждой церкви.
- **Заработанный лимит.** Одобренная церковь получает `max(150, 2 × its best church-authored day in the prior 30 days)`, но не более 2 000 за скользящие 24 часа. Текущие 24 часа исключаются из расчёта «лучшего дня», чтобы всплеск не мог поднять собственный лимит.
- **Резерв, затем расчёт.** `reserve()` записывает по одной строке `deliveryLogs` на получателя до отправки, повторно проверяет лимит с учётом этих строк и откатывается, если два запроса одновременно прошли лимит (отправка возвращает 429). `settle()` помечает каждую строку как отправленную или неудачную.
- **Приостановка из-за жалоб.** Лямбда `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, получает данные от SES → SNS) привязывает каждый постоянный отказ или жалобу к той церкви, чьё письмо с контентом церкви дошло до этого адреса примерно в то же время, и сохраняет их как `deliveryMethod` `sesBounce` / `sesComplaint`. Церковь приостанавливается при 2 и более жалобах (≥ 0,3% отправок) или 10 и более жёстких отказах (≥ 5%) за 7 дней.

## Планирование {#scheduling}

И движок напоминаний, и пакетный дайджест уведомлений работают по уже существующим регулярным таймерам, не вводя новой инфраструктуры:

| Таймер | Расписание | Что выполняет |
|-------|----------|------|
| Таймер на 30 минут | каждые 30 минут | Эскалирует непрочитанные уведомления; отправляет дайджесты email с частотой `individual`; диспетчеризирует подошедшие вхождения напоминаний (`ReminderEngine.scan`); письма с одобрениями; запускает подошедшие автоматизации |
| Таймер на 1 минуту (`timerWebhooks`) | каждую минуту | Отправляет запланированные push-уведомления, которые пришло время отправить (`ScheduledNotificationHelper.dispatchDue`, задача `scheduledNotifications`) |
| Ночной таймер | 05:00 UTC | Ночные напоминания о посещаемости групп; продвигает повторяющиеся потоковые службы; обновляет автоматически обновляемые списки; разворачивает вхождения напоминаний на следующий горизонт (`ReminderEngine.expandAll`); отправляет дайджесты email с частотой `daily` |

Локально ту же логику можно запустить вручную командами `npm run timer:30min` и `npm run timer:midnight` из проекта `Api`.

## Перечень файлов {#file-inventory}

| Область | Файлы |
|------|-------|
| Воронка | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Общая точка входа | `Api/src/shared/helpers/NotificationService.ts` |
| Транзакционная дверь | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, правило линтера `Api/tools/eslint-rules/email-door.cjs` |
| Лимиты email церкви | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Движок напоминаний | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| SMS / отказ через STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (рассылка **Text Volunteers** в обзоре служения) |
| Репозитории напоминаний | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email для служения/планов | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Редакторы напоминаний (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Редактор напоминаний / настройки (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Связанные страницы {#related-pages}

- [Архитектура реального времени](../realtime.md) -- протокол WebSocket и клиентские примитивы (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), на которых работает доставка в приложении
- [Web Push-уведомления](../web-push.md) -- настройка VAPID и путь браузерного Push API, который используется на уровне push
- [Эндпоинты обмена сообщениями](../api/endpoints/messaging.md) -- полный REST-интерфейс для сообщений, переписок, соединений и маршрутов уведомлений/напоминаний
