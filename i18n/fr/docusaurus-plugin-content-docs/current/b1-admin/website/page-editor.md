---
title: "Utiliser l'éditeur de page"
---

# Utiliser l'éditeur de page

<div class="article-intro">

L'éditeur de page B1 est un constructeur visuel de glisser-déposer qui vous permet de concevoir les pages de votre site web d'église sans écrire de code. Vous pouvez ajouter des sections et des blocs de contenu, personnaliser les styles, prévisualiser votre travail et annuler les modifications, le tout depuis votre navigateur.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Complétez la [Configuration initiale](initial-setup) pour configurer votre site web
- Créez au moins une page dans [Gestion des pages](managing-pages)
- Vous avez besoin de la permission **content.edit** pour accéder à l'éditeur

</div>

## Ouverture de l'éditeur

1. Dans B1 Admin, cliquez sur **Website** dans le menu de gauche.
2. Trouvez la page que vous souhaitez modifier dans le tableau Pages et cliquez sur **Edit**.

L'éditeur s'ouvre en mode plein écran. Le panneau de gauche affiche votre structure de page et les éléments de contenu disponibles ; la zone centrale affiche un aperçu en direct de votre page.

:::info
L'éditeur s'affiche toujours en mode clair, quel que soit le paramètre de thème B1 Admin. Cela garantit que l'aperçu correspond exactement à la façon dont votre page apparaîtra aux visiteurs du site web.
:::

## Structure de la page : sections et éléments

Chaque page est construite à partir de deux niveaux :

- **Sections** -- Les conteneurs de niveau supérieur qui divisent votre page en bandes horizontales (par exemple, une section héros, un bloc de contenu ou une bande de pied de page). Chaque page doit avoir au moins une section avant de pouvoir ajouter du contenu.
- **Éléments** -- Les pièces de contenu individuelles placées à l'intérieur d'une section, telles que du texte, des images, des boutons, des cartes, des formulaires et des calendriers.

### Ajouter une section

1. Cliquez sur **Add Section** (ou le bouton **+** en haut du panneau de gauche).
2. Choisissez comment commencer :
   - **From a template** — parcourez la galerie de modèles de sections organisée par catégorie (Héros, À propos, Services, Dons, etc.) et cliquez sur un modèle pour l'insérer en tant que section entièrement stylisée et préremplie. Vous pouvez personnaliser tout après son ajout.
   - **Blank section** — choisissez une mise en page (colonne unique, deux colonnes, trois colonnes, etc.) et construisez à partir de zéro.
3. La nouvelle section apparaît dans l'aperçu. Cliquez dessus pour la sélectionner et configurez sa couleur d'arrière-plan, le remplissage et d'autres options de style.

### Ajout d'éléments à une section

1. Cliquez à l'intérieur d'une section dans l'aperçu pour la sélectionner.
2. Cliquez sur **Add Content** et choisissez un type d'élément dans la liste :
   - **Text** -- Titres, paragraphes et texte enrichi
   - **Image** -- Téléchargez ou liez une photo
   - **Button** -- Un lien d'appel à l'action cliquable
   - **Card** -- Une image avec un titre et une description
   - **Form** -- Incorporez un [formulaire](../forms/creating-forms) directement sur la page
   - **Calendar** -- Affiche un calendrier d'événements
   - **FAQ** -- Blocs de questions-réponses de style accordéon
   - **Video** -- Intégrez une vidéo par URL
   - **Groups Browser** -- Un répertoire filtrable de tous les groupes d'église avec recherche optionnelle, filtre de catégorie et filtre d'étiquette
   - **Icon Feature** -- Une icône avec un titre et une brève description, pour les points forts des fonctionnalités ou du ministère
   - **Gallery** -- Une grille multi-photos ou une mise en page en maçonnerie
   - **Testimonial** -- Un ou plusieurs devis avec le nom de l'auteur, le rôle et la photo
   - **Social Icons** -- Icônes liées pour les profils de médias sociaux de votre église
   - **Countdown** -- Un minuteur qui compte à rebours jusqu'à une date ou une heure de service hebdomadaire
   - **Stats** -- Une rangée de grands nombres avec des étiquettes (membres, années, campus)
   - **Campaign Progress** -- Une barre de progression en direct pour une campagne de dons, affichant le total recueilli vers un objectif de fonds
   - **Staff Grid** -- Des cartes de photos pour les membres d'un groupe ; le groupe doit avoir son option **public roster** activée
   - **Service Times** -- L'horaire des services de vos campus, extrait automatiquement de la configuration de la présence
   - **Sermons** -- Votre bibliothèque de sermons, sous la forme d'un navigateur complet ou d'une mise en page en grille, liste ou dernier en vedette
3. Configurez l'élément à l'aide du panneau de paramètres qui apparaît.

### Réorganisation du contenu

Faites glisser les sections ou les éléments en utilisant l'icône de poignée (six points) sur le côté gauche de chaque élément pour les réorganiser. Vous pouvez faire glisser les éléments dans une section ou les déplacer entre les sections.

