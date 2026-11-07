---
title: "Крајње тачке за давања"
---

# Крајње тачке за давања

<div class="article-intro">

Модул Давања управља прилозима, фондовима, обрадом плаћања, претплатама и сродним финансијским операцијама. Подржава више пролаза за плаћање (Stripe, PayPal), обрађује једнократне и понављајуће прилоге, прати серије прилога и обезбеђује обраду вебхук догађаја за асинхроне догађаје плаћања.

</div>

**Основна путања:** `/giving`

## Прилози

Основна путања: `/giving/donations`

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------------|-----------|-------------|
| GET | `/` | JWT | Donations.View или сопствени personId | Наведи све прилоге. Филтрирај помоћу `?batchId=` или `?personId=`. Уз `?personId=`, прилози за фондове који нису порески одбитни се изостављају (као и на извештајима о давањима), осим ако позивалац са дозволом Donations.View дода `&includeNonDeductible=1`, што чини запис особе у B1Admin |
| GET | `/:id` | JWT | Donations.View | Преузми прилог по ID-ју |
| GET | `/my` | JWT | — | Преузми прилоге тренутног корисника |
| GET | `/my/summary?year=` | JWT | — | Укупан износ давања тренутног корисника за годину (подразумевано ова година): `{ year, total, count, currency, isConverted }`, са износима прерачунатим у валуту цркве. Користи се за приказ давања на почетној страници члана |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Прилози са датумом у наведеном опсегу (укључујући крајње датуме). Оба датума су обавезна у формату `YYYY-MM-DD`, у супротном `400`. Странице извештаја о давањима у B1Admin на овај начин траже једну календарску годину, уместо целе историје цркве |
| GET | `/summary` | JWT | Donations.ViewSummary | Преузми сажетак прилога. Филтрирај помоћу `?startDate=&endDate=&type=`. Користи `type=person` за приказ по особи |
| GET | `/testEmail` | Јавно | — | Пошаљи тестни имејл (развој/отклањање грешака) |
| POST | `/` | JWT | Donations.Edit или Donations.Enter | Креирај или ажурирај прилоге (серија). Само уз Donations.Enter, и циљна серија и (за ажурирање) тренутна серија прилога морају бити отворене, а прилози преко пролаза (они са `transactionId`) не могу се мењати; у супротном `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit или Donations.Enter | Обриши прилог. Само Donations.Enter: прилог мора бити у отвореној серији и не сме бити прилог преко пролаза, у супротном `403` |

### Пример: Наведи прилоге по серији

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### Пример: Преузми сажетак прилога

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## Серије прилога

Основна путања: `/giving/donationbatches`

Проширује `GenericCrudController` са CRUD рутама: `getById`, `getAll`, `post`, `delete`. Операција брисања такође уклања све прилоге унутар серије.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------------|-----------|-------------|
| GET | `/` | JWT | Donations.ViewSummary или Donations.Enter | Наведи све серије прилога |
| GET | `/:id` | JWT | Donations.ViewSummary или Donations.Enter | Преузми серију прилога по ID-ју |
| POST | `/` | JWT | Donations.Edit или Donations.Enter | Креирај или ажурирај серије прилога. Само Donations.Enter: ажурирање постојеће серије захтева да она буде отворена, у супротном `403 { "error": "This batch is closed." }`. `status` се овде игнорише, па чување серије не може да је поново отвори |
| POST | `/:id/close` | JWT | Donations.Edit | Затвори серију: поставља `status` на `closed`, `closedDate` на тренутни датум и `closedBy` на ID корисника који позива. Враћа серију |
| POST | `/:id/reopen` | JWT | Donations.Edit | Поново отвори серију: поставља `status` на `open` и брише `closedDate` и `closedBy`. Враћа серију |
| DELETE | `/:id` | JWT | Donations.Edit | Обриши серију и све њене прилоге |

Свака серија садржи `status` (`open` или `closed`; нове и постојеће серије су `open`), `closedDate` и `closedBy`. Donations.Edit може мењати прилоге у било којој серији; Donations.Enter (у уређивачу улога приказано као **Унос прилога**) може додавати, мењати или брисати прилоге и расподеле по фондовима само док је њихова серија отворена.

## Донирање

Основна путања: `/giving/donate`

Обрађује јавни ток донирања, укључујући наплате, претплате, вебхукове и прорачуне накнада. Основне CRUD руте нису укључене; све крајње тачке су прилагођене.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------------|-----------|-------------|
| GET | `/gateways/:churchId` | Јавно | — | Преузми доступне пролазе за плаћање за цркву (само јавне кључеве) |
| POST | `/client-token` | JWT | — | Генериши клијентски токен за иницијализацију пролаза |
| POST | `/create-order` | JWT | — | Креирај налог за плаћање (процес плаћања у стилу PayPal-а) |
| POST | `/charge` | JWT | — | Обради једнократну наплату прилога |
| POST | `/subscribe` | JWT | — | Креирај понављајућу претплату за прилоге |
| POST | `/log` | Јавно | — | Евидентирај прилог. Тело: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Јавно | — | Прими догађаје вебхука за плаћање (Stripe, PayPal). Захтева `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Поново пусти Stripe догађаје за временски опсег. Тело: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Јавно | — | Израчунај трансакционе накнаде. Тело: `{ type, provider, gatewayId, amount, currency }`. Захтева `?churchId=` |
| POST | `/captcha-verify` | Јавно | — | Провери reCAPTCHA токен. Тело: `{ token, churchId? }`. Одговор човека враћа `{ response: "human", pass }`, где је `pass` потписана пропусница за гостујуће давање која важи 10 минута (и само за `churchId` ако је послата) |

