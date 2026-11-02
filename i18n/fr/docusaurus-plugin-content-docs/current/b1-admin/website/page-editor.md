---
title: "Utiliser l'éditeur de pages"
---

# Utiliser l'éditeur de pages

<div class="article-intro">

L'éditeur de pages de B1 est un constructeur visuel par glisser-déposer qui vous permet de concevoir les pages de votre site web sans écrire de code. Vous pouvez ajouter des sections et des blocs de contenu, personnaliser les styles, prévisualiser votre travail et annuler des modifications -- le tout depuis votre navigateur.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Effectuez la [configuration initiale](initial-setup) pour configurer votre site web
- Créez au moins une page dans [Gérer les pages](managing-pages)
- Vous avez besoin de l'autorisation **content.edit** pour accéder à l'éditeur

</div>

## Ouvrir l'éditeur

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Site web**, puis cliquez sur **Pages**.
2. Repérez la page à modifier dans le tableau des pages et cliquez sur **Modifier le contenu**.

L'éditeur s'ouvre en plein écran. Le panneau de gauche affiche la structure de votre page et les éléments de contenu disponibles ; la zone centrale affiche un aperçu en direct de votre page.

:::info
L'éditeur s'affiche toujours en mode clair, quel que soit le thème de B1 Admin choisi, et utilise les polices de titre et de texte que vous avez choisies dans [Apparence](appearance). Cela garantit que l'aperçu correspond fidèlement à l'apparence de votre page pour les visiteurs du site.
:::

## Structure de la page : sections et éléments

Chaque page est construite à partir de deux niveaux :

