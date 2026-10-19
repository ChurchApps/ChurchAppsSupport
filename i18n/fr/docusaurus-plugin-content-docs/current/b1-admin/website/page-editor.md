---
title: "Utiliser l'éditeur de pages"
---

# Utiliser l'éditeur de pages

<div class="article-intro">

L'éditeur de pages de B1 est un outil de conception visuel par glisser-déposer qui vous permet de créer les pages de votre site d'église sans écrire de code. Vous pouvez ajouter des sections et des blocs de contenu, personnaliser les styles, prévisualiser votre travail et annuler des modifications, le tout depuis votre navigateur.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Suivez la [Configuration initiale](initial-setup) pour configurer votre site web
- Créez au moins une page dans [Gestion des pages](managing-pages)
- Vous avez besoin de la permission **content.edit** pour accéder à l'éditeur

</div>

## Ouvrir l'éditeur

1. Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Site Web** et cliquez sur **Pages**.
2. Repérez la page à modifier dans le tableau des pages et cliquez sur **Modifier le contenu**.

L'éditeur s'ouvre en plein écran. Le panneau de gauche affiche la structure de votre page et les éléments de contenu disponibles ; la zone centrale présente un aperçu en direct de votre page.

:::info
L'éditeur s'affiche toujours en mode clair, quel que soit le thème de B1 Admin, et utilise les polices de titre et de texte que vous avez choisies dans [Apparence](appearance). Cela garantit que l'aperçu correspond fidèlement à la façon dont votre page apparaîtra aux visiteurs du site.
:::

## Structure de la page : sections et éléments

Chaque page est composée de deux niveaux :

