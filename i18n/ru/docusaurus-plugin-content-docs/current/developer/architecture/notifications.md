---
title: "Архитектура уведомлений и напоминаний"
---

# Архитектура уведомлений и напоминаний

<div class="article-intro">

Каждое сообщение, которое видит член церкви вне страницы, на которую он смотрит — счетчик значков, push-уведомление, дайджест эмейл — проходит через одну из двух дверей в MessagingApi. На этой странице задокументирован воронка, механизм напоминания, который питает его по расписанию, и модель предпочтений, которая решает, что действительно достигает человека.

</div>

## Обзор — две двери

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Всё, что информирует человека** проходит через `NotificationHelper.createNotifications()` в модуле обмена сообщениями. Это сохраняет строку `notifications` и переводит socket → push → email, оценивая `PreferenceGateHelper` для каждого канала — включая `in_app` на уровне 0.
2. **Всё запланированное** — это `reminderDefinition` (на уровне сущности или на уровне области действия) расширенное на `reminderOccurrences` и отправленное `ReminderEngine.scan()` на повторяющемся таймере. Один расширитель, один диспетчер, один журнал отправки (`reminderSentLog`).
3. **Прямой email** существует только за `TransactionalEmailHelper.sendTransactional()`. Правило ESLint обеспечивает это во время компиляции — см. ниже.

:::tip Дверь email вводится ESLint, а не просто соглашением
`Api/tools/eslint-rules/email-door.cjs` определяет `no-direct-email-helper`: любой вызов `EmailHelper.sendTemplatedEmail()` или `EmailHelper.sendEmail()` вне `NotificationHelper.ts` или `TransactionalEmailHelper.ts` не пройдет lint. Если вам нужно отправить email, маршрутизируйте его через воронку (`createNotifications` с `emailImmediate`) или через `TransactionalEmailHelper.sendTransactional()` — нет третьего способа, который прошел бы CI.
:::

## Воронка уведомлений

`NotificationHelper.createNotifications()` — единственная точка входа для всего, что не запланировано или трансакционно:

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

Для каждого получателя он сохраняет строку в `notifications` и вызывает `attemptDeliveryWithEscalation`, которая проходит по цепочке каналов ниже. Неочищенная строка с тем же `(contentType, contentId)` подавляет пересоздание — эта охрана дедупликации пропускается для отправок `emailImmediate` (смещения напоминаний, персонал "email все", этапы рабочего процесса владеют своей собственной дедупликацией) и для прямых сообщений, которые всегда пингуют socket.

`shared/helpers/NotificationService.ts` зеркалит ту же подпись (`NotificationServiceOptions`) для вызывающих абонентов вне модуля обмена сообщениями и зарегистрирован с модулем обмена сообщениями при загрузке.

## Цепь эскалации каналов

Доставка начинается на уровне (0 по умолчанию, или выше для напоминаний/явных отправок) и переходит к следующему каналу только если предыдущий не преуспел. Каждый уровень контролируется `PreferenceGateHelper` перед попыткой чего-либо.

| Уровень | Канал | Поведение |
|-------|---------|----------|
| 0 | **in_app / socket** | Сначала проверяется ворота `in_app`. Если подавлено (отключено звук), строка сохраняется с `isNew=false` и доставка полностью останавливается — никого socket ping, никаких значков, никакой дальнейшей эскалации. В противном случае сервер ищет открытые подключения socket для комнаты `alerts` человека и pushает `notification` (или `privateMessage`) frame. Для обычных уведомлений успешная доставка socket останавливает цепь здесь — таймер на 30 минут повторно проверяет неочищенные элементы и переводит их позже. Прямые сообщения никогда не останавливаются на socket: установленное PWA может держать socket alerts открытым в фоновом режиме, что в противном случае подавило бы push на уровне ОС. |
| 1 | **push** | Контролируется на `allowPush` / категория opt-out / тихие часы. Отправляет и в токены Expo push и в подписки Web Push, найденные на строках `devices` человека, дедупликируя по конечной точке и прочищая устаревшие токены по пути. |
| 2 | **email** | Контролируется на `emailFrequency` и категория opt-out. Немедленные отправки (`emailImmediate`) отображают прямо сейчас и записывают строку `deliveryLogs`; в противном случае уведомление оставляется в ожидании пакетного дайджеста, описанного ниже. |
| — | **sms** | Предпочтения сантехники (`allowSms`, на список каналов категории) уже учитывают канал SMS, но никакой продюсер не отправляет через него сегодня — он остается зарезервирован для продукта массовой SMS, который работает как отдельный, отделенный поток через `TextingController` / `@churchapps/texting`. |

