---
title: "Ajouter des personnes"
---

# Ajouter des personnes

<div class="article-intro">

La section Personnes est le fondement de B1 Admin — c'est la base de données des membres de votre église. Toutes les autres fonctionnalités (groupes, présences, dons, formulaires) sont rattachées aux fiches de personnes. Ce guide vous accompagne pour ajouter quelqu'un à votre base de données, modifier ses informations, et relier les membres d'une famille en foyers.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec l'autorisation de gérer les personnes. Consultez [Rôles et autorisations](roles-permissions.md) si vous n'êtes pas sûr de votre niveau d'accès.
- Si vous ajoutez plus qu'une poignée de personnes, envisagez plutôt d'utiliser l'outil d'[Import CSV](importing-data.md).

</div>

## Ajouter une personne

1. Accédez au tableau de bord Admin de B1.church.
2. Cliquez sur **Personnes** dans la barre latérale gauche.
3. Cliquez sur le bouton **Ajouter une personne** en haut à droite.
4. Renseignez le prénom, le nom et l'adresse e-mail de la personne, puis cliquez sur **Ajouter**.

La page de profil de la personne s'ouvrira, prête pour que vous ajoutiez plus de détails.

:::tip
Si vous migrez depuis un autre système de gestion d'église, la fonctionnalité [Importer des données](importing-data.md) vous permet d'importer tout votre annuaire depuis un fichier CSV — bien plus rapide que d'ajouter les personnes une par une.
:::

## Modifier les détails

1. Sur la page de profil de la personne, cliquez sur le **crayon de modification** à côté de son nom.
2. Renseignez des informations supplémentaires comme le deuxième prénom, le statut de membre, les dates, l'adresse, les numéros de téléphone, et (pour les enfants et les étudiants) la classe et l'école.
3. Cliquez sur **Enregistrer** pour sauvegarder les informations personnelles.

Le profil comprend également plusieurs onglets pour des informations connexes :

- **Notes** — Ajouter des notes sur la personne (soin pastoral, suivis, etc.)
- **Groupes** — Voir et gérer les [adhésions aux groupes](../groups/group-members.md)
- **Présences** — Voir les [enregistrements de présence](../attendance/tracking-attendance.md)
- **Dons** — Voir l'[historique des dons](../donations/recording-donations.md)

## Travailler avec les formulaires

Vous pouvez remplir des formulaires personnalisés directement depuis le profil d'une personne. Il s'agit de formulaires définis par l'utilisateur que vous pouvez créer en suivant le guide [Créer des formulaires](../forms/creating-forms.md).

1. Sur le profil de la personne, cliquez sur le menu déroulant **Formulaires** pour sélectionner un formulaire.
2. Cliquez sur **Ajouter un formulaire** pour l'ouvrir.
3. Remplissez les détails du formulaire et cliquez sur **Enregistrer**.

:::info
Les formulaires liés au profil d'une personne utilisent le type de formulaire **Personnes**. Si vous avez besoin d'un formulaire autonome (comme une inscription à un événement), consultez l'option [Formulaire autonome](../forms/creating-forms.md) dans le guide des formulaires.
:::

:::tip
Si vous n'avez besoin de suivre qu'une ou deux informations supplémentaires sur les personnes — une date, un nombre, une réponse oui/non — utilisez les [Champs personnalisés](../settings/custom-fields.md) plutôt qu'un formulaire. Ils se remplissent plus rapidement et sont directement recherchables dans la Recherche avancée.
:::

## Gérer les foyers

Les foyers vous permettent de relier les membres d'une famille entre eux. Ceci est particulièrement utile pour l'[enregistrement (check-in)](../attendance/check-in.md), où un parent peut enregistrer tous ses enfants en une seule fois.

1. Sur le profil d'une personne, cliquez sur le **crayon de modification** à côté du nom du foyer.
2. L'éditeur de foyer s'ouvrira. Sélectionnez le **rôle dans le foyer** pour la personne actuelle (par ex. Chef de famille, Conjoint, Enfant).
3. Cliquez sur **Ajouter** pour ajouter un autre membre du foyer.
4. Saisissez le nom de la personne dans la zone de recherche et cliquez sur **Rechercher**.
5. Lorsque la personne apparaît dans les résultats de recherche, cliquez sur **Sélectionner**.
6. Choisissez son rôle dans le foyer et cliquez sur **Enregistrer** pour terminer la configuration du foyer.
