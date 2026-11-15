---
title: "Approvazioni del calendario"
description: "Esamina le richieste di prenotazione di sale e risorse in attesa in B1 Admin, controlla i conflitti, approva o rifiuta le richieste e consulta le decisioni passate nella Cronologia."
---

# Approvazioni del calendario

<div class="article-intro">

La pagina Approvazioni è dove gli amministratori esaminano e gestiscono le richieste di prenotazione di sale e risorse in attesa, oltre agli eventi del calendario che richiedono un'approvazione prima di essere pubblicati.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura sale o risorse con un **Gruppo di approvazione** in [Sale e risorse](./rooms-resources.md)
- Ti serve il permesso **Modifica contenuti**, oppure **Risolvi conflitti e approvazioni del calendario** (entrambi nella sezione **Contenuti** di [Ruoli e permessi](../settings/roles-permissions.md)). Senza **Modifica contenuti**, il menu **Calendari** non viene mostrato: apri invece Approvazioni dal collegamento alle approvazioni in attesa nella **Dashboard** o dall'email di approvazione.

</div>

## Aprire le Approvazioni {#opening-approvals}

In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Calendari** e fai clic su **Approvazioni**. Qui sono elencate le richieste di prenotazione e gli eventi in attesa di revisione. Usa i pulsanti **In attesa** e **Cronologia** in alto per passare dalle richieste che necessitano ancora di una decisione a quelle già decise.

## Richieste di prenotazione {#booking-requests}

Quando qualcuno prenota una sala o una risorsa che ha un **Gruppo di approvazione** e non ne fa parte, la richiesta compare nella sezione **Richieste di sale e risorse**. (Le prenotazioni fatte dai membri del Gruppo di approvazione vengono approvate automaticamente.) I membri del Gruppo di approvazione ricevono anche un'email con l'elenco delle nuove richieste in attesa e un collegamento a questa pagina. Ogni riga mostra:

- Il nome e la data/ora dell'evento
- La sala o la risorsa richiesta (con la quantità per le risorse con più unità)
- **Richiesto da**, la persona che l'ha chiesta, con collegamento alla sua scheda
- Un badge di stato che indica se la richiesta ha dei conflitti

### Indicatori di conflitto {#conflict-indicators}

Se una richiesta si sovrappone a un'altra prenotazione o a un blocco per la stessa sala o risorsa, il suo stato mostra un badge **Conflitti**; passaci sopra con il mouse per vedere i dettagli. Le richieste senza sovrapposizioni mostrano **Nessun conflitto**. Esamina con attenzione le richieste in conflitto prima di approvarne una.

### Approvare o rifiutare {#approving-or-rejecting}

Passa con il mouse su una richiesta di prenotazione e fai clic su **Approva** o **Rifiuta** (il rifiuto ti chiede prima una conferma). Chi ha fatto la richiesta viene informato della decisione. Le prenotazioni approvate bloccano quella sala o risorsa per l'evento; quelle rifiutate liberano lo spazio per altri.

Quando fai clic su **Approva**, si apre la finestra **Approva prenotazione**, così puoi pubblicare l'evento nello stesso passaggio:

1. Seleziona **Pubblica nel calendario pubblico** per rendere pubblico l'evento nel calendario del suo gruppo. Lascialo deselezionato per approvare la prenotazione senza modificare la visibilità dell'evento.
2. Una volta selezionato **Pubblica nel calendario pubblico**, puoi facoltativamente scegliere un calendario curato da **Aggiungi anche al calendario** per aggiungere l'evento anche a uno dei tuoi [calendari curati](./curated-calendar.md). Lascialo su **Nessuno** per saltare questo passaggio. (Questa opzione compare solo se hai il permesso **content.edit**.)
3. Fai clic su **Approva**.

## Eventi in attesa {#pending-events}

Gli eventi richiesti dai membri (ad esempio da **Le mie richieste** nell'app B1) compaiono nella sezione **Richieste di eventi** con la loro data, la **Descrizione** e **Richiesto da**. Fai clic su **Approva** per pubblicare un evento nel calendario, oppure su **Rifiuta** per avvisare chi l'ha inviato che servono modifiche. Fai clic su **Modifica** per correggere i dettagli della richiesta prima di decidere, oppure su **Elimina** per rimuoverla.

:::tip
Imposta un Gruppo di approvazione su una sala in [Sale e risorse](./rooms-resources.md) per richiedere un'approvazione per quella sala. I gruppi che vi hanno accesso potranno quindi richiedere la sala quando creano eventi, e tali richieste confluiranno in questa pagina.
:::

## Cronologia {#history}

Le richieste approvate e rifiutate restano nella pagina. Fai clic su **Cronologia** in cima alle Approvazioni per vederle; fai clic su **In attesa** per tornare alle richieste aperte.

- **Richieste di sale e risorse** elenca ogni prenotazione decisa con l'evento, la sala o la risorsa, **Richiesto da**, un badge **Approvata** o **Rifiutata** e **Deciso**, che indica chi ha preso la decisione e in quale data. Le richieste decise più di recente sono elencate per prime.
- **Richieste di eventi** elenca ogni evento deciso con la sua descrizione, **Richiesto da**, un badge **Approvata** o **Rifiutata** e **Deciso**, che indica chi ha preso la decisione e in quale data. Le richieste di evento più vecchie, decise prima che B1 iniziasse a registrarlo, mostrano invece un trattino.

Puoi cambiare idea dalla Cronologia: una richiesta approvata ha l'azione **Rifiuta**, mentre una rifiutata ha l'azione **Approva**. Rifiutare una richiesta di evento che avevi approvato la toglie dal calendario pubblico. Le richieste di evento possono anche essere modificate o eliminate da qui.

Fai clic su un nome sotto **Richiesto da** per aprire la scheda di quella persona.

## Articoli correlati {#related-articles}

- [Sale, risorse e programmazione](./rooms-resources.md) — configura sale e risorse prenotabili
- [Creare calendari](./creating-calendars.md) — gestisci calendari ed eventi