Неочищенные уведомления, оставленные на socket или push, переводятся таймером на 30 минут (`NotificationHelper.escalateDelivery`). Пакетный email отправляется `NotificationHelper.sendEmailNotifications(frequency)`, управляемый предпочтением `emailFrequency` каждого человека: `individual` работает на таймере на 30 минут, `daily` работает на ночном таймере. (`weekly` — это действительное значение предпочтения, но у него нет своего запуска пакета пока.)

## Механизм напоминания

Запланированные напоминания — напоминания о событиях, сроки задач, напоминания о назначениях обслуживания/плана — все идут через один обобщенный механизм, а не специфичную логику cron для каждой функции.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Определения** (`reminderDefinitions`) либо на уровне сущности (`entityId` установлен — конкретное событие, задача или план) либо на уровне области действия (`entityId` null, `scopeId` установлен — например каждый план под типом плана обслуживания). Определение несет CSV смещений в минутах (`offsets`, например `"1440,60"` для одного дня и одного часа ранее), локальное время отправки (`sendLocalTime`), CSV каналов (`channels` — включая `email` запускает немедленный, богатый email во время отправки), режим получателя (`recipientMode`) и необязательное пользовательское `message`.

**Расширение** материализует строки пожаров для горизонта впереди (катящееся окно с несколькими днями). Это работает на ночном таймере, и синхронно всякий раз когда определение сохраняется, поэтому напоминание о последней минуте события все еще срабатывает. Определения области действия вентилируются через адаптер `loadScopeEntities`, производя один набор результатов по конкретной сущности; результаты на уровне сущности используют ключ `definitionId:occurrenceISO:offset`, в то время как результаты с областью действия пространство имен по id сущности, поэтому они никогда не сталкиваются. Повышение результата **воскрешает** ранее отмененную строку — отмена-затем-повторное-расширение — это стандартный способ повторно-синхронизировать напоминание после изменения основной сущности; строки уже `sent`, `failed` или `processing` остаются нетронутыми.

**Отправка** (`ReminderEngine.scan()`) работает на таймере на 30 минут. Она претендует на причитающиеся результаты (аренда предотвращает двойную обработку), загружает получателей через адаптер сущности, фильтрует всех, уже записанных в `reminderSentLog` для этого результата, и вызывает `createNotifications` с `deliveryStartLevel: 1` (пропустить прямо на push) плюс `emailImmediate`/`emailByPerson` когда каналы определения включают email.

Внутренняя шина событий реагирует на мутации сущностей без ожидания ночного расширения: события контента (через диспетчер вебхука) и события обновления плана/задачи срабатывают немедленное повторное-расширение или отмену для влияющей сущности, и обновление плана также повторно-расширяет любые определения области действия, привязанные к типу плана.

### Адаптеры

Механизм не зависит от сущности; каждый поддерживаемый тип сущности подключается через адаптер (`helpers/adapters/`):

