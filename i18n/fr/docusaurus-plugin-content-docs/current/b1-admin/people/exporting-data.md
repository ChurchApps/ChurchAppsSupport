---
title: "Exportation de données"
---

# Exportation de données

<div class="article-intro">

B1 Admin vous permet d'exporter les données de votre église pour que vous puissiez les utiliser dans des feuilles de calcul, les partager avec votre équipe ou en garder une sauvegarde. Que vous ayez besoin d'une liste rapide de noms et d'adresses e-mail ou d'une exportation de base de données complète, il y a des options pour répondre à vos besoins.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec la permission de voir les données que vous voulez exporter. Voir [Rôles et permissions](roles-permissions.md) si vous n'êtes pas sûr de votre niveau d'accès.
- Pour une exportation de base de données complète, vous avez besoin d'un accès à la zone **Paramètres**.

</div>

## Exportation depuis la page Personnes

La façon la plus rapide d'exporter votre répertoire est directement depuis la page **Personnes** :

1. Ouvrez le **menu de section** dans le coin supérieur gauche et choisissez **Personnes**.
2. Utilisez la barre de recherche ou les filtres pour affiner les résultats que vous voulez exporter (ou laissez-le sans filtre pour exporter tout le monde). Voir [Recherche de personnes](searching-people.md) pour les conseils de filtrage.
3. Utilisez le **sélecteur de colonnes** pour choisir les colonnes que vous voulez inclure dans l'exportation (par exemple, Nom, E-mail, Téléphone, Adresse).
4. Cliquez sur le bouton **Exporter**.
5. Un fichier CSV sera téléchargé sur votre ordinateur avec les données actuellement affichées dans le tableau.

:::tip
Personnalisez vos colonnes avant d'exporter. Le fichier CSV inclura exactement les colonnes que vous avez visibles, pour que vous puissiez adapter l'exportation à vos besoins sans modifier le fichier après.
:::

## Exportation complète de données depuis les paramètres

Pour une exportation complète de toutes vos données B1 (pas seulement les personnes), utilisez l'outil d'exportation dans Paramètres :

1. Ouvrez le **menu de section** dans le coin supérieur gauche et choisissez **Paramètres**.
2. Cliquez sur **Importation/Exportation** dans la navigation en haut.
3. Sélectionnez **Base de données B1** dans le menu déroulant **Source de données**.
4. Passez en revue l'aperçu des données et cliquez sur **Continuer vers la destination**.
5. Sélectionnez **Zip d'exportation B1** comme destination d'exportation.
6. Supervisez la progression de l'exportation jusqu'à ce que tous les éléments montrent des coches vertes.
7. Le fichier d'exportation sera téléchargé automatiquement. Cherchez le fichier `B1Export` dans votre dossier téléchargements.
8. Décompressez le fichier pour accéder aux fichiers CSV individuels (tels que `people.csv`) que vous pouvez ouvrir dans Excel, Google Sheets ou Numbers.

:::info
Les exportations complètes de données incluent les personnes, les groupes, les donations, la présence et plus -- tout dans votre base de données B1. C'est aussi un excellent moyen de créer une sauvegarde périodique de vos dossiers d'église.
:::

## Exportation de données du groupe

Vous pouvez aussi exporter les listes de membres pour les groupes individuels. À partir de la page **Groupes**, ouvrez un groupe et cliquez sur l'**icône de téléchargement** pour exporter la liste des membres de ce groupe. Voir [Membres du groupe](../groups/group-members.md) pour plus de détails.

:::info
Les fichiers CSV exportés fonctionnent avec toutes les applications de feuille de calcul majeures incluant Microsoft Excel, Google Sheets et Apple Numbers.
:::
