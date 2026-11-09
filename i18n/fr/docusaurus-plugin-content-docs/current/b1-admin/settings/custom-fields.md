---
title: "Champs personnalisés"
description: "Définissez des champs personnalisés dans B1 Admin pour suivre des renseignements supplémentaires sur les personnes, comme la date d'expiration d'une vérification des antécédents ou la taille de t-shirt, puis effectuez des recherches et des filtres sur ces champs."
---

# Champs personnalisés

<div class="article-intro">

Les **champs personnalisés** vous permettent de suivre vos propres renseignements sur chaque fiche de personne, pour tout ce que B1 ne prévoit pas comme champ intégré : la date d'expiration d'une vérification des antécédents, une taille de t-shirt ou l'état d'une classe de baptême, par exemple. Vous définissez un champ une seule fois dans les paramètres, puis vous renseignez une valeur sur le profil de chaque personne, et vous effectuez des recherches ou créez des listes à partir de ce champ. Cela remplace l'ancienne solution de contournement qui consistait à créer un formulaire de personne pour stocker une seule donnée personnalisée.

</div>

## Vidéo de formation

<YouTube id="yUfDEbp2HQ4" title="Champs personnalisés, modification en masse et exportation dans B1" next="Créer des groupes et ajouter des membres dans B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **Personnes** en modification pour définir les champs et renseigner les valeurs, ainsi que d'un accès à la zone **Paramètres**. Toute personne disposant de la permission Personnes en consultation peut voir les valeurs. Voir [Rôles et autorisations](./roles-permissions.md).
- Décidez ce que vous voulez suivre et quel type convient le mieux (texte, nombre, date, réponse oui/non ou liste de choix) avant de commencer.

</div>

## Ouvrir les champs personnalisés

Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), choisissez **Paramètres > Paramètres**, puis cliquez sur **Champs personnalisés** dans la liste de gauche pour atteindre la section **Champs personnalisés**. Vous pouvez aussi y accéder directement à l'adresse **/settings/custom-fields**. Vous verrez la liste de tous les champs que vous avez définis, avec leur **nom** et leur **type de champ**. Si vous n'en avez encore créé aucun, le panneau indique *« Aucun champ personnalisé n'a encore été ajouté. »*

## Titres

La carte **Titres**, en haut de la section Champs personnalisés, répertorie les titres proposés dans la zone **Titre** lorsqu'on ajoute ou modifie une personne, dans B1 Admin comme dans l'application B1 (l'éditeur de profil et le formulaire d'inscription des visiteurs). La liste contient au départ M., Mme, Mlle, Ms, Dr, Prof, Rév. et Pasteur.