| Тип сущности | Адаптер | Заметки |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Получатели ограничены регистрантам или членам группы в зависимости от события и `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Получатели — это принятые + неподтвержденные назначения плана. `buildEmails` вызывает в `DoingModuleGateway.buildPlanReminderEmails`, которое отображает позиции, заметки и пользовательское сообщение через `doing/helpers/PlanReminderEmailHelper`, включая кнопки Accept/Decline подписанные `ReminderTokenHelper`, которые отправляют на публичную конечную точку ответа назначения. |
| `task` | `TaskReminderAdapter` | Получатели — это назначенные на задачу. |

### Конечные точки

| Метод | Путь | Назначение |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Загрузить или сохранить определение напоминания для одной сущности. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Загрузить или сохранить определение напоминания на уровне области действия (наследуемое). |
| `DELETE` | `/messaging/reminders/:defId` | Удалить определение и отменить его ожидающие результаты. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Предварительный просмотр количества получателей и следующих сроков срабатывания для напоминания о событии перед сохранением. |
| `GET` | `/messaging/reminders/log` | Недавняя история возникновения напоминания для церкви. |
| `POST` | `/messaging/reminders/mute` | Отключить напоминания для конкретной сущности. |

Сохранение определения запускает синхронное повторное-расширение для этой сущности или области действия, поэтому редакторы видят обновленные "следующие срабатывания" без ожидания ночного задания.

## Прямые сообщения

Прямые сообщения используют ту же воронку, что и всё остальное, вместо отдельного пути эскалации. Каждый неочищенный разговор получает одну **теневую строку** в `notifications` (`contentType='privateMessage'`, `contentId` = id приватного сообщения, `category='direct_messages'`), которая владеет всем состоянием доставки — socket/push/email эскалация, отслеживание чтения, всё. Таблица `privateMessages` сама сохраняет полезную нагрузку сообщения и колонку `notifyPersonId`, что является источником неочищенного значка и очищается когда получатель читает разговор.

Теневые строки невидимы для колокола уведомлений: они исключены из запроса количества неочищенных, запроса списка уведомлений и запросов mark-read/delete, все из которых фильтруют `contentType <> 'privateMessage'`. Каждый DM ping попадает на socket независимо от неочищенного состояния (прямая семантика чата — нет дедупликации), и DMs никогда не останавливаются на доставке socket по пути обычных уведомлений, так как fondue PWA может держать socket открытым в фоне и все еще нуждаться в push на уровне ОС. Если человек отключает уведомления DM, теневая строка припаркована (`isNew=false`, `notifyPersonId` очищена) — все еще видимая внутри разговора сам, просто без значков или алертов.

## Предпочтения и управление

Каждая отправка проходит через `PreferenceGateHelper.evaluate()`, чистую функцию (все состояние передано, никаких вызовов БД на горячем пути), которая возвращает `allow`, `suppress` или `defer`. Слои работают по порядку, и первый который решает, побеждает:

1. **Заблокированная категория** — некоторые категории обязательные (tier 0) и обходят любой другой слой.
2. **Главное отключение / kill канала** — `masterMute`, `allowPush`, `allowSms` или `emailFrequency='never'` подавляют напрямую.
3. **Тихие часы** — только push и SMS (email считается неинтрузивным). Если текущее настенное время в timezone человека попадает в их тихое окно, трансакционная категория все еще пройдет; нетрансакционная отложена до конца тихого окна, вычисленная как DST-правильный UTC instant через `TimezoneHelper.wallClockToUtc`.
4. **Переопределение предпочтения для категории** — явный opt-out для одного канала × категории; отсутствие означает default категории.
5. **Отключение на уровне сущности** — отключение записанное против конкретной сущности (например одно событие, один план) ограничивает далее, чем установка на уровне категории, но применяется только когда вызывающий предоставляет id/type сущности вместе с уведомлением.

Таблицы причастные: `notificationPreferences` (глобальные — `masterMute`, `emailFrequency` из `individual|daily|weekly|never`, `allowPush`, окно тихих часов + timezone, `allowSms`), `notificationPreferenceOverrides` (по категории × канал), и `notificationEntityMutes` (по сущности).

Эти ворота вводятся для in-app (уровень 0), push (уровень 1) и email (уровень 2) внутри воронки — включая немедленные эмейлы напоминаний/дайджеста. Трансакционный email (коды аутентификации, сброс пароля, приглашения, квитанции пожертвований) обходит его по дизайну; вот вся суть второй двери.

## Ограничения email написанные церковью

Email, содержание которого церковь написала, выходит из общей идентичности ChurchApps SES, поэтому это дозировано за церковь по `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Четыре пути вызывают это: группа/шаблон отправляет (`EmailTemplateController`, тип контента `email`), follow-up письма отправок формы (`FormSubmissionController`, `formFollowUp`), действия рабочего процесса **Send email** (`NotificationHelper` с `churchAuthored`, `workflowEmail`), и приглашения B1 аккаунта (`UserController.sendInviteEmail`, `invite`). Системные письма (коды аутентификации, квитанции, напоминания) не дозированы.

