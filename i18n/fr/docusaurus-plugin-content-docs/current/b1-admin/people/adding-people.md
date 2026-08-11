---
title: "Ajouter des personnes"
---

# Ajouter des personnes

<div class="article-intro">

La section Personnes est la fondation de B1 Admin — c'est la base de données des membres de votre église. Chaque autre fonction (groupes, présence, donations, formulaires) est liée aux dossiers de personne. Ce guide vous fait traverser l'ajout de quelqu'un à votre base de données, la modification de ses détails et la liaison des membres de la famille dans les ménages.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec la permission de gérer les personnes. Voir [Rôles et permissions](roles-permissions.md) si vous n'êtes pas sûr de votre niveau d'accès.
- Si vous ajoutez plus que quelques personnes, envisagez plutôt d'utiliser l'outil [Importation CSV](importing-data.md).

</div>

## Ajouter une personne

1. Naviguez vers le tableau de bord B1.church Admin.
2. Ouvrez le **menu de section** dans le coin supérieur gauche et choisissez **Personnes**.
3. Cliquez sur le bouton **Ajouter une personne** dans le coin supérieur droit.
4. Remplissez le prénom, le nom de famille et l'adresse e-mail de la personne, puis cliquez sur **Ajouter**.

La page de profil de la personne s'ouvrira, prête pour que vous ajoutiez plus de détails.

:::tip
Si vous migrez depuis un autre système de gestion d'église, la fonction [Importation de données](importing-data.md) vous permet d'apporter tout votre répertoire à partir d'un fichier CSV — beaucoup plus rapide qu'ajouter des gens un par un.
:::

## Modification des détails

1. Sur la page de profil de la personne, cliquez sur le **crayon de modification** à côté de son nom.
2. Remplissez les informations supplémentaires telles que le deuxième prénom, l'état d'adhésion, les dates, l'adresse, les numéros de téléphone et (pour les enfants et les étudiants) le niveau et l'école.
3. Cliquez sur **Enregistrer** pour stocker les informations personnelles.

Le profil inclut aussi plusieurs onglets pour les informations connexes :

- **Notes** — Ajoutez des notes sur la personne (soins pastoraux, suivi, etc.)
- **Groupes** — Afficher et gérer les [adhésions au groupe](../groups/group-members.md)
- **Présence** — Afficher les [dossiers de présence](../attendance/tracking-attendance.md)
- **Donations** — Afficher l'[historique des donations](../donations/recording-donations.md)

## Travail avec les formulaires

Vous pouvez remplir des formulaires personnalisés directement depuis le profil d'une personne. Ce sont des formulaires définis par l'utilisateur que vous pouvez créer en suivant le guide [Création de formulaires](../forms/creating-forms.md).

1. Sur le profil de la personne, cliquez sur le menu déroulant **Formulaires** pour sélectionner un formulaire.
2. Cliquez sur **Ajouter un formulaire** pour l'ouvrir.
3. Remplissez les détails du formulaire et cliquez sur **Enregistrer**.

:::info
Les formulaires liés au profil d'une personne utilisent le type de formulaire **Personnes**. Si vous avez besoin d'un formulaire autonome (comme une inscription à un événement), voir l'option de formulaire [Autonome](../forms/creating-forms.md) dans le guide des formulaires.
:::

:::tip
Si vous avez seulement besoin de suivre un ou deux éléments supplémentaires sur les personnes -- une date, un nombre, une réponse oui/non -- utilisez [Champs personnalisés](../settings/custom-fields.md) à la place d'un formulaire. Ils sont plus rapides à remplir et sont recherchables directement dans la Recherche avancée.
:::

## Gestion des ménages

Les ménages vous permettent de lier les membres de la famille ensemble. Ceci est particulièrement utile pour l'[enregistrement](../attendance/check-in.md), où un parent peut enregistrer tous ses enfants à la fois.

1. Sur le profil d'une personne, cliquez sur le **crayon de modification** à côté du nom du ménage.
2. L'éditeur de ménage s'ouvrira. Sélectionnez le **rôle du ménage** pour la personne actuelle (par exemple, Chef, Conjoint, Enfant).
3. Cliquez sur **Ajouter** pour ajouter un autre membre du ménage.
4. Tapez le nom de la personne dans la zone de recherche et cliquez sur **Rechercher**.
5. Quand la personne apparaît dans les résultats de la recherche, cliquez sur **Sélectionner**.
6. Choisissez son rôle du ménage et cliquez sur **Enregistrer** pour compléter la configuration du ménage.
