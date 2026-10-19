---
title: "Annonces"
---

# Annonces

<div class="article-intro">

FreePlay peut diffuser en boucle un dossier de diapositives d'annonces sur votre téléviseur -- par exemple, dans le hall ou avant le début des cours. Vous choisissez un dossier parmi l'un de vos fournisseurs de contenu connectés, FreePlay télécharge ses diapositives sur l'appareil, et un élément **Annonces** apparaît dans la barre latérale afin que vous puissiez lancer la boucle à tout moment.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Connectez un fournisseur de contenu](./connecting-providers) qui contient vos diapositives d'annonces, comme Dropbox ou OneDrive
- Placez les images ou vidéos que vous souhaitez diffuser en boucle dans un même dossier chez ce fournisseur

</div>

## Choisir le dossier des annonces

1. Ouvrez **Paramètres** en bas de la barre latérale, puis sélectionnez **Fournisseurs**
2. Sélectionnez le fournisseur connecté qui contient vos diapositives (il affiche un badge **Connecté**) pour ouvrir ses **Paramètres du fournisseur**
3. Sélectionnez **Utiliser pour les annonces**
4. La fenêtre **Choisir le dossier des annonces** s'ouvre. Parcourez les dossiers jusqu'à celui qui contient vos diapositives, puis sélectionnez ce dossier (ou n'importe quel fichier qu'il contient)
5. FreePlay télécharge les diapositives et revient aux **Paramètres du fournisseur**, où la ligne affiche désormais **Diffusion en boucle de « *nom du dossier* » -- *nombre* diapositives téléchargées**

Un seul dossier est utilisé pour les annonces à la fois. Choisir un dossier d'un autre fournisseur remplace le précédent.

## Lancer les annonces

Une fois les diapositives téléchargées, un élément **Annonces** apparaît près du haut de la barre latérale (sous **Plan du jour**, si votre téléviseur l'affiche). Sélectionnez-le pour lancer la boucle.

- Les images restent à l'écran pendant 15 secondes, sauf si le fournisseur attribue sa propre durée au fichier
- Les vidéos sont lues jusqu'à la fin avant de passer à la diapositive suivante
- Après la dernière diapositive, la boucle recommence à la première
- Si le dossier ne contient qu'une seule vidéo, elle se répète sur place

La boucle est lue à partir des fichiers enregistrés sur l'appareil ; elle continue donc de fonctionner sans connexion Internet. Vous pouvez utiliser les mêmes commandes de télécommande que pour tout autre contenu -- voir [Lecture de contenu](./playing-content).

## Mettre à jour les diapositives

FreePlay vérifie le dossier des annonces à chaque démarrage de l'application, télécharge les nouvelles diapositives et supprime celles qui ont été effacées du dossier.

Pour vérifier immédiatement, ouvrez les **Paramètres du fournisseur** et sélectionnez **Vérifier les mises à jour des annonces**. Une fois terminé, la ligne affiche **À jour** avec le nombre de diapositives.

:::info
Si FreePlay ne peut pas joindre le fournisseur, ou si le dossier revient vide, il continue de diffuser les diapositives qu'il possède déjà. Pour arrêter complètement d'utiliser les annonces, désactivez-les comme décrit ci-dessous.
:::

:::warning
Une diapositive remplacée par une nouvelle version sous le même nom de fichier n'est pas téléchargée à nouveau. Pour modifier une diapositive, ajoutez-la comme nouveau fichier et supprimez l'ancien.
:::

## Désactiver les annonces

Ouvrez les **Paramètres du fournisseur** et sélectionnez à nouveau **Utiliser pour les annonces**. FreePlay cesse d'utiliser le dossier, supprime les diapositives téléchargées de l'appareil et retire **Annonces** de la barre latérale.

Déconnecter le fournisseur désactive aussi les annonces qui en proviennent.

## Articles connexes

- **[Connexion aux fournisseurs](./connecting-providers)** - Connectez le fournisseur qui contient vos diapositives
- **[Parcourir et télécharger du contenu](./browsing-content)** - Parcourez les dossiers d'un fournisseur et lancez la lecture du contenu à la demande
- **[Lecture de contenu](./playing-content)** - Commandes du lecteur avec la télécommande du téléviseur
