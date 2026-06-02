---
title: "Utiliser l'Éditeur de Pages"
---

# Utiliser l'Éditeur de Pages

<div class="article-intro">

L'éditeur de pages B1 est un constructeur visuel par glisser-déposer qui vous permet de concevoir les pages de votre site Web d'église sans écrire de code. Vous pouvez ajouter des sections et des blocs de contenu, personnaliser les styles, prévisualiser votre travail et annuler les modifications -- tout à partir de votre navigateur.

</div>

<div class="prereqs">
<h4>Avant de Commencer</h4>

- Complétez la [Configuration Initiale](initial-setup) pour obtenir votre site Web configuré
- Créez au moins une page dans [Gérer les Pages](managing-pages)
- Vous avez besoin de la permission **content.edit** pour accéder à l'éditeur

</div>

## Ouvrir l'Éditeur

1. Dans B1 Admin, cliquez sur **Site Web** dans le menu de gauche.
2. Trouvez la page que vous souhaitez éditer dans le tableau Pages et cliquez sur **Éditer**.

L'éditeur s'ouvre en mode plein écran. Le panneau de gauche affiche la structure de votre page et les éléments de contenu disponibles ; la zone centrale affiche un aperçu en direct de votre page.

:::info
L'éditeur s'affiche toujours en mode clair, indépendamment de votre paramètre de thème B1 Admin. Cela garantit que l'aperçu correspond avec précision à l'apparence de votre page pour les visiteurs du site Web.
:::

## Structure de Page : Sections et Éléments

Chaque page est construite à partir de deux niveaux :

- **Sections** -- Les conteneurs de haut niveau qui divisent votre page en bandes horizontales (par exemple, une section de héros, un bloc de contenu ou une bande de pied de page). Chaque page doit avoir au moins une section avant de pouvoir ajouter du contenu.
- **Éléments** -- Les éléments de contenu individuels placés à l'intérieur d'une section, tels que le texte, les images, les boutons, les cartes, les formulaires et les calendriers.

### Ajouter une Section

1. Cliquez sur **Ajouter une Section** (ou le bouton **+** en haut du panneau de gauche).
2. Choisissez une mise en page pour votre section -- les options incluent une colonne unique, deux colonnes, trois colonnes, etc.
3. La nouvelle section apparaît dans l'aperçu. Cliquez dessus pour la sélectionner et configurez sa couleur d'arrière-plan, son remplissage et autres options de style.

### Ajouter des Éléments à une Section

1. Cliquez à l'intérieur d'une section dans l'aperçu pour la sélectionner.
2. Cliquez sur **Ajouter du Contenu** et choisissez un type d'élément dans la liste :
   - **Texte** -- En-têtes, paragraphes et texte riche
   - **Image** -- Téléchargez ou liez à une photo
   - **Bouton** -- Un lien d'appel à l'action cliquable
   - **Carte** -- Une image avec un titre et une description
   - **Formulaire** -- Intégrez un [formulaire](../forms/creating-forms) directement sur la page
   - **Calendrier** -- Afficher un calendrier d'événements
   - **FAQ** -- Blocs de questions-réponses en style accordéon
   - **Vidéo** -- Intégrer une vidéo par URL
   - **Groups Browser** -- Un répertoire de tous les groupes d'église filtrable avec recherche optionnelle, filtre de catégorie et filtre d'étiquette
3. Configurez l'élément en utilisant le panneau de paramètres qui apparaît.

### Réorganiser le Contenu

Faites glisser les sections ou les éléments en utilisant l'icône de poignée (six points) sur le côté gauche de chaque élément pour les réorganiser. Vous pouvez faire glisser les éléments à l'intérieur d'une section ou les déplacer entre les sections.

## Styliser Votre Page

### Styles de Section

Cliquez sur n'importe quelle section pour ouvrir son panneau de style. Vous pouvez définir :

- **Arrière-plan** -- Couleur unie, gradient ou image
- **Remplissage** -- Espacement haut et bas à l'intérieur de la section
- **Largeur** -- Largeur complète ou centrée/contenue

### Styles d'Élément

Cliquez sur n'importe quel élément pour ouvrir son panneau de style. Les options courantes incluent la taille de police, la couleur, l'alignement, la marge et le remplissage. Pour les images, vous pouvez définir le texte alt et les cibles de lien.

### CSS Personnalisé

Pour le style avancé, chaque section et élément a un champ **CSS Personnalisé** où vous pouvez écrire vos propres règles CSS. Ceux-ci sont délimités à cet élément, ils n'affecteront donc pas involontairement le reste de la page.

:::tip
Si vous avez besoin d'appliquer des styles dans votre site entier -- comme une police personnalisée ou une couleur mondiale -- utilisez les paramètres [Apparence](appearance) à la place du CSS personnalisé sur les pages individuelles.
:::

## Prévisualiser Votre Page

Utilisez les contrôles d'aperçu dans la barre d'outils pour vérifier comment votre page s'affiche à différentes tailles d'écran :

- **Bureau** -- Vue navigateur plein écran
- **Mobile** -- Vue à taille téléphone étroite

Cliquez sur **Aperçu** pour ouvrir une version en direct de la page dans un nouvel onglet du navigateur, exactement comme les visiteurs la verront.

## Annuler les Modifications

L'éditeur suit automatiquement votre historique d'édition. Utilisez les boutons de la barre d'outils ou les raccourcis clavier pour naviguer :

- **Annuler** (Ctrl+Z / Cmd+Z) -- Rétablir votre dernière action
- **Refaire** (Ctrl+Y / Cmd+Y) -- Réappliquer une action annulée

Vous pouvez également restaurer la page à un instant antérieur. Cliquez sur **Historique** dans la barre d'outils pour afficher une liste des instantanés enregistrés avec des descriptions, et cliquez sur n'importe quelle entrée pour restaurer à ce point.

:::warning
La restauration d'un instantané remplace le contenu de votre page actuelle par la version de l'instantané. Cela ne peut pas être annulé avec le bouton d'annulation standard. Enregistrez un instantané de votre état actuel avant de restaurer un ancien si vous souhaitez garder la possibilité de revenir.
:::

## Enregistrer Votre Travail

Les modifications sont enregistrées automatiquement au fur et à mesure que vous travaillez. Un indicateur d'état dans la barre d'outils indique si vos modifications ont été enregistrées. Vous pouvez également cliquer sur **Enregistrer** à tout moment pour forcer une sauvegarde.

## Articles Connexes

- [Gérer les Pages](managing-pages.md) -- Créez des pages, définissez les URL et gérez la navigation du site
- [Apparence](appearance.md) -- Définissez les couleurs, polices et image de marque du site
- [Fichiers](files) -- Téléchargez les ressources d'image et de documents à utiliser dans l'éditeur
- [Créer des Formulaires](../forms/creating-forms.md) -- Créez des formulaires que vous pouvez intégrer sur des pages
