---
title: "Membri del gruppo"
---

# Membri del gruppo

<div class="article-intro">

Una volta creato un gruppo, il passo successivo è aggiungere i membri. Dalla pagina di dettaglio del gruppo puoi cercare persone, aggiungerle al gruppo, assegnare i leader, inviare messaggi ed esportare l'elenco dei membri. Gestire l'appartenenza al gruppo è essenziale per coordinare piccoli gruppi, comitati e classi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve almeno un gruppo configurato in B1 Admin. Vedi [Creare gruppi](creating-groups.md) se non ne hai ancora creato uno.
- Le persone che vuoi aggiungere dovrebbero già essere nella tua rubrica [People](../people/adding-people.md). Se qualcuno non c'è, puoi crearlo dalla ricerca dei membri (vedi sotto).

</div>

## Aggiungere membri a un gruppo

1. Nel [menu Jump](../introduction.md#getting-around-with-the-jump-menu), scegli **People > Groups** e fai clic sul gruppo che vuoi gestire.
2. Nella sezione **Members** della pagina del gruppo, fai clic su **All members**. (Team e ministeri si aprono direttamente nel loro elenco di membri.)
3. Nella casella **Add Person** sotto l'elenco dei membri, digita il nome della persona che vuoi aggiungere e premi **Invio** oppure fai clic sull'icona di ricerca.
4. Fai clic sul nome della persona, oppure sull'icona di aggiunta accanto ad esso, nei risultati della ricerca.
5. La persona ora compare nell'elenco dei membri del gruppo.

:::tip
Prima di digitare qualsiasi cosa, la casella **Add Person** mostra un breve elenco di **Recent people** che puoi aggiungere con un solo clic.
:::

Quando hai finito, fai clic sul link **Back to** con il nome del gruppo per tornare alla pagina del gruppo. La pagina del gruppo mostra un riepilogo di **Members**, **Sessions**, **Calendar** e **Health**, ciascuno con un link alla sua vista completa. Se sei uno dei leader del gruppo, mostra anche **Leader notes** (vedi [Note dei leader](#leader-notes) più sotto). Quando ci sono moduli collegati al gruppo, compare anche una sezione **Linked forms** (vedi [Moduli collegati](#linked-forms) più sotto).

### Aggiungere una persona che non è ancora in B1

Se la ricerca non trova nessuno, compare **No records found** con un link **Add New Person**. Fai clic su di esso, inserisci nome, cognome e (facoltativamente) email, quindi fai clic su **Add**. La nuova persona viene creata nella tua rubrica People e aggiunta al gruppo in un unico passaggio -- non devi cercarla di nuovo.

## Designare i leader del gruppo {#designating-group-leaders}

I leader del gruppo hanno privilegi speciali: possono modificare il [calendario del gruppo](group-calendar.md), gestire gli eventi e coordinare il gruppo.

1. Nell'elenco dei membri del gruppo, trova la persona che vuoi rendere leader.
2. Fai clic sull'**icona a stella** (**Make Leader**) accanto al suo nome.
3. La persona è ora designata come leader del gruppo e mostra un badge **Leader**.

Per rimuovere lo stato di leader, fai di nuovo clic sull'icona a stella (**Remove Leader Access**).

:::info
Qualsiasi membro del gruppo può visualizzare il calendario e gli eventi del gruppo, ma solo i leader possono aggiungere o modificare gli eventi del calendario.
:::

## Moduli collegati {#linked-forms}

Quando un modulo Stand Alone è [collegato al gruppo](../forms/creating-forms.md#linking-a-form-to-a-group), la pagina del gruppo mostra una sezione **Linked forms** con il nome di ogni modulo, se è **Open** o **Closed**, e quanti moduli sono collegati. La sezione compare solo per i leader del gruppo e per le persone che possono amministrare i moduli, e solo quando è collegato almeno un modulo. Gli amministratori dei moduli possono fare clic sul nome di un modulo per aprirlo, oppure fare clic su **All forms** per andare alla pagina Forms.

I leader del gruppo leggono e stampano le risposte a questi moduli dalla pagina del gruppo su [B1.church](../../b1-church/groups/group-details.md#linked-forms).

## Note dei leader {#leader-notes}

I leader del gruppo possono tenere note private sul gruppo -- ad esempio follow-up, richieste di preghiera o preoccupazioni pastorali -- che il resto del gruppo non vede mai.

La sezione **Leader notes** compare nella pagina del gruppo solo per le persone che sono leader di quel gruppo. Mostra la nota più recente, chi l'ha scritta e quando, e quante note ci sono.

1. Nella pagina del gruppo, fai clic su **All notes** nella sezione **Leader notes**.
2. Scrivi la tua nota nella casella e pubblicala. Le note sono elencate con il nome e la foto dell'autore, e la data e l'ora di pubblicazione.
3. Fai clic sul link **Back to** con il nome del gruppo per tornare alla pagina del gruppo.

:::info
Le note dei leader sono visibili solo ai leader del gruppo. Gli altri membri non possono vederle, e nemmeno lo staff o gli amministratori -- anche con permessi completi -- a meno che non siano anche leader di quel gruppo. Per dare accesso a un'altra persona, [rendila leader](#designating-group-leaders). I leader vedono queste note anche nella sezione **Leader notes** della pagina del gruppo su [B1.church](../../b1-church/groups/group-details.md#leader-notes), e nella scheda **Groups** della pagina [Notes](../people/notes.md) in B1 Admin.
:::

## Inviare messaggi ai membri del gruppo

Puoi comunicare con tutti i membri di un gruppo direttamente da B1 Admin:

1. Nell'elenco dei membri del gruppo, fai clic sull'icona **Send a message to members** sopra l'elenco.
2. Scrivi il tuo messaggio nella casella di testo (oppure scegline uno da **Templates**).
3. Fai clic su **Send**.

Il tuo messaggio verrà recapitato a tutti i membri del gruppo.

## Inviare email ai membri del gruppo

Puoi inviare email formattate a tutti i membri di un gruppo:

1. Dalla pagina di dettaglio del gruppo, fai clic sul pulsante **Email** sul lato sinistro della pagina.
2. Si apre la finestra Send Email, che mostra quanti membri riceveranno l'email e quanti non hanno un indirizzo email registrato.
3. Facoltativamente seleziona un **email template** dal menu a tendina, oppure scrivi un messaggio da zero. Fai clic su **Manage Templates** per creare o modificare i modelli.
4. Inserisci un **subject line**. Puoi inserire campi di unione facendo clic sui chip dei campi: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Scrivi il **corpo dell'email** usando l'editor HTML. Gli stessi campi di unione sono disponibili anche qui.
6. Fai clic su **Send**.
7. Un riepilogo mostra quante email sono state inviate con successo e quanti membri sono stati saltati (nessun indirizzo email registrato).

:::tip
Crea modelli di email riutilizzabili per comunicazioni ricorrenti come aggiornamenti settimanali, annunci di eventi o richieste di preghiera. I modelli fanno risparmiare tempo e garantiscono un messaggio coerente.
:::

### Attivare l'email di gruppo per la tua chiesa {#turning-on-group-email-for-your-church}

Tutte le chiese su B1 inviano email dallo stesso indirizzo, quindi condividono una stessa reputazione di invio. Per evitare che le email di tutti finiscano nella cartella spam, il team di ChurchApps esamina ogni chiesa una volta prima che possa inviare email di gruppo.

Se la tua chiesa non è ancora stata esaminata, la finestra Send Email mostra **Group email needs a quick review** invece dell'editor dei messaggi:

1. Fai clic su **Request review**. Il team di supporto di ChurchApps viene avvisato.
2. La finestra cambia in **Review requested**. Puoi chiuderla.
3. L'email di gruppo di solito viene attivata entro un giorno lavorativo. Dopo di che, apri di nuovo la finestra Send Email per inviare il tuo messaggio.

Finché la tua chiesa non viene approvata, B1 non invia nemmeno le [email di follow-up dei moduli](../forms/creating-forms.md#sending-a-follow-up-email) né il passaggio **Send email** nei [flussi di lavoro](../serving/workflows.md).

:::info Limiti di invio
Dopo l'approvazione, una chiesa può inviare fino a 150 email scritte dalla chiesa al giorno. Il limite cresce man mano che la chiesa costruisce una cronologia di invio pulita, fino a 2.000 al giorno. Se di recente alcuni messaggi sono stati rifiutati o segnalati come spam, l'invio di email di gruppo viene sospeso e la finestra ti chiede di contattare il supporto. Se un invio superasse il tuo limite giornaliero, B1 non lo invia e mostra un errore.
:::

## Inviare SMS ai membri del gruppo

Una volta che la tua chiesa ha collegato un [fornitore di SMS](../settings/church-settings.md#texting), accanto al pulsante **Email** nella pagina del gruppo compare un pulsante **Text** (**Text this group**).

1. Dalla pagina di dettaglio del gruppo, fai clic su **Text**.
2. La finestra mostra quanti membri riceveranno l'SMS. I membri senza un cellulare registrato o che hanno rinunciato alla ricezione vengono saltati.
3. Scrivi il tuo messaggio. Per personalizzarlo, fai clic su un segnaposto sotto la casella del messaggio -- **First Name**, **Last Name**, **Display Name** o **Church Name** -- per inserirlo nel punto del cursore. Ogni segnaposto viene sostituito con i dati del destinatario quando l'SMS viene inviato.
4. Fai clic su **Send**.

Vedi [Personalizzare gli SMS con i campi di unione](../settings/church-settings.md#personalizing-texts-with-merge-fields) per maggiori dettagli.

## Esportare i dati del gruppo

Per scaricare l'elenco dei membri del gruppo come file:

1. Nell'elenco dei membri del gruppo, fai clic su **Export** sopra l'elenco.
2. Un file CSV contenente le informazioni dei membri del gruppo verrà scaricato sul tuo computer.

Un'esportazione CSV è utile per importare i dati in altri strumenti o per conservare registri offline. Per altre opzioni di esportazione, vedi [Esportare i dati](../people/exporting-data.md).

## Stampare l'elenco dei membri

Nell'elenco dei membri del gruppo, fai clic sull'icona **Print Roll Sheet** (stampante) sopra l'elenco e scegli un layout. La pagina si apre in una nuova scheda e compare automaticamente la finestra di stampa del browser.

- **Attendance Sheet** -- Un elenco di classe senza data, con le caselle **Present** e **Absent** che gli insegnanti possono segnare a mano. Vedi [Stampare un foglio di presenze](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Contact Roster** -- Un elenco di contatti del gruppo, datato con la data odierna e intestato con il logo della tua chiesa (il **Light Background Logo** da [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, e il nome del gruppo. Ogni membro ha una riga con il suo **Name**, **Phone**, **Email** e **Address**. I leader sono elencati per primi e contrassegnati come **Leader**, poi tutti gli altri in ordine di cognome. Il telefono mostrato è il numero di cellulare del membro, oppure il numero di casa o di lavoro se non ha un cellulare. I dati di contatto vengono lasciati vuoti per chi ha rinunciato alla ricezione.

:::warning
Un elenco di contatti contiene informazioni di contatto personali dei membri. Condividi le copie stampate solo con i leader del gruppo e con altre persone che ne hanno bisogno.
:::

## Inviare notifiche push ai membri del gruppo

Puoi inviare direttamente una notifica push a tutti i membri del gruppo che hanno installato l'app B1.church sul proprio dispositivo con le notifiche push attive.

1. Dalla pagina di dettaglio del gruppo, fai clic su **Notify** (sotto i pulsanti **Email** e **Text** -- il pulsante **Text** compare una volta collegato un [fornitore di SMS](../settings/church-settings.md#texting)).
2. Si apre una finestra che mostra quanti membri del tuo gruppo hanno le notifiche push attive.
3. Compila i dettagli della notifica:
   - **Title** *(obbligatorio)* -- Un breve riassunto, fino a 80 caratteri.
   - **Message** *(obbligatorio)* -- Il testo della notifica, fino a 240 caratteri.
   - **Open link or flyer URL** *(facoltativo)* -- Un percorso relativo dell'app (ad esempio `/mobile/groups`) o un URL completo `https://` che la notifica apre quando viene toccata.
   - **Image URL** *(facoltativo)* -- Un URL `https://` di un'immagine che appare insieme alla notifica sui dispositivi compatibili.
4. Un'anteprima in tempo reale mostra come apparirà la notifica sul dispositivo.
5. Fai clic su **Send Notification**.

:::info
Le notifiche push vengono recapitate solo ai membri del gruppo che hanno installato la PWA di B1.church e non hanno disattivato le notifiche push. I membri senza un dispositivo registrato per le push o con le push disattivate vengono conteggiati come saltati, e il riepilogo dell'invio mostra quanti sono stati raggiunti e quanti saltati.
:::

:::tip
Dopo l'invio, la finestra mostra quante notifiche sono state messe in coda con successo. Se la maggior parte dei membri risulta saltata, ricordi loro di visitare il proprio sito B1.church, installarlo come app nella schermata principale e consentire le notifiche quando richiesto.
:::

## Rimuovere i membri

Per rimuovere una persona da un gruppo, individua il suo nome nell'elenco dei membri e fai clic sul pulsante **remove** accanto alla sua voce.

:::info
Rimuovere una persona da un gruppo non la elimina dalla rubrica della chiesa. Comparirà ancora nella sezione [People](../people/adding-people.md) e potrà essere aggiunta di nuovo al gruppo in qualsiasi momento.
:::
