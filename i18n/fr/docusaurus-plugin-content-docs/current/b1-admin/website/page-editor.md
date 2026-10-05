---
title: "Utilisation de l'éditeur de page"
---

# Utilisation de l'éditeur de page

<div class="article-intro">

L'éditeur de page B1 est un constructeur visuel de glisser-déposer qui vous permet de concevoir vos pages de site web d'église sans écrire de code. Vous pouvez ajouter des sections et des blocs de contenu, personnaliser les styles, prévisualiser votre travail et annuler les modifications -- tout cela depuis votre navigateur.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Complétez la [configuration initiale](initial-setup) pour configurer votre site web
- Créez au moins une page dans [Gestion des pages](managing-pages)
- Vous avez besoin de la permission **content.edit** pour accéder à l'éditeur

</div>

## Ouverture de l'éditeur

1. Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Site web** et cliquez sur **Pages**.
2. Trouvez la page que vous souhaitez éditer dans le tableau Pages et cliquez sur **Éditer**.

L'éditeur s'ouvre en mode plein écran. Le panneau de gauche affiche la structure de votre page et les éléments de contenu disponibles ; la zone centrale affiche un aperçu en direct de votre page.

:::info
L'éditeur s'affiche toujours en mode clair, quel que soit le paramètre de thème B1 Admin. Cela garantit que l'aperçu correspond exactement à la façon dont votre page s'affichera aux visiteurs du site web.
:::

## Structure de page : sections et éléments

Chaque page est construite à partir de deux niveaux :

- **Sections** -- Les conteneurs de niveau supérieur qui divisent votre page en bandes horizontales (par exemple, une section héros, un bloc de contenu ou une bande de pied de page). Chaque page doit avoir au moins une section avant de pouvoir ajouter du contenu.
- **Éléments** -- Les pièces de contenu individuelles placées à l'intérieur d'une section, telles que du texte, des images, des boutons, des cartes, des formulaires et des calendriers.

### Ajout d'une section

1. Cliquez sur **Ajouter une section** (ou le bouton **+** en haut du panneau de gauche).
2. Choisissez comment commencer :
   - **À partir d'un modèle** — parcourez la galerie de modèles de sections organisée par catégorie (Héros, À propos, Services, Dons, etc.) et cliquez sur celui-ci pour l'insérer comme une section entièrement stylisée et pré-remplie. Vous pouvez personnaliser tout après son ajout.
   - **Section vierge** — choisissez une mise en page colonnaire (simple, deux colonnes, trois colonnes, etc.) et construisez à partir de zéro.
3. La nouvelle section apparaît dans l'aperçu. Cliquez dessus pour la sélectionner et configurez sa couleur de fond, son rembourrage et d'autres options de style.

### Changement de la mise en page d'une section

Vous avez déjà construit une section mais vous voulez une structure différente ? Utilisez le commutateur de mise en page sur cette section pour changer son arrangement de colonnes pour un autre de la galerie tout en gardant votre contenu existant et les éléments en place.

### Ajout d'éléments à une section

