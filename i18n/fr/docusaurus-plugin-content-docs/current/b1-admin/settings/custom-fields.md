---
title: "Champs personnalisés"
---

# Champs personnalisés

<div class="article-intro">

Les **Champs personnalisés** vous permettent de suivre vos propres informations sur chaque dossier de personne -- les choses que B1 n'a pas de champ intégré pour, comme une date d'expiration de vérification de dossier, une taille de t-shirt, ou un statut de classe de baptême. Vous définissez un champ une fois dans les Paramètres, puis remplissez une valeur sur le profil de chaque personne et recherchez ou construisez des listes dessus. Cela remplace l'ancienne solution de contournement de créer un formulaire de personnes juste pour stocker un seul élément de données personnalisé.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **Personnes** pour définir des champs et remplir des valeurs, et d'accès à la zone **Paramètres**. Quiconque a la permission de voir les Personnes peut voir les valeurs. Voir [Rôles et autorisations](./roles-permissions.md).
- Décidez de ce que vous souhaitez suivre et quel type conviendrait le mieux (texte, un nombre, une date, une réponse oui/non, ou une liste de choix) avant de commencer.

</div>

## Ouverture des champs personnalisés

Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), choisissez **Paramètres > Paramètres**, et sélectionnez la fiche **Champs personnalisés**. Vous pouvez également y aller directement à **/settings/custom-fields**. Vous verrez une liste de chaque champ que vous avez défini, affichant son **Nom** et son **Type de champ**. Si vous n'en avez pas encore créé, le panneau lit *« Aucun champ personnalisé n'a été ajouté pour le moment. »*

## Ajout d'un champ

1. Cliquez sur **Ajouter un champ**.
2. Dans l'éditeur qui s'ouvre à droite, entrez un **Nom** -- c'est le libellé que le personnel verra sur les profils des personnes et dans la recherche (par exemple, *Vérification de dossier expire*).
3. Choisissez un **Type de champ** :
   - **Zone de texte** — texte court forme libre.
   - **Nombre entier** — nombres sans décimales (par exemple, un décompte).
   - **Décimal** — nombres qui peuvent inclure des décimales.
   - **Date** -- une date du calendrier.
   - **Oui/Non** -- une réponse simple oui ou non.
   - **Choix multiples** -- une liste de choix. Lorsque vous choisissez ce type, un **éditeur de choix** apparaît pour que vous puissiez ajouter chaque option que les gens peuvent sélectionner.
4. Cliquez sur **Enregistrer**.

Le champ est maintenant disponible sur le profil de chaque personne.

:::info
Les types de champs sont le même ensemble utilisé pour les [questions de formulaire](../forms/creating-forms.md), de sorte que les valeurs se comportent de manière cohérente dans B1.
:::

## Modification d'un champ

Cliquez sur n'importe quelle ligne de champ dans la liste pour la rouvrir dans l'éditeur. Modifiez le nom, le type ou les choix et cliquez sur **Enregistrer**.

:::warning
Changer le **Type de champ** d'un champ qui a déjà des valeurs (par exemple, de Zone de texte à Date) peut laisser les valeurs précédemment entrées dans un format qui ne correspond plus au nouveau type. Modifiez les types avec soin une fois que le personnel a commencé à remplir le champ.
:::

## Suppression d'un champ

Ouvrez un champ pour le modifier et cliquez sur **Supprimer**. Vous serez invité à confirmer : *« Êtes-vous sûr de vouloir supprimer ce champ personnalisé ? Ses valeurs stockées seront également supprimées. »* La suppression d'un champ supprime définitivement **chaque valeur stockée pour lui** sur toutes les personnes -- cela ne peut pas être annulé.

## Remplissage des valeurs sur une personne

Une fois qu'au moins un champ personnalisé existe, ses valeurs vivent juste à côté des détails intégrés sur chaque dossier de personne -- vous les regardez dans **Détails personnels** et les modifiez sur le même formulaire que vous utilisez pour le reste des informations de la personne. Rien d'extra n'apparaît jusqu'à ce que vous ayez défini votre premier champ.

