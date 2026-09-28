---
title: "Ajouter des personnes"
---

# Ajouter des personnes

<div class="article-intro">

La section Personnes est la base de B1 Admin — c'est la base de données des membres de votre église. Chaque autre fonctionnalité (groupes, participation, dons, formulaires) se rattache à des enregistrements de personnes. Ce guide vous montre comment ajouter quelqu'un à votre base de données, modifier ses détails et lier les membres de la famille dans les ménages.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez avoir un compte B1 Admin actif avec la permission de gérer les personnes. Consultez [Rôles et autorisations](roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Si vous ajoutez plus de quelques personnes, envisagez plutôt d'utiliser l'outil [Importation CSV](importing-data.md).

</div>

## Ajouter une personne

1. Accédez au tableau de bord B1.church Admin.
2. Ouvrez le **menu de section** dans le coin supérieur gauche et choisissez **Personnes**.
3. Cliquez sur le bouton **Ajouter une personne** dans le coin supérieur droit.
4. Remplissez le prénom, le nom de famille et l'adresse e-mail de la personne, puis cliquez sur **Ajouter**.

La page de profil de la personne s'ouvrira, prête pour que vous ajoutiez plus de détails.

:::tip
Si vous migrez depuis un autre système de gestion d'église, la fonction [Importer des données](importing-data.md) vous permet d'apporter tout votre répertoire à partir d'un fichier CSV - beaucoup plus rapide que d'ajouter des personnes une par une.
:::

### Avertissements de doublon

Si l'adresse e-mail (ou, lors de la création d'une personne à partir du formulaire d'édition complet, le numéro de téléphone ou la correspondance du prénom + nom de famille + date de naissance) correspond à quelqu'un d'autre dans votre base de données, une boîte de dialogue **Possible Doublon** apparaît avant l'enregistrement de la nouvelle personne. Il répertorie chaque personne correspondante ainsi que son e-mail, son téléphone et sa date de naissance pour que vous puissiez les comparer.

- Cliquez sur **Utiliser l'existant** à côté d'une correspondance pour utiliser le dossier de cette personne au lieu de créer un nouveau.
- Cliquez sur **Créer quand même** pour ajouter la nouvelle personne bien qu'une correspondance possible ait été trouvée.

Cela ne recherche les doublons que lorsque vous créez une toute nouvelle personne - l'édition d'un enregistrement existant ne le déclenche jamais. Il empêche uniquement les nouveaux doublons ; il ne fusionne pas deux enregistrements qui existent déjà.

## Éditer les détails

1. Sur la page de profil de la personne, cliquez sur l'**icône de crayon de modification** à côté de son nom.
2. Remplissez les informations supplémentaires telles que le deuxième prénom, l'état d'adhésion, les dates, l'adresse, les numéros de téléphone et (pour les enfants et les étudiants) la classe et l'école.
3. Cliquez sur **Enregistrer** pour stocker les informations personnelles.

Le profil inclut également plusieurs onglets pour les informations connexes :

- **Notes** — Ajouter des notes sur la personne (soins pastoraux, suivi, etc.)
- **Groupes** — Afficher et gérer les [adhésions au groupe](../groups/group-members.md)
- **Participation** — Afficher l'historique des visites individuelles de cette personne, y compris le campus, le service, l'heure de service, le groupe et une colonne **Enregistré** avec l'heure d'enregistrement du kiosque (affichée comme un tiret pour les visites enregistrées sans enregistrement du kiosque). Pour les tendances de l'église entière plutôt que l'historique d'une seule personne, voir [Suivi de la participation](../attendance/tracking-attendance.md)
- **Dons** — Afficher l'[historique des dons](../donations/recording-donations.md)

## Travailler avec des formulaires

Vous pouvez remplir des formulaires personnalisés directement à partir du profil d'une personne. Ce sont des formulaires définis par l'utilisateur que vous pouvez créer en suivant le guide [Créer des formulaires](../forms/creating-forms.md).

1. Sur le profil de la personne, cliquez sur la liste déroulante **Formulaires** pour sélectionner un formulaire.
2. Cliquez sur **Ajouter un formulaire** pour l'ouvrir.
3. Remplissez les détails du formulaire et cliquez sur **Enregistrer**.

Une fois qu'un formulaire est soumis, cliquez sur l'**icône d'impression** à côté pour imprimer les réponses remplies par cette personne.

:::info
Les formulaires liés au profil d'une personne utilisent le type de formulaire **Personnes**. Si vous avez besoin d'un formulaire autonome (comme une inscription à un événement), consultez l'option [formulaire autonome](../forms/creating-forms.md) dans le guide des formulaires.
:::

:::tip
Si vous n'avez besoin de suivre qu'une ou deux informations supplémentaires sur les personnes - une date, un nombre, une réponse oui/non - utilisez [Champs personnalisés](../settings/custom-fields.md) à la place d'un formulaire. Ils sont plus rapides à remplir et sont consultables directement dans Recherche avancée.
:::

## Gestion des ménages

Les ménages vous permettent de lier les membres de la famille ensemble. Ceci est particulièrement utile pour l'[enregistrement](../attendance/check-in.md), où un parent peut enregistrer tous ses enfants à la fois.

1. Sur le profil d'une personne, cliquez sur l'**icône de crayon de modification** à côté du nom du ménage.
2. L'éditeur de ménage s'ouvrira. Sélectionnez le **rôle du ménage** pour la personne actuelle (par exemple, Responsable, Conjoint, Enfant).
3. Cliquez sur **Ajouter** pour ajouter un autre membre du ménage.
4. Tapez le nom de la personne dans la zone de recherche et cliquez sur **Rechercher**.
5. Quand la personne apparaît dans les résultats de recherche, cliquez sur **Sélectionner**.
6. Choisissez son rôle dans le ménage et cliquez sur **Enregistrer** pour terminer la configuration du ménage.
