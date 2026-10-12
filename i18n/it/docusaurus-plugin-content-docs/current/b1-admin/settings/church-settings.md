---
title: "Impostazioni della chiesa"
---

# Impostazioni della chiesa

<div class="article-intro">

La pagina Impostazioni della chiesa è dove configuri le informazioni di base della tua chiesa, i dettagli di contatto e il marchio. Questi dettagli vengono utilizzati in tutti i strumenti ChurchApps, incluso il tuo sito web B1.church e l'app mobile B1.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- È necessaria l'autorizzazione "Modifica impostazioni della chiesa". Vedi [Roles & Permissions](./roles-permissions.md) se non hai accesso.
- Avere l'indirizzo della chiesa, le informazioni di contatto e il logo pronti

</div>

## Modifica delle informazioni della tua chiesa

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Settings**, e fai clic su **Settings**.
2. Nella sezione **Church Information** (in alto nella pagina), fai clic su **Edit**.
3. Aggiorna uno qualsiasi dei seguenti campi:
   - **Church Name** -- Il nome visualizzato in tutti i prodotti ChurchApps.
   - **Address** -- L'indirizzo fisico della tua chiesa.
   - **Contact Information** -- Numero di telefono, email e altri dettagli di contatto.
4. Fai clic su **Save** per applicare le tue modifiche.

## Configurazione del tuo sottodominio

La tua chiesa ottiene un sottodominio gratuito su **yourchurch.1.church**. Questo è l'indirizzo web in cui i membri e i visitatori possono accedere alla tua chiesa online.

1. Sulla pagina Impostazioni, fai clic su **Edit** nella sezione **Church Information** e individua il campo **Subdomain**.
2. Inserisci il tuo sottodominio preferito (ad esempio, "gracechurch" per gracechurch.1.church).
3. Salva le tue modifiche.

:::info
Il tuo sottodominio deve essere univoco in tutte le chiese ChurchApps. Se il tuo nome preferito è occupato, prova ad aggiungere la tua città o provincia (ad esempio, "gracechurch-dallas").
:::

Se desideri che i visitatori raggiungano il tuo sito nel tuo dominio (ad esempio, **www.gracechurch.org**), vedi [Custom Domain](./custom-domain.md).

## Configurazione del marchio

Personalizza come la tua chiesa appare in tutti i strumenti ChurchApps:

1. Carica il tuo **church logo** facendo clic sull'area del logo e selezionando un file di immagine.
2. Aggiungi eventuali altre **church images** utilizzate sul tuo sito web e [app mobile](./mobile-app.md).

:::tip
Per ottenere i migliori risultati, utilizza un logo con uno sfondo trasparente in formato PNG. Questo assicura che sia bellissimo sia su sfondi chiari che scuri.
:::

## Primo giorno della settimana

Scegli quale giorno iniziano i tuoi calendari. L'elenco a discesa **First Day of Week** nella sezione Church Info è predefinito su **Sunday**, ma può essere impostato su qualsiasi giorno. Una volta modificato, viene rispettato in tutte le griglie del calendario in B1 Admin e nel portale dei membri B1.church, i calendari dei gruppi, i calendari curati e l'editor degli eventi tutti iniziano le settimane a partire dal giorno che scegli.

## Regione (Formato della data e del telefono)

L'impostazione **Region** controlla come le date e gli orari sono scritti in tutto B1. Per impostazione predefinita, le date utilizzano il formato degli Stati Uniti (ad esempio, "Sep 28, 2026" e "9/28/2026"). Le chiese al di fuori degli Stati Uniti possono passare al loro formato, ad esempio scegliendo Inglese (Regno Unito) mostra "28 Sept 2026" e "28/09/2026" invece.

1. Sulla pagina Impostazioni, fai clic su **Region** nell'elenco a sinistra, quindi fai clic su **Edit** nella sezione **Region**.
2. Scegli la tua regione dall'elenco a discesa **Region**. Ogni opzione mostra una data di esempio in modo che tu possa vedere esattamente come appariranno le date.
3. Fai clic su **Save**.

La sezione Region mostra quindi la tua regione selezionata, un esempio del **Date format** e il formato dei **Phone numbers**.

