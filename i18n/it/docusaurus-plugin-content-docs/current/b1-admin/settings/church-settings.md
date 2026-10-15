---
title: "Impostazioni della chiesa"
---

# Impostazioni della chiesa

<div class="article-intro">

La pagina Impostazioni della chiesa è dove configuri le informazioni di base della chiesa, i recapiti e l'identità visiva. Questi dati vengono usati in tutti gli strumenti ChurchApps, incluso il tuo sito web B1.church e l'app B1 Mobile.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso "Modifica impostazioni della chiesa". Consulta [Ruoli e permessi](./roles-permissions.md) se non hai accesso.
- Tieni pronti l'indirizzo, i recapiti e il logo della chiesa

</div>

## Modificare le informazioni della chiesa

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Impostazioni** e fai clic su **Impostazioni**.
2. Nella sezione **Informazioni sulla chiesa** (in cima alla pagina), fai clic su **Modifica**.
3. Aggiorna uno qualsiasi dei seguenti campi:
   - **Nome della chiesa** -- Il nome visualizzato in tutti i prodotti ChurchApps.
   - **Indirizzo** -- L'indirizzo fisico della tua chiesa.
   - **Informazioni di contatto** -- Numero di telefono, email e altri recapiti.
4. Fai clic su **Salva** per applicare le modifiche.

## Configurare il sottodominio

La tua chiesa ottiene un sottodominio gratuito all'indirizzo **tuachiesa.1.church**. È l'indirizzo web dove i membri e i visitatori possono accedere alla presenza online della chiesa.

1. Nella pagina Impostazioni, fai clic su **Modifica** nella sezione **Informazioni sulla chiesa** e individua il campo **Sottodominio**.
2. Inserisci il sottodominio che preferisci (ad esempio "gracechurch" per gracechurch.1.church).
3. Salva le modifiche.

:::info
Il tuo sottodominio deve essere univoco tra tutte le chiese ChurchApps. Se il nome che preferisci è già occupato, prova ad aggiungere la tua città o il tuo stato (ad esempio "gracechurch-dallas").
:::

Se vuoi che i visitatori raggiungano il tuo sito tramite un dominio tuo (ad esempio **www.gracechurch.org**), consulta [Dominio personalizzato](./custom-domain.md).

## Configurare il brand

Personalizza l'aspetto della tua chiesa in tutti gli strumenti ChurchApps:

1. Carica il **logo della chiesa** facendo clic sull'area del logo e selezionando un file immagine.
2. Aggiungi eventuali **immagini della chiesa** aggiuntive usate sul tuo sito web e nell'[app mobile](./mobile-app.md).

:::tip
Per ottenere i risultati migliori, usa un logo in formato PNG con sfondo trasparente. Così appare bene sia su sfondi chiari sia su sfondi scuri.
:::

## Primo giorno della settimana

Scegli il giorno in cui iniziano i tuoi calendari. Il menu a tendina **Primo giorno della settimana** nella sezione Informazioni sulla chiesa è impostato su **Domenica**, ma può essere impostato su qualsiasi giorno. Una volta modificato, viene rispettato nelle griglie dei calendari in B1 Admin e nel portale dei membri B1.church -- i calendari dei gruppi, i calendari curati e l'editor degli eventi dispongono tutti le settimane a partire dal giorno che scegli.

## Regione (formato di data e telefono)

L'impostazione **Regione** controlla come vengono scritte date e orari in tutto B1. Per impostazione predefinita le date usano il formato degli Stati Uniti (ad esempio "28 set 2026" e "9/28/2026"). Le chiese al di fuori degli USA possono passare al proprio formato -- ad esempio, scegliendo Italiano (Italia) vengono mostrate "28 set 2026" e "28/09/2026".

1. Nella pagina Impostazioni, fai clic su **Regione** nell'elenco a sinistra, poi su **Modifica** nella sezione **Regione**.
2. Scegli la tua regione dal menu a tendina **Regione**. Ogni opzione mostra una data di esempio così puoi vedere esattamente come appariranno le date.
3. Fai clic su **Salva**.

La sezione Regione mostra quindi la regione selezionata, un esempio del **Formato data** e il formato dei **Numeri di telefono**.

### Formato dei numeri di telefono

La stessa sezione Regione contiene l'impostazione **Numeri di telefono** che controlla come vengono inseriti i numeri di telefono nella scheda di una persona:

- **Internazionale (con prefisso paese)** -- l'impostazione predefinita. I campi telefono mostrano un selettore con la bandiera del paese e salvano i numeri con il prefisso (ad esempio +39 333 555 1234).
- **Locale (come digitato)** -- i campi telefono diventano semplici caselle di testo e salvano i numeri esattamente come li digiti, senza aggiungere il prefisso del paese (ad esempio 0701 234 5678). Scegli questa opzione se la tua chiesa scrive i numeri in un formato locale e non vuoi che B1 aggiunga un prefisso.

