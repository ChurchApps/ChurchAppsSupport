---
title: "Architettura Notifiche e Promemoria"
---

# Architettura Notifiche e Promemoria

<div class="article-intro">

Ogni messaggio che un membro della chiesa vede al di fuori della pagina che sta guardando — un badge di conteggio, una notifica push, un'email di riepilogo — passa attraverso una delle due porte in MessagingApi. Questa pagina documenta il imbuto, il motore di promemoria che lo alimenta su una pianificazione e il modello di preferenza che decide cosa effettivamente raggiunge una persona.

</div>

## Panoramica — Due Porte

Tutto ciò che comunica qualcosa a una persona passa attraverso `NotificationHelper.createNotifications()` nel modulo di messaggistica. Qualsiasi cosa programmata è una `reminderDefinition` espansa in `reminderOccurrences` e spedita da `ReminderEngine.scan()` su un timer ricorrente. La posta elettronica diretta esiste solo dietro `TransactionalEmailHelper.sendTransactional()`.

## Il Imbuto di Notifica

`NotificationHelper.createNotifications()` è il singolo punto di ingresso per qualsiasi cosa che non sia programmata o transazionale. Accetta un elenco di persone, il tipo di contenuto, l'id del contenuto, un messaggio e opzioni di consegna.

## ReminderEngine

Scansiona per i promemoria programmati on a recurring timer, valuta gli operandi di condizione e chiama il imbuto di notifica per ogni persona corrispondente.
