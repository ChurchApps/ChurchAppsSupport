---
title: "Assignation des rôles"
---

# Assignation des rôles

<div class="article-intro">

B1 Admin utilise un système de permissions basé sur les rôles pour contrôler ce que chaque utilisateur de votre équipe peut voir et faire. En assignant les rôles, vous pouvez donner l'accès à exactement les zones dont ils ont besoin au personnel et aux bénévoles -- et rien de plus. La gestion appropriée des rôles garde vos données d'église sûres tout en permettant à votre équipe de travailler efficacement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un accès **Admin de domaine** ou d'un rôle avec la permission de gérer les **Paramètres** dans B1 Admin.
- Les personnes auxquelles vous voulez assigner des rôles doivent déjà exister dans votre répertoire. Voir [Ajout de personnes](adding-people.md) si vous avez besoin de les ajouter d'abord.

</div>

## Comprendre les rôles

Un rôle est un ensemble de permissions que vous assignez à un ou plusieurs utilisateurs. Par exemple, vous pourriez créer un rôle "Équipe des finances" qui accorde l'accès aux [dossiers de donations](../donations/recording-donations.md), ou un rôle "Bénévole d'enregistrement" qui permet uniquement l'accès aux [fonctionnalités de présence](../attendance/check-in.md).

Chaque rôle contrôle l'accès à des zones spécifiques de B1 Admin, incluant :

- **Personnes** -- affichage et modification des profils de membres. L'onglet Notes sur un dossier de personne nécessite **Modifier les personnes**, et une permission séparée **Afficher les notes confidentielles** contrôle l'accès à la section Notes confidentielles (pour les soins pastoraux, l'historique personnel et les notes sensibles similaires).
- **Donations** -- gestion des contributions et des rapports financiers
- **Présence** -- enregistrement et affichage des données de présence
- **Formulaires** -- création et gestion des [formulaires personnalisés](../forms/creating-forms.md)
- **Groupes** -- gestion des [adhésions au groupe](../groups/group-members.md) et des calendriers
- **Paramètres** -- configuration des paramètres au niveau de l'église

:::warning
Les **Admins de domaine** ont l'accès complet à chaque zone de B1 Admin. Leurs permissions ne peuvent pas être modifiées ou restreintes. Utilisez ce rôle uniquement pour vos administrateurs principaux.
:::

## Affichage et gestion des rôles

1. Ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Paramètres**.
2. Cliquez sur **Rôles** dans la navigation en haut.
3. Vous verrez une liste de tous les rôles configurés pour votre église.
4. Cliquez sur n'importe quel rôle pour voir ses membres et ses permissions.

## Ajout d'utilisateurs à un rôle

1. Naviguez vers **Paramètres** puis **Rôles**.
2. Cliquez sur le rôle auquel vous voulez ajouter un utilisateur.
3. Dans la section **Membres**, recherchez la personne par nom.
4. Cliquez sur **Ajouter** pour les assigner au rôle.

L'utilisateur aura maintenant toutes les permissions associées à ce rôle la prochaine fois qu'il se connectera.

## Modification des permissions des rôles

1. Naviguez vers **Paramètres** puis **Rôles**.
2. Cliquez sur le rôle que vous voulez modifier.
3. Dans la section **Permissions**, cochez ou décochez les zones auxquelles vous voulez que le rôle accède.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

:::tip
Suivez le principe du moindre privilège -- donnez à chaque rôle seulement les permissions dont il a vraiment besoin. Cela garde vos données sûres et réduit la chance de changements accidentels.
:::

## Exemples de rôles courants

- **Personnel de bureau** -- accès aux Personnes, Donations, Présence et Formulaires
- **Leaders de groupe** -- accès aux [Groupes](../groups/creating-groups.md) uniquement
- **Bénévoles d'enregistrement** -- accès à la [Présence](../attendance/check-in.md) uniquement
- **Équipe des finances** -- accès aux [Donations](../donations/recording-donations.md) et rapports
