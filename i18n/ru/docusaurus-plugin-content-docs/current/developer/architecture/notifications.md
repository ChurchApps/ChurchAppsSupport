---
title: "Архитектура уведомлений и напоминаний"
---

# Архитектура уведомлений и напоминаний

<div class="article-intro">

Каждое сообщение, которое видит член церкви вне страницы, которую он просматривает — значок уведомления, push-уведомление, письмо со сводкой — проходит через одну из двух дверей в MessagingApi. На этой странице описана воронка, механизм напоминаний, который питает ее по расписанию, и модель предпочтений, которая определяет, что на самом деле достигает человека.

</div>

## Обзор — две двери

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Все, что сообщает человеку информацию**, проходит через `NotificationHelper.createNotifications()` в модуле сообщений. Это сохраняет строку `notifications` и масштабирует socket → push → email, оценивая `PreferenceGateHelper` для каждого канала — включая `in_app` на уровне 0.
2. **Все запланированное** — это `reminderDefinition` (на уровне сущности или области) расширенное в `reminderOccurrences` и отправляемое `ReminderEngine.scan()` по повторяющемуся таймеру. Один расширитель, один диспетчер, один реестр отправок (`reminderSentLog`).
3. **Прямая почта** существует только за `TransactionalEmailHelper.sendTransactional()`. Правило ESLint обеспечивает это во время компиляции — см. ниже.

:::tip Почтовая дверь обеспечена lint-правилами, а не просто соглашением
`Api/tools/eslint-rules/email-door.cjs` определяет `no-direct-email-helper`: любой вызов `EmailHelper.sendTemplatedEmail()` или `EmailHelper.sendEmail()` вне `NotificationHelper.ts` или `TransactionalEmailHelper.ts` не пройдет проверку lint. Если вам нужно отправить письмо, направьте его через воронку (`createNotifications` с `emailImmediate`) или через `TransactionalEmailHelper.sendTransactional()` — третьего пути, который проходит CI, не существует.
:::

## Воронка уведомлений

`NotificationHelper.createNotifications()` — единая точка входа для всего, что не запланировано или не трансакционно:

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

Для каждого получателя он сохраняет строку в `notifications` и вызывает `attemptDeliveryWithEscalation`, которая идет вниз по лестнице каналов ниже. Неразмещенная строка для одного и того же `(contentType, contentId)` подавляет пересоздание — эта защита от дублирования пропускается для отправок `emailImmediate` (смещения напоминаний, персонала "email all", шаги рабочих процессов имеют собственное дублирование) и для прямых сообщений, которые всегда пингуют сокет.

`shared/helpers/NotificationService.ts` отражает ту же подпись (`NotificationServiceOptions`) для вызывающих объектов вне модуля обмена сообщениями и зарегистрирован в модуле обмена сообщениями при загрузке.

## Цепь эскалации каналов

Доставка начинается с уровня (0 по умолчанию или выше для напоминаний/явных отправок) и переходит к следующему каналу только если предыдущий не прошел. Каждый уровень защищен `PreferenceGateHelper` перед любой попыткой.

| Level | Channel | Behavior |
|-------|---------|----------|
| 0 | **in_app / socket** | Сначала проверяется gate `in_app`. Если подавлено (отключено), строка сохраняется с `isNew=false` и доставка полностью прекращается — нет пинга сокета, нет значка, без дальнейшей эскалации. В противном случае сервер ищет открытые соединения сокета для комнаты `alerts` человека и отправляет фрейм `notification` (или `privateMessage`). Для обычных уведомлений успешная доставка по сокету прекращает цепь здесь — 30-минутный таймер повторно проверяет непрочитанные элементы и масштабирует их позже. Прямые сообщения никогда не останавливаются на сокете: установленное PWA может держать сокет оповещений открытым в фоне, что в противном случае подавило бы push-уведомление на уровне ОС. |
| 1 | **push** | Защищено на `allowPush` / категория отказа / тихие часы. Отправляет на токены Expo push и подписки Web Push, найденные в строках `devices` человека, дедублируя по конечной точке и удаляя устаревшие токены по пути. |
| 2 | **email** | Защищено на `emailFrequency` и категория отказа. Немедленные отправки (`emailImmediate`) отображаются сразу и записывают строку `deliveryLogs`; в противном случае уведомление остается в ожидании для пакетной сводки, описанной ниже. |
| — | **sms** | Предпочтительная коммуникация (`allowSms`, списки каналов для каждой категории) уже учитывают SMS-канал, но ни один производитель не отправляет через него сегодня — он остается зарезервирован для продукта массовой SMS, который работает как отдельный изолированный поток через `TextingController` / `@churchapps/texting`. Действие шага рабочего процесса **Send Text** (`StepActionHelper.sendText` → `MessagingModuleGateway.sendPersonText`) также обходит эту воронку: он отправляет текст человека на карточке напрямую через поставщика церкви, поэтому предпочтения уведомлений и тихие часы не применяются — уважается только флаг `optedOut` человека. |

