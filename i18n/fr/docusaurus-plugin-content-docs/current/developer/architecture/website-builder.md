---
title: "Architecture du générateur de sites web"
---

# Architecture du générateur de sites web

<div class="article-intro">

Chaque site web d'église servi par B1App est rendu à partir d'une arborescence de contenu — pages, sections, éléments — stockée dans ContentApi et modifiée visuellement dans B1Admin. Une bibliothèque de composants partagée rend à la fois l'aperçu de l'éditeur et le site en direct, un catalogue de types d'éléments unique définit ce qui peut apparaître sur une page, et un service IA distinct peut générer ou réécrire cette arborescence. Cette page cartographie toute la pile : le contrat d'élément dans `@churchapps/helpers`, le pipeline de rendu, les éléments de données d'église, les widgets à l'échelle du site, la couche blog, les pages avec accès restreint, l'optimisation pour les moteurs de recherche, la génération par IA et les formulaires conversationnels.

</div>

## Présentation générale

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

Trois règles s'appliquent dans toute la pile :

1. **Un arbre, deux moteurs de rendu.** Une page est une arborescence `pages → sections → éléments` où chaque nœud porte ses paramètres sous forme d'un blob JSON `answers`. Les mêmes composants apphelper rendent l'éditeur par glisser-déposer dans B1Admin et le site rendu côté serveur en public dans B1App — il n'y a pas de « format de publication » distinct.
2. **Le contrat vit dans `@churchapps/helpers`.** `ElementTypes.ts` est le catalogue unique des types d'éléments ; les moteurs de rendu se résolvent via un registre dans apphelper ; les formulaires de l'éditeur vivent dans B1Admin. Ajouter un type d'élément signifie toucher tous les trois, dans cet ordre.
3. **Le site public lit les points de terminaison anonymes.** Tout ce dont B1App a besoin — l'arborescence des pages, les paramètres, les articles de blog, les redirections et les points de terminaison de données d'église dans d'autres modules — est public. L'authentification est facultative : un JWT sur le point de terminaison d'arborescence anonyme déverrouille les pages réservées aux membres, rien d'autre ne change.

## L'arborescence du contenu

Le module contenu (`Api/src/modules/content`) possède les données du générateur :

