---
title: "Регистрация на мероприятия"
---

# Регистрация на мероприятия

<div class="article-intro">

Собственная регистрация на мероприятия живёт в модуле content и, начиная с волны платных регистраций, несёт полноценную коммерческую модель: платные типы участников, платные дополнительные выборы, промокоды, платежи через существующий платёжный шлюз церкви и управляемый статусом список ожидания. Денежный путь намеренно переиспользует стек пожертвований — контроллер регистрации списывает средства через ту же абстракцию `GatewayService` / `IGatewayProvider`, описанную в [Пожертвованиях](./giving), поэтому в модуле content не хранится никаких знаний о данных карт или SDK шлюза. На этой странице описаны модель данных, правила ценообразования и вместимости, а также потоки регистрации, оплаты и списка ожидания.

</div>

## Обзор

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (member portal)        │            │ Api — content модуль                        │
│  registration wizard ·       │   HTTPS    │  RegistrationController                     │
│  My Registrations            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (server pricing) │
│ B1Admin (staff)              │            │  RegistrationHelper (emails)                │
│  event registration settings │            └───────────────┬─────────────────────────────┘
│  · roster · CSV export       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ shared gateway abstraction (giving)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Три правила действуют во всём стеке:

1. **Сервер владеет ценой.** Клиенты отправляют id типов, id выборов и количества; `RegistrationPricingHelper.computeTotal()` вычисляет итог на стороне сервера, а купоны заново проверяются в момент списания. Сумма, предоставленная клиентом, никогда не является доверенной.
2. **Вместимость обеспечивается атомарно в момент вставки.** Каждая вставка с ограничением по вместимости использует оператор `INSERT … SELECT … FROM dual WHERE (count of active rows) < capacity`, так что две одновременные регистрации не могут занять одно последнее место. Счётчики выводятся из статуса (`pending`/`confirmed`), а не хранятся.
3. **Платежи используют рельсы пожертвований.** `RegistrationController` вызывает общий `GatewayService.processCharge` с настроенным шлюзом церкви — та же абстракция провайдеров, модель токенизации и обработка SCA, что и у пожертвований.

## Модель данных (`Api/src/modules/content`)

Модели находятся в `models/Registration.ts`; сопоставления таблиц в `db/DatabaseTypes.ts`; один репозиторий на таблицу в `repositories/`.

| Таблица | Значение | Ключевые поля |
|-------|---------|-----------|
| `registrations` | Одна регистрация (одно домохозяйство/группа на одно мероприятие) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Один участник в регистрации | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Типы участников на мероприятие (например, Взрослый / Ребёнок) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Именованные платные дополнительные опции (например, футболка) | eventId, name, description, **price**, **capacity**, **maxQuantity** (ограничение на регистрацию), sort, active |
| `registrationSelectionChoices` | Количество выбора, отмеченное регистрацией/участником | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Одно успешное списание по регистрации | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Промокоды на мероприятие | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Примечания:

- **Отдельной таблицы для списка ожидания нет.** Записи в списке ожидания — это строки `registrations` со `status = 'waitlisted'`; весь жизненный цикл списка ожидания — это переходы статуса в этой единственной таблице.
- **Нет хранимых счётчиков.** Счётчики «продано» / «использовано» (вместимость мероприятия, вместимость по типу, вместимость по выбору, использования купона) вычисляются коррелированными подзапросами по строкам, чей статус входит в `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Отмена регистрации, таким образом, освобождает вместимость без какого-либо учёта.
- Цены — это столбцы MySQL DECIMAL (строки при передаче), приводимые через `Number()` внутри помощника ценообразования.

## REST-поверхность

Всё находится под `/content/registrations` (`controllers/RegistrationController.ts`), доступ ограничен `Permissions.registrations` (`view` / `edit`):

| Маршрут | Доступ | Назначение |
|-------|--------|---------|
| `POST /register` | анонимный | Полная отправка: гость или участник, серверное ценообразование, проверки вместимости, опциональное списание |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | публичный | Типы/выборы с вычисленными `used` / `remainingCapacity` для мастера |
| `POST /types`, `DELETE /types/:id` (аналогично для `/selections`, `/coupons`) | `registrations.edit` | CRUD настроек персонала |
| `POST /coupons/validate` | публичный | Встроенная проверка промокода во время работы мастера |
| `GET /coupons/event/:eventId` | персонал | Купоны со счётчиками использований |
| `GET /event/:eventId` · `GET /event/:eventId/count` | персонал · публичный | Список участников; активный счётчик для отображения вместимости |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | авторизованный | Мои регистрации, детали, история платежей |
| `PUT /:id` | владелец/персонал | Правка после отправки — заменяет участников и выборы с новыми атомарными проверками вместимости, пересчитывает `totalAmount`; никогда не списывает и не возвращает средства автоматически |
| `POST /:id/pay` | владелец | «Завершить платёж»: списывает `totalAmount − amountPaid`, переводит `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | персонал | Ручное продвижение из списка ожидания |
| `POST /:id/cancel` · `DELETE /:id` | владелец · персонал | Отмена / удаление; оба вызывают автоматическое продвижение списка ожидания |

Незавершённая существующая регистрация того же `personId` на то же мероприятие отклоняется с кодом 409, и каждая созданная регистрация порождает вебхук `registration.created` через `WebhookDispatcher`.

## Ценообразование и промокоды

`helpers/RegistrationPricingHelper.ts` — единственный авторитетный источник в вопросах денежной арифметики:

