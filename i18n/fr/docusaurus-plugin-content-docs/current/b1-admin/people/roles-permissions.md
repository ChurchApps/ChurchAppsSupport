---
title: "Attribuer des rôles"
---

# Attribuer des rôles

<div class="article-intro">

B1 Admin utilise un système de permissions fondé sur les rôles pour contrôler ce que chaque utilisateur de votre équipe peut voir et faire. En attribuant des rôles, vous donnez aux membres du personnel et aux bénévoles accès exactement aux domaines dont ils ont besoin, et rien de plus. Une bonne gestion des rôles protège les données de votre église tout en permettant à votre équipe de travailler efficacement.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Vous avez besoin de l'accès **Administrateur de domaine** ou d'un rôle disposant de la permission de gérer les **Paramètres** dans B1 Admin.
- Les personnes auxquelles vous voulez attribuer des rôles doivent déjà exister dans votre annuaire. Voir [Ajouter des personnes](adding-people.md) si vous devez d'abord les ajouter.

</div>

## Comprendre les rôles

Un rôle est un ensemble de permissions que vous attribuez à un ou plusieurs utilisateurs. Par exemple, vous pouvez créer un rôle « Équipe financière » qui donne accès aux [registres de dons](../donations/recording-donations.md), ou un rôle « Bénévole enregistrement » qui n'autorise que l'accès aux [fonctions de présence](../attendance/check-in.md).

Chaque rôle contrôle l'accès à des domaines précis de B1 Admin, notamment :

- **Personnes** -- consulter et modifier les fiches des membres. La section Notes d'une fiche de personne exige **Modifier les personnes**, et une permission distincte **Voir les notes confidentielles** contrôle l'accès à la section Notes confidentielles (pour l'accompagnement pastoral, l'historique personnel et les notes sensibles similaires). **Voir uniquement les noms des personnes** permet de rechercher quelqu'un par son nom (en ne voyant que le nom, la photo et le statut de membre), sans accès à l'annuaire complet.
- **Dons** -- gérer les contributions et les rapports financiers. **Saisir des dons** est une option plus restreinte pour les équipes de comptage : elle permet de saisir des dons, mais uniquement dans les [lots](../donations/batches.md#who-can-change-a-batch) encore ouverts.
- **Présence** -- enregistrer et consulter les données de présence
- **Formulaires** -- créer et gérer les [formulaires personnalisés](../forms/creating-forms.md)
- **Groupes** -- gérer les [appartenances aux groupes](../groups/group-members.md) et les calendriers
- **Paramètres** -- configurer les paramètres de l'église entière

:::warning
Les **Administrateurs de domaine** ont un accès complet à tous les domaines de B1 Admin. Leurs permissions ne peuvent être ni modifiées ni restreintes. Réservez ce rôle à vos administrateurs principaux.
:::

## Afficher et gérer les rôles

1. Ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin) et développez **Paramètres**.
2. Cliquez sur **Rôles**.
3. Vous verrez la liste de tous les rôles configurés pour votre église.
4. Cliquez sur un rôle pour voir ses membres et ses permissions.

## Ajouter des utilisateurs à un rôle

1. Dans le menu Sauter, choisissez **Paramètres > Rôles**.
2. Cliquez sur le rôle auquel vous voulez ajouter un utilisateur.
3. Dans la section **Membres**, recherchez la personne par son nom.
4. Cliquez sur **Ajouter** pour l'affecter au rôle.

L'utilisateur disposera de toutes les permissions associées à ce rôle dès sa prochaine connexion.

## Modifier les permissions d'un rôle

1. Dans le menu Sauter, choisissez **Paramètres > Rôles**.
2. Cliquez sur le rôle à modifier.
3. Dans la section **Permissions**, cochez ou décochez les domaines auxquels le rôle doit avoir accès.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

:::tip
Appliquez le principe du moindre privilège : n'accordez à chaque rôle que les permissions dont il a réellement besoin. Cela protège vos données et réduit le risque de modifications accidentelles.
:::

## Exemples de rôles courants

- **Personnel de bureau** -- accès aux Personnes, aux Dons, à la Présence et aux Formulaires
- **Responsables de groupe** -- accès aux [Groupes](../groups/creating-groups.md) uniquement
- **Bénévoles de l'enregistrement** -- accès à la [Présence](../attendance/check-in.md) uniquement
- **Équipe financière** -- accès aux [Dons](../donations/recording-donations.md) et aux rapports
- **Équipe de comptage** -- **Saisir des dons** et **Voir les dons**, afin que les bénévoles puissent saisir l'offrande dans les lots ouverts sans voir les récapitulatifs de dons

Consultez [Rôles et permissions](../settings/roles-permissions.md) pour un examen plus détaillé des permissions liées aux dons et aux personnes.
