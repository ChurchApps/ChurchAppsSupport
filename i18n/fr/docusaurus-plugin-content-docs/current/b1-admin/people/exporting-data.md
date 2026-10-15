---
title: "Exporter des données"
---

# Exporter des données

<div class="article-intro">

B1 Admin vous permet d'exporter les données de votre église pour les utiliser dans des tableurs, les partager avec votre équipe ou les conserver en sauvegarde. Que vous ayez besoin d'une simple liste de noms et d'e-mails ou d'une exportation complète de la base de données, des options répondent à vos besoins.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer d'un compte B1 Admin actif avec l'autorisation de consulter les données que vous souhaitez exporter. Voir [Rôles et autorisations](roles-permissions.md) si vous ne connaissez pas votre niveau d'accès.
- Pour une exportation complète de la base de données, vous devez avoir accès à la zone **Paramètres**.

</div>

## Exporter depuis la page Personnes

Le moyen le plus rapide d'exporter votre annuaire est directement depuis la page **Personnes** :

1. Ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Personnes**, et cliquez sur **Personnes**.
2. Utilisez la barre de recherche ou les filtres pour restreindre les résultats que vous souhaitez exporter (ou ne filtrez pas pour exporter tout le monde). Voir [Rechercher des personnes](searching-people.md) pour des conseils sur le filtrage.
3. Cliquez sur le bouton **Exporter** dans l'en-tête de la page Personnes.
4. Un fichier CSV est téléchargé sur votre ordinateur avec les personnes figurant actuellement dans vos résultats, y compris leur nom, leurs coordonnées, leur adresse et les autres champs standard.

:::tip
L'exportation inclut tout le monde dans vos résultats actuels. Lancez une recherche, chargez une [Liste enregistrée](./lists.md), ou utilisez d'abord la recherche **Avancée** pour n'exporter que les personnes dont vous avez besoin.
:::

## Exportation complète des données depuis les Paramètres

Pour une exportation complète de toutes vos données B1 (et non seulement des personnes), utilisez l'outil d'exportation dans les Paramètres :

1. Dans le menu de saut, choisissez **Paramètres > Paramètres**.
2. Cliquez sur le lien **Importer/Exporter** sous le nom de votre église, en haut du menu Paramètres à gauche.
3. Sélectionnez **Base de données B1** dans la liste déroulante **Source des données**.
4. Vérifiez l'aperçu des données et cliquez sur **Continuer vers la destination**.
5. Sélectionnez **B1 Export Zip** comme destination de l'exportation.
6. Suivez la progression de l'exportation jusqu'à ce que tous les éléments affichent une coche verte.
7. Le fichier d'exportation se télécharge automatiquement. Recherchez le fichier `B1Export` dans votre dossier de téléchargements.
8. Décompressez le fichier pour accéder aux fichiers CSV individuels (tels que `people.csv`) que vous pouvez ouvrir dans Excel, Google Sheets ou Numbers.

:::info
Le B1 Export Zip est une sauvegarde complète des données de votre église. Il contient :

- les personnes (avec leurs photos) et les foyers, y compris les contacts de récupération des enfants du foyer
- les campus, les services et les horaires de services
- les groupes et les membres des groupes
- les fonds et les dons, y compris les dons répartis entre plusieurs fonds
- la présence
- les formulaires, les questions, les réponses et les réponses soumises
- les champs personnalisés et leurs valeurs
- les listes de personnes enregistrées

Pour le restaurer, choisissez **B1 Import Zip** comme source et **Base de données B1** comme destination (voir [Importer des données](./importing-data.md)). Les foyers, les contacts de récupération et les listes enregistrées sont reconstruits avec les personnes. Les filtres des listes enregistrées pointent vers les groupes, les fonds, les campus et les champs personnalisés restaurés.
:::

## Exporter les données de groupe

Vous pouvez également exporter les listes de membres de groupes individuels. Depuis la page **Groupes**, ouvrez un groupe et cliquez sur l'**icône de téléchargement** pour exporter la liste des membres de ce groupe. Voir [Membres du groupe](../groups/group-members.md) pour plus de détails.

:::info
Les fichiers CSV exportés fonctionnent avec toutes les principales applications de tableur, dont Microsoft Excel, Google Sheets et Apple Numbers.
:::
