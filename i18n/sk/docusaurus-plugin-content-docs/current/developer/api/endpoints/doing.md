---
title: "Koncové body modulu Doing"
---

# Koncové body modulu Doing

<div class="article-intro">

Modul Doing spravuje plánovanie bohoslužieb, plánovanie dobrovoľníkov, správu úloh a automatizácie. Poskytuje nástroje na vytváranie plánov služieb s časmi a pozíciami, priraďovanie dobrovoľníkov, správu dátumov blokovania, zostavovanie položiek poradia služby, pripájanie k externým poskytovateľom obsahu a konfiguráciu automatizovaných pracovných postupov s podmienkami a akciami.

</div>

**Základná cesta:** `/doing`

## Plány

Základná cesta: `/doing/plans`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Zobrazí všetky plány cirkvi |
| GET | `/:id` | JWT | — | Získa plán podľa ID |
| GET | `/ids?ids=` | JWT | — | Získa viacero plánov podľa ID oddelených čiarkou |
| GET | `/types/:planTypeId` | JWT | — | Získa plány podľa typu plánu |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + úprava oddelenia | Zobrazí náhľad prehľadu služby, ktorý odošle funkcia **Poslať SMS dobrovoľníkom**: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` pre dobrovoľníkov priradených v danom rozsahu (jeden na osobu, osoby, ktoré sa odhlásili, a osoby bez čísla sa preskočia, zdieľané čísla sa deduplikujú, maximálne 200) |
| GET | `/presenter` | JWT | — | Získa plány na nasledujúcich 7 dní (zobrazenie pre prezentujúceho) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Úprava oddelenia | Aktívne pracovné postupy potvrdenia priradenia služby (`workflowType = "assignmentConfirmation"`), ktoré môže plán vybrať: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Verejné | — | Získa aktuálny plán pre typ plánu |
| GET | `/public/signup/:churchId` | Verejné | — | Plány otvorené na samostatnú registráciu, od najskoršieho, každý s pozíciami pre samostatnú registráciu (zoradené podľa `categoryName`, potom podľa `name`, plus `filledCount` z priradení Accepted/Unconfirmed) a časmi. Bez mien dobrovoľníkov. Keď má nastavenie cirkvi `volunteerSignupNextOnly` hodnotu `"true"`, vráti sa iba prvý plán každého typu plánu. Každý `plan` obsahuje vypočítaný `signupDeadline` (ISO inštant alebo `null`): `signupDeadlineHours` pred najskorším časom typu `service` plánu (ak nie je žiadny čas služby, akýkoľvek časovaný záznam; 9:00 v časovom pásme cirkvi na `serviceDate`, ak plán nemá žiadne časy) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` pre pozície plánu na samostatnú registráciu (zobrazované mená priradených osôb Accepted/Unconfirmed). Vracia `[]`, pokiaľ nie je zapnuté `showVolunteerNames` plánu |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje plány (prijme jeden objekt alebo pole). Nastavte `confirmationWorkflowId`, aby sa plán prihlásil do pracovného postupu potvrdenia služby, alebo `null`, aby sa pre budúce požiadavky odhlásil. Pošlite `signupDeadlineHours: null` na vymazanie termínu; vynechanie poľa zachová uloženú hodnotu |
| POST | `/copy/:id` | JWT | Úprava oddelenia | Skopíruje plán vrátane pozícií, časov, priradení a položiek poradia služby. Telo obsahuje `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") a `copyServiceOrder` (boolean). Bez `targetPlanId` sa vytvorí nový plán a hodnoty `notes`, `signupDeadlineHours`, `showVolunteerNames` a `autoReplaceOnDecline` sa prenesú zo zdrojového plánu, pokiaľ ich telo neuvádza inak. S `targetPlanId` sa namiesto toho vyplní existujúci plán (volajúci ho musí môcť upraviť). Možnosť **Opakovať týždenne** v B1Admin volá tento príkaz raz za týždeň, pričom vždy kopíruje z plánu vytvoreného týždeň predtým |
| POST | `/textRange` | JWT | `texting.send` + úprava oddelenia | Pošle správu každému dobrovoľníkovi priradenému v rozsahu dátumov cez poskytovateľa SMS služby cirkvi. Telo: `{ startDate, endDate, ministryId, planTypeId?, message }` (správa až 1600 znakov; polia na zlučovanie sa vyhodnotia pre každého príjemcu). Vráti počty náhľadu a tiež `recipientCount`, `successCount`, `failCount` a `error` (`no_provider` alebo `insufficient_credits`), ak sa odosielanie zastaví predčasne |
| POST | `/:id/issueRequests` | JWT | Úprava plánu | Odošle nové priradenia plánu v stave Unconfirmed, ktoré ešte neboli oznámené, cez jeho pracovný postup potvrdenia: označí každé ako oznámené a spustí jednu kartu pracovného postupu na každé priradenie. Prázdne telo; vráti `{ issued }`. Zlyhá, pokiaľ plán nie je zverejnený (nie je `prepared`), nemá aktívne `confirmationWorkflowId` s aspoň jedným krokom a nemá uplynutý termín odpovede |
| POST | `/autofill/:id` | JWT | — | Automaticky vyplní priradenia dobrovoľníkov pre plán. Telo: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Vymaže plán a všetky súvisiace časy, priradenia, pozície a položky plánu |

### Príklad: Kopírovanie plánu

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Typy plánov

Základná cesta: `/doing/planTypes`

Rozširuje základnú triedu CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — bez kontroly oprávnení).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Zobrazí všetky typy plánov |
| GET | `/:id` | JWT | — | Získa typ plánu podľa ID |
| GET | `/ids?ids=` | JWT | — | Získa viacero typov plánov podľa ID oddelených čiarkou |
| GET | `/ministryId/:ministryId` | JWT | — | Získa typy plánov pre oddelenie |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje typy plánov |
| DELETE | `/:id` | JWT | — | Vymaže typ plánu |

## Položky plánu

Základná cesta: `/doing/planItems`

Spravuje položky poradia služby (nadpisy, sekcie, piesne a pod.) organizované v stromovej štruktúre rodič – potomok.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/:id` | JWT | — | Získa položku plánu podľa ID |
| GET | `/ids?ids=` | JWT | — | Získa viacero položiek plánu podľa ID oddelených čiarkou |
| GET | `/plan/:planId` | JWT | — | Získa všetky položky plánu (vracia stromovú štruktúru) |
| GET | `/presenter/:churchId/:planId` | Verejné | — | Získa položky plánu pre zobrazenie prezentujúceho (vracia stromovú štruktúru) |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje položky plánu |
| POST | `/sort` | JWT | — | Aktualizuje poradie zoradenia položky plánu (preradí súrodencov) |
| DELETE | `/:id` | JWT | — | Vymaže položku plánu |

