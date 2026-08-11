---
title: "Gestione sermoni"
---

# Gestione sermoni

<div class="article-intro">

La pagina Sermoni visualizza la tua intera libreria di sermoni. Da qui puoi aggiungere nuovi sermoni, modificare voci esistenti e organizzare il tuo contenuto per playlist. Ogni sermone può collegare video o audio ospitato su YouTube, Vimeo, Facebook o un URL personalizzato.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno dell'autorizzazione **contentApi.streamingServices.edit**. Vedi [Ruoli e autorizzazioni](../settings/roles-permissions.md) se non hai accesso.
- Crea almeno una [playlist](playlists) per organizzare i tuoi sermoni in
- Hai i tuoi ID video o URL pronti da YouTube, Vimeo o Facebook

</div>

## Visualizzazione della tua libreria di sermoni

1. In B1 Admin, apri il **menu sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Sermoni**.
2. La pagina Sermoni mostra tutte le tue voci di sermoni, organizzate per playlist. Ogni sermone visualizza l'anteprima, il titolo e la data.
3. Fai clic su qualsiasi sermone per visualizzare o modificare i suoi dettagli.

## Aggiunta di un sermone

1. Fai clic sul pulsante **Aggiungi sermone** nell'angolo in alto a destra e seleziona **Aggiungi sermone** dal dropdown.
2. Seleziona una **Playlist** per assegnare il sermone.
3. Scegli il tuo **Provider video** -- YouTube, Vimeo, Facebook o URL personalizzato. Consigliamo YouTube in quanto funziona meglio con il sistema B1.
4. Immetti l'ID video o l'URL e fai clic su **Recupera**. Per YouTube, l'ID video è la stringa di caratteri dopo `v=` nell'URL di YouTube.
5. Quando fai clic su **Recupera**, i dettagli del sermone vengono importati automaticamente, inclusi la data di pubblicazione, la durata, il titolo, la descrizione e l'anteprima.
6. Apporta le modifiche desiderate e fai clic su **Salva**.

:::tip
Puoi anche aggiungere un URL di streaming dal vivo permanente selezionando **Aggiungi URL dal vivo permanente** dal dropdown **Aggiungi sermone**. Questo crea una connessione persistente allo stream dal vivo del canale YouTube usando il tuo ID canale. Vedi [Live streaming](live-streaming) per più dettagli.
:::

## Modifica di un sermone

1. Fai clic su qualsiasi sermone nella tua libreria per aprire i suoi dettagli.
2. Aggiorna il titolo, l'oratore, la data, la descrizione, l'anteprima o i link ai media come necessario.
3. Fai clic su **Salva** per applicare le tue modifiche.

## Dettagli del sermone

Ogni voce di sermone può includere:

- **Titolo** -- Il nome del sermone visualizzato ai visitatori
- **Oratore** -- Chi ha tenuto il sermone
- **Data** -- La data di pubblicazione o consegna
- **Descrizione** -- Un riepilogo del contenuto del sermone
- **Anteprima** -- Un'immagine di anteprima mostrata nella tua libreria di sermoni
- **Link video/audio** -- URL al media del sermone su YouTube, Vimeo, Facebook o un host personalizzato

## Programmazione di un sermone per lo streaming dal vivo

Dopo aver aggiunto un sermone, puoi programmarlo per la trasmissione sulla tua pagina di streaming dal vivo:

1. Vai alla scheda **Orari dello streaming dal vivo**.
2. Modifica un servizio e sotto **Impostazioni video**, seleziona il tuo sermone dal dropdown.
3. Il sermone verrà riprodotto all'ora di servizio programmata.

:::info
Per importare più sermoni contemporaneamente anziché aggiungerli uno per uno, usa lo strumento [Importazione in massa](bulk-import) per estrarre video direttamente dal tuo account YouTube o Vimeo.
:::

## Prossimi passi

- [Playlist](playlists) -- Organizza sermoni in serie
- [Live streaming](live-streaming) -- Configura il tuo programma di streaming
- [Importazione in massa](bulk-import) -- Importa più sermoni contemporaneamente
