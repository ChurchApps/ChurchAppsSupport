---
title: "Архитектура уведомлений и напоминаний"
description: "Как API B1 Admin направляет уведомления, запланированные напоминания, лимиты email церкви и отказы от SMS через единую воронку доставки и шлюз настроек."
---

# Архитектура уведомлений и напоминаний

<div class="article-intro">

Каждое сообщение, которое видит участник за пределами страницы, на которой он находится, -- счётчик в значке, push-уведомление, ежедневная сводка по email -- проходит через одну из двух дверей в MessagingApi. На этой странице описаны воронка, движок напоминаний, который подаёт в неё сообщения по расписанию, и модель настроек, которая решает, что именно дойдёт до человека.

</div>

## Обзор -- две двери

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
scheduled staff push ─▶ scheduledNotifications (1-minute timer) ───────────┤
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Всё, что сообщает человеку что-либо**, проходит через `NotificationHelper.createNotifications()` в модуле сообщений. Он сохраняет строку в `notifications` и эскалирует доставку socket → push → email, проверяя `PreferenceGateHelper` для каждого канала -- включая `in_app` на уровне 0.
2. **Всё запланированное** -- это `reminderDefinition` (на уровне сущности или области), которое разворачивается в `reminderOccurrences` и отправляется через `ReminderEngine.scan()` по регулярному таймеру. Один расширитель, один диспетчер, один журнал отправок (`reminderSentLog`). Единственное исключение -- push, запланированный сотрудником на странице B1Admin **Мобильное приложение > Push-уведомления** или в диалоге **Уведомить** группы: это строка `scheduledNotifications` (аудитория `church` или `group`), которую отправляет `ScheduledNotificationHelper.dispatchDue()` по таймеру раз в минуту. Строка, которая при первой попытке опоздала больше чем на 30 минут относительно `sendAt`, помечается как неудачная с причиной `missed send window`, а не отправляется с опозданием; неудачная отправка повторяется до 3 раз. Получатели определяются в момент отправки `PushAudienceHelper` -- тем же помощником, который использует немедленная групповая отправка, -- и доставляются через `createNotifications()` как `churchPushNotification` (категория настроек `announcements`) или `groupPushNotification`.
3. **Прямая email-отправка** существует только за `TransactionalEmailHelper.sendTransactional()`. Правило ESLint проверяет это на этапе компиляции -- см. ниже.

:::tip Дверь для email защищена линтером, а не только соглашением
`Api/tools/eslint-rules/email-door.cjs` определяет правило `no-direct-email-helper`: любой вызов `EmailHelper.sendTemplatedEmail()` или `EmailHelper.sendEmail()` вне `NotificationHelper.ts` или `TransactionalEmailHelper.ts` не проходит линт. Если нужно отправить email, направьте его через воронку (`createNotifications` с `emailImmediate`) или через `TransactionalEmailHelper.sendTransactional()` -- третьего пути, который проходит CI, нет.
:::

## Воронка уведомлений

`NotificationHelper.createNotifications()` -- единая точка входа для всего, что не запланировано и не является транзакционным:

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

Для каждого получателя сохраняется строка в `notifications`, и вызывается `attemptDeliveryWithEscalation`, который проходит по лестнице каналов ниже. Строка, которая ещё не прочитана, для той же пары `(contentType, contentId)` подавляет повторное создание -- эта защита от дублей пропускается для отправок `emailImmediate` (смещения напоминаний, массовая email-отправка сотрудником, шаги процесса управляют собственной защитой от дублей) и для личных сообщений, которые всегда отправляют сигнал в сокет.

`shared/helpers/NotificationService.ts` повторяет ту же сигнатуру (`NotificationServiceOptions`) для вызывающих вне модуля сообщений и регистрируется в модуле сообщений при запуске.

## Цепочка эскалации каналов

Доставка начинается с уровня (по умолчанию 0 или выше для напоминаний и явных отправок) и переходит к следующему каналу, только если предыдущий не сработал. Каждый уровень проверяется `PreferenceGateHelper` до того, как что-либо будет отправлено.