### Formato del numero di telefono

La stessa sezione Region ha un'impostazione **Phone numbers** che controlla come vengono inseriti i numeri di telefono nella scheda di una persona:

- **International (with country code)** -- l'impostazione predefinita. I campi telefono mostrano un selettore con la bandiera del paese e salvano i numeri con il prefisso internazionale (ad esempio, +1 918 555 1234).
- **Local (as typed)** -- i campi telefono diventano semplici caselle di testo e salvano i numeri esattamente come li digiti, senza aggiungere alcun prefisso internazionale (ad esempio, 0701 234 5678). Scegli questa opzione se la tua chiesa scrive i numeri in un formato locale e non vuole che B1 aggiunga un prefisso internazionale.

Quando è selezionato **Local**, la sezione Region mostra anche "Local phone numbers" accanto alla tua regione.

:::tip
Gli SMS funzionano meglio quando i numeri includono il prefisso internazionale. Se invii SMS da B1, mantieni il formato **International**, oppure assicurati che i numeri digitati in modalità Local includano il prefisso internazionale.
:::

La tua regione si applica a date e orari in B1 Admin e sul tuo sito web B1.church e portale dei membri, inclusi sermoni, post di blog, calendari di gruppo e piani di servizio, in modo che i membri vedano le date nello stesso formato degli staff.

## Messaggistica di testo {#texting}

Connetti un provider di messaggistica di testo per inviare SMS a una persona o a un intero gruppo da B1 Admin. I messaggi vengono inviati tramite il tuo account con il provider, quindi i loro prezzi e limiti si applicano.

1. Sulla pagina Impostazioni, fai clic su **Texting** nell'elenco a sinistra, quindi fai clic su **Edit** nella sezione **Texting**.
2. Scegli un **Provider**:
   - **Clearstream** -- inserisci una **API Key**. Crea una nelle impostazioni dell'account Clearstream in API Keys.
   - **Text In Church** -- inserisci una **API Key**. Chiedi prima il supporto di Text In Church per l'accesso all'API per sviluppatori, quindi crea una chiave nella sezione Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- inserisci la chiave di autenticazione dal tuo account Nalo Solutions come **API Key**, e un **Sender ID** (fino a 11 caratteri) che Nalo ha approvato per te.
3. Fai clic su **Save**.

Per interrompere la messaggistica di testo, imposta **Provider** su **None** e salva. Questo rimuove il provider salvato.

### Disattivare i Messaggi per le Persone che Rispondono STOP {#opting-out-people-who-reply-stop}

Dopo aver salvato un provider, riapri la sezione Texting con **Edit**. Sotto le impostazioni del provider, un campo in sola lettura **Inbound (STOP) webhook URL** mostra un indirizzo web unico per la tua chiesa. Fai clic sul campo per selezionare l'indirizzo, copialo e incollalo nell'impostazione del webhook dei messaggi in entrata (risposte) del tuo provider di messaggistica. Funziona con tutti i provider sopra elencati che possono inoltrare le risposte in arrivo a un webhook.

