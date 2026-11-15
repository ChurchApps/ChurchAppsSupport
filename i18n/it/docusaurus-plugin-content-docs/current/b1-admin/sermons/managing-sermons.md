---
title: "Gestire le prediche"
description: "Gestisci la libreria delle predicazioni in B1 Admin: aggiungi predicazioni da YouTube, Vimeo o Facebook, modifica i dettagli e ottieni un feed podcast per la tua chiesa."
---

# Gestire le prediche

<div class="article-intro">

La pagina Prediche mostra l'intera libreria delle predicazioni. Da qui puoi aggiungere nuove predicazioni, modificare le voci esistenti e organizzare i contenuti per playlist. Ogni predicazione può collegarsi a un video o a un audio ospitato su YouTube, Vimeo, Facebook o un URL personalizzato.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'autorizzazione **Modifica servizi** nella sezione **Contenuti** del tuo ruolo. Vedi [Ruoli e autorizzazioni](../settings/roles-permissions.md) se non hai accesso.
- Crea almeno una [playlist](./playlists.md) in cui organizzare le tue predicazioni
- Tieni pronti gli ID o gli URL dei video da YouTube, Vimeo o Facebook

</div>

## Visualizzare la libreria delle predicazioni {#viewing-your-sermon-library}

1. In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Prediche** e fai clic su **Prediche**.
2. La pagina Prediche mostra le tue voci in una tabella con la **Playlist**, il titolo (**Predica**) e la **Data di pubblicazione** di ogni predica, dalla più recente alla più vecchia, con un conteggio come "11 di 11 prediche". Digita nella casella **Cerca prediche per titolo o playlist...** per filtrare l'elenco. Le tue playlist sono elencate in un pannello **Playlist** accanto alla tabella, con il pannello **Feed podcast** sotto di esso.
3. Passa sopra una riga della predica e fai clic su **Modifica** per visualizzare o modificare i suoi dettagli.

## Aggiungere una predica {#adding-a-sermon}

1. Fai clic sul pulsante **Aggiungi predica** nell'angolo in alto a destra e seleziona **Aggiungi predica** dal menu a discesa. Sopra l'elenco si apre un modulo **Modifica predica**.
2. Seleziona una **Playlist** a cui assegnare la predica (oppure lasciala su **Nessuna**).
3. Scegli il tuo **Fornitore video** -- **YouTube**, **Vimeo**, **Facebook** o **URL di incorporamento personalizzato**. Consigliamo YouTube, perché funziona meglio con il sistema B1.
4. Inserisci l'**ID YouTube**, l'**ID Vimeo**, l'**ID predica** (Facebook) o l'**URL di incorporamento della predica** del video. Puoi incollare l'intero link del video: B1 mantiene solo l'ID. Per YouTube, l'ID video è la sequenza di caratteri che segue `v=` nell'URL di YouTube.
5. Per YouTube e Vimeo, fai clic su **Recupera** per importare automaticamente i dettagli della predica, inclusi la data di pubblicazione, la durata, il titolo, la descrizione e la miniatura. Se i dettagli non possono essere caricati, compare un messaggio che lo indica e puoi compilarli tu stesso.
6. Apporta le modifiche che desideri e fai clic su **Salva**.

:::tip
Puoi anche aggiungere un URL di diretta permanente selezionando **Aggiungi URL di diretta permanente** dal menu a discesa **Aggiungi predica**. Questo crea un collegamento persistente con la diretta del tuo canale YouTube usando il tuo ID canale. Vedi [Trasmissione in diretta](./live-streaming.md) per maggiori dettagli.
:::

## Modificare una predica {#editing-a-sermon}

1. Fai clic su **Modifica** in una qualsiasi riga della predica nella tua libreria per aprirne i dettagli.
2. Aggiorna titolo, data, descrizione, miniatura, durata o collegamenti multimediali, se necessario.
3. Fai clic su **Salva** per applicare le modifiche, oppure su **Annulla** per chiudere il modulo.

Per rimuovere una predica, aprila, fai clic su **Elimina** e conferma.

### Aggiungere una predica a un'altra playlist {#adding-a-sermon-to-another-playlist}

Per inserire la stessa predica in una seconda playlist (ad esempio, una predica che appartiene sia a una serie sia a una raccolta "I migliori"), apri la predica, fai clic su **Aggiungi a un'altra playlist**, scegli la playlist e fai clic su **Aggiungi**. Questo salva una copia della predica in quella playlist.

## Dettagli della predica {#sermon-details}

Ogni voce di predica può includere:

- **Playlist** -- La serie a cui appartiene la predica
- **Fornitore video** e ID video -- Dove è ospitato il video della predica: YouTube, Vimeo, Facebook o un URL di incorporamento personalizzato
- **Data di pubblicazione** -- La data in cui la predica viene pubblicata; le predicazioni senza data mostrano **Non programmata** nell'elenco
- **Durata totale della predica** -- La lunghezza della predica in minuti e secondi
- **Miniatura** -- Un'immagine di anteprima mostrata nella tua libreria delle predicazioni. Fai clic sull'immagine per ritagliarla o sostituirla (16:9).
- **Titolo** -- Il nome della predica mostrato ai visitatori
- **Descrizione** -- Un riepilogo del contenuto della predica
- **URL del file audio (per il podcast)** -- Un collegamento diretto a un file MP3/M4A per questa predica. Puoi incollare un URL oppure, una volta salvata la predica, fare clic su **Carica audio** per caricare un file e compilare il campo automaticamente. Solo le predicazioni con questo campo (o con un collegamento diretto a un file video) compilato sono incluse nel tuo feed podcast.

## Il tuo feed podcast {#your-podcast-feed}

Non appena almeno una predica ha un file audio o video allegato, B1 Admin genera automaticamente un feed RSS podcast per la tua chiesa -- non c'è nulla da attivare. Lo trovi nel pannello **Feed podcast** accanto all'elenco delle prediche (sotto il pannello **Playlist**): fai clic sull'icona di copia per copiare l'URL del feed, quindi invia quell'URL ad Apple Podcasts, Spotify o a qualsiasi altra directory di podcast.

:::info
Le predicazioni che rimandano soltanto a un lettore incorporato (come un ID video di YouTube o Vimeo) non compaiono nel feed podcast: le app dei podcast richiedono un file multimediale diretto e scaricabile. Aggiungi un **URL del file audio** per includere una predica.
:::

## Programmare una predica per la trasmissione in diretta {#scheduling-a-sermon-for-live-stream}

Dopo aver aggiunto una predica, puoi programmarne la trasmissione nella pagina della diretta:

1. Nel menu di salto, scegli **Prediche > Orari trasmissioni in diretta**.
2. Modifica un servizio e, sotto **Impostazioni video**, seleziona la tua predica dal menu a discesa **Predica**.
3. La predica verrà riprodotta all'orario del servizio programmato.

:::info
Per importare più prediche in una volta sola invece di aggiungerle una alla volta, usa lo strumento [Importazione in blocco](./bulk-import.md) per prelevare i video direttamente dal tuo account YouTube o Vimeo.
:::

## Passaggi successivi {#next-steps}

- [Playlist](./playlists.md) -- Organizza le predicazioni in serie
- [Trasmissione in diretta](./live-streaming.md) -- Configura il calendario delle dirette
- [Importazione in blocco](./bulk-import.md) -- Importa più predicazioni in una volta sola
