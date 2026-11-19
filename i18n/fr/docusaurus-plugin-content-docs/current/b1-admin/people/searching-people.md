---
title: "Rechercher des personnes"
description: "Recherchez dans l'annuaire des personnes de B1 Admin par nom, triez et choisissez les colonnes dans la vue tableau, construisez des filtres avec la recherche avancée et exportez les résultats au format CSV."
---

# Rechercher des personnes

<div class="article-intro">

La page **Personnes** affiche l'annuaire de votre église sous forme de liste consultable de foyers, ou sous forme de tableau triable de personnes individuelles. Vous pouvez rapidement retrouver n'importe quel membre de votre assemblée, personnaliser les informations affichées et exporter vos résultats. Une recherche efficace est indispensable pour les tâches administratives quotidiennes de l'église, comme le suivi des visiteurs, la préparation des listes de contacts et la gestion des fiches des membres.

</div>

## Vidéo de formation {#training-video}

<YouTube id="7Y-tN9RmnDQ" title="Rechercher des personnes et créer des listes dans B1" next="Champs personnalisés, modification en masse et export dans B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec l'autorisation de consulter les personnes. Consultez [Rôles et autorisations](roles-permissions.md) si vous ne savez pas à quel niveau d'accès vous vous trouvez.
- Votre annuaire doit contenir des personnes. Si vous n'avez encore ajouté personne, consultez [Ajouter des personnes](adding-people.md) ou [Importer des données](importing-data.md).

</div>

## Vues Foyers et Tableau {#households-and-table-views}

La page Personnes affiche votre annuaire par **foyer**, regroupé par ordre alphabétique. Chaque ligne indique les photos du foyer, son nom (par exemple « La famille Martin ») et le nom de chacun de ses membres. Cliquez sur un foyer pour ouvrir la fiche du chef de famille, ou cliquez sur le nom d'un membre pour ouvrir sa fiche. Un compteur au-dessus de la liste indique le nombre de foyers et de personnes affichés.

Utilisez le bouton **Afficher sous forme** au-dessus de la liste pour basculer entre **Foyers** et **Tableau**. La vue **Tableau** affiche une personne par ligne : c'est là que vous pouvez trier et choisir les colonnes (voir ci-dessous). B1 mémorise votre choix sur cet appareil.

