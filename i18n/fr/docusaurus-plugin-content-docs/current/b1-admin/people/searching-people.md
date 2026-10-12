---
title: "Rechercher des personnes"
---

# Rechercher des personnes

<div class="article-intro">

La page **Personnes** affiche votre répertoire d'église sous forme de liste consultable de ménages, ou sous forme de tableau triable de personnes individuelles. Vous pouvez rapidement trouver n'importe qui dans votre congrégation, personnaliser les informations affichées et exporter vos résultats. Une recherche efficace est essentielle pour les tâches quotidiennes d'administration de l'église, comme le suivi des visiteurs, la préparation de listes de contacts et la gestion des dossiers de membres.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec permission de consulter les personnes. Voir [Rôles et permissions](roles-permissions.md) si vous n'êtes pas sûr de votre niveau d'accès.
- Votre répertoire d'église devrait avoir des personnes dedans. Si vous n'en avez pas encore ajouté, voir [Ajouter des personnes](adding-people.md) ou [Importer des données](importing-data.md).

</div>

## Vues par ménage et par tableau {#households-and-table-views}

La page Personnes affiche votre répertoire par **ménage**, classé par ordre alphabétique. Chaque ligne affiche les photos du ménage, son nom (par exemple, « The Smith Family ») et les noms de toutes les personnes qui le composent. Cliquez sur un ménage pour ouvrir le profil du chef de famille, ou cliquez sur le nom d'un membre pour ouvrir cette personne. Un compteur au-dessus de la liste indique le nombre de ménages et de personnes affichés.

Utilisez le sélecteur **View as** au-dessus de la liste pour basculer entre **Households** et **Table**. La vue **Table** affiche une personne par ligne et permet de trier et de choisir les colonnes (voir ci-dessous). B1 mémorise votre choix sur cet appareil.

Par défaut, la page charge la première partie de votre répertoire. Si vous avez davantage de personnes, cliquez sur **Show All Members** sous la liste pour tout charger.

## Recherche rapide

La zone **Find a household or person** en haut de la page Personnes vous permet de trouver des membres en temps réel :

1. Cliquez sur la **boîte de recherche** en haut de la page Personnes.
2. Commencez à taper un nom.
3. Les résultats se filtreront automatiquement au fur et à mesure de votre saisie (il y a un bref délai d'environ une demi-seconde afin que la recherche ne se déclenche pas à chaque frappe).
4. La liste ci-dessous se met à jour pour afficher uniquement les résultats correspondants.

Cliquez sur **Clear** (sous la zone de recherche) pour réinitialiser la recherche et afficher à nouveau tout votre répertoire.

:::tip
Vous n'avez pas besoin d'appuyer sur Entrée. La recherche s'exécute automatiquement après que vous ayez arrêté de taper.
:::

## Trier les résultats

Dans la vue **Table**, vous pouvez trier le répertoire en cliquant sur n'importe quel en-tête de colonne :

1. Cliquez sur un **en-tête de colonne** (par exemple, **Nom** ou **Email**) pour trier par cette colonne.
2. Cliquez sur le même en-tête à nouveau pour inverser l'ordre de tri.

Cela facilite la recherche de personnes par ordre alphabétique, par âge ou par n'importe quelle autre colonne visible.

## Personnaliser les colonnes

Pas besoin d'afficher chaque information en une seule fois. Vous pouvez choisir les colonnes qui apparaissent dans le tableau :

1. Cliquez sur l'icône **Select columns** dans l'en-tête de la page Personnes. (Les colonnes s'appliquent à la vue **Table**.)
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

## Exporter les résultats de recherche

Vous pouvez télécharger vos résultats de recherche actuels sous forme de fichier CSV à tout moment :

1. Appliquez les filtres ou recherches que vous souhaitez.
2. Cliquez sur le bouton **Export** dans l'en-tête de la page Personnes.
3. Un fichier CSV téléchargera sur votre ordinateur, prêt à être ouvert dans Excel, Google Sheets ou toute application de feuille de calcul.

Pour plus de détails sur l'exportation, voir [Exporter des données](./exporting-data.md).

:::tip
Pour des requêtes plus avancées -- comme trouver tous ceux qui n'ont pas assisté au cours des trois derniers mois -- essayez la fonction [Recherche IA](./ai-search.md), qui vous permet de rechercher en posant des questions en langage naturel.
:::

## Recherche avancée

La recherche avancée vous permet de créer des filtres précis en combinant des conditions. Ouvrez-la en cliquant sur **Advanced** sous la zone de recherche de la page Personnes, puis développez une catégorie et cochez les champs sur lesquels vous souhaitez filtrer, en choisissant un opérateur et une valeur pour chacun. Les catégories incluent **Noms**, **Démographie**, **Contact**, **Adhésion**, **Activité** (dons et participation) et **Champs personnalisés**.

La catégorie **Champs personnalisés** énumère les [Champs personnalisés](../settings/custom-fields.md) de votre église -- les champs que vous définissez dans Paramètres pour suivre vos propres informations (comme une date d'expiration de vérification des antécédents). Les opérateurs proposés correspondent au type de chaque champ : les champs de texte supportent *contient / égal / commence par / se termine par*, les champs numériques supportent les opérateurs de comparaison, les champs de date supportent *égal / après / avant*, et les champs Oui/Non et Choix multiples vous permettent de choisir une valeur. N'importe quel champ sur lequel vous pouvez filtrer ici peut être enregistré en tant que [Liste](./lists.md) en direct.

## Enregistrer les recherches en tant que listes

Après avoir exécuté une recherche, un bouton **Enregistrer en tant que liste** apparaît dans l'en-tête de la page Personnes. Cliquez dessus pour stocker votre requête actuelle sous un nom et une catégorie facultative, afin de pouvoir la recharger instantanément dans les sessions futures. Voir [Listes enregistrées](./lists.md) pour plus de détails.
