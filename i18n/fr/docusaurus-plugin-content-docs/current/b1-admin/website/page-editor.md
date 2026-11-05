---
title: "Utiliser l'éditeur de pages"
---

# Utiliser l'éditeur de pages

<div class="article-intro">

L'éditeur de pages B1 est un outil visuel de conception par glisser-déposer qui vous permet de créer les pages de votre site web d'église sans écrire de code. Vous pouvez ajouter des sections et des blocs de contenu, personnaliser les styles, prévisualiser votre travail et annuler des modifications -- le tout directement dans votre navigateur.

</div>

## Vidéo de formation

<YouTube id="m2B_JxmfFm4" title="Modifier les pages et la navigation dans B1" next="Connecter un domaine personnalisé dans B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Terminez la [configuration initiale](initial-setup) pour configurer votre site web
- Créez au moins une page dans [Gérer les pages](managing-pages)
- Vous avez besoin de l'autorisation **content.edit** pour accéder à l'éditeur

</div>

## Ouvrir l'éditeur

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Site web**, puis cliquez sur **Pages**.
2. Repérez la page à modifier dans le tableau des pages et cliquez sur **Modifier le contenu**.

L'éditeur s'ouvre en plein écran. Le panneau de gauche affiche la structure de votre page et les éléments de contenu disponibles ; la zone centrale affiche un aperçu en direct de votre page.

:::info
L'éditeur s'affiche toujours en mode clair, quel que soit le thème de B1 Admin, et utilise les polices de titre et de texte que vous avez choisies dans [Apparence](appearance). Cela garantit que l'aperçu correspond fidèlement à l'apparence de votre page pour les visiteurs du site.
:::

## Structure de la page : sections et éléments

Chaque page est construite à partir de deux niveaux :

- **Sections** -- Les conteneurs de premier niveau qui divisent votre page en bandes horizontales (par exemple, une section héros, un bloc de contenu ou une bande de pied de page). Chaque page doit avoir au moins une section avant que vous puissiez y ajouter du contenu.
- **Éléments** -- Les pièces de contenu individuelles placées à l'intérieur d'une section, comme du texte, des images, des boutons, des cartes, des formulaires et des calendriers.

### Ajouter une section

1. Cliquez sur **Ajouter une section** (ou sur le bouton **+** en haut du panneau de gauche).
2. Choisissez comment commencer :
   - **À partir d'un modèle** -- parcourez la galerie de modèles de section classés par catégorie (Héros, À propos, Services, Dons, etc.) et cliquez sur l'un d'eux pour l'insérer comme section entièrement stylisée et préremplie. Vous pouvez tout personnaliser après l'ajout.
   - **Section vierge** -- choisissez une disposition en colonnes (une colonne, deux colonnes, trois colonnes, etc.) et construisez à partir de zéro.
3. La nouvelle section apparaît dans l'aperçu. Cliquez dessus pour la sélectionner et configurer sa couleur d'arrière-plan, son rembourrage et ses autres options de style.

### Changer la disposition d'une section

Vous avez déjà construit une section, mais vous voulez une autre structure ? Utilisez le sélecteur de disposition de cette section pour remplacer son agencement en colonnes par un autre de la galerie, tout en conservant vos contenus et éléments existants.

### Ajouter des éléments à une section