- `computeTotal()` суммирует цену типа каждого участника плюс `цена × количество` каждого выбора.
- `validateCoupon()` проверяет флаг активности, временное окно (`startDate`/`endDate`), `minMembers` относительно размера отправленной группы и `maxUses` относительно вычисленного из статуса числа использований.
- `applyDiscount()` — `percent` вычитает `total × value/100`; `amount` вычитает `value`; оба ограничены снизу нулём.

Мастер вызывает `POST /coupons/validate` для встроенной обратной связи, но `register` заново проверяет и применяет купон на стороне сервера — отображаемый клиентом итог носит лишь рекомендательный характер.

## Идиома атомарной вместимости

Каждая вставка с ограничением по вместимости безопасно участвует в гонке без транзакций или блокировок, делая проверку вместимости частью самого `INSERT`. На уровне мероприятия (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Ноль затронутых строк означает «вместимость исчерпана». Та же идиома охраняет вставки по типу (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, подсчитывающая участников, присоединённых к активным регистрациям) и количества по выборам (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, использующая `COALESCE(SUM(quantity),0) + ? <= capacity`). Когда любая вставка участника или выбора не удаётся в середине регистрации, контроллер откатывает частичную регистрацию через `deleteCascade()` и сообщает, какой тип или выбор распродан.

## Поток платежа

`processRegistrationCharge` в контроллере — единственное место, где регистрации касаются денег, и это тонкий клиент стека пожертвований:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Токенизация происходит в браузере точно так же, как для пожертвований (см. [Пожертвования](./giving)) — мастер переиспользует реестр платёжных провайдеров apphelper, поэтому авторизованные участники могут платить сохранёнными картами, а гости токенизируют новую карту. Контроллер повторяет особенности провайдеров `DonateController` (id способов оплаты Kingdom Funding вида `pm-{id}`, ответы Stripe SCA `requires_action`, возвращаемые клиенту без фиксации платежа). Успешное списание записывает строку `registrationPayments`, увеличивает `amountPaid` и подтверждает регистрацию. **Возвраты не реализованы** — отменённая оплаченная регистрация сохраняет свои строки платежей, а любой возврат обрабатывается вне системы, в панели шлюза.

Обе точки входа проходят через один и тот же код: `register` (оплата при регистрации) и `pay` (доплата баланса / завершение из списка ожидания).

## Жизненный цикл списка ожидания

Когда мероприятие заполнено и включён флаг `waitlistEnabled` мероприятия, `register` сохраняет группу как `waitlisted` (пропуская проверки вместимости) и отправляет обычное письмо-подтверждение, помеченное как место в списке ожидания. Продвижение происходит тремя способами — `cancel`, `delete` и конечная точка персонала `promote` — все они направляются в `RegistrationRepo.promoteFromWaitlist`, который выбирает самую старую строку в списке ожидания и атомарно переключает её:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Условие `status='waitlisted'` означает, что параллельные продвижения не могут дважды продвинуть одну строку, а подзапрос вместимости означает, что продвижение не может привести к перепродаже. Продвинутые строки попадают в статус `pending` — не `confirmed` — потому что может оставаться задолженность; `RegistrationHelper.sendWaitlistAvailabilityEmail` сообщает зарегистрированному, что его место освободилось, и, когда `totalAmount − amountPaid > 0`, даёт ссылку на страницу завершения платежа. Оплата (или отсутствие задолженности) подтверждает их.

:::info
Повышение вместимости само по себе не вызывает автоматическое продвижение — персонал использует действие «Продвинуть» в списке участников после повышения вместимости. Отмены и удаления продвигают автоматически.
:::

## Клиентские поверхности

- **Мастер B1App** — один общий хук, `B1App/src/components/registration/useEventRegistration.ts`, управляет как компонентом веб-сайта (`components/registration/EventRegister.tsx`), так и экраном мобильного портала (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) через шаги `info → members → selections → questions → payment → confirm` (средние шаги рендерятся только когда у мероприятия есть выборы, прикреплённая форма или ненулевой итог). Шаги info/members показывают выборщики по типам участников с живой оставшейся вместимостью и состояниями «распродано»; оплата (`RegistrationPaymentForm.tsx`) показывает сводку заказа, ввод промокода и — для авторизованных участников — сохранённые способы оплаты через реестр провайдеров apphelper, а гости токенизируют новую карту. Мобильный экран **Registrations** (`screens/RegistrationsPage.tsx`) — это «Мои регистрации»: статус, задолженность, завершение платежа (`POST /:id/pay`), правка (`PUT /:id` — контакт, типы участников, количества выборов) и отмена.
- **Настройки B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` добавляет переключатель «Включить список ожидания» плюс раскрывающиеся блоки для типов участников, выборов и промокодов (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), все с CRUD против маршрутов `/types`, `/selections`, `/coupons`.
- **Список участников B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: столбец типа для каждого участника, столбец «Оплачено/Итого» с чипом задолженности, чипы количества по типу, диалог деталей платежей (`RegistrationDetailDialog.tsx`, из `GET /payments/:registrationId`), действие строки «Продвинуть» для списка ожидания и экспорт в CSV, включающий типы участников, выборы, оплачено/итого/задолженность и ответы на вопросы.

Межмодульные обращения (разрешение или создание гостя-человека, загрузка церкви для писем) проходят через `getMembershipModuleGateway()` — модуль content никогда не читает таблицы членства напрямую.

## Связанные страницы

- [Пожертвования](./giving) — абстракция шлюза, реестр провайдеров и модель токенизации, которые переиспользует эта функция
- [Конечные точки Content](../api/endpoints/content) — REST-поверхность модуля content
- [Вебхуки](../api/webhooks) — событие `registration.created`
- [Структура модулей](../api/module-structure) — как модуль content организован на стороне сервера
