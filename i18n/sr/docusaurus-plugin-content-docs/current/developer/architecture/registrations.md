---
title: "Пријаве на догађаје"
---

# Пријаве на догађаје

<div class="article-intro">

Изворна пријава на догађаје налази се у модулу садржаја и, од таласа пријава уз плаћање, има потпун модел трговине: типове учесника с ценама, додатне опције с ценама, кодове за попуст, плаћања преко постојећег пролаза за давања у цркви и листу чекања вођену статусом. Новчани ток намерно користи систем давања: контролер пријава наплаћује преко исте апстракције `GatewayService` / `IGatewayProvider` која је описана у [Давање](./giving), тако да подаци о картицама и SDK пролаза never ne живе у модулу садржаја. Ова страница приказује модел података, правила за цене и капацитет, и токове пријаве, плаћања и листе чекања.

</div>

## Преглед

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (member portal)        │            │ Api — content module                        │
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

Три правила важе за целу архитектуру:

1. **Сервер одређује цену.** Клијенти шаљу идентификаторе типова, идентификаторе опција и количине. `RegistrationPricingHelper.computeTotal()` израчунава укупан износ на серверу, а купони се поново проверавају у тренутку наплате. Износ који достави клијент never se не узима у обзир.
2. **Капацитет се проверава атомски у тренутку уписа.** Сваки упис са ограниченим капацитетом користи израз `INSERT … SELECT … FROM dual WHERE (count of active rows) < capacity`, тако да две истовремене пријаве не могу обе добити последње место. Бројеви се изводе из статуса (`pending`/`confirmed`) и никад се не чувају.
3. **Плаћања иду преко система за давања.** `RegistrationController` позива дељени `GatewayService.processCharge` са конфигурисаним пролазом цркве. То је исти апстракциони слој за провајдере, токенизацију и SCA обраду као и код донација.

## Модел података (`Api/src/modules/content`)

Модели се налазе у `models/Registration.ts`, мапирања табела у `db/DatabaseTypes.ts`, а по један репозиторијум за сваку табелу у директоријуму `repositories/`.

| Табела | Значење | Кључна поља |
|-------|---------|-----------|
| `registrations` | Једна пријава (једно домаћинство или група за један догађај) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Један учесник у пријави | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Типови учесника по догађају (нпр. Одрасли / Дете) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Именоване додатне опције с ценом (нпр. мајица) | eventId, name, description, **price**, **capacity**, **maxQuantity** (ограничење по пријави), sort, active |
| `registrationSelectionChoices` | Количина опције коју је изабрала пријава или учесник | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Једна успешна наплата за пријаву | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Кодови за попуст по догађају | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Напомене:

