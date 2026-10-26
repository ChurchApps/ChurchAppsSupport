---
title: "Validation des plans et notifications"
---

# Validation des plans et notifications aux bénévoles

<div class="article-intro">

B1 Admin vérifie automatiquement vos plans avant le dimanche à la recherche de problèmes : postes non pourvus, conflits de planning et bénévoles qui ont bloqué la date. Lorsque tout est en ordre, vous pouvez notifier toute votre équipe en un seul clic.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez un [plan de service](./plans.md) et affectez des bénévoles aux postes
- Ajoutez des [horaires de service](./plans.md) au plan afin que la détection des conflits puisse vérifier les chevauchements
- Assurez-vous que les bénévoles ont installé l'application B1 Mobile pour recevoir les notifications push

</div>

## Le panneau de validation

Chaque plan dispose d'un panneau **Validation** qui s'exécute automatiquement pendant que vous le construisez. Il vérifie trois éléments :

### Postes non pourvus
Si un poste nécessite plus de personnes qu'il n'en compte actuellement, le panneau de validation indique précisément ce qui manque encore, par exemple *« Technicien son : 1 personne de plus nécessaire. »* Vous voyez d'un coup d'œil si votre plan est entièrement doté avant l'arrivée de la semaine.

### Conflits de planning
Si un bénévole est affecté à deux postes qui se chevauchent dans le temps au sein du même plan, le panneau de validation signale le conflit, par exemple *« Jane Smith : conflit d'horaire entre Responsable de louange et Accueil des enfants pendant le culte du dimanche. »* Cela permet de repérer les doubles réservations avant qu'elles ne deviennent un problème le dimanche matin.

### Dates bloquées
Les bénévoles peuvent indiquer, dans B1 Mobile, les dates pendant lesquelles ils ne sont pas disponibles. Si une personne est affectée à un plan tombant dans l'une de ces dates bloquées, le panneau de validation fait remonter le conflit automatiquement afin que vous puissiez trouver un remplaçant.

### Conflits entre plans
La validation vérifie également l'ensemble de vos plans à la fois. Si le même bénévole est affecté à deux plans différents qui se chevauchent dans le temps, par exemple un culte de 9 h et un culte de 10 h qui se terminent tous deux à 10 h 30, B1 Admin signale cette personne comme ayant une double réservation entre plusieurs plans.

:::tip
Vous n'avez rien à faire pour lancer la validation : elle se met à jour automatiquement chaque fois que vous ajoutez ou modifiez une affectation. Gardez simplement un œil sur le panneau pendant la préparation du plan.
:::

## Notifier les bénévoles

Une fois votre plan établi, vous pouvez notifier tous les bénévoles affectés en une seule fois directement depuis le panneau de validation.

1. Ouvrez le plan et faites défiler jusqu'au panneau **Validation**
2. S'il reste des bénévoles non notifiés, un lien indique combien doivent être notifiés (par exemple, *« Notifier 8 bénévoles »*)
3. Cliquez sur le lien pour envoyer une notification push à toutes les personnes qui n'ont pas encore été notifiées
4. Les bénévoles reçoivent une notification sur leur téléphone les informant qu'ils ont été programmés et les invitant à confirmer leur affectation

:::info
Seuls les bénévoles qui n'ont pas encore été notifiés sont inclus. Si vous ajoutez ultérieurement une personne au plan, le lien réapparaît afin que vous puissiez notifier la nouvelle personne sans renotifier le reste de l'équipe.
:::

### Plans avec un workflow de confirmation

Si les paramètres du plan désignent un [workflow de confirmation](./workflows.md#serving-assignment-confirmations), le panneau affiche *« Les nouvelles demandes utilisent le workflow de confirmation. Les alertes dans l'application restent activées. Les relances s'arrêtent lorsque chaque demande est acceptée ou refusée. »* Dans ce cas :

- Le lien de notification ne compte que les bénévoles qui n'ont pas été notifiés et n'ont pas encore répondu.
- Un clic sur le lien envoie l'alerte habituelle dans l'application et crée une carte par demande sur le tableau du workflow. Le workflow envoie ensuite les relances par e-mail et par SMS et, si nécessaire, transmet la demande à une personne chargée de téléphoner.
- Le plan doit être publié (et non en mode « crayon ») et le workflow doit être actif. Sinon, le panneau affiche *« Les demandes n'ont pas pu être envoyées. Vérifiez que le workflow sélectionné est actif et que le plan est publié, puis réessayez. »*

:::warning
Les bénévoles doivent avoir installé l'expérience mobile B1.church (PWA sur l'écran d'accueil, ou l'ancienne application native B1 Mobile pour les utilisateurs qui l'ont encore) avec les notifications activées pour recevoir les notifications push. Consultez [Installer l'application (PWA)](/docs/b1-church/getting-started/installing-pwa) pour la procédure de configuration.
:::

## Articles connexes

- [Plans de service](./plans.md)
- [Workflows](./workflows.md)
- [Installer le PWA B1.church](/docs/b1-church/getting-started/installing-pwa)