1. Saisissez un titre dans **Nouveau titre** (jusqu'à 10 caractères), comme *Diacre* ou *Ancien*, puis cliquez sur **Ajouter un titre**.
2. Pour retirer un titre de la liste, cliquez sur le **×** de sa pastille.
3. Cliquez sur **Enregistrer**.

:::tip
La zone Titre accepte toujours la saisie libre : le personnel et les membres peuvent donc entrer un titre qui ne figure pas dans la liste. Retirer un titre de la liste ne modifie pas les personnes qui le portent déjà.
:::

## Ajouter un champ

1. Cliquez sur **Ajouter un champ**.
2. Dans l'éditeur qui s'ouvre à droite, saisissez un **nom** : c'est l'intitulé que verra le personnel sur les fiches de personnes et dans la recherche (par exemple *Expiration de la vérification des antécédents*).
3. Choisissez un **type de champ** :
   - **Zone de texte** : texte court libre.
   - **Nombre entier** : nombres sans décimales (par exemple, un compte).
   - **Décimal** : nombres pouvant comporter des décimales.
   - **Date** : une date du calendrier.
   - **Oui/Non** : une réponse simple, oui ou non.
   - **Choix multiple** : une liste de choix. Lorsque vous sélectionnez ce type, un **éditeur de choix** apparaît pour vous permettre d'ajouter chaque option que les personnes peuvent sélectionner.
4. Cliquez sur **Enregistrer**.

Le champ est maintenant disponible sur le profil de chaque personne.

:::info
Les types de champs sont les mêmes que ceux des [questions de formulaire](../forms/creating-forms.md), de sorte que les valeurs se comportent de façon cohérente dans B1.
:::

## Modifier un champ

Cliquez sur la ligne d'un champ dans la liste pour le rouvrir dans l'éditeur. Modifiez le nom, le type ou les choix, puis cliquez sur **Enregistrer**.

:::warning
Modifier le **type de champ** d'un champ qui contient déjà des valeurs (par exemple de Zone de texte à Date) peut laisser les valeurs saisies précédemment dans un format qui ne correspond plus au nouveau type. Changez les types avec précaution une fois que le personnel a commencé à remplir le champ.
:::

## Supprimer un champ

Ouvrez un champ pour le modifier, puis cliquez sur **Supprimer**. Une confirmation vous demande : *« Voulez-vous vraiment supprimer ce champ personnalisé ? Ses valeurs enregistrées seront également supprimées. »* Supprimer un champ le retire **définitivement, ainsi que toutes les valeurs enregistrées pour ce champ** sur l'ensemble des personnes. Cette action est irréversible.

## Renseigner les valeurs d'une personne

Dès qu'au moins un champ personnalisé existe, ses valeurs se trouvent directement à côté des renseignements intégrés sur la fiche de chaque personne : vous les consultez avec les coordonnées de la personne, à gauche de son profil, et vous les modifiez dans le même formulaire que celui du reste de ses renseignements. Rien de supplémentaire n'apparaît tant que vous n'avez pas défini votre premier champ.

1. Ouvrez la fiche d'une personne dans **Personnes**.
2. Cliquez sur le bouton **Modifier** à gauche du profil, sous les coordonnées de la personne.
3. Faites défiler jusqu'à la zone **Champs personnalisés**, en bas du formulaire de modification, puis renseignez une valeur pour chaque champ. Chaque champ affiche la saisie qui correspond à son type : un sélecteur de date pour les champs Date, une liste déroulante oui/non pour les champs Oui/Non, une liste de choix pour Choix multiple, et ainsi de suite.
4. Cliquez sur **Enregistrer**. Les valeurs de vos champs personnalisés sont enregistrées avec le reste des renseignements de la personne.

De retour sur le profil, tout champ ayant une valeur s'affiche désormais sous les coordonnées de la personne, sous la forme *Nom du champ : valeur*. Les réponses Oui/Non s'affichent comme *Oui* ou *Non*, et les choix multiples affichent le libellé de l'option. Les champs laissés vides sont simplement masqués. Pour supprimer une valeur, modifiez la personne, videz le champ et enregistrez : une valeur vide est supprimée de la fiche plutôt que stockée comme vide.

:::tip
Le cas d'usage classique concerne la sécurité des bénévoles : créez un champ **Date** intitulé *Expiration de la vérification des antécédents*, saisissez la date de chaque bénévole, puis créez une [liste enregistrée](../people/lists.md) qui signale toute personne dont la date est dépassée.
:::

## Rechercher et créer des listes à partir des champs personnalisés

Les champs personnalisés sont entièrement consultables :

1. Sur la page **Personnes**, ouvrez la [recherche avancée](../people/searching-people.md).
2. Développez la catégorie **Champs personnalisés**.
3. Cochez le champ à filtrer, choisissez un opérateur et saisissez une valeur. Les opérateurs proposés correspondent au type du champ :
   - **Zone de texte** : contient, est égal à, commence par, se termine par.
   - **Nombre entier / Décimal** : est égal à, est supérieur à, est supérieur ou égal à, est inférieur à, est inférieur ou égal à.
   - **Date** : est égal à, après (supérieur à), avant (inférieur à).
   - **Oui/Non** : est égal à Oui ou Non.
   - **Choix multiple** : est égal à ou contient l'un des choix.

Enregistrez toute recherche sur un champ personnalisé comme [liste](../people/lists.md). Les listes sont des requêtes dynamiques : une liste construite sur *Expiration de la vérification des antécédents est avant aujourd'hui* réévalue chaque personne à chaque ouverture, sans effort de maintenance manuelle.

## Afficher un champ personnalisé en colonne

Pour voir les valeurs d'un champ pour tout le monde à la fois, ajoutez-le comme colonne sur la page **Personnes**. Passez **Afficher sous forme de** sur **Tableau**, cliquez sur l'icône **Sélectionner les colonnes** dans l'en-tête de la page, passez à l'onglet **Personnalisé**, puis cochez le champ. La valeur de chaque personne apparaît dans sa propre colonne, à côté des colonnes intégrées. Voir [Afficher les champs personnalisés en colonnes](../people/searching-people.md#showing-custom-fields-as-columns).

## Ce qui se passe lors d'une fusion

Lorsque vous [fusionnez deux fiches de personnes](../people/adding-people.md), les valeurs des champs personnalisés sont reprises automatiquement. La personne conservée garde ses propres valeurs ; pour tout champ pour lequel seule la personne supprimée avait une valeur, cette valeur est copiée afin que rien ne soit perdu.

## Articles connexes

- [Rechercher des personnes](../people/searching-people.md) : la recherche avancée, y compris la catégorie Champs personnalisés, et l'affichage des champs personnalisés en colonnes
- [Listes enregistrées](../people/lists.md) : enregistrer une recherche sur champ personnalisé et la réexécuter en direct
- [Rôles et autorisations](./roles-permissions.md) : qui peut définir des champs et modifier les valeurs
- [Créer des formulaires](../forms/creating-forms.md) : pour la collecte de données en plusieurs questions, lorsqu'un formulaire complet convient mieux que des champs isolés
