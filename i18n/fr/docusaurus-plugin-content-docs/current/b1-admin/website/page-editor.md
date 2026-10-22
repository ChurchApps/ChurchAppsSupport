---
title: "Utiliser l'éditeur de pages"
---

# Utiliser l'éditeur de pages {#using-the-page-editor}

<div class="article-intro">

L'éditeur de pages B1 est un outil visuel de glisser-déposer qui vous permet de concevoir les pages de votre site d'église sans écrire de code. Vous pouvez ajouter des sections et des blocs de contenu, personnaliser les styles, prévisualiser votre travail et annuler des modifications, le tout depuis votre navigateur.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Terminez la [configuration initiale](initial-setup) pour configurer votre site web
- Créez au moins une page dans [Gérer les pages](managing-pages)
- Vous avez besoin de la permission **content.edit** pour accéder à l'éditeur

</div>

## Ouvrir l'éditeur {#opening-the-editor}

1. Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Site web** et cliquez sur **Pages**.
2. Trouvez la page à modifier dans le tableau des pages et cliquez sur **Modifier le contenu**.

L'éditeur s'ouvre en plein écran. Le panneau de gauche affiche la structure de votre page et les éléments de contenu disponibles; la zone centrale affiche un aperçu en direct de votre page.

:::info
L'éditeur s'affiche toujours en mode clair, quel que soit le thème de B1 Admin, et utilise les polices de titre et de texte que vous avez choisies dans [Apparence](appearance). Cela garantit que l'aperçu correspond fidèlement à l'affichage de votre page pour les visiteurs du site.
:::

## Structure de la page : sections et éléments {#page-structure-sections-and-elements}

Chaque page est construite à partir de deux niveaux :

