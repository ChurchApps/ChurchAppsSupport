---
title: "Architecture du constructeur de site web"
---

# Architecture du constructeur de site web

<div class="article-intro">

Chaque site web d'église servi par B1App est rendu à partir d'un arbre de contenu -- pages, sections, éléments -- stocké dans ContentApi et modifié visuellement dans B1Admin. Une seule bibliothèque de composants partagée rend à la fois l'aperçu de l'éditeur et le site en direct, un catalogue de types d'éléments définit ce qui peut apparaître sur une page, et un service d'IA distinct peut générer ou réécrire cet arbre. Cette page présente toute la pile : le contrat des éléments dans `@churchapps/helpers`, le pipeline de rendu, les éléments de données de l'église, les widgets de l'ensemble du site, le blog, les pages à accès restreint, le référencement, la génération par IA et les formulaires conversationnels.

</div>

## Vue d'ensemble

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Trois règles valent pour toute la pile :

1. **Un seul arbre, deux moteurs de rendu.** Une page est un arbre `pages → sections → elements` où chaque nœud porte ses paramètres sous forme d'un objet JSON `answers`. Les mêmes composants apphelper rendent l'éditeur glisser-déposer de B1Admin et le site public rendu côté serveur de B1App -- il n'existe pas de « format de publication » séparé.
2. **Le contrat vit dans `@churchapps/helpers`.** `ElementTypes.ts` est le catalogue unique des types d'éléments ; les moteurs de rendu passent par un registre dans apphelper ; les formulaires d'édition vivent dans B1Admin. Ajouter un type d'élément exige de toucher aux trois, dans cet ordre.
3. **Le site public lit des points de terminaison anonymes.** Tout ce dont B1App a besoin -- l'arbre de pages, les paramètres, les billets de blog, les redirections et les points de terminaison de données d'église des autres modules -- est public. L'authentification est facultative : un JWT sur le point de terminaison anonyme de l'arbre débloque les pages réservées aux membres, rien d'autre ne change.

## L'arbre de contenu

Le module content (`Api/src/modules/content`) possède les données du constructeur :