1. Cliquez dans une section de l'aperçu pour la sélectionner.
2. Cliquez sur **Ajouter du contenu** et choisissez un type d'élément dans la liste :
   - **Texte** -- En-têtes, paragraphes et texte enrichi
   - **Image** -- Téléchargez ou liez à une photo
   - **Bouton** -- Un lien d'appel à l'action cliquable
   - **Carte** -- Une image avec un titre et une description
   - **Formulaire** -- Intégrez un [formulaire](../forms/creating-forms) directement sur la page
   - **Calendrier** -- Affiche un calendrier d'événements
   - **FAQ** -- Blocs de questions et réponses de style accordéon
   - **Vidéo** -- Intégrez une vidéo par URL
   - **Navigateur de groupes** -- Un répertoire filtrable de tous les groupes d'église avec recherche optionnelle, filtre de catégorie et filtre d'étiquette
   - **Caractéristique d'icône** -- Une icône avec un titre et une courte description, pour mettre en évidence les caractéristiques ou ministères
   - **Galerie** -- Une grille multi-photos ou une mise en page maçonnerie
   - **Témoignage** -- Une ou plusieurs citations avec le nom de l'auteur, le rôle et la photo
   - **Icônes sociales** -- Des icônes liées pour les profils de réseaux sociaux de votre église
   - **Compte à rebours** -- Un minuteur comptant à rebours jusqu'à une date ou une heure de service hebdomadaire
   - **Statistiques** -- Une rangée de grands nombres avec des étiquettes (membres, années, campus)
   - **Progression de la campagne** -- Une barre de progression en direct pour une campagne de dons, affichant le total collecté vers un objectif de fonds
   - **Grille de personnel** -- Des cartes photo pour les membres d'un groupe ; le groupe doit avoir son option de **roster public** activée
   - **Horaires de service** -- L'horaire de service de vos campus, tiré automatiquement de la configuration de la participation
   - **Sermons** -- Votre bibliothèque de sermons, sous forme de navigateur complet ou une mise en page grille, liste ou dernier en vedette
   - **Carte** -- Une carte intégrée centrée sur l'adresse de votre église
   - **Tableau** -- Une grille simple de lignes et colonnes pour le contenu tabulaire
   - **Texte avec photo** -- Texte et image côte à côte
   - **Logo** -- Le logo de votre église, tiré de l'[Apparence](appearance)
   - **Diffusion en direct** -- Votre lecteur de diffusion en direct, intégré directement sur la page
   - **Podcast** -- Une liste d'épisodes tirées d'une URL de flux RSS de podcast externe que vous fournissez, avec des paramètres pour le nombre d'épisodes à afficher et s'il faut afficher les dates et descriptions. Ceci est pour mettre en vedette n'importe quel flux de podcast sur votre site ; pour publier vos propres sermons en tant que podcast, consultez [Gestion des sermons](../sermons/managing-sermons.md#your-podcast-feed) à la place.
   - **Donation** -- Un bouton de don ou un formulaire de donation intégré
   - **HTML brut** -- Balisage HTML personnalisé pour les cas d'usage avancés
   - **iFrame** -- Intégrez du contenu externe par URL
3. Configurez l'élément à l'aide du panneau de paramètres qui apparaît.

### Réorganisation du contenu

Faites glisser les sections ou les éléments à l'aide de l'icône de poignée (six points) sur le côté gauche de chaque élément pour les réorganiser. Vous pouvez faire glisser des éléments dans une section ou les déplacer entre les sections.

## Stylisation de votre page

### Styles de section

Cliquez sur n'importe quelle section pour ouvrir son panneau de style. Vous pouvez définir :

- **Arrière-plan** -- Couleur unie, dégradé ou image. Lorsque vous utilisez un fond d'image, un sélecteur de **point focal** vous permet de cliquer pour définir quelle partie de l'image reste centrée à mesure que la section s'adapte, et une option de couleur d'**superposition** vous permet d'ajouter une teinte semi-transparente sur l'image pour améliorer la lisibilité du texte.
- **Rembourrage** -- Espacement supérieur et inférieur à l'intérieur de la section
- **Largeur** -- Pleine largeur ou centrée/contenue
- **Séparateurs** -- Séparateurs de forme décoratifs (onde, inclinaison, courbe, triangle et plus) sur le bord supérieur ou inférieur de la section, avec les options de couleur, hauteur et retournement

### Styles d'élément

Cliquez sur n'importe quel élément pour ouvrir son panneau de style. Les options courantes incluent la taille de la police, la couleur, l'alignement, la marge et le rembourrage. Pour les images, vous pouvez définir du texte alt et des cibles de lien.

### CSS personnalisé

Pour une stylisation avancée, chaque section et élément a un champ **CSS personnalisé** où vous pouvez écrire vos propres règles CSS. Ceux-ci sont limités à cet élément, afin qu'ils n'affectent pas accidentellement le reste de la page.