- **Sections** -- Les conteneurs de premier niveau qui divisent votre page en bandes horizontales (par exemple une section d'accueil, un bloc de contenu ou une bande de pied de page). Chaque page doit avoir au moins une section avant que vous puissiez y ajouter du contenu.
- **Éléments** -- Les pièces de contenu individuelles placées dans une section, comme du texte, des images, des boutons, des cartes, des formulaires et des calendriers.

### Ajouter une section

1. Cliquez sur **Ajouter une section** (ou sur le bouton **+** en haut du panneau de gauche).
2. Choisissez comment commencer :
   - **À partir d'un modèle** — parcourez la galerie de modèles de sections organisée par catégorie (Accueil, À propos, Services, Dons, etc.) et cliquez sur l'un d'eux pour l'insérer comme section entièrement stylisée et préremplie. Vous pouvez tout personnaliser après l'ajout.
   - **Section vierge** — choisissez une disposition en colonnes (une colonne, deux colonnes, trois colonnes, etc.) et construisez à partir de zéro.
3. La nouvelle section apparaît dans l'aperçu. Cliquez dessus pour la sélectionner et configurer sa couleur d'arrière-plan, son remplissage et ses autres options de style.

### Changer la disposition d'une section

Vous avez déjà construit une section mais voulez une autre structure ? Utilisez le sélecteur de disposition de cette section pour remplacer sa répartition en colonnes par une autre tirée de la galerie, tout en conservant votre contenu et vos éléments en place.

### Ajouter des éléments à une section

1. Cliquez à l'intérieur d'une section dans l'aperçu pour la sélectionner.
2. Cliquez sur **Ajouter du contenu** et choisissez un type d'élément dans la liste :
   - **Texte** -- Titres, paragraphes et texte enrichi
   - **Image** -- Téléverser une photo ou la lier
   - **Bouton** -- Un lien d'appel à l'action cliquable
   - **Carte** -- Une image avec un titre et une description
   - **Formulaire** -- Intégrer un [formulaire](../forms/creating-forms) directement sur la page. Si le formulaire a une [photo d'en-tête](../forms/creating-forms.md#adding-a-header-photo), elle s'affiche au-dessus des questions
   - **Calendrier** -- Afficher un calendrier d'événements
   - **FAQ** -- Blocs de questions et réponses en accordéon
   - **Vidéo** -- Intégrer une vidéo par URL
   - **Répertoire des groupes** -- Un répertoire filtrable de tous les groupes de l'église, avec recherche facultative, filtre par catégorie et filtre par étiquette
   - **Fonctionnalité avec icône** -- Une icône avec un titre et une courte description, pour mettre en valeur une fonctionnalité ou un ministère
   - **Galerie** -- Une grille de plusieurs photos ou une disposition en mosaïque
   - **Témoignage** -- Une ou plusieurs citations avec le nom de l'auteur, son rôle et sa photo
   - **Icônes de réseaux sociaux** -- Icônes liées aux profils de médias sociaux de votre église : Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo et Balado. Saisissez un lien pour chacun que vous voulez afficher ; pour **WhatsApp**, utilisez un lien `https://wa.me/` avec votre numéro ou un lien d'invitation à un groupe
   - **Compte à rebours** -- Une minuterie qui compte jusqu'à une date ou un horaire de service hebdomadaire
   - **Statistiques** -- Une rangée de grands chiffres avec étiquettes (membres, années, campus)
   - **Progression de campagne** -- Une barre de progression en direct pour une campagne de dons, indiquant le total recueilli vers l'objectif d'un fonds
   - **Grille du personnel** -- Cartes avec photos des membres d'un groupe ; le groupe doit avoir l'option **liste publique** activée
   - **Horaires de service** -- L'horaire des services de vos campus, extrait automatiquement de la configuration des présences
   - **Sermons** -- Votre bibliothèque de sermons, sous forme de navigateur complet, de grille, de liste ou de mise en avant du plus récent
   - **Carte** -- Une carte intégrée centrée sur l'adresse de votre église
   - **Tableau** -- Une simple grille de lignes et de colonnes pour du contenu tabulaire
   - **Texte avec photo** -- Du texte et une image côte à côte
   - **Logo** -- Le logo de votre église, extrait d'[Apparence](appearance)
   - **Diffusion en direct** -- Votre lecteur de diffusion en direct, intégré directement sur la page
   - **Balado** -- Une liste d'épisodes extraite d'une URL de flux RSS de balado externe que vous fournissez, avec des paramètres pour le nombre d'épisodes à afficher et pour afficher ou non les dates et les descriptions. Chaque épisode sur le site en ligne comporte un lecteur audio et un lien **Télécharger** qui enregistre le fichier audio de l'épisode sous le titre de l'épisode. Cet élément sert à mettre en valeur n'importe quel flux de balado sur votre site ; pour publier vos propres sermons sous forme de balado, consultez plutôt [Gérer les sermons](../sermons/managing-sermons.md#your-podcast-feed)
   - **Don** -- Un bouton de dons ou un formulaire de dons intégré
   - **HTML** -- Votre propre HTML brut, pour des usages avancés comme l'intégration d'un widget tiers (voir [Utiliser l'élément HTML](#using-the-html-element))
   - **iFrame** -- Intégrer un contenu externe par URL
3. Configurez l'élément à l'aide du panneau de paramètres qui apparaît.

### Utiliser l'élément HTML {#using-the-html-element}

L'élément **HTML** comporte deux zones :

- **Contenu HTML** -- Le balisage à afficher sur la page. Toute balise `<script>` que vous y incluez s'exécute sur votre site en ligne.
- **JavaScript (sans la balise script)** -- Le code de script qui s'exécute au chargement de la page. Vous pouvez aussi coller ici l'extrait d'intégration d'un fournisseur avec ses balises `<script>`, et il s'exécutera sur le site en ligne.

Si vous collez seulement une adresse web (comme un lien d'image) dans la zone JavaScript, la zone devient rouge avec l'avertissement *« Ceci est une adresse web, pas du JavaScript. »* Une adresse seule dans cette zone ne fait rien. Pour afficher une image, utilisez un élément **Image** ou placez `<img src="...">` dans **Contenu HTML**.

### Utiliser l'élément Calendrier {#using-the-calendar-element}

L'élément **Calendrier** affiche les événements de l'un de vos calendriers :

1. Sous **Sélectionner**, choisissez **Calendrier de groupe** (les événements d'un seul groupe -- la liste affiche les groupes dont vous faites partie) ou **Calendrier organisé** (un calendrier que vous avez créé sous **Calendriers** ; voir [Calendrier organisé](../calendars/curated-calendar)).
2. Sous **Sélectionner un calendrier**, choisissez le groupe ou le calendrier.
3. Sous **Affichage**, choisissez le mode d'affichage :
   - **Calendrier mensuel** -- Une grille mensuelle que les visiteurs peuvent parcourir.
   - **Événements à venir** -- Une grille de vignettes pour les 12 prochains événements, un événement récurrent n'étant affiché qu'une fois, à sa prochaine date. Chaque vignette affiche la photo de l'événement (ou son titre sur la couleur sombre de votre thème lorsqu'il n'a pas de photo), une pastille de date, le jour et l'heure, et la première ligne de sa description. Un bouton **S'abonner** au-dessus des vignettes permet aux visiteurs de copier le lien ICS du calendrier ou de le télécharger. Un réglage **Mise en page** apparaît pour cet affichage : **Grille** (par défaut) ou **Défilement (automatique)**, qui place les vignettes sur une seule rangée qui défile seule.
4. Pour n'afficher que certains événements, saisissez une étiquette dans **Seulement les événements avec l'étiquette** -- par exemple `jeunes`. Seuls les événements dont les **étiquettes** contiennent ce mot apparaissent. Laissez le champ vide pour afficher tous les événements. Les étiquettes se définissent sur chaque événement ; voir [Ajouter et modifier des événements](../calendars/creating-calendars.md#adding-and-editing-events).

Dans les deux affichages, cliquer sur un événement ouvre sa propre page sur votre site web. La page de l'événement affiche la photo, le titre, la date et l'heure, et la description de l'événement, ainsi qu'une case avec **Quand** (y compris le schéma de répétition pour un événement récurrent) et **Où** (les salles réservées pour l'événement). Elle comporte aussi un bouton **S'inscrire à cet événement** lorsque l'inscription est activée, et un lien **Ajouter à mon calendrier** qui télécharge l'événement sous forme de fichier de calendrier. La page est conçue pour que les moteurs de recherche puissent afficher la date et les détails de l'événement dans leurs résultats. Les pages d'événements des calendriers organisés affichés sur vos pages (pour les événements des six prochains mois) figurent aussi dans le plan du site de votre site web, afin que les moteurs de recherche puissent les trouver.

### Réorganiser le contenu

Faites glisser les sections ou les éléments à l'aide de l'icône de poignée (six points) à gauche de chaque élément pour les réordonner. Vous pouvez faire glisser des éléments à l'intérieur d'une section ou les déplacer d'une section à l'autre.

## Styliser votre page

### Styles de section

Cliquez sur une section pour ouvrir son panneau de style. Vous pouvez définir :

- **Arrière-plan** -- Couleur unie, dégradé ou image. Lorsque vous utilisez une image d'arrière-plan, un sélecteur de **point focal** vous permet de cliquer pour définir la partie de l'image qui reste centrée lorsque la section se redimensionne, et une option de couleur de **superposition** vous permet d'ajouter une teinte semi-transparente sur l'image pour améliorer la lisibilité du texte
- **Remplissage** -- Espacement haut et bas à l'intérieur de la section
- **Largeur** -- Pleine largeur ou centrée/contenue
- **Séparateurs** -- Séparateurs décoratifs en forme (vague, oblique, courbe, triangle et plus) sur le bord supérieur ou inférieur de la section, avec des options de couleur, de hauteur et d'inversion

### Styles des éléments

Cliquez sur un élément pour ouvrir son panneau de style. Les options courantes comprennent la taille de police, la couleur, l'alignement, la marge et le remplissage. Pour les images, vous pouvez définir le texte alternatif et les cibles de lien.

### CSS personnalisé

Pour un style avancé, chaque section et chaque élément dispose d'un champ **CSS personnalisé** dans lequel vous pouvez écrire vos propres règles CSS. Elles sont limitées à cet élément et n'affectent donc pas involontairement le reste de la page.

:::tip
Si vous devez appliquer des styles à l'ensemble de votre site -- comme une police personnalisée ou une couleur globale -- utilisez plutôt les paramètres d'[Apparence](appearance) au lieu du CSS personnalisé sur des pages individuelles.
:::

## Prévisualiser votre page

Utilisez les commandes d'aperçu de la barre d'outils pour vérifier l'apparence de votre page selon différentes tailles d'écran :

- **Ordinateur** -- Vue du navigateur en pleine largeur
- **Mobile** -- Vue étroite de la taille d'un téléphone

Sur les téléphones, les colonnes d'une rangée s'empilent les unes sur les autres en pleine largeur, à moins que vous n'ayez défini une **largeur mobile** pour elles dans les paramètres de la rangée. Les listes de sermons et de balados empilent aussi le texte de chaque épisode sous sa vignette sur les téléphones.

Pour voir la page en ligne exactement comme les visiteurs, revenez à la liste des pages et cliquez sur le chemin de la page. Elle s'ouvre dans un nouvel onglet du navigateur.

## Vérifier l'accessibilité

Cliquez sur l'icône **Accessibilité** dans la barre d'outils pour lancer une vérification rapide des problèmes courants -- images sans texte alternatif, contraste de couleurs faible ou titres dans le désordre. Chaque problème renvoie directement à l'élément concerné afin que vous puissiez le corriger sur place.

## Annuler des modifications

L'éditeur conserve automatiquement l'historique de vos modifications. Utilisez les boutons de la barre d'outils ou les raccourcis clavier pour naviguer :

- **Annuler** (Ctrl+Z / Cmd+Z) -- Rétablir votre dernière action
- **Rétablir** (Ctrl+Maj+Z ou Ctrl+Y / Cmd+Maj+Z) -- Réappliquer une action annulée

Vous pouvez aussi restaurer la page à un instantané antérieur. Cliquez sur **Afficher l'historique** dans la barre d'outils pour voir la liste des instantanés enregistrés avec leur description, puis cliquez sur une entrée pour revenir à ce point.

:::warning
La restauration d'un instantané remplace le contenu actuel de votre page par la version de l'instantané. Cette action ne peut pas être annulée avec le bouton Annuler standard. Enregistrez un instantané de votre état actuel avant de restaurer un ancien si vous voulez pouvoir revenir en arrière.
:::

## Enregistrer et publier

Les modifications sont enregistrées automatiquement pendant votre travail. Un indicateur d'état dans la barre d'outils indique si vos modifications ont été enregistrées.

### État brouillon et publié

Les pages peuvent avoir un état **publié**, qui contrôle le moment où les visiteurs voient vos modifications. La barre d'outils affiche une pastille d'état indiquant l'état actuel :

- **En ligne dès l'enregistrement** -- La page n'utilise pas de flux de publication. Chaque modification enregistrée est mise en ligne immédiatement. C'est la valeur par défaut des nouvelles pages.
- **Modifications non publiées** -- La page a déjà été publiée, mais vous avez apporté des modifications depuis la dernière publication. Les visiteurs voient toujours la version publiée précédemment.
- **Publiée** -- La page est en ligne et votre contenu enregistré correspond à ce que voient les visiteurs.

Pour publier vos modifications, cliquez sur le bouton **Publier** dans la barre d'outils. La page est mise en ligne immédiatement.

Pour revenir à la dernière version publiée sans affecter ce que voient les visiteurs, ouvrez le menu de débordement (⋮) et cliquez sur **Abandonner les modifications non publiées**.

Pour cesser d'utiliser le flux de publication, ouvrez le menu de débordement et cliquez sur **Désactiver la publication**. Les modifications sont alors à nouveau mises en ligne immédiatement.

:::tip
Utilisez le flux brouillon/publication lorsque vous voulez préparer une page -- par exemple pour un événement à venir -- et ne la rendre publique qu'au moment voulu. Construisez et prévisualisez la page, puis cliquez sur Publier lorsque vous êtes prêt.
:::

## Articles connexes

- [Gérer les pages](managing-pages) -- Créer des pages, définir les URL et gérer la navigation du site
- [Apparence](appearance) -- Définir les couleurs, les polices et l'image de marque à l'échelle du site
- [Fichiers](files) -- Téléverser des images et des documents à utiliser dans l'éditeur
- [Créer des formulaires](../forms/creating-forms) -- Créer des formulaires que vous pouvez intégrer aux pages
