---
title: "Approvazioni del calendario"
description: "Esamina in B1 Admin le richieste di prenotazione di sale e risorse in attesa, verifica i conflitti, approvale o rifiutale, e consulta le decisioni passate nella cronologia."
---

# Approvazioni del calendario

<div class="article-intro">

La pagina Approvazioni è dove gli amministratori esaminano e gestiscono le richieste di prenotazione di sale e risorse in attesa, oltre agli eventi del calendario che richiedono l'approvazione prima di essere pubblicati.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura sale o risorse con un **Gruppo di approvazione** in [Stanze e risorse](./rooms-resources.md)
- Ti serve il permesso **Amministratore calendari** oppure il permesso **content.edit**

</div>

## Aprire le approvazioni

In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Calendari** e fai clic su **Approvazioni**. Qui sono elencate le richieste di prenotazione in attesa e gli eventi in attesa di revisione. Usa i pulsanti **In sospeso** e **Cronologia** in alto per passare dalle richieste che richiedono ancora una decisione a quelle già decise.

## Richieste di prenotazione

Quando un gruppo crea un evento e richiede una stanza o una risorsa, la richiesta compare nella sezione **Richieste di stanze e risorse**. Ogni riga mostra:

- Il nome e la data/ora dell'evento
- La stanza o la risorsa richiesta (con la quantità per le risorse con più unità)
- **Richiesta da**, la persona che l'ha chiesta, collegata alla sua scheda
- Un badge di stato che indica se la richiesta presenta conflitti

### Indicatori di conflitto

Se una richiesta si sovrappone a un'altra prenotazione o a un blocco per la stessa stanza o risorsa, lo stato mostra un badge **Conflitti**; passaci sopra con il mouse per vedere i dettagli. Le richieste senza sovrapposizioni mostrano **Nessun conflitto**. Esamina con attenzione le richieste in conflitto prima di approvarne una.

### Approvare o rifiutare

Fai clic su **Approva** o **Rifiuta** su una richiesta di prenotazione (il rifiuto ti chiede prima una conferma). Chi ha fatto la richiesta riceve una notifica della decisione. Le prenotazioni approvate bloccano la stanza o la risorsa per l'evento; quelle rifiutate liberano lo slot per altri.

Quando fai clic su **Approva**, si apre la finestra **Approva prenotazione**, così puoi pubblicare anche l'evento nello stesso passaggio:

1. Spunta **Pubblica nel calendario pubblico** per rendere l'evento pubblico nel calendario del suo gruppo. Lascialo deselezionato per approvare la prenotazione senza modificare la visibilità dell'evento.
2. Una volta spuntato **Pubblica nel calendario pubblico**, puoi facoltativamente scegliere un calendario curato da **Aggiungi anche al calendario** per aggiungere l'evento anche a uno dei tuoi [calendari curati](./curated-calendar.md). Lascialo su **Nessuno** per saltare questo passaggio. (Questa opzione compare solo se hai il permesso **content.edit**.)
3. Fai clic su **Approva**.

## Eventi in attesa

Se il flusso di lavoro del calendario richiede l'approvazione degli eventi prima che diventino visibili al pubblico, gli eventi in attesa compaiono nella sezione **Richieste di evento**. Fai clic su **Approva** per pubblicare un evento nel calendario, oppure su **Rifiuta** per avvisare chi l'ha inviato che sono necessarie modifiche.

:::tip
Imposta un Gruppo di approvazione su una stanza in [Stanze e risorse](./rooms-resources.md) per richiedere l'approvazione per quella stanza. I gruppi con accesso possono quindi richiedere la stanza quando creano eventi, e tali richieste arrivano in questa pagina.
:::

## Cronologia

Le richieste approvate e rifiutate restano nella pagina. Fai clic su **Cronologia** in alto in Approvazioni per vederle; fai clic su **In sospeso** per tornare alle richieste aperte.

- **Richieste di stanze e risorse** elenca ogni prenotazione decisa con l'evento, la stanza o la risorsa, **Richiesta da**, un badge **Approvata** o **Rifiutata** e **Decisa**, che mostra chi ha preso la decisione e in quale data. Le richieste decise più di recente compaiono per prime.
- **Richieste di evento** elenca ogni evento deciso con la sua descrizione, **Richiesta da** e un badge **Approvata** o **Rifiutata**. Non viene registrato chi ha deciso su una richiesta di evento né quando, quindi per gli eventi questa colonna non viene mostrata.

Fai clic su un nome sotto **Richiesta da** per aprire la scheda di quella persona.

## Articoli correlati

- [Stanze, risorse e pianificazione](./rooms-resources.md) — configura stanze e risorse prenotabili
- [Creazione di calendari](./creating-calendars.md) — gestisci calendari ed eventi
