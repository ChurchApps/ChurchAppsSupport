---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) gestisce lo screening dei background per il personale e i volontari — un'esigenza quasi universale per qualsiasi chiesa che gestisce un programma per bambini o giovani. Checkr non ha un'app Zapier, ma [l'integrazione Checkr di Make.com](https://www.make.com/en/integrations/checkr) è verificata ed espone le azioni di cui hai bisogno per avviare un controllo da un evento B1.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Checkr](https://checkr.com) con accesso API e almeno un pacchetto di screening configurato
- Un account [Make](https://www.make.com)
- Un utente B1Admin con autorizzazione **Modifica impostazioni**

</div>

## Cosa puoi collegare

L'app Checkr di Make espone 1 trigger e 6 azioni:

| Direzione | Trigger B1 / Make | Azione |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrato in un gruppo di volontari) | Checkr: Crea candidato → Crea invito verifica background |
| Checkr → B1 | Webhook Checkr (evento invito / report) | B1: Aggiorna il record della persona (ad es. tag "Checkr cancellato") |

Azioni Checkr di Make: Crea candidato, Crea invito verifica background, Ottieni candidato, Ottieni report, Ottieni ETA del report, Ottieni un invito. Più 4 moduli di ricerca.

## Configurazione

### 1. Crea una chiave API B1

**Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**:

- `settings:write` — per il webhook del trigger
- `people:read` — per cercare il nome e l'email della persona quando si avvia un controllo
- (Facoltativo) `people:write` se desideri scrivere lo stato del report come campo personalizzato o tag

### 2. Costruisci lo scenario "avvia un controllo all'iscrizione come volontario" in Make

1. **Trigger** — B1.church: Monitora eventi (`group.member.added`).
2. **Filtro** — continua solo se `data.groupId` corrisponde al tuo gruppo "Volontari bambini" (o equivalente).
3. **Azione** — B1.church: Trova persona (per `data.personId`) per ottenere email + nome/cognome.
4. **Azione** — Checkr: Crea candidato. Mappa nome/cognome/email dal passaggio 3.
5. **Azione** — Checkr: Crea invito verifica background. Mappa il nuovo id candidato dal passaggio 4 al campo *candidate_id*. Scegli il pacchetto di screening (ad es. `tasker_standard` o qualsiasi cosa esponga il tuo account).
6. (Facoltativo) **Azione** — Slack: notifica al tuo coordinatore di sicurezza che un controllo è stato avviato.

Attiva lo scenario. I nuovi volontari nel gruppo di destinazione ricevono automaticamente un invito Checkr via email; lo completano sul loro telefono o laptop; Checkr esegue lo screening.

### 3. (Facoltativo) Ricevi il report indietro

1. **Trigger** — Checkr: Monitora eventi (webhook). Make registra un webhook Checkr all'attivazione.
2. **Filtro** — continua solo se `event_type = report.completed`.
3. **Azione** — Checkr: Ottieni report (usa l'id del report dal webhook).
4. **Azione** — B1.church: Trova persona (per email candidato).
5. **Azione** — Slack / Email condizionale: notifica al coordinatore con lo stato `clear` / `consider` / `suspended`.

Nota: B1 non ha oggi un campo "background-check status" integrato. Le opzioni pragmatiche sono (a) pubblica il risultato a un canale Slack privato per la revisione, (b) scrivilo su un Google Sheet per il controllo, oppure (c) aggiungi la persona a un gruppo B1 "Volontari cancellati" su `clear`.

## Ricette comuni

### Ri-seleziona i volontari ogni 2 anni

Abbina quanto sopra con un trigger di programmazione Make:

- **Trigger** — Make: Programma (mensile)
- **Azione** — B1.church: Elenca i membri del gruppo per "Volontari cancellati"
- **Azione** — Filtro per Make: data di cancellazione più vecchia di 22 mesi
- **Azione** — Checkr: Crea invito verifica background (stessa cosa del flusso iniziale)

### Blocca l'accesso alla fase 1 fino al completamento del controllo

Se la tua chiesa usa l'iscrizione al gruppo B1 per controllare l'accesso (ad es. solo i membri del gruppo "Cancellato" appaiono nei programmi di servizio), mantieni i nuovi volontari in un gruppo di attesa fino a quando l'evento `report.completed` di Checkr non li ribalta.

## Limiti e note

- **Checkr è solo US** per la maggior parte dei pacchetti di screening. Chiese australiane, britanniche e canadesi avranno bisogno di un'alternativa.
- **Prezzi** per controllo — ogni Create Invitation in Make consuma un controllo reale. Prova prima nell'account sandbox / staging di Checkr (l'app Checkr di Make rispetta le credenziali che passi nella connessione, quindi il cambio delle credenziali passa da sandbox/live).
- **L'accesso API di Checkr è gated per piano.** Account Checkr più piccoli potrebbero essere su un livello solo UI; contatta Checkr per abilitare l'API.

## Risoluzione dei problemi

- **Create Candidate non riesce con `403`** — il token API di Checkr è di sola lettura o manca dei permessi di account corretti. Ri-emetti dal dashboard di Checkr con scope di scrittura.
- **L'invito non arriva mai** — controlla l'email del candidato nel passaggio 3; B1 potrebbe avere un campo email vuoto per quella persona. Aggiungi un filtro obbligatorio email prima del passaggio Checkr.
- **Il trigger webhook non si attiva** — la registrazione del webhook di Checkr a volte non riesce silenziosamente se il tuo account Make non è su un livello a pagamento che supporta webhook in uscita. Verifica nella pagina Webhook del dashboard di Checkr che l'URL di Make sia elencato.

## Vedi anche

- [Make (panoramica)](../make) — lato B1 di ogni scenario Make
- [Mobile Message](./mobile-message) — per i provider SMS senza app Zapier, stesso pattern Webhook/HTTP del collegamento Checkr Make
- [Documentazione API Checkr](https://docs.checkr.com/)
