---
title: "Importazione in blocco"
description: "Importa in blocco video di predica da un canale YouTube o da un account Vimeo, oppure episodi di podcast da un feed RSS, in B1 Admin, poi ordinali in una playlist."
---

# Importazione in blocco

<div class="article-intro">

La pagina Importazione in blocco ti permette di popolare rapidamente la tua libreria di prediche importando video da YouTube o Vimeo, oppure episodi da un feed RSS di podcast. È il modo più veloce per portare i contenuti delle prediche già esistenti, invece di aggiungere una predica alla volta.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'autorizzazione **Modifica servizi** nella sezione **Contenuti** del tuo ruolo. Vedi [Ruoli e autorizzazioni](../settings/roles-permissions.md) se non hai accesso.
- Crea almeno una [playlist](./playlists.md) in cui importare le tue prediche
- Tieni a portata di mano il tuo ID del canale YouTube, le informazioni del tuo account Vimeo o l'indirizzo del feed del tuo podcast

</div>

## Scegliere la fonte {#choosing-your-source}

1. In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Prediche** e fai clic su **Prediche**. Fai clic su **Aggiungi predica** e scegli **Importazione in blocco** dal menu.
2. In **Scegli la fonte di importazione** vedrai tre opzioni:
   - **YouTube** -- Importa video da un canale YouTube
   - **Vimeo** -- Importa video da un account Vimeo
   - **Feed RSS del podcast** -- Importa episodi da un feed di podcast come prediche audio
3. Fai clic sull'opzione della piattaforma in cui sono ospitate le tue prediche (oppure fai clic su **Importa da YouTube**, **Importa da Vimeo** o **Importa da feed podcast** sotto la relativa descrizione). Fai clic su **Indietro** in cima alla pagina per tornare alla scelta della fonte.

:::tip
Puoi tornare indietro e cambiare fonte in qualsiasi momento, se hai video su entrambe le piattaforme.
:::

## Prima di importare {#before-you-import}

Prima di importare i video ti serve almeno una playlist in cui organizzarli. Se non hai ancora creato alcuna playlist:

1. Torna alla pagina **Prediche** e individua il pannello **Playlist**.
2. Fai clic su **Crea la prima playlist** e compila nome, descrizione, data di pubblicazione e miniatura.
3. Fai clic su **Salva**, quindi torna all'Importazione in blocco facendo clic su **Aggiungi predica** e scegliendo **Importazione in blocco**.

Vedi [Playlist](./playlists.md) per istruzioni dettagliate sulla creazione e la gestione delle playlist.

## Importare i video {#importing-videos}

1. Dopo aver selezionato YouTube o Vimeo, inserisci il tuo **ID canale YouTube** o **ID canale Vimeo** nel campo previsto.
2. Fai clic sul pulsante **Recupera** per caricare i video dal tuo canale. Se i video non possono essere caricati o il canale non ne contiene, compare un messaggio che lo indica: verifica l'ID e riprova.
3. Dopo il recupero vedrai un elenco dei tuoi video, ciascuno con una casella di controllo sotto **Importa**.
4. Seleziona la casella accanto a ogni video che vuoi importare.
5. Fai clic sul menu a discesa **Importa nella playlist** per scegliere la playlist a cui aggiungere questi video.
6. Fai clic sul pulsante **Importa** per completare l'importazione in blocco. Al termine torni alla scelta della fonte.

Se fai clic su **Importa** senza aver scelto una playlist o selezionato alcun video, B1 ti chiede di farlo prima. Fai clic su **Annulla** per uscire senza importare.

I tuoi video verranno importati con tutti i loro dettagli, inclusi titoli, descrizioni, date e miniature. I caratteri speciali presenti nei titoli e nelle descrizioni di YouTube, come `&`, gli apostrofi e le virgolette, vengono importati così come sono scritti, e non come codici del tipo `&amp;`.

:::info
L'importazione in blocco è ideale per iniziare quando stai migrando da un'altra piattaforma. Per aggiungere le singole prediche in seguito, usa invece la pagina [Gestire le prediche](./managing-sermons.md).
:::

## Importare episodi di podcast {#importing-podcast-episodes}

Se le tue prediche sono pubblicate come podcast (Spotify for Podcasters / Anchor, Buzzsprout, Podbean e simili), puoi importare gli episodi come prediche audio.

1. Scegli **Feed RSS del podcast** e incolla l'indirizzo del tuo feed in **URL del feed podcast**. Dove trovarlo:
   - **Spotify for Podcasters (Anchor)** -- **Impostazioni** > **Disponibilità** > **Distribuzione RSS**. L'indirizzo ha questo aspetto: `https://anchor.fm/s/…/podcast/rss`.
   - **Buzzsprout** -- il link **RSS Feed** nella dashboard del tuo podcast.
   - La maggior parte degli altri servizi mostra l'indirizzo del feed RSS nelle impostazioni o nella pagina di distribuzione del podcast.
2. Fai clic su **Recupera**. Il nome del podcast compare sopra un elenco dei suoi episodi con le date di pubblicazione. Se il feed non può essere caricato o non contiene episodi audio, compare un messaggio che lo indica: verifica l'indirizzo e riprova.
3. I nuovi episodi vengono selezionati per te. Gli episodi già presenti nella tua libreria delle prediche sono contrassegnati **Già importato** e non possono essere selezionati, così nulla viene aggiunto due volte.
4. Deseleziona gli episodi che non vuoi, scegli una playlist in **Importa nella playlist** e fai clic su **Importa**.

Ogni episodio diventa una predica audio con il suo titolo, la descrizione, la data, l'immagine di copertina e la durata. Nell'app B1, i membri vedono **Ascolta** e **Scarica audio** su queste prediche.

L'importazione è una copia una tantum, non un collegamento in tempo reale al feed. Quando pubblichi nuovi episodi, torna qui ed esegui di nuovo l'importazione con lo stesso indirizzo del feed; vengono selezionati solo i nuovi episodi.

:::note
Vengono importati solo gli audio. Gli episodi video di un podcast non vengono importati: aggiungili tramite YouTube, Vimeo o [Gestire le prediche](./managing-sermons.md).
:::

:::tip
Vuoi un elenco sul tuo sito web o nella tua app che rispecchi sempre il tuo podcast senza reimportarlo? Aggiungi l'elemento **Podcast** a una pagina nel costruttore del sito web, poi aggiungi quella pagina come scheda **Pagina** nella tua app mobile.
:::

## Passaggi successivi {#next-steps}

- [Gestire le prediche](./managing-sermons.md) -- Modifica i dettagli delle prediche importate
- [Playlist](./playlists.md) -- Crea e gestisci le serie di predicazioni
- [Trasmissione in diretta](./live-streaming.md) -- Configura la trasmissione in diretta dei tuoi servizi
