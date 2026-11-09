---
title: "Notifiche push"
description: "Invia o programma notifiche push a tutti quelli che usano l'app della chiesa o a un solo gruppo da B1 Admin, poi modificale, inviale, annullale o eliminale dalla lista."
---

# Notifiche push

<div class="article-intro">

La pagina **Notifiche push** sotto **Mobile** ti permette di inviare una notifica push a tutti quelli che usano l'app della chiesa, oppure ai membri di un solo gruppo, subito o nel momento che scegli. Elenca ciò che è programmato, così puoi modificare, inviare o annullare una notifica prima che parta, e mostra la cronologia delle notifiche recenti, che puoi cancellare.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Per inviare a **Tutti quelli con l'app** ti serve il permesso di modificare i contenuti. Per inviare a un gruppo ti serve il permesso di modificare i membri dei gruppi. Vedi [Ruoli e permessi](./roles-permissions.md).
- I membri ricevono le notifiche push solo dopo aver [installato l'app della chiesa](../../b1-church/getting-started/installing-pwa.md) e aver consentito le notifiche.

</div>

## Aprire la pagina

In B1 Admin, vai su **Mobile** e fai clic su **Notifiche push**. La pagina ha una scheda **Programmate** e una scheda **Recenti**. Gli orari della pagina sono mostrati nel fuso orario della chiesa (oppure in quello del tuo computer, se la chiesa non ne ha impostato uno), indicato sopra l'elenco delle notifiche programmate.

## Inviare o programmare una notifica

1. Fai clic su **Invia notifica**.
2. Scegli il **Destinatario**: **Tutti quelli con l'app**, oppure uno dei tuoi gruppi. Vedi solo le scelte consentite dai tuoi permessi.
3. B1 mostra quante persone raggiungerà il push -- per esempio *42 persone su 60 che usano l'app hanno le notifiche push attive* -- e quante le hanno disattivate. Tu non vieni incluso nel tuo stesso push.
4. In **Quando**, scegli **Invia ora**, oppure **Programma per dopo** e scegli una data e un'ora future in **Invia alle**.
5. Inserisci un **Titolo** (fino a 80 caratteri) e un **Messaggio** (fino a 240 caratteri).
6. Facoltativamente aggiungi un **Link da aprire o URL del volantino** (un indirizzo `https` oppure un percorso dell'app come `/mobile/groups`) che il push apre, e un **URL dell'immagine** (un indirizzo `https`) da mostrare insieme.
7. Fai clic su **Invia notifica** (oppure **Programma notifica**).

Per una notifica programmata, le persone che raggiunge vengono ricontrollate al momento dell'invio, quindi chi entra nel gruppo o attiva le notifiche nel frattempo viene incluso.

Puoi anche inviare una notifica a un gruppo dalla pagina del gruppo con **Notifica**. Vedi [Inviare notifiche push ai membri del gruppo](../groups/group-members.md#sending-push-notifications-to-group-members).

:::tip
Quando una notifica non ha un link, toccandola si apre l'elenco delle notifiche dell'app per un push a tutta la chiesa, oppure la pagina del gruppo per un push di gruppo.
:::

## Gestire le notifiche programmate

La scheda **Programmate** elenca ogni notifica in attesa di essere inviata, con il suo orario di **Invio**, il **Destinatario**, il titolo e il messaggio. Per ognuna puoi:

- **Modifica** -- cambia il destinatario, l'orario o il testo, poi fai clic su **Salva modifiche**.
- **Invia ora** -- inviala subito invece di aspettare.
- **Annulla** -- impedisci che venga inviata. Una notifica annullata passa alla scheda Recenti.

Una notifica che sta partendo in questo momento mostra **In invio** e non può più essere modificata.

## Notifiche recenti

La scheda **Recenti** elenca le notifiche già inviate o interrotte, con uno **Stato** per ciascuna:

| Stato | Significato |
|--------|---------|
| **Inviata: X su Y** | Il push è partito. *Y* persone avrebbero potuto riceverlo, e *X* l'ha ricevuto come notifica push. |
| **Persa (l'orario di invio è passato)** | La notifica era in ritardo di più di 30 minuti quando B1 ha provato a inviarla, quindi non è stata inviata. |
| **Non riuscita** | L'invio è fallito tre volte. L'errore viene mostrato sotto lo stato. |
| **Annullata** | Qualcuno l'ha annullata prima che partisse. |

Per rimuovere una notifica dall'elenco, fai clic su **Rimuovi** nella sua riga. Per svuotare l'elenco, fai clic su **Cancella tutto** in cima alla scheda: rimuove ogni notifica inviata, non riuscita o annullata che hai il permesso di gestire. Entrambe le operazioni chiedono una conferma e non si possono annullare. Rimuovere una notifica non la ritira da chi l'ha già ricevuta.

:::info
I membri che hanno disattivato **Annunci della chiesa** nelle loro [preferenze di notifica](../../b1-church/getting-started/notification-preferences.md) non ricevono questi push, sia che vengano inviati a tutti sia a un gruppo.
:::

## Articoli correlati

- [Impostazioni dell'app mobile](./mobile-app.md)
- [Membri del gruppo](../groups/group-members.md)
- [Ruoli e permessi](./roles-permissions.md)
- [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md)
