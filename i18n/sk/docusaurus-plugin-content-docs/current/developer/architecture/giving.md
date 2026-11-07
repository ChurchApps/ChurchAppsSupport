---
title: "Giving Architecture"
description: "Vývojársky sprievodca darovaním v ChurchApps: ako B1 Admin a B1.church posielajú dary cez brány Stripe, PayPal, Kingdom Funding alebo Paystack."
---

# Giving Architecture

<div class="article-intro">

ChurchApps spúšťa darovania na modeli brány (gateway-rail): cirkev si ponecháva vlastný účet v Stripe (alebo PayPal, Kingdom Funding či Paystack) a B1 nikdy nevystupuje v toku peňazí ako platformový spracovateľ. Údaje o karte sa tokenizujú v prehliadači a nikdy sa nedostanú na server ChurchApps. Táto stránka mapuje celý zásobník — register poskytovateľov na strane klienta v `@churchapps/apphelper`, abstrakciu brány GivingApi, dátový model darovaní a spôsob, akým webhooky brány synchronizujú údaje späť do databázy.

</div>

## Prehľad

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Platobná brána                       │
│                             │                   │  (Stripe / PayPal / KF / Paystack)    │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ zadanie karty v   │  Stripe Elements · KF tokenizér ·     │
│  │ Register poskytovateľov│──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ platieb               │  │◀── token / nonce ─│  (karta nikdy nedosiahne server B1)   │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ podpísaný webhook
┌─────────────────────────────────────────────┐ (tajný kľúč) │                │ udalosť
│  GivingApi — modul /giving                  │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  uloženie donations + fundDonations — deduplikácia cez eventLogs / transactionId
                      ▼
                MySQL (schéma giving)
```

Tri princípy platia naprieč celým zásobníkom:

1. **Kartu drží brána.** Vstupný widget každého poskytovateľa tokenizuje údaje v prehliadači; API dostane len token, nonce alebo ID objednávky.
2. **Jedna abstrakcia, mnoho poskytovateľov.** Prehliadač získava `PaymentProvider` z registra; server získava `IGatewayProvider` z továrne. Obe strany využívajú rovnaký normalizovaný názov poskytovateľa uložený v zázname brány.
3. **Webhooky sú zdrojom pravdy pre vyrovnanie platieb.** Odpoveď na platbu sa zaznamenáva optimisticky, ale podpísaný webhook brány potvrdzuje (alebo vytvára) dokončené darovanie, pričom na oboch stranách existujú ochrany proti duplicitnému spracovaniu.

## Na strane klienta: register poskytovateľov platieb (`@churchapps/apphelper`)

Register sa nachádza v `Packages/apphelper/src/donations/providers/`, pričom widgety a pomocné funkcie každého poskytovateľa sú v jeho vlastnom podpriečinku (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — nič mimo `providers/` nerozhoduje podľa názvu poskytovateľa. `PaymentProvider` (pozri `providers/types.ts`) zahŕňa všetko, čo hostiteľská aplikácia potrebuje pre jednu bránu: `descriptor` (názvy pre administrátorov, podporované meny, polia poplatkov, predvolené sadzby poplatkov, URL adresy panelu a registrácie), sadu príznakov `capabilities` (uložené karty, ACH, opakované platby, vkladanie novej karty priamo, implicitné uloženie pri tokenizácii), React widgety pre zadávanie členom (`MemberWrapper`/`MemberEntry`), darovanie hosťami (`GuestForm`), úpravu uloženej metódy (`MethodEditForm`) a platby v rámci formulárových otázok (`FormPayment`), a tiež `buildChargeRequest(ctx, token)` — jediné miesto, kde sa tvar platobného požiadavku u jednotlivých poskytovateľov líši. `MemberWrapper` každého poskytovateľa načíta vlastný SDK z verejného kľúča v zázname brány, takže hostiteľské aplikácie nikdy neimportujú SDK brány (B1App a B1Admin nemajú závislosť na `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralizuje výber brány, ktorú má daný povrch použiť spomedzi brán cirkvi.

