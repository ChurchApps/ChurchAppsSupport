---
title: "Attribuer des rôles"
description: "Attribuez des rôles dans B1 Admin pour ne donner au personnel et aux bénévoles accès qu'aux personnes, dons, fréquentation et groupes dont ils ont besoin."
---

# Attribuer des rôles

<div class="article-intro">

B1 Admin utilise un système d'autorisations fondé sur les rôles pour contrôler ce que chaque utilisateur de votre équipe peut voir et faire. En attribuant des rôles, vous donnez au personnel et aux bénévoles accès exactement aux domaines dont ils ont besoin, et rien de plus. Une bonne gestion des rôles protège les données de votre église tout en permettant à votre équipe de travailler efficacement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'accès **Administrateur de domaine** ou d'un rôle disposant de l'autorisation de gérer les **Paramètres** dans B1 Admin.
- Les personnes auxquelles vous souhaitez attribuer des rôles doivent déjà exister dans votre annuaire. Consultez [Ajouter des personnes](adding-people.md) si vous devez d'abord les ajouter.

</div>

## Comprendre les rôles {#understanding-roles}

Un rôle est un ensemble d'autorisations que vous attribuez à un ou plusieurs utilisateurs. Par exemple, vous pouvez créer un rôle « Équipe financière » qui donne accès aux [registres de dons](../donations/recording-donations.md), ou un rôle « Bénévole du pointage » qui n'autorise que l'accès aux [fonctionnalités de fréquentation](../attendance/check-in.md).

Chaque rôle contrôle l'accès à des domaines précis de B1 Admin, notamment :

- **Personnes** -- consultation et modification des fiches de membres. La section Notes d'une fiche de personne exige l'autorisation **Modifier les personnes**, et une autorisation distincte, **Voir les notes confidentielles**, contrôle l'accès à la section Notes confidentielles (pour le soin pastoral, l'historique personnel et les notes sensibles similaires). **Voir les noms des personnes uniquement** permet à quelqu'un de rechercher des personnes par nom (en ne voyant que le nom, la photo et le statut d'appartenance) sans accéder à l'annuaire complet. Combinée à **Voir la fréquentation** ou **Modifier la fréquentation**, elle permet à un bénévole d'ouvrir **Groupes** et de voir les listes de classe par nom ; avec **Modifier la fréquentation**, il peut aussi [enregistrer la fréquentation](../attendance/recording-attendance.md). Voir [Noms des personnes uniquement](../settings/roles-permissions.md#people-names-only).
- **Dons** -- gestion des contributions et des rapports financiers. **Saisir les dons** est une option plus restreinte destinée aux équipes de comptage : elle permet de saisir des dons, mais uniquement dans les [lots](../donations/batches.md#who-can-change-a-batch) encore ouverts.
- **Fréquentation** -- enregistrement et consultation des données de fréquentation
- **Formulaires** -- création et gestion des [formulaires personnalisés](../forms/creating-forms.md)
- **Groupes** -- gestion des [appartenances aux groupes](../groups/group-members.md) et des calendriers
- **Paramètres** -- configuration des paramètres à l'échelle de l'église

:::warning
Les **Administrateurs de domaine** ont un accès complet à tous les domaines de B1 Admin. Leurs autorisations ne peuvent être ni modifiées ni restreintes. Réservez ce rôle à vos administrateurs principaux.
:::

## Consulter et gérer les rôles {#viewing-and-managing-roles}

1. Ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin) et développez **Paramètres**.
2. Cliquez sur **Rôles**.
3. Vous verrez la liste de tous les rôles configurés pour votre église, avec une colonne **Membres** indiquant le nombre d'utilisateurs dans chaque rôle. Le rôle **(Tout le monde)** s'applique à tous les utilisateurs.
4. Cliquez sur un rôle pour en voir les membres et les autorisations.

## Ajouter des utilisateurs à un rôle {#adding-users-to-a-role}

1. Dans le menu Accès rapide, choisissez **Paramètres > Rôles**.
2. Cliquez sur le rôle auquel vous voulez ajouter un utilisateur.
3. Dans la section **Membres**, cliquez sur **Ajouter**.
4. Recherchez la personne par son nom (ou choisissez-la dans les **Personnes récentes**), puis cliquez sur son nom ou sur l'icône d'ajout à côté. Elle est immédiatement ajoutée au rôle.

L'utilisateur disposera de toutes les autorisations associées à ce rôle dès sa prochaine connexion.

## Modifier les autorisations d'un rôle {#editing-role-permissions}

1. Dans le menu Accès rapide, choisissez **Paramètres > Rôles**.
2. Cliquez sur le rôle que vous souhaitez modifier.
3. Dans la section **Modifier les autorisations**, développez un groupe d'autorisations (comme **Personnes et groupes**, **Dons** ou **Fréquentation**) et cochez ou décochez les autorisations que vous souhaitez attribuer au rôle. Chaque groupe indique combien de ses autorisations sont cochées (par exemple, **2 sur 5**). Saisissez dans **Filtrer les autorisations** pour retrouver une autorisation par son nom.
4. Chaque modification est enregistrée dès que vous cochez ou décochez une case.

:::tip
Appliquez le principe du moindre privilège : n'accordez à chaque rôle que les autorisations dont il a réellement besoin. Cela protège vos données et réduit le risque de modifications accidentelles.
:::

## Exemples de rôles courants {#common-role-examples}

- **Personnel de bureau** -- accès aux Personnes, Dons, Fréquentation et Formulaires
- **Responsables de groupe** -- accès aux [Groupes](../groups/creating-groups.md) uniquement
- **Bénévoles du pointage** -- l'autorisation de fréquentation **Pointage**, dont a besoin le compte connecté à une [borne de pointage](../attendance/check-in.md)
- **Équipe financière** -- accès aux [Dons](../donations/recording-donations.md) et aux rapports
- **Équipe de comptage** -- **Saisir les dons** et **Voir les dons**, pour que les bénévoles puissent saisir l'offrande dans les lots ouverts sans voir les récapitulatifs des dons

Consultez [Rôles et autorisations](../settings/roles-permissions.md) pour une présentation plus détaillée des autorisations relatives aux dons et aux personnes.
