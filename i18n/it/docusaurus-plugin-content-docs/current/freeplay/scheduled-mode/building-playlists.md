---
title: "Collegare i fornitori e creare le playlist"
---

# Collegare i fornitori e creare le playlist

<div class="article-intro">

Una playlist è un loop di immagini e video che inserisci nel calendario. In FreePlay Admin colleghi i tuoi fornitori di contenuti una sola volta per tutta la chiesa. Poi crei le playlist scegliendo i file da quei fornitori.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Accedi a FreePlay Admin su [admin.freeplay.church](https://admin.freeplay.church)
- Hai le credenziali di qualsiasi account di un fornitore che vuoi collegare, come Dropbox o OneDrive

</div>

## Collegare i fornitori {#connecting-providers}

La pagina **Providers** elenca le tue fonti di contenuti in due sezioni:

- **Connected** - Fornitori che puoi usare subito. I fornitori pubblici che non richiedono l'accesso, come Lessons.church e Bible Project, sono sempre elencati qui come **Pubblico · non richiede accesso**. Gli account collegati mostrano **Account collegato** e la data di scadenza del collegamento.
- **Available** - Fornitori che richiedono l'accesso prima di poterli usare.

Per collegare un fornitore:

1. Vai su **Providers**.
2. Trova il fornitore in **Available** e clicca su **Connect**.
3. Accedi al tuo account presso quel fornitore:
   - Alcuni fornitori, come Dropbox, Google Drive e OneDrive, aprono una finestra popup di accesso. Se non appare nulla, consenti i popup per admin.freeplay.church.
   - Altri fornitori mostrano un link e un codice. Visita il link, inserisci il codice e approva l'accesso. La finestra si aggiorna da sola quando hai finito.
4. Quando vedi **Account collegato con successo!**, il fornitore passa in **Connected**.

I fornitori collegati hanno tre azioni:

- **Browse** - Sfoglia le cartelle del fornitore
- **Refresh** - Rinnova l'accesso del fornitore
- **Unlink** - Scollega l'account

:::info
Le connessioni dei fornitori in FreePlay Admin appartengono a tutta la chiesa, non a una singola persona o a una sola TV. Gli schermi programmati ricevono i file tramite queste connessioni, quindi non devi accedere a ciascun fornitore su ogni TV.
:::

**FreeShow** è elencato come **Sulla rete della chiesa · ogni TV lo trova da sola**. In FreePlay Admin non c'è nulla da collegare per questo.

## La pagina Playlist

La pagina **Playlists** elenca ogni playlist con il numero di elementi, la durata totale, dove viene usata (**Default loop** per un gruppo, oppure il numero di programmazioni) e la data dell'ultimo aggiornamento. Ogni riga ha queste azioni:

- **Present** - Riproduci la playlist a schermo intero nel browser
- **Edit** - Apri l'editor della playlist
- **Duplicate** - Crea una copia chiamata "(copia)"

## Creare una playlist

1. Vai su **Playlists** e clicca su **Add playlist**.
2. Inserisci un **Name**, ad esempio "Loop di benvenuto".
3. Clicca su **Add playlist**. Si apre l'editor della playlist.

## Aggiungere elementi

L'editor della playlist mostra gli **Items** della playlist a sinistra e **Add from provider** a destra.

1. A destra, scegli una scheda del fornitore. Per aggiungere un'altra fonte, clicca su **Connect another**, che apre la pagina **Providers**.
2. Clicca sulle cartelle per entrarci. Usa il percorso di navigazione per tornare indietro.
3. Clicca su un file per aggiungerlo in fondo alla playlist. I file già presenti nella playlist sono contrassegnati come selezionati.
4. Per aggiungere tutto il contenuto della cartella corrente in una volta, clicca su **Add all**. Il pulsante mostra quanti file non sono ancora nella playlist.
5. Clicca su **Save** in alto nell'editor.

:::warning
Le modifiche non vengono salvate finché non clicchi su **Save**. Clicca su **Cancel** per uscire senza salvare.
:::

## Organizzare gli elementi

Nell'elenco **Items** a sinistra:

- **Reorder** - Trascina un elemento tramite la sua maniglia a sinistra
- **Image timing** - Le immagini restano visibili per 10 secondi per impostazione predefinita. Cambia il numero di secondi accanto a un'immagine
- **Videos** - I video mostrano **Riproduce fino alla fine** e vengono riprodotti per tutta la loro durata
- **Remove** - Rimuovi un elemento dalla playlist

Il riepilogo in alto mostra il numero di elementi e la lunghezza totale della playlist.

## Rinominare, duplicare ed eliminare

Il pannello sul lato sinistro dell'editor mostra dove viene usata la playlist. Ha anche queste azioni:

- **Present** - Riproduci la playlist nel browser
- **Rename** - Cambia il nome della playlist
- **Duplicate** - Crea una copia da modificare separatamente
- **Delete** - Rimuovi la playlist. Le programmazioni che la riproducono tornano al loop predefinito del gruppo

## Presentare una playlist nel browser

Clicca su **Present** per riprodurre la playlist a schermo intero nel browser. È utile per visualizzarla in anteprima, o per eseguirla da un portatile collegato a un proiettore. Muovi il mouse per mostrare la barra dei comandi, poi usa questi tasti:

| Tasto | Azione |
|---|---|
| **Spazio** | Pausa o riprendi |
| **←** / **→** | Elemento precedente o successivo |
| **F** | Attiva/disattiva schermo intero |
| **Esc** | Esci |

## Articoli correlati

- **[Programmare il calendario](./scheduling-the-calendar)** - Inserisci la tua playlist nel calendario di un gruppo di schermi
- **[Gestire schermi e gruppi](./managing-screens)** - Imposta una playlist come loop predefinito di un gruppo
- **[Fornitori di contenuti](../content-providers/)** - Fornitori che puoi collegare direttamente sulla TV
