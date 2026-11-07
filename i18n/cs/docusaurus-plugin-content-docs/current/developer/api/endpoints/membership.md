---
title: "Koncové body modulu Membership"
description: "Referenční přehled endpointů Membership API ChurchApps: osoby, domácnosti, skupiny, role, formuláře a nastavení, s pravidly autentizace a oprávnění."
---

# Koncové body modulu Membership

<div class="article-intro">

Modul Membership spravuje osoby, sbory, skupiny, domácnosti, role, oprávnění, formuláře a nastavení. Je to nejrozsáhlejší modul a poskytuje základní vrstvu identity a autorizace pro všechny ostatní moduly.

</div>

**Základní cesta:** `/membership`

## Osoby

Základní cesta: `/membership/people`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/` | JWT | People.View nebo Member | Seznam všech osob ve sboru |
| GET | `/:id` | JWT | People.View nebo vlastní záznam | Načtení osoby podle ID (včetně odeslaných formulářů) |
| GET | `/ids?ids=` | JWT | People.View, Member nebo People.ViewNames | Načtení více osob podle ID oddělených čárkou. Volající s People.ViewNames bez People.View dostanou základní model; osoby, které se odhlásily z adresáře, jsou vynechány (kromě volajícího) |
| GET | `/basic?ids=` | JWT | — | Načtení základních údajů (pouze jméno) pro více osob |
| GET | `/names?ids=` | JWT | Libovolné oprávnění sboru | `[{ id, name: { display, first, last }, photo }]`, seřazeno podle příjmení a poté křestního jména, pro ID oddělená čárkou, která volající již má. Umožňuje rolím bez People.View (dary, docházka) označit osoby jmény. Bez vyhledávání a bez filtru adresáře |
| POST | `/names` | JWT | Libovolné oprávnění sboru | Stejné jako `GET /names`. Tělo: `{ peopleIds }` (nebo `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member nebo People.ViewNames | Nedávno přidané osoby. Volající s People.ViewNames bez People.View (i členové s přístupem do adresáře) dostanou základní model (`id`, `name.display`, `photo`, `membershipStatus`); osoby, které se odhlásily z adresáře, jsou vynechány |
| GET | `/guest-register/options?churchId=` | Veřejné | — | Kontrolní seznam registrace hostů přes QR kód: vrací `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, každé s hodnotou `"off"`, `"optional"` nebo `"required"` (čteno z veřejného nastavení `guestRegistrationFields`; chybějící nebo chybné hodnoty se nahradí výchozím nastavením: e-mail a telefon volitelné, ostatní vypnuto). Vyžaduje `enableQRGuestRegistration`, pokud požadavek neobsahuje odpovídající token webu nebo sboru; omezeno počtem požadavků (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member nebo People.ViewNames | Vyhledávání osob podle jména nebo e-mailu (až 100, seřazeno podle příjmení a poté křestního jména). Volající s People.ViewNames bez People.View (i členové s přístupem do adresáře) dostanou vyhledávání podle jména se základním modelem; vyhledávání podle `email` vrací `[]` |
| GET | `/search/phone?number=` | JWT | People.View nebo Member | Vyhledávání podle telefonního čísla |
| GET | `/search/group?groupId=` | JWT | People.View nebo Member | Načtení osob v konkrétní skupině |
| GET | `/household/:householdId` | JWT | — | Načtení všech osob v domácnosti |
| GET | `/attendance` | JWT | People.Edit | Načtení účastníků s filtry (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Načtení časové osy pro osoby a skupiny |
| GET | `/directory/:id` | JWT | — | Načtení osoby pro zobrazení v adresáři (respektuje předvolby viditelnosti) |
| GET | `/claim/:churchId` | JWT | — | Přiřazení záznamu osoby aktuálnímu uživateli ve sboru |
| POST | `/` | JWT | People.Edit nebo EditSelf | Vytvoření nebo aktualizace osob (dávkově) |
| POST | `/search` | JWT | People.View, Member nebo People.ViewNames | Vyhledávání osob (varianta POST). Tělo: `{ term }` nebo `{ email }`; stejná pravidla pro jména jako u `GET /search` |
| POST | `/advancedSearch` | JWT | People.View nebo Member | Vícepodmínkové vyhledávání (věk, birthMonth, membershipStatus atd.). Tělo je pole podmínek; prázdné tělo znamená žádné podmínky, jakékoli jiné tělo, které není polem, vrací 400 |
| POST | `/loadOrCreate` | Veřejné | — | Vyhledání nebo vytvoření osoby podle e-mailu. Tělo: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Veřejné | — | Registrace hosta přes QR kód. Tělo: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 členů; email, telefon a maritalStatus se použijí pouze pro prvního člena). Pole, která sbor vypnul, se zahodí; chybějící povinné nebo neplatné hodnoty vrátí 400. Nejprve se znovu použijí existující osoby: člen se shoduje, pokud právě jedna nesmazaná osoba má stejné křestní jméno (bez ohledu na velikost písmen) a stejný e-mail nebo stejné číslice telefonu (domů, do práce nebo mobil); člen bez e-mailu nebo telefonu se páruje podle křestního jména uvnitř nalezené domácnosti. Nalezené osoby se nikdy neupravují. Nepárovaní členové se připojí k nalezené domácnosti, nebo jinak vznikne nová domácnost (pojmenovaná podle příjmení prvního člena) se stavem `membershipStatus: "Visitor"` a sdílenou `address`. Pole `comments` se uloží jako poznámka k prvnímu členovi, všichni se přidají do soukromé skupiny `guestRegistrationGroupId`, je-li nastavena, a pokud je `guestRegistrationRecordAttendance` nastaveno na `"true"`, zaznamená se docházka pro naplánované časy bohoslužeb této skupiny, jejichž okno pro check-in je právě otevřené. Vrací `{ householdId, people: [{ id, name }] }` a odráží odeslaná jména, nikoli uložená. Stejná pravidla pro souhlas/token a omezení počtu požadavků jako u volání options |
| POST | `/household/:householdId` | JWT | People.Edit | Aktualizace přiřazení členů domácnosti |
| POST | `/public/email` | Veřejné | — | Odeslání e-mailu osobě. Tělo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interní | — | Načtení e-mailů osob podle ID (komunikace mezi servery, vyžaduje jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Smazání osoby |

### Příklad: vyhledání osob

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Příklad: vytvoření osoby

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Uživatelé

Základní cesta: `/membership/users`

Informace o přihlášení, registraci a správě hesel najdete v části [Autentizace a oprávnění](./authentication.md).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| POST | `/login` | Veřejné | — | Přihlášení (e-mail/heslo, obnovení JWT nebo authGuid) |
| POST | `/register` | Veřejné | — | Registrace nového uživatele |
| POST | `/forgot` | Veřejné | — | Odeslání e-mailu pro obnovení hesla |
| POST | `/setPasswordGuid` | Veřejné | — | Nastavení hesla pomocí auth GUID z odkazu v e-mailu |
| POST | `/verifyCredentials` | Veřejné | — | Ověření e-mailu/hesla a vrácení přidružených sborů |
| POST | `/loadOrCreate` | JWT | — | Vyhledání nebo vytvoření uživatele podle e-mailu/userId |
| POST | `/setDisplayName` | JWT | — | Aktualizace křestního jména a příjmení uživatele |
| POST | `/updateEmail` | JWT | — | Změna e-mailové adresy uživatele |
| POST | `/updatePassword` | JWT | — | Změna hesla uživatele (min. 6 znaků) |
| POST | `/updateOptedOut` | JWT | — | Nastavení stavu odhlášení z adresáře u osoby |
| POST | `/sendInviteEmail` | JWT | People.Edit | Odeslání pozvánky osobě v tomto sboru (`email`, `personName`, `contextName`). Tlačítko je označeno **Registrace**, pokud osoba nemá účet, a **Přihlášení**, pokud je uživatel již registrovaný. Uživatel, který se nikdy nepřihlásil, místo toho dostane odkaz **Nastavit heslo**, který vyprší za 7 dní. Jde o pevnou šablonu, takže se nezapočítává do denního limitu e-mailů sboru |
| GET | `/search?term=` | JWT | Server.Admin | Vyhledávání všech uživatelů podle jména/e-mailu |
| DELETE | `/` | JWT | — | Smazání účtu aktuálního uživatele |

## Sbory

Základní cesta: `/membership/churches`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Načtení všech sborů aktuálního uživatele |
| GET | `/:id` | JWT | — | Načtení sboru podle ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Načtení správce domény pro sbor |
| GET | `/:id/impersonate` | JWT | Server.Admin | Přihlášení do sboru jménem jiného uživatele (pouze server admin) |
| GET | `/all?term=` | JWT | Server.Admin | Vyhledávání všech sborů (admin) |
| GET | `/search/?name=` | Veřejné | — | Vyhledávání sborů podle názvu |
| GET | `/lookup/?subDomain=&id=` | Veřejné | — | Vyhledání sboru podle subdomény nebo ID |
| POST | `/` | JWT | Settings.Edit | Aktualizace údajů o sboru |
| POST | `/add` | JWT | — | Registrace nového sboru. Povinná pole: name, address1, city, state, zip, country |
| POST | `/search` | Veřejné | — | Vyhledávání sborů podle názvu (varianta POST) |
| POST | `/select` | JWT | — | Výběr/přepnutí na sbor. Tělo: `{ churchId }` nebo `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archivace nebo obnovení sboru z archivu |
| POST | `/byIds` | Veřejné | — | Načtení více sborů podle ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Smazání sborů neaktivních 7 a více dní |

