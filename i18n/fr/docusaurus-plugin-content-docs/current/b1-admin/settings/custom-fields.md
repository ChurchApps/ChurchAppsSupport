---
title: "Champs personnalisés"
---

# Champs personnalisés

<div class="article-intro">

Les **champs personnalisés** vous permettent de suivre vos propres informations sur chaque fiche de personne, pour tout ce que B1 n'a pas comme champ intégré, comme la date d'expiration d'une vérification des antécédents, une taille de T-shirt ou le statut d'une classe de baptême. Vous définissez un champ une seule fois dans les paramètres, puis vous renseignez une valeur sur le profil de chaque personne et vous effectuez des recherches ou créez des listes à partir de ce champ. Cela remplace l'ancienne solution de contournement qui consistait à créer un formulaire de personne pour stocker une seule donnée personnalisée.

</div>

## Vidéo de formation

<YouTube id="yUfDEbp2HQ4" title="Champs personnalisés, modification en masse et exportation dans B1" next="Créer des groupes et ajouter des membres dans B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez avoir l'autorisation **Personnes** en modification pour définir les champs et renseigner les valeurs, ainsi qu'un accès à la zone **Paramètres**. Toute personne disposant de l'autorisation Personnes en affichage peut voir les valeurs. Voir [Rôles et autorisations](./roles-permissions.md).
- Avant de commencer, décidez ce que vous voulez suivre et quel type convient le mieux (texte, nombre, date, réponse oui/non ou liste de choix).

</div>

## Ouvrir les champs personnalisés

Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), choisissez **Paramètres > Paramètres**, puis cliquez sur **Champs personnalisés** dans la liste de gauche pour atteindre la section **Champs personnalisés**. Vous pouvez aussi accéder directement à **/settings/custom-fields**. Vous verrez la liste de tous les champs que vous avez définis, avec leur **Nom** et leur **Type de champ**. Si vous n'en avez encore créé aucun, le panneau affiche *« No custom fields have been added yet. »*

## Ajouter un champ

