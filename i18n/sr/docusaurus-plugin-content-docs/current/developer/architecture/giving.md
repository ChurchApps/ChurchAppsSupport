---
title: "Архитектура давања"
---

# Архитектура давања

<div class="article-intro">

ChurchApps води донације по моделу платног пролаза: црква задржава свој Stripe (или PayPal, Kingdom Funding, или Paystack) налог, а B1 никада не стоји у току новца као платформски процесор. Подаци о картици се токенизују у прегледачу и никада не стижу до ChurchApps сервера. Ова страница приказује читав склоп: клијентски регистар провајдера у `@churchapps/apphelper`, апстракцију GivingApi пролаза, модел података о донацијама и то како се webhook догађаји пролаза враћају у базу података и усклађују се.

</div>

## Преглед

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

Три принципа важе кроз читав склоп:

1. **Пролаз држи картицу.** Сваки уносни виџет провајдера токенизује у прегледачу; API прима само токен, nonce или ID наруџбине.
2. **Једна апстракција, много провајдера.** Прегледач разрешава `PaymentProvider` из регистра; сервер разрешава `IGatewayProvider` из фабрике. Оба се ослањају на исто нормализовано име провајдера сачувано у запису пролаза.
3. **Webhook-ови су извор истине за слагање.** Одговор на наплату се евидентира оптимистично, али потписани webhook пролаза је оно што потврђује (или ствара) завршену донацију, уз заштите од дупликата са обе стране.

## Клијентска страна: регистар провајдера плаћања (`@churchapps/apphelper`)

