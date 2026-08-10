---
title: "Architecture du constructeur de site Web"
---

# Architecture du constructeur de site Web

<div class="article-intro">

Chaque site web d'église servi par B1App est rendu à partir d'un arbre de contenu — pages, sections, éléments — stocké dans le ContentApi et édité visuellement dans B1Admin. Une bibliothèque de composants partagée rend à la fois l'aperçu de l'éditeur et le site en direct, un catalogue unique de types d'éléments définit ce qui peut apparaître sur une page, et un service IA séparé peut générer ou réécrire cet arbre. Cette page décrit toute la pile : le contrat d'élément dans `@churchapps/helpers`, le pipeline de rendu, les éléments de données d'église, les widgets à l'échelle du site, la couche de blog, les pages à accès restreint, le SEO, la génération par IA, et les formulaires conversationnels.

</div>

## Vue d'ensemble

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — éditeur            │             │  Api — module /content (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        pipeline de rendu partagé                ▼            (anon, JWT honoré)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — site public (Next.js)  │
               │    ElementTypes.ts (catalogue)│   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, 404 personnalisé  │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ éléments de données d'église
                                                                     ▼
┌──────────────────────────────┐                   ┌─────────────────────────────────────┐
│  AskApi — /website/* (IA)    │             │  /giving/funds/public/…/total           │
│  generateSite · rewriteSection│            │  /membership/groupmembers/public/…      │
│  generateAltText · metaDesc  │             │  /attendance/servicetimes/public/…      │
│  renvoie du JSON ; B1Admin sauvegarde│     └─────────────────────────────────────────┘
└──────────────────────────────┘
```

Trois règles tiennent sur l'ensemble de la pile :

1. **Un arbre, deux moteurs de rendu.** Une page est un arbre `pages → sections → éléments` où chaque nœud porte ses paramètres sous forme de blob JSON `answers`. Les mêmes composants apphelper rendent l'éditeur glisser-déposer dans B1Admin et le site public rendu côté serveur dans B1App — il n'existe pas de « format de publication » séparé.
2. **Le contrat vit dans `@churchapps/helpers`.** `ElementTypes.ts` est le catalogue unique des types d'éléments ; les moteurs de rendu se résolvent via un registre dans apphelper ; les formulaires de l'éditeur vivent dans B1Admin. Ajouter un type d'élément signifie toucher aux trois, dans cet ordre.
3. **Le site public lit des points de terminaison anonymes.** Tout ce dont B1App a besoin — l'arbre de pages, les paramètres, les articles de blog, les redirections, et les points de terminaison de données d'église dans les autres modules — est public. L'authentification est optionnelle : un JWT sur le point de terminaison d'arbre anonyme déverrouille les pages réservées aux membres, rien d'autre ne change.

## L'arbre de contenu

Le module content (`Api/src/modules/content`) détient les données du constructeur :

| Table | Rôle |
|-------|------|
| `pages` | Une page par URL : `url`, `title`, `layout`, plus `visibility`/`groupIds` (restriction d'accès) et `metaDescription` (SEO) |
| `sections` | Bandes horizontales sur une page (ou dans un bloc) : arrière-plan, couleur de texte, et un `answersJSON` qui porte le style plus les configurations de diviseur de forme `dividerTop`/`dividerBottom` |
| `elements` | Éléments de contenu à l'intérieur d'une section : `elementType` + `answersJSON`, imbricable pour les types de mise en page (ligne/colonne, carrousel) |
| `blocks` | Groupes de sections/éléments réutilisables (blocs de pied de page, blocs d'éléments) partagés entre les pages |
| `posts` | Articles de blog autonomes (voir [Blog](#blog)) |
| `redirects` | Paires `fromPath → toPath` par église, plafonnées à 200 (voir [SEO](#seo-and-discoverability)) |
| `settings` | Paramètres d'église clé-valeur ; les lignes marquées `public` sont servies de manière anonyme et portent la configuration des widgets/analytics |

L'arbre complet pour une URL revient d'un seul appel anonyme — `GET /content/pages/:churchId/tree?url=/about` — c'est à partir de là que B1App effectue le rendu côté serveur. Les requêtes de l'éditeur récupèrent plutôt par id et conservent les id internes.

## Le contrat d'élément

### Le catalogue (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` définit chaque type d'élément comme une `ElementTypeDefinition` : `elementType`, `label`, `category`, `schemaVersion`, `defaults`, et un `answersSchema` de style JSON-schema pour ses réponses. `validateElementAnswers()` est délibérément permissif — les types inconnus et les clés supplémentaires passent, si bien que le contenu ancien ne se casse jamais lors d'une mise à niveau du catalogue. **35 types sont livrés aujourd'hui :**

| Catégorie | Types d'élément |
|----------|---------------|
| mise en page (6) | row, column, box, carousel, whiteSpace, block |
| contenu (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| médias (4) | image, gallery, video, map |
| église (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| avancé (2) | rawHTML, iframe |

L'élément `sermons` est le plus paramétrable des types église : une réponse `layout` sélectionne `browse` (le navigateur complet hérité), `grid`, `list`, ou `featuredLatest`, avec `playlistId`, `itemCount`, `showTitles`, et `showDates` affinant les mises en page autres que browse.

### Moteurs de rendu (`@churchapps/apphelper`)

Les moteurs de rendu vivent dans `Packages/apphelper/src/website/components/elementTypes/`, un composant par type, résolu via `ElementRegistry.ts` — une carte à deux couches où `Element.tsx` enregistre le moteur de rendu par défaut pour les 35 types (`registerDefaultElementRenderer`) et une application hôte peut en substituer n'importe lequel à l'exécution (`registerElementRenderer`) sans forker le paquet.

### Formulaires d'éditeur (B1Admin)

Les formulaires de paramètres par type de l'éditeur vivent dans `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` distribue vers un composant dédié (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) ou un constructeur de champs en ligne par type. Le miroir de ce catalogue orienté IA est l'outil MCP `describe_page_builder` de l'API (voir [Serveur MCP](../api/mcp)).

### Diviseurs de forme de section

Les sections peuvent porter des diviseurs de forme décoratifs sur l'un ou l'autre bord. La configuration vit dans le `answersJSON` de la section sous forme d'objets `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` avec `shape` valant l'un de `wave, waves, slant, curve, triangle, peaks`. Apphelper fournit le composant `SectionDivider` et l'aide `parseDividerConfig()` ; les moteurs de rendu Section des deux applications (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analysent les réponses et montent le diviseur, et `SectionEdit.tsx` dans B1Admin fournit l'interface de sélection. Les paquets ne fournissent que le bloc de construction — le câblage au niveau de la section est la tâche des applications consommatrices.

## Éléments de données d'église

Trois types d'éléments rendent des données d'église en direct plutôt que du contenu rédigé. L'isolement des modules s'applique toujours — chacun appelle le point de terminaison public du module propriétaire depuis le navigateur :

| Élément | Point de terminaison | Notes |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Renvoie `{ fundId, totalAmount, donationCount }`, fenêtre `?startDate=&endDate=` optionnelle ; l'élément la compare à sa réponse `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Opt-in uniquement** : le groupe doit avoir `publicRoster` activé (désactivé par défaut). La projection est délibérément minimale — `personId`, `displayName`, `leader`, photo — aucun champ de contact ou démographique |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Renvoie l'arbre campus → service → horaire ; le moteur de rendu apphelper en émet un JSON-LD `Event` schema.org fait au mieux (l'API renvoie des données brutes) |

:::warning
`publicRoster` est le verrou de confidentialité pour `staffGrid`. Ne jamais élargir la projection publique des membres du groupe ni contourner le drapeau — le point de terminaison du registre est anonyme par conception et la liste de champs minimale est la propriété de sécurité.
:::

## Widgets à l'échelle du site

Deux widgets se rendent sur chaque page publique plutôt qu'à l'intérieur de l'arbre : **AnnouncementBanner** (barre rejetable en haut de page) et **Launcher** (hub d'action flottant pour des liens de type donner/visiter/regarder). Les deux composants et leurs aides `parse*Config()` sont fournis dans apphelper. La configuration se compose de deux lignes de paramètres publics — clés `announcementBanner` et `launcher` — écrites par le `SiteWidgetsEdit` de B1Admin (sur la page Apparence) et lues par la mise en page publique de B1App via `GET /content/settings/public/:churchId`. L'API traite ces valeurs comme des paires clé-valeur opaques ; les noms de clés sont une convention entre les deux applications.

## Blog

Le blog est un type de contenu autonome, pas une couche par-dessus les pages du constructeur. Une ligne `posts` porte tout l'article : `title`, `slug`, `excerpt`, `content` (corps en markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Surface publique (toute anonyme, `PostController`) :

| Route | Objet |
|-------|---------|
| `GET /content/posts/public/:churchId` | Articles publiés, filtrables par `?category=&tag=`, paginés |
| `GET /content/posts/public/:churchId/categories` | Catégories distinctes parmi les articles publiés |
| `GET /content/posts/public/:churchId/slug/:slug` | Un article publié |
| `GET /content/posts/rss/:churchId?siteUrl=` | Flux RSS 2.0, intitulé du nom de l'église, avec catégorie et description extrait-ou-contenu par élément |

Un article est « publié » une fois que `publishDate` est défini et passé ; une `publishDate` future est un article programmé (caché publiquement, affiché avec une puce Programmé dans l'administration). Les points de terminaison de lecture enrichissent chaque article avec `authorName`, résolu depuis `authorId` via la passerelle du module membership. Les extraits manquants se replient sur le contenu markdown dépouillé (~160 caractères) dans les cartes de liste, les meta descriptions, et le RSS. B1App sert `/{sdSlug}/blog` — une liste éditoriale (en-tête centré qui devient le nom de la catégorie/tag actif lors du filtrage, ligne de filtre par puces de catégorie, lignes d'article avec vignette à gauche, avec signatures et extraits) avec le flux RSS annoncé comme lien alternatif — et `/{sdSlug}/blog/[postSlug]`, une route dédiée (pas le pipeline Zone/Section) avec un en-tête centré (chapeau de catégorie, titre, signature, filet d'accent couleur primaire), une image héro 16:9 en pleine largeur du conteneur, le corps markdown dans une colonne de lecture d'environ 720px, des puces de tags dans le pied de l'article, une bande d'articles connexes « Plus dans `{category}` », et un JSON-LD `BlogPosting` incluant l'auteur. Les deux pages tirent entièrement leur style des jetons de thème pour hériter de la palette de chaque église. Les URL de blog sont incluses dans la sitemap par église. L'interface d'édition de B1Admin (**Site → Blog**) édite les articles dans une boîte de dialogue : éditeur markdown avec bascule d'aperçu, sélecteur d'image de galerie recadrée en 16:9, sélecteur de personne pour l'auteur (par défaut l'utilisateur en cours d'édition), autocomplétion de catégorie amorcée depuis les catégories existantes, validation de slug en double, et une bascule de publication ; les lignes publiées renvoient vers l'article en direct, et la page incite les administrateurs à ajouter un lien de navigation `/blog`.

## Pages réservées aux membres

`pages.visibility` réutilise l'énumération des liens de navigation — `everyone` (défaut), `visitors`, `members`, `staff`, `team`, `groups` (avec `groupIds`) — mais comme un **verrou d'accès dur**, pas un filtre de navigation (`PageVisibilityHelper.canViewPage`). Le flux :

1. Le point de terminaison d'arbre anonyme vérifie la visibilité sur les récupérations basées sur l'URL. Les appelants anonymes d'une page restreinte obtiennent `{ restricted: true, visibility }` au lieu du contenu — l'arbre ne fuit jamais.
2. Le point de terminaison honore quand même un JWT : `CustomAuthProvider` vérifie l'en-tête `Authorization` sur *chaque* requête, y compris les routes anonymes, si bien que la récupération d'un membre authentifié pour la même URL se résout normalement.
3. B1App rend `RestrictedPage` sur une réponse `restricted` : il hydrate la session à partir des identifiants stockés, récupère à nouveau l'arbre avec le JWT, et le rend — ou affiche un verrou de connexion avec un `returnUrl` quand il n'y a pas de session.

:::info
La granularité du verrou varie selon le niveau : `groups` vérifie les `groupIds` du jeton par rapport à la liste de la page et `staff` vérifie `membershipStatus`, mais `members` et `team` acceptent actuellement tout utilisateur authentifié de l'église. Traitez `groups` comme l'option stricte.
:::

## SEO et découvrabilité

Tout ceci est un rendu côté B1App sur des données ContentApi — l'API stocke, l'application émet :

| Préoccupation | Fonctionnement |
|---------|--------------|
| Meta descriptions | `pages.metaDescription` (≤300 caractères) circule via `MetaHelper.getMetaData()` dans les `Metadata` Next.js (description + Open Graph) sur chaque route rendue par le constructeur. Les paramètres de page de B1Admin incluent un bouton IA « Générer » (voir ci-dessous) |
| Redirections | Lignes `redirects` par église gérées à `/content/redirects` (`content.edit`, plafond de 200 lignes, chemins normalisés). Sur un probable 404, la route de page de B1App résout le chemin par rapport à `GET /content/redirects/public/:churchId` et émet un HTTP 308 via le `permanentRedirect` de Next ; les chemins non appariés retombent vers `notFound()` |
| 404 personnalisé | `not-found.tsx` rend `BrandedNotFound` avec le logo, le nom, et le thème de l'église au lieu d'une erreur générique |
| Données structurées | JSON-LD `BlogPosting` sur les articles de blog ; `VideoObject` sur les pages par sermon (`/{sdSlug}/sermons/[sermonId]`) et sur les pages contenant un élément `sermons` ; `Event` depuis les éléments calendrier/événement sur les pages du constructeur ; `Event` schema.org depuis l'élément `serviceTimes` |
| Pages de sermon | Chaque sermon public reçoit une page indexable à `/sermons/[sermonId]` avec métadonnées complètes — les sermons ne sont plus enfermés à l'intérieur de l'élément navigateur côté client |
| Analytics | La clé de paramètres publics `ga4MeasurementId` (gérée à côté des redirections dans B1Admin) injecte une balise gtag GA4 par église via `next/script` |
| Sitemap et flux | La route `sitemap.xml` par église inclut les pages du constructeur et les URL de blog ; la liste de blog annonce le flux RSS |
| Accessibilité | Le chrome public rend un lien d'évitement ciblant le repère `<main id="main-content">` dans chaque enveloppe de mise en page |

## Génération par IA (AskApi)

La génération de page et de site s'exécute dans **AskApi**, un service séparé, sous le contrôleur `/website`. Il s'authentifie avec le même JWT `CustomAuthProvider` que tout le reste et est **sans état vis-à-vis du contenu** : chaque point de terminaison renvoie du JSON et l'appelant (B1Admin) persiste le résultat via ContentApi (`POST /content/pages/temp/ai` sauvegarde en un seul appel un lot page-sections-éléments généré).

:::info
Depuis le 2026-07-03, les points d'entrée de B1Admin vers ce pipeline — le modèle de site « IA » dans `AddPageModal`, le bouton de réécriture de `SectionToolbar`, et le bouton « Générer le site » de la liste de pages — sont commentés côté client pendant que la fonctionnalité est retravaillée. Les points de terminaison AskApi ci-dessous ne sont pas affectés et répondent toujours ; seule l'interface B1Admin est masquée.
:::

| Point de terminaison | Objet |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Le flux de page original en deux étapes : d'abord le plan, puis un appel par section. Le modèle de page « IA » de B1Admin dans `AddPageModal` pilote ceci — plan, puis génération de section en parallèle, puis aperçu |
| `POST /website/generateSite` | Génération de site complet. **Conçue en deux phases** : un appel `planOnly: true` renvoie juste le plan multi-pages (un appel modèle rapide), puis le client demande le contenu complet — gardant chaque requête à l'intérieur du délai d'attente Lambda/API Gateway |
| `POST /website/rewriteSection` | Réécriture préservant la structure : le modèle ne peut modifier que les réponses porteuses de texte. Une signature de structure récursive (id + types + ordre) est comparée avant et après ; toute divergence renvoie la section d'origine avec `fallback: true` au lieu d'une structure corrompue |
| `POST /website/generateAltText` | Appel de vision sur jusqu'à 20 URL d'image ; renvoie un texte alternatif concis (≤125 caractères, préfixes « photo de » retirés) |
| `POST /website/generateMetaDescription` | Une meta description SEO (≤155 caractères) à partir du contenu textuel de la page — reliée au bouton Générer des paramètres de page de B1Admin |

Les invites sont des fichiers markdown sous `AskApi/config/instructions/`, y compris le catalogue d'éléments à partir duquel le modèle génère. Deux points de conception maintiennent le catalogue honnête : le client transmet `availableElementTypes` à chaque requête (l'invite ne peut utiliser que les types de cette liste — le serveur ne code jamais en dur l'ensemble complet), et l'outil MCP `describe_page_builder` de l'API porte le même guide pour les agents IA travaillant via [MCP](../api/mcp). Les modèles sont Anthropic Claude via OpenRouter — 3.5 Haiku pour le contenu de section (latence), 3.5 Sonnet pour les plans, plans de site, et vision — avec un repli OpenAI quand aucune clé OpenRouter n'est configurée.

## Formulaires conversationnels

Les formulaires (module membership) ont gagné un mode conversationnel visant les pages de type carte de connexion (« connect card »). Quatre colonnes sur `forms` le pilotent : `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendu** — le `FormSubmissionEdit` d'apphelper bascule vers le composant `ConversationalForm` (une question à la fois) quand `displayMode` vaut `conversational` ; la page de formulaire de B1App transmet le mode. Même charge utile de soumission dans les deux cas.
- **Création automatique de personne** — à la soumission avec `autoCreatePerson` activé, `ConversationalFormHelper.findOrCreatePerson` déduplique par e-mail (insensible à la casse) et sinon crée un foyer + une personne avec `membershipStatus: "Guest"`, puis relie la soumission à cette personne.
- **E-mail de suivi** — quand un sujet et un corps sont définis, le soumetteur reçoit un e-mail modélisé (avec des jetons `{firstName}` / `{churchName}`) via le chemin transactionnel existant (`TransactionalEmailHelper`), jamais la porte du récapitulatif de notification. Les deux effets de bord sont non fatals : un échec ne fait jamais perdre la soumission.

Les quatre champs sont configurés via l'API aujourd'hui ; l'éditeur de formulaire de B1Admin ne les expose pas encore.

## Pages connexes

- [Routage du site Web et multi-site](./websites) — comment une requête se résout vers une église/un site et comment les domaines personnalisés sont routés
- [Points de terminaison de contenu](../api/endpoints/content) — surface REST complète pour les pages, sections, éléments, blocs, articles, redirections, et paramètres
- [AppHelper](../shared-libraries/app-helper) — le paquet npm qui fournit les moteurs de rendu, le registre, les diviseurs, et les widgets
- [Serveur MCP](../api/mcp) — y compris l'outil de guide `describe_page_builder`
- [Éditeur de page (utilisateur final)](/docs/b1-admin/website/page-editor) — la documentation de l'éditeur destinée au personnel
