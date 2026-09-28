---
title: "Impostazioni della chiesa"
---

# Impostazioni della chiesa

<div class="article-intro">

La pagina Impostazioni chiesa è il luogo in cui configuri le informazioni di base della tua chiesa, i dettagli di contatto e il branding. Questi dettagli vengono utilizzati in tutti gli strumenti ChurchApps, inclusi il tuo sito Web B1.church e l'app mobile B1.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno dell'autorizzazione "Modifica impostazioni chiesa". Vedi [Ruoli e permessi](./roles-permissions.md) se non hai accesso.
- Hai pronto l'indirizzo della tua chiesa, le informazioni di contatto e il logo

</div>

## Modifica delle informazioni della tua chiesa

1. In B1 Admin, apri il **menu della sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Impostazioni**.
2. Apri la sezione **Informazioni chiesa** e fai clic sulla sua icona di modifica (matita).
3. Aggiorna uno qualsiasi dei seguenti campi:
   - **Nome chiesa** -- Il nome visualizzato in tutti i prodotti ChurchApps.
   - **Indirizzo** -- L'indirizzo fisico della tua chiesa.
   - **Informazioni di contatto** -- Numero di telefono, email e altri dettagli di contatto.
4. Fai clic su **Salva** per applicare le tue modifiche.

## Configurazione del tuo sottodominio

La tua chiesa riceve un sottodominio gratuito in **tuachiesa.1.church**. Questo è l'indirizzo web in cui i membri e i visitatori possono accedere alla presenza online della tua chiesa.

1. Nella pagina Impostazioni, individua il campo **Sottodominio**.
2. Inserisci il tuo sottodominio preferito (ad esempio, "chiesiagrace" per chiesiagrace.1.church).
3. Salva le tue modifiche.

:::info
Il tuo sottodominio deve essere univoco in tutte le chiese ChurchApps. Se il tuo nome preferito è già utilizzato, prova ad aggiungere la tua città o stato (ad esempio, "chiesiagrace-dallas").
:::

Se vuoi che i visitatori raggiungano il tuo sito nel tuo dominio (ad esempio, **www.chiesiagrace.org**), vedi [Dominio personalizzato](./custom-domain.md).

## Configurazione del branding

Personalizza come la tua chiesa appare in tutti gli strumenti ChurchApps:

1. Carica il **logo della chiesa** facendo clic sull'area del logo e selezionando un file di immagine.
2. Aggiungi altre **immagini della chiesa** utilizzate sul tuo sito Web e [app mobile](./mobile-app.md).

:::tip
Per i migliori risultati, utilizza un logo con uno sfondo trasparente in formato PNG. Questo garantisce che appaia benissimo sia su sfondi chiari che scuri.
:::

## Primo giorno della settimana

Scegli il giorno in cui iniziano i tuoi calendari. L'elenco a discesa **Primo giorno della settimana** nella sezione Informazioni chiesa per impostazione predefinita è impostato su **Domenica**, ma può essere impostato su qualsiasi giorno. Una volta modificato, viene rispettato in tutte le griglie del calendario in B1 Admin e nel portale dei membri B1.church -- i calendari dei gruppi, i calendari curati e l'editor degli eventi si organizzano tutte le settimane a partire dal giorno che scegli.

## Archiviazione file

Per impostazione predefinita, i file che carichi sul tuo sito Web (tramite [File](../website/files.md)) e altre aree di contenuto utilizzano lo spazio di archiviazione gratuito ospitato di B1, fino a 100 MB. Se hai bisogno di più spazio, puoi invece connettere il tuo spazio di archiviazione cloud -- i nuovi caricamenti vanno direttamente al tuo account senza limite di piattaforma.

1. Nella pagina Impostazioni, trova la scheda **Archiviazione file** e fai clic per modificarla.
2. Scegli un provider: **Google Drive**, **Dropbox**, **OneDrive** o un **bucket compatibile con S3** (AWS S3, Cloudflare R2, Backblaze B2, ecc.).
3. Per Google Drive, Dropbox o OneDrive, fai clic su **Connetti** e accedi per autorizzare l'accesso. Per un bucket compatibile con S3, inserisci la tua chiave di accesso, il segreto, il nome del bucket e l'URL di base pubblico.
4. Fai clic su **Salva**.

:::info
Questo riguarda solo i nuovi caricamenti nei File del tuo sito Web e nelle aree di contenuto simili. Le immagini della galleria, le miniature, i logo e le foto delle persone rimangono sempre nello spazio di archiviazione predefinito di B1.
:::

## Promozione di grado

Se tieni traccia di **Grado** su bambini e studenti, B1 può automaticamente promuovere tutti di un grado in una data che scegli (ad esempio, 1º agosto) invece di richiedere che tu modifichi manualmente ogni profilo.

1. Nella pagina Impostazioni, trova l'opzione **Promozione di grado**.
2. Attivalo e scegli il **mese e il giorno** per promuovere i gradi ogni anno.
3. Salva le tue modifiche.

## Importazione e esportazione

Il pulsante **Importa/Esporta** nell'intestazione Impostazioni apre uno strumento dedicato in una nuova finestra del browser. Usa questo per:

- Importare i dati dei membri da un altro sistema di gestione della chiesa.
- Esportare i tuoi dati ChurchApps per scopi di backup o migrazione.

Questo è particolarmente utile quando stai impostando la tua chiesa per la prima volta e devi trasferire i record esistenti in ChurchApps.

:::warning
Quando importi dati, esegui sempre un backup dei tuoi record esistenti. Le operazioni di importazione aggiungono dati al tuo sistema e potrebbero creare voci duplicate se eseguite più volte.
:::
