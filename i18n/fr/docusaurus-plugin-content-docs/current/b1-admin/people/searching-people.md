---
title: "Rechercher des personnes"
---

# Rechercher des personnes

<div class="article-intro">

La page **Personnes** affiche votre annuaire d'église sous forme de liste consultable de foyers, ou de tableau triable de personnes individuelles. Vous pouvez rapidement retrouver n'importe quel membre de votre assemblée, personnaliser les informations affichées et exporter vos résultats. Une recherche efficace est essentielle aux tâches quotidiennes de gestion d'église, comme le suivi des visiteurs, la préparation de listes de contacts et la gestion des fiches des membres.

</div>

## Vidéo de formation

<YouTube id="7Y-tN9RmnDQ" title="Searching People and Building Lists in B1" next="Custom Fields, Bulk Editing, and Exporting in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer d'un compte B1 Admin actif avec l'autorisation de consulter les personnes. Consultez [Rôles et autorisations](roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Votre annuaire d'église doit contenir des personnes. Si vous n'avez encore ajouté personne, consultez [Ajouter des personnes](adding-people.md) ou [Importer des données](importing-data.md).

</div>

## Foyers et vues en tableau

La page Personnes affiche votre annuaire par **foyer**, classé par ordre alphabétique. Chaque ligne indique les photos du foyer, son nom (par exemple, « La famille Martin ») et les noms de tous ses membres. Cliquez sur un foyer pour ouvrir la fiche du chef de famille, ou sur le nom d'un membre pour ouvrir sa fiche. Un compteur au-dessus de la liste indique le nombre de foyers et de personnes affichés.

Utilisez le bouton **Affichage** au-dessus de la liste pour basculer entre **Foyers** et **Tableau**. La vue **Tableau** affiche une personne par ligne et permet de trier et de choisir les colonnes (voir ci-dessous). B1 mémorise votre choix sur cet appareil.

Par défaut, la page charge la première partie de votre annuaire. Si vous avez davantage de personnes, cliquez sur **Afficher tous les membres** sous la liste pour charger l'ensemble.

## Recherche rapide

La zone **Rechercher un foyer ou une personne**, en haut de la page Personnes, vous permet de retrouver des membres en temps réel :

1. Cliquez sur la **zone de recherche** en haut de la page Personnes.
2. Commencez à taper un nom.
3. Les résultats se filtrent automatiquement pendant la saisie (il y a un court délai d'environ une demi-seconde pour que la recherche ne se lance pas à chaque frappe).
4. La liste en dessous ne montre que les résultats correspondants.

Cliquez sur **Effacer** (sous la zone de recherche) pour réinitialiser la recherche et afficher à nouveau l'ensemble de votre annuaire.

:::tip
Il n'est pas nécessaire d'appuyer sur Entrée. La recherche se lance automatiquement dès que vous arrêtez de taper.
:::

## Trier les résultats

Dans la vue **Tableau**, les personnes sont classées par nom de famille, puis par prénom. Vous pouvez trier l'annuaire différemment en cliquant sur l'en-tête de n'importe quelle colonne :

1. Cliquez sur un **en-tête de colonne** (par exemple **Nom** ou **E-mail**) pour trier selon cette colonne.
2. Cliquez de nouveau sur le même en-tête pour inverser l'ordre de tri.

Cela permet de retrouver facilement des personnes par ordre alphabétique, par âge ou selon toute autre colonne visible.

## Personnaliser les colonnes

Toutes les informations n'ont pas besoin d'être visibles en même temps. Vous pouvez choisir les colonnes qui apparaissent dans le tableau :

1. Cliquez sur l'icône **Sélectionner les colonnes** dans l'en-tête de la page Personnes. (Les colonnes s'appliquent à la vue **Tableau**.)
2. Cochez ou décochez les colonnes pour les afficher ou les masquer. Les colonnes disponibles comprennent :
   - **Photo**
   - **Nom**
   - **E-mail**
   - **Téléphone**
   - **Adresse**
   - **Date de naissance**
   - **Âge**
   - **Genre**
   - **Statut d'adhésion**
   - **Campus**
3. Le tableau se met à jour immédiatement en fonction de vos choix. Cliquez sur **Terminé** pour fermer la boîte de dialogue **Sélectionner les colonnes**.

### Afficher les champs personnalisés en colonnes

Le sélecteur de colonnes comporte deux onglets : **Standard** regroupe les colonnes intégrées listées ci-dessus, et **Personnalisé** regroupe vos [champs personnalisés](../settings/custom-fields.md) ainsi que les questions des formulaires liés aux personnes. Cochez un champ personnalisé dans l'onglet **Personnalisé** pour l'ajouter comme colonne : la valeur de chaque personne pour ce champ apparaît alors dans le tableau. Les valeurs sont affichées de la même façon que sur la fiche de la personne : les champs Oui/Non affichent *Oui* ou *Non*, les champs à choix multiple affichent le libellé de l'option, et les dates sont affichées au format court. Les personnes sans valeur pour ce champ affichent une cellule vide.


## Exporter les résultats de recherche

Vous pouvez à tout moment télécharger vos résultats de recherche actuels au format CSV :

1. Appliquez les recherches ou les filtres souhaités.
2. Cliquez sur le bouton **Exporter** dans l'en-tête de la page Personnes.
3. Un fichier CSV est téléchargé sur votre ordinateur, prêt à être ouvert dans Excel, Google Sheets ou tout autre tableur.

Pour plus de détails sur l'exportation, consultez [Exporter les données](./exporting-data.md).

:::tip
Pour des requêtes plus avancées, par exemple pour trouver toutes les personnes qui n'ont pas assisté à un service depuis trois mois, essayez la fonctionnalité [Recherche IA](./ai-search.md), qui vous permet de rechercher en posant des questions en langage courant.
:::

## Recherche avancée

La recherche avancée vous permet de créer des filtres précis en combinant des conditions. Ouvrez-la en cliquant sur **Avancée** sous la zone de recherche de la page Personnes, puis développez une catégorie et cochez les champs sur lesquels vous souhaitez filtrer (vous pouvez cliquer sur le nom du champ ou sur sa case), en choisissant un opérateur et une valeur pour chacun. Les catégories comprennent **Noms**, **Données démographiques**, **Coordonnées**, **Adhésion**, **Activité** (dons et présence) et **Champs personnalisés**.

La catégorie **Champs personnalisés** répertorie les [champs personnalisés](../settings/custom-fields.md) de votre église, c'est-à-dire les champs que vous définissez dans les Paramètres pour suivre vos propres informations (par exemple une date d'expiration de la vérification d'antécédents). Les opérateurs proposés correspondent au type de chaque champ : les champs texte proposent *contient / est égal à / commence par / se termine par*, les champs numériques proposent les opérateurs de comparaison, les champs date proposent *est égal à / après / avant*, et les champs Oui/Non et à choix multiple vous permettent de choisir une valeur. Tout champ utilisable comme filtre ici peut être enregistré sous forme de [Liste](./lists.md) dynamique.

## Enregistrer les recherches comme listes

Après avoir effectué une recherche, un bouton **Enregistrer comme liste** apparaît dans l'en-tête de la page Personnes. Cliquez dessus pour enregistrer votre requête actuelle sous un nom et une catégorie facultative, afin de pouvoir la recharger instantanément lors de vos prochaines sessions. Consultez [Listes enregistrées](./lists.md) pour plus de détails.
