---
title: "Routage des sites Web et multi-sites"
---

# Routage des sites Web et multi-sites

<div class="article-intro">

Une seule église peut désormais servir plus d'un site Web distinct, et chacun peut vivre sur un sous-domaine `*.b1.church` ou sur un domaine entièrement personnalisé appartenant à l'église. Cette page cartographie la couche de routage qui se situe *sous* le constructeur : comment une requête entrante se résout en une église **et** en un site spécifique, le modèle de données multi-sites (le sentinelle `siteId` qui garde chaque site pré-existant s'affichant inchangé), et le bord de domaine personnalisé — un proxy Caddy auto-géré sur EC2 qui termine TLS et réécrit chaque domaine d'église sur son upstream `*.b1.church`. Pour ce qui rend réellement une fois qu'une requête a été résolvue — l'arborescence page/section/élément — voir [Website Builder](./website-builder).

</div>

## Vue d'ensemble

```
   grace.b1.church              www.gracechurch.org  (custom domain)
   (b1.church subdomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy edge — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • terminates TLS (per-domain LE cert)    │
          │             │  • rewrites Host → {sub}.b1.church        │
          │             │  • reverse-proxies to B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • always: delete any client-supplied x-site (anti-spoof)   │
   │  • internal *.b1.church Host ⇒ domains lookup stays inert   │
   │  • raw custom Host (bypassing Caddy) ⇒ lookup → set x-site  │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host first-label → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   threads ?siteId= into every content call:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domain save/delete (B1Admin Settings→Domains → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (wrapped, non-fatal, 10s timeout)
  Caddy reads the domains table itself via two anonymous endpoints:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 known / 404 unknown)
        GET /membership/domains/hostmap    — host→{sub}.b1.church map (5-min refresh)
```

Trois règles tiennent à travers cette couche :

1. **Une sentinelle garde tout compatible en arrière.** `siteId = ''` est le site principal. Chaque page, bloc, lien, style global, et ligne de domaine qui existait avant cette fonctionnalité porte `''` et s'affiche exactement comme avant. Un *deuxième* site Web est simplement un ensemble de lignes avec un `siteId` non vide, et tout appel de point de terminaison de contenu sans `?siteId=` retourne le site principal — octet pour octet l'ancienne requête.
2. **La résolution est basée sur l'étiquette d'hôte et converge.** Un sous-domaine `*.b1.church` route par son étiquette d'hôte directement ; un domaine personnalisé est réécrit sur son étiquette `{sub}.b1.church` au bord Caddy avant que B1App ne le voie (avec une recherche de base de données middleware qui tamponne un en-tête `x-site` comme solution de secours pour tout `Host` personnalisé brut). Les deux jambes atterrissent sur la même route `[sdSlug]` et le même appel `churches/lookup`, donc le rendu en aval est identique.
3. **Le bord Caddy est sans état sur une source de vérité.** Les domaines personnalisés se terminent à un proxy Caddy auto-géré sur EC2 qui réécrit chaque domaine sur son upstream `{sub}.b1.church`. Une sauvegarde de domaine déclenche un seul `CaddyHelper.updateCaddy()` du mieux que possible, et Caddy lit aussi la table `domains` directement (les points de terminaison `authorize` et `hostmap` ci-dessous). Le tableau est autoritaire — un Caddy inaccessible ne peut jamais échouer une sauvegarde.

## Résolution du site

### Sous-domaines `*.b1.church`

`B1App/next.config.mjs` réécrit les requêtes entrantes par hôte. Une règle d'hôte avec le modèle `(?<subdomain>.*?)\..*` capture l'**étiquette de premier** de l'hôte et réécrit `/` et `/:path*` en `/{subdomain}` — le segment App-Router `[sdSlug]`. Donc `grace.b1.church/about` devient `/grace/about`.

À l'intérieur de `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) appelle `GET /membership/churches/lookup/?subDomain={sdSlug}`. La réponse `ChurchController.getBySubDomain` a désormais deux branches :

| Slug correspond à | Réponse | Signification |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Site principal de cette église |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **site secondaire** — le contrôleur bascule sur `sites`, résout l'église propriétaire, et renvoie le slug interrogé plus le `siteId` supplémentaire |

Ce `siteId` supplémentaire est la seule chose qui distingue une requête de site secondaire d'une requête principale ; tout le reste du pipeline est partagé.

### Domaines personnalisés

Un domaine appartenant à une église se termine au **bord Caddy** (détaillé ci-dessous), qui réécrit l'en-tête `Host` en `{sub}.b1.church` du site avant de proxifier vers B1App. Donc sur le chemin normal B1App reçoit un hôte interne `*.b1.church` et le résout par étiquette d'hôte exactement comme un sous-domaine natif — la recherche en base de données du middleware ne déclenche jamais. `src/middleware.ts` s'exécute toujours sur chaque requête, mais avec un travail toujours actif et une solution de secours :

1. **Toujours** — il **supprime n'importe quel en-tête `x-site` fourni par le client**. Cet en-tête est une entrée de réécriture spoofable et n'est jamais approuvé sauf quand le middleware lui-même le définit ; le supprimer est le vrai travail du middleware derrière Caddy.
2. **Recours, `Host` non interne uniquement** — pour un `Host` de domaine personnalisé brut qui atteint B1App *sans* la réécriture de Caddy, il appelle `GET /membership/domains/public/lookup/{host}` et, si cela retourne un `subDomain`, définit `x-site: {subDomain}.b1.church`. Derrière Caddy cette branche est inerte parce que le `Host` est déjà `*.b1.church`.

Les hôtes internes — `localhost`, `b1.church`, et les suffixes `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — ignorent complètement la recherche (ils sont déjà résolus par la réécriture d'étiquette d'hôte, ou sont des hôtes d'aperçu/déploiement).

La recherche elle-même (`DomainRepo.loadByName`) joint à gauche `domains → churches` et `domains → sites` et retourne `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — le sous-domaine du site secondaire assigné si le domaine en pointe un, sinon l'église. Il correspond d'abord à l'hôte exact ; si cet hôte commençait par `www.` et a manqué, il réessaye **une fois** contre l'apex nu.

De retour dans `next.config.mjs`, les règles de réécriture `x-site` sont placées **en avant de** les règles d'hôte génériques, donc elles gagnent. `x-site: grace.b1.church` → première étiquette `grace` → `[sdSlug] = grace`, et à partir de là la résolution est identique au chemin de sous-domaine (même `churches/lookup`, même `siteId`).

:::info
L'en-tête `x-site` n'est pas fiable de l'extérieur. Le middleware supprime inconditionnellement tout `x-site` entrant avant de définir éventuellement le sien, et les règles de réécriture voient uniquement la valeur définie par le middleware — un client ne peut pas se forcer sur le contenu d'une autre église en envoyant un en-tête.
:::

Deux détails opérationnels sur le middleware :

- **Cache.** Le résultat de chaque hôte (un coup *ou* une absence confirmée — jamais une erreur réseau) est mis en cache pendant **10 minutes** dans une `Map` en mémoire, par isolat sans serveur.
- **Matcher.** Le matcher réinclut délibérément `/sitemap.xml`, `/robots.txt`, et `/manifest.webmanifest`. Son premier motif exclut les chemins pointés, qui laisseraient sinon tomber ces fichiers ; ils sont réajoutés afin que les fichiers SEO/PWA par église d'un domaine personnalisé reçoivent aussi l'en-tête `x-site`.
- **En-tête canonique.** Pour les pages d'église, le middleware ajoute une en-tête de réponse `Link: <{proto}://{host}{path}>; rel="canonical"` nommant l'hôte à partir duquel la page a été réellement servie — sous-domaine ou domaine personnalisé (`helpers/canonicalLink.ts`). Il est ignoré sur les hôtes non-église (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) et sur `/mobile`, `/login`, `/logout`, et les fichiers robots/sitemap/manifest générés.

### Site Web public désactivé

Une église peut activer **Disable Public Website** dans B1Admin (paramètre de contenu au niveau de l'église `hidePublicSite = "true"`). Le site ne servira alors que ses itinéraires face aux membres :

- **Le middleware B1App** recherche le sous-domaine (`/membership/churches/lookup` puis `/content/settings/public/:churchId`) et redirige les requêtes anonymes pour tout chemin en dehors de la liste des autorisations vers `/login?returnUrl={path}{query}`. La liste des autorisations (`helpers/publicSite.ts`) est `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, et les fichiers manifest/robots/sitemap. Seules les réponses confirmées sont mises en cache (60 secondes en production, car l'appel de réévaluation de l'administrateur ne peut pas effacer cette carte par instance ; non mis en cache dans dev/test). Une erreur API sert le site plutôt que de verrouiller tout le monde dehors.
- **Les membres connectés voient le site complet.** Une requête portant un cookie `jwt` non expiré (le décodage du middleware du payload `exp` sans vérifier la signature — c'est une porte logicielle, pas du contrôle d'accès) ignore la redirection, donc après connexion un membre retourne à la page qu'il a demandée et voit les pages normales, les pages intégrées (Groupes, Sermons, etc.), et la navigation d'en-tête. Les composants de page et `Header` ne vérifient plus eux-mêmes `hidePublicSite`.
- **`robots.txt`** désapprouve tout, comme sur les hôtes noindex.
- **API.** `GET /content/pages/public/:churchId` (la liste des pages de la carte des sites) retourne `[]`, donc les appelants anonymes ne peuvent pas lister les pages.

### Threading `siteId`

`ConfigHelper` stocke le `siteId` résolu sur sa `ConfigurationInterface` par requête (mémorisée avec React `cache()`) et ajoute `?siteId=` aux appels de contenu qu'il et les composants de page font — **conditionnellement** : un `siteId` vide (un sous-domaine d'église principal) omet le paramètre entièrement. Les points de terminaison filés sont l'arborescence de pages (`/content/pages/:id/tree`), la liste des pages publiques utilisée par la sitemap (`/content/pages/public/:id`), les styles globaux (`/content/globalStyles/church/:id`), les liens de navigation (`/content/links/church/:id`), et le bloc de pied de page autonome (`/content/blocks/public/footer/:id`). Sur le chemin de rendu normal, le pied de page arrive à l'intérieur de l'arborescence de pages (sections balisées `zone: "siteFooter"`), déjà extrait avec `siteId`, donc il n'y a pas d'écart de pied de page non scopé.

Le portail des membres (B1App `mobile`) s'asseoit intentionnellement en dehors de cela : `loadChurchAppearance.ts` résout l'église via `churches/lookup` mais lit les paramètres au niveau de l'église `/settings/public/{id}` et ne file jamais `siteId` — le portail est à l'échelle de l'église en v1 (voir ci-dessous).

## Plusieurs sites Web par église

### Modèle de données

La nouvelle table `membership.sites` est délibérément petite :

| Colonne | Type | Notes |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Église propriétaire |
| `name` | `varchar(255)` | Nom d'affichage (par ex. « Español », « Youth ») |
| `subDomain` | `varchar(45)` | **Unique index** — espace de noms global (ci-dessous) |

La portée du site est alors une seule colonne sans nulls supplémentaires ajoutée aux tableaux de contenu et de domaine :

| Tableau (module) | Colonne | `''` signifie |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Le domaine sert le site principal |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Site principal — et sur **`blocks`**, `''` signifie également *partagé sur tous les sites* |

Deux migrations ajoutent tout cela (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Parce que la colonne est définie par défaut sur `''`, chaque ligne existante garde le comportement d'aujourd'hui sans remplissage.

**Espace de noms de sous-domaine global.** `sites.subDomain` partage *un* espace de noms avec `churches.subDomain` — un sous-domaine de site ne peut jamais heurter un sous-domaine d'église ou un autre site. Ceci est enforced sur **les deux** chemins d'enregistrement : `SiteController.save` rejette un slug qui touche soit `churches` soit `sites`, et `ChurchController.validateSave` fait l'inverse. Un unique index sur `sites.subDomain` le soutient au niveau de la base de données.

**L'unicité des pages** s'est élargie de `(churchId, url)` à `(churchId, siteId, url)`, afin que deux sites d'une église possèdent chacun leur propre `/about`.

### Contenu par site, avec solutions de secours

Chaque point de terminaison de **list/tree** de contenu scopé par site prend un `?siteId=` facultatif (absent ⇒ `''` = principal) : arborescence/liste/public de pages, liste/par-type/pied de page de blocs, liens (anon / filtrés / tous), et styles globaux. Les sections et éléments ne sont *pas* scopés directement — ils héritent via leur page ou bloc parent.

Deux chaînes de résolution font le travail intéressant :

- **Styles globaux — `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` retourne la ligne du site ; si un site secondaire n'en a pas, il retourne la ligne **primaire (`''`) telle quelle** (gardant l'`id`/`siteId` du primaire, que le client utilise pour la copie à l'écriture) ; s'il n'y a pas de primaire non plus, `GlobalStyleController` retourne une palette/polices par défaut codées en dur.
- **Bloc de pied de page — site-spécifique gagne, partagé bascule.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` retourne les lignes partagées (`''`) *et* site-spécifiques ; le resolver choisit le pied de page du site s'il est présent, sinon le partagé. La même logique s'exécute à la fois dans `TreeHelper.insertBlocks` (arborescence de pages) et dans le point de terminaison autonome `/content/blocks/public/footer/:churchId`.

### Cascade de suppression de site

`SiteController.delete` (gated sur la permission Settings→Edit de membership) démonte un site secondaire en trois étapes :

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` met en cascade tout le contenu que le site possède : ses **pages** → leurs sections, éléments, `pageHistory`, et `posts` ; ses propres **blocs** → leurs sections, éléments, et `pageHistory` ; ses **liens** et **globalStyles**. Une garde refuse de s'exécuter pour `''` — la sentinelle primaire/partagée n'est jamais mise en cascade.
2. `DomainRepo.clearSiteId` **réaffecte** les domaines du site au primaire (`siteId → ''`) plutôt que de les supprimer, afin qu'un domaine personnalisé survive une suppression de site.
3. La ligne `sites` est supprimée et les itinéraires Caddy sont resynchronisés (du mieux possible).

### Surface B1Admin

| Capacité | Où | Mécanisme |
|-----------|-------|-----------|
| Sélecteur de site | `useSiteSelection` + `SiteSwitcher` (empty = "Main Website") | Lit un paramètre d'URL `?site=` et le file en tant que `?siteId=` dans les appels ContentApi. Présent sur les trois zones de **liste** de site — **Pages**, **Blocks**, **Appearance** — mais *pas* sur les éditeurs de page/bloc, qui portent `siteId` sur l'enregistrement |
| Créer/supprimer des sites | `SitesDialog`, ouvert à partir de l'entrée « Manage websites… » du sélecteur | `POST /membership/sites` / `DELETE /membership/sites/:id` (nom + subDomain). Gated sur la permission Settings→Edit de membership (`Permissions.settings.edit` côté serveur ; `Permissions.membershipApi.settings.edit` dans B1Admin). **Créer/supprimer uniquement — pas d'interface de renommage en v1** |
| Assignation de site par domaine | `DomainSettingsEdit` sous Settings→Domains | Une liste déroulante de site par ligne envoie `siteId` par domaine à `/membership/domains`. La colonne se cache si l'API ne retourne pas de sites (backend plus ancien) |
| Styles de copie à l'écriture | `StylesManager.prepareForSave` | Quand la ligne de style global chargée `siteId` ne correspond pas au site sélectionné (c.-à-d. l'API a retourné le primaire hérité en tant que solution de secours), elle abandonne l'`id` du primaire et tamponne le `siteId` actuel, forçant une **insertion** d'une nouvelle ligne site-spécifique au lieu de remplacer le primaire. La même fourche-sur-non-concordance s'applique au bloc de pied de page du site |

:::info
**Ce qui reste à l'échelle de l'église en v1 (un choix de portée délibéré, pas une limite de modèle de données) :** le **blog** (`BlogPage` n'a pas de sélecteur et charge `/posts` sans `siteId`), les **widgets de site** (banneau d'annonce + lanceur), les **redirections**, le **logo / GA4 / paramètres d'église**, et le **portail des membres** (B1App mobile). Notez que ce n'est *pas* « tout de l'Appearance » — les styles globaux d'un site secondaire (palette, polices, typographie, espacement, navigation, CSS personnalisé) **sont** par site via le chemin de copie à l'écriture ci-dessus ; seuls les sous-panneaux banneau/lanceur/redirections/logo de la page Appearance restent à l'échelle de l'église.
:::

## Domaines personnalisés : Bord Caddy (plan de configuration statique)

:::info
**Direction révisée 2026-07-02.** Un plan antérieur pour déplacer l'hébergement de domaine personnalisé sur les domaines gérés par Vercel a été **annulé**, et tout le code de domaine Vercel (`VercelHelper`, ses variables d'env `vercelToken`/`vercelProjectId`/`vercelTeamId`, les paramètres SSM, et les entrées de santé) a été supprimé de l'Api. Le proxy Caddy auto-géré sur EC2 **reste** en tant que bord de domaine personnalisé permanent. Le seul travail restant est interne : échanger la configuration d'API d'administration *runtime* de Caddy pour une configuration *statique* qui survit aux redémarrages.
:::

### Le bord

Chaque domaine d'église personnalisé pointe DNS sur une seule boîte EC2 — `3.23.251.61`, également accessible en tant que `proxy.b1.church`. L'écran Settings→Domains de B1Admin indique aux églises d'ajouter une `A → 3.23.251.61` apex ou une `CNAME → proxy.b1.church`. Caddy termine TLS avec un certificat Let's Encrypt par domaine, réécrit l'en-tête `Host` sur l'upstream `{sub}.b1.church` du domaine, et reverse-proxy vers B1App — qui ensuite le route par étiquette d'hôte comme tout sous-domaine natif (voir [Domaines personnalisés](#custom-domains) ci-dessus).

Le mappage en amont provient de `DomainRepo.loadPairs`, dont le sélecteur **COALESCE l'étiquette de sous-domaine du site assigné** afin qu'un domaine proxy vers le *site secondaire* correct, retombant sur l'église primaire :

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Les lignes `www.*` sont exclues de la carte ; Caddy sert `www.{host}` via une redirection `302` vers l'apex à la place.

### Deux points de terminaison anonymes alimentent le bord

`DomainController` expose deux points de terminaison non authentifiés en lecture seule que la boîte consomme directement — anonyme par nécessité, puisque le bord les interroge avant que n'existe un contexte d'église :

| Point de terminaison | Retours | Rôle |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` si le domaine — ou, pour une absence `www.`, son apex nu — existe dans `domains` ; `404` sinon (y compris un `domain` vide) | **`ask`** TLS à la demande de Caddy : le contrôle d'abus décidant s'il faut émettre un certificat pour une SNI entrante |
| `GET /membership/domains/hostmap` | `text/plain`, une ligne `{domain} {sub}.b1.church` triée par domaine routable | Fichier map d'hôte→upstream que la boîte actualise sur un minuteur |

`authorize` réutilise `DomainRepo.loadByName` (hôte exact, puis une seule réessai `www.`→apex) ; `hostmap` réutilise `loadPairs` — donc il est conscient du site et exclu `www.*`, identique aux itinéraires proxy — et supprime simplement le suffixe `:443`.

### Sauvegarde/suppression de domaine — un push du mieux possible

`DomainController.save` écrit les lignes `domains` puis fait un unique `CaddyHelper.updateCaddy()` **du mieux possible**, enveloppé dans un `try/catch` qui enregistre (`console.error`) et avale ; `delete` fait pareil (ce qui a aussi corrigé un bug de route obsolète antérieur), comme le fait la suppression du site secondaire (`SiteController.delete`). `updateCaddy` lui-même est limité par un **timeout de 10s** Axios, donc un Caddy inaccessible ou arrêté ne peut jamais `500` une sauvegarde de domaine — la table `domains` est la source de vérité.

### État actuel — configuration statique, pas d'état runtime

La boîte (Windows EC2 derrière l'IP Elastic permanente) exécute Caddy à partir d'un **Caddyfile statique** : TLS à la demande dont `ask` pointe sur `/membership/domains/authorize`, plus un fichier map d'hôte→upstream actualisé toutes les 5 minutes à partir de `/membership/domains/hostmap` par une tâche programmée qui se termine dans un `caddy reload` gracieux. La configuration survit aux redémarrages avec zéro état runtime — pas de danse de ré-amorçage — et une SNI inconnue est **refusée TLS** (aucun certificat n'est frappé pour un hôte qu'`authorize` rejette), tandis qu'un hôte autorisé mais pas encore mappé (un domaine tout nouveau dans la fenêtre de synchronisation) obtient un 404 propre. Les nouveaux domaines deviennent routable dans ~5 minutes d'une sauvegarde ; leurs certificats sont frappés au premier coup. Build/setup, opérations, et pièges testés sur le terrain : [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Poussée runtime héritée — chemin de retour, en attente de suppression

`CaddyHelper` (module d'adhésion) peut toujours conduire Caddy via son **API d'administration** à `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort` ; pas-op quand non défini ; surfacé sous le groupe Integrations de `ServerHealthController`) : `updateCaddy()` PATCH un tableau de routes complet, et `initializeCaddy()` + les points de terminaison `/membership/domains/caddy/init` / `/membership/domains/caddy` du `GET` reconstruisent un serveur configuré au runtime à partir de zéro. Le mode de cette config a vécu seulement dans la mémoire de Caddy — l'amnésie de redémarrage que cette architecture a remplacée. La machinerie reste uniquement en tant que chemin de retour et est programmée pour suppression une fois que la boîte statique s'est avérée stable ; la poussée `updateCaddy()` du mieux possible sur save/delete de domaine est une pas-op inoffensive contre la boîte statique (son API d'administration est localhost-only).

## Pages connexes

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — la boîte du bord elle-même : setup de boîte fraîche, service WinSW, tâche de synchronisation des cartes, et pièges opérationnels
- [Website Builder](./website-builder) — l'arborescence page/section/élément, les moteurs de rendu, le blog, le SEO, et la génération d'IA (ce qui rend une fois qu'une requête a été résolvue en église/site)
- [Content Endpoints](../api/endpoints/content) — la surface REST pour les pages, les blocs, les liens, et les styles globaux, tous maintenant conscients de `?siteId=`
- [B1App](../web-apps/b1-app) — l'application Next.js qui héberge le middleware et le routage `[sdSlug]`
- [Web App Deployment](../deployment/web-apps) — comment B1App est déployé sur Vercel
