---
title: "Champs personnalisés"
description: "Définissez des champs personnalisés dans B1 Admin pour suivre des informations supplémentaires sur les personnes, comme les dates d'expiration des vérifications d'antécédents ou les tailles de chandails, puis effectuez des recherches et des filtres sur ces champs."
---

# Champs personnalisés

<div class="article-intro">

Les **champs personnalisés** vous permettent de suivre vos propres informations sur chaque fiche de personne — des éléments pour lesquels B1 ne dispose pas de champ intégré, comme une date d'expiration de vérification d'antécédents, une taille de chandail ou l'état d'un cours de baptême. Vous définissez un champ une seule fois dans les Paramètres, puis vous saisissez une valeur sur le profil de chaque personne et vous effectuez des recherches ou créez des listes à partir de ce champ. Cela remplace l'ancienne solution de contournement qui consistait à créer un formulaire de personne uniquement pour stocker une seule donnée personnalisée.

</div>

## Vidéo de formation {#training-video}

<YouTube id="yUfDEbp2HQ4" title="Champs personnalisés, modification en lot et exportation dans B1" next="Créer des groupes et ajouter des membres dans B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'autorisation **Modifier les paramètres de l'église** pour ouvrir la page Paramètres (et pour enregistrer la liste des titres), ainsi que de l'autorisation de modification des **Personnes** pour définir des champs et saisir des valeurs. Toute personne disposant de l'autorisation de consultation des Personnes peut voir les valeurs. Voir [Rôles et autorisations](./roles-permissions.md).
- Décidez ce que vous voulez suivre et quel type convient le mieux (texte, nombre, date, oui/non ou liste de choix) avant de commencer.

</div>

## Ouvrir les champs personnalisés {#opening-custom-fields}

Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), choisissez **Paramètres > Paramètres**, puis cliquez sur **Champs personnalisés** dans la liste de gauche pour atteindre la section **Champs personnalisés**. Vous pouvez aussi y accéder directement à l'adresse **/settings/custom-fields**. Vous verrez la liste de tous les champs que vous avez définis, avec leur **nom** et leur **type de champ**. Si vous n'en avez encore créé aucun, le panneau indique *« Aucun champ personnalisé n'a encore été ajouté. »*

## Titres {#titles}

La carte **Titres**, en haut de la section Champs personnalisés, énumère les titres proposés dans la case **Titre** lorsqu'une personne est ajoutée ou modifiée, dans B1 Admin et dans l'application B1 (l'éditeur de profil et le formulaire d'inscription des visiteurs). La liste contient au départ : M., Mme, Mlle, Mme, Dr, Prof., Rév. et Pasteur.

