---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Se la tua chiesa accetta donazioni tramite Donorbox ma tiene traccia di persone e dichiarazioni in B1, puoi fare in modo che i trigger istantanei di Donorbox in Zapier creino record di donazione corrispondenti all'interno di B1 — e creino il donatore come persona B1 se non esiste già. Nessuna riconciliazione manuale, nessuna esportazione mensile.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Donorbox](https://donorbox.org) con almeno una campagna
- Un account [Zapier](https://zapier.com)
- Un utente B1Admin con autorizzazione **Modifica impostazioni**

</div>

## Cosa puoi collegare

| Direzione | Trigger Donorbox | Azione B1 |
|---|---|---|
| Donorbox → B1 | Donazione nuova o aggiornata (istantanea) | Trova persona → Aggiungi donazione |
| Donorbox → B1 | Donatore nuovo o aggiornato | Crea persona |
| Donorbox → B1 | Piano nuovo o aggiornato (ricorrente) | Trova persona → Aggiungi donazione (usa id piano come nota) |

Donorbox pubblica i suoi trigger come **istantanei** — si attivano entro pochi secondi da una donazione reale. Nessun ritardo di polling.

## Configurazione

### 1. Crea una chiave API B1

In B1Admin: **Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**. Ambiti:

- `people:read` — per cercare il donatore per email
- `people:write` — per crearlo se è nuovo
- `donations:write` — per registrare il regalo

I trigger in questa direzione sono di Donorbox, non di B1, quindi non hai bisogno di `settings:write` qui.

### 2. Costruisci lo "Zap di registrazione della donazione"

1. **Trigger** — Donorbox: Nuova donazione. Collega con la chiave API di Donorbox (in Donorbox: *Account → Profilo → Impostazioni API*).
2. **Azione** — B1.church: Trova persona. Mappa l'email del donatore dal trigger al campo *Email* di ricerca.
3. **Azione** — Filtro per Zapier (facoltativo): continua solo se il donatore non è stato trovato, quindi…
4. **Azione** — B1.church: Crea persona. Mappa nome/cognome/email in modo che il donatore atterri come membro, non solo un record regalo.
5. **Azione** — B1.church: Aggiungi donazione. Mappa:
   - Importo → `data.amount`
   - Data donazione → data di donazione del trigger
   - Fondo → scegli il fondo B1 che rispecchia la campagna Donorbox (Zapier ti consente di passare da un fondo all'altro in base a un passaggio di filtro o formattatore)
   - Metodo → "Online"
   - Note → id transazione Donorbox (utile durante la riconciliazione)

Attiva lo Zap. La prossima donazione dal vivo attraverso Donorbox entra in **B1Admin → Donazioni** automaticamente.

## Ricette comuni

### Uno Zap per fondo

Se gestisci più campagne Donorbox che si mappano su fondi B1 separati, il layout più pulito è uno Zap per campagna con un filtro Donorbox *campaign* in alto — in questo modo la mappatura dei fondi è hard-coded e salti il passaggio di ricerca.

### Tratta le donazioni aggiornate come correzioni

Il *Nuovo o aggiornato* di Donorbox si attiva anche sugli edit. Usa un passaggio Zapier *Path* su `event_type` per biforcazione: "nuovo" → Aggiungi donazione, "aggiornato" → Trova donazione + Aggiorna (nota: l'app Zapier di B1 non ha attualmente un'azione Aggiorna donazione — per ora, registra gli eventi "aggiornati" a un canale Slack per la revisione manuale).

### Sincronizza i cambiamenti del piano ricorrente a un canale Slack

- **Trigger** — Donorbox: Piano nuovo o aggiornato
- **Azione** — Slack: Invia messaggio a `#donazioni` (ad es. "Piano modificato — il regalo mensile di Sarah è ora $200")

## Limiti e note

- **Abbina i donatori per email.** Donorbox non condivide l'id della persona di B1; l'unica chiave di unione duratura è l'email. I donatori che donano sotto un'email diversa creeranno una nuova persona B1 — la tua riconciliazione mensile dovrebbe cercarle.
- **I rimborsi non sono esposti separatamente** — Donorbox emette un aggiornamento di stato sulla stessa donazione. L'app Zapier di B1 attualmente non ha un'azione *Aggiorna donazione*; il modello sicuro oggi è registrare gli eventi di rimborso out-of-band e adattare la donazione manualmente.
- **Prova prima nella sandbox di Donorbox** per evitare di creare falsi regali in B1 di produzione. Donorbox fornisce credenziali della modalità test separate da live.

## Risoluzione dei problemi

- **Avviso "Persona non trovata" ad ogni esecuzione** — va bene se hai ordinato i passaggi in modo che un *Crea persona* venga eseguito nel ramo non trovato. Se il passaggio Crea persona non viene mai eseguito neanche, ricontrolla che la chiave API abbia `people:write`.
- **L'importo della donazione sembra 100 volte troppo grande o piccolo** — Donorbox invia centesimi in alcune varianti di payload e dollari in altre. Usa un passaggio *Formatter per Zapier — Numeri* per dividere per 100 se necessario.
- **Donazioni duplicate da un singolo regalo** — Donorbox si attiva sia *Nuova donazione* che *Donazione aggiornata*. O filtra su `event_type = "donation.succeeded"` o costruisci due Zap con filtri non sovrapposti.

## Vedi anche

- [Zapier (panoramica)](../zapier) — lato B1 di ogni ricetta Zapier
- [Subsplash](./subsplash) — un'altra piattaforma di donazione con un'app Zapier
- [Mailchimp](./mailchimp) — catena "nuovo regalo" in un tag email
