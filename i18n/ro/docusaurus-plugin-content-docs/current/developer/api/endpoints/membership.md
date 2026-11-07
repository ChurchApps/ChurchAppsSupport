---
title: "Endpoint-uri pentru modulul Membership"
description: "Referință de endpoint-uri pentru API-ul de membri ChurchApps: persoane, gospodării, grupuri, roluri, formulare și setări, cu reguli de autentificare și permisiuni."
---

# Endpoint-uri pentru modulul Membership

<div class="article-intro">

Modulul Membership gestionează persoanele, bisericile, grupurile, gospodăriile, rolurile, permisiunile, formularele și setările. Este cel mai mare modul și oferă stratul de bază pentru identitate și autorizare, pe care se sprijină toate celelalte module.

</div>

**Cale de bază:** `/membership`

## Persoane

Cale de bază: `/membership/people`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View sau Member | Listează toate persoanele din biserică |
| GET | `/:id` | JWT | People.View sau propriul profil | Obține o persoană după ID (include trimiterile de formulare) |
| GET | `/ids?ids=` | JWT | People.View, Member sau People.ViewNames | Obține mai multe persoane după ID-urile separate prin virgulă. Apelanții cu People.ViewNames, fără People.View, primesc modelul de bază, iar persoanele care s-au retras sunt excluse (cu excepția apelantului) |
| GET | `/basic?ids=` | JWT | — | Obține informații de bază (doar numele) pentru mai multe persoane |
| GET | `/names?ids=` | JWT | Orice permisiune a bisericii | `[{ id, name: { display, first, last }, photo }]`, sortat după nume de familie, apoi după prenume, pentru ID-urile separate prin virgulă pe care apelantul le are deja. Astfel, rolurile fără People.View (donații, prezență) pot afișa numele persoanelor. Nu include căutare și nici filtrul de director |
| POST | `/names` | JWT | Orice permisiune a bisericii | La fel ca `GET /names`. Corp: `{ peopleIds }` (sau `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member sau People.ViewNames | Persoanele adăugate recent. Apelanții cu People.ViewNames, fără People.View (chiar și membrii cu acces la director), primesc modelul de bază (`id`, `name.display`, `photo`, `membershipStatus`), iar persoanele care s-au retras sunt excluse |
| GET | `/guest-register/options?churchId=` | Public | — | Lista de verificare pentru înscrierea oaspeților prin cod QR: returnează `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, fiecare având valoarea `"off"`, `"optional"` sau `"required"` (citită din setarea publică `guestRegistrationFields`; valorile lipsă sau incorecte revin la e-mail și telefon opționale, iar restul dezactivate). Necesită `enableQRGuestRegistration`, cu excepția cazului în care cererea are un token de site/biserică potrivit; limitată la rată (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member sau People.ViewNames | Caută persoane după nume sau e-mail (până la 100, sortate după nume de familie, apoi după prenume). Apelanții cu People.ViewNames, fără People.View (chiar și membrii cu acces la director), primesc o căutare după nume cu modelul de bază; o căutare după `email` returnează `[]` |
| GET | `/search/phone?number=` | JWT | People.View sau Member | Caută după numărul de telefon |
| GET | `/search/group?groupId=` | JWT | People.View sau Member | Obține persoanele dintr-un anumit grup |
| GET | `/household/:householdId` | JWT | — | Obține toate persoanele dintr-o gospodărie |
| GET | `/attendance` | JWT | People.Edit | Încarcă participanții cu filtre (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Încarcă datele cronologice pentru persoane și grupuri |
| GET | `/directory/:id` | JWT | — | Obține persoana pentru vizualizarea din director (respectă preferințele de vizibilitate) |
| GET | `/claim/:churchId` | JWT | — | Revendică înregistrarea unei persoane pentru utilizatorul curent dintr-o biserică |
| POST | `/` | JWT | People.Edit sau EditSelf | Creează sau actualizează persoane (în lot) |
| POST | `/search` | JWT | People.View, Member sau People.ViewNames | Caută persoane (varianta POST). Corp: `{ term }` sau `{ email }`; aceleași reguli privind doar numele ca la `GET /search` |
| POST | `/advancedSearch` | JWT | People.View sau Member | Căutare cu mai multe condiții (vârstă, birthMonth, membershipStatus etc.). Corpul este un tablou de condiții; un corp gol înseamnă fără condiții, iar orice alt corp care nu este un tablou returnează 400 |
| POST | `/loadOrCreate` | Public | — | Găsește sau creează o persoană după e-mail. Corp: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Public | — | Înscrierea oaspeților prin cod QR. Corp: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 membri; email/phone/maritalStatus se aplică doar primului membru). Câmpurile dezactivate de biserică sunt eliminate; valorile obligatorii lipsă sau nevalide returnează 400. Mai întâi se refolosesc persoanele existente: un membru se potrivește când exact o persoană nevalidată are același prenume (fără diferență între majuscule și minuscule) și același e-mail sau aceleași cifre de telefon (acasă, serviciu sau mobil); un membru fără e-mail sau telefon se potrivește după prenume în cadrul gospodăriei identificate. Persoanele potrivite nu sunt modificate niciodată. Membrii nepotriviți se alătură gospodăriei identificate sau, dacă nu există, unei gospodării noi (denumite după numele de familie al primului membru), cu `membershipStatus: "Visitor"` și adresa comună `address`. Salvează `comments` ca notă la primul membru, adaugă pe toți în grupul privat `guestRegistrationGroupId`, dacă este setat, și, când `guestRegistrationRecordAttendance` este `"true"`, înregistrează prezența la orele programate ale grupului a căror fereastră de check-in este deschisă în acest moment. Returnează `{ householdId, people: [{ id, name }] }`, repetând numele trimise, nu pe cele stocate. Aceleași reguli de opt-in/token și de limitare a ratei ca la apelul de opțiuni |
| POST | `/household/:householdId` | JWT | People.Edit | Actualizează atribuirea membrilor gospodăriei |
| POST | `/public/email` | Public | — | Trimite un e-mail unei persoane. Corp: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Încarcă adresele de e-mail ale persoanelor după ID (comunicare server-la-server, necesită jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Șterge o persoană |

### Exemplu: căutarea persoanelor

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

### Exemplu: crearea unei persoane

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Utilizatori

Cale de bază: `/membership/users`

Consultați [Autentificare și permisiuni](./authentication.md) pentru endpoint-urile de autentificare, înregistrare și gestionare a parolei.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Autentificare (e-mail/parolă, reîmprospătare JWT sau authGuid) |
| POST | `/register` | Public | — | Înregistrează un utilizator nou |
| POST | `/forgot` | Public | — | Trimite e-mailul de resetare a parolei |
| POST | `/setPasswordGuid` | Public | — | Setează parola folosind GUID-ul de autentificare din linkul din e-mail |
| POST | `/verifyCredentials` | Public | — | Verifică e-mailul/parola și returnează bisericile asociate |
| POST | `/loadOrCreate` | JWT | — | Găsește sau creează un utilizator după e-mail/userId |
| POST | `/setDisplayName` | JWT | — | Actualizează prenumele și numele utilizatorului |
| POST | `/updateEmail` | JWT | — | Schimbă adresa de e-mail a utilizatorului |
| POST | `/updatePassword` | JWT | — | Schimbă parola utilizatorului (minimum 6 caractere) |
| POST | `/updateOptedOut` | JWT | — | Setează starea de retragere a unei persoane |
| POST | `/sendInviteEmail` | JWT | People.Edit | Trimite prin e-mail o invitație unei persoane din această biserică (`email`, `personName`, `contextName`). Butonul afișează **Sign Up** pentru o persoană fără cont și **Log In** pentru un utilizator existent. Un utilizator care nu s-a autentificat niciodată primește în schimb un link **Set Your Password**, valabil 7 zile. Este un șablon fix, deci nu se include în limita zilnică de e-mailuri a bisericii |
| GET | `/search?term=` | JWT | Server.Admin | Caută toți utilizatorii după nume/e-mail |
| DELETE | `/` | JWT | — | Șterge contul utilizatorului curent |

## Biserici

Cale de bază: `/membership/churches`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Încarcă toate bisericile utilizatorului curent |
| GET | `/:id` | JWT | — | Obține biserica după ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obține utilizatorul administrator de domeniu pentru o biserică |
| GET | `/:id/impersonate` | JWT | Server.Admin | Preia identitatea unei biserici (doar administratorul serverului) |
| GET | `/all?term=` | JWT | Server.Admin | Caută în toate bisericile (administrare) |
| GET | `/search/?name=` | Public | — | Caută biserici după nume |
| GET | `/lookup/?subDomain=&id=` | Public | — | Caută o biserică după subdomeniu sau ID |
| POST | `/` | JWT | Settings.Edit | Actualizează detaliile bisericii |
| POST | `/add` | JWT | — | Înregistrează o biserică nouă. Câmpuri obligatorii: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Caută biserici după nume (varianta POST) |
| POST | `/select` | JWT | — | Selectează/comută la o biserică. Corp: `{ churchId }` sau `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arhivează sau dezarhivează o biserică |
| POST | `/byIds` | Public | — | Încarcă mai multe biserici după ID-uri |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Șterge bisericile abandonate de cel puțin 7 zile |

## Grupuri

Cale de bază: `/membership/groups`

Extinde operațiile CRUD standard (GET `/`, GET `/:id` din clasa de bază).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listează toate grupurile |
| GET | `/:id` | JWT | — | Obține grupul după ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Caută grupuri după filtrele de serviciu |
| GET | `/my` | JWT | — | Obține grupurile utilizatorului curent |
| GET | `/my/:tag` | JWT | — | Obține grupurile utilizatorului curent filtrate după etichetă |
| GET | `/tag/:tag` | JWT | — | Obține toate grupurile cu o anumită etichetă |
| GET | `/public/:churchId/:id` | Public | — | Obține un grup public după biserică și ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Obține grupurile publice după etichetă |
| GET | `/public/:churchId/label?label=` | Public | — | Obține grupurile publice după etichetă (label) |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obține un grup public după slug |
| POST | `/` | JWT | Groups.Edit | Creează sau actualizează grupuri (generează automat slug-ul) |
| DELETE | `/:id` | JWT | Groups.Edit | Șterge un grup (șterge și echipele copil pentru grupurile de slujire) |

## Membrii grupurilor

Cale de bază: `/membership/groupmembers`

Extinde operațiile CRUD standard (GET `/:id`, DELETE `/:id` din clasa de bază).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Obține membrul grupului după ID |
| GET | `/` | JWT | GroupMembers.View* | Listează membrii grupurilor. Filtrare cu `?groupId=`, `?groupIds=` sau `?personId=`. *Permis și dacă utilizatorul face parte din grup sau interoghează propriul personId, precum și pentru `?groupId=` al oricărui grup needitat în care utilizatorul are Attendance.View sau Attendance.Edit (membrii sub 13 ani sunt incluși pentru aceștia) |
| GET | `/my` | JWT | — | Obține apartenențele la grupuri ale utilizatorului curent |
| GET | `/basic/:groupId` | JWT | — | Obține lista de bază a membrilor unui grup |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Obține liderii grupului (public) |
| GET | `/public/:churchId/:groupId` | Public | — | Obține lista publică a grupului (câmpuri minime: `personId`, `displayName`, `leader`, fotografie). Doar când grupul se înscrie prin `publicRoster`; alimentează elementul `staffGrid` al constructorului de site-uri |
| POST | `/` | JWT | GroupMembers.Edit | Adaugă sau actualizează membrii grupului |
| DELETE | `/:id` | JWT | GroupMembers.View | Elimină un membru din grup |

## Gospodării

Cale de bază: `/membership/households`

Controller CRUD standard.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listează toate gospodăriile |
| GET | `/:id` | JWT | — | Obține gospodăria după ID |
| POST | `/` | JWT | People.Edit | Creează sau actualizează gospodării |
| DELETE | `/:id` | JWT | People.Edit | Șterge o gospodărie |

## Roluri

Cale de bază: `/membership/roles`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Obține rolul după ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obține toate rolurile unei biserici. Fiecare rol include `memberCount`, numărul de utilizatori distincți din rol |
| POST | `/` | JWT | Roles.Edit | Creează sau actualizează roluri |
| DELETE | `/:id` | JWT | Roles.Edit | Șterge un rol (elimină și permisiunile și membrii săi) |

## Membrii rolurilor

Cale de bază: `/membership/rolemembers`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obține membrii unui rol. Adăugați `?include=users` pentru a include detaliile utilizatorilor |
| POST | `/` | JWT | Roles.Edit | Adaugă membri într-un rol (creează utilizatorul dacă e-mailul nu există) |
| DELETE | `/:id` | JWT | Roles.View | Elimină un membru al rolului |
| DELETE | `/self/:churchId/:userId` | JWT | — | Te elimină pe tine din biserică |

## Permisiunile rolurilor

Cale de bază: `/membership/rolepermissions`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obține permisiunile unui rol (folosiți `null` ca ID pentru rolul „Everyone”) |
| POST | `/` | JWT | Roles.Edit | Creează sau actualizează permisiunile rolului |
| DELETE | `/:id` | JWT | Roles.Edit | Șterge o permisiune a rolului |

## Permisiuni

Cale de bază: `/membership/permissions`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Obține lista completă a permisiunilor disponibile |

Fiecare intrare are `apiName`, `section` (tipul de conținut), `action` și etichetele `displaySection` / `displayAction` pe care le afișează editorul de roluri din B1Admin. Adăugiri recente: `MembershipApi` / `People` / `View Names` (**View People Names Only**, sub People and Groups) și `GivingApi` / `Donations` / `Enter` (**Enter Donations**, sub Donations; consultați [Loturile de donații](./giving.md#donation-batches)).

## Formulare

Cale de bază: `/membership/forms`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin sau Forms.Edit | Listează toate formularele (administratorul le vede pe toate; editorii văd formularele atribuite și cele care nu sunt de membru) |
| GET | `/:id` | JWT | Acces la formular | Obține un formular după ID |
| GET | `/archived` | JWT | Forms.Admin sau Forms.Edit | Listează formularele arhivate |
| GET | `/group/:groupId` | JWT | Membru al grupului, liderul grupului sau Forms.Admin | Formulare independente legate de grup (`forms.groupId`), excluzând cele arhivate, sortate după nume. Returnează `id`, `name`, `description` și `open` (în intervalul de disponibilitate). Membrii primesc doar formularele deschise; liderii și administratorii formularelor primesc și pe cele închise. Alimentează formularele legate de pagina grupului |
| GET | `/standalone/:id?churchId=` | JWT | — | Obține un formular independent (formularele restricționate necesită autentificare) |
| POST | `/` | JWT | Forms.Admin sau Forms.Edit | Creează sau actualizează formulare. Formularele independente acceptă opțional `photoUrl` (fotografia din antet, afișată deasupra formularului) și `groupId` (grupul asociat) |
| DELETE | `/:id` | JWT | Acces la formular | Șterge un formular |

## Trimiterile formularelor

Cale de bază: `/membership/formsubmissions`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin sau Forms.Edit | Listează trimiterile. Filtrare cu `?personId=` sau `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Limitat la utilizatorul propriu: până la 50 de trimiteri de formulare independente (nu formulare de persoană) trimise de membrul autentificat sau legate de persoana sa (`contentType` `person`, `contentId` = ID-ul persoanei sale — de exemplu, după o modificare făcută de un administrator), cele mai recente primele, fiecare cu `form.name`. `include` atașează întrebările fiecărui formular și răspunsurile trimiterii. Returnează `401` dacă utilizatorul nu este legat de o persoană. Alimentează secțiunea **My Forms** din pagina B1 Me |
| GET | `/group/:groupId` | JWT | Liderul grupului | Răspunsurile pentru liderii grupului: o intrare pentru fiecare formular legat și pentru fiecare eveniment de grup cu formular de înscriere, fiecare cu `form`, `event` (`id`, `title`, `start`; doar pentru intrările de eveniment), `questions` și `submissions` (cu `answers` și `personName`, `null` dacă este anonim) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit sau acces de vizualizare | Obține trimiterea după ID. Adăugați `?include=form,questions,answers`. Liderii grupului legat de formular și liderii grupului căruia îi aparține o înscriere la eveniment pot, de asemenea, să o citească |
| GET | `/formId/:formId` | JWT | Acces la formular (vizualizare) | Obține toate trimiterile unui formular (include form, questions, answers). Liderii grupului legat de formular au acces de vizualizare |
| POST | `/` | JWT | — | Trimite răspunsurile la formular (gestionează formularele restricționate și nerestricționate, trimite notificări prin e-mail). Când formularul are `autoCreatePerson`, găsește sau creează o persoană de tip Guest după e-mail și leagă trimiterea de aceasta; când formularul are și un `groupId`, adaugă persoana în grup; când sunt setate `followUpSubject`/`followUpBody`, trimite expeditorului un e-mail de urmărire pe bază de șablon. Dacă apelantul nu poate administra formularul, `submittedBy` este întotdeauna setat la persoana membrului autentificat (sau rămâne gol pentru trimiterile anonime) |
| DELETE | `/:id` | JWT | Forms.Admin sau Forms.Edit | Șterge o trimitere și răspunsurile sale |

## Întrebări

Cale de bază: `/membership/questions`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Acces la formular | Listează întrebările unui formular. Necesită `?formId=` |
| GET | `/:id` | JWT | Acces la formular | Obține o întrebare după ID |
| GET | `/unrestricted?formId=` | JWT | — | Obține întrebările unui formular nerestricționat |
| GET | `/sort/:id/up` | JWT | — | Mută o întrebare mai sus în ordinea de sortare |
| GET | `/sort/:id/down` | JWT | — | Mută o întrebare mai jos în ordinea de sortare |
| POST | `/` | JWT | Acces la formular | Creează sau actualizează întrebări (atribuie automat ordinea de sortare) |
| DELETE | `/:id?formId=` | JWT | Acces la formular | Șterge o întrebare |

## Răspunsuri

Cale de bază: `/membership/answers`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin sau Forms.Edit | Listează răspunsurile. Filtrare cu `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin sau Forms.Edit | Creează sau actualizează răspunsuri |

## Permisiunile membrilor

Cale de bază: `/membership/memberpermissions`

Controlează accesul fiecărui membru la anumite formulare.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Acces la formular | Obține o permisiune a membrului după ID |
| GET | `/member/:id` | JWT | Acces la formular | Obține toate permisiunile de formular ale unui membru |
| GET | `/form/:id` | JWT | Acces la formular | Obține toate permisiunile membrilor pentru un formular |
| GET | `/form/:id/my` | JWT | Acces la formular | Obține permisiunea utilizatorului curent pentru un formular |
| POST | `/` | JWT | Acces la formular | Creează sau actualizează permisiunile membrilor |
| DELETE | `/:id?formId=` | JWT | Acces la formular | Șterge o permisiune a membrului |
| DELETE | `/member/:id?formId=` | JWT | Acces la formular | Șterge toate permisiunile unui membru pentru un formular |

## Setări

Cale de bază: `/membership/settings`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Obține toate setările bisericii |
| GET | `/public/:churchId` | Public | — | Obține setările publice ale unei biserici |
| POST | `/` | JWT | Settings.Edit | Salvează setările (acceptă încărcarea imaginilor în base64) |

## Domenii

Cale de bază: `/membership/domains`

Extinde operațiile CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` din clasa de bază).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listează toate domeniile |
| GET | `/:id` | JWT | — | Obține domeniul după ID |
| GET | `/lookup/:domainName` | JWT | — | Caută un domeniu după nume |
| GET | `/public/lookup/:domainName` | Public | — | Căutare publică a domeniului după nume |
| GET | `/health/check` | Public | — | Rulează verificarea de stare pentru domeniile nevalidate |
| POST | `/` | JWT | Settings.Edit | Creează sau actualizează domenii (declanșează actualizarea Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Șterge un domeniu |

## Asocierea utilizator-biserică

Cale de bază: `/membership/userchurch`

Gestionează asocierea dintre utilizatori și biserici.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Obține înregistrarea utilizator-biserică după ID-ul utilizatorului |
| GET | `/personid/:personId` | JWT | — | Obține e-mailul utilizatorului asociat unei persoane |
| GET | `/user/:userId` | JWT | Server.Admin | Încarcă toate bisericile unui utilizator |
| POST | `/` | JWT | — | Creează o asociere utilizator-biserică |
| PATCH | `/:userId` | JWT | — | Actualizează ora ultimului acces și înregistrează accesul |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Șterge o înregistrare utilizator-biserică |

## Preferințe de vizibilitate

Cale de bază: `/membership/visibilityPreferences`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obține preferințele de vizibilitate ale utilizatorului curent |
| POST | `/` | JWT | — | Salvează preferințele de vizibilitate (vizibilitatea adresei, telefonului și e-mailului) |

## Interogare

Cale de bază: `/membership/query`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Căutare de membri în limbaj natural, folosind AI. Corp: `{ text, subDomain, siteUrl }` |

## Erori de client

Cale de bază: `/membership/clientErrors`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Înregistrează o eroare de pe partea clientului |

## Pagini conexe

- [Autentificare și permisiuni](./authentication.md) — Fluxul de autentificare, JWT, OAuth, modelul de permisiuni
- [Endpoint-uri pentru prezență](./attendance.md) — Urmărirea serviciilor și a vizitelor
- [Structura modulelor](../module-structure.md) — Modele de organizare a codului
