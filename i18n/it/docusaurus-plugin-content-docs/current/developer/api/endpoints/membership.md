---
title: "Endpoint Membership"
---

# Endpoint Membership

<div class="article-intro">

Il modulo Membership gestisce le persone, le chiese, i gruppi, i nuclei familiari, i ruoli, i permessi, i moduli (form) e le impostazioni. È il modulo più grande e fornisce il livello di identità e autorizzazione di base per tutti gli altri moduli.

</div>

**Percorso base:** `/membership`

## People

Percorso base: `/membership/people`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View o Member | Elenca tutte le persone della chiesa |
| GET | `/:id` | JWT | People.View o proprio record | Ottiene una persona per ID (include gli invii di moduli) |
| GET | `/ids?ids=` | JWT | People.View o Member | Ottiene più persone tramite ID separati da virgola |
| GET | `/basic?ids=` | JWT | — | Ottiene informazioni di base (solo nome) per più persone |
| GET | `/recent` | JWT | People.View o Member | Persone aggiunte di recente |
| GET | `/search?term=&email=` | JWT | People.View o Member | Cerca persone per nome o email |
| GET | `/search/phone?number=` | JWT | People.View o Member | Cerca per numero di telefono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Ottiene le persone in un gruppo specifico |
| GET | `/household/:householdId` | JWT | — | Ottiene tutte le persone in un nucleo familiare |
| GET | `/attendance` | JWT | People.Edit | Carica i partecipanti con filtri (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carica i dati della timeline per persone e gruppi |
| GET | `/directory/:id` | JWT | — | Ottiene una persona per la visualizzazione in directory (rispetta le preferenze di visibilità) |
| GET | `/claim/:churchId` | JWT | — | Rivendica un record persona per l'utente corrente presso una chiesa |
| POST | `/` | JWT | People.Edit o EditSelf | Crea o aggiorna persone (batch) |
| POST | `/search` | JWT | People.View o Member | Cerca persone (variante POST) |
| POST | `/advancedSearch` | JWT | People.View o Member | Ricerca multi-condizione (età, mese di nascita, stato di appartenenza, ecc.) |
| POST | `/loadOrCreate` | Public | — | Trova o crea una persona tramite email. Corpo: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Aggiorna le assegnazioni dei membri del nucleo familiare |
| POST | `/public/email` | Public | — | Invia un'email a una persona. Corpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Carica le email delle persone tramite ID (server-to-server, richiede jwtSecret) |
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

## Users

Percorso base: `/membership/users`

Vedi [Autenticazione e permessi](./authentication) per gli endpoint di login, registrazione e gestione password.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Effettua il login (email/password, refresh JWT o authGuid) |
| POST | `/register` | Public | — | Registra un nuovo utente |
| POST | `/forgot` | Public | — | Invia l'email di reimpostazione password |
| POST | `/setPasswordGuid` | Public | — | Imposta la password usando il GUID di autenticazione dal link email |
| POST | `/verifyCredentials` | Public | — | Verifica email/password e restituisce le chiese associate |
| POST | `/loadOrCreate` | JWT | — | Trova o crea un utente tramite email/userId |
| POST | `/setDisplayName` | JWT | — | Aggiorna il nome e cognome dell'utente |
| POST | `/updateEmail` | JWT | — | Cambia l'indirizzo email dell'utente |
| POST | `/updatePassword` | JWT | — | Cambia la password dell'utente (minimo 6 caratteri) |
| POST | `/updateOptedOut` | JWT | — | Imposta lo stato di opt-out di una persona |
| GET | `/search?term=` | JWT | Server.Admin | Cerca tutti gli utenti per nome/email |
| DELETE | `/` | JWT | — | Elimina l'account dell'utente corrente |

## Churches

Percorso base: `/membership/churches`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carica tutte le chiese per l'utente corrente |
| GET | `/:id` | JWT | — | Ottiene una chiesa per ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Ottiene l'utente amministratore del dominio per una chiesa |
| GET | `/:id/impersonate` | JWT | Server.Admin | Impersona una chiesa (solo amministratore server) |
| GET | `/all?term=` | JWT | Server.Admin | Cerca tutte le chiese (amministratore) |
| GET | `/search/?name=` | Public | — | Cerca chiese per nome |
| GET | `/lookup/?subDomain=&id=` | Public | — | Cerca una chiesa per sottodominio o ID |
| POST | `/` | JWT | Settings.Edit | Aggiorna i dettagli della chiesa |
| POST | `/add` | JWT | — | Registra una nuova chiesa. Campi obbligatori: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Cerca chiese per nome (variante POST) |
| POST | `/select` | JWT | — | Seleziona/passa a una chiesa. Corpo: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archivia o dearchivia una chiesa |
| POST | `/byIds` | Public | — | Carica più chiese tramite ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Elimina le chiese abbandonate da 7 o più giorni |

## Groups

Percorso base: `/membership/groups`

Estende il CRUD standard (GET `/`, GET `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i gruppi |
| GET | `/:id` | JWT | — | Ottiene un gruppo per ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Cerca gruppi per filtri di servizio |
| GET | `/my` | JWT | — | Ottiene i gruppi dell'utente corrente |
| GET | `/my/:tag` | JWT | — | Ottiene i gruppi dell'utente corrente filtrati per tag |
| GET | `/tag/:tag` | JWT | — | Ottiene tutti i gruppi con un tag specifico |
| GET | `/public/:churchId/:id` | Public | — | Ottiene un gruppo pubblico per chiesa e ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Ottiene i gruppi pubblici per tag |
| GET | `/public/:churchId/label?label=` | Public | — | Ottiene i gruppi pubblici per etichetta |
| GET | `/public/:churchId/slug/:slug` | Public | — | Ottiene un gruppo pubblico per slug |
| POST | `/` | JWT | Groups.Edit | Crea o aggiorna gruppi (genera automaticamente lo slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Elimina un gruppo (elimina anche i team figli per i gruppi ministeriali) |

## Group Members

Percorso base: `/membership/groupmembers`

Estende il CRUD standard (GET `/:id`, DELETE `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Ottiene un membro del gruppo per ID |
| GET | `/` | JWT | GroupMembers.View* | Elenca i membri del gruppo. Filtra con `?groupId=`, `?groupIds=` o `?personId=`. *Consentito anche se l'utente è nel gruppo o interroga il proprio personId |
| GET | `/my` | JWT | — | Ottiene le appartenenze ai gruppi dell'utente corrente |
| GET | `/basic/:groupId` | JWT | — | Ottiene l'elenco base dei membri per un gruppo |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Ottiene i leader del gruppo (pubblico) |
| GET | `/public/:churchId/:groupId` | Public | — | Ottiene l'elenco pubblico dei membri di un gruppo (campi minimi: `personId`, `displayName`, `leader`, foto). Solo quando il gruppo aderisce tramite `publicRoster`; alimenta l'elemento `staffGrid` del website builder |
| POST | `/` | JWT | GroupMembers.Edit | Aggiunge o aggiorna membri del gruppo |
| DELETE | `/:id` | JWT | GroupMembers.View | Rimuove un membro del gruppo |

## Households

Percorso base: `/membership/households`

Controller CRUD standard.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i nuclei familiari |
| GET | `/:id` | JWT | — | Ottiene un nucleo familiare per ID |
| POST | `/` | JWT | People.Edit | Crea o aggiorna nuclei familiari |
| DELETE | `/:id` | JWT | People.Edit | Elimina un nucleo familiare |

## Roles

Percorso base: `/membership/roles`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Ottiene un ruolo per ID |
| GET | `/church/:churchId` | JWT | Roles.View | Ottiene tutti i ruoli per una chiesa |
| POST | `/` | JWT | Roles.Edit | Crea o aggiorna ruoli |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un ruolo (rimuove anche i suoi permessi e membri) |

## Role Members

Percorso base: `/membership/rolemembers`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ottiene i membri di un ruolo. Aggiungi `?include=users` per includere i dettagli utente |
| POST | `/` | JWT | Roles.Edit | Aggiunge membri a un ruolo (crea l'utente se l'email non esiste) |
| DELETE | `/:id` | JWT | Roles.View | Rimuove un membro dal ruolo |
| DELETE | `/self/:churchId/:userId` | JWT | — | Rimuovi te stesso da una chiesa |

## Role Permissions

Percorso base: `/membership/rolepermissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ottiene i permessi di un ruolo (usa `null` come ID per il ruolo "Everyone") |
| POST | `/` | JWT | Roles.Edit | Crea o aggiorna permessi di ruolo |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un permesso di ruolo |

## Permissions

Percorso base: `/membership/permissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ottiene l'elenco completo dei permessi disponibili |

## Forms

Percorso base: `/membership/forms`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca tutti i moduli (l'admin vede tutto; gli editor vedono quelli assegnati + i moduli non riservati ai membri) |
| GET | `/:id` | JWT | Accesso al modulo | Ottiene un modulo per ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Elenca i moduli archiviati |
| GET | `/standalone/:id?churchId=` | JWT | — | Ottiene un modulo autonomo (i moduli riservati richiedono l'autenticazione) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o aggiorna moduli |
| DELETE | `/:id` | JWT | Accesso al modulo | Elimina un modulo |

## Form Submissions

Percorso base: `/membership/formsubmissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca gli invii. Filtra con `?personId=` o `?formId=` |
| GET | `/:id` | JWT | Forms.Admin o Forms.Edit | Ottiene un invio per ID. Aggiungi `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Accesso al modulo | Ottiene tutti gli invii per un modulo (include modulo, domande, risposte) |
| POST | `/` | JWT | — | Invia le risposte al modulo (gestisce moduli riservati/non riservati, invia notifiche email). Quando il modulo ha `autoCreatePerson`, trova o crea una persona Guest tramite email e collega l'invio; quando sono impostati `followUpSubject`/`followUpBody`, invia un'email di follow-up basata su modello al mittente |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Elimina un invio e le sue risposte |

## Questions

Percorso base: `/membership/questions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Accesso al modulo | Elenca le domande per un modulo. Richiede `?formId=` |
| GET | `/:id` | JWT | Accesso al modulo | Ottiene una domanda per ID |
| GET | `/unrestricted?formId=` | JWT | — | Ottiene le domande per un modulo non riservato |
| GET | `/sort/:id/up` | JWT | — | Sposta una domanda in su nell'ordinamento |
| GET | `/sort/:id/down` | JWT | — | Sposta una domanda in giù nell'ordinamento |
| POST | `/` | JWT | Accesso al modulo | Crea o aggiorna domande (assegna automaticamente l'ordine di ordinamento) |
| DELETE | `/:id?formId=` | JWT | Accesso al modulo | Elimina una domanda |

## Answers

Percorso base: `/membership/answers`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca le risposte. Filtra con `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o aggiorna risposte |

## Member Permissions

Percorso base: `/membership/memberpermissions`

Controlla l'accesso per membro a moduli specifici.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Accesso al modulo | Ottiene un permesso membro per ID |
| GET | `/member/:id` | JWT | Accesso al modulo | Ottiene tutti i permessi sui moduli per un membro |
| GET | `/form/:id` | JWT | Accesso al modulo | Ottiene tutti i permessi membro per un modulo |
| GET | `/form/:id/my` | JWT | Accesso al modulo | Ottiene il permesso dell'utente corrente per un modulo |
| POST | `/` | JWT | Accesso al modulo | Crea o aggiorna permessi membro |
| DELETE | `/:id?formId=` | JWT | Accesso al modulo | Elimina un permesso membro |
| DELETE | `/member/:id?formId=` | JWT | Accesso al modulo | Elimina tutti i permessi di un membro su un modulo |

## Settings

Percorso base: `/membership/settings`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Ottiene tutte le impostazioni della chiesa |
| GET | `/public/:churchId` | Public | — | Ottiene le impostazioni pubbliche di una chiesa |
| POST | `/` | JWT | Settings.Edit | Salva le impostazioni (supporta il caricamento di immagini in base64) |

## Domains

Percorso base: `/membership/domains`

Estende il CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i domini |
| GET | `/:id` | JWT | — | Ottiene un dominio per ID |
| GET | `/lookup/:domainName` | JWT | — | Cerca un dominio per nome |
| GET | `/public/lookup/:domainName` | Public | — | Ricerca pubblica di un dominio per nome |
| GET | `/health/check` | Public | — | Esegue un controllo di stato sui domini non verificati |
| POST | `/` | JWT | Settings.Edit | Crea o aggiorna domini (attiva l'aggiornamento di Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Elimina un dominio |

## User Church

Percorso base: `/membership/userchurch`

Gestisce l'associazione tra utenti e chiese.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Ottiene il record utente-chiesa tramite ID utente |
| GET | `/personid/:personId` | JWT | — | Ottiene l'email per l'utente collegato a una persona |
| GET | `/user/:userId` | JWT | Server.Admin | Carica tutte le chiese di un utente |
| POST | `/` | JWT | — | Crea un'associazione utente-chiesa |
| PATCH | `/:userId` | JWT | — | Aggiorna l'ora dell'ultimo accesso e registra l'accesso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Elimina un record utente-chiesa |

## Visibility Preferences

Percorso base: `/membership/visibilityPreferences`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Ottiene le preferenze di visibilità dell'utente corrente |
| POST | `/` | JWT | — | Salva le preferenze di visibilità (visibilità di indirizzo, telefono, email) |

## Query

Percorso base: `/membership/query`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Ricerca membri in linguaggio naturale tramite IA. Corpo: `{ text, subDomain, siteUrl }` |

## Client Errors

Percorso base: `/membership/clientErrors`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Registra un errore lato client |

## Pagine correlate

- [Autenticazione e permessi](./authentication) — Flusso di login, JWT, OAuth, modello dei permessi
- [Endpoint Attendance](./attendance) — Tracciamento di servizi e visite
- [Struttura dei moduli](../module-structure) — Pattern di organizzazione del codice
