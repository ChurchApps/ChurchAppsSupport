---
title: "Gestione dei Sermoni"
---

# Gestione dei Sermoni

<div class="article-intro">

La pagina Sermoni visualizza l'intera libreria di sermoni. Da qui puoi aggiungere nuovi sermoni, modificare le voci esistenti e organizzare i tuoi contenuti per playlist. Ogni sermone può collegare video o audio ospitati su YouTube, Vimeo, Facebook o un URL personalizzato.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- È necessario il permesso **contentApi.streamingServices.edit**. Vedi [Ruoli & Permessi](../settings/roles-permissions.md) se non hai accesso.
- Crea almeno una [playlist](playlists) per organizzare i tuoi sermoni
- Tieni pronti i tuoi ID video o URL da YouTube, Vimeo o Facebook

</div>

## Visualizzazione della Libreria di Sermoni

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Sermoni** e fai clic su **Sermoni**.
2. La pagina Sermoni mostra tutti i tuoi sermoni, organizzati per playlist. Ogni sermone mostra la sua miniatura, titolo e data.
3. Fai clic su un qualsiasi sermone per visualizzare o modificare i suoi dettagli.

## Aggiungere un Sermone

1. Fai clic sul pulsante **Aggiungi Sermone** nell'angolo in alto a destra e seleziona **Aggiungi Sermone** dal menu a discesa.
2. Seleziona una **Playlist** a cui assegnare il sermone.
3. Scegli il tuo **Fornitore Video** -- YouTube, Vimeo, Facebook o URL Personalizzato. Consigliamo YouTube perché funziona meglio con il sistema B1.
4. Inserisci l'ID video o l'URL e fai clic su **Recupera**. Per YouTube, l'ID video è la stringa di caratteri dopo `v=` nell'URL di YouTube.
5. Quando fai clic su **Recupera**, i dettagli del sermone vengono importati automaticamente, inclusa la data di pubblicazione, la durata, il titolo, la descrizione e la miniatura.
6. Apporta le modifiche che desideri e fai clic su **Salva**.

:::tip
Puoi anche aggiungere un URL di live stream permanente selezionando **Aggiungi URL Live Permanente** dal menu a discesa **Aggiungi Sermone**. Questo crea una connessione persistente al live stream del tuo canale YouTube utilizzando il tuo ID canale. Vedi [Live Streaming](live-streaming) per ulteriori dettagli.
:::

## Modifica di un Sermone

1. Fai clic su un qualsiasi sermone nella tua libreria per aprire i suoi dettagli.
2. Aggiorna il titolo, il relatore, la data, la descrizione, la miniatura o i link multimediali secondo le tue esigenze.
3. Fai clic su **Salva** per applicare le tue modifiche.

## Dettagli del Sermone

Ogni voce di sermone può includere:

- **Titolo** -- Il nome del sermone visualizzato ai visitatori
- **Relatore** -- Chi ha pronunciato il sermone
- **Data** -- La data di pubblicazione o consegna
- **Descrizione** -- Un riassunto del contenuto del sermone
- **Miniatura** -- Un'immagine di anteprima mostrata nella tua libreria di sermoni
- **Link Video/Audio** -- URL al contenuto del sermone su YouTube, Vimeo, Facebook o un host personalizzato
- **URL del File Audio (per il podcast)** -- Un collegamento diretto a un file MP3/M4A per questo sermone. Incolla un URL o fai clic su **Carica Audio** per caricare un file e compilarlo automaticamente. Solo i sermoni con questo campo (o un collegamento diretto a file video) impostato sono inclusi nel tuo feed podcast.

## Il Tuo Feed Podcast

Una volta che almeno un sermone ha un file audio o video allegato, B1 Admin genera automaticamente un feed RSS podcast per la tua chiesa -- non c'è nulla da attivare. Trovalo nel pannello **Feed Podcast** sotto l'elenco dei sermoni: fai clic sull'icona di copia per copiare l'URL del feed, quindi invia quell'URL ad Apple Podcasts, Spotify o a qualsiasi altra directory podcast.

:::info
I sermoni che collegano solo a un lettore incorporato (come un ID video YouTube o Vimeo) non appariranno nel feed podcast -- le app podcast hanno bisogno di un file multimediale diretto e scaricabile. Aggiungi un **URL del File Audio** per includere un sermone.
:::

## Pianificazione di un Sermone per il Live Stream

Dopo aver aggiunto un sermone, puoi pianificarlo per la trasmissione sulla tua pagina di live stream:

1. Nel menu Jump, scegli **Sermoni > Orari Live Stream**.
2. Modifica un servizio e sotto **Impostazioni Video**, seleziona il tuo sermone dal menu a discesa.
3. Il sermone verrà riprodotto all'ora del servizio pianificato.

:::info
Per importare più sermoni contemporaneamente invece di aggiungerli uno per uno, utilizza lo strumento [Importazione in Blocco](bulk-import) per estrarre i video direttamente dal tuo account YouTube o Vimeo.
:::

## Passi Successivi

- [Playlist](playlists) -- Organizza i sermoni in serie
- [Live Streaming](live-streaming) -- Configura la tua pianificazione di streaming
- [Importazione in Blocco](bulk-import) -- Importa più sermoni contemporaneamente