`providers/registry.ts` obsahuje vstavaných poskytovateľov. Sú **odkazovaní hodnotou**, a nie registrovaní prostredníctvom vedľajšieho efektu modulu, takže tree-shaking nástroja na zostavenie nemôže registráciu odstrániť:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funkcia | Účel |
|----------|---------|
| `getPaymentProvider(name)` | Získa poskytovateľa podľa normalizovaného názvu; ako záložný použije Stripe, aby nesprávne nakonfigurovaný poskytovateľ nikdy neznefunkčnil formulár darcu |
| `registerPaymentProvider(p)` | Zaregistruje ďalšieho poskytovateľa za behu (pre vlastnú bránu hostiteľskej aplikácie) |
| `listPaymentProviders()` | Vypíše vstavaných aj vlastných poskytovateľov — používa sa na zostavenie rozbaľovacieho zoznamu brán v administrácii |
| `hasPaymentProvider(name)` | Kontrola členstva |

**Vstavaní klientski poskytovatelia: Stripe, PayPal, Kingdom Funding, Paystack.** B1App a B1Admin register len *čítajú* (`getPaymentProvider`, `listPaymentProviders`); ani jedna nevolá `registerPaymentProvider` — registrácia zostáva vnútri apphelper.

Každý poskytovateľ tokenizuje odlišne, ale všetci udržiavajú kartu mimo B1:

| Poskytovateľ | Vstupný widget | Token odoslaný API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; formulár pre hostí navyše pripája `ExpressCheckoutElement` (Apple Pay / Google Pay, jednorazové dary), ktorého `onConfirm` vracia rovnaké ID `pm_…` | ID platobnej metódy (`pm_…`); bankový účet cez `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` pre USD brány, kanadský PAD `acss_debit` (modálne okno s mandátom, mandát `default_for` faktúr/predplatných, jednorazové platby odovzdávajú ID mandátu) pre CAD brány |
| Kingdom Funding | Hostený tokenizačný formulár viazaný na verejný kľúč brány | jednorazový nonce |
| PayPal | PayPal Hosted Fields (karta, opakované platby) plus PayPal Smart Buttons s financovaním cez Venmo (jednorazové); obe využívajú jedno načítanie SDK a objednávku na strane servera vytvorenú cez `/donate/client-token` + `/donate/create-order` | ID zachytenej objednávky |
| Paystack | Vyskakovacie okno Paystack Inline (`js.paystack.co/v2/inline.js`) — samotné okno vykoná platbu (karta, mobilné peniaze, bankový prevod, USSD) | referenčné číslo zaplatenej transakcie; uložené metódy sú autorizačné kódy Paystack `AUTH_…` |

Funkcia `finalizeResult` v Stripe spúšťa 3-D Secure / SCA v prehliadači (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) predtým, než sa darovanie považuje za dokončené; zdieľaný formulár len volá `provider.finalizeResult(result)` bez toho, aby vedel, čo táto funkcia robí.

## Na strane servera: abstrakcia brány (GivingApi)

