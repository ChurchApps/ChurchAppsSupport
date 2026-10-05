---
title: "Approvazioni del calendario"
---

# Approvazioni del calendario

<div class="article-intro">

La pagina Approvazioni è dove gli amministratori esaminano e agiscono su richieste di prenotazione di stanze e risorse in sospeso, nonché gli eventi del calendario che richiedono l'approvazione prima di essere pubblicati.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configurate stanze o risorse con un **Gruppo di approvazione** in [Stanze e risorse](rooms-resources)
- Avete bisogno del permesso **Amministratore calendari** o del permesso **content.edit**

</div>

## Apertura delle approvazioni

In B1 Admin, aprite il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandete **Calendari**, e fate clic su **Approvazioni**. Le richieste di prenotazione in sospeso e gli eventi in attesa di revisione sono elencati qui.

## Richieste di prenotazione

Quando un gruppo crea un evento e richiede una stanza o una risorsa, la richiesta appare nel pannello **Richieste di stanza e risorse**. Ogni riga mostra:

- La stanza o la risorsa richiesta
- Il nome dell'evento e la data/ora
- Il gruppo richiedente

### Indicatori di conflitto

Se due richieste si sovrappongono per la stessa stanza o risorsa, appare un'icona di avvertimento di conflitto. Esaminate attentamente le richieste in conflitto prima di approvare una qualsiasi.

### Approvazione o rifiuto

Fate clic sull'icona **✓** (approva) o **✗** (rifiuta) su qualsiasi richiesta di prenotazione. Il gruppo richiedente viene notificato della decisione. Le prenotazioni approvate vengono bloccate a quella stanza o risorsa per l'evento; le prenotazioni rifiutate liberano lo slot per gli altri.

Quando fate clic su approva, si apre una finestra di dialogo **Approva prenotazione** in modo da poter pubblicare anche l'evento nello stesso passaggio:

1. Spuntate **Pubblica nel calendario pubblico** per rendere l'evento pubblico sul calendario del gruppo. Lasciate deselezionato per approvare la prenotazione senza modificare la visibilità dell'evento.
2. Una volta spuntato **Pubblica nel calendario pubblico**, potete opzionalmente scegliere un calendario curato da **Aggiungi anche al calendario** per aggiungere l'evento anche a uno dei vostri [calendari curati](curated-calendar). Lasciatelo impostato su **Nessuno** per saltare questo. (Questa opzione appare solo se avete il permesso **content.edit**.)
3. Fate clic su **Approva**.

## Eventi in sospeso

Se il vostro flusso di lavoro del calendario richiede l'approvazione dell'evento prima che gli eventi diventino visibili al pubblico, gli eventi in sospeso appaiono nel pannello **Richieste di evento**. Approvate un evento per pubblicarlo nel calendario, o rifiutatelo per notificare al presentatore che sono necessarie modifiche.

:::tip
Configurate un Gruppo di approvazione su una stanza in [Stanze e risorse](rooms-resources) per richiedere l'approvazione per quella stanza. I gruppi con accesso possono quindi richiedere la stanza quando creano eventi, e quelle richieste fluiscono in questa pagina.
:::

## Articoli correlati

- [Stanze, risorse e pianificazione](rooms-resources) — configurate stanze e risorse prenotabili
- [Creazione di calendari](creating-calendars) — gestite calendari ed eventi
