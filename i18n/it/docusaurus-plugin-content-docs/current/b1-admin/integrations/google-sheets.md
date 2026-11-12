---
title: "Google Sheets"
description: "Collega B1 Admin a Google Sheets con il componente aggiuntivo B1 Export per importare Persone, Donazioni, Gruppi e Presenze in schede del foglio di calcolo quando vuoi."
---

# Google Sheets

<div class="article-intro">

**B1 Export** è il componente aggiuntivo ufficiale di Google Sheets per B1.church. Aggiunge una barra laterale a qualsiasi foglio di calcolo che esporta Persone, Donazioni, Gruppi o Presenze dalla tua chiesa B1 in schede con nome, quando vuoi, con un solo clic. Il componente funziona interamente all'interno dell'account Google dell'utente; non tocca i server di ChurchApps, se non per le chiamate API di sola lettura che ogni esportazione effettua.

</div>

:::caution Non ancora disponibile
Il componente aggiuntivo B1 Export non è ancora pubblicato su Google Workspace Marketplace, quindi oggi non può essere installato. Fino ad allora, esporta le persone da B1Admin (vedi [Esportazione dei dati](../people/exporting-data.md)) e importa il CSV in Google Sheets. Tutto quello che segue descrive come funzionerà il componente una volta rilasciato.
:::

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account Google con accesso di modifica al foglio di calcolo in cui vuoi esportare
- Un amministratore della chiesa (o qualcuno con accesso in lettura ai dati da esportare) in grado di creare una chiave API B1
- Il componente aggiuntivo B1 Export installato da Google Workspace Marketplace

</div>

## Cosa esporta {#what-it-exports}

| Voce di menu | Scheda del foglio | Dati |
|---|---|---|
| Esporta persone | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Esporta donazioni | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Esporta gruppi | `B1 Groups` | ID, Name, Category, Member Count |
| Esporta presenze | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Ogni esportazione **sostituisce** il contenuto della propria scheda con il nome indicato: rieseguire un'esportazione produce un'istantanea nuova, non aggiunge righe. Le altre schede del foglio di calcolo non vengono modificate.

## Configurazione {#setup}

### 1. Crea una chiave API B1 con gli ambiti giusti {#1-create-a-b1-api-key-with-the-right-scopes}

1. In B1Admin vai su **Impostazioni → Sviluppatori → Chiavi API**.
2. Clicca su **Nuova chiave API**, chiamala "Sheets Export" e concedi gli ambiti **lettura** per ciò che vuoi esportare:
   - `people:read` per l'esportazione delle persone
   - `donations:read` per le donazioni
   - `groups:read` per i gruppi
   - `attendance:read` per le presenze
3. Una chiave che serve solo per le esportazioni **non** ha bisogno di `settings:write`: quell'ambito serve solo ai connettori che registrano webhook (Zapier / Make). Mantieni questa chiave il più limitata possibile.
4. Salva e copia la chiave `cak_…`.

### 2. Installa il componente aggiuntivo {#2-install-the-add-on}

1. Apri il foglio di calcolo in cui vuoi esportare.
2. **Estensioni → Componenti aggiuntivi → Scarica componenti aggiuntivi**.
3. Cerca **B1 Export** e installalo. Google ti chiede di concedere l'accesso ai tuoi fogli e alle richieste HTTP esterne (così il componente può chiamare l'API B1).

Dopo l'installazione, una voce **B1 Export** compare nel menu **Estensioni** di ogni foglio di calcolo che apri con questo account Google.

### 3. Collega la chiave {#3-connect-the-key}

1. **Estensioni → B1 Export → Connetti…** (oppure **B1 Export → Connetti…** dalla barra dei menu dopo la prima apertura).
2. Incolla la chiave API nella barra laterale, lascia l'URL di base come `https://api.churchapps.org` (a meno che tu non stia facendo test sull'ambiente di staging) e clicca su **Salva**.
3. Clicca su **Verifica connessione**: un messaggio verde "Connessione OK" conferma che la chiave funziona.

