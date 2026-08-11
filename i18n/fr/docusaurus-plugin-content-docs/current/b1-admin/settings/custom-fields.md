---
title: "Champs personnalisés"
---

# Champs personnalisés

<div class="article-intro">

Les **Champs personnalisés** vous permettent de suivre vos propres informations dans chaque enregistrement de personne -- des choses que B1 n'a pas de champ intégré, comme une date d'expiration de vérification des antécédents, une taille de t-shirt ou un statut de classe de baptême. Vous définissez un champ une fois dans Paramètres, puis remplissez une valeur sur le profil de chaque personne et recherchez ou construisez des listes en fonction de cela. Cela remplace l'ancienne solution de contournement consistant à créer un formulaire Personnes uniquement pour stocker un seul morceau de données personnalisées.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **Personnes** pour définir les champs et remplir les valeurs, ainsi que l'accès à la zone **Paramètres**. Quiconque a la permission de voir les Personnes peut voir les valeurs. Consultez [Rôles & Permissions](./roles-permissions.md).
- Décidez ce que vous voulez suivre et quel type correspond le mieux (texte, un nombre, une date, une réponse oui/non ou une liste déroulante) avant de commencer.

</div>

## Ouverture des champs personnalisés

Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche), choisissez **Paramètres** et sélectionnez la carte **Champs personnalisés**. Vous pouvez également y accéder directement sur **/settings/custom-fields**. Vous verrez une liste de tous les champs que vous avez définis, affichant son **Nom** et son **Type de champ**. Si vous n'en avez pas encore créé, le panneau affiche « *Aucun champ personnalisé n'a été ajouté pour le moment.* »

## Ajout d'un champ

1. Cliquez sur **Ajouter un champ**.
2. Dans l'éditeur qui s'ouvre à droite, entrez un **Nom** -- c'est le label que le personnel verra sur les profils des personnes et dans la recherche (par exemple, *L'examen des antécédents expire*).
3. Choisissez un **Type de champ** :
   - **Zone de texte** -- Texte court à forme libre.
   - **Nombre entier** -- Nombres sans décimales (par exemple, un décompte).
   - **Décimal** -- Nombres qui peuvent inclure des décimales.
   - **Date** -- Une date civile.
   - **Oui/Non** -- Une simple réponse oui ou non.
   - **Choix multiple** -- Une liste déroulante. Lorsque vous choisissez ce type, un **éditeur de choix** apparaît pour que vous puissiez ajouter chaque option que les personnes peuvent sélectionner.
4. Cliquez sur **Enregistrer**.

Le champ est désormais disponible sur le profil de chaque personne.

:::info
Les types de champs sont le même ensemble utilisé pour les [questions de formulaire](../forms/creating-forms.md), donc les valeurs se comportent de manière cohérente dans B1.
:::

## Modification d'un champ

Cliquez sur n'importe quelle ligne de champ dans la liste pour la réouvrir dans l'éditeur. Modifiez le nom, le type ou les choix et cliquez sur **Enregistrer**.

:::warning
La modification du **Type de champ** d'un champ qui a déjà des valeurs (par exemple, de Zone de texte à Date) peut laisser les valeurs précédemment entrées dans un format qui ne correspond plus au nouveau type. Modifiez les types avec prudence une fois que le personnel a commencé à remplir le champ.
:::

## Suppression d'un champ

Ouvrez un champ pour l'édition et cliquez sur **Supprimer**. On vous demandera de confirmer : *« Êtes-vous sûr de vouloir supprimer ce champ personnalisé ? Ses valeurs stockées seront également supprimées. »* La suppression d'un champ supprime définitivement **et chaque valeur stockée pour cela** sur toutes les personnes -- cela ne peut pas être annulé.

## Remplissage des valeurs sur une personne

Une fois qu'au moins un champ personnalisé existe, ses valeurs vivent juste à côté des détails intégrés sur chaque enregistrement de personne -- vous les consultez dans **Détails personnels** et les modifiez sur le même formulaire que vous utilisez pour le reste des informations de la personne. Rien d'extra n'apparaît jusqu'à ce que vous ayez défini votre premier champ.

1. Ouvrez le dossier d'une personne dans **Personnes**.
2. Dans la section **Détails personnels**, cliquez sur le bouton **Modifier** (crayon).
3. Faites défiler jusqu'à la zone **Champs personnalisés** en bas du formulaire d'édition et remplissez une valeur pour chaque champ. Chaque champ affiche l'entrée qui correspond à son type -- un sélecteur de date pour les champs Date, une liste déroulante oui/non pour les champs Oui/Non, une liste déroulante pour Choix multiple, etc.
4. Cliquez sur **Enregistrer**. Vos valeurs de champ personnalisé sont enregistrées avec le reste des détails de la personne.

De retour sur le profil, tout champ ayant une valeur s'affiche maintenant dans la section **Détails personnels** (les réponses Oui/Non s'affichent comme *Oui* ou *Non*, et Choix multiple affiche le label de l'option). Les champs laissés vides sont simplement masqués. Pour supprimer une valeur, modifiez la personne, effacez le champ et enregistrez -- une valeur vide est supprimée de l'enregistrement plutôt que d'être stockée comme vide.

:::tip
Le cas d'usage classique est la sécurité des bénévoles : créez un champ **Date** appelé *L'examen des antécédents expire*, enregistrez la date de chaque bénévole, puis construisez une [Liste sauvegardée](../people/lists.md) qui signale quiconque dont la date a passé.
:::

## Recherche et construction de listes sur des champs personnalisés

Les champs personnalisés sont entièrement consultables :

1. Sur la page **Personnes**, ouvrez la [Recherche avancée](../people/searching-people.md).
2. Développez la catégorie **Champs personnalisés**.
3. Cochez le champ sur lequel vous souhaitez filtrer, choisissez un opérateur et entrez une valeur. Les opérateurs proposés correspondent au type du champ :
   - **Zone de texte** -- contient, égale, commence par, se termine par.
   - **Nombre entier / Décimal** -- égale, supérieur à, supérieur ou égal, inférieur à, inférieur ou égal.
   - **Date** -- égale, après (supérieur à), avant (inférieur à).
   - **Oui/Non** -- égale Oui ou Non.
   - **Choix multiple** -- égale ou contient l'un des choix.

Enregistrez toute recherche de champ personnalisé comme une [Liste](../people/lists.md). Les listes sont des requêtes actives, donc une liste construite sur *L'examen des antécédents expire avant aujourd'hui* re-vérifie chaque personne chaque fois que vous l'ouvrez -- aucun entretien manuel.

## Ce qui se passe lors de la fusion

Lorsque vous [fusionnez deux enregistrements de personne](../people/adding-people.md), les valeurs des champs personnalisés se transfèrent automatiquement. La personne que vous conservez garde ses propres valeurs ; pour tout champ où seule la personne supprimée avait une valeur, cette valeur est copiée pour que rien ne soit perdu.

## Articles connexes

- [Recherche Personnes](../people/searching-people.md) -- Recherche avancée, y compris la catégorie Champs personnalisés
- [Listes sauvegardées](../people/lists.md) -- Enregistrez une recherche de champ personnalisé et relancez-la en direct
- [Rôles & Permissions](./roles-permissions.md) -- Qui peut définir les champs et modifier les valeurs
- [Création de formulaires](../forms/creating-forms.md) -- Pour la collecte de données multi-questions où un formulaire complet convient mieux que des champs individuels