| Table | Rôle |
|-------|------|
| `pages` | Une page par URL : `url`, `title`, `layout`, plus `visibility`/`groupIds` (gating d'accès) et `metaDescription` (optimisation pour les moteurs de recherche) |
| `sections` | Bandes horizontales sur une page (ou dans un bloc) : couleur de fond, couleur du texte et un `answersJSON` qui porte les styles plus les configurations de diviseur de forme `dividerTop`/`dividerBottom` |
| `elements` | Éléments de contenu à l'intérieur d'une section : `elementType` + `answersJSON`, imbriquable pour les types de disposition (rangée/colonne, carrousel) |
| `blocks` | Groupes de section/élément réutilisables (blocs de pied de page, blocs d'élément) partagés entre les pages |
| `posts` | Articles de blog autonomes (voir [Blog](#blog)) |
| `redirects` | Paires `fromPath → toPath` par église, limitées à 200 (voir [Optimisation pour les moteurs de recherche et découvrabilité](#seo-and-discoverability)) |
| `settings` | Paramètres d'église clé-valeur ; les lignes marquées `public` sont servies anonymement et portent la configuration du widget/analytique |

L'arborescence entière pour une URL revient d'un seul appel anonyme — `GET /content/pages/:churchId/tree?url=/about` — c'est ce que B1App rend côté serveur. Les demandes de l'éditeur récupèrent par id à la place et conservent les ids internes.

## Le contrat d'élément

### Le catalogue (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` définit chaque type d'élément en tant que `ElementTypeDefinition` : `elementType`, `label`, `category`, `schemaVersion`, `defaults` et un `answersSchema` de style JSON-schema pour ses réponses. `validateElementAnswers()` est intentionnellement indulgent — les types inconnus et les clés supplémentaires passent, donc le contenu ancien ne se casse jamais lors d'une mise à niveau du catalogue. **35 types se livrent aujourd'hui :**

| Catégorie | Types d'éléments |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

L'élément `sermons` est le plus configurable des types d'église : une réponse `layout` sélectionne `browse` (l'ancien navigateur complet), `grid`, `list` ou `featuredLatest`, avec `playlistId`, `itemCount`, `showTitles` et `showDates` affinant les dispositions sans navigation.

### Moteurs de rendu (`@churchapps/apphelper`)

Les moteurs de rendu vivent dans `Packages/apphelper/src/website/components/elementTypes/`, un composant par type, résolu via `ElementRegistry.ts` — une carte à deux niveaux où `Element.tsx` enregistre le moteur de rendu par défaut pour les 35 types (`registerDefaultElementRenderer`) et une application hôte peut remplacer n'importe lequel d'entre eux au moment de l'exécution (`registerElementRenderer`) sans forker le package.

### Formulaires de l'éditeur (B1Admin)

Les formulaires de paramètres de l'éditeur par type vivent dans `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` dispatche vers un composant dédié (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) ou un constructeur de champ en ligne par type. Le miroir face à l'IA de ce catalogue est l'outil MCP `describe_page_builder` de l'API (voir [Serveur MCP](../api/mcp)).

### Diviseurs de forme de section

Les sections peuvent porter des diviseurs de forme décoratifs sur chaque bord. La configuration vit dans le `answersJSON` de la section sous `dividerTop` / `dividerBottom` objets — `{ shape, color, height, flip }` avec `shape` étant l'un de `wave, waves, slant, curve, triangle, peaks`. Apphelper livre le composant `SectionDivider` et l'assistant `parseDividerConfig()` ; les moteurs de rendu Section des deux applications (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analysent les réponses et montent le diviseur, et `SectionEdit.tsx` dans B1Admin fournit l'interface utilisateur du sélecteur. Les packages ne livrent que le bloc de construction — le câblage au niveau de la section est le travail des applications consommatrices.

## Éléments de données d'église

Trois types d'éléments rendent des données d'église en direct plutôt que du contenu créé. L'isolation des modules s'applique toujours — chacun appelle le point de terminaison public du module propriétaire depuis le navigateur :

| Élément | Point de terminaison | Notes |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Retourne `{ fundId, totalAmount, donationCount }`, fenêtre `?startDate=&endDate=` facultative ; l'élément la compare à sa réponse `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Adhésion uniquement** : le groupe doit avoir `publicRoster` défini (désactivé par défaut). La projection est volontairement minimale — `personId`, `displayName`, `leader`, photo — aucun champ de contact ou démographique |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Retourne l'arborescence campus → service → heure ; le moteur de rendu apphelper émet le JSON-LD schema.org `Event` au mieux de ses capacités (l'API retourne des données simples) |

:::warning
`publicRoster` est le contrôle de confidentialité pour `staffGrid`. Ne jamais élargir la projection du groupe public ou ignorer l'indicateur — le point de terminaison de la liste est anonyme par conception et la liste minimale de champs est la propriété de sécurité.
:::

## Widgets à l'échelle du site

Deux widgets se rendent sur chaque page publique plutôt qu'à l'intérieur de l'arborescence : **AnnouncementBanner** (barre de haut de page renvoyable) et **Launcher** (hub d'action flottant pour les liens de style give/visit/watch). Les deux composants et leurs assistants `parse*Config()` se livrent dans apphelper. La configuration est deux lignes de paramètres publics — clés `announcementBanner` et `launcher` — écrites par `SiteWidgetsEdit` de B1Admin (sur la page Appearance) et lues par la disposition publique de B1App via `GET /content/settings/public/:churchId`. L'API traite ceux-ci comme des paires clé-valeur opaques ; les noms de clés sont une convention entre les deux applications.

## Blog

Le blog est un type de contenu autonome, pas une couche sur les pages du générateur. Une ligne `posts` contient l'intégralité du message : `title`, `slug`, `excerpt`, `content` (corps markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Surface publique (toutes anonymes, `PostController`) :

| Route | Objectif |
|-------|---------|
| `GET /content/posts/public/:churchId` | Messages publiés, filtrables par `?category=&tag=`, paginés |
| `GET /content/posts/public/:churchId/categories` | Catégories distinctes entre les messages publiés |
| `GET /content/posts/public/:churchId/slug/:slug` | Un message publié |
| `GET /content/posts/rss/:churchId?siteUrl=` | Flux RSS 2.0, intitulé avec le nom de l'église, avec catégorie par article et description d'extrait ou de contenu |

Un message est « publié » une fois que `publishDate` est défini et passé ; un `publishDate` futur est un message programmé (masqué publiquement, montré avec une puce Programmé dans l'administrateur). Les points de terminaison de lecture enrichissent chaque message avec `authorName`, résolu de `authorId` via la passerelle du module d'adhésion. Les extraits manquants reviennent au contenu markdown dépouillé (~160 caractères) dans les cartes de liste, les méta-descriptions et RSS. B1App sert `/{sdSlug}/blog` — une liste éditoriale (en-tête centré qui devient le nom de catégorie/balise actif en cas de filtrage, rangée de filtre de puce de catégorie, lignes de message miniatures-à-gauche avec signatures et extraits) avec le flux RSS annoncé comme lien alternatif — et `/{sdSlug}/blog/[postSlug]`, un itinéraire dédié (pas le pipeline Zone/Section) avec un en-tête centré (kicker de catégorie, titre, signature, règle d'accent de couleur principale), un héros 16:9 à la largeur du conteneur, le corps markdown dans une colonne de lecture ~720px, des puces d'étiquette dans le pied de page de l'article, une bande de messages connexes `"Plus en {category}"` et `BlogPosting` JSON-LD incluant l'auteur. Les deux pages se stylisent entièrement à partir de jetons de thème pour qu'elles héritent de la palette de chaque église. Les URL de blog sont incluses dans la carte du site par église. L'interface utilisateur de création de B1Admin (**Site → Blog**) modifie les messages dans une boîte de dialogue : éditeur markdown avec basculement d'aperçu, sélecteur d'image de galerie recadrée 16:9, sélecteur de personne auteur (par défaut l'utilisateur en édition), complétion automatique de catégorie semée à partir de catégories existantes, validation d'URL en double et basculement de publication ; les lignes publiées se connectent au message en direct et la page pousse les administrateurs à ajouter un lien de navigation `/blog`.

## Pages réservées aux membres

`pages.visibility` réutilise l'énumération des liens de navigation — `everyone` (défaut), `visitors`, `members`, `staff`, `team`, `groups` (avec `groupIds`) — mais en tant que **portail d'accès dur**, pas un filtre de navigation (`PageVisibilityHelper.canViewPage`). Le flux :

1. Le point de terminaison d'arborescence anonyme vérifie la visibilité sur les récupérations basées sur l'URL. Les appelants anonymes d'une page contrôlée obtiennent `{ restricted: true, visibility }` au lieu du contenu — l'arborescence ne fuit jamais.
2. Le point de terminaison honore toujours un JWT : `CustomAuthProvider` vérifie l'en-tête `Authorization` sur *chaque* demande, y compris les routes anonymes, donc une récupération authentifiée d'un membre de la même URL se résout normalement.
3. B1App rend `RestrictedPage` sur une réponse `restricted` : il hydrate la session à partir des identifiants stockés, récupère l'arborescence avec le JWT et la rend — ou affiche un portail de connexion avec un `returnUrl` quand il n'y a pas de session.

:::info
La granularité du portail varie selon le niveau : `groups` vérifie `groupIds` du jeton contre la liste de la page et `staff` vérifie `membershipStatus`, mais `members` et `team` acceptent actuellement tout utilisateur authentifié de l'église. Traitez `groups` comme l'option stricte.
:::

## Optimisation pour les moteurs de recherche et découvrabilité

Tout cela est le rendu côté B1App sur les données ContentApi — l'API stocke, l'application émet :

| Préoccupation | Comment ça marche |
|---------|--------------|
| Méta-descriptions | `pages.metaDescription` (≤300 caractères) s'écoule via `MetaHelper.getMetaData()` dans les métadonnées Next.js `Metadata` (description + Open Graph) sur chaque route rendue par le générateur. Les paramètres de page de B1Admin incluent un bouton IA « Générer » (voir ci-dessous) |
| Redirections | Lignes `redirects` par église gérées à `/content/redirects` (`content.edit`, limite de 200 lignes, chemins normalisés). Sur une 404 qui s'ensuivrait, la route de page de B1App résout le chemin contre `GET /content/redirects/public/:churchId` et émet un HTTP 308 via le `permanentRedirect` de Next ; les chemins non correspondants passent par `notFound()` |
| 404 de marque | `not-found.tsx` rend `BrandedNotFound` avec le logo, le nom et le thème de l'église au lieu d'une erreur générique |
| Données structurées | `BlogPosting` JSON-LD sur les articles de blog ; `VideoObject` sur les pages par sermon (`/{sdSlug}/sermons/[sermonId]`) et sur les pages contenant un élément `sermons` ; `Event` à partir d'éléments calendrier/événement sur les pages du générateur ; `Event` schema.org à partir de l'élément `serviceTimes` |
| Pages de sermon | Chaque sermon public reçoit une page analysable à `/sermons/[sermonId]` avec des métadonnées complètes — les sermons ne sont plus verrouillés dans l'élément navigateur côté client |
| Analytique | La clé des paramètres publics `ga4MeasurementId` (gérée à côté des redirections dans B1Admin) injecte un gtag GA4 par église via `next/script` |
| Plan du site et flux | La route `sitemap.xml` par église inclut les pages du générateur et les URL de blog ; l'annonce de la liste de blog flux RSS |
| Accessibilité | Le chrome public rend un lien de saut ciblant le repère `<main id="main-content">` dans chaque emballage de disposition |

## Génération par IA (AskApi)

La génération de page et de site s'exécute dans **AskApi**, un service distinct, sous le contrôleur `/website`. Il s'authentifie avec le même JWT `CustomAuthProvider` que tout le reste et est **sans état par rapport au contenu** : chaque point de terminaison retourne JSON et l'appelant (B1Admin) persiste le résultat via ContentApi (`POST /content/pages/importTree` crée une page avec son arborescence complète de section/élément imbriquée en un appel ; il insère toujours sous l'église de l'appelant et ignore les ids dans le corps).

### Génération de page (`planPage` → `writePage`)

Le modèle « IA » de page dans `AddPageModal` de B1Admin utilise un pipeline à faible coût (`AskApi/src/helpers/SiteGenHelper.ts`) construit sur une règle : **aucun modèle n'émet jamais de JSON du générateur**. Deux modèles partagent le travail via la passerelle IA Vercel (HTTP simple, clé SSM `/{env}/aiGatewayApiKey` ou `AI_GATEWAY_API_KEY`) :

- **JEV** (`typesafe-ai/jev`) — un modèle de décision typée qui retourne des choix, des scores et des booléens avec des probabilités mais ne peut pas écrire de texte. Il choisit chaque section à tour de rôle à partir d'une bibliothèque de modèles fixes, évalue les dispositions, vérifie les faits et choisit des photos et des icônes de base. Les coûts d'entrée sont d'environ 0,04 $ par million de jetons et la sortie est gratuite, donc ~90 appels par page coûtent une fraction de cent.
- **Un petit modèle de chat (GPT-4.1 mini par défaut)** — remplit les emplacements de texte nommés et limités en longueur des modèles choisis. L'écrivain est une constante, remplaçable avec la variable d'environnement `SITEGEN_COPY_MODEL` (n'importe quel id de modèle de chat sur la passerelle, par exemple `anthropic/claude-haiku-4.5`). Dans un test aveugle côte à côte sur trois églises Claude Haiku 4.5 lisait légèrement plus chaud, mais GPT-4.1 mini était proche, environ 4 fois moins cher et plus rapide, donc c'est le défaut. Une page complète avec les trois dispositions coûte environ 1,3 cents, environ 80 % du coût de l'écrivain.

| Phase | Point de terminaison | Ce qui se passe |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Classe le type de page (accueil, visite, à propos…), puis échantillonne 10 dispositions de candidats à partir des probabilités par tour de JEV (héros + comptage des sections → chaque section → plus proche), déduplique, fait que JEV évalue chacun pour l'ajustement/flux/lacunes et retourne les 3 premiers plus une voix d'écriture et un `suggestedStyle` (palette + polices). Les candidats qui partagent les mêmes sections jusqu'à présent posent une question identique à JEV, donc les tours sont mémorisés par préfixe. Un meilleur score sous 6 est enregistré sous `lowLayoutScore` — ce journal est l'arriéré des modèles à ajouter. ~2s |
| 2 | `POST /website/writePage` (un appel par candidat) | L'écrivain remplit la copie de l'emplacement deux sections par appel, en parallèle, et retourne cinq titres de héros que JEV choisit entre ; JEV vérifie chaque section ; les sections qui échouent, utilisent une phrase de base ou redisent une section antérieure (exécutions partagées de 4 mots, vérifiées en code) sont réécrites en parallèle avec la raison spécifique ; un nettoyage du code supprime les phrases avec des expressions du site d'église standard (sauf si la description de l'église elle-même les utilise) ; JEV choisit les sujets de photos, les icônes et le diviseur de forme du héros, et évalue le résultat. Retourne une arborescence de section prête à enregistrer et un score. ~6–9s |
| 3 | `POST /content/pages/importTree` | B1Admin écrit uniquement la disposition la mieux classée (la finaliste est une alternative en cas d'échec de cette écriture), l'enregistre et ouvre l'aperçu (~10s après Enregistrer) |

Chaque phase est sa propre demande pour que chaque appel reste à l'intérieur de la limite de 29 secondes de la passerelle API. Les modèles dans `SiteGenHelper.buildTree` sont des arborescences de section + élément fixes à partir du catalogue (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) et référencent des jetons de thème (`var(--accent)`, `var(--lightAccent)`…), donc les pages générées héritent des paramètres d'apparence existants de l'église. Ajouter un modèle de section signifie ajouter sa liste d'emplacement à `SECTIONS` et son arborescence à `buildTree` ; le test unitaire parcourt chaque modèle et valide l'arborescence.

**Entrées.** La copie ne peut déclarer que des faits de deux sources : ce que l'utilisateur a tapé et `churchContext.facts` — les registres que B1Admin rassemble avant la planification (heures de service publiques et noms de groupes publics, plus le nom et l'adresse de l'église). Les mêmes indicateurs gating des modèles soutenus par les données : `times` rend l'élément `serviceTimes` en direct quand l'église conserve les heures de service dans B1 (tableau typé autrement), `groups` et `countdown` ne sont proposés que quand il y a des données derrière eux. Les appels JEV sont couverts — un doublon se déclenche après 1,5 s et la première réponse gagne — car la passerelle perd parfois patience et les appels sont presque gratuits.

**Rester sur le sujet.** L'invite de l'utilisateur est le *sujet de la page*, pas le contexte de l'église. `planPage` classe la demande (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), et pour les pages `event` et `topic` les modèles généraux d'église (note du pasteur, sermons, ministères, groupes, impact communautaire, heures hebdomadaires et compte à rebours, héros vidéo) ne sont même pas proposés, tandis que `details` (quand / où / quoi apporter) et un `eventCountdown` date. Les deux juges évaluent la pertinence. B1Admin passe `pageType` du plan dans chaque appel `writePage`.

**Pages complètes à partir de demandes courtes.** Les pages ont de trois à six sections du milieu, des longueurs d'emplacement généreuses, une ligne d'intro sur les sections de carte et une FAQ à cinq questions, et la passe de réparation étend toute section qui revient mince. La génération est un clic : il n'y a pas de questions de suivi. Lorsque la demande omet un détail ordinaire qu'une page complète a besoin (une heure de début, une salle, quoi apporter, comment s'inscrire), l'écrivain le remplit avec un choix modeste et plausible pour que l'église modifie. Parce que les sections sont écrites en parallèle, ces lacunes sont décidées **une seule fois**, dans `planPage` (`assumedDetails`, un petit appel d'écrivain qui s'exécute aux côtés de l'échantillonnage de mise en page), et réintroduites dans chaque appel `writePage` via `churchContext.assumedDetails`, donc une section ne peut pas dire 5:00 tandis qu'une autre dit 5:30. JEV répare toute section qui contredit la demande, les dossiers de l'église ou les détails décidés. Les détails décidés ne sont pas surfacés dans l'interface utilisateur ; l'église examine et modifie la page comme n'importe quelle autre. Certaines choses ne sont jamais inventées : noms de personnes, numéros de téléphone, adresses e-mail et Web, prix, statistiques, l'histoire de l'église, citations attribuées à des personnes et un jour de la semaine pour une date que la demande n'en a pas fourni une.

**Visuels.** Les modèles ne nomment jamais leurs photos ou icônes. Ils laissent des emplacements ouverts, et une passe générique (`visualSlots` → `pickVisuals` → `applyVisuals` dans `SiteGenHelper`) parcourt l'arborescence finie et remplit chacun : un fond de section ou une entrée de galerie marquée `auto:photo`, un `auto:icon`, le `auto:divider` du héros et, sans marqueur du tout, n'importe quel `textWithPhoto`, `card` ou élément `image` dont `photo` est vide. JEV choisit chacun à partir du texte à côté (une photo de carte à partir du titre et du texte de cette carte ; un arrière-plan à partir de la copie de la section), sans sujet répété sur une page. Un nouveau modèle obtient donc des photos gratuitement. Les photos sont des sujets de recherche Pexels émis en tant que placeholders `pexels:<term>` que B1Admin résout via `POST /content/stock/search` ; un client qui n'envoie pas `resolvesPhotos` obtient une image de héros intégrée, des bandes colorées plates et des cartes sans photo à la place. Il n'y a délibérément pas de sujets de portrait et le modèle de pasteur ne porte pas de photo : un étranger de base ne doit jamais se tenir à la place d'une vraie personne. Pour une église sans pages, B1Admin applique `suggestedStyle` aux styles mondiaux ; les sites existants gardent leur apparence.

### Autres points de terminaison

:::info
Le bouton réécrire `SectionToolbar` et le bouton « Générer le site » de la liste des pages dans B1Admin restent commentés côté client. Les points de terminaison AskApi ci-dessous répondent toujours ; seulement cette interface utilisateur est masquée.
:::

| Point de terminaison | Objectif |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Le flux de page original à deux étapes (contour, puis un appel LLM par section émettant un JSON d'élément). Remplacé dans B1Admin par `planPage`/`writePage` en raison du coût ; conservé pour les consommateurs d'API |
| `POST /website/generateSite` | Génération de site complet. **Deux phases par conception** : un appel `planOnly: true` retourne uniquement le plan multi-page (un appel de modèle rapide), puis le client demande le contenu complet — en gardant chaque demande à l'intérieur du délai d'expiration Lambda/API-Gateway |
| `POST /website/rewriteSection` | Réécriture de structure de préservation : le modèle ne peut modifier que les réponses portant du texte. Une signature de structure récursive (ids + types + commande) est comparée avant et après ; toute non-correspondance retourne la section d'origine avec `fallback: true` au lieu de structure corrompue |
| `POST /website/generateAltText` | Appel de vision sur jusqu'à 20 URL d'image ; retourne un texte alt concis (≤125 caractères, préfixes « photo de » supprimés) |
| `POST /website/generateMetaDescription` | Une méta-description SEO (≤155 caractères) à partir du contenu textuel de la page — câblée au bouton Générer sur les paramètres de page de B1Admin |

Les invites pour ces points de terminaison sont des fichiers markdown sous `AskApi/config/instructions/`, y compris le catalogue d'éléments que le modèle génère à partir de. Deux points de conception gardent le catalogue honnête : le client passe `availableElementTypes` à chaque demande (l'invite ne peut utiliser que des types de cette liste — le serveur ne code jamais l'ensemble complet) et l'outil MCP `describe_page_builder` de l'API porte le même guide pour les agents IA travaillant via [MCP](../api/mcp). Les modèles sont Claude Anthropic via OpenRouter — 3.5 Haiku pour le contenu de section (latence), 3.5 Sonnet pour les contours, les plans de site et la vision — avec un retour OpenAI quand aucune clé OpenRouter n'est configurée.

## Formulaires conversationnels

Les formulaires (module d'adhésion) ont gagné un mode conversationnel destiné aux pages de style carte de connexion. Quatre colonnes sur `forms` le conduisent : `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendu** — `FormSubmissionEdit` d'apphelper bascule au composant `ConversationalForm` (une question à la fois) quand `displayMode` est `conversational` ; le formulaire de page de B1App passe le mode. Même charge utile de soumission de chaque façon.
- **Création automatique de personne** — en soumission avec `autoCreatePerson` défini, `ConversationalFormHelper.findOrCreatePerson` déduplique par e-mail (insensible à la casse) et crée autrement un ménage + personne avec `membershipStatus: "Guest"`, puis lie la soumission à cette personne.
- **E-mail de suivi** — quand un sujet et un corps sont définis, le soumetteur reçoit un e-mail basé sur un modèle (avec les jetons `{firstName}` / `{churchName}`) via le chemin transactionnel existant (`TransactionalEmailHelper`), jamais la porte du digest de notification. Les deux effets secondaires sont non fatals : un échec ne perd jamais la soumission.

Les quatre champs sont définis via l'API aujourd'hui ; l'éditeur de formulaire B1Admin ne les expose pas encore.

## Cache du site public

Le chemin de rendu public de B1App met en cache les récupérations étiquetées par église (`next: { revalidate: 300, tags: [sdSlug] }` en production ; `0` en dev) donc une page en direct peut rester obsolète jusqu'à cinq minutes après une écriture ContentApi. `POST /api/revalidate/{sdSlug}` sur B1App appelle `revalidateTag(sdSlug)` et est le seul moyen de déposer ce cache tôt.

Deux écrivains le frappent :

1. **B1Admin** — `clearSiteCache()` dans `B1Admin/src/site/siteCache.ts` POSTs après la sauvegarde de l'éditeur. Il préfère le sous-domaine du site actif (un site secondaire doit faire sauter *ce* tag, pas le défaut de l'église).
2. **Api** — Les mutations de contenu qui ne passent jamais par B1Admin (clés API, MCP, IA) tirent `SiteCacheHelper.bump(churchId)` des contrôleurs de contenu. L'assistant résout le sous-domaine de l'église via `SubDomainHelper` et POSTs `{b1AppRoot}/api/revalidate/{sd}`. Les défaillances sont avalées pour qu'une B1App inaccessible ne puisse pas échouer une sauvegarde.

Les contrôleurs qui heurtent : pages (enregistrer, supprimer, dupliquer, publier, ignorer, dépublier, IA temp), sections, éléments, blocs, liens, styles mondiaux, messages et redirections. Dev `b1AppRoot` est `http://{subdomain}.localtest.me:3301` ; démo/staging/prod utiliser `https://{subdomain}.b1.church`.

## Pages connexes

- [Routage du site et Multi-Site](./websites) — comment une demande se résout à une église/site et comment les domaines personnalisés s'acheminent
- [Points de terminaison du contenu](../api/endpoints/content) — surface REST complète pour les pages, sections, éléments, blocs, messages, redirections et paramètres
- [AppHelper](../shared-libraries/app-helper) — le package npm qui livre les moteurs de rendu, le registre, les diviseurs et les widgets
- [Serveur MCP](../api/mcp) — y compris l'outil `describe_page_builder` guide
- [Éditeur de page (utilisateur final)](/docs/b1-admin/website/page-editor) — la documentation de l'éditeur face aux personnels
