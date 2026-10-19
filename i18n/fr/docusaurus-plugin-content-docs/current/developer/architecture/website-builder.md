---
title: "Architecture du constructeur de sites web"
---

# Architecture du constructeur de sites web

<div class="article-intro">

Chaque site web d'église servi par B1App est généré à partir d'un arbre de contenu — pages, sections, éléments — stocké dans ContentApi et modifié visuellement dans B1Admin. Une bibliothèque de composants partagée génère à la fois l'aperçu de l'éditeur et le site en direct, un catalogue de types d'éléments définit ce qui peut apparaître sur une page, et un service d'IA distinct peut générer ou réécrire cet arbre. Cette page présente l'ensemble de la pile : le contrat des éléments dans `@churchapps/helpers`, le pipeline de rendu, les éléments de données de l'église, les widgets à l'échelle du site, la couche blog, les pages à accès restreint, le référencement (SEO), la génération par IA et les formulaires conversationnels.

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

Trois règles s'appliquent à l'ensemble de la pile :

1. **Un seul arbre, deux moteurs de rendu.** Une page est un arbre `pages → sections → elements` où chaque nœud porte ses paramètres sous forme d'un blob JSON `answers`. Les mêmes composants apphelper génèrent l'éditeur glisser-déposer dans B1Admin et le site public rendu côté serveur dans B1App — il n'existe pas de « format de publication » distinct.
2. **Le contrat se trouve dans `@churchapps/helpers`.** `ElementTypes.ts` est le catalogue unique des types d'éléments ; les moteurs de rendu sont résolus via un registre dans apphelper ; les formulaires d'édition se trouvent dans B1Admin. Ajouter un type d'élément implique de modifier les trois, dans cet ordre.
3. **Le site public lit des points de terminaison anonymes.** Tout ce dont B1App a besoin — l'arbre de pages, les paramètres, les articles de blog, les redirections et les points de terminaison de données de l'église dans les autres modules — est public. L'authentification est facultative : un JWT sur le point de terminaison anonyme de l'arbre débloque les pages réservées aux membres, rien de plus ne change.

## L'arbre de contenu

Le module de contenu (`Api/src/modules/content`) gère les données du constructeur :