- **Не постоји табела за листу чекања.** Групе на листи чекања су редови у `registrations` са `status = 'waitlisted'`. Читав животни циклус листе чекања своди се на промене статуса у тој једној табели.
- **Нема сачуваних бројача.** Бројеви „продато” и „искоришћено” (капацитет догађаја, капацитет по типу, капацитет по опцији, искоришћења купона) рачунају се корелисаним подупитима над редовима чији статус припада скупу `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Отказивање пријаве зато ослобађа капацитет без икаквог додатног књиговодства.
- Цене су MySQL колоне типа DECIMAL (преко мреже стижу као стрингови), које помоћник за цене претвара помоћу `Number()`.

## REST површина

Све је под `/content/registrations` (`controllers/RegistrationController.ts`), а приступ контролише `Permissions.registrations` (`view` / `edit`):

| Рута | Приступ | Намена |
|-------|--------|---------|
| `POST /register` | анонимно | Потпуно слање: гост, члан или особље које додаје учесника; цене на серверу, провере капацитета, опционално наплаћивање |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | јавно | Типови и опције са изведеним `used` / `remainingCapacity` за чаробњака |
| `POST /types`, `DELETE /types/:id` (исто за `/selections`, `/coupons`) | `registrations.edit` | CRUD подешавања за особље |
| `POST /coupons/validate` | јавно | Провера кода за попуст у реду током чаробњака |
| `GET /coupons/event/:eventId` | особље | Купони са бројем искоришћења |
| `GET /event/:eventId` · `GET /event/:eventId/count` | особље · јавно | Списак учесника; број активних за приказ капацитета |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | пријављени корисник | Моје пријаве, детаљи, историја плаћања |
| `PUT /:id` | власник или особље | Измена после слања: замењује чланове и изборе опција уз нове атомске провере капацитета, поново израчунава `totalAmount`; never ne наплаћује и не враћа новац аутоматски |
| `POST /:id/pay` | власник | „Довршите плаћање”: наплаћује `totalAmount − amountPaid` и мења `waitlisted` / `pending` у `confirmed` |
| `POST /:id/promote` | особље | Ручно унапређење с листе чекања |
| `POST /:id/cancel` · `DELETE /:id` | власник · особље | Отказивање или брисање; оба окидају аутоматско унапређење с листе чекања |

Већ постојећа, неотказана пријава за исти `personId` на истом догађају одбија се кодом 409, а свака креирана пријава шаље `registration.created` webhook преко `WebhookDispatcher`-а.

## Цене и кодови за попуст

`helpers/RegistrationPricingHelper.ts` је јединствени ауторитет за израчунавање новца:

- `computeTotal()` сабира цену типа сваког учесника и `цена × количина` за сваки изабрани избор опције.
- `validateCoupon()` проверава активност, временски период (`startDate`/`endDate`), `minMembers` у односу на величину групе у пријави и `maxUses` у односу на број искоришћења изведен из статуса.
- `applyDiscount()`: `percent` одузима `total × value/100`, а `amount` одузима `value`. У оба случаја износ се не спушта испод нуле.

Чаробњак позива `POST /coupons/validate` ради тренутне повратне информације, али `register` поново проверава и примењује купон на серверу. Износ који клијент приказује је само информативан.

## Атомски образац за капацитет

Сваки упис са ограниченим капацитетом безбедно се извршава и при истовременим захтевима, без трансакција и закључавања, тако што се провера капацитета уграђује у сам `INSERT`. На нивоу догађаја (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Нула погођених редова значи „капацитет је попуњен”. Исти образац штити уписе по типу (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, који броји чланове повезане с активним пријавама) и количине по опцији (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, који користи `COALESCE(SUM(quantity),0) + ? <= capacity`). Ако упис било ког учесника или опције не успе усред пријаве, контролер поништава делимичну пријаву помоћу `deleteCascade()` и јавља који је тип или опција распродата.

## Ток плаћања

`processRegistrationCharge` у контролеру је једино место где пријаве дотичу новац, а он је танак клијент система за давања:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Токенизација се одвија у прегледачу, потпуно као и код донација (видети [Давање](./giving)). Чаробњак користи исти регистар провајдера за плаћање из apphelper-а, па пријављени чланови могу платити сачуваним картицама, а гости токенизују нову картицу. Контролер прати особености провајдера из `DonateController`-а (Kingdom Funding идентификаторе начина плаћања `pm-{id}`, Stripe SCA одговоре `requires_action` који се враћају клијенту без евидентирања плаћања). Успешна наплата уписује ред у `registrationPayments`, увећава `amountPaid` и потврђује пријаву. **Повраћај новца није имплементиран.** Отказана плаћена пријава задржава своје редове о плаћању, а сваки повраћај обавља се ван система, преко контролне табле пролаза.

Обе тачке уласка воде истим путем: `register` (плаћање при пријави) и `pay` (уплата преосталог износа или довршавање са листе чекања).

`register` прескаче наплату у два случаја и чува пријаву као `pending` са `amountPaid = 0`, остављајући читав износ као дуговање:

- **Особље додаје учесника.** Тело захтева садржи `personId` који није од позиваоца, нема `guestInfo`, а позивалац има `registrations.edit` у тој цркви. Особа мора постојати (иначе 404), филтер чланова домаћинства се заобилази и картица се не наплаћује.
- **Нема пролаза.** Црква нема пролаз за давања (`hasGateway` проверава `gateway.loadAll`). Корак плаћања у B1App-у уместо обрасца за картицу приказује **Региструј се и плати касније**.

Пријаве гостију (без `au.id`) са ценом морају садржати `captchaPass` из `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (сада у `shared/helpers`) извршава се непосредно пре наплате, тако да пријаве на листу чекања и бесплатне пријаве нису погођене. Када је `CAPTCHA_ENFORCE=true`, а пропусница недостаје или није валидна, нова пријава се поништава помоћу `deleteCascade()` и позив враћа 403. `RegistrationPaymentForm` у B1App-у гостима приказује reCAPTCHA поље за потврду и шаље пропусницу и уз чување картице и уз пријаву.

