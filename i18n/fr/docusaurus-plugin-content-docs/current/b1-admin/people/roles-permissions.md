---
title: "Attribution des rôles"
---

# Attribution des rôles

<div class="article-intro">

B1 Admin utilise un système de permissions basé sur les rôles pour contrôler ce que chaque utilisateur de votre équipe peut voir et faire. En attribuant des rôles, vous pouvez donner au personnel et aux bénévoles l'accès exactement aux zones dont ils ont besoin -- et rien de plus. Une bonne gestion des rôles protège les données de votre église tout en permettant à votre équipe de travailler efficacement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un accès **Administrateur de domaine** ou d'un rôle avec la permission de gérer les **Paramètres** dans B1 Admin.
- Les personnes auxquelles vous souhaitez attribuer des rôles doivent déjà exister dans votre annuaire. Consultez [Ajouter des personnes](adding-people.md) si vous devez d'abord les ajouter.

</div>

## Comprendre les rôles

Un rôle est un ensemble de permissions que vous attribuez à un ou plusieurs utilisateurs. Par exemple, vous pourriez créer un rôle « Équipe financière » qui accorde l'accès aux [registres de dons](../donations/recording-donations.md), ou un rôle « Bénévole d'enregistrement » qui n'autorise l'accès qu'aux [fonctionnalités de présences](../attendance/check-in.md).

Chaque rôle contrôle l'accès à des zones spécifiques de B1 Admin, notamment :

- **Personnes** -- consultation et modification des profils de membres
- **Dons** -- gestion des contributions et des rapports financiers
- **Présences** -- enregistrement et consultation des données de présences
- **Formulaires** -- création et gestion des [formulaires personnalisés](../forms/creating-forms.md)
- **Groupes** -- gestion des [appartenances aux groupes](../groups/group-members.md) et des calendriers
- **Paramètres** -- configuration des paramètres à l'échelle de l'église

:::warning
Les **Administrateurs de domaine** ont un accès complet à toutes les zones de B1 Admin. Leurs permissions ne peuvent pas être modifiées ni restreintes. N'utilisez ce rôle que pour vos administrateurs principaux.
:::

## Consulter et gérer les rôles

1. Cliquez sur **Paramètres** dans la barre latérale gauche.
2. Cliquez sur **Rôles** dans la navigation supérieure.
3. Vous verrez une liste de tous les rôles configurés pour votre église.
4. Cliquez sur n'importe quel rôle pour voir ses membres et ses permissions.

## Ajouter des utilisateurs à un rôle

1. Accédez à **Paramètres** puis **Rôles**.
2. Cliquez sur le rôle auquel vous souhaitez ajouter un utilisateur.
3. Dans la section **Membres**, recherchez la personne par son nom.
4. Cliquez sur **Ajouter** pour l'affecter au rôle.

L'utilisateur disposera de toutes les permissions associées à ce rôle lors de sa prochaine connexion.

## Modifier les permissions d'un rôle

1. Accédez à **Paramètres** puis **Rôles**.
2. Cliquez sur le rôle que vous souhaitez modifier.
3. Dans la section **Permissions**, cochez ou décochez les zones auxquelles vous souhaitez que le rôle ait accès.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

:::tip
Suivez le principe du moindre privilège -- n'accordez à chaque rôle que les permissions dont il a vraiment besoin. Cela protège vos données et réduit le risque de modifications accidentelles.
:::

## Exemples de rôles courants

- **Personnel administratif** -- accès aux Personnes, Dons, Présences et Formulaires
- **Responsables de groupe** -- accès aux [Groupes](../groups/creating-groups.md) uniquement
- **Bénévoles d'enregistrement** -- accès aux [Présences](../attendance/check-in.md) uniquement
- **Équipe financière** -- accès aux [Dons](../donations/recording-donations.md) et aux rapports
