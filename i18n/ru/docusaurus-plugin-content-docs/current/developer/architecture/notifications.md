---
title: "Архитектура уведомлений и напоминаний"
---

# Архитектура уведомлений и напоминаний

<div class="article-intro">

Каждое сообщение, которое член церкви видит вне страницы, на которой он находится, — счётчик непрочитанных, push-уведомление, сводное письмо, — проходит через одну из двух дверей в MessagingApi. На этой странице описана эта воронка, движок напоминаний, который по расписанию её наполняет, и модель настроек, которая определяет, что на самом деле дойдёт до человека.

</div>

## Обзор — две двери

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Всё, что сообщает человеку какую-либо информацию**, проходит через `NotificationHelper.createNotifications()` в модуле messaging. Метод сохраняет строку в таблице `notifications` и последовательно переходит от сокета к push и email, проверяя `PreferenceGateHelper` для каждого канала, включая `in_app` на уровне 0.
2. **Всё запланированное** представляет собой `reminderDefinition` (на уровне сущности или области), которое разворачивается в `reminderOccurrences` и отправляется через `ReminderEngine.scan()` по периодическому таймеру. Один разворачиватель, один диспетчер и один журнал отправок (`reminderSentLog`).
3. **Прямая отправка email** возможна только через `TransactionalEmailHelper.sendTransactional()`. Правило ESLint обеспечивает это на этапе компиляции — см. ниже.

:::tip Дверь для email контролируется линтером, а не только соглашением
`Api/tools/eslint-rules/email-door.cjs` определяет правило `no-direct-email-helper`: любой вызов `EmailHelper.sendTemplatedEmail()` или `EmailHelper.sendEmail()` вне `NotificationHelper.ts` или `TransactionalEmailHelper.ts` не проходит линтер. Если нужно отправить email, направляйте его через воронку (`createNotifications` с `emailImmediate`) или через `TransactionalEmailHelper.sendTransactional()` — третьего способа, который проходит CI, нет.
:::

## Воронка уведомлений

`NotificationHelper.createNotifications()` — единая точка входа для всего, что не запланировано и не является транзакционным:

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

Для каждого получателя сохраняется строка в `notifications`, и вызывается `attemptDeliveryWithEscalation`, который проходит по лестнице каналов, описанной ниже. Непрочитанная строка с тем же `(contentType, contentId)` подавляет повторное создание — эта проверка на дубликаты пропускается для отправок с `emailImmediate` (смещения напоминаний, «email всем» от сотрудников, шаги workflow, которые сами управляют дедупликацией) и для личных сообщений, которые всегда отправляют сигнал через сокет.

`shared/helpers/NotificationService.ts` повторяет ту же сигнатуру (`NotificationServiceOptions`) для вызывающего кода за пределами модуля messaging и регистрируется в модуле messaging при запуске.

## Лестница каналов доставки

Доставка начинается с какого-то уровня (по умолчанию 0, или выше для напоминаний и явных отправок) и переходит к следующему каналу только если предыдущий не сработал. Перед каждой попыткой уровень проверяется через `PreferenceGateHelper`.

