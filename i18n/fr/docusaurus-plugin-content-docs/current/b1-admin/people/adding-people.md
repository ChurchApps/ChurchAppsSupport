---
title: "Ajout de personnes"
---

# Ajout de personnes

<div class="article-intro">

La section Personnes est la base de B1 Admin — c'est la base de données des membres de votre église. Chaque autre fonctionnalité (groupes, présence, dons, formulaires) se rattache à des dossiers de personnes. Ce guide vous présente l'ajout de quelqu'un à votre base de données, l'édition de ses détails et la liaison des membres de la famille dans les ménages.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec la permission de gérer les personnes. Voir [Rôles et permissions](roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Si vous ajoutez plus que quelques personnes, envisagez d'utiliser l'outil [Importation CSV](importing-data.md) à la place.

</div>

## Ajouter une personne

1. Accédez au tableau de bord B1.church Admin.
2. Ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes**, et cliquez sur **Personnes**.
3. Cliquez sur le bouton **Ajouter une personne** dans le coin supérieur droit.
4. Remplissez le prénom, le nom de famille et l'adresse e-mail de la personne, puis cliquez sur **Ajouter**.

La page de profil de la personne s'ouvrira, prête pour que vous ajoutiez plus de détails.

:::tip
Si vous migrez d'un autre système de gestion d'église, la fonctionnalité [Importer les données](importing-data.md) vous permet d'importer votre répertoire entier à partir d'un fichier CSV — beaucoup plus rapide que d'ajouter des personnes une par une.
:::

### Avertissements de doublon

Si l'adresse e-mail (ou, lors de la création d'une personne à partir du formulaire d'édition complet, le numéro de téléphone ou la correspondance prénom + nom + date de naissance) correspond à quelqu'un qui se trouve déjà dans votre base de données, une boîte de dialogue **Doublon possible** apparaît avant l'enregistrement du nouveau dossier. Elle répertorie chaque personne correspondante ainsi que son e-mail, téléphone et date de naissance afin que vous puissiez les comparer.

- Cliquez sur **Utiliser l'existant** à côté d'une correspondance pour utiliser le dossier de cette personne au lieu de créer un nouveau.
- Cliquez sur **Créer quand même** pour ajouter la nouvelle personne même si une correspondance possible a été trouvée.

Cela ne vérifie que les doublons lors de la création d'une toute nouvelle personne — l'édition d'un enregistrement existant ne le déclenche jamais. Il empêche uniquement les nouveaux doublons ; il ne fusionne pas deux dossiers qui existent déjà.

## Éditer les détails

1. Sur la page de profil de la personne, cliquez sur le **crayon de modification** à côté de son nom.
2. Remplissez des informations supplémentaires telles que le deuxième prénom, le statut d'adhésion, les dates, l'adresse, les numéros de téléphone et (pour les enfants et les étudiants) le niveau scolaire et l'école.
3. Cliquez sur **Enregistrer** pour stocker les informations personnelles.

Le profil inclut également plusieurs onglets pour les informations connexes :

- **Notes** — Ajouter des notes sur la personne (soins pastoraux, suivi, etc.)
- **Groupes** — Afficher et gérer les [appartenances aux groupes](../groups/group-members.md)
- **Présence** — Afficher l'historique des visites individuelles de cette personne, y compris le site, le service, l'heure du service, le groupe, et une colonne **Enregistré** avec l'heure d'enregistrement au kiosque (affichée en tiret pour les visites enregistrées sans enregistrement au kiosque). Pour les tendances au niveau de l'église plutôt que l'historique d'une personne, voir [Suivi de la présence](../attendance/tracking-attendance.md)
- **Dons** — Afficher l'[historique des dons](../donations/recording-donations.md)

## Envoyer un e-mail à une personne

Si la personne a une adresse e-mail en dossier, un bouton **Envoyer un e-mail à cette personne** (icône d'enveloppe) apparaît dans l'en-tête du profil.

1. Sur le profil de la personne, cliquez sur l' **icône de l'enveloppe**.
2. Une boîte de dialogue **E-mail** intitulée avec le nom de la personne s'ouvre, affichant **Envoi à** avec l'adresse de la personne.
3. Optionnellement, choisissez un modèle enregistré à partir de **Charger le modèle (optionnel)**.
4. Entrez un **Sujet** et composez le message.
5. Cliquez sur **Envoyer l'e-mail**.

Pour écrire le message dans votre propre programme de courrier à la place, cliquez sur **Ouvrir dans mon application de messagerie**.

:::info
L'envoi depuis B1 utilise les mêmes approbations et limites quotidiennes que l'e-mail de groupe. Si votre église n'a pas encore été approuvée, la boîte de dialogue vous demande de demander un examen — vous pouvez toujours cliquer sur **Ouvrir dans mon application de messagerie** en attendant. Voir [Activation de l'e-mail de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church). Les utilisateurs sans permission d'éditer les membres du groupe vont directement à leur application de messagerie lorsqu'ils cliquent sur l'icône de l'enveloppe.
:::

## Travailler avec les formulaires

Vous pouvez remplir des formulaires personnalisés directement à partir du profil d'une personne. Ce sont des formulaires définis par l'utilisateur que vous pouvez créer en suivant le guide [Création de formulaires](../forms/creating-forms.md).

1. Sur le profil de la personne, cliquez sur la liste déroulante **Formulaires** pour sélectionner un formulaire.
2. Cliquez sur **Ajouter un formulaire** pour l'ouvrir.
3. Remplissez les détails du formulaire et cliquez sur **Enregistrer**.

Une fois qu'un formulaire est soumis, cliquez sur l' **icône d'impression** à côté de celui-ci pour imprimer les réponses remplies de cette personne.

Si une soumission s'est retrouvée sur la mauvaise personne, cliquez sur l'icône **Changer de personne** (deux flèches) à côté de celle-ci pour la déplacer vers quelqu'un d'autre ou la délier. Voir [Changer la personne sur une soumission](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Les formulaires liés au profil d'une personne utilisent le type de formulaire **Personnes**. Si vous avez besoin d'un formulaire autonome (comme une inscription à un événement), voir l'option [Formulaire autonome](../forms/creating-forms.md) dans le guide des formulaires.
:::

:::tip
Si vous devez uniquement suivre une ou deux pièces d'information supplémentaires sur les personnes — une date, un nombre, une réponse oui/non — utilisez [Champs personnalisés](../settings/custom-fields.md) à la place d'un formulaire. Ils sont plus rapides à remplir et sont recherchables directement dans la Recherche avancée.
:::

## Gestion des ménages

Les ménages vous permettent de lier les membres de la famille ensemble. Cela est particulièrement utile pour l' [enregistrement](../attendance/check-in.md), où un parent peut enregistrer tous ses enfants à la fois.

1. Sur le profil d'une personne, cliquez sur le **crayon de modification** à côté du nom du ménage.
2. L'éditeur de ménage s'ouvrira. Sélectionnez le **rôle du ménage** pour la personne actuelle (p. ex., Chef, Conjoint, Enfant).
3. Cliquez sur **Ajouter** pour ajouter un autre membre du ménage.
4. Tapez le nom de la personne dans la zone de recherche et cliquez sur **Rechercher**.
5. Lorsque la personne apparaît dans les résultats de la recherche, cliquez sur **Sélectionner**.
6. Choisissez leur rôle de ménage et cliquez sur **Enregistrer** pour terminer la configuration du ménage.