1. Cliquez sur **Ajouter un champ**.
2. Dans l'éditeur qui s'ouvre à droite, saisissez un **Nom** : c'est l'intitulé que verra le personnel sur les fiches de personnes et dans la recherche (par exemple, *Expiration de la vérification des antécédents*).
3. Choisissez un **Type de champ** :
   - **Zone de texte** : texte court libre.
   - **Nombre entier** : nombres sans décimales (par exemple, un nombre d'occurrences).
   - **Décimal** : nombres pouvant comporter des décimales.
   - **Date** : une date du calendrier.
   - **Oui/Non** : une réponse simple par oui ou par non.
   - **Choix multiple** : une liste de choix. Lorsque vous sélectionnez ce type, un **éditeur de choix** apparaît pour vous permettre d'ajouter chaque option que les personnes peuvent sélectionner.
4. Cliquez sur **Enregistrer**.

Le champ est maintenant disponible sur le profil de chaque personne.

:::info
Les types de champs sont les mêmes que ceux utilisés pour les [questions de formulaire](../forms/creating-forms.md), ce qui garantit un comportement cohérent des valeurs dans B1.
:::

## Modifier un champ

Cliquez sur la ligne d'un champ dans la liste pour le rouvrir dans l'éditeur. Modifiez le nom, le type ou les choix, puis cliquez sur **Enregistrer**.

:::warning
Modifier le **Type de champ** d'un champ qui contient déjà des valeurs (par exemple, de Zone de texte à Date) peut laisser les valeurs saisies précédemment dans un format qui ne correspond plus au nouveau type. Modifiez les types avec précaution une fois que le personnel a commencé à remplir le champ.
:::

## Supprimer un champ

Ouvrez un champ pour le modifier, puis cliquez sur **Supprimer**. Une demande de confirmation s'affiche : *« Are you sure you wish to delete this custom field? Its stored values will also be removed. »* La suppression d'un champ l'efface **définitivement, ainsi que toutes les valeurs enregistrées pour ce champ** sur l'ensemble des personnes. Cette action est irréversible.

## Renseigner les valeurs d'une personne

Dès qu'au moins un champ personnalisé existe, ses valeurs apparaissent directement à côté des informations intégrées sur la fiche de chaque personne : vous les consultez avec les coordonnées de la personne, à gauche de son profil, et vous les modifiez dans le même formulaire que celui utilisé pour le reste de ses informations. Rien de supplémentaire n'apparaît tant que vous n'avez pas défini votre premier champ.

1. Ouvrez la fiche d'une personne dans **Personnes**.
2. Cliquez sur le bouton **Modifier** à gauche du profil, sous les coordonnées de la personne.
3. Faites défiler jusqu'à la zone **Champs personnalisés**, en bas du formulaire de modification, puis renseignez une valeur pour chaque champ. Chaque champ affiche la saisie correspondant à son type : un sélecteur de date pour les champs Date, une liste déroulante oui/non pour les champs Oui/Non, une liste de choix pour Choix multiple, et ainsi de suite.
4. Cliquez sur **Enregistrer**. Les valeurs de vos champs personnalisés sont enregistrées avec le reste des informations de la personne.

De retour sur le profil, tout champ ayant une valeur s'affiche désormais sous les coordonnées de la personne sous la forme *Nom du champ : valeur* (les réponses Oui/Non s'affichent comme *Oui* ou *Non*, et les Choix multiples affichent le libellé de l'option). Les champs laissés vides sont simplement masqués. Pour supprimer une valeur, modifiez la personne, videz le champ et enregistrez : une valeur vide est supprimée de la fiche plutôt qu'enregistrée comme vide.

:::tip
Le cas d'usage classique concerne la sécurité des bénévoles : créez un champ **Date** intitulé *Expiration de la vérification des antécédents*, saisissez la date de chaque bénévole, puis créez une [liste enregistrée](../people/lists.md) qui signale toute personne dont la date est dépassée.
:::

## Rechercher et créer des listes à partir des champs personnalisés

Les champs personnalisés sont entièrement consultables :

1. Sur la page **Personnes**, ouvrez la [recherche avancée](../people/searching-people.md).
2. Développez la catégorie **Champs personnalisés**.
3. Cochez le champ à filtrer, choisissez un opérateur et saisissez une valeur. Les opérateurs proposés correspondent au type du champ :
   - **Zone de texte** : contient, est égal à, commence par, se termine par.
   - **Nombre entier / Décimal** : est égal à, supérieur à, supérieur ou égal à, inférieur à, inférieur ou égal à.
   - **Date** : est égal à, après (supérieur à), avant (inférieur à).
   - **Oui/Non** : est égal à Oui ou Non.
   - **Choix multiple** : est égal à ou contient l'un des choix.

Enregistrez toute recherche sur champ personnalisé sous forme de [liste](../people/lists.md). Les listes sont des requêtes dynamiques : une liste créée à partir de *Expiration de la vérification des antécédents est avant aujourd'hui* réévalue chaque personne à chaque ouverture, sans intervention manuelle.

## Afficher un champ personnalisé en colonne

Pour voir les valeurs d'un champ pour tout le monde en même temps, ajoutez-le comme colonne sur la page **Personnes**. Passez **Afficher sous forme** en **Tableau**, cliquez sur l'icône **Sélectionner les colonnes** dans l'en-tête de la page, passez à l'onglet **Personnalisé**, puis cochez le champ. La valeur de chaque personne apparaît dans sa propre colonne, à côté des colonnes intégrées. Voir [Afficher les champs personnalisés en colonnes](../people/searching-people.md#showing-custom-fields-as-columns).

## Ce qui se passe lors d'une fusion

Lorsque vous [fusionnez deux fiches de personnes](../people/adding-people.md), les valeurs des champs personnalisés sont reprises automatiquement. La personne conservée garde ses propres valeurs ; pour tout champ pour lequel seule la personne supprimée avait une valeur, cette valeur est copiée afin que rien ne soit perdu.

## Articles connexes

- [Rechercher des personnes](../people/searching-people.md) : recherche avancée, y compris la catégorie Champs personnalisés, et affichage des champs personnalisés en colonnes
- [Listes enregistrées](../people/lists.md) : enregistrer une recherche sur champ personnalisé et la réexécuter en direct
- [Rôles et autorisations](./roles-permissions.md) : qui peut définir des champs et modifier les valeurs
- [Créer des formulaires](../forms/creating-forms.md) : pour la collecte de données en plusieurs questions, lorsqu'un formulaire complet convient mieux que des champs isolés
