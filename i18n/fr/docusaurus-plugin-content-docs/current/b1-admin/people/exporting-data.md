---
title: "Exporter des données"
---

# Exporter des données

<div class="article-intro">

B1 Admin vous permet d'exporter les données de votre église pour les utiliser dans des tableurs, les partager avec votre équipe ou conserver une sauvegarde. Que vous ayez besoin d'une liste rapide des noms et e-mails ou d'un export complet de la base de données, plusieurs options répondent à vos besoins.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif, avec la permission de consulter les données que vous souhaitez exporter. Voir [Rôles et permissions](roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Pour un export complet de la base de données, vous devez avoir accès à l'espace **Paramètres**.

</div>

## Exporter depuis la page Personnes

Le moyen le plus rapide d'exporter votre répertoire est directement depuis la page **Personnes** :

1. Ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Personnes**, puis cliquez sur **Personnes**.
2. Utilisez la barre de recherche ou les filtres pour restreindre les résultats à exporter (ou laissez-la sans filtre pour exporter tout le monde). Voir [Rechercher des personnes](searching-people.md) pour des conseils sur le filtrage.
3. Cliquez sur le bouton **Exporter** dans l'en-tête de la page Personnes.
4. Un fichier CSV est téléchargé sur votre ordinateur avec les personnes présentes dans vos résultats actuels, y compris leur nom, leurs coordonnées, leur adresse et les autres champs standards.

:::tip
L'export comprend toutes les personnes de vos résultats actuels. Effectuez une recherche, chargez une [liste enregistrée](./lists.md) ou utilisez d'abord la recherche **Avancée** pour n'exporter que les personnes dont vous avez besoin.
:::

## Export complet depuis les Paramètres {#full-data-export-from-settings}

Pour un export complet de toutes vos données B1 (et pas seulement des personnes), utilisez l'outil d'export dans les Paramètres :

1. Dans le menu Jump, choisissez **Paramètres > Paramètres**.
2. Cliquez sur le lien **Importer/Exporter** sous le nom de votre église, en haut du menu des paramètres à gauche.
3. Sélectionnez **Base de données B1** dans la liste déroulante **Source des données**.
4. Vérifiez l'aperçu des données et cliquez sur **Continuer vers la destination**.
5. Sélectionnez **Archive ZIP B1 Export** comme destination de l'export.
6. Suivez la progression de l'export jusqu'à ce que tous les éléments affichent une coche verte.
7. Le fichier d'export se télécharge automatiquement. Recherchez le fichier `B1Export` dans votre dossier de téléchargements.
8. Décompressez le fichier pour accéder aux fichiers CSV individuels (comme `people.csv`) que vous pouvez ouvrir dans Excel, Google Sheets ou Numbers.

:::info
L'archive ZIP B1 Export est une sauvegarde complète des données de votre église. Elle contient :

- les personnes (avec leurs photos) et les foyers, y compris les contacts de récupération des foyers
- les campus, les services et les horaires de service
- les groupes et les membres des groupes
- les fonds et les dons, y compris les dons répartis entre plusieurs fonds
- les présences
- les formulaires, les questions, les soumissions et les réponses
- les champs personnalisés et leurs valeurs
- les listes de personnes enregistrées

Si la photo d'une personne ne peut pas être téléchargée ou lue pendant l'export, cette photo est ignorée et l'export se poursuit sans elle.

Pour la restaurer, choisissez **Archive ZIP B1 Import** comme source et **Base de données B1** comme destination (voir [Importer des données](./importing-data.md)). Les foyers, les contacts de récupération et les listes enregistrées sont recréés avec les personnes. Les filtres des listes enregistrées sont rattachés aux groupes, fonds, campus et champs personnalisés restaurés.
:::

## Exporter les données d'un groupe

Vous pouvez aussi exporter les listes de membres de groupes individuels. Depuis la page **Groupes**, ouvrez un groupe et cliquez sur l'**icône de téléchargement** pour exporter la liste des membres de ce groupe. Voir [Membres du groupe](../groups/group-members.md) pour plus de détails.

:::info
Les fichiers CSV exportés fonctionnent avec toutes les principales applications de tableur, dont Microsoft Excel, Google Sheets et Apple Numbers.
:::