## Skupiny

Základní cesta: `/membership/groups`

Rozšiřuje standardní CRUD (GET `/`, GET `/:id` ze základní třídy).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Seznam všech skupin |
| GET | `/:id` | JWT | — | Načtení skupiny podle ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Vyhledávání skupin podle filtrů bohoslužeb |
| GET | `/my` | JWT | — | Načtení skupin aktuálního uživatele |
| GET | `/my/:tag` | JWT | — | Načtení skupin aktuálního uživatele filtrovaných podle štítku |
| GET | `/tag/:tag` | JWT | — | Načtení všech skupin s daným štítkem |
| GET | `/public/:churchId/:id` | Veřejné | — | Načtení veřejné skupiny podle sboru a ID |
| GET | `/public/:churchId/tag/:tag` | Veřejné | — | Načtení veřejných skupin podle štítku |
| GET | `/public/:churchId/label?label=` | Veřejné | — | Načtení veřejných skupin podle popisku |
| GET | `/public/:churchId/slug/:slug` | Veřejné | — | Načtení veřejné skupiny podle slugu |
| POST | `/` | JWT | Groups.Edit | Vytvoření nebo aktualizace skupin (slug se generuje automaticky) |
| DELETE | `/:id` | JWT | Groups.Edit | Smazání skupiny (u služebních skupin smaže i podřízené týmy) |