Quando è selezionato **Locale**, la sezione Regione mostra anche "Numeri di telefono locali" accanto alla tua regione.

:::tip
Gli SMS funzionano meglio quando i numeri includono il prefisso del paese. Se invii SMS da B1, mantieni il formato **Internazionale**, oppure assicurati che i numeri digitati in modalità Locale includano il prefisso del paese.
:::

La tua regione si applica a date e orari in tutto B1 Admin e sul tuo sito web B1.church e nel portale dei membri, inclusi sermoni, post del blog, calendari dei gruppi e piani di servizio, così i membri vedono le date nello stesso formato del tuo staff.

## Messaggi di testo {#texting}

Collega un fornitore di SMS per inviare messaggi a una persona o a un intero gruppo da B1 Admin. I messaggi vengono inviati tramite il tuo account personale presso il fornitore, quindi si applicano le sue tariffe e i suoi limiti.

1. Nella pagina Impostazioni, fai clic su **Messaggi di testo** nell'elenco a sinistra, poi su **Modifica** nella sezione **Messaggi di testo**.
2. Scegli un **Fornitore**:
   - **Clearstream** -- inserisci una **Chiave API**. Creane una nelle Impostazioni account di Clearstream, sotto Chiavi API.
   - **Text In Church** -- inserisci una **Chiave API**. Chiedi prima al supporto di Text In Church l'accesso API per sviluppatori, poi crea una chiave nella sezione Impostazioni account > API per sviluppatori.
   - **Nalo Solutions** (Ghana) -- inserisci la chiave di autenticazione del tuo account Nalo Solutions come **Chiave API**, e un **ID mittente** (fino a 11 caratteri) approvato da Nalo per te.
3. Fai clic su **Salva**.

Per interrompere l'invio di SMS, imposta **Fornitore** su **Nessuno** e salva. Questo rimuove il fornitore salvato.

### Disiscrivere le persone che rispondono STOP

Una volta salvato un fornitore, riapri la sezione Messaggi di testo con **Modifica**. Sotto le impostazioni del fornitore, un campo di sola lettura **URL del webhook per i messaggi in arrivo (STOP)** mostra un indirizzo web univoco per la tua chiesa. Fai clic sul campo per selezionare l'indirizzo, copialo e incollalo nell'impostazione webhook dei messaggi in arrivo (risposte) del tuo fornitore. Funziona con qualsiasi dei fornitori sopra elencati che possa inoltrare le risposte in arrivo a un webhook.

