---
title: "Donorbox"
description: "Collega Donorbox a B1 Admin con Zapier così le donazioni online creano automaticamente i record delle donazioni e i profili dei donatori come persone, senza bisogno di esportazioni manuali."
---

# Donorbox

<div class="article-intro">

Se la tua chiesa riceve donazioni tramite Donorbox ma gestisce persone ed estratti conto in B1, puoi fare in modo che i trigger istantanei di Zapier di Donorbox creino in B1 i record di donazione corrispondenti, e creino il donatore come persona in B1 se non esiste già. Nessuna riconciliazione manuale, nessuna esportazione mensile.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Donorbox](https://donorbox.org) con almeno una campagna
- Un account [Zapier](https://zapier.com)
- Un utente B1Admin con il permesso **Modifica impostazioni**

</div>

## Cosa puoi collegare {#what-you-can-wire-up}

| Direzione | Trigger di Donorbox | Azione in B1 |
|---|---|---|
| Donorbox → B1 | Donazione nuova o aggiornata (istantaneo) | Trova persona → Aggiungi donazione |
| Donorbox → B1 | Donatore nuovo o aggiornato | Crea persona |
| Donorbox → B1 | Piano nuovo o aggiornato (ricorrente) | Trova persona → Aggiungi donazione (usa l'ID del piano come nota) |

Donorbox pubblica i suoi trigger come **istantanei**: si attivano pochi secondi dopo una donazione reale. Nessun ritardo di polling.

## Configurazione {#setup}

### 1. Crea una chiave API B1 {#1-mint-a-b1-api-key}

In B1Admin: **Impostazioni → Sviluppatori → Chiavi API → Nuova chiave API**. Ambiti:

- `people:read`: per cercare il donatore tramite email
- `people:write`: per crearlo se è nuovo
- `donations:write`: per registrare la donazione

- `settings:write`: quando colleghi la chiave, Zapier verifica ogni chiave B1 con l'elenco dei webhook di B1, quindi la connessione fallisce senza questo ambito (anche se il trigger qui appartiene a Donorbox, non a B1)

### 2. Crea lo Zap "registra una donazione" {#2-build-the-record-a-donation-zap}

1. **Trigger**: Donorbox: Nuova donazione. Collegati con la chiave API di Donorbox (in Donorbox: *Account → Profilo → Impostazioni API*).
2. **Azione**: B1.church: Trova persona. Collega l'email del donatore dal trigger al campo *Email*.
3. **Azione**: B1.church: Aggiungi donazione. Collega:
   - Persona → l'ID del passaggio 2
   - Importo → l'importo della donazione dal trigger
   - Data della donazione → la data della donazione dal trigger
   - Fondo → scegli il fondo di B1 che corrisponde alla campagna Donorbox (Zapier ti permette di cambiare fondo in base a un filtro o a un passaggio Formatter)
   - Metodo → "Online"
   - Note → ID della transazione Donorbox (utile in fase di riconciliazione)

Attiva lo Zap. La prossima donazione reale ricevuta tramite Donorbox compare automaticamente in **B1Admin → Donazioni**.

Il passaggio *Trova persona* di B1 interrompe lo Zap con un errore "Nessuna persona trovata" quando nessuno ha quell'email, quindi un passaggio Filtro non può ramificarsi su questo. Per gestire i donatori alla prima donazione, attiva la gestione degli errori di Zapier per il passaggio Trova persona e, nel suo percorso di errore, esegui B1.church: Crea persona (collega nome, cognome ed email) e poi Aggiungi donazione con l'ID della nuova persona. In alternativa, esegui lo Zap *Nuovo donatore* → *Crea persona* dalla tabella sopra, così i donatori esistono già in B1 prima che arrivi il loro dono.

## Ricette comuni {#common-recipes}

### Uno Zap per fondo {#one-zap-per-fund}

Se gestisci più campagne Donorbox che corrispondono a fondi separati in B1, la disposizione più pulita è uno Zap per campagna con un filtro *campagna* di Donorbox in cima: così l'associazione con il fondo è fissa e salti il passaggio di ricerca.

### Tratta le donazioni aggiornate come correzioni {#treat-updated-donations-as-corrections}

Il trigger *Donazione nuova o aggiornata* di Donorbox si attiva anche alle modifiche. Usa un passaggio *Percorso* di Zapier su `event_type` per separare i casi: "nuova" → Aggiungi donazione, "aggiornata" → Trova donazione + Aggiorna (nota: l'app Zapier di B1 non ha ancora un'azione Aggiorna donazione; per ora, registra gli eventi "aggiornata" in un canale Slack per una revisione manuale).

### Sincronizza le modifiche ai piani ricorrenti con un canale Slack {#sync-recurring-plan-changes-to-a-slack-channel}

- **Trigger**: Donorbox: Piano nuovo o aggiornato
- **Azione**: Slack: Invia messaggio a `#donations` (ad esempio, "Piano modificato: l'offerta mensile di Sarah è ora di 200 $")

## Limiti e note {#limits--notes}

- **Abbina i donatori tramite email.** Donorbox non condivide l'ID persona di B1; l'unica chiave di collegamento stabile è l'email. I donatori che donano con un'email diversa creeranno una nuova persona in B1: la tua riconciliazione mensile dovrebbe cercare questi casi.
- **I rimborsi non sono esposti separatamente**: Donorbox invia un aggiornamento di stato sulla stessa donazione. L'app Zapier di B1 non ha al momento un'azione *Aggiorna donazione*; per ora, il modo sicuro è registrare gli eventi di rimborso fuori dal sistema e correggere la donazione manualmente.
- **Prova prima nel sandbox di Donorbox** per evitare di creare donazioni false nel B1 di produzione. Donorbox fornisce credenziali di modalità test separate da quelle live.

## Risoluzione dei problemi {#troubleshooting}

- **Errori "Nessuna persona trovata"**: il donatore non è ancora in B1 (oppure ha donato con un'email diversa). Aggiungi il percorso di errore descritto sopra e verifica che la chiave API abbia `people:write` così da poter eseguire *Crea persona*.
- **L'importo della donazione sembra 100 volte più grande o più piccolo**: Donorbox invia centesimi in alcune varianti del payload e dollari in altre. Usa un passaggio *Formatter by Zapier — Numbers* per dividere per 100, se necessario.
- **Donazioni duplicate per un singolo dono**: Donorbox attiva sia *Donazione nuova* sia *Donazione aggiornata*. Filtra su `event_type = "donation.succeeded"` oppure crea due Zap con filtri non sovrapposti.

## Vedi anche {#see-also}

- [Zapier (panoramica)](../zapier.md): la parte B1 di ogni ricetta Zapier
- [Subsplash](./subsplash.md): un'altra piattaforma di donazioni con un'app Zapier
- [Mailchimp](./mailchimp.md): collega "nuovo dono" a un'etichetta email
