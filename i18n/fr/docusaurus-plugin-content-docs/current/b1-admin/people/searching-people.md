---
title: "Rechercher des personnes"
---

# Rechercher des personnes

<div class="article-intro">

La page **Personnes** affiche votre annuaire d'église dans un tableau consultable et triable. Vous pouvez rapidement trouver n'importe qui dans votre congrégation, personnaliser les informations affichées, et exporter vos résultats. Une recherche efficace est essentielle pour les tâches administratives quotidiennes de l'église comme le suivi des visiteurs, la préparation de listes de contacts, et la gestion des dossiers de membres.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec l'autorisation de consulter les personnes. Consultez [Rôles et autorisations](roles-permissions.md) si vous n'êtes pas sûr de votre niveau d'accès.
- Votre annuaire d'église doit contenir des personnes. Si vous n'avez encore ajouté personne, consultez [Ajouter des personnes](adding-people.md) ou [Importer des données](importing-data.md).

</div>

## Recherche rapide

La barre de recherche en haut de la page Personnes vous permet de trouver des membres en temps réel :

1. Cliquez sur la **zone de recherche** en haut de la page Personnes.
2. Commencez à taper un nom, un e-mail, ou un autre mot-clé.
3. Les résultats se filtrent automatiquement au fur et à mesure que vous tapez (il y a un bref délai d'environ une demi-seconde afin que la recherche ne se déclenche pas à chaque frappe).
4. Le tableau ci-dessous se met à jour pour n'afficher que les résultats correspondants.

:::tip
Vous n'avez pas besoin d'appuyer sur Entrée. La recherche s'exécute automatiquement lorsque vous arrêtez de taper.
:::

## Trier les résultats

Vous pouvez trier l'annuaire en cliquant sur n'importe quel en-tête de colonne du tableau :

1. Cliquez sur un **en-tête de colonne** (par exemple, **Nom** ou **E-mail**) pour trier selon cette colonne.
2. Cliquez de nouveau sur le même en-tête pour inverser l'ordre de tri.

Cela facilite la recherche de personnes par ordre alphabétique, par âge, ou selon n'importe quelle autre colonne visible.

## Personnaliser les colonnes

Toutes les informations n'ont pas besoin d'être visibles en même temps. Vous pouvez choisir quelles colonnes apparaissent dans le tableau :

1. Repérez le **menu déroulant de sélection des colonnes** près du haut du tableau.
2. Cochez ou décochez des colonnes pour les afficher ou les masquer. Les colonnes disponibles incluent :
   - **Photo**
   - **Nom**
   - **E-mail**
   - **Téléphone**
   - **Adresse**
   - **Date de naissance**
   - **Âge**
   - **Sexe**
   - **Statut de membre**
   - **Campus**
3. Le tableau se met à jour immédiatement pour refléter vos sélections.

:::info
Vos choix de colonnes affectent ce qui est inclus lors de l'export en CSV. Personnalisez les colonnes avant d'exporter pour obtenir exactement les données dont vous avez besoin.
:::

## Pagination

Lorsque votre annuaire contient de nombreux enregistrements, les résultats sont répartis sur plusieurs pages. Utilisez les **contrôles de pagination** en bas du tableau pour naviguer entre les pages. La page actuelle et le nombre total d'enregistrements sont affichés afin que vous sachiez toujours où vous en êtes dans la liste.

:::tip
Si vous voulez voir plus de résultats à la fois, affinez votre recherche pour réduire la liste plutôt que de parcourir un grand annuaire page par page.
:::

## Exporter les résultats de recherche

Vous pouvez télécharger vos résultats de recherche actuels sous forme de fichier CSV à tout moment :

1. Appliquez toute recherche ou tout filtre souhaité.
2. Personnalisez vos colonnes pour inclure les données dont vous avez besoin.
3. Cliquez sur le bouton **Exporter**.
4. Un fichier CSV sera téléchargé sur votre ordinateur, prêt à être ouvert dans Excel, Google Sheets, ou n'importe quel tableur.

Pour plus de détails sur l'export, consultez [Exporter des données](./exporting-data.md).

:::tip
Pour des requêtes plus avancées -- comme trouver tous ceux qui n'ont pas assisté depuis les trois derniers mois -- essayez la fonctionnalité [Recherche IA](./ai-search.md), qui vous permet de rechercher en posant des questions en langage naturel.
:::

## Recherche avancée

La Recherche avancée vous permet de créer des filtres précis en combinant des conditions. Ouvrez-la depuis la page Personnes, puis développez une catégorie et cochez les champs sur lesquels vous voulez filtrer, en choisissant un opérateur et une valeur pour chacun. Les catégories incluent **Noms**, **Démographie**, **Contact**, **Adhésion**, **Activité** (dons et présences), et **Champs personnalisés**.

La catégorie **Champs personnalisés** répertorie les [Champs personnalisés](../settings/custom-fields.md) de votre église — les champs que vous définissez dans Paramètres pour suivre vos propres informations (comme une date d'expiration de vérification de dossier). Les opérateurs proposés correspondent au type de chaque champ : les champs texte prennent en charge *contient / égal à / commence par / se termine par*, les champs numériques prennent en charge les opérateurs de comparaison, les champs date prennent en charge *égal à / après / avant*, et les champs Oui/Non et Choix multiple vous permettent de sélectionner une valeur. Tout champ sur lequel vous pouvez filtrer ici peut être enregistré comme [Liste](./lists.md) en direct.

## Enregistrer des recherches comme listes

Après avoir effectué une recherche, un bouton **Enregistrer comme liste** (icône de signet) apparaît dans l'en-tête de la page Personnes. Cliquez dessus pour stocker votre requête actuelle sous un nom et une catégorie facultative, afin de pouvoir la recharger instantanément lors de sessions futures. Consultez [Listes enregistrées](./lists.md) pour tous les détails.
