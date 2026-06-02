---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** è il componente aggiuntivo ufficiale di Google Sheets per B1.church. Aggiunge una barra laterale a qualsiasi foglio di calcolo che esporta Persone, Donazioni, Gruppi o Presenze dalla tua chiesa B1 in schede denominate — su richiesta, con un clic. Il componente aggiuntivo viene eseguito interamente all'interno dell'account Google dell'utente; nulla lo tocca i server di ChurchApps oltre alle chiamate API di sola lettura che ogni esportazione effettua.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account Google con accesso in modifica al foglio di calcolo in cui desideri esportare
- Un amministratore di chiesa (o qualcuno con accesso in lettura ai dati che desideri esportare) in grado di creare una chiave API B1
- Il componente aggiuntivo B1 Export installato dal Google Workspace Marketplace

</div>

## Cosa esporta

| Voce di menu | Scheda foglio | Dati |
|---|---|---|
| Esporta persone | `B1 Persone` | ID, Nome visualizzato, Nome, Cognome, Email, Stato di iscrizione |
| Esporta donazioni | `B1 Donazioni` | ID, ID Persona, Data, Importo, Metodo, ID Lotto |
| Esporta gruppi | `B1 Gruppi` | ID, Nome, Categoria, Conteggio membri |
| Esporta presenze | `B1 Presenze` | ID, ID Persona, Data visita, ID servizio, ID gruppo |

Ogni esportazione **sostituisce** i contenuti della sua scheda denominata — eseguire nuovamente un'esportazione ti dà un'istantanea fresca, non righe aggiunte. Le altre schede del foglio di calcolo rimangono invariate.

## Configurazione

### 1. Crea una chiave API B1 con gli ambiti giusti

1. In B1Admin vai a **Impostazioni → Sviluppatore → Chiavi API**.
2. Fai clic su **Nuova chiave API**, chiamala "Sheets Export", e concedi gli ambiti di **lettura** per tutto ciò che intendi esportare:
   - `people:read` per l'esportazione di persone
   - `donations:read` per Donazioni
   - `groups:read` per Gruppi
   - `attendance:read` per Presenze
3. Una chiave che fa solo esportazioni **non** ha bisogno di `settings:write` — quell'ambito è solo per i connettori che registrano webhook (Zapier / Make). Mantieni questa chiave ristretta.
4. Salva e copia la chiave `cak_…`.

### 2. Installa il componente aggiuntivo

1. Apri il foglio di calcolo in cui desideri esportare.
2. **Estensioni → Componenti aggiuntivi → Ottieni componenti aggiuntivi**.
3. Cerca **B1 Export** e installalo. Google ti chiede di concedere l'accesso ai tuoi fogli e a HTTP esterno (in modo che il componente aggiuntivo possa chiamare l'API B1).

Dopo l'installazione, una voce **B1 Export** appare nel menu **Estensioni** di ogni foglio di calcolo che apri con questo account Google.

### 3. Collega la chiave

1. **Estensioni → B1 Export → Connetti…** (o **B1 Export → Connetti…** dalla barra dei menu dopo il primo accesso).
2. Incolla la chiave API nella barra laterale, lascia l'URL di base come `https://api.churchapps.org` (a meno che non stia testando contro il staging), e fai clic su **Salva**.
3. Fai clic su **Prova connessione** — un "Connessione OK" verde conferma che la chiave funziona.

La chiave è archiviata in **proprietà per utente** (`PropertiesService.getUserProperties()`) — è legata al tuo account Google, mai scritta nel foglio, e mai visibile ad altri editor del foglio di calcolo.

## Esecuzione di un'esportazione

O:

- **Dal menu** — **Estensioni → B1 Export → Esporta persone** (o Donazioni / Gruppi / Presenze)
- **Dalla barra laterale** — apri la barra laterale (Connetti…) e fai clic sul pulsante del dataset appropriato

Un avviso conferma al termine — "_N_ riga/e scritte in 'B1 Persone'."

## Costruire report sopra

Le schede esportate sono dati semplici di Google Sheets. Costruisci le tue analitiche su schede di riferimento:

- Una **scheda di riepilogo** con `=SUMIF('B1 Donazioni'!E:E, "card", 'B1 Donazioni'!D:D)` per totalizzare i regali con carta
- Una **vista filtrata** di soli membri con `=FILTER('B1 Persone'!A:F, 'B1 Persone'!F:F = "Membro")`
- Un **grafico** dei trend di presenze che attinge da `B1 Presenze`

Eseguire nuovamente l'esportazione aggiorna la scheda sottostante; le tue formule si aggiornano automaticamente.

## Programmazione delle esportazioni ricorrenti

Il componente aggiuntivo è on-demand per impostazione predefinita. Per esportazioni settimanali o mensili, utilizza i trigger basati su tempo integrati di Apps Script:

1. **Estensioni → Apps Script** nel foglio di calcolo (questo apre lo script del componente aggiuntivo).
2. Fai clic sull'icona **⏰ Trigger** nella barra laterale sinistra.
3. **Aggiungi trigger** per `exportPeople` (o qualsiasi funzione di esportazione) — scegli *Basato su tempo*, *Timer settimanale*, ad es. *Ogni lunedì alle 6*.

L'esportazione viene eseguita in background con il tuo account Google. Se la chiave API viene ruotata o revocata, il trigger ti invia un'email la prossima volta che non riesce.

## Autorizzazioni e privacy

- Il componente aggiuntivo richiede solo `spreadsheets.currentonly` (può solo toccare il foglio di calcolo in cui è aperto) e `script.external_request` (in modo che `UrlFetchApp` possa chiamare l'API B1). **Non** vede il tuo Drive, Gmail o altri dati Google.
- La chiave API B1 è archiviata per utente — altri editor dello stesso foglio di calcolo non possono vederla.
- Tutte le chiamate API B1 vengono effettuate su HTTPS con `Authorization: Bearer cak_…`.

## Risoluzione dei problemi

- **"Nessuna chiave API impostata"** — apri **Estensioni → B1 Export → Connetti…** e incolla la chiave.
- **"B1 ha rifiutato la chiave API (401)"** — la chiave è stata revocata o è sbagliata. Ri-crea e ri-incolla.
- **"Questa chiave API manca di autorizzazione per /giving/donazioni (403)"** — la chiave non ha `donations:read`. Aggiorna gli ambiti della chiave in B1Admin.
- **Il foglio non si aggiorna** dopo l'esecuzione — assicurati di stare guardando il nome della scheda *corretto* (`B1 Persone` ecc.). L'esportazione crea la scheda se non esisteva.
- **"Quota superata"** — Apps Script impone quote giornaliere per utente su `UrlFetchApp` (solitamente migliaia di chiamate al giorno). Una grande chiesa con molti record potrebbe aver bisogno di dividere le esportazioni su più giorni o usare [Make](./make) / un'integrazione personalizzata per la sincronizzazione ad alto volume.

## Personalizzazione del componente aggiuntivo

Il componente aggiuntivo è open source — il progetto Apps Script vive nel repository `B1Integrations/GoogleSheetsAddon/`. Se desideri una colonna che non esportiamo, un dataset aggiuntivo o un formato di output diverso, apri un problema o una richiesta pull lì.

## Vedi anche

- [Zapier](./zapier) — per la sincronizzazione in tempo reale anziché l'esportazione su richiesta
- [Make](./make) — per la sincronizzazione con trasformazioni più complesse
- [Chiavi API (riferimento per sviluppatori)](/docs/developer/api/api-keys)