Dans la vue **Tableau**, le statut d'appartenance de chaque personne apparaît sous son nom ; chacun des sept statuts a sa propre couleur, la même que celle utilisée sur la fiche de la personne. Une personne dont le rôle dans le foyer est défini sur **Enfant** porte aussi une étiquette **Enfant** à côté de son statut. Pour indiquer qu'une personne est un enfant, définissez son rôle dans le [panneau du foyer](./adding-people.md#managing-households) de sa fiche.

Par défaut, la page charge la première partie de votre annuaire. Si vous avez davantage de personnes, cliquez sur **Afficher tous les membres** sous la liste pour tout charger.

## Recherche rapide {#quick-search}

La zone **Trouver un foyer ou une personne**, en haut de la page Personnes, vous permet de trouver des membres en temps réel :

1. Cliquez sur la **zone de recherche** en haut de la page Personnes.
2. Commencez à taper un nom.
3. Les résultats se filtrent automatiquement à mesure que vous tapez (il y a un bref délai d'environ une demi-seconde pour que la recherche ne se lance pas à chaque frappe).
4. La liste en dessous ne montre plus que les résultats correspondants.

Cliquez sur **Effacer** (sous la zone de recherche) pour réinitialiser la recherche et réafficher l'ensemble de votre annuaire.

:::tip
Inutile d'appuyer sur Entrée. La recherche se lance automatiquement dès que vous cessez de taper.
:::

## Trier les résultats {#sorting-results}

Dans la vue **Tableau**, les personnes sont classées par nom de famille, puis par prénom. Vous pouvez trier l'annuaire autrement en cliquant sur n'importe quel en-tête de colonne :

1. Cliquez sur un **en-tête de colonne** (par exemple **Nom** ou **Courriel**) pour trier selon cette colonne.
2. Cliquez de nouveau sur le même en-tête pour inverser l'ordre du tri.

Le premier clic trie la colonne par ordre croissant (de A à Z, du plus jeune au plus âgé, date la plus ancienne en premier), et la flèche à côté de l'en-tête indique le sens du tri. Les personnes sans valeur dans cette colonne sont toujours placées en dernier. Vous pouvez ainsi facilement retrouver des personnes par ordre alphabétique, par âge ou selon n'importe quelle autre colonne visible. B1 mémorise le tri sur cet appareil, de sorte que le tableau reste trié de la même façon après un rafraîchissement de la page ou lorsque vous revenez plus tard.

## Personnaliser les colonnes {#customizing-columns}

Toutes les informations n'ont pas besoin d'être visibles en même temps. Vous pouvez choisir les colonnes affichées dans le tableau :

1. Cliquez sur l'icône **Choisir les colonnes** dans l'en-tête de la page Personnes. (Les colonnes s'appliquent à la vue **Tableau** : cocher une colonne fait donc aussi passer la page en vue **Tableau**.)
2. Cochez ou décochez les colonnes pour les afficher ou les masquer. L'onglet **Standard** propose :
   - **Photo** et **Nom d'affichage** (affichés par défaut)
   - **Nom de famille**, **Prénom** et **Deuxième prénom**
   - **Adresse**, **Ville**, **Province / État** et **Code postal**
   - **Courriel principal** et **Téléphone principal** (le numéro mobile, ou le numéro de domicile ou de travail en l'absence de mobile)
   - **Date de naissance**, **Anniversaire (sans année)** et **Âge**
   - **Genre**, **Statut d'appartenance**, **Campus**, **Situation matrimoniale** et **Anniversaire de mariage**
   - **Notes pour badge**
   - **Date d'ajout** -- date de création de la fiche de la personne
   - **Option de suppression** -- ajoute une icône de suppression à chaque ligne (proposée uniquement si vous pouvez modifier les personnes)
3. Le tableau se met à jour immédiatement pour refléter vos choix. Cliquez sur **Terminé** (ou **Fermer**) pour fermer la boîte de dialogue **Choisir les colonnes**. B1 mémorise vos colonnes sur cet appareil.

### Afficher les champs personnalisés en colonnes {#showing-custom-fields-as-columns}

Le sélecteur de colonnes comporte deux onglets : **Standard** regroupe les colonnes intégrées présentées ci-dessus, et **Personnalisé** regroupe les [champs personnalisés](../settings/custom-fields.md) de votre église ainsi que les questions de tous les formulaires liés aux personnes. Cochez un champ personnalisé dans l'onglet **Personnalisé** pour l'ajouter comme colonne : la valeur de chaque personne pour ce champ apparaît alors dans le tableau. Les valeurs sont affichées de la même façon que sur la fiche de la personne : les champs Oui/Non affichent *Oui* ou *Non*, les champs à choix multiple affichent le libellé de l'option, et les dates sont affichées au format court. Les personnes sans valeur pour ce champ ont une cellule vide.


## Exporter les résultats de recherche {#exporting-search-results}

Vous pouvez à tout moment télécharger vos résultats de recherche actuels au format CSV :

1. Appliquez la recherche ou les filtres souhaités.
2. Cliquez sur le bouton **Exporter** dans l'en-tête de la page Personnes.
3. Un fichier CSV sera téléchargé sur votre ordinateur, prêt à être ouvert dans Excel, Google Sheets ou toute autre application de tableur.

Pour plus de détails sur l'export, consultez [Exporter des données](./exporting-data.md).

:::tip
Pour des requêtes plus avancées -- par exemple, retrouver toutes les personnes absentes depuis trois mois -- essayez la fonctionnalité [Recherche IA](./ai-search.md), qui vous permet de rechercher en posant des questions en langage courant.
:::

## Recherche avancée {#advanced-search}

La recherche avancée vous permet de construire des filtres précis en combinant plusieurs conditions. Ouvrez-la en cliquant sur **Avancée** sous la zone de recherche de la page Personnes, puis développez une catégorie et cochez les champs sur lesquels filtrer (vous pouvez cliquer sur le nom du champ ou sur sa case), en choisissant un opérateur et une valeur pour chacun. Les catégories comprennent **Noms**, **Démographie**, **Coordonnées**, **Appartenance et groupes** (statut d'appartenance, campus, date d'ajout et appartenance aux groupes), **Activité** (dons et fréquentation) et **Champs personnalisés**.

Il n'y a pas de bouton de recherche : les résultats se mettent à jour automatiquement environ une demi-seconde après que vous modifiez un filtre, et les personnes doivent correspondre à chaque filtre coché. Les filtres activés apparaissent sous forme de pastilles au-dessus des catégories : cliquez sur le **x** d'une pastille pour retirer ce filtre, ou sur **Tout effacer** pour les retirer tous. Cliquez de nouveau sur **Avancée** pour masquer le panneau.

Pour retrouver les nouvelles personnes, ouvrez **Appartenance et groupes** et cochez **Date d'ajout**. Le filtre est réglé par défaut sur **dans les N derniers jours** avec 30 renseignés : vous pouvez ainsi retrouver en un clic toutes les personnes ajoutées au cours du dernier mois. Modifiez le nombre de jours, ou passez sur *égal à / après / avant* pour choisir une date. **Date de naissance** et **Anniversaire de mariage** proposent aussi **dans les N derniers jours**. La date d'ajout n'est enregistrée que pour les personnes créées depuis fin octobre 2026 ; les personnes ajoutées auparavant n'ont pas de date, et ce filtre ne les trouve donc pas.

La catégorie **Champs personnalisés** répertorie les [champs personnalisés](../settings/custom-fields.md) de votre église -- les champs que vous définissez dans les Paramètres pour suivre vos propres informations (comme une date d'expiration de vérification d'antécédents). Les opérateurs proposés correspondent au type de chaque champ : les champs texte acceptent *contient / égal à / commence par / se termine par*, les champs numériques acceptent les opérateurs de comparaison, les champs date acceptent *égal à / après / avant*, et les champs Oui/Non et à choix multiple vous permettent de choisir une valeur. Tout champ que vous pouvez filtrer ici peut être enregistré sous forme de [liste](./lists.md) active.

## Enregistrer des recherches comme listes {#saving-searches-as-lists}

Après une recherche qui renvoie au moins une personne, un bouton **Enregistrer comme liste** apparaît dans l'en-tête de la page Personnes (pour le personnel autorisé à modifier les personnes). Cliquez dessus pour conserver votre requête actuelle sous un nom et une catégorie facultative, afin de la recharger instantanément lors de vos prochaines sessions. Consultez [Listes enregistrées](./lists.md) pour tous les détails.
