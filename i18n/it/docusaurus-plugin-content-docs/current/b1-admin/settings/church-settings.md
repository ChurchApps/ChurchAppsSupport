---
title: "Impostazioni della Chiesa"
---

# Impostazioni della Chiesa

<div class="article-intro">

La pagina Impostazioni della Chiesa è dove configuri le informazioni di base della tua chiesa, i dettagli di contatto e il branding. Questi dettagli vengono utilizzati in tutti gli strumenti ChurchApps, incluso il tuo sito web B1.church e l'app B1 Mobile.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno del permesso "Modifica Impostazioni della Chiesa". Vedi [Ruoli e Autorizzazioni](./roles-permissions.md) se non hai accesso.
- Tieni pronto l'indirizzo della chiesa, le informazioni di contatto e il logo

</div>

## Modifica delle Informazioni della Chiesa

1. In B1 Admin, apri il **menu della sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Impostazioni**.
2. Fai clic sul pulsante **Modifica Impostazioni** nell'intestazione.
3. Aggiorna uno dei seguenti campi:
   - **Nome della Chiesa** -- Il nome visualizzato in tutti i prodotti ChurchApps.
   - **Indirizzo** -- L'indirizzo fisico della tua chiesa.
   - **Informazioni di Contatto** -- Numero di telefono, email e altri dettagli di contatto.
4. Fai clic su **Salva** per applicare le tue modifiche.

## Configurazione del Sottodominio

La tua chiesa ottiene un sottodominio gratuito su **tuachiesa.b1.church**. Questo è l'indirizzo web dove i membri e i visitatori possono accedere alla tua presenza online della chiesa.

1. Nella pagina Impostazioni, individua il campo **Sottodominio**.
2. Inserisci il tuo sottodominio preferito (ad esempio, "chiesa di grazia" per chiesiadi grazia.b1.church).
3. Salva le tue modifiche.

:::info
Il tuo sottodominio deve essere univoco in tutte le chiese ChurchApps. Se il nome preferito è occupato, prova ad aggiungere la tua città o stato (ad esempio, "gracechurch-dallas").
:::

## Configurazione del Branding

Personalizza come la tua chiesa appare in tutti gli strumenti ChurchApps:

1. Carica il tuo **logo della chiesa** facendo clic sull'area del logo e selezionando un file immagine.
2. Aggiungi eventuali **immagini della chiesa** aggiuntive utilizzate sul tuo sito web e [app mobile](./mobile-app.md).

:::tip
Per i migliori risultati, usa un logo con sfondo trasparente in formato PNG. Questo garantisce che appaia perfetto sia su sfondi chiari che scuri.
:::

## Primo Giorno della Settimana

Scegli quale giorno i tuoi calendari iniziano. L'elenco a discesa **Primo Giorno della Settimana** nella sezione Informazioni Chiesa è impostato su **Domenica** per impostazione predefinita, ma può essere impostato su qualsiasi giorno. Una volta modificato, viene onorato in tutte le griglie del calendario in B1 Admin e nel portale membro B1.church.

## Archiviazione File

Per impostazione predefinita, i file che carichi sul tuo sito web (tramite [File](../website/files.md)) e in altre aree di contenuto utilizzano l'archiviazione ospitata gratuita di B1, fino a 100 MB. Se hai bisogno di più spazio, puoi invece collegare il tuo archivio cloud - i nuovi caricamenti vanno direttamente al tuo account senza limite della piattaforma.

1. Nella pagina Impostazioni, trova la scheda **Archiviazione File** e fai clic per modificarla.
2. Scegli un provider: **Google Drive**, **Dropbox**, **OneDrive**, o un **bucket compatibile S3** (AWS S3, Cloudflare R2, Backblaze B2, ecc.).
3. Per Google Drive, Dropbox o OneDrive, fai clic su **Connetti** e accedi per autorizzare l'accesso. Per un bucket compatibile S3, inserisci la tua chiave di accesso, segreto, nome del bucket e URL di base pubblico.
4. Fai clic su **Salva**.

:::info
Questo influisce solo sui nuovi caricamenti sul tuo sito Web Files e aree di contenuto simili. Le immagini della galleria, le miniature, i logo e le foto delle persone rimangono sempre sull'archiviazione predefinita di B1.
:::

## Promozione del Grado

Se traccia il **Grado** su bambini e studenti, B1 può automaticamente aumentare tutti di un grado in una data che scegli (ad esempio, 1° agosto) piuttosto che richiedere di modificare ogni profilo a mano.

1. Nella pagina Impostazioni, trova l'opzione **Promozione del Grado**.
2. Attivala e scegli il **mese e il giorno** per promuovere i gradi ogni anno.
3. Salva le tue modifiche.

## Importazione e Esportazione

Il pulsante **Importazione/Esportazione** nell'intestazione Impostazioni apre uno strumento dedicato in una nuova finestra del browser. Usalo per:

- Importare i dati dei membri da un altro sistema di gestione della chiesa.
- Esportare i tuoi dati ChurchApps per backup o scopi di migrazione.

Questo è particolarmente utile quando stai configurando per la prima volta la tua chiesa e devi trasferire record esistenti in ChurchApps.

:::warning
Quando importi i dati, esegui sempre un backup dei tuoi record esistenti prima. Le operazioni di importazione aggiungono dati al tuo sistema e potrebbero creare voci duplicate se eseguite più volte.
:::
