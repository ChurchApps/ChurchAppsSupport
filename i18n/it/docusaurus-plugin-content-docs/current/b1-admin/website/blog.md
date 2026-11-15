---
title: "Scrivere articoli per il blog del tuo sito in B1 Admin"
sidebar_label: "Blog"
description: "Crea, programma e pubblica articoli di blog sul sito della tua chiesa in B1 Admin, con estratti, categorie, tag, foto di intestazione e incorporamenti dei commenti."
---

# Blog

<div class="article-intro">

La pagina Blog ti permette di pubblicare notizie, aggiornamenti e meditazioni sul sito della tua chiesa. Gli articoli appaiono in un elenco a schede su `/blog`, ciascuno al proprio URL, e in un feed RSS che altri strumenti (come Zapier) possono controllare per rilevare i nuovi articoli.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [configurazione iniziale](./initial-setup.md) del tuo sito
- Aggiungi un collegamento di navigazione a `/blog` da [Gestire le pagine](./managing-pages.md) se vuoi che i visitatori trovino il blog dal menu

</div>

## Accedere al blog {#accessing-the-blog}

1. In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Sito web**.
2. Fai clic su **Blog**.
3. La pagina Blog elenca tutti gli articoli, con il loro stato e la data di pubblicazione.

## Aggiungere un articolo {#adding-a-post}

1. Fai clic su **Aggiungi articolo** in alto a destra.
2. Inserisci un **Titolo**. Un **Indirizzo web** (slug) adatto agli URL viene generato automaticamente mentre digiti — puoi modificarlo direttamente se vuoi un indirizzo diverso.
3. Aggiungi un **Estratto** — un breve riepilogo mostrato nell'elenco degli articoli, nelle descrizioni meta e nel feed RSS. Se lo lasci vuoto, ne viene generato uno automaticamente dall'inizio del contenuto dell'articolo.
4. Scrivi il corpo dell'articolo nell'editor del **Contenuto** usando Markdown. Fai clic su **Anteprima** per vedere come apparirà l'articolo formattato.
5. Scegli una **Categoria** (seleziona una esistente oppure digitane una nuova) e, se vuoi, dei **Tag** separati da virgole.
6. Fai clic su **Seleziona immagine** per scegliere una foto dalla galleria dei tuoi [File](./files.md), oppure caricane una nuova. Le foto caricate si aprono in uno strumento di ritaglio integrato bloccato sul rapporto 16:9, così puoi inquadrare qualsiasi foto per adattarla all'intestazione dell'articolo e alle schede dell'elenco.
7. Imposta l'**Autore** — per impostazione predefinita sei tu, ma puoi cercare e selezionare qualsiasi persona presente nel database.
8. Attiva **Pubblicato** quando sei pronto a rendere pubblico l'articolo. Compare un campo **Data di pubblicazione** impostato su oggi; cambialo se vuoi una data diversa. Lascia l'interruttore su **Bozza** per salvare l'articolo come bozza.
9. Fai clic su **Salva**. Un articolo richiede un titolo e un indirizzo web che nessun altro articolo usa.

:::tip
Imposta una **Data di pubblicazione** futura per programmare un articolo. Resta nascosto ai visitatori e mostra un'etichetta **Programmato** nell'elenco del Blog finché quella data non arriva.
:::

## Stati degli articoli {#post-states}

Ogni articolo nell'elenco mostra uno di tre stati:

- **Bozza** -- Non pubblicato. Visibile solo nell'area di amministrazione.
- **Programmato** -- Pubblicato è attivo, ma la data di pubblicazione è nel futuro.
- **Pubblicato** -- Online sul tuo sito e incluso nel feed RSS.

## Modificare, visualizzare in anteprima ed eliminare gli articoli {#editing-previewing-and-deleting-posts}

- Fai clic su **Modifica** accanto a un articolo per apportare modifiche.
- Fai clic su **Visualizza sul sito** (mostrato sugli articoli pubblicati) per aprire l'articolo online sul tuo sito in una nuova scheda.
- Fai clic su **Elimina** per rimuovere un articolo in modo permanente.

## Come i visitatori vedono il tuo blog {#how-visitors-see-your-blog}

Gli articoli pubblicati appaiono su `{yoursite}/blog`, 10 per pagina con i collegamenti **Articoli meno recenti**/**Articoli più recenti** per sfogliare l'archivio, insieme a etichette di categoria che filtrano l'elenco e alla firma e alla foto di ciascun articolo. I tag compaiono come etichette cliccabili in fondo a ogni articolo, e permettono ai visitatori di filtrare l'elenco per tag allo stesso modo. I singoli articoli si trovano su `{yoursite}/blog/{slug}` e terminano con una sezione **Altro in** *categoria* che elenca fino a tre altri articoli della stessa categoria. Vedi [Blog](../../b1-church/content/blog.md) nella guida di B1.church per ciò che vedono i visitatori. La pagina del blog pubblica anche un feed RSS, rilevabile automaticamente da lettori di feed e strumenti di automazione come Zapier.

Gli articoli pubblicati possono comparire anche in una sezione **Notizie** nella schermata Home dell'app della tua chiesa, se la attivi — vedi [Sezioni della schermata Home](../settings/mobile-app.md#home-screen-sections).

:::info
Gli articoli del blog sono un tipo di contenuto separato dalle normali pagine del sito — non si creano nell'[editor di pagina](./page-editor.md) e non compaiono nell'elenco delle Pagine. Questo mantiene la scrittura degli articoli rapida e concentrata sul testo.
:::

## Aggiungere commenti sotto gli articoli {#adding-comments-below-posts}

B1 non ospita direttamente i commenti del blog, ma puoi aggiungere un servizio di commenti. Puoi anche inserire qualsiasi altro elemento sotto ogni articolo, come un modulo di iscrizione alla newsletter o un pulsante per le donazioni.

1. Registrati a un servizio di commenti come [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) o [Disqus](https://disqus.com) e copia il suo codice di incorporamento.
2. Nella pagina Blog, scorri fino a **Sotto ogni articolo**.
3. Incolla il codice di incorporamento e fai clic su **Salva**.

Il codice compare sotto il contenuto di ogni articolo pubblicato. Il tuo servizio di commenti gestisce la moderazione e il filtraggio dello spam, quindi controlla regolarmente la sua dashboard.

:::tip
Svuota la casella e fai clic su **Salva** per rimuovere il codice da tutti gli articoli. Solo chi può modificare le impostazioni della chiesa vede questa casella.
:::

## Passaggi successivi {#next-steps}

- [Gestire le pagine](./managing-pages.md) -- Aggiungi un collegamento di navigazione al tuo blog
- [File](./files.md) -- Carica foto da usare nei tuoi articoli
- [Integrazione Zapier](../integrations/zapier.md) -- Avvia automazioni quando vengono pubblicati nuovi articoli