Непрочитанные уведомления, оставленные на сокете или push, масштабируются 30-минутным таймером (`NotificationHelper.escalateDelivery`). Пакетная почта отправляется `NotificationHelper.sendEmailNotifications(frequency)`, управляемая предпочтением `emailFrequency` каждого человека: `individual` работает на 30-минутном таймере, `daily` работает на ночном таймере. (`weekly` — допустимое значение предпочтения, но у него нет специального пакетного запуска.)

## Механизм напоминаний

Запланированные напоминания — напоминания о событиях, сроки выполнения задач, напоминания о назначении служб/плана — все проходят через один универсальный механизм, а не специализированную логику крон для каждой функции.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Определения** (`reminderDefinitions`) — это либо уровень сущности (`entityId` установлен — конкретное событие, задача или план), либо уровень области (`entityId` null, `scopeId` установлен — например, каждый план под типом плана служения). Определение содержит CSV смещений минут (`offsets`, например `"1440,60"` за один день и один час до), локальное время отправки (`sendLocalTime`), CSV каналов (`channels` — включение `email` запускает немедленную насыщенную почту в момент отправки), `recipientMode` и необязательное пользовательское `message`.

**Расширение** материализует строки срабатывания для горизонта вперед (окно с прокручиванием на несколько дней). Это работает на ночном таймере и синхронно при каждом сохранении определения, так что напоминание о последнем событии все равно срабатывает. Определения области развертываются через `loadScopeEntities` адаптера, создавая один набор событий на конкретную сущность; события на уровне сущности используют ключ `definitionId:occurrenceISO:offset`, в то время как события в области имеют пространство имен по id сущности, поэтому они никогда не сталкиваются. Повышение события **воскрешает** ранее отмененную строку — отмена-затем-переразложение — стандартный способ пересинхронизации напоминания после изменения базовой сущности; строки, уже `sent`, `failed` или `processing`, остаются нетронутыми.

**Диспетчеризация** (`ReminderEngine.scan()`) работает на 30-минутном таймере. Это требует обработки непокрытых событий (аренда предотвращает двойную обработку), загружает получателей через адаптер сущности, отфильтровывает любого, уже записанного в `reminderSentLog` для этого события, и вызывает `createNotifications` с `deliveryStartLevel: 1` (переход прямо к push) плюс `emailImmediate`/`emailByPerson`, когда каналы определения включают почту.

Внутренняя шина событий реагирует на мутации сущности без ожидания ночного расширения: события содержимого (через диспетчер webhook) и события обновления плана/задачи запускают немедленное переразложение или отмену для затронутой сущности, и обновление плана также переразлагает любые определения области, привязанные к его типу плана.

### Адаптеры

Механизм агностичен к сущности; каждый поддерживаемый тип сущности подключается через адаптер (`helpers/adapters/`):

