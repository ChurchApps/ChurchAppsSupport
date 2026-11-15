---
title: "Clearstream"
description: "Collega Clearstream SMS a B1 Admin tramite Zapier: invia SMS per nuove donazioni o moduli compilati e riporta le risposte in arrivo come persone."
---

# Clearstream

<div class="article-intro">

Attiva un messaggio di testo [Clearstream](https://clearstream.io) a partire da qualsiasi evento di B1 (nuova persona, nuova donazione, modulo compilato, aggiornamento del calendario) e riporta le risposte come record di B1. L'app Zapier di Clearstream gestisce entrambe le direzioni, quindi l'intera configurazione è una ricetta e non richiede codice personalizzato.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Clearstream](https://clearstream.io) con almeno una lista e un credito di SMS
- Un account [Zapier](https://zapier.com)
- Un utente B1Admin con il permesso **Modifica impostazioni**

</div>

## Cosa puoi collegare {#what-you-can-wire-up}

| Direzione | Trigger | Azione |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Crea/Aggiorna iscritto + Invia SMS a numero |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Invia SMS a lista (ad esempio, per avvisare il team amministrativo) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Invia SMS a una lista di smistamento (ad esempio, il team delle richieste di preghiera) |
| Clearstream → B1 | Nuovo SMS in arrivo | B1: Crea persona; applica un'etichetta con la parola chiave inviata |

Le azioni Zapier di Clearstream sono: *Invia SMS a numero*, *Invia SMS a lista*, *Crea/Aggiorna iscritto*, *Aggiungi iscritto a flusso automatico*, *Aggiungi etichetta a iscritto*, *Rimuovi iscritto da lista*.

## Configurazione {#setup}

### 1. Crea una chiave API B1 {#1-mint-a-b1-api-key}

**Impostazioni → Sviluppatori → Chiavi API → Nuova chiave API**:

- `settings:write`: necessario per collegare la chiave a Zapier e per permettere a B1 di registrare il webhook del trigger
- `people:read`: necessario per recuperare la persona dall'evento (`personId` → nome/telefono/email)
- (Facoltativo) `people:write` se le risposte di Clearstream devono creare contatti in B1

### 2. Crea lo Zap "invia SMS per nuova donazione" {#2-build-the-text-on-new-gift-zap}

1. **Trigger**: B1.church: Nuova donazione
2. **Azione**: B1.church: Trova persona (il `personId` della donazione)
3. **Azione**: Clearstream: Invia SMS a numero. Usa il telefono della persona dal passaggio 2 come destinatario e componi il messaggio (`"Thanks for your gift, {first}! …"`).

Attiva lo Zap. B1 registra il webhook delle donazioni all'attivazione; vedrai comparire `Zapier — donation.created` in **Impostazioni → Sviluppatori → Webhook**.

### 3. (Facoltativo) Riporta le risposte come record di B1 {#3-optional-pull-replies-back-as-b1-records}

1. **Trigger**: Clearstream: Nuovo SMS in arrivo
2. **Azione**: Filtro di Zapier sulla parola chiave: ad esempio, continua solo se il testo inizia con `PRAY`
3. **Azione**: salva il testo del messaggio in un posto che il tuo team vedrà (Slack, un Google Sheet o un compito di B1). Il passaggio *Trova persona* di B1 cerca le persone solo per ID, email o nome, non per telefono, quindi abbina la risposta a una persona di B1 a mano (oppure aggiungi una chiamata GET di Webhooks by Zapier all'endpoint `/membership/people/search/phone?number=…` di B1).

## Ricette comuni {#common-recipes}

### Chiamata al team dei volontari {#volunteer-team-paging}

- **Trigger**: B1.church: Nuovo modulo compilato (filtrato sull'ID del modulo di richiesta di preghiera)
- **Azione**: Clearstream: Invia SMS a lista, dove la lista è il tuo team pastorale di turno. Componi il testo come `New prayer request: {data.questions.0.answer}`.

### Sequenza di follow-up per i visitatori alla prima volta {#first-time-visitor-follow-up-sequence}

- **Trigger**: B1.church: Nuova persona, filtrata in base allo stato di membership della persona (ad esempio, *Visitatore*)
- **Azione**: Clearstream: Aggiungi iscritto a flusso automatico. Collega l'ID del flusso a una sequenza preconfigurata di SMS a 7 giorni.

### Iscrizione a un gruppo tramite parola chiave {#keyword-driven-group-join}

- **Trigger**: Clearstream: Nuovo SMS in arrivo (filtrato sulla parola chiave `MENS`)
- **Azione**: B1.church: Crea persona con nome e telefono di chi ha scritto (il passaggio *Trova persona* di B1 non cerca per telefono, quindi controlla i duplicati più tardi in **Persone**)
- **Azione**: B1.church: Aggiungi membro al gruppo (gruppo Ministero degli uomini)

## Limiti e note {#limits--notes}

- **Clearstream conteggia gli SMS per messaggio.** Ogni azione Invia SMS consuma uno o più crediti in base alla lunghezza e al numero di destinatari: controlla il credito incluso nel tuo piano.
- **Il telefono deve essere nel formato E.164** (ad esempio `+15555550199`) per *Invia SMS a numero*. La scheda della persona in B1 memorizza ciò che è stato inserito; usa un passaggio *Formatter by Zapier — Numbers → Format Phone Number* se non puoi garantire il formato.
- **Da parte di B1 non serve alcuna intestazione**: l'autenticazione di Clearstream è interamente gestita dalla sua connessione Zapier.

## Risoluzione dei problemi {#troubleshooting}

- **Il trigger non si attiva mai**: `Settings → Developer → Webhooks` dovrebbe mostrare una riga `Zapier — <event>` dopo l'attivazione dello Zap. Se non c'è, la chiave API di B1 non ha `settings:write`. Creane una nuova e ricollegala.
- **Clearstream restituisce "Numero di telefono non valido"**: il campo destinatario non è in E.164. Aggiungi un passaggio Format Phone Number.
- **Invia SMS a lista fallisce con `403`**: l'utente API di Clearstream non ha il permesso per quella lista, oppure l'ID della lista è errato. Gli ID delle liste sono visibili nella pagina di dettaglio della lista su Clearstream.

## Vedi anche {#see-also}

- [Text In Church](./text-in-church.md): piattaforma SMS alternativa, con uno schema di collegamento simile
- [Mobile Message](./mobile-message.md): per le chiese fuori dagli Stati Uniti
- [Zapier (panoramica)](../zapier.md): la parte B1 di ogni ricetta Zapier
- [Documentazione API di Clearstream](https://api-docs.clearstream.io/): per integrazioni personalizzate oltre l'app Zapier
