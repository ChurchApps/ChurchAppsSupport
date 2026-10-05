---
title: "Blog"
---

# Blog

<div class="article-intro">

La pagina Blog ti permette di pubblicare notizie, aggiornamenti e devozionali sul sito web della tua chiesa. I post compaiono in un elenco di schede a `/blog`, al loro URL proprio e in un feed RSS che altri strumenti (come Zapier) possono monitorare per i nuovi post.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Completa la [Configurazione Iniziale](initial-setup) per il tuo sito web
- Aggiungi un link di navigazione a `/blog` da [Gestione Pagine](managing-pages) se desideri che i visitatori trovino il tuo blog dal menu

</div>

## Accesso al Blog

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) e espandi **Website**.
2. Fai clic su **Blog**.
3. La pagina Blog elenca ogni post insieme al suo stato e alla data di pubblicazione.

## Aggiunta di un Post

1. Fai clic su **Aggiungi Post** nell'angolo in alto a destra.
2. Inserisci un **Titolo**. Uno slug URL-friendly viene generato per te automaticamente mentre digiti -- puoi modificarlo direttamente se desideri un indirizzo diverso.
3. Aggiungi un **Estratto** -- un breve riassunto mostrato nell'elenco dei post, nelle descrizioni meta e nel feed RSS. Se lo lasci vuoto, uno viene generato automaticamente dall'inizio del contenuto del tuo post.
4. Scrivi il corpo del post nell'editor **Contenuto** utilizzando Markdown. Fai clic su **Anteprima** per vedere come apparirà il post formattato.
5. Scegli una **Categoria** (scegline una esistente o digita una nuova) e **Tag** opzionali separati da virgole.
6. Fai clic su **Seleziona Immagine** per scegliere una foto dalla tua galleria [File](files), o caricane una nuova. Le foto caricate si aprono in uno strumento di ritaglio incorporato bloccato a un rapporto 16:9, in modo che tu possa inquadrare qualsiasi foto per adattarla all'intestazione del post e alle schede di elenco.
7. Imposta l'**Autore** -- per impostazione predefinita è te, ma puoi cercare e selezionare qualsiasi persona nel tuo database.
8. Attiva **Pubblicato** e imposta una **Data di Pubblicazione** quando sei pronto a rendere il post pubblico. Lascialo disattivato per salvare il post come bozza.

:::tip
Imposta una **Data di Pubblicazione** nel futuro per pianificare un post. Rimane nascosto dai visitatori e mostra un chip **Programmato** nell'elenco Blog fino a quando non arriva quella data.
:::

## Stati dei Post

Ogni post nell'elenco mostra uno di tre stati:

- **Bozza** -- Non pubblicato. Visibile solo nell'admin.
- **Programmato** -- Pubblicato è attivo, ma la data di pubblicazione è nel futuro.
- **Pubblicato** -- Live sul tuo sito web e incluso nel feed RSS.

## Modifica, Anteprima ed Eliminazione di Post

- Fai clic sull'icona **Modifica** accanto a un post per apportare modifiche.
- Fai clic sull'icona **Visualizza** (visibile sui post pubblicati) per aprire il post live sul tuo sito web in una nuova scheda.
- Fai clic sull'icona **Elimina** per rimuovere permanentemente un post.

## Come i Visitatori Vedono il Tuo Blog

I post pubblicati compaiono a `{tuosito}/blog`, 10 per pagina con link **Precedenti**/**Successivi** per sfogliare il tuo archivio, insieme a un filtro di categoria e la firma e la foto di ogni post. I tag vengono visualizzati anche come schede cliccabili, consentendo ai visitatori di filtrare l'elenco per tag allo stesso modo. I post individuali si trovano a `{tuosito}/blog/{slug}` e includono post correlati dalla stessa categoria. La pagina del blog pubblica anche un feed RSS, auto-rilevabile dai lettori di feed e da strumenti di automazione come Zapier.

:::info
I post del blog sono un tipo di contenuto separato dalle normali pagine del sito web -- non sono costruiti nell'[editor di pagine](page-editor) e non compaiono nell'elenco delle Pagine. Questo mantiene la creazione di blog veloce e focalizzata sulla scrittura.
:::

## Prossimi Passaggi

- [Gestione Pagine](managing-pages) -- Aggiungi un link di navigazione al tuo blog
- [File](files) -- Carica foto da usare nei tuoi post
- [Integrazione Zapier](../integrations/zapier.md) -- Attiva automazioni quando vengono pubblicati nuovi post
