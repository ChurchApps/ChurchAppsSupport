---
title: "Adományozási architektúra"
---

# Adományozási architektúra

<div class="article-intro">

A ChurchApps az adományozást átjáró-csatornás modellben működteti: a gyülekezet saját Stripe- (vagy PayPal-, Kingdom Funding- vagy Paystack-) fiókját használja, a B1 pedig soha nem kerül a fizetési folyamatba platformfeldolgozóként. A kártyaadatok a böngészőben tokenizálódnak, és soha nem jutnak el ChurchApps-szerverhez. Ez az oldal a teljes rendszert ismerteti: a `@churchapps/apphelper` kliensoldali szolgáltatóregisztrációját, a GivingApi átjáró-absztrakcióját, az adatmodellt, valamint azt, hogy az átjáró webhookjai hogyan egyeztetnek vissza az adatbázissal.

</div>

## Áttekintés

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (böngésző) │                   │  Fizetési átjáró                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)    │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ kártyaadat-bevitel│  Stripe Elements · KF tokenizáló ·    │
│  │ Fizetési szolgáltató  │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ regisztráció          │  │◀── token / nonce ─│  (a kártya soha nem jut B1 szerverre) │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            terhelés/előfizetés│               │ aláírt webhook
┌─────────────────────────────────────────────┐ (titkos kulcs) │               │ esemény
│  GivingApi — /giving modul                  │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  adományok + fundDonations mentése — duplikáció szűrése eventLogs / transactionId alapján
                      ▼
                MySQL (giving séma)
