---
title: "Validation des plans et notifications"
description: "Vérifiez les plans de service dans B1 Admin pour détecter les postes non pourvus, les conflits de planning et les bénévoles indisponibles, puis envoyez une notification push à toute votre équipe en un seul clic."
---

# Validation des plans et notification des bénévoles

<div class="article-intro">

B1 Admin vérifie automatiquement vos plans avant dimanche : postes non pourvus, conflits de planning et bénévoles ayant bloqué la date. Lorsque tout est en ordre, vous pouvez notifier toute votre équipe d'un seul clic.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez un [plan de service](./plans.md) et attribuez des bénévoles aux postes
- Ajoutez des [horaires de service](./plans.md) au plan afin que la détection des conflits puisse vérifier les chevauchements
- Assurez-vous que les bénévoles ont [installé l'application B1](../../b1-church/getting-started/installing-pwa.md) pour recevoir les notifications push

</div>

## Le panneau de validation

Chaque plan dispose d'un panneau **Validation** qui s'exécute automatiquement pendant que vous le construisez. Il vérifie trois éléments :

### Postes non pourvus
Si un poste exige plus de personnes que le nombre actuellement attribué, le panneau de validation indique exactement ce qui manque, par exemple : *« Technicien son : 1 personne de plus nécessaire. »* Vous voyez d'un coup d'œil si votre plan est entièrement pourvu avant l'arrivée de la semaine.

### Conflits de planning
Si un bénévole est affecté à deux postes qui se chevauchent dans le temps au sein du même plan, le panneau de validation signale le conflit, par exemple : *« Jane Smith : conflit horaire entre Responsable de louange et Accueil des enfants pendant le culte du dimanche. »* Cela permet de repérer les doubles réservations avant qu'elles ne deviennent un problème le dimanche matin.

### Dates d'indisponibilité
Les bénévoles peuvent indiquer dans l'application B1 les dates où ils ne sont pas disponibles. Si quelqu'un est affecté à un plan tombant pendant l'une de ses dates d'indisponibilité, le panneau de validation fait remonter automatiquement le conflit afin que vous puissiez trouver un remplaçant.

### Conflits entre plans
La validation vérifie également l'ensemble de vos plans en une seule fois. Si le même bénévole est affecté à deux plans différents qui se chevauchent dans le temps, par exemple un culte de 9h et un culte de 10h qui durent tous deux jusqu'à 10h30, B1 Admin signalera cette personne comme doublement réservée entre plans.

:::tip
Vous n'avez rien à faire pour lancer la validation : elle se met à jour automatiquement à chaque ajout ou modification d'une affectation. Gardez simplement un œil sur le panneau pendant que vous construisez le plan.
:::

## Notifier les bénévoles

Une fois votre plan finalisé, vous pouvez notifier d'un seul coup tous les bénévoles affectés directement depuis le panneau de validation.

1. Ouvrez le plan et faites défiler jusqu'au panneau **Validation**
2. S'il reste des bénévoles non notifiés, un lien indiquant combien doivent l'être s'affiche (par ex. *« Notifier 8 bénévoles »*)
3. Cliquez sur le lien pour envoyer une notification push à tous ceux qui n'ont pas encore été notifiés
4. Les bénévoles reçoivent une notification sur leur téléphone les informant qu'ils ont été programmés et les invitant à confirmer leur affectation

:::info
Seuls les bénévoles qui n'ont pas encore été notifiés sont inclus. Si vous ajoutez plus tard quelqu'un au plan, le lien réapparaîtra afin que vous puissiez notifier le nouveau venu sans renotifier le reste de l'équipe.
:::

### Plans avec un flux de confirmation

Si les paramètres du plan renvoient vers un [flux de confirmation](./workflows.md#serving-assignment-confirmations), le panneau affiche *« Les nouvelles demandes utilisent le flux de confirmation. Les alertes de l'application restent activées. Les relances s'arrêtent dès qu'une demande est acceptée ou refusée. »* Dans ce cas :

- Le lien de notification ne compte que les bénévoles non notifiés qui n'ont pas encore répondu.
- Un clic envoie l'alerte habituelle dans l'application et crée une carte par demande sur le tableau du flux. Le flux envoie ensuite les relances par e-mail et SMS et, si nécessaire, transmet la demande à une personne chargée de téléphoner.
- Le plan doit être publié (et non simplement provisoire) et le flux doit être actif. Sinon, le panneau affiche *« Les demandes n'ont pas pu être envoyées. Vérifiez que le flux sélectionné est actif et que le plan est publié, puis réessayez. »*

:::warning
Pour recevoir les notifications push, les bénévoles doivent avoir installé l'application B1 sur l'écran d'accueil de leur téléphone et activé les notifications. Consultez [Installer l'application (PWA)](../../b1-church/getting-started/installing-pwa.md) pour les instructions d'installation.
:::

## Articles connexes

- [Plans de service](./plans.md)
- [Flux de travail](./workflows.md)
- [Installer le PWA B1.church](/docs/b1-church/getting-started/installing-pwa)
