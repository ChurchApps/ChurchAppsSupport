---
title: "Architektura darování"
description: "Vývojářský průvodce darováním v ChurchApps: jak B1 Admin a B1.church posílají dary přes brány Stripe, PayPal, Kingdom Funding nebo Paystack."
---

# Architektura darování

<div class="article-intro">

ChurchApps zpracovává dary pomocí modelu brány (gateway-rail): kostel si ponechává vlastní účet Stripe (nebo PayPal, Kingdom Funding či Paystack) a B1 nikdy nevystupuje v platebním toku jako platformní zpracovatel. Údaje o kartě se tokenizují v prohlížeči a nikdy se nedostanou na server ChurchApps. Tato stránka popisuje celý zásobník: registr poskytovatelů plateb na straně klienta v `@churchapps/apphelper`, abstrakci brány GivingApi, datový model darů a způsob, jakým se webhooky brány promítají zpět do databáze.

</div>

## Přehled

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Platební brána                       │
│                             │                   │  (Stripe / PayPal / KF / Paystack)    │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ zadání karty      │  Stripe Elements · KF tokenizér ·     │
│  │ Registr poskytovatelů │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ plateb                │  │◀── token / nonce ─│  (karta se nikdy nedostane na server  │
│  │ getPaymentProvider()  │  │                   │   B1)                                 │
│  │ Stripe · PayPal · KF  │  │                   └──────────▲────────────────┬───────────┘
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ podepsaný webhook
┌─────────────────────────────────────────────┐ (tajný klíč) │                │ událost
│  GivingApi — modul /giving                  │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  uložení donations + fundDonations — deduplikace přes eventLogs / transactionId
                      ▼
                MySQL (schéma giving)
