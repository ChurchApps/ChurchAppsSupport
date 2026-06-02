---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Attiva un messaggio di testo [Clearstream](https://clearstream.io) da qualsiasi evento B1 — nuova persona, nuovo regalo, invio del modulo, aggiornamento del calendario — e tira le risposte indietro come record B1. L'app Zapier di Clearstream espone entrambe le direzioni, quindi il collegamento intero è una ricetta e non codice personalizzato.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Clearstream](https://clearstream.io) con almeno un elenco e un'indennità SMS
- Un account [Zapier](https://zapier.com)
- Un utente B1Admin con autorizzazione **Modifica impostazioni**

</div>

## Cosa puoi collegare

| Direzione | Trigger | Azione |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Crea/aggiorna sottoscrittore + Invia testo al numero |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Invia testo all'elenco (ad es. notifica il team finanziario) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Invia testo a un elenco di routing (ad es. team richieste di preghiera) |
| Clearstream → B1 | Nuovo testo in arrivo | B1: Crea persona; tag con la parola chiave che hanno digitato |

Azioni Zapier di Clearstream: *Invia testo al numero*, *Invia testo all'elenco*, *Crea/aggiorna sottoscrittore*, *Aggiungi sottoscrittore al flusso di lavoro automatizzato*, *Aggiungi tag a sottoscrittore*, *Rimuovi sottoscrittore dall'elenco*.

## Configurazione

### 1. Crea una chiave API B1

**Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**:

- `settings:write` — richiesto per B1 per registrare il webhook del trigger
- `people:read` — necessario per cercare la persona dall'evento (`personId` → nome/telefono/email)
- (Facoltativo) `people:write` se le risposte di Clearstream dovrebbero creare contatti B1

### 2. Costruisci lo "Zap di testo su nuovo regalo"

1. **Trigger** — B1.church: Nuova donazione
2. **Azione** — B1.church: Trova persona (il `personId` della donazione)
3. **Azione** — Clearstream: Invia testo al numero. Usa il telefono della persona dal passaggio 2 come destinatario, componi il messaggio (`"Grazie per il tuo regalo, {first}! …"`).

Attiva lo Zap. B1 registra il webhook della donazione all'attivazione; vedrai `Zapier — donation.created` apparire in **Impostazioni → Sviluppatore → Webhook**.

### 3. (Facoltativo) Tira le risposte indietro come record B1

1. **Trigger** — Clearstream: Nuovo testo in arrivo
2. **Azione** — Filtro per Zapier sulla parola chiave — ad es. continua solo se il corpo del testo inizia con `PRAY`
3. **Azione** — B1.church: Trova persona (per telefono)
4. **Azione** — Filtro / Percorso — se non trovato, creali; in entrambi i casi, archivia il corpo del testo da qualche parte (Slack, Google Sheet, o un invio di modulo B1 tramite Webhook per Zapier).

## Ricette comuni

### Paging del team di volontari

- **Trigger** — B1.church: Nuovo invio di modulo (filtrato sull'id del modulo di richiesta di preghiera)
- **Azione** — Clearstream: Invia testo all'elenco, dove l'elenco è il tuo team pastorale in servizio. Componi il corpo come `Nuova richiesta di preghiera: {data.questions.0.answer}`.

### Sequenza di follow-up per visitatori per la prima volta

- **Trigger** — B1.church: Nuova persona, filtrata su un tag di persona B1 di "Visitatore per la prima volta"
- **Azione** — Clearstream: Aggiungi sottoscrittore al flusso di lavoro automatizzato. Mappa l'id del flusso di lavoro su una goccia di testo pre-costruita di 7 giorni.

### Adesione al gruppo guidata da parola chiave

- **Trigger** — Clearstream: Nuovo testo in arrivo (filtro alla parola chiave `MENS`)
- **Azione** — B1.church: Trova persona (per telefono); biforca se non trovato → Crea persona
- **Azione** — B1.church: Aggiungi membro del gruppo al gruppo del ministero maschile

## Limiti e note

- **Clearstream misura SMS per messaggio.** Ogni azione Invia testo consuma uno o più crediti a seconda della lunghezza e del numero di destinatari — controlla l'indennità del tuo piano.
- **Il telefono deve essere in formato E.164** (ad es. `+15555550199`) per *Invia testo al numero*. Il record della persona B1 memorizza tutto ciò che è stato inserito; usa un passaggio *Formatter per Zapier — Numeri → Formatta numero di telefono* se non puoi garantire il formato.
- **Nessuna intestazione è richiesta dal lato B1** — l'autenticazione di Clearstream vive interamente nella sua connessione Zapier.

## Risoluzione dei problemi

- **Trigger non si attiva mai** — `Impostazioni → Sviluppatore → Webhook` dovrebbe mostrare una riga `Zapier — <evento>` dopo l'attivazione dello Zap. Se no, la chiave API B1 manca `settings:write`. Ri-crea e ri-collega.
- **Clearstream restituisce "Numero di telefono non valido"** — il campo destinatario non è in formato E.164. Aggiungi un passaggio Formatta numero di telefono.
- **Invia testo all'elenco non riesce con `403`** — l'utente API di Clearstream manca di autorizzazione per quell'elenco, oppure l'id dell'elenco è sbagliato. Gli id degli elenchi sono visibili sulla pagina dei dettagli dell'elenco di Clearstream.

## Vedi anche

- [Text In Church](./text-in-church) — piattaforma SMS alternativa, forma di collegamento simile
- [Mobile Message](./mobile-message) — per le chiese al di fuori degli Stati Uniti
- [Zapier (panoramica)](../zapier) — lato B1 di ogni ricetta Zapier
- [Documentazione API Clearstream](https://api-docs.clearstream.io/) — per integrazioni personalizzate oltre l'app Zapier
