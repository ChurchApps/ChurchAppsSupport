---
title: "Endpoint Membership"
---

# Endpoint Membership

<div class="article-intro">

Il modulo Membership gestisce le persone, le chiese, i gruppi, i nuclei familiari, i ruoli, i permessi, i moduli e le impostazioni. È il modulo più grande e fornisce il livello di identità e autorizzazione principale per tutti gli altri moduli.

</div>

**Percorso base:** `/membership`

## Persone

Percorso base: `/membership/people`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | People.View o Membro | Elenca tutte le persone per la chiesa |
| GET | `/:id` | JWT | People.View o proprio record | Ottieni una persona per ID (include le sottomissioni dei moduli) |
| GET | `/ids?ids=` | JWT | People.View o Membro | Ottieni più persone per ID separati da virgola |
| GET | `/basic?ids=` | JWT | — | Ottieni informazioni base (solo nome) per più persone |
| GET | `/recent` | JWT | People.View o Membro | Persone aggiunte di recente |
| GET | `/search?term=&email=` | JWT | People.View o Membro | Cerca persone per nome o email |
| GET | `/search/phone?number=` | JWT | People.View o Membro | Cerca per numero di telefono |
| GET | `/search/group?groupId=` | JWT | People.View o Membro | Ottieni le persone in un gruppo specifico |
| GET | `/household/:householdId` | JWT | — | Ottieni tutte le persone in un nucleo familiare |
| GET | `/attendance` | JWT | People.Edit | Carica i partecipanti con filtri (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carica i dati della timeline per persone e gruppi |
| GET | `/directory/:id` | JWT | — | Ottieni una persona per la vista directory (rispetta le preferenze di visibilità) |
| GET | `/claim/:churchId` | JWT | — | Reclama un record persona per l'utente corrente in una chiesa |
| POST | `/` | JWT | People.Edit o EditSelf | Crea o aggiorna persone (batch) |
| POST | `/search` | JWT | People.View o Membro | Cerca persone (variante POST) |
| POST | `/advancedSearch` | JWT | People.View o Membro | Ricerca multi-condizione (età, mese di nascita, stato di appartenenza, ecc.) |
| POST | `/loadOrCreate` | Pubblico | — | Trova o crea una persona per email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Aggiorna le assegnazioni dei membri del nucleo familiare |
| POST | `/public/email` | Pubblico | — | Invia un'email a una persona. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interno | — | Carica le email delle persone per ID (server-to-server, richiede jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Elimina una persona |

### Esempio: Cerca Persone

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

### Esempio: Crea una Persona

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Utenti

Percorso base: `/membership/users`

Vedi [Autenticazione e Permessi](./authentication) per gli endpoint di login, registrazione e gestione password.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| POST | `/login` | Pubblico | — | Accedi (email/password, aggiornamento JWT o authGuid) |
| POST | `/register` | Pubblico | — | Registra un nuovo utente |
| POST | `/forgot` | Pubblico | — | Invia l'email di reimpostazione password |
| POST | `/setPasswordGuid` | Pubblico | — | Imposta la password utilizzando il GUID di autenticazione dal link email |
| POST | `/verifyCredentials` | Pubblico | — | Verifica email/password e restituisce le chiese associate |
| POST | `/loadOrCreate` | JWT | — | Trova o crea un utente per email/userId |
| POST | `/setDisplayName` | JWT | — | Aggiorna nome e cognome dell'utente |
| POST | `/updateEmail` | JWT | — | Cambia l'indirizzo email dell'utente |
| POST | `/updatePassword` | JWT | — | Cambia la password dell'utente (minimo 6 caratteri) |
| POST | `/updateOptedOut` | JWT | — | Imposta lo stato di rinuncia di una persona |
| GET | `/search?term=` | JWT | Server.Admin | Cerca tutti gli utenti per nome/email |
| DELETE | `/` | JWT | — | Elimina l'account dell'utente corrente |

## Chiese

Percorso base: `/membership/churches`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Carica tutte le chiese per l'utente corrente |
| GET | `/:id` | JWT | — | Ottieni una chiesa per ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Ottieni l'utente amministratore del dominio per una chiesa |
| GET | `/:id/impersonate` | JWT | Server.Admin | Impersona una chiesa (solo amministratore server) |
| GET | `/all?term=` | JWT | Server.Admin | Cerca tutte le chiese (admin) |
| GET | `/search/?name=` | Pubblico | — | Cerca chiese per nome |
| GET | `/lookup/?subDomain=&id=` | Pubblico | — | Cerca una chiesa per sottodominio o ID |
| POST | `/` | JWT | Settings.Edit | Aggiorna i dettagli della chiesa |
| POST | `/add` | JWT | — | Registra una nuova chiesa. Campi obbligatori: name, address1, city, state, zip, country |
| POST | `/search` | Pubblico | — | Cerca chiese per nome (variante POST) |
| POST | `/select` | JWT | — | Seleziona/cambia chiesa. Body: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archivia o ripristina una chiesa |
| POST | `/byIds` | Pubblico | — | Carica più chiese per ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Elimina le chiese abbandonate da più di 7 giorni |

## Gruppi

Percorso base: `/membership/groups`

Estende il CRUD standard (GET `/`, GET `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i gruppi |
| GET | `/:id` | JWT | — | Ottieni un gruppo per ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Cerca gruppi per filtri di servizio |
| GET | `/my` | JWT | — | Ottieni i gruppi per l'utente corrente |
| GET | `/my/:tag` | JWT | — | Ottieni i gruppi dell'utente corrente filtrati per tag |
| GET | `/tag/:tag` | JWT | — | Ottieni tutti i gruppi con un tag specifico |
| GET | `/public/:churchId/:id` | Pubblico | — | Ottieni un gruppo pubblico per chiesa e ID |
| GET | `/public/:churchId/tag/:tag` | Pubblico | — | Ottieni i gruppi pubblici per tag |
| GET | `/public/:churchId/label?label=` | Pubblico | — | Ottieni i gruppi pubblici per etichetta |
| GET | `/public/:churchId/slug/:slug` | Pubblico | — | Ottieni un gruppo pubblico per slug |
| POST | `/` | JWT | Groups.Edit | Crea o aggiorna gruppi (genera automaticamente lo slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Elimina un gruppo (elimina anche i team figlio per i gruppi ministeriali) |

## Membri del Gruppo

Percorso base: `/membership/groupmembers`

Estende il CRUD standard (GET `/:id`, DELETE `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Ottieni un membro del gruppo per ID |
| GET | `/` | JWT | GroupMembers.View* | Elenca i membri del gruppo. Filtra per `?groupId=`, `?groupIds=`, o `?personId=`. *Consentito anche se l'utente è nel gruppo o richiede il proprio personId |
| GET | `/my` | JWT | — | Ottieni le appartenenze ai gruppi dell'utente corrente |
| GET | `/basic/:groupId` | JWT | — | Ottieni la lista base dei membri per un gruppo |
| GET | `/public/leaders/:churchId/:groupId` | Pubblico | — | Ottieni i leader del gruppo (pubblico) |
| POST | `/` | JWT | GroupMembers.Edit | Aggiungi o aggiorna i membri del gruppo |
| DELETE | `/:id` | JWT | GroupMembers.View | Rimuovi un membro del gruppo |

## Nuclei Familiari

Percorso base: `/membership/households`

Controller CRUD standard.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i nuclei familiari |
| GET | `/:id` | JWT | — | Ottieni un nucleo familiare per ID |
| POST | `/` | JWT | People.Edit | Crea o aggiorna nuclei familiari |
| DELETE | `/:id` | JWT | People.Edit | Elimina un nucleo familiare |

## Ruoli

Percorso base: `/membership/roles`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | Roles.View | Ottieni un ruolo per ID |
| GET | `/church/:churchId` | JWT | Roles.View | Ottieni tutti i ruoli per una chiesa |
| POST | `/` | JWT | Roles.Edit | Crea o aggiorna ruoli |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un ruolo (rimuove anche i suoi permessi e membri) |

## Membri del Ruolo

Percorso base: `/membership/rolemembers`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ottieni i membri per un ruolo. Aggiungi `?include=users` per includere i dettagli utente |
| POST | `/` | JWT | Roles.Edit | Aggiungi membri a un ruolo (crea l'utente se l'email non esiste) |
| DELETE | `/:id` | JWT | Roles.View | Rimuovi un membro del ruolo |
| DELETE | `/self/:churchId/:userId` | JWT | — | Rimuovi te stesso da una chiesa |

## Permessi del Ruolo

Percorso base: `/membership/rolepermissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ottieni i permessi per un ruolo (usa `null` come ID per il ruolo "Tutti") |
| POST | `/` | JWT | Roles.Edit | Crea o aggiorna i permessi del ruolo |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un permesso del ruolo |

## Permessi

Percorso base: `/membership/permissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Ottieni la lista completa dei permessi disponibili |

## Moduli

Percorso base: `/membership/forms`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca tutti i moduli (l'admin vede tutto; gli editor vedono quelli assegnati + moduli non-membro) |
| GET | `/:id` | JWT | Accesso al modulo | Ottieni un modulo per ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Elenca i moduli archiviati |
| GET | `/standalone/:id?churchId=` | JWT | — | Ottieni un modulo autonomo (i moduli con restrizioni richiedono autenticazione) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o aggiorna moduli |
| DELETE | `/:id` | JWT | Accesso al modulo | Elimina un modulo |

## Sottomissioni dei Moduli

Percorso base: `/membership/formsubmissions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca le sottomissioni. Filtra per `?personId=` o `?formId=` |
| GET | `/:id` | JWT | Forms.Admin o Forms.Edit | Ottieni una sottomissione per ID. Aggiungi `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Accesso al modulo | Ottieni tutte le sottomissioni per un modulo (include modulo, domande, risposte) |
| POST | `/` | JWT | — | Invia le risposte del modulo (gestisce moduli con e senza restrizioni, invia notifiche email) |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Elimina una sottomissione e le sue risposte |

## Domande

Percorso base: `/membership/questions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Accesso al modulo | Elenca le domande per un modulo. Richiede `?formId=` |
| GET | `/:id` | JWT | Accesso al modulo | Ottieni una domanda per ID |
| GET | `/unrestricted?formId=` | JWT | — | Ottieni le domande per un modulo senza restrizioni |
| GET | `/sort/:id/up` | JWT | — | Sposta una domanda in alto nell'ordine |
| GET | `/sort/:id/down` | JWT | — | Sposta una domanda in basso nell'ordine |
| POST | `/` | JWT | Accesso al modulo | Crea o aggiorna domande (assegna automaticamente l'ordine) |
| DELETE | `/:id?formId=` | JWT | Accesso al modulo | Elimina una domanda |

## Risposte

Percorso base: `/membership/answers`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Elenca le risposte. Filtra per `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o aggiorna risposte |

## Permessi dei Membri

Percorso base: `/membership/memberpermissions`

Controlla l'accesso per membro a moduli specifici.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | Accesso al modulo | Ottieni un permesso membro per ID |
| GET | `/member/:id` | JWT | Accesso al modulo | Ottieni tutti i permessi modulo per un membro |
| GET | `/form/:id` | JWT | Accesso al modulo | Ottieni tutti i permessi membro per un modulo |
| GET | `/form/:id/my` | JWT | Accesso al modulo | Ottieni il permesso dell'utente corrente per un modulo |
| POST | `/` | JWT | Accesso al modulo | Crea o aggiorna permessi dei membri |
| DELETE | `/:id?formId=` | JWT | Accesso al modulo | Elimina un permesso membro |
| DELETE | `/member/:id?formId=` | JWT | Accesso al modulo | Elimina tutti i permessi per un membro su un modulo |

## Impostazioni

Percorso base: `/membership/settings`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Settings.Edit | Ottieni tutte le impostazioni per la chiesa |
| GET | `/public/:churchId` | Pubblico | — | Ottieni le impostazioni pubbliche per una chiesa |
| POST | `/` | JWT | Settings.Edit | Salva le impostazioni (supporta caricamento immagini in base64) |

## Domini

Percorso base: `/membership/domains`

Estende il CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` dalla classe base).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i domini |
| GET | `/:id` | JWT | — | Ottieni un dominio per ID |
| GET | `/lookup/:domainName` | JWT | — | Cerca un dominio per nome |
| GET | `/public/lookup/:domainName` | Pubblico | — | Ricerca pubblica del dominio per nome |
| GET | `/health/check` | Pubblico | — | Esegui il controllo di salute sui domini non verificati |
| POST | `/` | JWT | Settings.Edit | Crea o aggiorna domini (attiva l'aggiornamento Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Elimina un dominio |

## Utente Chiesa

Percorso base: `/membership/userchurch`

Gestisce l'associazione tra utenti e chiese.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/userid/:userId` | JWT | — | Ottieni il record utente-chiesa per ID utente |
| GET | `/personid/:personId` | JWT | — | Ottieni l'email per l'utente collegato di una persona |
| GET | `/user/:userId` | JWT | Server.Admin | Carica tutte le chiese per un utente |
| POST | `/` | JWT | — | Crea un'associazione utente-chiesa |
| PATCH | `/:userId` | JWT | — | Aggiorna l'ora dell'ultimo accesso e registra l'accesso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Elimina un record utente-chiesa |

## Preferenze di Visibilità

Percorso base: `/membership/visibilityPreferences`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/my` | JWT | — | Ottieni le preferenze di visibilità dell'utente corrente |
| POST | `/` | JWT | — | Salva le preferenze di visibilità (visibilità indirizzo, telefono, email) |

## Query

Percorso base: `/membership/query`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| POST | `/members` | JWT | — | Ricerca membri in linguaggio naturale tramite IA. Body: `{ text, subDomain, siteUrl }` |

## Errori Client

Percorso base: `/membership/clientErrors`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| POST | `/` | JWT | — | Registra un errore lato client |

## Pagine Correlate

- [Autenticazione e Permessi](./authentication) — Flusso di login, JWT, OAuth, modello dei permessi
- [Endpoint Attendance](./attendance) — Tracciamento servizi e visite
- [Struttura dei Moduli](../module-structure) — Pattern di organizzazione del codice
