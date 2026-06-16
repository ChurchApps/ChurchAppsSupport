---
title: "Utilisation de l'éditeur de page"
---

# Utilisation de l'éditeur de page

<div class="article-intro">

L'éditeur de page B1 est un constructeur visuel de glisser-déposer qui vous permet de concevoir les pages de votre site Web d'église sans écrire de code. Vous pouvez ajouter des sections et des blocs de contenu, personnaliser les styles, prévisualiser votre travail et annuler les modifications -- tout cela depuis votre navigateur.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Complétez la [Configuration initiale](initial-setup) pour configurer votre site Web
- Créez au moins une page dans [Gestion des pages](managing-pages)
- Vous avez besoin de l'autorisation **content.edit** pour accéder à l'éditeur

</div>

## Ouverture de l'éditeur

1. Dans B1 Admin, cliquez sur **Site Web** dans le menu de gauche.
2. Trouvez la page que vous souhaitez modifier dans le tableau Pages et cliquez sur **Modifier**.

L'éditeur s'ouvre en mode plein écran. Le panneau de gauche affiche votre structure de page et les éléments de contenu disponibles ; la zone centrale affiche un aperçu en direct de votre page.

:::info
L'éditeur s'affiche toujours en mode clair, quel que soit votre paramètre de thème B1 Admin. Cela garantit que l'aperçu correspond exactement à la façon dont votre page s'affichera pour les visiteurs du site Web.
:::

## Structure de la page : sections et éléments

Chaque page est construite à partir de deux niveaux :

- **Sections** -- Les conteneurs de niveau supérieur qui divisent votre page en bandes horizontales (par exemple, une section héros, un bloc de contenu ou une bande de pied de page). Chaque page doit avoir au moins une section avant de pouvoir ajouter du contenu.
- **Éléments** -- Les pièces de contenu individuelles placées à l'intérieur d'une section, telles que du texte, des images, des boutons, des cartes, des formulaires et des calendriers.

### Ajouter une section

1. Cliquez sur **Ajouter une section** (ou le bouton **+** en haut du panneau de gauche).
2. Choisissez comment commencer :
   - **À partir d'un modèle** — parcourez la galerie de modèles de section organisée par catégorie (Héros, À propos, Services, Contribution, etc.) et cliquez sur l'un pour l'insérer en tant que section entièrement stylisée et pré-remplie. Vous pouvez personnaliser tout après son ajout.
   - **Section vierge** — choisissez une disposition en colonnes (une seule, deux colonnes, trois colonnes, etc.) et construisez à partir de zéro.
3. La nouvelle section apparaît dans l'aperçu. Cliquez sur elle pour la sélectionner et configurez sa couleur de fond, son remplissage et d'autres options de style.

### Ajouter des éléments à une section

1. Cliquez dans une section de l'aperçu pour la sélectionner.
2. Cliquez sur **Ajouter du contenu** et choisissez un type d'élément dans la liste :
   - **Texte** -- Titres, paragraphes et texte enrichi
   - **Image** -- Téléchargez ou créez un lien vers une photo
   - **Bouton** -- Un lien d'appel à l'action cliquable
   - **Carte** -- Une image avec un titre et une description
   - **Formulaire** -- Incorporez un [formulaire](../forms/creating-forms) directement sur la page
   - **Calendrier** -- Affiche un calendrier d'événements
   - **FAQ** -- Blocs de questions et réponses de style accordéon
   - **Vidéo** -- Incorporez une vidéo par URL
   - **Navigateur de groupes** -- Un répertoire filtrable de tous les groupes d'église avec recherche facultative, filtre de catégorie et filtre d'étiquette
3. Configurez l'élément à l'aide du panneau de paramètres qui s'affiche.

### Réorganisation du contenu

Faites glisser les sections ou les éléments à l'aide de l'icône de poignée (six points) sur le côté gauche de chaque élément pour les réorganiser. Vous pouvez faire glisser les éléments dans une section ou les déplacer entre les sections.

## Style de votre page

### Styles de section

Cliquez sur n'importe quelle section pour ouvrir son panneau de style. Vous pouvez définir :

- **Arrière-plan** -- Couleur unie, dégradé ou image
- **Remplissage** -- Espacement haut et bas à l'intérieur de la section
- **Largeur** -- Pleine largeur ou centrée/contenue

