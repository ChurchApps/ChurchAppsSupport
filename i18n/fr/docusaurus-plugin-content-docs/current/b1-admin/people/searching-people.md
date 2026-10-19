---
title: "Rechercher des personnes"
---

# Rechercher des personnes

<div class="article-intro">

La page **Personnes** affiche votre annuaire d'église sous forme de liste consultable de foyers, ou de tableau triable de personnes individuelles. Vous pouvez rapidement trouver n'importe quel membre de votre congrégation, personnaliser les informations affichées et exporter vos résultats. Une recherche efficace est essentielle aux tâches administratives quotidiennes de l'église, comme le suivi des visiteurs, la préparation des listes de contacts et la gestion des dossiers des membres.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer d'un compte B1 Admin actif avec l'autorisation de consulter les personnes. Consultez [Rôles et permissions](roles-permissions.md) si vous ne connaissez pas votre niveau d'accès.
- Votre annuaire d'église doit contenir des personnes. Si vous n'avez encore ajouté personne, consultez [Ajouter des personnes](adding-people.md) ou [Importer des données](importing-data.md).

</div>

## Foyers et vues en tableau

La page Personnes affiche votre annuaire par **foyer**, regroupé par ordre alphabétique. Chaque ligne affiche les photos du foyer, son nom (par exemple, « La famille Smith ») et les noms de tous ses membres. Cliquez sur un foyer pour ouvrir le profil du chef de famille, ou cliquez sur le nom d'un membre pour ouvrir sa fiche. Un compteur au-dessus de la liste indique le nombre de foyers et de personnes affichés.

Utilisez le bouton **Afficher en tant que** au-dessus de la liste pour basculer entre **Foyers** et **Tableau**. La vue **Tableau** affiche une personne par ligne et permet de trier et de choisir les colonnes (voir ci-dessous). B1 mémorise votre choix sur cet appareil.

Par défaut, la page charge la première partie de votre annuaire. Si vous avez davantage de personnes, cliquez sur **Afficher tous les membres** sous la liste pour charger tout le monde.

## Recherche rapide

La zone **Rechercher un foyer ou une personne** en haut de la page Personnes vous permet de trouver des membres en temps réel :

1. Cliquez sur la **zone de recherche** en haut de la page Personnes.
2. Commencez à saisir un nom.
3. Les résultats se filtrent automatiquement pendant la saisie (il y a un bref délai d'environ une demi-seconde pour que la recherche ne se lance pas à chaque frappe).
4. La liste ci-dessous se met à jour et n'affiche que les résultats correspondants.

Cliquez sur **Effacer** (sous la zone de recherche) pour réinitialiser la recherche et afficher à nouveau tout votre annuaire.

:::tip
Vous n'avez pas besoin d'appuyer sur Entrée. La recherche se lance automatiquement lorsque vous arrêtez de saisir.
:::

## Trier les résultats

Dans la vue **Tableau**, les personnes sont listées par nom de famille, puis par prénom. Vous pouvez trier l'annuaire différemment en cliquant sur n'importe quel en-tête de colonne :

1. Cliquez sur un **en-tête de colonne** (par exemple, **Nom** ou **E-mail**) pour trier selon cette colonne.
2. Cliquez à nouveau sur le même en-tête pour inverser l'ordre de tri.

Cela facilite la recherche de personnes par ordre alphabétique, par âge ou selon toute autre colonne visible.

## Personnaliser les colonnes

Toutes les informations n'ont pas besoin d'être visibles en même temps. Vous pouvez choisir les colonnes qui apparaissent dans le tableau :

1. Cliquez sur l'icône **Sélectionner les colonnes** dans l'en-tête de la page Personnes. (Les colonnes s'appliquent à la vue **Tableau**.)
2. Cochez ou décochez des colonnes pour les afficher ou les masquer. Les colonnes disponibles sont notamment :
   - **Photo**
   - **Nom**
   - **E-mail**
   - **Téléphone**
   - **Adresse**
   - **Date de naissance**
   - **Âge**
   - **Genre**
   - **Statut de membre**
   - **Campus**
3. Le tableau se met à jour immédiatement en fonction de vos choix.

### Afficher les champs personnalisés en colonnes {#showing-custom-fields-as-columns}

Le sélecteur de colonnes comporte deux onglets : **Standard** regroupe les colonnes intégrées listées ci-dessus, et **Personnalisé** regroupe les [Champs personnalisés](../settings/custom-fields.md) de votre église ainsi que les questions des formulaires liés aux personnes. Cochez un champ personnalisé dans l'onglet **Personnalisé** pour l'ajouter en colonne ; la valeur de chaque personne pour ce champ apparaît alors dans le tableau. Les valeurs sont affichées de la même façon que sur la fiche de la personne : les champs Oui/Non affichent *Oui* ou *Non*, les champs à choix multiple affichent le libellé de l'option, et les dates sont affichées au format court. Les personnes sans valeur pour ce champ affichent une cellule vide.


## Exporter les résultats de recherche

Vous pouvez télécharger vos résultats de recherche actuels sous forme de fichier CSV à tout moment :

1. Appliquez les recherches ou filtres souhaités.
2. Cliquez sur le bouton **Exporter** dans l'en-tête de la page Personnes.
3. Un fichier CSV se télécharge sur votre ordinateur, prêt à être ouvert dans Excel, Google Sheets ou tout autre tableur.

Pour plus de détails sur l'exportation, consultez [Exporter des données](./exporting-data.md).

:::tip
Pour des requêtes plus avancées — par exemple, trouver toutes les personnes qui n'ont pas assisté aux trois derniers mois — essayez la fonction [Recherche IA](./ai-search.md), qui vous permet de rechercher à l'aide de questions en langage courant.
:::

## Recherche avancée {#advanced-search}

La recherche avancée vous permet de créer des filtres précis en combinant des conditions. Ouvrez-la en cliquant sur **Avancée** sous la zone de recherche de la page Personnes, puis développez une catégorie et cochez les champs à filtrer, en choisissant un opérateur et une valeur pour chacun. Les catégories comprennent **Noms**, **Données démographiques**, **Contact**, **Appartenance**, **Activité** (dons et présence) et **Champs personnalisés**.

La catégorie **Champs personnalisés** liste les [Champs personnalisés](../settings/custom-fields.md) de votre église — les champs que vous définissez dans les Paramètres pour suivre vos propres informations (par exemple une date d'expiration de vérification d'antécédents). Les opérateurs proposés correspondent au type de chaque champ : les champs texte prennent en charge *contient / est égal à / commence par / se termine par*, les champs numériques prennent en charge les opérateurs de comparaison, les champs date prennent en charge *est égal à / après / avant*, et les champs Oui/Non et à choix multiple vous permettent de choisir une valeur. Tout champ que vous pouvez filtrer ici peut être enregistré dans une [Liste](./lists.md) dynamique.

## Enregistrer les recherches sous forme de listes

Après avoir effectué une recherche, un bouton **Enregistrer comme liste** apparaît dans l'en-tête de la page Personnes. Cliquez dessus pour enregistrer votre requête actuelle sous un nom et une catégorie facultative, afin de la recharger instantanément lors de vos prochaines sessions. Consultez [Listes enregistrées](./lists.md) pour tous les détails.