| Уровень | Канал | Поведение |
|-------|---------|----------|
| 0 | **in_app / socket** | Сначала проверяется шлюз `in_app`. Если доставка подавлена (уведомления выключены), строка сохраняется с `isNew=false`, и доставка полностью прекращается — без сигнала через сокет, без значка, без дальнейшей эскалации. В противном случае сервер находит открытые сокет-соединения для комнаты `alerts` данного человека и отправляет кадр `notification` (или `privateMessage`). Для обычных уведомлений успешная доставка через сокет останавливает цепочку на этом уровне — таймер на 30 минут повторно проверяет непрочитанные элементы и эскалирует их позже. Личные сообщения никогда не останавливаются на сокете: установленное PWA может держать сокет оповещений открытым в фоне, что иначе подавило бы push на уровне ОС. |
| 1 | **push** | Проверяется `allowPush`, отказ от категории и тихие часы. Отправляется как на push-токены Expo, так и на подписки Web Push, найденные в строках `devices` данного человека, с дедупликацией по endpoint и удалением устаревших токенов по пути. |
| 2 | **email** | Проверяется `emailFrequency` и отказ от категории. Немедленные отправки (`emailImmediate`) формируются сразу и записывают строку в `deliveryLogs`; в остальных случаях уведомление остаётся в ожидании пакетной сводки, описанной ниже. |
| — | **sms** | Не является уровнем в лестнице эскалации. Единственный контролируемый источник SMS — движок напоминаний: когда `channels` определения включает `sms`, `ReminderEngine.sendSms()` отправляет текст каждому получателю **в дополнение к** push/email-уведомлению (см. [Текстовые напоминания](#text-reminders)). Массовая рассылка SMS (`TextingController` / `@churchapps/texting`), отправка **Text Volunteers** из обзора служения (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) и действие шага workflow **Send Text** (`StepActionHelper.sendText` → `sendPersonText`) отправляют текст напрямую через провайдера церкви, поэтому настройки уведомлений и тихие часы на них не действуют — учитывается только флаг `optedOut` человека. |

Непрочитанные уведомления, оставшиеся на уровне socket или push, эскалируются таймером на 30 минут (`NotificationHelper.escalateDelivery`). Пакетные письма отправляет `NotificationHelper.sendEmailNotifications(frequency)`, и запускается он в соответствии с настройкой `emailFrequency` каждого человека: `individual` выполняется по таймеру на 30 минут, `daily` — по ночному таймеру. (`weekly` — допустимое значение настройки, но отдельного пакетного запуска для него пока нет.)

## Движок напоминаний

Запланированные напоминания — о событиях, сроках задач, назначениях на служение и план — все проходят через один обобщённый движок, а не через отдельную логику cron для каждой функции.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Определения** (`reminderDefinitions`) бывают либо уровня сущности (`entityId` задан — конкретное событие, задача или план), либо уровня области (`entityId` пуст, `scopeId` задан — например, все планы в рамках типа плана служения). Определение содержит CSV со смещениями в минутах (`offsets`, например `"1440,60"` — за один день и за один час до события), местное время отправки (`sendLocalTime`), CSV каналов (`channels` — `email` означает немедленное богатое письмо в момент отправки), `recipientMode` и необязательное пользовательское `message`.

**Развёртывание** материализует строки срабатываний на ближайший горизонт (скользящее окно из нескольких дней). Оно запускается по ночному таймеру, а также синхронно при каждом сохранении определения, чтобы напоминание о событии, назначенном в последний момент, тоже сработало. Определения уровня области разворачиваются через `loadScopeEntities` адаптера, создавая отдельный набор вхождений для каждой конкретной сущности; вхождения уровня сущности используют ключ `definitionId:occurrenceISO:offset`, а вхождения области получают пространство имён по id сущности, чтобы никогда не пересекаться. Обновление вхождения **восстанавливает** ранее отменённую строку — стандартный способ пересинхронизировать напоминание после изменения базовой сущности — отмена и повторное развёртывание. Строки со статусом `sent`, `failed` или `processing` не затрагиваются.

**Диспетчеризация** (`ReminderEngine.scan()`) работает по таймеру на 30 минут. Она захватывает наступившие вхождения (аренда предотвращает двойную обработку), загружает получателей через адаптер сущности, отфильтровывает тех, кто уже записан в `reminderSentLog` для этого вхождения, и вызывает `createNotifications` с `deliveryStartLevel: 1` (сразу к push) плюс `emailImmediate`/`emailByPerson`, если каналы определения включают email.

### Текстовые напоминания

Когда `channels` определения включает `sms`, `scan()` вызывает `ReminderEngine.sendSms()` после создания push/email-уведомлений для тех же новых получателей. Отправка текстов включается отдельно для каждого участника:

- Каждый получатель проходит через `PreferenceGateHelper.evaluate(..., "sms", ...)`, поэтому `allowSms` должен быть включён (по умолчанию он выключен и задаётся переключателем **Text messages** в B1App), а канал `sms` категории не должен быть отключён в настройках. `event_reminders`, `serving_schedule` и `tasks` указывают `sms` и в `defaultChannels`, и в `allowedChannels`.
- Людям без `mobilePhone` или с установленным `optedOut` отправка подавляется. Если у церкви нет провайдера SMS, остальная часть пакета подавляется с причиной `no_provider`.
- Текст формирует `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, обрезанный до одного сегмента в 160 символов.
- Каждый получатель получает собственную строку в `reminderSentLog` с `channel: "sms"` и статусом `sent` / `suppressed` / `failed`, которая хранится отдельно от строки для push/email, поэтому неудачная отправка SMS никогда не повторяет push или email.

Редакторы показывают кнопку **Text** только если `GET /messaging/texting/status` возвращает `{ enabled: true }` (первый провайдер SMS церкви включён).

**Отписка через STOP.** `POST /messaging/texting/inbound/:churchId/:token` — анонимный webhook, который церковь вставляет в настройки своего провайдера (B1Admin показывает URL, полученный из `GET /messaging/texting/inboundUrl`, в настройках texting). Токен — это HMAC от id церкви (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` принимает поля формы в стиле Twilio и JSON в стиле Clearstream/TextInChurch. Если ответ в точности совпадает со стоп-словом оператора (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), каждому неудалённому человеку в церкви, чей мобильный номер совпадает, устанавливается `people.optedOut = true` и `allowSms = false`. Другие ответы подтверждаются и игнорируются.

Внутренняя шина событий реагирует на изменения сущностей, не дожидаясь ночного развёртывания: события контента (через диспетчер webhook) и события обновления плана и задач запускают немедленное повторное развёртывание или отмену для затронутой сущности, а обновление плана также повторно развёртывает определения уровня области, связанные с его типом плана.

### Адаптеры

Движок не зависит от типа сущности; каждый поддерживаемый тип сущности подключается через адаптер (`helpers/adapters/`):

| Тип сущности | Адаптер | Примечания |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Получатели ограничены зарегистрированными участниками или участниками группы в зависимости от события и `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Получатели — назначения со статусами Accepted и Unconfirmed в опубликованных (не черновых) планах. Неподтверждённые назначения, выданные через workflow подтверждения служения, исключаются до их принятия (см. ниже). `buildEmails` обращается к `DoingModuleGateway.buildPlanReminderEmails`, который формирует позиции, заметки и пользовательское сообщение через `doing/helpers/PlanReminderEmailHelper`, включая кнопки «Принять» / «Отклонить», подписанные через `ReminderTokenHelper`, которые отправляют запрос на публичный endpoint ответа на назначение. |
| `task` | `TaskReminderAdapter` | Получатели — исполнители задачи. |

### Endpoints

| Метод | Путь | Назначение |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Загрузить или сохранить определение напоминания для одной сущности. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Загрузить или сохранить определение напоминания уровня области (унаследованное). |
| `DELETE` | `/messaging/reminders/:defId` | Удалить определение и отменить его ожидающие вхождения. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Предпросмотр количества получателей и следующего времени срабатывания напоминания о событии перед сохранением. |
| `GET` | `/messaging/reminders/log` | История недавних срабатываний напоминаний для церкви. |
| `POST` | `/messaging/reminders/mute` | Отключить напоминания для конкретной сущности. |

Сохранение определения запускает синхронное повторное развёртывание для этой сущности или области, чтобы редакторы видели актуальные «следующие срабатывания» без ожидания ночной задачи.

## Личные сообщения

Личные сообщения проходят через ту же воронку, что и всё остальное, а не через отдельный путь эскалации. Каждый непрочитанный диалог получает одну **теневую строку** в `notifications` (`contentType='privateMessage'`, `contentId` = id личного сообщения, `category='direct_messages'`), которая хранит всё состояние доставки — эскалацию через socket/push/email, отслеживание прочтения, всё остальное. Таблица `privateMessages` хранит полезную нагрузку сообщения и столбец `notifyPersonId`, который является источником значка непрочитанных и сбрасывается, когда получатель прочитывает диалог.

Теневые строки невидимы для колокольчика уведомлений: они исключаются из запроса количества непрочитанных, из запроса списка уведомлений и из запросов отметки прочтения и удаления, все из которых фильтруют `contentType <> 'privateMessage'`. Каждое уведомление о личном сообщении отправляется через сокет независимо от состояния непрочитанности (семантика живого чата — без дедупликации), а личные сообщения никогда не останавливаются на доставке через сокет, как обычные уведомления, поскольку PWA в фоне может держать сокет открытым, но всё равно нуждаться в push на уровне ОС. Если человек отключает уведомления о личных сообщениях, теневая строка переводится в неактивное состояние (`isNew=false`, `notifyPersonId` сбрасывается) — она по-прежнему видна внутри самого диалога, но без значков и оповещений.

## Настройки и шлюзы

Каждая отправка проходит через `PreferenceGateHelper.evaluate()` — чистую функцию (всё состояние передаётся на вход, без обращений к БД на горячем пути), которая возвращает `allow`, `suppress` или `defer`. Слои выполняются по порядку, и решение принимает первый, который вынес решение:

1. **Заблокированная категория** — некоторые категории обязательны (уровень 0) и обходят все остальные слои.
2. **Общее отключение / отключение канала** — `masterMute`, `allowPush`, `allowSms` (по умолчанию выключен — участники включают сами) или `emailFrequency='never'` подавляют отправку полностью.
3. **Тихие часы** — только для push и SMS (email считается ненавязчивым). Если текущее время по настенным часам в часовом поясе человека попадает в его тихое окно, транзакционная категория всё равно доходит; нетранзакционная откладывается до конца тихого окна, вычисляемого как корректный для перехода на летнее время момент UTC через `TimezoneHelper.wallClockToUtc`.
4. **Переопределение настроек категории** — явный отказ для пары «категория × канал»; отсутствие записи означает значение по умолчанию для категории.
5. **Отключение для конкретной сущности** — отключение, записанное для конкретной сущности (например, одного события или одного плана), ограничивает сильнее, чем настройка на уровне категории, но применяется только если вызывающая сторона передаёт id/тип сущности вместе с уведомлением.

Задействованные таблицы: `notificationPreferences` (глобальные — `masterMute`, `emailFrequency` со значениями `individual|daily|weekly|never`, `allowPush`, окно тихих часов и часовой пояс, `allowSms`), `notificationPreferenceOverrides` (по паре категория × канал) и `notificationEntityMutes` (по сущности).

Этот шлюз применяется для in-app (уровень 0), push (уровень 1) и email (уровень 2) внутри воронки — включая немедленные письма с напоминаниями и сводками — а также для текстов-напоминаний в `ReminderEngine.sendSms()`. Транзакционные письма (коды авторизации, сброс пароля, приглашения, квитанции о пожертвованиях) намеренно обходят его; именно в этом и смысл второй двери.

### Workflow подтверждения служения

План может подключить workflow `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Кнопка Publish/Notify в таком случае вызывает `POST /doing/plans/:id/issueRequests` вместо уведомления на каждое назначение: каждое новое назначение со статусом Unconfirmed получает `notified` и `confirmationWorkflowId`, а также одну карточку workflow (`tasks.assignmentId`, уникальный `followupKey`). Карточка отправляет оповещение только в приложении (`appOnly: true` — без эскалации на push/email), затем выполняет действия `sendAssignmentRequest` workflow, которые проходят через `MessagingModuleGateway.sendServingWorkflowMessage`: email через `NotificationHelper.sendWorkflowEmail` (шлюз настроек + `ChurchEmailLimiter`, учитывается как `workflowEmail`), SMS через `sendPersonText` — только при `allowSms` и шлюзе категории `serving_schedule`. Принятие или отклонение (`assignment.updated` на шине событий) закрывает карточку; таймер на 30 минут (`AssignmentWorkflowHelper.processPending`) восстанавливает пропущенные запуски и события и превращает неотвеченный запрос к сроку повторного напоминания в задачу проверки для руководителя. Полный жизненный цикл: `Api/docs/assignment-confirmation-workflows.md`.

## Лимиты email, написанного церковью

Письма, содержание которых написала церковь, отправляются с общего идентификатора SES ChurchApps, поэтому они ограничиваются для каждой церкви через `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Этот лимитер вызывается из четырёх путей: рассылки по группам и шаблонам (`EmailTemplateController`, тип содержимого `email`), письма для последующих действий после заполнения форм (`FormSubmissionController`, `formFollowUp`), действие workflow **Send email** (`NotificationHelper` с `churchAuthored`, `workflowEmail`) и письма с запросом подтверждения служения (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Системная почта (коды авторизации, квитанции, напоминания) и приглашения в роли и группы (`UserController.sendInviteEmail`, фиксированный шаблон) не учитываются.

- **Шлюз одобрения.** Церковь ничего не отправляет, пока администратор сервера не установит `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → чип **Group Email**). Архивные церкви всегда заблокированы. Диалог Send Email в B1Admin читает `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) и, если церковь не одобрена, вместо редактора показывает карточку **Request review**. Редактор шага workflow читает тот же endpoint (открыт и для `tasks.admin`, и для `groupMembers.edit`), чтобы предупреждать о действиях **Send email**, когда церковь не одобрена или приостановлена. В момент отправки `MessagingModuleGateway.sendTemplatedEmail` возвращает `false`, не создавая уведомления, если `ChurchEmailLimiter.remaining()` меньше 1, поэтому история карточки никогда не показывает **Email sent** для письма, которое было отброшено. `POST /messaging/emailTemplates/requestApproval` отправляет письмо в поддержку не чаще одного раза в неделю для каждой церкви.
- **Заработанный лимит.** Одобренная церковь получает `max(150, 2 × её лучший день с письмами от церкви за предыдущие 30 дней)`, но не более 2 000 за скользящие 24 часа. Текущие 24 часа исключаются из расчёта «лучшего дня», чтобы всплеск не мог поднять собственный лимит.
- **Резервирование, затем сверка.** `reserve()` записывает по одной строке `deliveryLogs` на каждого получателя до отправки, повторно проверяет лимит с учётом этих строк и откатывается, если два запроса одновременно прошли мимо лимита (отправка возвращает 429). `settle()` помечает каждую строку как отправленную или неудачную.
- **Приостановка из-за жалоб.** Лямбда `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, получает данные из SES → SNS) привязывает каждый постоянный отказ или жалобу к той церкви, чьё письмо с содержимым от церкви дошло до этого адреса примерно в то же время, и сохраняет их как `deliveryMethod` `sesBounce` / `sesComplaint`. Церковь приостанавливается при 2 и более жалобах (≥ 0,3% отправок) или 10 и более жёстких отказах (≥ 5%) за 7 дней.

