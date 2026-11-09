---
title: "Scrivere articoli del blog per il tuo sito in B1 Admin"
sidebar_label: "Blog"
description: "Crea, programma e pubblica articoli sul blog del sito della chiesa in B1 Admin, con estratti, categorie, tag, foto di intestazione e commenti incorporati."
---

# Blog

<div class="article-intro">

La pagina Blog ti permette di pubblicare notizie, aggiornamenti e meditazioni sul sito web della chiesa. Gli articoli compaiono in un elenco di schede su `/blog`, ciascuno al proprio URL, e in un feed RSS che altri strumenti (come Zapier) possono monitorare per i nuovi articoli.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [Configurazione iniziale](./initial-setup.md) per il tuo sito web
- Aggiungi un link di navigazione a `/blog` da [Gestire le pagine](./managing-pages.md) se vuoi che i visitatori trovino il blog dal menu

</div>

## Accedere al blog

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Sito web**.
2. Fai clic su **Blog**.
3. La pagina Blog elenca ogni articolo insieme al suo stato e alla data di pubblicazione.

## Aggiungere un articolo

1. Fai clic su **Aggiungi articolo** nell'angolo in alto a destra.
2. Inserisci un **Titolo**. Un **Indirizzo web** (slug) adatto agli URL viene generato automaticamente mentre digiti -- puoi modificarlo direttamente se vuoi un indirizzo diverso.
3. Aggiungi un **Estratto** -- un breve riassunto mostrato nell'elenco degli articoli, nelle meta descrizioni e nel feed RSS. Se lo lasci vuoto, viene generato automaticamente dall'inizio del contenuto dell'articolo.
4. Scrivi il corpo dell'articolo nell'editor **Contenuto** usando Markdown. Fai clic su **Anteprima** per vedere come apparirà l'articolo formattato.
5. Scegli una **Categoria** (seleziona una esistente oppure digitane una nuova) e dei **Tag** facoltativi separati da virgole.
6. Fai clic su **Seleziona immagine** per scegliere una foto dalla tua galleria [File](./files.md), oppure caricane una nuova. Le foto caricate si aprono in uno strumento di ritaglio integrato bloccato sul rapporto 16:9, così puoi inquadrare qualsiasi foto per adattarla all'intestazione dell'articolo e alle schede dell'elenco.
7. Imposta l'**Autore** -- per impostazione predefinita sei tu, ma puoi cercare e selezionare qualsiasi persona nel tuo database.
8. Attiva **Pubblicato** e imposta una **Data di pubblicazione** quando sei pronto a rendere pubblico l'articolo. Lascialo disattivato per salvare l'articolo come bozza.

:::tip
Imposta una **Data di pubblicazione** futura per programmare un articolo. Resta nascosto ai visitatori e mostra un chip **Programmato** nell'elenco del Blog fino a quella data.
:::

## Stati degli articoli

Ogni articolo nell'elenco mostra uno di tre stati:

- **Bozza** -- Non pubblicato. Visibile solo nell'amministrazione.
- **Programmato** -- Pubblicato è attivo, ma la data di pubblicazione è nel futuro.
- **Pubblicato** -- Online sul sito web e incluso nel feed RSS.

## Modificare, visualizzare in anteprima ed eliminare gli articoli

- Fai clic su **Modifica** accanto a un articolo per apportare modifiche.
- Fai clic su **Visualizza sul sito** (mostrato sugli articoli pubblicati) per aprire l'articolo online sul sito web in una nuova scheda.
- Fai clic su **Elimina** per rimuovere in modo definitivo un articolo.

## Come vedono il blog i visitatori

Gli articoli pubblicati compaiono su `{yoursite}/blog`, 10 per pagina con i link **Precedenti**/**Successivi** per scorrere l'archivio, insieme a un filtro per categoria e alla firma e alla foto di ciascun articolo. Anche i tag vengono mostrati come chip cliccabili, che permettono ai visitatori di filtrare l'elenco per tag allo stesso modo. I singoli articoli si trovano su `{yoursite}/blog/{slug}` e includono articoli correlati della stessa categoria. La pagina del blog pubblica anche un feed RSS, rilevabile automaticamente dai lettori di feed e dagli strumenti di automazione come Zapier.

Gli articoli pubblicati possono comparire anche in una sezione **Notizie** nella schermata Home dell'app della chiesa, se la attivi -- vedi [Sezioni della schermata Home](../settings/mobile-app.md#home-screen-sections).

:::info
Gli articoli del blog sono un tipo di contenuto separato dalle normali pagine del sito web -- non vengono creati nell'[editor di pagine](./page-editor.md) e non compaiono nell'elenco delle Pagine. Questo mantiene la scrittura degli articoli rapida e concentrata sul testo.
:::

## Aggiungere commenti sotto gli articoli

B1 non ospita direttamente i commenti del blog, ma puoi aggiungere un servizio di commenti. Puoi anche inserire qualsiasi altro elemento sotto ogni articolo, come un modulo di iscrizione alla newsletter o un pulsante per le donazioni.

1. Registrati presso un servizio di commenti come [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) oppure [Disqus](https://disqus.com) e copia il suo codice di incorporamento.
2. Nella pagina Blog, scorri fino a **Sotto ogni articolo**.
3. Incolla il codice di incorporamento e fai clic su **Salva**.

Il codice compare sotto il contenuto di ogni articolo pubblicato. Il tuo servizio di commenti gestisce la moderazione e il filtraggio dello spam, quindi controllane regolarmente la dashboard.

:::tip
Svuota la casella e fai clic su **Salva** per rimuovere il codice da tutti gli articoli. Solo chi può modificare le impostazioni della chiesa vede questa casella.
:::

## Passi successivi

- [Gestire le pagine](./managing-pages.md) -- aggiungi un link di navigazione al tuo blog
- [File](./files.md) -- carica foto da usare nei tuoi articoli
- [Integrazione con Zapier](../integrations/zapier.md) -- attiva automazioni quando vengono pubblicati nuovi articoli
