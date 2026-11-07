---
title: "Koncové body modulu Membership"
---

# Koncové body modulu Membership

<div class="article-intro">

Modul Membership spravuje osoby, cirkvi, skupiny, domácnosti, roly, oprávnenia, formuláre a nastavenia. Je to najrozsiahlejší modul a poskytuje základnú vrstvu identity a autorizácie pre všetky ostatné moduly.

</div>

**Základná cesta:** `/membership`

## Osoby

Základná cesta: `/membership/people`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | People.View alebo Member | Zobrazí všetky osoby cirkvi |
| GET | `/:id` | JWT | People.View alebo vlastný záznam | Získa osobu podľa ID (vrátane odoslaných formulárov) |
| GET | `/ids?ids=` | JWT | People.View, Member alebo People.ViewNames | Získa viacero osôb podľa ID oddelených čiarkami. Volajúci s People.ViewNames bez People.View dostanú základný model, pričom osoby, ktoré sa odhlásili, sú vynechané (okrem volajúceho) |
| GET | `/basic?ids=` | JWT | — | Získa základné údaje (iba meno) pre viacero osôb |
| GET | `/names?ids=` | JWT | Ľubovoľné oprávnenie cirkvi | `[{ id, name: { display, first, last }, photo }]`, zoradené podľa priezviska a potom krstného mena, pre ID oddelené čiarkami, ktoré volajúci už má. Roly bez People.View (dary, dochádzka) tak môžu označiť osoby menom. Bez vyhľadávania a bez filtra adresára |
| POST | `/names` | JWT | Ľubovoľné oprávnenie cirkvi | Rovnaké ako `GET /names`. Telo požiadavky: `{ peopleIds }` (alebo `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member alebo People.ViewNames | Nedávno pridané osoby. Volajúci s People.ViewNames bez People.View (aj členovia s prístupom do adresára) dostanú základný model (`id`, `name.display`, `photo`, `membershipStatus`), pričom osoby, ktoré sa odhlásili, sú vynechané |
| GET | `/guest-register/options?churchId=` | Verejný | — | Kontrolný zoznam registrácie hostí cez QR kód: vráti `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, pričom každá hodnota je `"off"`, `"optional"` alebo `"required"` (spracované z verejného nastavenia `guestRegistrationFields`; chýbajúce alebo chybné hodnoty sa nahradia predvolenými: email a telefón voliteľné, ostatné vypnuté). Vyžaduje `enableQRGuestRegistration`, pokiaľ požiadavka neobsahuje zodpovedajúci token webu alebo cirkvi; obmedzené počtom požiadaviek (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member alebo People.ViewNames | Vyhľadá osoby podľa mena alebo e-mailu (najviac 100, zoradené podľa priezviska a potom krstného mena). Volajúci s People.ViewNames bez People.View (aj členovia s prístupom do adresára) dostanú vyhľadávanie podľa mena vracajúce základný model; vyhľadávanie podľa `email` vráti `[]` |
| GET | `/search/phone?number=` | JWT | People.View alebo Member | Vyhľadá podľa telefónneho čísla |
| GET | `/search/group?groupId=` | JWT | People.View alebo Member | Získa osoby v konkrétnej skupine |
| GET | `/household/:householdId` | JWT | — | Získa všetky osoby v domácnosti |
| GET | `/attendance` | JWT | People.Edit | Načíta účastníkov s filtrami (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Načíta údaje časovej osi pre osoby a skupiny |
| GET | `/directory/:id` | JWT | — | Získa osobu pre zobrazenie v adresári (rešpektuje predvoľby viditeľnosti) |
| GET | `/claim/:churchId` | JWT | — | Priradí záznam osoby aktuálnemu používateľovi v cirkvi |
| POST | `/` | JWT | People.Edit alebo EditSelf | Vytvorí alebo aktualizuje osoby (dávkovo) |
| POST | `/search` | JWT | People.View, Member alebo People.ViewNames | Vyhľadá osoby (variant POST). Telo požiadavky: `{ term }` alebo `{ email }`; rovnaké pravidlá pre mená ako `GET /search` |
| POST | `/advancedSearch` | JWT | People.View alebo Member | Vyhľadávanie podľa viacerých podmienok (vek, birthMonth, membershipStatus atď.). Telo je pole podmienok; prázdne telo znamená žiadne podmienky a akékoľvek iné telo, ktoré nie je pole, vráti 400 |
| POST | `/loadOrCreate` | Verejný | — | Nájde alebo vytvorí osobu podľa e-mailu. Telo požiadavky: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Verejný | — | Registrácia hosťa cez QR kód. Telo požiadavky: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1 až 10 členov; email, telefón a maritalStatus sa uplatnia iba na prvého člena). Polia, ktoré cirkev vypla, sa zahodia; chýbajúce povinné alebo neplatné hodnoty vrátia 400. Najprv sa použijú existujúce osoby: člen sa zhoduje, ak presne jedna neodstránená osoba má rovnaké krstné meno (bez ohľadu na veľkosť písmen) a rovnaký e-mail alebo rovnaké číslice telefónu (domáci, pracovný alebo mobilný); člen bez e-mailu alebo telefónu sa páruje podľa krstného mena v rámci zhodnej domácnosti. Zhodné osoby sa nikdy neupravujú. Nezhodní členovia sa pridajú do zhodnej domácnosti, alebo do novej domácnosti (pomenovanej podľa priezviska prvého člena) ako `membershipStatus: "Visitor"` so spoločnou `address`. `comments` sa uložia ako poznámka k prvému členovi, všetci sa pridajú do súkromnej skupiny `guestRegistrationGroupId`, ak je nastavená, a ak je `guestRegistrationRecordAttendance` nastavené na `"true"`, zaznamená sa dochádzka na plánované časy bohoslužieb tejto skupiny, ktorých okno na prihlásenie je práve otvorené. Vráti `{ householdId, people: [{ id, name }] }`, pričom zopakuje odoslané mená namiesto uložených. Rovnaké pravidlá súhlasu/tokenu a obmedzenia počtu požiadaviek ako pri volaní options |
| POST | `/household/:householdId` | JWT | People.Edit | Aktualizuje priradenie členov domácnosti |
| POST | `/public/email` | Verejný | — | Pošle e-mail osobe. Telo požiadavky: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interný | — | Načíta e-maily osôb podľa ID (komunikácia medzi servermi, vyžaduje jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Vymaže osobu |

### Príklad: Vyhľadanie osôb

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

### Príklad: Vytvorenie osoby

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Používatelia

Základná cesta: `/membership/users`

Pozri [Autentifikácia a oprávnenia](./authentication) o koncových bodoch na prihlásenie, registráciu a správu hesla.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| POST | `/login` | Verejný | — | Prihlásenie (e-mail/heslo, obnovenie JWT alebo authGuid) |
| POST | `/register` | Verejný | — | Zaregistruje nového používateľa |
| POST | `/forgot` | Verejný | — | Pošle e-mail na obnovenie hesla |
| POST | `/setPasswordGuid` | Verejný | — | Nastaví heslo pomocou auth GUID z odkazu v e-maile |
| POST | `/verifyCredentials` | Verejný | — | Overí e-mail/heslo a vráti k nim priradené cirkvi |
| POST | `/loadOrCreate` | JWT | — | Nájde alebo vytvorí používateľa podľa e-mailu/userId |
| POST | `/setDisplayName` | JWT | — | Aktualizuje krstné meno a priezvisko používateľa |
| POST | `/updateEmail` | JWT | — | Zmení e-mailovú adresu používateľa |
| POST | `/updatePassword` | JWT | — | Zmení heslo používateľa (min. 6 znakov) |
| POST | `/updateOptedOut` | JWT | — | Nastaví stav odhlásenia osoby |
| POST | `/sendInviteEmail` | JWT | People.Edit | Pošle osobe v tejto cirkvi e-mailové pozvánky (`email`, `personName`, `contextName`). Tlačidlo má text **Sign Up** pre osobu bez účtu a **Log In** pre existujúceho používateľa. Používateľ, ktorý sa ešte nikdy neprihlásil, dostane namiesto toho odkaz **Set Your Password** platný 7 dní. Ide o pevnú šablónu, preto sa nezapočítava do denného limitu e-mailov cirkvi |
| GET | `/search?term=` | JWT | Server.Admin | Vyhľadá všetkých používateľov podľa mena/e-mailu |
| DELETE | `/` | JWT | — | Vymaže účet aktuálneho používateľa |

## Cirkvi

Základná cesta: `/membership/churches`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Načíta všetky cirkvi aktuálneho používateľa |
| GET | `/:id` | JWT | — | Získa cirkev podľa ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Získa správcu domény pre cirkev |
| GET | `/:id/impersonate` | JWT | Server.Admin | Prevtelenie sa za cirkev (iba správca servera) |
| GET | `/all?term=` | JWT | Server.Admin | Vyhľadá všetky cirkvi (správca) |
| GET | `/search/?name=` | Verejný | — | Vyhľadá cirkvi podľa názvu |
| GET | `/lookup/?subDomain=&id=` | Verejný | — | Vyhľadá cirkev podľa subdomény alebo ID |
| POST | `/` | JWT | Settings.Edit | Aktualizuje údaje o cirkvi |
| POST | `/add` | JWT | — | Zaregistruje novú cirkev. Povinné polia: name, address1, city, state, zip, country |
| POST | `/search` | Verejný | — | Vyhľadá cirkvi podľa názvu (variant POST) |
| POST | `/select` | JWT | — | Vyberie/prepne na cirkev. Telo požiadavky: `{ churchId }` alebo `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archivuje alebo obnoví cirkev z archívu |
| POST | `/byIds` | Verejný | — | Načíta viacero cirkví podľa ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Vymaže cirkvi neaktívne 7 a viac dní |

## Skupiny

Základná cesta: `/membership/groups`

Rozširuje štandardné CRUD (GET `/`, GET `/:id` zo základnej triedy).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Zobrazí všetky skupiny |
| GET | `/:id` | JWT | — | Získa skupinu podľa ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Vyhľadá skupiny podľa filtrov bohoslužieb |
| GET | `/my` | JWT | — | Získa skupiny aktuálneho používateľa |
| GET | `/my/:tag` | JWT | — | Získa skupiny aktuálneho používateľa filtrované podľa štítka |
| GET | `/tag/:tag` | JWT | — | Získa všetky skupiny s konkrétnym štítkom |
| GET | `/public/:churchId/:id` | Verejný | — | Získa verejnú skupinu podľa cirkvi a ID |
| GET | `/public/:churchId/tag/:tag` | Verejný | — | Získa verejné skupiny podľa štítka |
| GET | `/public/:churchId/label?label=` | Verejný | — | Získa verejné skupiny podľa označenia |
| GET | `/public/:churchId/slug/:slug` | Verejný | — | Získa verejnú skupinu podľa slugu |
| POST | `/` | JWT | Groups.Edit | Vytvorí alebo aktualizuje skupiny (slug sa generuje automaticky) |
| DELETE | `/:id` | JWT | Groups.Edit | Vymaže skupinu (pri skupinách služby vymaže aj podriadené tímy) |

## Členovia skupín

Základná cesta: `/membership/groupmembers`

Rozširuje štandardné CRUD (GET `/:id`, DELETE `/:id` zo základnej triedy).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/:id` | JWT | GroupMembers.View | Získa člena skupiny podľa ID |
| GET | `/` | JWT | GroupMembers.View* | Zobrazí členov skupín. Filtrovanie cez `?groupId=`, `?groupIds=` alebo `?personId=`. *Povolené aj vtedy, ak je používateľ členom skupiny alebo dotazuje vlastný personId, a pre `?groupId=` ktorejkoľvek nedôvernej skupiny, keď má používateľ Attendance.View alebo Attendance.Edit (pre nich sa zahrnú členovia mladší ako 13 rokov) |
| GET | `/my` | JWT | — | Získa členstvá aktuálneho používateľa v skupinách |
| GET | `/basic/:groupId` | JWT | — | Získa základný zoznam členov skupiny |
| GET | `/public/leaders/:churchId/:groupId` | Verejný | — | Získa vedúcich skupiny (verejné) |
| GET | `/public/:churchId/:groupId` | Verejný | — | Získa verejný zoznam skupiny (minimálne polia: `personId`, `displayName`, `leader`, fotografia). Iba ak skupina povolí `publicRoster`; využíva ho prvok `staffGrid` tvorcu webových stránok |
| POST | `/` | JWT | GroupMembers.Edit | Pridá alebo aktualizuje členov skupiny |
| DELETE | `/:id` | JWT | GroupMembers.View | Odstráni člena skupiny |

## Domácnosti

Základná cesta: `/membership/households`

Štandardný CRUD kontroler.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Zobrazí všetky domácnosti |
| GET | `/:id` | JWT | — | Získa domácnosť podľa ID |
| POST | `/` | JWT | People.Edit | Vytvorí alebo aktualizuje domácnosti |
| DELETE | `/:id` | JWT | People.Edit | Vymaže domácnosť |

## Roly

Základná cesta: `/membership/roles`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/:id` | JWT | Roles.View | Získa rolu podľa ID |
| GET | `/church/:churchId` | JWT | Roles.View | Získa všetky roly cirkvi. Každá rola obsahuje `memberCount`, počet rôznych používateľov v nej |
| POST | `/` | JWT | Roles.Edit | Vytvorí alebo aktualizuje roly |
| DELETE | `/:id` | JWT | Roles.Edit | Vymaže rolu (odstráni aj jej oprávnenia a členov) |

## Členovia rolí

Základná cesta: `/membership/rolemembers`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/roles/:id` | JWT | Roles.View | Získa členov roly. Pridaním `?include=users` sa zahrnú údaje o používateľoch |
| POST | `/` | JWT | Roles.Edit | Pridá členov do roly (ak e-mail neexistuje, vytvorí používateľa) |
| DELETE | `/:id` | JWT | Roles.View | Odstráni člena roly |
| DELETE | `/self/:churchId/:userId` | JWT | — | Odstráni seba z cirkvi |

## Oprávnenia rolí

Základná cesta: `/membership/rolepermissions`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/roles/:id` | JWT | Roles.View | Získa oprávnenia roly (ako ID použite `null` pre rolu „Everyone“) |
| POST | `/` | JWT | Roles.Edit | Vytvorí alebo aktualizuje oprávnenia roly |
| DELETE | `/:id` | JWT | Roles.Edit | Vymaže oprávnenie roly |

## Oprávnenia

Základná cesta: `/membership/permissions`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Získa úplný zoznam dostupných oprávnení |

Každá položka obsahuje `apiName`, `section` (typ obsahu), `action` a označenia `displaySection` / `displayAction`, ktoré zobrazuje editor rolí v B1Admin. Nedávno pridané položky: `MembershipApi` / `People` / `View Names` (**View People Names Only**, v sekcii People and Groups) a `GivingApi` / `Donations` / `Enter` (**Enter Donations**, v sekcii Donations; pozri [Dávky darov](./giving.md#donation-batches)).

## Formuláre

Základná cesta: `/membership/forms`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | Forms.Admin alebo Forms.Edit | Zobrazí všetky formuláre (správca vidí všetko; editori vidia priradené a formuláre mimo členov) |
| GET | `/:id` | JWT | Prístup k formuláru | Získa formulár podľa ID |
| GET | `/archived` | JWT | Forms.Admin alebo Forms.Edit | Zobrazí archivované formuláre |
| GET | `/group/:groupId` | JWT | Člen skupiny, vedúci skupiny alebo Forms.Admin | Samostatné formuláre prepojené so skupinou (`forms.groupId`), bez archivovaných, zoradené podľa názvu. Vráti `id`, `name`, `description` a `open` (v rámci obdobia dostupnosti). Členovia dostanú iba otvorené formuláre; vedúci a správcovia formulárov dostanú aj uzavreté. Slúži na prepojené formuláre na stránke skupiny |
| GET | `/standalone/:id?churchId=` | JWT | — | Získa samostatný formulár (obmedzené formuláre vyžadujú autentifikáciu) |
| POST | `/` | JWT | Forms.Admin alebo Forms.Edit | Vytvorí alebo aktualizuje formuláre. Samostatné formuláre prijímajú voliteľné `photoUrl` (hlavičková fotografia zobrazená nad formulárom) a `groupId` (prepojená skupina) |
| DELETE | `/:id` | JWT | Prístup k formuláru | Vymaže formulár |

## Odoslania formulárov

Základná cesta: `/membership/formsubmissions`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | Forms.Admin alebo Forms.Edit | Zobrazí odoslania. Filtrovanie cez `?personId=` alebo `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Iba pre vlastné dáta: až 50 odoslaní samostatných formulárov (nie osobných formulárov), ktoré prihlásený člen odoslal alebo ktoré sú prepojené s jeho osobou (`contentType` `person`, `contentId` = ID jeho osoby – napríklad po zmene osoby administrátorom), od najnovších, pričom každé obsahuje `form.name`. `include` pridá otázky formulára a odpovede na odoslanie. Ak používateľ nie je prepojený s osobou, vráti `401`. Slúži sekcii **My Forms** na stránke B1 Me |
| GET | `/group/:groupId` | JWT | Vedúci skupiny | Odpovede pre vedúcich skupiny: jeden záznam na každý prepojený formulár a na každú udalosť skupiny s registračným formulárom, každý obsahuje `form`, `event` (`id`, `title`, `start`; len položky udalostí), `questions` a `submissions` (s `answers` a `personName`, `null` pri anonymných odoslaniach) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit alebo prístup na zobrazenie | Získa odoslanie podľa ID. Pridaním `?include=form,questions,answers` sa zahrnú ďalšie údaje. Vedúci prepojenej skupiny formulára a vedúci skupiny, ku ktorej patrí registrácia na udalosť, si ho môžu tiež prečítať |
| GET | `/formId/:formId` | JWT | Prístup k formuláru (zobrazenie) | Získa všetky odoslania formulára (zahŕňa form, questions, answers). Vedúci prepojenej skupiny formulára majú prístup na zobrazenie |
| POST | `/` | JWT | — | Odošle odpovede formulára (spracuje obmedzené aj neobmedzené formuláre, posiela e-mailové upozornenia). Ak formulár má `autoCreatePerson`, nájde alebo vytvorí osobu typu Guest podľa e-mailu a prepojí odoslanie; ak formulár má aj `groupId`, pridá túto osobu do skupiny; ak sú nastavené `followUpSubject`/`followUpBody`, odosielateľovi pošle e-mail s následnou správou podľa šablóny. Pokiaľ volajúci nemôže spravovať formulár, `submittedBy` je vždy nastavené na osobu prihláseného člena (alebo zostane prázdne pri anonymných odoslaniach) |
| DELETE | `/:id` | JWT | Forms.Admin alebo Forms.Edit | Vymaže odoslanie a jeho odpovede |

## Otázky

Základná cesta: `/membership/questions`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | Prístup k formuláru | Zobrazí otázky formulára. Vyžaduje `?formId=` |
| GET | `/:id` | JWT | Prístup k formuláru | Získa otázku podľa ID |
| GET | `/unrestricted?formId=` | JWT | — | Získa otázky neobmedzeného formulára |
| GET | `/sort/:id/up` | JWT | — | Posunie otázku vyššie v poradí |
| GET | `/sort/:id/down` | JWT | — | Posunie otázku nižšie v poradí |
| POST | `/` | JWT | Prístup k formuláru | Vytvorí alebo aktualizuje otázky (poradie sa priraďuje automaticky) |
| DELETE | `/:id?formId=` | JWT | Prístup k formuláru | Vymaže otázku |

## Odpovede

Základná cesta: `/membership/answers`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | Forms.Admin alebo Forms.Edit | Zobrazí odpovede. Filtrovanie cez `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin alebo Forms.Edit | Vytvorí alebo aktualizuje odpovede |

## Oprávnenia členov

Základná cesta: `/membership/memberpermissions`

Riadi prístup jednotlivých členov ku konkrétnym formulárom.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/:id` | JWT | Prístup k formuláru | Získa oprávnenie člena podľa ID |
| GET | `/member/:id` | JWT | Prístup k formuláru | Získa všetky oprávnenia k formulárom pre člena |
| GET | `/form/:id` | JWT | Prístup k formuláru | Získa všetky oprávnenia členov pre formulár |
| GET | `/form/:id/my` | JWT | Prístup k formuláru | Získa oprávnenie aktuálneho používateľa pre formulár |
| POST | `/` | JWT | Prístup k formuláru | Vytvorí alebo aktualizuje oprávnenia členov |
| DELETE | `/:id?formId=` | JWT | Prístup k formuláru | Vymaže oprávnenie člena |
| DELETE | `/member/:id?formId=` | JWT | Prístup k formuláru | Vymaže všetky oprávnenia člena k formuláru |

## Nastavenia

Základná cesta: `/membership/settings`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | Settings.Edit | Získa všetky nastavenia cirkvi |
| GET | `/public/:churchId` | Verejný | — | Získa verejné nastavenia cirkvi |
| POST | `/` | JWT | Settings.Edit | Uloží nastavenia (podporuje nahrávanie obrázkov ako base64) |

## Domény

Základná cesta: `/membership/domains`

Rozširuje štandardné CRUD (GET `/:id`, GET `/`, DELETE `/:id` zo základnej triedy).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Zobrazí všetky domény |
| GET | `/:id` | JWT | — | Získa doménu podľa ID |
| GET | `/lookup/:domainName` | JWT | — | Vyhľadá doménu podľa názvu |
| GET | `/public/lookup/:domainName` | Verejný | — | Verejné vyhľadanie domény podľa názvu |
| GET | `/health/check` | Verejný | — | Spustí kontrolu stavu neoverených domén |
| POST | `/` | JWT | Settings.Edit | Vytvorí alebo aktualizuje domény (spustí aktualizáciu Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Vymaže doménu |

## Používateľ a cirkev

Základná cesta: `/membership/userchurch`

Spravuje väzbu medzi používateľmi a cirkvami.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/userid/:userId` | JWT | — | Získa záznam používateľa a cirkvi podľa ID používateľa |
| GET | `/personid/:personId` | JWT | — | Získa e-mail prepojeného používateľa osoby |
| GET | `/user/:userId` | JWT | Server.Admin | Načíta všetky cirkvi používateľa |
| POST | `/` | JWT | — | Vytvorí väzbu používateľa a cirkvi |
| PATCH | `/:userId` | JWT | — | Aktualizuje čas posledného prístupu a zaznamená prístup |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Vymaže záznam používateľa a cirkvi |

## Predvoľby viditeľnosti

Základná cesta: `/membership/visibilityPreferences`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/my` | JWT | — | Získa predvoľby viditeľnosti aktuálneho používateľa |
| POST | `/` | JWT | — | Uloží predvoľby viditeľnosti (viditeľnosť adresy, telefónu, e-mailu) |

## Dopyt

Základná cesta: `/membership/query`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| POST | `/members` | JWT | — | Vyhľadávanie členov prirodzeným jazykom pomocou AI. Telo požiadavky: `{ text, subDomain, siteUrl }` |

## Chyby klienta

Základná cesta: `/membership/clientErrors`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| POST | `/` | JWT | — | Zaznamená chybu na strane klienta |

## Súvisiace stránky

- [Autentifikácia a oprávnenia](./authentication) — Prihlasovací tok, JWT, OAuth, model oprávnení
- [Koncové body dochádzky](./attendance) — Sledovanie bohoslužieb a návštev
- [Štruktúra modulu](../module-structure) — Vzory organizácie kódu