### Styles d'élément

Cliquez sur n'importe quel élément pour ouvrir son panneau de style. Les options courantes incluent la taille de police, la couleur, l'alignement, la marge et le remplissage. Pour les images, vous pouvez définir le texte alternatif et les cibles de lien.

### CSS personnalisé

Pour un style avancé, chaque section et élément a un champ **CSS personnalisé** où vous pouvez écrire vos propres règles CSS. Celles-ci sont délimitées à cet élément, elles n'affecteront donc pas involontairement le reste de la page.

:::tip
Si vous devez appliquer des styles à l'ensemble de votre site -- par exemple, une police personnalisée ou une couleur globale -- utilisez plutôt les paramètres [Apparence](appearance) au lieu du CSS personnalisé sur des pages individuelles.
:::

## Aperçu de votre page

Utilisez les contrôles d'aperçu dans la barre d'outils pour vérifier comment votre page s'affiche à différentes tailles d'écran :

- **Bureau** -- Vue de navigateur en pleine largeur
- **Mobile** -- Vue en taille téléphone étroite

Cliquez sur **Aperçu** pour ouvrir une version en direct de la page dans un nouvel onglet du navigateur, exactement comme les visiteurs la verront.

## Annulation des modifications

L'éditeur suit automatiquement votre historique d'édition. Utilisez les boutons de la barre d'outils ou les raccourcis clavier pour naviguer :

- **Annuler** (Ctrl+Z / Cmd+Z) -- Revert votre dernière action
- **Refaire** (Ctrl+Y / Cmd+Y) -- Réappliquez une action annulée

Vous pouvez également restaurer la page à un instantané antérieur. Cliquez sur **Historique** dans la barre d'outils pour voir une liste des instantanés enregistrés avec des descriptions, et cliquez sur n'importe quelle entrée pour restaurer à ce point.

:::warning
La restauration d'un instantané remplace le contenu de votre page actuelle par la version de l'instantané. Cela ne peut pas être annulé avec le bouton d'annulation standard. Enregistrez un instantané de votre état actuel avant de restaurer un ancien si vous souhaitez conserver l'option de revenir.
:::

## Enregistrement et publication

Les modifications sont enregistrées automatiquement au fur et à mesure que vous travaillez. Un indicateur d'état dans la barre d'outils indique si vos modifications ont été enregistrées.

### État brouillon et publié

Les pages peuvent avoir un état **publié**, qui contrôle quand les visiteurs voient vos modifications. La barre d'outils affiche une puce d'état indiquant l'état actuel :

- **En direct à l'enregistrement** -- La page n'utilise pas de flux de travail de publication. Chaque modification enregistrée devient en direct immédiatement. C'est la valeur par défaut pour les nouvelles pages.
- **Modifications non publiées** -- La page a été publiée auparavant, mais vous avez effectué des modifications depuis la dernière publication. Les visiteurs voient toujours la version précédemment publiée.
- **Publié** -- La page est en direct et votre contenu enregistré correspond à ce que les visiteurs voient.

Pour publier vos modifications, cliquez sur le bouton **Publier** dans la barre d'outils. La page devient en direct immédiatement.

Pour revenir à la dernière version publiée sans affecter ce que les visiteurs voient, ouvrez le menu de débordement (⋮) et cliquez sur **Annuler les modifications**.

Pour mettre une page complètement hors ligne, ouvrez le menu de débordement et cliquez sur **Dépublier**. Les visiteurs ne verront plus cette page jusqu'à ce que vous la publiez à nouveau.

:::tip
Utilisez le flux de travail brouillon/publication quand vous voulez préparer une page -- par exemple, pour un événement à venir -- et la mettre en direct uniquement au bon moment. Créez et prévisualisez la page, puis cliquez sur Publier quand vous êtes prêt.
:::

## Articles connexes

- [Gestion des pages](managing-pages) -- Créer des pages, définir des URL et gérer la navigation du site
- [Apparence](appearance) -- Définissez les couleurs, les polices et la marque de l'ensemble du site
- [Fichiers](files) -- Téléchargez les images et les documents à utiliser dans l'éditeur
- [Création de formulaires](../forms/creating-forms) -- Construisez des formulaires que vous pouvez incorporer sur des pages