## Планирование

И движок напоминаний, и сводка уведомлений работают по существующим плановым таймерам, а не вводят новую инфраструктуру:

| Таймер | Расписание | Что запускает |
|-------|----------|----------|
| Таймер на 30 минут | каждые 30 минут | Эскалирует непрочитанные уведомления; отправляет сводные письма с частотой `individual`; отправляет наступившие вхождения напоминаний (`ReminderEngine.scan`); сводки одобрений; наступившие автоматические выполнения |
| Ночной таймер | 05:00 UTC | Напоминания о посещаемости групп; продвигает повторяющиеся трансляции; обновляет списки с автообновлением; разворачивает вхождения напоминаний на следующий горизонт (`ReminderEngine.expandAll`); отправляет сводные письма с частотой `daily` |

Локально ту же логику можно запустить по требованию командами `npm run timer:30min` и `npm run timer:midnight` из проекта `Api`.

## Перечень файлов

| Область | Файлы |
|------|-------|
| Воронка | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Общая точка входа | `Api/src/shared/helpers/NotificationService.ts` |
| Транзакционная дверь | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, правило линтера `Api/tools/eslint-rules/email-door.cjs` |
| Лимиты email церкви | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Движок напоминаний | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| SMS / отписка через STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (**Text Volunteers** в обзоре служения) |
| Репозитории напоминаний | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email для служения и планов | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Редакторы напоминаний (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Редактор напоминаний / настройки (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Связанные страницы

- [Архитектура реального времени](../realtime) — протокол WebSocket и клиентские примитивы (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), на которых работает доставка in-app
- [Web Push-уведомления](../web-push) — настройка VAPID и путь браузерного Push API, используемый уровнем эскалации push
- [Endpoints сообщений](../api/endpoints/messaging) — полный REST-интерфейс для сообщений, диалогов, связей и маршрутов уведомлений и напоминаний
