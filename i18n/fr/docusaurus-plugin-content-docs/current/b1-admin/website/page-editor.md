---
title: "Utilisation de l'éditeur de pages"
description: "Configurez une page dans B1 Admin en ajoutant des sections et des éléments, en les stylisant, en prévisualisant la version mobile et en publiant les brouillons. Couvre également l'annulation et l'historique des versions."
---

# Utilisation de l'éditeur de pages

<div class="article-intro">

L'éditeur de pages B1 est un outil de création visuelle par glisser-déposer qui vous permet de concevoir les pages de votre site d'église sans écrire de code. Vous pouvez ajouter des sections et des blocs de contenu, personnaliser les styles, prévisualiser votre travail et annuler des modifications, le tout depuis votre navigateur.

</div>

## Vidéo de formation

<YouTube id="m2B_JxmfFm4" title="Modifier les pages et la navigation dans B1" next="Connecter un domaine personnalisé dans B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Suivez la [configuration initiale](./initial-setup.md) pour configurer votre site web
- Créez au moins une page dans [Gestion des pages](./managing-pages.md)
- Vous devez disposer de l'autorisation **content.edit** pour accéder à l'éditeur

</div>

## Ouvrir l'éditeur

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Site web**, puis cliquez sur **Pages**.
2. Repérez la page que vous souhaitez modifier dans le tableau des pages, puis cliquez sur **Modifier le contenu**.

L'éditeur s'ouvre en plein écran. Le panneau de gauche affiche la structure de votre page ainsi que les éléments de contenu disponibles ; la zone centrale présente un aperçu en temps réel de votre page.

:::info
L'éditeur s'affiche toujours en mode clair, quel que soit le thème choisi dans B1 Admin, et utilise les polices de titre et de texte que vous avez sélectionnées dans [Apparence](./appearance.md). Cela garantit que l'aperçu correspond fidèlement à la manière dont votre page apparaîtra aux visiteurs du site.
:::

## Structure de la page : sections et éléments

Chaque page est construite à partir de deux niveaux :

