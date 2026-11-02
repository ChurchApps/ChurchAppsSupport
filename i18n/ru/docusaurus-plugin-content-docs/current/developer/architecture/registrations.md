---
title: "Регистрации на мероприятия"
---

# Регистрации на мероприятия

<div class="article-intro">

Нативная регистрация на мероприятия находится в модуле content и с волной платных регистраций получила полноценную коммерческую модель: типы участников с ценами, платные дополнительные опции, промокоды, платежи через существующий платёжный шлюз церкви и лист ожидания, управляемый статусами. Денежный путь намеренно использует стек пожертвований — контроллер регистрации списывает деньги через ту же абстракцию `GatewayService` / `IGatewayProvider`, что описана в [Пожертвования](./giving), поэтому данные карт и знание SDK шлюза не находятся в модуле content. На этой странице описаны модель данных, правила ценообразования и вместимости, а также сценарии регистрации, оплаты и листа ожидания.

</div>

## Обзор

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (портал участника)     │            │ Api — модуль content                        │
│  мастер регистрации ·        │   HTTPS    │  RegistrationController                     │
│  Мои регистрации             │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (цены на сервере) │
│ B1Admin (сотрудники)         │            │  RegistrationHelper (письма)                │
│  настройки регистрации       │            └───────────────┬─────────────────────────────┘
│  · список · экспорт CSV      │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ общая абстракция шлюзов (giving)            │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Три правила действуют во всём стеке:

1. **Цену определяет сервер.** Клиент передаёт идентификаторы типов, идентификаторы дополнений и количества; `RegistrationPricingHelper.computeTotal()` считает итог на сервере, а купоны повторно проверяются в момент списания. Сумма, переданная клиентом, никогда не принимается на веру.
2. **Вместимость проверяется атомарно при вставке.** Каждая вставка с ограниченной вместимостью использует оператор `INSERT … SELECT … FROM dual WHERE (количество активных строк) < capacity`, поэтому две одновременные регистрации не могут занять последнее место. Количества вычисляются из статуса (`pending`/`confirmed`) и никогда не хранятся.
3. **Платежи идут по рельсам пожертвований.** `RegistrationController` вызывает общий `GatewayService.processCharge` с настроенным шлюзом церкви — та же абстракция провайдера, та же модель токенизации и та же обработка SCA, что и для пожертвований.

## Модель данных (`Api/src/modules/content`)

Модели находятся в `models/Registration.ts`; сопоставления таблиц — в `db/DatabaseTypes.ts`; по одному репозиторию на таблицу в `repositories/`.

| Таблица | Значение | Ключевые поля |
|-------|---------|-----------|
| `registrations` | Одна регистрация (одно домохозяйство или группа на одно мероприятие) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Один участник в регистрации | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Типы участников для мероприятия (например, Adult / Child) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Именованные дополнительные опции с ценой (например, футболка) | eventId, name, description, **price**, **capacity**, **maxQuantity** (ограничение на одну регистрацию), sort, active |
| `registrationSelectionChoices` | Количество выбранного дополнения, сделанное регистрацией или участником | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Одно успешное списание по регистрации | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Промокоды для мероприятия | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Примечания:

- **Отдельной таблицы листа ожидания нет.** Группы в листе ожидания — это строки `registrations` со `status = 'waitlisted'`; весь жизненный цикл листа ожидания — это переходы статуса в одной таблице.
- **Счётчиков не хранится.** Количество «проданных» / «использованных» мест (вместимость мероприятия, вместимость типа, вместимость дополнения, использования купона) вычисляется коррелированными подзапросами по строкам со статусом `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Поэтому отмена регистрации освобождает место без какого-либо учёта.
- Цены хранятся в столбцах MySQL DECIMAL (в передаче по сети — строки) и приводятся через `Number()` внутри помощника по ценообразованию.

## REST-интерфейс

Всё находится под `/content/registrations` (`controllers/RegistrationController.ts`) и защищено `Permissions.registrations` (`view` / `edit`):

| Маршрут | Доступ | Назначение |
|-------|---------|-----------|
| `POST /register` | анонимный | Полная отправка: гость, участник или добавление сотрудником (Add Attendee); ценообразование на сервере, проверки вместимости, необязательное списание |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | публичный | Типы и дополнения с вычисляемыми `used` / `remainingCapacity` для мастера |
| `POST /types`, `DELETE /types/:id` (то же для `/selections`, `/coupons`) | `registrations.edit` | CRUD настроек для сотрудников |
| `POST /coupons/validate` | публичный | Проверка промокода прямо в процессе регистрации |
| `GET /coupons/event/:eventId` | сотрудник | Купоны со счётчиками использования |
| `GET /event/:eventId` · `GET /event/:eventId/count` | сотрудник · публичный | Список участников; количество активных для отображения вместимости |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | авторизованный | Мои регистрации, сведения, история платежей |
| `PUT /:id` | владелец / сотрудник | Редактирование после отправки — заменяет участников и выборы дополнений с новыми атомарными проверками вместимости, пересчитывает `totalAmount`; никогда не списывает и не возвращает деньги автоматически |
| `POST /:id/pay` | владелец | «Завершить оплату»: списывает `totalAmount − amountPaid` и переводит `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | сотрудник | Ручной перевод из листа ожидания |
| `POST /:id/cancel` · `DELETE /:id` | владелец · сотрудник | Отмена / удаление; оба запускают автоматический перевод из листа ожидания |

