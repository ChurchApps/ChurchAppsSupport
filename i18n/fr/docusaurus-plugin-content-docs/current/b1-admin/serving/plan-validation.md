---
title: "Validation des plans et notifications"
description: "Vérifiez les plans de service dans B1 Admin pour repérer les postes non pourvus, les conflits d'horaire et les bénévoles indisponibles, puis avisez toute votre équipe en un clic."
---

# Validation des plans et notifications aux bénévoles {#plan-validation-volunteer-notifications}

<div class="article-intro">

B1 Admin vérifie automatiquement vos plans avant le dimanche : postes non pourvus, conflits d'horaire et bénévoles ayant bloqué la date. Lorsque tout est en ordre, vous pouvez avertir toute votre équipe d'un seul clic.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez un [plan de service](./plans.md) et affectez des bénévoles à des postes
- Ajoutez des [horaires de service](./plans.md) au plan afin que la détection des conflits puisse vérifier les chevauchements
- Assurez-vous que les bénévoles ont [installé l'application B1](../../b1-church/getting-started/installing-pwa.md) pour recevoir les notifications push

</div>

## Le panneau de validation {#the-validation-panel}

Chaque plan dispose d'un panneau **Validation** qui s'exécute automatiquement pendant que vous le construisez. Ouvrez le plan et cliquez sur **Gérer l'équipe de service** pour le voir à côté des postes. La page du plan affiche elle-même un résumé d'une ligne sous **Équipe de service** (par exemple, « 2 conflits · 3 non avisés ») accompagné d'un lien **Examiner** vers le panneau complet. Les postes qui ont encore besoin de personnes sont aussi listés sur la page du plan ; la ligne de résumé ne compte donc que les conflits et les bénévoles qui n'ont pas encore été avisés.

Le panneau vérifie les points suivants :

### Postes non pourvus {#unfilled-positions}
Si un poste exige plus de personnes que le nombre actuellement affecté, le panneau de validation indique exactement ce qui manque, par exemple *« Technicien du son : 1 personne de plus nécessaire. »* Vous voyez d'un coup d'œil si votre plan est entièrement doté avant l'arrivée de la semaine.

### Conflits d'horaire {#scheduling-conflicts}
Si un bénévole est affecté à deux postes qui se chevauchent dans le temps au sein d'un même plan, le panneau de validation signale le conflit, par exemple *« Jane Smith : conflit d'horaire entre Responsable de la louange et Accueil des enfants pendant le service du dimanche. »* Cela permet de repérer les doubles réservations avant qu'elles ne deviennent un problème le dimanche matin.

### Dates de blocage {#blockout-dates}
Les bénévoles peuvent indiquer les dates où ils ne sont pas disponibles dans l'application B1. Si une personne est affectée à un plan tombant pendant une de ces dates de blocage, le panneau de validation signale automatiquement le conflit afin que vous puissiez trouver un remplaçant.

Les bénévoles bloqués sont aussi signalés pendant que vous planifiez. Sur la page de l'équipe de service et dans la boîte de dialogue **Affecter un poste**, leur nom affiche un badge rouge **Indisponible** ; survolez-le pour voir les dates (par exemple, *Bloqué : 22 nov. 2026 – 29 nov. 2026*). Dans la boîte de dialogue **Affecter un poste**, ils sont listés après tous les autres membres de l'équipe, et vous pouvez tout de même les affecter. Sur la grille de la [vue d'ensemble des plans](./plans-overview.md), une petite icône de calendrier rouge à côté d'un nom indique la même chose.

Pour les bénévoles qui n'utilisent pas l'application, le personnel peut saisir des dates de blocage à leur place. Ouvrez l'équipe (depuis la liste **Équipes de service** du ministère) et faites défiler jusqu'à la carte **Dates de blocage** sous la liste des membres, qui affiche les blocages à venir de chaque membre de l'équipe avec **Membre de l'équipe**, **Du** et **Au** :

1. Cliquez sur **Ajouter un blocage**.
2. Choisissez le **Membre de l'équipe**, puis définissez les dates **Du** et **Au**.
3. Cliquez sur **Enregistrer**.

Pour en retirer un, cliquez sur l'icône de suppression de sa ligne et confirmez. L'ajout et la suppression de blocages exigent l'autorisation de modifier les plans ; toute autre personne qui ouvre l'équipe ne voit que la liste.

### Conflits entre plans {#cross-plan-conflicts}
La validation vérifie aussi l'ensemble de vos plans à la fois. Si le même bénévole est affecté à deux plans différents qui se chevauchent dans le temps (par exemple, un service à 9 h et un service à 10 h qui se terminent tous deux à 10 h 30), B1 Admin signale cette personne comme ayant une double réservation entre plans.

### Préférences de planification {#scheduling-preferences}
Si un bénévole a des [préférences de planification](./plans.md#scheduling-preferences), le panneau vous avertit lorsqu'une affectation va à l'encontre de celles-ci : lorsqu'il est planifié plus de fois ce mois-ci que son **Nombre maximal de fois par mois**, lorsqu'aucun des horaires du plan ne correspond à ses **Horaires de service préférés**, ou lorsqu'il a demandé à ne pas servir le même jour que son foyer et qu'un membre de son foyer est aussi planifié.

Lorsque tout est conforme, le panneau affiche **Le plan est valide.**

:::tip
Vous n'avez rien à faire pour lancer la validation : elle se met à jour automatiquement chaque fois que vous ajoutez ou modifiez une affectation. Gardez simplement un œil sur le panneau pendant que vous construisez le plan.
:::

## Avertir les bénévoles {#notifying-volunteers}

Une fois votre plan établi, vous pouvez avertir tous les bénévoles affectés en une seule fois depuis le panneau de validation.

1. Ouvrez le plan et cliquez sur **Gérer l'équipe de service** (ou sur **Examiner** dans la ligne de résumé du plan) pour voir le panneau **Validation**.
2. S'il y a des bénévoles non avisés, un lien indique combien doivent l'être (par exemple, *« Aviser 8 bénévole(s) »*). Lorsque tout le monde a été averti, le panneau affiche **Tous les bénévoles ont été avisés.**
3. Cliquez sur le lien pour envoyer des notifications push à tous ceux qui n'ont pas encore été avisés.
4. Les bénévoles reçoivent une notification sur leur téléphone les informant qu'ils ont été planifiés et les invitant à confirmer leur affectation.

:::info
Seuls les bénévoles qui n'ont pas encore été avisés sont inclus. Si vous ajoutez quelqu'un au plan plus tard, le lien réapparaîtra afin que vous puissiez avertir la nouvelle personne sans avertir de nouveau le reste de l'équipe.
:::

### Publier un plan provisoire {#publishing-a-penciled-in-plan}

Si le plan est [provisoire](./plans.md#plan-settings), les bénévoles ne peuvent pas encore voir leurs affectations, et le panneau affiche *« Provisoire — les bénévoles ne peuvent pas encore voir ces affectations. »* avec un bouton à la place du lien d'avis :

- **Publier le plan** rend les affectations visibles.
- **Publier et aviser** (affiché lorsque certains bénévoles n'ont pas encore été avisés, par exemple *« Publier et aviser 8 bénévole(s) »*) rend les affectations visibles et avise immédiatement ces bénévoles.

Confirmez dans la boîte de dialogue pour publier.

### Plans avec un flux de confirmation {#plans-with-a-confirmation-workflow}

Si les paramètres du plan désignent un [flux de confirmation](./workflows.md#serving-assignment-confirmations), le panneau affiche *« Les nouvelles demandes utilisent le flux de confirmation. Les alertes de l'application restent activées. Les relances s'arrêtent lorsque chaque demande est acceptée ou refusée. »* Dans ce cas :

- Le lien d'avis ne compte que les bénévoles qui n'ont pas encore été avisés et n'ont pas encore répondu.
- Cliquer dessus envoie l'alerte habituelle dans l'application et crée une carte par demande sur le tableau du flux de travail. Le flux envoie ensuite les relances par courriel et par texto et, si nécessaire, transmet la demande à quelqu'un pour un appel.
- Le plan doit être publié (et non provisoire) et le flux de travail doit être actif. Sinon, le panneau affiche *« Les demandes n'ont pas pu être envoyées. Vérifiez que le flux de travail sélectionné est actif et que le plan est publié, puis réessayez. »*

:::warning
Pour recevoir les notifications push, les bénévoles doivent avoir installé l'application B1 sur leur écran d'accueil et activé les notifications. Voir [Installer comme application (PWA)](../../b1-church/getting-started/installing-pwa.md) pour les instructions de configuration.
:::

## Articles connexes {#related-articles}

- [Plans de service](./plans.md)
- [Flux de travail](./workflows.md)
- [Installer le PWA B1.church](/docs/b1-church/getting-started/installing-pwa)
