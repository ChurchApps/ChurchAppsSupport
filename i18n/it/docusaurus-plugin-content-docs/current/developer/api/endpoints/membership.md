---
title: "Endpoint Membership"
---

# Endpoint Membership

<div class="article-intro">

Il modulo Membership gestisce persone, chiese, gruppi, nuclei familiari, ruoli, permessi, moduli e impostazioni. È il modulo più grande e fornisce il livello fondamentale di identità e autorizzazione per tutti gli altri moduli.

</div>

**Percorso base:** `/membership`

## Persone

Percorso base: `/membership/people`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | People.View o Member | Elenca tutte le persone della chiesa |
| GET | `/:id` | JWT | People.View o record proprio | Ottieni una persona tramite ID (include le risposte ai moduli) |
| GET | `/ids?ids=` | JWT | People.View, Member o People.ViewNames | Ottieni più persone tramite ID separati da virgole. I chiamanti con People.ViewNames senza People.View ricevono il modello base, con le persone che hanno rinunciato alla visibilità escluse (tranne il chiamante stesso) |
| GET | `/basic?ids=` | JWT | — | Ottieni le informazioni di base (solo nome) per più persone |
| GET | `/names?ids=` | JWT | Qualsiasi permesso della chiesa | `[{ id, name: { display, first, last }, photo }]`, ordinati per cognome e poi per nome, per gli ID separati da virgole che il chiamante già possiede, così che i ruoli senza People.View (donazioni, presenze) possano etichettare le persone. Nessuna ricerca, nessun filtro di directory |
| POST | `/names` | JWT | Qualsiasi permesso della chiesa | Uguale a `GET /names`. Body: `{ peopleIds }` (oppure `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member o People.ViewNames | Persone aggiunte di recente. I chiamanti con People.ViewNames senza People.View (anche i membri con accesso alla directory) ricevono il modello base (`id`, `name.display`, `photo`, `membershipStatus`) con le persone che hanno rinunciato alla visibilità escluse |
| GET | `/guest-register/options?churchId=` | Public | — | Checklist di iscrizione ospiti tramite QR: restituisce `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, ciascuno con valore `"off"`, `"optional"` o `"required"` (letto dall'impostazione pubblica `guestRegistrationFields`; valori mancanti o malformati ricadono su email/telefono facoltativi e sugli altri disattivati). Richiede `enableQRGuestRegistration`, a meno che la richiesta non porti un token corrispondente di sito/chiesa; con limite di frequenza (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member o People.ViewNames | Cerca persone per nome o email (fino a 100, ordinate per cognome e poi per nome). I chiamanti con People.ViewNames senza People.View (anche i membri con accesso alla directory) ottengono una ricerca per nome che restituisce il modello base; una ricerca per `email` restituisce `[]` |
| GET | `/search/phone?number=` | JWT | People.View o Member | Cerca per numero di telefono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Ottieni le persone di uno specifico gruppo |
| GET | `/household/:householdId` | JWT | — | Ottieni tutte le persone di un nucleo familiare |
| GET | `/attendance` | JWT | People.Edit | Carica i partecipanti con filtri (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carica i dati della timeline per persone e gruppi |
| GET | `/directory/:id` | JWT | — | Ottieni la persona per la vista directory (rispetta le preferenze di visibilità) |
| GET | `/claim/:churchId` | JWT | — | Rivendica il record di una persona per l'utente corrente in una chiesa |
| POST | `/` | JWT | People.Edit o EditSelf | Crea o aggiorna persone (lotto) |
| POST | `/search` | JWT | People.View, Member o People.ViewNames | Cerca persone (variante POST). Body: `{ term }` oppure `{ email }`; stesse regole di sola visualizzazione dei nomi di `GET /search` |
| POST | `/advancedSearch` | JWT | People.View o Member | Ricerca con più condizioni (età, birthMonth, membershipStatus, ecc.). Il body è un array di condizioni; un body vuoto significa nessuna condizione, e qualsiasi altro body che non sia un array restituisce 400 |
| POST | `/loadOrCreate` | Public | — | Trova o crea una persona tramite email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Public | — | Iscrizione ospiti tramite QR. Body: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (da 1 a 10 membri; email/phone/maritalStatus si applicano solo al primo membro). I campi disattivati dalla chiesa vengono scartati; i campi obbligatori mancanti o i valori non validi restituiscono 400. Prima riutilizza le persone esistenti: un membro corrisponde quando esattamente una persona non rimossa ha lo stesso nome (senza distinzione tra maiuscole e minuscole) e la stessa email o le stesse cifre del telefono (casa, lavoro o cellulare); un membro senza email o telefono corrisponde per nome all'interno del nucleo familiare corrispondente. Le persone corrispondenti non vengono mai modificate. I membri non corrispondenti entrano nel nucleo familiare corrispondente, oppure in un nuovo nucleo familiare (denominato con il cognome del primo membro), come `membershipStatus: "Visitor"` con l'`address` condiviso. Salva `comments` come nota sul primo membro, aggiunge tutti al gruppo privato `guestRegistrationGroupId` se impostato e — quando `guestRegistrationRecordAttendance` è `"true"` — registra le presenze per gli orari di servizio programmati di quel gruppo la cui finestra di check-in è aperta in questo momento. Restituisce `{ householdId, people: [{ id, name }] }`, ripetendo i nomi inviati anziché quelli memorizzati. Stesse regole di opt-in/token e di limite di frequenza della chiamata options |
| POST | `/household/:householdId` | JWT | People.Edit | Aggiorna le assegnazioni dei membri del nucleo familiare |
| POST | `/public/email` | Public | — | Invia un'email a una persona. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Carica le email delle persone tramite ID (da server a server, richiede jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Elimina una persona |

### Esempio: cerca persone

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

### Esempio: crea una persona

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Utenti

Percorso base: `/membership/users`

Per gli endpoint di login, registrazione e gestione della password, vedi [Autenticazione e permessi](./authentication).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| POST | `/login` | Public | — | Accedi (email/password, aggiornamento JWT o authGuid) |
| POST | `/register` | Public | — | Registra un nuovo utente |
| POST | `/forgot` | Public | — | Invia l'email di reimpostazione della password |
| POST | `/setPasswordGuid` | Public | — | Imposta la password usando il GUID di autenticazione dal link dell'email |
| POST | `/verifyCredentials` | Public | — | Verifica email/password e restituisce le chiese associate |
| POST | `/loadOrCreate` | JWT | — | Trova o crea un utente tramite email/userId |
| POST | `/setDisplayName` | JWT | — | Aggiorna il nome e il cognome dell'utente |
| POST | `/updateEmail` | JWT | — | Cambia l'indirizzo email dell'utente |
| POST | `/updatePassword` | JWT | — | Cambia la password dell'utente (minimo 6 caratteri) |
| POST | `/updateOptedOut` | JWT | — | Imposta lo stato di rinuncia alla visibilità di una persona |
| POST | `/sendInviteEmail` | JWT | People.Edit | Invia via email un invito a una persona di questa chiesa (`email`, `personName`, `contextName`). Il pulsante riporta **Sign Up** per chi non ha un account e **Log In** per un utente esistente. Un utente che non ha mai effettuato l'accesso riceve invece un link **Set Your Password** che scade dopo 7 giorni. È un modello fisso, quindi non viene conteggiato nel limite giornaliero di email della chiesa |
| GET | `/search?term=` | JWT | Server.Admin | Cerca tutti gli utenti per nome/email |
| DELETE | `/` | JWT | — | Elimina l'account utente corrente |

## Chiese

Percorso base: `/membership/churches`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Carica tutte le chiese dell'utente corrente |
| GET | `/:id` | JWT | — | Ottieni una chiesa tramite ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Ottieni l'utente amministratore di dominio di una chiesa |
| GET | `/:id/impersonate` | JWT | Server.Admin | Impersona una chiesa (solo amministratori del server) |
| GET | `/all?term=` | JWT | Server.Admin | Cerca tutte le chiese (amministrazione) |
| GET | `/search/?name=` | Public | — | Cerca chiese per nome |
| GET | `/lookup/?subDomain=&id=` | Public | — | Cerca una chiesa per sottodominio o ID |
| POST | `/` | JWT | Settings.Edit | Aggiorna i dettagli della chiesa |
| POST | `/add` | JWT | — | Registra una nuova chiesa. Campi obbligatori: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Cerca chiese per nome (variante POST) |
| POST | `/select` | JWT | — | Seleziona/passa a una chiesa. Body: `{ churchId }` oppure `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archivia o ripristina una chiesa |
| POST | `/byIds` | Public | — | Carica più chiese tramite ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Elimina le chiese abbandonate da 7 o più giorni |

## Gruppi

Percorso base: `/membership/groups`

Estende il CRUD standard (GET `/`, GET `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i gruppi |
| GET | `/:id` | JWT | — | Ottieni un gruppo tramite ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Cerca gruppi con filtri sui servizi |
| GET | `/my` | JWT | — | Ottieni i gruppi dell'utente corrente |
| GET | `/my/:tag` | JWT | — | Ottieni i gruppi dell'utente corrente filtrati per tag |
| GET | `/tag/:tag` | JWT | — | Ottieni tutti i gruppi con un tag specifico |
| GET | `/public/:churchId/:id` | Public | — | Ottieni un gruppo pubblico tramite chiesa e ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Ottieni i gruppi pubblici per tag |
| GET | `/public/:churchId/label?label=` | Public | — | Ottieni i gruppi pubblici per etichetta |
| GET | `/public/:churchId/slug/:slug` | Public | — | Ottieni un gruppo pubblico tramite slug |
| POST | `/` | JWT | Groups.Edit | Crea o aggiorna gruppi (genera automaticamente lo slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Elimina un gruppo (elimina anche i team figli per i gruppi di ministero) |

## Membri del gruppo

Percorso base: `/membership/groupmembers`

Estende il CRUD standard (GET `/:id`, DELETE `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Ottieni un membro del gruppo tramite ID |
| GET | `/` | JWT | GroupMembers.View* | Elenca i membri del gruppo. Filtra con `?groupId=`, `?groupIds=` o `?personId=`. *Consentito anche se l'utente è nel gruppo o richiede il proprio personId, e per `?groupId=` di qualsiasi gruppo non riservato quando l'utente ha Attendance.View o Attendance.Edit (per loro sono inclusi anche i membri sotto i 13 anni) |
| GET | `/my` | JWT | — | Ottieni le appartenenze ai gruppi dell'utente corrente |
| GET | `/basic/:groupId` | JWT | — | Ottieni l'elenco base dei membri di un gruppo |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Ottieni i leader di un gruppo (pubblico) |
| GET | `/public/:churchId/:groupId` | Public | — | Ottieni l'elenco pubblico di un gruppo (campi minimi: `personId`, `displayName`, `leader`, foto). Solo quando il gruppo attiva `publicRoster`; alimenta l'elemento `staffGrid` del website builder |
| POST | `/` | JWT | GroupMembers.Edit | Aggiungi o aggiorna membri del gruppo |
| DELETE | `/:id` | JWT | GroupMembers.View | Rimuovi un membro del gruppo |

## Nuclei familiari

Percorso base: `/membership/households`

Controller CRUD standard.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i nuclei familiari |
| GET | `/:id` | JWT | — | Ottieni un nucleo familiare tramite ID |
| POST | `/` | JWT | People.Edit | Crea o aggiorna nuclei familiari |
| DELETE | `/:id` | JWT | People.Edit | Elimina un nucleo familiare |

## Ruoli

Percorso base: `/membership/roles`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | Roles.View | Ottieni un ruolo tramite ID |
| GET | `/church/:churchId` | JWT | Roles.View | Ottieni tutti i ruoli di una chiesa. Ogni ruolo include `memberCount`, il numero di utenti distinti che ne fanno parte |
| POST | `/` | JWT | Roles.Edit | Crea o aggiorna ruoli |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un ruolo (rimuove anche i suoi permessi e membri) |

## Membri del ruolo

Percorso base: `/membership/rolemembers`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ottieni i membri di un ruolo. Aggiungi `?include=users` per includere i dettagli degli utenti |
| POST | `/` | JWT | Roles.Edit | Aggiungi membri a un ruolo (crea l'utente se l'email non esiste) |
| DELETE | `/:id` | JWT | Roles.View | Rimuovi un membro del ruolo |
| DELETE | `/self/:churchId/:userId` | JWT | — | Rimuoviti da una chiesa |

## Permessi dei ruoli

Percorso base: `/membership/rolepermissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ottieni i permessi di un ruolo (usa `null` come ID per il ruolo "Everyone") |
| POST | `/` | JWT | Roles.Edit | Crea o aggiorna i permessi di un ruolo |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un permesso di ruolo |

## Permessi

Percorso base: `/membership/permissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Ottieni l'elenco completo dei permessi disponibili |

Ogni voce ha `apiName`, `section` (tipo di contenuto), `action` e le etichette `displaySection` / `displayAction` che mostra l'editor dei ruoli di B1Admin. Aggiunte recenti: `MembershipApi` / `People` / `View Names` (**Visualizza solo i nomi delle persone**, in Persone e gruppi) e `GivingApi` / `Donations` / `Enter` (**Inserisci donazioni**, in Donazioni; vedi [Lotti di donazioni](./giving.md#donation-batches)).

## Moduli

Percorso base: `/membership/forms`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca tutti i moduli (l'amministratore vede tutto; gli editor vedono i moduli assegnati e quelli non dei membri) |
| GET | `/:id` | JWT | Accesso al modulo | Ottieni un modulo tramite ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Elenca i moduli archiviati |
| GET | `/group/:groupId` | JWT | Membro del gruppo, leader del gruppo o Forms.Admin | Moduli autonomi collegati al gruppo (`forms.groupId`), esclusi quelli archiviati, ordinati per nome. Restituisce `id`, `name`, `description` e `open` (entro la finestra di disponibilità). I membri ottengono solo i moduli aperti; i leader e gli amministratori dei moduli ottengono anche quelli chiusi. Alimenta i moduli collegati nella pagina del gruppo |
| GET | `/standalone/:id?churchId=` | JWT | — | Ottieni un modulo autonomo (i moduli con accesso limitato richiedono l'autenticazione) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o aggiorna moduli. I moduli autonomi accettano un `photoUrl` facoltativo (foto di intestazione mostrata sopra il modulo) e un `groupId` (gruppo collegato) |
| DELETE | `/:id` | JWT | Accesso al modulo | Elimina un modulo |

## Invii dei moduli

Percorso base: `/membership/formsubmissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca gli invii. Filtra con `?personId=` o `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Ambito personale: fino a 50 invii di moduli autonomi (non moduli di persona) inviati dal membro autenticato o collegati alla sua persona (`contentType` `person`, `contentId` = l'id della sua persona — ad esempio, dopo una modifica fatta da un amministratore), dal più recente, ciascuno con `form.name`. `include` allega le domande di ogni modulo e le risposte dell'invio. Restituisce `401` se l'utente non è collegato a una persona. Alimenta la sezione **I miei moduli** della pagina B1 Me |
| GET | `/group/:groupId` | JWT | Leader del gruppo | Risposte per i leader del gruppo: una voce per ogni modulo collegato e per ogni evento del gruppo con un modulo di iscrizione, ciascuna con `form`, `event` (`id`, `title`, `start`; solo per le voci evento), `questions` e `submissions` (con `answers` e `personName`, `null` se anonimo) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit o accesso di visualizzazione | Ottieni un invio tramite ID. Aggiungi `?include=form,questions,answers`. Anche i leader del gruppo collegato al modulo e i leader del gruppo a cui appartiene un'iscrizione a un evento possono leggerlo |
| GET | `/formId/:formId` | JWT | Accesso al modulo (visualizzazione) | Ottieni tutti gli invii di un modulo (include form, questions, answers). I leader del gruppo collegato al modulo hanno accesso di visualizzazione |
| POST | `/` | JWT | — | Invia le risposte del modulo (gestisce i moduli con e senza accesso limitato, invia notifiche email). Quando il modulo ha `autoCreatePerson`, trova o crea una persona Guest tramite email e collega l'invio; quando il modulo ha anche un `groupId`, aggiunge quella persona al gruppo; quando sono impostati `followUpSubject`/`followUpBody`, invia al mittente un'email di follow-up basata su modello. A meno che il chiamante non possa gestire il modulo, `submittedBy` viene sempre impostato sulla persona del membro autenticato (o lasciato vuoto per gli invii anonimi) |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Elimina un invio e le sue risposte |

## Domande

Percorso base: `/membership/questions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Accesso al modulo | Elenca le domande di un modulo. Richiede `?formId=` |
| GET | `/:id` | JWT | Accesso al modulo | Ottieni una domanda tramite ID |
| GET | `/unrestricted?formId=` | JWT | — | Ottieni le domande di un modulo senza accesso limitato |
| GET | `/sort/:id/up` | JWT | — | Sposta una domanda in su nell'ordine |
| GET | `/sort/:id/down` | JWT | — | Sposta una domanda in giù nell'ordine |
| POST | `/` | JWT | Accesso al modulo | Crea o aggiorna domande (assegna automaticamente l'ordine) |
| DELETE | `/:id?formId=` | JWT | Accesso al modulo | Elimina una domanda |

## Risposte

Percorso base: `/membership/answers`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca le risposte. Filtra con `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o aggiorna risposte |

## Permessi dei membri

Percorso base: `/membership/memberpermissions`

Controlla l'accesso di ciascun membro a specifici moduli.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | Accesso al modulo | Ottieni un permesso di membro tramite ID |
| GET | `/member/:id` | JWT | Accesso al modulo | Ottieni tutti i permessi sui moduli di un membro |
| GET | `/form/:id` | JWT | Accesso al modulo | Ottieni tutti i permessi dei membri su un modulo |
| GET | `/form/:id/my` | JWT | Accesso al modulo | Ottieni il permesso dell'utente corrente su un modulo |
| POST | `/` | JWT | Accesso al modulo | Crea o aggiorna permessi dei membri |
| DELETE | `/:id?formId=` | JWT | Accesso al modulo | Elimina un permesso di membro |
| DELETE | `/member/:id?formId=` | JWT | Accesso al modulo | Elimina tutti i permessi di un membro su un modulo |

## Impostazioni

Percorso base: `/membership/settings`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Settings.Edit | Ottieni tutte le impostazioni della chiesa |
| GET | `/public/:churchId` | Public | — | Ottieni le impostazioni pubbliche di una chiesa |
| POST | `/` | JWT | Settings.Edit | Salva le impostazioni (supporta il caricamento di immagini in base64) |

## Domini

Percorso base: `/membership/domains`

Estende il CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i domini |
| GET | `/:id` | JWT | — | Ottieni un dominio tramite ID |
| GET | `/lookup/:domainName` | JWT | — | Cerca un dominio per nome |
| GET | `/public/lookup/:domainName` | Public | — | Ricerca pubblica di un dominio per nome |
| GET | `/health/check` | Public | — | Esegui il controllo di integrità sui domini non verificati |
| POST | `/` | JWT | Settings.Edit | Crea o aggiorna domini (attiva l'aggiornamento di Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Elimina un dominio |

## Utente-chiesa

Percorso base: `/membership/userchurch`

Gestisce l'associazione tra utenti e chiese.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/userid/:userId` | JWT | — | Ottieni il record utente-chiesa tramite ID utente |
| GET | `/personid/:personId` | JWT | — | Ottieni l'email dell'utente collegato a una persona |
| GET | `/user/:userId` | JWT | Server.Admin | Carica tutte le chiese di un utente |
| POST | `/` | JWT | — | Crea un'associazione utente-chiesa |
| PATCH | `/:userId` | JWT | — | Aggiorna l'ora dell'ultimo accesso e registra l'accesso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Elimina un record utente-chiesa |

## Preferenze di visibilità

Percorso base: `/membership/visibilityPreferences`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/my` | JWT | — | Ottieni le preferenze di visibilità dell'utente corrente |
| POST | `/` | JWT | — | Salva le preferenze di visibilità (visibilità di indirizzo, telefono, email) |

## Query

Percorso base: `/membership/query`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| POST | `/members` | JWT | — | Ricerca di membri in linguaggio naturale tramite AI. Body: `{ text, subDomain, siteUrl }` |

## Errori client

Percorso base: `/membership/clientErrors`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| POST | `/` | JWT | — | Registra un errore lato client |

## Pagine correlate

- [Autenticazione e permessi](./authentication) — Flusso di login, JWT, OAuth, modello dei permessi
- [Endpoint Attendance](./attendance) — Tracciamento di servizi e visite
- [Struttura del modulo](../module-structure) — Schemi di organizzazione del codice
