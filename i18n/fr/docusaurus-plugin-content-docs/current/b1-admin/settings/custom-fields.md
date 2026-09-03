---
title: "Champs Personnalisés"
---

# Champs Personnalisés

<div class="article-intro">

Les **Champs Personnalisés** vous permettent de suivre vos propres informations sur chaque dossier de personne — des choses que B1 n'a pas de champ intégré pour, comme une date d'expiration de vérification antécédents, une taille de T-shirt, ou un statut de classe de baptême. Vous définissez un champ une fois dans les Paramètres, puis remplissez une valeur sur le profil de chaque personne et recherchez ou construisez des listes dessus. Cela remplace l'ancienne solution de contournement de création d'un formulaire Personnes juste pour stocker une seule donnée personnalisée.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission d'édition **Personnes** pour définir les champs et remplir les valeurs, et d'accès à la zone **Paramètres**. Quiconque ayant la permission de voir Personnes peut voir les valeurs. Voir [Rôles et Permissions](./roles-permissions.md).
- Décidez ce que vous voulez suivre et quel type correspond le mieux (texte, un nombre, une date, une réponse oui/non, ou une liste de sélection) avant de commencer.

</div>

## Ouverture des Champs Personnalisés

Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche), choisissez **Paramètres**, et sélectionnez la carte **Champs Personnalisés**. Vous pouvez aussi y aller directement à **/settings/custom-fields**. Vous verrez une liste de chaque champ que vous avez défini, affichant son **Nom** et **Type de Champ**. Si vous n'en avez pas créé, le panneau dit *"Aucun champ personnalisé n'a été ajouté pour le moment."*

## Ajout d'un Champ

1. Cliquez sur **Ajouter un Champ**.
2. Dans l'éditeur qui s'ouvre à droite, entrez un **Nom** — c'est l'étiquette que le personnel verra sur les profils de personne et dans la recherche (par exemple, *La vérification antécédents expire*).
3. Choisissez un **Type de Champ** :
   - **Boîte de Texte** — texte court en libre accès.
   - **Nombre Entier** — nombres sans décimales (par exemple, un comptage).
   - **Décimal** — nombres qui peuvent inclure des décimales.
   - **Date** — une date de calendrier.
   - **Oui/Non** — une simple réponse oui ou non.
   - **Choix Multiples** — une liste de sélection. Lorsque vous choisissez ce type, un **éditeur de choix** apparaît pour que vous puissiez ajouter chaque option que les gens peuvent sélectionner.
4. Cliquez sur **Enregistrer**.

Le champ est maintenant disponible sur le profil de chaque personne.

:::info
Les types de champ sont le même ensemble utilisé pour les [questions de formulaire](../forms/creating-forms.md), donc les valeurs se comportent de manière cohérente dans B1.
:::

## Édition d'un Champ

Cliquez sur n'importe quelle ligne de champ dans la liste pour la rouvrir dans l'éditeur. Modifiez le nom, le type ou les choix et cliquez sur **Enregistrer**.

:::warning
Changer le **Type de Champ** d'un champ qui a déjà des valeurs (par exemple, de Boîte de Texte à Date) peut laisser les valeurs précédemment saisies dans un format qui ne correspond plus au nouveau type. Changez les types avec soin une fois que le personnel a commencé à remplir le champ.
:::

## Suppression d'un Champ

Ouvrez un champ pour édition et cliquez sur **Supprimer**. On vous demandera de confirmer : *"Êtes-vous sûr de vouloir supprimer ce champ personnalisé? Ses valeurs stockées seront également supprimées."* Supprimer un champ supprime définitivement **et chaque valeur stockée pour lui** sur toutes les personnes — cela ne peut pas être annulé.

## Remplissage des Valeurs sur une Personne

Une fois qu'au moins un champ personnalisé existe, ses valeurs vivent directement aux côtés des détails intégrés sur chaque dossier de personne — vous les affichez dans **Détails Personnels** et les modifiez sur le même formulaire que vous utilisez pour le reste des informations de la personne. Rien d'extra n'apparaît jusqu'à ce que vous ayez défini votre premier champ.

1. Ouvrez un dossier de personne dans **Personnes**.