Modul `/giving` (`Api/src/modules/giving`) poskytuje REST rozhranie; logika brány sa nachádza v `Api/src/shared/helpers`. `DonateController` nikdy nekomunikuje priamo so SDK brány — prechádza cez `GatewayService`, ktorý z `GatewayFactory` získa správny `IGatewayProvider` a odovzdá mu dešifrovanú `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() dešifruje privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) je zmluva, ktorú implementuje každá brána — životný cyklus webhookov (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), platby (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), poplatky (`calculateFees`), správa uložených metód (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) a voliteľné rozšírenia (zákazníci, objednávky, SetupIntents, opätovné prehrávanie udalostí, `retryFailedPayment` pre neúspešnú faktúru predplatného a `registerPaymentMethodDomain` pre overenie domény Apple Pay). Poskytovateľ, ktorý vynechá voliteľný hook, sa pre danú akciu hlási ako nepodporovaný a používateľské rozhranie príslušné ovládanie skryje. Každá trieda poskytovateľa deklaruje vlastnú maticu `capabilities` (podporované meny, ACH, vrátenia, požiadavky na predplatné, limity transakcií) — `GatewayService.getProviderCapabilities(provider)` ju len prečíta — a príznaky ako `logsDonationsImmediately` riadia správanie radiča bez akýchkoľvek podmienok podľa názvu poskytovateľa v radičoch.

**Serverový poskytovatelia registrovaní v `GatewayFactory`:**

| Poskytovateľ | Dostupnosť |
|----------|-------------|
| Stripe | Vždy zapnutý |
| PayPal | Vždy zapnutý |
| Kingdom Funding | Vždy zapnutý |
| Paystack | Vždy zapnutý (obchodníci v Nigérii, Ghane, Juhoafrickej republike, Keni, Pobreží Slonoviny; meny NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Voliteľne cez premennú prostredia `ENABLE_SQUARE` |
| ePayMints | Voliteľne cez premennú prostredia `ENABLE_EPAYMINTS` |

Paystack sa od ostatných líši v tom, že peniaze sa pohnú skôr, než je zapojená GivingApi: vyskakovacie okno strhne sumu od darcu, `processCharge` je `GET /transaction/verify/:reference`, ktorého zaplatená suma a mena musia zodpovedať darovaniu, ktoré sa zaznamenáva (referencia, ktorá už existuje, sa nikdy nezaznamená dvakrát), a prvý dar z opakovaného plánu sa zaznamenáva z `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` s `start_date` o jeden interval neskôr). Webhooky sú podpísané samotným tajným kľúčom (`x-paystack-signature`, HMAC-SHA512 nad nespracovaným telom) a Paystack nemá API na správu webhookov, preto administračná obrazovka zobrazuje URL, ktorú cirkev vloží do svojho panelu. Udalosti obnovy `charge.success` neobsahujú rozdelenie fondov; poskytovateľ ho obnoví z lokálnych riadkov `subscriptions`/`subscriptionFunds` darcu. Ako `reusable` sú označené len autorizácie kartou — darovania cez mobilné peniaze sú len jednorazové, preto ich `createSubscription` odmietne. Ukážkové dáta pridávajú druhú cirkev (Accra Community Church, `CHU00000002`) na testovacej bráne Paystack v GHS, aby Paystack Playwright suite bežala vedľa Stripe suite Grace.

Vlastní poskytovatelia sa dajú registrovať za behu, keď je nastavená premenná `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` je základná trieda pre nich. Názvy poskytovateľov sa porovnávajú bez ohľadu na veľkosť písmen.

### Konfigurácia brány a tajné údaje

Administrátor ukladá prihlasovacie údaje brány cez `POST /giving/gateways` (`GatewayController`). Pri uložení radič zašifruje privátny a webhook kľúč pomocou `EncryptionHelper` pred zápisom a potom — na akomkoľvek hostiteľovi okrem localhostu — vymaže existujúci webhook cirkvi a vytvorí nový, smerujúci na `/giving/donate/webhook/{provider}?churchId=…`. Cirkev má jeden riadok na poskytovateľa: uloženie brány nahradí len existujúci riadok pre ten istý poskytovateľ. Verejné čítania (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) vracajú len verejné kľúče.

## Dátový model

Schéma giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modely v `models/`) je schéma MySQL, prístupná cez Kysely:

| Tabuľka | Úloha |
|-------|------|
| `gateways` | Konfigurácia poskytovateľa pre cirkev: `provider`, `publicKey`, šifrované `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Určenia darov (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Zoskupenie pre zadávanie/reporting (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Jeden dar: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; výpisy, súčty, prehľady a reporty darov počítajú len `complete` alebo null), `transactionId` |
| `fundDonations` | Rozdelenie darovania na jeden alebo viac fondov (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Opakovaný dar; `id` je ID predplatného z brány, prepojené s `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Rozdelenie fondov pre opakovaný dar |
| `customers` | Prepája `personId` s ID zákazníka v bráne, pre každého `provider` |
| `gatewayPaymentMethods` | Uložené karty/účty: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Audítna stopa webhookov/udalostí a kľúč na deduplikáciu (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Kampane sľubov viazané na fond a sľúbená suma každej osoby |

Darovanie sa rozdeľuje medzi fondy cez `fundDonations` — darovanie nesie celkovú sumu, každý `fundDonation` nesie svoj podiel. `donations.currency` a `gateways.currency` nesú ISO menu; každý poskytovateľ uvádza svoje `supportedCurrencies` a sumy sa formátujú pomocou `CurrencyHelper.formatCurrencyWithLocale`.

## Konce-to-koniec toky

### Jednorazové a opakované dary členov (B1App)

Obrazovka darovania pre prihlásených používateľov (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) skladá tri komponenty apphelper: `MultiGatewayDonationForm`, `PaymentMethods` a `RecurringDonations`. B1App zabezpečuje okolité načítanie dát — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — a odovzdáva zoznam brán ďalej; vybraný poskytovateľ si načíta vlastný SDK z verejného kľúča brány. Samotná platba prebieha vnútri apphelper: vybraný poskytovateľ tokenizuje (novú alebo uloženú) metódu a potom odošle požiadavku na `/giving/donate/charge` pre jednorazový dar alebo na `/giving/donate/subscribe` pre opakovaný. Obe koncové body pripisujú prihláseného darcu k jeho vlastnému `personId` (len držitelia `donations.edit` môžu pripisovať inej osobe) a odmietajú rozdelenia fondov, ktorých súčet presahuje účtovanú sumu. Opakované dary vytvárajú riadok `subscriptions` plus `subscriptionFunds` a plán odovzdávajú bráne (Stripe Subscriptions, PayPal Billing Plans alebo opakovaný plán KF).

### Darovanie hosťami / anonymné darovanie

Verejná stránka darovania (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) a panel „darovať teraz“ vykresľujú `NonAuthDonationWrapper` z `@churchapps/apphelper/website`, ktorý obaľuje `GuestForm` poskytovateľa reCAPTCHA a kontextom Elements brány. Hostia nemajú prihlásenie, uložené metódy ani históriu. Tok načíta `GET /giving/funds/churchId/:id` a `GET /giving/donate/gateways/:churchId` (len verejné kľúče), overí návštevníka cez `POST /giving/donate/captcha-verify`, tokenizuje v prehliadači a odošle na `/giving/donate/charge` (alebo `/subscribe`). Overovacie volanie vracia 10-minútový HMAC-podpísaný `captchaPass` (`Api/src/modules/giving/helpers/CaptchaPass.ts`), ktorý formulár posiela pri každom peňažnom volaní za hostí; pri `CAPTCHA_ENFORCE=true` API odmietne volania hosťa `create-order`, `charge`, `subscribe`, `addcard` a `ach-setup-intent-anon` bez platného preukazu pre danú cirkev. Platené udalosti registrácie hostí (`POST /content/registrations/register`) overujú ten istý preukaz tesne pred svojou platbou; pozri [Registrácie na udalosti](./registrations.md#payment-flow). Bankový prevod hostí (ACH) využíva anonymný `POST /giving/paymentmethods/ach-setup-intent-anon`, ktorý povoľuje len okamžité overenie (Financial Connections): overenie mikrovkladom sa dokončí o niekoľko dní neskôr, keď už hosťovská stránka neexistuje, takže by dar nikdy nemohol dokončiť. Formulár odmietne účtovať neoverený SetupIntent a nasmeruje darcu na kartu alebo na nastavenie bankového účtu prihláseného používateľa.

Tri možnosti hosťovského formulára využívajú to isté volanie platby. `?fundId=` a `?amount=` v URL darovania vopred vyberú rozdelenie fondov (každý hosťovský formulár poskytovateľa ich načíta pri pripojení a odovzdá ich cez bežný obslužný kód zmeny fondu, takže sa aktualizujú súčty a poplatky). `anonymous: true` spôsobí, že `DonateController.charge` zahodí akúkoľvek osobu, ktorú klient odoslal, a dar zaznamená s `personId = null`; hosťovský formulár preskočí `/people/loadOrCreate` a krok zákazníka/trezora a tri poskytovatelia s okamžitým zápisom prestanú odvodzovať osobu z ID zákazníka v bráne. Apple Pay vyžaduje, aby bola doména stránky zaregistrovaná v Stripe, preto hosťovský formulár Stripe raz za reláciu odošle požiadavku na verejný, obmedzený koncový bod `POST /giving/donate/register-domain`, ktorý prijme len doménu patriacu cirkvi (`<subDomain>.b1.church`, riadok v tabuľke domén modulu obsahu alebo lokálny hostiteľ), a až potom zavolá API Stripe payment-method-domains.

### Administratívny zápis a import zo Stripe (B1Admin)

Sekcia darovaní v B1Admin (`B1Admin/src/donations/`) je miesto, kde pracujú finančné tímy. Zadávanie dávok (`components/BulkDonationEntry.tsx`) zapisuje hotovostné/šekové dary a dary v naturáliách odoslaním na `/giving/donations` a potom `/giving/funddonations` — bez účasti brány. Záložka **Zaznamenať dar** v záznamu osoby (`components/LogGiftDialog.tsx`) robí to isté pre jeden dar: najprv nájde dávku, ktorej `batchDate` zodpovedá dátumu daru, alebo vytvorí novú pomenovanú podľa toho dátumu (`POST /giving/donationbatches`), a ak niektorý neskorší krok zlyhá, dar/novú dávku opäť vymaže. Fondy, dávky, kampane a výpisy sa mapujú na svoje CRUD trasy `/giving/*`; stránky výpisov darov (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) vyžiadajú jeden kalendárny rok cez `GET /donations?startDate=&endDate=` a `GET /fundDonations?startDate=&endDate=`, namiesto celej histórie cirkvi, ktorá by mohla prekročiť limit veľkosti odpovede Lambda. Panel darovania v štýle člena (`B1Admin/src/donationComponents/`) znovu používa tie isté komponenty apphelper ako B1App.

Odovzdávanie výkazov a účtovníctva prebieha na strane klienta alebo v rámci nástroja na reporty, nie v rámci brány: export do QuickBooks na stránke dávky zostaví CSV s účtovným zápisom z `donations` + `fundDonations` dávky (debet Undeposited Funds, jeden kredit na fond), zobrazenie Lapsed Givers na stránke Súhrn spustí `Api/reports/lapsedGivers.json` cez všeobecný spúšťač reportov s menami osôb doplnenými cez `ReportOutput`, a formáty potvrdení pre jednotlivé krajiny (Kanada / Austrália / Nový Zéland) sú nastavenia cirkvi v úložisku kľúč/hodnota členstva, ktoré vykresľuje `GivingStatementDocument` a duplikuje sa na tlačovej stránke B1App. Tlačové stránky výpisov B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) odovzdávajú nastavenie `logoLight` cirkvi (cez `usePrintLogo` v `B1Admin/src/components/PrintChurchHeader.tsx`), aby sa logo vytlačilo v hornej časti každého výpisu, a pred automatickou tlačou počkajú na načítanie obrázka.

### Stav dávky a oprávnenie Zadávať dary

Dávky je možné uzavrieť, aby uzavretý vklad zostal taký, aký bol spočítaný. `POST /giving/donationbatches/:id/close` a `/:id/reopen` (len Donations.Edit) sú jediné zápisy do `status`, `closedDate` a `closedBy` (`DonationBatchRepo.setStatus`); bežné uloženie dávky sa ich nikdy nedotkne, takže odoslanie dávky ju nemôže znovu otvoriť. Prístup na zápis je sústredený v `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit môže meniť čokoľvek, zatiaľ čo užšie oprávnenie Donations.Enter (`GivingApi` / `Donations` / `Enter`, „Zadávať dary“ v editore rolí) môže vytvárať dávky a ukladať alebo mazať dary a rozdelenia fondov len vtedy, keď sú otvorené aktuálna dávka darovania aj cieľová dávka, a nikdy pri darovaní z brány (ten, ktorý má `transactionId`). Zablokovaný zápis vráti `403 { error: "This batch is closed." }`. Čítanie dávok akceptuje Donations.ViewSummary alebo Donations.Enter, aby mohol počítač vybrať dávku, do ktorej zadáva. Na strane klienta `B1Admin/src/donations/batchAccess.ts` zrkadlí tieto pravidlá (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`) a `Header` / `SecondaryMenuHelper` zobrazujú **Darovania > Dávky** každému, kto môže vidieť dávky, aj bez oprávnenia View Summary.

### Prevod súčtov v rôznych menách

Každý koncový bod, ktorý vracia jeden kombinovaný súčet pre potenciálne rôzne meny darov — prehľadové KPI súhrnu darov (`GivingKpiCards`), súčet dávky darov, súčet fondu a súhrny/obdobia na obrazovke darovania v B1App — prevádza na predvolenú menu cirkvi na strane servera namiesto sčítavania nesúrodých mien. `Api/src/shared/helpers/ExchangeRateHelper.ts` načítava kurzy z `api.frankfurter.dev` podľa meny cirkvi, ukladá ich do pamäte procesu na 12 hodín a sprístupňuje `convertTotals(rows, churchCurrency, rates)`: riadky sú vopred zoskupené podľa meny v SQL (niekoľko skupín, nikdy prevod pre každý dar), každá skupina sa prevedie a sčíta a výsledok nesie príznak `isConverted`, ktorý klient používa na zobrazenie poznámky „Prepočítané podľa aktuálnych výmenných kurzov“. `GET /donations/exchange-rates` sprístupňuje tabuľku kurzov klientom, ktorí ju potrebujú (obrazovka darovania B1App); samotné kurzy sa nikdy neprijímajú z požiadavky, ale vždy sa načítavajú na strane servera, takže klient nemôže ovplyvniť nahlasovaný súčet. Jednotlivé záznamy darov a historické reporty v pôvodnej mene sa nikdy neprevádzajú — prevádzajú sa len kombinované súčty.

Import zo Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) dopĺňa dary vytvorené mimo B1: volá `POST /giving/donate/replay-stripe-events` s `dryRun: true` na náhľad a potom s `dryRun: false` na import. Server vypíše udalosti Stripe za daný časový rozsah a preskočí všetko, čo je už zaznamenané — najprv podľa ID poskytovateľa v `eventLogs`, potom podľa ID transakcie, a potom podľa `DonationRepo.findMatchingDonation` (suma + dátum + osoba), takže opakované spustenie nikdy nespôsobí dvojitý import. Udalosti `charge.succeeded` / `payment_intent.succeeded` predplatného sa preskakujú, pretože tieto dary zaznamenáva `invoice.paid`; novšie verzie API Stripe vynechávajú `PaymentIntent.invoice`, preto sa preskočenie kľúčuje aj podľa popisu „Subscription …“.

## Webhooky a zosúladenie

Vyrovnané platby a zmeny stavu predplatného prichádzajú na `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Spracovanie je zámerne idempotentné:

1. **Overenie** — `GatewayService.verifyWebhook` deleguje kontrolu podpisu na poskytovateľa; neplatný podpis vráti 401. Udalosti, ktoré nevyžadujú spracovanie, sa skončia odpoveďou 200.
2. **Deduplikácia udalosti** — `EventLogRepo.loadByProviderId` preskočí webhook, ktorý je už zaznamenaný v `eventLogs`.
3. **Deduplikácia daru** — pred vytvorením čohokoľvek sa `DonationRepo.loadByTransactionId` skontroluje oproti každému kandidátovi na ID, ktorý môže užitočné zaťaženie obsahovať. Toto pokrýva duplicitné doručenia, viacfázové ACH udalosti (čakajúca → vyrovnaná) a prípad, keď `/donate/charge` dar už optimisticky zaznamenal.
4. **Aplikácia** — `classifyWebhookEvent(eventType)` poskytovateľa určí, čo udalosť znamená (`donation` čakajúca/dokončená, `cancel-subscription` alebo `ignore`); dokončené platby vytvárajú dar `complete` (alebo povýšia existujúci `pending` či `failed`), udalosti typu ACH sa zapisujú ako `pending` až do vyrovnania, neúspešná faktúra predplatného (Stripe `invoice.payment_failed`) vytvorí dar `failed` kľúčovaný podľa ID faktúry a udalosti zrušenia vymažú lokálny riadok `subscriptions`. Radič nikdy neskúma názvy udalostí špecifické pre poskytovateľa.

### Neúspešné opakované dary a upomínanie

Dar so stavom `failed` je jednotka práce pri obnove. `GET /giving/donations/failed` ich vypíše s najnovšou správou o zlyhaní z brány z `eventLogs` a príznakom `canRetry` z možností brány; `POST /giving/donate/retry/:donationId` zavolá `retryFailedPayment` poskytovateľa (Stripe uhradí otvorenú faktúru) a výsledný webhook povýši riadok na `complete` cez bežnú cestu deduplikácie. Upomienkové e-maily odchádzajú darcovi z obslužného kódu webhooku v deň 0, potom z `DunningHelper.run` v polnočnom časovači (zapojenom do `lambda/timer-handler.ts` aj `RailwayCron.ts`) v 3. a 7. deň; každé odoslanie sa zaznamená v `eventLogs` ako `provider: "dunning"`, `providerId: "<donationId>:<day>"`, takže opakovaný beh nikdy neposlal e-mail dvakrát. Keď Stripe vzdá pokusy a zruší predplatné (`customer.subscription.deleted` s `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` pošle darcovi jeden e-mail (`providerId: "<subscriptionId>:canceled"`); zrušenia iniciované darcom alebo administrátorom zostávajú ticho. Stripe nikdy nepridáva udalosti k existujúcemu koncovému bodu: po zmene `StripeHelper.webhookEvents` buď znovu uložte bránu, alebo spustite `tools/manual/stripe-webhook-events.ts` (predvolene suchý beh, `--apply` na zápis) proti produkcii.

Poskytovatelia s `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) majú platby zaznamenané z odpovede `/charge` (pre šťastnú cestu nie je potrebný žiadny obeh cez webhook), zatiaľ čo Stripe sa spolieha na `payment_intent.succeeded` / `invoice.paid` a ACH `payment_intent.processing`. Spracovanie poplatkov (`POST /giving/donate/fee`, príznak brány `payFees` a `calculateFees` každého poskytovateľa) vypočíta navýšenie „pokryť poplatky“ na strane darcu — B1 neberie žiadny platformový podiel, takže sa nikdy nepridáva žiadny aplikačný poplatok.

:::info
Cesty platby a webhooku zapisujú tie isté riadky `donations` / `fundDonations`. `transactionId` je spojovací kľúč, ktorý zabraňuje tomu, aby optimistický záznam platby a jej neskorší webhook vytvorili dva dary pre jeden dar.
:::

## Súvisiace stránky

- [Koncové body darovaní](../api/endpoints/giving.md) — úplné REST rozhranie pre darovania, fondy, dávky, brány, predplatné, platobné metódy a webhooky
- [AppHelper](../shared-libraries/app-helper.md) — npm balík, ktorý obsahuje register poskytovateľov platieb a komponenty darovania
- [Štruktúra modulu](../api/module-structure.md) — ako je modul GivingApi organizovaný na strane servera
