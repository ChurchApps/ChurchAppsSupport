---
title: "Champs personnalisés"
---

# Champs personnalisés

<div class="article-intro">

Les **Champs personnalisés** vous permettent de suivre vos propres informations sur chaque fiche de personne — des éléments pour lesquels B1 n'a pas de champ intégré, comme une date d'expiration de vérification des antécédents, une taille de t-shirt, ou un statut de cours de baptême. Vous définissez un champ une fois dans Paramètres, puis vous remplissez une valeur sur le profil de chaque personne et pouvez rechercher ou construire des listes à partir de celui-ci. Cela remplace l'ancienne solution de contournement consistant à créer un formulaire Personnes juste pour stocker une seule donnée personnalisée.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission de modification de **Personnes** pour définir des champs et remplir des valeurs, ainsi que de l'accès à la zone **Paramètres**. Toute personne disposant de la permission de visualisation de Personnes peut voir les valeurs. Voir [Rôles et permissions](./roles-permissions.md).
- Décidez ce que vous souhaitez suivre et quel type convient le mieux (texte, nombre, date, réponse oui/non, ou liste de choix) avant de commencer.

</div>

## Ouvrir les champs personnalisés

Dans B1 Admin, allez à **Paramètres** dans la barre latérale gauche et sélectionnez la carte **Champs personnalisés**. Vous pouvez aussi y accéder directement à **/settings/custom-fields**. Vous verrez une liste de chaque champ que vous avez défini, montrant son **Nom** et son **Type de champ**. Si vous n'en avez encore créé aucun, le panneau indique *« Aucun champ personnalisé n'a encore été ajouté. »*

## Ajouter un champ

1. Cliquez sur **Ajouter un champ**.
2. Dans l'éditeur qui s'ouvre à droite, saisissez un **Nom** — c'est le libellé que le personnel verra sur les profils de personnes et dans la recherche (par exemple, *Expiration de la vérification des antécédents*).
3. Choisissez un **Type de champ** :
   - **Zone de texte** — texte court libre.
   - **Nombre entier** — nombres sans décimales (par exemple, un compte).
   - **Décimal** — nombres pouvant inclure des décimales.
   - **Date** — une date de calendrier.
   - **Oui/Non** — une simple réponse oui ou non.
   - **Choix multiple** — une liste de choix. Lorsque vous choisissez ce type, un **éditeur de choix** apparaît afin que vous puissiez ajouter chaque option sélectionnable.
4. Cliquez sur **Enregistrer**.

Le champ est maintenant disponible sur le profil de chaque personne.

:::info
Les types de champs sont le même ensemble utilisé pour les [questions de formulaire](../forms/creating-forms.md), donc les valeurs se comportent de façon cohérente dans B1.
:::

## Modifier un champ

Cliquez sur n'importe quelle ligne de champ dans la liste pour la rouvrir dans l'éditeur. Modifiez le nom, le type ou les choix et cliquez sur **Enregistrer**.

:::warning
Modifier le **Type de champ** d'un champ qui a déjà des valeurs (par exemple, de Zone de texte à Date) peut laisser les valeurs précédemment saisies dans un format qui ne correspond plus au nouveau type. Modifiez les types avec prudence une fois que le personnel a commencé à remplir le champ.
:::

## Supprimer un champ

Ouvrez un champ en modification et cliquez sur **Supprimer**. Il vous sera demandé de confirmer : *« Êtes-vous sûr de vouloir supprimer ce champ personnalisé ? Ses valeurs enregistrées seront également supprimées. »* Supprimer un champ le retire définitivement **ainsi que chaque valeur stockée pour celui-ci** sur toutes les personnes — cette action ne peut pas être annulée.

## Remplir des valeurs sur une personne

Une fois qu'au moins un champ personnalisé existe, ses valeurs se trouvent juste à côté des détails intégrés sur la fiche de chaque personne — vous les consultez dans **Détails personnels** et les modifiez sur le même formulaire que vous utilisez pour le reste des informations de la personne. Rien de supplémentaire n'apparaît tant que vous n'avez pas défini votre premier champ.

1. Ouvrez la fiche d'une personne dans **Personnes**.
2. Dans la section **Détails personnels**, cliquez sur le bouton **Modifier** (crayon).
3. Faites défiler jusqu'à la zone **Champs personnalisés** en bas du formulaire de modification et remplissez une valeur pour chaque champ. Chaque champ affiche la saisie correspondant à son type — un sélecteur de date pour les champs Date, une liste déroulante oui/non pour les champs Oui/Non, une liste de choix pour Choix multiple, etc.
4. Cliquez sur **Enregistrer**. Vos valeurs de champs personnalisés sont enregistrées avec le reste des détails de la personne.

De retour sur le profil, tout champ ayant une valeur s'affiche désormais dans la section **Détails personnels** (les réponses Oui/Non se lisent comme *Oui* ou *Non*, et Choix multiple affiche le libellé de l'option). Les champs laissés vides sont simplement masqués. Pour supprimer une valeur, modifiez la personne, videz le champ, et enregistrez — une valeur vide est supprimée de la fiche plutôt que stockée comme vide.

:::tip
Le cas d'usage classique est la sécurité des bénévoles : créez un champ **Date** appelé *Expiration de la vérification des antécédents*, enregistrez la date de chaque bénévole, puis construisez une [liste enregistrée](../people/lists.md) qui signale toute personne dont la date est dépassée.
:::

## Rechercher et construire des listes sur les champs personnalisés

Les champs personnalisés sont entièrement consultables :

1. Sur la page **Personnes**, ouvrez la [recherche avancée](../people/searching-people.md).
2. Développez la catégorie **Champs personnalisés**.
3. Cochez le champ sur lequel vous voulez filtrer, choisissez un opérateur, et saisissez une valeur. Les opérateurs proposés correspondent au type du champ :
   - **Zone de texte** — contient, égal à, commence par, se termine par.
   - **Nombre entier / Décimal** — égal à, supérieur à, supérieur ou égal à, inférieur à, inférieur ou égal à.
   - **Date** — égal à, après (supérieur à), avant (inférieur à).
   - **Oui/Non** — égal à Oui ou Non.
   - **Choix multiple** — égal à ou contient l'un des choix.

Enregistrez toute recherche de champ personnalisé sous forme de [liste](../people/lists.md). Les listes sont des requêtes en direct, donc une liste construite sur *Expiration de la vérification des antécédents avant aujourd'hui* revérifie chaque personne à chaque fois que vous l'ouvrez — sans entretien manuel.

## Ce qui se passe lors d'une fusion

Lorsque vous [fusionnez deux fiches de personne](../people/adding-people.md), les valeurs de champs personnalisés sont transférées automatiquement. La personne que vous conservez garde ses propres valeurs ; pour tout champ où seule la personne supprimée avait une valeur, cette valeur est copiée afin que rien ne soit perdu.

## Articles associés

- [Rechercher des personnes](../people/searching-people.md) — recherche avancée, y compris la catégorie Champs personnalisés
- [Listes enregistrées](../people/lists.md) — enregistrer une recherche de champ personnalisé et la relancer en direct
- [Rôles et permissions](./roles-permissions.md) — qui peut définir des champs et modifier des valeurs
- [Créer des formulaires](../forms/creating-forms.md) — pour la collecte de données à questions multiples lorsqu'un formulaire complet convient mieux que des champs isolés