- **Sections** -- Les conteneurs de premier niveau qui divisent votre page en bandes horizontales (par exemple, une section d'accueil, un bloc de contenu ou une bande de pied de page). Chaque page doit avoir au moins une section avant que vous puissiez ajouter du contenu.
- **Éléments** -- Les pièces de contenu individuelles placées dans une section, comme du texte, des images, des boutons, des cartes, des formulaires et des calendriers.

### Ajouter une section {#adding-a-section}

1. Cliquez sur **Ajouter une section** (ou sur le bouton **+** en haut du panneau de gauche).
2. Choisissez comment commencer :
   - **À partir d'un modèle** -- parcourez la galerie de modèles de section, classée par catégorie (Accueil, À propos, Services, Dons, etc.), et cliquez sur un modèle pour l'insérer comme section entièrement stylisée et préremplie. Vous pouvez tout personnaliser après l'ajout.
   - **Section vide** -- choisissez une disposition en colonnes (une colonne, deux colonnes, trois colonnes, etc.) et créez le contenu à partir de zéro.
3. La nouvelle section apparaît dans l'aperçu. Cliquez dessus pour la sélectionner et configurer sa couleur d'arrière-plan, son espacement intérieur et ses autres options de style.

### Changer la mise en page d'une section {#switching-a-sections-layout}

Vous avez déjà créé une section mais vous voulez une autre structure ? Utilisez le sélecteur de mise en page de cette section pour remplacer sa disposition en colonnes par une autre tirée de la galerie, tout en conservant votre contenu et vos éléments en place.

### Ajouter des éléments à une section {#adding-elements-to-a-section}

1. Cliquez à l'intérieur d'une section dans l'aperçu pour la sélectionner.
2. Cliquez sur **Ajouter du contenu** et choisissez un type d'élément dans la liste :
   - **Texte** -- Titres, paragraphes et texte enrichi
   - **Image** -- Téléversez une photo ou créez un lien vers une photo
   - **Bouton** -- Un lien cliquable d'appel à l'action
   - **Carte** -- Une image avec un titre et une description
   - **Formulaire** -- Intégrez un [formulaire](../forms/creating-forms) directement sur la page
   - **Calendrier** -- Affiche un calendrier d'événements
   - **FAQ** -- Blocs de questions et réponses en accordéon
   - **Vidéo** -- Intègre une vidéo à partir d'une URL
   - **Répertoire des groupes** -- Un répertoire filtrable de tous les groupes de l'église, avec recherche facultative, filtre par catégorie et filtre par étiquette
   - **Fonctionnalité avec icône** -- Une icône avec un titre et une courte description, pour mettre en valeur des fonctionnalités ou des ministères
   - **Galerie** -- Une grille de photos ou une mise en page en maçonnerie
   - **Témoignage** -- Une ou plusieurs citations avec le nom, le rôle et la photo de l'auteur
   - **Icônes de réseaux sociaux** -- Icônes cliquables menant aux profils de réseaux sociaux de votre église
   - **Compte à rebours** -- Un minuteur qui compte jusqu'à une date ou jusqu'à l'heure d'un service hebdomadaire
   - **Statistiques** -- Une rangée de grands chiffres avec des étiquettes (membres, années, campus)
   - **Progression de la campagne** -- Une barre de progression en direct pour une campagne de dons, indiquant le total recueilli vers l'objectif d'un fonds
   - **Grille de l'équipe** -- Cartes avec photo pour les membres d'un groupe; le groupe doit avoir l'option **liste publique** activée
   - **Horaires des services** -- L'horaire des services de vos campus, extrait automatiquement de la configuration des présences
   - **Sermons** -- Votre bibliothèque de sermons, sous forme de navigateur complet ou de grille, de liste ou de mise en page du dernier sermon en vedette
   - **Carte** -- Une carte intégrée centrée sur l'adresse de votre église
   - **Tableau** -- Une simple grille de lignes et de colonnes pour du contenu tabulaire
   - **Texte avec photo** -- Du texte et une image côte à côte
   - **Logo** -- Le logo de votre église, extrait de [Apparence](appearance)
   - **Diffusion en direct** -- Votre lecteur de diffusion en direct, intégré directement sur la page
   - **Balado** -- Une liste d'épisodes extraite d'un flux RSS de balado externe dont vous fournissez l'URL, avec des paramètres pour le nombre d'épisodes à afficher et pour afficher ou non les dates et les descriptions. Chaque épisode sur le site en direct dispose d'un lecteur audio et d'un lien **Télécharger** qui enregistre le fichier audio de l'épisode sous le titre de l'épisode. Cet élément sert à mettre en valeur n'importe quel flux de balado sur votre site; pour publier vos propres sermons en tant que balado, consultez plutôt [Gérer les sermons](../sermons/managing-sermons.md#your-podcast-feed).
   - **Don** -- Un bouton de don ou un formulaire de don intégré
   - **HTML** -- Votre propre code HTML brut, pour les cas d'usage avancés, comme l'intégration d'un widget tiers (voir [Utiliser l'élément HTML](#using-the-html-element))
   - **iFrame** -- Intègre du contenu externe à partir d'une URL
3. Configurez l'élément à l'aide du panneau de paramètres qui apparaît.

### Utiliser l'élément HTML {#using-the-html-element}

L'élément **HTML** comporte deux zones :

- **Contenu HTML** -- Le balisage à afficher sur la page. Toutes les balises `<script>` que vous y incluez s'exécutent sur votre site en direct.
- **JavaScript (sans la balise script)** -- Le code de script qui s'exécute au chargement de la page. Vous pouvez aussi coller ici l'extrait d'intégration d'un fournisseur avec ses balises `<script>`, et il s'exécutera sur le site en direct.

Si vous collez uniquement une adresse web (comme un lien vers une image) dans la zone JavaScript, la zone devient rouge avec l'avertissement *« Ceci est une adresse web, pas du JavaScript. »* Une simple adresse dans cette zone ne fait rien. Pour afficher une image, utilisez un élément **Image** ou placez `<img src="...">` dans **Contenu HTML**.

### Utiliser l'élément Calendrier {#using-the-calendar-element}

L'élément **Calendrier** affiche les événements de l'un de vos calendriers :

1. Sous **Sélection**, choisissez **Calendrier de groupe** (les événements d'un seul groupe -- la liste affiche les groupes auxquels vous appartenez) ou **Calendrier organisé** (un calendrier que vous avez créé sous **Calendriers**; consultez [Calendrier organisé](../calendars/curated-calendar)).
2. Sous **Sélectionner un calendrier**, choisissez le groupe ou le calendrier.
3. Sous **Affichage**, choisissez le mode d'affichage :
   - **Calendrier mensuel** -- Une grille mensuelle que les visiteurs peuvent parcourir.
   - **Événements à venir** -- Une grille de vignettes pour les 12 prochains événements, un événement récurrent n'étant affiché qu'une fois, à sa prochaine date. Chaque vignette affiche la photo de l'événement (ou son titre sur la couleur sombre de votre thème s'il n'a pas de photo), une étiquette de date, le jour et l'heure, ainsi que la première ligne de sa description. Un bouton **S'abonner** au-dessus des vignettes permet aux visiteurs de copier le lien ICS du calendrier ou de le télécharger.
4. Pour n'afficher que certains événements, saisissez une balise dans **Seulement les événements avec l'étiquette** -- par exemple, `jeunesse`. Seuls les événements dont les **Étiquettes** contiennent ce mot apparaissent. Laissez le champ vide pour afficher tous les événements. Les étiquettes sont définies sur chaque événement; consultez [Ajouter et modifier des événements](../calendars/creating-calendars.md#adding-and-editing-events).

Dans les deux modes d'affichage, un clic sur un événement ouvre sa propre page sur votre site web. La page de l'événement affiche la photo, le titre, la date et l'heure, ainsi que la description, et une boîte avec **Quand** (incluant le modèle de répétition pour un événement récurrent) et **Où** (les salles réservées pour l'événement). Elle comporte aussi un bouton **S'inscrire à cet événement** lorsque l'inscription est activée, et un lien **Ajouter à mon calendrier** qui télécharge l'événement sous forme de fichier de calendrier. La page est conçue pour que les moteurs de recherche puissent afficher la date et les détails de l'événement dans leurs résultats.

### Réorganiser le contenu {#reordering-content}

Faites glisser les sections ou les éléments à l'aide de l'icône de poignée (six points) à gauche de chaque élément pour les réorganiser. Vous pouvez déplacer des éléments à l'intérieur d'une section ou les transférer d'une section à une autre.

## Mettre en forme votre page {#styling-your-page}

### Styles de section {#section-styles}

Cliquez sur une section pour ouvrir son panneau de style. Vous pouvez définir :

- **Arrière-plan** -- Couleur unie, dégradé ou image. Lorsque vous utilisez une image en arrière-plan, un sélecteur de **point focal** vous permet de cliquer pour définir la partie de l'image qui reste centrée lorsque la section change de taille, et une option de couleur de **superposition** vous permet d'ajouter une teinte semi-transparente sur l'image pour améliorer la lisibilité du texte.
- **Espacement intérieur** -- L'espace en haut et en bas à l'intérieur de la section
- **Largeur** -- Pleine largeur ou centrée/contenue
- **Séparateurs** -- Formes décoratives de séparation (vague, biais, courbe, triangle et autres) sur le bord supérieur ou inférieur de la section, avec couleur, hauteur et options d'inversion

### Styles des éléments {#element-styles}

Cliquez sur un élément pour ouvrir son panneau de style. Les options courantes incluent la taille de police, la couleur, l'alignement, la marge et l'espacement intérieur. Pour les images, vous pouvez définir le texte alternatif et les cibles des liens.

### CSS personnalisé {#custom-css}

Pour une mise en forme avancée, chaque section et chaque élément dispose d'un champ **CSS personnalisé** dans lequel vous pouvez écrire vos propres règles CSS. Ces règles sont limitées à cet élément et n'affecteront donc pas involontairement le reste de la page.

:::tip
Si vous devez appliquer des styles à l'ensemble de votre site -- comme une police personnalisée ou une couleur globale -- utilisez plutôt les paramètres [Apparence](appearance) au lieu du CSS personnalisé sur des pages individuelles.
:::

## Prévisualiser votre page {#previewing-your-page}

Utilisez les commandes d'aperçu de la barre d'outils pour vérifier l'apparence de votre page à différentes tailles d'écran :

- **Ordinateur** -- Affichage pleine largeur du navigateur
- **Mobile** -- Affichage étroit au format téléphone

Pour voir la page en direct exactement comme la verront les visiteurs, retournez à la liste des pages et cliquez sur le chemin de la page. Elle s'ouvre dans un nouvel onglet du navigateur.

## Vérifier l'accessibilité {#checking-accessibility}

Cliquez sur l'icône **Accessibilité** dans la barre d'outils pour lancer une vérification rapide des problèmes courants -- images sans texte alternatif, contraste de couleurs insuffisant ou titres dans le désordre. Chaque problème renvoie directement à l'élément à corriger afin que vous puissiez le réparer sur place.

## Annuler les modifications {#undoing-changes}

L'éditeur conserve automatiquement l'historique de vos modifications. Utilisez les boutons de la barre d'outils ou les raccourcis clavier pour naviguer :

- **Annuler** (Ctrl+Z / Cmd+Z) -- Annule votre dernière action
- **Rétablir** (Ctrl+Maj+Z ou Ctrl+Y / Cmd+Maj+Z) -- Réapplique une action annulée

Vous pouvez aussi restaurer la page à un instantané antérieur. Cliquez sur **Afficher l'historique** dans la barre d'outils pour voir la liste des instantanés enregistrés avec leur description, puis cliquez sur une entrée pour revenir à ce point.

:::warning
Restaurer un instantané remplace le contenu actuel de votre page par la version de l'instantané. Cette action ne peut pas être annulée avec le bouton d'annulation standard. Enregistrez un instantané de l'état actuel avant de restaurer une ancienne version si vous voulez pouvoir revenir en arrière.
:::

## Enregistrer et publier {#saving-and-publishing}

Les modifications sont enregistrées automatiquement au fur et à mesure. Un indicateur d'état dans la barre d'outils indique si vos modifications ont été enregistrées.

### État brouillon et publié {#draft-and-published-state}

Les pages peuvent avoir un état **publié** qui détermine quand les visiteurs voient vos modifications. La barre d'outils affiche une pastille d'état indiquant l'état actuel :

- **En direct à l'enregistrement** -- La page n'utilise pas de flux de publication. Chaque modification enregistrée devient immédiatement visible. C'est le paramètre par défaut des nouvelles pages.
- **Modifications non publiées** -- La page a déjà été publiée, mais vous avez apporté des modifications depuis la dernière publication. Les visiteurs voient toujours la version publiée précédemment.
- **Publiée** -- La page est en direct et votre contenu enregistré correspond à ce que voient les visiteurs.

Pour publier vos modifications, cliquez sur le bouton **Publier** dans la barre d'outils. La page devient immédiatement en direct.

Pour revenir à la dernière version publiée sans modifier ce que voient les visiteurs, ouvrez le menu de débordement (⋮) et cliquez sur **Abandonner les modifications non publiées**.

Pour cesser d'utiliser le flux de publication, ouvrez le menu de débordement et cliquez sur **Désactiver la publication**. Les modifications seront alors à nouveau mises en direct immédiatement.

:::tip
Utilisez le flux brouillon/publication lorsque vous voulez préparer une page -- par exemple pour un événement à venir -- et ne la rendre visible qu'au bon moment. Créez et prévisualisez la page, puis cliquez sur Publier lorsque vous êtes prêt.
:::

## Articles connexes {#related-articles}

- [Gérer les pages](managing-pages) -- Créer des pages, définir les URL et gérer la navigation du site
- [Apparence](appearance) -- Définir les couleurs, les polices et l'image de marque du site
- [Fichiers](files) -- Téléverser des images et des documents à utiliser dans l'éditeur
- [Créer des formulaires](../forms/creating-forms) -- Créer des formulaires que vous pouvez intégrer aux pages
