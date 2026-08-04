---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) esegue controlli sui precedenti per staff e volontari — un'esigenza quasi universale per qualsiasi chiesa che gestisce un programma per bambini o giovani. B1 **non ha una funzionalità integrata per i controlli sui precedenti** — ordinare i controlli, tracciare i risultati e verificare la conformità dello screening avvengono tutti in Checkr; la ricetta qui sotto collega solo gli eventi di B1 ad esso. Checkr non ha un'app Zapier, ma [l'integrazione Checkr di Make.com](https://www.make.com/en/integrations/checkr) è verificata ed espone le azioni necessarie per avviare un controllo da un evento B1.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Checkr](https://checkr.com) con accesso API e almeno un pacchetto di screening configurato
- Un account [Make](https://www.make.com)
- Un utente B1Admin con il permesso **Modifica impostazioni**

</div>

## Cosa puoi collegare

L'app Checkr di Make espone 1 trigger e 6 azioni:

| Direzione | Trigger B1 / Make | Azione |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrato su un gruppo di volontari) | Checkr: Crea candidato → Crea invito al controllo dei precedenti |
| Checkr → B1 | Webhook Checkr (evento invito / report) | B1: Aggiorna il record della persona (ad es. tag "Checkr verificato") |

Azioni Checkr di Make: Crea candidato, Crea invito al controllo dei precedenti, Ottieni candidato, Ottieni report, Ottieni tempo stimato del report, Ottieni un invito. Più 4 moduli di ricerca.

## Configurazione

### 1. Genera una chiave API B1

**Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**:

- `settings:write` — per il webhook del trigger
- `people:read` — per recuperare nome/email della persona quando si avvia un controllo
- (Facoltativo) `people:write` se vuoi scrivere lo stato del report come campo personalizzato o tag

### 2. Costruisci lo scenario "avvia un controllo all'iscrizione di un volontario" in Make

1. **Trigger** — B1.church: Osserva eventi (`group.member.added`).
2. **Filtro** — continua solo se `data.groupId` corrisponde al tuo gruppo "Volontari per bambini" (o equivalente).
3. **Azione** — B1.church: Trova persona (tramite `data.personId`) per ottenere email + nome/cognome.
4. **Azione** — Checkr: Crea candidato. Mappa nome/cognome/email dal passaggio 3.
5. **Azione** — Checkr: Crea invito al controllo dei precedenti. Mappa l'id del nuovo candidato dal passaggio 4 nel campo *candidate_id*. Scegli il pacchetto di screening (ad es. `tasker_standard` o quello che il tuo account espone).
6. (Facoltativo) **Azione** — Slack: notifica il tuo coordinatore per la sicurezza del ministero che è stato avviato un controllo.

Attiva lo scenario. I nuovi volontari nel gruppo mirato ricevono automaticamente un invito Checkr via email; lo completano dal telefono o dal laptop; Checkr esegue il controllo.

### 3. (Facoltativo) Ricevi il report di ritorno

1. **Trigger** — Checkr: Osserva eventi (webhook). Make registra un webhook Checkr all'attivazione.
2. **Filtro** — continua solo se `event_type = report.completed`.
3. **Azione** — Checkr: Ottieni report (usa l'id del report dal webhook).
4. **Azione** — B1.church: Trova persona (tramite email del candidato).
5. **Azione** — Slack / Email condizionale: notifica il coordinatore con lo stato `clear` / `consider` / `suspended`.

Nota: B1 oggi non ha un campo integrato di "stato del controllo dei precedenti". Le opzioni pratiche sono (a) pubblicare il risultato in un canale Slack privato per la revisione, (b) scriverlo in un Google Sheet per l'audit, oppure (c) aggiungere la persona a un gruppo B1 "Volontari verificati" quando lo stato è `clear`.

## Ricette comuni

### Riverifica i volontari ogni 2 anni

Abbina quanto sopra a un trigger pianificato di Make:

- **Trigger** — Make: Pianificazione (mensile)
- **Azione** — B1.church: Elenca membri del gruppo per "Volontari verificati"
- **Azione** — Filtra tramite Make: data di verifica precedente a 22 mesi fa
- **Azione** — Checkr: Crea invito al controllo dei precedenti (come nel flusso iniziale)

### Blocca l'accesso allo stage 1 finché il controllo non è completato

Se la tua chiesa usa l'appartenenza a un gruppo B1 per limitare l'accesso (ad es. solo i membri del gruppo "Verificati" appaiono nei piani di servizio), tieni i nuovi volontari in un gruppo di attesa finché l'evento Checkr `report.completed` non li fa passare.

## Limiti e note

- **Checkr è disponibile solo per gli Stati Uniti** per la maggior parte dei pacchetti di screening. Le chiese australiane, del Regno Unito e canadesi avranno bisogno di un'alternativa.
- **Il prezzo è per controllo** — ogni Crea invito in Make consuma un controllo reale. Testa prima nell'account sandbox / staging di Checkr (l'app Checkr di Make rispetta le credenziali che passi nella connessione, quindi cambiare le credenziali passa da sandbox a live).
- **L'accesso API di Checkr dipende dal piano.** Gli account Checkr più piccoli potrebbero avere solo un livello con interfaccia utente; contatta Checkr per abilitare l'API.

## Risoluzione dei problemi

- **Crea candidato fallisce con `403`** — il token API di Checkr è di sola lettura o non ha i permessi giusti sull'account. Rigeneralo dalla dashboard di Checkr con l'ambito di scrittura.
- **L'invito non arriva mai** — controlla l'email del candidato al passaggio 3; B1 potrebbe avere un campo email vuoto per quella persona. Aggiungi un filtro di email obbligatoria prima del passaggio Checkr.
- **Il trigger webhook non si attiva** — la registrazione del webhook di Checkr a volte fallisce silenziosamente se il tuo account Make non è su un piano a pagamento che supporta i webhook in uscita. Verifica nella pagina *Webhook* della dashboard di Checkr che l'URL di Make sia elencato.

## Vedi anche

- [Make (panoramica)](../make) — il lato B1 di ogni scenario Make
- [Mobile Message](./mobile-message) — per provider SMS senza app Zapier, stesso schema Webhook/HTTP del collegamento Make con Checkr
- [Documentazione API Checkr](https://docs.checkr.com/)
