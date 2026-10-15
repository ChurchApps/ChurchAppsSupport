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

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View o Member | Elenca tutte le persone della chiesa |
| GET | `/:id` | JWT | People.View o il proprio record | Ottieni una persona tramite ID (include le compilazioni dei moduli) |
| GET | `/ids?ids=` | JWT | People.View o Member | Ottieni più persone tramite ID separati da virgola |
| GET | `/basic?ids=` | JWT | — | Ottieni le informazioni di base (solo nome) per più persone |
| GET | `/names?ids=` | JWT | Qualsiasi permesso della chiesa | `[{ id, name: { display }, photo }]` per gli ID separati da virgola che il chiamante già possiede, così i ruoli senza People.View (offerte, presenze) possono identificare le persone. Nessuna ricerca, nessun filtro del registro |
| POST | `/names` | JWT | Qualsiasi permesso della chiesa | Uguale a `GET /names`. Corpo: `{ peopleIds }` (oppure `{ ids }`) |
| GET | `/recent` | JWT | People.View o Member | Persone aggiunte di recente |
| GET | `/search?term=&email=` | JWT | People.View o Member | Cerca persone per nome o email |
| GET | `/search/phone?number=` | JWT | People.View o Member | Cerca per numero di telefono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Ottieni le persone di un gruppo specifico |
| GET | `/household/:householdId` | JWT | — | Ottieni tutte le persone di un nucleo familiare |
| GET | `/attendance` | JWT | People.Edit | Carica i partecipanti con filtri (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carica i dati della cronologia per persone e gruppi |
| GET | `/directory/:id` | JWT | — | Ottieni una persona per la vista del registro (rispetta le preferenze di visibilità) |
| GET | `/claim/:churchId` | JWT | — | Rivendica un record persona per l'utente corrente in una chiesa |
| POST | `/` | JWT | People.Edit o EditSelf | Crea o aggiorna persone (lotto) |
| POST | `/search` | JWT | People.View o Member | Cerca persone (variante POST) |
| POST | `/advancedSearch` | JWT | People.View o Member | Ricerca a più condizioni (età, birthMonth, membershipStatus, ecc.) |
| POST | `/loadOrCreate` | Pubblico | — | Trova o crea una persona tramite email. Corpo: `{ churchId, email, firstName, lastName }` |
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

Vedi [Autenticazione e permessi](./authentication) per gli endpoint di accesso, registrazione e gestione della password.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/login` | Pubblico | — | Accedi (email/password, rinnovo JWT o authGuid) |
| POST | `/register` | Pubblico | — | Registra un nuovo utente |
| POST | `/forgot` | Pubblico | — | Invia l'email di reimpostazione della password |
| POST | `/setPasswordGuid` | Pubblico | — | Imposta la password usando il GUID di autenticazione dal link dell'email |
| POST | `/verifyCredentials` | Pubblico | — | Verifica email/password e restituisce le chiese associate |
| POST | `/loadOrCreate` | JWT | — | Trova o crea un utente tramite email/userId |
| POST | `/setDisplayName` | JWT | — | Aggiorna il nome e il cognome dell'utente |
| POST | `/updateEmail` | JWT | — | Cambia l'indirizzo email dell'utente |
| POST | `/updatePassword` | JWT | — | Cambia la password dell'utente (minimo 6 caratteri) |
| POST | `/updateOptedOut` | JWT | — | Imposta lo stato di disiscrizione di una persona |
| POST | `/sendInviteEmail` | JWT | People.Edit | Invia via email un invito a una persona di questa chiesa (`email`, `personName`, `contextName`). Il pulsante riporta **Registrati** per chi non ha un account e **Accedi** per un utente esistente. Un utente che non ha mai effettuato l'accesso riceve invece un link **Imposta la tua password** che scade dopo 7 giorni. Conta nel limite giornaliero di email della chiesa (`429` quando raggiunto) |
| GET | `/search?term=` | JWT | Server.Admin | Cerca tutti gli utenti per nome/email |
| DELETE | `/` | JWT | — | Elimina l'account utente corrente |

## Chiese

Percorso base: `/membership/churches`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carica tutte le chiese dell'utente corrente |
| GET | `/:id` | JWT | — | Ottieni una chiesa tramite ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Ottieni l'utente amministratore di dominio per una chiesa |
| GET | `/:id/impersonate` | JWT | Server.Admin | Impersona una chiesa (solo amministratori del server) |
| GET | `/all?term=` | JWT | Server.Admin | Cerca tutte le chiese (amministratore) |
| GET | `/search/?name=` | Pubblico | — | Cerca chiese per nome |
| GET | `/lookup/?subDomain=&id=` | Pubblico | — | Cerca una chiesa per sottodominio o ID |
| POST | `/` | JWT | Settings.Edit | Aggiorna i dettagli della chiesa |
| POST | `/add` | JWT | — | Registra una nuova chiesa. Campi obbligatori: name, address1, city, state, zip, country |
| POST | `/search` | Pubblico | — | Cerca chiese per nome (variante POST) |
| POST | `/select` | JWT | — | Seleziona/passa a una chiesa. Corpo: `{ churchId }` oppure `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archivia o ripristina una chiesa |
| POST | `/byIds` | Pubblico | — | Carica più chiese tramite ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Elimina le chiese abbandonate da 7 o più giorni |

## Gruppi

Percorso base: `/membership/groups`

Estende il CRUD standard (GET `/`, GET `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i gruppi |
| GET | `/:id` | JWT | — | Ottieni un gruppo tramite ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Cerca gruppi con filtri sui culti |
| GET | `/my` | JWT | — | Ottieni i gruppi dell'utente corrente |
| GET | `/my/:tag` | JWT | — | Ottieni i gruppi dell'utente corrente filtrati per etichetta |
| GET | `/tag/:tag` | JWT | — | Ottieni tutti i gruppi con una specifica etichetta |
| GET | `/public/:churchId/:id` | Pubblico | — | Ottieni un gruppo pubblico tramite chiesa e ID |
| GET | `/public/:churchId/tag/:tag` | Pubblico | — | Ottieni i gruppi pubblici per etichetta |
| GET | `/public/:churchId/label?label=` | Pubblico | — | Ottieni i gruppi pubblici per etichetta (label) |
| GET | `/public/:churchId/slug/:slug` | Pubblico | — | Ottieni un gruppo pubblico tramite slug |
| POST | `/` | JWT | Groups.Edit | Crea o aggiorna gruppi (genera automaticamente lo slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Elimina un gruppo (elimina anche i team figli per i gruppi di ministero) |

## Membri dei gruppi

Percorso base: `/membership/groupmembers`

Estende il CRUD standard (GET `/:id`, DELETE `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Ottieni un membro del gruppo tramite ID |
| GET | `/` | JWT | GroupMembers.View* | Elenca i membri dei gruppi. Filtra con `?groupId=`, `?groupIds=` oppure `?personId=`. *Consentito anche se l'utente è nel gruppo o richiede il proprio personId |
| GET | `/my` | JWT | — | Ottieni le appartenenze ai gruppi dell'utente corrente |
| GET | `/basic/:groupId` | JWT | — | Ottieni l'elenco base dei membri di un gruppo |
| GET | `/public/leaders/:churchId/:groupId` | Pubblico | — | Ottieni i leader di un gruppo (pubblico) |
| GET | `/public/:churchId/:groupId` | Pubblico | — | Ottieni l'elenco pubblico di un gruppo (campi minimi: `personId`, `displayName`, `leader`, foto). Solo se il gruppo attiva `publicRoster`; alimenta l'elemento `staffGrid` del costruttore di siti web |
| POST | `/` | JWT | GroupMembers.Edit | Aggiungi o aggiorna membri dei gruppi |
| DELETE | `/:id` | JWT | GroupMembers.View | Rimuovi un membro del gruppo |

## Nuclei familiari

Percorso base: `/membership/households`

Controller CRUD standard.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i nuclei familiari |
| GET | `/:id` | JWT | — | Ottieni un nucleo familiare tramite ID |
| POST | `/` | JWT | People.Edit | Crea o aggiorna nuclei familiari |
| DELETE | `/:id` | JWT | People.Edit | Elimina un nucleo familiare |

## Ruoli

Percorso base: `/membership/roles`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Ottieni un ruolo tramite ID |
| GET | `/church/:churchId` | JWT | Roles.View | Ottieni tutti i ruoli di una chiesa |
| POST | `/` | JWT | Roles.Edit | Crea o aggiorna ruoli |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un ruolo (rimuove anche i suoi permessi e i suoi membri) |

## Membri dei ruoli

Percorso base: `/membership/rolemembers`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ottieni i membri di un ruolo. Aggiungi `?include=users` per includere i dettagli degli utenti |
| POST | `/` | JWT | Roles.Edit | Aggiungi membri a un ruolo (crea l'utente se l'email non esiste) |
| DELETE | `/:id` | JWT | Roles.View | Rimuovi un membro di un ruolo |
| DELETE | `/self/:churchId/:userId` | JWT | — | Rimuovi te stesso da una chiesa |

## Permessi dei ruoli

Percorso base: `/membership/rolepermissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ottieni i permessi di un ruolo (usa `null` come ID per il ruolo "Everyone") |
| POST | `/` | JWT | Roles.Edit | Crea o aggiorna i permessi di un ruolo |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un permesso di un ruolo |

## Permessi

Percorso base: `/membership/permissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ottieni l'elenco completo dei permessi disponibili |

## Moduli

Percorso base: `/membership/forms`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca tutti i moduli (l'amministratore vede tutto; gli editor vedono quelli assegnati + quelli non riservati ai membri) |
| GET | `/:id` | JWT | Accesso al modulo | Ottieni un modulo tramite ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Elenca i moduli archiviati |
| GET | `/standalone/:id?churchId=` | JWT | — | Ottieni un modulo autonomo (i moduli riservati richiedono l'autenticazione) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o aggiorna moduli |
| DELETE | `/:id` | JWT | Accesso al modulo | Elimina un modulo |

## Compilazioni dei moduli

Percorso base: `/membership/formsubmissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca le compilazioni. Filtra con `?personId=` oppure `?formId=` |
| GET | `/:id` | JWT | Forms.Admin o Forms.Edit | Ottieni una compilazione tramite ID. Aggiungi `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Accesso al modulo | Ottieni tutte le compilazioni di un modulo (include modulo, domande, risposte) |
| POST | `/` | JWT | — | Invia le risposte del modulo (gestisce moduli riservati e non riservati, invia notifiche email). Quando il modulo ha `autoCreatePerson`, trova o crea una persona Ospite tramite email e collega la compilazione; quando sono impostati `followUpSubject`/`followUpBody`, invia al mittente un'email di follow-up basata su modello |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Elimina una compilazione e le sue risposte |

## Domande

Percorso base: `/membership/questions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Accesso al modulo | Elenca le domande di un modulo. Richiede `?formId=` |
| GET | `/:id` | JWT | Accesso al modulo | Ottieni una domanda tramite ID |
| GET | `/unrestricted?formId=` | JWT | — | Ottieni le domande di un modulo non riservato |
| GET | `/sort/:id/up` | JWT | — | Sposta una domanda più in alto nell'ordinamento |
| GET | `/sort/:id/down` | JWT | — | Sposta una domanda più in basso nell'ordinamento |
| POST | `/` | JWT | Accesso al modulo | Crea o aggiorna domande (assegna automaticamente l'ordinamento) |
| DELETE | `/:id?formId=` | JWT | Accesso al modulo | Elimina una domanda |

## Risposte

Percorso base: `/membership/answers`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca le risposte. Filtra con `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o aggiorna risposte |

## Permessi dei membri

Percorso base: `/membership/memberpermissions`

Controlla l'accesso di ciascun membro a moduli specifici.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Accesso al modulo | Ottieni un permesso di membro tramite ID |
| GET | `/member/:id` | JWT | Accesso al modulo | Ottieni tutti i permessi sui moduli di un membro |
| GET | `/form/:id` | JWT | Accesso al modulo | Ottieni tutti i permessi dei membri per un modulo |
| GET | `/form/:id/my` | JWT | Accesso al modulo | Ottieni il permesso dell'utente corrente per un modulo |
| POST | `/` | JWT | Accesso al modulo | Crea o aggiorna permessi dei membri |
| DELETE | `/:id?formId=` | JWT | Accesso al modulo | Elimina un permesso di un membro |
| DELETE | `/member/:id?formId=` | JWT | Accesso al modulo | Elimina tutti i permessi di un membro su un modulo |

## Impostazioni

Percorso base: `/membership/settings`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Ottieni tutte le impostazioni della chiesa |
| GET | `/public/:churchId` | Pubblico | — | Ottieni le impostazioni pubbliche di una chiesa |
| POST | `/` | JWT | Settings.Edit | Salva le impostazioni (supporta il caricamento di immagini in base64) |

## Domini

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

## Utente-chiesa

Percorso base: `/membership/userchurch`

Gestisce l'associazione tra utenti e chiese.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Ottieni il record utente-chiesa tramite ID utente |
| GET | `/personid/:personId` | JWT | — | Ottieni l'email dell'utente collegato a una persona |
| GET | `/user/:userId` | JWT | Server.Admin | Carica tutte le chiese di un utente |
| POST | `/` | JWT | — | Crea un'associazione utente-chiesa |
| PATCH | `/:userId` | JWT | — | Aggiorna l'ultimo accesso e registra l'accesso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Elimina un record utente-chiesa |

## Preferenze di visibilità

Percorso base: `/membership/visibilityPreferences`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Ottieni le preferenze di visibilità dell'utente corrente |
| POST | `/` | JWT | — | Salva le preferenze di visibilità (visibilità di indirizzo, telefono, email) |

## Query

Percorso base: `/membership/query`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Ricerca di membri in linguaggio naturale tramite AI. Corpo: `{ text, subDomain, siteUrl }` |

## Errori lato client

Percorso base: `/membership/clientErrors`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Registra un errore lato client |

## Pagine correlate

- [Autenticazione e permessi](./authentication) — Flusso di accesso, JWT, OAuth, modello dei permessi
- [Endpoint Attendance](./attendance) — Tracciamento di servizi e visite
- [Struttura del modulo](../module-structure) — Schemi di organizzazione del codice
