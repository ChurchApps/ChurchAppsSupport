---
title: "Registrácie na udalosti"
---

# Registrácie na udalosti

<div class="article-intro">

Natívna registrácia na udalosti sa nachádza v module obsahu a od vlny platených registrácií obsahuje plný obchodný model: účastnícke typy s cenou, voliteľné doplnky s cenou, zľavové kódy, platby cez existujúcu platobnú bránu cirkvi pre dary a čakaciu listinu riadenú stavom. Platobná cesta zámerne využíva rovnaký systém ako dary. Registračný kontrolér účtuje cez zdieľanú abstrakciu `GatewayService` / `IGatewayProvider`, ktorá je popísaná na stránke [Dary](./giving), takže modul obsahu neobsahuje žiadne údaje o karte ani znalosti SDK platobnej brány. Táto stránka popisuje dátový model, pravidlá cien a kapacity a postupy registrácie, platby a čakacej listiny.

</div>

## Prehľad

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

Tri pravidlá platia v celom zásobníku:

1. **Cenu určuje server.** Klienti odosielajú ID typov, ID výberov a množstvá. `RegistrationPricingHelper.computeTotal()` vypočíta celkovú sumu na strane servera a kupóny sa znovu overujú v čase účtovania. Suma odoslaná klientom sa nikdy nepovažuje za dôveryhodnú.
2. **Kapacita sa vynucuje atomicky v čase vkladania.** Každý vklad obmedzený kapacitou používa príkaz `INSERT … SELECT … FROM dual WHERE (počet aktívnych riadkov) < kapacita`, takže dve súbežné registrácie nemôžu obsadiť posledné miesto. Počty sa odvodzujú zo stavu (`pending`/`confirmed`) a nikdy sa neukladajú.
3. **Platby využívajú platobné kanály darov.** `RegistrationController` volá zdieľanú funkciu `GatewayService.processCharge` s bránou nakonfigurovanou pre cirkev. Používa tú istú abstrakciu poskytovateľa, model tokenizácie a spracovanie SCA ako pri darovaniach.

## Dátový model (`Api/src/modules/content`)

Modely sa nachádzajú v `models/Registration.ts`, mapovania tabuliek v `db/DatabaseTypes.ts` a každá tabuľka má vlastný repozitár v adresári `repositories/`.

| Tabuľka | Význam | Kľúčové polia |
|-------|---------|-----------|
| `registrations` | Jedna registrácia (jedna domácnosť alebo skupina pre jednu udalosť) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Jeden účastník registrácie | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Typy účastníkov pre jednu udalosť (napr. Dospelý / Dieťa) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Pomenované doplnkové možnosti s cenou (napr. tričko) | eventId, name, description, **price**, **capacity**, **maxQuantity** (limit na jednu registráciu), sort, active |
| `registrationSelectionChoices` | Množstvo výberu zvolené registráciou alebo účastníkom | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Jedna úspešná platba za registráciu | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Zľavové kódy pre jednotlivé udalosti | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Poznámky:

