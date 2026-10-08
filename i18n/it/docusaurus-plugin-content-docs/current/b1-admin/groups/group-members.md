---
title: "Membri del gruppo"
---

# Membri del gruppo

<div class="article-intro">

Una volta creato un gruppo, il passo successivo è aggiungere membri. Dalla pagina dei dettagli del gruppo puoi cercare persone, aggiungerle al gruppo, assegnare leader, inviare messaggi ed esportare l'elenco dei membri. La gestione dell'iscrizione al gruppo è essenziale per coordinare piccoli gruppi, comitati e classi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno di almeno un gruppo impostato in B1 Admin. Consulta [Creazione di gruppi](creating-groups.md) se non ne hai ancora creato uno.
- Le persone che desideri aggiungere devono già esistere nella tua directory [Persone](../people/adding-people.md). Se qualcuno non è in B1 ancora, puoi crearlo dalla ricerca dei membri (vedi sotto).

</div>

## Aggiunta di membri a un gruppo

1. Nel [menu Jump](../introduction.md#getting-around-with-the-jump-menu), scegli **Persone > Gruppi** e fai clic sul gruppo che desideri gestire.
2. Fai clic sulla scheda **Membri**.
3. Nella casella di ricerca, digita il nome della persona che desideri aggiungere.
4. Fai clic su **Aggiungi** accanto al nome della persona nei risultati della ricerca.
5. La persona ora appare nell'elenco dei membri del gruppo.

:::tip
Lascia la casella di ricerca vuota e fai clic su **Cerca** per sfogliare l'intera directory. Ciò è utile se non sei sicuro dell'ortografia esatta del nome di qualcuno.
:::

### Aggiunta di qualcuno che non è ancora in B1

Se la tua ricerca non trova nessuno, la ricerca mostra **Nessun record trovato** con un collegamento **Aggiungi nuova persona**. Fai clic su di esso, inserisci il nome, il cognome e (facoltativamente) l'indirizzo email della persona, e fai clic su **Aggiungi**. La nuova persona viene creata nella tua directory Persone e aggiunta al gruppo in un'unica operazione - non hai bisogno di cercarla di nuovo.

## Designazione di leader del gruppo

I leader del gruppo hanno privilegi speciali - possono modificare il [calendario del gruppo](group-calendar.md), gestire gli eventi e aiutare a coordinare il gruppo.

I leader del gruppo hanno privilegi speciali - possono modificare il [calendario del gruppo](group-calendar.md), gestire gli eventi e aiutare a coordinare il gruppo.

1. Nell'elenco dei membri del gruppo, trova la persona che desideri rendere leader.
2. Fai clic sull'**icona della chiave verde** accanto al suo nome.
3. La persona è ora designata come leader del gruppo.

Per rimuovere lo stato di leader, fai clic di nuovo sull'icona della chiave verde.

:::info
Qualsiasi membro del gruppo può visualizzare il calendario del gruppo e gli eventi, ma solo i leader possono aggiungere o modificare gli eventi del calendario.
:::

## Invio di messaggi ai membri del gruppo

Puoi comunicare con tutti i membri di un gruppo direttamente da B1 Admin:

1. Dalla pagina dei dettagli del gruppo, cerca l'area di messaggistica.
2. Digita il tuo messaggio nella casella di testo.
3. Fai clic su **Invia**.

Il tuo messaggio sarà consegnato a tutti i membri del gruppo.

## Invio di email ai membri del gruppo

Puoi inviare email formattate a tutti i membri di un gruppo:

1. Dalla pagina dei dettagli del gruppo, fai clic sull'**icona email**.
2. Si apre la finestra di dialogo Invia Email, mostrando quanti membri riceveranno l'email e quanti non hanno un indirizzo email in archivio.
3. Facoltativamente seleziona un **modello di email** dal menu a discesa, o componi un messaggio da zero. Fai clic su **Gestisci modelli** per creare o modificare modelli.
4. Immetti una **riga dell'oggetto**. Puoi inserire campi di unione facendo clic sui chip del campo: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Componi il **corpo dell'email** utilizzando l'editor HTML. Gli stessi campi di unione sono disponibili qui.
6. Fai clic su **Invia**.
7. Un riepilogo mostra quante email sono state inviate con successo e quanti membri sono stati saltati (nessun indirizzo email in archivio).

:::tip
Crea modelli di email riutilizzabili per comunicazioni ricorrenti come aggiornamenti settimanali, annunci di eventi o richieste di preghiera. I modelli risparmiano tempo e garantiscono messaggistica coerente.
:::

### Attivazione dell'email di gruppo per la tua chiesa

Tutte le chiese su B1 inviano email dallo stesso indirizzo, quindi condividono una reputazione di invio. Per mantenere l'email di tutti fuori dalle cartelle di spam, il team di ChurchApps esamina ogni chiesa una volta prima di poter inviare email di gruppo.

Se la tua chiesa non è stata ancora esaminata, la finestra di dialogo Invia Email mostra **L'email di gruppo ha bisogno di una rapida revisione** invece dell'editor di messaggi:

1. Fai clic su **Richiedi revisione**. Il team di supporto di ChurchApps riceve una notifica.
2. La finestra di dialogo cambia in **Revisione richiesta**. Puoi chiuderla.
3. L'email di gruppo viene solitamente attivata entro un giorno lavorativo. Apri di nuovo la finestra di dialogo Invia Email dopo per inviare il tuo messaggio.

Fino a quando la tua chiesa non viene approvata, B1 non invia neanche [email di follow-up del modulo](../forms/creating-forms.md#sending-a-follow-up-email) o il passaggio **Invia email** in [flussi di lavoro](../serving/workflows.md).

:::info Limiti di invio
Dopo l'approvazione, una chiesa può inviare fino a 150 email scritte dalla chiesa al giorno. Il limite aumenta man mano che la tua chiesa costruisce una cronologia di invio pulita, fino a 2.000 al giorno. Se i messaggi recenti rimbalzano o vengono contrassegnati come spam, l'email di gruppo si interrompe e la finestra di dialogo ti chiede di contattare il supporto. Se un invio superasse il tuo limite giornaliero, B1 non lo invia e mostra un errore.
:::

## Invio di SMS ai membri del gruppo

Una volta che la tua chiesa ha connesso un [provider di SMS](../settings/church-settings.md#texting), un'icona SMS (**Invia SMS a questo gruppo**) appare nell'intestazione del gruppo.

1. Dalla pagina dei dettagli del gruppo, fai clic su **icona SMS**.
2. La finestra di dialogo mostra quanti membri riceveranno l'SMS. I membri senza numero di telefono mobile in archivio o che hanno rinunciato vengono saltati.
3. Digita il tuo messaggio. Per personalizzarlo, fai clic su un chip segnaposto sotto la casella del messaggio -- **Nome**, **Cognome**, **Nome visualizzato** o **Nome chiesa** -- per inserirlo al tuo cursore. Ogni segnaposto viene compilato con i dettagli del destinatario quando l'SMS viene inviato.
4. Fai clic su **Invia**.

Vedi [Personalizzazione degli SMS con campi di unione](../settings/church-settings.md#personalizing-texts-with-merge-fields) per maggiori dettagli.

## Esportazione dei dati del gruppo

Per scaricare l'elenco dei membri del gruppo come file:

1. Dalla pagina dei dettagli del gruppo, fai clic sull'**icona di download**.
2. Un file CSV contenente le informazioni dei membri del gruppo verrà scaricato sul tuo computer.

Un'esportazione CSV è utile per importare dati in altri strumenti o mantenere record offline. Per più opzioni di esportazione, vedi [Esportazione dei Dati](../people/exporting-data.md).

## Stampa dell'elenco dei membri {#printing-the-member-list}

Fai clic sull'icona **Stampa Foglio di Presenza** (stampante) sopra l'elenco dei membri e scegli un layout. La pagina si apre in una nuova scheda e la finestra di stampa del tuo browser appare automaticamente.

- **Foglio di presenza** -- un elenco di classe senza data con caselle **Presente** e **Assente** che gli insegnanti possono segnare a mano. Vedi [Stampa di un Foglio di Presenza](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Rubrica dei contatti** -- un elenco di contatti per il gruppo, con la data di oggi e intestato con il nome della tua chiesa e il nome del gruppo. Ogni membro ha una riga con il suo **Nome**, **Telefono**, **Email** e **Indirizzo**. I leader sono elencati per primi e contrassegnati come **Leader**, poi tutti gli altri in ordine di cognome. Il telefono mostrato è il numero di cellulare del membro, oppure il numero di casa o di lavoro se non c'è un cellulare. I dati di contatto sono lasciati vuoti per chi ha rinunciato.

:::warning
Una rubrica dei contatti contiene le informazioni di contatto personali dei membri. Condividi le copie stampate solo con i leader del gruppo e con altre persone che ne hanno bisogno.
:::

## Invio di notifiche push ai membri del gruppo

Puoi inviare una notifica push direttamente a tutti i membri del gruppo che hanno l'app B1.church installata sul loro dispositivo con le notifiche push abilitate.

1. Dalla pagina dei dettagli del gruppo, fai clic sull'**icona della campana** nella barra degli strumenti dell'intestazione (accanto alle icone email e SMS - l'icona SMS appare una volta che un [provider di SMS](../settings/church-settings.md#texting) è connesso).
2. Si apre una finestra di dialogo che mostra quanti membri del tuo gruppo hanno le notifiche push abilitate.
3. Riempi i dettagli della notifica:
   - **Titolo** *(obbligatorio)* -- Un breve riepilogo, fino a 80 caratteri.
   - **Messaggio** *(obbligatorio)* -- Il corpo della notifica, fino a 240 caratteri.
   - **Apri collegamento o URL del volantino** *(facoltativo)* -- Un percorso app relativo (ad esempio, `/mobile/groups`) o un URL completo `https://` che la notifica apre quando viene toccata.
   - **URL dell'immagine** *(facoltativo)* -- Un URL `https://` di un'immagine che appare accanto alla notifica su dispositivi supportati.
4. Un'anteprima dal vivo mostra come apparirà la notifica sul dispositivo.
5. Fai clic su **Invia notifica**.

:::info
Le notifiche push vengono consegnate solo ai membri del gruppo che hanno il PWA B1.church installato e non hanno disabilitato le notifiche push. I membri senza un dispositivo push registrato o con push disattivato vengono conteggiati come saltati, e il riepilogo dell'invio mostra quanti sono stati raggiunti rispetto a quanti saltati.
:::

:::tip
Dopo l'invio, la finestra di dialogo mostra quante notifiche sono state messe in coda con successo. Se la maggior parte dei membri viene visualizzata come saltata, ricordagli di visitare il loro sito B1.church, installarlo come app della schermata iniziale e consentire le notifiche quando richiesto.
:::

## Rimozione di membri

Per rimuovere qualcuno da un gruppo, individua il loro nome nell'elenco dei membri e fai clic sul pulsante **rimuovi** accanto alla loro voce.

:::info
La rimozione di una persona da un gruppo non la elimina dalla tua directory della chiesa. Continueranno a comparire nella sezione [Persone](../people/adding-people.md) e possono essere riagiunti al gruppo in qualsiasi momento.
:::