| Table | Rôle |
|-------|------|
| `pages` | Une page par URL : `url`, `title`, `layout`, ainsi que `visibility`/`groupIds` (restriction d'accès) et `metaDescription` (SEO) |
| `sections` | Bandes horizontales sur une page (ou dans un bloc) : arrière-plan, couleur du texte, et un `answersJSON` qui contient le style ainsi que les configurations de séparateurs de forme `dividerTop`/`dividerBottom` |
| `elements` | Éléments de contenu dans une section : `elementType` + `answersJSON`, imbriquables pour les types de mise en page (ligne/colonne, carrousel) |
| `blocks` | Groupes de sections/éléments réutilisables (blocs de pied de page, blocs d'éléments) partagés entre les pages |
| `posts` | Articles de blog autonomes (voir [Blog](#blog)) |
| `redirects` | Paires `fromPath → toPath` par église, limitées à 200 (voir [SEO](#seo-and-discoverability)) |
| `settings` | Paramètres d'église sous forme clé-valeur ; les lignes marquées `public` sont servies anonymement et contiennent la configuration des widgets et de l'analyse d'audience |

L'arbre complet d'une URL est renvoyé par un seul appel anonyme — `GET /content/pages/:churchId/tree?url=/about` — qui sert de base au rendu côté serveur de B1App. Les requêtes de l'éditeur récupèrent plutôt par identifiant et conservent les identifiants internes.

## Le contrat des éléments

### Le catalogue (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` définit chaque type d'élément comme un `ElementTypeDefinition` : `elementType`, `label`, `category`, `schemaVersion`, `defaults`, et un `answersSchema` de style JSON-schema pour ses réponses. `validateElementAnswers()` est volontairement souple — les types inconnus et les clés supplémentaires sont acceptés, afin que les anciens contenus ne cassent jamais lors d'une mise à jour du catalogue. **35 types sont livrés à ce jour :**

| Catégorie | Types d'éléments |
|----------|---------------|
| mise en page (6) | row, column, box, carousel, whiteSpace, block |
| contenu (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| médias (4) | image, gallery, video, map |
| église (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| avancé (2) | rawHTML, iframe |

L'élément `sermons` est le plus configurable des types propres aux églises : une réponse `layout` permet de choisir `browse` (l'ancien navigateur complet), `grid`, `list` ou `featuredLatest`, avec `playlistId`, `itemCount`, `showTitles` et `showDates` pour affiner les dispositions autres que `browse`.

L'élément `rawHTML` comporte deux réponses : `rawHTML` (le balisage) et `javascript`. Les scripts insérés via `innerHTML` ne s'exécutent jamais ; `RawHTMLElement` recrée donc chaque nœud `<script>` du balisage sous forme d'élément neuf. Ces nœuds non insérés par l'analyseur sont considérés comme fiables sous le `strict-dynamic` de la CSP. Une réponse `javascript` qui commence par `<` (un extrait de fournisseur collé avec ses balises `<script>`) est analysée comme du balisage et reçoit le même traitement. Sinon, elle s'exécute comme un script inline simple. B1Admin signale une URL nue dans la zone JavaScript, car une URL seule s'exécute comme un script sans effet. L'élément `map` ne rend rien et ne charge aucun script Google Maps lorsqu'aucune clé d'API Maps n'est configurée.

### Moteurs de rendu (`@churchapps/apphelper`)

Les moteurs de rendu se trouvent dans `Packages/apphelper/src/website/components/elementTypes/`, un composant par type, résolus via `ElementRegistry.ts` — une correspondance à deux couches où `Element.tsx` enregistre le moteur par défaut pour les 35 types (`registerDefaultElementRenderer`), et où une application hôte peut en remplacer n'importe lequel à l'exécution (`registerElementRenderer`) sans bifurquer le paquet.

### Formulaires d'édition (B1Admin)

Les formulaires de paramètres par type de l'éditeur se trouvent dans `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` délègue à un composant dédié (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) ou à un générateur de champs en ligne pour chaque type. La version destinée à l'IA de ce catalogue est l'outil MCP `describe_page_builder` de l'API (voir [Serveur MCP](../api/mcp)).

L'aperçu de l'éditeur monte le même `Theme` que le site en direct, qui définit les variables CSS `--headingFont` / `--bodyFont` à partir des styles globaux de l'église. B1App applique ces variables via `pages.css`, que B1Admin ne peut pas importer ; `ContentEditor.tsx` injecte donc `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) pour les appliquer au texte du corps `.page` et aux `h1`–`h6`. Sans cela, l'aperçu affichait les titres dans la police de l'administration.

### Séparateurs de forme des sections

Les sections peuvent porter des séparateurs de forme décoratifs sur l'un ou l'autre bord. La configuration se trouve dans le `answersJSON` de la section, sous forme d'objets `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` où `shape` est l'un de `wave, waves, slant, curve, triangle, peaks`. Apphelper fournit le composant `SectionDivider` et l'aide `parseDividerConfig()` ; les moteurs de rendu Section des deux applications (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analysent les réponses et montent le séparateur, et `SectionEdit.tsx` dans B1Admin fournit l'interface de sélection. Les paquets ne livrent que le bloc de base — le raccordement au niveau de la section relève des applications qui les utilisent.

## Éléments de données de l'église

Trois types d'éléments affichent des données d'église en direct plutôt que du contenu rédigé. L'isolation des modules s'applique toujours — chacun appelle le point de terminaison public du module propriétaire directement depuis le navigateur :

| Élément | Point de terminaison | Remarques |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Renvoie `{ fundId, totalAmount, donationCount }`, avec une fenêtre facultative `?startDate=&endDate=` ; l'élément le compare à sa réponse `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Sur option uniquement** : le groupe doit avoir `publicRoster` activé (désactivé par défaut). La projection est volontairement minimale — `personId`, `displayName`, `leader`, photo — sans champ de contact ni démographique |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Renvoie l'arborescence campus → service → heure ; le moteur de rendu apphelper en tire un JSON-LD `Event` schema.org au mieux (l'API renvoie des données brutes) |

:::warning
`publicRoster` est le verrou de confidentialité de `staffGrid`. Ne jamais élargir la projection publique des membres de groupe ni contourner cet indicateur — le point de terminaison de la liste est anonyme par conception, et la liste minimale de champs constitue la propriété de sécurité.
:::

### Élément calendrier et pages d'événements

Les réponses de l'élément `calendar` sont `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, par défaut, ou `upcoming`), et `tag`. B1App remplace le moteur de rendu apphelper dans `src/components/Element.tsx` avec `registerElementRenderer("calendar", …)` :

- **`display: "upcoming"`** affiche `UpcomingEventsElement` de B1App : il charge `GET /content/events/public/group/:churchId/:groupId` ou `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, développe les récurrences avec `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, une occurrence par événement sur un an), et affiche les 12 premières sous forme de vignettes photo (`events.photoUrl`, avec repli sur le titre sur la couleur sombre du thème) renvoyant vers `/events/{id}`, avec un menu d'abonnement au flux ICS du calendrier.
- **`display: "month"`** affiche le `CalendarElement` d'apphelper avec un rappel `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` naviguent alors vers cette URL au clic au lieu d'ouvrir la boîte de détail (B1Admin ne transmet aucun `eventUrl`, donc le calendrier d'administration conserve sa boîte de dialogue).
- **`tag`** filtre les deux affichages avec `EventHelper.hasTag()` (`@churchapps/helpers`) : une correspondance insensible à la casse avec `events.tags`, séparés par des virgules ; vide signifie tout afficher. La jointure du calendrier organisé sélectionne `e.tags` afin que les événements organisés les portent.

Les événements organisés renvoient vers `realEventId` (`eventPageId()`), de sorte que l'URL désigne toujours l'événement sous-jacent. `/{sdSlug}/events/[eventId]` est une route dédiée (et non le pipeline du constructeur) : elle charge `GET /content/events/public/:churchId/:id` — qui renvoie `null` pour les événements en attente ou rejetés, ainsi que pour les événements privés sans inscription — et ajoute `roomNames` à partir des réservations de salles non rejetées ; elle affiche `EventPageContent` (grande photo, description en markdown, encadré Quand/Où, **Register for this Event** lorsque `registrationEnabled` est actif, et un lien **Add to my calendar** vers `GET /content/events/public/:churchId/:id/ical`), utilise la photo comme image Open Graph, et émet un JSON-LD `Event` pour la prochaine occurrence via `EventPageJsonLd`. Un événement inconnu ou masqué renvoie un véritable 404.

## Widgets à l'échelle du site

Deux widgets s'affichent sur chaque page publique, en dehors de l'arbre : **AnnouncementBanner** (bandeau supérieur fermable) et **Launcher** (centre d'action flottant pour des liens de type don/visite/visionnage). Les deux composants et leurs aides `parse*Config()` sont livrés dans apphelper. La configuration repose sur deux lignes de paramètres publics — clés `announcementBanner` et `launcher` — écrites par `SiteWidgetsEdit` de B1Admin (dans la page Apparence) et lues par la mise en page publique de B1App via `GET /content/settings/public/:churchId`. L'API traite ces éléments comme des paires clé-valeur opaques ; les noms de clés relèvent d'une convention entre les deux applications.

## Blog

Le blog est un type de contenu autonome, et non une couche par-dessus les pages du constructeur. Une ligne `posts` contient l'article complet : `title`, `slug`, `excerpt`, `content` (corps en markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Surface publique (toutes anonymes, `PostController`) :

| Route | Objet |
|-------|---------|
| `GET /content/posts/public/:churchId` | Articles publiés, filtrables par `?category=&tag=`, paginés |
| `GET /content/posts/public/:churchId/categories` | Catégories distinctes parmi les articles publiés |
| `GET /content/posts/public/:churchId/slug/:slug` | Un article publié |
| `GET /content/posts/rss/:churchId?siteUrl=` | Flux RSS 2.0, intitulé avec le nom de l'église, avec catégorie par élément et description (extrait ou contenu) |

Un article est « publié » une fois que `publishDate` est définie et passée ; une `publishDate` future correspond à un article programmé (masqué publiquement, affiché avec une étiquette Scheduled dans l'administration). Les points de terminaison de lecture enrichissent chaque article avec `authorName`, résolu à partir de `authorId` via la passerelle du module membership. Les extraits manquants se replient sur le contenu markdown sans balisage (~160 caractères) dans les cartes de liste, les méta-descriptions et le RSS. B1App sert `/{sdSlug}/blog` — une liste éditoriale (en-tête centré qui devient le nom de la catégorie/étiquette active lorsqu'un filtre est appliqué, rangée de puces de catégories, lignes d'articles avec vignette à gauche, signatures et extraits) avec le flux RSS annoncé comme lien alternatif — ainsi que `/{sdSlug}/blog/[postSlug]`, une route dédiée (et non le pipeline Zone/Section) avec un en-tête centré (surtitre de catégorie, titre, signature, filet d'accent de couleur principale), une image principale 16:9 à la largeur du conteneur, le corps markdown dans une colonne de lecture d'environ 720 px, des puces d'étiquettes dans le pied d'article, une bande `"More in {category}"` d'articles liés, et un JSON-LD `BlogPosting` incluant l'auteur. Les deux pages utilisent exclusivement les jetons du thème pour leur style, de sorte qu'elles héritent de la palette de chaque église. Les URL du blog sont incluses dans le plan du site par église. L'interface de rédaction de B1Admin (**Site → Blog**) modifie les articles dans une boîte de dialogue : éditeur markdown avec bascule d'aperçu, sélecteur d'images de galerie recadrées en 16:9, sélecteur de personne pour l'auteur (par défaut l'utilisateur en cours de modification), autocomplétion des catégories à partir de celles existantes, validation des slugs en double, et un bouton de publication ; les lignes publiées renvoient vers l'article en ligne, et la page invite les administrateurs à ajouter un lien de navigation `/blog`.

## Pages réservées aux membres

`pages.visibility` réutilise l'énumération des liens de navigation — `everyone` (par défaut), `visitors`, `members`, `staff`, `team`, `groups` (avec `groupIds`) — mais comme **verrou d'accès strict**, et non comme filtre de navigation (`PageVisibilityHelper.canViewPage`). Le déroulement :

1. Le point de terminaison anonyme de l'arbre vérifie la visibilité pour les récupérations basées sur l'URL. Les appelants anonymes d'une page restreinte reçoivent `{ restricted: true, visibility }` au lieu du contenu — l'arbre ne fuit jamais.
2. Le point de terminaison respecte toujours un JWT : `CustomAuthProvider` vérifie l'en-tête `Authorization` sur *chaque* requête, y compris sur les routes anonymes, de sorte que la récupération d'un membre authentifié de la même URL aboutit normalement.
3. B1App affiche `RestrictedPage` lorsqu'il reçoit une réponse `restricted` : il rétablit la session à partir des identifiants enregistrés, recharge l'arbre avec le JWT et l'affiche — ou affiche une porte de connexion avec un `returnUrl` lorsqu'il n'existe pas de session.

:::info
La granularité du verrou varie selon le niveau : `groups` vérifie les `groupIds` du jeton par rapport à la liste de la page et `staff` vérifie `membershipStatus`, mais `members` et `team` acceptent actuellement tout utilisateur authentifié de l'église. Considérez `groups` comme l'option la plus stricte.
:::

## SEO et découvrabilité {#seo-and-discoverability}

Tout ceci relève du rendu côté B1App sur les données de ContentApi — l'API stocke, l'application émet :

| Aspect | Fonctionnement |
|---------|--------------|
| Méta-descriptions | `pages.metaDescription` (≤300 caractères) transite par `MetaHelper.getMetaData()` vers les `Metadata` de Next.js (description + Open Graph) sur chaque route générée par le constructeur. Les paramètres de page de B1Admin incluent un bouton IA « Generate » (voir ci-dessous) |
| Redirections | Lignes `redirects` par église gérées à `/content/redirects` (`content.edit`, plafond de 200 lignes, chemins normalisés). Lors d'un éventuel 404, la route de page de B1App résout le chemin via `GET /content/redirects/public/:churchId` et émet un HTTP 308 via `permanentRedirect` de Next ; les chemins non reconnus passent à `notFound()` |
| 404 personnalisé | `not-found.tsx` affiche `BrandedNotFound` avec le logo, le nom et le thème de l'église au lieu d'une erreur générique. Les chemins inconnus `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` et `/volunteer/[planId]` renvoient un véritable 404, de même que les sous-domaines inconnus et les identifiants de page mal formés (voir [Routage des sites web et multisite](./websites)) |
| Données structurées | JSON-LD `BlogPosting` sur les articles de blog ; `VideoObject` sur les pages de sermon individuelles (`/{sdSlug}/sermons/[sermonId]`) et sur les pages contenant un élément `sermons` ; `Event` à partir des éléments calendrier/événement sur les pages du constructeur et sur chaque page `/{sdSlug}/events/[eventId]` (prochaine occurrence, avec la photo de l'événement comme `image`) ; `Event` schema.org à partir de l'élément `serviceTimes` |
| Pages de sermon | Chaque sermon public dispose d'une page indexable à `/sermons/[sermonId]` avec des métadonnées complètes — les sermons ne sont plus enfermés dans le navigateur côté client |
| Analyse d'audience | La clé de paramètre public `ga4MeasurementId` (gérée à côté des redirections dans B1Admin) injecte un gtag GA4 propre à l'église via `next/script`. L'application B1 (`/{sdSlug}/mobile`) envoie également ses pages vues à cet identifiant, en plus de la balise propre à ChurchApps, lorsqu'il s'agit d'un identifiant `G-` valide (les identifiants de conteneur GTM restent réservés aux sites web). Chaque `gtag('config')` porte un `display_mode` valant `installed` ou `browser`, selon `navigator.standalone` ou la requête média `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Plan du site et flux | La route `sitemap.xml` de chaque église inclut les pages du constructeur, les URL du blog et les 50 pages de sermon les plus récentes (avec `<lastmod>` issu de la date de publication de chaque sermon). Elle liste aussi les pages intégrées `/sermons`, `/groups` et `/volunteer` lorsqu'elles ont du contenu (groupes publics, plans de bénévolat), sauf si une redirection enregistrée remplace ce chemin. `/` est exclu lorsque l'église n'a pas de page d'accueil, car `/` redirige alors vers `/mobile`, qui est interdit. La liste du blog annonce le flux RSS |
| Accessibilité | La structure publique affiche un lien d'évitement pointant vers le repère `<main id="main-content">` dans chaque enveloppe de mise en page |

## Génération par IA (AskApi)

La génération de pages et de sites s'exécute dans **AskApi**, un service distinct, sous le contrôleur `/website`. Il s'authentifie avec le même JWT `CustomAuthProvider` que le reste et est **sans état vis-à-vis du contenu** : chaque point de terminaison renvoie du JSON et l'appelant (B1Admin) enregistre le résultat via ContentApi (`POST /content/pages/importTree` crée une page avec son arbre complet imbriqué de sections et d'éléments en un seul appel ; il insère toujours sous l'église de l'appelant et ignore les identifiants du corps de la requête).

### Génération de pages (`planPage` → `writePage`)

Le modèle de page « AI » dans `AddPageModal` de B1Admin utilise un pipeline à faible coût (`AskApi/src/helpers/SiteGenHelper.ts`) reposant sur une règle : **aucun modèle n'émet de JSON du constructeur**. Deux modèles se répartissent le travail via la passerelle IA de Vercel (HTTP simple, clé SSM `/{env}/aiGatewayApiKey` ou `AI_GATEWAY_API_KEY`) :

- **JEV** (`typesafe-ai/jev`) — un modèle de décision typé qui renvoie des choix, des scores et des booléens avec des probabilités, mais ne peut pas rédiger de texte. Il choisit chaque section à tour de rôle dans une bibliothèque de modèles fixe, évalue les mises en page, vérifie les faits du texte, et choisit les photos d'illustration et les icônes. Le coût en entrée est d'environ 0,04 $ par million de jetons et la sortie est gratuite, de sorte qu'environ 90 appels par page coûtent une fraction de centime.
- **Un petit modèle de conversation (GPT-4.1 mini par défaut)** — remplit les emplacements de texte nommés et limités en longueur des modèles choisis. Le rédacteur est une constante unique, remplaçable par la variable d'environnement `SITEGEN_COPY_MODEL` (tout identifiant de modèle de conversation disponible sur la passerelle, par exemple `anthropic/claude-haiku-4.5`). Lors d'un test à l'aveugle côte à côte sur trois églises, Claude Haiku 4.5 a paru légèrement plus chaleureux, mais GPT-4.1 mini était proche, environ quatre fois moins cher et plus rapide ; il est donc le modèle par défaut. Une page complète avec les trois mises en page coûte environ 1,3 centime, dont environ 80 % pour le rédacteur.

| Phase | Point de terminaison | Ce qui se passe |
|-------|----------------------|-----------------|
| 1 | `POST /website/planPage` | Classe le type de page (accueil, visite, à propos…), puis échantillonne 10 mises en page candidates à partir des probabilités par tour de JEV (héros + nombre de sections → chaque section → conclusion), élimine les doublons, fait évaluer chacune par JEV pour l'adéquation, le fil et les lacunes, et renvoie les 3 meilleures plus une voix rédactionnelle et un `suggestedStyle` (palette + polices). Les candidats qui partagent les mêmes sections jusque-là posent à JEV une question identique, donc les tours sont mémorisés par préfixe. Un meilleur score inférieur à 6 est journalisé sous `lowLayoutScore` — ce journal constitue la liste des modèles à ajouter. ~2 s |
| 2 | `POST /website/writePage` (un appel par candidat) | Le rédacteur remplit le texte des emplacements deux sections par appel, en parallèle, et renvoie cinq titres d'accroche parmi lesquels JEV choisit ; JEV vérifie les faits de chaque section ; les sections qui échouent, utilisent une formule toute faite ou reprennent une section antérieure (suites de 4 mots communs, vérifiées par le code) sont réécrites en parallèle avec la raison précise ; un nettoyage par code supprime les phrases contenant des formules courantes des sites d'église (sauf si la description propre à l'église les utilise) ; JEV choisit les sujets photo, les icônes et le séparateur de forme du héros, puis évalue le résultat. Renvoie un arbre de sections prêt à enregistrer et un score. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin n'écrit que la mise en page la mieux classée (la deuxième est une solution de repli si cette écriture échoue), l'enregistre et ouvre l'aperçu (~10 s après l'enregistrement) |

Chaque phase est une requête distincte afin que chaque appel reste dans la limite de 29 secondes de la passerelle API Gateway. Les modèles de `SiteGenHelper.buildTree` sont des arbres fixes de sections et d'éléments issus du catalogue (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) et référencent les jetons du thème (`var(--accent)`, `var(--lightAccent)`…), de sorte que les pages générées héritent de l'apparence existante de l'église. Ajouter un modèle de section implique d'ajouter sa liste d'emplacements dans `SECTIONS` et son arbre dans `buildTree` ; le test unitaire parcourt chaque modèle et valide l'arbre.

**Entrées.** Le texte ne peut énoncer que des faits issus de deux sources : ce que l'utilisateur a saisi, et `churchContext.facts` — des enregistrements que B1Admin rassemble avant la planification (horaires de services publics et noms de groupes publics, ainsi que le nom et l'adresse de l'église). Les mêmes indicateurs conditionnent les modèles adossés à des données : `times` affiche l'élément en direct `serviceTimes` lorsque l'église gère ses horaires dans B1 (un tableau saisi manuellement sinon), et `groups` et `countdown` ne sont proposés que lorsqu'il existe des données correspondantes. Les appels JEV sont couverts : un doublon est lancé après 1,5 s et la première réponse l'emporte, car la passerelle se bloque parfois et les appels sont presque gratuits.

**Rester sur le sujet.** La demande de l'utilisateur est le *sujet de la page*, et non un contexte général sur l'église. `planPage` classe la demande (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), et pour les pages `event` et `topic`, les modèles généraux de l'église (mot du pasteur, sermons, ministères, groupes, impact communautaire, horaires hebdomadaires et compte à rebours, héros vidéo) ne sont même pas proposés, tandis que `details` (quand / où / quoi apporter) et un `eventCountdown` daté le sont. Les deux juges évaluent la pertinence par rapport au sujet. B1Admin transmet le `pageType` issu du plan à chaque appel `writePage`.

**Pages complètes à partir de demandes courtes.** Les pages comportent trois à six sections intermédiaires, des longueurs d'emplacements généreuses, une phrase d'introduction sur les sections en cartes et une FAQ de cinq questions, et l'étape de réparation développe toute section revenue trop maigre. La génération se fait en un clic : il n'y a pas de questions de suivi. Lorsque la demande omet un détail ordinaire mais nécessaire à une page complète (une heure de début, une salle, quoi apporter, comment s'inscrire), le rédacteur le complète avec un choix plausible et modeste que l'église pourra modifier. Comme les sections sont rédigées en parallèle, ces lacunes sont tranchées **une seule fois**, dans `planPage` (`assumedDetails`, un petit appel au rédacteur qui s'exécute en parallèle de l'échantillonnage des mises en page), puis transmises à chaque appel `writePage` via `churchContext.assumedDetails`, de sorte qu'une section ne puisse pas indiquer 17 h pendant qu'une autre indique 17 h 30. JEV répare toute section qui contredit la demande, les enregistrements de l'église ou ces détails arrêtés. Les détails arrêtés ne sont pas affichés dans l'interface ; l'église relit et modifie la page comme n'importe quelle autre. Certaines choses ne sont jamais inventées : les noms de personnes, les numéros de téléphone, les adresses e-mail et web, les prix, les statistiques, l'histoire de l'église, les citations attribuées à des personnes, ni un jour de la semaine pour une date que la demande ne mentionne pas.

**Visuels.** Les modèles ne nomment jamais leurs photos ni leurs icônes. Ils laissent des emplacements ouverts, et une passe générique (`visualSlots` → `pickVisuals` → `applyVisuals` dans `SiteGenHelper`) parcourt l'arbre terminé et remplit chacun d'eux : un arrière-plan de section ou une entrée de galerie marqué `auto:photo`, une `auto:icon`, le `auto:divider` du héros, et, sans aucun marqueur, tout élément `textWithPhoto`, `card` ou `image` dont `photo` est vide. JEV choisit chacun à partir du texte qui l'entoure (la photo d'une carte à partir du titre et du texte de cette carte ; un arrière-plan à partir du texte de la section), sans répéter un sujet sur une même page. Un nouveau modèle reçoit donc des photos gratuitement. Les photos sont des termes de recherche Pexels émis sous forme de marqueurs `pexels:<term>` que B1Admin résout via `POST /content/stock/search` ; un client qui n'envoie pas `resolvesPhotos` reçoit à la place une image de héros intégrée, des bandes de couleur unie et des cartes sans photo. Il n'y a volontairement aucun sujet de portrait, et le modèle du pasteur ne comporte aucune photo : une personne d'archive ne doit jamais tenir lieu d'une vraie personne. Pour une église sans page, B1Admin applique `suggestedStyle` aux styles globaux ; les sites existants conservent leur apparence.

### Autres points de terminaison

:::info
Le bouton de réécriture de `SectionToolbar` et le bouton « Generate Site » de la liste des pages dans B1Admin restent commentés côté client. Les points de terminaison AskApi ci-dessous répondent toujours ; seule cette interface est masquée.
:::

| Point de terminaison | Objet |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Le flux original de page en deux étapes (plan, puis un appel LLM par section émettant du JSON d'éléments). Remplacé dans B1Admin par `planPage`/`writePage` pour des raisons de coût ; conservé pour les consommateurs de l'API |
| `POST /website/generateSite` | Génération de site complet. **En deux phases par conception** : un appel `planOnly: true` renvoie uniquement le plan multipage (un appel rapide au modèle), puis le client demande le contenu complet — ce qui garde chaque requête dans la limite de délai de Lambda/API Gateway |
| `POST /website/rewriteSection` | Réécriture préservant la structure : le modèle ne peut modifier que les réponses contenant du texte. Une signature récursive de structure (identifiants + types + ordre) est comparée avant et après ; toute différence renvoie la section d'origine avec `fallback: true` au lieu d'une structure corrompue |
| `POST /website/generateAltText` | Appel de vision sur jusqu'à 20 URL d'images ; renvoie un texte alternatif concis (≤125 caractères, préfixes « photo of » supprimés) |
| `POST /website/generateMetaDescription` | Une méta-description SEO (≤155 caractères) à partir du texte de la page — reliée au bouton Generate des paramètres de page de B1Admin |

Les consignes de ces points de terminaison sont des fichiers markdown sous `AskApi/config/instructions/`, y compris le catalogue d'éléments à partir duquel le modèle génère. Deux choix de conception garantissent la fiabilité du catalogue : le client transmet `availableElementTypes` à chaque requête (la consigne ne peut utiliser que les types de cette liste — le serveur ne code jamais en dur l'ensemble complet), et l'outil MCP `describe_page_builder` de l'API contient le même guide pour les agents d'IA qui travaillent via [MCP](../api/mcp). Les modèles sont Anthropic Claude via OpenRouter — 3.5 Haiku pour le contenu des sections (latence), 3.5 Sonnet pour les plans, les plans de site et la vision — avec un repli sur OpenAI lorsqu'aucune clé OpenRouter n'est configurée.

## Formulaires conversationnels

Les formulaires (module membership) disposent désormais d'un mode conversationnel, conçu pour les pages de type carte de contact. Quatre colonnes de `forms` pilotent ce mode : `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendu** — `FormSubmissionEdit` d'apphelper bascule vers le composant `ConversationalForm` (une question à la fois) lorsque `displayMode` vaut `conversational` ; la page de formulaire de B1App transmet le mode. La charge utile de soumission est la même dans les deux cas.
- **Création automatique de la personne** — lors d'une soumission avec `autoCreatePerson` activé, `ConversationalFormHelper.findOrCreatePerson` dédoublonne par e-mail (insensible à la casse) et, sinon, crée un foyer et une personne avec `membershipStatus: "Guest"`, puis rattache la soumission à cette personne.
- **E-mail de suivi** — lorsqu'un sujet et un corps sont définis, l'auteur de la soumission reçoit un e-mail modélisé (avec les jetons `{firstName}` / `{churchName}`) par le chemin transactionnel existant (`TransactionalEmailHelper`), jamais par le canal de la synthèse des notifications. Ces deux effets secondaires sont non bloquants : un échec ne fait jamais perdre la soumission.

Les quatre champs sont aujourd'hui définis via l'API ; l'éditeur de formulaires de B1Admin ne les expose pas encore.

## Cache du site public

Le chemin de rendu public de B1App met en cache les requêtes étiquetées par église (`next: { revalidate: 300, tags: [sdSlug] }` en production ; `0` en développement), de sorte qu'une page en direct peut rester obsolète pendant jusqu'à cinq minutes après une écriture dans ContentApi. `POST /api/revalidate/{sdSlug}` sur B1App appelle `revalidateTag(sdSlug)` et constitue le seul moyen de purger ce cache plus tôt.

Deux acteurs déclenchent cette purge :

1. **B1Admin** — `clearSiteCache()` dans `B1Admin/src/site/siteCache.ts` envoie une requête POST après les enregistrements de l'éditeur. Il privilégie le sous-domaine du site actif (un site secondaire doit purger *son* étiquette, et non celle de l'église par défaut).
2. **Api** — les modifications de contenu qui ne passent jamais par B1Admin (clés d'API, MCP, IA) déclenchent `SiteCacheHelper.bump(churchId)` depuis les contrôleurs de contenu. L'aide résout le sous-domaine de l'église via `SubDomainHelper` et envoie un POST à `{b1AppRoot}/api/revalidate/{sd}`. Les échecs sont avalés, afin qu'un B1App injoignable ne fasse jamais échouer un enregistrement.

Contrôleurs qui déclenchent la purge : pages (enregistrer, supprimer, dupliquer, publier, abandonner, dépublier, IA temporaire), sections, éléments, blocs, liens, styles globaux, articles et redirections. En développement, `b1AppRoot` vaut `http://{subdomain}.localtest.me:3301` ; en démo et en production, `https://{subdomain}.b1.church`.

## Pages associées

- [Routage des sites web et multisite](./websites) — comment une requête est associée à une église/un site et comment les domaines personnalisés sont routés
- [Points de terminaison de contenu](../api/endpoints/content) — l'interface REST complète pour les pages, sections, éléments, blocs, articles, redirections et paramètres
- [AppHelper](../shared-libraries/app-helper) — le paquet npm qui livre les moteurs de rendu, le registre, les séparateurs et les widgets
- [Serveur MCP](../api/mcp) — y compris l'outil de guide `describe_page_builder`
- [Éditeur de pages (utilisateur final)](/docs/b1-admin/website/page-editor) — la documentation de l'éditeur destinée au personnel
