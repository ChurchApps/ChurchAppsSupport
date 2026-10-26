---
title: "Impostazioni della chiesa"
---

# Impostazioni della chiesa

<div class="article-intro">

La pagina Impostazioni della chiesa è dove configuri le informazioni di base della tua chiesa, i dati di contatto e il branding. Questi dati vengono utilizzati in tutti gli strumenti ChurchApps, incluso il sito web B1.church e l'app B1 Mobile.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso "Edit Church Settings". Vedi [Ruoli e permessi](./roles-permissions.md) se non hai accesso.
- Tieni pronti l'indirizzo, i dati di contatto e il logo della tua chiesa

</div>

## Modificare le informazioni della chiesa

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Settings** e clicca su **Settings**.
2. Nella sezione **Church Information** (in alto nella pagina), clicca su **Edit**.
3. Aggiorna uno qualsiasi dei seguenti campi:
   - **Church Name** -- Il nome visualizzato in tutti i prodotti ChurchApps.
   - **Address** -- L'indirizzo fisico della tua chiesa.
   - **Contact Information** -- Numero di telefono, email e altri dati di contatto.
   - **Time Zone** -- Il fuso orario della tua chiesa. Vedi [Time Zone](#time-zone) più sotto.
4. Clicca su **Save** per applicare le modifiche.

## Configurare il sottodominio

La tua chiesa ottiene un sottodominio gratuito su **yourchurch.1.church**. Questo è l'indirizzo web a cui membri e visitatori possono accedere alla presenza online della chiesa.

1. Nella pagina Settings, clicca su **Edit** nella sezione **Church Information** e individua il campo **Subdomain**.
2. Inserisci il sottodominio che preferisci (ad esempio "gracechurch" per gracechurch.1.church).
3. Salva le modifiche.

:::info
Il sottodominio deve essere unico tra tutte le chiese ChurchApps. Se il nome che preferisci è già in uso, prova ad aggiungere la tua città o lo stato (ad esempio "gracechurch-dallas").
:::

Se vuoi che i visitatori raggiungano il tuo sito con un dominio tuo (ad esempio **www.gracechurch.org**), consulta [Dominio personalizzato](./custom-domain.md).

## Configurare il branding

Personalizza il modo in cui la tua chiesa appare in tutti gli strumenti ChurchApps:

1. Carica il **logo della chiesa** cliccando sull'area del logo e selezionando un file immagine.
2. Aggiungi eventuali altre **church images** usate sul tuo sito web e nell'[app mobile](./mobile-app.md).

:::tip
Per risultati ottimali, usa un logo con sfondo trasparente in formato PNG. Così resterà ben visibile sia su sfondi chiari che scuri.
:::

## Primo giorno della settimana

Scegli il giorno da cui iniziano i tuoi calendari. Il menu a tendina **First Day of Week** nella sezione Church Info è impostato di default su **Sunday**, ma può essere impostato su qualsiasi giorno. Una volta modificato, viene rispettato nelle griglie dei calendari di B1 Admin e nel portale membri di B1.church -- i calendari dei gruppi, i calendari curati e l'editor degli eventi organizzano tutti le settimane a partire dal giorno che scegli.

## Fuso orario

Il menu a tendina **Time Zone** nella sezione **Church Information** imposta il fuso orario della tua chiesa (ad esempio *America/Chicago*). Scegli **None** per lasciarlo vuoto. Una volta salvato, il fuso orario compare nel riepilogo delle Informazioni della chiesa.

B1 usa questo fuso orario per gli orari validi per tutta la chiesa, come i promemoria degli eventi e i programmi sulle tue TV [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Le [pianificazioni dei check-in](../attendance/setup.md#setting-a-check-in-schedule) sono calcolate prima di tutto nel fuso orario della [sede](./campuses.md) del servizio, e usano il fuso orario della chiesa solo quando la sede non ne ha uno. Se le tue sedi si trovano tutte nello stesso fuso orario, impostalo sia sulla chiesa sia su ciascuna sede.

## Area geografica (formato di data e telefono)

L'impostazione **Region** controlla il modo in cui date e orari vengono scritti in tutto B1. Per impostazione predefinita le date usano il formato statunitense (ad esempio "Sep 28, 2026" e "9/28/2026"). Le chiese al di fuori degli Stati Uniti possono passare al proprio formato -- ad esempio, scegliendo English (United Kingdom) vengono mostrate "28 Sept 2026" e "28/09/2026".

1. Nella pagina Settings, clicca su **Region** nell'elenco a sinistra, poi su **Edit** nella sezione **Region**.
2. Scegli la tua area dal menu a tendina **Region**. Ogni opzione mostra una data di esempio così puoi vedere esattamente come appariranno le date.
3. Clicca su **Save**.

La sezione Region mostra poi l'area selezionata, un esempio del **Date format** e il formato dei **Phone numbers**.

### Formato dei numeri di telefono

La stessa sezione Region ha un'impostazione **Phone numbers** che controlla il modo in cui i numeri di telefono vengono inseriti nel profilo di una persona:

- **International (with country code)** -- l'impostazione predefinita. I campi telefono mostrano un selettore con la bandiera del paese e salvano i numeri con il prefisso internazionale (ad esempio +1 918 555 1234).
- **Local (as typed)** -- i campi telefono diventano semplici caselle di testo e salvano i numeri esattamente come li digiti, senza aggiungere il prefisso internazionale (ad esempio 0701 234 5678). Scegli questa opzione se la tua chiesa scrive i numeri in formato locale e non vuoi che B1 aggiunga il prefisso.

Quando è selezionato **Local**, la sezione Region mostra anche "Local phone numbers" accanto alla tua area.

:::tip
Gli SMS funzionano meglio quando i numeri includono il prefisso internazionale. Se invii SMS da B1, mantieni il formato **International**, oppure assicurati che i numeri digitati in modalità Local includano il prefisso.
:::

L'area geografica si applica alle date e agli orari in tutto B1 Admin e nel sito web B1.church e nel portale membri, inclusi sermoni, post del blog, calendari dei gruppi e piani di servizio, così i membri vedono le date nello stesso formato del tuo staff.

## Messaggistica (SMS) {#texting}

Collega un servizio di messaggistica per inviare SMS a una persona o a un intero gruppo da B1 Admin. I messaggi vengono inviati tramite il tuo account con il fornitore, quindi si applicano i suoi prezzi e limiti.

1. Nella pagina Settings, clicca su **Texting** nell'elenco a sinistra, poi su **Edit** nella sezione **Texting**.
2. Scegli un **Provider**:
   - **Clearstream** -- inserisci una **API Key**. Creala nelle impostazioni del tuo account Clearstream, sotto API Keys.
   - **Text In Church** -- inserisci una **API Key**. Chiedi prima al supporto di Text In Church l'accesso alle API per sviluppatori, poi crea una chiave nella sezione Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- inserisci come **API Key** la chiave di autenticazione del tuo account Nalo Solutions, e un **Sender ID** (fino a 11 caratteri) che Nalo ha approvato per te.
   - **Twilio** -- usa il account Twilio della tua chiesa; Twilio ti fattura direttamente. Copia l'**Account SID** e l'**Auth Token** dalla [Twilio Console](https://console.twilio.com) e inserisci un **From Number** -- un numero di telefono Twilio registrato per A2P 10DLC, in un formato come `+15551234567`. Dopo il salvataggio, incolla l'URL del webhook in arrivo (vedi sotto) nel campo **A message comes in** del numero su Twilio, così anche le risposte STOP vengono registrate in B1.
3. Clicca su **Save**.

Per interrompere la messaggistica, imposta **Provider** su **None** e salva. Questo rimuove il fornitore salvato.

### Disattivare gli SMS per chi risponde STOP

Una volta salvato un fornitore, riapri la sezione Texting con **Edit**. Sotto le impostazioni del fornitore, un campo di sola lettura **Inbound (STOP) webhook URL** mostra un indirizzo web univoco per la tua chiesa. Clicca sul campo per selezionare l'indirizzo, copialo e incollalo nell'impostazione del webhook dei messaggi in arrivo (risposta) del tuo fornitore di messaggistica. Funziona con tutti i fornitori elencati sopra che possono inoltrare le risposte in arrivo a un webhook.

Da quel momento, quando qualcuno risponde **STOP** (oppure STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno dei tuoi messaggi, B1 trova tutti coloro il cui numero di cellulare corrisponde, li segna come disiscritti e disattiva i loro promemoria via SMS. Vengono poi esclusi dagli SMS di gruppo. Le altre risposte vengono ignorate.

:::info
Questa funzione usa la stessa impostazione di disiscrizione di **Hide me from the member directory**, quindi chi risponde STOP compare anche come **Hidden from directory** nel proprio profilo. Il campo compare solo quando è selezionato il fornitore salvato -- se cambi il menu a tendina su un altro fornitore, salva prima per rivedere di nuovo l'URL.
:::

Una volta collegato un fornitore, il personale autorizzato a inviare messaggi vede un pulsante **Text** nella pagina di un gruppo (**Text this group**) e di una persona con un cellulare (**Send text message**). Scrivi il messaggio e clicca su **Send**. La finestra conta i caratteri e i segmenti SMS. Per un gruppo, mostra quanti membri riceveranno il messaggio prima dell'invio:

- I membri senza un cellulare registrato vengono saltati.
- I membri che hanno scelto **Hide me from the member directory** vengono conteggiati come disiscritti e saltati.
- I familiari che condividono lo stesso numero di cellulare ricevono il messaggio una sola volta.

### Personalizzare i messaggi con i campi unione {#personalizing-texts-with-merge-fields}

Sotto la casella del messaggio, la finestra Text mostra dei segnaposto cliccabili: **First Name**, **Last Name**, **Display Name** e **Church Name**. Clicca su un segnaposto per inserire il suo codice (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`) nella posizione del cursore. Quando il messaggio viene inviato, ogni segnaposto viene sostituito con i dati del destinatario, quindi un SMS di gruppo come `Ciao {{firstName}}, ci vediamo domenica!` arriva a ciascun membro con il suo nome. I segnaposto funzionano sia per gli SMS di gruppo sia per quelli a una singola persona.

:::info
Il limite di 1.600 caratteri si applica al messaggio mentre lo scrivi. Dopo che i segnaposto sono stati sostituiti, qualsiasi testo più lungo di 1.600 caratteri viene troncato a quella lunghezza.
:::

Gli SMS possono anche essere inviati automaticamente da un passaggio di un [flusso di lavoro](../serving/workflows.md#sending-a-text) con l'azione **Send Text**, che usa lo stesso fornitore e gli stessi segnaposto.

## Archiviazione dei file

Per impostazione predefinita, i file che carichi sul tuo sito web (tramite [Files](../website/files.md)) e in altre aree di contenuto usano l'archiviazione gratuita ospitata da B1, fino a 100 MB. Se ti serve più spazio, puoi collegare il tuo cloud: i nuovi caricamenti vanno direttamente sul tuo account, senza alcun limite della piattaforma.

1. Nella pagina Settings, clicca su **File Storage** nell'elenco a sinistra, poi su **Edit** nella sezione **File Storage**.
2. Scegli un fornitore: **Google Drive**, **Dropbox**, **OneDrive** oppure un **bucket compatibile con S3** (AWS S3, Cloudflare R2, Backblaze B2, ecc.).
3. Per Google Drive, Dropbox o OneDrive, clicca su **Connect** e accedi per autorizzare l'accesso. Per un bucket compatibile con S3, inserisci la tua access key, la secret, il nome del bucket e l'URL pubblico di base.
4. Clicca su **Save**.

:::info
Questo riguarda solo i nuovi caricamenti in Files del sito web e in aree di contenuto simili. Le immagini delle gallerie, le miniature, i loghi e le foto delle persone restano sempre sull'archiviazione predefinita di B1.
:::

## Promozione di classe

Se tieni traccia della **Grade** di bambini e studenti, B1 può far avanzare automaticamente tutti di una classe in una data che scegli (ad esempio il 1° agosto), invece di richiedere di modificare ogni profilo a mano.

1. Nella pagina Settings, clicca su **Grade Promotion** nell'elenco a sinistra, poi su **Edit** nella sezione **Grade Promotion**.
2. Attiva l'interruttore (mostra **Enabled**) e scegli il **Month** e il **Day** in cui promuovere le classi ogni anno. In quella data, tutti quelli con una classe passano alla successiva, e i ragazzi dell'ultimo anno diventano **Graduated**.
3. Salva le modifiche.

Per interrompere la promozione automatica, disattiva l'interruttore così che mostri **Disabled**, e salva. La data di promozione viene rimossa e le classi non cambieranno più da sole.

## Iscrizione dei volontari {#volunteer-signup}

Per impostazione predefinita, i membri che consultano le [iscrizioni dei volontari](../../b1-church/serving/volunteer-signup.md) vedono tutte le settimane future con posizioni aperte. Se l'elenco diventa lungo, puoi mostrare solo la settimana successiva per ogni tipo di piano.

1. Nella pagina Settings, clicca su **Volunteer Signup** nell'elenco a sinistra, poi su **Edit** nella sezione **Volunteer Signup**.
2. Attiva **Show only the next week of each plan type**.
3. Salva le modifiche.

Con questa opzione attiva, ogni tipo di piano mostra solo il suo piano successivo. La settimana seguente compare quando quella data è passata. La riga **Weeks shown** della sezione riporta **Only the next week of each plan type** oppure **All upcoming weeks**.

## Riservatezza delle donazioni {#giving-privacy}

Le persone con accesso alle donazioni di solito vedono i totali delle donazioni di una persona nella sua [scheda personale](../people/adding-people.md#editing-details). Se preferisci non avere gli importi a schermo ogni volta che viene aperta una scheda, puoi nasconderli finché qualcuno non li richiede.

1. Nella pagina Settings, clicca su **Giving privacy** nell'elenco a sinistra, poi su **Edit** nella sezione **Giving privacy**.
2. Attiva **Hide giving on person records until clicked**.
3. Salva le modifiche.

Con questa opzione attiva, la scheda delle donazioni nel profilo di una persona dice "Giving is hidden on person records." Clicca su **Show giving** per caricare e mostrare le donazioni di quella persona. Si nasconde di nuovo quando apri un'altra persona. Chi può vedere le donazioni non cambia: solo le persone con accesso alle donazioni vedono la scheda.

## Importazione ed esportazione

Il link **Import/Export** sotto il nome della tua chiesa nella pagina Settings apre uno strumento dedicato in una nuova finestra del browser. Usalo per:

- Importare i dati dei membri da un altro sistema di gestione della chiesa.
- Esportare i tuoi dati ChurchApps per backup o migrazione.

È particolarmente utile quando stai configurando la chiesa per la prima volta e devi trasferire i registri esistenti in ChurchApps.

:::warning
Quando importi dati, fai sempre prima un backup dei tuoi registri esistenti. Le operazioni di importazione aggiungono dati al sistema e possono creare voci duplicate se eseguite più volte.
:::
