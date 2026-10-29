---
title: "Rechercher des personnes"
---

# Rechercher des personnes

<div class="article-intro">

La page **Personnes** affiche votre répertoire d'église sous forme de liste consultable de foyers, ou de tableau triable de personnes individuelles. Vous pouvez rapidement trouver n'importe quel membre de votre congrégation, personnaliser les renseignements affichés et exporter vos résultats. Une recherche efficace est essentielle pour les tâches quotidiennes d'administration d'une église comme le suivi des visiteurs, la préparation de listes de contacts et la gestion des fiches de membres.

</div>

## Vidéo de formation

<YouTube id="7Y-tN9RmnDQ" title="Rechercher des personnes et créer des listes dans B1" next="Champs personnalisés, modification en lot et exportation dans B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec l'autorisation de consulter les personnes. Consultez [Rôles et autorisations](roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Votre répertoire d'église doit contenir des personnes. Si vous n'avez encore ajouté personne, consultez [Ajouter des personnes](adding-people.md) ou [Importer des données](importing-data.md).

</div>

## Vues par foyer et par tableau

La page Personnes présente votre répertoire par **foyer**, regroupé par ordre alphabétique. Chaque ligne affiche les photos du foyer, son nom (par exemple « La famille Tremblay ») et les noms de toutes les personnes qui en font partie. Cliquez sur un foyer pour ouvrir le profil du chef de famille, ou cliquez sur le nom d'un membre pour ouvrir cette personne. Un compteur au-dessus de la liste indique combien de foyers et de personnes sont affichés.

Utilisez le bouton **Afficher comme** au-dessus de la liste pour basculer entre **Foyers** et **Tableau**. La vue **Tableau** liste une personne par ligne ; c'est là que vous pouvez trier et choisir les colonnes (voir ci-dessous). B1 se souvient de votre choix sur cet appareil.

Par défaut, la page charge la première partie de votre répertoire. Si vous avez plus de personnes, cliquez sur **Afficher tous les membres** sous la liste pour charger tout le monde.

## Recherche rapide

La zone **Trouver un foyer ou une personne** en haut de la page Personnes vous permet de trouver des membres en temps réel :

