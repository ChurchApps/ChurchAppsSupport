---
title: "Notifications push"
---

# Notifications push

<div class="article-intro">

La page **Notifications push** vous permet d'envoyer une notification push à toutes les personnes qui utilisent l'application B1.church de votre église, ou à un seul groupe, immédiatement ou à un moment que vous planifiez. Elle affiche aussi les notifications en attente d'envoi, afin que vous puissiez les modifier, les envoyer ou les annuler, et indique comment les notifications récentes ont été livrées.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Pour envoyer à **Tous ceux qui ont l'application**, vous avez besoin de l'autorisation **Modifier le contenu**. Pour envoyer à un groupe, vous avez besoin de **Modifier les membres du groupe**. Avec l'une ou l'autre, la page **Notifications push** apparaît sous **Mobile**. Consultez [Rôles et autorisations](./roles-permissions.md).
- Les notifications ne parviennent qu'aux membres qui ont installé l'[application B1.church](/docs/b1-church/getting-started/installing-pwa) et qui ont autorisé les notifications.

</div>

## Ouvrir la page

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Mobile**.
2. Cliquez sur **Notifications push** (`/mobile/notifications`).

Toutes les heures affichées sur la page sont indiquées selon le fuseau horaire de votre église (ou celui de votre navigateur, si l'église n'en a pas défini). La page indique le fuseau utilisé, par exemple *« Les heures sont en America/Chicago. »*

## Envoyer ou programmer une notification

1. Cliquez sur **Envoyer une notification** en haut de la page.
2. Sous **Public**, choisissez **Tous ceux qui ont l'application** ou l'un de vos groupes.
3. Remplissez la notification :
   - **Titre** *(obligatoire)* -- Un bref résumé, jusqu'à 80 caractères.
   - **Message** *(obligatoire)* -- Le texte de la notification, jusqu'à 240 caractères.
   - **Lien ouvert ou URL du feuillet** *(facultatif)* -- Un chemin relatif vers l'application (par exemple, `/mobile/groups`) ou une URL `https://` complète qui s'ouvre lorsque la notification est touchée. Sans lien, une notification destinée à toute l'église ouvre la liste des notifications du membre, et une notification de groupe ouvre ce groupe.
   - **URL de l'image** *(facultatif)* -- Une image `https://` affichée avec la notification sur les appareils compatibles.
4. Sous **Quand**, choisissez **Envoyer maintenant**, ou **Programmer pour plus tard** puis sélectionnez une date et une heure d'**envoi**. L'heure doit être dans le futur.
5. Cliquez sur **Envoyer la notification** (ou sur **Programmer la notification** pour une notification programmée).

Un aperçu dans la boîte de dialogue montre à quoi ressemblera la notification et combien de personnes peuvent la recevoir. Une notification envoyée maintenant doit atteindre au moins une personne joignable. Une notification programmée peut être enregistrée même si personne n'est encore joignable, car les destinataires sont vérifiés à nouveau au moment de l'envoi.

Après la programmation, la boîte de dialogue confirme l'heure d'envoi et vous rappelle que vous pouvez voir, modifier ou annuler la notification sous **Mobile > Notifications push**.

:::tip
Vous pouvez aussi envoyer ou programmer une notification pour un seul groupe depuis la page de ce groupe, à l'aide de son bouton **Notifier**. Consultez [Envoyer des notifications push aux membres du groupe](../groups/group-members.md#sending-push-notifications-to-group-members).
:::

## Gérer les notifications programmées

La carte **Programmées** affiche les notifications en attente d'envoi, avec leur heure d'**envoi**, leur **public** et le texte de la **notification**. Chacune propose trois actions :

- **Modifier** -- Modifier le titre, le message, le lien, l'image ou l'heure d'envoi. Le public ne peut pas être modifié ; annulez la notification et créez-en une nouvelle à la place.
- **Envoyer maintenant** -- Envoyer immédiatement au lieu d'attendre. Confirmez avec **Envoyer maintenant**.
- **Annuler** -- Empêcher son envoi. Confirmez avec **Annuler la notification**.

Lorsqu'aucune notification n'est en attente, la carte indique *« Rien n'est programmé. »*

## Consulter les notifications récentes

La carte **Récentes** affiche les notifications qui ont été envoyées ou arrêtées, avec leur heure d'**envoi**, leur **public**, le texte de la **notification** et leur **statut** :

- **Envoyée : X sur Y** -- Le nombre de personnes du public qu'elle a atteintes.
- **Échec** -- L'envoi a échoué, avec l'erreur. B1 réessaie un envoi en échec jusqu'à trois fois avant de le marquer comme échoué.
- **Annulée** -- Quelqu'un l'a annulée avant son envoi.
- **Manquée (l'heure d'envoi est passée)** -- Elle n'a pas pu partir dans les 30 minutes suivant son heure d'envoi ; elle a donc été ignorée plutôt qu'envoyée en retard.

## Qui reçoit une notification

- **Tous ceux qui ont l'application** atteint chaque personne de votre église qui a installé l'application B1.church et autorisé les notifications, à l'exception de la personne qui l'a envoyée.
- Une notification de groupe atteint les membres du groupe qui ont l'application et autorisé les notifications.
- Les membres qui ont désactivé les notifications push pour les **Annonces de l'église** dans leurs [préférences de notification](/docs/b1-church/getting-started/notification-preferences) ne reçoivent pas les notifications destinées à toute l'église.

## Articles connexes

- [Envoyer des notifications push aux membres du groupe](../groups/group-members.md#sending-push-notifications-to-group-members)
- [Paramètres de l'application mobile](./mobile-app.md)
- [Rappels d'événement](../calendars/event-reminders.md)
- [Préférences de notification](/docs/b1-church/getting-started/notification-preferences)