Када API ради са `CAPTCHA_ENFORCE=true`, позиви гостију (који нису пријављени) на `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` и `/giving/paymentmethods/ach-setup-intent-anon` (и гостујуће `POST /content/registrations/register` позиве са наплатом) морају у телу садржати `captchaPass`, у супротном враћају 403 `Captcha verification required`. Пропусница се може поново користити док не истекне, јер гостујући ток Stripe-а прави два позива (додавање картице, па наплата). Позиви пријављених корисника нису погођени. `CAPTCHA_ENFORCE` је подразумевано `false`; обрасци за гостујуће давање у `@churchapps/apphelper` аутоматски шаљу пропусницу.

### Пример: Обрада наплате прилога

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### Пример: Креирање понављајуће претплате

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## Фондови

Основна путања: `/giving/funds`

Проширује `GenericCrudController` са CRUD рутама: `getById`, `getAll`, `post`, `delete`. Дозвола `view` је `null` (за преглед фондова није потребна дозвола).

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------------|-----------|-------------|
| GET | `/` | JWT | — | Наведи све фондове |
| GET | `/:id` | JWT | — | Преузми фонд по ID-ју |
| GET | `/churchId/:churchId` | Јавно | — | Преузми све фондове за одређену цркву (јавно) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Јавно | — | Преузми укупан износ прилога за фонд: `{ fundId, totalAmount, donationCount }`. Користи се за елемент `campaignProgress` у градитељу сајта |
| POST | `/` | JWT | Donations.Edit | Креирај или ажурирај фондове |
| DELETE | `/:id` | JWT | Donations.Edit | Обриши фонд |

## Прилози по фондовима

Основна путања: `/giving/funddonations`

Прати како се појединачни прилози расподељују по фондовима. Основне CRUD руте нису укључене; све крајње тачке су прилагођене.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------------|-----------|-------------|
| GET | `/` | JWT | Donations.View | Наведи прилоге по фондовима. Филтрирај помоћу `?donationId=`, `?personId=`, `?fundId=` или `?fundName=`. По потреби додај `?startDate=&endDate=` за филтрирање по датуму |
| GET | `/:id` | JWT | Donations.View | Преузми прилог по фондовима по ID-ју |
| GET | `/my` | JWT | — | Преузми прилоге по фондовима тренутног корисника |
| POST | `/` | JWT | Donations.Edit или Donations.Enter | Креирај или ажурирај прилоге по фондовима (серија). Само Donations.Enter: матични прилог мора бити у отвореној серији и не сме бити прилог преко пролаза, у супротном `403` |
| DELETE | `/:id` | JWT | Donations.Edit или Donations.Enter | Обриши прилог по фонду. Исто правило отворене серије важи за Donations.Enter |

## Пролази за плаћање

Основна путања: `/giving/gateways`

