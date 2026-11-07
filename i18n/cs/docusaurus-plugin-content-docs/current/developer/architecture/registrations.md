---
title: "Registrace na akce"
---

# Registrace na akce

<div class="article-intro">

Nativní registrace na akce je součástí modulu obsahu a od vlny placených registrací má plný obchodní model: typy účastníků s cenou, volitelné doplňky s cenou, slevové kódy, platby přes stávající platební bránu církve a waitlist řízený stavy. Platební část záměrně znovu používá zásobník darování. Kontroler registrace účtuje přes stejnou abstrakci `GatewayService` / `IGatewayProvider`, která je popsána na stránce [Darování](./giving), takže modul obsahu neobsahuje žádná data platebních karet ani znalost SDK brány. Tato stránka mapuje datový model, pravidla pro ceny a kapacitu a toky registrace, platby a waitlistu.

</div>

## Přehled

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (portál členů)         │            │ Api — modul obsahu                          │
│  průvodce registrací ·       │   HTTPS    │  RegistrationController                     │
│  Moje registrace             │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (ceny na serveru)│
│ B1Admin (personál)           │            │  RegistrationHelper (e-maily)               │
│  nastavení registrace na akci│            └───────────────┬─────────────────────────────┘
│  · seznam účastníků · export │                            │ processCharge
│    CSV                       │                            ▼
└──────────────────────────────┘            ┌─────────────────────────────────────────────┐
                                            │ sdílená abstrakce brány (darování)          │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Napříč celým zásobníkem platí tři pravidla:

1. **Cenu určuje server.** Klienti odesílají ID typů, ID výběrů a množství. `RegistrationPricingHelper.computeTotal()` vypočítá celkovou částku na serveru a kupóny se znovu ověřují v okamžiku účtování. Částka odeslaná klientem se nikdy nepřijímá jako důvěryhodná.
2. **Kapacita se vynucuje atomicky v okamžiku vložení.** Každé vložení s omezenou kapacitou používá příkaz `INSERT … SELECT … FROM dual WHERE (počet aktivních řádků) < kapacita`, takže dvě souběžné registrace nemohou obsadit poslední místo. Počty se odvozují ze stavu (`pending`/`confirmed`) a nikdy se neukládají.
3. **Platby jdou po kolejích darování.** `RegistrationController` volá sdílený `GatewayService.processCharge` s platební bránou nakonfigurovanou pro církev. Jde o stejnou abstrakci poskytovatelů, stejný model tokenizace a stejné zpracování SCA jako u darů.

## Datový model (`Api/src/modules/content`)

Modely jsou v `models/Registration.ts`, mapování tabulek v `db/DatabaseTypes.ts` a jeden repozitář pro každou tabulku je v `repositories/`.

| Tabulka | Význam | Klíčová pole |
|---------|--------|--------------|
| `registrations` | Jedna registrace (jedna domácnost/skupina pro jednu akci) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Jeden účastník v registraci | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Typy účastníků na akci (např. dospělý / dítě) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Pojmenované doplňkové možnosti s cenou (např. tričko) | eventId, name, description, **price**, **capacity**, **maxQuantity** (limit na jednu registraci), sort, active |
| `registrationSelectionChoices` | Množství výběru zvolené registrací nebo členem | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Jedna úspěšná platba za registraci | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Slevové kódy pro každou akci | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Poznámky:

- **Tabulka pro waitlist neexistuje.** Účastníci na čekací listině jsou řádky v `registrations` se `status = 'waitlisted'`. Celý životní cyklus čekací listiny je tedy tvořen přechody stavu v této jedné tabulce.
- **Žádné ukládané počítadllater.** Počty „prodaných“ nebo „využitých“ míst (kapacita akce, kapacita podle typu, kapacita podle výběru, využití kupónů) se počítají korelovanými poddotazy nad řádky, jejichž stav je `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Zrušení registrace tedy uvolní kapacitu bez jakéhokoli účetnictví.
- Ceny jsou sloupce MySQL DECIMAL (přenášené jako řetězce), které pomocník pro ceny převádí pomocí `Number()`.

## REST rozhraní

Vše je pod `/content/registrations` (`controllers/RegistrationController.ts`), přístup řídí `Permissions.registrations` (`view` / `edit`):

| Trasa | Přístup | Účel |
|-------|---------|------|
| `POST /register` | anonymní | Úplné odeslání: host, člen nebo přidání účastníka personálem; ceny na serveru, kontroly kapacity, volitelné účtování |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | veřejné | Typy/výběry s odvozenými hodnotami `used` / `remainingCapacity` pro průvodce |
| `POST /types`, `DELETE /types/:id` (stejně pro `/selections`, `/coupons`) | `registrations.edit` | CRUD nastavení pro personál |
| `POST /coupons/validate` | veřejné | Ověření slevového kódu přímo během průvodce |
| `GET /coupons/event/:eventId` | personál | Kupóny s počty využití |
| `GET /event/:eventId` · `GET /event/:eventId/count` | personál · veřejné | Seznam účastníků; počet aktivních pro zobrazení kapacity |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | přihlášení | Moje registrace, detail, historie plateb |
| `PUT /:id` | vlastník/personál | Úprava po odeslání — nahradí členy a volby výběru novými atomickými kontrolami kapacity a přepočítá `totalAmount`; nikdy automaticky neúčtuje ani nevrací peníze |
| `POST /:id/pay` | vlastník | „Dokončit platbu“: účtuje `totalAmount − amountPaid` a mění stav `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | personál | Ruční přesun z čekací listiny |
| `POST /:id/cancel` · `DELETE /:id` | vlastník · personál | Zrušení / smazání; obě akce spustí automatický přesun z čekací listiny |

