---
title: "Membri del gruppo"
---

# Membri del gruppo

<div class="article-intro">

Dopo aver creato un gruppo, il passo successivo è aggiungere i membri. Dalla pagina di dettaglio di un gruppo puoi cercare persone, aggiungerle al gruppo, assegnare i responsabili, inviare messaggi ed esportare l'elenco dei membri. Gestire l'appartenenza al gruppo è essenziale per coordinare piccoli gruppi, comitati e classi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve almeno un gruppo configurato in B1 Admin. Consulta [Creazione di gruppi](creating-groups.md) se non ne hai ancora creato uno.
- Le persone che vuoi aggiungere dovrebbero già essere nella tua rubrica [Persone](../people/adding-people.md). Se qualcuno non c'è, puoi crearlo dalla ricerca dei membri (vedi sotto).

</div>

## Aggiungere membri a un gruppo

1. Nel [menu Jump](../introduction.md#getting-around-with-the-jump-menu), scegli **Persone > Gruppi** e fai clic sul gruppo che vuoi gestire.
2. Nella sezione **Membri** della pagina del gruppo, fai clic su **Tutti i membri**. (Team e ministeri si aprono direttamente nell'elenco dei membri.)
3. Nella casella **Aggiungi persona** sotto l'elenco dei membri, digita il nome della persona che vuoi aggiungere e premi **Invio** oppure fai clic sull'icona di ricerca.
4. Fai clic sul nome della persona, oppure sull'icona di aggiunta accanto ad esso, nei risultati della ricerca.
5. La persona ora compare nell'elenco dei membri del gruppo.

:::tip
Prima di digitare qualsiasi cosa, la casella **Aggiungi persona** mostra un breve elenco di **Persone recenti** che puoi aggiungere con un solo clic.
:::

Quando hai finito, fai clic sul link **Torna a** con il nome del gruppo per tornare alla pagina del gruppo. La pagina del gruppo mostra un riepilogo di **Membri**, **Sessioni**, **Calendario** e **Stato**, ciascuno con un link alla sua vista completa.

### Aggiungere qualcuno che non è ancora in B1

Se la ricerca non trova nessuno, compare la scritta **Nessun record trovato** con un link **Aggiungi nuova persona**. Fai clic su di esso, inserisci nome, cognome e (facoltativamente) email, quindi fai clic su **Aggiungi**. La nuova persona viene creata nella tua rubrica Persone e aggiunta al gruppo in un solo passaggio: non devi cercarla di nuovo.

## Designare i responsabili del gruppo

I responsabili del gruppo hanno privilegi speciali: possono modificare il [calendario del gruppo](group-calendar.md), gestire gli eventi e coordinare il gruppo.

1. Nell'elenco dei membri del gruppo, trova la persona che vuoi rendere responsabile.
2. Fai clic sull'**icona a stella** (**Rendi responsabile**) accanto al suo nome.
3. La persona è ora designata come responsabile del gruppo e mostra un distintivo **Responsabile**.

Per rimuovere lo stato di responsabile, fai di nuovo clic sull'icona a stella (**Rimuovi accesso da responsabile**).

:::info
Qualsiasi membro del gruppo può visualizzare il calendario e gli eventi del gruppo, ma solo i responsabili possono aggiungere o modificare gli eventi del calendario.
:::

## Inviare messaggi ai membri del gruppo

Puoi comunicare con tutti i membri di un gruppo direttamente da B1 Admin:

1. Nell'elenco dei membri del gruppo, fai clic sull'icona **Invia un messaggio ai membri** sopra l'elenco.
2. Scrivi il tuo messaggio nella casella di testo (oppure scegline uno da **Modelli**).
3. Fai clic su **Invia**.

Il tuo messaggio verrà consegnato a tutti i membri del gruppo.

## Inviare email ai membri del gruppo

Puoi inviare email formattate a tutti i membri di un gruppo:

1. Dalla pagina di dettaglio del gruppo, fai clic sul pulsante **Email** sul lato sinistro della pagina.
2. Si apre la finestra Invia email, che mostra quanti membri riceveranno l'email e quanti non hanno un indirizzo email registrato.
3. Facoltativamente, seleziona un **modello di email** dal menu a discesa, oppure componi un messaggio da zero. Fai clic su **Gestisci modelli** per creare o modificare i modelli.
4. Inserisci un **oggetto**. Puoi inserire campi di unione facendo clic sui chip dei campi: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Componi il **testo dell'email** usando l'editor HTML. Gli stessi campi di unione sono disponibili anche qui.
6. Fai clic su **Invia**.
7. Un riepilogo mostra quante email sono state inviate correttamente e quanti membri sono stati saltati (senza email registrata).

:::tip
Crea modelli di email riutilizzabili per comunicazioni ricorrenti come aggiornamenti settimanali, annunci di eventi o richieste di preghiera. I modelli fanno risparmiare tempo e garantiscono messaggi coerenti.
:::

### Attivare l'email di gruppo per la tua chiesa {#turning-on-group-email-for-your-church}

Tutte le chiese su B1 inviano email dallo stesso indirizzo, quindi condividono una stessa reputazione di invio. Per evitare che le email di tutti finiscano nella posta indesiderata, il team di ChurchApps esamina ogni chiesa una volta prima che possa inviare email di gruppo.

Se la tua chiesa non è ancora stata esaminata, la finestra Invia email mostra **L'email di gruppo richiede una rapida verifica** al posto dell'editor dei messaggi:

1. Fai clic su **Richiedi verifica**. Il team di supporto di ChurchApps viene avvisato.
2. La finestra cambia in **Verifica richiesta**. Puoi chiuderla.
3. L'email di gruppo di solito viene attivata entro un giorno lavorativo. Dopo di che, apri di nuovo la finestra Invia email per inviare il tuo messaggio.

Finché la tua chiesa non viene approvata, B1 non invia nemmeno le [email di follow-up dei moduli](../forms/creating-forms.md#sending-a-follow-up-email) né il passaggio **Invia email** dei [flussi di lavoro](../serving/workflows.md).

:::info Limiti di invio
Dopo l'approvazione, una chiesa può inviare fino a 150 email scritte dalla chiesa al giorno. Il limite aumenta man mano che la chiesa costruisce una cronologia di invio pulita, fino a 2.000 al giorno. Se di recente alcuni messaggi sono stati rimbalzati o contrassegnati come spam, l'invio di email di gruppo viene sospeso e la finestra ti chiede di contattare il supporto. Se un invio superasse il limite giornaliero, B1 non lo invia e mostra un errore.
:::

## Inviare SMS ai membri del gruppo

Una volta che la tua chiesa ha collegato un [fornitore di SMS](../settings/church-settings.md#texting), accanto al pulsante **Email** della pagina del gruppo compare un pulsante **SMS** (**Invia SMS a questo gruppo**).

1. Dalla pagina di dettaglio del gruppo, fai clic su **SMS**.
2. La finestra mostra quanti membri riceveranno l'SMS. I membri senza un numero di cellulare registrato o che hanno rinunciato alla ricezione vengono saltati.
3. Scrivi il tuo messaggio. Per personalizzarlo, fai clic su un chip segnaposto sotto la casella del messaggio -- **Nome**, **Cognome**, **Nome visualizzato** o **Nome della chiesa** -- per inserirlo nel punto del cursore. Ogni segnaposto viene sostituito con i dati del destinatario quando l'SMS viene inviato.
4. Fai clic su **Invia**.

Consulta [Personalizzare gli SMS con i campi di unione](../settings/church-settings.md#personalizing-texts-with-merge-fields) per maggiori dettagli.

## Esportare i dati del gruppo

Per scaricare l'elenco dei membri del gruppo come file:

1. Nell'elenco dei membri del gruppo, fai clic su **Esporta** sopra l'elenco.
2. Un file CSV con le informazioni sui membri del gruppo verrà scaricato sul tuo computer.

Un'esportazione CSV è utile per importare dati in altri strumenti o per conservare registrazioni offline. Per altre opzioni di esportazione, consulta [Esportare i dati](../people/exporting-data.md).

## Stampare l'elenco dei membri

Nell'elenco dei membri del gruppo, fai clic sull'icona **Stampa registro** (stampante) sopra l'elenco e scegli un layout. La pagina si apre in una nuova scheda e la finestra di stampa del browser compare automaticamente.

- **Foglio presenze** -- un elenco della classe senza data, con caselle **Presente** e **Assente** che gli insegnanti possono contrassegnare a mano. Consulta [Stampare un registro delle presenze](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Elenco contatti** -- un elenco dei contatti del gruppo, datato con la data di oggi e intestato con il logo della tua chiesa (il **Logo per sfondo chiaro** di [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, e con il nome del gruppo. Ogni membro ha una riga con **Nome**, **Telefono**, **Email** e **Indirizzo**. I responsabili sono elencati per primi e contrassegnati come **Responsabile**, poi tutti gli altri in ordine alfabetico per cognome. Il telefono mostrato è il cellulare del membro oppure, se non ne ha uno, il numero di casa o di lavoro. I dati di contatto restano vuoti per chi ha rinunciato alla ricezione.

:::warning
Un elenco dei contatti contiene informazioni di contatto personali dei membri. Condividi le copie stampate solo con i responsabili del gruppo e con altre persone che ne hanno bisogno.
:::

## Inviare notifiche push ai membri del gruppo

Puoi inviare una notifica push direttamente a tutti i membri del gruppo che hanno installata l'app B1.church sul proprio dispositivo con le notifiche push attive.

1. Dalla pagina di dettaglio del gruppo, fai clic su **Notifica** (sotto i pulsanti **Email** e **SMS** -- il pulsante **SMS** compare quando è collegato un [fornitore di SMS](../settings/church-settings.md#texting)).
2. Si apre una finestra che mostra quanti membri del gruppo hanno le notifiche push attive.
3. Compila i dettagli della notifica:
   - **Titolo** *(obbligatorio)* -- Un breve riepilogo, fino a 80 caratteri.
   - **Messaggio** *(obbligatorio)* -- Il testo della notifica, fino a 240 caratteri.
   - **Link all'app o URL del volantino** *(facoltativo)* -- Un percorso relativo dell'app (ad esempio `/mobile/groups`) oppure un URL `https://` completo che la notifica apre quando viene toccata.
   - **URL dell'immagine** *(facoltativo)* -- Un URL `https://` di un'immagine che appare accanto alla notifica sui dispositivi compatibili.
4. Un'anteprima in tempo reale mostra come apparirà la notifica sul dispositivo.
5. Fai clic su **Invia notifica**.

:::info
Le notifiche push vengono consegnate solo ai membri del gruppo che hanno installato la PWA di B1.church e non hanno disattivato le notifiche push. I membri senza un dispositivo registrato per le notifiche push o con le notifiche disattivate vengono conteggiati come saltati, e il riepilogo dell'invio mostra quanti sono stati raggiunti e quanti saltati.
:::

:::tip
Dopo l'invio, la finestra mostra quante notifiche sono state accodate con successo. Se la maggior parte dei membri risulta saltata, ricordi loro di visitare il sito B1.church, installarlo come app nella schermata Home e consentire le notifiche quando richiesto.
:::

## Rimuovere membri

Per rimuovere una persona da un gruppo, trova il suo nome nell'elenco dei membri e fai clic sul pulsante **rimuovi** accanto alla sua voce.

:::info
Rimuovere una persona da un gruppo non la elimina dalla rubrica della chiesa. Compare ancora nella sezione [Persone](../people/adding-people.md) e può essere aggiunta di nuovo al gruppo in qualsiasi momento.
:::
