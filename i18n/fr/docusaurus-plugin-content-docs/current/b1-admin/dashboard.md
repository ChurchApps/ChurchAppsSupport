---
title: "Tableau de bord"
description: "Découvrez ce qu'affiche le tableau de bord de B1 Admin : l'ordre du service de la semaine, les personnes qui servent et qui sont enregistrées, les éléments qui demandent votre attention, ainsi que vos tâches et groupes."
---

# Tableau de bord

<div class="article-intro">

Le tableau de bord est la page d'accueil de B1 Admin. Il s'ouvre à votre connexion et s'articule autour du service hebdomadaire de votre église : l'ordre du service du prochain plan, les personnes qui servent, les personnes présentes le dimanche, les éléments qui attendent votre intervention, ainsi que vos propres tâches et groupes.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Connectez-vous à [B1 Admin](https://admin.b1.church). Tous les utilisateurs connectés ont un tableau de bord, mais son contenu dépend de votre [rôle et de vos autorisations](./settings/roles-permissions.md).
- Les sections consacrées au service se remplissent dès que vous utilisez les [Plans](./serving/plans.md) et les [Présences](./attendance/index.md) ou l'[Enregistrement](./attendance/check-in.md).

</div>

## Ouvrir le tableau de bord {#opening-the-dashboard}

- Connectez-vous -- B1 Admin démarre sur le tableau de bord.
- Cliquez sur le petit logo de l'église en haut à gauche de n'importe quelle page.
- Ouvrez le [menu Jump](./introduction.md#getting-around-with-the-jump-menu) (cliquez sur la barre de recherche ou appuyez sur **Ctrl+K** / **Cmd+K**) et choisissez **Tableau de bord**.

## Le service de cette semaine {#this-weeks-service}

La grande carte en haut affiche un plan de service : le prochain plan à venir entre le dimanche précédent et ce dimanche, ou le plan du dimanche précédent si rien n'est prévu. Si plusieurs plans tombent le même jour, un plan qui utilise un ordre du service passe en premier, puis celui dont l'heure de service est la plus tôt.

- **Ligne de date** -- le jour, la date et la première heure de service du plan (par exemple, *dimanche · 15 novembre · 9 h 00*).
- **Titre** -- le nom du plan. Si vous pouvez ouvrir le plan (vous pouvez modifier les plans, vous faites partie du ministère du plan ou vous y servez), le titre renvoie vers le [plan](./serving/plans.md).
- **Ordre du service** -- chaque élément de l'[ordre du service](./serving/service-order.md) du plan, avec l'heure de début calculée à partir de la première heure de service et de la durée de chaque élément. Pendant le déroulement du service, l'élément en cours est mis en évidence.

S'il n'y a aucun plan cette semaine, la carte indique **Aucun service prévu cette semaine.** ; si le plan n'a pas d'ordre du service, elle indique **Aucun ordre du service pour ce plan.** Les personnes qui peuvent modifier les plans voient un lien **Plans** à côté de l'un ou l'autre message.

### Qui sert et qui est dans la salle {#who-is-serving-and-who-is-in-the-room}

À côté de l'ordre du service, le tableau de bord ajoute ce qui se passe autour du service dès que des données sont disponibles :

| Section | Ce qu'elle affiche |
|---|---|
| **dans la salle** | Le nombre de personnes enregistrées ou marquées présentes. Le dimanche, il s'agit du nombre du jour, avec un repère **En direct** ; en semaine, il affiche le nombre du **dimanche dernier**. Si personne n'a été enregistré par son nom, il utilise les [nombres de participants](./attendance/headcount-entry.md) de ce jour. |
| **Service du dimanche** / **Service de cette heure** | Toutes les personnes prévues au plan avec leur poste, reliées à leur fiche personne. Les affectations refusées sont exclues. |
| **Première visite** / **Première visite dimanche dernier** | Les visiteurs qui viennent pour la première fois (personnes ayant le statut de membre *Visiteur* ou *Invité*, ou enregistrées comme invitées), regroupées par foyer. |
| **Salles** | Les enregistrements par classe ou par salle pour cette semaine, avec une barre de capacité lorsque le groupe a une **Capacité** définie. |

Avant que ces données n'existent, la carte affiche une courte indication avec des liens vers **Personnes**, **Présences** et **Plans** (uniquement ceux que vous pouvez ouvrir).

:::info
Les totaux et les noms proviennent de vos données de présences et de service ; ils n'apparaissent donc que pour les personnes autorisées à les voir. Par exemple, les noms des visiteurs et la liste des personnes qui servent nécessitent l'autorisation de consulter les personnes, et les totaux des salles nécessitent l'autorisation de consulter les présences.
:::

## Demande votre attention {#needs-attention}

Lorsque quelque chose attend votre intervention, une carte **Demande votre attention** le liste avec un lien :

- **approbations de calendrier en attente** -- événements et réservations de salles ou de ressources qui nécessitent une approbation. Ouvre [Approbations](./calendars/approvals.md). Affiché aux personnes qui peuvent modifier le contenu.
- **demandes d'adhésion à un groupe en attente** -- personnes qui demandent à rejoindre un groupe. Ouvre la liste des [demandes en attente](./groups/group-join-requests.md). Affiché aux personnes qui peuvent modifier les membres des groupes.

La carte est masquée lorsqu'il n'y a rien à faire.

## Mes tâches et mes groupes {#my-tasks-and-my-groups}

Au bas de la page :

- **Mes tâches** liste jusqu'à quatre [tâches](./serving/tasks.md) ouvertes qui vous sont assignées ; cliquez sur l'une d'elles pour l'ouvrir. Cliquez sur **Ajouter une tâche** pour en créer une directement ici (choisissez la personne concernée et la personne à qui elle est assignée, puis saisissez un titre, une date d'échéance et des notes), ou sur **Toutes les tâches** pour ouvrir **Service > Mon travail**.
- **Mes groupes** liste les groupes dont vous faites partie ; cliquez sur l'un d'eux pour l'ouvrir. Si vous pouvez gérer les groupes ou consulter les personnes, **Tous les groupes** ouvre la liste complète des [Groupes](./groups/index.md).

## Actions rapides {#quick-actions}

Les raccourcis de configuration qui se trouvaient auparavant sur le tableau de bord (comme **Ajouter le logo de votre église**, **Configurer les dons en ligne** et **Créer votre premier groupe**) se trouvent désormais dans le menu Jump, sous **Actions rapides**. Voir [Actions rapides](./introduction.md#quick-actions).

## Articles connexes {#related-articles}

- [Introduction](./introduction.md) -- se connecter et se repérer avec le menu Jump
- [Notifications et messages](./notifications.md) -- les alertes et messages privés de votre menu utilisateur
- [Plans](./serving/plans.md) et [Ordre du service](./serving/service-order.md) -- ce qui alimente la carte de service
- [Enregistrement](./attendance/check-in.md) -- comment les personnes sont comptées dans la salle