Existující nezrušená registrace se stejným `personId` na stejné akci je odmítnuta s kódem 409 a každá vytvořená registrace odešle webhook `registration.created` přes `WebhookDispatcher`.

## Ceny a slevové kódy

`helpers/RegistrationPricingHelper.ts` je jediný zdroj pravdy pro výpočty peněz:

- `computeTotal()` sečte cenu typu každého člena a `cena × množství` každé volby výběru.
- `validateCoupon()` kontroluje příznak aktivity, časové okno (`startDate`/`endDate`), `minMembers` vůči velikosti odeslané skupiny a `maxUses` vůči počtu využití odvozenému ze stavu.
- `applyDiscount()` — `percent` odečítá `total × value/100`; `amount` odečítá `value`; obojí zaokrouhluje dolů na nulu.

Průvodce volá `POST /coupons/validate` kvůli zpětné vazbě během psaní, ale `register` kupón znovu ověří a znovu aplikuje na serveru. Celková částka zobrazená klientem má pouze informativní hodnotu.

## Atomický vzor kapacity

Každé vložení s omezenou kapacitou je bezpečné i při souběhu bez transakcí a zámků, protože kontrola kapacity je součástí samotného `INSERT`. Na úrovni akce (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Nula ovlivněných řádků znamená „kapacita naplněna“. Stejný vzor chrání vložení podle typu (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, který počítá členy připojené k aktivním registracím) a množství podle výběru (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, který používá `COALESCE(SUM(quantity),0) + ? <= capacity`). Pokud vložení některého člena nebo výběru selže uprostřed registrace, kontroler částečnou registraci vrátí zpět pomocí `deleteCascade()` a uvede, který typ nebo výběr je vyprodán.

## Tok plateb

`processRegistrationCharge` v kontroleru je jediné místo, kde se registrace dotýkají peněz, a je to tenký klient zásobníku darování:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenizace probíhá v prohlížeči stejně jako u darů (viz [Darování](./giving)). Průvodce používá registr poskytovatelů plateb z apphelperu, takže přihlášení členové mohou platit uloženými kartami a hosté tokenizují novou kartu. Kontroler zrcadlí specifika poskytovatelů z `DonateController` (ID způsobů platby `pm-{id}` u Kingdom Funding, odpovědi Stripe SCA `requires_action` vrácené klientovi bez zápisu platby). Úspěšné účtování zapíše řádek do `registrationPayments`, zvýší `amountPaid` a potvrdí registraci. **Vrácení peněz není implementováno.** Zrušená placená registrace si ponechá řádky plateb a jakékoli vrácení se řeší mimo systém v administraci platební brány.

Obě vstupní místa procházejí stejnou cestou kódu: `register` (platba při registraci) a `pay` (doplacení zůstatku / dokončení čekací listiny).

`register` přeskočí účtování ve dvou případech a uloží registraci jako `pending` s `amountPaid = 0`. Celá částka tak zůstává jako dlužný zůstatek:

- **Přidání účastníka personálem.** Tělo požadavku obsahuje `personId`, které není ID volajícího, nemá `guestInfo` a volající má v dané církvi `registrations.edit`. Osoba musí existovat (jinak 404), filtr členů domácnosti se obchází a žádná karta se neúčtuje.
- **Žádná brána.** Církev nemá platební bránu pro dary (`hasGateway` kontroluje `gateway.loadAll`). Krok platby v B1App místo formuláře karty zobrazí tlačítko **Zaregistrovat a zaplatit později**.

Hosté (bez `au.id`) s placenou registrací musí přiložit `captchaPass` z `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (nyní v `shared/helpers`) běží těsně před účtováním, takže registrace na čekací listinu a bezplatné registrace nejsou ovlivněny. Pokud je `CAPTCHA_ENFORCE=true` a průchod chybí nebo je neplatný, nová registrace se vrátí zpět pomocí `deleteCascade()` a volání vrátí 403. Komponenta `RegistrationPaymentForm` v B1App zobrazuje hostům zaškrtávací políčko reCAPTCHA a průchod odesílá jak s uložením karty, tak s registrací.

## Životní cyklus čekací listiny

Když je akce plná a je zapnutý příznak `waitlistEnabled`, `register` uloží skupinu jako `waitlisted` (kontroly kapacity přeskočí) a odešle běžný potvrzovací e-mail označený jako místo na čekací listině. Přesun z čekací listiny nastává třemi způsoby — `cancel`, `delete` a koncový bod `promote` pro personál — a všechny směřují do `RegistrationRepo.promoteFromWaitlist`, který vybere nejstarší řádek na čekací listině a atomicky jej přepne:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Podmínka `status='waitlisted'` zajišťuje, že souběžné přesuny nemohou povýšit stejný řádek dvakrát, a poddotaz kapacity zajišťuje, že přesun nemůže prodat víc míst, než je k dispozici. Přesunuté řádky přecházejí do stavu `pending`, nikoli `confirmed`, protože může stále zbývat doplatit. `RegistrationHelper.sendWaitlistAvailabilityEmail` informuje účastníka, že se uvolnilo místo, a pokud `totalAmount − amountPaid > 0`, odkazuje na stránku `/mobile/registrations` v B1 dané církve (Moje registrace), sestavenou z `B1AppRoot` a subdomény církve. Zaplacením (nebo pokud nic nedluží) se účastník potvrdí.

:::info
Samotné zvýšení kapacity automaticky neposune nikoho z čekací listiny. Personál po zvýšení kapacity použije akci Přesunout v seznamu účastníků. Zrušení a smazání se přesouvají automaticky.
:::

## Klientské části

- **Průvodce v B1App** — jeden sdílený hook, `B1App/src/components/registration/useEventRegistration.ts`, řídí jak komponentu na webu (`components/registration/EventRegister.tsx`), tak obrazovku v mobilním portálu (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) prostřednictvím kroků `info → members → selections → questions → payment → confirm` (prostřední kroky se zobrazí jen tehdy, když akce má výběry, připojený formulář nebo nenulovou celkovou částku). Kroky info a členů zobrazují výběr podle typu účastníka se živou zbývající kapacitou a stavy vyprodáno. Platba (`RegistrationPaymentForm.tsx`) zobrazuje souhrn objednávky, zadání slevového kódu a — pro přihlášené členy — uložené platební metody přes registr poskytovatelů apphelperu, zatímco hosté tokenizují novou kartu. Mobilní obrazovka **Registrace** (`screens/RegistrationsPage.tsx`) je Moje registrace: stav, dlužný zůstatek, Dokončit platbu (`POST /:id/pay`), Upravit (`PUT /:id` — kontakt, typy členů, množství výběrů) a Zrušit.
- **Nastavení v B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` přidává přepínač Povolit čekací listinu a rozbalovací sekce Typy účastníků, Výběry a Slevové kódy (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). Všechny využívají CRUD operace nad trasami `/types`, `/selections` a `/coupons`.
- **Seznam účastníků v B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: sloupec Typ pro každého účastníka, sloupec Zaplaceno/Celkem s odznakem zůstatku, odznaky počtu podle typu, dialog s podrobnostmi o platbách (`RegistrationDetailDialog.tsx`, z `GET /payments/:registrationId`), akce Přesunout u čekací listiny a export CSV, který obsahuje typy účastníků, výběry, zaplaceno/celkem/zůstatek a odpovědi na otázky.

Vyhledávání napříč moduly (vyhledání nebo vytvoření osoby hosta, načtení církve pro e-maily) probíhá přes `getMembershipModuleGateway()`. Modul obsahu nikdy nečte přímo tabulky členství.

## Související stránky

- [Darování](./giving) — abstrakce brány, registr poskytovatelů a model tokenizace, které tato funkce znovu používá
- [Koncové body obsahu](../api/endpoints/content) — REST rozhraní modulu obsahu
- [Webhooky](../api/webhooks) — událost `registration.created`
- [Struktura modulů](../api/module-structure) — jak je modul obsahu uspořádán na straně serveru
