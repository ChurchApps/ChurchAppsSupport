---
title: "Calendario Disponibilità"
---

# Calendario Disponibilità

<div class="article-intro">

Il Calendario Disponibilità ti offre una visione d'insieme di tutte le prenotazioni di aule e risorse in tutta la chiesa. Da qui puoi vedere cosa è programmato, individuare i conflitti prima che accadano e prenotare un'aula o una risorsa per qualsiasi evento direttamente.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Configura almeno un'[aula o risorsa](rooms-resources) nella sezione Aule e Risorse
- Hai bisogno dell'accesso di modifica alla sezione Calendars in B1 Admin

</div>

## Apertura del Calendario Disponibilità

In B1 Admin, apri il **menu della sezione** nell'angolo in alto a sinistra e scegli **Calendars**, quindi seleziona **Availability**.

## Lettura del Calendario

Il calendario visualizza il mese corrente per impostazione predefinita. Puoi navigare avanti e indietro con le frecce in alto, oppure passare tra le viste mese, settimana e giorno.

Ogni evento è codificato a colori in base allo stato della prenotazione:

| Colore | Significato |
|-------|---------|
| Verde | Approvato |
| Arancione | In attesa di approvazione |
| Grigio | Bloccato (non disponibile) |

Passando il mouse su un evento viene visualizzato il titolo dell'evento e l'aula o la risorsa a cui è allegato.

## Filtraggio per Aula o Risorsa

Utilizza il menu a discesa **Filter** in alto a sinistra per restringere il calendario a una singola aula o risorsa. Seleziona **All Rooms & Resources** per tornare alla visualizzazione completa.

## Prenotazione di un'Aula o Risorsa

1. Fai clic sul pulsante **Book** nell'angolo in alto a destra della pagina.
2. Nella finestra di dialogo che si apre, compila i dettagli dell'evento:
   - **Title** — il nome dell'evento
   - **Start** e **End** data/ora
   - **Visibility** — Public o Private
   - **Rooms** — seleziona una o più aule da prenotare
   - **Resources** — seleziona una o più risorse da prenotare
3. Facoltativamente imposta i tempi di **Setup** e **Teardown** (in minuti). Questi riempiono la prenotazione su entrambi i lati in modo che lo spazio sia riservato per la configurazione e la pulizia, anche se gli orari di inizio/fine dell'evento rimangono gli stessi.
4. Per ripetere la prenotazione, seleziona **Repeats** e configura la ricorrenza:
   - **Repeat every** -- imposta l'intervallo (ad esempio, ogni 2 settimane).
   - **Frequency** -- Daily, Weekly o Monthly. Weekly ti permette di scegliere giorni specifici della settimana; Monthly ti permette di scegliere un giorno fisso del mese o un modello relativo come "il secondo martedì".
   - **Ends** -- Never, in una data specifica, o dopo un numero impostato di occorrenze.
5. Per specificare una finestra di prenotazione personalizzata (diversa da inizio/fine evento), attiva **Custom Booking Window** e inserisci l'inizio e la fine della finestra. Usalo quando un'aula deve essere accessibile al di fuori delle ore dell'evento elencate.
6. Fai clic su **Save** per inviare la prenotazione.

:::info
Se l'aula o la risorsa ha un **Approval Group** configurato, la prenotazione apparirà come **Pending** fino a quando un leader di quel gruppo non l'approva. Vedi [Approvazioni Calendario](approvals) per il flusso di lavoro di approvazione.
:::

:::tip
Il calendario evidenzierà eventuali conflitti prima che tu salvi. Se vedi un avviso di conflitto, regola gli orari o scegli un'aula diversa.
:::

## Articoli Correlati

- [Aule, Risorse e Programmazione](rooms-resources) — configura spazi e attrezzature prenotabili
- [Approvazioni Calendario](approvals) — approva o nega richieste di prenotazione
- [Creazione di Calendari](creating-calendars) — gestire calendari di eventi