- **Tabuľka čakacej listiny neexistuje.** Účastnícke skupiny na čakacej listine sú riadky v tabuľke `registrations` so stavom `status = 'waitlisted'`. Celý životný cyklus čakacej listiny predstavujú prechody stavov v tejto jednej tabuľke.
- **Žiadne uložené počítadlá.** Počty „predaných“ alebo „použitých“ miest (kapacita udalosti, kapacita podľa typu, kapacita podľa výberu a počet použití kupónov) sa počítajú korelovanými poddotazmi nad riadkami so stavom `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Zrušenie registrácie preto uvoľní kapacitu bez akéhokoľvek účtovania.
- Ceny sú stĺpce MySQL DECIMAL (v prenose ako reťazce), ktoré sa v pomocnej funkcii na výpočet cien prevádzajú pomocou `Number()`.

## REST rozhranie

Všetko sa nachádza pod `/content/registrations` (`controllers/RegistrationController.ts`) a je chránené oprávnením `Permissions.registrations` (`view` / `edit`):

| Trasa | Prístup | Účel |
|-------|--------|---------|
| `POST /register` | anonymný | Úplné odoslanie: hosť, člen alebo personál pridávajúci účastníka; cena na strane servera, kontroly kapacity, voliteľné účtovanie |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | verejný | Typy a výbery s odvodenými hodnotami `used` / `remainingCapacity` pre sprievodcu |
| `POST /types`, `DELETE /types/:id` (rovnako pre `/selections` a `/coupons`) | `registrations.edit` | CRUD operácie v nastaveniach pre personál |
| `POST /coupons/validate` | verejný | Overenie zľavového kódu priamo v sprievodcovi |
| `GET /coupons/event/:eventId` | personál | Kupóny s počtom použití |
| `GET /event/:eventId` · `GET /event/:eventId/count` | personál · verejný | Zoznam účastníkov; počet aktívnych registrácií na zobrazenie kapacity |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | prihlásený | Moje registrácie, detail, história platieb |
| `PUT /:id` | vlastník/personál | Úprava po odoslaní — nahradí účastníkov a výbery novými atomickými kontrolami kapacity, prepočíta `totalAmount`; nikdy automaticky neúčtuje ani nevracia peniaze |
| `POST /:id/pay` | vlastník | „Dokončiť platbu“: účtuje `totalAmount − amountPaid` a mení stav `waitlisted`/`pending` na `confirmed` |
| `POST /:id/promote` | personál | Manuálne presunutie z čakacej listiny |
| `POST /:id/cancel` · `DELETE /:id` | vlastník · personál | Zrušenie / vymazanie; obe akcie spustia automatický posun z čakacej listiny |

Ak už pre rovnaký `personId` a rovnakú udalosť existuje nezrušená registrácia, odpoveď je 409. Každá vytvorená registrácia odošle webhook `registration.created` cez `WebhookDispatcher`.

## Ceny a zľavové kódy

`helpers/RegistrationPricingHelper.ts` je jediný zdroj pre výpočty súm:

- `computeTotal()` sčíta cenu typu každého účastníka a `cena × množstvo` pre každý výber.
- `validateCoupon()` kontroluje aktívny stav, časové okno (`startDate`/`endDate`), `minMembers` oproti veľkosti odoslanej skupiny a `maxUses` oproti počtu použití odvodenému zo stavu.
- `applyDiscount()` — `percent` odčíta `total × value/100`; `amount` odčíta `value`; obe hodnoty sa zaokrúhľujú nadol na nulu.

Sprievodca volá `POST /coupons/validate` na okamžitú spätnú väzbu, ale `register` kupón znovu overí a znovu uplatní na strane servera. Celková suma zobrazená klientom má iba informatívny charakter.

## Atomický vzor kapacity

Každý vklad obmedzený kapacitou sa bezpečne vyrovná so súbežnými požiadavkami bez transakcií a zámkov, pretože kontrola kapacity je súčasťou samotného `INSERT`. Na úrovni udalosti (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Nula ovplyvnených riadkov znamená „kapacita je naplnená“. Rovnaký vzor chráni vklady podľa typu (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, počíta účastníkov pripojených k aktívnym registráciám) a množstvá podľa výberu (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, používa `COALESCE(SUM(quantity),0) + ? <= capacity`). Ak zlyhá vloženie akéhokoľvek účastníka alebo výberu počas registrácie, kontrolér čiastočnú registráciu vráti späť pomocou `deleteCascade()` a uvedie, ktorý typ alebo výber je vypredaný.

## Postup platby

`processRegistrationCharge` v kontroléri je jediné miesto, kde sa registrácie dotýkajú peňazí. Je to tenký klient zásobníka darov:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenizácia prebieha v prehliadači rovnako ako pri darovaniach (pozri [Dary](./giving)). Sprievodca používa register platobných poskytovateľov apphelper, takže prihlásení členovia môžu platiť uloženými kartami a hostia zadávajú a tokenizujú novú kartu. Kontrolér zachováva špecifiká poskytovateľov z `DonateController` (ID platobných metód Kingdom Funding `pm-{id}` a odpovede Stripe SCA `requires_action`, ktoré sa vracajú klientovi bez zaznamenania platby). Úspešná platba zapíše riadok do `registrationPayments`, zvýši `amountPaid` a potvrdí registráciu. **Vrátenie peňazí nie je implementované.** Zrušená zaplatená registrácia si ponechá záznamy o platbách a prípadné vrátenie peňazí sa vykoná mimo systému v paneli platobnej brány.

Obe vstupné body používajú rovnakú cestu v kóde: `register` (platba pri registrácii) a `pay` (doplatok alebo dokončenie registrácie z čakacej listiny).

`register` preskočí účtovanie v dvoch prípadoch a uloží registráciu ako `pending` s `amountPaid = 0`, takže celá suma zostáva ako nedoplatok:

- **Pridanie účastníka personálom.** Telo požiadavky obsahuje `personId`, ktoré nepatrí volajúcemu, neobsahuje `guestInfo` a volajúci má v danej cirkvi oprávnenie `registrations.edit`. Osoba musí existovať (inak 404), filter členov domácnosti sa obíde a nič sa neúčtuje.
- **Žiadna brána.** Cirkev nemá nakonfigurovanú platobnú bránu pre dary (`hasGateway` kontroluje `gateway.loadAll`). Krok platby v aplikácii B1App namiesto formulára na kartu zobrazí tlačidlo **Registrovať a zaplatiť neskôr**.

Hostia (bez `au.id`) pri registráciách so cenou musia odoslať `captchaPass` z `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (teraz v `shared/helpers`) sa spustí tesne pred účtovaním, takže registrácie na čakaciu listinu a bezplatné registrácie nie sú ovplyvnené. Ak je `CAPTCHA_ENFORCE=true` a prihlasovací priepustka chýba alebo je neplatná, nová registrácia sa vráti späť pomocou `deleteCascade()` a volanie vráti 403. Komponent `RegistrationPaymentForm` v aplikácii B1App zobrazuje hosťom začiarkavacie políčko reCAPTCHA a priepustku odosiela spolu s uložením karty aj s registráciou.