1. Cliquez sur la **zone de recherche** en haut de la page Personnes.
2. Commencez à taper un nom.
3. Les résultats se filtrent automatiquement à mesure que vous tapez (il y a un bref délai d'environ une demi-seconde pour que la recherche ne se lance pas à chaque frappe).
4. La liste ci-dessous se met à jour pour n'afficher que les résultats correspondants.

Cliquez sur **Effacer** (sous la zone de recherche) pour réinitialiser la recherche et afficher à nouveau tout votre répertoire.

:::tip
Vous n'avez pas besoin d'appuyer sur Entrée. La recherche s'exécute automatiquement après que vous avez cessé de taper.
:::

## Trier les résultats

Dans la vue **Tableau**, les personnes sont listées par nom de famille, puis par prénom. Vous pouvez trier le répertoire différemment en cliquant sur n'importe quel en-tête de colonne :

1. Cliquez sur un **en-tête de colonne** (par exemple **Nom** ou **E-mail**) pour trier selon cette colonne.
2. Cliquez à nouveau sur le même en-tête pour inverser l'ordre de tri.

Cela facilite la recherche de personnes par ordre alphabétique, par âge ou selon toute autre colonne visible.

## Personnaliser les colonnes

Il n'est pas nécessaire que tous les renseignements soient visibles à la fois. Vous pouvez choisir les colonnes qui apparaissent dans le tableau :

1. Cliquez sur l'icône **Sélectionner les colonnes** dans l'en-tête de la page Personnes. (Les colonnes s'appliquent à la vue **Tableau**.)
2. Cochez ou décochez des colonnes pour les afficher ou les masquer. Les colonnes disponibles comprennent :
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
   - **Date d'ajout** -- la date de création de la fiche de la personne
3. Le tableau se met à jour immédiatement selon vos choix. Cliquez sur **Terminé** pour fermer la boîte de dialogue **Sélectionner les colonnes**.

### Afficher les champs personnalisés comme colonnes

Le sélecteur de colonnes comporte deux onglets : **Standard** regroupe les colonnes intégrées énumérées ci-dessus, et **Personnalisé** regroupe vos [Champs personnalisés](../settings/custom-fields.md) de l'église ainsi que les questions de tous les formulaires de type Personnes. Cochez un champ personnalisé dans l'onglet **Personnalisé** pour l'ajouter comme colonne, et la valeur de chaque personne pour ce champ apparaît dans le tableau. Les valeurs s'affichent de la même façon que sur le profil de la personne : les champs Oui/Non affichent *Oui* ou *Non*, les champs à choix multiple affichent l'étiquette de l'option, et les dates s'affichent au format court. Les personnes sans valeur pour le champ affichent une cellule vide.


## Exporter les résultats de recherche

Vous pouvez télécharger vos résultats de recherche actuels sous forme de fichier CSV à tout moment :

1. Appliquez les recherches ou les filtres souhaités.
2. Cliquez sur le bouton **Exporter** dans l'en-tête de la page Personnes.
3. Un fichier CSV est téléchargé sur votre ordinateur, prêt à être ouvert dans Excel, Google Sheets ou toute autre application de tableur.

Pour plus de détails sur l'exportation, consultez [Exporter des données](./exporting-data.md).

:::tip
Pour des requêtes plus avancées -- comme trouver tous ceux qui n'ont pas assisté depuis trois mois -- essayez la fonctionnalité [Recherche IA](./ai-search.md), qui vous permet de chercher en posant des questions en langage courant.
:::

## Recherche avancée

La recherche avancée vous permet de créer des filtres précis en combinant des conditions. Ouvrez-la en cliquant sur **Avancé** sous la zone de recherche de la page Personnes, puis développez une catégorie et cochez les champs sur lesquels vous voulez filtrer (vous pouvez cliquer sur le nom du champ ou sur sa case), en choisissant un opérateur et une valeur pour chacun. Les catégories comprennent **Noms**, **Données démographiques**, **Coordonnées**, **Adhésion**, **Activité** (dons et présence) et **Champs personnalisés**.

Pour trouver de nouvelles personnes, ouvrez **Adhésion** et cochez **Date d'ajout**. Le filtre commence sur **dans les N derniers jours** avec 30 déjà saisi, ce qui vous permet de trouver toutes les personnes ajoutées au cours du dernier mois en un seul clic ; modifiez le nombre de jours, ou passez à *égal à / après / avant* pour choisir une date. **Date de naissance** et **Anniversaire de mariage** proposent aussi **dans les N derniers jours**. La date d'ajout n'est consignée que pour les personnes créées depuis fin octobre 2026 ; les personnes ajoutées auparavant n'ont pas de date, donc ce filtre ne les trouve pas.

La catégorie **Champs personnalisés** énumère les [Champs personnalisés](../settings/custom-fields.md) de votre église -- les champs que vous définissez dans les Paramètres pour suivre vos propres renseignements (comme la date d'expiration d'une vérification des antécédents). Les opérateurs proposés correspondent au type de chaque champ : les champs texte prennent en charge *contient / égal à / commence par / se termine par*, les champs numériques prennent en charge les opérateurs de comparaison, les champs date prennent en charge *égal à / après / avant*, et les champs Oui/Non et à choix multiple vous permettent de choisir une valeur. Tout champ sur lequel vous pouvez filtrer ici peut être enregistré comme une [Liste](./lists.md) dynamique.

## Enregistrer des recherches comme listes

Après avoir effectué une recherche, un bouton **Enregistrer comme liste** apparaît dans l'en-tête de la page Personnes. Cliquez dessus pour enregistrer votre requête actuelle sous un nom et une catégorie facultative, afin de la recharger instantanément lors de vos prochaines sessions. Consultez [Listes enregistrées](./lists.md) pour tous les détails.
