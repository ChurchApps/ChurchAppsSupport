---
title: "Attribuer des rôles"
---

# Attribuer des rôles

<div class="article-intro">

B1 Admin utilise un système d'autorisations fondé sur les rôles pour contrôler ce que chaque utilisateur de votre équipe peut voir et faire. En attribuant des rôles, vous donnez au personnel et aux bénévoles accès exactement aux domaines dont ils ont besoin -- et rien de plus. Une bonne gestion des rôles protège les données de votre église tout en permettant à votre équipe de travailler efficacement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'accès **Administrateur de domaine** ou d'un rôle autorisé à gérer les **Paramètres** dans B1 Admin.
- Les personnes à qui vous voulez attribuer des rôles doivent déjà exister dans votre répertoire. Voir [Ajouter des personnes](adding-people.md) si vous devez d'abord les ajouter.

</div>

## Comprendre les rôles

Un rôle est un ensemble d'autorisations que vous attribuez à un ou plusieurs utilisateurs. Par exemple, vous pourriez créer un rôle « Équipe financière » qui donne accès aux [registres de dons](../donations/recording-donations.md), ou un rôle « Bénévole au pointage » qui n'autorise que l'accès aux [fonctions de présences](../attendance/check-in.md).

Chaque rôle contrôle l'accès à des domaines précis de B1 Admin, notamment :

- **Personnes** -- consulter et modifier les profils des membres. La section Notes d'une fiche de personne exige **Modifier les personnes**, et une autorisation distincte **Voir les notes confidentielles** contrôle l'accès à la section Notes confidentielles (pour les soins pastoraux, l'historique personnel et les notes sensibles semblables). **Voir les noms des personnes uniquement** permet de rechercher des personnes par nom (en ne voyant que le nom, la photo et le statut de membre) sans accéder au répertoire complet. Combinée à **Voir les présences** ou **Modifier les présences**, elle permet à un bénévole d'ouvrir **Groupes** et de voir les listes de classe par nom ; avec **Modifier les présences**, il peut aussi [enregistrer les présences](../attendance/recording-attendance.md). Voir [Noms des personnes uniquement](../settings/roles-permissions.md#people-names-only).
- **Dons** -- gérer les contributions et les rapports financiers. **Saisir les dons** est une option plus restreinte pour les équipes de comptage : elle permet de saisir des dons, mais seulement dans les [lots](../donations/batches.md#who-can-change-a-batch) encore ouverts.
- **Présences** -- enregistrer et consulter les données de présence
- **Formulaires** -- créer et gérer les [formulaires personnalisés](../forms/creating-forms.md)
- **Groupes** -- gérer les [appartenances aux groupes](../groups/group-members.md) et les calendriers
- **Paramètres** -- configurer les paramètres de l'ensemble de l'église

:::warning
Les **Administrateurs de domaine** ont un accès complet à tous les domaines de B1 Admin. Leurs autorisations ne peuvent être ni modifiées ni restreintes. Utilisez ce rôle uniquement pour vos administrateurs principaux.
:::

## Consulter et gérer les rôles

1. Ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin) et développez **Paramètres**.
2. Cliquez sur **Rôles**.
3. Vous verrez la liste de tous les rôles configurés pour votre église, avec une colonne **Membres** indiquant le nombre d'utilisateurs dans chaque rôle.
4. Cliquez sur un rôle pour voir ses membres et ses autorisations.

## Ajouter des utilisateurs à un rôle

1. Dans le menu de navigation rapide, choisissez **Paramètres > Rôles**.
2. Cliquez sur le rôle auquel vous voulez ajouter un utilisateur.
3. Dans la section **Membres**, recherchez la personne par nom.
4. Cliquez sur **Ajouter** pour l'attribuer au rôle.

L'utilisateur disposera de toutes les autorisations associées à ce rôle la prochaine fois qu'il se connectera.

## Modifier les autorisations d'un rôle

1. Dans le menu de navigation rapide, choisissez **Paramètres > Rôles**.
2. Cliquez sur le rôle que vous voulez modifier.
3. Dans la section **Autorisations**, cochez ou décochez les domaines auxquels vous voulez que le rôle ait accès. Chaque groupe d'autorisations indique combien de ses autorisations sont cochées (par exemple **2 sur 5**).
4. Chaque modification est enregistrée dès que vous cochez ou décochez une case.

:::tip
Appliquez le principe du moindre privilège -- n'accordez à chaque rôle que les autorisations dont il a réellement besoin. Cela protège vos données et réduit le risque de modifications accidentelles.
:::

## Exemples courants de rôles

- **Personnel de bureau** -- accès à Personnes, Dons, Présences et Formulaires
- **Responsables de groupe** -- accès aux [Groupes](../groups/creating-groups.md) seulement
- **Bénévoles au pointage** -- l'autorisation de présences **Pointage**, dont a besoin le compte connecté à une [borne de pointage](../attendance/check-in.md)
- **Équipe financière** -- accès aux [Dons](../donations/recording-donations.md) et aux rapports
- **Équipe de comptage** -- **Saisir les dons** et **Voir les dons**, afin que les bénévoles puissent saisir l'offrande dans les lots ouverts sans voir les résumés des dons

Consultez [Rôles et autorisations](../settings/roles-permissions.md) pour un examen plus détaillé des autorisations relatives aux dons et aux personnes.
