---
title: "Utiliser l'éditeur de page"
---

# Utiliser l'éditeur de page

<div class="article-intro">

L'éditeur de page B1 est un constructeur visuel par glisser-déposer qui vous permet de concevoir les pages du site web de votre église sans écrire de code. Vous pouvez ajouter des sections et des blocs de contenu, personnaliser les styles, prévisualiser votre travail et annuler des modifications -- le tout depuis votre navigateur.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Terminez la [Configuration initiale](initial-setup) pour que votre site web soit configuré
- Créez au moins une page dans [Gestion des pages](managing-pages)
- Vous avez besoin de la permission **content.edit** pour accéder à l'éditeur

</div>

## Ouvrir l'éditeur

1. Dans B1 Admin, cliquez sur **Site web** dans le menu de gauche.
2. Trouvez la page que vous souhaitez modifier dans le tableau Pages et cliquez sur **Modifier**.

L'éditeur s'ouvre en mode plein écran. Le panneau de gauche affiche la structure de votre page et les éléments de contenu disponibles ; la zone centrale affiche un aperçu en direct de votre page.

:::info
L'éditeur s'affiche toujours en mode clair, quel que soit le paramètre de thème de B1 Admin. Cela garantit que l'aperçu correspond fidèlement à ce que verront les visiteurs de votre site web.
:::

## Structure de la page : sections et éléments

Chaque page est construite sur deux niveaux :

- **Sections** -- Les conteneurs de premier niveau qui divisent votre page en bandes horizontales (par exemple, une section héros, un bloc de contenu, ou une bande de pied de page). Chaque page doit comporter au moins une section avant que vous puissiez y ajouter du contenu.
- **Éléments** -- Les éléments de contenu individuels placés à l'intérieur d'une section, tels que du texte, des images, des boutons, des cartes, des formulaires et des calendriers.

### Ajouter une section

1. Cliquez sur **Ajouter une section** (ou le bouton **+** en haut du panneau de gauche).
2. Choisissez comment commencer :
   - **À partir d'un modèle** — parcourez la galerie de modèles de section organisée par catégorie (Héros, À propos, Services, Dons, etc.) et cliquez sur l'un d'eux pour l'insérer sous forme de section entièrement stylisée et pré-remplie. Vous pouvez tout personnaliser une fois qu'elle est ajoutée.
   - **Section vierge** — choisissez une mise en page en colonnes (une, deux, trois colonnes, etc.) et construisez à partir de zéro.
3. La nouvelle section apparaît dans l'aperçu. Cliquez dessus pour la sélectionner et configurer sa couleur de fond, ses marges intérieures et d'autres options de style.

### Changer la mise en page d'une section

Vous avez déjà construit une section mais souhaitez une structure différente ? Utilisez le sélecteur de mise en page de cette section pour remplacer son agencement en colonnes par un autre issu de la galerie, tout en conservant votre contenu et vos éléments existants.

### Ajouter des éléments à une section

1. Cliquez à l'intérieur d'une section dans l'aperçu pour la sélectionner.
2. Cliquez sur **Ajouter du contenu** et choisissez un type d'élément dans la liste :
   - **Texte** -- Titres, paragraphes et texte enrichi
   - **Image** -- Téléversez ou liez une photo
   - **Bouton** -- Un lien d'appel à l'action cliquable
   - **Carte** -- Une image avec un titre et une description
   - **Formulaire** -- Intégrez un [formulaire](../forms/creating-forms) directement sur la page
   - **Calendrier** -- Affichez un calendrier d'événements
   - **FAQ** -- Blocs de questions-réponses de type accordéon
   - **Vidéo** -- Intégrez une vidéo par URL
   - **Navigateur de groupes** -- Un répertoire filtrable de tous les groupes de l'église avec recherche, filtre de catégorie et filtre d'étiquette facultatifs
   - **Fonctionnalité avec icône** -- Une icône avec un titre et une brève description, pour mettre en valeur une fonctionnalité ou un ministère
   - **Galerie** -- Une grille multi-photos ou une mise en page en mosaïque
   - **Témoignage** -- Une ou plusieurs citations avec le nom de l'auteur, son rôle et sa photo
   - **Icônes sociales** -- Icônes liées vers les profils de réseaux sociaux de votre église
   - **Compte à rebours** -- Une minuterie qui compte à rebours jusqu'à une date ou une heure de service hebdomadaire
   - **Statistiques** -- Une rangée de grands chiffres avec des libellés (membres, années, campus)
   - **Progression de campagne** -- Une barre de progression en direct pour une campagne de don, affichant le total récolté par rapport à un objectif
   - **Grille du personnel** -- Des cartes photo pour les membres d'un groupe ; le groupe doit avoir son option **liste publique** activée
   - **Horaires des services** -- Le calendrier des services de vos campus, récupéré automatiquement depuis la configuration de la présence
   - **Prédications** -- Votre bibliothèque de prédications, sous forme de navigateur complet ou de mise en page en grille, en liste, ou en dernière prédication mise en avant
   - **Carte** -- Une carte intégrée centrée sur l'adresse de votre église
   - **Tableau** -- Une grille simple de lignes et de colonnes pour du contenu tabulaire
   - **Texte avec photo** -- Texte et image côte à côte
   - **Logo** -- Le logo de votre église, récupéré depuis [Apparence](appearance)
   - **Diffusion en direct** -- Votre lecteur de diffusion en direct, intégré directement sur la page
   - **Don** -- Un bouton de don ou un formulaire de don intégré
   - **HTML brut** -- Balisage HTML personnalisé pour des cas d'usage avancés
   - **iFrame** -- Intégrez du contenu externe par URL
3. Configurez l'élément à l'aide du panneau de paramètres qui apparaît.

### Réorganiser le contenu

