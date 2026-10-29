---
title: "Blog"
---

# Blog

<div class="article-intro">

La pagina Blog ti permette di pubblicare notizie, aggiornamenti e meditazioni sul sito web della tua chiesa. Gli articoli appaiono in un elenco a schede su `/blog`, ciascuno al proprio URL, e in un feed RSS che altri strumenti (come Zapier) possono controllare per i nuovi articoli.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [configurazione iniziale](initial-setup) per il tuo sito web
- Aggiungi un link di navigazione a `/blog` da [Gestire le pagine](managing-pages) se vuoi che i visitatori trovino il blog dal menu

</div>

## Accedere al blog

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Sito web**.
2. Clicca su **Blog**.
3. La pagina Blog elenca tutti gli articoli con il loro stato e la data di pubblicazione.

## Aggiungere un articolo

1. Clicca su **Aggiungi articolo** in alto a destra.
2. Inserisci un **Titolo**. Mentre scrivi, viene generato automaticamente un **Indirizzo web** (slug) adatto agli URL -- puoi modificarlo direttamente se vuoi un indirizzo diverso.
3. Aggiungi un **Estratto** -- un breve riassunto mostrato nell'elenco degli articoli, nelle meta descrizioni e nel feed RSS. Se lo lasci vuoto, ne viene generato uno automaticamente dall'inizio del contenuto dell'articolo.
4. Scrivi il corpo dell'articolo nell'editor **Contenuto** usando Markdown. Clicca su **Anteprima** per vedere come apparirà l'articolo formattato.
5. Scegli una **Categoria** (seleziona una esistente o scrivine una nuova) e, facoltativamente, dei **Tag** separati da virgole.
6. Clicca su **Seleziona immagine** per scegliere una foto dalla tua galleria [File](files), oppure caricane una nuova. Le foto caricate si aprono in uno strumento di ritaglio integrato bloccato al rapporto 16:9, così puoi inquadrare qualsiasi foto per adattarla all'intestazione dell'articolo e alle schede dell'elenco.
7. Imposta l'**Autore** -- per impostazione predefinita sei tu, ma puoi cercare e selezionare qualsiasi persona nel database.
8. Attiva **Pubblicato** e imposta una **Data di pubblicazione** quando sei pronto a rendere pubblico l'articolo. Lascialo disattivato per salvare l'articolo come bozza.

:::tip
Imposta una **Data di pubblicazione** futura per programmare un articolo. Resta nascosto ai visitatori e mostra un'etichetta **Programmato** nell'elenco del Blog fino a quella data.
:::

## Stati degli articoli

Ogni articolo nell'elenco mostra uno di tre stati:

- **Bozza** -- Non pubblicato. Visibile solo nell'area di amministrazione.
- **Programmato** -- Pubblicato è attivo, ma la data di pubblicazione è nel futuro.
- **Pubblicato** -- Online sul tuo sito web e incluso nel feed RSS.

## Modificare, visualizzare in anteprima ed eliminare gli articoli

- Clicca su **Modifica** accanto a un articolo per apportare modifiche.
- Clicca su **Visualizza sul sito** (mostrato sugli articoli pubblicati) per aprire l'articolo online sul tuo sito web in una nuova scheda.
- Clicca su **Elimina** per rimuovere definitivamente un articolo.

## Come i visitatori vedono il tuo blog

Gli articoli pubblicati appaiono su `{yoursite}/blog`, 10 per pagina, con i link **Precedenti**/**Successivi** per sfogliare l'archivio, insieme a un filtro per categoria e al nome dell'autore e alla foto di ciascun articolo. Anche i tag appaiono come chip cliccabili, permettendo ai visitatori di filtrare l'elenco per tag allo stesso modo. I singoli articoli si trovano su `{yoursite}/blog/{slug}` e includono articoli correlati della stessa categoria. La pagina del blog pubblica anche un feed RSS, rilevato automaticamente dai lettori di feed e da strumenti di automazione come Zapier.

:::info
Gli articoli del blog sono un tipo di contenuto separato dalle normali pagine del sito -- non vengono creati nell'[editor di pagine](page-editor) e non compaiono nell'elenco delle Pagine. Questo rende la scrittura degli articoli rapida e concentrata sul testo.
:::

## Aggiungere commenti sotto gli articoli

B1 non ospita direttamente i commenti del blog, ma puoi aggiungere un servizio di commenti. Puoi anche inserire sotto ogni articolo qualsiasi altro elemento, come un modulo di iscrizione alla newsletter o un pulsante per le offerte.

1. Registrati a un servizio di commenti come [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) o [Disqus](https://disqus.com) e copia il suo codice di incorporamento.
2. Nella pagina Blog, scorri fino a **Sotto ogni articolo**.
3. Incolla il codice di incorporamento e clicca su **Salva**.

Il codice compare sotto il contenuto di ogni articolo pubblicato. Il tuo servizio di commenti gestisce la moderazione e il filtraggio dello spam, quindi controlla regolarmente la sua dashboard.

:::tip
Svuota la casella e clicca su **Salva** per rimuovere il codice da tutti gli articoli. Solo le persone che possono modificare le impostazioni della chiesa vedono questa casella.
:::

## Passi successivi

- [Gestire le pagine](managing-pages) -- Aggiungi un link di navigazione al tuo blog
- [File](files) -- Carica foto da usare nei tuoi articoli
- [Integrazione Zapier](../integrations/zapier.md) -- Attiva automazioni quando vengono pubblicati nuovi articoli