| Table | Rôle |
|-------|------|
| `pages` | Une page par URL : `url`, `title`, `layout`, plus `visibility`/`groupIds` (restriction d'accès) et `metaDescription` (référencement) |
| `sections` | Bandes horizontales sur une page (ou dans un bloc) : arrière-plan, couleur du texte, et un `answersJSON` qui porte le style plus les configurations de séparateur de forme `dividerTop`/`dividerBottom` |
| `elements` | Pièces de contenu à l'intérieur d'une section : `elementType` + `answersJSON`, imbricables pour les types de mise en page (ligne/colonne, carrousel) |
| `blocks` | Groupes réutilisables de sections/éléments (blocs de pied de page, blocs d'éléments) partagés entre les pages |
| `posts` | Billets de blog autonomes (voir [Blog](#blog)) |
| `redirects` | Paires `fromPath → toPath` par église, plafonnées à 200 (voir [Référencement](#seo-and-discoverability)) |
| `settings` | Paramètres d'église clé-valeur ; les lignes marquées `public` sont servies anonymement et portent la configuration des widgets et de l'analytique |

L'arbre complet d'une URL revient d'un seul appel anonyme -- `GET /content/pages/:churchId/tree?url=/about` -- à partir duquel B1App effectue le rendu côté serveur. Les requêtes de l'éditeur récupèrent plutôt par identifiant et conservent les identifiants internes.

## Le contrat des éléments

### Le catalogue (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` définit chaque type d'élément comme un `ElementTypeDefinition` : `elementType`, `label`, `category`, `schemaVersion`, `defaults`, et un `answersSchema` de style JSON-schema pour ses réponses. `validateElementAnswers()` est volontairement tolérant -- les types inconnus et les clés en trop passent, de sorte que l'ancien contenu ne casse jamais lors d'une mise à niveau du catalogue. **35 types sont livrés aujourd'hui :**

| Catégorie | Types d'éléments |
|----------|---------------|
| mise en page (6) | row, column, box, carousel, whiteSpace, block |
| contenu (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| média (4) | image, gallery, video, map |
| église (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| avancé (2) | rawHTML, iframe |

L'élément `sermons` est le plus configurable des types d'église : une réponse `layout` choisit `browse` (le navigateur complet historique), `grid`, `list` ou `featuredLatest`, avec `playlistId`, `itemCount`, `showTitles` et `showDates` qui affinent les mises en page autres que browse.

L'élément `rawHTML` a deux réponses : `rawHTML` (le balisage) et `javascript`. Les scripts insérés via `innerHTML` ne s'exécutent jamais ; `RawHTMLElement` recrée donc chaque nœud `<script>` du balisage comme un nouvel élément. Ces nœuds non insérés par l'analyseur sont considérés comme fiables sous le `strict-dynamic` de la CSP. Une réponse `javascript` qui commence par `<` (un extrait de fournisseur collé avec ses balises `<script>`) est analysée comme du balisage et subit le même traitement. Sinon, elle s'exécute comme un script en ligne simple. B1Admin signale une URL nue dans la zone JavaScript, car une URL seule s'exécute comme un script sans effet. L'élément `map` ne rend rien, et ne charge aucun script Google Maps, lorsqu'aucune clé d'API Maps n'est configurée.

### Moteurs de rendu (`@churchapps/apphelper`)

Les moteurs de rendu vivent dans `Packages/apphelper/src/website/components/elementTypes/`, un composant par type, résolus par `ElementRegistry.ts` -- une carte à deux couches où `Element.tsx` enregistre le moteur par défaut pour les 35 types (`registerDefaultElementRenderer`), et une application hôte peut remplacer n'importe lequel à l'exécution (`registerElementRenderer`) sans forker le paquet.

### Formulaires d'édition (B1Admin)

Les formulaires de paramètres par type de l'éditeur vivent dans `B1Admin/src/site/admin/elements/` -- `ElementEdit.tsx` envoie vers un composant dédié (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) ou vers un constructeur de champs en ligne par type. Le miroir destiné à l'IA de ce catalogue est l'outil MCP `describe_page_builder` de l'API (voir [Serveur MCP](../api/mcp)).

L'aperçu de l'éditeur monte le même `Theme` que le site en direct, qui définit les variables CSS `--headingFont` / `--bodyFont` à partir des styles globaux de l'église. B1App applique ces variables via `pages.css`, que B1Admin ne peut pas importer ; `ContentEditor.tsx` injecte donc `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) pour les appliquer au texte du `.page` et aux `h1`–`h6`. Sans cela, l'aperçu affichait les titres dans la police de l'administration.

### Séparateurs de forme des sections

Les sections peuvent porter des séparateurs de forme décoratifs sur l'un ou l'autre bord. La configuration vit dans le `answersJSON` de la section sous forme d'objets `dividerTop` / `dividerBottom` -- `{ shape, color, height, flip }`, où `shape` vaut l'une des formes `wave, waves, slant, curve, triangle, peaks`. Apphelper livre le composant `SectionDivider` et la fonction `parseDividerConfig()` ; les moteurs de rendu de section des deux applications (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analysent les réponses et montent le séparateur, et `SectionEdit.tsx` dans B1Admin fournit le sélecteur. Les paquets ne livrent que la brique de base -- le raccordement au niveau de la section relève des applications qui les consomment.

## Éléments de données de l'église

Trois types d'éléments rendent des données d'église en direct plutôt que du contenu rédigé. Le cloisonnement des modules s'applique toujours -- chacun appelle le point de terminaison public du module propriétaire depuis le navigateur :

| Élément | Point de terminaison | Remarques |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Renvoie `{ fundId, totalAmount, donationCount }`, avec une fenêtre facultative `?startDate=&endDate=` ; l'élément le compare à sa réponse `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Accès facultatif seulement** : le groupe doit avoir `publicRoster` activé (désactivé par défaut). La projection est volontairement minimale -- `personId`, `displayName`, `leader`, photo -- aucun champ de contact ni démographique |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Renvoie l'arborescence campus → service → horaire ; le moteur d'apphelper en tire un JSON-LD `Event` schema.org de bonne foi (l'API renvoie des données brutes) |

:::warning
`publicRoster` est la barrière de confidentialité de `staffGrid`. Ne jamais élargir la projection publique des membres de groupe ni contourner cet indicateur -- le point de terminaison de la liste est anonyme par conception, et la liste minimale des champs est la propriété de sécurité.
:::

### Élément calendrier et pages d'événements

Les réponses de l'élément `calendar` sont `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, la valeur par défaut, ou `upcoming`) et `tag`. B1App remplace le moteur d'apphelper dans `src/components/Element.tsx` avec `registerElementRenderer("calendar", …)` :

- **`display: "upcoming"`** rend `UpcomingEventsElement` de B1App : il charge `GET /content/events/public/group/:churchId/:groupId` ou `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, développe les récurrences avec `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, une occurrence par événement sur un an), et affiche les 12 premières sous forme de vignettes photo (`events.photoUrl`, avec repli sur le titre sur la couleur sombre du thème) menant à `/events/{id}`, avec un menu Abonner pour le flux ICS du calendrier.
- **`display: "month"`** rend `CalendarElement` d'apphelper avec un rappel `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` naviguent alors vers cette URL au clic au lieu d'ouvrir la boîte de détail (B1Admin ne passe aucun `eventUrl`, donc le calendrier d'administration conserve sa boîte de dialogue).
- **`tag`** filtre les deux affichages avec `EventHelper.hasTag()` (`@churchapps/helpers`) : une correspondance insensible à la casse avec la liste séparée par des virgules `events.tags` ; vide signifie tout afficher. La jointure du calendrier organisé sélectionne `e.tags` afin que les événements organisés portent leurs étiquettes.

Les événements organisés renvoient par `realEventId` (`eventPageId()`), de sorte que l'URL désigne toujours l'événement sous-jacent. `/{sdSlug}/events/[eventId]` est une route dédiée (et non le pipeline du constructeur) : elle charge `GET /content/events/public/:churchId/:id` -- qui renvoie `null` pour les événements en attente ou rejetés et pour les événements privés sans inscription, et ajoute `roomNames` à partir des réservations de salles non rejetées --, rend `EventPageContent` (image héros, description en markdown, encart Quand/Où, **S'inscrire à cet événement** lorsque `registrationEnabled`, et un lien **Ajouter à mon calendrier** vers `GET /content/events/public/:churchId/:id/ical`), utilise la photo comme image Open Graph, et émet un JSON-LD `Event` pour la prochaine occurrence via `EventPageJsonLd`. Un événement inconnu ou masqué renvoie un vrai 404.

## Widgets de l'ensemble du site

Deux widgets s'affichent sur chaque page publique plutôt qu'à l'intérieur de l'arbre : **AnnouncementBanner** (bandeau supérieur fermable) et **Launcher** (centre d'action flottant pour les liens de type don/visite/visionnement). Les deux composants et leurs fonctions `parse*Config()` sont livrés dans apphelper. La configuration tient en deux lignes de paramètres publics -- clés `announcementBanner` et `launcher` -- écrites par `SiteWidgetsEdit` de B1Admin (sur la page Apparence) et lues par la mise en page publique de B1App via `GET /content/settings/public/:churchId`. L'API traite ces éléments comme des paires clé-valeur opaques ; les noms de clés sont une convention entre les deux applications.

## Blog {#blog}

Le blog est un type de contenu autonome, et non une couche par-dessus les pages du constructeur. Une ligne `posts` contient le billet entier : `title`, `slug`, `excerpt`, `content` (corps en markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Surface publique (tout anonyme, `PostController`) :

| Route | Objectif |
|-------|---------|
| `GET /content/posts/public/:churchId` | Billets publiés, filtrables par `?category=&tag=`, paginés |
| `GET /content/posts/public/:churchId/categories` | Catégories distinctes parmi les billets publiés |
| `GET /content/posts/public/:churchId/slug/:slug` | Un billet publié |
| `GET /content/posts/rss/:churchId?siteUrl=` | Flux RSS 2.0, intitulé du nom de l'église, avec catégorie par élément et description extrait-ou-contenu |

Un billet est « publié » une fois que `publishDate` est défini et passé ; une `publishDate` future désigne un billet programmé (masqué publiquement, affiché avec une pastille Programmé dans l'administration). Les points de terminaison de lecture enrichissent chaque billet de `authorName`, résolu depuis `authorId` par la passerelle du module membership. Les extraits manquants se replient sur le contenu en markdown dépouillé (~160 caractères) dans les cartes de liste, les descriptions meta et le RSS. B1App sert `/{sdSlug}/blog` -- une liste éditoriale (en-tête centré qui devient le nom de la catégorie ou de l'étiquette active lorsqu'il est filtré, rangée de puces de catégories, lignes de billets avec vignette à gauche, signatures et extraits) avec le flux RSS annoncé comme lien alternatif -- et `/{sdSlug}/blog/[postSlug]`, une route dédiée (et non le pipeline zone/section) avec un en-tête centré (surtitre de catégorie, titre, signature, filet d'accent de la couleur principale), une image héros 16:9 à la largeur du conteneur, le corps en markdown dans une colonne de lecture d'environ 720 px, des puces d'étiquettes dans le pied de l'article, une bande d'articles connexes « Plus dans {catégorie} », et un JSON-LD `BlogPosting` incluant l'auteur. Les deux pages se stylisent entièrement à partir des jetons du thème, de sorte qu'elles héritent de la palette de chaque église. Les URL du blog sont incluses dans le plan du site par église. L'interface de rédaction de B1Admin (**Site → Blog**) modifie les billets dans une boîte de dialogue : éditeur markdown avec bascule d'aperçu, sélecteur d'image de galerie recadré en 16:9, sélecteur de personne pour l'auteur (par défaut l'utilisateur qui modifie), autocomplétion des catégories alimentée par les catégories existantes, validation des slugs en double, et un interrupteur de publication ; les lignes publiées mènent au billet en direct, et la page incite les administrateurs à ajouter un lien de navigation vers `/blog`. Les commentaires sont confiés à des services tiers : un paramètre public de l'église, `blogFooterHtml` (édité dans **Sous chaque billet** sur la page Blog, visible seulement avec l'autorisation Paramètres → Modifier), est affiché sous chaque billet par `BlogFooterEmbed` de B1App, qui recrée les balises `<script>` pour qu'elles s'exécutent sous `'strict-dynamic'` et les exécute dans l'ordre (un `src` externe termine son chargement avant que le script en ligne suivant ne s'exécute), car les extraits des fournisseurs chargent une bibliothèque puis l'appellent.

## Pages réservées aux membres

`pages.visibility` réutilise l'énumération des liens de navigation -- `everyone` (par défaut), `visitors`, `members`, `staff`, `team`, `groups` (avec `groupIds`) -- mais comme **barrière d'accès stricte**, et non comme filtre de navigation (`PageVisibilityHelper.canViewPage`). Le flux :

1. Le point de terminaison anonyme de l'arbre vérifie la visibilité sur les récupérations par URL. Les appelants anonymes d'une page restreinte reçoivent `{ restricted: true, visibility }` au lieu du contenu -- l'arbre ne fuit jamais.
2. Le point de terminaison honore tout de même un JWT : `CustomAuthProvider` vérifie l'en-tête `Authorization` sur *chaque* requête, y compris les routes anonymes, de sorte que la récupération par un membre authentifié de la même URL aboutit normalement.
3. B1App rend `RestrictedPage` sur une réponse `restricted` : il réhydrate la session depuis les identifiants stockés, relit l'arbre avec le JWT et le rend -- ou affiche une porte de connexion avec un `returnUrl` lorsqu'il n'y a pas de session.

:::info
La granularité de la barrière varie selon le niveau : `groups` vérifie les `groupIds` du jeton par rapport à la liste de la page et `staff` vérifie `membershipStatus`, mais `members` et `team` acceptent actuellement tout utilisateur authentifié de l'église. Considérez `groups` comme l'option stricte.
:::

## Référencement et découvrabilité {#seo-and-discoverability}

Tout cela relève du rendu côté B1App à partir des données de ContentApi -- l'API stocke, l'application émet :

| Préoccupation | Fonctionnement |
|---------|--------------|
| Descriptions meta | `pages.metaDescription` (≤300 caractères) passe par `MetaHelper.getMetaData()` jusqu'aux `Metadata` de Next.js (description + Open Graph) sur chaque route rendue par le constructeur. Les paramètres de page de B1Admin incluent un bouton IA « Générer » (voir plus bas) |
| Redirections | Lignes `redirects` par église gérées sur `/content/redirects` (`content.edit`, plafond de 200 lignes, chemins normalisés). Sur un 404 potentiel, la route de page de B1App résout le chemin contre `GET /content/redirects/public/:churchId` et émet un HTTP 308 via `permanentRedirect` de Next ; les chemins non reconnus retombent sur `notFound()` |
| 404 aux couleurs de l'église | `not-found.tsx` rend `BrandedNotFound` avec le logo, le nom et le thème de l'église au lieu d'une erreur générique. Les chemins inconnus `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` et `/volunteer/[planId]` renvoient un vrai 404, tout comme les sous-domaines inconnus et les slugs de page mal formés (voir [Routage du site web et multi-sites](./websites)) |
| Données structurées | JSON-LD `BlogPosting` sur les billets de blog ; `VideoObject` sur les pages de sermon (`/{sdSlug}/sermons/[sermonId]`) et sur les pages contenant un élément `sermons` ; `Event` à partir des éléments calendrier/événement sur les pages du constructeur et sur chaque page `/{sdSlug}/events/[eventId]` (prochaine occurrence, avec la photo de l'événement comme `image`) ; `Event` schema.org à partir de l'élément `serviceTimes` |
| Pages de sermon | Chaque sermon public obtient une page indexable à `/sermons/[sermonId]` avec des métadonnées complètes -- les sermons ne sont plus enfermés dans l'élément navigateur côté client |
| Analytique | Le paramètre public `ga4MeasurementId` (géré à côté des redirections dans B1Admin) injecte un gtag GA4 propre à l'église via `next/script`. L'application B1 (`/{sdSlug}/mobile`) envoie aussi ses pages vues à cet identifiant, en plus de la balise propre à ChurchApps, lorsqu'il s'agit d'un identifiant `G-` valide (les identifiants de conteneur GTM restent réservés au site web). Chaque `gtag('config')` porte un `display_mode` valant `installed` ou `browser`, selon `navigator.standalone` ou la requête média `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Plan du site et flux | La route `sitemap.xml` par église inclut les pages du constructeur, les URL du blog et les 50 pages de sermon les plus récentes (avec `<lastmod>` tiré de la date de publication de chaque sermon). Elle liste aussi les pages intégrées `/sermons`, `/groups` et `/volunteer` lorsqu'elles ont du contenu (groupes publics, plans d'inscription), sauf si une redirection enregistrée remplace ce chemin. `/` est exclu lorsque l'église n'a pas de page d'accueil, car `/` redirige alors vers `/mobile`, lequel est interdit d'indexation. La liste du blog annonce le flux RSS |
| Accessibilité | Le chrome public affiche un lien d'évitement vers le repère `<main id="main-content">` dans chaque enveloppe de mise en page |

## Génération par IA (AskApi)

La génération de pages et de sites s'exécute dans **AskApi**, un service distinct, sous le contrôleur `/website`. Il s'authentifie avec le même JWT `CustomAuthProvider` que tout le reste, et il est **sans état à l'égard du contenu** : chaque point de terminaison renvoie du JSON, et l'appelant (B1Admin) enregistre le résultat via ContentApi (`POST /content/pages/importTree` crée une page avec son arbre complet imbriqué de sections et d'éléments en un seul appel ; il insère toujours sous l'église de l'appelant et ignore les identifiants du corps).

### Génération de pages (`planPage` → `writePage`)

Le modèle de page « IA » du `AddPageModal` de B1Admin utilise un pipeline à faible coût (`AskApi/src/helpers/SiteGenHelper.ts`) fondé sur une règle : **aucun modèle n'émet du JSON du constructeur**. Deux modèles se partagent le travail via la passerelle IA de Vercel (HTTP simple, clé SSM `/{env}/aiGatewayApiKey` ou `AI_GATEWAY_API_KEY`) :

- **JEV** (`typesafe-ai/jev`) -- un modèle de décision typé qui renvoie des choix, des scores et des booléens avec leurs probabilités, mais ne peut pas rédiger de texte. Il choisit chaque section tour à tour dans une bibliothèque de gabarits fixe, note les mises en page, vérifie les faits du texte, et choisit les photos d'archive et les icônes. Le coût d'entrée est d'environ 0,04 $ par million de jetons et la sortie est gratuite, donc environ 90 appels par page coûtent une fraction de centime.
- **Un petit modèle de conversation (GPT-4.1 mini par défaut)** -- remplit les emplacements de texte nommés et plafonnés en longueur des gabarits choisis. Le rédacteur est une constante unique, surchargeable avec la variable d'environnement `SITEGEN_COPY_MODEL` (n'importe quel identifiant de modèle de conversation de la passerelle, par exemple `anthropic/claude-haiku-4.5`). Dans un essai côte à côte à l'aveugle sur trois églises, Claude Haiku 4.5 a paru un peu plus chaleureux, mais GPT-4.1 mini était proche, environ quatre fois moins cher et plus rapide ; c'est donc le modèle par défaut. Une page complète avec les trois mises en page coûte environ 1,3 centime, dont environ 80 % pour le rédacteur.

| Phase | Point de terminaison | Ce qui se passe |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Classe le type de page (accueil, visite, à propos…), puis échantillonne 10 mises en page candidates à partir des probabilités de JEV par tour (héros + nombre de sections → chaque section → conclusion), les dédoublonne, fait noter chacune par JEV pour l'adéquation, le déroulement et les lacunes, et renvoie les 3 meilleures ainsi qu'une voix d'écriture et un `suggestedStyle` (palette + polices). Les candidats qui partagent les mêmes sections jusque-là posent à JEV une question identique, de sorte que les tours sont mémorisés par préfixe. Un meilleur score inférieur à 6 est consigné comme `lowLayoutScore` -- ce journal constitue l'arriéré des gabarits à ajouter. ~2 s |
| 2 | `POST /website/writePage` (un appel par candidat) | Le rédacteur remplit le texte des emplacements deux sections par appel, en parallèle, et renvoie cinq titres héros parmi lesquels JEV choisit ; JEV vérifie les faits de chaque section ; les sections qui échouent, utilisent une formule toute faite, ou redisent une section précédente (suites communes de 4 mots, vérifiées par le code) sont réécrites en parallèle avec la raison précise ; un nettoyage par le code retire les phrases contenant des formules toutes faites des sites d'église (sauf si la description de l'église elle-même les utilise) ; JEV choisit les sujets photo, les icônes et le séparateur de forme du héros, puis note le résultat. Renvoie un arbre de sections prêt à enregistrer et une note. ~6 à 9 s |
| 3 | `POST /content/pages/importTree` | B1Admin n'écrit que la mise en page la mieux classée (la deuxième est un repli si cette écriture échoue), l'enregistre et ouvre l'aperçu (~10 s après Enregistrer) |

Chaque phase est une requête distincte afin que chaque appel reste sous la limite de 29 secondes de l'API Gateway. Les gabarits de `SiteGenHelper.buildTree` sont des arbres fixes de sections et d'éléments tirés du catalogue (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) et référencent des jetons de thème (`var(--accent)`, `var(--lightAccent)`…), de sorte que les pages générées héritent de l'apparence existante de l'église. Ajouter un gabarit de section consiste à ajouter sa liste d'emplacements à `SECTIONS` et son arbre à `buildTree` ; le test unitaire parcourt chaque gabarit et valide l'arbre.

**Entrées.** Le texte ne peut reprendre des faits que de deux sources : ce que l'utilisateur a saisi, et `churchContext.facts` -- des enregistrements que B1Admin rassemble avant la planification (horaires publics des services et noms publics des groupes, ainsi que le nom et l'adresse de l'église). Les mêmes indicateurs contrôlent les gabarits adossés aux données : `times` affiche l'élément `serviceTimes` en direct lorsque l'église conserve ses horaires de service dans B1 (un tableau saisi sinon), et `groups` et `countdown` ne sont proposés que lorsqu'il existe des données derrière eux. Les appels à JEV sont couverts : un doublon part après 1,5 s et la première réponse l'emporte, car la passerelle s'interrompt parfois et les appels sont presque gratuits.

**Rester dans le sujet.** La requête de l'utilisateur est le *sujet de la page*, et non un contexte sur l'église. `planPage` classe la demande (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), et pour les pages `event` et `topic`, les gabarits généraux de l'église (mot du pasteur, sermons, ministères, groupes, impact communautaire, horaires hebdomadaires et compte à rebours, héros vidéo) ne sont même pas proposés, alors que `details` (quand / où / quoi apporter) et un `eventCountdown` daté le sont. Les deux juges notent le caractère pertinent par rapport au sujet. B1Admin transmet le `pageType` du plan à chaque appel `writePage`.

**Des pages complètes à partir de demandes courtes.** Les pages comportent de trois à six sections centrales, des emplacements généreux en longueur, une phrase d'introduction sur les sections en cartes et une FAQ de cinq questions ; la passe de réparation développe toute section qui revient trop maigre. La génération se fait en un clic : il n'y a pas de questions de suivi. Lorsque la demande omet un détail ordinaire dont une page complète a besoin (une heure de début, une salle, quoi apporter, comment s'inscrire), le rédacteur le complète par un choix plausible et modeste que l'église pourra modifier. Comme les sections sont rédigées en parallèle, ces lacunes sont tranchées **une seule fois**, dans `planPage` (`assumedDetails`, un petit appel de rédacteur qui s'exécute en même temps que l'échantillonnage des mises en page), et repassées à chaque appel `writePage` par `churchContext.assumedDetails` ; ainsi, une section ne peut pas dire 17 h pendant qu'une autre dit 17 h 30. JEV répare toute section qui contredit la demande, les dossiers de l'église ou ces détails tranchés. Les détails tranchés ne sont pas exposés dans l'interface ; l'église relit et modifie la page comme n'importe quelle autre. Certaines choses ne sont jamais inventées : les noms de personnes, les numéros de téléphone, les adresses e-mail et web, les prix, les statistiques, l'histoire de l'église, les citations attribuées à des personnes, et un jour de la semaine pour une date que la demande n'a pas donnée.

**Visuels.** Les gabarits ne nomment jamais leurs photos ni leurs icônes. Ils laissent des emplacements ouverts, et une passe générique (`visualSlots` → `pickVisuals` → `applyVisuals` dans `SiteGenHelper`) parcourt l'arbre terminé et remplit chacun d'eux : un arrière-plan de section ou une entrée de galerie marqué `auto:photo`, une `auto:icon`, le séparateur `auto:divider` du héros, et, sans aucun marqueur, tout élément `textWithPhoto`, `card` ou `image` dont `photo` est vide. JEV choisit chacun à partir du texte qui l'entoure (la photo d'une carte à partir du titre et du texte de cette carte ; un arrière-plan à partir du texte de la section), sans qu'aucun sujet ne se répète sur une page. Un nouveau gabarit reçoit donc des photos gratuitement. Les photos sont des sujets de recherche Pexels émis sous forme de marqueurs `pexels:<term>` que B1Admin résout via `POST /content/stock/search` ; un client qui n'envoie pas `resolvesPhotos` reçoit à la place une image héros intégrée, des bandes de couleur unie et des cartes sans photo. Il n'y a volontairement aucun sujet de portrait, et le gabarit du pasteur ne comporte aucune photo : un inconnu d'archive ne doit jamais tenir la place d'une vraie personne. Pour une église qui n'a encore aucune page, B1Admin applique `suggestedStyle` aux styles globaux ; les sites existants conservent leur apparence.

### Autres points de terminaison

:::info
Le bouton de réécriture de `SectionToolbar` et le bouton « Générer le site » de la liste des pages dans B1Admin restent commentés côté client. Les points de terminaison d'AskApi ci-dessous répondent toujours ; seule cette interface est masquée.
:::

| Point de terminaison | Objectif |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Le flux original en deux étapes (plan, puis un appel LLM par section qui émet du JSON d'éléments). Remplacé dans B1Admin par `planPage`/`writePage` pour des raisons de coût ; conservé pour les consommateurs de l'API |
| `POST /website/generateSite` | Génération de site entier. **Deux phases par conception** : un appel `planOnly: true` ne renvoie que le plan multipage (un seul appel rapide au modèle), puis le client demande le contenu complet -- gardant chaque requête dans la limite de délai de Lambda/API Gateway |
| `POST /website/rewriteSection` | Réécriture qui préserve la structure : le modèle ne peut modifier que les réponses portant du texte. Une signature récursive de structure (identifiants + types + ordre) est comparée avant et après ; toute différence renvoie la section d'origine avec `fallback: true` au lieu d'une structure corrompue |
| `POST /website/generateAltText` | Appel de vision sur jusqu'à 20 URL d'images ; renvoie un texte alternatif concis (≤125 caractères, préfixes « photo de » retirés) |
| `POST /website/generateMetaDescription` | Une description meta de référencement (≤155 caractères) à partir du texte de la page -- reliée au bouton Générer des paramètres de page de B1Admin |

Les consignes de ces points de terminaison sont des fichiers markdown sous `AskApi/config/instructions/`, dont le catalogue d'éléments à partir duquel le modèle génère. Deux choix de conception gardent ce catalogue honnête : le client transmet `availableElementTypes` à chaque requête (la consigne ne peut utiliser que les types de cette liste -- le serveur ne code jamais en dur l'ensemble complet), et l'outil MCP `describe_page_builder` de l'API porte le même guide pour les agents IA qui travaillent via [MCP](../api/mcp). Les modèles sont Anthropic Claude via OpenRouter -- 3.5 Haiku pour le contenu des sections (latence), 3.5 Sonnet pour les plans, les plans de site et la vision -- avec un repli sur OpenAI lorsqu'aucune clé OpenRouter n'est configurée.

## Formulaires conversationnels

Les formulaires (module membership) ont acquis un mode conversationnel destiné aux pages de type carte de contact. Quatre colonnes de `forms` le pilotent : `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendu** -- le `FormSubmissionEdit` d'apphelper bascule vers le composant `ConversationalForm` (une question à la fois) lorsque `displayMode` vaut `conversational` ; la page de formulaire de B1App transmet ce mode. La charge utile de soumission est la même dans les deux cas.
- **Création automatique de la personne** -- à la soumission avec `autoCreatePerson` activé, `ConversationalFormHelper.findOrCreatePerson` déduplique par e-mail (sans tenir compte de la casse), et sinon crée un foyer et une personne avec `membershipStatus: "Guest"`, puis relie la soumission à cette personne.
- **E-mail de suivi** -- lorsqu'un objet et un corps sont définis, l'auteur de la soumission reçoit un e-mail basé sur un modèle (avec les jetons `{firstName}` / `{churchName}`) par le chemin transactionnel existant (`TransactionalEmailHelper`), et jamais par le canal de l'envoi groupé de notifications. Ces deux effets secondaires ne sont pas bloquants : un échec ne perd jamais la soumission.

Les quatre champs se définissent aujourd'hui via l'API ; l'éditeur de formulaires de B1Admin ne les expose pas encore.

## Cache du site public

Le rendu public de B1App met en cache les requêtes étiquetées par église (`next: { revalidate: 300, tags: [sdSlug] }` en production ; `0` en développement), de sorte qu'une page en direct peut rester périmée jusqu'à cinq minutes après une écriture dans ContentApi. `POST /api/revalidate/{sdSlug}` sur B1App appelle `revalidateTag(sdSlug)` et est la seule façon de vider ce cache plus tôt.

Deux acteurs l'utilisent :

1. **B1Admin** -- `clearSiteCache()` dans `B1Admin/src/site/siteCache.ts` envoie une requête POST après les enregistrements de l'éditeur. Elle privilégie le sous-domaine du site actif (un site secondaire doit vider *ce* tag, et non celui de l'église par défaut).
2. **Api** -- les mutations de contenu qui ne passent jamais par B1Admin (clés API, MCP, IA) déclenchent `SiteCacheHelper.bump(churchId)` depuis les contrôleurs de contenu. L'aide résout le sous-domaine de l'église via `SubDomainHelper` et envoie un POST à `{b1AppRoot}/api/revalidate/{sd}`. Les échecs sont avalés, de sorte qu'une application B1App injoignable ne peut pas faire échouer un enregistrement.

Contrôleurs qui déclenchent le vidage : pages (enregistrer, supprimer, dupliquer, publier, abandonner, dépublier, IA temporaire), sections, éléments, blocs, liens, styles globaux, billets, et redirections. `b1AppRoot` en développement vaut `http://{subdomain}.localtest.me:3301` ; en démonstration et en production, `https://{subdomain}.b1.church`.

## Pages connexes

- [Routage du site web et multi-sites](./websites) — comment une requête se résout en église/site et comment les domaines personnalisés sont acheminés
- [Points de terminaison Content](../api/endpoints/content) — surface REST complète pour les pages, sections, éléments, blocs, billets, redirections et paramètres
- [AppHelper](../shared-libraries/app-helper) — le paquet npm qui livre les moteurs de rendu, le registre, les séparateurs et les widgets
- [Serveur MCP](../api/mcp) — y compris l'outil guide `describe_page_builder`
- [Éditeur de pages (utilisateur final)](/docs/b1-admin/website/page-editor) — la documentation de l'éditeur destinée au personnel
