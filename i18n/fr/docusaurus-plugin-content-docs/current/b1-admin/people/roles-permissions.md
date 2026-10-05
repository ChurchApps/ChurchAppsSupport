---
title: "Attribution des rôles"
---

# Attribution des rôles

<div class="article-intro">

B1 Admin utilise un système de permissions basé sur les rôles pour contrôler ce que chaque utilisateur de votre équipe peut voir et faire. En attribuant des rôles, vous pouvez donner au personnel et aux bénévoles l'accès exactement aux domaines dont ils ont besoin -- et rien de plus. Une bonne gestion des rôles sécurise les données de votre église tout en permettant à votre équipe de travailler efficacement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un accès **Domain Admin** ou d'un rôle avec permission de gérer les **Paramètres** dans B1 Admin.
- Les personnes à qui vous souhaitez attribuer des rôles doivent déjà exister dans votre répertoire. Voir [Ajouter des personnes](adding-people.md) si vous avez besoin de les ajouter d'abord.

</div>

## Comprendre les rôles

Un rôle est un ensemble de permissions que vous attribuez à un ou plusieurs utilisateurs. Par exemple, vous pourriez créer un rôle "Finance Team" qui accorde l'accès aux [dossiers de dons](../donations/recording-donations.md), ou un rôle "Bénévole d'enregistrement" qui n'autorise l'accès qu'aux [fonctionnalités de participation](../attendance/check-in.md).

Chaque rôle contrôle l'accès à des domaines spécifiques de B1 Admin, notamment :

- **Personnes** -- visualisation et édition des profils de membres. L'onglet Notes sur un enregistrement de personne nécessite **Modifier les personnes**, et une permission séparée **Voir les notes confidentielles** contrôle l'accès à la section Notes confidentielles (pour les soins pastoraux, l'historique personnel et d'autres notes sensibles similaires).
- **Dons** -- gestion des contributions et des rapports financiers
- **Participation** -- enregistrement et consultation des données de participation
- **Formulaires** -- création et gestion des [formulaires personnalisés](../forms/creating-forms.md)
- **Groupes** -- gestion des [adhésions aux groupes](../groups/group-members.md) et des calendriers
- **Paramètres** -- configuration des paramètres à l'échelle de l'église

:::warning
Les **Administrateurs de domaine** ont un accès complet à tous les domaines de B1 Admin. Leurs permissions ne peuvent pas être modifiées ou restreintes. Utilisez ce rôle uniquement pour vos administrateurs principaux.
:::

## Affichage et gestion des rôles

1. Ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin) et développez **Paramètres**.
2. Cliquez sur **Rôles**.
3. Vous verrez une liste de tous les rôles configurés pour votre église.
4. Cliquez sur n'importe quel rôle pour afficher ses membres et ses permissions.

## Ajouter des utilisateurs à un rôle

1. Dans le menu de saut, choisissez **Paramètres > Rôles**.
2. Cliquez sur le rôle auquel vous souhaitez ajouter un utilisateur.
3. Dans la section **Membres**, recherchez la personne par son nom.
4. Cliquez sur **Ajouter** pour l'assigner au rôle.

L'utilisateur aura maintenant toutes les permissions associées à ce rôle lors de sa prochaine connexion.

## Modification des permissions du rôle

1. Dans le menu de saut, choisissez **Paramètres > Rôles**.
2. Cliquez sur le rôle que vous souhaitez modifier.
3. Dans la section **Permissions**, cochez ou décochez les domaines auxquels vous souhaitez que le rôle ait accès.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

:::tip
Suivez le principe du moindre privilège -- donnez à chaque rôle uniquement les permissions dont il a réellement besoin. Cela sécurise vos données et réduit le risque de changements accidentels.
:::

## Exemples de rôles courants

- **Personnel de bureau** -- accès à Personnes, Dons, Participation et Formulaires
- **Responsables de groupes** -- accès aux [Groupes](../groups/creating-groups.md) uniquement
- **Bénévoles d'enregistrement** -- accès à [Participation](../attendance/check-in.md) uniquement
- **Équipe de finance** -- accès aux [Dons](../donations/recording-donations.md) et aux rapports