| Entity type | Adapter | Notes |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Получатели ограничены зарегистрированными лицами или членами групп в зависимости от события и `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Получатели — это принятые и неподтвержденные назначения плана. `buildEmails` вызывает `DoingModuleGateway.buildPlanReminderEmails`, который отображает позиции, примечания и пользовательское сообщение через `doing/helpers/PlanReminderEmailHelper`, включая кнопки Принять/Отклонить, подписанные `ReminderTokenHelper`, которые публикуются на открытой конечной точке ответа назначения. |
| `task` | `TaskReminderAdapter` | Получатели — исполнители задачи. |

### Конечные точки

| Method | Path | Purpose |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Загрузить или сохранить определение напоминания для одной сущности. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Загрузить или сохранить определение напоминания на уровне области (наследуемое). |
| `DELETE` | `/messaging/reminders/:defId` | Удалить определение и отменить его ожидающие события. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Предпросмотр количества получателей и следующих сроков срабатывания напоминания о событии перед сохранением. |
| `GET` | `/messaging/reminders/log` | История недавних событий напоминаний для церкви. |
| `POST` | `/messaging/reminders/mute` | Отключить напоминания для конкретной сущности. |

Сохранение определения запускает синхронное переразложение для этой сущности или области, поэтому редакторы видят актуальные "next fires" без ожидания ночного задания.

## Прямые сообщения

Прямые сообщения используют ту же воронку, что и все остальное, а не отдельный путь эскалации. Каждый непрочитанный разговор получает одну **теневую строку** в `notifications` (`contentType='privateMessage'`, `contentId` = идентификатор приватного сообщения, `category='direct_messages'`), которая владеет всем состоянием доставки — эскалация socket/push/email, отслеживание чтения, все. Таблица `privateMessages` сама по себе сохраняет полезную нагрузку сообщения и столбец `notifyPersonId`, который является источником непрочитанного значка и очищается при чтении получателем разговора.

Теневые строки невидимы для колокола уведомлений: они исключены из запроса количества непрочитанных, запроса списка уведомлений и запросов отметить как прочитанное/удалить, все из которых отфильтровывают `contentType <> 'privateMessage'`. Каждый пинг DM попадает на сокет независимо от состояния непрочитанного (семантика живого чата — нет дедублирования), и DM никогда не останавливаются при доставке сокета так же, как обычные уведомления, поскольку фоновое PWA может держать сокет открытым, в то же время нуждаясь в push-уведомлении на уровне ОС. Если человек отключает уведомления DM, теневая строка припаркована (`isNew=false`, `notifyPersonId` очищена) — все еще видна внутри разговора, просто без значков или оповещений.

## Предпочтения и регулирование

Каждая отправка проходит через `PreferenceGateHelper.evaluate()`, чистую функцию (все состояние передано, без вызовов БД на горячем пути), которая возвращает `allow`, `suppress` или `defer`. Слои работают по порядку, и первый, который решает, побеждает:

1. **Заблокированная категория** — некоторые категории являются обязательными (уровень 0) и обходят все остальные слои.
2. **Основное отключение / убийство канала** — `masterMute`, `allowPush`, `allowSms` или `emailFrequency='never'` подавляют безоговорочно.
3. **Тихие часы** — только push и SMS (почта считается неинтрузивной). Если текущее настенное время в часовом поясе человека попадает в его тихое окно, трансакционная категория все равно проходит; нетрансакционная отсрочивается до конца тихого окна, рассчитывается как правильная с DST UTC-метка через `TimezoneHelper.wallClockToUtc`.
4. **Переопределение предпочтений по категориям** — явный отказ для одной пары категория × канал; отсутствие означает значение по умолчанию для категории.
5. **Отключение для конкретной сущности** — отключение, записанное для конкретной сущности (например, одного события, одного плана), ограничивает дальше, чем параметр на уровне категории, но применяется только когда вызывающий объект предоставляет идентификатор сущности/тип вместе с уведомлением.

Задействованные таблицы: `notificationPreferences` (глобальные — `masterMute`, `emailFrequency` из `individual|daily|weekly|never`, `allowPush`, окно тихих часов + часовой пояс, `allowSms`), `notificationPreferenceOverrides` (по категориям × канал) и `notificationEntityMutes` (по сущностям).

Эти gate обеспечиваются для in-app (уровень 0), push (уровень 1) и email (уровень 2) внутри воронки — включая немедленную почту напоминаний/сводок. Трансакционная почта (коды аутентификации, сброс пароля, приглашения, квитанции о пожертвованиях) обходит ее по замыслу; это вся цель второй двери.

## Ограничения на почту, составленную церковью

Почта, содержимое которой написала церковь, отправляется с общего идентификатора SES ChurchApps, поэтому она ограничена для каждой церкви по `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Четыре пути вызывают это: отправка группы/шаблонов (`EmailTemplateController`, тип содержимого `email`), последующие письма отправки формы (`FormSubmissionController`, `formFollowUp`), действия **Send email** рабочих процессов (`NotificationHelper` с `churchAuthored`, `workflowEmail`) и приглашения счета B1 (`UserController.sendInviteEmail`, `invite`). Системная почта (коды аутентификации, квитанции, напоминания) не ограничена.