La chiave viene salvata nelle **proprietà utente** (`PropertiesService.getUserProperties()`): è legata al tuo account Google, non viene mai scritta nel foglio e non è visibile agli altri editor del foglio di calcolo.

## Eseguire un'esportazione {#running-an-export}

Puoi procedere in uno di questi due modi:

- **Dal menu** — **Estensioni → B1 Export → Esporta persone** (oppure Donazioni / Gruppi / Presenze)
- **Dalla barra laterale** — apri la barra laterale (Connetti…) e clicca sul pulsante del dataset desiderato

Un messaggio di notifica conferma il completamento: "_N_ riga/righe scritte in 'B1 People'."

## Creare report personalizzati {#building-reports-on-top}

Le schede esportate sono dati normali di Google Sheets. Puoi costruire le tue analisi facendo riferimento alle schede:

- Una **scheda di riepilogo** con `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` per totalizzare le donazioni con carta
- Una **vista filtrata** dei soli membri con `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Un **grafico** dell'andamento delle presenze che attinge da `B1 Attendance`

Rieseguendo l'esportazione, la scheda sottostante si aggiorna e le tue formule si aggiornano automaticamente.

## Pianificare esportazioni ricorrenti {#scheduling-recurring-exports}

Il componente funziona di default su richiesta. Per esportazioni settimanali o mensili, usa gli attivatori a tempo integrati di Apps Script:

1. **Estensioni → Apps Script** nel foglio di calcolo (si apre lo script collegato del componente).
2. Clicca sull'icona **⏰ Attivatori** nella barra laterale sinistra.
3. **Aggiungi attivatore** per `exportPeople` (o qualsiasi altra funzione di esportazione): scegli *Basato sul tempo*, *Timer settimanale*, ad esempio *Ogni lunedì alle 6*.

L'esportazione viene eseguita in background con il tuo account Google. Se la chiave API viene ruotata o revocata, l'attivatore ti invia un'email la volta successiva in cui fallisce.

## Permessi e privacy {#permissions--privacy}

- Il componente richiede solo `spreadsheets.currentonly` (può toccare solo il foglio di calcolo in cui è aperto) e `script.external_request` (così `UrlFetchApp` può chiamare l'API B1). **Non** vede il tuo Drive, Gmail o altri dati Google.
- La chiave API B1 è memorizzata per utente: gli altri editor dello stesso foglio di calcolo non possono vederla.
- Tutte le chiamate all'API B1 avvengono via HTTPS con `Authorization: Bearer cak_…`.

## Risoluzione dei problemi {#troubleshooting}

- **"Nessuna chiave API impostata"** — apri **Estensioni → B1 Export → Connetti…** e incolla la chiave.
- **"B1 ha rifiutato la chiave API (401)"** — la chiave è stata eliminata o è errata. Crea una nuova chiave e incollala.
- **"Questa chiave API non ha il permesso per /giving/donations (403)"** — la chiave non ha `donations:read`. Gli ambiti non si possono modificare su una chiave esistente, quindi crea una nuova chiave con gli ambiti corretti in B1Admin.
- **Il foglio non si aggiorna** dopo l'esecuzione — assicurati di guardare il nome della scheda *corretto* (`B1 People` ecc.). L'esportazione crea la scheda se non esisteva.
- **"Quota superata"** — Apps Script impone quote giornaliere per utente su `UrlFetchApp` (in genere migliaia di chiamate al giorno). Una chiesa grande con molti record potrebbe dover dividere le esportazioni su più giorni oppure usare [Make](./make.md) o un'integrazione personalizzata per una sincronizzazione ad alto volume.

## Ti manca una colonna? {#missing-a-column}

Se vuoi una colonna che non esportiamo, un dataset aggiuntivo o un formato di output diverso, scrivi a [support@churchapps.org](mailto:support@churchapps.org).

## Vedi anche {#see-also}

- [Zapier](./zapier.md) — per la sincronizzazione in tempo reale anziché l'esportazione su richiesta
- [Make](./make.md) — per la sincronizzazione con trasformazioni più complesse
- [Chiavi API (riferimento per sviluppatori)](/docs/developer/api/api-keys)