```

Három alapelv érvényesül a teljes rendszerben:

1. **Az átjáró tárolja a kártyát.** Minden szolgáltató beviteli felülete a böngészőben tokenizál; az API csak tokent, nonce-ot vagy rendelésazonosítót kap.
2. **Egy absztrakció, sok szolgáltató.** A böngésző egy `PaymentProvider`-t old fel a regisztrációból; a szerver egy `IGatewayProvider`-t a gyárból. Mindkettő ugyanazt a normalizált szolgáltatónevet használja, amely az átjáró-rekordon van tárolva.
3. **A webhookok a elszámolás forrásai.** A terhelési választ optimistán rögzítjük, de a befejezett adományt az átjáró aláírt webhookja erősíti meg (vagy hozza létre), mindkét oldalon idempotencia-védelemmel.

## Kliensoldal: a fizetési szolgáltatók regisztrációja (`@churchapps/apphelper`)

A regisztráció a `Packages/apphelper/src/donations/providers/` mappában található, minden szolgáltató widgetjei és segédfüggvényei a saját almappájában vannak (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). A `providers/` mappán kívül semmi sem ágazik el szolgáltatónév alapján. Egy `PaymentProvider` (lásd `providers/types.ts`) egy átjáróhoz szükséges mindent egybefoglal: egy `descriptor`-t (adminisztrátori címkék, támogatott pénznemek, díjmezők, alapértelmezett díjtételek, irányítópult- és regisztrációs URL-ek), egy `capabilities` jelzéskészletet (mentett kártyák, ACH, ismétlődő fizetés, beépített új kártyás bevitel, automatikus mentés tokenizáláskor), a tagi bevitel React-widgetjeit (`MemberWrapper`/`MemberEntry`), a vendégadományozást (`GuestForm`), a mentett fizetési mód szerkesztését (`MethodEditForm`) és az űrlapkérdésekhez kötött fizetéseket (`FormPayment`), valamint a `buildChargeRequest(ctx, token)` függvényt, amely az egyetlen hely, ahol a terhelési kérés alakja szolgáltatónként eltér. Minden szolgáltató `MemberWrapper`-je a saját SDK-ját a gateway-rekord nyilvános kulcsából tölti be, így a gazdaalkalmazásoknak soha nincs szükségük átjáró-SDK importálására (a B1App és a B1Admin nem függ `@stripe/*` csomagoktól). A `pickDefaultGateway(gateways, capability?)` központilag határozza meg, hogy a gyülekezet átjárói közül melyiket használja az adott felület.

A `providers/registry.ts` tartalmazza a beépített szolgáltatókat. Ezeket **érték szerint hivatkozzuk**, nem modulmellékhatáson keresztül regisztráljuk, így a csomagoló fa-rázása (tree-shaking) soha nem távolíthatja el a regisztrációt:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Függvény | Cél |
|----------|-----|
| `getPaymentProvider(name)` | Feloldás a normalizált név alapján; visszaesik Stripe-ra, hogy egy hibásan beállított szolgáltató ne okozzon összeomlást az adományozói űrlapon |
| `registerPaymentProvider(p)` | További szolgáltató regisztrálása futásidőben (a gazdaalkalmazás egyedi átjárójához) |
| `listPaymentProviders()` | A beépített és egyedi szolgáltatók felsorolása — az adminisztrátori átjáró-legördülő lista építéséhez |
| `hasPaymentProvider(name)` | Tagsági ellenőrzés |

**Beépített kliensoldali szolgáltatók: Stripe, PayPal, Kingdom Funding, Paystack.** A B1App és a B1Admin csak *olvassa* a regisztrációt (`getPaymentProvider`, `listPaymentProviders`); egyik sem hívja a `registerPaymentProvider`-t — a regisztráció az apphelperen belül marad.

Minden szolgáltató másképp tokenizál, de mindegyik kívül tartja a kártyát a B1-en:

| Szolgáltató | Beviteli widget | Az API-nak visszaadott token |
|-------------|-----------------|-----------------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; a vendégűrlap emellett egy `ExpressCheckoutElement`-et (Apple Pay / Google Pay, egyszeri adományok) is csatol, amelynek `onConfirm` eseménye ugyanazt a `pm_…` azonosítót adja vissza | fizetési mód azonosító (`pm_…`); banki fizetés a `/paymentmethods/ach-setup-intent` végponton keresztül — Financial Connections `us_bank_account` USD átjárókhoz, kanadai PAD `acss_debit` (hosztolt megbízás-modál, a megbízás `default_for` számlákhoz/előfizetésekhez, az egyszeri terhelések átadják a megbízás azonosítóját) CAD átjárókhoz |
| Kingdom Funding | A nyilvános átjáró-kulcshoz kötött hosztolt tokenizáló űrlap | egyszer használatos nonce |
| PayPal | PayPal Hosted Fields (kártya, ismétlődő) plusz PayPal Smart Buttons Venmo-finanszírozással (egyszeri); mindkettő egyetlen SDK-betöltést használ, a szerveroldali rendelést a `/donate/client-token` és a `/donate/create-order` építi | rögzített rendelésazonosító |
| Paystack | Paystack Inline felugró ablak (`js.paystack.co/v2/inline.js`) — maga a felugró ablak végzi a fizetést (kártya, mobilpénz, banki átutalás, USSD); mentett módok a Paystack `AUTH_…` engedélyezési kódjai | sikeres tranzakciós hivatkozás |

A Stripe `finalizeResult` függvénye a böngészőben futtatja a 3-D Secure / SCA ellenőrzést (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), mielőtt az adomány befejezettnek tekinthető; a közös űrlap csak meghívja a `provider.finalizeResult(result)` függvényt, és nem tud arról, mit csinál.

## Szerveroldal: az átjáró-absztrakció (GivingApi)

A `/giving` modul (`Api/src/modules/giving`) teszi elérhetővé a REST-felületet; az átjáró-infrastruktúra az `Api/src/shared/helpers` mappában van. A `DonateController` soha nem hívja közvetlenül az átjáró SDK-ját — a `GatewayService`-en keresztül megy, amely a `GatewayFactory`-ból feloldja a megfelelő `IGatewayProvider`-t, és átad neki egy visszafejtett `GatewayConfig`-ot.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() visszafejti a privateKey / webhookKey értékeket
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

Az `IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) az a szerződés, amelyet minden átjáró megvalósít — webhook-életciklus (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), fizetés (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), díjak (`calculateFees`), mentett fizetési módok kezelése (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), valamint opcionális kiegészítők (ügyfelek, rendelések, SetupIntent-ek, eseményismétlés, `retryFailedPayment` sikertelen előfizetési számlához, `registerPaymentMethodDomain` az Apple Pay domain-ellenőrzéshez). Ha egy szolgáltató nem valósít meg egy opcionális horgot, az adott művelet nem támogatottként jelenik meg, és a felület elrejti a hozzá tartozó vezérlőt. Minden szolgáltatóosztály saját `capabilities` mátrixot deklarál (támogatott pénznemek, ACH, visszatérítések, előfizetési követelmények, tranzakciós korlátok) — a `GatewayService.getProviderCapabilities(provider)` csak beolvassa ezt —, és az olyan jelzők, mint a `logsDonationsImmediately`, a vezérlők viselkedését irányítják anélkül, hogy a vezérlőkben szolgáltatónév-alapú feltételek lennének.

**A `GatewayFactory`-ban regisztrált szerveroldali szolgáltatók:**

| Szolgáltató | Elérhetőség |
|-------------|-------------|
| Stripe | Mindig elérhető |
| PayPal | Mindig elérhető |
| Kingdom Funding | Mindig elérhető |
| Paystack | Mindig elérhető (nigériai, ghánai, dél-afrikai, kenyai és elefántcsontparti kereskedők; pénznemek: NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opcionális, az `ENABLE_SQUARE` környezeti jelzővel |
| ePayMints | Opcionális, az `ENABLE_EPAYMINTS` környezeti jelzővel |

A Paystack abban különbözik a többitől, hogy a pénz a GivingApi bevonása előtt mozog: a felugró ablak terheli meg az adományozót, a `processCharge` pedig egy `GET /transaction/verify/:reference` hívás, amelynek kifizetett összege és pénzneme meg kell egyezzen a rögzítendő adománnyal (egy már nyilvántartott hivatkozás soha nem kerül kétszer rögzítésre). Egy ismétlődő ütemezés első adományát a `finalizeSubscription` rögzíti (ellenőrzés → `POST /plan` → `POST /subscription` a `start_date` mezővel egy időközzel később). A webhookokat maga a titkos kulcs írja alá (`x-paystack-signature`, HMAC-SHA512 a nyers törzsön), és a Paystacknek nincs webhook-kezelő API-ja, ezért az adminisztrációs képernyő megjeleníti az URL-t, amelyet a gyülekezet beilleszthet az irányítópultjába. Az ismétlődő `charge.success` események nem tartalmaznak alapkiosztást; a szolgáltató ezt a donor helyi `subscriptions`/`subscriptionFunds` soraiból állítja helyre. Csak a kártyás engedélyezések `reusable` típusúak — a mobilpénzes adományok csak egyszeriek, ezért a `createSubscription` ezeket elutasítja. A demóadatok egy második gyülekezetet (Accra Community Church, `CHU00000002`) töltenek be egy Paystack teszt módú GHS átjáróval, hogy a Paystack Playwright-csomag a Grace-féle Stripe-csomag mellett fusson.

Egyedi szolgáltatók futásidőben regisztrálhatók, ha az `ENABLE_CUSTOM_GATEWAY_PROVIDERS` be van állítva; ezek alaposztálya az `AbstractExperimentalGatewayProvider`. A szolgáltatónevek kis- és nagybetű-érzéketlenül egyeznek.

### Átjáró-beállítás és titkok

Az adminisztrátor a `POST /giving/gateways` (`GatewayController`) végponton menti el az átjáró-hitelesítő adatokat. Mentéskor a vezérlő az `EncryptionHelper`-rel titkosítja a privát és a webhook-kulcsot, mielőtt eltárolná azokat, majd — bármely nem localhost hoszton — törli a gyülekezet meglévő webhookját, és új webhookot hoz létre, amely a `/giving/donate/webhook/{provider}?churchId=…` címre mutat. A gyülekezetnek szolgáltatónként egy sora van: az átjáró mentése csak az adott szolgáltató meglévő sorát cseréli le. A nyilvános lekérdezések (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) csak nyilvános kulcsokat adnak vissza.

## Adatmodell

A giving séma (`Api/src/modules/giving/db/DatabaseTypes.ts`, modellek a `models/` mappában) egy MySQL-séma, amelyet a Kysely-n keresztül érünk el:

| Tábla | Szerepe |
|-------|---------|
| `gateways` | Gyülekezetenkénti szolgáltató-konfiguráció: `provider`, `publicKey`, titkosított `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Adománycélok (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Rögzítési és jelentési csoportosítás (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Egy adomány: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; a kimutatások, összesítések, irányítópultok és adománykimutatások csak a `complete` vagy null értékeket számolják), `transactionId` |
| `fundDonations` | Egy adomány elosztása egy vagy több cél között (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Ismétlődő adomány; `id` a átjáró előfizetési azonosítója, kapcsolva a `personId`, `customerId`, `gatewayId` mezőkhöz |
| `subscriptionFunds` | Ismétlődő adomány alapkiosztása |
| `customers` | Összekapcsolja a `personId`-t az átjáró ügyfél-azonosítójával, szolgáltatónként |
| `gatewayPaymentMethods` | Mentett kártyák/bankszámlák: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook- és eseménynapló, valamint duplikációszűrési kulcs (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Egy célhoz kötött ígéretgyűjtő kampányok és az egyes személyek ígért összegei |

Egy adomány alapokra oszlik a `fundDonations` táblán keresztül — az adomány a teljes összeget hordozza, minden `fundDonation` egy szeletet. A `donations.currency` és a `gateways.currency` az ISO pénznemet tárolja; minden szolgáltató meghirdeti a `supportedCurrencies` listáját, az összegek formázása pedig a `CurrencyHelper.formatCurrencyWithLocale` segítségével történik.

## Végponttól végpontig tartó folyamatok

### Tag egyszeri és ismétlődő adománya (B1App)

Az azonosított adományozási képernyő (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) három apphelper-komponenst használ: `MultiGatewayDonationForm`, `PaymentMethods` és `RecurringDonations`. A B1App végzi a körülötte lévő adatbetöltést — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — és továbbadja az átjárók listáját; a feloldott szolgáltató a saját SDK-ját tölti be az átjáró nyilvános kulcsából. A tényleges terhelés az apphelperen belül történik: a feloldott szolgáltató tokenizálja az (új vagy mentett) fizetési módot, majd egyszeri adomány esetén a `/giving/donate/charge`, ismétlődő adomány esetén a `/giving/donate/subscribe` végpontra küld. Mindkét végpont a bejelentkezett adományozót a saját `personId`-jához rendeli (csak a `donations.edit` jogosultsággal rendelkezők rendelhetnek másnak), és elutasítja azokat az alapelosztásokat, amelyek összege meghaladja a terhelt összeget. Az ismétlődő adományok létrehoznak egy `subscriptions` sort, valamint `subscriptionFunds` sorokat, és az ütemezést átadják az átjárónak (Stripe Subscriptions, PayPal Billing Plans vagy egy KF ismétlődő ütemezés).

### Vendég- és névtelen adományozás

A nyilvános adományozási oldal (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) és az „adj most” panel a `@churchapps/apphelper/website` csomagból rendereli a `NonAuthDonationWrapper`-t, amely a reCAPTCHA-t és az átjáró Elements kontextusát a szolgáltató `GuestForm`-ja köré injektálja. A vendégeknek nincs bejelentkezésük, nincsenek mentett fizetési módjaik és nincs előzményük. A folyamat lekéri a `GET /giving/funds/churchId/:id` és a `GET /giving/donate/gateways/:churchId` (csak nyilvános kulcsok) végpontokat, ellenőrzi a látogatót a `POST /giving/donate/captcha-verify` hívással, a böngészőben tokenizál, majd a `/giving/donate/charge` (vagy `/subscribe`) végpontra küld. Az ellenőrző hívás egy 10 perces, HMAC-aláírt `captchaPass`-t ad vissza (`Api/src/modules/giving/helpers/CaptchaPass.ts`), amelyet az űrlap minden vendég pénzügyi hívással elküld; ha a `CAPTCHA_ENFORCE=true` be van állítva, az API érvényes, az adott gyülekezetre szóló passz nélkül elutasítja a vendég `create-order`, `charge`, `subscribe`, `addcard` és `ach-setup-intent-anon` hívásait. A vendég fizetős eseményregisztrációi (`POST /content/registrations/register`) a terhelés előtt szintén ellenőrzik ugyanezt a passzt; lásd [Eseményregisztráció](./registrations#payment-flow). A vendégek banki (ACH) fizetése a névtelen `POST /giving/paymentmethods/ach-setup-intent-anon` végponton keresztül történik, amely csak azonnali (Financial Connections) ellenőrzést engedélyez: a mikrobefizetéses ellenőrzés napokkal később zárul, amikor a vendégoldal már nincs nyitva, így az adomány soha nem fejeződne be. Az űrlap nem terhel ellenőrizetlen SetupIntent-tel, és az adományozót kártyás fizetésre vagy bejelentkezett banki beállításra irányítja.

Három vendégűrlap-opció ugyanazon a terhelési hívásán keresztül működik. A donate URL `?fundId=` és `?amount=` paraméterei előre kiválasztják az alapelosztást (minden szolgáltató vendégűrlapja csatlakozáskor olvassa, és a normál alapváltási kezelőn keresztül megy át, így az összegek és a díjak frissülnek). Az `anonymous: true` beállítás arra utasítja a `DonateController.charge`-ot, hogy eldobja a kliens által küldött személyt, és az adományt `personId = null` értékkel rögzíti; a vendégűrlap kihagyja a `/people/loadOrCreate` hívást és az ügyfél/széf lépést, a három azonnal naplózó szolgáltató pedig nem old fel személyt az átjáró-ügyfélből. Az Apple Pay-hez az oldal domainjét regisztrálni kell a Stripe-nál, ezért a Stripe-os vendégűrlap munkamenetenként egyszer elküld egy kérést a nyilvános, sebességkorlátozott `POST /giving/donate/register-domain` végpontra, amely csak olyan domaint fogad el, amely a gyülekezethez tartozik (`<subDomain>.b1.church`, a tartalommodul domain-táblájának egy sora, vagy helyi host), mielőtt meghívná a Stripe payment-method-domains API-ját.

### Adminisztrátori rögzítés és Stripe-import (B1Admin)

A B1Admin adományozási szakasza (`B1Admin/src/donations/`) az a hely, ahol a pénzügyi csapatok dolgoznak. A kötegelt rögzítés (`components/BulkDonationEntry.tsx`) készpénzes, csekkes és természetbeni adományokat rögzít a `/giving/donations`, majd a `/giving/funddonations` végpontra küldött kérésekkel — átjáró nem vesz részt. A személyi lap **Adomány rögzítése** panelje (`components/LogGiftDialog.tsx`) ugyanezt teszi egyetlen adományra: először megkeresi azt a köteget, amelynek `batchDate` értéke megegyezik az adomány dátumával, vagy létrehoz egy, az adott dátumról elnevezett köteget (`POST /giving/donationbatches`), és ha egy későbbi lépés meghiúsul, törli az adományt és az újonnan létrehozott köteget. Az alapok, kötegek, kampányok és kimutatások mind a saját `/giving/*` CRUD-útvonalukra képeződnek le; az adománykimutatási oldalak (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) egy naptári évet kérnek le a `GET /donations?startDate=&endDate=` és a `GET /fundDonations?startDate=&endDate=` végpontokkal, nem a gyülekezet teljes előzményét, amely meghaladhatná a Lambda válaszméret-korlátját. A tagok stílusában működő adományozási panel (`B1Admin/src/donationComponents/`) ugyanazokat az apphelper-komponenseket használja, mint a B1App.

A jelentéstétel és a könyvelési átadások kliensoldali vagy jelentésfuttatói munkák, nem átjáró-műveletek: a köteg oldalának QuickBooks-exportja a köteg `donations` + `fundDonations` adataiból naplóbejegyzés-CSV-t készít (terhelés a Be nem fizetett alapokra, egy jóváírás alaponként); az Összesítés oldal Lapsed Givers nézete a `Api/reports/lapsedGivers.json` fájlt futtatja az általános jelentésfuttatón, a személyneveket a `ReportOutput` oldja fel; az országos nyugtaformátumok (Kanada / Ausztrália / Új-Zéland) a gyülekezeti beállítások közé tartoznak a tagsági kulcs-érték tárban, a `GivingStatementDocument` jeleníti meg őket, és a B1App nyomtatási oldalán is megduplázódnak. A B1Admin kimutatás-nyomtatási oldalai (`PrintDonationPage`, `PrintAllStatementsPage`) átadják a gyülekezet `logoLight` beállítását (a `B1Admin/src/components/PrintChurchHeader.tsx` `usePrintLogo` hookján keresztül), így a logó minden kimutatás tetején megjelenik, és az automatikus nyomtatás előtt megvárják a képet.

### Köteg állapota és az Adomány rögzítése jogosultság

A kötegeket le lehet zárni, hogy egy megszámolt betét megmaradjon úgy, ahogy volt. A `POST /giving/donationbatches/:id/close` és a `/:id/reopen` (csak Donations.Edit) az egyetlen írók a `status`, `closedDate` és `closedBy` mezők számára (`DonationBatchRepo.setStatus`); a köteg normál mentése soha nem érinti ezeket, így egy köteg feladása nem nyithatja újra. Az írási hozzáférés a `Api/src/modules/giving/helpers/BatchAccessHelper.ts` fájlba van központosítva: a Donations.Edit bármit módosíthat, míg a szűkebb Donations.Enter jogosultság (`GivingApi` / `Donations` / `Enter`, a szerepkör-szerkesztőben „Enter Donations”) csak akkor hozhat létre köteget, illetve menthet vagy törölhet adományt és alapelosztást, ha az adomány jelenlegi köteege és a célkötege is nyitott, és soha nem tehet ilyet átjáró-adomány (amelynek van `transactionId`-ja) esetén. A tiltott írás `403 { error: "This batch is closed." }` választ ad. A kötegek olvasásához a Donations.ViewSummary vagy a Donations.Enter jogosultság is elég, így a számláló ki tudja választani a köteget, amelybe rögzít. Kliensoldalon a `B1Admin/src/donations/batchAccess.ts` tükrözi ezeket a szabályokat (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), a `Header` és a `SecondaryMenuHelper` pedig a **Donations > Batches** menüpontot mindenkinek megjeleníti, aki láthatja a kötegeket, még a View Summary jogosultság nélkül is.

### Vegyes pénznemű összegek átszámítása

Minden olyan végpont, amely a lehetséges vegyes pénznemű adományokra egyetlen összesített összeget ad vissza — az adományozási összesítő KPI-k (`GivingKpiCards`), egy köteg összege, egy cél összege és a B1App adományozási képernyőjének év eleji/időszaki összegei —, szerveroldalon a gyülekezet alapértelmezett pénznemére számolja át az összeget, ahelyett hogy különböző pénznemeket adna össze. Az `Api/src/shared/helpers/ExchangeRateHelper.ts` a gyülekezet pénzneme szerint kéri le az árfolyamokat az `api.frankfurter.dev` szolgáltatótól, 12 órára a folyamaton belül gyorsítótárazza azokat, és biztosítja a `convertTotals(rows, churchCurrency, rates)` függvényt: a sorok SQL-ben pénznemenként előre csoportosítva érkeznek (néhány csoport, nem adományonkénti átszámítás), minden csoportot átszámolnak és összeadnak, az eredmény pedig egy `isConverted` jelzőt hordoz, amely alapján a kliens a „Átszámítva az aktuális árfolyamon” megjegyzést mutatja. A `GET /donations/exchange-rates` az árfolyamtáblát olyan kliensek számára teszi elérhetővé, amelyeknek erre szükségük van (a B1App adományozási képernyője); az árfolyamokat soha nem fogadja el kérésből, csak szerveroldalon kéri le, így a kliens nem befolyásolhatja a jelentett összeget. Az egyedi adományrekordokat és a történeti/eredeti pénznemű jelentéseket soha nem számolják át — csak az összesített összegeket.

A Stripe-import (`B1Admin/src/donations/StripeImportPage.tsx`) a B1-en kívül tett adományokat pótolja be: a `POST /giving/donate/replay-stripe-events` végpontot hívja `dryRun: true` értékkel az előnézethez, majd `dryRun: false` értékkel az importáláshoz. A szerver lekéri a Stripe eseményeit a dátumtartományra, és kihagyja azokat, amelyek már rögzítve vannak — először az `eventLogs` szolgáltatóazonosító, majd a tranzakcióazonosító, végül a `DonationRepo.findMatchingDonation` (összeg + dátum + személy) alapján egyeztet, így az ismételt futtatás soha nem importál duplán. Az előfizetéses `charge.succeeded` / `payment_intent.succeeded` eseményeket kihagyja, mert ezeket az adományokat az `invoice.paid` rögzíti; az újabb Stripe API-verziók elhagyják a `PaymentIntent.invoice` mezőt, ezért a kihagyás a „Subscription …” leírás alapján is történik.

## Webhookok és egyeztetés

A rendezett fizetések és az előfizetési állapotváltozások a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`) végpontra érkeznek. A feldolgozás szándékosan idempotens:

1. **Ellenőrzés** — a `GatewayService.verifyWebhook` a szolgáltató aláírás-ellenőrzésére delegál; érvénytelen aláírás esetén 401 a válasz. Azok az események, amelyeknek nincs szükségük feldolgozásra, 200-zal rövidre zárnak.
2. **Az esemény duplikációszűrése** — az `EventLogRepo.loadByProviderId` kihagy minden olyan webhookot, amely már szerepel az `eventLogs`-ban.
3. **Az adomány duplikációszűrése** — mielőtt bármi létrejönne, a `DonationRepo.loadByTransactionId` ellenőrzi a payloadban esetlegesen szereplő összes jelölt azonosítót. Ez kezeli az ismételt kézbesítéseket, a többlépcsős ACH-eseményeket (függőben → elszámolva), valamint azt az esetet, amikor a `/donate/charge` már optimistán rögzítette az adományt.
4. **Alkalmazás** — a szolgáltató `classifyWebhookEvent(eventType)` függvénye megmondja, mit jelent az esemény (`donation` függőben/befejezett, `cancel-subscription` vagy `ignore`); a befejezett fizetések `complete` állapotú adományt hoznak létre (vagy léptetnek elő egy meglévő `pending` vagy `failed` állapotút), az ACH-jellegű események elszámolásig `pending` állapotban maradnak, a sikertelen előfizetési számla (Stripe `invoice.payment_failed`) a számla azonosítójára épülő `failed` adományt hoz létre, a lemondási események pedig törlik a helyi `subscriptions` sort. A vezérlő soha nem vizsgálja a szolgáltatóspecifikus eseménynevekeket.

### Sikertelen ismétlődő adományok és a fizetési emlékeztetők

A `failed` állapotú adomány a helyreállítás munkaegysége. A `GET /giving/donations/failed` ezeket listázza, az `eventLogs`-ból vett legfrissebb átjáró-hibaüzenettel és az átjáró képességeiből származó `canRetry` jelzővel; a `POST /giving/donate/retry/:donationId` meghívja a szolgáltató `retryFailedPayment` függvényét (a Stripe kifizeti a nyitott számlát), a keletkező webhook pedig a normál duplikációszűrési úton `complete` állapotra lépteti a sort. A fizetési emlékeztető e-mailek a webhook-kezelőből mennek ki a donornak a 0. napon, majd a `DunningHelper.run` futtatja a éjféli időzítőben (mindkettő a `lambda/timer-handler.ts` és a `RailwayCron.ts` fájlban van bekötve) a 3. és 7. napon; minden küldés `eventLogs`-ba kerül `provider: "dunning"`, `providerId: "<donationId>:<day>"` értékekkel, így az újrafuttatás soha nem küld kétszer. Amikor a Stripe feladja és lemondja az előfizetést (`customer.subscription.deleted` a `cancellation_details.reason: "payment_failed"` értékkel), a `DunningHelper.notifyCanceled` egyszer e-mailt küld a donornak (`providerId: "<subscriptionId>:canceled"`); a donor vagy az adminisztrátor által kezdeményezett lemondások csendben maradnak. A Stripe soha nem ad új eseményeket a meglévő végponthoz: a `StripeHelper.webhookEvents` módosítása után vagy mentsük újra az átjárót, vagy futtassuk a `tools/manual/stripe-webhook-events.ts` szkriptet (alapértelmezés szerint szárazfuttatás, `--apply` kapcsolóval ír) az éles környezetre.

Az `logsDonationsImmediately` jelzővel rendelkező szolgáltatók (PayPal, Kingdom Funding, Paystack) terheléseit a `/charge` válaszából naplózzuk (a sikeres esethez nincs szükség webhook-körre), míg a Stripe a `payment_intent.succeeded` / `invoice.paid` eseményekre és az ACH `payment_intent.processing` eseményre támaszkodik. A díjkezelés (`POST /giving/donate/fee`, a `payFees` átjáró-jelző és az egyes szolgáltatók `calculateFees` függvénye) a donor oldalán számolja ki a „díjak fedezése” bruttósítást — a B1 nem vesz platformjutalékot, így soha nem adódik hozzá alkalmazási díj.

:::info
A terhelési és a webhook-útvonal ugyanazokat a `donations` / `fundDonations` sorokat írja. A `transactionId` az összekötő kulcs, amely megakadályozza, hogy egy optimista terhelési napló és a későbbi webhookja két adományt hozzon létre ugyanarra az ajándékra.
:::

## Kapcsolódó oldalak

- [Adományozási végpontok](../api/endpoints/giving) — az adományok, alapok, kötegek, átjárók, előfizetések, fizetési módok és webhookok teljes REST-felülete
- [AppHelper](../shared-libraries/app-helper) — az npm-csomag, amely a fizetési szolgáltatók regisztrációját és az adományozási komponenseket tartalmazza
- [Modulstruktúra](../api/module-structure) — a GivingApi modul szerveroldali felépítése
