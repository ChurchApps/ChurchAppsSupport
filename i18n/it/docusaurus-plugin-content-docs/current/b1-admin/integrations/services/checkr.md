---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) esegue lo screening di sfondo per il personale e i volontari -- un'esigenza quasi universale per qualsiasi chiesa che gestisce un programma per bambini o giovani. B1 **non ha una funzione integrata di controllo di sfondo** -- l'ordinazione dei controlli, il tracciamento dei risultati e la conformità dello screening risiedono tutti in Checkr; la ricetta di seguito collega solo gli eventi B1 ad esso. Checkr non ha un'app Zapier, ma [l'integrazione Checkr di Make.com](https://www.make.com/en/integrations/checkr) è verificata ed espone le azioni di cui hai bisogno per avviare un controllo da un evento B1.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Checkr](https://checkr.com) con accesso API e almeno un pacchetto di screening configurato
- Un account [Make](https://www.make.com)
- Un utente B1Admin con autorizzazione **Modifica impostazioni**

</div>

## Cosa puoi collegare

L'app Checkr di Make espone 1 trigger e 6 azioni:

| Direzione | B1 / Make trigger | Azione |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrato a un gruppo di volontari) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook (evento di invito / report) | B1: Aggiorna il record della persona (ad es. tag "Checkr cleared") |

Azioni Checkr di Make: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. Più 4 moduli di ricerca.

## Configurazione

### 1. Crea una chiave API B1

**Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**:

- `settings:write` — per il webhook trigger
- `people:read` — per cercare il nome/email della persona quando si avvia un controllo
- (Opzionale) `people:write` se vuoi scrivere lo stato del report come campo personalizzato o tag

### 2. Costruisci lo scenario "avvia un controllo al momento dell'iscrizione del volontario" in Make

1. **Trigger** — B1.church: Watch Events (`group.member.added`).
2. **Filtro** — continua solo se `data.groupId` corrisponde al tuo gruppo "Children's Volunteers" (o equivalente).
3. **Azione** — B1.church: Find Person (per `data.personId`) per ottenere email + nome/cognome.
4. **Azione** — Checkr: Create Candidate. Mappa il primo/cognome/email dal passaggio 3.
5. **Azione** — Checkr: Create Background Check Invitation. Mappa il nuovo id candidato dal passaggio 4 al campo *candidate_id*. Scegli il pacchetto di screening (ad es. `tasker_standard` o qualunque il tuo account esponga).
6. (Opzionale) **Azione** — Slack: notifica al tuo coordinatore del ministero sicuro che un controllo è stato avviato.

Attiva lo scenario. I nuovi volontari nel gruppo mirato ricevono un invito Checkr automatico per email; lo completano sul loro telefono o laptop; Checkr esegue lo screening.

### 3. (Opzionale) Ricevi il report indietro

1. **Trigger** — Checkr: Watch Events (webhook). Make registra un webhook Checkr all'attivazione.
2. **Filtro** — continua solo se `event_type = report.completed`.
3. **Azione** — Checkr: Get Report (usa l'id del report dal webhook).
4. **Azione** — B1.church: Find Person (per email candidato).
5. **Azione** — Slack / Email condizionale: notifica il coordinatore con lo stato `clear` / `consider` / `suspended`.

Nota: B1 non ha un campo integrato "stato di controllo di sfondo" oggi. Le opzioni pratiche sono (a) pubblicare il risultato su un canale Slack privato per la revisione, (b) scriverlo in un Google Sheet per l'audit, oppure (c) aggiungere la persona a un gruppo B1 "Cleared volunteers" su `clear`.

## Ricette comuni

### Re-screen dei volontari ogni 2 anni

Coppia di quanto sopra con un trigger di programma Make:

- **Trigger** — Make: Schedule (mensile)
- **Azione** — B1.church: List Group Members per "Cleared volunteers"
- **Azione** — Filtra per Make: data cleared più vecchia di 22 mesi
- **Azione** — Checkr: Create Background Check Invitation (come il flusso iniziale)

### Blocca l'accesso della fase 1 fino al completamento del controllo

Se la tua chiesa usa l'iscrizione al gruppo B1 per controllare l'accesso (ad es. solo i membri del gruppo "Cleared" appaiono negli orari di servizio), mantieni i nuovi volontari in un gruppo di attesa fino a quando l'evento Checkr `report.completed` non li fa passare.

## Limiti e note

- **Checkr è solo USA** per la maggior parte dei pacchetti di screening. Le chiese australiane, britanniche e canadesi avranno bisogno di un'alternativa.
- **Prezzo** è per controllo — ogni Create Invitation in Make consuma un vero controllo. Testa prima nell'account di sandbox / staging di Checkr (l'app Checkr di Make rispetta le credenziali che passi nella connessione, quindi il cambio delle credenziali cambia sandbox/live).
- **L'accesso API Checkr è controllato dal piano.** Account Checkr più piccoli possono essere su un livello solo UI; contatta Checkr per abilitare API.

## Risoluzione dei problemi

- **Create Candidate ha esito negativo con `403`** — il token API Checkr è di sola lettura o manca delle giuste autorizzazioni di account. Riemettilo dal dashboard Checkr con ambito di scrittura.
- **L'invito non arriva mai** — controlla l'email del candidato nel passaggio 3; B1 potrebbe avere un campo email vuoto per quella persona. Aggiungi un filtro email-required prima del passaggio Checkr.
- **Il trigger webhook non si attiva** — la registrazione del webhook di Checkr a volte fallisce silenziosamente se il tuo account Make non è su un livello a pagamento che supporta i webhook in uscita. Verifica nella pagina *Webhooks* del dashboard di Checkr che l'URL di Make sia elencato.

## Vedi anche

- [Make (overview)](../make) — lato B1 di ogni scenario Make
- [Mobile Message](./mobile-message) — per i provider SMS senza app Zapier, lo stesso pattern Webhooks/HTTP di Checkr Make wiring
- [Checkr API docs](https://docs.checkr.com/)