## Kanál plánu

Základná cesta: `/doing/planFeed`

Poskytuje kanály položiek plánu pre prezentujúceho. Ak neexistujú žiadne položky plánu, automaticky sa naplnia z kanála miesta Lessons.church pomocou `contentId` plánu.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/presenter/:churchId/:planId` | Verejné | — | Získa kanál plánu pre prezentujúceho (ak je prázdny, automaticky sa naplní z kanála miesta) |

## Pozície

Základná cesta: `/doing/positions`

Rozširuje základnú triedu CRUD (GET `/:id`, POST `/`, DELETE `/:id` — bez kontroly oprávnení).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/:id` | JWT | — | Získa pozíciu podľa ID |
| GET | `/ids?ids=` | JWT | — | Získa viacero pozícií podľa ID oddelených čiarkou |
| GET | `/plan/ids?planIds=` | JWT | — | Získa pozície pre viacero plánov podľa ID plánov oddelených čiarkou |
| GET | `/plan/:planId` | JWT | — | Získa všetky pozície plánu |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje pozície |
| DELETE | `/:id` | JWT | — | Vymaže pozíciu |

## Časy

Základná cesta: `/doing/times`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/all` | JWT | — | Zobrazí všetky časy cirkvi |
| GET | `/:id` | JWT | — | Získa čas podľa ID |
| GET | `/plans?planIds=` | JWT | — | Získa časy pre viacero plánov podľa ID plánov oddelených čiarkou |
| GET | `/plan/:planId` | JWT | — | Získa všetky časy plánu |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje časy |
| DELETE | `/:id` | JWT | — | Vymaže čas |

## Priradenia

Základná cesta: `/doing/assignments`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/my` | JWT | — | Získa priradenia aktuálneho používateľa |
| GET | `/my/upcoming` | JWT | — | Až 20 priradení aktuálneho používateľa k plánom s dátumom od včerajška (plány označené ako predbežné, alebo `prepared`, sa preskočia), od najbližšieho: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Slúži na náhľad služby na domovskej stránke člena |
| GET | `/:id` | JWT | — | Získa priradenie podľa ID |
| GET | `/plan/ids?planIds=` | JWT | — | Získa priradenia pre viacero plánov podľa ID plánov oddelených čiarkou |
| GET | `/plan/:planId` | JWT | — | Získa všetky priradenia plánu |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje priradenia (stav sa predvolene nastaví na "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Prijme priradenie (musí ísť o priradenú osobu) |
| POST | `/decline/:id` | JWT | — | Odmietne priradenie (musí ísť o priradenú osobu) |
| POST | `/signup` | JWT | — | Samostatná registrácia na pozíciu. Telo: `{ positionId }`. Pozícia musí povoľovať samostatnú registráciu a mať voľné miesto; vytvorí priradenie Accepted. Odmietnuté s chybou "Signup deadline has passed", keď uplynul termín registrácie plánu (počítaný spätne od jeho prvého času služby, ako je uvedené vyššie) |
| DELETE | `/signup/:id` | JWT | — | Odstráni vašu vlastnú samostatnú registráciu. Odmietnuté s chybou "Removal deadline has passed" po termíne registrácie plánu |
| DELETE | `/:id` | JWT | — | Vymaže priradenie |

### Príklad: Prijatie priradenia

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Dátumy blokovania

Základná cesta: `/doing/blockoutDates`

Rozširuje základnú triedu CRUD (GET `/:id`, DELETE `/:id` — bez kontroly oprávnení).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/:id` | JWT | — | Získa dátum blokovania podľa ID |
| GET | `/ids?ids=` | JWT | — | Získa viacero dátumov blokovania podľa ID oddelených čiarkou |
| GET | `/my` | JWT | — | Získa dátumy blokovania aktuálneho používateľa |
| GET | `/upcoming` | JWT | — | Získa všetky nadchádzajúce dátumy blokovania cirkvi |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje dátumy blokovania (ak nie je zadané `personId`, predvolene sa nastaví na aktuálneho používateľa) |
| DELETE | `/:id` | JWT | — | Vymaže dátum blokovania |

## Úlohy

Základná cesta: `/doing/tasks`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Získa otvorené úlohy aktuálneho používateľa |
| GET | `/:id` | JWT | — | Získa úlohu podľa ID |
| GET | `/:id/contact` | JWT | Môže zobraziť kartu | Kontaktné údaje osoby, ktorej sa týka karta pracovného postupu: `{ personId, displayName, mobilePhone, email }`. Umožňuje priradenému volajúcemu bez prístupu k modulu Ľudia kontaktovať danú osobu |
| GET | `/closed` | JWT | — | Získa uzavreté úlohy aktuálneho používateľa |
| GET | `/timeline?taskIds=` | JWT | — | Získa údaje časovej osi pre úlohy podľa ID úloh oddelených čiarkou |
| GET | `/directoryUpdate/:personId` | JWT | — | Získa úlohu aktualizácie adresára pre osobu |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje úlohy. Pridajte `?type=directoryUpdate` na spracovanie úloh aktualizácie adresára (automaticky nahrá fotografie) |
| POST | `/:id/conversation` | JWT | `tasks.edit` alebo priradená osoba karty | Pripojí konverzáciu s poznámkami ku karte. Telo: `{ conversationId }`. Prvá pripojená konverzácia má prednosť; ďalšie volania vrátia kartu nezmenenú |
| POST | `/loadForGroups` | JWT | — | Načíta úlohy pre konkrétne skupiny. Telo: `{ groupIds: [], status: "Open" }` |

## Automatizácie

Základná cesta: `/doing/automations`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Zobrazí všetky automatizácie cirkvi |
| GET | `/:id` | JWT | — | Získa automatizáciu podľa ID |
| GET | `/check` | Verejné | — | Spustí kontrolu všetkých automatizácií |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje automatizácie |
| DELETE | `/:id` | JWT | — | Vymaže automatizáciu |

## Akcie

Základná cesta: `/doing/actions`

Akcie definujú, čo sa stane, keď sa automatizácia spustí.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/:id` | JWT | — | Získa akciu podľa ID |
| GET | `/automation/:id` | JWT | — | Získa všetky akcie automatizácie |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje akcie |
| DELETE | `/:id` | JWT | — | Vymaže akciu |

## Podmienky

Základná cesta: `/doing/conditions`

Podmienky definujú kritériá, ktoré spúšťajú automatizáciu.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/:id` | JWT | — | Získa podmienku podľa ID |
| GET | `/automation/:id` | JWT | — | Získa všetky podmienky automatizácie |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje podmienky |
| DELETE | `/:id` | JWT | — | Vymaže podmienku |

## Logické spojky

Základná cesta: `/doing/conjunctions`

Spojky prepájajú viacero podmienok v automatizácii (logika AND/OR).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/:id` | JWT | — | Získa spojku podľa ID |
| GET | `/automation/:id` | JWT | — | Získa všetky spojky automatizácie |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje spojky |
| DELETE | `/:id` | JWT | — | Vymaže spojku |

## Overenia poskytovateľov obsahu

Základná cesta: `/doing/contentProviderAuths`

Rozširuje základnú triedu CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — bez kontroly oprávnení).

