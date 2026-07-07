---
title: "Calendario della disponibilità"
---

# Calendario della disponibilità

<div class="article-intro">

Il Calendario della disponibilità ti offre una visione d'insieme di tutte le prenotazioni di stanze e risorse nella tua chiesa. Da qui puoi vedere cosa è programmato, identificare i conflitti prima che accadano e prenotare una stanza o una risorsa per qualsiasi evento direttamente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura almeno una [stanza o risorsa](rooms-resources) nella sezione Stanze e risorse
- Hai bisogno dell'accesso in modifica alla sezione Calendari in B1 Admin

</div>

## Apertura del Calendario della disponibilità

In B1 Admin, vai a **Calendari** e seleziona **Disponibilità** dalla barra laterale.

## Lettura del calendario

Il calendario visualizza il mese corrente per impostazione predefinita. Puoi navigare avanti e indietro con le frecce in alto, o passare tra le visualizzazioni per mese, settimana e giorno.

Ogni evento è codificato per colore in base allo stato della prenotazione:

| Colore | Significato |
|-------|---------|
| Verde | Approvato |
| Arancione | In attesa di approvazione |
| Grigio | Bloccato (non disponibile) |

Passando il mouse su un evento vengono visualizzati il titolo dell'evento e la stanza o la risorsa ad esso allegata.

## Filtro per stanza o risorsa

Utilizza il menu a discesa **Filtro** in alto a sinistra per limitare il calendario a una singola stanza o risorsa. Seleziona **Tutte le stanze e risorse** per tornare alla visualizzazione completa.

## Prenotazione di una stanza o di una risorsa

1. Fai clic sul pulsante **Prenota** nell'angolo in alto a destra della pagina.
2. Nella finestra di dialogo che si apre, compila i dettagli dell'evento:
   - **Titolo** — il nome dell'evento
   - Data/ora di **inizio** e **fine**
   - **Visibilità** — Pubblica o privata
   - **Stanze** — seleziona una o più stanze da prenotare
   - **Risorse** — seleziona una o più risorse da prenotare
3. Facoltativamente imposta i tempi di **Configurazione** e **Smontaggio** (in minuti). Questi padronneggiano la prenotazione su entrambi i lati in modo che lo spazio sia riservato per la configurazione e la pulizia, anche se gli orari di inizio/fine dell'evento rimangono gli stessi.
4. Per ripetere la prenotazione, seleziona **Ripete** e configura la ricorrenza:
   - **Ripeti ogni** -- imposta l'intervallo (ad esempio, ogni 2 settimane).
   - **Frequenza** -- Giornaliero, settimanale o mensile. Settimanale ti permette di scegliere giorni specifici della settimana; Mensile ti permette di scegliere un giorno fisso del mese o un modello relativo come "il secondo martedì".
   - **Fine** -- Mai, in una data specifica o dopo un numero impostato di occorrenze.
5. Per specificare una finestra di prenotazione personalizzata (diversa dall'inizio/fine dell'evento), attiva **Finestra di prenotazione personalizzata** e inserisci gli orari di inizio e fine della finestra. Usalo quando una stanza deve essere accessibile al di fuori dell'orario dell'evento.
6. Fai clic su **Salva** per inviare la prenotazione.

:::info
Se la stanza o la risorsa ha un **Gruppo di approvazione** configurato, la prenotazione apparirà come **In sospeso** fino all'approvazione da parte di un leader di quel gruppo. Vedi [Approvazioni del calendario](approvals) per il flusso di lavoro di approvazione.
:::

:::tip
Il calendario evidenzierà eventuali conflitti prima di salvare. Se vedi un avviso di conflitto, regola gli orari o scegli una stanza diversa.
:::

## Articoli correlati

- [Stanze, risorse e programmazione](rooms-resources) — configura spazi e attrezzature prenotabili
- [Approvazioni del calendario](approvals) — approva o nega le richieste di prenotazione
- [Creazione di calendari](creating-calendars) — gestisci i calendari degli eventi