Faites glisser les sections ou les éléments à l'aide de l'icône de poignée (six points) sur le côté gauche de chaque élément pour les réorganiser. Vous pouvez faire glisser des éléments au sein d'une section ou les déplacer entre sections.

## Styliser votre page

### Styles de section

Cliquez sur n'importe quelle section pour ouvrir son panneau de style. Vous pouvez définir :

- **Arrière-plan** -- Couleur unie, dégradé, ou image. Lorsque vous utilisez un arrière-plan image, un sélecteur de **Point focal** vous permet de cliquer pour définir quelle partie de l'image reste centrée à mesure que la section s'adapte, et une option de couleur de **Superposition** vous permet d'ajouter une teinte semi-transparente sur l'image pour améliorer la lisibilité du texte.
- **Marge intérieure** -- Espacement en haut et en bas à l'intérieur de la section
- **Largeur** -- Pleine largeur ou centrée/contenue
- **Séparateurs** -- Séparateurs de formes décoratives (vague, biseau, courbe, triangle, et plus) sur le bord supérieur ou inférieur de la section, avec des options de couleur, de hauteur et de retournement

### Styles d'élément

Cliquez sur n'importe quel élément pour ouvrir son panneau de style. Les options courantes incluent la taille de police, la couleur, l'alignement, la marge et le remplissage. Pour les images, vous pouvez définir le texte alternatif et les cibles de lien.

### CSS personnalisé

Pour un style avancé, chaque section et élément dispose d'un champ **CSS personnalisé** où vous pouvez écrire vos propres règles CSS. Celles-ci sont limitées à cet élément, de sorte qu'elles n'affecteront pas involontairement le reste de la page.

:::tip
Si vous devez appliquer des styles à l'ensemble de votre site -- comme une police personnalisée ou une couleur globale -- utilisez les paramètres d'[Apparence](appearance) plutôt que du CSS personnalisé sur des pages individuelles.
:::

## Prévisualiser votre page

Utilisez les contrôles d'aperçu dans la barre d'outils pour vérifier l'affichage de votre page sur différentes tailles d'écran :

- **Ordinateur** -- Vue navigateur pleine largeur
- **Mobile** -- Vue étroite au format téléphone

Cliquez sur **Aperçu** pour ouvrir une version en direct de la page dans un nouvel onglet du navigateur, exactement comme les visiteurs la verront.

## Vérifier l'accessibilité

Cliquez sur l'icône **Accessibilité** dans la barre d'outils pour effectuer une vérification rapide des problèmes courants -- images sans texte alternatif, faible contraste des couleurs, ou titres dans le mauvais ordre. Chaque problème renvoie directement à l'élément concerné afin que vous puissiez le corriger sur place.

## Annuler des modifications

L'éditeur suit automatiquement votre historique de modifications. Utilisez les boutons de la barre d'outils ou les raccourcis clavier pour naviguer :

- **Annuler** (Ctrl+Z / Cmd+Z) -- Annulez votre dernière action
- **Rétablir** (Ctrl+Y / Cmd+Y) -- Réappliquez une action annulée

Vous pouvez également restaurer la page à un instantané antérieur. Cliquez sur **Historique** dans la barre d'outils pour voir une liste d'instantanés enregistrés avec leurs descriptions, et cliquez sur n'importe quelle entrée pour restaurer la page à ce moment-là.

:::warning
Restaurer un instantané remplace le contenu actuel de votre page par la version de l'instantané. Cette action ne peut pas être annulée avec le bouton d'annulation standard. Enregistrez un instantané de votre état actuel avant de restaurer un ancien si vous souhaitez conserver la possibilité d'y revenir.
:::

## Enregistrement et publication

Les modifications sont enregistrées automatiquement au fur et à mesure de votre travail. Un indicateur d'état dans la barre d'outils affiche si vos modifications ont été enregistrées.

### État brouillon et publié

Les pages peuvent avoir un état **publié**, qui contrôle quand les visiteurs voient vos modifications. La barre d'outils affiche une puce d'état indiquant l'état actuel :

- **En direct dès l'enregistrement** -- La page n'utilise pas de flux de publication. Chaque modification enregistrée est immédiatement mise en ligne. C'est le comportement par défaut pour les nouvelles pages.
- **Modifications non publiées** -- La page a déjà été publiée, mais vous avez apporté des modifications depuis la dernière publication. Les visiteurs voient toujours la version précédemment publiée.
- **Publiée** -- La page est en ligne et votre contenu enregistré correspond à ce que voient les visiteurs.

Pour publier vos modifications, cliquez sur le bouton **Publier** dans la barre d'outils. La page est mise en ligne immédiatement.

Pour revenir à la dernière version publiée sans affecter ce que voient les visiteurs, ouvrez le menu de débordement (⋮) et cliquez sur **Abandonner les modifications**.

Pour mettre une page hors ligne entièrement, ouvrez le menu de débordement et cliquez sur **Dépublier**. Les visiteurs ne verront plus cette page jusqu'à ce que vous la publiiez à nouveau.

:::tip
Utilisez le flux de travail brouillon/publication lorsque vous souhaitez préparer une page -- par exemple pour un événement à venir -- et ne la mettre en ligne qu'au bon moment. Construisez et prévisualisez la page, puis cliquez sur Publier lorsque vous êtes prêt.
:::

## Articles associés

- [Gestion des pages](managing-pages) -- Créez des pages, définissez des URL et gérez la navigation du site
- [Apparence](appearance) -- Définissez les couleurs, polices et l'image de marque de l'ensemble du site
- [Fichiers](files) -- Téléversez des images et documents à utiliser dans l'éditeur
- [Créer des formulaires](../forms/creating-forms) -- Construisez des formulaires que vous pouvez intégrer sur des pages
