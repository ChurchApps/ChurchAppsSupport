---
title: "Validation du plan et notifications des bénévoles"
---

# Validation du plan et notifications des bénévoles

<div class="article-intro">

B1 Admin vérifie automatiquement vos plans pour les problèmes avant le dimanche — positions non remplies, conflits d'horaires et bénévoles qui ont bloqué la date. Quand tout semble bon, vous pouvez notifier toute votre équipe en un seul clic.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez un [plan de service](./plans.md) et assignez les bénévoles aux positions
- Ajoutez des [heures de service](./plans.md) au plan afin que la détection de conflit puisse vérifier les chevauchements
- Assurez-vous que les bénévoles ont l'application B1 Mobile installée pour recevoir les notifications push

</div>

## Le panneau de validation

Chaque plan a un panneau de **Validation** qui s'exécute automatiquement à mesure que vous le construisez. Il vérifie trois choses :

### Positions non remplies

Si une position nécessite plus de personnes que le nombre actuellement affectées, le panneau de validation énumère exactement ce qui est encore nécessaire — par exemple, *« Son Tech : 1 personne supplémentaire nécessaire. »* Vous pouvez voir en un coup d'oeil si votre plan est entièrement doté avant la semaine à venir.

### Conflits d'horaires

Si un bénévole est affecté à deux positions qui se chevauchent dans le temps dans le même plan, le panneau de validation signale le conflit — par exemple, *« Jane Smith : conflit temporel entre le responsable d'adoration et l'accueil des enfants pendant le service du dimanche. »* Cela capture les réservations doubles avant qu'elles ne deviennent un problème le dimanche matin.

### Dates de blocage

Les bénévoles peuvent définir les dates où ils ne sont pas disponibles dans B1 Mobile. Si quelqu'un est assigné à un plan qui tombe dans l'une de ses dates de blocage, le panneau de validation fait remonter le conflit automatiquement afin que vous puissiez trouver un remplacement.

### Conflits entre plans

La validation vérifie également tous vos plans à la fois. Si le même bénévole est assigné dans deux plans différents qui se chevauchent dans le temps — par exemple, un service de 9h et un service de 10h qui s'exécutent tous deux jusqu'à 10h30 — B1 Admin signalera cette personne comme surréservée entre les plans.

:::tip
Vous n'avez rien à faire pour exécuter la validation — elle se met à jour automatiquement chaque fois que vous ajoutez ou modifiez une affectation. Gardez simplement un oeil sur le panneau à mesure que vous construisez le plan.
:::

## Notification des bénévoles

Une fois votre plan défini, vous pouvez notifier tous les bénévoles affectés à la fois directement à partir du panneau de validation.

1. Ouvrez le plan et faites défiler jusqu'au panneau de **Validation**
2. S'il y a des bénévoles non notifiés, vous verrez un lien affichant combien doivent être notifiés (par ex. *« Notifier 8 bénévoles »*)
3. Cliquez sur le lien pour envoyer des notifications push à tous ceux qui n'ont pas encore été notifiés
4. Les bénévoles reçoivent une notification sur leur téléphone leur faisant savoir qu'ils ont été programmés et les invitant à confirmer leur affectation

:::info
Seuls les bénévoles qui n'ont pas encore été notifiés seront inclus. Si vous ajoutez quelqu'un au plan plus tard, le lien réapparaîtra pour que vous puissiez notifier le nouveau ajout sans re-notifier le reste de l'équipe.
:::

:::warning
Les bénévoles doivent avoir l'application B1 Mobile installée et les notifications activées pour recevoir la notification push. Consultez le [guide Notifications](/docs/b1-mobile/community/notifications) pour savoir comment les bénévoles peuvent activer ceci sur leur appareil.
:::

## Articles connexes

- [Plans de service](./plans.md)
- [Automatisations](./automations.md)
- [Notifications B1 Mobile](/docs/b1-mobile/community/notifications)
