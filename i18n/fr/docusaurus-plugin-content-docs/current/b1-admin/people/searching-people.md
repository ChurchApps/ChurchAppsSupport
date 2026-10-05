---
title: "Rechercher des personnes"
---

# Rechercher des personnes

<div class="article-intro">

La page **Personnes** affiche votre répertoire d'église dans un tableau consultable et triable. Vous pouvez rapidement trouver n'importe qui dans votre congrégation, personnaliser les informations affichées et exporter vos résultats. Une recherche efficace est essentielle pour les tâches quotidiennes d'administration de l'église, comme le suivi des visiteurs, la préparation de listes de contacts et la gestion des dossiers de membres.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec permission de consulter les personnes. Voir [Rôles et permissions](roles-permissions.md) si vous n'êtes pas sûr de votre niveau d'accès.
- Votre répertoire d'église devrait avoir des personnes dedans. Si vous n'en avez pas encore ajouté, voir [Ajouter des personnes](adding-people.md) ou [Importer des données](importing-data.md).

</div>

## Recherche rapide

La barre de recherche en haut de la page Personnes vous permet de trouver des membres en temps réel :

1. Cliquez sur la **boîte de recherche** en haut de la page Personnes.
2. Commencez à taper un nom, un email ou un autre mot-clé.
3. Les résultats se filtreront automatiquement au fur et à mesure de votre saisie (il y a un bref délai d'environ une demi-seconde afin que la recherche ne se déclenche pas à chaque frappe).
4. Le tableau ci-dessous se met à jour pour afficher uniquement les résultats correspondants.

:::tip
Vous n'avez pas besoin d'appuyer sur Entrée. La recherche s'exécute automatiquement après que vous ayez arrêté de taper.
:::

## Trier les résultats

Vous pouvez trier le répertoire en cliquant sur n'importe quel en-tête de colonne du tableau :

1. Cliquez sur un **en-tête de colonne** (par exemple, **Nom** ou **Email**) pour trier par cette colonne.
2. Cliquez sur le même en-tête à nouveau pour inverser l'ordre de tri.

Cela facilite la recherche de personnes par ordre alphabétique, par âge ou par n'importe quelle autre colonne visible.

## Personnaliser les colonnes

Pas besoin d'afficher chaque information en une seule fois. Vous pouvez choisir les colonnes qui apparaissent dans le tableau :

1. Recherchez le **menu déroulant du sélecteur de colonnes** près du haut du tableau.
2. Cochez ou décochez les colonnes pour les afficher ou les masquer. Les colonnes disponibles incluent :
   - **Photo**
   - **Nom**
   - **Email**
   - **Téléphone**
   - **Adresse**
   - **Date de naissance**
   - **Âge**
   - **Genre**
   - **Statut d'adhésion**
   - **Campus**
3. Le tableau se met à jour immédiatement pour refléter vos sélections.

### Affichage des champs personnalisés en tant que colonnes

Le sélecteur de colonnes a deux onglets : **Standard** contient les colonnes intégrées énumérées ci-dessus, et **Personnalisé** contient les [Champs personnalisés](../settings/custom-fields.md) de votre église ainsi que les questions de tous les formulaires Personnes. Cochez un champ personnalisé sur l'onglet **Personnalisé** pour l'ajouter en tant que colonne, et la valeur de ce champ pour chaque personne apparaît dans le tableau. Les valeurs sont affichées de la même manière que sur le profil de la personne -- les champs Oui/Non affichent *Oui* ou *Non*, les champs Choix multiples affichent l'étiquette de l'option, et les dates sont affichées en dates courtes. Les personnes sans valeur pour ce champ affichent une cellule vide.

:::info
Vos choix de colonnes affectent ce qui est inclus lorsque vous exportez en CSV. Personnalisez les colonnes avant d'exporter pour obtenir exactement les données dont vous avez besoin.
:::

## Pagination

Lorsque votre répertoire contient de nombreux enregistrements, les résultats sont divisés sur plusieurs pages. Utilisez les **contrôles de pagination** en bas du tableau pour vous déplacer entre les pages. La page actuelle et le nombre total d'enregistrements sont affichés afin que vous sachiez toujours où vous êtes dans la liste.

:::tip
Si vous souhaitez voir plus de résultats à la fois, affinez votre recherche pour réduire la liste plutôt que de parcourir un grand répertoire.
:::

## Exporter les résultats de recherche

Vous pouvez télécharger vos résultats de recherche actuels sous forme de fichier CSV à tout moment :

1. Appliquez les filtres ou recherches que vous souhaitez.
2. Personnalisez vos colonnes pour inclure les données dont vous avez besoin.
3. Cliquez sur le bouton **Exporter**.
4. Un fichier CSV téléchargera sur votre ordinateur, prêt à être ouvert dans Excel, Google Sheets ou toute application de feuille de calcul.

Pour plus de détails sur l'exportation, voir [Exporter des données](./exporting-data.md).

:::tip
Pour des requêtes plus avancées -- comme trouver tous ceux qui n'ont pas assisté au cours des trois derniers mois -- essayez la fonction [Recherche IA](./ai-search.md), qui vous permet de rechercher en posant des questions en langage naturel.
:::

## Recherche avancée

La recherche avancée vous permet de créer des filtres précis en combinant des conditions. Ouvrez-la à partir de la page Personnes, puis développez une catégorie et cochez les champs sur lesquels vous souhaitez filtrer, en choisissant un opérateur et une valeur pour chacun. Les catégories incluent **Noms**, **Démographie**, **Contact**, **Adhésion**, **Activité** (dons et participation) et **Champs personnalisés**.

La catégorie **Champs personnalisés** énumère les [Champs personnalisés](../settings/custom-fields.md) de votre église -- les champs que vous définissez dans Paramètres pour suivre vos propres informations (comme une date d'expiration de vérification des antécédents). Les opérateurs proposés correspondent au type de chaque champ : les champs de texte supportent *contient / égal / commence par / se termine par*, les champs numériques supportent les opérateurs de comparaison, les champs de date supportent *égal / après / avant*, et les champs Oui/Non et Choix multiples vous permettent de choisir une valeur. N'importe quel champ sur lequel vous pouvez filtrer ici peut être enregistré en tant que [Liste](./lists.md) en direct.

## Enregistrer les recherches en tant que listes

Après avoir exécuté une recherche, un bouton **Enregistrer en tant que liste** (icône de signet) apparaît dans l'en-tête de la page Personnes. Cliquez dessus pour stocker votre requête actuelle sous un nom et une catégorie facultative, afin de pouvoir la recharger instantanément dans les sessions futures. Voir [Listes enregistrées](./lists.md) pour plus de détails.