Управља конфигурацијама пролаза за плаћање (Stripe, PayPal, итд.). Основне CRUD руте нису укључене; све крајње тачке су прилагођене. Тајне пролаза су шифроване у мировању.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------------|-----------|-------------|
| GET | `/` | JWT | — | Наведи све пролазе за цркву |
| GET | `/:id` | JWT | Settings.Edit | Преузми пролаз по ID-ју |
| GET | `/churchId/:churchId` | Јавно | — | Преузми пролазе за цркву (само јавне кључеве) |
| GET | `/configured/:churchId` | Јавно | — | Провери да ли црква има подешен пролаз за плаћање |
| POST | `/` | JWT | Settings.Edit | Креирај или ажурирај пролазе (шифрује кључеве, подешава вебхукове и производе) |
| PATCH | `/:id` | JWT | Settings.Edit | Делимично ажурирај пролаз |
| DELETE | `/:id` | JWT | Settings.Edit | Обриши пролаз (уклања и његове вебхукове) |

### Пример: Провера конфигурације пролаза

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Купци

Основна путања: `/giving/customers`

Проширује `GenericCrudController` са CRUD рутама: `getAll`, `delete`. Повезује особе са њиховим записима купаца у пролазу за плаћање.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------------|-----------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Наведи све купце |
| GET | `/:id` | JWT | Donations.ViewSummary или сопствени запис | Преузми купца по ID-ју |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary или сопствени запис | Преузми претплате у пролазу за купца |
| DELETE | `/:id` | JWT | Donations.Edit | Обриши купца |

## Претплате

Основна путања: `/giving/subscriptions`

Управља понављајућим претплатама за прилоге. Основне CRUD руте нису укључене; све крајње тачке су прилагођене.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------------|-----------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Наведи све претплате |
| GET | `/:id` | JWT | Donations.ViewSummary | Преузми претплату по ID-ју |
| POST | `/` | JWT | Donations.Edit или сопствена претплата | Ажурирај претплате у пролазу за плаћање |
| DELETE | `/:id` | JWT | Donations.Edit или сопствена претплата | Откажи претплату и уклони је из базе. Тело: `{ provider, reason }` |

## Фондови претплата

Основна путања: `/giving/subscriptionfunds`

Прати расподелу фондова за понављајуће претплате. Основне CRUD руте нису укључене; све крајње тачке су прилагођене.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------------|-----------|-------------|
| GET | `/` | JWT | Donations.View или сопствена претплата | Наведи фондове претплата. Филтрирај помоћу `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Преузми фонд претплате по ID-ју |
| DELETE | `/:id` | JWT | Donations.Edit | Обриши фонд претплате |
| DELETE | `/subscription/:id` | JWT | Donations.Edit или сопствена претплата | Обриши све фондове за претплату |

## Начини плаћања

Основна путања: `/giving/paymentmethods`

Управља сачуваним начинима плаћања (картице, банковни рачуни) преко API-ја пролаза за плаћање. Основне CRUD руте нису укључене; све крајње тачке су прилагођене.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------------|-----------|-------------|
| GET | `/personid/:id` | JWT | Donations.View или сопствени personId | Преузми све сачуване начине плаћања за особу (картице, банковни рачуни) |
| POST | `/addcard` | JWT | — | Повежи начин плаћања картицом. Тело: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit или сопствени personId | Ажурирај податке о картици. Тело: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit или сопствени personId | Креирај Stripe ACH SetupIntent за повезивање банковног рачуна. Тело: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Јавно | — | Креирај анонимни ACH SetupIntent за прилоге гостију. Тело: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit или сопствени personId | Додај банковни рачун преко токена (застарело; користи `ach-setup-intent`). Тело: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit или сопствени personId | Ажурирај податке о банковном рачуну. Тело: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit или сопствени купац | Верификуј банковни рачун микро-уплатама. Тело: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit или сопствени купац | Обриши начин плаћања (картицу или банковни рачун) |

## Дневник догађаја

Основна путања: `/giving/eventLog`

Проширује `GenericCrudController` са CRUD рутама: `getById`, `getAll`, `post`, `delete`. Прати догађаје вебхукова пролаза за плаћање ради ревизије и уклањања дупликата.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------------|-----------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Наведи све дневнике догађаја |
| GET | `/:id` | JWT | Donations.ViewSummary | Преузми дневник догађаја по ID-ју |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Преузми дневнике догађаја филтриране по типу догађаја |
| POST | `/` | JWT | Donations.Edit | Креирај или ажурирај дневнике догађаја |
| DELETE | `/:id` | JWT | Donations.Edit | Обриши дневник догађаја |

## Повезане странице

- [Крајње тачке за чланство](./membership) — Особе, цркве, групе, улоге и дозволе
- [Аутентификација и дозволе](./authentication) — Ток пријаве, JWT, OAuth, модел дозвола
- [Структура модула](../module-structure) — Обрасци организације кода
