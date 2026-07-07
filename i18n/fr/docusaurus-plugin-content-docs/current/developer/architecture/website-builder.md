---
title: "Architecture du constructeur de site Web"
---

# Architecture du constructeur de site Web

<div class="article-intro">

Chaque site web d'église servi par B1App est rendu à partir d'un arbre de contenu — pages, sections, éléments — stocké dans le ContentApi et édité visuellement dans B1Admin. Une bibliothèque de composants partagés rend à la fois l'aperçu de l'éditeur et le site en direct, un catalogue de type d'élément unique définit ce qui peut apparaître sur une page, et un service IA séparé peut générer ou réécrire cet arbre. Cette page mappe toute la pile : le contrat d'élément dans `@churchapps/helpers`, le pipeline de rendu, les éléments de données d'église, les widgets à l'échelle du site, la couche de blog, les pages gated-accès, SEO, la génération IA, et les formulaires conversationnels.

</div>

## Aperçu

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
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ éléments de données d'église
                                                                    ▼
┌──────────────────────────────┐                   ┌─────────────────────────────────────┐
│  AskApi — /website/* (IA)    │             │  /giving/funds/public/…/total           │
│  generateSite · rewriteSection│            │  /membership/groupmembers/public/…      │
│  generateAltText · metaDesc  │             │  /attendance/servicetimes/public/…      │
│  returns JSON; B1Admin saves │             └─────────────────────────────────────────┘
└──────────────────────────────┘
```

Trois règles tiennent dans toute la pile :

1. **Un arbre, deux rendeurs.** Une page est un arbre `pages → sections → éléments` où chaque nœud porte ses paramètres comme un blob JSON `answers`. Les mêmes composants apphelper rendent l'éditeur drag-and-drop dans B1Admin et le site rendu par serveur public dans B1App — il n'y a pas de "format de publication" séparé.
2. **Le contrat vit dans `@churchapps/helpers`.** `ElementTypes.ts` est le catalogue unique des types d'élément ; les rendeurs se résolvent via un registre dans apphelper ; les formulaires de l'éditeur vivent dans B1Admin. Ajouter un type d'élément signifie toucher les trois, dans cet ordre.
3. **Le site public lit les points de terminaison anonymes.** Tout ce que B1App a besoin — l'arbre des pages, les paramètres, les posts de blog, les redirections, et les points de terminaison de données d'église dans d'autres modules — est public. L'authentification est optionnelle : un JWT sur le point de terminaison d'arbre anonyme déverrouille les pages réservées aux membres, rien d'autre ne change.

## L'arbre de contenu

Le module de contenu (`Api/src/modules/content`) possède les données du constructeur :

| Table | Rôle |
|-------|------|
| `pages` | Une page par URL : `url`, `title`, `layout`, plus `visibility`/`groupIds` (gating d'accès) et `metaDescription` (SEO) |
| `sections` | Bandes horizontales sur une page (ou dans un bloc) : arrière-plan, couleur du texte, et un `answersJSON` qui porte le style plus les configurations `dividerTop`/`dividerBottom` diviseur de forme |
| `elements` | Pièces de contenu à l'intérieur d'une section : `elementType` + `answersJSON`, imbriquable pour les types de mise en page (ligne/colonne, carrousel) |
| `blocks` | Groupes de section/élément réutilisables (blocs de pied de page, blocs d'élément) partagés sur les pages |
| `posts` | Métadonnées de blog sur une page de constructeur régulière (voir [Blog](#blog-posts-over-pages)) |
| `redirects` | Par église `fromPath → toPath` paires, plafonnées à 200 (voir [SEO](#seo-and-discoverability)) |
| `settings` | Paramètres d'église clé-valeur ; les lignes marquées `public` sont servies anonymement et portent la configuration de widget/analytics |

L'arbre entier pour une URL revient d'un appel anonyme unique — `GET /content/pages/:churchId/tree?url=/about` — c'est ce que B1App rend par serveur à partir de. Les requêtes de l'éditeur récupèrent par id à la place et gardent les ids internes.

## Le contrat d'élément

### Le catalogue (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` définit chaque type d'élément comme une `ElementTypeDefinition` : `elementType`, `label`, `category`, `schemaVersion`, `defaults`, et un style JSON-schema `answersSchema` pour ses réponses. `validateElementAnswers()` est intentionnellement indulgent — les types inconnus et les clés supplémentaires passent, donc le contenu ancien ne se casse jamais sur une mise à niveau du catalogue. **35 types navire aujourd'hui :**

| Catégorie | Types d'élément |
|----------|---------------|
| mise en page (6) | row, column, box, carousel, whiteSpace, block |
| contenu (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| média (4) | image, gallery, video, map |
| église (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| avancé (2) | rawHTML, iframe |

L'élément `sermons` est le plus configurable des types d'église : une réponse `layout` sélectionne `browse` (le navigateur complet hérité), `grid`, `list`, ou `featuredLatest`, avec `playlistId`, `itemCount`, `showTitles`, et `showDates` raffinage des mises en page non-browse.

### Rendeurs (`@churchapps/apphelper`)

Les rendeurs vivent dans `Packages/apphelper/src/website/components/elementTypes/`, un composant par type, résolu via `ElementRegistry.ts` — une carte à deux couches où `Element.tsx` enregistre le rendeur par défaut pour tous les 35 types (`registerDefaultElementRenderer`) et une application hôte peut substituer certains d'entre eux à l'exécution (`registerElementRenderer`) sans fourcher le package.

### Formulaires d'éditeur (B1Admin)

Les formulaires de paramètres d'éditeur par type vivent dans `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` dispatch à un composant dédié (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) ou un constructeur de champ en ligne par type. Le miroir de ce catalogue face à l'IA est l'outil MCP `describe_page_builder` du API (voir [Serveur MCP](../api/mcp)).

### Diviseurs de forme de section

Les sections peuvent porter les diviseurs de forme décoratives sur le bord. La configuration vit dans le `answersJSON` de la section en tant qu'objets `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` avec `shape` un des `wave, waves, slant, curve, triangle, peaks`. Apphelper navire le composant `SectionDivider` et l'aide `parseDividerConfig()` ; les rendeurs Section des deux applications (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analysent les réponses et montent le diviseur, et `SectionEdit.tsx` dans B1Admin fournit l'IU du sélecteur. Les packages navire seulement le bloc de construction — le câblage au niveau section est la tâche des applications qui les consomment.

## Éléments de données d'église

Trois types d'élément rendent les données en direct de l'église plutôt que le contenu rédigé. L'isolement du module s'applique toujours — chacun appelle le point de terminaison public du module propriétaire à partir du navigateur :

| Élément | Point de terminaison | Notes |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Retourne `{ fundId, totalAmount, donationCount }`, fenêtre `?startDate=&endDate=` optionnelle ; l'élément le compare par rapport à sa réponse `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Opt-in seulement** : le groupe doit avoir `publicRoster` défini (défaut désactivé). La projection est délibérément minimale — `personId`, `displayName`, `leader`, photo — aucun contact ou champ démographique |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Retourne l'arbre campus → service → heure ; le rendeur apphelper émet les JSON-LD schema.org `Event` du meilleur effort à partir de lui (l'API retourne les données brutes) |

:::warning
`publicRoster` est le portail de confidentialité pour `staffGrid`. Ne jamais élargir la projection public du membre du groupe ou contourner le drapeau — le point de terminaison du roster est anonyme par conception et la liste des champs minimalistes est la propriété de sécurité.
:::

## Widgets à l'échelle du site

Deux widgets rendent sur chaque page publique plutôt qu'à l'intérieur de l'arbre : **AnnouncementBanner** (barre de haut de page congédiable) et **Launcher** (hub d'action flottant pour donner/visiter/regarder des liens style). Les deux composants et leurs aides `parse*Config()` navire en apphelper. La configuration est deux lignes de paramètres publics — clés `announcementBanner` et `launcher` — écrites par le `SiteWidgetsEdit` de B1Admin (sur la page Apparence) et lues par la mise en page publique de B1App via `GET /content/settings/public/:churchId`. L'API traite ceux-ci comme des paires clé-valeur opaque ; les noms de clés sont une convention entre les deux applications.

## Blog : posts par-dessus les pages

Le blog est une couche de métadonnées fine, pas un système de contenu seconde. Une ligne `posts` (`title`, `slug`, `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, `tags`) pointe une page de constructeur régulière via `pageId` ; la page détient le corps et est éditée dans l'éditeur de page normal. Surface publique (toute anonyme, `PostController`) :

| Route | Objet |
|-------|---------|
| `GET /content/posts/public/:churchId` | Posts publiés, filtrables par `?category=&tag=`, paginés |
| `GET /content/posts/public/:churchId/slug/:slug` | Métadonnées de post unique |
| `GET /content/posts/rss/:churchId?siteUrl=` | Flux RSS 2.0 |

Un post est "publié" une fois que `publishDate` est défini et passé. B1App sert `/{sdSlug}/blog` (liste, avec le flux RSS annoncé comme un lien alternatif) et `/{sdSlug}/blog/[postSlug]`, qui récupère l'arbre de page de soutien à `/blog/{slug}` et le rend via le même pipeline Zone/Section comme n'importe quelle autre page, ajoutant JSON-LD `BlogPosting`. Les URLs du blog sont incluses dans la sitemap par église. L'IU d'auteur de B1Admin (**Site → Blog**) crée la page de soutien à `/blog/{slug}` et la ligne `posts` ensemble.

## Pages réservées aux membres

`pages.visibility` réutilise l'énumération de liens de navigation — `everyone` (défaut), `visitors`, `members`, `staff`, `team`, `groups` (avec `groupIds`) — mais en tant que **portail d'accès dur**, pas un filtre de navigation (`PageVisibilityHelper.canViewPage`). Le flux :

1. Le point de terminaison d'arbre anonyme vérifie la visibilité sur les récupérations basées sur URL. Les appelants anonymes d'une page fermée obtiennent `{ restricted: true, visibility }` au lieu du contenu — l'arbre ne fuit jamais.
2. Le point de terminaison honore toujours un JWT : `CustomAuthProvider` vérifie l'en-tête `Authorization` sur *chaque* demande, y compris les routes anonymes, pour qu'une récupération de membre authentifié de la même URL se résolve normalement.
3. B1App rend `RestrictedPage` sur une réponse `restricted` : il hydrate la session à partir des identifiants stockés, re-récupère l'arbre avec le JWT, et le rend — ou affiche une porte de connexion avec un `returnUrl` quand il n'y a pas de session.

:::info
La granularité du portail varie par niveau : `groups` vérifie les `groupIds` du jeton par rapport à la liste de la page et `staff` vérifie `membershipStatus`, mais `members` et `team` adoptent actuellement tout utilisateur authentifié de l'église. Traitez `groups` comme l'option stricte.
:::

## SEO et découvrabilité

Tout cela est le rendu côté B1App sur les données ContentApi — l'API stocke, l'application émet :

| Préoccupation | Comment cela fonctionne |
|---------|--------------|
| Descriptions Meta | `pages.metaDescription` (≤300 caractères) coule via `MetaHelper.getMetaData()` dans les `Metadata` Next.js (description + Open Graph) sur chaque route rendue par constructeur. Les paramètres de page de B1Admin incluent un bouton "Générer" IA (voir ci-dessous) |
| Redirects | Lignes `redirects` par église gérées à `/content/redirects` (`content.edit`, plafond de 200 lignes, chemins normalisés). Sur un 404 probable, la route de page de B1App résout le chemin par rapport à `GET /content/redirects/public/:churchId` et émet un HTTP 308 via le Next `permanentRedirect` ; les chemins non-appairés traversent vers `notFound()` |
| Branded 404 | `not-found.tsx` rend `BrandedNotFound` avec le logo de l'église, le nom, et le thème au lieu d'une erreur générique |
| Données structurées | JSON-LD `BlogPosting` sur les posts de blog ; `VideoObject` sur les pages par sermon (`/{sdSlug}/sermons/[sermonId]`) et sur les pages contenant un élément `sermons` ; `Event` à partir des éléments calendrier/événement sur les pages de constructeur ; `Event` schema.org à partir de l'élément `serviceTimes` |
| Pages de sermon | Chaque sermon public reçoit une page rampante à `/sermons/[sermonId]` avec métadonnées complètes — les sermons ne sont plus verrouillés à l'intérieur de l'élément navigateur côté client |
| Analytics | La clé de paramètres publics `ga4MeasurementId` (gérée à côté des redirects dans B1Admin) injecte une gtag GA4 par église via `next/script` |
| Sitemap & feeds | La route `sitemap.xml` par église inclut les pages de constructeur et les URLs de blog ; la liste de blog annonce le flux RSS |
| Accessibilité | Le chrome public rend un lien de saut ciblant le repère `<main id="main-content">` dans chaque enveloppe de mise en page |

## Génération IA (AskApi)

La génération de page et de site court dans **AskApi**, un service séparé, sous le contrôleur `/website`. Elle s'authentifie avec le JWT `CustomAuthProvider` partagé comme tout le reste et est **sans état par rapport au contenu** : chaque point de terminaison retourne JSON et l'appelant (B1Admin) persiste le résultat via ContentApi (`POST /content/pages/temp/ai` sauvegarde un lot page-sections-éléments généré en un appel).

:::info
À partir de 2026-07-03, les points d'entrée de B1Admin à ce pipeline — le modèle de site "IA" dans `AddPageModal`, le bouton de réécriture de `SectionToolbar`, et le bouton "Générer le site" de la liste de pages — sont commentés côté client tandis que la fonctionnalité est retravaillée. Les points de terminaison AskApi ci-dessous ne sont pas affectés et répondent toujours ; seul l'IU B1Admin est caché.
:::

| Point de terminaison | Objet |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Le flux de page à deux étapes original : d'abord l'aperçu, puis un appel par section. Le modèle "IA" de page de B1Admin dans `AddPageModal` pilote ceci — aperçu, puis génération de section parallèle, puis aperçu |
| `POST /website/generateSite` | Génération de site entier. **Deux phases par conception** : un appel `planOnly: true` retourne juste le plan multi-page (un appel modèle rapide), puis le client demande le contenu complet — maintenant chaque demande à l'intérieur du délai d'expiration Lambda/API-Gateway |
| `POST /website/rewriteSection` | Réécriture de structure-préservation : le modèle ne peut que changer les réponses portant du texte. Une signature de structure récursive (ids + types + ordre) est comparée avant et après ; tout désappairage retourne la section d'origine avec `fallback: true` au lieu de structure corrompue |
| `POST /website/generateAltText` | Appel de vision sur jusqu'à 20 URLs d'image ; retourne du texte alt concis (≤125 caractères, préfixes "photo de" supprimés) |
| `POST /website/generateMetaDescription` | Une description meta SEO (≤155 caractères) à partir du contenu texte de la page — filée au bouton Générer sur les paramètres de page de B1Admin |

Les invites sont des fichiers markdown sous `AskApi/config/instructions/`, y compris le catalogue d'élément que le modèle génère à partir de. Deux points de conception gardent le catalogue honnête : le client passe `availableElementTypes` sur chaque demande (l'invite ne peut utiliser que les types de cette liste — le serveur ne code jamais l'ensemble complet), et l'outil MCP `describe_page_builder` du API porte le même guide pour les agents IA travaillant via [MCP](../api/mcp). Les modèles sont Anthropic Claude via OpenRouter — 3.5 Haiku pour le contenu de section (latence), 3.5 Sonnet pour les aperçus, plans de site, et vision — avec un repli OpenAI quand aucune clé OpenRouter n'est configurée.

## Formulaires conversationnels

Les formulaires (module d'adhésion) ont obtenu un mode conversationnel visant les pages de style connect-card. Quatre colonnes sur `forms` le pilotent : `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendu** — apphelper `FormSubmissionEdit` bascule vers le composant `ConversationalForm` (une question à la fois) quand `displayMode` est `conversational` ; la page de formulaire B1App passe le mode par. Même charge de soumission des deux manières.
- **Auto-create person** — sur soumission avec `autoCreatePerson` défini, `ConversationalFormHelper.findOrCreatePerson` dédupe par e-mail (insensible à la casse) et sinon crée un ménage + personne avec `membershipStatus: "Guest"`, puis relie la soumission à cette personne.
- **E-mail de suivi** — quand un sujet et un corps sont définis, le submitter reçoit un e-mail templé (avec tokens `{firstName}` / `{churchName}`) via le chemin transactionnel existant (`TransactionalEmailHelper`), jamais la porte de condensé de notification. Les deux effets secondaires sont non-fatals : une défaillance ne perd jamais la soumission.

Les quatre champs sont définis via l'API aujourd'hui ; l'éditeur de formulaire B1Admin ne les expose pas encore.

## Pages connexes

- [Routage du site Web et multi-site](./websites) — comment une demande se résout à une église/site et comment les domaines personnalisés acheminent
- [Points de terminaison de contenu](../api/endpoints/content) — surface REST complet pour les pages, sections, éléments, blocs, posts, redirections, et paramètres
- [AppHelper](../shared-libraries/app-helper) — le package npm qui navire les rendeurs, le registre, les diviseurs, et les widgets
- [Serveur MCP](../api/mcp) — y compris l'outil de guide `describe_page_builder`
- [Éditeur de page (end-user)](/docs/b1-admin/website/page-editor) — la documentation de l'éditeur face au personnel