- **Ворота одобрения.** Церковь ничего не отправляет пока администратор сервера не установит `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → чип **Group Email**). Архивные церкви всегда заблокированы. Диалог Send Email B1Admin читает `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) и когда неодобрено, показывает карточку **Request review** вместо редактора. `POST /messaging/emailTemplates/requestApproval` отправляет поддержку, максимум один раз за церковь за неделю.
- **Заработанное allowance.** Одобренная церковь получает `max(150, 2 × её лучший день написанного церковью за последние 30 дней)`, ограничено 2,000 за катящиеся 24 часа. Текущие 24 часа исключены из "лучшего дня" так что рывок не может поднять свой собственный лимит.
- **Резерв, затем разрешение.** `reserve()` записывает один `deliveryLogs` ряд по получателю перед отправкой, повторно-проверяет allowance с этими рядами учтенными, и отступает если две просьбы преодолели лимит (отправка возвращает 429). `settle()` отмечает каждый ряд отправлен или не удался.
- **Жалоба пауза.** `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, кормила SES → SNS) пригвождает каждый постоянный отскок или жалобу к церкви, чей написанный церковью email достиг этого адреса около того времени, хранится как `deliveryMethod` `sesBounce` / `sesComplaint`. Церковь паузирована в 2+ жалобы (≥ 0.3% отправок) или 10+ жестких отскоков (≥ 5%) в течение 7 дней.

## Планирование

Оба механизм напоминания и дайджест уведомлений используют существующие запланированные таймеры, а не вводят новую инфраструктуру:

| Таймер | Расписание | Запуски |
|-------|----------|------|
| Таймер на 30 минут | каждые 30 минут | Переводит неочищенные уведомления; отправляет эмейлы дайджеста `individual`-частоты; отправляет причитающиеся результаты напоминания (`ReminderEngine.scan`); одобрения дайджеста; причитающихся автоматизаций |
| Ночной таймер | 05:00 UTC | Напоминания о посещении группы; продвигает повторяющиеся потоковые услуги; обновляет автообновления списков; расширяет результаты напоминания для следующего горизонта (`ReminderEngine.expandAll`); отправляет эмейлы дайджеста `daily`-частоты |

Локально, та же логика может быть срабатывана по требованию с `npm run timer:30min` и `npm run timer:midnight` из проекта `Api`.

## Инвентарь файлов

| Площадь | Файлы |
|------|-------|
| Воронка | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Общая точка входа | `Api/src/shared/helpers/NotificationService.ts` |
| Трансакционная дверь | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, правило lint `Api/tools/eslint-rules/email-door.cjs` |
| Ограничения email церкви | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Механизм напоминания | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Хранилища напоминаний | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email обслуживания/плана | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Редакторы напоминаний (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Редактор напоминаний / предпочтения (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Связанные страницы

- [Real-time Architecture](../realtime) — протокол WebSocket и примитивы клиента (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), на которых работает уровень доставки in-app
- [Web Push Notifications](../web-push) — установка VAPID и путь браузера Push API, используемый уровнем эскалации push
- [Messaging Endpoints](../api/endpoints/messaging) — полная поверхность REST для сообщений, разговоров, соединений и маршрутов уведомлений/напоминаний