## Styliser votre page

### Styles de section

Cliquez sur une section pour ouvrir son panneau de style. Vous pouvez définir :

- **Background** -- Couleur unie, dégradé ou image. Lorsque vous utilisez un arrière-plan d'image, un sélecteur de **Focal Point** vous permet de cliquer pour définir quelle partie de l'image reste centrée à mesure que la section se met à l'échelle, et une option de couleur **Overlay** vous permet d'ajouter une teinte semi-transparente sur l'image pour améliorer la lisibilité du texte.
- **Padding** -- Espacement supérieur et inférieur à l'intérieur de la section
- **Width** -- Pleine largeur ou centrée/contenue
- **Dividers** -- Séparateurs de formes décoratives (onde, inclinaison, courbe, triangle, etc.) sur le bord supérieur ou inférieur de la section, avec des options de couleur, de hauteur et de basculement

### Styles d'élément

Cliquez sur un élément pour ouvrir son panneau de style. Les options courantes incluent la taille de la police, la couleur, l'alignement, la marge et le remplissage. Pour les images, vous pouvez définir le texte alt et les cibles de lien.

### CSS personnalisé

Pour un style avancé, chaque section et élément a un champ **Custom CSS** où vous pouvez écrire vos propres règles CSS. Celles-ci sont délimitées à cet élément, de sorte qu'elles n'affecteront pas involontairement le reste de la page.

:::tip
Si vous devez appliquer des styles sur l'ensemble de votre site, par exemple une police personnalisée ou une couleur globale, utilisez les paramètres d'[Appearance](appearance) au lieu du CSS personnalisé sur les pages individuelles.
:::

## Aperçu de votre page

Utilisez les contrôles d'aperçu dans la barre d'outils pour vérifier comment votre page s'affiche sur différentes tailles d'écran :

- **Desktop** -- Affichage du navigateur en pleine largeur
- **Mobile** -- Affichage étroit de la taille du téléphone

Cliquez sur **Preview** pour ouvrir une version en direct de la page dans un nouvel onglet de navigateur, exactement comme les visiteurs la verront.

## Annulation des modifications

L'éditeur suit automatiquement votre historique d'édition. Utilisez les boutons de la barre d'outils ou les raccourcis clavier pour naviguer :

- **Undo** (Ctrl+Z / Cmd+Z) -- Annulez votre dernière action
- **Redo** (Ctrl+Y / Cmd+Y) -- Réappliquez une action annulée

Vous pouvez également restaurer la page à un instantané antérieur. Cliquez sur **History** dans la barre d'outils pour voir une liste des instantanés enregistrés avec des descriptions, et cliquez sur une entrée pour la restaurer à ce moment.

:::warning
La restauration d'un instantané remplace le contenu de votre page actuelle par la version de l'instantané. Cela ne peut pas être annulé avec le bouton d'annulation standard. Enregistrez un instantané de votre état actuel avant de restaurer un ancien si vous souhaitez conserver la possibilité de revenir.
:::

## Enregistrement et publication

Les modifications sont enregistrées automatiquement au fur et à mesure que vous travaillez. Un indicateur d'état dans la barre d'outils indique si vos modifications ont été enregistrées.

### État brouillon et publié

Les pages peuvent avoir un état **publié**, qui contrôle quand les visiteurs voient vos modifications. La barre d'outils affiche une puce d'état affichant l'état actuel :

- **Live on Save** -- La page n'utilise pas de flux de publication. Chaque modification enregistrée devient immédiatement en direct. C'est la valeur par défaut pour les nouvelles pages.
- **Unpublished Changes** -- La page a été publiée auparavant, mais vous avez apporté des modifications depuis la dernière publication. Les visiteurs voient toujours la version précédemment publiée.
- **Published** -- La page est en direct et votre contenu enregistré correspond à ce que les visiteurs voient.

Pour publier vos modifications, cliquez sur le bouton **Publish** dans la barre d'outils. La page devient immédiatement en direct.

Pour revenir à la dernière version publiée sans affecter ce que les visiteurs voient, ouvrez le menu de débordement (⋮) et cliquez sur **Discard Changes**.

Pour mettre une page hors ligne entièrement, ouvrez le menu de débordement et cliquez sur **Unpublish**. Les visiteurs ne verront plus cette page jusqu'à ce que vous la publiez à nouveau.

:::tip
Utilisez le flux de travail brouillon/publication lorsque vous souhaitez préparer une page, par exemple pour un événement à venir, et ne la mettre en ligne qu'au moment opportun. Construisez et prévisualisez la page, puis cliquez sur Publish quand vous êtes prêt.
:::

## Articles connexes

- [Managing Pages](managing-pages) -- Créez des pages, définissez des URL et gérez la navigation du site
- [Appearance](appearance) -- Définissez les couleurs, les polices et la marque de l'ensemble du site
- [Files](files) -- Téléchargez les images et documents à utiliser dans l'éditeur
- [Creating Forms](../forms/creating-forms) -- Créez des formulaires que vous pouvez incorporer sur des pages