1. Cliquez à l'intérieur d'une section dans l'aperçu pour la sélectionner.
2. Cliquez sur **Ajouter du contenu** et choisissez un type d'élément dans la liste :
   - **Texte** -- Titres, paragraphes et texte enrichi
   - **Image** -- Téléverser une photo ou créer un lien vers une photo
   - **Bouton** -- Un lien d'appel à l'action cliquable
   - **Carte** -- Une image avec un titre et une description
   - **Formulaire** -- Intégrer un [formulaire](../forms/creating-forms) directement sur la page. Si le formulaire a une [photo d'en-tête](../forms/creating-forms.md#adding-a-header-photo), elle s'affiche au-dessus des questions
   - **Calendrier** -- Afficher un calendrier d'événements
   - **FAQ** -- Blocs de questions et réponses en accordéon
   - **Vidéo** -- Intégrer une vidéo à partir de son URL
   - **Répertoire des groupes** -- Un répertoire filtrable de tous les groupes de l'église, avec recherche facultative, filtre par catégorie et filtre par étiquette
   - **Fonctionnalité avec icône** -- Une icône avec un titre et une courte description, pour mettre en valeur une fonctionnalité ou un ministère
   - **Galerie** -- Une grille de photos ou une disposition en maçonnerie
   - **Témoignage** -- Une ou plusieurs citations avec le nom, le rôle et la photo de l'auteur
   - **Icônes des réseaux sociaux** -- Icônes liées aux profils de médias sociaux de votre église : Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo et Balado. Saisissez un lien pour chacune que vous voulez afficher ; pour **WhatsApp**, utilisez un lien `https://wa.me/` avec votre numéro ou un lien d'invitation de groupe
   - **Compte à rebours** -- Une minuterie qui décompte jusqu'à une date ou un horaire de service hebdomadaire
   - **Statistiques** -- Une rangée de grands chiffres avec des étiquettes (membres, années, campus)
   - **Progression de campagne** -- Une barre de progression en direct pour une campagne de dons, indiquant le total recueilli vers l'objectif d'un fonds
   - **Grille du personnel** -- Cartes avec photos pour les membres d'un groupe ; le groupe doit avoir l'option **liste publique** activée
   - **Horaires des services** -- L'horaire des services de vos campus, extrait automatiquement de la configuration des présences
   - **Sermons** -- Votre bibliothèque de sermons, sous forme de navigateur complet ou de grille, de liste, ou de disposition mettant en vedette les plus récents
   - **Carte** -- Une carte intégrée centrée sur l'adresse de votre église
   - **Tableau** -- Une simple grille de lignes et de colonnes pour du contenu tabulaire
   - **Texte avec photo** -- Du texte et une image côte à côte
   - **Logo** -- Le logo de votre église, tiré d'[Apparence](appearance)
   - **Diffusion en direct** -- Le lecteur de votre diffusion en direct, intégré directement sur la page
   - **Balado** -- Une liste d'épisodes tirés d'une adresse de flux RSS de balado externe que vous fournissez, avec des paramètres pour choisir le nombre d'épisodes à afficher et s'il faut afficher les dates et les descriptions. Chaque épisode du site en ligne comporte un lecteur audio et un lien **Télécharger** qui enregistre le fichier audio de l'épisode sous le titre de l'épisode. Cet élément sert à mettre en valeur n'importe quel flux de balado sur votre site ; pour publier vos propres sermons sous forme de balado, consultez plutôt [Gérer les sermons](../sermons/managing-sermons.md#your-podcast-feed)
   - **Don** -- Un bouton de don ou un formulaire de don intégré
   - **HTML** -- Votre propre HTML brut, pour les cas d'usage avancés, comme l'intégration d'un widget tiers (voir [Utiliser l'élément HTML](#using-the-html-element))
   - **iFrame** -- Intégrer un contenu externe à partir d'une URL
3. Configurez l'élément à l'aide du panneau de paramètres qui apparaît.

### Utiliser l'élément HTML {#using-the-html-element}

L'élément **HTML** comporte deux zones :

- **Contenu HTML** -- Le balisage à afficher sur la page. Toutes les balises `<script>` que vous y incluez s'exécutent sur votre site en ligne.
- **JavaScript (sans la balise script)** -- Le code de script qui s'exécute au chargement de la page. Vous pouvez aussi coller ici le fragment d'intégration d'un fournisseur avec ses balises `<script>`, et il s'exécutera sur le site en ligne.

Si vous collez seulement une adresse web (comme un lien vers une image) dans la zone JavaScript, la zone devient rouge avec l'avertissement *« Ceci est une adresse web, et non du JavaScript. »* Une adresse seule dans cette zone ne fait rien. Pour afficher une image, utilisez un élément **Image** ou placez `<img src="...">` dans **Contenu HTML**.

### Utiliser l'élément Calendrier {#using-the-calendar-element}

L'élément **Calendrier** affiche les événements de l'un de vos calendriers :

1. Sous **Sélectionner**, choisissez **Calendrier de groupe** (les événements d'un seul groupe -- la liste affiche les groupes dont vous faites partie) ou **Calendrier organisé** (un calendrier que vous avez créé sous **Calendriers** ; voir [Calendrier organisé](../calendars/curated-calendar)).
2. Sous **Sélectionner un calendrier**, choisissez le groupe ou le calendrier.
3. Sous **Affichage**, choisissez le mode d'affichage :
   - **Calendrier mensuel** -- Une grille mensuelle que les visiteurs peuvent parcourir page par page.
   - **Événements à venir** -- Une grille de vignettes pour les 12 prochains événements, avec un événement récurrent affiché une seule fois à sa prochaine date. Chaque vignette affiche la photo de l'événement (ou son titre sur la couleur foncée de votre thème lorsqu'il n'y a pas de photo), un badge de date, le jour et l'heure, ainsi que la première ligne de sa description. Un bouton **S'abonner** au-dessus des vignettes permet aux visiteurs de copier le lien ICS du calendrier ou de le télécharger. Un paramètre **Disposition** apparaît pour cet affichage : **Grille** (par défaut) ou **Défilement (automatique)**, qui place les vignettes sur une seule rangée qui défile toute seule.
4. Pour n'afficher que certains événements, saisissez une étiquette dans **Seulement les événements avec l'étiquette** -- par exemple `jeunes`. Seuls les événements dont les **étiquettes** comprennent ce mot apparaissent. Laissez vide pour afficher tous les événements. Les étiquettes se définissent sur chaque événement ; consultez [Ajouter et modifier des événements](../calendars/creating-calendars.md#adding-and-editing-events).

Dans les deux affichages, un clic sur un événement ouvre sa propre page sur votre site web. La page de l'événement affiche la photo, le titre, la date et l'heure, ainsi que la description, plus une case avec **Quand** (y compris le modèle de répétition pour un événement récurrent) et **Où** (les salles réservées pour l'événement). Elle comporte aussi un bouton **S'inscrire à cet événement** lorsque l'inscription est activée, et un lien **Ajouter à mon calendrier** qui télécharge l'événement sous forme de fichier de calendrier. La page est conçue pour que les moteurs de recherche puissent afficher la date et les détails de l'événement dans leurs résultats. Les pages d'événements de calendriers organisés affichés sur vos pages (pour les événements des six prochains mois) figurent aussi dans le plan du site, afin que les moteurs de recherche puissent les trouver.

### Réorganiser le contenu

Glissez les sections ou les éléments à l'aide de la poignée (six points) à gauche de chaque élément pour les réordonner. Vous pouvez faire glisser des éléments à l'intérieur d'une section ou les déplacer d'une section à l'autre.

## Styliser votre page

### Styles de section

Cliquez sur n'importe quelle section pour ouvrir son panneau de style. Vous pouvez définir :

- **Arrière-plan** -- Couleur unie, dégradé ou image. Lorsque vous utilisez une image d'arrière-plan, un sélecteur de **point focal** vous permet de cliquer pour définir la partie de l'image qui reste centrée lorsque la section change de taille, et une option de couleur de **superposition** vous permet d'ajouter une teinte semi-transparente sur l'image pour améliorer la lisibilité du texte
- **Rembourrage** -- Espacement haut et bas à l'intérieur de la section
- **Largeur** -- Pleine largeur ou centrée/contenue
- **Séparateurs** -- Séparateurs décoratifs en forme (vague, oblique, courbe, triangle et plus) sur le bord supérieur ou inférieur de la section, avec des options de couleur, de hauteur et de retournement

### Styles d'élément

Cliquez sur n'importe quel élément pour ouvrir son panneau de style. Les options courantes incluent la taille de police, la couleur, l'alignement, la marge et le rembourrage. Pour les images, vous pouvez définir le texte alternatif et les cibles des liens.

### CSS personnalisé

Pour une mise en forme avancée, chaque section et chaque élément dispose d'un champ **CSS personnalisé** où vous pouvez écrire vos propres règles CSS. Celles-ci sont limitées à cet élément, de sorte qu'elles n'affectent pas involontairement le reste de la page.

:::tip
Si vous devez appliquer des styles à l'ensemble de votre site -- par exemple une police personnalisée ou une couleur globale -- utilisez plutôt les paramètres [Apparence](appearance) au lieu du CSS personnalisé sur des pages individuelles.
:::

## Prévisualiser votre page

Utilisez les commandes d'aperçu de la barre d'outils pour vérifier l'apparence de votre page selon différentes tailles d'écran :

- **Bureau** -- Affichage de navigateur pleine largeur
- **Mobile** -- Affichage étroit, à la taille d'un téléphone

Sur les téléphones, les colonnes d'une rangée s'empilent les unes au-dessus des autres, en pleine largeur, à moins que vous ne définissiez une **largeur mobile** pour elles dans les paramètres de la rangée. Les listes de sermons et de balados empilent aussi le texte de chaque épisode sous sa vignette sur les téléphones.

Pour voir la page en ligne exactement comme les visiteurs, retournez à la liste des pages et cliquez sur le chemin de la page. Elle s'ouvre dans un nouvel onglet du navigateur.

## Vérifier l'accessibilité

Cliquez sur l'icône **Accessibilité** dans la barre d'outils pour lancer une vérification rapide des problèmes courants -- images sans texte alternatif, contraste de couleurs faible ou titres dans le désordre. Chaque problème renvoie directement à l'élément à corriger, afin que vous puissiez le réparer sur place.

## Annuler des modifications

L'éditeur conserve automatiquement l'historique de vos modifications. Utilisez les boutons de la barre d'outils ou les raccourcis clavier pour naviguer :

- **Annuler** (Ctrl+Z / Cmd+Z) -- Annule votre dernière action
- **Rétablir** (Ctrl+Maj+Z ou Ctrl+Y / Cmd+Maj+Z) -- Réapplique une action annulée

Vous pouvez aussi restaurer la page à un instantané antérieur. Cliquez sur **Voir l'historique** dans la barre d'outils pour afficher la liste des instantanés enregistrés avec leurs descriptions, puis cliquez sur une entrée pour revenir à ce point.

:::warning
La restauration d'un instantané remplace le contenu actuel de votre page par la version de l'instantané. Cette action ne peut pas être annulée avec le bouton d'annulation standard. Enregistrez un instantané de votre état actuel avant de restaurer une ancienne version si vous souhaitez pouvoir revenir en arrière.
:::

## Enregistrer et publier

Les modifications sont enregistrées automatiquement au fur et à mesure que vous travaillez. Un indicateur d'état dans la barre d'outils indique si vos modifications ont été enregistrées.

### État de brouillon et de publication

Les pages peuvent avoir un état **publié**, qui contrôle le moment où les visiteurs voient vos modifications. La barre d'outils affiche une pastille d'état indiquant l'état actuel :

- **En ligne dès l'enregistrement** -- La page n'utilise pas de processus de publication. Chaque modification enregistrée est mise en ligne immédiatement. C'est la valeur par défaut pour les nouvelles pages.
- **Modifications non publiées** -- La page a déjà été publiée, mais vous avez apporté des modifications depuis la dernière publication. Les visiteurs voient toujours la version précédemment publiée.
- **Publiée** -- La page est en ligne et le contenu enregistré correspond à ce que voient les visiteurs.

Pour publier vos modifications, cliquez sur le bouton **Publier** dans la barre d'outils. La page devient en ligne immédiatement.

Pour revenir à la dernière version publiée sans modifier ce que voient les visiteurs, ouvrez le menu de débordement (⋮) et cliquez sur **Abandonner les modifications non publiées**.

Pour cesser d'utiliser le processus de publication, ouvrez le menu de débordement et cliquez sur **Désactiver la publication**. Les modifications seront alors de nouveau mises en ligne immédiatement.

:::tip
Utilisez le processus de brouillon et de publication lorsque vous voulez préparer une page -- par exemple pour un événement à venir -- et ne la rendre publique qu'au moment voulu. Construisez et prévisualisez la page, puis cliquez sur Publier lorsque vous êtes prêt.
:::

## Articles connexes

- [Gérer les pages](managing-pages) -- créer des pages, définir des URL et gérer la navigation du site
- [Apparence](appearance) -- définir les couleurs, polices et image de marque de l'ensemble du site
- [Fichiers](files) -- téléverser des images et des documents à utiliser dans l'éditeur
- [Créer des formulaires](../forms/creating-forms) -- créer des formulaires à intégrer aux pages
