---
title: "Impostazioni della chiesa"
---

# Impostazioni della chiesa {#church-settings}

<div class="article-intro">

La pagina Impostazioni della chiesa è dove configuri le informazioni di base della tua chiesa, i recapiti e il branding. Questi dati vengono usati in tutti gli strumenti ChurchApps, incluso il tuo sito web B1.church e l'app B1 Mobile.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso "Modifica impostazioni della chiesa". Consulta [Ruoli e permessi](./roles-permissions.md) se non hai l'accesso.
- Tieni pronti l'indirizzo, i recapiti e il logo della tua chiesa

</div>

## Modificare le informazioni della chiesa {#editing-your-church-information}

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Impostazioni** e fai clic su **Impostazioni**.
2. Nella sezione **Informazioni sulla chiesa** (in cima alla pagina), fai clic su **Modifica**.
3. Aggiorna uno qualsiasi dei seguenti campi:
   - **Nome della chiesa** -- il nome visualizzato in tutti i prodotti ChurchApps.
   - **Indirizzo** -- l'indirizzo fisico della tua chiesa.
   - **Informazioni di contatto** -- numero di telefono, email e altri recapiti.
   - **Fuso orario** -- il fuso orario della tua chiesa. Vedi [Fuso orario](#time-zone) più sotto.
4. Fai clic su **Salva** per applicare le modifiche.

## Configurare il sottodominio {#setting-up-your-subdomain}

La tua chiesa ottiene un sottodominio gratuito su **yourchurch.1.church**. Questo è l'indirizzo web a cui membri e visitatori possono accedere alla presenza online della chiesa.

1. Nella pagina Impostazioni, fai clic su **Modifica** nella sezione **Informazioni sulla chiesa** e individua il campo **Sottodominio**.
2. Inserisci il sottodominio che preferisci (ad esempio "gracechurch" per gracechurch.1.church).
3. Salva le modifiche.

:::info
Il sottodominio deve essere unico tra tutte le chiese ChurchApps. Se il nome che preferisci è già in uso, prova ad aggiungere la tua città o provincia (ad esempio "gracechurch-dallas").
:::

Se vuoi che i visitatori raggiungano il tuo sito con un dominio tuo (ad esempio **www.gracechurch.org**), consulta [Dominio personalizzato](./custom-domain.md).

## Configurare il branding {#configuring-branding}

Personalizza il modo in cui la tua chiesa appare in tutti gli strumenti ChurchApps:

1. Carica il **logo della chiesa** facendo clic sull'area del logo e selezionando un file immagine.
2. Aggiungi eventuali **immagini della chiesa** aggiuntive utilizzate sul tuo sito web e nell'[app mobile](./mobile-app.md).

:::tip
Per risultati ottimali, usa un logo con sfondo trasparente in formato PNG. In questo modo appare bene sia su sfondi chiari che scuri.
:::

## Primo giorno della settimana {#first-day-of-week}

Scegli il giorno da cui iniziano i tuoi calendari. Il menu a discesa **Primo giorno della settimana** nella sezione Informazioni sulla chiesa è impostato di default su **Domenica**, ma può essere impostato su qualsiasi giorno. Una volta modificato, viene rispettato nelle griglie dei calendari in B1 Admin e nel portale membri B1.church: i calendari dei gruppi, i calendari curati e l'editor degli eventi organizzano tutti le settimane a partire dal giorno che scegli.

## Fuso orario {#time-zone}

Il menu a discesa **Fuso orario** nella sezione **Informazioni sulla chiesa** imposta il fuso orario della tua chiesa (ad esempio *America/Chicago*). Scegli **Nessuno** per lasciarlo vuoto. Una volta salvato, il fuso orario compare nel riepilogo delle Informazioni sulla chiesa.

B1 usa questo fuso orario per gli orari di tutta la chiesa, come i promemoria degli eventi e i programmi sulle tue TV [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Gli [orari di check-in](../attendance/setup.md#setting-a-check-in-schedule) sono misurati nel fuso orario del [campus](./campuses.md) del servizio e usano il fuso orario della chiesa solo quando il campus non ne ha uno. Se tutti i tuoi campus si trovano nello stesso fuso orario, impostalo sia sulla chiesa sia su ogni campus.

## Area geografica (formato di data e telefono) {#region-date-and-phone-format}

L'impostazione **Area geografica** controlla come vengono scritti date e orari in tutto B1. Per impostazione predefinita le date usano il formato statunitense (ad esempio "Sep 28, 2026" e "9/28/2026"). Le chiese al di fuori degli Stati Uniti possono passare al proprio formato: ad esempio, scegliendo Inglese (Regno Unito) vengono mostrate le date "28 Sept 2026" e "28/09/2026".

1. Nella pagina Impostazioni, fai clic su **Area geografica** nell'elenco a sinistra, poi fai clic su **Modifica** nella sezione **Area geografica**.
2. Scegli la tua area dal menu a discesa **Area geografica**. Ogni opzione mostra una data di esempio, così puoi vedere esattamente come appariranno le date.
3. Fai clic su **Salva**.

La sezione Area geografica mostra quindi l'area selezionata, un esempio del **Formato data** e il formato dei tuoi **Numeri di telefono**.

### Formato del numero di telefono {#phone-number-format}

La stessa sezione Area geografica include un'impostazione **Numeri di telefono** che controlla come vengono inseriti i numeri di telefono nel profilo di una persona:

- **Internazionale (con prefisso paese)** -- l'impostazione predefinita. I campi telefono mostrano un selettore con la bandiera del paese e salvano i numeri con il prefisso (ad esempio +1 918 555 1234).
- **Locale (come digitato)** -- i campi telefono diventano semplici caselle di testo e salvano i numeri esattamente come li digiti, senza aggiungere il prefisso (ad esempio 0701 234 5678). Scegli questa opzione se la tua chiesa scrive i numeri in formato locale e non vuoi che B1 aggiunga un prefisso paese.

Quando è selezionato **Locale**, la sezione Area geografica mostra anche "Numeri di telefono locali" accanto alla tua area.

:::tip
L'invio di SMS funziona meglio quando i numeri includono il prefisso paese. Se invii SMS da B1, mantieni il formato **Internazionale**, oppure assicurati che i numeri digitati in modalità Locale includano il prefisso paese.
:::

La tua area si applica a date e orari in tutto B1 Admin e nel tuo sito B1.church e portale membri, inclusi predica, post del blog, calendari dei gruppi e piani di servizio, così i membri vedono le date nello stesso formato del tuo personale.

## Messaggi SMS {#texting}

Collega un fornitore di SMS per inviare messaggi a una persona o a un intero gruppo da B1 Admin. Gli SMS vengono inviati tramite il tuo account personale presso il fornitore, quindi si applicano i suoi prezzi e limiti.

1. Nella pagina Impostazioni, fai clic su **Messaggi SMS** nell'elenco a sinistra, poi fai clic su **Modifica** nella sezione **Messaggi SMS**.
2. Scegli un **Fornitore**:
   - **Clearstream** -- inserisci una **Chiave API**. Creala nelle impostazioni del tuo account Clearstream, nella sezione Chiavi API.
   - **Text In Church** -- inserisci una **Chiave API**. Chiedi prima al supporto di Text In Church l'accesso API per sviluppatori, poi crea una chiave nella sezione Impostazioni account > API per sviluppatori.
   - **Nalo Solutions** (Ghana) -- inserisci la chiave di autenticazione del tuo account Nalo Solutions come **Chiave API**, e un **ID mittente** (fino a 11 caratteri) approvato da Nalo per te.
3. Fai clic su **Salva**.

Per interrompere l'invio di SMS, imposta **Fornitore** su **Nessuno** e salva. Questo rimuove il fornitore salvato.

### Disattivare i messaggi per chi risponde STOP {#opting-out-people-who-reply-stop}

Una volta salvato un fornitore, riapri la sezione Messaggi SMS con **Modifica**. Sotto le impostazioni del fornitore, un campo di sola lettura **URL webhook per STOP in entrata** mostra un indirizzo web unico per la tua chiesa. Fai clic sul campo per selezionare l'indirizzo, copialo e incollalo nell'impostazione webhook dei messaggi in entrata (risposte) del tuo fornitore di SMS. Funziona con qualsiasi fornitore tra quelli indicati sopra che possa inoltrare le risposte in arrivo a un webhook.

Da quel momento, quando qualcuno risponde **STOP** (o STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno dei tuoi SMS, B1 trova tutte le persone con quel numero di cellulare, le contrassegna come disiscritte e disattiva i loro promemoria via SMS. Vengono poi saltate dagli SMS di gruppo. Le altre risposte vengono ignorate.

:::info
Questo usa la stessa impostazione di disiscrizione di **Nascondimi dalla rubrica dei membri**, quindi le persone che rispondono STOP compaiono anche come **Nascosto dalla rubrica** nel loro profilo. Il campo compare solo quando è selezionato il fornitore salvato: se cambi il menu a un altro fornitore, salva prima per rivedere di nuovo l'URL.
:::

Una volta collegato un fornitore, il personale autorizzato a inviare SMS vede un pulsante **SMS** nella pagina di un gruppo (**Invia SMS a questo gruppo**) e in quella di una persona con un cellulare (**Invia messaggio SMS**). Scrivi il messaggio e fai clic su **Invia**. La finestra conta i caratteri e i segmenti SMS. Per un gruppo, mostra quanti membri riceveranno il messaggio prima dell'invio:

- I membri senza cellulare registrato vengono saltati.
- I membri che hanno scelto **Nascondimi dalla rubrica dei membri** sono conteggiati come disiscritti e vengono saltati.
- I familiari che condividono lo stesso numero di cellulare ricevono il messaggio una sola volta.

### Personalizzare gli SMS con i campi unione {#personalizing-texts-with-merge-fields}

Sotto la casella del messaggio, la finestra SMS mostra dei segnaposto: **Nome**, **Cognome**, **Nome visualizzato** e **Nome della chiesa**. Fai clic su un segnaposto per inserire il relativo codice (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`) nel punto del cursore. Al momento dell'invio, ogni segnaposto viene sostituito con i dati del destinatario, quindi un messaggio di gruppo come `Ciao {{firstName}}, ci vediamo domenica!` raggiunge ogni membro con il proprio nome. I segnaposto funzionano sia per gli SMS di gruppo sia per quelli a una singola persona.

:::info
Il limite di 1.600 caratteri si applica al messaggio come lo scrivi. Dopo che i segnaposto sono stati sostituiti, qualsiasi testo oltre i 1.600 caratteri viene troncato a quella lunghezza.
:::

Gli SMS possono anche essere inviati automaticamente da un passaggio di un [flusso di lavoro](../serving/workflows.md#sending-a-text) con l'azione **Invia SMS**, che usa lo stesso fornitore e gli stessi segnaposto.

## Archiviazione dei file {#file-storage}

Per impostazione predefinita, i file che carichi sul tuo sito web (tramite [File](../website/files.md)) e in altre aree di contenuto usano l'archiviazione gratuita ospitata da B1, fino a 100 MB. Se ti serve più spazio, puoi invece collegare il tuo servizio cloud: i nuovi caricamenti vanno direttamente sul tuo account, senza limiti della piattaforma.

1. Nella pagina Impostazioni, fai clic su **Archiviazione dei file** nell'elenco a sinistra, poi fai clic su **Modifica** nella sezione **Archiviazione dei file**.
2. Scegli un fornitore: **Google Drive**, **Dropbox**, **OneDrive** oppure un **bucket compatibile con S3** (AWS S3, Cloudflare R2, Backblaze B2, ecc.).
3. Per Google Drive, Dropbox o OneDrive, fai clic su **Connetti** e accedi per autorizzare l'accesso. Per un bucket compatibile con S3, inserisci la chiave di accesso, il segreto, il nome del bucket e l'URL pubblico di base.
4. Fai clic su **Salva**.

:::info
Questo riguarda solo i nuovi caricamenti nei File del tuo sito web e nelle aree di contenuto simili. Le immagini delle gallerie, le miniature, i loghi e le foto delle persone restano sempre sull'archiviazione predefinita di B1.
:::

## Promozione di classe {#grade-promotion}

Se registri la **Classe** di bambini e studenti, B1 può far salire automaticamente tutti di una classe in una data che scegli (ad esempio il 1° agosto), invece di richiederti di modificare ogni profilo a mano.

1. Nella pagina Impostazioni, fai clic su **Promozione di classe** nell'elenco a sinistra, poi fai clic su **Modifica** nella sezione **Promozione di classe**.
2. Attiva l'interruttore (mostra **Attivata**) e scegli il **Mese** e il **Giorno** in cui promuovere le classi ogni anno. In quella data, chiunque abbia una classe sale di una classe, e i ragazzi di 12ª classe diventano **Diplomati**.
3. Salva le modifiche.

Per interrompere la promozione automatica, disattiva l'interruttore in modo che mostri **Disattivata** e salva. La data di promozione viene rimossa e le classi non cambieranno più da sole.

## Iscrizione dei volontari {#volunteer-signup}

Per impostazione predefinita, i membri che consultano le [iscrizioni dei volontari](../../b1-church/serving/volunteer-signup.md) vedono ogni settimana futura con posti disponibili. Se l'elenco diventa lungo, puoi mostrare solo la settimana successiva di ogni tipo di piano.

1. Nella pagina Impostazioni, fai clic su **Iscrizione dei volontari** nell'elenco a sinistra, poi fai clic su **Modifica** nella sezione **Iscrizione dei volontari**.
2. Attiva **Mostra solo la settimana successiva di ogni tipo di piano**.
3. Salva le modifiche.

Con questa opzione attiva, ogni tipo di piano mostra solo il suo piano successivo. La settimana seguente compare quando quella data è passata. La riga **Settimane mostrate** della sezione riporta **Solo la settimana successiva di ogni tipo di piano** oppure **Tutte le settimane future**.

## Privacy delle donazioni {#giving-privacy}

Le persone con accesso alle donazioni normalmente vedono i totali delle donazioni di una persona nella sua [scheda persona](../people/adding-people.md#editing-details). Se preferisci non mostrare gli importi ogni volta che viene aperta una scheda, puoi nasconderli finché qualcuno non ne fa richiesta.

1. Nella pagina Impostazioni, fai clic su **Privacy delle donazioni** nell'elenco a sinistra, poi fai clic su **Modifica** nella sezione **Privacy delle donazioni**.
2. Attiva **Nascondi le donazioni nelle schede persona finché non si fa clic**.
3. Salva le modifiche.

Con questa opzione attiva, la scheda delle donazioni nella scheda di una persona riporta "Le donazioni sono nascoste nelle schede persona". Fai clic su **Mostra donazioni** per caricare e visualizzare le donazioni di quella persona. Si nasconde di nuovo quando apri un'altra persona. Non cambia chi può vedere le donazioni: solo le persone con accesso alle donazioni vedono la scheda.

## Importazione ed esportazione {#import-and-export}

Il link **Importa/Esporta** sotto il nome della tua chiesa nella pagina Impostazioni apre uno strumento dedicato in una nuova finestra del browser. Usalo per:

- Importare i dati dei membri da un altro sistema di gestione della chiesa.
- Esportare i tuoi dati ChurchApps per backup o migrazione.

È particolarmente utile quando stai configurando la chiesa per la prima volta e devi trasferire i registri esistenti in ChurchApps.

:::warning
Quando importi dati, fai sempre prima un backup dei registri esistenti. Le operazioni di importazione aggiungono dati al sistema e possono creare voci duplicate se eseguite più volte.
:::