## Животни циклус листе чекања

Када је догађај пун, а заставица `waitlistEnabled` догађаја укључена, `register` чува групу као `waitlisted` (прескачући провере капацитета) и шаље уобичајену потврдну поруку означену као место на листи чекања. Унапређење се дешава на три начина: `cancel`, `delete` и крајња тачка `promote` за особље. Сва три воде ка `RegistrationRepo.promoteFromWaitlist`, који бира најстарији ред на листи чекања и атомски га мења:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Услов `status='waitlisted'` значи да истовремена унапређења не могу двоструко унапредити исти ред, а подупит капацитета значи да унапређење не може да прода више места него што постоји. Унапређени редови завршавају у `pending`, а не у `confirmed`, јер дуговање можда још постоји. `RegistrationHelper.sendWaitlistAvailabilityEmail` обавештава пријављеног да је његово место ослобођено и, када је `totalAmount − amountPaid > 0`, упућује на B1 страницу `/mobile/registrations` цркве (Моје пријаве), изграђену од `B1AppRoot` и поддомена цркве. Плаћање (или одсуство дуговања) потврђује пријаву.

:::info
Повећање капацитета само по себи не унапређује аутоматски. Особље након повећања капацитета користи радњу Унапреди са списка учесника. Отказивања и брисања унапређују аутоматски.
:::

## Клијентске површине

- **B1App чаробњак.** Једна заједничка кука, `B1App/src/components/registration/useEventRegistration.ts`, покреће и компоненту на сајту (`components/registration/EventRegister.tsx`) и екран у мобилном порталу (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) кроз кораке `info → members → selections → questions → payment → confirm`. Средишњи кораци се приказују само када догађај има опције, придружен образац или укупан износ различит од нуле. Кораци информација и учесника приказују бирач по типу учесника са приказом преосталог капацитета у реалном времену и стањем распродатости. Плаћање (`RegistrationPaymentForm.tsx`) приказује резиме поруџбине, унос кода за попуст и, за пријављене чланове, сачуване начине плаћања преко регистра провајдера из apphelper-а. Гости токенизују нову картицу. Мобилни екран **Пријаве** (`screens/RegistrationsPage.tsx`) је Моје пријаве: статус, преостало дуговање, Довршите плаћање (`POST /:id/pay`), Измени (`PUT /:id`, контакт, типови чланова, количине опција) и Откажи.
- **B1Admin подешавања.** `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` додаје прекидач Омогући листу чекања и акордеоне за Типове учесника, Опције и Кодове за попуст (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). Све су CRUD операције над рутама `/types`, `/selections` и `/coupons`.
- **B1Admin списак учесника.** `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: колона Тип по учеснику, колона Плаћено/Укупно са значком дуговања, значке бројева по типу, дијалог с детаљима о плаћањима (`RegistrationDetailDialog.tsx`, из `GET /payments/:registrationId`), радња Унапреди за листу чекања и извоз у CSV, који укључује типове учесника, опције, плаћено, укупно, дуговање и одговоре на питања.

Претраге међу модулима (разрешавање или креирање госта као особе, учитавање цркве за имејлове) иду преко `getMembershipModuleGateway()`. Модул садржаја никад не чита табеле чланства директно.

## Повезане странице

- [Давање](./giving): апстракција пролаза, регистар провајдера и модел токенизације које ова функција користи
- [Крајње тачке садржаја](../api/endpoints/content): REST површина модула садржаја
- [Webhook-ови](../api/webhooks): догађај `registration.created`
- [Структура модула](../api/module-structure): како је модул садржаја организован на серверској страни
