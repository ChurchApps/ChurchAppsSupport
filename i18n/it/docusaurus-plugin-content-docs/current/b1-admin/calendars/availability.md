---
title: "Calendario di Disponibilità"
---

# Calendario di Disponibilità

<div class="article-intro">

Il Calendario di Disponibilità ti dà una visione d'insieme di tutte le prenotazioni di stanze e risorse nella tua chiesa. Da qui puoi vedere cosa è programmato, individuare i conflitti prima che accadano, e prenotare una stanza o una risorsa per qualsiasi evento direttamente.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Configura almeno una [stanza o risorsa](rooms-resources) nella sezione Stanze e Risorse
- Hai bisogno dell'accesso di modifica alla sezione Calendari in B1 Admin

</div>

## Apertura del Calendario di Disponibilità

In B1 Admin, apri il **menu della sezione** nell'angolo in alto a sinistra e scegli **Calendari**, quindi seleziona **Disponibilità**.

## Lettura del Calendario

Il calendario visualizza il mese corrente per impostazione predefinita. Puoi navigare avanti e indietro con le frecce nella parte superiore, o passare tra le visualizzazioni mese, settimana e giorno.

Ogni evento è codificato a colori in base allo stato della prenotazione:

| Colore | Significato |
|-------|---------|
| Verde | Approvato |
| Arancione | In sospeso per l'approvazione |
| Grigio | Bloccato (non disponibile) |

Passando il mouse su un evento viene visualizzato il titolo dell'evento e la stanza o risorsa a cui è collegato.

## Filtro per Stanza o Risorsa

Usa il menu a tendina **Filtro** nella parte superiore sinistra per restringere il calendario a una singola stanza o risorsa. Seleziona **Tutte le Stanze e Risorse** per tornare alla visualizzazione completa.

## Prenotazione di una Stanza o Risorsa

1. Fai clic sul pulsante **Prenota** nell'angolo in alto a destra della pagina.
2. Nel dialogo che si apre, compila i dettagli dell'evento:
   - **Titolo** — il nome dell'evento
   - **Inizio** e **Fine** data/ora
   - **Visibilità** — Pubblica o Privata
   - **Stanze** — seleziona una o più stanze da prenotare
   - **Risorse** — seleziona una o più risorse da prenotare
3. Facoltativamente imposta i tempi di **Setup** e **Teardown** (in minuti). Questi riempiono la prenotazione su entrambi i lati in modo che lo spazio sia riservato per la configurazione e la pulizia, anche se i tempi di inizio/fine dell'evento rimangono gli stessi.
4. Per ripetere la prenotazione, spunta **Ripete** e configura la ricorrenza:
   - **Ripeti ogni** -- imposta l'intervallo (ad esempio, ogni 2 settimane).
   - **Frequenza** -- Giornaliero, Settimanale o Mensile. Settimanale ti permette di scegliere giorni specifici della settimana; Mensile ti permette di scegliere un giorno fisso del mese o un modello relativo come "il secondo martedì".
   - **Termina** -- Mai, in una data specifica, o dopo un numero impostato di occorrenze.
5. Per specificare una finestra di prenotazione personalizzata (diversa dall'inizio/fine dell'evento), attiva **Finestra di Prenotazione Personalizzata** e inserisci i tempi di inizio e fine della finestra. Usala quando una stanza deve essere accessibile al di fuori dell'orario elencato dell'evento.
6. Fai clic su **Salva** per inviare la prenotazione.

:::info
Se la stanza o risorsa ha un **Gruppo di Approvazione** configurato, la prenotazione apparirà come **In Sospeso** fino a quando un leader di quel gruppo non l'approva. Vedi [Approvazioni del Calendario](approvals) per il flusso di lavoro di approvazione.
:::

:::tip
Il calendario evidenzierà tutti i conflitti prima di salvare. Se vedi un avviso di conflitto, regola i tuoi orari o scegli una stanza diversa.
:::

## Articoli Correlati

- [Stanze, Risorse e Pianificazione](rooms-resources) — configura spazi e attrezzature prenotabili
- [Approvazioni del Calendario](approvals) — approva o rifiuta le richieste di prenotazione
- [Creazione di Calendari](creating-calendars) — gestisci i calendari degli eventi
