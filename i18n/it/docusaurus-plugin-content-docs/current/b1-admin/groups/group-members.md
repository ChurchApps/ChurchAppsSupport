---
title: "Membri del Gruppo"
---

# Membri del Gruppo

<div class="article-intro">

Una volta creato un gruppo, il passo successivo è aggiungere i membri. Dalla pagina dei dettagli di un gruppo puoi cercare le persone, aggiungerle al gruppo, assegnare leader, inviare messaggi ed esportare l'elenco dei membri. Gestire l'appartenenza al gruppo è essenziale per coordinare piccoli gruppi, comitati e classi.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Devi avere almeno un gruppo configurato in B1 Admin. Vedi [Creazione di Gruppi](creating-groups.md) se non ne hai ancora creato uno.
- Le persone che vuoi aggiungere devono già esistere nella tua directory [Persone](../people/adding-people.md).

</div>

## Aggiunta di Membri a un Gruppo

1. Accedi alla pagina **Gruppi** e fai clic sul gruppo che desideri gestire.
2. Fai clic sulla scheda **Membri**.
3. Nella casella di ricerca, digita il nome della persona che vuoi aggiungere.
4. Fai clic su **Aggiungi** accanto al nome della persona nei risultati della ricerca.
5. La persona ora appare nell'elenco dei membri del gruppo.

:::tip
Lascia la casella di ricerca vuota e fai clic su **Cerca** per sfogliare l'intera directory. Questo è utile se non sei sicuro dell'ortografia esatta del nome di qualcuno.
:::

## Designazione dei Leader del Gruppo

I leader del gruppo hanno privilegi speciali: possono modificare il [calendario del gruppo](group-calendar.md), gestire gli eventi e aiutare a coordinare il gruppo.

1. Nell'elenco dei membri del gruppo, trova la persona che desideri rendere un leader.
2. Fai clic sulla **icona chiave verde** accanto al suo nome.
3. La persona è ora designata come leader del gruppo.

Per rimuovere lo stato di leader, fai clic di nuovo sulla icona chiave verde.

:::info
Qualsiasi membro del gruppo può visualizzare il calendario del gruppo e gli eventi, ma solo i leader possono aggiungere o modificare gli eventi del calendario.
:::

## Invio di Messaggi ai Membri del Gruppo

Puoi comunicare con tutti i membri di un gruppo direttamente da B1 Admin:

1. Dalla pagina dei dettagli del gruppo, cerca l'area di messaggistica.
2. Digita il tuo messaggio nella casella di testo.
3. Fai clic su **Invia**.

Il tuo messaggio verrà consegnato a tutti i membri del gruppo.

## Invio di E-mail ai Membri del Gruppo

Puoi inviare e-mail formattate a tutti i membri di un gruppo:

1. Dalla pagina dei dettagli del gruppo, fai clic sull'**icona e-mail**.
2. Si apre la finestra di dialogo Invia E-mail, che mostra quanti membri riceveranno l'e-mail e quanti non hanno un indirizzo e-mail nei file.
3. Facoltativamente seleziona un **modello di e-mail** dal menu a discesa, o componi un messaggio da zero. Fai clic su **Gestisci Modelli** per creare o modificare i modelli.
4. Immetti una **riga di oggetto**. Puoi inserire campi di unione facendo clic sulle schede dei campi: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Componi il **corpo dell'e-mail** usando l'editor HTML. Gli stessi campi di unione sono disponibili qui.
6. Fai clic su **Invia**.
7. Un riepilogo mostra quante e-mail sono state inviate con successo e quanti membri sono stati saltati (nessun indirizzo e-mail nei file).

:::tip
Crea modelli di e-mail riutilizzabili per comunicazioni ricorrenti come aggiornamenti settimanali, annunci di eventi o richieste di preghiera. I modelli ti fanno risparmiare tempo e assicurano una messaggistica coerente.
:::

## Esportazione dei Dati del Gruppo

Per scaricare l'elenco dei membri del gruppo come file:

1. Dalla pagina dei dettagli del gruppo, fai clic sull'**icona di download**.
2. Un file CSV contenente le informazioni sui membri del gruppo verrà scaricato sul tuo computer.

Questo è utile per creare elenchi stampati, importare dati in altri strumenti o mantenere record offline. Per ulteriori opzioni di esportazione, vedi [Esportazione dei Dati](../people/exporting-data.md).

## Invio di Notifiche Push ai Membri del Gruppo

Puoi inviare una notifica push direttamente a tutti i membri del gruppo che hanno l'app B1.church installata sul loro dispositivo con le notifiche push abilitate.

1. Dalla pagina dei dettagli del gruppo, fai clic sull'**icona campana** nella barra degli strumenti dell'intestazione (accanto alle icone di e-mail e SMS).
2. Si apre una finestra di dialogo che mostra quanti dei tuoi membri del gruppo hanno abilitato le notifiche push.
3. Compila i dettagli della notifica:
   - **Titolo** *(obbligatorio)* -- Un breve riepilogo, fino a 80 caratteri.
   - **Messaggio** *(obbligatorio)* -- Il corpo della notifica, fino a 240 caratteri.
   - **Apri collegamento o URL volantino** *(facoltativo)* -- Un percorso dell'app relativo (ad esempio, `/mobile/groups`) o un URL completo `https://` che si apre quando si tocca la notifica.
   - **URL immagine** *(facoltativo)* -- Un URL `https://` a un'immagine che appare accanto alla notifica sui dispositivi supportati.
4. Un'anteprima dal vivo mostra come la notifica apparirà sul dispositivo.
5. Fai clic su **Invia Notifica**.

:::info
Le notifiche push vengono consegnate solo ai membri del gruppo che hanno la PWA B1.church installata e non hanno disabilitato le notifiche push. I membri senza un dispositivo push registrato o con push disattivato sono contati come saltati, e il riepilogo di invio mostra quanti sono stati raggiunti rispetto a quanti saltati.
:::

:::tip
Dopo l'invio, la finestra di dialogo mostra quante notifiche sono state accodate con successo. Se la maggior parte dei membri viene visualizzata come saltata, ricordagli di visitare il loro sito B1.church, installarlo come app per la schermata iniziale e di consentire le notifiche quando richiesto.
:::

## Rimozione dei Membri

Per rimuovere qualcuno da un gruppo, individua il suo nome nell'elenco dei membri e fai clic sul pulsante **rimuovi** accanto alla sua voce.

:::info
La rimozione di una persona da un gruppo non la elimina dalla tua directory della chiesa. Continueranno a comparire nella sezione [Persone](../people/adding-people.md) e possono essere ri-aggiunti al gruppo in qualsiasi momento.
:::
