---
title: "Utiliser l'éditeur de pages"
---

# Utiliser l'éditeur de pages

<div class="article-intro">

L'éditeur de pages de B1 est un outil visuel par glisser-déposer qui vous permet de concevoir les pages de votre site d'église sans écrire de code. Vous pouvez ajouter des sections et des blocs de contenu, personnaliser les styles, prévisualiser votre travail et annuler des modifications, le tout depuis votre navigateur.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Effectuez la [configuration initiale](initial-setup) pour paramétrer votre site web
- Créez au moins une page dans [Gérer les pages](managing-pages)
- Vous devez disposer de l'autorisation **content.edit** pour accéder à l'éditeur

</div>

## Ouvrir l'éditeur

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Site web** et cliquez sur **Pages**.
2. Repérez la page à modifier dans le tableau des pages et cliquez sur **Modifier le contenu**.

L'éditeur s'ouvre en plein écran. Le panneau de gauche affiche la structure de votre page et les éléments de contenu disponibles ; la zone centrale affiche un aperçu en direct de votre page.

:::info
L'éditeur s'affiche toujours en mode clair, quel que soit le thème de B1 Admin choisi, et utilise les polices de titres et de texte que vous avez sélectionnées dans [Apparence](appearance). Cela garantit que l'aperçu correspond fidèlement à la façon dont votre page apparaîtra aux visiteurs du site.
:::

## Structure de page : sections et éléments

Chaque page est construite à partir de deux niveaux :

