---
title: "Ajout de personnes"
---

# Ajout de personnes

<div class="article-intro">

La section Personnes est le fondement de B1 Admin -- c'est la base de données des membres de votre église. Toutes les autres fonctionnalités (groupes, présence, dons, formulaires) se rattachent aux enregistrements de personne. Ce guide vous guide à travers l'ajout de quelqu'un à votre base de données, la modification de ses détails et la liaison des membres de la famille dans les ménages.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec la permission de gérer les personnes. Consultez [Rôles et autorisations](roles-permissions.md) si vous n'êtes pas sûr de votre niveau d'accès.
- Si vous ajoutez plus que quelques personnes, envisagez d'utiliser plutôt l'outil [Importer CSV](importing-data.md).

</div>

## Ajout d'une personne

1. Allez au tableau de bord B1.church Admin.
2. Cliquez sur **Personnes** dans la barre latérale de gauche.
3. Cliquez sur le bouton **Ajouter une personne** dans le coin supérieur droit.
4. Remplissez le prénom, le nom et l'adresse e-mail de la personne, puis cliquez sur **Ajouter**.

La page de profil de la personne s'ouvrira, prête pour vous à ajouter plus de détails.

:::tip
Si vous migrez à partir d'un autre système de gestion d'église, la fonction [Importer des données](importing-data.md) vous permet d'importer tout votre répertoire à partir d'un fichier CSV -- beaucoup plus rapide que d'ajouter des personnes une à une.
:::

## Modification des détails

1. Sur la page de profil de la personne, cliquez sur le **crayon d'édition** à côté de son nom.
2. Remplissez les informations supplémentaires telles que le deuxième prénom, le statut d'adhésion, les dates, l'adresse et les numéros de téléphone.
3. Cliquez sur **Enregistrer** pour stocker les informations personnelles.

Le profil comprend également plusieurs onglets pour les informations connexes :

- **Notes** -- Ajouter des notes sur la personne (soins pastoraux, suivi, etc.)
- **Groupes** -- Afficher et gérer les [adhésions au groupe](../groups/group-members.md)
- **Présence** -- Afficher les [enregistrements de présence](../attendance/tracking-attendance.md)
- **Dons** -- Afficher l'[historique des dons](../donations/recording-donations.md)

## Utilisation de formulaires

Vous pouvez remplir des formulaires personnalisés directement à partir du profil d'une personne. Ce sont des formulaires définis par l'utilisateur que vous pouvez créer en suivant le guide [Création de formulaires](../forms/creating-forms.md).

1. Sur le profil de la personne, cliquez sur la liste déroulante **Formulaires** pour sélectionner un formulaire.
2. Cliquez sur **Ajouter un formulaire** pour l'ouvrir.
3. Remplissez les détails du formulaire et cliquez sur **Enregistrer**.

:::info
Les formulaires liés au profil d'une personne utilisent le type de formulaire **Personnes**. Si vous avez besoin d'un formulaire autonome (comme une enregistrement d'événement), consultez l'option [formulaire autonome](../forms/creating-forms.md) dans le guide des formulaires.
:::

:::tip
Si vous avez seulement besoin de suivre un ou deux éléments supplémentaires sur les personnes -- une date, un nombre, une réponse oui/non -- utilisez plutôt les [champs personnalisés](../settings/custom-fields.md). Ils sont plus rapides à remplir et sont directement recherchables dans la recherche avancée.
:::

## Gestion des ménages

Les ménages vous permettent de lier les membres de la famille ensemble. Ceci est particulièrement utile pour l'[enregistrement](../attendance/check-in.md), où un parent peut enregistrer tous ses enfants à la fois.

1. Sur le profil d'une personne, cliquez sur le **crayon d'édition** à côté du nom du ménage.
2. L'éditeur de ménage s'ouvrira. Sélectionnez le **rôle du ménage** pour la personne actuelle (par exemple, Chef, Époux/épouse, Enfant).
3. Cliquez sur **Ajouter** pour ajouter un autre membre du ménage.
4. Tapez le nom de la personne dans la zone de recherche et cliquez sur **Rechercher**.
5. Quand la personne apparaît dans les résultats de la recherche, cliquez sur **Sélectionner**.
6. Choisissez son rôle dans le ménage et cliquez sur **Enregistrer** pour terminer la configuration du ménage.
