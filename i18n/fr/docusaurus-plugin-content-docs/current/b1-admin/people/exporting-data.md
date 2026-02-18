---
title: "Exporter des données"
---

# Exporter des données

<div class="article-intro">

B1 Admin vous permet d'exporter les données de votre église afin de les utiliser dans des tableurs, de les partager avec votre équipe ou de conserver une sauvegarde. Que vous ayez besoin d'une simple liste de noms et d'e-mails ou d'une exportation complète de la base de données, il existe des options adaptées à vos besoins.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec la permission de consulter les données que vous souhaitez exporter. Consultez [Rôles et permissions](roles-permissions.md) si vous n'êtes pas sûr de votre niveau d'accès.
- Pour une exportation complète de la base de données, vous devez avoir accès à la zone **Paramètres**.

</div>

## Exporter depuis la page Personnes

Le moyen le plus rapide d'exporter votre annuaire est directement depuis la page **Personnes** :

1. Accédez à **Personnes** dans la barre latérale gauche.
2. Utilisez la barre de recherche ou les filtres pour affiner les résultats que vous souhaitez exporter (ou laissez sans filtre pour tout exporter). Consultez [Rechercher des personnes](searching-people.md) pour des conseils de filtrage.
3. Utilisez le **sélecteur de colonnes** pour choisir les colonnes à inclure dans l'exportation (par exemple, Nom, E-mail, Téléphone, Adresse).
4. Cliquez sur le bouton **Exporter**.
5. Un fichier CSV sera téléchargé sur votre ordinateur avec les données actuellement affichées dans le tableau.

:::tip
Personnalisez vos colonnes avant d'exporter. Le fichier CSV inclura exactement les colonnes que vous avez rendues visibles, vous permettant ainsi d'adapter l'exportation à vos besoins sans modifier le fichier par la suite.
:::

## Exportation complète des données depuis les Paramètres

Pour une exportation complète de toutes vos données B1 (pas seulement les personnes), utilisez l'outil d'exportation dans les Paramètres :

1. Cliquez sur **Paramètres** dans la barre latérale gauche.
2. Cliquez sur **Import/Export** dans la navigation supérieure.
3. Sélectionnez **B1 Database** dans le menu déroulant **Source de données**.
4. Vérifiez l'aperçu des données et cliquez sur **Continuer vers la destination**.
5. Sélectionnez **B1 Export Zip** comme destination d'exportation.
6. Surveillez la progression de l'exportation jusqu'à ce que tous les éléments affichent des coches vertes.
7. Le fichier d'exportation sera téléchargé automatiquement. Recherchez le fichier `B1Export` dans votre dossier de téléchargements.
8. Décompressez le fichier pour accéder aux fichiers CSV individuels (tels que `people.csv`) que vous pouvez ouvrir dans Excel, Google Sheets ou Numbers.

:::info
Les exportations complètes incluent les personnes, les groupes, les dons, les présences et bien plus encore -- tout ce qui se trouve dans votre base de données B1. C'est également un excellent moyen de créer une sauvegarde périodique des registres de votre église.
:::

## Exporter les données de groupe

Vous pouvez également exporter les listes de membres pour des groupes individuels. Depuis la page **Groupes**, ouvrez un groupe et cliquez sur l'**icône de téléchargement** pour exporter la liste des membres de ce groupe. Consultez [Membres du groupe](../groups/group-members.md) pour plus de détails.

:::info
Les fichiers CSV exportés fonctionnent avec toutes les principales applications de tableur, y compris Microsoft Excel, Google Sheets et Apple Numbers.
:::