## Členové skupin

Základní cesta: `/membership/groupmembers`

Rozšiřuje standardní CRUD (GET `/:id`, DELETE `/:id` ze základní třídy).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | GroupMembers.View | Načtení člena skupiny podle ID |
| GET | `/` | JWT | GroupMembers.View* | Seznam členů skupin. Filtr `?groupId=`, `?groupIds=` nebo `?personId=`. *Povoleno také, pokud je uživatel členem skupiny nebo dotaz směřuje na vlastní personId, a pro `?groupId=` jakékoli neduvěrné skupiny, pokud uživatel má Attendance.View nebo Attendance.Edit (členové mladší 13 let jsou pro ně zahrnuti) |
| GET | `/my` | JWT | — | Načtení členství v skupinách aktuálního uživatele |
| GET | `/basic/:groupId` | JWT | — | Načtení základního seznamu členů skupiny |
| GET | `/public/leaders/:churchId/:groupId` | Veřejné | — | Načtení vedoucích skupiny (veřejné) |
| GET | `/public/:churchId/:groupId` | Veřejné | — | Načtení veřejného seznamu skupiny (minimální pole: `personId`, `displayName`, `leader`, fotografie). Pouze pokud skupina povolí `publicRoster`; napájí prvek `staffGrid` tvůrce webových stránek |
| POST | `/` | JWT | GroupMembers.Edit | Přidání nebo aktualizace členů skupin |
| DELETE | `/:id` | JWT | GroupMembers.View | Odebrání člena ze skupiny |

