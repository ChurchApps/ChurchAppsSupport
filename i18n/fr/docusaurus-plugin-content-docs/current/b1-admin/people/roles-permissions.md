---
title: "Attribuer des rôles"
---

# Attribuer des rôles {#assigning-roles}

<div class="article-intro">

B1 Admin utilise un système d'autorisations fondé sur les rôles pour contrôler ce que chaque utilisateur de votre équipe peut voir et faire. En attribuant des rôles, vous pouvez donner au personnel et aux bénévoles l'accès exactement aux domaines dont ils ont besoin, et rien de plus. Une bonne gestion des rôles protège les données de votre église tout en permettant à votre équipe de travailler efficacement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'accès **Administrateur de domaine** ou d'un rôle autorisant la gestion des **Paramètres** dans B1 Admin.
- Les personnes à qui vous souhaitez attribuer des rôles doivent déjà exister dans votre annuaire. Consultez [Ajouter des personnes](adding-people.md) si vous devez d'abord les ajouter.

</div>

## Comprendre les rôles {#understanding-roles}

Un rôle est un ensemble d'autorisations que vous attribuez à un ou plusieurs utilisateurs. Par exemple, vous pouvez créer un rôle « Équipe financière » qui donne accès aux [enregistrements de dons](../donations/recording-donations.md), ou un rôle « Bénévole d'enregistrement » qui n'autorise l'accès qu'aux [fonctionnalités de présence](../attendance/check-in.md).

Chaque rôle contrôle l'accès à des domaines précis de B1 Admin, notamment :

- **Personnes** : consulter et modifier les profils des membres. La section Remarques d'une fiche personne nécessite **Modifier les personnes**, et une autorisation distincte, **Voir les notes confidentielles**, contrôle l'accès à la section Notes confidentielles (pour le soin pastoral, l'historique personnel et les notes sensibles similaires). **Voir uniquement les noms des personnes** permet de rechercher des personnes par leur nom (en ne voyant que le nom, la photo et le statut de membre), sans accès à l'annuaire complet. Combinée à **Voir la présence** ou **Modifier la présence**, elle permet à un bénévole d'ouvrir **Groupes** et de voir les listes de classe par nom ; avec **Modifier la présence**, il peut aussi [enregistrer la présence](../attendance/recording-attendance.md). Voir [Personnes : noms uniquement](../settings/roles-permissions.md#people-names-only).
- **Dons** : gérer les contributions et les rapports financiers. **Saisir des dons** est une option plus restreinte destinée aux équipes de comptage : elle permet de saisir des dons, mais uniquement dans les [lots](../donations/batches.md#who-can-change-a-batch) encore ouverts.
- **Présence** : enregistrer et consulter les données de présence
- **Formulaires** : créer et gérer les [formulaires personnalisés](../forms/creating-forms.md)
- **Groupes** : gérer les [appartenances aux groupes](../groups/group-members.md) et les calendriers
- **Paramètres** : configurer les paramètres à l'échelle de l'église

:::warning
Les **Administrateurs de domaine** ont un accès complet à tous les domaines de B1 Admin. Leurs autorisations ne peuvent être ni modifiées ni restreintes. Réservez ce rôle à vos administrateurs principaux.
:::

## Afficher et gérer les rôles {#viewing-and-managing-roles}

1. Ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin) et développez **Paramètres**.
2. Cliquez sur **Rôles**.
3. Vous verrez la liste de tous les rôles configurés pour votre église.
4. Cliquez sur un rôle pour afficher ses membres et ses autorisations.

## Ajouter des utilisateurs à un rôle {#adding-users-to-a-role}

1. Dans le menu Jump, choisissez **Paramètres > Rôles**.
2. Cliquez sur le rôle auquel vous souhaitez ajouter un utilisateur.
3. Dans la section **Membres**, recherchez la personne par son nom.
4. Cliquez sur **Ajouter** pour l'affecter au rôle.

L'utilisateur disposera de toutes les autorisations associées à ce rôle à sa prochaine connexion.

## Modifier les autorisations d'un rôle {#editing-role-permissions}

1. Dans le menu Jump, choisissez **Paramètres > Rôles**.
2. Cliquez sur le rôle que vous souhaitez modifier.
3. Dans la section **Autorisations**, cochez ou décochez les domaines auxquels le rôle doit avoir accès.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

:::tip
Appliquez le principe du moindre privilège : n'accordez à chaque rôle que les autorisations dont il a réellement besoin. Cela protège vos données et réduit le risque de modifications accidentelles.
:::

## Exemples de rôles courants {#common-role-examples}

- **Personnel de bureau** : accès à Personnes, Dons, Présence et Formulaires
- **Responsables de groupe** : accès aux [Groupes](../groups/creating-groups.md) uniquement
- **Bénévoles d'enregistrement** : accès à la [Présence](../attendance/check-in.md) uniquement
- **Équipe financière** : accès aux [Dons](../donations/recording-donations.md) et aux rapports
- **Équipe de comptage** : **Saisir des dons** et **Voir les dons**, afin que les bénévoles puissent saisir l'offrande dans les lots ouverts sans voir les récapitulatifs des dons

Consultez [Rôles et permissions](../settings/roles-permissions.md) pour un examen plus détaillé des autorisations relatives aux dons et aux personnes.
