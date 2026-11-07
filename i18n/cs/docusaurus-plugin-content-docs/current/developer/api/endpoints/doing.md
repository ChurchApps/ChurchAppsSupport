---
title: "Koncové body modulu Doing"
---

# Koncové body modulu Doing

<div class="article-intro">

Modul Doing spravuje plánování bohoslužeb, rozpis dobrovolníků, správu úkolů a automatizace. Nabízí nástroje pro vytváření plánů služeb s časy a pozicemi, přiřazování dobrovolníků, správu termínů nedostupnosti, sestavování položek liturgického pořadu, připojení k externím poskytovatelům obsahu a nastavení automatizovaných postupů s podmínkami a akcemi.

</div>

**Základní cesta:** `/doing`

## Plány

Základní cesta: `/doing/plans`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | — | Seznam všech plánů sboru |
| GET | `/:id` | JWT | — | Získat plán podle ID |
| GET | `/ids?ids=` | JWT | — | Získat více plánů podle ID oddělených čárkou |
| GET | `/types/:planTypeId` | JWT | — | Získat plány podle typu plánu |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + úprava oddělení | Zobrazit přehled služeb, které by funkce **Odeslat SMS dobrovolníkům** odeslala: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` pro dobrovolníky přiřazené v daném rozsahu (jeden na osobu, přeskočeni jsou ti, kdo se odhlásili, a ti bez čísla, sdílená čísla se deduplikují, maximum je 200) |
| GET | `/presenter` | JWT | — | Získat plány na následujících 7 dní (zobrazení pro prezentujícího) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Úprava oddělení | Aktivní postupy potvrzování přiřazení služby (`workflowType = "assignmentConfirmation"`), které může plán vybrat: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Veřejné | — | Získat aktuální plán pro typ plánu |
| GET | `/public/signup/:churchId` | Veřejné | — | Plány otevřené pro přihlášení dobrovolníků, od nejbližšího, každý s pozicemi pro samopřihlášení (řazeno podle `categoryName`, pak `name`, a s počtem `filledCount` přijatých a nepotvrzených přiřazení) a časy. Jména dobrovolníků nejsou uvedena. Pokud má nastavení sboru `volunteerSignupNextOnly` hodnotu `"true"`, vrátí se pouze první plán každého typu plánu. Každý `plan` obsahuje vypočítaný `signupDeadline` (ISO časový údaj, nebo `null`): `signupDeadlineHours` před nejbližším časem typu `service` u plánu (pokud služební čas chybí, použije se libovolný časový záznam; pokud plán nemá žádné časy, použije se 9:00 v časovém pásmu sboru v den `serviceDate`) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` pro pozice plánu s možností samopřihlášení (zobrazovaná jména přijatých a nepotvrzených osob). Vrací `[]`, pokud není u plánu zapnuto `showVolunteerNames` |
| POST | `/` | JWT | — | Vytvoření nebo úprava plánů (přijímá jeden objekt i pole). Nastavením `confirmationWorkflowId` zařadíte plán do postupu potvrzování služby, nastavením `null` se pro budoucí požadavky odhlásíte. Pokud odešlete `signupDeadlineHours: null`, termín se vymaže; pokud pole vynecháte, zůstane uložená hodnota |
| POST | `/copy/:id` | JWT | Úprava oddělení | Zkopírování plánu včetně pozic, časů, přiřazení a položek liturgického pořadu. Tělo požadavku obsahuje `ministryId`, `serviceDate`, `copyMode` (`"none"`, `"positions"`, `"all"`) a `copyServiceOrder` (logická hodnota). Bez `targetPlanId` se vytvoří nový plán a hodnoty `notes`, `signupDeadlineHours`, `showVolunteerNames` a `autoReplaceOnDecline` se převezmou ze zdrojového plánu, pokud je tělo požadavku neuvádí. S `targetPlanId` se místo toho zkopíruje obsah do existujícího plánu (volající musí mít oprávnění jej upravovat). Volba **Opakovat každý týden** v B1Admin volá tuto akci jednou za týden, vždy s kopírováním z plánu vytvořeného o týden dříve |
| POST | `/textRange` | JWT | `texting.send` + úprava oddělení | Odeslání SMS všem dobrovolníkům přiřazeným v rozsahu dat přes poskytovatele SMS sboru. Tělo: `{ startDate, endDate, ministryId, planTypeId?, message }` (zpráva až 1600 znaků; slučovaná pole se nahrazují pro každého příjemce). Vrací počty z náhledu, dále `recipientCount`, `successCount`, `failCount` a `error` (`no_provider` nebo `insufficient_credits`), pokud se odesílání zastaví předčasně |
| POST | `/:id/issueRequests` | JWT | Úprava plánu | Odeslání nových nepotvrzených a dosud neoznámených přiřazení plánu přes jeho postup potvrzování: každé přiřazení se označí jako oznámené a spustí se jedna karta postupu pro každé přiřazení. Prázdné tělo; vrací `{ issued }`. Selže, pokud plán není zveřejněný (není ve stavu `prepared`), nemá aktivní `confirmationWorkflowId` s alespoň jedním krokem, nebo pokud již uplynul termín odpovědi |
| POST | `/autofill/:id` | JWT | — | Automatické vyplnění přiřazení dobrovolníků pro plán. Tělo: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Smazání plánu a všech souvisejících časů, přiřazení, pozic a položek plánu |