Da quel momento, quando qualcuno risponde **STOP** (o STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno dei tuoi messaggi, B1 trova tutte le persone il cui numero di cellulare corrisponde, le segna come rinunciatarie e disattiva i loro promemoria via SMS. Vengono poi saltate dai messaggi di gruppo. Le altre risposte vengono ignorate.

:::info
Questo usa la stessa impostazione di rinuncia di **Hide me from the member directory**, quindi chi risponde STOP compare anche come **Hidden from directory** sul proprio profilo. Il campo compare solo quando è selezionato il provider salvato -- se cambi il menu a discesa su un altro provider, salva prima per vedere di nuovo l'URL.
:::

Una volta collegato un provider, lo staff con l'autorizzazione per inviare SMS vede un pulsante **Text** nella pagina di un gruppo (**Text this group**) e di una persona con un telefono cellulare (**Send text message**). Digita il tuo messaggio e fai clic su **Send**. La finestra di dialogo conta i caratteri e i segmenti SMS. Per un gruppo, mostra quanti membri riceveranno il messaggio prima di inviarlo:

- I membri senza numero di telefono cellulare nel file vengono saltati.
- I membri che hanno scelto **Hide me from the member directory** vengono contati come rinunciati e saltati.
- I membri della famiglia che condividono un numero di telefono cellulare ricevono il messaggio una sola volta.

### Personalizzazione dei messaggi di testo con campi di unione {#personalizing-texts-with-merge-fields}

Sotto la casella del messaggio, la finestra di dialogo Testo mostra chip segnaposto: **First Name**, **Last Name**, **Display Name**, e **Church Name**. Fai clic su un chip per inserire il suo segnaposto (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}`) al tuo cursore. Quando il messaggio viene inviato, ogni segnaposto viene sostituito con i dettagli di quel destinatario, quindi un messaggio di gruppo come `Hi {{firstName}}, see you Sunday!` raggiunge ogni membro con il suo nome. I segnaposti funzionano sia per i messaggi di gruppo che per i messaggi a una singola persona.

:::info
Il limite di 1.600 caratteri si applica al messaggio mentre lo digiti. Dopo che i segnaposti vengono compilati, qualsiasi messaggio più lungo di 1.600 caratteri viene tagliato a quella lunghezza.
:::

I messaggi di testo possono anche andare avanti automaticamente da un passaggio [workflow](../serving/workflows.md#sending-a-text) con l'azione **Send Text**, che utilizza lo stesso provider e i segnaposti.

## Archiviazione dei file

Per impostazione predefinita, i file che carichi sul tuo sito web (tramite [Files](../website/files.md)) e altre aree di contenuto utilizzano l'archiviazione ospitata gratuita di B1, fino a 100MB. Se hai bisogno di più spazio, puoi invece connettere il tuo archiviazione nel cloud: i nuovi caricamenti vanno direttamente al tuo account senza limiti della piattaforma.

1. Sulla pagina Impostazioni, fai clic su **File Storage** nell'elenco a sinistra, quindi fai clic su **Edit** nella sezione **File Storage**.
2. Scegli un provider: **Google Drive**, **Dropbox**, **OneDrive**, o un **bucket compatibile con S3** (AWS S3, Cloudflare R2, Backblaze B2, ecc.).
3. Per Google Drive, Dropbox o OneDrive, fai clic su **Connect** e accedi per autorizzare l'accesso. Per un bucket compatibile con S3, inserisci la tua chiave di accesso, segreto, nome del bucket e base URL pubblica.
4. Fai clic su **Save**.

:::info
Questo influisce solo sui nuovi caricamenti sul tuo sito web Files e aree di contenuto simili. Le immagini della galleria, le miniature, i logo e le foto delle persone rimangono sempre nell'archiviazione predefinita di B1.
:::

## Promozione dei gradi

Se tieni traccia del **Grade** su bambini e studenti, B1 può automaticamente farli salire di un grado in una data che scegli (ad esempio, 1 agosto) piuttosto che richiederti di modificare ogni profilo manualmente.

1. Sulla pagina Impostazioni, fai clic su **Grade Promotion** nell'elenco a sinistra, quindi fai clic su **Edit** nella sezione **Grade Promotion**.
2. Accendi l'interruttore (mostra **Enabled**) e scegli il **Month** e il **Day** per promuovere i gradi ogni anno. In quella data, tutti con un grado si muovono su un grado, e i 12 classificatori diventano **Graduated**.
3. Salva le tue modifiche.

Per interrompere la promozione automatica, spegni l'interruttore in modo che mostri **Disabled** e salva. La data della promozione viene rimossa e i gradi non cambieranno più da soli.

## Importazione ed esportazione

Il link **Import/Export** sotto il nome della tua chiesa nella pagina Impostazioni apre uno strumento dedicato in una nuova finestra del browser. Utilizzalo per:

- Importare i dati dei membri da un altro sistema di gestione della chiesa.
- Esportare i tuoi dati ChurchApps per scopi di backup o migrazione.

Questo è particolarmente utile quando stai configurando la tua chiesa per la prima volta e hai bisogno di trasferire i record esistenti in ChurchApps.

:::warning
Quando importi i dati, fai sempre un backup dei tuoi record esistenti. Le operazioni di importazione aggiungono dati al tuo sistema e possono creare voci duplicate se eseguite più volte.
:::
