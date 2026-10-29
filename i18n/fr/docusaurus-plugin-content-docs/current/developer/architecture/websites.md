---
title: "Routage du site web et multi-sites"
---

# Routage du site web et multi-sites

<div class="article-intro">

Une seule église peut maintenant servir plus d'un site web distinct, et chacun peut vivre sur un sous-domaine `*.b1.church` ou sur un domaine personnalisé entièrement propre à l'église. Cette page présente la couche de routage située *sous* le constructeur : comment une requête entrante se résout en une église **et** en un site précis, le modèle de données multi-sites (la valeur sentinelle `siteId` qui maintient le rendu de chaque site déjà existant inchangé), et la périphérie des domaines personnalisés -- un proxy Caddy auto-géré sur EC2 qui termine le TLS et réécrit chaque domaine d'église vers son amont `*.b1.church`. Pour ce qui est effectivement rendu une fois la requête résolue -- l'arbre pages/sections/éléments -- consultez [Constructeur de site web](./website-builder).

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

Trois règles valent pour cette couche :

1. **Une sentinelle préserve la compatibilité.** `siteId = ''` désigne le site principal. Chaque page, bloc, lien, style global et ligne de domaine qui existait avant cette fonctionnalité porte `''` et s'affiche exactement comme avant. Un *deuxième* site web est simplement un ensemble de lignes avec un `siteId` non vide, et tout point de terminaison de contenu appelé sans `?siteId=` renvoie le site principal -- exactement la même requête qu'avant.
2. **La résolution repose sur l'étiquette de l'hôte et converge.** Un sous-domaine `*.b1.church` s'achemine directement par son étiquette d'hôte ; un domaine personnalisé est réécrit vers son étiquette `{sub}.b1.church` à la périphérie Caddy avant que B1App ne le voie (avec une recherche en base de données dans le middleware qui pose un en-tête `x-site` en repli pour tout `Host` personnalisé brut). Les deux voies aboutissent à la même route `[sdSlug]` et au même appel `churches/lookup`, de sorte que le rendu en aval est identique.
3. **La périphérie Caddy est sans état, avec une seule source de vérité.** Les domaines personnalisés se terminent sur un proxy Caddy auto-géré sur EC2 qui réécrit chaque domaine vers son amont `{sub}.b1.church`. Un enregistrement de domaine déclenche un seul `CaddyHelper.updateCaddy()` best-effort, et Caddy lit aussi directement la table `domains` (les points de terminaison `authorize` et `hostmap` ci-dessous). La table fait foi -- une Caddy injoignable ne peut jamais faire échouer un enregistrement.

## Résolution du site

### Sous-domaines `*.b1.church`

`B1App/next.config.mjs` réécrit les requêtes entrantes selon l'hôte. Une règle d'hôte au motif `(?<subdomain>.*?)\..*` capture la **première étiquette** de l'hôte et réécrit `/` et `/:path*` en `/{subdomain}` -- le segment App Router `[sdSlug]`. Ainsi, `grace.b1.church/about` devient `/grace/about`.

