---
title: "Punctele finale pentru mesagerie"
---

# Punctele finale pentru mesagerie

<div class="article-intro">

Modulul de mesagerie gestionează conversațiile în timp real, mesajele de chat, notificările push, livrarea SMS/e-mail, conexiunile WebSocket, mesajele private, înregistrarea dispozitivelor și furnizorii de mesaje text. Oferă stratul de comunicare folosit în toate aplicațiile ChurchApps, atât pentru chatul transmisiunilor live, cât și pentru notificările asincrone.

</div>

**Cale de bază:** `/messaging`

## Conversații

Cale de bază: `/messaging/conversations`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Încarcă conversațiile după ID-urile separate prin virgulă, cu primul și ultimul mesaj |
| GET | `/messages/:contentType/:contentId` | JWT | — | Încarcă conversațiile pentru un conținut, cu mesaje paginate (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obține conversațiile de tip postare pentru grupurile utilizatorului curent |
| GET | `/posts/group/:groupId` | JWT | — | Obține conversațiile de tip postare pentru un anumit grup |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Cele mai noi notițe din toate înregistrările, pentru pagina Notițe din B1 Admin. `section` poate fi `people`, `groups`, `events` sau `workflows` (altfel 400); `limit` are valoarea implicită 25 (maximum 100); `before` este cursorul de la pagina anterioară. Fiecare notiță trece în continuare prin regula propriului tip (permisiunea People Edit / permisiunea pentru notițe confidențiale, liderii grupului, vizualizatorii evenimentelor, vizualizatorii cardurilor de flux de lucru), astfel încât apelanții văd doar notițele pe care le-ar putea deschide. Textul notițelor este tăiat la 300 de caractere |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Obține sau creează conversația curentă pentru conținut (decriptează automat contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Încarcă conversațiile după tipul și ID-ul conținutului |
| GET | `/:churchId/:id` | Public | — | Încarcă o singură conversație după ID |
| POST | `/` | JWT | — | Creează sau actualizează conversații (în lot) |
| POST | `/start` | JWT | — | Pornește o conversație nouă cu un comentariu inițial |
| DELETE | `/:churchId/:id` | JWT | — | Șterge o conversație |

### Controlul accesului la notițele persoanelor

Conversațiile cu `contentType: "person"` (fila Notițe de pe fișa unei persoane) sau `contentType: "personConfidential"` (secțiunea Notițe confidențiale) sunt restricționate pe fiecare cale de citire și scriere, inclusiv pe rutele publice de mai sus, care returnează `401` pentru aceste tipuri de conținut. `person` necesită permisiunea MembershipApi **People / Edit**; `personConfidential` necesită **People / View Confidential Notes**. Pentru cheile API cu domeniu limitat, `people:write` acoperă ambele acțiuni (utilizatorul cheii trebuie să aibă în continuare permisiunea rolului de bază).

### Controlul accesului la notițele grupurilor și evenimentelor {#group-and-event-notes-access-control}

Încă două tipuri de conținut pentru notițe sunt restricționate în același mod, pe fiecare cale de citire și scriere (inclusiv pe rutele publice de mai sus), și nu sunt niciodată deschise postării anonime:

- **`groupNote`** (`contentId` = ID-ul grupului) -- feedul **Notițe ale liderilor** de pe un grup. Doar liderii acelui grup (`leaderGroupIds` din JWT) pot citi sau posta. Nicio permisiune de personal nu acordă acces, inclusiv `content.edit` și permisiunile de apartenență la grup.
- **`eventNote`** (`contentId` = ID-ul evenimentului) -- notițele de pe un eveniment din calendar. Personalul cu `content.edit` sau **Calendars / Admin** poate întotdeauna citi și posta. În rest, accesul urmează `notesViewRole` (citire) și `notesPostRole` (postare) ale evenimentului: `staff` (valoarea implicită, folosită când câmpul este `null`) nu permite nimănui altcuiva, `leaders` permite liderilor grupului evenimentului, iar `members` permite membrilor și liderilor grupului evenimentului. Un eveniment fără `groupId` este accesibil doar personalului.

### Controlul accesului la notițele cardurilor de flux de lucru

Conversațiile cu `contentType: "workflowCard"` (notițele de pe un card de flux de lucru, unde `contentId` este ID-ul sarcinii cardului) pot fi citite și scrise doar de cineva care poate deschide acel card: un utilizator cu permisiunea DoingApi **Tasks / View** sau persoana ori grupul căruia îi este atribuit cardul, care l-a creat sau la care se referă. Toți ceilalți primesc `401` pe fiecare cale de citire, inclusiv pe rutele publice de mai sus. Conversația unui card este atașată prin cardul însuși, cu `POST /doing/tasks/:id/conversation` (corpul `{ "conversationId": "..." }`; prima conversație atașată este cea care rămâne). Această operațiune poate fi apelată de editorii cardului și de persoana căreia i-a fost atribuit.

### Exemplu: Pornirea unei conversații

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Mesaje

Cale de bază: `/messaging/messages`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Încarcă toate mesajele unei conversații |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Încarcă toate mesajele unei conversații (recuperare publică pentru chatul live) |
| GET | `/:churchId/:id` | Public | — | Încarcă un singur mesaj după ID |
| POST | `/` | JWT | — | Salvează mesaje (în lot). Trimite actualizări în timp real și declanșează notificări. Actualizarea unui mesaj existent necesită să fii autorul acestuia sau să ai `content.edit`; autorul salvat nu poate fi reatribuit niciodată |
| POST | `/send` | Public | — | Trimite mesaje (în lot, public). Trimite actualizări în timp real prin WebSocket și declanșează notificări |
| POST | `/setCallout` | JWT | — | (vechi) Transmite în timp real un mesaj de evidențiere. Niciun client activ; chatul transmisiunilor live nu mai afișează evidențierile |
| DELETE | `/:churchId/:id` | JWT | — | Șterge un mesaj și transmite în timp real ștergerea. Consultați [Moderarea mesajelor](#message-moderation) |

### Moderarea mesajelor

Ștergerea unui mesaj este permisă pentru:

- autorul mesajului;
- personalul cu `content.edit` (oriunde în biserică);
- **liderii de grup**, pentru conversațiile cu `contentType` `group` sau `groupAnnouncement` al căror `contentId` este un grup pe care îl conduc (`leaderGroupIds` din JWT).

Conversațiile de notițe ale persoanelor (`person` / `personConfidential`) nu sunt moderate niciodată de lideri -- folosesc în schimb permisiunile pentru notițe (`people.edit`, `people.viewConfidentialNotes`).

Liderii pot doar să șteargă, nu și să editeze: rescrierea mesajului altui membru rămâne restricționată la autor și la personalul cu `content.edit`.

### Exemplu: Trimiterea unui mesaj

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## Mesaje private

Cale de bază: `/messaging/privatemessages`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Încarcă toate mesajele private ale utilizatorului curent (include ultimul mesaj din fiecare conversație și le marchează pe toate ca citite) |
| GET | `/existing/:personId` | JWT | — | Găsește o conversație privată existentă cu o anumită persoană |
| GET | `/:id` | JWT | — | Încarcă un mesaj privat după ID (șterge notificarea dacă este adresat utilizatorului curent) |
| POST | `/` | JWT | — | Trimite mesaje private (în lot). Declanșează o notificare push către destinatar |

## Notificări

Cale de bază: `/messaging/notifications`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------|-------------|
| GET | `/unreadCount` | JWT | — | Obține numărul de notificări necitite pentru utilizatorul curent |
| GET | `/my` | JWT | — | Încarcă toate notificările utilizatorului curent (le marchează pe toate ca citite) |
| GET | `/tmpEmail` | Public | — | Declanșează digestul zilnic de notificări prin e-mail (endpoint de depanare/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Încarcă notificările unei anumite persoane |
| GET | `/:churchId/:id` | JWT | — | Încarcă o notificare după ID |
| POST | `/` | JWT | — | Creează sau actualizează notificări (în lot) |
| POST | `/create` | JWT | — | Creează notificări pentru mai mulți oameni. Corp: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marchează toate notificările unei persoane ca citite |
| POST | `/sendTest` | JWT | — | Trimite o notificare push de test. Corp: `{ personId, title }` |
| POST | `/ping` | Public | — | Creează o notificare dintr-un declanșator extern. Corp: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Șterge o notificare |

### Exemplu: Crearea notificărilor

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## Preferințele de notificare

Cale de bază: `/messaging/notificationpreferences`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------|-------------|
| GET | `/categories` | JWT | — | Listează categoriile de notificări cu canalele lor implicite și cele permise |
| GET | `/my` | JWT | — | Încarcă preferințele de notificare ale utilizatorului curent (creează automat valorile implicite dacă nu există) |
| POST | `/` | JWT | — | Salvează preferințele utilizatorului curent. Corp: oricare dintre `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, plus opțional `overrides: [{ categoryKey, channel, optedIn }]` (canalul poate fi `push`, `email`, `in_app` sau `sms`; categoriile blocate sunt ignorate). `allowSms` este acordul membrului pentru mesajele text de reamintire. Corpul vechi, sub formă de listă de rânduri, este încă acceptat |

## Conexiuni

Cale de bază: `/messaging/connections`

Gestionează conexiunile WebSocket/în timp real pentru chat, conversațiile de grup, mesajele private și transmisiunile live. Consultați [Arhitectura în timp real](../../realtime) pentru protocolul complet.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Încarcă toate conexiunile unei conversații |
| POST | `/` | Public | — | Înregistrează conexiuni (în lot). Declanșează o transmitere a prezenței pe conversație. Elementele din corp: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Actualizează numele afișat pentru o conexiune, după ID-ul socket-ului. Corp: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Elimină o conexiune dintr-o conversație. Declanșează o transmitere a prezenței |
| POST | `/tmpSendAlert` | Public | — | Trimite o alertă de notificare către conexiunile unei persoane. Corp: `{ churchId, personId }` |

## Dispozitive

Cale de bază: `/messaging/devices`

Gestionează înregistrarea dispozitivelor pentru notificări push și asocierea conținutului (de exemplu, aplicația Lessons pe ecranele TV).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------|-------------|
| POST | `/enroll` | JWT | — | Înscrie sau actualizează un dispozitiv (înregistrare push pe mobil). Se potrivește după tokenul FCM sau ID-ul dispozitivului |
| POST | `/enrollAnon` | Public | — | Înscrie un dispozitiv anonim și generează un cod de asociere din 4 caractere |
| POST | `/` | Public | — | Salvează dispozitive (în lot) |
| GET | `/pair/:pairingCode` | JWT | — | Asociază un dispozitiv folosind codul său de asociere. `?contentType=&contentId=` opțional, pentru a atribui conținut |
| GET | `/status/:deviceId` | Public | — | Verifică starea asocierii unui dispozitiv |
| GET | `/:churchId` | JWT | — | Încarcă toate dispozitivele unei biserici |
| GET | `/:churchId/person/:personId` | JWT | — | Încarcă toate dispozitivele unei persoane |
| GET | `/:churchId/:id` | JWT | — | Încarcă un dispozitiv după ID |
| DELETE | `/:churchId/:id` | JWT | — | Șterge un dispozitiv |

### Exemplu: Înscrierea unui dispozitiv

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Conținuturile dispozitivelor

Cale de bază: `/messaging/devicecontents`

Gestionează atribuirile de conținut pentru dispozitivele asociate (de exemplu, ce lecție este afișată pe un TV).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Încarcă atribuirile de conținut ale unui dispozitiv |
| POST | `/` | JWT | — | Salvează atribuirile de conținut ale dispozitivelor (în lot) |
| DELETE | `/:id` | JWT | — | Șterge o atribuire de conținut a unui dispozitiv |

## Mesaje text

Cale de bază: `/messaging/texting`

Gestionează furnizorii de mesaje SMS, trimiterea mesajelor text de grup și urmărirea livrării.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------|-------------|
| GET | `/providers` | JWT | — | Încarcă furnizorii de mesaje text ai bisericii (credențialele sunt mascate) |
| GET | `/status` | JWT | — | `{ enabled }` -- dacă biserica are un furnizor de mesaje text activ. Orice utilizator autentificat al bisericii; este folosit pentru a afișa opțiunile **Text** doar când mesajele pot fi trimise |
| GET | `/inboundUrl` | JWT | `texting.send` sau `settings.edit` | `{ url }` -- URL-ul webhook pentru mesajele primite (STOP) al bisericii, de inserat în furnizor |
| POST | `/inbound/:churchId/:token` | Public | — | Webhook pentru mesajele primite de la furnizor. `token` este un HMAC al ID-ului bisericii. Un răspuns care este exact un cuvânt de oprire (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) marchează fiecare persoană potrivită ca `optedOut` și dezactivează `allowSms`. Returnează `{ optedOut: <count> }`; celelalte răspunsuri returnează `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Previzualizează destinatarii unui mesaj text de grup (numărul celor eligibili, al celor dezabonați și al celor fără telefon) |
| GET | `/sent` | JWT | — | Încarcă toate înregistrările mesajelor text trimise ale bisericii |
| GET | `/sent/:id/details` | JWT | — | Încarcă un mesaj text trimis, cu jurnalele de livrare pentru fiecare destinatar |
| POST | `/providers` | JWT | — | Salvează furnizorii de mesaje text (în lot). Criptează credențialele API |
| POST | `/send` | JWT | — | Trimite un SMS tuturor membrilor eligibili ai unui grup. Corp: `{ groupId, message }`. Câmpurile de îmbinare (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) sunt rezolvate pentru fiecare destinatar |
| POST | `/sendPerson` | JWT | — | Trimite un SMS unei singure persoane. Corp: `{ personId, phoneNumber, message }`. Câmpurile de îmbinare sunt rezolvate, iar textul rezolvat este cel care este înregistrat în jurnal |
| DELETE | `/providers/:id` | JWT | — | Șterge un furnizor de mesaje text |

### Exemplu: Trimiterea unui mesaj text de grup

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## Șabloane de e-mail

Cale de bază: `/messaging/emailTemplates`

Gestionează șabloanele reutilizabile de e-mail și trimiterea e-mailurilor pe șablon către grupuri.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Încarcă toate șabloanele de e-mail ale bisericii |
| GET | `/:id` | JWT | — | Încarcă un șablon de e-mail după ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` sau `tasks.admin` | Starea e-mailului de grup al bisericii: `{ approved, paused, remaining, requested }`. Dialogul Send Email din B1Admin și acțiunea de flux **Send email** o folosesc pentru a avertiza când e-mailul nu va fi trimis |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Cere suportului aprobarea bisericii pentru e-mailul de grup (cel mult o dată pe săptămână, per biserică) |
| GET | `/preview/:groupId` | JWT | — | Previzualizează livrarea e-mailului pentru un grup (numărul destinatarilor eligibili, membrii fără e-mail) |
| POST | `/` | JWT | — | Creează sau actualizează șabloane de e-mail (în lot) |
| POST | `/send` | JWT | — | Trimite un e-mail pe șablon tuturor membrilor unui grup. Corp: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Șterge un șablon de e-mail |

### Exemplu: Trimiterea unui e-mail către un grup

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**Câmpuri de îmbinare acceptate:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Adrese IP blocate

Cale de bază: `/messaging/blockedips`

(vechi) Blocarea adreselor IP pentru chatul transmisiunilor live. Clientul B1App nu mai apelează `POST /` -- blocarea adreselor IP a fost eliminată în migrarea către livrarea unificată. Ruta `/clear` este încă apelată de la server la server de către `StreamingServiceController` atunci când serviciile de transmisie sunt salvate.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------|-------------|
| POST | `/` | JWT | — | (vechi) Salvează adresele IP blocate (în lot). Niciun client activ |
| POST | `/clear` | JWT | — | Șterge toate adresele IP blocate pentru anumite servicii. Corp: `[{ serviceId, churchId }]` |

## Jurnalele de livrare

Cale de bază: `/messaging/deliverylogs`

Urmărește starea livrării pentru mesajele trimise (SMS, notificări push, e-mail).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|------|------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Încarcă jurnalele de livrare după tipul și ID-ul conținutului |
| GET | `/person/:personId` | JWT | — | Încarcă jurnalele de livrare ale unei persoane. `?startDate=&endDate=` opțional, pentru filtrare |
| GET | `/recent` | JWT | — | Încarcă jurnalele de livrare recente ale bisericii. `?limit=` opțional (implicit 100) |
| GET | `/:id` | JWT | — | Încarcă un jurnal de livrare după ID |

## Pagini conexe

- [Arhitectura în timp real](../../realtime) -- protocolul WebSocket, abonările la camere și framework-ul de livrare unificată
- [Notificări push pentru web](../../web-push) -- înscrierea și livrarea push în browser
- [Punctele finale pentru membri](./membership) -- persoane, grupuri, roluri și identitatea de bază
- [Punctele finale pentru prezențe](./attendance) -- urmărirea serviciilor și a vizitelor
- [Autentificare și permisiuni](./authentication) -- fluxul de autentificare, JWT, OAuth, modelul de permisiuni
- [Structura modulului](../module-structure) -- modele de organizare a codului