:::tip
Si vous avez besoin d'appliquer des styles sur l'ensemble de votre site -- par exemple, une police personnalisée ou une couleur globale -- utilisez plutôt les paramètres d'[Apparence](appearance) au lieu du CSS personnalisé sur des pages individuelles.
:::

## Aperçu de votre page

Utilisez les contrôles d'aperçu de la barre d'outils pour vérifier comment votre page s'affiche à différentes tailles d'écran :

- **Bureau** -- Vue de navigateur pleine largeur
- **Mobile** -- Vue étroite de la taille du téléphone

Cliquez sur **Aperçu** pour ouvrir une version en direct de la page dans un nouvel onglet du navigateur, exactement comme les visiteurs la verront.

## Vérification de l'accessibilité

Cliquez sur l'icône **Accessibilité** dans la barre d'outils pour exécuter une vérification rapide des problèmes courants -- images manquantes texte alt, contraste de couleur faible ou en-têtes hors de l'ordre. Chaque problème renvoie directement à l'élément qui nécessite une attention pour que vous puissiez le corriger sur place.

## Annulation des modifications

L'éditeur suit automatiquement votre historique d'édition. Utilisez les boutons de la barre d'outils ou les raccourcis clavier pour naviguer :

- **Annuler** (Ctrl+Z / Cmd+Z) -- Annulez votre dernière action
- **Refaire** (Ctrl+Y / Cmd+Y) -- Réappliquez une action annulée

Vous pouvez également restaurer la page vers un instantané antérieur. Cliquez sur **Historique** dans la barre d'outils pour voir une liste des instantanés enregistrés avec descriptions, et cliquez sur n'importe quelle entrée pour restaurer à ce point.

:::warning
La restauration d'un instantané remplace le contenu de votre page actuelle par la version d'instantané. Cela ne peut pas être annulé avec le bouton d'annulation standard. Enregistrez un instantané de votre état actuel avant de restaurer une ancienne version si vous souhaitez conserver l'option de retour.
:::

## Enregistrement et publication

Les modifications sont enregistrées automatiquement à mesure que vous travaillez. Un indicateur d'état dans la barre d'outils indique si vos modifications ont été enregistrées.

### État de brouillon et publié

Les pages peuvent avoir un état **publié**, qui contrôle quand les visiteurs voient vos modifications. La barre d'outils affiche une puce d'état indiquant l'état actuel :

- **En direct à l'enregistrement** -- La page n'utilise pas un flux de travail de publication. Chaque modification enregistrée est mise en direct immédiatement. C'est le paramètre par défaut pour les nouvelles pages.
- **Modifications non publiées** -- La page a été publiée auparavant, mais vous avez fait des modifications depuis la dernière publication. Les visiteurs voient toujours la version précédemment publiée.
- **Publié** -- La page est en direct et votre contenu enregistré correspond à ce que les visiteurs voient.

Pour publier vos modifications, cliquez sur le bouton **Publier** dans la barre d'outils. La page devient en direct immédiatement.

Pour revenir à la dernière version publiée sans affecter ce que les visiteurs voient, ouvrez le menu de débordement (⋮) et cliquez sur **Annuler les modifications**.

Pour retirer une page complètement du web, ouvrez le menu de débordement et cliquez sur **Dépublier**. Les visiteurs ne verront plus cette page jusqu'à ce que vous la publiiez à nouveau.

:::tip
Utilisez le flux de travail brouillon/publication lorsque vous souhaitez préparer une page -- par exemple, pour un événement à venir -- et ne la mettez en direct que au moment opportun. Construisez et prévisualisez la page, puis cliquez sur Publier lorsque vous êtes prêt.
:::

## Articles connexes

- [Gestion des pages](managing-pages) -- Créez des pages, définissez des URL et gérez la navigation du site
- [Apparence](appearance) -- Définissez les couleurs, polices et image de marque à l'échelle du site
- [Fichiers](files) -- Téléchargez les images et documents à utiliser dans l'éditeur
- [Créer des formulaires](../forms/creating-forms) -- Créez des formulaires que vous pouvez intégrer sur des pages