Dans `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) appelle `GET /membership/churches/lookup/?subDomain={sdSlug}`. La réponse de `ChurchController.getBySubDomain` a maintenant deux branches :

| Le slug correspond à | Réponse | Signification |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Site principal de cette église |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **site secondaire** -- le contrôleur se rabat sur `sites`, résout l'église propriétaire, et renvoie le slug demandé plus le `siteId` supplémentaire |

Ce `siteId` supplémentaire est la seule chose qui distingue une requête de site secondaire d'une requête de site principal ; tout le reste du pipeline est partagé.

Un slug qui ne correspond à aucune table renvoie `{}` avec un `200`. `ConfigHelper.load` traite une réponse sans `id` comme un site inconnu et appelle `notFound()` de Next, de sorte qu'un sous-domaine inconnu obtient un vrai 404 au lieu de voir chaque appel suivant demander `/…/undefined`. La route de page du constructeur construit aussi son chemin d'arborescence avec `pageTreePath()` (`src/helpers/pageTreePath.ts`), qui encode l'URL du slug ; un slug mal formé (barres obliques inverses, espaces) donne donc un 404 au lieu de faire remonter le `400` de l'API comme une erreur 500.

### Domaines personnalisés {#custom-domains}

Un domaine appartenant à l'église se termine à la **périphérie Caddy** (détaillée plus bas), qui réécrit l'en-tête `Host` vers le `{sub}.b1.church` du site avant de transmettre à B1App. Sur le chemin normal, B1App reçoit donc un hôte *interne* `*.b1.church` et le résout par l'étiquette d'hôte exactement comme un sous-domaine natif -- la recherche en base du middleware ne se déclenche jamais. `src/middleware.ts` s'exécute tout de même sur chaque requête, mais avec un travail toujours actif et un repli :

1. **Toujours** -- il **supprime tout en-tête `x-site` fourni par le client**. Cet en-tête est une entrée de réécriture falsifiable, et il n'est jamais considéré comme fiable que lorsque le middleware lui-même le pose ; le retirer est le vrai travail du middleware derrière Caddy.
2. **Repli, `Host` non interne seulement** -- pour un `Host` de domaine personnalisé brut qui atteint B1App *sans* la réécriture de Caddy, il appelle `GET /membership/domains/public/lookup/{host}` et, si la réponse contient un `subDomain`, pose `x-site: {subDomain}.b1.church`. Derrière Caddy, cette branche est inactive, puisque le `Host` est déjà `*.b1.church`.

Les hôtes internes -- `localhost`, `b1.church`, et les suffixes `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` -- évitent entièrement la recherche (ils sont déjà résolus par la réécriture de l'étiquette d'hôte, ou ce sont des hôtes de prévisualisation ou de déploiement).

La recherche elle-même (`DomainRepo.loadByName`) effectue une jointure externe `domains → churches` et `domains → sites` et renvoie `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` -- le sous-domaine du site secondaire assigné si le domaine pointe vers un site secondaire, sinon celui de l'église. Elle cherche d'abord l'hôte exact ; si cet hôte commençait par `www.` et n'a rien donné, elle réessaie **une seule fois** avec l'apex nu.

Dans `next.config.mjs`, les règles de réécriture `x-site` sont placées **avant** les règles d'hôte génériques, de sorte qu'elles l'emportent. `x-site: grace.b1.church` → première étiquette `grace` → `[sdSlug] = grace`, et à partir de là la résolution est identique à celle du chemin de sous-domaine (même `churches/lookup`, même `siteId`).

:::info
L'en-tête `x-site` n'est pas fiable depuis l'extérieur. Le middleware supprime inconditionnellement tout `x-site` entrant avant d'en poser un lui-même, et les règles de réécriture ne voient que la valeur posée par le middleware -- un client ne peut pas s'imposer au contenu d'une autre église en envoyant un en-tête.
:::

Deux détails opérationnels sur le middleware :

- **Cache.** Le résultat de chaque hôte (une réussite *ou* une absence confirmée -- jamais une erreur réseau) est mis en cache pendant **10 minutes** dans une `Map` en mémoire, par isolat serverless.
- **Matcher.** Le matcher réinclut délibérément `/sitemap.xml`, `/robots.txt` et `/manifest.webmanifest`. Son premier motif exclut les chemins contenant un point, ce qui les éliminerait ; ils sont donc réintégrés afin que les fichiers SEO/PWA propres à une église sur un domaine personnalisé reçoivent aussi l'en-tête `x-site`.
- **En-tête canonique.** Pour les pages d'église, le middleware ajoute à la réponse un en-tête `Link: <{proto}://{host}{path}>; rel="canonical"` qui nomme l'hôte depuis lequel la page a réellement été servie -- sous-domaine ou domaine personnalisé (`helpers/canonicalLink.ts`). Lorsqu'un domaine personnalisé atteint B1App par le [proxy Caddy](../deployment/caddy-proxy), l'hôte de la requête est le sous-domaine `{sub}.b1.church` ; le middleware utilise donc le domaine du visiteur depuis `X-Church-Host` -- mais seulement après que `/domains/public/lookup/{host}` confirme que ce domaine correspond au même sous-domaine (`ownsSubdomain()`). Le lien canonique, `robots.txt` et `sitemap.xml` désignent alors le domaine personnalisé plutôt que le sous-domaine `b1.church`. Il est ignoré sur les hôtes qui ne sont pas d'église (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) et sur `/mobile`, `/login`, `/logout`, et les fichiers robots/sitemap/manifest générés.

