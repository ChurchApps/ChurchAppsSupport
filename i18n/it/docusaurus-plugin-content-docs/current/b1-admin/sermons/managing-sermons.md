---
title: "Gestione sermoni"
---

# Gestione sermoni

<div class="article-intro">

La pagina Sermoni mostra l'intera tua libreria di sermoni. Da qui puoi aggiungere nuovi sermoni, modificare le voci esistenti e organizzare i tuoi contenuti per playlist. Ogni sermone può collegarsi a video o audio ospitati su YouTube, Vimeo, Facebook o un URL personalizzato.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno del permesso **contentApi.streamingServices.edit**. Vedi [Ruoli e permessi](../settings/roles-permissions.md) se non hai accesso.
- Crea almeno una [playlist](playlists) per organizzare i tuoi sermoni
- Tieni pronti i tuoi video ID o URL da YouTube, Vimeo o Facebook

</div>

## Visualizzare la tua libreria di sermoni

1. In B1 Admin, clicca **Sermons** nella barra laterale sinistra.
2. La pagina Sermoni mostra tutte le tue voci, organizzate per playlist. Ogni sermone mostra la sua miniatura, titolo e data.
3. Clicca su qualsiasi sermone per visualizzare o modificare i suoi dettagli.

## Aggiungere un sermone

1. Clicca il pulsante **Add Sermon** nell'angolo in alto a destra e seleziona **Add Sermon** dal menu a tendina.
2. Seleziona una **Playlist** a cui assegnare il sermone.
3. Scegli il tuo **Video Provider** -- YouTube, Vimeo, Facebook o Custom URL. Raccomandiamo YouTube perché funziona meglio con il sistema B1.
4. Inserisci il video ID o l'URL e clicca **Fetch**. Per YouTube, il video ID è la stringa di caratteri dopo `v=` nell'URL di YouTube.
5. Quando clicchi **Fetch**, i dettagli del sermone vengono importati automaticamente, inclusa la data di pubblicazione, la durata, il titolo, la descrizione e la miniatura.
6. Apporta le modifiche desiderate e clicca **Save**.

:::tip
Puoi anche aggiungere un URL di streaming dal vivo permanente selezionando **Add Permanent Live URL** dal menu a tendina **Add Sermon**. Questo crea una connessione persistente allo streaming dal vivo del tuo canale YouTube usando il tuo Channel ID. Vedi [Streaming dal vivo](live-streaming) per maggiori dettagli.
:::

## Modificare un sermone

1. Clicca su qualsiasi sermone nella tua libreria per aprire i suoi dettagli.
2. Aggiorna titolo, oratore, data, descrizione, miniatura o link ai media secondo necessità.
3. Clicca **Save** per applicare le modifiche.

## Dettagli del sermone

Ogni voce del sermone può includere:

- **Titolo** -- Il nome del sermone visualizzato ai visitatori
- **Oratore** -- Chi ha tenuto il sermone
- **Data** -- La data di pubblicazione o del sermone
- **Descrizione** -- Un riepilogo del contenuto del sermone
- **Miniatura** -- Un'immagine di anteprima mostrata nella tua libreria di sermoni
- **Link video/audio** -- URL ai media del sermone su YouTube, Vimeo, Facebook o un host personalizzato

## Programmare un sermone per lo streaming dal vivo

Dopo aver aggiunto un sermone, puoi programmarlo per la trasmissione sulla tua pagina di streaming dal vivo:

1. Vai alla scheda **Live Stream Times**.
2. Modifica un servizio e sotto **Video Settings**, seleziona il tuo sermone dal menu a tendina.
3. Il sermone verrà riprodotto all'orario del servizio programmato.

:::info
Per importare più sermoni contemporaneamente invece di aggiungerli uno alla volta, usa lo strumento [Importazione in blocco](bulk-import) per importare video direttamente dal tuo account YouTube o Vimeo.
:::

## Prossimi passi

- [Playlist](playlists) -- Organizza i sermoni in serie
- [Streaming dal vivo](live-streaming) -- Configura il tuo programma di streaming
- [Importazione in blocco](bulk-import) -- Importa più sermoni contemporaneamente
