---
title: "Champs personnalisés"
---

# Champs personnalisés

<div class="article-intro">

**Les champs personnalisés** vous permettent de suivre vos propres informations sur chaque enregistrement de personne -- des choses que B1 n'a pas de champ intégré pour, comme une date d'expiration de vérification des antécédents, une taille de T-shirt ou un statut de classe de baptême. Vous définissez un champ une fois dans les paramètres, puis remplissez une valeur sur le profil de chaque personne et recherchez ou créez des listes selon celui-ci. Cela remplace l'ancienne contournement de création d'un formulaire Personnes juste pour stocker une seule donnée personnalisée.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **Personnes** modifier pour définir les champs et remplir les valeurs, et accès à la zone **Paramètres**. N'importe qui avec la permission Personnes voir peut voir les valeurs. Voir [Rôles et permissions](./roles-permissions.md).
- Décider ce que vous voulez suivre et quel type convient le mieux (texte, un nombre, une date, une réponse oui/non, ou une liste de sélection) avant de commencer.

</div>

## Ouverture des champs personnalisés

Dans B1 Admin, accédez à **Paramètres** dans la barre latérale gauche et sélectionner la carte **Champs personnalisés**. Vous pouvez également y accéder directement à **/settings/custom-fields**. Vous verrez une liste de tous les champs que vous avez définis, affichant son **Nom** et **Type de champ**. Si vous n'en avez pas encore créé, le panneau lit *« Aucun champ personnalisé n'a été ajouté pour le moment. »*

## Ajouter un champ

1. Cliquer **Ajouter un champ**.
2. Dans l'éditeur qui s'ouvre à droite, entrer un **Nom** -- c'est le libellé que le personnel verra sur les profils de personne et dans la recherche (par exemple, *La vérification des antécédents expire*).
3. Choisir un **Type de champ** :
   - **Boîte de texte** -- texte court de forme libre.
   - **Nombre entier** -- nombres sans décimales (par exemple, un compte).
   - **Décimal** -- nombres qui peuvent inclure des décimales.
   - **Date** -- une date de calendrier.
   - **Oui/Non** -- une simple réponse oui ou non.
   - **Choix multiple** -- une liste de sélection. Quand vous choisissez ce type, un **éditeur de choix** apparaît pour que vous puissiez ajouter chaque option que les personnes peuvent sélectionner.
4. Cliquer **Enregistrer**.

Le champ est maintenant disponible sur le profil de chaque personne.

:::info
Les types de champs sont le même ensemble utilisé pour les [questions de formulaire](../forms/creating-forms.md), donc les valeurs se comportent de manière cohérente à travers B1.
:::

## Édition d'un champ

Cliquer sur n'importe quelle ligne de champ dans la liste pour la rouvrir dans l'éditeur. Modifier le nom, le type ou les choix et cliquer **Enregistrer**.

:::warning
Modifier le **Type de champ** d'un champ qui a déjà des valeurs (par exemple, de Boîte de texte à Date) peut laisser les valeurs précédemment saisies dans un format qui ne correspond plus au nouveau type. Modifier les types avec prudence une fois que le personnel a commencé à remplir le champ.
:::

## Suppression d'un champ

Ouvrir un champ pour l'édition et cliquer **Supprimer**. Vous serez invité à confirmer : *« Êtes-vous sûr de vouloir supprimer ce champ personnalisé ? Ses valeurs stockées seront également supprimées. »* Supprimer un champ supprime définitivement celui-ci **et toutes les valeurs stockées pour celui-ci** sur toutes les personnes -- cela ne peut pas être annulé.

## Remplir les valeurs sur une personne

Une fois qu'au moins un champ personnalisé existe, ses valeurs vivent directement à côté des détails intégrés sur chaque enregistrement de personne -- vous les affichez dans **Détails personnels** et les modifiez sur le même formulaire que vous utilisez pour le reste des informations de la personne. Rien d'extra n'apparaît jusqu'à ce que vous ayez défini votre premier champ.

1. Ouvrir l'enregistrement d'une personne dans **Personnes**.
2. Dans la section **Détails personnels**, cliquer le bouton **Éditer** (crayon).
3. Faites défiler jusqu'à la zone **Champs personnalisés** en bas du formulaire d'édition et remplissez une valeur pour chaque champ. Chaque champ affiche l'entrée qui correspond à son type -- un sélecteur de date pour les champs Date, une liste déroulante oui/non pour les champs Oui/Non, une liste de sélection pour Choix multiple, et ainsi de suite.
4. Cliquer **Enregistrer**. Vos valeurs de champ personnalisé sont enregistrées avec le reste des détails de la personne.

De retour sur le profil, tout champ qui a une valeur apparaît maintenant dans la section **Détails personnels** (Les réponses oui/non se lisent comme *Oui* ou *Non*, et Choix multiple affiche l'étiquette de l'option). Les champs laissés vides sont simplement cachés. Pour supprimer une valeur, modifier la personne, effacer le champ et enregistrer -- une valeur vide est supprimée de l'enregistrement plutôt que stockée en blanc.

:::tip
Le cas d'usage classique est la sécurité des bénévoles : créer un champ **Date** appelé *La vérification des antécédents expire*, enregistrer la date de chaque bénévole, puis construire une [Liste enregistrée](../people/lists.md) qui signale n'importe qui dont la date a dépassé.
:::

## Recherche et création de listes sur les champs personnalisés

Les champs personnalisés sont entièrement consultables :

1. Sur la page **Personnes**, ouvrir la [Recherche avancée](../people/searching-people.md).
2. Développer la catégorie **Champs personnalisés**.
3. Cocher le champ sur lequel vous voulez filtrer, choisir un opérateur et entrer une valeur. Les opérateurs offerts correspondent au type du champ :
   - **Boîte de texte** -- contient, égale, commence par, finit par.
   - **Nombre entier / Décimal** -- égale, supérieur à, supérieur ou égal à, inférieur à, inférieur ou égal à.
   - **Date** -- égale, après (supérieur à), avant (inférieur à).
   - **Oui/Non** -- égale Oui ou Non.
   - **Choix multiple** -- égale ou contient l'une des choices.

Enregistrer toute recherche de champ personnalisé comme une [Liste](../people/lists.md). Les listes sont des requêtes en direct, donc une liste construite sur *La vérification des antécédents expire avant aujourd'hui* revérifier chaque personne chaque fois que vous l'ouvrez -- aucune maintenance manuelle.

## Ce qui se passe lors de la fusion

Quand vous [fusionnez deux enregistrements de personnes](../people/adding-people.md), les valeurs de champ personnalisé se reportent automatiquement. La personne que vous gardez conserve ses propres valeurs ; pour tout champ où seule la personne supprimée avait une valeur, cette valeur est copiée pour ne rien perdre.

## Articles connexes

- [Recherche de personnes](../people/searching-people.md) -- recherche avancée, y compris la catégorie Champs personnalisés
- [Listes enregistrées](../people/lists.md) -- enregistrer une recherche de champ personnalisé et la réexécuter en direct
- [Rôles et permissions](./roles-permissions.md) -- qui peut définir les champs et modifier les valeurs
- [Création de formulaires](../forms/creating-forms.md) -- pour la collecte de données multi-questions où un formulaire complet convient mieux que les champs simples
