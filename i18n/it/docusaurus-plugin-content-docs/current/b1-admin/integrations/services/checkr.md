---
title: "Checkr"
description: "Collega le iscrizioni dei volontari in B1 Admin ai controlli dei precedenti di Checkr usando Make.com, con avvisi facoltativi sullo stato dei report per il coordinatore della tutela dei minori."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) gestisce le verifiche dei precedenti per il personale e i volontari: un'esigenza quasi universale per ogni chiesa che gestisce un programma per bambini o giovani. B1 **non ha una funzione integrata per i controlli dei precedenti**: l'avvio delle verifiche, il monitoraggio dei risultati e la conformità alle procedure di screening sono tutti gestiti in Checkr; la ricetta qui sotto si limita a collegare gli eventi di B1 a Checkr. Checkr non dispone di un'app per Zapier, ma l'[integrazione Checkr di Make.com](https://www.make.com/en/integrations/checkr) è verificata ed espone le azioni necessarie per avviare una verifica a partire da un evento di B1.

</div>

:::caution
Questa ricetta usa l'app B1.church per Make, che non è ancora stata rilasciata (vedi [Make](../make.md)). Fino ad allora, la parte B1 di questi scenari deve essere costruita con il modulo **HTTP** di Make che chiama la [REST API](/docs/developer/api) di B1.
:::

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Checkr](https://checkr.com) con accesso API e almeno un pacchetto di screening configurato
- Un account [Make](https://www.make.com)
- Un utente B1Admin con il permesso **Modifica impostazioni**

</div>

## Cosa puoi collegare {#what-you-can-wire-up}

L'app Checkr di Make espone 1 trigger e 6 azioni:

| Direzione | Trigger di B1 / Make | Azione |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrato su un gruppo di volontari) | Checkr: Crea candidato → Crea invito per la verifica dei precedenti |
| Checkr → B1 | Webhook di Checkr (evento di invito / report) | B1: Aggiorna la scheda della persona (ad esempio, con l'etichetta "Checkr cleared") |

Le azioni di Checkr in Make sono: Crea candidato, Crea invito per la verifica dei precedenti, Ottieni candidato, Ottieni report, Ottieni tempo stimato del report e Ottieni un invito. Inoltre, 4 moduli di ricerca.

## Configurazione {#setup}

### 1. Crea una chiave API B1 {#1-mint-a-b1-api-key}

**Impostazioni → Sviluppatori → Chiavi API → Nuova chiave API**:

- `settings:write`: per il webhook del trigger
- `people:read`: per cercare nome ed email della persona quando avvii una verifica
- (Facoltativo) `people:write` se vuoi riportare lo stato del report come campo personalizzato o etichetta

### 2. Costruisci in Make lo scenario "avvia una verifica all'iscrizione del volontario" {#2-build-the-kick-off-a-check-on-volunteer-signup-scenario-in-make}

1. **Trigger**: B1.church: Osserva eventi (`group.member.added`).
2. **Filtro**: continua solo se `data.groupId` corrisponde al tuo gruppo "Volontari per i bambini" (o equivalente).
3. **Azione**: B1.church: Trova persona (per `data.personId`) per ottenere email, nome e cognome.
4. **Azione**: Checkr: Crea candidato. Collega nome, cognome ed email dal passaggio 3.
5. **Azione**: Checkr: Crea invito per la verifica dei precedenti. Collega l'ID del nuovo candidato del passaggio 4 al campo *candidate_id*. Scegli il pacchetto di screening (ad esempio `tasker_standard` o quello disponibile nel tuo account).
6. (Facoltativo) **Azione**: Slack: avvisa il tuo coordinatore della tutela dei minori che una verifica è stata avviata.

Attiva lo scenario. I nuovi volontari del gruppo interessato ricevono automaticamente un invito Checkr via email; lo completano dal telefono o dal computer, e Checkr esegue la verifica.

### 3. (Facoltativo) Ricevi il report {#3-optional-receive-the-report-back}

1. **Trigger**: Checkr: Osserva eventi (webhook). Make registra un webhook di Checkr all'attivazione.
2. **Filtro**: continua solo se `event_type = report.completed`.
3. **Azione**: Checkr: Ottieni report (usa l'ID del report dal webhook).
4. **Azione**: B1.church: Trova persona (per email del candidato).
5. **Azione**: Slack / Email condizionale: avvisa il coordinatore con lo stato `clear` / `consider` / `suspended`.

Nota: oggi B1 non ha un campo integrato per lo "stato della verifica dei precedenti". Le opzioni pratiche sono (a) pubblicare il risultato in un canale Slack privato per la revisione, (b) scriverlo in un Google Sheet per l'archivio, oppure (c) aggiungere la persona al gruppo B1 "Volontari verificati" in caso di `clear`.

## Ricette comuni {#common-recipes}

### Ripeti la verifica dei volontari ogni 2 anni {#re-screen-volunteers-every-2-years}

Abbina quanto sopra a un trigger a pianificazione di Make:

- **Trigger**: Make: Pianificazione (mensile)
- **Azione**: HTTP — Effettua una richiesta: GET a `/membership/groupmembers?groupId=…` di B1 per il tuo gruppo "Volontari verificati" (l'app B1.church non ha un'azione di elenco)
- **Azione**: Filtro di Make: data di verifica più vecchia di 22 mesi
- **Azione**: Checkr: Crea invito per la verifica dei precedenti (come nel flusso iniziale)

### Blocca l'accesso del primo stadio fino al completamento della verifica {#block-stage-1-access-until-check-completes}

Se la tua chiesa usa l'appartenenza ai gruppi di B1 per limitare l'accesso (ad esempio, solo i membri del gruppo "Verificati" compaiono nei piani di servizio), tieni i nuovi volontari in un gruppo di attesa finché l'evento `report.completed` di Checkr non li sposta.

## Limiti e note {#limits--notes}

- **Checkr opera solo negli Stati Uniti** per la maggior parte dei pacchetti di screening. Le chiese in Australia, Regno Unito e Canada avranno bisogno di un'alternativa.
- **Il prezzo** è per verifica: ogni Crea invito in Make genera una verifica reale. Prova prima nell'ambiente sandbox / di staging di Checkr (l'app Checkr di Make usa le credenziali che passi nella connessione, quindi cambiare credenziali permette di passare da sandbox a produzione).
- **L'accesso API di Checkr dipende dal piano.** Gli account Checkr più piccoli potrebbero essere su un livello solo interfaccia; contatta Checkr per attivare l'API.

## Risoluzione dei problemi {#troubleshooting}

- **Crea candidato fallisce con `403`**: il token API di Checkr è in sola lettura o non ha i permessi corretti per l'account. Generane uno nuovo dalla dashboard di Checkr con l'ambito di scrittura.
- **L'invito non arriva mai**: controlla l'email del candidato al passaggio 3; B1 potrebbe avere il campo email vuoto per quella persona. Aggiungi un filtro "email obbligatoria" prima del passaggio Checkr.
- **Il trigger webhook non si attiva**: la registrazione del webhook di Checkr a volte fallisce in silenzio se il tuo account Make non è su un piano a pagamento che supporta i webhook in uscita. Verifica nella pagina *Webhooks* della dashboard di Checkr che l'URL di Make sia presente.

## Vedi anche {#see-also}

- [Make (panoramica)](../make.md): la parte B1 di ogni scenario Make
- [Mobile Message](./mobile-message.md): per i provider SMS senza app Zapier, stesso schema di webhook/HTTP della configurazione Checkr su Make
- [Documentazione API di Checkr](https://docs.checkr.com/)
