---
title: "Endpoint Membership"
---

# Endpoint Membership {#membership-endpoints}

<div class="article-intro">

Il modulo Membership gestisce persone, chiese, gruppi, nuclei familiari, ruoli, permessi, moduli e impostazioni. È il modulo più grande e fornisce il livello di identità e autorizzazione centrale per tutti gli altri moduli.

</div>

**Percorso base:** `/membership`

## Persone {#people}

Percorso base: `/membership/people`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View o Member | Elenca tutte le persone della chiesa |
| GET | `/:id` | JWT | People.View o scheda propria | Ottieni una persona tramite ID (include le risposte ai moduli) |
| GET | `/ids?ids=` | JWT | People.View, Member o People.ViewNames | Ottieni più persone tramite ID separati da virgola. I chiamanti con People.ViewNames senza People.View ricevono il modello base, con le persone che hanno revocato il consenso escluse (tranne il chiamante) |
| GET | `/basic?ids=` | JWT | — | Ottieni informazioni di base (solo nome) per più persone |
| GET | `/names?ids=` | JWT | Qualsiasi permesso della chiesa | `[{ id, name: { display, first, last }, photo }]`, ordinato per cognome e poi nome, per gli ID separati da virgola che il chiamante già possiede, così che i ruoli senza People.View (donazioni, presenze) possano visualizzare i nomi. Nessuna ricerca, nessun filtro della rubrica |
| POST | `/names` | JWT | Qualsiasi permesso della chiesa | Uguale a `GET /names`. Body: `{ peopleIds }` (oppure `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member o People.ViewNames | Persone aggiunte di recente. I chiamanti con People.ViewNames senza People.View (anche i membri con accesso alla rubrica) ricevono il modello base (`id`, `name.display`, `photo`, `membershipStatus`) con le persone che hanno revocato il consenso escluse |
| GET | `/search?term=&email=` | JWT | People.View, Member o People.ViewNames | Cerca persone per nome o email (fino a 100, ordinate per cognome e poi nome). I chiamanti con People.ViewNames senza People.View (anche i membri con accesso alla rubrica) ricevono per la ricerca per nome il modello base; una ricerca per `email` restituisce `[]` |
| GET | `/search/phone?number=` | JWT | People.View o Member | Cerca per numero di telefono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Ottieni le persone di un gruppo specifico |
| GET | `/household/:householdId` | JWT | — | Ottieni tutte le persone di un nucleo familiare |
| GET | `/attendance` | JWT | People.Edit | Carica i partecipanti con filtri (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carica i dati della timeline per persone e gruppi |
| GET | `/directory/:id` | JWT | — | Ottieni la persona per la vista della rubrica (rispetta le preferenze di visibilità) |
| GET | `/claim/:churchId` | JWT | — | Rivendica una scheda persona per l'utente corrente in una chiesa |
| POST | `/` | JWT | People.Edit o EditSelf | Crea o aggiorna persone (in batch) |
| POST | `/search` | JWT | People.View, Member o People.ViewNames | Cerca persone (variante POST). Body: `{ term }` oppure `{ email }`; stesse regole di visibilità dei soli nomi di `GET /search` |
| POST | `/advancedSearch` | JWT | People.View o Member | Ricerca con più condizioni (età, birthMonth, membershipStatus, ecc.) |
| POST | `/loadOrCreate` | Pubblico | — | Trova o crea una persona tramite email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Aggiorna le assegnazioni dei membri del nucleo familiare |
| POST | `/public/email` | Pubblico | — | Invia un'email a una persona. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interno | — | Carica le email delle persone tramite ID (da server a server, richiede jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Elimina una persona |

### Esempio: cercare persone {#example-search-people}

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

### Esempio: creare una persona {#example-create-a-person}

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Utenti {#users}

Percorso base: `/membership/users`

Per il login, la registrazione e la gestione delle password, vedi [Autenticazione e permessi](./authentication).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/login` | Pubblico | — | Login (email/password, refresh del JWT o authGuid) |
| POST | `/register` | Pubblico | — | Registra un nuovo utente |
| POST | `/forgot` | Pubblico | — | Invia un'email di reimpostazione della password |
| POST | `/setPasswordGuid` | Pubblico | — | Imposta la password usando il GUID di autenticazione del link ricevuto via email |
| POST | `/verifyCredentials` | Pubblico | — | Verifica email/password e restituisce le chiese associate |
| POST | `/loadOrCreate` | JWT | — | Trova o crea un utente tramite email/userId |
| POST | `/setDisplayName` | JWT | — | Aggiorna il nome e il cognome dell'utente |
| POST | `/updateEmail` | JWT | — | Modifica l'indirizzo email dell'utente |
| POST | `/updatePassword` | JWT | — | Modifica la password dell'utente (minimo 6 caratteri) |
| POST | `/updateOptedOut` | JWT | — | Imposta lo stato di revoca del consenso di una persona |
| POST | `/sendInviteEmail` | JWT | People.Edit | Invia un invito via email a una persona di questa chiesa (`email`, `personName`, `contextName`). Il pulsante riporta **Registrati** per chi non ha un account e **Accedi** per un utente esistente. Chi non ha mai effettuato l'accesso riceve invece un link **Imposta la tua password** che scade dopo 7 giorni. Si tratta di un modello fisso, quindi non conta nel limite giornaliero di email della chiesa |
| GET | `/search?term=` | JWT | Server.Admin | Cerca tutti gli utenti per nome/email |
| DELETE | `/` | JWT | — | Elimina l'account utente corrente |

## Chiese {#churches}

Percorso base: `/membership/churches`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carica tutte le chiese dell'utente corrente |
| GET | `/:id` | JWT | — | Ottieni una chiesa tramite ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Ottieni l'utente amministratore di dominio di una chiesa |
| GET | `/:id/impersonate` | JWT | Server.Admin | Impersona una chiesa (solo amministratori del server) |
| GET | `/all?term=` | JWT | Server.Admin | Cerca tutte le chiese (amministrazione) |
| GET | `/search/?name=` | Pubblico | — | Cerca chiese per nome |
| GET | `/lookup/?subDomain=&id=` | Pubblico | — | Cerca una chiesa tramite sottodominio o ID |
| POST | `/` | JWT | Settings.Edit | Aggiorna i dettagli della chiesa |
| POST | `/add` | JWT | — | Registra una nuova chiesa. Campi obbligatori: name, address1, city, state, zip, country |
| POST | `/search` | Pubblico | — | Cerca chiese per nome (variante POST) |
| POST | `/select` | JWT | — | Seleziona/passa a una chiesa. Body: `{ churchId }` oppure `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archivia o ripristina una chiesa |
| POST | `/byIds` | Pubblico | — | Carica più chiese tramite ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Elimina le chiese abbandonate da 7 o più giorni |

## Gruppi {#groups}

Percorso base: `/membership/groups`

Estende il CRUD standard (GET `/`, GET `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i gruppi |
| GET | `/:id` | JWT | — | Ottieni un gruppo tramite ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Cerca gruppi con filtri di servizio |
| GET | `/my` | JWT | — | Ottieni i gruppi dell'utente corrente |
| GET | `/my/:tag` | JWT | — | Ottieni i gruppi dell'utente corrente filtrati per tag |
| GET | `/tag/:tag` | JWT | — | Ottieni tutti i gruppi con un tag specifico |
| GET | `/public/:churchId/:id` | Pubblico | — | Ottieni un gruppo pubblico tramite chiesa e ID |
| GET | `/public/:churchId/tag/:tag` | Pubblico | — | Ottieni i gruppi pubblici tramite tag |
| GET | `/public/:churchId/label?label=` | Pubblico | — | Ottieni i gruppi pubblici tramite etichetta |
| GET | `/public/:churchId/slug/:slug` | Pubblico | — | Ottieni un gruppo pubblico tramite slug |
| POST | `/` | JWT | Groups.Edit | Crea o aggiorna gruppi (genera automaticamente lo slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Elimina un gruppo (elimina anche i team figli per i gruppi di ministero) |

## Membri del gruppo {#group-members}

Percorso base: `/membership/groupmembers`

Estende il CRUD standard (GET `/:id`, DELETE `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Ottieni un membro del gruppo tramite ID |
| GET | `/` | JWT | GroupMembers.View* | Elenca i membri dei gruppi. Filtra con `?groupId=`, `?groupIds=` o `?personId=`. *Consentito anche se l'utente è nel gruppo o chiede il proprio personId, e per `?groupId=` di qualsiasi gruppo non riservato quando l'utente ha Attendance.View o Attendance.Edit (vengono inclusi i membri under 13 per loro) |
| GET | `/my` | JWT | — | Ottieni le appartenenze ai gruppi dell'utente corrente |
| GET | `/basic/:groupId` | JWT | — | Ottieni l'elenco base dei membri di un gruppo |
| GET | `/public/leaders/:churchId/:groupId` | Pubblico | — | Ottieni i leader di un gruppo (pubblico) |
| GET | `/public/:churchId/:groupId` | Pubblico | — | Ottieni l'elenco pubblico di un gruppo (campi minimi: `personId`, `displayName`, `leader`, foto). Solo quando il gruppo sceglie di partecipare tramite `publicRoster`; alimenta l'elemento `staffGrid` del website builder |
| POST | `/` | JWT | GroupMembers.Edit | Aggiungi o aggiorna membri del gruppo |
| DELETE | `/:id` | JWT | GroupMembers.View | Rimuovi un membro del gruppo |

## Nuclei familiari {#households}

Percorso base: `/membership/households`

Controller CRUD standard.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i nuclei familiari |
| GET | `/:id` | JWT | — | Ottieni un nucleo familiare tramite ID |
| POST | `/` | JWT | People.Edit | Crea o aggiorna nuclei familiari |
| DELETE | `/:id` | JWT | People.Edit | Elimina un nucleo familiare |

## Ruoli {#roles}

Percorso base: `/membership/roles`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Ottieni un ruolo tramite ID |
| GET | `/church/:churchId` | JWT | Roles.View | Ottieni tutti i ruoli di una chiesa |
| POST | `/` | JWT | Roles.Edit | Crea o aggiorna ruoli |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un ruolo (rimuove anche i suoi permessi e i suoi membri) |

## Membri del ruolo {#role-members}

Percorso base: `/membership/rolemembers`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ottieni i membri di un ruolo. Aggiungi `?include=users` per includere i dettagli degli utenti |
| POST | `/` | JWT | Roles.Edit | Aggiungi membri a un ruolo (crea l'utente se l'email non esiste) |
| DELETE | `/:id` | JWT | Roles.View | Rimuovi un membro del ruolo |
| DELETE | `/self/:churchId/:userId` | JWT | — | Rimuovi te stesso da una chiesa |

## Permessi del ruolo {#role-permissions}

Percorso base: `/membership/rolepermissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ottieni i permessi di un ruolo (usa `null` come ID per il ruolo "Everyone") |
| POST | `/` | JWT | Roles.Edit | Crea o aggiorna i permessi di un ruolo |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un permesso di ruolo |

## Permessi {#permissions}

Percorso base: `/membership/permissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ottieni l'elenco completo dei permessi disponibili |

Ogni voce ha `apiName`, `section` (tipo di contenuto), `action` e le etichette `displaySection` / `displayAction` che mostra l'editor dei ruoli di B1Admin. Aggiunte recenti: `MembershipApi` / `People` / `View Names` (**Visualizza solo i nomi delle persone**, in Persone e gruppi) e `GivingApi` / `Donations` / `Enter` (**Inserisci donazioni**, in Donazioni; vedi [Lotti di donazioni](./giving.md#donation-batches)).

## Moduli {#forms}

Percorso base: `/membership/forms`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca tutti i moduli (l'amministratore vede tutto; gli editor vedono i moduli assegnati e quelli non legati ai membri) |
| GET | `/:id` | JWT | Accesso al modulo | Ottieni un modulo tramite ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Elenca i moduli archiviati |
| GET | `/standalone/:id?churchId=` | JWT | — | Ottieni un modulo autonomo (i moduli con accesso limitato richiedono l'autenticazione) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o aggiorna moduli |
| DELETE | `/:id` | JWT | Accesso al modulo | Elimina un modulo |

## Risposte ai moduli {#form-submissions}

Percorso base: `/membership/formsubmissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca le risposte. Filtra con `?personId=` o `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Limitato all'utente: fino a 50 risposte a moduli autonomi (non moduli di persona) inviate dal membro connesso, dalla più recente, ognuna con `form.name`. `include` allega le domande di ogni modulo e le risposte della risposta. Restituisce `401` se l'utente non è collegato a una persona. Alimenta la sezione **I miei moduli** della pagina B1 Me |
| GET | `/:id` | JWT | Forms.Admin o Forms.Edit | Ottieni una risposta tramite ID. Aggiungi `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Accesso al modulo | Ottieni tutte le risposte di un modulo (include modulo, domande, risposte) |
| POST | `/` | JWT | — | Invia le risposte a un modulo (gestisce moduli con accesso limitato e non, invia notifiche email). Quando il modulo ha `autoCreatePerson`, trova o crea una persona Ospite tramite email e collega la risposta; quando sono impostati `followUpSubject`/`followUpBody`, invia al mittente un'email di follow-up basata su modello. A meno che il chiamante non possa gestire il modulo, `submittedBy` è sempre impostato sulla persona del membro connesso (oppure lasciato vuoto per le risposte anonime) |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Elimina una risposta e le sue risposte alle domande |

## Domande {#questions}

Percorso base: `/membership/questions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Accesso al modulo | Elenca le domande di un modulo. Richiede `?formId=` |
| GET | `/:id` | JWT | Accesso al modulo | Ottieni una domanda tramite ID |
| GET | `/unrestricted?formId=` | JWT | — | Ottieni le domande di un modulo non limitato |
| GET | `/sort/:id/up` | JWT | — | Sposta una domanda in su nell'ordinamento |
| GET | `/sort/:id/down` | JWT | — | Sposta una domanda in giù nell'ordinamento |
| POST | `/` | JWT | Accesso al modulo | Crea o aggiorna domande (assegna automaticamente l'ordinamento) |
| DELETE | `/:id?formId=` | JWT | Accesso al modulo | Elimina una domanda |

## Risposte {#answers}

Percorso base: `/membership/answers`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca le risposte. Filtra con `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o aggiorna risposte |

## Permessi dei membri {#member-permissions}

Percorso base: `/membership/memberpermissions`

Controlla l'accesso di ogni membro a moduli specifici.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Accesso al modulo | Ottieni un permesso di membro tramite ID |
| GET | `/member/:id` | JWT | Accesso al modulo | Ottieni tutti i permessi sui moduli di un membro |
| GET | `/form/:id` | JWT | Accesso al modulo | Ottieni tutti i permessi dei membri per un modulo |
| GET | `/form/:id/my` | JWT | Accesso al modulo | Ottieni il permesso dell'utente corrente per un modulo |
| POST | `/` | JWT | Accesso al modulo | Crea o aggiorna permessi dei membri |
| DELETE | `/:id?formId=` | JWT | Accesso al modulo | Elimina un permesso di membro |
| DELETE | `/member/:id?formId=` | JWT | Accesso al modulo | Elimina tutti i permessi di un membro su un modulo |

## Impostazioni {#settings}

Percorso base: `/membership/settings`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Ottieni tutte le impostazioni della chiesa |
| GET | `/public/:churchId` | Pubblico | — | Ottieni le impostazioni pubbliche di una chiesa |
| POST | `/` | JWT | Settings.Edit | Salva le impostazioni (supporta il caricamento di immagini in base64) |

## Domini {#domains}

Percorso base: `/membership/domains`

Estende il CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i domini |
| GET | `/:id` | JWT | — | Ottieni un dominio tramite ID |
| GET | `/lookup/:domainName` | JWT | — | Cerca un dominio per nome |
| GET | `/public/lookup/:domainName` | Pubblico | — | Ricerca pubblica di un dominio per nome |
| GET | `/health/check` | Pubblico | — | Esegui il controllo di integrità sui domini non verificati |
| POST | `/` | JWT | Settings.Edit | Crea o aggiorna domini (attiva l'aggiornamento di Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Elimina un dominio |

## Associazione utente-chiesa {#user-church}

Percorso base: `/membership/userchurch`

Gestisce l'associazione tra utenti e chiese.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Ottieni il record utente-chiesa tramite ID utente |
| GET | `/personid/:personId` | JWT | — | Ottieni l'email dell'utente collegato a una persona |
| GET | `/user/:userId` | JWT | Server.Admin | Carica tutte le chiese di un utente |
| POST | `/` | JWT | — | Crea un'associazione utente-chiesa |
| PATCH | `/:userId` | JWT | — | Aggiorna l'ora dell'ultimo accesso e registra l'accesso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Elimina un record utente-chiesa |

## Preferenze di visibilità {#visibility-preferences}

Percorso base: `/membership/visibilityPreferences`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Ottieni le preferenze di visibilità dell'utente corrente |
| POST | `/` | JWT | — | Salva le preferenze di visibilità (visibilità di indirizzo, telefono, email) |

## Query {#query}

Percorso base: `/membership/query`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Ricerca di membri in linguaggio naturale tramite AI. Body: `{ text, subDomain, siteUrl }` |

## Errori del client {#client-errors}

Percorso base: `/membership/clientErrors`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Registra un errore lato client |

## Pagine correlate {#related-pages}

- [Autenticazione e permessi](./authentication) — Flusso di login, JWT, OAuth, modello dei permessi
- [Endpoint Presenze](./attendance) — Tracciamento di servizi e visite
- [Struttura del modulo](../module-structure) — Schemi di organizzazione del codice