## Životný cyklus čakacej listiny

Ak je udalosť naplnená a je zapnutý príznak `waitlistEnabled`, `register` uloží skupinu ako `waitlisted` (kontroly kapacity sa preskočia) a odošle bežný potvrdzujúci e-mail označený ako miesto na čakacej listine. Presun z čakacej listiny prebieha tromi spôsobmi — `cancel`, `delete` a endpoint pre personál `promote`. Všetky smerujú do `RegistrationRepo.promoteFromWaitlist`, ktorý vyberie najstarší riadok na čakacej listine a atomicky zmení jeho stav:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Ochrana `status='waitlisted'` zabraňuje tomu, aby súbežné presuny dvakrát presunuli ten istý riadok, a poddotaz kapacity zabraňuje predaju nad kapacitu. Presunuté riadky prechádzajú do stavu `pending`, nie `confirmed`, pretože ešte môže byť dlžná suma. `RegistrationHelper.sendWaitlistAvailabilityEmail` informuje registrujúceho, že sa uvoľnilo miesto, a ak `totalAmount − amountPaid > 0`, obsahuje odkaz na stránku `/mobile/registrations` cirkevnej aplikácie B1 (Moje registrácie), zostavený z `B1AppRoot` a subdomény cirkvi. Zaplatením (alebo ak nič nedlhuje) sa registrácia potvrdí.

:::info
Samotné zvýšenie kapacity automaticky nepresúva účastníkov z čakacej listiny. Personál po zvýšení kapacity použije akciu Presunúť v zozname účastníkov. Zrušenia a vymazania presúvajú automaticky.
:::

## Klientske časti

- **Sprievodca v aplikácii B1App** — jeden zdieľaný hook, `B1App/src/components/registration/useEventRegistration.ts`, riadi webový komponent (`components/registration/EventRegister.tsx`) aj obrazovku v mobilnom portáli (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) cez kroky `info → members → selections → questions → payment → confirm` (stredné kroky sa zobrazia iba vtedy, ak udalosť obsahuje výbery, pripojený formulár alebo nenulovú celkovú sumu). Kroky info a účastníkov zobrazujú výbery podľa typu účastníka so živým zostávajúcim počtom miest a stavmi vypredané. Platba (`RegistrationPaymentForm.tsx`) zobrazuje súhrn objednávky, zadanie zľavového kódu a — pre prihlásených členov — uložené platobné metódy cez register poskytovateľov apphelper; hostia tokenizujú novú kartu. Mobilná obrazovka **Registrácie** (`screens/RegistrationsPage.tsx`) zobrazuje Moje registrácie: stav, dlžnú sumu, Dokončiť platbu (`POST /:id/pay`), Upraviť (`PUT /:id` — kontaktné údaje, typy účastníkov, množstvá výberov) a Zrušiť.
- **Nastavenia v aplikácii B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` pridáva prepínač Povoliť čakaciu listinu a rozbaľovacie sekcie Typy účastníkov, Výbery a Zľavové kódy (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). Všetky používajú CRUD operácie nad trasami `/types`, `/selections` a `/coupons`.
- **Zoznam účastníkov v aplikácii B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: stĺpec Typ pre každého účastníka, stĺpec Zaplatené/Celkom so štítkom zostatku, štítky počtov podľa typu, dialógové okno s detailom platieb (`RegistrationDetailDialog.tsx`, z `GET /payments/:registrationId`), akcia Presunúť z čakacej listiny v riadku a export do CSV vrátane typov účastníkov, výberov, zaplatené/celkovej sumy/zostatku a odpovedí na otázky.

Vyhľadávania naprieč modulmi (vyhľadanie alebo vytvorenie osoby hosťa, načítanie cirkvi pre e-maily) prebiehajú cez `getMembershipModuleGateway()`. Modul obsahu nikdy priamo nečíta tabuľky členstva.

## Súvisiace stránky

- [Dary](./giving) — abstrakcia brány, register poskytovateľov a model tokenizácie, ktoré táto funkcia opätovne využíva
- [Koncové body obsahu](../api/endpoints/content) — REST rozhranie modulu obsahu
- [Webhooky](../api/webhooks) — udalosť `registration.created`
- [Štruktúra modulov](../api/module-structure) — ako je modul obsahu organizovaný na strane servera