1. Saisissez un titre dans **Nouveau titre** (jusqu'à 10 caractères), par exemple *Diacre* ou *Ancien*, puis cliquez sur **Ajouter le titre**.
2. Pour retirer un titre de la liste, cliquez sur le **×** de sa puce.
3. Cliquez sur **Enregistrer**. Un message *Titres enregistrés.* confirme la modification. Si vous ajoutez un titre déjà présent dans la liste, le message *Ce titre figure déjà dans la liste.* apparaît.

:::tip
La case Titre accepte toujours la saisie libre, de sorte que le personnel et les membres peuvent saisir un titre qui ne figure pas dans la liste. Retirer un titre de la liste ne modifie pas les personnes qui le possèdent déjà.
:::

## Ajouter un champ {#adding-a-field}

1. Cliquez sur **Ajouter un champ**.
2. Dans l'éditeur qui s'ouvre à droite, saisissez un **nom** — c'est l'étiquette que le personnel verra sur les profils de personnes et dans la recherche (par exemple, *Vérification d'antécédents expire le*).
3. Choisissez un **type de champ** :
   - **Zone de texte** — texte court libre.
   - **Nombre entier** — nombres sans décimales (par exemple, un compte).
   - **Décimal** — nombres pouvant comporter des décimales.
   - **Date** — une date du calendrier.
   - **Oui/Non** — une simple réponse par oui ou par non.
   - **Choix multiple** — une liste de choix. Lorsque vous choisissez ce type, un **éditeur de choix** apparaît afin que vous ajoutiez chaque option que les personnes peuvent sélectionner.
4. Cliquez sur **Enregistrer**.

Le champ est désormais disponible sur le profil de chaque personne.

:::info
Les types de champs sont les mêmes que ceux des [questions de formulaire](../forms/creating-forms.md), de sorte que les valeurs se comportent de façon cohérente dans toute l'application B1.
:::

## Modifier un champ {#editing-a-field}

Cliquez sur n'importe quelle ligne de champ dans la liste pour la rouvrir dans l'éditeur. Modifiez le nom, le type ou les choix, puis cliquez sur **Enregistrer**.

:::warning
Modifier le **type de champ** d'un champ qui contient déjà des valeurs (par exemple, de Zone de texte à Date) peut laisser les valeurs saisies dans un format qui ne correspond plus au nouveau type. Changez les types avec précaution une fois que le personnel a commencé à remplir le champ.
:::

## Supprimer un champ {#deleting-a-field}

Ouvrez un champ pour le modifier et cliquez sur **Supprimer**. Une confirmation vous sera demandée : *« Êtes-vous sûr de vouloir supprimer ce champ personnalisé ? Ses valeurs enregistrées seront aussi supprimées. »* Supprimer un champ retire définitivement celui-ci **et toutes les valeurs qui y sont enregistrées** pour toutes les personnes — cette action est irréversible.

## Saisir des valeurs pour une personne {#filling-in-values-on-a-person}

Dès qu'au moins un champ personnalisé existe, ses valeurs se trouvent directement à côté des informations intégrées de la fiche de chaque personne : vous les consultez avec les coordonnées de la personne, à gauche de son profil, et vous les modifiez dans le même formulaire que pour le reste des informations de la personne. Rien de supplémentaire n'apparaît tant que vous n'avez pas défini votre premier champ.

1. Ouvrez la fiche d'une personne dans **Personnes**.
2. Cliquez sur le bouton **Modifier** à gauche du profil, sous les coordonnées de la personne.
3. Faites défiler jusqu'à la zone **Champs personnalisés**, au bas du formulaire de modification, et saisissez une valeur pour chaque champ. Chaque champ affiche le contrôle correspondant à son type — un sélecteur de date pour les champs Date, une liste oui/non pour les champs Oui/Non, une liste de choix pour Choix multiple, etc.
4. Cliquez sur **Enregistrer**. Les valeurs de vos champs personnalisés sont enregistrées avec le reste des informations de la personne.

De retour sur le profil, tout champ ayant une valeur apparaît maintenant sous les coordonnées de la personne sous la forme *Nom du champ : valeur* (les réponses Oui/Non s'affichent comme *Oui* ou *Non*, et Choix multiple affiche l'étiquette de l'option). Les champs laissés vides sont simplement masqués. Pour retirer une valeur, modifiez la personne, effacez le champ et enregistrez — une valeur vide est supprimée de la fiche plutôt que stockée comme vide.

:::tip
Le cas d'usage classique concerne la sécurité des bénévoles : créez un champ **Date** nommé *Vérification d'antécédents expire le*, saisissez la date de chaque bénévole, puis créez une [liste enregistrée](../people/lists.md) qui signale toute personne dont la date est dépassée.
:::

## Rechercher et créer des listes à partir des champs personnalisés {#searching-and-building-lists-on-custom-fields}

Les champs personnalisés sont entièrement consultables :

1. Sur la page **Personnes**, ouvrez la [recherche avancée](../people/searching-people.md).
2. Développez la catégorie **Champs personnalisés**.
3. Cochez le champ à filtrer, choisissez un opérateur et saisissez une valeur. Les opérateurs proposés correspondent au type du champ :
   - **Zone de texte** — contient, est égal à, commence par, se termine par.
   - **Nombre entier / Décimal** — est égal à, supérieur à, supérieur ou égal à, inférieur à, inférieur ou égal à.
   - **Date** — est égale à, postérieure à (supérieure à), antérieure à (inférieure à).
   - **Oui/Non** — est égal à Oui ou Non.
   - **Choix multiple** — est égal à ou contient l'un des choix.

Enregistrez toute recherche sur un champ personnalisé comme une [liste](../people/lists.md). Les listes sont des requêtes dynamiques : une liste construite sur *Vérification d'antécédents expire le est antérieur à aujourd'hui* revérifie chaque personne à chaque ouverture — aucun entretien manuel n'est nécessaire.

## Afficher un champ personnalisé comme colonne {#showing-a-custom-field-as-a-column}

Pour voir les valeurs d'un champ pour tout le monde à la fois, ajoutez-le comme colonne sur la page **Personnes**. Passez **Afficher sous forme** à **Tableau**, cliquez sur l'icône **Sélectionner les colonnes** dans l'en-tête de la page, passez à l'onglet **Personnalisé** et cochez le champ. La valeur de chaque personne apparaît dans sa propre colonne, à côté des colonnes intégrées. Voir [Afficher les champs personnalisés en colonnes](../people/searching-people.md#showing-custom-fields-as-columns).

## Ce qui se passe lors d'une fusion {#what-happens-on-merge}

Lorsque vous [fusionnez deux fiches de personnes](../people/adding-people.md), les valeurs des champs personnalisés sont reprises automatiquement. La personne que vous conservez garde ses propres valeurs ; pour tout champ où seule la personne retirée avait une valeur, cette valeur est copiée afin de ne rien perdre.

## Articles connexes {#related-articles}

- [Rechercher des personnes](../people/searching-people.md) — recherche avancée, y compris la catégorie Champs personnalisés, et affichage des champs personnalisés en colonnes
- [Listes enregistrées](../people/lists.md) — enregistrer une recherche sur un champ personnalisé et la relancer en direct
- [Rôles et autorisations](./roles-permissions.md) — qui peut définir des champs et modifier les valeurs
- [Créer des formulaires](../forms/creating-forms.md) — pour la collecte de données en plusieurs questions, lorsqu'un formulaire complet convient mieux que des champs isolés