## Domácnosti

Základní cesta: `/membership/households`

Standardní CRUD controller.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Seznam všech domácností |
| GET | `/:id` | JWT | — | Načtení domácnosti podle ID |
| POST | `/` | JWT | People.Edit | Vytvoření nebo aktualizace domácností |
| DELETE | `/:id` | JWT | People.Edit | Smazání domácnosti |

## Role

Základní cesta: `/membership/roles`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | Roles.View | Načtení role podle ID |
| GET | `/church/:churchId` | JWT | Roles.View | Načtení všech rolí sboru. Každá role obsahuje `memberCount`, tedy počet různých uživatelů v ní |
| POST | `/` | JWT | Roles.Edit | Vytvoření nebo aktualizace rolí |
| DELETE | `/:id` | JWT | Roles.Edit | Smazání role (odstraní také její oprávnění a členy) |

## Členové rolí

Základní cesta: `/membership/rolemembers`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | Načtení členů role. Přidejte `?include=users` pro zahrnutí údajů o uživatelích |
| POST | `/` | JWT | Roles.Edit | Přidání členů do role (pokud e-mail neexistuje, vytvoří uživatele) |
| DELETE | `/:id` | JWT | Roles.View | Odebrání člena role |
| DELETE | `/self/:churchId/:userId` | JWT | — | Odebrání sebe sama ze sboru |

## Oprávnění rolí

Základní cesta: `/membership/rolepermissions`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | Načtení oprávnění role (jako ID použijte `null` pro roli „Everyone“) |
| POST | `/` | JWT | Roles.Edit | Vytvoření nebo aktualizace oprávnění role |
| DELETE | `/:id` | JWT | Roles.Edit | Smazání oprávnění role |

## Oprávnění

Základní cesta: `/membership/permissions`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Načtení úplného seznamu dostupných oprávnění |

