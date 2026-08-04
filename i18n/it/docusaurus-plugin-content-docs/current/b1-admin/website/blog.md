---
title: "Blog"
---

# Blog

<div class="article-intro">

La pagina Blog ti permette di pubblicare notizie, aggiornamenti e riflessioni sul sito web della tua chiesa. I post appaiono in un elenco di schede su `/blog`, al proprio URL dedicato, e in un feed RSS che altri strumenti (come Zapier) possono monitorare per i nuovi post.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Completa la [Configurazione Iniziale](initial-setup) per il tuo sito web
- Aggiungi un link di navigazione a `/blog` da [Gestione delle Pagine](managing-pages) se vuoi che i visitatori trovino il tuo blog dal menu

</div>

## Accedere al Blog

1. In B1 Admin, clicca su **Website** nel menu a sinistra.
2. Clicca sulla scheda **Blog** in alto nella vista Website Pages.
3. La pagina Blog elenca ogni post insieme al suo stato e alla data di pubblicazione.

## Aggiungere un Post

1. Clicca su **Add Post** nell'angolo in alto a destra.
2. Inserisci un **Title**. Uno slug adatto agli URL viene generato automaticamente mentre digiti -- puoi modificarlo direttamente se vuoi un indirizzo diverso.
3. Aggiungi un **Excerpt** -- un breve riassunto mostrato nell'elenco dei post, nelle meta description e nel feed RSS. Se lo lasci vuoto, ne viene generato uno automaticamente dall'inizio del contenuto del post.
4. Scrivi il corpo del post nell'editor **Content** utilizzando Markdown. Clicca su **Preview** per vedere come apparirà il post formattato.
5. Scegli una **Category** (seleziona una esistente o digitane una nuova) e **Tags** opzionali separati da virgola.
6. Clicca su **Select Image** per scegliere una foto dalla tua galleria [File](files), oppure caricane una nuova. Le foto caricate si aprono in uno strumento di ritaglio integrato bloccato su un rapporto 16:9, così puoi inquadrare qualsiasi foto per adattarla all'intestazione del post e alle schede dell'elenco.
7. Imposta l'**Author** -- per impostazione predefinita sei tu, ma puoi cercare e selezionare qualsiasi persona nel tuo database.
8. Attiva **Published** e imposta una **Publish Date** quando sei pronto a rendere pubblico il post. Lascialo disattivato per salvare il post come bozza.

:::tip
Imposta una **Publish Date** futura per programmare un post. Rimane nascosto ai visitatori e mostra un chip **Scheduled** nell'elenco Blog finché non arriva quella data.
:::

## Stati del Post

Ogni post nell'elenco mostra uno di tre stati:

- **Draft** -- Non pubblicato. Visibile solo nell'area amministrativa.
- **Scheduled** -- Published è attivo, ma la data di pubblicazione è nel futuro.
- **Published** -- Attivo sul tuo sito web e incluso nel feed RSS.

## Modificare, Anteprima ed Eliminare i Post

- Clicca sull'icona **Edit** accanto a un post per apportare modifiche.
- Clicca sull'icona **View** (visibile sui post pubblicati) per aprire il post live sul tuo sito web in una nuova scheda.
- Clicca sull'icona **Delete** per rimuovere definitivamente un post.

## Come i Visitatori Vedono il Tuo Blog

I post pubblicati appaiono su `{yoursite}/blog`, 10 per pagina con link **Older**/**Newer** per scorrere il tuo archivio, insieme a un filtro per categoria e alla firma e foto di ogni post. Anche i tag vengono visualizzati come chip cliccabili, permettendo ai visitatori di filtrare l'elenco per tag allo stesso modo. I singoli post si trovano su `{yoursite}/blog/{slug}` e includono post correlati della stessa categoria. La pagina del blog pubblica anche un feed RSS, individuabile automaticamente dai lettori di feed e da strumenti di automazione come Zapier.

:::info
I post del blog sono un tipo di contenuto separato dalle normali pagine del sito web -- non vengono creati nell'[editor delle pagine](page-editor) e non appaiono nell'elenco Pages. Questo mantiene la scrittura del blog veloce e concentrata sulla scrittura stessa.
:::

## Prossimi Passi

- [Gestione delle Pagine](managing-pages) -- Aggiungi un link di navigazione al tuo blog
- [File](files) -- Carica foto da usare nei tuoi post
- [Integrazione Zapier](../integrations/zapier.md) -- Attiva automazioni quando vengono pubblicati nuovi post