### Příklad: Zkopírování plánu

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

## Typy plánů

Základní cesta: `/doing/planTypes`

Rozšiřuje základní třídu CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — bez kontroly oprávnění).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | — | Seznam všech typů plánů |
| GET | `/:id` | JWT | — | Získat typ plánu podle ID |
| GET | `/ids?ids=` | JWT | — | Získat více typů plánů podle ID oddělených čárkou |
| GET | `/ministryId/:ministryId` | JWT | — | Získat typy plánů pro oddělení |
| POST | `/` | JWT | — | Vytvoření nebo úprava typů plánů |
| DELETE | `/:id` | JWT | — | Smazání typu plánu |

## Položky plánu

Základní cesta: `/doing/planItems`

Správa položek liturgického pořadu (nadpisy, sekce, písně apod.) uspořádaných ve stromové struktuře rodič–potomek.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získat položku plánu podle ID |
| GET | `/ids?ids=` | JWT | — | Získat více položek plánu podle ID oddělených čárkou |
| GET | `/plan/:planId` | JWT | — | Získat všechny položky plánu (vrací stromovou strukturu) |
| GET | `/presenter/:churchId/:planId` | Veřejné | — | Získat položky plánu pro zobrazení pro prezentujícího (vrací stromovou strukturu) |
| POST | `/` | JWT | — | Vytvoření nebo úprava položek plánu |
| POST | `/sort` | JWT | — | Aktualizace pořadí položky plánu (přeřadí sourozence) |
| DELETE | `/:id` | JWT | — | Smazání položky plánu |

## Kanál plánu

Základní cesta: `/doing/planFeed`

Poskytuje kanály položek plánu pro prezentujícího. Pokud žádné položky plánu neexistují, automaticky se naplní z kanálu místa Lessons.church pomocí `contentId` plánu.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/presenter/:churchId/:planId` | Veřejné | — | Získat kanál plánu pro prezentujícího (pokud je prázdný, automaticky se naplní z kanálu místa) |

## Pozice

Základní cesta: `/doing/positions`

Rozšiřuje základní třídu CRUD (GET `/:id`, POST `/`, DELETE `/:id` — bez kontroly oprávnění).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získat pozici podle ID |
| GET | `/ids?ids=` | JWT | — | Získat více pozic podle ID oddělených čárkou |
| GET | `/plan/ids?planIds=` | JWT | — | Získat pozice pro více plánů podle ID plánů oddělených čárkou |
| GET | `/plan/:planId` | JWT | — | Získat všechny pozice plánu |
| POST | `/` | JWT | — | Vytvoření nebo úprava pozic |
| DELETE | `/:id` | JWT | — | Smazání pozice |

## Časy

Základní cesta: `/doing/times`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/all` | JWT | — | Seznam všech časů sboru |
| GET | `/:id` | JWT | — | Získat čas podle ID |
| GET | `/plans?planIds=` | JWT | — | Získat časy pro více plánů podle ID plánů oddělených čárkou |
| GET | `/plan/:planId` | JWT | — | Získat všechny časy plánu |
| POST | `/` | JWT | — | Vytvoření nebo úprava časů |
| DELETE | `/:id` | JWT | — | Smazání času |

