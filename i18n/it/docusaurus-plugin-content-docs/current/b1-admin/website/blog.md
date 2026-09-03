---
title: "Blog"
---

# Blog

<div class="article-intro">

La pagina Blog ti permette di pubblicare notizie, aggiornamenti e devozionali sul sito web della tua chiesa. I post appaiono in un elenco di carte a `/blog`, al loro proprio URL e in un feed RSS che altri strumenti (come Zapier) possono osservare per nuovi post.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Completa la [Configurazione Iniziale](initial-setup) per il tuo sito web
- Aggiungi un link di navigazione a `/blog` da [Gestione delle Pagine](managing-pages) se desideri che i visitatori trovino il tuo blog dal menu

</div>

## Accesso al Blog

1. In B1 Admin, fai clic su **Website** nel menu di sinistra.
2. Fai clic sulla scheda **Blog** in alto nella vista Website Pages.
3. La pagina Blog elenca ogni post insieme al suo stato e data di pubblicazione.

## Aggiunta di un Post

1. Fai clic su **Add Post** nell'angolo in alto a destra.
2. Immetti un **Title**. Un slug amichevole per gli URL viene generato automaticamente mentre digiti — puoi modificarlo direttamente se desideri un indirizzo diverso.
3. Aggiungi un **Excerpt** — un breve riassunto mostrato nell'elenco dei post, nelle descrizioni meta e nel feed RSS. Se lo lasci vuoto, ne viene generato uno automaticamente dall'inizio del contenuto del tuo post.
4. Scrivi il corpo del post nell'editor **Content** utilizzando Markdown. Fai clic su **Preview** per vedere come apparirà il post formattato.
5. Scegli una **Category** (scegli una esistente o digita una nuova) e **Tags** opzionali separati da virgola.
6. Fai clic su **Select Image** per scegliere una foto dalla galleria [Files](files) o carica una nuova. Le foto caricate si aprono in uno strumento di ritaglio integrato bloccato a un rapporto 16:9, in modo che tu possa inquadrare qualsiasi foto per adattarsi all'intestazione del post e alle schede di elenco.
7. Imposta l'**Author** — per impostazione predefinita è tu, ma puoi cercare e selezionare qualsiasi persona nel tuo database.
8. Attiva **Published** e imposta una **Publish Date** quando sei pronto a rendere il post pubblico. Lascialo spento per salvare il post come bozza.

:::tip
Imposta una **Publish Date** nel futuro per programmare un post. Rimane nascosto dai visitatori e mostra un chip **Scheduled** nell'elenco Blog fino a quando quella data arriva.
:::

## Stati dei Post

Ogni post nell'elenco mostra uno di tre stati:

- **Draft** -- Non pubblicato. Visibile solo nell'admin.
- **Scheduled** -- Published è acceso, ma la data di pubblicazione è nel futuro.
- **Published** -- Live sul tuo sito web e incluso nel feed RSS.

## Modifica, Anteprima ed Eliminazione dei Post

- Fai clic sull'icona **Edit** accanto a un post per apportare modifiche.
- Fai clic sull'icona **View** (visibile sui post pubblicati) per aprire il post live sul tuo sito web in una nuova scheda.
- Fai clic sull'icona **Delete** per rimuovere permanentemente un post.

## Come i Visitatori Vedono il Tuo Blog

I post pubblicati appaiono a `{yoursite}/blog`, 10 per pagina con link **Older**/**Newer** per scorrere l'archivio, insieme a un filtro di categoria e la firma e la foto di ogni post. I tag vengono visualizzati come chip cliccabili anche, permettendo ai visitatori di filtrare l'elenco per tag nello stesso modo. I post individuali vivono a `{yoursite}/blog/{slug}` e includono post correlati dalla stessa categoria. La pagina del blog pubblica anche un feed RSS, auto-scopribile dai lettori di feed e strumenti di automazione come Zapier.

:::info
I post del blog sono un tipo di contenuto separato dalle normali pagine del sito web — non vengono creati nell'[editor di pagina](page-editor) e non appaiono nell'elenco Pages. Questo mantiene la creazione di blog veloce e concentrata sulla scrittura.
:::

## Prossimi Passaggi

- [Gestione delle Pagine](managing-pages) -- Aggiungi un link di navigazione al tuo blog
- [Files](files) -- Carica foto da usare nei tuoi post
- [Integrazione Zapier](../integrations/zapier.md) -- Attiva le automazioni quando vengono pubblicati nuovi post