### Site public désactivé

Une église peut activer **Désactiver le site public** dans B1Admin (paramètre de contenu de l'église `hidePublicSite = "true"`). Le site ne sert alors que ses routes destinées aux membres :

- **Le middleware de B1App** recherche le sous-domaine (`/membership/churches/lookup`, puis `/content/settings/public/:churchId`) et redirige les requêtes anonymes vers tout chemin hors de la liste blanche vers `/login?returnUrl={path}{query}`. La liste blanche (`helpers/publicSite.ts`) comprend `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, et les fichiers manifest/robots/sitemap. Seules les réponses confirmées sont mises en cache (60 secondes en production, car l'appel de revalidation de l'administrateur ne peut pas vider cette carte propre à chaque instance ; sans cache en développement/test). Une erreur de l'API sert le site plutôt que d'enfermer tout le monde dehors.
- **Les membres connectés voient le site complet.** Une requête portant un cookie `jwt` non expiré (la fonction `hasSession()` du middleware décode le champ `exp` de la charge utile sans vérifier la signature -- c'est une barrière souple, et non un contrôle d'accès) passe la redirection ; ainsi, après une connexion, un membre revient sur la page demandée et voit les pages normales, les pages intégrées (Groupes, Sermons, etc.) et la navigation de l'en-tête. Les composants de page et `Header` ne vérifient plus eux-mêmes `hidePublicSite`.
- **`robots.txt`** interdit tout, comme sur les hôtes noindex.
- **API.** `GET /content/pages/public/:churchId` (la liste de pages du plan du site) renvoie `[]`, de sorte que les appelants anonymes ne peuvent pas énumérer les pages.

### Transmission du `siteId`

`ConfigHelper` stocke le `siteId` résolu dans sa `ConfigurationInterface` par requête (mémorisée avec `cache()` de React) et ajoute `?siteId=` aux appels de contenu qu'il effectue, ainsi qu'à ceux des composants de page -- **conditionnellement** : un `siteId` vide (sous-domaine d'une église principale) omet entièrement le paramètre. Les points de terminaison concernés sont l'arbre de pages (`/content/pages/:id/tree`), la liste publique des pages utilisée par le plan du site (`/content/pages/public/:id`), les styles globaux (`/content/globalStyles/church/:id`), les liens de navigation (`/content/links/church/:id`), et le bloc de pied de page autonome (`/content/blocks/public/footer/:id`). Sur le chemin de rendu normal, le pied de page arrive à l'intérieur de l'arbre de pages (sections marquées `zone: "siteFooter"`), déjà récupéré avec `siteId` ; il n'existe donc aucune lacune de pied de page sans portée.

Le portail membre (B1App `mobile`) reste volontairement en dehors de ce mécanisme : `loadChurchAppearance.ts` résout l'église via `churches/lookup` mais lit les paramètres au niveau de l'église via `/settings/public/{id}` et ne transmet jamais `siteId` -- le portail est à l'échelle de l'église dans la v1 (voir plus bas).

## Plusieurs sites web par église

### Modèle de données

La nouvelle table `membership.sites` est volontairement minimale :

| Colonne | Type | Remarques |
|--------|------|-----------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Église propriétaire |
| `name` | `varchar(255)` | Nom affiché (par exemple « Español », « Jeunesse ») |
| `subDomain` | `varchar(45)` | **Index unique** -- espace de noms global (voir plus bas) |

La délimitation par site se réduit alors à une seule colonne, sans nullité, ajoutée aux tables de contenu et de domaine :

| Table (module) | Colonne | `''` signifie |
|----------------|---------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Le domaine sert le site principal |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Site principal -- et sur **`blocks`**, `''` signifie en plus *partagé entre tous les sites* |

Deux migrations ajoutent tout cela (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Parce que la colonne vaut `''` par défaut, chaque ligne existante conserve le comportement actuel sans remplissage rétroactif.

**Espace de noms global des sous-domaines.** `sites.subDomain` partage *un seul* espace de noms avec `churches.subDomain` -- un sous-domaine de site ne peut jamais entrer en collision avec un sous-domaine d'église ou celui d'un autre site. Cela est imposé sur **les deux** chemins d'enregistrement : `SiteController.save` rejette un slug qui touche `churches` ou `sites`, et `ChurchController.validateSave` fait la même chose dans l'autre sens. Un index unique sur `sites.subDomain` le garantit au niveau de la base de données.

**L'unicité des pages** passe de `(churchId, url)` à `(churchId, siteId, url)`, afin que deux sites d'une même église puissent chacun posséder leur propre `/about`.

### Contenu par site, avec replis

Chaque point de terminaison de **liste/arbre** de contenu rattaché à un site accepte un `?siteId=` facultatif (absent ⇒ `''` = principal) : arbre / liste / public des pages, blocs (liste / par type / pied de page), liens (anonymes / filtrés / tous), et styles globaux. Les sections et les éléments ne sont pas rattachés directement -- ils héritent par leur page ou leur bloc parent.

Deux chaînes de résolution font le travail intéressant :

- **Styles globaux -- `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` renvoie la ligne propre au site ; si un site secondaire n'en a aucune, il renvoie **telle quelle la ligne principale (`''`)** (en gardant l'`id`/`siteId` du principal, que le client utilise pour la copie à l'écriture), et s'il n'existe pas non plus de principal, `GlobalStyleController` renvoie une palette et des polices par défaut codées en dur.
- **Bloc de pied de page -- celui du site l'emporte, le partagé sert de repli.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` renvoie les lignes partagées (`''`) *et* celles propres au site ; le résolveur choisit le pied de page propre au site s'il existe, sinon le partagé. La même logique s'exécute à la fois dans `TreeHelper.insertBlocks` (arbre de pages) et dans le point de terminaison autonome `/content/blocks/public/footer/:churchId`.

### Cascade de suppression d'un site

`SiteController.delete` (protégé par l'autorisation Paramètres → Modifier du membership) supprime un site secondaire en trois étapes :

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` supprime en cascade tout le contenu que le site possède : ses **pages** → leurs sections, éléments, `pageHistory` et `posts` ; ses propres **blocs** → leurs sections, éléments et `pageHistory` ; ses **liens** et **styles globaux**. Une garde refuse de s'exécuter pour `''` -- la sentinelle du principal/partagé n'est jamais supprimée en cascade.
2. `DomainRepo.clearSiteId` **réaffecte** les domaines du site au principal (`siteId → ''`) au lieu de les supprimer, de sorte qu'un domaine personnalisé survit à la suppression d'un site.
3. La ligne `sites` est supprimée et les routes Caddy sont resynchronisées (au mieux).

### Surface dans B1Admin

| Capacité | Emplacement | Mécanisme |
|-----------|-------------|-----------|
| Sélecteur de site | `useSiteSelection` + `SiteSwitcher` (vide = « Site principal ») | Lit un paramètre d'URL `?site=` et le transmet en `?siteId=` aux appels de ContentApi. Présent sur les trois **listes** de site -- **Pages**, **Blocs**, **Apparence** -- mais *pas* sur les éditeurs de page/bloc, qui portent `siteId` dans l'enregistrement |
| Création/suppression de sites | `SitesDialog`, ouvert depuis l'entrée « Gérer les sites web… » du sélecteur | `POST /membership/sites` / `DELETE /membership/sites/:id` (nom + subDomain). Protégé par l'autorisation Paramètres → Modifier du membership (`Permissions.settings.edit` côté serveur ; `Permissions.membershipApi.settings.edit` dans B1Admin). **Création et suppression seulement -- il n'existe pas d'interface de renommage en v1** |
| Affectation de site par domaine | `DomainSettingsEdit` sous Paramètres → Domaines | Une liste déroulante de site par ligne envoie `siteId` pour chaque domaine à `/membership/domains`. La colonne se masque si l'API ne renvoie aucun site (backend plus ancien) |
| Styles en copie à l'écriture | `StylesManager.prepareForSave` | Lorsque la ligne de style global chargée a un `siteId` qui ne correspond pas au site sélectionné (c'est-à-dire que l'API a renvoyé le principal hérité en repli), il retire l'`id` du principal et appose le `siteId` courant, forçant une **insertion** d'une nouvelle ligne propre au site au lieu d'écraser le principal. La même bifurcation en cas de non-correspondance s'applique au bloc de pied de page du site |

:::info
**Ce qui reste à l'échelle de l'église en v1 (un choix de portée délibéré, et non une limite du modèle de données) :** le **blog** (`BlogPage` n'a pas de sélecteur et charge `/posts` sans `siteId`), les **widgets du site** (bandeau d'annonce + lanceur), les **redirections**, le **logo / GA4 / paramètres de l'église**, et le **portail membre** (B1App mobile). Ce n'est *pas* tout l'onglet Apparence -- les styles globaux d'un site secondaire (palette, polices, typographie, espacement, navigation, CSS personnalisé) **sont** propres au site via le chemin de copie à l'écriture ci-dessus ; seuls les sous-panneaux bandeau/lanceur/redirections/logo de la page Apparence restent à l'échelle de l'église.
:::

## Domaines personnalisés : périphérie Caddy (plan de configuration statique)

:::info
**Orientation révisée le 2 juillet 2026.** Un ancien projet d'hébergement des domaines personnalisés sur les domaines gérés par Vercel a été **abandonné**, et tout le code d'enregistrement de domaines Vercel (`VercelHelper`, ses variables d'environnement `vercelToken`/`vercelProjectId`/`vercelTeamId`, ses paramètres SSM et ses entrées de santé) a été retiré de l'Api. Le proxy **Caddy** auto-géré sur EC2 **demeure** comme périphérie permanente des domaines personnalisés. Le seul travail restant est interne : remplacer la configuration *d'exécution* de l'API d'administration de Caddy par une configuration *statique* qui survit aux redémarrages.
:::

### La périphérie

Chaque domaine personnalisé d'église pointe son DNS vers une seule machine EC2 -- `3.23.251.61`, aussi joignable à `proxy.b1.church`. L'écran Paramètres → Domaines de B1Admin demande aux églises d'ajouter un `A` apex vers `3.23.251.61` ou un `CNAME` vers `proxy.b1.church`. Caddy termine le TLS avec un certificat Let's Encrypt par domaine, réécrit l'en-tête `Host` vers l'amont `{sub}.b1.church` du domaine, et transmet à B1App -- qui achemine alors par l'étiquette d'hôte comme pour n'importe quel sous-domaine natif (voir [Domaines personnalisés](#custom-domains) plus haut).

La correspondance d'amont provient de `DomainRepo.loadPairs`, dont la connexion fait un COALESCE sur le sous-domaine du site assigné, de sorte qu'un domaine est transmis au bon *site secondaire*, avec repli sur le principal de l'église :

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Les lignes `www.*` sont exclues de la correspondance ; Caddy sert `www.{host}` par une redirection `302` vers l'apex.

### Deux points de terminaison anonymes alimentent la périphérie

`DomainController` expose deux points de terminaison non authentifiés et en lecture seule que la machine consomme directement -- anonymes par nécessité, puisque la périphérie les interroge avant qu'il existe un contexte d'église :

| Point de terminaison | Renvoie | Rôle |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` si le domaine -- ou, pour un échec `www.`, son apex nu -- existe dans `domains` ; `404` sinon (y compris un `domain` vide) | Le **`ask` du TLS à la demande** de Caddy : le contrôle d'abus qui décide s'il faut émettre un certificat pour un SNI entrant |
| `GET /membership/domains/hostmap` | `text/plain`, une ligne triée `{domain} {sub}.b1.church` par domaine routable | Le fichier de correspondance hôte→amont que la machine rafraîchit par minuterie |

`authorize` réutilise `DomainRepo.loadByName` (hôte exact, puis un seul essai `www.`→apex) ; `hostmap` réutilise `loadPairs` -- il est donc sensible au site et exclut les `www.*`, exactement comme les routes proxy -- et ne fait que retirer le suffixe `:443`.

### Enregistrement/suppression de domaine -- une seule poussée au mieux

`DomainController.save` écrit les lignes `domains` puis effectue un **seul** appel `CaddyHelper.updateCaddy()` best-effort, enveloppé dans un `try/catch` qui consigne (`console.error`) et avale l'erreur ; `delete` fait de même (ce qui a aussi corrigé un ancien bogue de route obsolète à la suppression), comme le fait la suppression de site secondaire (`SiteController.delete`). `updateCaddy` est lui-même borné par un délai Axios de **10 s**, de sorte qu'une Caddy injoignable ou arrêtée ne peut jamais renvoyer un `500` lors de l'enregistrement d'un domaine -- la table `domains` fait foi.

### État actuel -- configuration statique, sans état d'exécution

La machine (un EC2 Windows derrière l'IP élastique permanente) exécute Caddy à partir d'un **Caddyfile statique** : TLS à la demande dont le `ask` pointe vers `/membership/domains/authorize`, plus un fichier de correspondance hôte→amont rafraîchi toutes les 5 minutes depuis `/membership/domains/hostmap` par une tâche planifiée qui se termine par un `caddy reload` gracieux. La configuration survit aux redémarrages sans aucun état d'exécution -- pas de danse de réamorçage -- et un SNI inconnu est **refusé au niveau TLS** (aucun certificat n'est émis pour un hôte que `authorize` rejette), tandis qu'un hôte autorisé mais pas encore mappé (un domaine tout neuf dans la fenêtre de synchronisation) reçoit un 404 propre. Les nouveaux domaines deviennent routables dans les ~5 minutes suivant un enregistrement ; leurs certificats sont émis à la première visite. Installation et exploitation, ainsi que les pièges éprouvés sur le terrain : [Proxy Caddy pour domaines personnalisés](../deployment/caddy-proxy).

### Poussée d'exécution héritée -- chemin de retour arrière, suppression en attente

`CaddyHelper` (module membership) peut encore piloter Caddy par son **API d'administration** à `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort` ; sans effet lorsqu'ils ne sont pas définis ; exposé sous le groupe Intégrations de `ServerHealthController`) : `updateCaddy()` envoie un PATCH d'un tableau complet de routes, et `initializeCaddy()` ainsi que les points de terminaison `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstruisent entièrement un serveur configuré à l'exécution. Dans ce mode, la configuration ne vivait que dans la mémoire de Caddy -- l'amnésie au redémarrage que cette architecture a remplacée. Le mécanisme subsiste uniquement comme chemin de retour arrière et doit être supprimé une fois la machine statique stable ; la poussée au mieux `updateCaddy()` lors de l'enregistrement ou de la suppression d'un domaine est un no-op inoffensif face à la machine statique (son API d'administration n'est accessible qu'en local).

## Pages connexes

- [Proxy Caddy pour domaines personnalisés](../deployment/caddy-proxy) — la machine périphérique elle-même : installation d'un nouveau serveur, service WinSW, tâche de synchronisation de la carte, et pièges d'exploitation
- [Constructeur de site web](./website-builder) — l'arbre pages/sections/éléments, les moteurs de rendu, le blog, le référencement et la génération par IA (ce qui s'affiche une fois la requête résolue en église/site)
- [Points de terminaison Content](../api/endpoints/content) — la surface REST pour les pages, blocs, liens et styles globaux, tous sensibles à `?siteId=`
- [B1App](../web-apps/b1-app) — l'application Next.js qui héberge le middleware et le routage `[sdSlug]`
- [Déploiement des applications web](../deployment/web-apps) — déploiement de B1App sur Vercel