Регистар се налази у `Packages/apphelper/src/donations/providers/`, а виџети и помоћне функције сваког провајдера су у свом поддиректоријуму (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Ништа изван `providers/` не грана се по називу провајдера. `PaymentProvider` (видети `providers/types.ts`) објединјује све што host апликација треба за један пролаз: `descriptor` (административне ознаке, подржане валуте, поља за накнаде, подразумеване стопе накнада, URL-ове за контролну таблу и регистрацију), скуп `capabilities` заставица (чуване картице, ACH, понављајућа плаћања, унос нове картице у линији, implicit save-on-tokenize), React виџете за унос члана (`MemberWrapper`/`MemberEntry`), давање гостију (`GuestForm`), уређивање сачуваног начина плаћања (`MethodEditForm`) и плаћања преко формулара (`FormPayment`), плус `buildChargeRequest(ctx, token)`, које је једино место где се облик захтева за наплату разликује по провајдеру. `MemberWrapper` сваког провајдера учитава свој SDK из јавног кључа записа пролаза, па host апликације никада не увозе SDK пролаза (B1App и B1Admin немају зависност од `@stripe/*`). `pickDefaultGateway(gateways, capability?)` централизује то који пролаз цркве једна површина треба да користи.

`providers/registry.ts` садржи уграђене провајдере. Они се **референцирају по вредности**, а не региструју кроз нуспојаву модула, тако да tree-shaking у бандлеру никада не може да одбаци регистрацију:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Функција | Сврха |
|----------|-------|
| `getPaymentProvider(name)` | Разрешава по нормализованом имену; пада на Stripe, тако да погрешно подешен провајдер никада не сруши образац за донаторе |
| `registerPaymentProvider(p)` | Региструје додатног провајдера у време извршавања (за прилагођени пролаз host апликације) |
| `listPaymentProviders()` | Набраја уграђене и прилагођене провајдере; користи се за административни падајући мени пролаза |
| `hasPaymentProvider(name)` | Провера припадности |

**Уграђени клијентски провајдери: Stripe, PayPal, Kingdom Funding, Paystack.** B1App и B1Admin само *читају* регистар (`getPaymentProvider`, `listPaymentProviders`). Ниједна не позива `registerPaymentProvider`, јер регистрација остаје унутар apphelper-а.

Сваки провајдер токенизује другачије, али сви држе картицу ван B1:

| Провајдер | Уносни виџет | Токен враћен API-ју |
|-----------|--------------|---------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; образац за госте такође монтира `ExpressCheckoutElement` (Apple Pay / Google Pay, за једнократне поклоне) чији `onConfirm` враћа исти `pm_…` ID | ID начина плаћања (`pm_…`); банка преко `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` за USD пролазе, а канадски PAD `acss_debit` (хостовани модал за мандат, мандат `default_for` фактуре/претплате, једнократне наплате прослеђују ID мандата) за CAD пролазе |
| Kingdom Funding | Хостовани токенизатор формулар везан за јавни кључ пролаза | једнократни nonce |
| PayPal | PayPal Hosted Fields (картица, понављајућа плаћања) плус PayPal Smart Buttons са Venmo финансирањем (једнократно); оба деле једно учитавање SDK-а, а серверску наруџбину праве преко `/donate/client-token` + `/donate/create-order` | ID захваћене наруџбине |
| Paystack | Paystack Inline искачући прозор (`js.paystack.co/v2/inline.js`). Сам искачући прозор врши плаћање (картица, мобилни новац, банкарски трансфер, USSD) | ID плаћене трансакције; сачувани начини су Paystack `AUTH_…` ауторизациони кодови |

Stripe-ов `finalizeResult` извршава 3-D Secure / SCA у прегледачу (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) пре него што се донација сматра завршеном. Дељени формулар само позива `provider.finalizeResult(result)` и не зна шта та функција ради.

## Серверска страна: апстракција пролаза (GivingApi)

`/giving` модул (`Api/src/modules/giving`) излаже REST површину, а инфраструктура пролаза живи у `Api/src/shared/helpers`. `DonateController` никада не комуницира директно са SDK-ом пролаза. Иде кроз `GatewayService`, који разрешава одговарајући `IGatewayProvider` из `GatewayFactory` и предаје му дешифровани `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) је уговор који сваки пролаз имплементира. Обухвата животни циклус webhook-а (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), плаћање (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), накнаде (`calculateFees`), руковање сачуваним начинима (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) и опционалне додатке (купце, наруџбине, SetupIntent-е, поновно пуштање догађаја, `retryFailedPayment` за неуспелу фактуру претплате, `registerPaymentMethodDomain` за верификацију домена Apple Pay-а). Провајдер који не имплементира опциони хук пријављује се као неподржан за ту радњу, а UI сакрива одговарајућу контролу. Свака класа провајдера декларише сопствену матрицу `capabilities` (подржане валуте, ACH, повраћаје, захтеве за претплате, лимите трансакција). `GatewayService.getProviderCapabilities(provider)` само је чита. Заставице попут `logsDonationsImmediately` управљају понашањем контролера без условних грана по називу провајдера у контролерима.

**Серверски провајдери регистровани у `GatewayFactory`:**

| Провајдер | Доступност |
|-----------|------------|
| Stripe | Увек укључен |
| PayPal | Увек укључен |
| Kingdom Funding | Увек укључен |
| Paystack | Увек укључен (трговци у Нигерији, Гани, Јужној Африци, Кенији и Обали Слоноваче; валуте NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Укључује се опционо преко окружне заставице `ENABLE_SQUARE` |
| ePayMints | Укључује се опционо преко окружне заставице `ENABLE_EPAYMINTS` |

Paystack се разликује од осталих по томе што новац путује пре него што се GivingApi уопште укључи. Искачући прозор наплаћује донатора, `processCharge` је `GET /transaction/verify/:reference` чији платељени износ и валута морају да се поклапају с донацијом која се евидентира (референца која је већ у евиденцији никада се не бележи два пута), а први поклон из понављајућег распореда евидентира се из `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` са `start_date` једним интервалом унапред). Webhook-ови се потписују самим тајним кључем (`x-paystack-signature`, HMAC-SHA512 над необрађеним телом), а Paystack нема API за управљање webhook-ovima, па административни екран приказује URL који црква лепи у своју контролну таблу. Događaji `charge.success` при обнови немају поделу по фондовима, па их провајдер добија из локалних редова `subscriptions`/`subscriptionFunds` донатора. Само ауторизације картица су `reusable`. Поклони путем мобилног новца су само једнократни, па `createSubscription` њих одбија. Демо подаци додају другу цркву (Accra Community Church, `CHU00000002`) на Paystack пролазу у тест режиму за GHS, тако да Paystack Playwright скуп тестова ради поред Stripe-овог скупа за Grace.

Прилагођени провајдери могу се регистровати у време извршавања када је постављена променљива `ENABLE_CUSTOM_GATEWAY_PROVIDERS`. `AbstractExperimentalGatewayProvider` је основна класа за њих. Називи провајдера се упоређују без обзира на велика и мала слова.

### Конфигурација пролаза и тајне

Административац чува акредитиве пролаза преко `POST /giving/gateways` (`GatewayController`). При чувању контролер шифрује приватни и webhook кључ помоћу `EncryptionHelper` пре уписа, а затим, на било ком хосту који није localhost, брише постојећи webhook цркве и поставља нови, усмерен на `/giving/donate/webhook/{provider}?churchId=…`. Црква има један ред по провајдеру: чување пролаза замењује само постојећи ред за исти провајдер. Јавна читања (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) враћају само јавне кључеве.

## Модел података

Схема `giving` (`Api/src/modules/giving/db/DatabaseTypes.ts`, модели у `models/`) је MySQL схема којој се приступа преко Kysely-а:

| Табела | Улога |
|--------|-------|
| `gateways` | Конфигурација провајдера по цркви: `provider`, `publicKey`, шифровани `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Назначења давања (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Груписање за унос и извештавање (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Један поклон: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; изјаве, збирови, контролне табле и извештаји о донацијама броје само `complete` или null), `transactionId` |
| `fundDonations` | Расподела донације на један или више фондова (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Понављајући поклон; `id` је ID претплате код пролаза, повезан са `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Подела понављајућег поклона по фондовима |
| `customers` | Повезује `personId` са ID-јем купца код пролаза, по `provider`-у |
| `gatewayPaymentMethods` | Сачуване картице и банке: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Евиденција webhook и других догађаја и кључ за спречавање дупликата (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Кампање обећања везане за фонд и износ који је свако лице обећало |

Донација се дели по фондовима преко `fundDonations`: донација носи укупан износ, а сваки `fundDonation` носи свој део. `donations.currency` и `gateways.currency` чувају ISO валуту. Сваки провајдер објављује своје `supportedCurrencies`, а износи се форматирају помоћу `CurrencyHelper.formatCurrencyWithLocale`.

## Токови од почетка до краја

### Члан: једнократна и понављајућа донација (B1App)

Екран за донације за пријављене кориснике (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) састоји се од три apphelper компоненте: `MultiGatewayDonationForm`, `PaymentMethods` и `RecurringDonations`. B1App обавља податке око тога: `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`, и прослеђује листу пролаза. Разрешени провајдер сам учитава свој SDK из јавног кључа пролаза. Сама наплата одвија се унутар apphelper-а: разрешени провајдер токенизује нови или сачувани начин плаћања, а затим шаље захтев на `/giving/donate/charge` за једнократни поклон или на `/giving/donate/subscribe` за понављајући. Обе крајње тачке приписују пријављеног донатора његовом `personId`-ју (само они који имају `donations.edit` могу да приписују неком другом) и одбијају поделе по фондовима чији збир превазилази наплаћени износ. Понављајући поклони креирају ред у `subscriptions` плус `subscriptionFunds` и распоред предају пролазу (Stripe Subscriptions, PayPal Billing Plans или KF понављајући распоред).

### Гост или анонимно давање

Јавна страница за донације (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) и панел „дај одмах“ приказују `NonAuthDonationWrapper` из `@churchapps/apphelper/website`, који око `GuestForm` провајдера уметне reCAPTCHA и Elements контекст пролаза. Гости немају пријаву, сачуване начине плаћања ни историју. Ток учитава `GET /giving/funds/churchId/:id` и `GET /giving/donate/gateways/:churchId` (само јавни кључеви), проверава посетиоца преко `POST /giving/donate/captcha-verify`, токенизује у прегледачу и шаље на `/giving/donate/charge` (или `/subscribe`). Позив за проверу враћа `captchaPass` потписан HMAC-ом са роком од 10 минута (`Api/src/modules/giving/helpers/CaptchaPass.ts`). Образац га шаље уз сваки гостујући новчани захтев. Када је `CAPTCHA_ENFORCE=true`, API одбија гостујуће позиве `create-order`, `charge`, `subscribe`, `addcard` и `ach-setup-intent-anon` без важеће пропусnice за ту цркву. Гостујуће плаћене пријаве на догађаје (`POST /content/registrations/register`) проверавају исту пропусницу непосредно пре наплате; видети [Пријаве на догађаје](./registrations#payment-flow). Гостујући ACH користи анонимни `POST /giving/paymentmethods/ach-setup-intent-anon`, који дозвољава само тренутну верификацију (Financial Connections). Провера микроуплатом завршава се после неколико дана, када страница за госте више није отворена, па не би могла да доврши поклон. Образац одбија да наплати неверификовани SetupIntent и упућује донатора на картицу или на банку за пријављеног корисника.

Три опције обрасца за госте користе исти позив за наплату. `?fundId=` и `?amount=` у URL-у за донације унапред бирају поделу по фондовима (читају их образац сваког провајдера за госте при монтирању и прослеђују кроз уобичајени обрађивач промене фонда, тако да се збирови и накнаде ажурирају). `anonymous: true` тера `DonateController.charge` да одбаци било коју особу коју је клијент послао и поклон евидентира са `personId = null`. Образац за госте прескаче `/people/loadOrCreate` и корак са купцем и трезором, а три провајдера која одмах евидентирају поклоне престају да повлаче особу из купца код пролаза. Apple Pay захтева да се домен странице региструје код Stripe-а, па образац Stripe-а за госте једном по сесији шаље јавни захтев `POST /giving/donate/register-domain` ограничен по учесталости. Он прихвата само домен који припада цркви (`<subDomain>.b1.church`, ред у табели домена модула за садржај или локални хост) пре позивања Stripe-овог API-ја за домене начина плаћања.

### Административно евидентирање и увоз из Stripe-а (B1Admin)

Одељак за донације у B1Admin (`B1Admin/src/donations/`) је место где финансијски тимови раде. Унос у сериje (`components/BulkDonationEntry.tsx`) евидентира поклоне у готовини, чеком или у натури слањем на `/giving/donations`, а затим на `/giving/funddonations`. Пролаз није укључен. Лист **Евидентирај поклон** на запису особе (`components/LogGiftDialog.tsx`) ради исто за појединачни поклон: прво налази серију чији се `batchDate` поклапа са датумом поклона или прави нову названу по том датуму (`POST /giving/donationbatches`), а ако каснији корак не успе, брише донацију и нову серију. Фондови, серије, кампање и изјаве се сваки мапирају на своје CRUD путање `/giving/*`. Странице изјава о давању (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) траже једну календарску годину преко `GET /donations?startDate=&endDate=` и `GET /fundDonations?startDate=&endDate=`, а не целу историју цркве, која би могла да пређе ограничење величине одговора Lambda-е. Панел за донације у стилу члана (`B1Admin/src/donationComponents/`) користи исте apphelper компоненте као и B1App.

Извештавање и предаја рачуноводству обављају се на клијенту или у извршиоцу извештаја, а не преко пролаза. QuickBooks извоз на страници серије прави CSV за књижење из `donations` и `fundDonations` серије (дебит Undeposited Funds, један кредит по фонду). Приказ Lapsed Givers на страници Summary покреће `Api/reports/lapsedGivers.json` кроз општи извршилац извештаја, а имена особа razrešава `ReportOutput`. Формати потврда за државе (Канада, Аустралија, Нови Зеланд) су подешавања цркве у кључ-вредност складишту чланства. Приказује их `GivingStatementDocument` и дуплира их штампана страница у B1App. Странице за штампу изјава у B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) прослеђују подешавање цркве `logoLight` (преко `usePrintLogo` у `B1Admin/src/components/PrintChurchHeader.tsx`), па се логотип штампа на врху сваке изјаве, а штампа се аутоматски покреће тек када се слика учита.

### Статус серије и дозвола за унос донација

Серије се могу затворити да би пребројана депозитна сума остала онаква каква је. `POST /giving/donationbatches/:id/close` и `/:id/reopen` (само Donations.Edit) једини су писци у `status`, `closedDate` и `closedBy` (`DonationBatchRepo.setStatus`). Обично чување серије их никада не дира, па књижење серије не може да је поново отвори. Приступ за писање централизован је у `Api/src/modules/giving/helpers/BatchAccessHelper.ts`. Donations.Edit може да мења било шта, док ужа дозвола Donations.Enter (`GivingApi` / `Donations` / `Enter`, „Enter Donations“ у уреднику улога) може да креира серије и да чува или брише донације и поделе по фондовима само док су и текућа серија донације и циљна серија отворене, и никада за поклон путем пролаза (онај са `transactionId`). Блокирани упис враћа `403 { error: "This batch is closed." }`. Читање серија прихвата Donations.ViewSummary или Donations.Enter, па бројач може да изабере серију у коју уписује. На клијенту, `B1Admin/src/donations/batchAccess.ts` огледа та правила (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), а `Header` и `SecondaryMenuHelper` приказују **Donations > Batches** свакоме ко може да види серије, чак и без View Summary.

### Претварање збирова у мешаним валутама

Сваки ендпоинт који враћа један укупан збир преко поклона који могу бити у различитим валутама (KPI-ји за сажетак давања у `GivingKpiCards`, укупан износ серије, укупан износ фонда и збирови године до данас и периода на екрану за донације у B1App) претвара износ у подразумевану валуту цркве на серверској страни, уместо да сабира различите валуте. `Api/src/shared/helpers/ExchangeRateHelper.ts` преузима курсеве са `api.frankfurter.dev` по валути цркве, кешира их у меморији процеса 12 сати и излаже `convertTotals(rows, churchCurrency, rates)`. Редови се већ групишу по валути у SQL-у (мали број група, никада конверзија по сваком поклону). Свака група се претвара и сабира, а резултат носи заставицу `isConverted` коју клијент користи за приказ напомене „Конвертовано по актуелним курсевима“. `GET /donations/exchange-rates` излаже табелу курсева клијентима којима је потребна (екран за донације у B1App). Курсеве никада не прихвата захтев, већ их само преузима сервер, па клијент не може да утиче на пријављени збир. Појединачни записи о донацијама и извештаји у оригиналној валути никада се не конвертују. Конвертују се само збирни износи.

Увоз из Stripe-а (`B1Admin/src/donations/StripeImportPage.tsx`) накнадно уноси поклоне дате ван B1. Позива `POST /giving/donate/replay-stripe-events` са `dryRun: true` за преглед, а затим са `dryRun: false` за увоз. Сервер набраја Stripe догађаје за опсег датума и прескаче оне које је већ евидентирао. Поклапање се најпре врши по ID-ју провајдера у `eventLogs`, затим по ID-ју трансакције, па преко `DonationRepo.findMatchingDonation` (износ + датум + особа), тако да поновно покретање никада не увози двоструко. Догађаји `charge.succeeded` / `payment_intent.succeeded` за претплате се прескачу, јер `invoice.paid` евидентира те поклоне. Новије верзије Stripe API-ја изостављају `PaymentIntent.invoice`, па се прескакање ослања и на опис „Subscription …“.

## Webhook-ови и усклађивање

Наплаћена плаћања и промене стања претплата стижу на `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Обрада је намерно идемпотентна:

1. **Верификација.** `GatewayService.verifyWebhook` делегира проверу потписа провајдеру. Неуспешан потпис враћа 401. Догађаји којима не треба обрада прекидају се одговором 200.
2. **Спречавање дупликата догађаја.** `EventLogRepo.loadByProviderId` прескаче webhook који је већ забележен у `eventLogs`.
3. **Спречавање дупликата донације.** Пре креирања било чега, `DonationRepo.loadByTransactionId` проверава сваки кандидат ID који корисни терет може да садржи. Тако се апсорбују дупле испоруке, вишефазни ACH догађаји (на чекању → поравнато) и случај у којем је `/donate/charge` већ оптимистично евидентирао поклон.
4. **Примена.** `classifyWebhookEvent(eventType)` провајдера каже шта догађај значи (`donation` на чекању или завршен, `cancel-subscription` или `ignore`). Завршена плаћања креирају `complete` донацију (или унапређују постојећу `pending` или `failed`). ACH догађаји се евидентирају као `pending` до поравнања. Неуспела фактура претплате (Stripe `invoice.payment_failed`) креира `failed` донацију са кључем на ID фактуре, а догађаји отказивања бришу локални ред у `subscriptions`. Контролер никада не проверава називе догађаја специфичне за провајдера.

### Неуспели понављајући поклони и подсетници за наплату

Донација са статусом `failed` је јединица рада за опоравак. `GET /giving/donations/failed` их набраја са најновијом поруком о грешци пролаза из `eventLogs` и заставицом `canRetry` из могућности пролаза. `POST /giving/donate/retry/:donationId` позива `retryFailedPayment` провајдера (Stripe плаћа отворену фактуру), а резултујући webhook унапређује ред у `complete` кроз уобичајени пут спречавања дупликата. Подсетничке е-поруке за наплату шаљу се донатору из webhook обрађивача на дан 0, а затим из `DunningHelper.run` у поноћном тајмеру (повезаном и у `lambda/timer-handler.ts` и у `RailwayCron.ts`) на 3. и 7. дан. Свако слање се бележи у `eventLogs` као `provider: "dunning"`, `providerId: "<donationId>:<day>"`, па поновно покретање никада не шаље е-пошту два пута. Када Stripe одустане и откаже претплату (`customer.subscription.deleted` са `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` шаље донатору једну е-поруку (`providerId: "<subscriptionId>:canceled"`). Отказивања које покрене донатор или администратор остају без поруке. Stripe никада не додаје догађаје постојећој крајњој тачки. Након промене `StripeHelper.webhookEvents`, или поново сачувајте пролаз или покрените `tools/manual/stripe-webhook-events.ts` (подразумевано пробно покретање, `--apply` за упис) против продукције.

Провајдери са `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) евидентирају наплате из одговора на `/charge` (за успешан ток није потребан webhook), док Stripe се ослања на `payment_intent.succeeded` / `invoice.paid` и на ACH `payment_intent.processing`. Обрада накнада (`POST /giving/donate/fee`, заставица пролаза `payFees` и `calculateFees` сваког провајдера) рачуна бруто увећање „покриј накнаде“ на страни донатора. B1 не узима платформски удео, па се никада не додаје накнада за апликацију.

:::info
Путање наплате и webhook-а пишу исте редове у `donations` и `fundDonations`. `transactionId` је кључ спајања који спречава да оптимистично евидентирана наплата и њен каснији webhook направе две донације за један поклон.
:::

## Повезане странице

- [Крајње тачке давања](../api/endpoints/giving): пуна REST површина за донације, фондове, серије, пролазе, претплате, начине плаћања и webhook-ове
- [AppHelper](../shared-libraries/app-helper): npm пакет који испоручује регистар провајдера плаћања и компоненте за донације
- [Структура модула](../api/module-structure): како је GivingApi модул организован на серверској страни
