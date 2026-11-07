---
title: "Endpoint-uri Doing"
---

# Endpoint-uri Doing

<div class="article-intro">

Modulul Doing gestionează planificarea serviciilor, programarea voluntarilor, gestionarea sarcinilor și automatizările. Oferă instrumente pentru crearea planurilor de serviciu cu ore și poziții, atribuirea voluntarilor, gestionarea datelor de indisponibilitate, construirea elementelor din ordinea serviciului, conectarea la furnizori externi de conținut și configurarea fluxurilor automate de lucru cu condiții și acțiuni.

</div>

**Cale de bază:** `/doing`

## Planuri

Cale de bază: `/doing/plans`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listează toate planurile bisericii |
| GET | `/:id` | JWT | — | Obține un plan după ID |
| GET | `/ids?ids=` | JWT | — | Obține mai multe planuri după ID-uri separate prin virgulă |
| GET | `/types/:planTypeId` | JWT | — | Obține planurile după tipul de plan |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + editare minister | Previzualizează rezumatul serviciilor pe care **Trimite mesaje voluntarilor** le va trimite: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` pentru voluntarii atribuiți în interval (o persoană o singură dată, cu omiterea celor care s-au retras și a numerelor lipsă, cu deduplicarea numerelor partajate, limitat la 200) |
| GET | `/presenter` | JWT | — | Obține planurile pentru următoarele 7 zile (vizualizarea prezentatorului) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Editare minister | Fluxurile active de confirmare a atribuirilor de serviciu (`workflowType = "assignmentConfirmation"`) pe care un plan le poate selecta: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Public | — | Obține planul curent pentru un tip de plan |
| GET | `/public/signup/:churchId` | Public | — | Planurile deschise pentru înscriere automată, cele mai apropiate primele, fiecare cu pozițiile sale de înscriere (sortate după `categoryName`, apoi după `name`, plus `filledCount` pentru atribuirile Accepted/Unconfirmed) și orele. Fără nume de voluntari. Când setarea bisericii `volunteerSignupNextOnly` are valoarea `"true"`, se returnează doar primul plan din fiecare tip de plan. Fiecare `plan` include un `signupDeadline` calculat (moment ISO sau `null`): cu `signupDeadlineHours` înainte de cel mai devreme moment de tip `service` al planului (sau de orice moment cu oră, dacă nu există o oră de serviciu; ora 9:00 în fusul orar al bisericii, în ziua `serviceDate`, dacă planul nu are ore) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` pentru pozițiile de înscriere automată ale planului (numele afișate ale persoanelor cu atribuiri Accepted/Unconfirmed). Returnează `[]` dacă opțiunea `showVolunteerNames` a planului nu este activată |
| POST | `/` | JWT | — | Creează sau actualizează planuri (acceptă un obiect unic sau o listă). Setează `confirmationWorkflowId` pentru a include planul într-un flux de confirmare a serviciului sau `null` pentru a-l exclude din cererile viitoare. Trimite `signupDeadlineHours: null` pentru a șterge un termen limită; dacă lipsește câmpul, se păstrează valoarea salvată |
| POST | `/copy/:id` | JWT | Editare minister | Copiază un plan, inclusiv pozițiile, orele, atribuirile și elementele din ordinea serviciului. Corpul cererii include `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") și `copyServiceOrder` (boolean). Fără `targetPlanId` se creează un plan nou, iar `notes`, `signupDeadlineHours`, `showVolunteerNames` și `autoReplaceOnDecline` se preiau din planul sursă, dacă nu sunt furnizate în cerere. Cu `targetPlanId`, copia completează acel plan existent (apelantul trebuie să îl poată edita). Opțiunea **Repetă săptămânal** din B1Admin apelează acest endpoint o dată pe săptămână, de fiecare dată copiind din planul creat în săptămâna precedentă |
| POST | `/textRange` | JWT | `texting.send` + editare minister | Trimite un mesaj tuturor voluntarilor atribuiți într-un interval de date, prin furnizorul de mesaje text al bisericii. Corp: `{ startDate, endDate, ministryId, planTypeId?, message }` (mesajul are până la 1600 de caractere; câmpurile de îmbinare sunt rezolvate pentru fiecare destinatar). Returnează numărătorile din previzualizare, plus `recipientCount`, `successCount`, `failCount` și `error` (`no_provider` sau `insufficient_credits`) când trimiterea se oprește devreme |
| POST | `/:id/issueRequests` | JWT | Editare plan | Emite atribuirile noi, Unconfirmed și încă nenotificate, ale planului prin fluxul său de confirmare: marchează fiecare atribuire ca notificată și pornește câte un card de flux de lucru pentru fiecare. Corp gol; returnează `{ issued }`. Eșuează dacă planul nu este publicat (nu este `prepared`), dacă nu are un `confirmationWorkflowId` activ cu cel puțin un pas sau dacă termenul de răspuns a trecut |
| POST | `/autofill/:id` | JWT | — | Completează automat atribuirile voluntarilor pentru un plan. Corp: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Șterge un plan și toate orele, atribuirile, pozițiile și elementele de plan asociate |

### Exemplu: Copiază un plan

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

## Tipuri de planuri

Cale de bază: `/doing/planTypes`

Extinde clasa de bază CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — fără verificări de permisiuni).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listează toate tipurile de planuri |
| GET | `/:id` | JWT | — | Obține un tip de plan după ID |
| GET | `/ids?ids=` | JWT | — | Obține mai multe tipuri de planuri după ID-uri separate prin virgulă |
| GET | `/ministryId/:ministryId` | JWT | — | Obține tipurile de planuri pentru un minister |
| POST | `/` | JWT | — | Creează sau actualizează tipuri de planuri |
| DELETE | `/:id` | JWT | — | Șterge un tip de plan |

## Elemente de plan

Cale de bază: `/doing/planItems`

Gestionează elementele din ordinea serviciului (antete, secțiuni, cântece etc.), organizate într-o structură de arbore părinte-copil.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obține un element de plan după ID |
| GET | `/ids?ids=` | JWT | — | Obține mai multe elemente de plan după ID-uri separate prin virgulă |
| GET | `/plan/:planId` | JWT | — | Obține toate elementele de plan pentru un plan (returnează structura de arbore) |
| GET | `/presenter/:churchId/:planId` | Public | — | Obține elementele de plan pentru vizualizarea prezentatorului (returnează structura de arbore) |
| POST | `/` | JWT | — | Creează sau actualizează elemente de plan |
| POST | `/sort` | JWT | — | Actualizează ordinea de sortare pentru un element de plan (resortează elementele de același nivel) |
| DELETE | `/:id` | JWT | — | Șterge un element de plan |

## Fluxul planului

Cale de bază: `/doing/planFeed`

Oferă fluxuri de elemente de plan pentru prezentator. Dacă nu există elemente de plan, le completează automat din fluxul locației Lessons.church, folosind `contentId` al planului.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | Obține fluxul planului pentru prezentator (se completează automat din fluxul locației, dacă este gol) |

## Poziții

Cale de bază: `/doing/positions`

Extinde clasa de bază CRUD (GET `/:id`, POST `/`, DELETE `/:id` — fără verificări de permisiuni).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obține o poziție după ID |
| GET | `/ids?ids=` | JWT | — | Obține mai multe poziții după ID-uri separate prin virgulă |
| GET | `/plan/ids?planIds=` | JWT | — | Obține pozițiile pentru mai multe planuri după ID-urile planurilor separate prin virgulă |
| GET | `/plan/:planId` | JWT | — | Obține toate pozițiile unui plan |
| POST | `/` | JWT | — | Creează sau actualizează poziții |
| DELETE | `/:id` | JWT | — | Șterge o poziție |

## Ore

Cale de bază: `/doing/times`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Listează toate orele bisericii |
| GET | `/:id` | JWT | — | Obține o oră după ID |
| GET | `/plans?planIds=` | JWT | — | Obține orele pentru mai multe planuri după ID-urile planurilor separate prin virgulă |
| GET | `/plan/:planId` | JWT | — | Obține toate orele unui plan |
| POST | `/` | JWT | — | Creează sau actualizează ore |
| DELETE | `/:id` | JWT | — | Șterge o oră |

## Atribuiri

Cale de bază: `/doing/assignments`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obține atribuirile utilizatorului curent |
| GET | `/my/upcoming` | JWT | — | Până la 20 de atribuiri ale utilizatorului curent din planuri datate de ieri încolo (planurile în așteptare, adică `prepared`, sunt omise), cele mai apropiate primele: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Alimentează previzualizarea serviciilor de pe pagina de start a membrului |
| GET | `/:id` | JWT | — | Obține o atribuire după ID |
| GET | `/plan/ids?planIds=` | JWT | — | Obține atribuirile pentru mai multe planuri după ID-urile planurilor separate prin virgulă |
| GET | `/plan/:planId` | JWT | — | Obține toate atribuirile unui plan |
| POST | `/` | JWT | — | Creează sau actualizează atribuiri (statusul implicit este "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Acceptă o atribuire (trebuie să fie persoana atribuită) |
| POST | `/decline/:id` | JWT | — | Refuză o atribuire (trebuie să fie persoana atribuită) |
| POST | `/signup` | JWT | — | Înscriere automată pentru o poziție. Corp: `{ positionId }`. Poziția trebuie să permită înscrierea automată și să aibă loc liber; creează o atribuire Accepted. Este respinsă cu "Signup deadline has passed" după ce a trecut termenul limită de înscriere al planului (numărat înapoi de la prima oră de serviciu, ca mai sus) |
| DELETE | `/signup/:id` | JWT | — | Elimină propria înscriere automată. Este respinsă cu "Removal deadline has passed" după termenul limită de înscriere al planului |
| DELETE | `/:id` | JWT | — | Șterge o atribuire |

### Exemplu: Acceptă o atribuire

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

## Date de indisponibilitate

Cale de bază: `/doing/blockoutDates`

Extinde clasa de bază CRUD (GET `/:id`, DELETE `/:id` — fără verificări de permisiuni).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obține o dată de indisponibilitate după ID |
| GET | `/ids?ids=` | JWT | — | Obține mai multe date de indisponibilitate după ID-uri separate prin virgulă |
| GET | `/my` | JWT | — | Obține datele de indisponibilitate ale utilizatorului curent |
| GET | `/upcoming` | JWT | — | Obține toate datele de indisponibilitate viitoare ale bisericii |
| POST | `/` | JWT | — | Creează sau actualizează date de indisponibilitate (dacă nu se furnizează `personId`, se folosește utilizatorul curent) |
| DELETE | `/:id` | JWT | — | Șterge o dată de indisponibilitate |

## Sarcini

Cale de bază: `/doing/tasks`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Obține sarcinile deschise ale utilizatorului curent |
| GET | `/:id` | JWT | — | Obține o sarcină după ID |
| GET | `/:id/contact` | JWT | Poate vedea cardul | Date de contact ale persoanei la care se referă un card de flux de lucru: `{ personId, displayName, mobilePhone, email }`. Permite unui apelant atribuit, fără acces la People, să ajungă la persoană |
| GET | `/closed` | JWT | — | Obține sarcinile închise ale utilizatorului curent |
| GET | `/timeline?taskIds=` | JWT | — | Obține datele de cronologie pentru sarcini, după ID-urile sarcinilor separate prin virgulă |
| GET | `/directoryUpdate/:personId` | JWT | — | Obține sarcina de actualizare a directorului pentru o persoană |
| POST | `/` | JWT | — | Creează sau actualizează sarcini. Adaugă `?type=directoryUpdate` pentru a gestiona sarcinile de actualizare a directorului (încarcă automat fotografiile) |
| POST | `/:id/conversation` | JWT | `tasks.edit` sau persoana atribuită cardului | Atașează conversația de notițe la un card. Corp: `{ conversationId }`. Prima conversație atașată rămâne; apelurile ulterioare returnează cardul neschimbat |
| POST | `/loadForGroups` | JWT | — | Încarcă sarcinile pentru anumite grupuri. Corp: `{ groupIds: [], status: "Open" }` |

## Automatizări

Cale de bază: `/doing/automations`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listează toate automatizările bisericii |
| GET | `/:id` | JWT | — | Obține o automatizare după ID |
| GET | `/check` | Public | — | Declanșează verificarea tuturor automatizărilor |
| POST | `/` | JWT | — | Creează sau actualizează automatizări |
| DELETE | `/:id` | JWT | — | Șterge o automatizare |

## Acțiuni

Cale de bază: `/doing/actions`

Acțiunile definesc ce se întâmplă atunci când este declanșată o automatizare.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obține o acțiune după ID |
| GET | `/automation/:id` | JWT | — | Obține toate acțiunile unei automatizări |
| POST | `/` | JWT | — | Creează sau actualizează acțiuni |
| DELETE | `/:id` | JWT | — | Șterge o acțiune |

## Condiții

Cale de bază: `/doing/conditions`

Condițiile definesc criteriile care declanșează o automatizare.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obține o condiție după ID |
| GET | `/automation/:id` | JWT | — | Obține toate condițiile unei automatizări |
| POST | `/` | JWT | — | Creează sau actualizează condiții |
| DELETE | `/:id` | JWT | — | Șterge o condiție |

## Conjuncții

Cale de bază: `/doing/conjunctions`

Conjuncțiile leagă mai multe condiții dintr-o automatizare (logica ȘI/SAU).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obține o conjuncție după ID |
| GET | `/automation/:id` | JWT | — | Obține toate conjuncțiile unei automatizări |
| POST | `/` | JWT | — | Creează sau actualizează conjuncții |
| DELETE | `/:id` | JWT | — | Șterge o conjuncție |

## Autentificări ale furnizorilor de conținut

Cale de bază: `/doing/contentProviderAuths`

Extinde clasa de bază CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — fără verificări de permisiuni).

Gestionează înregistrările de autentificare OAuth pentru furnizorii externi de conținut (de exemplu, integrările cu software de prezentare).

`accessToken` și `refreshToken` sunt criptate în repaus cu `EncryptionHelper` și decriptate la citire, astfel încât API-ul returnează tot token-urile în clar. Rândurile salvate înainte de criptare conțin text simplu (care nu conține niciodată `|`); acestea sunt returnate așa cum sunt și vor fi criptate la următoarea salvare.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listează toate autentificările furnizorilor de conținut |
| GET | `/:id` | JWT | — | Obține o autentificare a furnizorului de conținut după ID |
| GET | `/ids?ids=` | JWT | — | Obține mai multe autentificări ale furnizorilor de conținut după ID-uri separate prin virgulă |
| GET | `/ministry/:ministryId` | JWT | — | Obține toate autentificările furnizorilor de conținut pentru un minister |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Obține înregistrarea de autentificare pentru un minister și un furnizor specific |
| POST | `/` | JWT | — | Creează sau actualizează autentificări ale furnizorilor de conținut |
| DELETE | `/:id` | JWT | — | Șterge o autentificare a furnizorului de conținut |

## Proxy pentru furnizori

Cale de bază: `/doing/providerProxy`

Redirecționează cererile către furnizorii externi de conținut (de exemplu, ProPresenter, EasyWorship). Reînnoiește automat token-urile atunci când expiră.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Răsfoiește fișierele furnizorului de conținut. Corp: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Obține prezentările de la un furnizor de conținut. Corp: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Obține o listă de redare de la un furnizor de conținut. Corp: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Obține instrucțiunile pentru un element de conținut. Corp: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Obține instrucțiunile extinse pentru un element de conținut. Corp: `{ ministryId, providerId, path }` |

## Pagini conexe

- [Endpoint-uri Membership](./membership) — Persoane, grupuri, roluri și permisiuni
- [Endpoint-uri Attendance](./attendance) — Urmărirea serviciilor și a vizitelor
- [Structura modulului](../module-structure) — Modele de organizare a codului
