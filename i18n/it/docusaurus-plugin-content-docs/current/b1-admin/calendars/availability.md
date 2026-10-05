---
title: "Calendario di disponibilità"
---

# Calendario di disponibilità

<div class="article-intro">

Il calendario di disponibilità vi dà una visione d'insieme di tutte le prenotazioni di stanze e risorse in tutta la vostra chiesa. Da qui potete vedere cosa è pianificato, individuare i conflitti prima che accadano, e prenotare una stanza o una risorsa per qualsiasi evento direttamente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configurate almeno una [stanza o risorsa](rooms-resources) nella sezione Stanze e risorse
- Avete bisogno dell'accesso in modifica alla sezione Calendari in B1 Admin

</div>

## Apertura del calendario di disponibilità

In B1 Admin, aprite il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandete **Calendari**, e fate clic su **Disponibilità**.

## Lettura del calendario

Il calendario mostra il mese corrente per impostazione predefinita. Potete navigare in avanti e indietro con le frecce in alto, o passare da viste di mese, settimana e giorno.

Ogni evento è codificato a colori in base allo stato di prenotazione:

| Colore | Significato |
|--------|------------|
| Verde | Approvato |
| Arancione | In sospeso di approvazione |
| Grigio | Bloccato (non disponibile) |

Passando il mouse sopra un evento mostra il titolo dell'evento e la stanza o la risorsa a cui è allegato.

## Filtraggio per stanza o risorsa

Utilizzate il menu a discesa **Filtro** in alto a sinistra per restringere il calendario a una singola stanza o risorsa. Selezionate **Tutte le stanze e risorse** per tornare alla vista completa.

## Prenotazione di una stanza o risorsa

1. Fate clic sul pulsante **Prenota** nell'angolo in alto a destra della pagina.
2. Nella finestra di dialogo che si apre, compilate i dettagli dell'evento:
   - **Titolo** — il nome dell'evento
   - **Data/ora** di inizio e fine
   - **Visibilità** — Pubblica o Privata
   - **Stanze** — selezionate una o più stanze da prenotare
   - **Risorse** — selezionate una o più risorse da prenotare
3. Opzionalmente impostate i tempi di **Allestimento** e **Smontaggio** (in minuti). Questi riempiono la prenotazione su entrambi i lati in modo che lo spazio sia riservato per l'allestimento e la pulizia, anche se i tempi di inizio/fine dell'evento rimangono uguali.
4. Per ripetere la prenotazione, spuntate **Ripeti** e configurate la ricorrenza:
   - **Ripeti ogni** -- impostate l'intervallo (ad esempio, ogni 2 settimane).
   - **Frequenza** -- Giornaliera, Settimanale, o Mensile. Settimanale vi permette di scegliere giorni specifici della settimana; Mensile vi permette di scegliere un giorno fisso del mese o un modello relativo come "il secondo martedì".
   - **Termina** -- Mai, in una data specifica, o dopo un numero impostato di occorrenze.
5. Per specificare una finestra di prenotazione personalizzata (diversa dall'inizio/fine dell'evento), attivate **Finestra di prenotazione personalizzata** e immettete i tempi di inizio e fine della finestra. Utilizzatelo quando una stanza deve essere accessibile al di fuori delle ore di elenco dell'evento.
6. Fate clic su **Salva** per inviare la prenotazione.

:::info
Se la stanza o la risorsa ha un **Gruppo di approvazione** configurato, la prenotazione apparirà come **In sospeso** fino a quando un leader di quel gruppo la approva. Vedere [Approvazioni del calendario](approvals) per il flusso di lavoro di approvazione.
:::

:::tip
Il calendario evidenzierà i conflitti prima di salvare. Se vedete un avvertimento di conflitto, regolate i vostri tempi o scegliete una stanza diversa.
:::

## Articoli correlati

- [Stanze, risorse e pianificazione](rooms-resources) — configurate spazi e attrezzature prenotabili
- [Approvazioni del calendario](approvals) — approvate o negate richieste di prenotazione
- [Creazione di calendari](creating-calendars) — gestite calendari degli eventi