Spravuje záznamy overenia OAuth pre externých poskytovateľov obsahu (napr. integrácie prezentačného softvéru).

`accessToken` a `refreshToken` sa pri ukladaní šifrujú pomocou `EncryptionHelper` a pri čítaní dešifrujú, takže API stále vracia čisté tokeny. Záznamy uložené pred zavedením šifrovania obsahujú čistý text (ktorý nikdy neobsahuje `|`); vrátia sa tak, ako sú, a pri ďalšom uložení sa zašifrujú.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Zobrazí všetky overenia poskytovateľov obsahu |
| GET | `/:id` | JWT | — | Získa overenie poskytovateľa obsahu podľa ID |
| GET | `/ids?ids=` | JWT | — | Získa viacero overení poskytovateľov obsahu podľa ID oddelených čiarkou |
| GET | `/ministry/:ministryId` | JWT | — | Získa všetky overenia poskytovateľov obsahu pre oddelenie |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Získa záznam overenia pre konkrétne oddelenie a poskytovateľa |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje overenia poskytovateľov obsahu |
| DELETE | `/:id` | JWT | — | Vymaže overenie poskytovateľa obsahu |

## Proxy poskytovateľa

Základná cesta: `/doing/providerProxy`

Preposiela požiadavky externým poskytovateľom obsahu (napr. ProPresenter, EasyWorship). Pri vypršaní tokenov automaticky rieši obnovenie tokenu.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| POST | `/browse` | JWT | — | Prehliada súbory poskytovateľa obsahu. Telo: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Získa prezentácie od poskytovateľa obsahu. Telo: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Získa playlist od poskytovateľa obsahu. Telo: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Získa pokyny pre položku obsahu. Telo: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Získa rozšírené pokyny pre položku obsahu. Telo: `{ ministryId, providerId, path }` |

## Súvisiace stránky

- [Koncové body členstva](./membership) — Ľudia, skupiny, roly a oprávnenia
- [Koncové body návštevnosti](./attendance) — Sledovanie služieb a návštev
- [Štruktúra modulu](../module-structure) — Vzory organizácie kódu