| Уровень | Канал | Поведение |
|-------|---------|----------|
| 0 | **in_app / socket** | Сначала проверяется шлюз `in_app`. Если доставка подавлена (отключены уведомления), строка сохраняется с `isNew=false`, и доставка полностью останавливается -- никакого сигнала в сокет, никакого значка, никакой дальнейшей эскалации. В противном случае сервер ищет открытые соединения сокета в комнате `alerts` человека и отправляет кадр `notification` (или `privateMessage`). Для обычных уведомлений успешная доставка через сокет на этом останавливает цепочку -- таймер на 30 минут повторно проверяет непрочитанные элементы и эскалирует их позже. Личные сообщения никогда не останавливаются на сокете: установленное PWA может держать сокет оповещений открытым в фоне, что иначе подавило бы push на уровне ОС. |
| 1 | **push** | Зависит от `allowPush` / отказа от категории / тихих часов. Отправляется как на токены Expo push, так и на подписки Web Push, найденные в строках `devices` человека; дедупликация по endpoint, а также удаление устаревших токенов по ходу работы. |
| 2 | **email** | Зависит от `emailFrequency` и отказа от категории. Немедленные отправки (`emailImmediate`) отображаются сразу и записывают строку в `deliveryLogs`; в остальных случаях уведомление остаётся ожидающим для пакетной сводки, описанной ниже. |
| — | **sms** | Не уровень лестницы эскалации. Единственный шлюзованный производитель SMS -- движок напоминаний: когда `channels` определения включают `sms`, `ReminderEngine.sendSms()` отправляет SMS каждому получателю **в дополнение** к push/email-уведомлению (см. [Текстовые напоминания](#text-reminders)). Массовая отправка SMS (`TextingController` / `@churchapps/texting`), отправка **Отправить SMS волонтёрам** в обзоре служения (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) и действие шага процесса **Отправить SMS** (`StepActionHelper.sendText` → `sendPersonText`) отправляют SMS напрямую через провайдера церкви, поэтому настройки уведомлений и тихие часы на них не действуют -- учитывается только флаг `optedOut` человека. |

Непрочитанные уведомления, оставшиеся на уровне socket или push, эскалируются таймером на 30 минут (`NotificationHelper.escalateDelivery`). Пакетные email отправляет `NotificationHelper.sendEmailNotifications(frequency)`, которым управляет настройка `emailFrequency` каждого человека: `individual` работает по таймеру на 30 минут, `daily` -- по ночному таймеру. (`weekly` -- допустимое значение настройки, но отдельного пакетного запуска для него пока нет.)

## Движок напоминаний

Запланированные напоминания -- напоминания о мероприятиях, сроки задач, напоминания о назначениях на служение и планы -- все проходят через один обобщённый движок, а не через собственную логику cron для каждой функции.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Определения** (`reminderDefinitions`) бывают либо на уровне сущности (задан `entityId` -- конкретное мероприятие, задача или план), либо на уровне области (`entityId` пуст, задан `scopeId` -- например, каждый план внутри типа планов служения). Определение содержит CSV смещений в минутах (`offsets`, например `"1440,60"` для одного дня и одного часа до), местное время отправки (`sendLocalTime`), CSV каналов (`channels` -- включая `email`, который запускает немедленное богатое письмо в момент отправки), `recipientMode` и необязательное пользовательское `message`.

**Расширение** материализует строки срабатываний на предстоящий горизонт (скользящее окно из нескольких дней). Оно запускается по ночному таймеру и синхронно при каждом сохранении определения, чтобы напоминание о мероприятии, созданном в последний момент, всё равно сработало. Определения на уровне области расширяются через `loadScopeEntities` адаптера, создавая набор вхождений для каждой конкретной сущности; вхождения на уровне сущности используют ключ `definitionId:occurrenceISO:offset`, а вхождения области группируются по ID сущности, поэтому никогда не конфликтуют. Вставка вхождения **восстанавливает** ранее отменённую строку -- отмена с последующим повторным расширением является стандартным способом пересинхронизировать напоминание после изменения базовой сущности; строки со статусом `sent`, `failed` или `processing` не трогаются.

**Отправка** (`ReminderEngine.scan()`) запускается по таймеру на 30 минут. Она захватывает наступившие вхождения (аренда не даёт обработать их дважды), загружает получателей через адаптер сущности, отфильтровывает тех, кто уже записан в `reminderSentLog` для этого вхождения, и вызывает `createNotifications` с `deliveryStartLevel: 1` (сразу переход к push) плюс `emailImmediate`/`emailByPerson`, если каналы определения включают email.

### Текстовые напоминания {#text-reminders}

Когда `channels` определения включают `sms`, `scan()` вызывает `ReminderEngine.sendSms()` после создания push/email-уведомлений для тех же свежих получателей. Текст отправляется только тем, кто дал согласие:

- Каждый получатель проходит через `PreferenceGateHelper.evaluate(..., "sms", ...)`, поэтому `allowSms` должен быть включён (по умолчанию выключен и устанавливается переключателем **Текстовые сообщения** в B1App), а канал `sms` категории не должен быть отключён в настройках. `event_reminders`, `serving_schedule` и `tasks` перечисляют `sms` и в `defaultChannels`, и в `allowedChannels`.
- Люди без `mobilePhone` или с установленным `optedOut` исключаются. Если у церкви нет провайдера SMS, весь оставшийся пакет подавляется с причиной `no_provider`.
- Текст формирует `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, обрезанный до одного сегмента в 160 символов.
- Каждый получатель получает отдельную строку `reminderSentLog` с `channel: "sms"` и статусом `sent` / `suppressed` / `failed`, которая хранится отдельно от строки push/email, поэтому неудачная SMS никогда не повторяет push или email.

Редакторы предлагают **SMS** только тогда, когда `GET /messaging/texting/status` возвращает `{ enabled: true }` (первый провайдер SMS церкви включён).

**Отказ от SMS (STOP).** `POST /messaging/texting/inbound/:churchId/:token` -- анонимный webhook, который церковь вставляет в своего провайдера (B1Admin показывает URL из `GET /messaging/texting/inboundUrl` в настройках SMS). Токен -- это HMAC от ID церкви (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` принимает поля формы в стиле Twilio и JSON в стиле Clearstream/TextInChurch; если ответ точно совпадает с каким-либо стоп-словом оператора (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), каждому неудалённому человеку в церкви, чей мобильный номер совпадает, устанавливаются `people.optedOut = true` и `allowSms = false`. Другие ответы подтверждаются и игнорируются.

Внутренняя шина событий реагирует на изменения сущностей, не дожидаясь ночного расширения: события контента (через диспетчер webhook) и события обновления плана/задачи немедленно запускают повторное расширение или отмену для затронутой сущности, а обновление плана также повторно расширяет определения области, связанные с типом этого плана.

### Адаптеры

Движок не зависит от типа сущности: каждый поддерживаемый тип сущности подключается через адаптер (`helpers/adapters/`):

| Тип сущности | Адаптер | Примечания |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Получатели ограничены зарегистрированными или участниками группы в зависимости от мероприятия и `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Получатели -- назначения со статусом Accepted и Unconfirmed в опубликованных (не черновых) планах. Назначения Unconfirmed, выданные через процесс подтверждения служения, исключаются, пока их не примут (см. ниже). `buildEmails` вызывает `DoingModuleGateway.buildPlanReminderEmails`, который формирует позиции, заметки и пользовательское сообщение через `doing/helpers/PlanReminderEmailHelper`, включая кнопки «Принять» и «Отклонить», подписанные `ReminderTokenHelper`, которые отправляют запрос на публичный эндпоинт ответа на назначение. |
| `task` | `TaskReminderAdapter` | Получатели -- исполнители задачи. |

### Эндпоинты

| Метод | Путь | Назначение |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Загрузить или сохранить определение напоминания для одной сущности. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Загрузить или сохранить определение напоминания уровня области (унаследованное). |
| `DELETE` | `/messaging/reminders/:defId` | Удалить определение и отменить его ожидающие вхождения. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Предпросмотр количества получателей и ближайших времён срабатывания напоминания о мероприятии до сохранения. |
| `GET` | `/messaging/reminders/log` | История недавних вхождений напоминаний для церкви. |
| `POST` | `/messaging/reminders/mute` | Отключить напоминания для конкретной сущности. |

Сохранение определения запускает синхронное повторное расширение для этой сущности или области, поэтому редакторы видят актуальные «следующие срабатывания» без ожидания ночного задания.

## Прямые сообщения

Личные сообщения идут по той же воронке, что и всё остальное, а не по отдельному пути эскалации. Каждая непрочитанная беседа получает одну **теневую строку** в `notifications` (`contentType='privateMessage'`, `contentId` = ID личного сообщения, `category='direct_messages'`), которая владеет всем состоянием доставки -- эскалацией socket/push/email, отслеживанием прочтения и всем остальным. Сама таблица `privateMessages` хранит полезную нагрузку сообщения и колонку `notifyPersonId`, которая является источником счётчика непрочитанных и сбрасывается, когда получатель прочитает беседу.

Теневые строки невидимы для колокольчика уведомлений: они исключаются из запроса счётчика непрочитанных, из запроса списка уведомлений и из запросов пометки прочитанного/удаления, которые все фильтруют `contentType <> 'privateMessage'`. Каждый сигнал личного сообщения отправляется в сокет независимо от состояния прочтения (семантика живого чата -- без дедупликации), и личные сообщения никогда не останавливаются на доставке через сокет, как обычные уведомления, поскольку PWA в фоне может держать сокет открытым, но всё равно нуждается в push на уровне ОС. Если человек отключает уведомления о личных сообщениях, теневая строка переводится в неактивное состояние (`isNew=false`, `notifyPersonId` сбрасывается) -- она по-прежнему видна внутри самой беседы, но без значков и оповещений.

## Настройки и шлюз

Каждая отправка проходит через `PreferenceGateHelper.evaluate()` -- чистую функцию (всё состояние передаётся на вход, без обращений к БД на горячем пути), которая возвращает `allow`, `suppress` или `defer`. Уровни выполняются по порядку, и первый, который принимает решение, побеждает:

1. **Заблокированная категория** -- некоторые категории обязательны (уровень 0) и обходят все остальные уровни.
2. **Общее отключение / отключение канала** -- `masterMute`, `allowPush`, `allowSms` (по умолчанию выключен -- участники дают согласие) или `emailFrequency='never'` подавляют отправку полностью.
3. **Тихие часы** -- только push и SMS (email считается ненавязчивым). Если текущее время на часах человека попадает в его тихое окно, транзакционная категория всё равно проходит; нетранзакционная откладывается до конца тихого окна, вычисляемого как корректный с учётом перехода на летнее время момент UTC через `TimezoneHelper.wallClockToUtc`.
4. **Переопределение настроек по категории** -- явный отказ для пары «категория × канал»; при отсутствии записи действует значение категории по умолчанию.
5. **Отключение для конкретной сущности** -- отключение, записанное для конкретной сущности (например, одного мероприятия или одного плана), ограничивает отправку сильнее, чем настройка на уровне категории, но применяется только тогда, когда вызывающая сторона передаёт ID сущности и её тип вместе с уведомлением.

Задействованные таблицы: `notificationPreferences` (глобальные -- `masterMute`, `emailFrequency` со значениями `individual|daily|weekly|never`, `allowPush`, окно тихих часов и часовой пояс, `allowSms`), `notificationPreferenceOverrides` (по паре категория × канал) и `notificationEntityMutes` (по сущности).

Этот шлюз применяется для in-app (уровень 0), push (уровень 1) и email (уровень 2) внутри воронки -- включая немедленные письма напоминаний и сводок -- а также для текстовых напоминаний в `ReminderEngine.sendSms()`. Транзакционные email (коды авторизации, сброс пароля, приглашения, квитанции о пожертвованиях) намеренно обходят его; именно для этого существует вторая дверь.

### Процессы подтверждения служения

План может подключить процесс `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Публикация/Уведомление тогда вызывает `POST /doing/plans/:id/issueRequests` вместо уведомления по каждому назначению: каждое новое назначение Unconfirmed получает `notified` + `confirmationWorkflowId` и одну карточку процесса (`tasks.assignmentId`, уникальный `followupKey`). Карточка отправляет оповещение только в приложении (`appOnly: true` -- без эскалации push/email), затем выполняет действия процесса `sendAssignmentRequest`, которые проходят через `MessagingModuleGateway.sendServingWorkflowMessage`: email -- через `NotificationHelper.sendWorkflowEmail` (шлюз настроек + `ChurchEmailLimiter`, учитывается как `workflowEmail`), SMS -- через `sendPersonText` только при `allowSms` и шлюзе категории `serving_schedule`. Accept/Decline (`assignment.updated` на шине событий) закрывает карточку; таймер на 30 минут (`AssignmentWorkflowHelper.processPending`) исправляет пропущенные старты и события и превращает неотвеченный запрос к сроку ответа в задачу проверки для руководителя. Полный жизненный цикл: `Api/docs/assignment-confirmation-workflows.md`.

## Лимиты email, которые пишет церковь

Письма, содержание которых написала церковь, отправляются с общей идентичности SES ChurchApps, поэтому они учитываются для каждой церкви через `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Четыре пути обращаются к нему: отправки группам/по шаблонам (`EmailTemplateController`, тип контента `email`), письма после отправки формы (`FormSubmissionController`, `formFollowUp`), действия процесса **Отправить письмо** (`NotificationHelper` с `churchAuthored`, `workflowEmail`) и письма с запросами подтверждения служения (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Системная почта (коды авторизации, квитанции, напоминания) и приглашения в роли и группы (`UserController.sendInviteEmail`, фиксированный шаблон) не учитываются.

- **Шлюз одобрения.** Церковь ничего не отправляет, пока серверный администратор не установит `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → метка **Group Email**). Архивные церкви всегда заблокированы. Диалог «Отправить письмо» в B1Admin читает `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) и, если церковь не одобрена, показывает карточку **Запросить проверку** вместо редактора. Редактор шага процесса читает тот же эндпоинт (доступен и `tasks.admin`, и `groupMembers.edit`), чтобы предупреждать о действиях **Отправить письмо**, когда церковь не одобрена или приостановлена. В момент отправки `MessagingModuleGateway.sendTemplatedEmail` возвращает `false`, не создавая уведомления, когда `ChurchEmailLimiter.remaining()` меньше 1, поэтому история карточки никогда не показывает **Письмо отправлено** для отброшенного письма. `POST /messaging/emailTemplates/requestApproval` отправляет письмо в поддержку не чаще одного раза в неделю на церковь.
- **Заработанный лимит.** Одобренная церковь получает `max(150, 2 × её лучший день с письмами, написанными церковью, за предыдущие 30 дней)`, но не больше 2 000 за скользящие 24 часа. Текущие 24 часа исключаются из расчёта «лучшего дня», чтобы всплеск не повышал собственный лимит.
- **Резервирование, затем фиксация.** `reserve()` записывает одну строку `deliveryLogs` на каждого получателя до отправки, повторно проверяет лимит с учётом этих строк и откатывает, если два запроса одновременно прошли лимит (отправка возвращает 429). `settle()` помечает каждую строку как отправленную или неудачную.
- **Приостановка при жалобах.** Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, данные из SES → SNS) привязывает каждый постоянный отказ или жалобу к церкви, письмо которой, написанное церковью, дошло до этого адреса примерно в то же время; сохраняется как `deliveryMethod` `sesBounce` / `sesComplaint`. Церковь приостанавливается при 2+ жалобах (≥ 0,3% отправок) или 10+ жёстких отказах (≥ 5%) за 7 дней.

## Планирование

Движок напоминаний и пакетная сводка уведомлений используют существующие запланированные таймеры, а не вводят новую инфраструктуру:

| Таймер | Расписание | Что запускает |
|-------|----------|------|
| Таймер на 30 минут | каждые 30 минут | Эскалирует непрочитанные уведомления; отправляет сводки email с частотой `individual`; отправляет наступившие вхождения напоминаний (`ReminderEngine.scan`); сводки одобрений; наступившие выполнения автоматизаций |
| Таймер на 1 минуту (`timerWebhooks`) | каждую минуту | Отправляет наступившие запланированные push-уведомления (`ScheduledNotificationHelper.dispatchDue`, задание `scheduledNotifications`) |
| Ночной таймер | 05:00 UTC | Напоминания о групповой посещаемости; продвижение повторяющихся трансляций; обновление списков с автообновлением; расширение вхождений напоминаний на следующий горизонт (`ReminderEngine.expandAll`); отправка сводок email с частотой `daily` |

Локально ту же логику можно запустить вручную командами `npm run timer:30min` и `npm run timer:midnight` из проекта `Api`.

## Перечень файлов

| Область | Файлы |
|------|-------|
| Воронка | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Общая точка входа | `Api/src/shared/helpers/NotificationService.ts` |
| Транзакционная дверь | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, правило линтера `Api/tools/eslint-rules/email-door.cjs` |
| Лимиты email церкви | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Движок напоминаний | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| SMS / отказ STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (**Отправить SMS волонтёрам** в обзоре служения) |
| Репозитории напоминаний | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email для служений/планов | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Редакторы напоминаний (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Редактор напоминаний / настройки (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Связанные страницы

- [Архитектура реального времени](../realtime.md) -- протокол WebSocket и клиентские примитивы (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), на которых работает доставка на уровне in-app
- [Web Push-уведомления](../web-push.md) -- настройка VAPID и путь через браузерный Push API, используемый уровнем эскалации push
- [Эндпоинты сообщений](../api/endpoints/messaging.md) -- полный REST-интерфейс для сообщений, бесед, соединений и маршрутов уведомлений/напоминаний
