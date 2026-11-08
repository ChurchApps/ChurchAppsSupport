---
title: "Impostazioni della chiesa"
description: "Imposta nome, indirizzo, sottodominio, fuso orario, formato regionale, provider di messaggistica e archiviazione file della tua chiesa nella pagina Impostazioni chiesa di B1 Admin."
---

# Impostazioni della chiesa

<div class="article-intro">

La pagina Impostazioni chiesa è dove configuri le informazioni di base della tua chiesa, i dati di contatto e il branding. Questi dati vengono utilizzati in tutti gli strumenti ChurchApps, incluso il tuo sito B1.church e l'app B1.

</div>

## Video tutorial

<YouTube id="634zSbzDkYA" title="Configurare informazioni e branding della chiesa in B1" next="Ruoli, permessi e invito del team in B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso “Modifica impostazioni chiesa”. Se non hai accesso, consulta [Ruoli e permessi](./roles-permissions.md).
- Tieni a portata di mano l'indirizzo, i recapiti e il logo della chiesa

</div>

## Modificare le informazioni della chiesa

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Impostazioni** e fai clic su **Impostazioni**.
2. Nella sezione **Informazioni chiesa** (in cima alla pagina), fai clic su **Modifica**.
3. Aggiorna uno qualsiasi dei seguenti campi:
   - **Nome chiesa** -- Il nome visualizzato in tutti i prodotti ChurchApps.
   - **Indirizzo** -- L'indirizzo fisico della tua chiesa.
   - **Informazioni di contatto** -- Numero di telefono, email e altri recapiti.
   - **Fuso orario** -- Il fuso orario della tua chiesa. Vedi [Fuso orario](#time-zone) più sotto.
4. Fai clic su **Salva** per applicare le modifiche.

## Configurare il sottodominio

La tua chiesa ottiene un sottodominio gratuito su **tuachiesa.1.church**. È l'indirizzo web dove membri e visitatori possono accedere alla presenza online della chiesa.

1. Nella pagina Impostazioni, fai clic su **Modifica** nella sezione **Informazioni chiesa** e individua il campo **Sottodominio**.
2. Inserisci il sottodominio che preferisci (ad esempio “graziachiesa” per graziachiesa.1.church).
3. Salva le modifiche.

:::info
Il sottodominio deve essere unico tra tutte le chiese ChurchApps. Se il nome scelto è già in uso, prova ad aggiungere la tua città o regione (ad esempio “graziachiesa-milano”).
:::

Se vuoi che i visitatori raggiungano il tuo sito tramite un dominio tuo (ad esempio **`www.graziachiesa.org`**), consulta [Dominio personalizzato](./custom-domain.md).

## Configurare il branding

Personalizza il modo in cui la tua chiesa appare in tutti gli strumenti ChurchApps:

1. Carica il **logo della chiesa** facendo clic sull'area del logo e selezionando un file immagine.
2. Aggiungi eventuali altre **immagini della chiesa** utilizzate sul tuo sito web e nell'[app mobile](./mobile-app.md).

:::tip
Per risultati ottimali, usa un logo con sfondo trasparente in formato PNG. In questo modo appare bene sia su sfondi chiari sia su sfondi scuri.
:::

## Primo giorno della settimana

Scegli il giorno in cui iniziano i tuoi calendari. Il menu a discesa **Primo giorno della settimana** nella sezione Informazioni chiesa è impostato su **domenica** per impostazione predefinita, ma può essere impostato su qualsiasi giorno. Una volta modificato, viene applicato in tutte le griglie dei calendari in B1 Admin e nel portale membri di B1.church: i calendari dei gruppi, i calendari curati e l'editor degli eventi organizzano tutti le settimane a partire dal giorno che scegli.

## Fuso orario

Il menu a discesa **Fuso orario** nella sezione **Informazioni chiesa** imposta il fuso orario della tua chiesa (ad esempio *America/Chicago*). Scegli **Nessuno** per lasciarlo vuoto. Una volta salvato, il fuso orario compare nel riepilogo delle Informazioni chiesa.

B1 utilizza questo fuso orario per gli orari validi per tutta la chiesa, come i promemoria degli eventi e i programmi visualizzati sulle tue TV [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Gli [orari di check-in](../attendance/setup.md#setting-a-check-in-schedule) sono misurati innanzitutto nel fuso orario del [campus](./campuses.md) del servizio e usano il fuso orario della chiesa solo quando il campus non ne ha uno. Se i tuoi campus si trovano tutti nello stesso fuso orario, impostalo sia sulla chiesa sia su ciascun campus.

## Regione (formato di date e numeri di telefono)

L'impostazione **Regione** controlla il modo in cui date e orari vengono scritti in tutto B1. Per impostazione predefinita le date usano il formato statunitense (ad esempio “28 set 2026” e “9/28/2026”). Le chiese al di fuori degli Stati Uniti possono passare al proprio formato: ad esempio, scegliendo Italiano (Italia) vengono mostrate le date “28 set 2026” e “28/09/2026”.

1. Nella pagina Impostazioni, fai clic su **Regione** nell'elenco a sinistra, quindi fai clic su **Modifica** nella sezione **Regione**.
2. Scegli la tua regione dal menu a discesa **Regione**. Ogni opzione mostra una data di esempio, così puoi vedere esattamente come appariranno le date.
3. Fai clic su **Salva**.

La sezione Regione mostra quindi la regione selezionata, un esempio del **Formato data** e il formato dei tuoi **Numeri di telefono**.

### Formato dei numeri di telefono

La stessa sezione Regione contiene l'impostazione **Numeri di telefono**, che controlla il modo in cui i numeri di telefono vengono inseriti nella scheda di una persona:

- **Internazionale (con prefisso paese)** -- l'impostazione predefinita. I campi telefono mostrano un selettore con la bandiera del paese e salvano i numeri con il prefisso (ad esempio +1 918 555 1234).
- **Locale (come digitato)** -- i campi telefono diventano semplici caselle di testo e salvano i numeri esattamente come li digiti, senza aggiungere il prefisso (ad esempio 0701 234 5678). Scegli questa opzione se la tua chiesa scrive i numeri in un formato locale e non vuoi che B1 aggiunga un prefisso.

Quando è selezionato **Locale**, la sezione Regione mostra anche “Numeri di telefono locali” accanto alla tua regione.

:::tip
L'invio di SMS funziona meglio quando i numeri includono il prefisso del paese. Se invii SMS da B1, mantieni il formato **Internazionale** oppure assicurati che i numeri digitati in modalità Locale includano il prefisso.
:::

La tua regione si applica a date e orari in tutto B1 Admin e sul tuo sito B1.church e nel portale membri, inclusi predicazioni, post del blog, calendari dei gruppi e piani di servizio, così i membri vedono le date nello stesso formato dello staff.

## Messaggistica (SMS) {#texting}

Collega un provider di messaggistica per inviare SMS a una persona o a un intero gruppo da B1 Admin. I messaggi vengono inviati tramite il tuo account presso il provider, quindi si applicano le sue tariffe e i suoi limiti.

1. Nella pagina Impostazioni, fai clic su **Messaggistica** nell'elenco a sinistra, quindi fai clic su **Modifica** nella sezione **Messaggistica**.
2. Scegli un **Provider**:
   - **Clearstream** -- inserisci una **Chiave API**. Creane una nelle impostazioni del tuo account Clearstream, sotto Chiavi API.
   - **Text In Church** -- inserisci una **Chiave API**. Chiedi prima l'accesso API per sviluppatori al supporto di Text In Church, quindi crea una chiave nella sezione Account > API per sviluppatori.
   - **Nalo Solutions** (Ghana) -- inserisci come **Chiave API** la chiave di autenticazione del tuo account Nalo Solutions e un **ID mittente** (fino a 11 caratteri) approvato da Nalo per te.
   - **Twilio** -- usa il tuo account Twilio della chiesa; Twilio ti fattura direttamente. Copia l'**Account SID** e l'**Auth Token** dalla [Console Twilio](https://console.twilio.com) e inserisci un **Numero mittente** -- un numero di telefono Twilio registrato per A2P 10DLC, in un formato come `+15551234567`. Dopo il salvataggio, incolla l'URL del webhook in entrata (vedi sotto) nel campo **Quando arriva un messaggio** del numero in Twilio, così anche le risposte STOP vengono registrate in B1.
3. Fai clic su **Salva**.

Per interrompere l'invio di SMS, imposta **Provider** su **Nessuno** e salva. Questo rimuove il provider salvato.

### Disiscrivere le persone che rispondono STOP

Una volta salvato un provider, riapri la sezione Messaggistica con **Modifica**. Sotto le impostazioni del provider compare il campo di sola lettura **URL webhook STOP in entrata**, con un indirizzo web univoco per la tua chiesa. Fai clic sul campo per selezionare l'indirizzo, copialo e incollalo nell'impostazione del webhook per i messaggi in entrata (risposte) del tuo provider. Funziona con tutti i provider sopra elencati che possono inoltrare le risposte a un webhook.

Da quel momento, quando qualcuno risponde **STOP** (oppure STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno dei tuoi messaggi, B1 trova tutti i contatti con un numero di cellulare corrispondente, li contrassegna come disiscritti e disattiva i loro promemoria via SMS. Vengono quindi esclusi dagli SMS di gruppo. Le altre risposte vengono ignorate.

:::info
Questo utilizza la stessa impostazione di disiscrizione di **Nascondimi dalla rubrica dei membri**, quindi chi risponde STOP risulta anche come **Nascosto dalla rubrica** nel proprio profilo. Il campo compare solo quando il provider salvato è selezionato: se cambi il menu a discesa su un altro provider, salva prima per rivedere di nuovo l'URL.
:::

Una volta collegato un provider, il personale autorizzato a inviare messaggi vede un pulsante **Messaggio** nella pagina di un gruppo (**Invia messaggio a questo gruppo**) e di una persona con un cellulare (**Invia messaggio**). Scrivi il messaggio e fai clic su **Invia**. La finestra conta i caratteri e i segmenti SMS. Per un gruppo, mostra quanti membri riceveranno il messaggio prima dell'invio:

- I membri senza un cellulare registrato vengono saltati.
- I membri che hanno scelto **Nascondimi dalla rubrica dei membri** vengono conteggiati come disiscritti e saltati.
- I familiari che condividono lo stesso numero di cellulare ricevono il messaggio una sola volta.

### Personalizzare i messaggi con i campi unione {#personalizing-texts-with-merge-fields}

Sotto la casella del messaggio, la finestra di invio mostra dei segnaposto: **Nome**, **Cognome**, **Nome visualizzato** e **Nome chiesa**. Fai clic su un segnaposto per inserire il relativo codice (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`) nel punto del cursore. Al momento dell'invio, ogni segnaposto viene sostituito con i dati del destinatario, quindi un messaggio di gruppo come `Ciao {{firstName}}, ci vediamo domenica!` raggiunge ogni membro con il proprio nome. I segnaposto funzionano sia per i messaggi di gruppo sia per quelli a una singola persona. Per i messaggi a un gruppo è disponibile anche il segnaposto **Nome gruppo** (`{{groupName}}`), che viene sostituito con il nome del gruppo.

Per riutilizzare un messaggio, salvalo come [modello di testo](./email-templates.md#text-templates) (un modello email con la categoria **Testo**) e selezionalo da **Carica modello (facoltativo)** in cima alla finestra di invio.

:::info
Il limite di 1.600 caratteri si applica al messaggio come lo digiti. Dopo che i segnaposto sono stati sostituiti, il testo che supera i 1.600 caratteri viene troncato a quella lunghezza.
:::

I messaggi possono anche essere inviati automaticamente da un passaggio di un [flusso di lavoro](../serving/workflows.md#sending-a-text) con l'azione **Invia messaggio**, che usa lo stesso provider e gli stessi segnaposto.

## Archiviazione dei file

Per impostazione predefinita, i file che carichi sul tuo sito (tramite [File](../website/files.md)) e in altre aree di contenuto utilizzano lo spazio di archiviazione gratuito di B1, fino a 100 MB. Se ti serve più spazio, puoi invece collegare il tuo spazio cloud: i nuovi caricamenti vanno direttamente nel tuo account, senza limiti della piattaforma.

1. Nella pagina Impostazioni, fai clic su **Archiviazione file** nell'elenco a sinistra, quindi fai clic su **Modifica** nella sezione **Archiviazione file**.
2. Scegli un provider: **Google Drive**, **Dropbox**, **OneDrive** oppure un **bucket compatibile con S3** (AWS S3, Cloudflare R2, Backblaze B2 e altri).
3. Per Google Drive, Dropbox o OneDrive, fai clic su **Connetti** e accedi per autorizzare l'accesso. Per un bucket compatibile con S3, inserisci la chiave di accesso, la chiave segreta, il nome del bucket e l'URL pubblico di base.
4. Fai clic su **Salva**.

:::info
Questo riguarda solo i nuovi caricamenti nei File del sito e in aree di contenuto simili. Le immagini della galleria, le miniature, i loghi e le foto delle persone restano sempre sull'archiviazione predefinita di B1.
:::

## Promozione di classe

Se tieni traccia della **Classe** dei bambini e degli studenti, B1 può far salire automaticamente tutti di una classe in una data che scegli (ad esempio il 1° agosto), senza che tu debba modificare ogni scheda a mano.

1. Nella pagina Impostazioni, fai clic su **Promozione di classe** nell'elenco a sinistra, quindi fai clic su **Modifica** nella sezione **Promozione di classe**.
2. Attiva l'interruttore (deve mostrare **Attivo**) e scegli il **Mese** e il **Giorno** in cui promuovere le classi ogni anno. In quella data, chiunque abbia una classe passa a quella successiva, e gli studenti di 12ª diventano **Diplomati**.
3. Salva le modifiche.

Per interrompere la promozione automatica, disattiva l'interruttore in modo che mostri **Disattivo**, quindi salva. La data di promozione viene rimossa e le classi non cambieranno più da sole.

## Iscrizione ai volontariato {#volunteer-signup}

Per impostazione predefinita, i membri che consultano le [iscrizioni ai servizi di volontariato](../../b1-church/serving/volunteer-signup.md) vedono tutte le settimane future con posizioni disponibili. Se l'elenco diventa lungo, puoi mostrare solo la settimana successiva per ogni tipo di piano.

1. Nella pagina Impostazioni, fai clic su **Iscrizione al volontariato** nell'elenco a sinistra, quindi fai clic su **Modifica** nella sezione **Iscrizione al volontariato**.
2. Attiva **Mostra solo la settimana successiva per ogni tipo di piano**.
3. Salva le modifiche.

Con questa opzione attiva, ogni tipo di piano mostra solo il piano futuro più vicino. La settimana successiva compare quando la data attuale è passata. La riga **Settimane mostrate** della sezione riporta **Solo la settimana successiva per ogni tipo di piano** oppure **Tutte le settimane future**.

## Privacy delle donazioni {#giving-privacy}

Le persone con accesso alle donazioni di norma vedono i totali delle donazioni di una persona nella sua [scheda](../people/adding-people.md#editing-details). Se preferisci che gli importi non siano visibili ogni volta che si apre una scheda, puoi nasconderli finché qualcuno non ne fa richiesta.

1. Nella pagina Impostazioni, fai clic su **Privacy delle donazioni** nell'elenco a sinistra, quindi fai clic su **Modifica** nella sezione **Privacy delle donazioni**.
2. Attiva **Nascondi le donazioni nelle schede delle persone finché non vengono visualizzate**.
3. Salva le modifiche.

Con questa opzione attiva, la scheda delle donazioni nella scheda di una persona riporta “Le donazioni sono nascoste nelle schede delle persone.” Fai clic su **Mostra donazioni** per caricare e visualizzare le donazioni di quella persona. Si nasconde di nuovo quando apri un'altra persona. Non cambia chi può vedere le donazioni: solo chi ha accesso alle donazioni vede la scheda.

## Importazione ed esportazione

Il link **Importa/Esporta** sotto il nome della tua chiesa nella pagina Impostazioni apre uno strumento dedicato in una nuova finestra del browser. Usalo per:

- Importare i dati dei membri da un altro sistema di gestione delle chiese.
- Esportare i tuoi dati ChurchApps per un backup o per una migrazione.

Questo è particolarmente utile quando stai configurando la chiesa per la prima volta e devi trasferire in ChurchApps i registri esistenti.

:::warning
Prima di importare dati, esegui sempre un backup dei registri esistenti. Le operazioni di importazione aggiungono dati al sistema e possono creare voci duplicate se vengono eseguite più volte.
:::
