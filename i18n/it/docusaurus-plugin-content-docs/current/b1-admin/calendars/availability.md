---
title: "Calendario Disponibilità"
---

# Calendario Disponibilità

<div class="article-intro">

Il Calendario Disponibilità ti offre una visione d'insieme di tutte le prenotazioni di sale e risorse della tua chiesa. Da qui puoi vedere cosa è in programma, individuare i conflitti prima che si verifichino e prenotare direttamente una sala o una risorsa per qualsiasi evento.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura almeno una [sala o risorsa](rooms-resources) nella sezione Sale e Risorse
- Hai bisogno dell'accesso in modifica alla sezione Calendari in B1 Admin

</div>

## Apertura del Calendario Disponibilità

In B1 Admin, vai su **Calendari** e seleziona **Disponibilità** dalla barra laterale.

## Lettura del calendario

Il calendario mostra il mese corrente per impostazione predefinita. Puoi navigare avanti e indietro con le frecce in alto, oppure passare tra visualizzazione mensile, settimanale e giornaliera.

Ogni evento è codificato a colori in base allo stato della prenotazione:

| Colore | Significato |
|-------|---------|
| Verde | Approvato |
| Arancione | In attesa di approvazione |
| Grigio | Bloccato (non disponibile) |

Passando il mouse sopra un evento vengono mostrati il titolo dell'evento e la sala o risorsa a cui è collegato.

## Filtraggio per sala o risorsa

Usa il menu a tendina **Filtro** in alto a sinistra per restringere il calendario a una singola sala o risorsa. Seleziona **Tutte le sale e risorse** per tornare alla visualizzazione completa.

## Prenotazione di una sala o risorsa

1. Fai clic sul pulsante **Prenota** nell'angolo in alto a destra della pagina.
2. Nella finestra di dialogo che si apre, compila i dettagli dell'evento:
   - **Titolo** — il nome dell'evento
   - **Inizio** e **Fine** data/ora
   - **Visibilità** — Pubblica o Privata
   - **Sale** — seleziona una o più sale da riservare
   - **Risorse** — seleziona una o più risorse da riservare
3. Facoltativamente imposta gli orari di **Allestimento** e **Smontaggio** (in minuti). Questi aggiungono un margine alla prenotazione su entrambi i lati in modo che lo spazio sia riservato per l'allestimento e la pulizia, anche se gli orari di inizio/fine dell'evento restano invariati.
4. Per ripetere la prenotazione, seleziona **Si ripete** e configura la ricorrenza:
   - **Ripeti ogni** -- imposta l'intervallo (ad esempio, ogni 2 settimane).
   - **Frequenza** -- Giornaliera, Settimanale o Mensile. Settimanale ti permette di scegliere giorni specifici della settimana; Mensile ti permette di scegliere un giorno fisso del mese o uno schema relativo come "il secondo martedì".
   - **Termina** -- Mai, in una data specifica, oppure dopo un numero prestabilito di occorrenze.
5. Per specificare una finestra di prenotazione personalizzata (diversa dall'inizio/fine dell'evento), attiva **Finestra di prenotazione personalizzata** e inserisci gli orari di inizio e fine della finestra. Usa questa opzione quando una sala deve essere accessibile al di fuori degli orari indicati dell'evento.
6. Fai clic su **Salva** per inviare la prenotazione.

:::info
Se la sala o risorsa ha un **Gruppo di approvazione** configurato, la prenotazione apparirà come **In attesa** finché un leader di quel gruppo non la approva. Consulta [Approvazioni del calendario](approvals) per il flusso di approvazione.
:::

:::tip
Il calendario evidenzierà eventuali conflitti prima che tu salvi. Se vedi un avviso di conflitto, modifica gli orari o scegli una sala diversa.
:::

## Articoli correlati

- [Sale, Risorse e Programmazione](rooms-resources) — configura spazi prenotabili e attrezzature
- [Approvazioni del calendario](approvals) — approva o rifiuta le richieste di prenotazione
- [Creazione dei calendari](creating-calendars) — gestisci i calendari degli eventi