## Přiřazení

Základní cesta: `/doing/assignments`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/my` | JWT | — | Získat přiřazení aktuálního uživatele |
| GET | `/my/upcoming` | JWT | — | Až 20 přiřazení aktuálního uživatele u plánů s datem od včerejška dál (plány ve stavu předběžného plánování, tedy `prepared`, se přeskakují), od nejbližšího: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Slouží k náhledu služeb na domovské stránce člena |
| GET | `/:id` | JWT | — | Získat přiřazení podle ID |
| GET | `/plan/ids?planIds=` | JWT | — | Získat přiřazení pro více plánů podle ID plánů oddělených čárkou |
| GET | `/plan/:planId` | JWT | — | Získat všechna přiřazení plánu |
| POST | `/` | JWT | — | Vytvoření nebo úprava přiřazení (stav je ve výchozím nastavení „Unconfirmed“) |
| POST | `/accept/:id` | JWT | — | Přijmout přiřazení (musí jít o přiřazenou osobu) |
| POST | `/decline/:id` | JWT | — | Odmítnout přiřazení (musí jít o přiřazenou osobu) |
| POST | `/signup` | JWT | — | Přihlásit se na pozici. Tělo: `{ positionId }`. Pozice musí umožňovat samopřihlášení a mít volné místo; vytvoří přiřazení se stavem Accepted. Odmítnuto s hlášením „Signup deadline has passed“, jakmile uplynul termín přihlášení plánu (počítaný zpět od jeho prvního času služby, jak je uvedeno výše) |
| DELETE | `/signup/:id` | JWT | — | Odhlásit se z vlastního samopřihlášení. Po uplynutí termínu přihlášení plánu odmítnuto s hlášením „Removal deadline has passed“ |
| DELETE | `/:id` | JWT | — | Smazání přiřazení |

### Příklad: Přijetí přiřazení

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

## Termíny nedostupnosti

Základní cesta: `/doing/blockoutDates`

Rozšiřuje základní třídu CRUD (GET `/:id`, DELETE `/:id` — bez kontroly oprávnění).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získat termín nedostupnosti podle ID |
| GET | `/ids?ids=` | JWT | — | Získat více termínů nedostupnosti podle ID oddělených čárkou |
| GET | `/my` | JWT | — | Získat termíny nedostupnosti aktuálního uživatele |
| GET | `/upcoming` | JWT | — | Získat všechny nadcházející termíny nedostupnosti sboru |
| POST | `/` | JWT | — | Vytvoření nebo úprava termínů nedostupnosti (pokud není `personId` uvedeno, doplní se aktuální uživatel) |
| DELETE | `/:id` | JWT | — | Smazání termínu nedostupnosti |

## Úkoly

Základní cesta: `/doing/tasks`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | — | Získat otevřené úkoly aktuálního uživatele |
| GET | `/:id` | JWT | — | Získat úkol podle ID |
| GET | `/:id/contact` | JWT | Může zobrazit kartu | Kontaktní údaje osoby, které se týká karta postupu: `{ personId, displayName, mobilePhone, email }`. Umožňuje přiřazenému volajícímu, který nemá přístup k evidenci osob, se s osobou spojit |
| GET | `/closed` | JWT | — | Získat uzavřené úkoly aktuálního uživatele |
| GET | `/timeline?taskIds=` | JWT | — | Získat údaje časové osy úkolů podle ID úkolů oddělených čárkou |
| GET | `/directoryUpdate/:personId` | JWT | — | Získat úkol aktualizace adresáře pro osobu |
| POST | `/` | JWT | — | Vytvoření nebo úprava úkolů. Přidáním `?type=directoryUpdate` zpracujete úkoly aktualizace adresáře (fotografie se nahrávají automaticky) |
| POST | `/:id/conversation` | JWT | `tasks.edit` nebo přiřazený kně kartě | Připojení konverzace s poznámkami ke kartě. Tělo: `{ conversationId }`. Připojí se první konverzace; další volání vrátí kartu beze změny |
| POST | `/loadForGroups` | JWT | — | Načtení úkolů pro konkrétní skupiny. Tělo: `{ groupIds: [], status: "Open" }` |

## Automatizace

Základní cesta: `/doing/automations`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | — | Seznam všech automatizací sboru |
| GET | `/:id` | JWT | — | Získat automatizaci podle ID |
| GET | `/check` | Veřejné | — | Spustit kontrolu všech automatizací |
| POST | `/` | JWT | — | Vytvoření nebo úprava automatizací |
| DELETE | `/:id` | JWT | — | Smazání automatizace |

## Akce

Základní cesta: `/doing/actions`

Akce určují, co se stane, když je automatizace spuštěna.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získat akci podle ID |
| GET | `/automation/:id` | JWT | — | Získat všechny akce automatizace |
| POST | `/` | JWT | — | Vytvoření nebo úprava akcí |
| DELETE | `/:id` | JWT | — | Smazání akce |

## Podmínky

Základní cesta: `/doing/conditions`

Podmínky určují kritéria, která spouštějí automatizaci.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získat podmínku podle ID |
| GET | `/automation/:id` | JWT | — | Získat všechny podmínky automatizace |
| POST | `/` | JWT | — | Vytvoření nebo úprava podmínek |
| DELETE | `/:id` | JWT | — | Smazání podmínky |

## Spojky

Základní cesta: `/doing/conjunctions`

Spojky propojují více podmínek v automatizaci (logika A/NEBO).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získat spojku podle ID |
| GET | `/automation/:id` | JWT | — | Získat všechny spojky automatizace |
| POST | `/` | JWT | — | Vytvoření nebo úprava spojek |
| DELETE | `/:id` | JWT | — | Smazání spojky |

## Autorizace poskytovatelů obsahu

Základní cesta: `/doing/contentProviderAuths`

Rozšiřuje základní třídu CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — bez kontroly oprávnění).

Spravuje záznamy OAuth autentizace pro externí poskytovatele obsahu (např. integrace s prezentačním softwarem).

`accessToken` a `refreshToken` jsou v úložišti šifrovány pomocí `EncryptionHelper` a při čtení dešifrovány, takže API stále vrací prosté tokeny. Záznamy uložené před zavedením šifrování obsahují prostý text (který nikdy neobsahuje `|`); vrací se beze změny a při příštím uložení se zašifrují.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | — | Seznam všech autentizací poskytovatelů obsahu |
| GET | `/:id` | JWT | — | Získat autentizaci poskytovatele obsahu podle ID |
| GET | `/ids?ids=` | JWT | — | Získat více autentizací poskytovatelů obsahu podle ID oddělených čárkou |
| GET | `/ministry/:ministryId` | JWT | — | Získat všechny autentizace poskytovatelů obsahu pro oddělení |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Získat záznam autentizace pro konkrétní oddělení a poskytovatele |
| POST | `/` | JWT | — | Vytvoření nebo úprava autentizací poskytovatelů obsahu |
| DELETE | `/:id` | JWT | — | Smazání autentizace poskytovatele obsahu |

## Proxy poskytovatele

Základní cesta: `/doing/providerProxy`

Přeposílá požadavky externím poskytovatelům obsahu (např. ProPresenter, EasyWorship). Při vypršení tokenů automaticky obnovuje jejich platnost.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| POST | `/browse` | JWT | — | Procházení souborů poskytovatele obsahu. Tělo: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Získat prezentace od poskytovatele obsahu. Tělo: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Získat playlist od poskytovatele obsahu. Tělo: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Získat pokyny pro položku obsahu. Tělo: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Získat rozšířené pokyny pro položku obsahu. Tělo: `{ ministryId, providerId, path }` |

## Související stránky

- [Koncové body členství](./membership) — Lidé, skupiny, role a oprávnění
- [Koncové body docházky](./attendance) — Sledování bohoslužeb a návštěv
- [Struktura modulu](../module-structure) — Vzory organizace kódu
