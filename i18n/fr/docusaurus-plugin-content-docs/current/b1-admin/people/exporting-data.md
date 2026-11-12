---
title: "Exporter des données"
description: "Exportez les personnes au format CSV, les listes de membres de groupes ou une sauvegarde complète de la base B1 depuis B1 Admin, et découvrez le contenu de l'archive ZIP d'export B1."
---

# Exporter des données

<div class="article-intro">

B1 Admin vous permet d'exporter les données de votre église pour les utiliser dans des tableurs, les partager avec votre équipe ou conserver une sauvegarde. Que vous ayez besoin d'une liste rapide de noms et de courriels ou d'un export complet de la base de données, plusieurs options sont disponibles.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec l'autorisation de consulter les données que vous souhaitez exporter. Consultez [Rôles et autorisations](roles-permissions.md) si vous ne savez pas à quel niveau d'accès vous vous trouvez.
- Pour un export complet de la base de données, vous devez avoir accès à la section **Paramètres**.

</div>

## Exporter depuis la page Personnes {#exporting-from-the-people-page}

Le moyen le plus rapide d'exporter votre annuaire est directement depuis la page **Personnes** :

1. Ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Personnes**, puis cliquez sur **Personnes**.
2. Utilisez la barre de recherche ou les filtres pour réduire les résultats à exporter (ou laissez la liste sans filtre pour exporter tout le monde). Consultez [Rechercher des personnes](searching-people.md) pour des conseils de filtrage.
3. Cliquez sur le bouton **Exporter** dans l'en-tête de la page Personnes.
4. Un fichier CSV nommé `people.csv` sera téléchargé sur votre ordinateur, avec les personnes figurant actuellement dans vos résultats, incluant leur nom, leurs coordonnées, leur adresse et les autres champs standard. Si vous n'avez pas effectué de recherche, l'export contient l'ensemble de votre annuaire, même si la page n'en affiche que la première partie.

:::tip
L'export contient toutes les personnes de vos résultats actuels. Effectuez une recherche, chargez une [liste enregistrée](./lists.md) ou utilisez d'abord la recherche **Avancée** pour n'exporter que les personnes dont vous avez besoin.
:::

## Export complet des données depuis les Paramètres {#full-data-export-from-settings}

Pour un export complet de toutes vos données B1 (pas seulement les personnes), utilisez l'outil d'export des Paramètres :

1. Dans le menu Accès rapide, choisissez **Paramètres > Paramètres**.
2. Cliquez sur le lien **Importer/Exporter** sous le nom de votre église, en haut du menu de paramètres à gauche.
3. Sélectionnez **Base de données B1** dans la liste déroulante **Source des données**.
4. Vérifiez l'aperçu des données, puis cliquez sur **Continuer vers la destination**.
5. Sélectionnez **Archive ZIP d'export B1** comme destination de l'export.
6. Suivez la progression de l'export jusqu'à ce que tous les éléments affichent une coche verte.
7. Le fichier d'export se téléchargera automatiquement. Recherchez le fichier `B1Export` dans votre dossier de téléchargements.
8. Décompressez le fichier pour accéder aux fichiers CSV individuels (comme `people.csv`) que vous pouvez ouvrir dans Excel, Google Sheets ou Numbers.

:::info
L'archive ZIP d'export B1 est une sauvegarde complète des données de votre église. Elle comprend :

- les personnes (avec leurs photos) et les foyers, y compris les contacts de récupération des enfants
- les campus, les cultes et les horaires de culte
- les groupes et leurs membres
- les fonds et les dons, y compris les dons répartis sur plusieurs fonds
- la fréquentation
- les formulaires, les questions, les soumissions et les réponses
- les champs personnalisés et leurs valeurs
- les listes de personnes enregistrées

Si la photo d'une personne ne peut pas être téléchargée ou lue pendant l'export, cette photo est ignorée et l'export se poursuit sans elle.

Pour la restaurer, choisissez **Archive ZIP d'import B1** comme source et **Base de données B1** comme destination (voir [Importer des données](./importing-data.md)). Les foyers, les contacts de récupération et les listes enregistrées sont reconstruits avec les personnes. Les filtres des listes enregistrées sont redirigés vers les groupes, fonds, campus et champs personnalisés restaurés.
:::

## Exporter les données d'un groupe {#exporting-group-data}

Vous pouvez aussi exporter les listes de membres de groupes individuels. Depuis la page **Groupes**, ouvrez un groupe et cliquez sur l'**icône de téléchargement** pour exporter la liste des membres de ce groupe. Consultez [Membres du groupe](../groups/group-members.md) pour plus de détails.

:::info
Les fichiers CSV exportés fonctionnent avec toutes les principales applications de tableur, dont Microsoft Excel, Google Sheets et Apple Numbers.
:::