- **Ворота утверждения.** Церковь ничего не отправляет, пока администратор сервера не установит `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** chip). Архивированные церкви всегда заблокированы. Диалог Send Email в B1Admin читает `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) и, когда он не одобрен, показывает карточку **Request review** вместо редактора. `POST /messaging/emailTemplates/requestApproval` отправляет поддержку, максимум один раз в неделю на одну церковь.
- **Заработанный лимит.** Одобренная церковь получает `max(150, 2 × its best church-authored day in the prior 30 days)`, максимум 2000 за прокручиваемые 24 часа. Текущие 24 часа исключены из "лучшего дня", поэтому всплеск не может поднять свой собственный лимит.
- **Зарезервировать, затем урегулировать.** `reserve()` записывает одну строку `deliveryLogs` на получателя перед отправкой, повторно проверяет пособие с этими строками, считаемыми, и отступает, если два запроса прошли мимо лимита (отправка возвращает 429). `settle()` отмечает каждую строку отправленной или неудачной.
- **Пауза жалоб.** Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, питаемая SES → SNS) закрепляет каждый постоянный отскок или жалобу на церковь, чей автор письма церкви достиг этого адреса примерно в это время, сохраненный как `deliveryMethod` `sesBounce` / `sesComplaint`. Церковь приостановлена при 2+ жалобах (≥ 0.3% отправок) или 10+ жестких отскоков (≥ 5%) в течение 7 дней.

## Планирование

Как механизм напоминаний, так и дайджест уведомлений используют существующие запланированные таймеры, а не вводят новую инфраструктуру:

| Timer | Schedule | Runs |
|-------|----------|------|
| 30-minute timer | every 30 minutes | Масштабировать непрочитанные уведомления; отправить дайджестную почту с частотой `individual`; отправить непокрытые события напоминаний (`ReminderEngine.scan`); дайджесты одобрения; исполнение просрочки автоматизации |
| Nightly timer | 05:00 UTC | Напоминания о посещаемости группы; продвигают повторяющиеся потоковые услуги; обновляют списки с автоматическим обновлением; расширяют события напоминаний на следующий горизонт (`ReminderEngine.expandAll`); отправляют дайджестную почту с частотой `daily` |

Локально, ту же логику можно запустить по требованию с помощью `npm run timer:30min` и `npm run timer:midnight` из проекта `Api`.

## Инвентарь файлов

| Area | Files |
|------|-------|
| Funnel | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Shared entry | `Api/src/shared/helpers/NotificationService.ts` |
| Transactional door | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint rule `Api/tools/eslint-rules/email-door.cjs` |
| Church email limits | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Reminder engine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Reminder repositories | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Serving/plan email | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Reminder editors (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Reminder editor / preferences (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Related Pages

- [Real-time Architecture](../realtime) — WebSocket-протокол и примитивы клиента (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), на которых ездит уровень доставки в приложение
- [Web Push Notifications](../web-push) — настройка VAPID и путь браузера Push API, используемый уровнем эскалации push
- [Messaging Endpoints](../api/endpoints/messaging) — полная поверхность REST для сообщений, разговоров, соединений и маршрутов уведомлений/напоминаний
