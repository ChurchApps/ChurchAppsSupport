---
title: "Architecture du générateur de site web"
---

# Architecture du générateur de site web

<div class="article-intro">

Chaque site web d'église servi par B1App est rendu à partir d'un arbre de contenu — pages, sections, éléments — stocké dans le ContentApi et édité visuellement dans B1Admin. Une bibliothèque de composants partagée rend à la fois l'aperçu de l'éditeur et le site en ligne, un catalogue de types d'éléments définit ce qui peut apparaître sur une page, et un service d'IA distinct peut générer ou réécrire cet arbre. Cette page décrit toute la pile : le contrat des éléments dans `@churchapps/helpers`, le pipeline de rendu, les éléments de données de l'église, les widgets à l'échelle du site, la couche du blogue, les pages à accès contrôlé, le référencement, la génération par IA et les formulaires conversationnels.

</div>

## Vue d'ensemble

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — éditeur           │             │  Api — module /content (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ éléments   blocs    │
│  SiteWidgetsEdit · Blogue    │             │  articles   redirections   paramètres   │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        pipeline de rendu partagé                ▼            (anonyme, JWT pris en compte)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — site public (Next.js)  │
               │    ElementTypes.ts (catalogue)│   │  Zone → Section → Élément       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, plan du    │
               │    ElementRegistry, rendus    │   │    site, redirections, 404 de   │
               │    SectionDivider, widgets    │   │    marque                       │
               └───────────────────────────────┘   └───────────────┬─────────────────┘
┌──────────────────────────────┐                                   │ éléments de données de l'église
│  AskApi — /website/* (IA)    │                                   ▼
│  generateSite · rewriteSection│            ┌─────────────────────────────────────────┐
│  generateAltText · metaDesc  │             │  /giving/funds/public/…/total           │
│  renvoie du JSON ; B1Admin   │             │  /membership/groupmembers/public/…      │
│  enregistre le résultat      │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Trois règles tiennent dans toute la pile :

1. **Un seul arbre, deux moteurs de rendu.** Une page est un arbre `pages → sections → éléments` où chaque nœud porte ses réglages dans un blob JSON `answers`. Les mêmes composants d'apphelper rendent l'éditeur glisser-déposer de B1Admin et le site public rendu côté serveur de B1App — il n'existe aucun « format de publication » distinct.
2. **Le contrat vit dans `@churchapps/helpers`.** `ElementTypes.ts` est l'unique catalogue des types d'éléments ; les moteurs de rendu se résolvent par un registre dans apphelper ; les formulaires d'édition vivent dans B1Admin. Ajouter un type d'élément exige de toucher aux trois, dans cet ordre.
3. **Le site public lit des points de terminaison anonymes.** Tout ce dont B1App a besoin — l'arbre des pages, les paramètres, les articles du blogue, les redirections et les points de terminaison de données de l'église des autres modules — est public. L'authentification est facultative : un JWT sur le point de terminaison anonyme de l'arbre débloque les pages réservées aux membres, rien d'autre ne change.

## L'arbre de contenu

Le module content (`Api/src/modules/content`) possède les données du générateur :

| Table | Rôle |
|-------|------|
| `pages` | Une page par URL : `url`, `title`, `layout`, plus `visibility`/`groupIds` (contrôle d'accès) et `metaDescription` (référencement) |
| `sections` | Bandes horizontales sur une page (ou dans un bloc) : arrière-plan, couleur du texte, et un `answersJSON` qui porte le style plus les configurations de séparateurs de forme `dividerTop`/`dividerBottom` |
| `elements` | Pièces de contenu à l'intérieur d'une section : `elementType` + `answersJSON`, imbriquables pour les types de disposition (ligne/colonne, carrousel) |
| `blocks` | Groupes réutilisables de sections/éléments (blocs de pied de page, blocs d'éléments) partagés entre les pages |
| `posts` | Articles de blogue autonomes (voir [Blogue](#blog)) |
| `redirects` | Paires `fromPath → toPath` propres à chaque église, plafonnées à 200 (voir [Référencement](#seo-and-discoverability)) |
| `settings` | Paramètres d'église clé-valeur ; les lignes marquées `public` sont servies anonymement et portent la configuration des widgets et de l'analytique |

L'arbre complet d'une URL revient en un seul appel anonyme — `GET /content/pages/:churchId/tree?url=/about` — c'est ce à partir de quoi B1App effectue le rendu côté serveur. Les requêtes de l'éditeur demandent plutôt par identifiant et conservent les identifiants internes.

## Le contrat des éléments

### Le catalogue (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` définit chaque type d'élément comme un `ElementTypeDefinition` : `elementType`, `label`, `category`, `schemaVersion`, `defaults`, et un `answersSchema` de style JSON-schema pour ses réponses. `validateElementAnswers()` est volontairement tolérant — les types inconnus et les clés en trop sont acceptés, de sorte qu'un ancien contenu ne casse jamais à la mise à niveau du catalogue. **35 types sont livrés aujourd'hui :**

| Catégorie | Types d'éléments |
|----------|---------------|
| disposition (6) | row, column, box, carousel, whiteSpace, block |
| contenu (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| médias (4) | image, gallery, video, map |
| église (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| avancé (2) | rawHTML, iframe |

L'élément `sermons` est le plus configurable des types propres à l'église : une réponse `layout` choisit `browse` (l'ancien navigateur complet), `grid`, `list` ou `featuredLatest`, avec `playlistId`, `itemCount`, `showTitles` et `showDates` qui précisent les dispositions autres que browse.

L'élément `rawHTML` a deux réponses : `rawHTML` (le balisage) et `javascript`. Les scripts insérés par `innerHTML` ne s'exécutent jamais ; `RawHTMLElement` recrée donc chaque nœud `<script>` du balisage comme un nouvel élément. Ces nœuds non insérés par l'analyseur sont considérés comme fiables sous le `strict-dynamic` de la CSP. Une réponse `javascript` qui commence par `<` (un extrait de fournisseur collé avec ses balises `<script>`) est analysée comme du balisage et subit le même traitement. Sinon, elle s'exécute comme un script en ligne simple. B1Admin signale une URL nue dans la zone JavaScript, car une URL seule s'exécute comme un script sans effet. L'élément `map` ne rend rien et ne charge aucun script Google Maps lorsqu'aucune clé d'API Maps n'est configurée.

### Moteurs de rendu (`@churchapps/apphelper`)

Les moteurs de rendu vivent dans `Packages/apphelper/src/website/components/elementTypes/`, un composant par type, résolus par `ElementRegistry.ts` — une carte à deux couches où `Element.tsx` enregistre le moteur par défaut des 35 types (`registerDefaultElementRenderer`), et une application hôte peut remplacer n'importe lequel à l'exécution (`registerElementRenderer`) sans forker le paquet.

### Formulaires d'édition (B1Admin)

Les formulaires de réglages par type de l'éditeur vivent dans `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` délègue à un composant dédié (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) ou à un constructeur de champs en ligne par type. Le miroir destiné à l'IA de ce catalogue est l'outil MCP `describe_page_builder` de l'API (voir [Serveur MCP](../api/mcp)).

L'aperçu de l'éditeur monte le même `Theme` que le site en ligne, qui règle les variables CSS `--headingFont` / `--bodyFont` à partir des styles globaux de l'église. B1App applique ces variables par `pages.css`, que B1Admin ne peut pas importer ; `ContentEditor.tsx` injecte donc `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) pour les appliquer au texte du corps `.page` et aux `h1`–`h6`. Sans cela, l'aperçu affichait les titres dans la police de l'administration.

### Séparateurs de forme des sections

Les sections peuvent porter des séparateurs de forme décoratifs sur l'un ou l'autre bord. La configuration vit dans le `answersJSON` de la section, sous forme d'objets `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` où `shape` vaut l'un de `wave, waves, slant, curve, triangle, peaks`. Apphelper livre le composant `SectionDivider` et l'aide `parseDividerConfig()` ; les moteurs de rendu de section des deux applications (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) lisent les réponses et montent le séparateur, et `SectionEdit.tsx` dans B1Admin fournit le sélecteur. Les paquets ne livrent que la brique de base — le câblage au niveau de la section relève des applications qui les utilisent.

## Éléments de données de l'église

Trois types d'éléments rendent des données d'église en direct plutôt que du contenu rédigé. Le cloisonnement des modules s'applique toujours — chacun appelle le point de terminaison public du module propriétaire depuis le navigateur :

| Élément | Point de terminaison | Remarques |
|---------|----------------------|-----------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Renvoie `{ fundId, totalAmount, donationCount }`, avec une fenêtre facultative `?startDate=&endDate=` ; l'élément le compare à sa réponse `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Sur adhésion seulement** : le groupe doit avoir `publicRoster` activé (désactivé par défaut). La projection est volontairement minimale — `personId`, `displayName`, `leader`, photo — sans coordonnées ni champs démographiques |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Renvoie l'arbre campus → service → horaire ; le moteur de rendu d'apphelper en tire un JSON-LD `Event` schema.org de type « au mieux » (l'API renvoie des données brutes) |

:::warning
`publicRoster` est la barrière de confidentialité de `staffGrid`. N'élargissez jamais la projection publique des membres de groupe et ne contournez jamais le drapeau — le point de terminaison de la liste est anonyme par conception, et la liste minimale des champs est la propriété de sûreté.
:::

### Élément calendrier et pages d'événements

Les réponses de l'élément `calendar` sont `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, par défaut, ou `upcoming`) et `tag`. B1App remplace le moteur de rendu d'apphelper dans `src/components/Element.tsx` avec `registerElementRenderer("calendar", …)` :

- **`display: "upcoming"`** rend `UpcomingEventsElement` de B1App : il charge `GET /content/events/public/group/:churchId/:groupId` ou `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, développe les récurrences avec `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, une occurrence par événement sur un an) et affiche les 12 premières sous forme de vignettes photo (`events.photoUrl`, avec repli sur le titre sur la couleur sombre du thème) qui mènent à `/events/{id}`, avec un menu Abonner pour le flux ICS du calendrier.
- **`display: "month"`** rend `CalendarElement` d'apphelper avec un rappel `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` naviguent alors vers cette URL au clic au lieu d'ouvrir la boîte de détail (B1Admin ne passe aucun `eventUrl`, de sorte que le calendrier d'administration garde sa boîte de dialogue).
- **`tag`** filtre les deux affichages avec `EventHelper.hasTag()` (`@churchapps/helpers`) : une correspondance insensible à la casse avec `events.tags`, séparé par des virgules ; une valeur vide affiche tout. La jointure des calendriers organisés sélectionne `e.tags` pour que les événements organisés les portent.

Les événements organisés renvoient par `realEventId` (`eventPageId()`), de sorte que l'URL désigne toujours l'événement sous-jacent. `/{sdSlug}/events/[eventId]` est une route dédiée (et non le pipeline du générateur) : elle charge `GET /content/events/public/:churchId/:id` — qui renvoie `null` pour les événements en attente ou rejetés et pour les événements privés sans inscription, et ajoute `roomNames` à partir des réservations de salles non rejetées — rend `EventPageContent` (grande photo, description en markdown, encadré Quand/Où, **S'inscrire à cet événement** lorsque `registrationEnabled`, et un lien **Ajouter à mon calendrier** vers `GET /content/events/public/:churchId/:id/ical`), utilise la photo comme image Open Graph, et émet un JSON-LD `Event` pour la prochaine occurrence via `EventPageJsonLd`. Un événement inconnu ou masqué renvoie un vrai 404.

## Widgets à l'échelle du site

Deux widgets s'affichent sur chaque page publique plutôt qu'à l'intérieur de l'arbre : **AnnouncementBanner** (bandeau supprimable en haut de page) et **Launcher** (centre d'action flottant pour les liens de type don/visite/visionnage). Les deux composants et leurs aides `parse*Config()` sont livrés dans apphelper. La configuration tient en deux lignes de paramètres publics — les clés `announcementBanner` et `launcher` — écrites par `SiteWidgetsEdit` de B1Admin (sur la page Apparence) et lues par la mise en page publique de B1App via `GET /content/settings/public/:churchId`. L'API traite ces éléments comme des paires clé-valeur opaques ; les noms de clés sont une convention entre les deux applications.

## Blogue {#blog}

Le blogue est un type de contenu autonome, et non une couche par-dessus les pages du générateur. Une ligne `posts` porte l'article entier : `title`, `slug`, `excerpt`, `content` (corps en markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. La surface publique (entièrement anonyme, `PostController`) :

| Route | Rôle |
|-------|------|
| `GET /content/posts/public/:churchId` | Articles publiés, filtrables par `?category=&tag=`, paginés |
| `GET /content/posts/public/:churchId/categories` | Catégories distinctes des articles publiés |
| `GET /content/posts/public/:churchId/slug/:slug` | Un article publié |
| `GET /content/posts/rss/:churchId?siteUrl=` | Flux RSS 2.0, titré du nom de l'église, avec pour chaque élément la catégorie et la description (extrait ou contenu) |

Un article est « publié » dès que `publishDate` est défini et passé ; une `publishDate` future désigne un article programmé (masqué publiquement, affiché avec une pastille Programmé dans l'administration). Les points de terminaison de lecture enrichissent chaque article avec `authorName`, résolu à partir de `authorId` par la passerelle du module membership. Les extraits manquants se rabattent sur le contenu en markdown dépouillé (~160 caractères) dans les cartes de liste, les descriptions meta et le RSS. B1App sert `/{sdSlug}/blog` — une liste éditoriale (en-tête centré qui devient le nom de la catégorie ou de l'étiquette active lorsqu'il est filtré, rangée de puces de catégories, lignes d'article avec vignette à gauche, signatures et extraits) avec le flux RSS annoncé comme lien alternatif — et `/{sdSlug}/blog/[postSlug]`, une route dédiée (et non le pipeline Zone/Section) avec un en-tête centré (surtitre de catégorie, titre, signature, filet d'accent de la couleur principale), une image 16:9 à la largeur du conteneur, le corps en markdown dans une colonne de lecture d'environ 720 px, des puces d'étiquettes dans le pied de l'article, une bande `"More in {category}"` d'articles connexes, et un JSON-LD `BlogPosting` incluant l'auteur. Les deux pages s'habillent entièrement à partir des jetons du thème, de sorte qu'elles héritent de la palette de chaque église. Les URL du blogue figurent dans le plan du site de chaque église. L'interface de rédaction de B1Admin (**Site → Blogue**) modifie les articles dans une boîte de dialogue : éditeur markdown avec bascule d'aperçu, sélecteur d'image de galerie recadré en 16:9, sélecteur de personne pour l'auteur (par défaut l'utilisateur qui modifie), autocomplétion des catégories à partir des catégories existantes, validation des slugs en double, et une bascule de publication ; les lignes publiées renvoient vers l'article en ligne, et la page invite l'administrateur à ajouter un lien de navigation `/blog`. Les commentaires sont confiés à des services tiers : un paramètre public de contenu à l'échelle de l'église, `blogFooterHtml` (modifié dans **Sous chaque article** sur la page Blogue, visible seulement avec Paramètres→Modifier), est rendu sous chaque article par `BlogFooterEmbed` de B1App, qui recrée les balises `<script>` pour qu'elles s'exécutent sous `'strict-dynamic'` et les exécute dans l'ordre (un `src` externe finit de charger avant que le script en ligne suivant ne s'exécute), car les extraits des fournisseurs chargent une bibliothèque puis l'appellent.

## Pages réservées aux membres

`pages.visibility` réutilise l'énumération des liens de navigation — `everyone` (par défaut), `visitors`, `members`, `staff`, `team`, `groups` (avec `groupIds`) — mais comme **contrôle d'accès strict**, et non comme filtre de navigation (`PageVisibilityHelper.canViewPage`). Le flux :

1. Le point de terminaison anonyme de l'arbre vérifie la visibilité pour les récupérations par URL. Les appelants anonymes d'une page contrôlée reçoivent `{ restricted: true, visibility }` au lieu du contenu — l'arbre ne fuit jamais.
2. Le point de terminaison prend tout de même en compte un JWT : `CustomAuthProvider` vérifie l'en-tête `Authorization` sur *chaque* requête, y compris sur les routes anonymes, de sorte que la récupération d'un membre authentifié de la même URL aboutit normalement.
3. B1App affiche `RestrictedPage` sur une réponse `restricted` : elle hydrate la session à partir des identifiants enregistrés, récupère à nouveau l'arbre avec le JWT, et l'affiche — ou affiche une porte de connexion avec un `returnUrl` lorsqu'il n'y a pas de session.

:::info
La granularité du contrôle varie selon le niveau : `groups` vérifie les `groupIds` du jeton par rapport à la liste de la page, et `staff` vérifie `membershipStatus`, mais `members` et `team` laissent actuellement passer tout utilisateur authentifié de l'église. Considérez `groups` comme l'option stricte.
:::

## Référencement et découvrabilité {#seo-and-discoverability}

Tout cela relève du rendu par B1App à partir des données du ContentApi — l'API stocke, l'application émet :

| Sujet | Fonctionnement |
|---------|--------------|
| Descriptions meta | `pages.metaDescription` (≤300 caractères) passe par `MetaHelper.getMetaData()` vers les `Metadata` de Next.js (description + Open Graph) sur chaque route rendue par le générateur. Les paramètres de page de B1Admin incluent un bouton IA « Générer » (voir ci-dessous) |
| Redirections | Lignes `redirects` propres à chaque église, gérées sur `/content/redirects` (`content.edit`, plafond de 200 lignes, chemins normalisés). Sur un 404 probable, la route de page de B1App résout le chemin contre `GET /content/redirects/public/:churchId` et émet une redirection HTTP 308 via `permanentRedirect` de Next ; les chemins non reconnus retombent sur `notFound()` |
| 404 de marque | `not-found.tsx` rend `BrandedNotFound` avec le logo, le nom et le thème de l'église au lieu d'une erreur générique. Les chemins inconnus `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` et `/volunteer/[planId]` renvoient un vrai 404, de même que les sous-domaines inconnus et les slugs de page mal formés (voir [Routage du site web et multi-sites](./websites)) |
| Données structurées | JSON-LD `BlogPosting` sur les articles ; `VideoObject` sur les pages de sermon (`/{sdSlug}/sermons/[sermonId]`) et sur les pages contenant un élément `sermons` ; `Event` issu des éléments calendrier/événement des pages du générateur et de chaque page `/{sdSlug}/events/[eventId]` (prochaine occurrence, avec la photo de l'événement comme `image`) ; `Event` schema.org issu de l'élément `serviceTimes` |
| Pages de sermon | Chaque sermon public obtient une page explorable à `/sermons/[sermonId]` avec des métadonnées complètes — les sermons ne sont plus enfermés dans le navigateur côté client |
| Analytique | Le paramètre public `ga4MeasurementId` (géré à côté des redirections dans B1Admin) injecte un gtag GA4 propre à chaque église via `next/script`. L'application B1 (`/{sdSlug}/mobile`) envoie aussi ses pages vues à cet identifiant, en plus de la balise de ChurchApps, lorsqu'il s'agit d'un identifiant `G-` valide (les identifiants de conteneur GTM restent réservés au site web). Chaque `gtag('config')` porte un `display_mode` valant `installed` ou `browser`, selon `navigator.standalone` ou la requête média `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Plan du site et flux | La route `sitemap.xml` propre à chaque église inclut les pages du générateur, les URL du blogue et les 50 pages de sermon les plus récentes (avec `<lastmod>` issu de la date de publication de chaque sermon). Elle liste aussi les pages intégrées `/sermons`, `/groups` et `/volunteer` lorsqu'elles ont du contenu (groupes publics, plans d'inscription de bénévoles), sauf si une redirection enregistrée remplace ce chemin. `/` est exclue lorsque l'église n'a pas de page d'accueil, car `/` redirige alors vers `/mobile`, qui est interdit. La liste du blogue annonce le flux RSS |
| Accessibilité | La structure publique affiche un lien d'évitement pointant vers le repère `<main id="main-content">` dans chaque enveloppe de mise en page |

## Génération par IA (AskApi)

La génération de pages et de sites s'exécute dans **AskApi**, un service distinct, sous le contrôleur `/website`. Il s'authentifie avec le même JWT `CustomAuthProvider` que tout le reste et est **sans état en ce qui concerne le contenu** : chaque point de terminaison renvoie du JSON, et l'appelant (B1Admin) enregistre le résultat par l'intermédiaire du ContentApi (`POST /content/pages/importTree` crée une page avec son arbre complet imbriqué de sections et d'éléments en un seul appel ; il insère toujours sous l'église de l'appelant et ignore les identifiants du corps).

### Génération de page (`planPage` → `writePage`)

Le modèle de page « IA » de `AddPageModal` de B1Admin utilise un pipeline à faible coût (`AskApi/src/helpers/SiteGenHelper.ts`) fondé sur une règle : **aucun modèle n'émet jamais du JSON du générateur**. Deux modèles se partagent le travail via la passerelle IA de Vercel (simple HTTP, clé SSM `/{env}/aiGatewayApiKey` ou `AI_GATEWAY_API_KEY`) :

- **JEV** (`typesafe-ai/jev`) — un modèle de décision typé qui renvoie des choix, des scores et des booléens avec leurs probabilités, mais qui ne peut pas rédiger de texte. Il choisit chaque section à tour de rôle dans une bibliothèque de gabarits fixe, note les mises en page, vérifie les faits du texte, et choisit les photos d'archive et les icônes. Le coût en entrée est d'environ 0,04 $ par million de jetons, et la sortie est gratuite ; ~90 appels par page ne coûtent donc qu'une fraction de centime.
- **Un petit modèle de conversation (GPT-4.1 mini par défaut)** — remplit les emplacements de texte nommés et plafonnés en longueur des gabarits choisis. Le rédacteur est une constante unique, redéfinissable par la variable d'environnement `SITEGEN_COPY_MODEL` (n'importe quel identifiant de modèle de conversation de la passerelle, par exemple `anthropic/claude-haiku-4.5`). Lors d'un test à l'aveugle côte à côte sur trois églises, Claude Haiku 4.5 était légèrement plus chaleureux, mais GPT-4.1 mini était proche, environ quatre fois moins cher et plus rapide ; c'est donc le choix par défaut. Une page complète avec les trois dispositions coûte environ 1,3 centime, dont environ 80 % pour le rédacteur.

| Phase | Point de terminaison | Ce qui se passe |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Classe le type de page (accueil, visite, à propos…), puis échantillonne 10 dispositions candidates à partir des probabilités par tour de JEV (héros + nombre de sections → chaque section → conclusion), les dédoublonne, fait noter chacune par JEV pour l'adéquation, l'enchaînement et les lacunes, et renvoie les 3 meilleures, ainsi qu'une voix d'écriture et un `suggestedStyle` (palette + polices). Les candidats qui partagent les mêmes sections jusqu'ici posent à JEV une question identique, de sorte que les tours sont mémorisés par préfixe. Un meilleur score inférieur à 6 est consigné comme `lowLayoutScore` — ce journal est la liste des gabarits à ajouter. ~2 s |
| 2 | `POST /website/writePage` (un appel par candidat) | Le rédacteur remplit le texte des emplacements deux sections par appel, en parallèle, et renvoie cinq titres d'accroche parmi lesquels JEV choisit ; JEV vérifie les faits de chaque section ; les sections qui échouent, utilisent une formule toute faite ou répètent une section antérieure (suites de quatre mots partagées, vérifiées par le code) sont réécrites en parallèle avec la raison précise ; un nettoyage par le code retire les phrases aux formules toutes faites des sites d'église (sauf si la description de l'église les utilise elle-même) ; JEV choisit les sujets des photos, les icônes et le séparateur de forme du héros, et note le résultat. Renvoie un arbre de sections prêt à enregistrer et une note. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin n'écrit que la disposition la mieux classée (la deuxième est un repli si cette écriture échoue), l'enregistre et ouvre l'aperçu (~10 s après Enregistrer) |

Chaque phase est une requête distincte pour que chaque appel reste dans la limite de 29 secondes de la passerelle d'API. Les gabarits de `SiteGenHelper.buildTree` sont des arbres fixes de sections et d'éléments tirés du catalogue (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) et référencent des jetons de thème (`var(--accent)`, `var(--lightAccent)`…), de sorte que les pages générées héritent des paramètres d'apparence existants de l'église. Ajouter un gabarit de section revient à ajouter sa liste d'emplacements à `SECTIONS` et son arbre à `buildTree` ; le test unitaire parcourt chaque gabarit et valide l'arbre.

**Entrées.** Le texte ne peut énoncer que des faits provenant de deux sources : ce que l'utilisateur a saisi, et `churchContext.facts` — des enregistrements que B1Admin rassemble avant la planification (horaires de services publics et noms de groupes publics, ainsi que le nom et l'adresse de l'église). Les mêmes drapeaux contrôlent les gabarits adossés à des données : `times` rend l'élément `serviceTimes` en direct lorsque l'église conserve ses horaires de services dans B1 (un tableau saisi sinon), et `groups` et `countdown` ne sont proposés que lorsque des données existent derrière eux. Les appels à JEV sont couverts par une couverture : un doublon part après 1,5 s et la première réponse l'emporte, car la passerelle est parfois lente et les appels sont presque gratuits.

**Rester sur le sujet.** La requête de l'utilisateur est le *sujet de la page*, et non un arrière-plan sur l'église. `planPage` classe la demande (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), et pour les pages `event` et `topic`, les gabarits généraux d'église (note du pasteur, sermons, ministères, groupes, impact communautaire, horaires hebdomadaires et compte à rebours, héros vidéo) ne sont même pas proposés, tandis que `details` (quand / où / quoi apporter) et un `eventCountdown` à date le sont. Les deux juges notent le caractère pertinent par rapport au sujet. B1Admin transmet `pageType` depuis le plan à chaque appel de `writePage`.

**Pages complètes à partir de demandes courtes.** Les pages comptent de trois à six sections intermédiaires, des longueurs d'emplacement généreuses, une phrase d'introduction sur les sections en cartes et une FAQ de cinq questions, et la passe de réparation développe toute section qui revient trop mince. La génération se fait en un clic : il n'y a pas de questions de suivi. Lorsque la demande omet un détail ordinaire qu'une page complète exige (une heure de début, une salle, quoi apporter, comment s'inscrire), le rédacteur le remplit par un choix plausible et modeste que l'église pourra modifier. Comme les sections sont rédigées en parallèle, ces lacunes sont tranchées **une seule fois**, dans `planPage` (`assumedDetails`, un petit appel au rédacteur qui s'exécute en même temps que l'échantillonnage des dispositions), puis transmises à chaque appel de `writePage` par `churchContext.assumedDetails`, de sorte qu'une section ne puisse pas dire 17 h tandis qu'une autre dit 17 h 30. JEV répare toute section qui contredit la demande, les dossiers de l'église ou ces détails tranchés. Les détails tranchés ne sont pas exposés dans l'interface ; l'église relit et modifie la page comme n'importe quelle autre. Certaines choses ne sont jamais inventées : les noms de personnes, les numéros de téléphone, les adresses courriel et web, les prix, les statistiques, l'histoire de l'église, les citations attribuées à des personnes, et un jour de la semaine pour une date que la demande n'en donnait pas.

**Visuels.** Les gabarits ne nomment jamais leurs photos ni leurs icônes. Ils laissent des emplacements ouverts, et une passe générique (`visualSlots` → `pickVisuals` → `applyVisuals` dans `SiteGenHelper`) parcourt l'arbre terminé et remplit chacun d'eux : un arrière-plan de section ou une entrée de galerie marqué `auto:photo`, une `auto:icon`, le séparateur `auto:divider` du héros, et, sans aucun marqueur, tout élément `textWithPhoto`, `card` ou `image` dont `photo` est vide. JEV choisit chacun à partir du texte qui l'entoure (la photo d'une carte à partir du titre et du texte de cette carte ; un arrière-plan à partir du texte de la section), sans répéter de sujet sur une page. Un nouveau gabarit reçoit donc des photos gratuitement. Les photos sont des sujets de recherche Pexels émis sous forme d'espaces réservés `pexels:<terme>` que B1Admin résout par `POST /content/stock/search` ; un client qui n'envoie pas `resolvesPhotos` reçoit à la place une image de héros intégrée, des bandes de couleur unie et des cartes sans photo. Il n'existe volontairement aucun sujet de portrait et le gabarit du pasteur ne comporte aucune photo : un inconnu d'archive ne doit jamais tenir la place d'une vraie personne. Pour une église qui n'a encore aucune page, B1Admin applique `suggestedStyle` aux styles globaux ; les sites existants gardent leur apparence.

### Autres points de terminaison

:::info
Le bouton de réécriture de `SectionToolbar` et le bouton « Générer le site » de la liste des pages de B1Admin restent commentés côté client. Les points de terminaison d'AskApi ci-dessous répondent toujours ; seule cette interface est masquée.
:::

| Point de terminaison | Rôle |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Le flux de page original en deux étapes (plan, puis un appel LLM par section qui émet du JSON d'éléments). Remplacé dans B1Admin par `planPage`/`writePage` pour des raisons de coût ; conservé pour les consommateurs de l'API |
| `POST /website/generateSite` | Génération de tout le site. **Conçue en deux phases** : un appel `planOnly: true` ne renvoie que le plan multi-pages (un appel rapide au modèle), puis le client demande le contenu complet — ce qui garde chaque requête dans la limite de délai de Lambda/API Gateway |
| `POST /website/rewriteSection` | Réécriture qui préserve la structure : le modèle ne peut modifier que les réponses porteuses de texte. Une signature récursive de structure (identifiants + types + ordre) est comparée avant et après ; toute différence renvoie la section d'origine avec `fallback: true` au lieu d'une structure corrompue |
| `POST /website/generateAltText` | Appel de vision sur jusqu'à 20 URL d'images ; renvoie un texte alternatif concis (≤125 caractères, préfixes « photo de » retirés) |
| `POST /website/generateMetaDescription` | Une description meta de référencement (≤155 caractères) à partir du texte de la page — reliée au bouton Générer des paramètres de page de B1Admin |

Les consignes de ces points de terminaison sont des fichiers markdown sous `AskApi/config/instructions/`, y compris le catalogue d'éléments à partir duquel le modèle génère. Deux principes gardent ce catalogue honnête : le client transmet `availableElementTypes` à chaque requête (la consigne ne peut utiliser que les types de cette liste — le serveur n'enregistre jamais l'ensemble complet en dur), et l'outil MCP `describe_page_builder` de l'API porte le même guide pour les agents d'IA qui travaillent via [MCP](../api/mcp). Les modèles sont Anthropic Claude via OpenRouter — 3.5 Haiku pour le contenu des sections (latence), 3.5 Sonnet pour les plans, les plans de site et la vision — avec un repli sur OpenAI lorsqu'aucune clé OpenRouter n'est configurée.

## Formulaires conversationnels

Les formulaires (module membership) ont gagné un mode conversationnel destiné aux pages de type carte de contact. Quatre colonnes de `forms` le pilotent : `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendu** — le `FormSubmissionEdit` d'apphelper bascule vers le composant `ConversationalForm` (une question à la fois) lorsque `displayMode` vaut `conversational` ; la page de formulaire de B1App transmet le mode. La charge utile de soumission est la même dans les deux cas.
- **Création automatique de la personne** — lors d'une soumission avec `autoCreatePerson`, `ConversationalFormHelper.findOrCreatePerson` dédoublonne par courriel (sans tenir compte de la casse), et crée sinon un foyer et une personne avec `membershipStatus: "Guest"`, puis lie la soumission à cette personne.
- **Courriel de suivi** — lorsqu'un objet et un corps sont définis, la personne qui a soumis reçoit un courriel à partir d'un modèle (avec les jetons `{firstName}` / `{churchName}`) par le chemin transactionnel existant (`TransactionalEmailHelper`), jamais par la porte du condensé de notifications. Les deux effets secondaires ne sont pas bloquants : un échec ne perd jamais la soumission.

Les quatre champs se règlent aujourd'hui par l'API ; l'éditeur de formulaires de B1Admin ne les expose pas encore.

## Cache du site public

Le chemin de rendu public de B1App met en cache les requêtes marquées par église (`next: { revalidate: 300, tags: [sdSlug] }` en production ; `0` en développement), de sorte qu'une page en ligne peut rester périmée jusqu'à cinq minutes après une écriture dans le ContentApi. `POST /api/revalidate/{sdSlug}` sur B1App appelle `revalidateTag(sdSlug)` et est le seul moyen de vider ce cache plus tôt.

Deux écrivains le sollicitent :

1. **B1Admin** — `clearSiteCache()` dans `B1Admin/src/site/siteCache.ts` envoie une requête POST après les enregistrements de l'éditeur. Il privilégie le sous-domaine du site actif (un site secondaire doit purger *ce* tag, et non celui de l'église par défaut).
2. **Api** — les modifications de contenu qui ne passent jamais par B1Admin (clés d'API, MCP, IA) déclenchent `SiteCacheHelper.bump(churchId)` depuis les contrôleurs de contenu. L'aide résout le sous-domaine de l'église via `SubDomainHelper` et envoie un POST à `{b1AppRoot}/api/revalidate/{sd}`. Les échecs sont avalés, de sorte qu'un B1App injoignable ne puisse jamais faire échouer un enregistrement.

Les contrôleurs qui déclenchent la purge : pages (enregistrement, suppression, duplication, publication, abandon, dépublication, temporaire IA), sections, éléments, blocs, liens, styles globaux, articles et redirections. En développement, `b1AppRoot` vaut `http://{subdomain}.localtest.me:3301` ; en démo et en production, `https://{subdomain}.b1.church`.

## Pages connexes

- [Routage du site web et multi-sites](./websites) — comment une requête est associée à une église/un site et comment les domaines personnalisés sont routés
- [Points de terminaison Content](../api/endpoints/content) — surface REST complète pour les pages, sections, éléments, blocs, articles, redirections et paramètres
- [AppHelper](../shared-libraries/app-helper) — le paquet npm qui fournit les moteurs de rendu, le registre, les séparateurs et les widgets
- [Serveur MCP](../api/mcp) — y compris l'outil guide `describe_page_builder`
- [Éditeur de pages (utilisateur final)](/docs/b1-admin/website/page-editor) — la documentation de l'éditeur destinée au personnel