Da quel momento, quando qualcuno risponde **STOP** (oppure STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno dei tuoi messaggi, B1 trova tutti quelli il cui numero di cellulare corrisponde, li contrassegna come disiscritti e disattiva i loro promemoria via SMS. Vengono poi saltati dagli SMS di gruppo. Le altre risposte vengono ignorate.

:::info
Questo usa la stessa impostazione di disiscrizione di **Nascondimi dal registro dei membri**, quindi chi risponde STOP compare anche come **Nascosto dal registro** sul proprio profilo. Il campo compare solo quando è selezionato il fornitore salvato -- se cambi il menu a tendina su un altro fornitore, salva prima per rivedere l'URL.
:::

Una volta collegato un fornitore, il personale autorizzato a inviare messaggi vede un pulsante **Messaggio** nella pagina di un gruppo (**Invia messaggio a questo gruppo**) e di una persona con un cellulare (**Invia messaggio**). Scrivi il tuo messaggio e fai clic su **Invia**. La finestra conta i caratteri e i segmenti SMS. Per un gruppo, mostra quanti membri riceveranno il messaggio prima dell'invio:

- I membri senza un cellulare registrato vengono saltati.
- I membri che hanno scelto **Nascondimi dal registro dei membri** vengono conteggiati come disiscritti e saltati.
- I familiari che condividono lo stesso numero di cellulare ricevono il messaggio una sola volta.

### Personalizzare i messaggi con i campi unione

Sotto la casella del messaggio, la finestra del messaggio mostra dei segnaposto: **Nome**, **Cognome**, **Nome visualizzato** e **Nome della chiesa**. Fai clic su un segnaposto per inserire il suo codice (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` oppure `{{churchName}}`) alla posizione del cursore. Quando il messaggio viene inviato, ogni segnaposto viene sostituito con i dati del destinatario, così un messaggio di gruppo come `Ciao {{firstName}}, ci vediamo domenica!` arriva a ciascun membro con il proprio nome. I segnaposto funzionano sia per i messaggi di gruppo sia per i messaggi a una singola persona.

:::info
Il limite di 1.600 caratteri si applica al messaggio come lo scrivi. Dopo che i segnaposto sono stati sostituiti, qualsiasi messaggio più lungo di 1.600 caratteri viene troncato a quella lunghezza.
:::

I messaggi possono anche essere inviati automaticamente da un passaggio di un [flusso di lavoro](../serving/workflows.md#sending-a-text) con l'azione **Invia SMS**, che usa lo stesso fornitore e gli stessi segnaposto.

## Archiviazione dei file

Per impostazione predefinita, i file che carichi sul tuo sito web (tramite [File](../website/files.md)) e in altre aree di contenuto usano lo spazio di archiviazione gratuito ospitato da B1, fino a 100 MB. Se ti serve più spazio, puoi collegare il tuo servizio di archiviazione cloud: i nuovi caricamenti vanno direttamente sul tuo account senza limiti della piattaforma.

1. Nella pagina Impostazioni, fai clic su **Archiviazione dei file** nell'elenco a sinistra, poi su **Modifica** nella sezione **Archiviazione dei file**.
2. Scegli un fornitore: **Google Drive**, **Dropbox**, **OneDrive** oppure un **bucket compatibile con S3** (AWS S3, Cloudflare R2, Backblaze B2, ecc.).
3. Per Google Drive, Dropbox o OneDrive, fai clic su **Collega** e accedi per autorizzare l'accesso. Per un bucket compatibile con S3, inserisci la tua chiave di accesso, il segreto, il nome del bucket e l'URL pubblico di base.
4. Fai clic su **Salva**.

:::info
Questo riguarda solo i nuovi caricamenti nei File del tuo sito web e in aree di contenuto simili. Le immagini delle gallerie, le miniature, i loghi e le foto delle persone restano sempre sull'archiviazione predefinita di B1.
:::

## Promozione di classe

Se tieni traccia della **Classe** dei bambini e degli studenti, B1 può far salire automaticamente tutti di una classe in una data che scegli (ad esempio il 1° agosto), invece di richiederti di modificare ogni profilo a mano.

1. Nella pagina Impostazioni, fai clic su **Promozione di classe** nell'elenco a sinistra, poi su **Modifica** nella sezione **Promozione di classe**.
2. Attiva l'interruttore (mostra **Attivata**) e scegli il **Mese** e il **Giorno** in cui promuovere le classi ogni anno. In quella data, tutti quelli con una classe salgono di una classe, e gli studenti di quinta superiore diventano **Diplomati**.
3. Salva le modifiche.

Per interrompere la promozione automatica, disattiva l'interruttore così mostra **Disattivata** e salva. La data di promozione viene rimossa e le classi non cambieranno più da sole.

## Iscrizione dei volontari {#volunteer-signup}

Per impostazione predefinita, i membri che sfogliano le [iscrizioni dei volontari](../../b1-church/serving/volunteer-signup.md) vedono ogni settimana futura con posizioni aperte. Se questo elenco diventa lungo, puoi mostrare solo la settimana successiva di ciascun tipo di piano.

1. Nella pagina Impostazioni, fai clic su **Iscrizione volontari** nell'elenco a sinistra, poi su **Modifica** nella sezione **Iscrizione volontari**.
2. Attiva **Mostra solo la settimana successiva di ciascun tipo di piano**.
3. Salva le modifiche.

Con questa opzione attiva, ogni tipo di piano mostra solo il suo prossimo piano imminente. La settimana successiva compare quando quella data è passata. La riga **Settimane mostrate** della sezione riporta **Solo la settimana successiva di ciascun tipo di piano** oppure **Tutte le settimane imminenti**.

## Privacy delle offerte {#giving-privacy}

Le persone con accesso alle offerte normalmente vedono i totali delle offerte di una persona nella sua [scheda persona](../people/adding-people.md#editing-details). Se preferisci non mostrare gli importi ogni volta che si apre una scheda, puoi nasconderli finché qualcuno non lo chiede.

1. Nella pagina Impostazioni, fai clic su **Privacy delle offerte** nell'elenco a sinistra, poi su **Modifica** nella sezione **Privacy delle offerte**.
2. Attiva **Nascondi le offerte nelle schede persona finché non vengono richieste**.
3. Salva le modifiche.

Con questa opzione attiva, la scheda delle offerte in una scheda persona dice "Le offerte sono nascoste nelle schede persona." Fai clic su **Mostra offerte** per caricare e visualizzare le offerte di quella persona. Si nasconde di nuovo quando apri un'altra persona. Non cambia chi può vedere le offerte: solo le persone con accesso alle offerte vedono la scheda.

## Importazione ed esportazione

Il collegamento **Importa/Esporta** sotto il nome della tua chiesa nella pagina Impostazioni apre uno strumento dedicato in una nuova finestra del browser. Usalo per:

- Importare i dati dei membri da un altro sistema di gestione della chiesa.
- Esportare i tuoi dati ChurchApps per backup o migrazione.

È particolarmente utile quando stai configurando la chiesa per la prima volta e devi trasferire i registri esistenti in ChurchApps.

:::warning
Quando importi dati, fai sempre prima un backup dei registri esistenti. Le operazioni di importazione aggiungono dati al sistema e possono creare voci duplicate se vengono eseguite più volte.
:::
