---
title: "Exportation des données"
---

# Exportation des données

<div class="article-intro">

B1 Admin vous permet d'exporter les données de votre église afin que vous puissiez les utiliser dans des feuilles de calcul, les partager avec votre équipe ou en conserver une sauvegarde. Que vous ayez besoin d'une liste rapide de noms et d'e-mails ou d'une exportation complète de la base de données, il y a des options qui correspondent à vos besoins.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec la permission de voir les données que vous souhaitez exporter. Voir [Rôles et permissions](roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Pour une exportation complète de la base de données, vous avez besoin d'un accès à la zone **Paramètres**.

</div>

## Exportation depuis la page Personnes

Le moyen le plus rapide d'exporter votre répertoire est directement depuis la page **Personnes** :

1. Ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Personnes**, et cliquez sur **Personnes**.
2. Utilisez la barre de recherche ou les filtres pour affiner les résultats que vous souhaitez exporter (ou laissez-le sans filtre pour exporter tout le monde). Voir [Recherche de personnes](searching-people.md) pour des conseils sur le filtrage.
3. Utilisez le **sélecteur de colonnes** pour choisir les colonnes que vous souhaitez inclure dans l'exportation (par exemple, Nom, E-mail, Téléphone, Adresse).
4. Cliquez sur le bouton **Exporter**.
5. Un fichier CSV sera téléchargé sur votre ordinateur avec les données actuellement affichées dans le tableau.

:::tip
Personnalisez vos colonnes avant d'exporter. Le fichier CSV inclura exactement les colonnes que vous avez visibles, vous pouvez donc adapter l'exportation à vos besoins sans éditer le fichier après.
:::

## Exportation complète des données à partir des paramètres

Pour une exportation complète de toutes vos données B1 (pas seulement les personnes), utilisez l'outil d'exportation dans Paramètres :

1. Dans le menu Sauter, choisissez **Paramètres > Paramètres**.
2. Cliquez sur le bouton **Importation/Exportation** en haut à droite de l'en-tête de la page.
3. Sélectionnez **Base de données B1** dans la liste déroulante **Source de données**.
4. Examinez l'aperçu des données et cliquez sur **Continuer vers la destination**.
5. Sélectionnez **Exportation ZIP de B1** comme destination d'exportation.
6. Surveillez la progression de l'exportation jusqu'à ce que tous les éléments affichent des coches vertes.
7. Le fichier d'exportation sera téléchargé automatiquement. Recherchez le fichier `B1Export` dans votre dossier de téléchargements.
8. Dézippez le fichier pour accéder aux fichiers CSV individuels (tels que `people.csv`) que vous pouvez ouvrir dans Excel, Google Sheets ou Numbers.

:::info
Les exportations complètes de données incluent les personnes, les groupes, les dons, la présence, etc. — tout dans votre base de données B1. Cela constitue également un excellent moyen de créer une sauvegarde périodique des dossiers de votre église.
:::

## Exportation des données du groupe

Vous pouvez également exporter les listes de membres pour des groupes individuels. À partir de la page **Groupes**, ouvrez un groupe et cliquez sur l' **icône de téléchargement** pour exporter la liste des membres du groupe. Voir [Membres du groupe](../groups/group-members.md) pour plus de détails.

:::info
Les fichiers CSV exportés fonctionnent avec toutes les principales applications de feuille de calcul, y compris Microsoft Excel, Google Sheets et Apple Numbers.
:::