- **Sections** : les conteneurs de premier niveau qui divisent votre page en bandes horizontales (par exemple, un bandeau d'accueil, un bloc de contenu ou une bande de pied de page). Chaque page doit comporter au moins une section avant que vous puissiez ajouter du contenu.
- **Éléments** : les différents contenus placés à l'intérieur d'une section, comme du texte, des images, des boutons, des cartes, des formulaires et des calendriers.

### Ajouter une section

1. Cliquez sur **Ajouter une section** (ou sur le bouton **+** en haut du panneau de gauche).
2. Choisissez comment commencer :
   - **À partir d'un modèle** : parcourez la galerie de modèles de sections, organisée par catégorie (Bandeau, À propos, Cultes, Dons, etc.), et cliquez sur l'un d'eux pour l'insérer sous forme de section entièrement stylée et pré-remplie. Vous pouvez tout personnaliser après l'ajout.
   - **Section vierge** : choisissez une disposition en colonnes (une colonne, deux colonnes, trois colonnes, etc.) et construisez la section à partir de zéro.
3. La nouvelle section apparaît dans l'aperçu. Cliquez dessus pour la sélectionner et configurer sa couleur d'arrière-plan, ses marges intérieures et ses autres options de style.

### Changer la disposition d'une section

Vous avez déjà construit une section mais souhaitez une autre structure ? Utilisez le sélecteur de disposition de cette section pour remplacer son agencement en colonnes par un autre issu de la galerie, en conservant en place votre contenu et vos éléments existants.

### Ajouter des éléments à une section

1. Cliquez à l'intérieur d'une section dans l'aperçu pour la sélectionner.
2. Cliquez sur **Ajouter du contenu** et choisissez un type d'élément dans la liste :
   - **Texte** : titres, paragraphes et texte enrichi
   - **Image** : importer une photo ou la lier
   - **Bouton** : un lien d'appel à l'action cliquable
   - **Carte** : une image avec un titre et une description
   - **Formulaire** : intégrer un [formulaire](../forms/creating-forms) directement sur la page. Si le formulaire possède une [photo d'en-tête](../forms/creating-forms.md#adding-a-header-photo), elle s'affiche au-dessus des questions
   - **Calendrier** : afficher un calendrier d'événements
   - **FAQ** : blocs de questions et réponses en accordéon
   - **Vidéo** : intégrer une vidéo à partir d'une URL
   - **Explorateur de groupes** : un répertoire filtrable de tous les groupes de l'église, avec recherche facultative, filtre par catégorie et filtre par étiquette
   - **Fonctionnalité avec icône** : une icône avec un titre et une courte description, pour mettre en avant des fonctionnalités ou des ministères
   - **Galerie** : une grille de plusieurs photos ou une mise en page en mosaïque
   - **Témoignage** : une ou plusieurs citations avec le nom, le rôle et la photo de l'auteur
   - **Icônes réseaux sociaux** : icônes liées aux profils de réseaux sociaux de votre église : Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo et Podcast. Renseignez un lien pour chacun que vous souhaitez afficher ; pour **WhatsApp**, utilisez un lien `https://wa.me/` avec votre numéro ou un lien d'invitation à un groupe
   - **Compte à rebours** : un minuteur qui décompte jusqu'à une date ou un horaire de culte hebdomadaire
   - **Statistiques** : une rangée de grands chiffres accompagnés de libellés (membres, années, sites)
   - **Progression de campagne** : une barre de progression en direct pour une campagne de dons, indiquant le montant total collecté par rapport à l'objectif d'un fonds
   - **Grille du personnel** : cartes photo des membres d'un groupe ; le groupe doit avoir son option **liste publique** activée
   - **Horaires des cultes** : le programme des cultes de vos sites, extrait automatiquement de la configuration de la présence
   - **Prédications** : votre bibliothèque de prédications, sous forme de lecteur complet, de grille, de liste ou de présentation mise en avant de la dernière prédication
   - **Carte** : une carte intégrée centrée sur l'adresse de votre église
   - **Tableau** : une simple grille de lignes et de colonnes pour du contenu tabulaire
   - **Texte avec photo** : texte et image côte à côte
   - **Logo** : le logo de votre église, repris depuis [Apparence](appearance)
   - **Diffusion en direct** : le lecteur de votre diffusion en direct, intégré directement sur la page
   - **Podcast** : une liste d'épisodes extraite d'un flux RSS de podcast externe dont vous fournissez l'URL, avec des paramètres pour le nombre d'épisodes à afficher et pour l'affichage ou non des dates et des descriptions. Chaque épisode du site en ligne dispose d'un lecteur audio et d'un lien **Télécharger** qui enregistre le fichier audio de l'épisode sous le titre de l'épisode. Cet élément sert à mettre en avant n'importe quel flux de podcast sur votre site ; pour publier vos propres prédications sous forme de podcast, voir plutôt [Gérer les prédications](../sermons/managing-sermons.md#your-podcast-feed)
   - **Don** : un bouton de don ou un formulaire de don intégré
   - **HTML** : votre propre HTML brut, pour des usages avancés, comme l'intégration d'un widget tiers (voir [Utiliser l'élément HTML](#using-the-html-element))
   - **iFrame** : intégrer un contenu externe à partir d'une URL
3. Configurez l'élément à l'aide du panneau de paramètres qui s'affiche.

### Utiliser l'élément HTML

L'élément **HTML** comporte deux zones :

- **Contenu HTML** : le balisage à afficher sur la page. Toutes les balises `<script>` que vous y incluez s'exécutent sur votre site en ligne.
- **JavaScript (sans la balise script)** : du code de script exécuté au chargement de la page. Vous pouvez aussi coller ici le fragment d'intégration d'un fournisseur avec ses balises `<script>`, et il s'exécutera sur le site en ligne.

Si vous collez uniquement une adresse web (comme un lien vers une image) dans la zone JavaScript, la zone devient rouge avec l'avertissement *« This is a web address, not JavaScript. »* Une adresse seule dans cette zone ne fait rien. Pour afficher une image, utilisez un élément **Image** ou placez `<img src="...">` dans **Contenu HTML**.

### Utiliser l'élément Calendrier {#using-the-calendar-element}

L'élément **Calendrier** affiche les événements de l'un de vos calendriers :

1. Sous **Sélectionner**, choisissez **Calendrier de groupe** (les événements d'un seul groupe ; la liste affiche les groupes dont vous êtes membre) ou **Calendrier organisé** (un calendrier que vous avez créé sous **Calendriers** ; voir [Calendrier organisé](../calendars/curated-calendar)).
2. Sous **Sélectionner un calendrier**, choisissez le groupe ou le calendrier.
3. Sous **Affichage**, choisissez le mode d'affichage :
   - **Calendrier mensuel** : une grille mensuelle que les visiteurs peuvent parcourir.
   - **Événements à venir** : une grille de vignettes pour les 12 prochains événements, un événement récurrent n'étant affiché qu'à sa prochaine date. Chaque vignette affiche la photo de l'événement (ou son titre sur la couleur sombre de votre thème lorsqu'il n'a pas de photo), un badge de date, le jour et l'heure, ainsi que la première ligne de sa description. Un bouton **S'abonner** au-dessus des vignettes permet aux visiteurs de copier le lien ICS du calendrier ou de le télécharger.
4. Pour n'afficher que certains événements, saisissez une étiquette dans **Uniquement les événements avec l'étiquette** (par exemple, `jeunes`). Seuls les événements dont les **Étiquettes** contiennent ce mot apparaissent. Laissez le champ vide pour afficher tous les événements. Les étiquettes se définissent sur chaque événement ; voir [Ajouter et modifier des événements](../calendars/creating-calendars.md#adding-and-editing-events).

Dans les deux modes d'affichage, un clic sur un événement ouvre sa propre page sur votre site web. La page de l'événement affiche la photo, le titre, la date et l'heure, ainsi que la description, et une zone avec **Quand** (incluant le modèle de répétition pour un événement récurrent) et **Où** (les salles réservées pour l'événement). Elle comporte aussi un bouton **S'inscrire à cet événement** lorsque les inscriptions sont activées, et un lien **Ajouter à mon calendrier** qui télécharge l'événement sous forme de fichier de calendrier. La page est conçue pour que les moteurs de recherche puissent afficher la date et les détails de l'événement dans leurs résultats. Les pages d'événements issues des calendriers organisés affichés sur vos pages (pour les événements des six prochains mois) sont également listées dans le plan du site, afin que les moteurs de recherche puissent les trouver.

### Réorganiser le contenu

Faites glisser les sections ou les éléments à l'aide de l'icône de poignée (six points) située à gauche de chaque élément pour les réordonner. Vous pouvez faire glisser des éléments au sein d'une section ou les déplacer d'une section à l'autre.

## Mettre en forme votre page

### Styles de section

Cliquez sur une section pour ouvrir son panneau de style. Vous pouvez définir :

- **Arrière-plan** : couleur unie, dégradé ou image. Avec un arrière-plan image, un sélecteur de **Point focal** vous permet de cliquer pour définir la partie de l'image qui reste centrée lorsque la section se redimensionne, et une option de **Superposition** de couleur ajoute une teinte semi-transparente sur l'image pour améliorer la lisibilité du texte
- **Marges intérieures** : espacement haut et bas à l'intérieur de la section
- **Largeur** : pleine largeur ou centrée/contenue
- **Séparateurs** : formes décoratives de séparation (vague, biais, courbe, triangle et autres) sur le bord supérieur ou inférieur de la section, avec couleur, hauteur et options d'inversion

### Styles d'élément

Cliquez sur un élément pour ouvrir son panneau de style. Les options courantes incluent la taille de police, la couleur, l'alignement, la marge et les marges intérieures. Pour les images, vous pouvez définir le texte alternatif et les cibles des liens.

### CSS personnalisé

Pour une mise en forme avancée, chaque section et chaque élément dispose d'un champ **CSS personnalisé** dans lequel vous pouvez écrire vos propres règles CSS. Celles-ci sont limitées à cet élément et n'affecteront donc pas involontairement le reste de la page.

:::tip
Si vous devez appliquer des styles à l'ensemble de votre site, comme une police personnalisée ou une couleur globale, utilisez les paramètres [Apparence](appearance) plutôt que le CSS personnalisé sur des pages individuelles.
:::

## Prévisualiser votre page

Utilisez les commandes d'aperçu de la barre d'outils pour vérifier l'affichage de votre page sur différentes tailles d'écran :

- **Ordinateur** : affichage pleine largeur du navigateur
- **Mobile** : affichage étroit, aux dimensions d'un téléphone

Pour voir la page en direct exactement comme la voient les visiteurs, revenez à la liste des pages et cliquez sur le chemin de la page. Elle s'ouvre dans un nouvel onglet du navigateur.

## Vérifier l'accessibilité

Cliquez sur l'icône **Accessibilité** dans la barre d'outils pour lancer une vérification rapide des problèmes courants : images sans texte alternatif, contraste de couleurs insuffisant ou titres dans le désordre. Chaque problème renvoie directement à l'élément concerné, afin que vous puissiez le corriger sur place.

## Annuler des modifications

L'éditeur conserve automatiquement l'historique de vos modifications. Utilisez les boutons de la barre d'outils ou les raccourcis clavier pour naviguer :

- **Annuler** (Ctrl+Z / Cmd+Z) : rétablir votre dernière action
- **Rétablir** (Ctrl+Maj+Z ou Ctrl+Y / Cmd+Maj+Z) : réappliquer une action annulée

Vous pouvez aussi restaurer la page à un instantané antérieur. Cliquez sur **Afficher l'historique** dans la barre d'outils pour voir la liste des instantanés enregistrés avec leurs descriptions, puis cliquez sur une entrée pour revenir à ce point.

:::warning
La restauration d'un instantané remplace le contenu actuel de votre page par la version de l'instantané. Cette action ne peut pas être annulée avec le bouton d'annulation standard. Enregistrez un instantané de l'état actuel avant de restaurer un ancien instantané si vous souhaitez pouvoir revenir en arrière.
:::

## Enregistrer et publier

Les modifications sont enregistrées automatiquement au fur et à mesure de votre travail. Un indicateur d'état dans la barre d'outils indique si vos modifications ont été enregistrées.

### État brouillon et publié

Les pages peuvent avoir un état **publié**, qui détermine le moment où les visiteurs voient vos modifications. La barre d'outils affiche une étiquette d'état indiquant l'état actuel :

- **En ligne dès l'enregistrement** : la page n'utilise pas de flux de publication. Chaque modification enregistrée est immédiatement mise en ligne. C'est la valeur par défaut des nouvelles pages.
- **Modifications non publiées** : la page a déjà été publiée, mais vous avez effectué des modifications depuis la dernière publication. Les visiteurs voient toujours la version publiée précédemment.
- **Publiée** : la page est en ligne et votre contenu enregistré correspond à ce que voient les visiteurs.

Pour publier vos modifications, cliquez sur le bouton **Publier** de la barre d'outils. La page est immédiatement en ligne.

Pour revenir à la dernière version publiée sans modifier ce que voient les visiteurs, ouvrez le menu de débordement (⋮) et cliquez sur **Abandonner les modifications non publiées**.

Pour cesser d'utiliser le flux de publication, ouvrez le menu de débordement et cliquez sur **Désactiver la publication**. Les modifications sont alors de nouveau mises en ligne immédiatement.

:::tip
Utilisez le flux brouillon/publication lorsque vous souhaitez préparer une page, par exemple pour un événement à venir, et ne la mettre en ligne qu'au moment voulu. Construisez et prévisualisez la page, puis cliquez sur Publier lorsque vous êtes prêt.
:::

## Articles connexes

- [Gérer les pages](managing-pages) : créer des pages, définir les URL et gérer la navigation du site
- [Apparence](appearance) : définir les couleurs, polices et l'identité visuelle de l'ensemble du site
- [Fichiers](files) : importer des images et des documents à utiliser dans l'éditeur
- [Créer des formulaires](../forms/creating-forms) : créer des formulaires à intégrer aux pages