Если для того же `personId` на том же мероприятии уже есть не отменённая регистрация, возвращается 409, а каждая созданная регистрация отправляет вебхук `registration.created` через `WebhookDispatcher`.

## Цены и промокоды

`helpers/RegistrationPricingHelper.ts` — единственный авторитет по денежным расчётам:

- `computeTotal()` суммирует цену типа каждого участника и `price × quantity` каждого выбора дополнения.
- `validateCoupon()` проверяет признак активности, диапазон дат (`startDate`/`endDate`), `minMembers` относительно размера переданной группы и `maxUses` относительно количества погашений, вычисляемого по статусам.
- `applyDiscount()` — для `percent` вычитает `total × value/100`; для `amount` вычитает `value`; оба варианта не опускаются ниже нуля.

Мастер вызывает `POST /coupons/validate` для мгновенной обратной связи, но `register` повторно проверяет и повторно применяет купон на сервере — итог, показанный клиенту, носит лишь справочный характер.

## Идиома атомарной вместимости

Каждая вставка с ограниченной вместимостью безопасно разрешает гонку без транзакций и блокировок, включая проверку вместимости в саму инструкцию `INSERT`. На уровне мероприятия (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Ноль затронутых строк означает «вместимость исчерпана». Та же идиома защищает вставки по типам (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, считает участников, присоединённых к активным регистрациям) и количества по дополнениям (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, использует `COALESCE(SUM(quantity),0) + ? <= capacity`). Если какая-либо вставка участника или дополнения не удаётся посреди регистрации, контроллер откатывает частичную регистрацию через `deleteCascade()` и сообщает, какой тип или дополнение закончились.

## Сценарий оплаты {#payment-flow}

`processRegistrationCharge` в контроллере — единственное место, где регистрации касаются денег, и это тонкий клиент стека пожертвований:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Токенизация происходит в браузере точно так же, как для пожертвований (см. [Пожертвования](./giving)): мастер использует реестр платёжных провайдеров apphelper, поэтому вошедшие участники могут платить сохранёнными картами, а гости токенизируют новую карту. Контроллер повторяет особенности провайдеров из `DonateController` (идентификаторы способов оплаты Kingdom Funding `pm-{id}`, ответы Stripe SCA `requires_action`, которые возвращаются клиенту без записи платежа). Успешное списание записывает строку `registrationPayments`, увеличивает `amountPaid` и подтверждает регистрацию. **Возвраты не реализованы** — отменённая платная регистрация сохраняет свои строки платежей, а возврат выполняется вне системы, в панели шлюза.

Оба входа проходят через один и тот же код: `register` (оплата при регистрации) и `pay` (оплата остатка / завершение листа ожидания).

`register` пропускает списание в двух случаях и сохраняет регистрацию как `pending` с `amountPaid = 0`, оставляя полную сумму как остаток к оплате:

- **Добавление сотрудником (Add Attendee).** В теле передаётся `personId`, который не является идентификатором вызывающего, нет `guestInfo`, а у вызывающего есть `registrations.edit` в этой церкви. Человек должен существовать (иначе 404), фильтр членов домохозяйства обходится, и деньги не списываются.
- **Нет шлюза.** У церкви не настроен платёжный шлюз (`hasGateway` проверяет через `gateway.loadAll`). На шаге оплаты в B1App вместо формы карты показывается кнопка **Register and Pay Later**.

Гостевые платные регистрации (без `au.id`) должны содержать `captchaPass` из `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (теперь в `shared/helpers`) выполняется непосредственно перед списанием, поэтому регистрации в лист ожидания и бесплатные регистрации не затрагиваются. Если `CAPTCHA_ENFORCE=true`, а пропуск отсутствует или недействителен, новая регистрация откатывается через `deleteCascade()`, и вызов возвращает 403. `RegistrationPaymentForm` в B1App показывает гостям флажок reCAPTCHA и отправляет пропуск вместе и с сохранением карты, и с регистрацией.

## Жизненный цикл листа ожидания

Когда мероприятие заполнено и флаг `waitlistEnabled` мероприятия включён, `register` сохраняет участников как `waitlisted` (пропуская проверки вместимости) и отправляет обычное письмо-подтверждение с пометкой о месте в листе ожидания. Перевод из листа происходит тремя способами — `cancel`, `delete` и эндпоинт сотрудника `promote` — и все они сходятся в `RegistrationRepo.promoteFromWaitlist`, который выбирает самую старую строку из листа и атомарно переводит её:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…количество активных для мероприятия…) < ?
```

Защита `status='waitlisted'` не даёт одновременным переводам дважды перевести одну строку, а подзапрос вместимости не даёт переводу превысить лимит. Переведённые строки получают статус `pending`, а не `confirmed`, потому что остаток может быть ещё не оплачен; `RegistrationHelper.sendWaitlistAvailabilityEmail` сообщает участнику, что место освободилось, и — если `totalAmount − amountPaid > 0` — даёт ссылку на страницу `/mobile/registrations` сайта B1 церкви (Мои регистрации), которая строится из `B1AppRoot` и поддомена церкви. Оплата (или отсутствие остатка) подтверждает регистрацию.

:::info
Повышение вместимости само по себе не переводит людей из листа ожидания — сотрудники используют действие Promote в списке участников после повышения вместимости. Отмены и удаления переводят автоматически.
:::

## Клиентские поверхности

- **Мастер B1App** — один общий хук, `B1App/src/components/registration/useEventRegistration.ts`, управляет и компонентом для сайта (`components/registration/EventRegister.tsx`), и экраном в мобильном портале (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) через шаги `info → members → selections → questions → payment → confirm` (средние шаги выводятся, только если у мероприятия есть дополнения, прикреплённая форма или ненулевой итог). Шаги info/members показывают выбор по типам участников с актуальным остатком вместимости и состоянием «распродано»; шаг оплаты (`RegistrationPaymentForm.tsx`) показывает сводку заказа, ввод промокода и — для вошедших участников — сохранённые способы оплаты через реестр провайдеров apphelper, а гости токенизируют новую карту. Мобильный экран **Registrations** (`screens/RegistrationsPage.tsx`) — это «Мои регистрации»: статус, остаток к оплате, «Завершить оплату» (`POST /:id/pay`), «Редактировать» (`PUT /:id` — контакты, типы участников, количества дополнений) и «Отмена».
- **Настройки B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` добавляет переключатель Enable Waitlist и аккордеоны Attendee Types, Selections и Discount Codes (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), все с CRUD через маршруты `/types`, `/selections`, `/coupons`.
- **Список участников в B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: колонка Type по каждому участнику, колонка Paid/Total с чипом остатка, счётчики по типам, диалог платежей (`RegistrationDetailDialog.tsx`, из `GET /payments/:registrationId`), действие строки Promote для листа ожидания и экспорт CSV, включающий типы участников, дополнения, оплачено/всего/остаток и ответы на вопросы.

Межмодульные запросы (поиск или создание гостевого человека, загрузка церкви для писем) идут через `getMembershipModuleGateway()` — модуль content никогда не читает таблицы membership напрямую.

## Связанные страницы

- [Пожертвования](./giving) — абстракция шлюза, реестр провайдеров и модель токенизации, которые переиспользует эта функция
- [Эндпоинты Content](../api/endpoints/content) — REST-интерфейс модуля content
- [Вебхуки](../api/webhooks) — событие `registration.created`
- [Структура модулей](../api/module-structure) — как организован модуль content на стороне сервера
