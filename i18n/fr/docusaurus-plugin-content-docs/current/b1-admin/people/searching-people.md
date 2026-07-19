---
title: "Recherche de personnes"
---

# Recherche de personnes

<div class="article-intro">

La page **Personnes** affiche votre répertoire d'église dans un tableau recherchable et triable. Vous pouvez rapidement trouver n'importe qui dans votre congrégation, personnaliser les informations affichées et exporter vos résultats. Une recherche efficace est essentielle pour les tâches quotidiennes d'administration d'église comme le suivi des visiteurs, la préparation des listes de contacts et la gestion des enregistrements des membres.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec la permission de voir les personnes. Consultez [Rôles et autorisations](roles-permissions.md) si vous n'êtes pas sûr de votre niveau d'accès.
- Votre répertoire d'église doit avoir des personnes. Si vous n'avez pas encore ajouté quelqu'un, consultez [Ajout de personnes](adding-people.md) ou [Importation de données](importing-data.md).

</div>

## Recherche rapide

La barre de recherche en haut de la page Personnes vous permet de trouver des membres en temps réel :

1. Cliquez sur la **zone de recherche** en haut de la page Personnes.
2. Commencez à taper un nom, une adresse e-mail ou un autre mot-clé.
3. Les résultats se filtreront automatiquement à mesure que vous tapez (il y a un délai d'environ une demi-seconde afin que la recherche ne s'exécute pas à chaque frappe).
4. Le tableau ci-dessous se met à jour pour afficher uniquement les résultats correspondants.

:::tip
Vous n'avez pas besoin d'appuyer sur Entrée. La recherche s'exécute automatiquement après que vous ayez cessé de taper.
:::

## Tri des résultats

Vous pouvez trier le répertoire en cliquant sur n'importe quel en-tête de colonne dans le tableau :

1. Cliquez sur un **en-tête de colonne** (par exemple, **Nom** ou **E-mail**) pour trier par cette colonne.
2. Cliquez sur le même en-tête à nouveau pour inverser l'ordre de tri.

Cela facilite la recherche alphabétique des gens, par âge ou par toute autre colonne visible.

## Personnalisation des colonnes

Il n'est pas nécessaire que toutes les informations soient visibles à la fois. Vous pouvez choisir les colonnes qui apparaissent dans le tableau :

1. Recherchez la **liste déroulante de sélection de colonne** près du haut du tableau.
2. Cochez ou décochez les colonnes pour les afficher ou les masquer. Les colonnes disponibles incluent :
   - **Photo**
   - **Nom**
   - **E-mail**
   - **Téléphone**
   - **Adresse**
   - **Date de naissance**
   - **Âge**
   - **Sexe**
   - **Statut d'adhésion**
   - **Campus**
3. Le tableau se met à jour immédiatement pour refléter vos sélections.

:::info
Vos choix de colonnes affectent ce qui est inclus lorsque vous exportez en CSV. Personnalisez les colonnes avant d'exporter pour obtenir exactement les données dont vous avez besoin.
:::

## Pagination

Quand votre répertoire a de nombreux enregistrements, les résultats sont divisés sur plusieurs pages. Utilisez les **contrôles de pagination** en bas du tableau pour vous déplacer entre les pages. La page actuelle et le nombre total d'enregistrements sont affichés afin que vous sachiez toujours où vous vous trouvez dans la liste.

:::tip
Si vous souhaitez voir plus de résultats à la fois, affinez votre recherche pour réduire la liste plutôt que de naviguer dans un grand répertoire.
:::

## Exportation des résultats de recherche

Vous pouvez télécharger vos résultats de recherche actuels sous forme de fichier CSV à tout moment :

1. Appliquez les recherches ou filtres que vous souhaitez.
2. Personnalisez vos colonnes pour inclure les données dont vous avez besoin.
3. Cliquez sur le bouton **Exporter**.
4. Un fichier CSV téléchargera sur votre ordinateur, prêt à être ouvert dans Excel, Google Sheets ou toute application de feuille de calcul.

Pour plus de détails sur l'exportation, consultez [Exportation de données](./exporting-data.md).

:::tip
Pour des requêtes plus avancées -- comme trouver tous ceux qui n'ont pas participé au cours des trois derniers mois -- essayez la fonction [Recherche AI](./ai-search.md), qui vous permet de rechercher en utilisant des questions en langage naturel.
:::

## Recherche avancée

La recherche avancée vous permet de créer des filtres précis en combinant des conditions. Ouvrez-la à partir de la page Personnes, puis développez une catégorie et cochez les champs sur lesquels vous souhaitez filtrer, en choisissant un opérateur et une valeur pour chacun. Les catégories incluent **Noms**, **Démographie**, **Contact**, **Adhésion**, **Activité** (dons et présence) et **Champs personnalisés**.

La catégorie **Champs personnalisés** énumère les [champs personnalisés](../settings/custom-fields.md) de votre église -- les champs que vous définissez dans les paramètres pour suivre vos propres informations (comme une date d'expiration de vérification d'antécédents). Les opérateurs proposés correspondent au type de chaque champ : les champs de texte supportent *contient / égale / commence par / se termine par*, les champs numériques supportent les opérateurs de comparaison, les champs de date supportent *égale / après / avant*, et les champs Oui/Non et Choix multiple vous permettent de choisir une valeur. N'importe quel champ sur lequel vous pouvez filtrer ici peut être enregistré en tant que [liste](./lists.md) active.

## Enregistrement des recherches en tant que listes

Après avoir exécuté une recherche, un bouton **Enregistrer comme liste** (icône signet) apparaît dans l'en-tête de la page Personnes. Cliquez-le pour stocker votre requête actuelle sous un nom et une catégorie optionnelle, afin que vous puissiez le recharger instantanément dans les futures sessions. Consultez [Listes enregistrées](./lists.md) pour tous les détails.