- **Sections** -- Les conteneurs de premier niveau qui divisent votre page en bandes horizontales (par exemple, une section d'accueil, un bloc de contenu ou une bande de pied de page). Chaque page doit comporter au moins une section avant que vous ne puissiez ajouter du contenu.
- **Éléments** -- Les contenus individuels placés dans une section, tels que du texte, des images, des boutons, des cartes, des formulaires et des calendriers.

### Ajouter une section

1. Cliquez sur **Ajouter une section** (ou sur le bouton **+** en haut du panneau de gauche).
2. Choisissez comment commencer :
   - **À partir d'un modèle** — parcourez la galerie de modèles de sections, classés par catégorie (Accueil, À propos, Services, Dons, etc.), et cliquez sur l'un d'eux pour l'insérer comme section entièrement stylisée et préremplie. Vous pouvez tout personnaliser après l'ajout.
   - **Section vierge** — choisissez une disposition en colonnes (une colonne, deux colonnes, trois colonnes, etc.) et construisez la section à partir de zéro.
3. La nouvelle section apparaît dans l'aperçu. Cliquez dessus pour la sélectionner et configurer sa couleur de fond, son rembourrage et ses autres options de style.

### Changer la disposition d'une section

Vous avez déjà construit une section mais souhaitez une autre structure ? Utilisez le sélecteur de disposition de cette section pour remplacer son agencement en colonnes par un autre de la galerie, tout en conservant vos contenus et éléments existants en place.

### Ajouter des éléments à une section

1. Cliquez à l'intérieur d'une section dans l'aperçu pour la sélectionner.
2. Cliquez sur **Ajouter du contenu** et choisissez un type d'élément dans la liste :
   - **Texte** -- Titres, paragraphes et texte enrichi
   - **Image** -- Importez une photo ou créez un lien vers une photo
   - **Bouton** -- Un lien d'appel à l'action cliquable
   - **Carte** -- Une image avec un titre et une description
   - **Formulaire** -- Intégrez un [formulaire](../forms/creating-forms) directement sur la page
   - **Calendrier** -- Affichez un calendrier d'événements
   - **FAQ** -- Blocs de questions et réponses en accordéon
   - **Vidéo** -- Intégrez une vidéo à partir de son URL
   - **Répertoire des groupes** -- Un annuaire filtrable de tous les groupes de l'église, avec recherche facultative, filtre par catégorie et filtre par étiquette
   - **Fonctionnalité avec icône** -- Une icône avec un titre et une courte description, pour mettre en avant une fonctionnalité ou un ministère
   - **Galerie** -- Une grille de plusieurs photos ou une disposition en mosaïque
   - **Témoignage** -- Une ou plusieurs citations avec le nom, le rôle et la photo de l'auteur
   - **Icônes sociales** -- Icônes liées aux profils de réseaux sociaux de votre église
   - **Compte à rebours** -- Un minuteur qui décompte jusqu'à une date ou un horaire de culte hebdomadaire
   - **Statistiques** -- Une rangée de grands chiffres avec des libellés (membres, années, campus)
   - **Progression de campagne** -- Une barre de progression en direct pour une campagne de dons, indiquant le total recueilli par rapport à l'objectif d'un fonds
   - **Grille du personnel** -- Cartes avec photo pour les membres d'un groupe ; le groupe doit avoir l'option **liste publique** activée
   - **Horaires des cultes** -- Le calendrier des cultes de vos campus, extrait automatiquement de la configuration de la présence
   - **Sermons** -- Votre bibliothèque de sermons, sous forme de navigateur complet ou de grille, de liste ou de mise en avant du plus récent
   - **Carte** -- Une carte intégrée centrée sur l'adresse de votre église
   - **Tableau** -- Une grille simple de lignes et de colonnes pour du contenu tabulaire
   - **Texte avec photo** -- Du texte et une image côte à côte
   - **Logo** -- Le logo de votre église, extrait de [Apparence](appearance)
   - **Diffusion en direct** -- Votre lecteur de diffusion en direct, intégré directement sur la page
   - **Podcast** -- Une liste d'épisodes extraite de l'URL d'un flux RSS de podcast externe que vous fournissez, avec des réglages pour le nombre d'épisodes affichés et pour afficher ou non les dates et les descriptions. Cet élément sert à mettre en avant n'importe quel flux de podcast sur votre site ; pour publier vos propres sermons en tant que podcast, voir plutôt [Gérer les sermons](../sermons/managing-sermons.md#your-podcast-feed).
   - **Don** -- Un bouton de don ou un formulaire de don intégré
   - **HTML** -- Votre propre HTML brut, pour les cas d'usage avancés, comme l'intégration d'un widget tiers (voir [Utiliser l'élément HTML](#using-the-html-element))
   - **iFrame** -- Intégrez un contenu externe à partir de son URL
3. Configurez l'élément à l'aide du panneau de réglages qui apparaît.

### Utiliser l'élément HTML {#using-the-html-element}

L'élément **HTML** comporte deux zones :

- **Contenu HTML** -- Le balisage à afficher sur la page. Toutes les balises `<script>` que vous y incluez s'exécutent sur votre site en production.
- **JavaScript (sans la balise script)** -- Code de script exécuté au chargement de la page. Vous pouvez aussi coller ici l'extrait d'intégration d'un fournisseur avec ses balises `<script>`, et il s'exécutera sur le site en production.

Si vous collez uniquement une adresse web (comme un lien d'image) dans la zone JavaScript, la zone devient rouge avec l'avertissement *« Ceci est une adresse web, pas du JavaScript. »* Une adresse seule dans cette zone ne fait rien. Pour afficher une image, utilisez un élément **Image** ou placez `<img src="...">` dans **Contenu HTML**.

### Utiliser l'élément Calendrier {#using-the-calendar-element}

L'élément **Calendrier** affiche les événements de l'un de vos calendriers :

1. Sous **Sélectionner**, choisissez **Calendrier de groupe** (les événements d'un seul groupe -- la liste affiche les groupes dont vous êtes membre) ou **Calendrier personnalisé** (un calendrier créé sous **Calendriers** ; voir [Calendrier personnalisé](../calendars/curated-calendar)).
2. Sous **Sélectionner un calendrier**, choisissez le groupe ou le calendrier.
3. Sous **Affichage**, choisissez le mode d'affichage :
   - **Calendrier mensuel** -- Une grille mensuelle que les visiteurs peuvent parcourir.
   - **Événements à venir** -- Une grille de vignettes pour les 12 prochains événements, un événement récurrent étant affiché une seule fois à sa prochaine date. Chaque vignette affiche la photo de l'événement (ou son titre sur la couleur sombre de votre thème s'il n'a pas de photo), un badge de date, le jour et l'heure, ainsi que la première ligne de sa description. Un bouton **S'abonner** au-dessus des vignettes permet aux visiteurs de copier le lien ICS du calendrier ou de le télécharger.
4. Pour n'afficher que certains événements, saisissez une étiquette dans **Seulement les événements avec l'étiquette** -- par exemple, `jeunes`. Seuls les événements dont les **Étiquettes** contiennent ce mot apparaissent. Laissez ce champ vide pour afficher tous les événements. Les étiquettes se définissent sur chaque événement ; voir [Ajouter et modifier des événements](../calendars/creating-calendars.md#adding-and-editing-events).

Dans les deux modes, un clic sur un événement ouvre sa propre page sur votre site web. La page de l'événement affiche la photo, le titre, la date et l'heure et la description de l'événement, ainsi qu'un encart avec **Quand** (y compris le modèle de répétition pour un événement récurrent) et **Où** (les salles réservées pour l'événement). Elle comporte également un bouton **S'inscrire à cet événement** lorsque les inscriptions sont activées, et un lien **Ajouter à mon calendrier** qui télécharge l'événement sous forme de fichier de calendrier. La page est conçue pour que les moteurs de recherche puissent afficher la date et les détails de l'événement dans leurs résultats.

### Réorganiser le contenu

Faites glisser les sections ou les éléments à l'aide de l'icône de poignée (six points) à gauche de chaque élément pour les réordonner. Vous pouvez déplacer des éléments à l'intérieur d'une section ou les transférer d'une section à une autre.

## Mettre en forme votre page

### Styles de section

Cliquez sur n'importe quelle section pour ouvrir son panneau de styles. Vous pouvez définir :

- **Arrière-plan** -- Couleur unie, dégradé ou image. Avec un arrière-plan image, un sélecteur de **Point focal** vous permet de cliquer pour définir la partie de l'image qui reste centrée lorsque la section se redimensionne, et une option de couleur de **Superposition** vous permet d'ajouter une teinte semi-transparente sur l'image pour améliorer la lisibilité du texte.
- **Rembourrage** -- Espacement haut et bas à l'intérieur de la section
- **Largeur** -- Pleine largeur ou centrée/contenue
- **Séparateurs** -- Formes décoratives (vague, oblique, courbe, triangle, et autres) sur le bord supérieur ou inférieur de la section, avec couleur, hauteur et options de retournement

### Styles d'élément

Cliquez sur n'importe quel élément pour ouvrir son panneau de styles. Les options courantes incluent la taille de police, la couleur, l'alignement, la marge et le rembourrage. Pour les images, vous pouvez définir le texte alternatif et les cibles des liens.

### CSS personnalisé

Pour une mise en forme avancée, chaque section et chaque élément possède un champ **CSS personnalisé** dans lequel vous pouvez écrire vos propres règles CSS. Ces règles sont limitées à cet élément et n'affectent donc pas involontairement le reste de la page.

:::tip
Si vous devez appliquer des styles à l'ensemble de votre site -- comme une police personnalisée ou une couleur globale -- utilisez plutôt les réglages d'[Apparence](appearance) que le CSS personnalisé sur des pages individuelles.
:::

## Prévisualiser votre page

Utilisez les commandes d'aperçu dans la barre d'outils pour vérifier l'affichage de votre page selon différentes tailles d'écran :

- **Ordinateur** -- Vue pleine largeur du navigateur
- **Mobile** -- Vue étroite au format téléphone

Pour voir la page en direct exactement comme la verront les visiteurs, revenez à la liste des pages et cliquez sur le chemin de la page. Elle s'ouvre dans un nouvel onglet du navigateur.

## Vérifier l'accessibilité

Cliquez sur l'icône **Accessibilité** dans la barre d'outils pour lancer une vérification rapide des problèmes courants : images sans texte alternatif, contraste de couleurs insuffisant ou titres dans le désordre. Chaque problème renvoie directement à l'élément concerné afin que vous puissiez le corriger sur place.

## Annuler des modifications

L'éditeur enregistre automatiquement l'historique de vos modifications. Utilisez les boutons de la barre d'outils ou les raccourcis clavier pour naviguer :

- **Annuler** (Ctrl+Z / Cmd+Z) -- Annule votre dernière action
- **Rétablir** (Ctrl+Maj+Z ou Ctrl+Y / Cmd+Maj+Z) -- Réapplique une action annulée

Vous pouvez aussi restaurer la page à un instantané antérieur. Cliquez sur **Voir l'historique** dans la barre d'outils pour afficher la liste des instantanés enregistrés avec leurs descriptions, puis cliquez sur une entrée pour revenir à ce point.

:::warning
Restaurer un instantané remplace le contenu actuel de votre page par la version de l'instantané. Cette action ne peut pas être annulée avec le bouton d'annulation standard. Enregistrez un instantané de votre état actuel avant de restaurer une ancienne version si vous voulez pouvoir revenir en arrière.
:::

## Enregistrer et publier

Les modifications sont enregistrées automatiquement pendant votre travail. Un indicateur d'état dans la barre d'outils indique si vos modifications ont été enregistrées.

### État brouillon et publié

Les pages peuvent avoir un état **publié**, qui détermine quand les visiteurs voient vos modifications. La barre d'outils affiche une pastille d'état indiquant l'état actuel :

- **Actif dès l'enregistrement** -- La page n'utilise pas de flux de publication. Chaque modification enregistrée est mise en ligne immédiatement. C'est la valeur par défaut des nouvelles pages.
- **Modifications non publiées** -- La page a déjà été publiée, mais vous avez effectué des modifications depuis la dernière publication. Les visiteurs voient toujours la version publiée précédemment.
- **Publiée** -- La page est en ligne et votre contenu enregistré correspond à ce que voient les visiteurs.

Pour publier vos modifications, cliquez sur le bouton **Publier** dans la barre d'outils. La page est mise en ligne immédiatement.

Pour revenir à la dernière version publiée sans affecter ce que voient les visiteurs, ouvrez le menu de débordement (⋮) et cliquez sur **Abandonner les modifications non publiées**.

Pour cesser d'utiliser le flux de publication, ouvrez le menu de débordement et cliquez sur **Désactiver la publication**. Les modifications seront alors à nouveau mises en ligne immédiatement.

:::tip
Utilisez le flux brouillon/publication lorsque vous voulez préparer une page -- par exemple pour un événement à venir -- et ne la mettre en ligne qu'au bon moment. Créez et prévisualisez la page, puis cliquez sur Publier lorsque vous êtes prêt.
:::

## Articles connexes

- [Gestion des pages](managing-pages) -- Créer des pages, définir les URL et gérer la navigation du site
- [Apparence](appearance) -- Définir les couleurs, les polices et l'image de marque du site
- [Fichiers](files) -- Importer des images et des documents à utiliser dans l'éditeur
- [Créer des formulaires](../forms/creating-forms) -- Créer des formulaires à intégrer sur les pages
