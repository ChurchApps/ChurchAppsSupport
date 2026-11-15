---
title: "Utiliser l'éditeur de pages"
description: "Construisez les pages du site web dans l'éditeur de pages de B1 Admin : ajoutez des sections et des éléments, mettez-les en forme, prévisualisez sur mobile, publiez des brouillons et utilisez l'annulation et l'historique des modifications."
---

# Utiliser l'éditeur de pages

<div class="article-intro">

L'éditeur de pages B1 est un créateur visuel glisser-déposer qui vous permet de concevoir les pages de votre site web d'église sans écrire aucun code. Vous pouvez ajouter des sections et des blocs de contenu, personnaliser les styles, prévisualiser votre travail et annuler des modifications -- le tout depuis votre navigateur.

</div>

## Vidéo de formation {#training-video}

<YouTube id="m2B_JxmfFm4" title="Modifier les pages et la navigation dans B1" next="Connecter un domaine personnalisé dans B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Terminez la [configuration initiale](./initial-setup.md) pour configurer votre site web
- Créez au moins une page dans [Gérer les pages](./managing-pages.md)
- Vous avez besoin de l'autorisation **content.edit** pour accéder à l'éditeur

</div>

## Ouvrir l'éditeur {#opening-the-editor}

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Site web**, puis cliquez sur **Pages**.
2. Repérez la page à modifier dans le tableau des pages et cliquez sur **Modifier le contenu**.

L'éditeur s'ouvre en mode plein écran avec un aperçu en direct de votre page. La barre d'outils en haut comporte **Quitter**, l'état de publication de la page, **Annuler** et **Rétablir**, l'état de l'enregistrement, **Publier**, les boutons d'aperçu bureau et mobile, **Ajouter du contenu**, la vérification d'accessibilité, et un menu **Plus** (⋮). Cliquez sur **Ajouter du contenu** pour ouvrir le panneau **Ajouter des éléments** à gauche ; cliquez sur une section ou un élément pour ouvrir ses paramètres à droite.

L'éditeur nécessite un écran d'au moins environ 880 pixels de large. Sur un téléphone, un message vous invite à ouvrir la page sur une tablette ou un ordinateur.

:::info
L'éditeur s'affiche toujours en mode clair, quel que soit le réglage de thème de B1 Admin, et utilise les polices de titres et de texte que vous avez choisies dans [Apparence](./appearance.md). Cela garantit que l'aperçu correspond fidèlement à l'apparence de votre page pour les visiteurs du site.
:::

## Structure des pages : sections et éléments {#page-structure-sections-and-elements}

Chaque page est construite à partir de deux niveaux :

- **Sections** -- Les conteneurs de premier niveau qui divisent votre page en bandes horizontales (par exemple, une section d'accroche, un bloc de contenu ou une bande de pied de page). Chaque page doit avoir au moins une section avant que vous puissiez y ajouter du contenu.
- **Éléments** -- Les éléments de contenu individuels placés dans une section, comme du texte, des images, des boutons, des cartes, des formulaires et des calendriers.

### Ajouter une section {#adding-a-section}

1. Cliquez sur **Ajouter du contenu** et glissez **Section** sur la page. Vous pouvez aussi survoler l'espace entre deux sections et cliquer sur le bouton **+** (**Ajouter une section**) qui apparaît.
2. Dans la boîte de dialogue **Choisir une disposition de section**, choisissez comment commencer :
   - **À partir d'un modèle** — parcourez les modèles de section par catégorie (Accroche, À propos, Services, Personnes, Médias, Dons et Appel à l'action) et cliquez sur l'un d'eux pour l'insérer sous forme de section entièrement stylisée et préremplie. Vous pouvez tout personnaliser après l'ajout.
   - **Section vierge** — une section vide à construire de zéro. Pour la diviser en colonnes, ajoutez un élément **Rangée** à l'intérieur.
3. La nouvelle section apparaît dans l'aperçu. Cliquez dessus pour la sélectionner et configurer son arrière-plan, ses couleurs et ses autres options de style.

Survoler une section affiche sa barre d'outils : poignée de déplacement, **Paramètres de la section**, **Monter la section**, **Descendre la section**, **Dupliquer la section**, **Essayer une autre disposition** et **Supprimer la section**.

### Changer la disposition d'une section {#switching-a-sections-layout}

Vous avez déjà construit une section mais vous voulez une autre structure ? Cliquez sur **Essayer une autre disposition** dans la barre d'outils de la section pour remplacer son agencement par une autre disposition de la galerie, tout en conservant votre contenu et vos éléments existants à leur place.

