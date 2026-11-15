---
title: "Calendario della disponibilità"
description: "Configura sale e attrezzature prenotabili in B1 Admin, poi prenotale nel calendario, aggiungi i margini di allestimento e smontaggio e gestisci prenotazioni ricorrenti o che richiedono approvazione."
---

# Calendario della disponibilità

<div class="article-intro">

Il Calendario della disponibilità ti offre una visione d'insieme di tutte le prenotazioni di sale e risorse della tua chiesa. Da qui puoi vedere cosa è programmato, individuare i conflitti prima che si verifichino e prenotare direttamente una sala o una risorsa per qualsiasi evento.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura almeno una [sala o risorsa](./rooms-resources.md) nella sezione Sale e risorse
- Ti serve il permesso **Modifica contenuti**

</div>

## Aprire il Calendario della disponibilità {#opening-the-availability-calendar}

In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Calendari** e fai clic su **Disponibilità**.

## Leggere il calendario {#reading-the-calendar}

Per impostazione predefinita il calendario mostra il mese corrente. Usa **Oggi**, **Indietro** e **Avanti** in alto per spostarti, e **Mese**, **Settimana**, **Giorno** o **Agenda** per cambiare la vista.

Ogni prenotazione è colorata in base al suo stato:

| Colore | Significato |
|-------|---------|
| Verde | Approvata |
| Arancione | In attesa di approvazione |
| Grigio | Bloccata (non disponibile), mostrata come *Bloccato: motivo* |

Ogni prenotazione riporta il titolo dell'evento seguito dalle sale e dalle risorse che utilizza. Passa con il mouse su una prenotazione per vedere il testo completo. Fai clic su una prenotazione per aprire il suo evento e modificarlo.

## Filtrare per sala o risorsa {#filtering-by-room-or-resource}

Usa il menu a tendina **Sala / Risorsa** in alto a sinistra per restringere il calendario a una singola sala o risorsa. Seleziona **Tutte le sale e risorse** per tornare alla vista completa.

## Prenotare una sala o una risorsa {#booking-a-room-or-resource}

1. Fai clic sul pulsante **Prenota** in cima alla pagina.
2. Si apre la finestra **Nuovo evento** -- lo stesso editor usato nel calendario (vedi [Aggiungere e modificare eventi](./creating-calendars.md#adding-and-editing-events)). Compila i dettagli dell'evento:
   - **Gruppo** *(obbligatorio)* — il gruppo a cui appartiene l'evento. Se hai dei [modelli](./rooms-resources.md#event-templates), puoi anche scegliere un **Modello** per compilare il resto.
   - **Titolo** *(obbligatorio)*
   - **Inizio** e **Fine** con data e ora *(obbligatori; la Fine deve essere successiva all'Inizio)*
   - **Visibilità** — Pubblico o Privato
   - **Sale** — seleziona una o più sale da riservare
   - **Risorse** — seleziona una o più risorse da riservare
3. Una volta selezionata una sala o una risorsa, puoi impostare **Allestimento (min prima)** e **Smontaggio (min dopo)**. Questi margini estendono la prenotazione in entrambe le direzioni, così lo spazio è riservato per l'allestimento e la pulizia, anche se gli orari di inizio e fine dell'evento restano gli stessi.
4. Per ripetere la prenotazione, imposta prima l'**Inizio**, poi seleziona **Si ripete** e configura la ricorrenza:
   - **Intervallo** -- ogni quanto si ripete (ad esempio 2 con Settimana per ogni 2 settimane).
   - **Frequenza** -- Giorno, Settimana o Mese. La settimanale ti permette di scegliere uno o più giorni specifici della settimana; la mensile ti permette di scegliere un giorno fisso del mese oppure uno schema relativo come "il secondo martedì".
   - **Termina** -- **Mai**, **Il** una specifica **Data di fine**, oppure **Dopo** un numero definito di occorrenze.
5. Per specificare una finestra di prenotazione personalizzata (diversa dall'inizio/fine dell'evento), attiva **Finestra di prenotazione personalizzata** e inserisci **Riserva dal** e **Riserva fino al**. Questo sostituisce i minuti di allestimento e smontaggio. Usala quando una sala deve essere accessibile al di fuori dell'orario indicato per l'evento.
6. Fai clic su **Salva** per inviare la prenotazione.

:::info
Se la sala o la risorsa ha un **Gruppo di approvazione** configurato, la prenotazione comparirà come **In attesa** finché non viene approvata nella pagina Approvazioni -- a meno che tu non faccia parte di quel gruppo, nel qual caso viene approvata subito. Consulta [Approvazioni del calendario](./approvals.md) per il flusso di approvazione.
:::

:::tip
L'editor mostra un avviso prima del salvataggio se una sala o una risorsa è già prenotata o bloccata a quell'ora. Se vedi un avviso di conflitto, modifica gli orari o scegli un'altra sala.
:::

## Articoli correlati {#related-articles}

- [Sale, risorse e programmazione](./rooms-resources.md) — configura spazi e attrezzature prenotabili
- [Approvazioni del calendario](./approvals.md) — approva o rifiuta le richieste di prenotazione
- [Creare calendari](./creating-calendars.md) — gestisci i calendari degli eventi
