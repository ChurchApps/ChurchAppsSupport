---
title: "Notifications push"
description: "Envoyez ou programmez des notifications push à toutes les personnes qui utilisent l'application de votre église, ou à un groupe, depuis B1 Admin, puis modifiez, envoyez, annulez ou effacez-les."
---

# Notifications push

<div class="article-intro">

La page **Notifications push**, sous **Mobile**, vous permet d'envoyer une notification push à toutes les personnes qui utilisent l'application de votre église, ou aux membres d'un groupe, immédiatement ou à l'heure de votre choix. Elle liste ce qui est programmé, afin que vous puissiez modifier, envoyer ou annuler une notification avant son envoi, et elle affiche l'historique des notifications récentes, que vous pouvez effacer.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Pour envoyer à **Tous ceux qui ont l'application**, vous avez besoin de la permission de modifier le contenu. Pour envoyer à un groupe, vous avez besoin de la permission de modifier les membres des groupes. Voir [Rôles et autorisations](./roles-permissions.md).
- Les membres ne reçoivent des notifications push qu'après avoir [installé l'application de votre église](../../b1-church/getting-started/installing-pwa.md) et autorisé les notifications.

</div>

## Ouvrir la page

Dans B1 Admin, allez dans **Mobile** et cliquez sur **Notifications push**. La page comporte une carte **Programmées** et une carte **Récentes**. Les heures affichées sur la page correspondent au fuseau horaire de votre église (ou à celui de votre ordinateur, si l'église n'en a pas défini), lequel est indiqué au-dessus de la liste des notifications programmées.

## Envoyer ou programmer une notification

1. Cliquez sur **Envoyer une notification**.
2. Choisissez le **public** : **Tous ceux qui ont l'application**, ou l'un de vos groupes. Vous ne voyez que les choix autorisés par vos permissions.
3. B1 indique combien de personnes la notification atteindra, par exemple *42 personnes sur 60 qui utilisent l'application ont les notifications push activées*, ainsi que le nombre de personnes qui les ont désactivées. Vous ne vous recevez pas votre propre notification.
4. Sous **Quand**, choisissez **Envoyer maintenant**, ou **Programmer pour plus tard** puis choisissez une date et une heure futures sous **Envoyer le**.
5. Saisissez un **titre** (80 caractères au maximum) et un **message** (240 caractères au maximum).
6. Vous pouvez ajouter facultativement un **lien ou URL du feuillet à ouvrir** (une adresse `https` ou un chemin de l'application, comme `/mobile/groups`) que la notification ouvrira lorsqu'on la touchera, ainsi qu'une **URL de l'image** (une adresse `https`) à afficher avec elle.
7. Cliquez sur **Envoyer la notification** (ou **Programmer la notification**).

Pour une notification programmée, les personnes qui la recevront sont vérifiées de nouveau au moment de l'envoi. Ainsi, toute personne qui rejoint le groupe, ou qui active les notifications entre-temps, est incluse.

Vous pouvez aussi envoyer une notification à un groupe depuis la page du groupe, avec **Notifier**. Voir [Envoyer des notifications push aux membres du groupe](../groups/group-members.md#sending-push-notifications-to-group-members).

:::tip
Lorsqu'une notification n'a pas de lien, toucher une notification destinée à toute l'église ouvre la liste des notifications de l'application. Pour une notification de groupe, elle ouvre la page du groupe.
:::

## Gérer les notifications programmées

La carte **Programmées** affiche chaque notification en attente d'envoi, avec son heure d'envoi (**Envoyer le**), son **public**, son titre et son message. Pour chacune, vous pouvez :

- **Modifier** : changer le public, l'heure ou le texte, puis cliquer sur **Enregistrer les modifications**.
- **Envoyer maintenant** : l'envoyer immédiatement au lieu d'attendre.
- **Annuler** : empêcher son envoi. Une notification annulée passe dans la carte Récentes.

Une notification en cours d'envoi affiche **Envoi en cours** et ne peut plus être modifiée.

## Notifications récentes

La carte **Récentes** liste les notifications envoyées ou arrêtées, avec un **statut** pour chacune :

| Statut | Signification |
|--------|---------|
| **Envoyée : X sur Y** | La notification a été envoyée. *Y* personnes pouvaient la recevoir, et *X* l'ont reçue sous forme de notification push. |
| **Manquée (l'heure d'envoi est passée)** | La notification avait plus de 30 minutes de retard lorsque B1 a tenté de l'envoyer, elle n'a donc pas été envoyée. |
| **Échec** | L'envoi a échoué trois fois. L'erreur est affichée sous le statut. |
| **Annulée** | Quelqu'un a annulé la notification avant son envoi. |

Pour retirer une notification de la liste, cliquez sur **Retirer** sur sa ligne. Pour vider la liste, cliquez sur **Tout effacer** en haut de la carte. Cela retire toutes les notifications envoyées, en échec ou annulées que vous avez la permission de gérer. Les deux actions demandent une confirmation et sont irréversibles. Retirer une notification ne la retire pas des appareils des personnes qui l'ont déjà reçue.

:::info
Les membres qui ont désactivé **Annonces de l'église** dans leurs [préférences de notification](../../b1-church/getting-started/notification-preferences.md) ne reçoivent pas ces notifications push, qu'elles soient envoyées à toute l'église ou à un groupe.
:::

## Articles connexes

- [Paramètres de l'application mobile](./mobile-app.md)
- [Membres du groupe](../groups/group-members.md)
- [Rôles et autorisations](./roles-permissions.md)
- [Préférences de notification](../../b1-church/getting-started/notification-preferences.md)