### Ajouter des éléments à une section {#adding-elements-to-a-section}

1. Cliquez sur **Ajouter du contenu** pour ouvrir le panneau **Ajouter des éléments**. Utilisez **Rechercher des éléments** ou les onglets (**Tous**, **Courants**, **Médias**, **Église**, **Avancé**, et **Blocs** dès que vous avez des [blocs réutilisables](./blocks.md)) pour trouver un élément.
2. Glissez l'élément dans une section de l'aperçu, ou sélectionnez un élément sur la page puis cliquez sur une carte pour ajouter le nouvel élément juste après lui. Les éléments sont :
   - **Rangée** -- Divise une section en colonnes côte à côte
   - **Boîte** -- Regroupe des éléments dans un conteneur stylisé
   - **Carrousel** -- Fait défiler une série de diapositives pleine largeur
   - **Espace blanc** -- Ajoute un espace vertical vide
   - **Texte** -- Titres, paragraphes et texte enrichi
   - **Image** -- Téléverser une photo ou la lier
   - **Bouton lien** -- Un bouton cliquable d'appel à l'action
   - **Carte** -- Une image avec un titre et une description
   - **Formulaire** -- Intégrer un [formulaire](../forms/creating-forms.md) directement sur la page. Si le formulaire a une [photo d'en-tête](../forms/creating-forms.md#adding-a-header-photo), elle s'affiche au-dessus des questions
   - **Calendrier** -- Afficher un calendrier d'événements
   - **Dépliant** -- Blocs de questions et réponses de type accordéon
   - **Vidéo** -- Intégrer une vidéo par URL
   - **Répertoire des groupes** -- Un répertoire filtrable de tous les groupes de l'église, avec recherche facultative, filtre par catégorie et filtre par étiquette. Sa **disposition** peut être **Grille** (par défaut) ou **Défilement (automatique)** -- voir [Dispositions défilantes](#scrolling-layouts)
   - **Liste des groupes** -- Tuiles pour vos groupes publics, éventuellement seulement les groupes portant une étiquette donnée. Sa **disposition** peut être **Grille** (par défaut ; jusqu'à trois tuiles par rangée) ou **Défilement (automatique)** -- voir [Dispositions défilantes](#scrolling-layouts)
   - **Élément d'icône** -- Une icône avec un titre et une courte description, pour mettre en valeur un service ou un ministère
   - **Galerie** -- Une grille de plusieurs photos ou une disposition en mosaïque
   - **Témoignage** -- Une ou plusieurs citations avec le nom de l'auteur, son rôle et sa photo
   - **Icônes de réseaux sociaux** -- Icônes liées aux profils de médias sociaux de votre église : Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo et Balado. Renseignez un lien pour chacune que vous voulez afficher ; pour **WhatsApp**, utilisez un lien `https://wa.me/` avec votre numéro ou un lien d'invitation à un groupe
   - **Compte à rebours** -- Un minuteur qui décompte jusqu'à une date ou un horaire de service hebdomadaire
   - **Statistiques** -- Une rangée de grands chiffres avec des étiquettes (membres, années, campus)
   - **Progression de campagne** -- Une barre de progression en direct pour une campagne de dons, montrant le total recueilli vers l'objectif d'un fonds
   - **Grille du personnel** -- Cartes avec photos pour les membres d'un groupe ; le groupe doit avoir son option de **liste publique** activée
   - **Horaires de service** -- L'horaire des services de vos campus, tiré automatiquement de la configuration des présences
   - **Prédications** -- Votre bibliothèque de prédications, sous forme de navigateur complet, de grille, de liste ou de disposition mise en avant pour la plus récente
   - **Emplacement** -- Une carte intégrée centrée sur l'adresse de votre église
   - **Tableau** -- Une simple grille de lignes et de colonnes pour du contenu tabulaire
   - **Texte avec photo** -- Texte et image côte à côte
   - **Logo** -- Le logo de votre église, tiré de [Apparence](./appearance.md)
   - **Diffusion** -- Votre lecteur de diffusion en direct, intégré directement sur la page
   - **Balado** -- Une liste d'épisodes tirée d'une URL de flux RSS de balado externe que vous fournissez, avec des paramètres pour le nombre d'épisodes à afficher et pour afficher ou non les dates et les descriptions. Chaque épisode sur le site en ligne dispose d'un lecteur audio et d'un lien **Télécharger** qui enregistre le fichier audio de l'épisode sous le titre de l'épisode. Cet élément sert à mettre en avant n'importe quel flux de balado sur votre site ; pour publier vos propres prédications sous forme de balado, voir plutôt [Gérer les prédications](../sermons/managing-sermons.md#your-podcast-feed)
   - **Don** -- Un formulaire de don complet intégré à la page
   - **Lien de don** -- Un bouton qui ouvre votre page de dons
   - **HTML** -- Votre propre HTML brut, pour des usages avancés comme l'intégration d'un widget tiers (voir [Utiliser l'élément HTML](#using-the-html-element))
   - **Page intégrée** -- Intégrer une autre page web par URL dans un cadre
3. Configurez l'élément à l'aide du panneau de paramètres qui apparaît.

### Utiliser l'élément HTML {#using-the-html-element}

L'élément **HTML** comporte deux zones :

- **Contenu HTML** -- Le balisage à afficher sur la page. Toute balise `<script>` que vous y incluez s'exécute sur votre site en ligne.
- **JavaScript (sans la balise script)** -- Du code de script qui s'exécute au chargement de la page. Vous pouvez aussi y coller l'extrait d'intégration d'un fournisseur avec ses balises `<script>`, et il s'exécutera sur le site en ligne.

Si vous collez seulement une adresse web (par exemple, un lien vers une image) dans la zone JavaScript, la zone devient rouge avec l'avertissement *« Ceci est une adresse web, pas du JavaScript. »* Une adresse seule dans cette zone ne fait rien. Pour afficher une image, utilisez un élément **Image** ou placez `<img src="...">` dans **Contenu HTML**.

### Utiliser l'élément Calendrier {#using-the-calendar-element}

L'élément **Calendrier** affiche les événements de l'un de vos calendriers :

1. Sous **Sélectionner**, choisissez **Calendrier de groupe** (les événements d'un seul groupe -- la liste affiche les groupes dont vous êtes membre) ou **Calendrier organisé** (un calendrier que vous avez construit sous **Calendriers** ; voir [Calendrier organisé](../calendars/curated-calendar.md)).
2. Sous **Sélectionner le calendrier**, choisissez le groupe ou le calendrier.
3. Sous **Affichage**, choisissez le mode d'affichage :
   - **Calendrier mensuel** -- Une grille mensuelle que les visiteurs peuvent parcourir. Chaque événement est coloré selon le groupe auquel il appartient, de sorte que les événements d'un groupe ont la même couleur sur chaque calendrier. B1 choisit les couleurs automatiquement ; il n'y a rien à configurer.
   - **Événements à venir** -- Une grille de tuiles pour les 12 prochains événements, un événement récurrent étant affiché une seule fois à sa prochaine date. Chaque tuile affiche la photo de l'événement (ou son titre sur la couleur foncée de votre thème lorsqu'il n'y a pas de photo), un badge de date, le jour et l'heure, et la première ligne de sa description. Un bouton **S'abonner** au-dessus des tuiles permet aux visiteurs de copier le lien ICS du calendrier ou de le télécharger. Un réglage **Disposition** apparaît pour cet affichage : **Grille** (par défaut) ou **Défilement (automatique)**, qui place les tuiles dans une seule rangée qui défile d'elle-même (voir [Dispositions défilantes](#scrolling-layouts)). Pour un **Calendrier organisé**, activez le réglage **Badge de groupe** pour afficher le nom du groupe de chaque événement dans le coin supérieur droit de sa tuile, dans la couleur du calendrier de ce groupe. Les événements des groupes archivés ou confidentiels ne reçoivent pas de badge.
4. Pour n'afficher que certains événements, saisissez une étiquette dans **Seulement les événements étiquetés** -- par exemple, `youth`. Seuls les événements dont les **étiquettes** comprennent ce mot apparaissent. Laissez le champ vide pour afficher tous les événements. Les étiquettes se définissent sur chaque événement ; voir [Ajouter et modifier des événements](../calendars/creating-calendars.md#adding-and-editing-events).

Dans les deux affichages, cliquer sur un événement ouvre sa propre page sur votre site web. La page de l'événement affiche la photo, le titre, la date et l'heure, ainsi que la description, ainsi qu'un encadré avec **Quand** (y compris le modèle de répétition pour un événement récurrent) et **Où** (les salles réservées pour l'événement). Elle comporte aussi un bouton **S'inscrire à cet événement** lorsque l'inscription est activée, et un lien **Ajouter à mon calendrier** qui télécharge l'événement sous forme de fichier de calendrier. La page est conçue pour que les moteurs de recherche puissent afficher la date et les détails de l'événement dans leurs résultats. Les pages d'événements provenant de calendriers organisés affichés sur vos pages (pour les événements des six prochains mois) figurent aussi dans le plan de votre site, afin que les moteurs de recherche puissent les trouver.

### Dispositions défilantes {#scrolling-layouts}

La disposition **Défilement (automatique)** du **Répertoire des groupes**, de la **Liste des groupes** et de l'affichage **Événements à venir** de l'élément Calendrier place les tuiles dans une seule rangée au lieu d'une grille. Sur un téléphone, chaque tuile occupe toute la rangée ; sur un ordinateur, deux tuiles tiennent côte à côte. Lorsqu'il y a plus de tuiles que l'espace disponible, la rangée :

- Avance d'une tuile environ toutes les quatre secondes, en revenant à la première tuile après la dernière.
- Se met en pause lorsqu'un visiteur la survole, la touche ou s'y déplace avec la touche Tab, et reprend quelques secondes plus tard.
- Affiche une rangée de points en dessous, un point par tuile, le point de la tuile courante étant plein. Les visiteurs peuvent cliquer sur un point pour aller directement à cette tuile.

Sur les appareils dont la réduction des animations est activée, la rangée reste immobile et les visiteurs la font défiler eux-mêmes en glissant ou en faisant défiler la page. Si toutes les tuiles tiennent à l'écran, la rangée ne bouge pas et aucun point n'apparaît.

### Réordonner le contenu {#reordering-content}

Glissez les sections ou les éléments à l'aide de l'icône de poignée (six points) à gauche de chaque élément pour les réordonner. Vous pouvez glisser des éléments à l'intérieur d'une section ou les déplacer d'une section à l'autre.

## Mettre en forme votre page {#styling-your-page}

### Styles de section {#section-styles}

Cliquez sur une section pour ouvrir son panneau de style. Vous pouvez définir :

- **Couleurs** -- Dans l'onglet **Suggérées**, cliquez sur l'une des combinaisons de couleurs de votre palette. Dans l'onglet **Personnalisé**, définissez le **type d'arrière-plan** (**Couleur**, **Image** ou **Vidéo YouTube**) ainsi que les couleurs des titres, du texte et des liens. Avec un arrière-plan image, cliquez sur l'image pour définir son point focal (la partie conservée visible lorsque l'image est recadrée), et utilisez **Couleur de superposition** et **Opacité de l'arrière-plan** pour teinter l'image afin que le texte reste lisible.
- **Visibilité** -- **Masquer sur ordinateur** ou **Masquer sur mobile**
- **Styles** -- Ajoutez des réglages de style individuels, comme le rembourrage supérieur et inférieur, pour tous les appareils, pour l'ordinateur seulement ou pour le mobile seulement
- **Animations** -- Un effet et une vitesse pour l'apparition de la section lorsqu'elle défile dans la vue
- **Séparateurs de forme** -- Des formes décoratives (vague, vagues, oblique, courbe, pics et triangle) sur le bord supérieur ou inférieur de la section, avec des options de couleur, de hauteur et de retournement

Les paramètres de section comportent aussi **Dupliquer** et **Convertir en bloc**, qui copie la section dans un nouveau [bloc réutilisable](./blocks.md).

### Styles d'élément {#element-styles}

Cliquez sur n'importe quel élément pour ouvrir son panneau de style. Les options courantes comprennent la taille de police, la couleur, l'alignement, la marge et le rembourrage. Pour les images, vous pouvez définir le texte alternatif et les cibles des liens.

### Styles pour une seule section ou un seul élément {#styles-for-one-section-or-element}

Pour un contrôle plus précis, ouvrez le panneau **Styles** dans les paramètres d'une section ou d'un élément et cliquez sur **Ajouter un style** sous **Tous**, **Ordinateur seulement** ou **Mobile seulement**. Chaque style ne s'applique qu'à cette section ou à cet élément, de sorte qu'il n'affecte pas le reste de la page.

:::tip
Si vous avez besoin d'appliquer des styles à l'ensemble de votre site -- comme une police personnalisée ou une couleur globale -- utilisez plutôt les réglages d'[Apparence](./appearance.md) au lieu de CSS personnalisé sur des pages individuelles.
:::

## Prévisualiser votre page {#previewing-your-page}

Utilisez les commandes d'aperçu dans la barre d'outils pour vérifier l'apparence de votre page à différentes tailles d'écran :

- **Bureau** -- Vue du navigateur pleine largeur
- **Mobile** -- Vue étroite au format d'un téléphone

Sur les téléphones, les colonnes d'une rangée s'empilent les unes sur les autres en pleine largeur, à moins que vous ne définissiez une **Largeur mobile** pour elles dans les paramètres de la rangée. Les listes de prédications et de balados empilent aussi le texte de chaque épisode sous sa vignette sur les téléphones.

Pour voir la page en ligne exactement comme les visiteurs, revenez à la liste des pages et cliquez sur le chemin de la page. Elle s'ouvre dans un nouvel onglet du navigateur.

## Vérifier l'accessibilité {#checking-accessibility}

Cliquez sur l'icône **Vérifier l'accessibilité** dans la barre d'outils (elle affiche un compte lorsque des problèmes sont détectés) pour lancer une vérification rapide des problèmes courants -- images sans texte alternatif, contraste de couleurs insuffisant ou titres dans le désordre. Chaque problème renvoie directement à l'élément à corriger, afin que vous puissiez le réparer sur place.

## Annuler des modifications {#undoing-changes}

L'éditeur conserve automatiquement l'historique de vos modifications. Utilisez les boutons de la barre d'outils ou les raccourcis clavier pour naviguer :

- **Annuler** (Ctrl+Z / Cmd+Z) -- Annule votre dernière action
- **Rétablir** (Ctrl+Maj+Z ou Ctrl+Y / Cmd+Maj+Z) -- Réapplique une action annulée

Vous pouvez aussi revenir à un point antérieur. Ouvrez le menu **Plus** (⋮) dans la barre d'outils et cliquez sur **Voir l'historique**. La boîte de dialogue **Historique des modifications** liste chaque changement avec son heure, en indiquant votre position actuelle par **(actuel)**. Cliquez sur une entrée (ou sur son bouton **Rétablir à ce point**) pour remettre la page dans l'état qu'elle avait à ce moment-là.

:::info
Les modifications apportées après le point restauré restent dans l'historique ; vous pouvez donc utiliser **Rétablir** ou choisir une entrée plus récente pour avancer à nouveau. Dès que vous faites une nouvelle modification, ces entrées ultérieures sont remplacées par elle.
:::

## Enregistrer et publier {#saving-and-publishing}

Les modifications sont enregistrées automatiquement au fur et à mesure de votre travail. Un indicateur d'état dans la barre d'outils indique si vos modifications ont été enregistrées.

### État brouillon et publié {#draft-and-published-state}

Les pages peuvent avoir un état **publié**, qui détermine le moment où les visiteurs voient vos modifications. La barre d'outils affiche une puce d'état indiquant l'état actuel :

- **En ligne dès l'enregistrement** -- La page n'utilise pas de flux de publication. Chaque modification enregistrée est immédiatement en ligne. C'est la valeur par défaut des nouvelles pages.
- **Modifications non publiées** -- La page a déjà été publiée, mais vous avez fait des modifications depuis la dernière publication. Les visiteurs voient toujours la version publiée précédemment.
- **Publiée** -- La page est en ligne et le contenu enregistré correspond à ce que voient les visiteurs.

Pour publier vos modifications, cliquez sur le bouton **Publier** dans la barre d'outils. La page est immédiatement en ligne.

Pour revenir à la dernière version publiée sans affecter ce que voient les visiteurs, ouvrez le menu de débordement (⋮) et cliquez sur **Abandonner les modifications non publiées**.

Pour cesser d'utiliser le flux de publication, ouvrez le menu de débordement et cliquez sur **Désactiver la publication**. Les modifications sont alors de nouveau mises en ligne immédiatement.

:::tip
Utilisez le flux brouillon/publication lorsque vous voulez préparer une page -- par exemple, pour un événement à venir -- et ne la mettre en ligne qu'au bon moment. Construisez et prévisualisez la page, puis cliquez sur Publier lorsque vous êtes prêt.
:::

## Articles connexes {#related-articles}

- [Gérer les pages](./managing-pages.md) -- Créer des pages, définir les URL et gérer la navigation du site
- [Apparence](./appearance.md) -- Définir les couleurs, les polices et l'image de marque à l'échelle du site
- [Fichiers](./files.md) -- Téléverser des images et des documents à utiliser dans l'éditeur
- [Créer des formulaires](../forms/creating-forms.md) -- Construire des formulaires à intégrer aux pages