```

Tři principy platí napříč celým zásobníkem:

1. **Kartu drží brána.** Každý vstupní widget poskytovatele tokenizuje data v prohlížeči; API přijímá pouze token, nonce nebo identifikátor objednávky.
2. **Jedna abstrakce, mnoho poskytovatelů.** Prohlížeč získává `PaymentProvider` z registru; server získává `IGatewayProvider` z továrny. Obojí se řídí podle stejného normalizovaného názvu poskytovatele uloženého u záznamu brány.
3. **Webhooky jsou zdrojem pravdy pro vypořádání.** Odpověď na platbu se zaznamenává optimisticky, ale podepsaný webhook brány je tím, co potvrzuje (nebo vytváří) dokončený dar. Na obou stranách existují ochrany proti duplicitnímu zpracování.

## Na straně klienta: registr poskytovatelů plateb (`@churchapps/apphelper`)

Registr se nachází v `Packages/apphelper/src/donations/providers/`. Widgety a pomocné funkce každého poskytovatele jsou v jeho vlastní podsložce (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Nic mimo `providers/` nerozhoduje podle názvu poskytovatele. `PaymentProvider` (viz `providers/types.ts`) obsahuje vše, co hostitelská aplikace potřebuje pro jednu bránu: `descriptor` (popisky pro administrátora, podporované měny, pole poplatků, výchozí sazby poplatků, adresy URL pro nástěnku a registraci), sadu příznaků `capabilities` (uložené karty, ACH, opakované platby, zadání nové karty přímo v aplikaci, implicitní uložení při tokenizaci), React widgety pro zadání člena (`MemberWrapper`/`MemberEntry`), darování hostů (`GuestForm`), úpravu uložených platebních metod (`MethodEditForm`) a platby z formulářových otázek (`FormPayment`). Dále obsahuje `buildChargeRequest(ctx, token)`, což je jediné místo, kde se tvar datové části požadavku na platbu u jednotlivých poskytovatelů liší. `MemberWrapper` každého poskytovatele načítá vlastní SDK podle veřejného klíče uloženého u záznamu brány, takže hostitelské aplikace nikdy neimportují SDK brány (B1App a B1Admin nemají závislost na `@stripe/*`). Funkce `pickDefaultGateway(gateways, capability?)` centralizuje výběr brány kostela, kterou má daná plocha použít.

`providers/registry.ts` obsahuje vestavěné poskytovatele. Jsou **odkazováni hodnotou**, nikoli registrováni přes vedlejší efekt modulu, takže tree-shaking nástroje pro sestavení nikdy nemůže registraci odstranit:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funkce | Účel |
|----------|---------|
| `getPaymentProvider(name)` | Vyhledá poskytovatele podle normalizovaného názvu; při neznámém názvu se přepne na Stripe, aby chybně nastavený poskytovatel nikdy tvrdě neshodil formulář pro dárce |
| `registerPaymentProvider(p)` | Zaregistruje dodatečného poskytovatele za běhu (pro vlastní bránu hostitelské aplikace) |
| `listPaymentProviders()` | Vypíše vestavěné i vlastní poskytovatele — slouží k sestavení rozbalovacího seznamu bran v administraci |
| `hasPaymentProvider(name)` | Ověří členství v registru |

**Vestavění klientští poskytovatelé: Stripe, PayPal, Kingdom Funding, Paystack.** B1App a B1Admin registr pouze *čtou* (`getPaymentProvider`, `listPaymentProviders`); žádná z nich nevolá `registerPaymentProvider` — registrace zůstává uvnitř apphelperu.

Každý poskytovatel tokenizuje jinak, ale všichni udržují kartu mimo B1:

| Poskytovatel | Vstupní widget | Token odeslaný do API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; formulář pro hosty navíc vykresluje `ExpressCheckoutElement` (Apple Pay / Google Pay, jednorázové dary), jehož `onConfirm` vrací stejný identifikátor `pm_…` | identifikátor platební metody (`pm_…`); bankovní účet přes `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` pro účty v USD, kanadský PAD `acss_debit` (hostovaný modal s mandátem, mandát `default_for` faktur/předplatných, jednorázové platby předávají identifikátor mandátu) pro účty v CAD |
| Kingdom Funding | Hostovaný formulář tokenizéru navázaný na veřejný klíč brány | jednorázový nonce |
| PayPal | PayPal Hosted Fields (karta, opakované platby) a PayPal Smart Buttons s financováním přes Venmo (jednorázové platby); oba sdílejí jedno načtení SDK a objednávku na serveru vytváří `/donate/client-token` + `/donate/create-order` | zachycený identifikátor objednávky |
| Paystack | Vyskakovací okno Paystack Inline (`js.paystack.co/v2/inline.js`) — platbu samo vyskakovací okno zpracuje (karta, mobilní peněženka, bankovní převod, USSD) | referenční číslo zaplacené transakce; uložené metody jsou autorizační kódy Paystack `AUTH_…` |

Funkce `finalizeResult` u Stripe spouští 3-D Secure / SCA v prohlížeči (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) dříve, než se dar považuje za dokončený. Sdílený formulář pouze zavolá `provider.finalizeResult(result)` a nemusí vědět, co se uvnitř děje.

## Na straně serveru: abstrakce brány (GivingApi)

Modul `/giving` (`Api/src/modules/giving`) vystavuje REST rozhraní; infrastruktura bran je v `Api/src/shared/helpers`. `DonateController` nikdy nekomunikuje přímo se SDK brány — prochází přes `GatewayService`, který z `GatewayFactory` získá správný `IGatewayProvider` a předá mu dešifrovaný `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() dešifruje privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) je kontrakt, který každá brána implementuje. Zahrnuje životní cyklus webhooků (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), platby (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), poplatky (`calculateFees`), práci s uloženými metodami (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) a volitelné doplňky (zákazníci, objednávky, SetupIntents, přehrávání událostí, `retryFailedPayment` pro neúspěšnou fakturu předplatného a `registerPaymentMethodDomain` pro ověření domény Apple Pay). Pokud poskytovatel volitelný hook nemá, je pro danou akci hlášen jako nepodporovaný a uživatelské rozhraní příslušné ovládání skryje. Každá třída poskytovatele deklaruje vlastní matici `capabilities` (podporované měny, ACH, vrácení plateb, požadavky na předplatná, limity transakcí) — `GatewayService.getProviderCapabilities(provider)` ji pouze přečte. Příznaky jako `logsDonationsImmediately` řídí chování kontrolerů bez jakýchkoli podmínek podle názvu poskytovatele v kontrolerech.

**Serverové poskytovatele registrovaní v `GatewayFactory`:**

| Poskytovatel | Dostupnost |
|----------|-------------|
| Stripe | Vždy zapnuto |
| PayPal | Vždy zapnuto |
| Kingdom Funding | Vždy zapnuto |
| Paystack | Vždy zapnuto (obchodníci v Nigérii, Ghaně, Jihoafrické republice, Keni a Pobřeží slonoviny; měny NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Volitelně přes proměnnou prostředí `ENABLE_SQUARE` |
| ePayMints | Volitelně přes proměnnou prostředí `ENABLE_EPAYMINTS` |

Paystack se od ostatních liší tím, že peníze se přesouvají dříve, než se do toho zapojí GivingApi: vyskakovací okno strhne částku od dárce, `processCharge` je `GET /transaction/verify/:reference`, jehož zaplacená částka a měna se musí shodovat s darem, který se zaznamenává (reference, která už je evidována, se nikdy nezaznamená dvakrát). První dar z opakovaného plánu se zaznamenává z `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` s `start_date` o jeden interval později). Webhooky jsou podepsány samotným tajným klíčem (`x-paystack-signature`, HMAC-SHA512 přes surové tělo požadavku). Paystack nemá API pro správu webhooků, proto administrační obrazovka zobrazuje adresu URL, kterou kostel vloží do svého dashboardu. Události `charge.success` při obnovení neobsahují rozdělení do fondů; poskytovatel jej obnoví z lokálních řádků `subscriptions`/`subscriptionFunds` daného dárce. Jako `reusable` jsou označeny pouze autorizace kartou — dary přes mobilní peněženku jsou jednorázové, takže `createSubscription` je odmítne. Demo data přidávají druhý kostel (Accra Community Church, `CHU00000002`) s testovací bránou Paystack v GHS, aby sada Paystack Playwright běžela vedle Graceiny testovací sady Stripe.

Vlastní poskytovatele lze registrovat za běhu, pokud je nastavena proměnná `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; základní třída pro ně je `AbstractExperimentalGatewayProvider`. Názvy poskytovatelů se porovnávají bez ohledu na velikost písmen.

### Konfigurace brány a tajné údaje

Administrátor ukládá přihlašovací údaje brány přes `POST /giving/gateways` (`GatewayController`). Při uložení kontroler před zápisem zašifruje privátní a webhook klíče pomocí `EncryptionHelper`. Pokud hostitel není localhost, pak smaže stávající webhook kostela a vytvoří nový, který ukazuje na `/giving/donate/webhook/{provider}?churchId=…`. Kostel má jeden řádek na poskytovatele: uložení brány nahradí pouze existující řádek pro stejného poskytovatele. Veřejná čtení (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) vracejí pouze veřejné klíče.

## Datový model

Schéma giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modely v `models/`) je schéma MySQL přístupné přes Kysely:

| Tabulka | Role |
|-------|------|
| `gateways` | Konfigurace poskytovatele pro daný kostel: `provider`, `publicKey`, šifrované `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Určení darů (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Seskupení pro zadávání a reporting (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Jeden dar: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; výpisy, součty, nástěnky a přehledy darů počítají pouze `complete` nebo null), `transactionId` |
| `fundDonations` | Rozdělení daru mezi jeden nebo více fondů (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Opakovaný dar; `id` je identifikátor předplatného u brány, propojený s `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Rozdělení opakovaného daru do fondů |
| `customers` | Propojuje `personId` s identifikátorem zákazníka u brány, pro každého `provider` zvlášť |
| `gatewayPaymentMethods` | Uložené karty/účty: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Auditní záznam webhooků a událostí a klíč pro deduplikaci (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Kampaně slibů vázané na fond a částka, kterou se každá osoba zavázala přispět |

Dar se rozděluje do fondů přes `fundDonations`: dar nese celkovou částku, každý `fundDonation` nese jeden díl. `donations.currency` a `gateways.currency` nesou kód měny ISO; každý poskytovatel uvádí své `supportedCurrencies` a částky se formátují pomocí `CurrencyHelper.formatCurrencyWithLocale`.

## Průběh od začátku do konce

### Jednorázový a opakovaný dar člena (B1App)

Obrazovka darování pro přihlášené uživatele (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) skládá tři komponenty z apphelperu: `MultiGatewayDonationForm`, `PaymentMethods` a `RecurringDonations`. B1App zajišťuje okolní načítání dat — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — a seznam bran předává dál. Vyřešený poskytovatel si načte vlastní SDK podle veřejného klíče brány. Samotná platba probíhá uvnitř apphelperu: vyřešený poskytovatel tokenizuje (novou nebo uloženou) metodu a poté odešle požadavek na `/giving/donate/charge` pro jednorázový dar, nebo na `/giving/donate/subscribe` pro opakovaný. Oba endpointy přiřazují přihlášeného dárce k jeho vlastnímu `personId` (přiřadit daru jinou osobu může pouze držitel oprávnění `donations.edit`) a odmítají rozdělení do fondů, jehož součet přesahuje účtovanou částku. Opakované dary vytvářejí řádek `subscriptions` a `subscriptionFunds` a předávají plán bráně (Stripe Subscriptions, PayPal Billing Plans nebo opakovaný plán KF).

### Dar hosta nebo anonymní dar

Veřejná stránka pro darování (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) a panel „darovat nyní“ vykreslují `NonAuthDonationWrapper` z `@churchapps/apphelper/website`, který kolem `GuestForm` poskytovatele vkládá reCAPTCHA a kontext Elements dané brány. Hosté se nepřihlašují, nemají uložené metody ani historii. Postup načte `GET /giving/funds/churchId/:id` a `GET /giving/donate/gateways/:churchId` (pouze veřejné klíče), ověří návštěvníka přes `POST /giving/donate/captcha-verify`, tokenizuje v prohlížeči a odešle na `/giving/donate/charge` (nebo `/subscribe`). Ověřovací volání vrací 10minutový `captchaPass` podepsaný HMAC (`Api/src/modules/giving/helpers/CaptchaPass.ts`), který formulář odesílá s každým peněžním požadavkem hosta. Pokud je nastaveno `CAPTCHA_ENFORCE=true`, Api odmítne volání `create-order`, `charge`, `subscribe`, `addcard`, `ach-setup-intent-anon` od hosta bez platného průkazu pro daný kostel. Platby hostů za placené akce (`POST /content/registrations/register`) kontrolují stejný průkaz těsně před účtováním; viz [Registrace na akce](./registrations.md#payment-flow). Bankovní účet hosta přes anonymní `POST /giving/paymentmethods/ach-setup-intent-anon` podporuje pouze okamžité ověření (Financial Connections): kontrola mikroplatbou se dokončí až za několik dní, kdy už host stránku opustil, takže by dar nikdy nebyl dokončen. Formulář odmítne účtovat neověřený SetupIntent a dárce nasměruje ke kartě nebo k nastavení bankovního účtu přihlášeného uživatele.

Tři volby ve formuláři pro hosty využívají stejné volání platby. Parametry `?fundId=` a `?amount=` v adrese pro darování předvyplní rozdělení do fondů (čte je formulář hosta každého poskytovatele při připojení a předává normální obslužné rutině změny fondu, takže se aktualizují součty a poplatky). `anonymous: true` způsobí, že `DonateController.charge` zahodí jakoukoli osobu odeslanou klientem a dar zaznamená s `personId = null`. Formulář pro hosty přeskočí `/people/loadOrCreate` a krok se zákaznickým účtem/trezorem; tři poskytovatelé, kteří logují okamžitě, přestanou získávat osobu z ID zákazníka u brány. Apple Pay vyžaduje, aby byla doména stránky zaregistrována u Stripe, takže formulář pro hosty u Stripe jednou za relaci odešle požadavek na veřejný endpoint `POST /giving/donate/register-domain` s omezením počtu požadavků. Ten přijme pouze doménu patřící kostelu (`<subDomain>.b1.church`, řádek v tabulce domén modulu content, nebo lokální hostitel) a teprve potom volá API pro domény platebních metod u Stripe.

### Zaznamenání administrátorem a import ze Stripe (B1Admin)

Sekce darů v B1Admin (`B1Admin/src/donations/`) je místo, kde pracují finanční týmy. Zadávání dávek (`components/BulkDonationEntry.tsx`) zaznamenává hotovostní, šekové a naturální dary odesláním na `/giving/donations` a poté na `/giving/funddonations` — bez účasti brány. Okno **Zaznamenat dar** v záznamu osoby (`components/LogGiftDialog.tsx`) dělá totéž pro jeden dar: nejprve najde dávku, jejíž `batchDate` odpovídá datu daru, nebo vytvoří dávku pojmenovanou podle tohoto data (`POST /giving/donationbatches`). Pokud některý pozdější krok selže, dar a nově vytvořenou dávku znovu smaže. Fondy, dávky, kampaně a výpisy se mapují na své CRUD trasy `/giving/*`. Stránky výpisů darů (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) požadují jeden kalendářní rok přes `GET /donations?startDate=&endDate=` a `GET /fundDonations?startDate=&endDate=`, nikoli celou historii kostela, která by mohla přesáhnout limit velikosti odpovědi Lambda. Panel pro darování ve stylu člena (`B1Admin/src/donationComponents/`) znovu používá stejné komponenty apphelperu jako B1App.

Reporting a předávání účetním údajům jsou práce na straně klienta nebo běhu reportů, nikoli práce s bránou. Export pro QuickBooks na stránce dávky sestavuje CSV účetního zápisu z `donations` + `fundDonations` dávky (debet Undeposited Funds, jeden kredit na fond). Pohled Lapsed Givers na stránce Summary spouští `Api/reports/lapsedGivers.json` přes obecný běhový modul reportů, přičemž jména osob doplňuje `ReportOutput`. Formáty potvrzení pro jednotlivé země (Kanada / Austrálie / Nový Zéland) jsou nastavení kostela v úložišti klíč/hodnota modulu membership, které vykresluje `GivingStatementDocument` a které je duplikováno na tiskové stránce B1App. Tiskové stránky výpisů v B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) předávají nastavení kostela `logoLight` (přes `usePrintLogo` v `B1Admin/src/components/PrintChurchHeader.tsx`), takže se logo vytiskne v horní části každého výpisu, a před automatickým tiskem počkají na načtení obrázku.

### Stav dávky a oprávnění Zadávat dary

Dávky lze uzavřít, aby zaznamenaný spočítaný vklad zůstal beze změny. Jediné zápisy do `status`, `closedDate` a `closedBy` jsou `POST /giving/donationbatches/:id/close` a `/:id/reopen` (pouze Donations.Edit) (`DonationBatchRepo.setStatus`). Běžné uložení dávky tato pole nikdy nemění, takže odeslání dávky ji nemůže znovu otevřít. Přístup pro zápis je centralizován v `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit může měnit cokoli, zatímco užší oprávnění Donations.Enter (`GivingApi` / `Donations` / `Enter`, v editoru rolí „Zadávat dary“) smí vytvářet dávky a ukládat nebo mazat dary a rozdělení do fondů pouze tehdy, když jsou otevřené jak současná dávka daru, tak cílová dávka, a nikdy u daru z brány (tedy u daru s `transactionId`). Zablokovaný zápis vrací `403 { error: "This batch is closed." }`. Čtení dávek přijme Donations.ViewSummary nebo Donations.Enter, aby počítající osoba mohla vybrat dávku, do které zadává. Na straně klienta `B1Admin/src/donations/batchAccess.ts` zrcadlí tato pravidla (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`) a `Header` / `SecondaryMenuHelper` zobrazují **Dary > Dávky** každému, kdo může dávky vidět, i bez oprávnění View Summary.

### Převod součtů ve více měnách

Každý endpoint, který vrací jeden kombinovaný součet přes případně různé měny — souhrnné ukazatele KPI pro dary (`GivingKpiCards`), součet dávky darů, součet fondu a součty za rok či období na obrazovce darování v B1App — převádí částky na výchozí měnu kostela na straně serveru, místo aby sčítal různé měny. `Api/src/shared/helpers/ExchangeRateHelper.ts` načítá kurzy z `api.frankfurter.dev` podle měny kostela, ukládá je do paměti procesu na 12 hodin a nabízí `convertTotals(rows, churchCurrency, rates)`. Řádky jsou předem seskupeny podle měny přímo v SQL (několik skupin, nikdy přepočet každého daru zvlášť); každá skupina se převede a sečte a výsledek nese příznak `isConverted`, který klient využije k zobrazení poznámky „Přepočteno podle aktuálních kurzů“. `GET /donations/exchange-rates` zpřístupňuje tabulku kurzů klientům, kteří ji potřebují (obrazovka darování v B1App). Kurzy samotné nikdy nepřijímá žádný požadavek; vždy se načítají pouze na serveru, takže klient nemůže ovlivnit hlášený součet. Jednotlivé záznamy darů a historické reporty v původní měně se nikdy nepřepočítávají — převádějí se pouze kombinované součty.

Import ze Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) dodatečně doplňuje dary, které vznikly mimo B1: volá `POST /giving/donate/replay-stripe-events` s `dryRun: true` pro náhled a poté s `dryRun: false` pro import. Server vypíše události Stripe za zvolené období a přeskočí vše, co je již zaznamenáno. Shoda se hledá nejprve podle identifikátoru poskytovatele v `eventLogs`, poté podle identifikátoru transakce a nakonec přes `DonationRepo.findMatchingDonation` (částka + datum + osoba), takže opakované spuštění nikdy nezdvojí import. Události `charge.succeeded` / `payment_intent.succeeded` u předplatných se přeskakují, protože tyto dary zaznamenává `invoice.paid`. Novější verze API Stripe vynechávají `PaymentIntent.invoice`, proto se přeskakování řídí také podle popisu „Subscription …“.

## Webhooky a smiřování

Vypořádané platby a změny stavu předplatných přicházejí na `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Zpracování je záměrně idempotentní:

1. **Ověření** — `GatewayService.verifyWebhook` deleguje kontrolu podpisu na poskytovatele; neplatný podpis vrací 401. Události, které nevyžadují zpracování, se ukončí odpovědí 200.
2. **Deduplikace události** — `EventLogRepo.loadByProviderId` přeskočí webhook, který je již zaznamenán v `eventLogs`.
3. **Deduplikace daru** — před vytvořením čehokoli se `DonationRepo.loadByTransactionId` ověří proti každému kandidátnímu identifikátoru, který užitečné zatížení může obsahovat. To pohltí duplicitní doručení, víceetapové události ACH (čekající → vypořádáno) i případ, kdy `/donate/charge` už dar optimisticky zaznamenal.
4. **Aplikace** — `classifyWebhookEvent(eventType)` poskytovatele určuje, co událost znamená (`donation` čekající/dokončená, `cancel-subscription` nebo `ignore`). Dokončené platby vytvářejí dar se stavem `complete` (nebo povýší existující `pending` či `failed`), události v duchu ACH se zapisují jako `pending` až do vypořádání, neúspěšná faktura předplatného (Stripe `invoice.payment_failed`) vytvoří dar se stavem `failed` klíčovaný identifikátorem faktury a události o zrušení smažou lokální řádek `subscriptions`. Kontroler nikdy neprověřuje názvy událostí specifické pro poskytovatele.

### Neúspěšné opakované dary a upomínky

Dar se stavem `failed` je jednotka práce pro obnovení. `GET /giving/donations/failed` je vypíše spolu s nejnovější zprávou o selhání z brány z `eventLogs` a příznakem `canRetry` z možností brány. `POST /giving/donate/retry/:donationId` volá `retryFailedPayment` poskytovatele (Stripe uhradí otevřenou fakturu) a výsledný webhook povýší řádek na `complete` běžnou cestou deduplikace. Upomínkové e-maily odcházejí dárci z obslužné rutiny webhooku v den 0, poté z `DunningHelper.run` v půlnočním časovači (zapojeno v `lambda/timer-handler.ts` i `RailwayCron.ts`) ve 3. a 7. den. Každé odeslání se zaznamená v `eventLogs` jako `provider: "dunning"`, `providerId: "<donationId>:<day>"`, takže opakovaný běh nikdy neodešle e-mail dvakrát. Pokud Stripe se pokusy vzdá a předplatné zruší (`customer.subscription.deleted` s `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` pošle dárci jednorázový e-mail (`providerId: "<subscriptionId>:canceled"`). Zrušení, která iniciuje dárce nebo administrátor, zůstávají tichá. Stripe nikdy nepřidává události k existujícímu koncovému bodu: po změně `StripeHelper.webhookEvents` buď znovu uložte bránu, nebo spusťte `tools/manual/stripe-webhook-events.ts` (výchozí je zkušební běh, zápis provede `--apply`) proti produkci.

Poskytovatelé s `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) mají platby zaznamenané z odpovědi na `/charge` (pro šťastnou cestu není potřeba webhook), kdežto Stripe se spoléhá na `payment_intent.succeeded` / `invoice.paid` a ACH na `payment_intent.processing`. Zpracování poplatků (`POST /giving/donate/fee`, příznak brány `payFees` a `calculateFees` každého poskytovatele) na straně dárce vypočítá navýšení „pokrýt poplatky“. B1 si neúčtuje žádný platformní podíl, takže se nikdy nepřidává žádný aplikační poplatek.

:::info
Cesty platby a webhooku zapisují tytéž řádky `donations` / `fundDonations`. `transactionId` je spojovací klíč, který brání tomu, aby optimistický záznam platby a jeho pozdější webhook vytvořily dva dary pro jeden dar.
:::

## Související stránky

- [Endpointy darování](../api/endpoints/giving.md) — úplné REST rozhraní pro dary, fondy, dávky, brány, předplatná, platební metody a webhooky
- [AppHelper](../shared-libraries/app-helper.md) — balíček npm, který obsahuje registr platebních poskytovatelů a komponenty pro dary
- [Struktura modulů](../api/module-structure.md) — jak je modul GivingApi uspořádán na straně serveru
