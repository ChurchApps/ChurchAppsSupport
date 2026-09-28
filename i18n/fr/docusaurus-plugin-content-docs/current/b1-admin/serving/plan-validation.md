---
title: "Validation des plans et notifications"
---

# Validation des plans et notifications aux bénévoles

<div class="article-intro">

B1 Admin vérifie automatiquement vos plans à la recherche de problèmes avant le dimanche - postes non pourvus, conflits d'horaire et bénévoles qui ont bloqué la date. Quand tout semble bon, vous pouvez notifier toute votre équipe d'un seul clic.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez un [plan de service](./plans.md) et assignez des bénévoles aux postes
- Ajoutez [heures de service](./plans.md) au plan afin que la détection de conflits puisse vérifier les chevauchements
- Assurez-vous que les bénévoles ont l'application B1 Mobile installée pour recevoir les notifications push

</div>

## Le panneau de validation

Chaque plan a un panneau **Validation** qui s'exécute automatiquement au fur et à mesure que vous le construisez. Il vérifie trois choses :

### Postes non pourvus
Si un poste nécessite plus de personnes que ne sont actuellement assignées, le panneau de validation liste exactement ce qui est encore nécessaire - par exemple, *« Technicien du son : 1 personne supplémentaire nécessaire. »* Vous pouvez voir d'un coup d'œil si votre plan est complètement doté avant la semaine n'arrive.

### Conflits d'horaire
Si un bénévole est assigné à deux postes qui se chevauchent dans le temps au sein du même plan, le panneau de validation signale le conflit - par exemple, *« Jane Smith : conflit horaire entre Leader de culte et Accueil des enfants pendant le service du dimanche. »* Cela attrape les doubles réservations avant qu'elles ne deviennent un problème dimanche matin.

### Dates de blocage
Les bénévoles peuvent définir les dates auxquelles ils ne sont pas disponibles dans B1 Mobile. Si quelqu'un est assigné à un plan qui tombe dans l'une de leurs dates de blocage, le panneau de validation fait remonter le conflit automatiquement afin que vous puissiez trouver un remplacement.

### Conflits entre plans
La validation vérifie également tous vos plans en même temps. Si le même bénévole est assigné à deux plans différents qui se chevauchent dans le temps - par exemple, un service de 9h et un service de 10h qui s'exécutent tous deux jusqu'à 10h30 - B1 Admin signalera cette personne comme doublement réservée entre les plans.

:::tip
Vous n'avez besoin de rien faire pour exécuter la validation - elle se met à jour automatiquement chaque fois que vous ajoutez ou modifiez une affectation. Gardez simplement un œil sur le panneau au fur et à mesure que vous construisez le plan.
:::

## Notifier les bénévoles

Une fois votre plan configuré, vous pouvez notifier tous les bénévoles assignés en même temps directement à partir du panneau de validation.

1. Ouvrez le plan et faites défiler jusqu'au panneau **Validation**
2. S'il y a des bénévoles non notifiés, vous verrez un lien indiquant combien de personnes doivent être notifiées (par exemple, *« Notifier 8 bénévoles »*)
3. Cliquez sur le lien pour envoyer des notifications push à tous ceux qui n'ont pas encore été notifiés
4. Les bénévoles reçoivent une notification sur leur téléphone les informant qu'ils ont été programmés et les invitant à confirmer leur affectation

:::info
Seuls les bénévoles qui n'ont pas encore été notifiés seront inclus. Si vous ajoutez quelqu'un au plan plus tard, le lien réapparaîtra afin que vous puissiez notifier le nouvel ajout sans renvoyer les notifications au reste de l'équipe.
:::

:::warning
Les bénévoles doivent avoir l'expérience mobile B1.church installée (PWA sur leur écran d'accueil, ou l'application native B1 Mobile dépréciée pour les utilisateurs qui l'ont toujours) avec les notifications activées pour recevoir les notifications push. Voir [Installation en tant qu'application (PWA)](/docs/b1-church/getting-started/installing-pwa) pour les instructions de configuration.
:::

## Articles connexes

- [Plans de service](./plans.md)
- [Workflows](./workflows.md)
- [Installation de la PWA B1.church](/docs/b1-church/getting-started/installing-pwa)