Každá položka obsahuje `apiName`, `section` (typ obsahu), `action` a popisky `displaySection` / `displayAction`, které zobrazuje editor rolí v B1Admin. Nedávno přidaná oprávnění: `MembershipApi` / `People` / `View Names` (**Zobrazit pouze jména osob**, v sekci Osoby a skupiny) a `GivingApi` / `Donations` / `Enter` (**Zadávat dary**, v sekci Dary; viz [Dávkové zpracování darů](./giving.md#donation-batches)).

## Formuláře

Základní cesta: `/membership/forms`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin nebo Forms.Edit | Seznam všech formulářů (admin vidí všechny; editoři vidí přiřazené a formuláře mimo členy) |
| GET | `/:id` | JWT | Přístup k formuláři | Načtení formuláře podle ID |
| GET | `/archived` | JWT | Forms.Admin nebo Forms.Edit | Seznam archivovaných formulářů |
| GET | `/group/:groupId` | JWT | Člen skupiny, vedoucí skupiny nebo Forms.Admin | Samostatné formuláře propojené se skupinou (`forms.groupId`), bez archivovaných, seřazené podle názvu. Vrací `id`, `name`, `description` a `open` (v rámci období dostupnosti). Členové vidí pouze otevřené formuláře; vedoucí a správci formulářů vidí také uzavřené. Slouží k zobrazení propojených formulářů na stránce skupiny |
| GET | `/standalone/:id?churchId=` | JWT | — | Načtení samostatného formuláře (omezené formuláře vyžadují přihlášení) |
| POST | `/` | JWT | Forms.Admin nebo Forms.Edit | Vytvoření nebo aktualizace formulářů. Samostatné formuláře přijímají volitelné `photoUrl` (fotografie v záhlaví nad formulářem) a `groupId` (propojená skupina) |
| DELETE | `/:id` | JWT | Přístup k formuláři | Smazání formuláře |

## Odeslané formuláře

Základní cesta: `/membership/formsubmissions`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin nebo Forms.Edit | Seznam odeslání. Filtr `?personId=` nebo `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Pouze vlastní data: až 50 odeslání samostatných formulářů (ne formulářů osob), která přihlášený člen odeslal nebo která jsou propojena s jeho osobou (`contentType` `person`, `contentId` = ID jeho osoby – například po změně osoby administrátorem), od nejnovějších, každé s `form.name`. Parametr `include` přidá otázky formuláře a odpovědi na odeslání. Vrací `401`, pokud uživatel není propojen s osobou. Slouží jako sekce **Moje formuláře** na stránce B1 Me |
| GET | `/group/:groupId` | JWT | Vedoucí skupiny | Odpovědi pro vedoucí skupiny: jedna položka na každý propojený formulář a na každou událost skupiny s registračním formulářem, každá s `form`, `event` (`id`, `title`, `start`; pouze u položek událostí), `questions` a `submissions` (s `answers` a `personName`, `null` u anonymních odeslání) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit nebo přístup k zobrazení | Načtení odeslání podle ID. Přidejte `?include=form,questions,answers`. Vedoucí skupiny propojené s formulářem a vedoucí skupiny, ke které patří registrace na událost, jej mohou také číst |
| GET | `/formId/:formId` | JWT | Přístup k formuláři (zobrazení) | Načtení všech odeslání formuláře (včetně formuláře, otázek a odpovědí). Vedoucí skupiny propojené s formulářem mají přístup k zobrazení |
| POST | `/` | JWT | — | Odeslání odpovědí na formulář (zpracuje omezené i neomezené formuláře, odesílá e-mailová oznámení). Pokud formulář obsahuje `autoCreatePerson`, vyhledá nebo vytvoří osobu typu Guest podle e-mailu a propojí s ní odeslání; pokud má formulář také `groupId`, přidá tuto osobu do skupiny; pokud jsou nastaveny `followUpSubject`/`followUpBody`, odešle odesílateli šablonový doprovodný e-mail. Pokud volající nemůže formulář spravovat, je `submittedBy` vždy nastaveno na osobu přihlášeného člena (nebo zůstane prázdné u anonymních odeslání) |
| DELETE | `/:id` | JWT | Forms.Admin nebo Forms.Edit | Smazání odeslání a jeho odpovědí |

## Otázky

Základní cesta: `/membership/questions`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/` | JWT | Přístup k formuláři | Seznam otázek formuláře. Vyžaduje `?formId=` |
| GET | `/:id` | JWT | Přístup k formuláři | Načtení otázky podle ID |
| GET | `/unrestricted?formId=` | JWT | — | Načtení otázek neomezeného formuláře |
| GET | `/sort/:id/up` | JWT | — | Posun otázky výše v řazení |
| GET | `/sort/:id/down` | JWT | — | Posun otázky níže v řazení |
| POST | `/` | JWT | Přístup k formuláři | Vytvoření nebo aktualizace otázek (pořadí se přiřadí automaticky) |
| DELETE | `/:id?formId=` | JWT | Přístup k formuláři | Smazání otázky |

## Odpovědi

Základní cesta: `/membership/answers`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin nebo Forms.Edit | Seznam odpovědí. Filtr `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin nebo Forms.Edit | Vytvoření nebo aktualizace odpovědí |

## Oprávnění členů

Základní cesta: `/membership/memberpermissions`

Řídí přístup jednotlivých členů ke konkrétním formulářům.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | Přístup k formuláři | Načtení oprávnění člena podle ID |
| GET | `/member/:id` | JWT | Přístup k formuláři | Načtení všech oprávnění k formulářům pro člena |
| GET | `/form/:id` | JWT | Přístup k formuláři | Načtení všech oprávnění členů pro formulář |
| GET | `/form/:id/my` | JWT | Přístup k formuláři | Načtení oprávnění aktuálního uživatele k formuláři |
| POST | `/` | JWT | Přístup k formuláři | Vytvoření nebo aktualizace oprávnění členů |
| DELETE | `/:id?formId=` | JWT | Přístup k formuláři | Smazání oprávnění člena |
| DELETE | `/member/:id?formId=` | JWT | Přístup k formuláři | Smazání všech oprávnění člena k formuláři |

## Nastavení

Základní cesta: `/membership/settings`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/` | JWT | Settings.Edit | Načtení všech nastavení sboru |
| GET | `/public/:churchId` | Veřejné | — | Načtení veřejných nastavení sboru |
| POST | `/` | JWT | Settings.Edit | Uložení nastavení (podporuje nahrání obrázku v base64) |

## Domény

Základní cesta: `/membership/domains`

Rozšiřuje standardní CRUD (GET `/:id`, GET `/`, DELETE `/:id` ze základní třídy).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Seznam všech domén |
| GET | `/:id` | JWT | — | Načtení domény podle ID |
| GET | `/lookup/:domainName` | JWT | — | Vyhledání domény podle názvu |
| GET | `/public/lookup/:domainName` | Veřejné | — | Veřejné vyhledání domény podle názvu |
| GET | `/health/check` | Veřejné | — | Spustí kontrolu stavu u neověřených domén |
| POST | `/` | JWT | Settings.Edit | Vytvoření nebo aktualizace domén (spouští aktualizaci Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Smazání domény |

## Uživatel a sbor

Základní cesta: `/membership/userchurch`

Spravuje vztah mezi uživateli a sbory.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/userid/:userId` | JWT | — | Načtení záznamu uživatel–sbor podle ID uživatele |
| GET | `/personid/:personId` | JWT | — | Načtení e-mailu propojeného uživatele osoby |
| GET | `/user/:userId` | JWT | Server.Admin | Načtení všech sborů uživatele |
| POST | `/` | JWT | — | Vytvoření přiřazení uživatele ke sboru |
| PATCH | `/:userId` | JWT | — | Aktualizace času posledního přístupu a zaznamenání přístupu |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Smazání záznamu uživatel–sbor |

## Předvolby viditelnosti

Základní cesta: `/membership/visibilityPreferences`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Načtení předvoleb viditelnosti aktuálního uživatele |
| POST | `/` | JWT | — | Uložení předvoleb viditelnosti (viditelnost adresy, telefonu, e-mailu) |

## Dotazy

Základní cesta: `/membership/query`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| POST | `/members` | JWT | — | Vyhledávání členů v přirozeném jazyce pomocí AI. Tělo: `{ text, subDomain, siteUrl }` |

## Chyby klienta

Základní cesta: `/membership/clientErrors`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|------|------|------|------|
| POST | `/` | JWT | — | Zaznamenání chyby na straně klienta |

## Související stránky

- [Autentizace a oprávnění](./authentication.md) — Přihlašovací postup, JWT, OAuth, model oprávnění
- [Koncové body docházky](./attendance.md) — Sledování bohoslužeb a návštěv
- [Struktura modulu](../module-structure.md) — Vzory organizace kódu
