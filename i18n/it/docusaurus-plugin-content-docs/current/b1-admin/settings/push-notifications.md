---
title: "Notifiche push"
---

# Notifiche push

<div class="article-intro">

La pagina **Notifiche push** ti permette di inviare una notifica push a tutti quelli che usano l'app B1.church della tua chiesa, oppure a un solo gruppo, subito oppure in un momento che scegli. Elenca anche le notifiche in attesa di invio, così puoi modificarle, inviarle o annullarle, e mostra come sono state consegnate quelle recenti.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Per inviare a **Tutti con l'app**, ti serve l'autorizzazione **Modifica contenuti**. Per inviare a un gruppo, ti serve **Modifica membri del gruppo**. Con una delle due, la pagina **Notifiche push** compare in **Mobile**. Vedi [Ruoli e permessi](./roles-permissions.md).
- Le notifiche raggiungono solo i membri che hanno installato l'[app B1.church](/docs/b1-church/getting-started/installing-pwa) e hanno consentito le notifiche.

</div>

## Aprire la pagina

1. In B1 Admin, apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Mobile**.
2. Clicca su **Notifiche push** (`/mobile/notifications`).

Tutti gli orari della pagina sono mostrati nel fuso orario della tua chiesa (o in quello del browser, se la chiesa non ne ha impostato uno). La pagina indica quale fuso orario sta usando, ad esempio *"Gli orari sono in America/Chicago."*

## Inviare o programmare una notifica

1. Clicca su **Invia notifica** in cima alla pagina.
2. In **Destinatari**, scegli **Tutti con l'app** oppure uno dei tuoi gruppi.
3. Compila la notifica:
   - **Titolo** *(obbligatorio)* -- Un breve riassunto, fino a 80 caratteri.
   - **Messaggio** *(obbligatorio)* -- Il testo della notifica, fino a 240 caratteri.
   - **Link da aprire o URL del volantino** *(facoltativo)* -- Un percorso relativo dell'app (ad esempio, `/mobile/groups`) oppure un URL completo `https://` che si apre quando si tocca la notifica. Senza un link, una notifica per tutta la chiesa apre l'elenco delle notifiche del membro, mentre una notifica di gruppo apre quel gruppo.
   - **URL dell'immagine** *(facoltativo)* -- Un'immagine `https://` mostrata insieme alla notifica sui dispositivi compatibili.
4. In **Quando**, scegli **Invia ora**, oppure **Programma per dopo** e seleziona una data e un orario in **Invia alle**. L'orario deve essere futuro.
5. Clicca su **Invia notifica** (oppure su **Programma notifica** per una notifica programmata).

Un'anteprima nella finestra mostra come apparirà la notifica e quante persone possono riceverla. Una notifica inviata subito richiede almeno una persona raggiungibile. Una notifica programmata può essere salvata anche quando nessuno è ancora raggiungibile, perché i destinatari vengono ricontrollati al momento dell'invio.

Dopo la programmazione, la finestra conferma l'orario di invio e ricorda che puoi vedere, modificare o annullare la notifica in **Mobile > Notifiche push**.

:::tip
Puoi anche inviare o programmare una notifica per un solo gruppo dalla pagina del gruppo, con il pulsante **Notifica**. Vedi [Inviare notifiche push ai membri del gruppo](../groups/group-members.md#sending-push-notifications-to-group-members).
:::

## Gestire le notifiche programmate

La scheda **Programmate** elenca le notifiche in attesa di invio, con l'orario di **Invia alle**, il **Destinatario** e il testo della **Notifica**. Ciascuna ha tre azioni:

- **Modifica** -- Cambia il titolo, il messaggio, il link, l'immagine o l'orario di invio. Il destinatario non può essere cambiato: annulla la notifica e creane una nuova.
- **Invia ora** -- Inviala subito invece di aspettare. Conferma con **Invia ora**.
- **Annulla** -- Impedisci che venga inviata. Conferma con **Annulla notifica**.

Quando non c'è nulla in attesa, la scheda indica *"Non c'è nulla in programma."*

## Vedere le notifiche recenti

La scheda **Recenti** elenca le notifiche che sono state inviate o interrotte, con l'orario di **Inviata alle**, il **Destinatario**, il testo della **Notifica** e lo **Stato**:

- **Inviata: X di Y** -- Quante delle persone del destinatario sono state raggiunte.
- **Non riuscita** -- L'invio non è riuscito, con l'errore. B1 riprova un invio non riuscito fino a tre volte prima di segnarlo come non riuscito.
- **Annullata** -- Qualcuno l'ha annullata prima dell'invio.
- **Mancata (l'orario di invio è passato)** -- Non è stato possibile inviarla entro 30 minuti dall'orario previsto, quindi è stata saltata invece di essere inviata in ritardo.

## Chi riceve una notifica

- **Tutti con l'app** raggiunge ogni persona della tua chiesa che ha installato l'app B1.church con le notifiche consentite, tranne chi l'ha inviata.
- Una notifica di gruppo raggiunge i membri del gruppo che hanno l'app con le notifiche consentite.
- I membri che hanno disattivato le notifiche push per **Annunci della chiesa** nelle proprie [Preferenze di notifica](/docs/b1-church/getting-started/notification-preferences) non ricevono le notifiche destinate a tutta la chiesa.

## Articoli correlati

- [Inviare notifiche push ai membri del gruppo](../groups/group-members.md#sending-push-notifications-to-group-members)
- [Impostazioni dell'app mobile](./mobile-app.md)
- [Promemoria degli eventi](../calendars/event-reminders.md)
- [Preferenze di notifica](/docs/b1-church/getting-started/notification-preferences)