- **Sections** -- Les conteneurs de premier niveau qui divisent votre page en bandes horizontales (par exemple, une section d'accueil, un bloc de contenu ou une bande de pied de page). Chaque page doit comporter au moins une section avant que vous puissiez y ajouter du contenu.
- **Éléments** -- Les contenus individuels placés à l'intérieur d'une section, tels que du texte, des images, des boutons, des cartes, des formulaires et des calendriers.

### Ajouter une section

1. Cliquez sur **Ajouter une section** (ou sur le bouton **+** en haut du panneau de gauche).
2. Choisissez comment commencer :
   - **À partir d'un modèle** — parcourez la galerie de modèles de sections classés par catégorie (Accueil, À propos, Services, Dons, etc.) et cliquez sur l'un d'eux pour l'insérer sous forme de section entièrement stylisée et préremplie. Vous pouvez tout personnaliser après l'ajout.
   - **Section vierge** — choisissez une disposition en colonnes (une colonne, deux colonnes, trois colonnes, etc.) et construisez la section de zéro.
3. La nouvelle section apparaît dans l'aperçu. Cliquez dessus pour la sélectionner et configurer sa couleur d'arrière-plan, son rembourrage et ses autres options de style.

### Changer la disposition d'une section

Vous avez déjà construit une section, mais souhaitez une autre structure ? Utilisez le sélecteur de disposition de cette section pour remplacer sa répartition en colonnes par une autre tirée de la galerie, tout en conservant vos contenus et éléments existants.

### Ajouter des éléments à une section

1. Cliquez à l'intérieur d'une section dans l'aperçu pour la sélectionner.
2. Cliquez sur **Ajouter du contenu** et choisissez un type d'élément dans la liste :
   - **Texte** -- Titres, paragraphes et texte enrichi
   - **Image** -- Importez ou liez une photo
   - **Bouton** -- Un lien cliquable d'appel à l'action
   - **Carte** -- Une image accompagnée d'un titre et d'une description
   - **Formulaire** -- Intégrez un [formulaire](../forms/creating-forms.md) directement sur la page. Si le formulaire possède une [photo d'en-tête](../forms/creating-forms.md#adding-a-header-photo), elle s'affiche au-dessus des questions
   - **Calendrier** -- Affiche un calendrier d'événements
   - **FAQ** -- Blocs de questions et réponses de type accordéon
   - **Vidéo** -- Intègre une vidéo à partir d'une URL
   - **Explorateur de groupes** -- Un répertoire filtrable de tous les groupes de l'église, avec recherche facultative, filtre par catégorie et filtre par étiquette. Sa **Disposition** peut être **Grille** (par défaut) ou **Défilement (automatique)** -- voir [Dispositions à défilement](#scrolling-layouts)
   - **Liste de groupes** -- Vignettes de vos groupes publics, éventuellement limitées aux groupes portant une étiquette donnée. Sa **Disposition** peut être **Grille** (par défaut ; jusqu'à trois vignettes par ligne) ou **Défilement (automatique)** -- voir [Dispositions à défilement](#scrolling-layouts)
   - **Élément d'icône** -- Une icône accompagnée d'un titre et d'une courte description, pour mettre en valeur un service ou un ministère
   - **Galerie** -- Une grille de plusieurs photos ou une disposition en mosaïque
   - **Témoignage** -- Une ou plusieurs citations avec le nom de l'auteur, sa fonction et sa photo
   - **Icônes de réseaux sociaux** -- Icônes liées aux profils de réseaux sociaux de votre église : Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo et Podcast. Renseignez un lien pour chacune que vous souhaitez afficher ; pour **WhatsApp**, utilisez un lien `https://wa.me/` avec votre numéro ou un lien d'invitation à un groupe
   - **Compte à rebours** -- Un minuteur qui décompte jusqu'à une date ou jusqu'à l'heure d'un culte hebdomadaire
   - **Statistiques** -- Une rangée de grands chiffres accompagnés d'étiquettes (membres, années, campus)
   - **Progression de campagne** -- Une barre de progression en direct pour une campagne de dons, indiquant le montant total collecté par rapport à l'objectif d'un fonds
   - **Grille de l'équipe** -- Cartes avec photo pour les membres d'un groupe ; le groupe doit avoir activé l'option **liste publique**
   - **Horaires des cultes** -- Le programme des cultes de vos campus, extrait automatiquement de la configuration des présences
   - **Prédications** -- Votre bibliothèque de prédications, sous forme de navigateur complet ou de disposition en grille, en liste ou en mise en avant de la dernière prédication
   - **Carte** -- Une carte intégrée centrée sur l'adresse de votre église
   - **Tableau** -- Une grille simple de lignes et de colonnes pour du contenu tabulaire
   - **Texte avec photo** -- Du texte et une image côte à côte
   - **Logo** -- Le logo de votre église, extrait de [Apparence](./appearance.md)
   - **Diffusion en direct** -- Le lecteur de votre diffusion en direct, intégré directement à la page
   - **Podcast** -- Une liste d'épisodes extraite d'un flux RSS de podcast externe dont vous fournissez l'URL, avec des réglages pour le nombre d'épisodes à afficher et pour l'affichage ou non des dates et des descriptions. Sur le site en ligne, chaque épisode dispose d'un lecteur audio et d'un lien **Télécharger** qui enregistre le fichier audio de l'épisode sous le titre de celui-ci. Cet élément sert à mettre en avant n'importe quel flux de podcast sur votre site ; pour publier vos propres prédications sous forme de podcast, consultez plutôt [Gestion des prédications](../sermons/managing-sermons.md#your-podcast-feed)
   - **Don** -- Un bouton de don ou un formulaire de don intégré
   - **HTML** -- Votre propre code HTML brut, pour des cas d'usage avancés, comme l'intégration d'un widget tiers (voir [Utiliser l'élément HTML](#using-the-html-element))
   - **iFrame** -- Intègre un contenu externe à partir d'une URL
3. Configurez l'élément à l'aide du panneau de réglages qui apparaît.

### Utiliser l'élément HTML

L'élément **HTML** comporte deux zones :

- **Contenu HTML** -- Le balisage à afficher sur la page. Toutes les balises `<script>` que vous y incluez s'exécutent sur votre site en ligne.
- **JavaScript (sans la balise script)** -- Code de script exécuté au chargement de la page. Vous pouvez également coller ici le code d'intégration d'un fournisseur avec ses balises `<script>`, et il s'exécutera sur le site en ligne.

Si vous collez uniquement une adresse web (comme un lien vers une image) dans la zone JavaScript, celle-ci devient rouge avec l'avertissement *« Il s'agit d'une adresse web, pas de JavaScript. »* Une adresse seule dans cette zone ne fait rien. Pour afficher une image, utilisez un élément **Image** ou placez `<img src="...">` dans **Contenu HTML**.

### Utiliser l'élément Calendrier {#using-the-calendar-element}

L'élément **Calendrier** affiche les événements de l'un de vos calendriers :

1. Sous **Sélection**, choisissez **Calendrier de groupe** (les événements d'un seul groupe -- la liste affiche les groupes dont vous êtes membre) ou **Calendrier personnalisé** (un calendrier que vous avez créé sous **Calendriers** ; voir [Calendrier personnalisé](../calendars/curated-calendar.md)).
2. Sous **Sélectionner le calendrier**, choisissez le groupe ou le calendrier.
3. Sous **Affichage**, choisissez le mode d'affichage :
   - **Calendrier mensuel** -- Une grille mensuelle que les visiteurs peuvent faire défiler. Chaque événement est coloré selon le groupe auquel il appartient, de sorte que les événements d'un groupe ont la même couleur sur tous les calendriers. B1 choisit les couleurs automatiquement ; il n'y a rien à configurer.
   - **Événements à venir** -- Une grille de vignettes pour les 12 prochains événements, un événement récurrent n'étant affiché qu'une seule fois, à sa prochaine date. Chaque vignette affiche la photo de l'événement (ou son titre sur la couleur sombre de votre thème lorsqu'il n'a pas de photo), un badge de date, le jour et l'heure, ainsi que la première ligne de sa description. Un bouton **S'abonner** au-dessus des vignettes permet aux visiteurs de copier le lien ICS du calendrier ou de le télécharger. Un réglage **Disposition** apparaît pour cet affichage : **Grille** (par défaut) ou **Défilement (automatique)**, qui place les vignettes sur une seule ligne défilant d'elle-même (voir [Dispositions à défilement](#scrolling-layouts)). Pour un **Calendrier personnalisé**, activez le réglage **Badge de groupe** pour afficher le nom du groupe de chaque événement dans le coin supérieur droit de sa vignette, dans la couleur du calendrier de ce groupe. Les événements des groupes archivés ou confidentiels ne reçoivent pas de badge.
4. Pour n'afficher que certains événements, saisissez une étiquette dans **Uniquement les événements étiquetés** -- par exemple, `jeunes`. Seuls les événements dont les **Étiquettes** contiennent ce mot apparaissent. Laissez ce champ vide pour afficher tous les événements. Les étiquettes se définissent pour chaque événement ; voir [Ajouter et modifier des événements](../calendars/creating-calendars.md#adding-and-editing-events).

Dans les deux modes d'affichage, un clic sur un événement ouvre sa propre page sur votre site web. La page de l'événement affiche la photo, le titre, la date et l'heure, ainsi que la description, plus un encadré avec **Quand** (y compris le modèle de répétition pour un événement récurrent) et **Où** (les salles réservées pour l'événement). Elle comporte également un bouton **S'inscrire à cet événement** lorsque les inscriptions sont activées, ainsi qu'un lien **Ajouter à mon agenda** qui télécharge l'événement sous forme de fichier de calendrier. La page est conçue pour que les moteurs de recherche puissent afficher la date et les détails de l'événement dans leurs résultats. Les pages d'événements provenant de calendriers personnalisés affichés sur vos pages (pour les événements des six prochains mois) figurent également dans le plan du site, afin que les moteurs de recherche puissent les trouver.

### Dispositions à défilement {#scrolling-layouts}

La disposition **Défilement (automatique)** de l'**Explorateur de groupes**, de la **Liste de groupes** et de l'affichage **Événements à venir** de l'élément Calendrier place les vignettes sur une seule ligne au lieu d'une grille. Sur un téléphone, chaque vignette occupe toute la largeur de la ligne ; sur un ordinateur, deux vignettes tiennent côte à côte. Lorsqu'il y a plus de vignettes que la ligne ne peut en contenir, celle-ci :

- Avance d'une vignette environ toutes les quatre secondes, et revient à la première vignette après la dernière.
- S'interrompt lorsqu'un visiteur survole, touche ou sélectionne la ligne au clavier, puis reprend quelques secondes plus tard.
- Affiche une rangée de points en dessous, un par vignette, le point de la vignette en cours étant plein. Les visiteurs peuvent cliquer sur un point pour passer directement à la vignette correspondante.

Sur les appareils configurés pour réduire les animations, la ligne reste immobile et les visiteurs la font défiler eux-mêmes en balayant ou en faisant défiler la page. Si toutes les vignettes tiennent dans la ligne, celle-ci ne bouge pas et aucun point n'apparaît.

### Réorganiser le contenu

Faites glisser les sections ou les éléments à l'aide de l'icône de poignée (six points) située à gauche de chaque élément pour les réorganiser. Vous pouvez faire glisser des éléments à l'intérieur d'une section ou les déplacer d'une section à l'autre.

## Styliser votre page

### Styles de section

Cliquez sur une section pour ouvrir son panneau de style. Vous pouvez définir :

- **Arrière-plan** -- Couleur unie, dégradé ou image. Lorsque vous utilisez une image en arrière-plan, un sélecteur de **Point focal** vous permet de cliquer pour définir la partie de l'image qui reste centrée lorsque la section change de taille ; l'option de couleur **Superposition** vous permet d'ajouter une teinte semi-transparente sur l'image afin d'améliorer la lisibilité du texte
- **Rembourrage** -- Espacement haut et bas à l'intérieur de la section
- **Largeur** -- Pleine largeur ou centrée/contenue
- **Séparateurs** -- Formes décoratives de séparation (vague, biais, courbe, triangle, et autres) sur le bord supérieur ou inférieur de la section, avec des options de couleur, de hauteur et de retournement

### Styles d'élément

Cliquez sur un élément pour ouvrir son panneau de style. Les options courantes incluent la taille de police, la couleur, l'alignement, la marge et le rembourrage. Pour les images, vous pouvez définir le texte alternatif et les cibles des liens.

### CSS personnalisé

Pour un style avancé, chaque section et chaque élément dispose d'un champ **CSS personnalisé** dans lequel vous pouvez écrire vos propres règles CSS. Celles-ci sont limitées à cet élément et n'affectent donc pas involontairement le reste de la page.

:::tip
Si vous devez appliquer des styles à l'ensemble de votre site -- comme une police personnalisée ou une couleur globale -- utilisez plutôt les réglages [Apparence](./appearance.md) que le CSS personnalisé sur des pages individuelles.
:::

## Prévisualiser votre page

Utilisez les commandes de prévisualisation de la barre d'outils pour vérifier l'apparence de votre page selon différentes tailles d'écran :

- **Ordinateur** -- Affichage du navigateur en pleine largeur
- **Mobile** -- Affichage étroit au format téléphone

Sur les téléphones, les colonnes d'une ligne s'empilent les unes au-dessus des autres, en pleine largeur, sauf si vous définissez une **Largeur mobile** pour elles dans les réglages de la ligne. Les listes de prédications et de podcasts placent également le texte de chaque épisode sous sa miniature sur les téléphones.

Pour voir la page en ligne exactement comme la verront les visiteurs, revenez à la liste des pages et cliquez sur le chemin de la page. Celui-ci s'ouvre dans un nouvel onglet du navigateur.

## Vérifier l'accessibilité

Cliquez sur l'icône **Accessibilité** dans la barre d'outils pour lancer une vérification rapide des problèmes courants : images sans texte alternatif, contraste de couleurs insuffisant ou titres dans le désordre. Chaque problème renvoie directement à l'élément concerné, afin que vous puissiez le corriger sur place.

## Annuler des modifications

L'éditeur conserve automatiquement l'historique de vos modifications. Utilisez les boutons de la barre d'outils ou les raccourcis clavier pour naviguer :

- **Annuler** (Ctrl+Z / Cmd+Z) -- Annule votre dernière action
- **Rétablir** (Ctrl+Maj+Z ou Ctrl+Y / Cmd+Maj+Z) -- Réapplique une action annulée

Vous pouvez également restaurer la page dans un état antérieur. Cliquez sur **Afficher l'historique** dans la barre d'outils pour voir la liste des instantanés enregistrés, avec leurs descriptions, puis cliquez sur une entrée pour revenir à ce point.

:::warning
Restaurer un instantané remplace le contenu actuel de votre page par la version enregistrée. Cette opération ne peut pas être annulée avec le bouton d'annulation standard. Si vous souhaitez pouvoir revenir à votre état actuel, enregistrez un instantané de celui-ci avant de restaurer une ancienne version.
:::

## Enregistrer et publier

Les modifications sont enregistrées automatiquement au fur et à mesure de votre travail. Un indicateur d'état dans la barre d'outils indique si vos modifications ont été enregistrées.

### État brouillon et publié

Les pages peuvent avoir un état **publié**, qui détermine le moment où les visiteurs voient vos modifications. La barre d'outils affiche une étiquette d'état indiquant l'état actuel :

- **En ligne dès l'enregistrement** -- La page n'utilise pas de processus de publication. Chaque modification enregistrée est immédiatement mise en ligne. C'est le réglage par défaut pour les nouvelles pages.
- **Modifications non publiées** -- La page a déjà été publiée, mais vous avez apporté des modifications depuis la dernière publication. Les visiteurs voient toujours la version précédemment publiée.
- **Publiée** -- La page est en ligne et votre contenu enregistré correspond à ce que voient les visiteurs.

Pour publier vos modifications, cliquez sur le bouton **Publier** dans la barre d'outils. La page devient visible immédiatement.

Pour revenir à la dernière version publiée sans modifier ce que voient les visiteurs, ouvrez le menu de débordement (⋮) et cliquez sur **Abandonner les modifications non publiées**.

Pour arrêter d'utiliser le processus de publication, ouvrez le menu de débordement et cliquez sur **Désactiver la publication**. Les modifications seront alors à nouveau mises en ligne immédiatement.

:::tip
Utilisez le flux brouillon/publication lorsque vous souhaitez préparer une page -- par exemple, pour un événement à venir -- et ne la rendre visible qu'au moment opportun. Créez et prévisualisez la page, puis cliquez sur Publier lorsque vous êtes prêt.
:::

## Articles connexes

- [Gestion des pages](./managing-pages.md) -- Créer des pages, définir les URL et gérer la navigation du site
- [Apparence](./appearance.md) -- Définir les couleurs, les polices et l'image de marque du site
- [Fichiers](./files.md) -- Importer des images et des documents à utiliser dans l'éditeur
- [Créer des formulaires](../forms/creating-forms.md) -- Construire des formulaires à intégrer dans les pages
