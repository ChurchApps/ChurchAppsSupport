---
title: "Endpoint Membership"
---

# Endpoint Membership

<div class="article-intro">

Il modulo Membership gestisce persone, chiese, gruppi, nuclei familiari, ruoli, permessi, moduli e impostazioni. È il modulo più grande e fornisce il livello di identità e autorizzazione di base per tutti gli altri moduli.

</div>

**Percorso base:** `/membership`

## Persone

Percorso base: `/membership/people`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | People.View o Member | Elenca tutte le persone della chiesa |
| GET | `/:id` | JWT | People.View o record proprio | Ottiene una persona per ID (include le risposte ai moduli) |
| GET | `/ids?ids=` | JWT | People.View, Member o People.ViewNames | Ottiene più persone tramite ID separati da virgola. I chiamanti con People.ViewNames senza People.View ricevono il modello base, con le persone che hanno rinunciato alla visibilità escluse (tranne il chiamante) |
| GET | `/basic?ids=` | JWT | — | Ottiene le informazioni di base (solo nome) per più persone |
| GET | `/names?ids=` | JWT | Qualsiasi permesso della chiesa | `[{ id, name: { display, first, last }, photo }]`, ordinate per cognome e poi per nome, per gli ID separati da virgola che il chiamante già possiede, così che i ruoli senza People.View (donazioni, presenze) possano mostrare i nomi delle persone. Nessuna ricerca, nessun filtro della rubrica |
| POST | `/names` | JWT | Qualsiasi permesso della chiesa | Uguale a `GET /names`. Corpo: `{ peopleIds }` (oppure `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member o People.ViewNames | Persone aggiunte di recente. I chiamanti con People.ViewNames senza People.View (anche i membri con accesso alla rubrica) ricevono il modello base (`id`, `name.display`, `photo`, `membershipStatus`) con le persone che hanno rinunciato alla visibilità escluse |
| GET | `/guest-register/options?churchId=` | Pubblico | — | Elenco di controllo per la registrazione ospiti tramite QR: restituisce `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, ciascuno con valore `"off"`, `"optional"` o `"required"` (letto dall'impostazione pubblica `guestRegistrationFields`; valori mancanti o non validi ricadono su email/telefono facoltativi e sugli altri campi disattivati). Richiede `enableQRGuestRegistration`, a meno che la richiesta non contenga un token del sito o della chiesa corrispondente; limitato in frequenza (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member o People.ViewNames | Cerca persone per nome o email (fino a 100, ordinate per cognome e poi per nome). I chiamanti con People.ViewNames senza People.View (anche i membri con accesso alla rubrica) ricevono una ricerca per nome che restituisce il modello base; una ricerca per `email` restituisce `[]` |
| GET | `/search/phone?number=` | JWT | People.View o Member | Cerca per numero di telefono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Ottiene le persone di un gruppo specifico |
| GET | `/household/:householdId` | JWT | — | Ottiene tutte le persone di un nucleo familiare |
| GET | `/attendance` | JWT | People.Edit | Carica i partecipanti con filtri (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carica i dati della cronologia per persone e gruppi |
| GET | `/directory/:id` | JWT | — | Ottiene la persona per la vista della rubrica (rispetta le preferenze di visibilità) |
| GET | `/claim/:churchId` | JWT | — | Associa un record di persona all'utente corrente in una chiesa |
| POST | `/` | JWT | People.Edit o EditSelf | Crea o aggiorna persone (in blocco) |
| POST | `/search` | JWT | People.View, Member o People.ViewNames | Cerca persone (variante POST). Corpo: `{ term }` oppure `{ email }`; valgono le stesse regole sui soli nomi di `GET /search` |
| POST | `/advancedSearch` | JWT | People.View o Member | Ricerca con più condizioni (età, birthMonth, membershipStatus, ecc.). Il corpo è un array di condizioni; un corpo vuoto significa nessuna condizione, mentre qualsiasi altro corpo che non sia un array restituisce 400 |
| POST | `/loadOrCreate` | Pubblico | — | Trova o crea una persona tramite email. Corpo: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Pubblico | — | Registrazione ospiti tramite QR. Corpo: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (da 1 a 10 membri; email/phone/maritalStatus si applicano solo al primo membro). I campi disattivati dalla chiesa vengono eliminati; i valori obbligatori mancanti o non validi restituiscono 400. Crea un nuovo nucleo familiare (con il nome del cognome del primo membro) con ogni membro come `membershipStatus: "Visitor"`, condivide `address` tra tutti i membri, salva `comments` come nota sul capofamiglia, aggiunge tutti al gruppo privato `guestRegistrationGroupId` se impostato e, quando `guestRegistrationRecordAttendance` è `"true"`, registra la presenza per gli orari di servizio programmati di quel gruppo la cui finestra di check-in è aperta in questo momento. Restituisce `{ householdId, people: [{ id, name }] }`. Stesse regole di opt-in/token e di limite di frequenza della chiamata options |
| POST | `/household/:householdId` | JWT | People.Edit | Aggiorna le assegnazioni dei membri del nucleo familiare |
| POST | `/public/email` | Pubblico | — | Invia un'email a una persona. Corpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interno | — | Carica le email delle persone tramite ID (da server a server, richiede jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Elimina una persona |

### Esempio: cercare persone

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

### Esempio: creare una persona

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Utenti

Percorso base: `/membership/users`

Per gli endpoint di accesso, registrazione e gestione della password, vedi [Autenticazione e permessi](./authentication).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| POST | `/login` | Pubblico | — | Accesso (email/password, aggiornamento JWT o authGuid) |
| POST | `/register` | Pubblico | — | Registra un nuovo utente |
| POST | `/forgot` | Pubblico | — | Invia l'email di reimpostazione della password |
| POST | `/setPasswordGuid` | Pubblico | — | Imposta la password usando l'authGuid dal link ricevuto via email |
| POST | `/verifyCredentials` | Pubblico | — | Verifica email/password e restituisce le chiese associate |
| POST | `/loadOrCreate` | JWT | — | Trova o crea un utente tramite email/userId |
| POST | `/setDisplayName` | JWT | — | Aggiorna nome e cognome dell'utente |
| POST | `/updateEmail` | JWT | — | Cambia l'indirizzo email dell'utente |
| POST | `/updatePassword` | JWT | — | Cambia la password dell'utente (minimo 6 caratteri) |
| POST | `/updateOptedOut` | JWT | — | Imposta lo stato di rinuncia (opted-out) di una persona |
| POST | `/sendInviteEmail` | JWT | People.Edit | Invia via email un invito a una persona di questa chiesa (`email`, `personName`, `contextName`). Il pulsante riporta **Sign Up** per chi non ha un account e **Log In** per un utente esistente. Un utente che non ha mai effettuato l'accesso riceve invece un link **Set Your Password** che scade dopo 7 giorni. È un modello fisso, quindi non conta nel limite giornaliero di email della chiesa |
| GET | `/search?term=` | JWT | Server.Admin | Cerca tutti gli utenti per nome/email |
| DELETE | `/` | JWT | — | Elimina l'account utente corrente |

## Chiese

Percorso base: `/membership/churches`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | — | Carica tutte le chiese dell'utente corrente |
| GET | `/:id` | JWT | — | Ottiene una chiesa per ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Ottiene l'utente amministratore del dominio per una chiesa |
| GET | `/:id/impersonate` | JWT | Server.Admin | Impersona una chiesa (solo amministratori del server) |
| GET | `/all?term=` | JWT | Server.Admin | Cerca tutte le chiese (amministrazione) |
| GET | `/search/?name=` | Pubblico | — | Cerca chiese per nome |
| GET | `/lookup/?subDomain=&id=` | Pubblico | — | Cerca una chiesa per sottodominio o ID |
| POST | `/` | JWT | Settings.Edit | Aggiorna i dettagli della chiesa |
| POST | `/add` | JWT | — | Registra una nuova chiesa. Campi obbligatori: name, address1, city, state, zip, country |
| POST | `/search` | Pubblico | — | Cerca chiese per nome (variante POST) |
| POST | `/select` | JWT | — | Seleziona/passa a una chiesa. Corpo: `{ churchId }` oppure `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archivia o ripristina una chiesa |
| POST | `/byIds` | Pubblico | — | Carica più chiese tramite ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Elimina le chiese abbandonate da almeno 7 giorni |

## Gruppi

Percorso base: `/membership/groups`

Estende il CRUD standard (GET `/`, GET `/:id` dalla classe base).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i gruppi |
| GET | `/:id` | JWT | — | Ottiene un gruppo per ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Cerca gruppi tramite filtri sui servizi |
| GET | `/my` | JWT | — | Ottiene i gruppi dell'utente corrente |
| GET | `/my/:tag` | JWT | — | Ottiene i gruppi dell'utente corrente filtrati per tag |
| GET | `/tag/:tag` | JWT | — | Ottiene tutti i gruppi con un tag specifico |
| GET | `/public/:churchId/:id` | Pubblico | — | Ottiene un gruppo pubblico tramite chiesa e ID |
| GET | `/public/:churchId/tag/:tag` | Pubblico | — | Ottiene i gruppi pubblici tramite tag |
| GET | `/public/:churchId/label?label=` | Pubblico | — | Ottiene i gruppi pubblici tramite etichetta |
| GET | `/public/:churchId/slug/:slug` | Pubblico | — | Ottiene un gruppo pubblico tramite slug |
| POST | `/` | JWT | Groups.Edit | Crea o aggiorna gruppi (genera automaticamente lo slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Elimina un gruppo (elimina anche i team figli per i gruppi di ministero) |

## Membri del gruppo

Percorso base: `/membership/groupmembers`

Estende il CRUD standard (GET `/:id`, DELETE `/:id` dalla classe base).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Ottiene un membro del gruppo per ID |
| GET | `/` | JWT | GroupMembers.View* | Elenca i membri del gruppo. Filtra con `?groupId=`, `?groupIds=` o `?personId=`. *Consentito anche se l'utente è nel gruppo o richiede il proprio personId, e per `?groupId=` di qualsiasi gruppo non riservato quando l'utente ha Attendance.View o Attendance.Edit (per loro sono inclusi i membri sotto i 13 anni) |
| GET | `/my` | JWT | — | Ottiene le appartenenze ai gruppi dell'utente corrente |
| GET | `/basic/:groupId` | JWT | — | Ottiene l'elenco base dei membri di un gruppo |
| GET | `/public/leaders/:churchId/:groupId` | Pubblico | — | Ottiene i leader del gruppo (pubblico) |
| GET | `/public/:churchId/:groupId` | Pubblico | — | Ottiene l'elenco pubblico di un gruppo (campi minimi: `personId`, `displayName`, `leader`, foto). Solo quando il gruppo abilita `publicRoster`; alimenta l'elemento `staffGrid` del costruttore di siti |
| POST | `/` | JWT | GroupMembers.Edit | Aggiunge o aggiorna membri del gruppo |
| DELETE | `/:id` | JWT | GroupMembers.View | Rimuove un membro del gruppo |

## Nuclei familiari

Percorso base: `/membership/households`

Controller CRUD standard.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i nuclei familiari |
| GET | `/:id` | JWT | — | Ottiene un nucleo familiare per ID |
| POST | `/` | JWT | People.Edit | Crea o aggiorna nuclei familiari |
| DELETE | `/:id` | JWT | People.Edit | Elimina un nucleo familiare |

## Ruoli

Percorso base: `/membership/roles`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | Roles.View | Ottiene un ruolo per ID |
| GET | `/church/:churchId` | JWT | Roles.View | Ottiene tutti i ruoli di una chiesa. Ogni ruolo include `memberCount`, cioè il numero di utenti distinti che ne fanno parte |
| POST | `/` | JWT | Roles.Edit | Crea o aggiorna ruoli |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un ruolo (rimuove anche i suoi permessi e i suoi membri) |

## Membri del ruolo

Percorso base: `/membership/rolemembers`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ottiene i membri di un ruolo. Aggiungi `?include=users` per includere i dettagli degli utenti |
| POST | `/` | JWT | Roles.Edit | Aggiunge membri a un ruolo (crea l'utente se l'email non esiste) |
| DELETE | `/:id` | JWT | Roles.View | Rimuove un membro dal ruolo |
| DELETE | `/self/:churchId/:userId` | JWT | — | Rimuove se stessi da una chiesa |

## Permessi dei ruoli

Percorso base: `/membership/rolepermissions`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ottiene i permessi di un ruolo (usa `null` come ID per il ruolo "Everyone") |
| POST | `/` | JWT | Roles.Edit | Crea o aggiorna i permessi di un ruolo |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un permesso di ruolo |

## Permessi

Percorso base: `/membership/permissions`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | — | Ottiene l'elenco completo dei permessi disponibili |

Ogni voce include `apiName`, `section` (tipo di contenuto), `action` e le etichette `displaySection` / `displayAction` che mostra l'editor dei ruoli di B1Admin. Aggiunte recenti: `MembershipApi` / `People` / `View Names` (**View People Names Only**, nella sezione People and Groups) e `GivingApi` / `Donations` / `Enter` (**Enter Donations**, nella sezione Donations; vedi [Lotti di donazioni](./giving.md#donation-batches)).

## Moduli

Percorso base: `/membership/forms`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca tutti i moduli (l'amministratore vede tutto; gli editor vedono quelli assegnati e i moduli non destinati ai membri) |
| GET | `/:id` | JWT | Accesso al modulo | Ottiene un modulo per ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Elenca i moduli archiviati |
| GET | `/group/:groupId` | JWT | Membro del gruppo, leader del gruppo o Forms.Admin | Moduli autonomi collegati al gruppo (`forms.groupId`), esclusi quelli archiviati, ordinati per nome. Restituisce `id`, `name`, `description` e `open` (all'interno della finestra di disponibilità). I membri ricevono solo i moduli aperti; leader e amministratori dei moduli ricevono anche quelli chiusi. Alimenta i moduli collegati nella pagina del gruppo |
| GET | `/standalone/:id?churchId=` | JWT | — | Ottiene un modulo autonomo (i moduli con accesso limitato richiedono l'autenticazione) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o aggiorna moduli. I moduli autonomi accettano un `photoUrl` facoltativo (foto di intestazione mostrata sopra il modulo) e un `groupId` (gruppo collegato) |
| DELETE | `/:id` | JWT | Accesso al modulo | Elimina un modulo |

## Risposte ai moduli

Percorso base: `/membership/formsubmissions`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca le risposte. Filtra con `?personId=` o `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Limitato a chi chiama: fino a 50 risposte a moduli autonomi (non moduli di persona) inviate dal membro autenticato o collegate alla sua persona (`contentType` `person`, `contentId` = l'ID della sua persona -- per esempio, dopo una modifica da parte di un amministratore), dalla più recente, ciascuna con `form.name`. `include` allega le domande di ogni modulo e le risposte della risposta. Restituisce `401` se l'utente non è collegato a una persona. Alimenta la sezione **My Forms** della pagina B1 Me |
| GET | `/group/:groupId` | JWT | Leader del gruppo | Risposte per i leader del gruppo: una voce per ogni modulo collegato e per ogni evento di gruppo con un modulo di iscrizione, ciascuna con `form`, `event` (`id`, `title`, `start`; solo per le voci evento), `questions` e `submissions` (con `answers` e `personName`, `null` se anonime) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit o accesso di visualizzazione | Ottiene una risposta per ID. Aggiungi `?include=form,questions,answers`. Anche i leader del gruppo collegato al modulo e i leader del gruppo a cui appartiene un'iscrizione all'evento possono leggerla |
| GET | `/formId/:formId` | JWT | Accesso al modulo (visualizzazione) | Ottiene tutte le risposte di un modulo (include form, questions, answers). I leader del gruppo collegato al modulo hanno accesso in visualizzazione |
| POST | `/` | JWT | — | Invia le risposte al modulo (gestisce moduli con e senza accesso limitato, invia notifiche email). Quando il modulo ha `autoCreatePerson`, trova o crea una persona Guest tramite email e collega la risposta; quando il modulo ha anche un `groupId`, aggiunge quella persona al gruppo; quando sono impostati `followUpSubject`/`followUpBody`, invia al mittente un'email di follow-up basata su modello. A meno che chi chiama non possa gestire il modulo, `submittedBy` è sempre impostato sulla persona del membro autenticato (oppure lasciato vuoto per le risposte anonime) |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Elimina una risposta e le sue risposte alle domande |

## Domande

Percorso base: `/membership/questions`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | Accesso al modulo | Elenca le domande di un modulo. Richiede `?formId=` |
| GET | `/:id` | JWT | Accesso al modulo | Ottiene una domanda per ID |
| GET | `/unrestricted?formId=` | JWT | — | Ottiene le domande di un modulo senza accesso limitato |
| GET | `/sort/:id/up` | JWT | — | Sposta una domanda in alto nell'ordine |
| GET | `/sort/:id/down` | JWT | — | Sposta una domanda in basso nell'ordine |
| POST | `/` | JWT | Accesso al modulo | Crea o aggiorna domande (assegna automaticamente l'ordine) |
| DELETE | `/:id?formId=` | JWT | Accesso al modulo | Elimina una domanda |

## Risposte

Percorso base: `/membership/answers`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca le risposte. Filtra con `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o aggiorna risposte |

## Permessi dei membri

Percorso base: `/membership/memberpermissions`

Controlla l'accesso di ciascun membro a moduli specifici.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | Accesso al modulo | Ottiene un permesso di membro per ID |
| GET | `/member/:id` | JWT | Accesso al modulo | Ottiene tutti i permessi sui moduli di un membro |
| GET | `/form/:id` | JWT | Accesso al modulo | Ottiene tutti i permessi dei membri su un modulo |
| GET | `/form/:id/my` | JWT | Accesso al modulo | Ottiene il permesso dell'utente corrente per un modulo |
| POST | `/` | JWT | Accesso al modulo | Crea o aggiorna i permessi dei membri |
| DELETE | `/:id?formId=` | JWT | Accesso al modulo | Elimina un permesso di membro |
| DELETE | `/member/:id?formId=` | JWT | Accesso al modulo | Elimina tutti i permessi di un membro su un modulo |

## Impostazioni

Percorso base: `/membership/settings`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | Settings.Edit | Ottiene tutte le impostazioni della chiesa |
| GET | `/public/:churchId` | Pubblico | — | Ottiene le impostazioni pubbliche di una chiesa |
| POST | `/` | JWT | Settings.Edit | Salva le impostazioni (supporta il caricamento di immagini in base64) |

## Domini

Percorso base: `/membership/domains`

Estende il CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` dalla classe base).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i domini |
| GET | `/:id` | JWT | — | Ottiene un dominio per ID |
| GET | `/lookup/:domainName` | JWT | — | Cerca un dominio per nome |
| GET | `/public/lookup/:domainName` | Pubblico | — | Ricerca pubblica di un dominio per nome |
| GET | `/health/check` | Pubblico | — | Esegue il controllo dello stato sui domini non verificati |
| POST | `/` | JWT | Settings.Edit | Crea o aggiorna domini (attiva l'aggiornamento di Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Elimina un dominio |

## Associazione utente-chiesa

Percorso base: `/membership/userchurch`

Gestisce l'associazione tra utenti e chiese.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/userid/:userId` | JWT | — | Ottiene il record utente-chiesa tramite ID utente |
| GET | `/personid/:personId` | JWT | — | Ottiene l'email dell'utente collegato a una persona |
| GET | `/user/:userId` | JWT | Server.Admin | Carica tutte le chiese di un utente |
| POST | `/` | JWT | — | Crea un'associazione utente-chiesa |
| PATCH | `/:userId` | JWT | — | Aggiorna l'ora dell'ultimo accesso e registra l'accesso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Elimina un record utente-chiesa |

## Preferenze di visibilità

Percorso base: `/membership/visibilityPreferences`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/my` | JWT | — | Ottiene le preferenze di visibilità dell'utente corrente |
| POST | `/` | JWT | — | Salva le preferenze di visibilità (visibilità di indirizzo, telefono, email) |

## Query

Percorso base: `/membership/query`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| POST | `/members` | JWT | — | Ricerca di membri in linguaggio naturale tramite AI. Corpo: `{ text, subDomain, siteUrl }` |

## Errori lato client

Percorso base: `/membership/clientErrors`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| POST | `/` | JWT | — | Registra un errore lato client |

## Pagine correlate

- [Autenticazione e permessi](./authentication) — Flusso di accesso, JWT, OAuth, modello dei permessi
- [Endpoint delle presenze](./attendance) — Tracciamento di servizi e visite
- [Struttura del modulo](../module-structure) — Schemi di organizzazione del codice