1. Ouvrez un dossier de personne dans **Personnes**.
2. Dans la section **Détails personnels**, cliquez sur le bouton **Modifier** (crayon).
3. Faites défiler la zone **Champs personnalisés** au bas du formulaire de modification et remplissez une valeur pour chaque champ. Chaque champ affiche l'entrée qui correspond à son type -- un sélecteur de date pour les champs Date, une liste déroulante oui/non pour les champs Oui/Non, une liste de choix pour Choix multiples, etc.
4. Cliquez sur **Enregistrer**. Vos valeurs de champ personnalisé sont enregistrées avec le reste des détails de la personne.

De retour sur le profil, tout champ qui a une valeur apparaît maintenant dans la section **Détails personnels** (les réponses Oui/Non se lisent comme *Oui* ou *Non*, et Choix multiples affiche le libellé de l'option). Les champs laissés vierges sont simplement masqués. Pour supprimer une valeur, modifiez la personne, effacez le champ et enregistrez -- une valeur vide est supprimée du dossier plutôt que stockée en tant que vierge.

:::tip
Le cas d'usage classique est la sécurité des bénévoles : créez un champ **Date** appelé *Vérification de dossier expire*, enregistrez la date de chaque bénévole, puis construisez une [Liste enregistrée](../people/lists.md) qui signale toute personne dont la date a dépassé.
:::

## Recherche et création de listes sur les champs personnalisés

Les champs personnalisés sont entièrement consultables :

1. Sur la page **Personnes**, ouvrez la [Recherche avancée](../people/searching-people.md).
2. Développez la catégorie **Champs personnalisés**.
3. Cochez le champ sur lequel vous souhaitez filtrer, choisissez un opérateur et entrez une valeur. Les opérateurs offerts correspondent au type du champ :
   - **Zone de texte** — contient, égale, commence par, se termine par.
   - **Nombre entier / Décimal** — égale, supérieur à, supérieur ou égal, inférieur à, inférieur ou égal.
   - **Date** — égale, après (supérieur à), avant (inférieur à).
   - **Oui/Non** — égale Oui ou Non.
   - **Choix multiples** — égale ou contient l'un des choix.

Enregistrez tout recherche de champ personnalisé comme une [Liste](../people/lists.md). Les listes sont des requêtes en direct, donc une liste construite sur *Vérification de dossier expire avant aujourd'hui* re-vérifie chaque personne chaque fois que vous l'ouvrez -- pas d'entretien manuel.

## Affichage d'un champ personnalisé en tant que colonne

Pour voir les valeurs d'un champ pour tout le monde à la fois, ajoutez-le en tant que colonne sur la page **Personnes**. Ouvrez le sélecteur de colonnes, basculez vers l'onglet **Personnalisé**, et vérifiez le champ. La valeur de chaque personne apparaît dans sa propre colonne à côté des champs intégrés. Voir [Affichage des champs personnalisés en tant que colonnes](../people/searching-people.md#showing-custom-fields-as-columns).

## Ce qui se passe lors d'une fusion

Lorsque vous [fusionnez deux dossiers de personnes](../people/adding-people.md), les valeurs de champ personnalisé se transfèrent automatiquement. La personne que vous conservez conserve ses propres valeurs ; pour tout champ où seule la personne supprimée avait une valeur, cette valeur est copiée afin que rien ne soit perdu.

## Articles connexes

- [Recherche de personnes](../people/searching-people.md) — recherche avancée, y compris la catégorie Champs personnalisés, et affichage des champs personnalisés en tant que colonnes
- [Listes enregistrées](../people/lists.md) — enregistrer une recherche de champ personnalisé et la réexécuter en direct
- [Rôles et autorisations](./roles-permissions.md) — qui peut définir des champs et modifier les valeurs
- [Création de formulaires](../forms/creating-forms.md) -- pour la collecte de données multi-questions où un formulaire complet convient mieux que des champs uniques

