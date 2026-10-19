---
title: "Routage des sites web et multi-sites"
---

# Routage des sites web et multi-sites

<div class="article-intro">

Une seule église peut désormais proposer plusieurs sites web distincts, et chacun peut être hébergé sur un sous-domaine `*.b1.church` ou sur un domaine personnalisé appartenant à l'église. Cette page décrit la couche de routage qui se trouve *sous* le créateur : comment une requête entrante est associée à une église **et** à un site précis, le modèle de données multi-sites (la valeur sentinelle `siteId` qui permet à chaque site existant de continuer à s'afficher à l'identique), ainsi que la couche d'accès aux domaines personnalisés — un proxy Caddy auto-géré sur EC2 qui termine le TLS et réécrit chaque domaine d'église vers son amont `*.b1.church`. Pour savoir ce qui est réellement affiché une fois la requête associée — l'arborescence des pages, sections et éléments — consultez [Créateur de site web](./website-builder).

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

Trois règles s'appliquent à cette couche :

1. **Une sentinelle garantit la compatibilité ascendante.** `siteId = ''` désigne le site principal. Chaque page, bloc, lien, style global et ligne de domaine existant avant cette fonctionnalité porte la valeur `''` et s'affiche exactement comme auparavant. Un *second* site web est simplement un ensemble de lignes avec un `siteId` non vide, et tout point de terminaison de contenu appelé sans `?siteId=` renvoie le site principal — exactement la même requête qu'avant.
2. **La résolution repose sur l'étiquette de l'hôte et converge.** Un sous-domaine `*.b1.church` est routé directement d'après son étiquette d'hôte ; un domaine personnalisé est réécrit vers son étiquette `{sub}.b1.church` au niveau du proxy Caddy avant que B1App ne le voie (avec une recherche en base de données dans le middleware qui pose un en-tête `x-site` en solution de repli pour tout `Host` personnalisé brut). Les deux chemins aboutissent à la même route `[sdSlug]` et au même appel `churches/lookup`, donc le rendu en aval est identique.
3. **Le proxy Caddy est sans état et s'appuie sur une seule source de vérité.** Les domaines personnalisés sont terminés sur un proxy Caddy auto-géré sur EC2 qui réécrit chaque domaine vers son amont `{sub}.b1.church`. L'enregistrement d'un domaine déclenche un seul `CaddyHelper.updateCaddy()` en mode best-effort, et Caddy lit aussi directement la table `domains` (les points de terminaison `authorize` et `hostmap` ci-dessous). La table fait autorité — un Caddy injoignable ne peut jamais faire échouer un enregistrement.

## Résolution de site

### Sous-domaines `*.b1.church`

`B1App/next.config.mjs` réécrit les requêtes entrantes selon l'hôte. Une règle d'hôte avec le motif `(?<subdomain>.*?)\..*` capture la **première étiquette** de l'hôte et réécrit `/` et `/:path*` en `/{subdomain}` — le segment App Router `[sdSlug]`. Ainsi, `grace.b1.church/about` devient `/grace/about`.

Dans `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) appelle `GET /membership/churches/lookup/?subDomain={sdSlug}`. La réponse de `ChurchController.getBySubDomain` comporte désormais deux cas :

| Le segment correspond à | Réponse | Signification |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Site principal de cette église |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **site secondaire** — le contrôleur se rabat sur `sites`, résout l'église propriétaire et renvoie le segment demandé ainsi que le `siteId` supplémentaire |

Ce `siteId` supplémentaire est la seule chose qui distingue une requête vers un site secondaire d'une requête vers le site principal ; tout le reste du pipeline est partagé.

Un segment qui ne correspond à aucune des deux tables renvoie `{}` avec un code `200`. `ConfigHelper.load` traite une réponse sans `id` comme un site inconnu et appelle `notFound()` de Next, si bien qu'un sous-domaine inconnu obtient une véritable erreur 404 au lieu de faire demander à chaque appel ultérieur `/…/undefined`. La route de page du créateur construit aussi son chemin d'arborescence avec `pageTreePath()` (`src/helpers/pageTreePath.ts`), qui encode le segment en URL ; ainsi, un segment mal formé (antislashs, espaces) renvoie un 404 au lieu de transformer l'erreur `400` de l'API en erreur 500.

### Domaines personnalisés {#custom-domains}

Un domaine appartenant à une église se termine sur le **proxy Caddy** (décrit plus bas), qui réécrit l'en-tête `Host` vers le `{sub}.b1.church` du site avant de transmettre la requête à B1App. Ainsi, dans le cas normal, B1App reçoit un hôte *interne* `*.b1.church` et le résout par son étiquette d'hôte exactement comme un sous-domaine natif — la recherche en base du middleware ne se déclenche jamais. `src/middleware.ts` s'exécute toujours sur chaque requête, mais avec une tâche permanente et une solution de repli :

1. **Toujours** — il **supprime tout en-tête `x-site` fourni par le client**. Cet en-tête est une entrée de réécriture falsifiable et n'est jamais approuvé que lorsque le middleware lui-même le définit ; le supprimer est le véritable rôle du middleware derrière Caddy.
2. **Solution de repli, uniquement pour un `Host` non interne** — pour un `Host` de domaine personnalisé brut qui atteint B1App *sans* la réécriture de Caddy, il appelle `GET /membership/domains/public/lookup/{host}` et, si la réponse contient un `subDomain`, définit `x-site: {subDomain}.b1.church`. Derrière Caddy, cette branche est inactive puisque le `Host` est déjà `*.b1.church`.

Les hôtes internes — `localhost`, `b1.church` et les suffixes `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — évitent entièrement la recherche (ils sont déjà résolus par la réécriture de l'étiquette d'hôte, ou ce sont des hôtes de prévisualisation ou de déploiement).

La recherche elle-même (`DomainRepo.loadByName`) effectue une jointure externe gauche `domains → churches` et `domains → sites`, et renvoie `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — le sous-domaine du site secondaire assigné si le domaine pointe vers un site secondaire, sinon celui de l'église. Elle cherche d'abord l'hôte exact ; si cet hôte commençait par `www.` et n'a rien trouvé, elle réessaie **une seule fois** avec l'apex nu.

Dans `next.config.mjs`, les règles de réécriture `x-site` sont placées **avant** les règles d'hôte génériques, afin de prendre le dessus. `x-site: grace.b1.church` → première étiquette `grace` → `[sdSlug] = grace`, et à partir de là la résolution est identique au chemin par sous-domaine (même `churches/lookup`, même `siteId`).

:::info
L'en-tête `x-site` n'est pas fiable lorsqu'il provient de l'extérieur. Le middleware supprime inconditionnellement tout `x-site` entrant avant d'en définir éventuellement le sien, et les règles de réécriture ne voient que la valeur définie par le middleware — un client ne peut pas s'imposer au contenu d'une autre église en envoyant un en-tête.
:::

Deux détails opérationnels concernant le middleware :

- **Cache.** Le résultat de chaque hôte (une correspondance *ou* une absence confirmée — jamais une erreur réseau) est mis en cache pendant **10 minutes** dans une `Map` en mémoire, par isolat serverless.
- **Matcher.** Le matcher réintègre volontairement `/sitemap.xml`, `/robots.txt` et `/manifest.webmanifest`. Son premier motif exclut les chemins contenant un point, ce qui écarterait ces fichiers ; ils sont donc réintégrés pour que les fichiers SEO/PWA propres à chaque église sur un domaine personnalisé reçoivent aussi l'en-tête `x-site`.
- **En-tête canonique.** Pour les pages d'église, le middleware ajoute un en-tête de réponse `Link: <{proto}://{host}{path}>; rel="canonical"` qui indique l'hôte depuis lequel la page a été réellement servie — sous-domaine ou domaine personnalisé (`helpers/canonicalLink.ts`). Il est ignoré sur les hôtes qui ne sont pas ceux d'une église (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) ainsi que sur `/mobile`, `/login`, `/logout` et les fichiers robots/sitemap/manifest générés.

### Site public désactivé

Une église peut activer **Désactiver le site public** dans B1Admin (paramètre de contenu au niveau de l'église `hidePublicSite = "true"`). Le site ne sert alors que ses routes réservées aux membres :

- **Le middleware de B1App** recherche le sous-domaine (`/membership/churches/lookup` puis `/content/settings/public/:churchId`) et redirige les requêtes anonymes vers toute page hors de la liste autorisée vers `/login?returnUrl={path}{query}`. La liste autorisée (`helpers/publicSite.ts`) comprend `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, ainsi que les fichiers manifest/robots/sitemap. Seules les réponses confirmées sont mises en cache (60 secondes en production, car l'appel de revalidation de l'administrateur ne peut pas vider cette Map propre à chaque instance ; pas de cache en développement et en test). Une erreur de l'API affiche le site plutôt que de verrouiller tout le monde à l'extérieur.
- **Les membres connectés voient le site complet.** Une requête portant un cookie `jwt` non expiré (la fonction `hasSession()` du middleware décode le champ `exp` de la charge utile sans vérifier la signature — c'est une vérification souple, pas un contrôle d'accès) ignore la redirection ; ainsi, après la connexion, un membre revient à la page demandée et voit les pages normales, les pages intégrées (Groupes, Prédications, etc.) et la navigation de l'en-tête. Les composants de page et `Header` ne vérifient plus eux-mêmes `hidePublicSite`.
- **`robots.txt`** interdit tout, comme pour les hôtes en noindex.
- **API.** `GET /content/pages/public/:churchId` (la liste de pages du sitemap) renvoie `[]`, ainsi les appelants anonymes ne peuvent pas lister les pages.

### Transmission de `siteId`

`ConfigHelper` stocke le `siteId` résolu dans sa `ConfigurationInterface` propre à chaque requête (mémorisée avec `cache()` de React) et ajoute `?siteId=` aux appels de contenu qu'il effectue ainsi qu'à ceux que font les composants de page — **de manière conditionnelle** : un `siteId` vide (sous-domaine de l'église principale) omet complètement le paramètre. Les points de terminaison concernés sont l'arborescence des pages (`/content/pages/:id/tree`), la liste publique des pages utilisée par le sitemap (`/content/pages/public/:id`), les styles globaux (`/content/globalStyles/church/:id`), les liens de navigation (`/content/links/church/:id`) et le bloc de pied de page autonome (`/content/blocks/public/footer/:id`). Sur le chemin de rendu normal, le pied de page arrive dans l'arborescence de la page (sections marquées `zone: "siteFooter"`), déjà récupérée avec `siteId`, il n'y a donc aucune lacune de pied de page sans portée.

Le portail des membres (`mobile` de B1App) reste volontairement en dehors de ce mécanisme : `loadChurchAppearance.ts` résout l'église via `churches/lookup`, mais lit le `/settings/public/{id}` au niveau de l'église et ne transmet jamais `siteId` — le portail est à l'échelle de toute l'église dans la v1 (voir plus bas).

## Plusieurs sites web par église

### Modèle de données

La nouvelle table `membership.sites` est volontairement minimale :

| Colonne | Type | Remarques |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Église propriétaire |
| `name` | `varchar(255)` | Nom affiché (par ex. « Español », « Youth ») |
| `subDomain` | `varchar(45)` | **Index unique** — espace de noms global (voir ci-dessous) |

La délimitation par site se fait ensuite au moyen d'une seule colonne, sans valeur nulle, ajoutée aux tables de contenu et de domaines :

| Table (module) | Colonne | Signification de `''` |
|----------------|---------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Le domaine sert le site principal |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Site principal — et sur **`blocks`**, `''` signifie en plus *partagé entre tous les sites* |

Deux migrations ajoutent tout cela (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Comme la colonne vaut `''` par défaut, chaque ligne existante conserve le comportement actuel sans aucune reprise de données.

**Espace de noms global des sous-domaines.** `sites.subDomain` partage *un seul* espace de noms avec `churches.subDomain` — le sous-domaine d'un site ne peut jamais entrer en collision avec celui d'une église ou d'un autre site. Cela est appliqué sur **les deux** chemins d'enregistrement : `SiteController.save` rejette un identifiant déjà utilisé dans `churches` ou `sites`, et `ChurchController.validateSave` fait la vérification inverse. Un index unique sur `sites.subDomain` l'assure au niveau de la base de données.

**Unicité des pages** élargie de `(churchId, url)` à `(churchId, siteId, url)`, afin que deux sites d'une même église puissent chacun posséder leur propre `/about`.

### Contenu par site, avec replis

Chaque point de terminaison de **liste/arborescence** de contenu propre à un site accepte un `?siteId=` facultatif (absent ⇒ `''` = principal) : arborescence / liste / public des pages, liste / par type / pied de page des blocs, liens (anonymes / filtrés / tous) et styles globaux. Les sections et éléments ne sont **pas** délimités directement — ils héritent de leur page ou de leur bloc parent.

Deux chaînes de résolution font le travail intéressant :

- **Styles globaux — `site → principal → par défaut`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` renvoie la propre ligne du site ; si un site secondaire n'en a pas, il renvoie **la ligne principale (`''`) telle quelle** (en conservant l'`id`/`siteId` du principal, que le client utilise pour la copie à l'écriture), et s'il n'existe pas non plus de principal, `GlobalStyleController` renvoie une palette et des polices par défaut codées en dur. 
- **Bloc de pied de page — celui du site l'emporte, le partagé sert de repli.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` renvoie les lignes partagées (`''`) *et* celles propres au site ; le résolveur retient le pied de page du site s'il existe, sinon le partagé. La même logique s'applique dans `TreeHelper.insertBlocks` (arborescence de page) et dans le point de terminaison autonome `/content/blocks/public/footer/:churchId`.

### Suppression en cascade d'un site

`SiteController.delete` (soumis à la permission Paramètres→Modifier du module membership) supprime un site secondaire en trois étapes :

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` supprime en cascade tout le contenu que possède le site : ses **pages** → leurs sections, éléments, `pageHistory` et `posts` ; ses propres **blocs** → leurs sections, éléments et `pageHistory` ; ses **liens** et **globalStyles**. Une garde refuse de s'exécuter pour `''` — la sentinelle du site principal/partagé n'est jamais supprimée en cascade.
2. `DomainRepo.clearSiteId` **réassigne** les domaines du site au principal (`siteId → ''`) au lieu de les supprimer, de sorte qu'un domaine personnalisé survit à la suppression d'un site.
3. La ligne `sites` est supprimée et les routes Caddy sont resynchronisées (en mode best-effort).

### Surface de B1Admin

| Fonctionnalité | Emplacement | Mécanisme |
|-----------|-------|-----------|
| Sélecteur de site | `useSiteSelection` + `SiteSwitcher` (vide = « Site principal ») | Lit un paramètre d'URL `?site=` et le transmet sous forme de `?siteId=` aux appels ContentApi. Présent dans les trois zones de **liste** des sites — **Pages**, **Blocs**, **Apparence** — mais *pas* dans les éditeurs de page/bloc, qui portent le `siteId` dans l'enregistrement |
| Création/suppression de sites | `SitesDialog`, ouvert depuis l'entrée « Gérer les sites web… » du sélecteur | `POST /membership/sites` / `DELETE /membership/sites/:id` (nom + subDomain). Soumis à la permission Paramètres→Modifier du module membership (`Permissions.settings.edit` côté serveur ; `Permissions.membershipApi.settings.edit` dans B1Admin). **Création/suppression uniquement — il n'existe pas d'interface de renommage dans la v1** |
| Attribution du site par domaine | `DomainSettingsEdit` sous Paramètres→Domaines | Une liste déroulante de site par ligne envoie `siteId` pour chaque domaine à `/membership/domains`. La colonne est masquée si l'API ne renvoie aucun site (backend plus ancien) |
| Styles en copie à l'écriture | `StylesManager.prepareForSave` | Lorsque la ligne de styles globaux chargée a un `siteId` différent du site sélectionné (c'est-à-dire que l'API a renvoyé le principal hérité en repli), elle supprime l'`id` du principal et applique le `siteId` courant, ce qui force une **insertion** d'une nouvelle ligne propre au site au lieu d'écraser le principal. La même bifurcation s'applique au bloc de pied de page du site |

:::info
**Ce qui reste à l'échelle de toute l'église dans la v1 (un choix de portée délibéré, et non une limite du modèle de données) :** le **blog** (`BlogPage` n'a pas de sélecteur et charge `/posts` sans `siteId`), les **widgets du site** (bannière d'annonce et lanceur), les **redirections**, le **logo / GA4 / paramètres de l'église** et le **portail des membres** (B1App mobile). Notez qu'il ne s'agit *pas* de « toute l'Apparence » — les styles globaux d'un site secondaire (palette, polices, typographie, espacements, navigation, CSS personnalisé) **sont** propres à chaque site grâce au mécanisme de copie à l'écriture décrit ci-dessus ; seuls les sous-panneaux bannière/lanceur/redirections/logo de la page Apparence restent à l'échelle de l'église.
:::

## Domaines personnalisés : proxy Caddy (plan de configuration statique)

:::info
**Orientation révisée le 2026-07-02.** Un plan antérieur visant à déplacer l'hébergement des domaines personnalisés vers des domaines gérés par Vercel a été **annulé**, et tout le code d'enregistrement de domaines Vercel (`VercelHelper`, ses variables d'environnement `vercelToken`/`vercelProjectId`/`vercelTeamId`, les paramètres SSM et les entrées de santé) a été supprimé de l'API. Le **proxy Caddy auto-géré sur EC2 reste** comme point d'entrée permanent pour les domaines personnalisés. Le seul travail restant est interne : remplacer la configuration d'exécution via l'API d'administration de Caddy par une configuration *statique* qui survit aux redémarrages.
:::

### Le point d'entrée

Chaque domaine personnalisé d'église pointe son DNS vers une seule machine EC2 — `3.23.251.61`, également accessible sous `proxy.b1.church`. L'écran Paramètres→Domaines de B1Admin indique aux églises d'ajouter un enregistrement apex `A → 3.23.251.61` ou un `CNAME → proxy.b1.church`. Caddy termine le TLS avec un certificat Let's Encrypt propre à chaque domaine, réécrit l'en-tête `Host` vers l'amont `{sub}.b1.church` du domaine, puis transmet la requête à B1App — qui la route ensuite par étiquette d'hôte comme tout sous-domaine natif (voir [Domaines personnalisés](#custom-domains) plus haut).

La correspondance vers l'amont provient de `DomainRepo.loadPairs`, dont la valeur de sortie utilise un COALESCE sur le **sous-domaine du site assigné**, afin qu'un domaine soit transmis au bon *site secondaire*, avec repli sur le principal de l'église :

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Les lignes `www.*` sont exclues de la correspondance ; Caddy sert `www.{host}` via une redirection `302` vers l'apex.

### Deux points de terminaison anonymes alimentent le point d'entrée

`DomainController` expose deux points de terminaison non authentifiés et en lecture seule que la machine consomme directement — anonymes par nécessité, puisque le point d'entrée les interroge avant qu'il existe un contexte d'église :

| Point de terminaison | Renvoie | Rôle |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` si le domaine — ou, en cas d'absence d'un `www.`, son apex nu — existe dans `domains` ; `404` sinon (y compris pour un `domain` vide) | Le **`ask` du TLS à la demande** de Caddy : le contrôle d'abus qui décide s'il faut émettre un certificat pour un SNI entrant |
| `GET /membership/domains/hostmap` | `text/plain`, une ligne triée `{domain} {sub}.b1.church` par domaine routable | Le fichier de correspondance hôte→amont que la machine actualise périodiquement |

`authorize` réutilise `DomainRepo.loadByName` (hôte exact, puis une seule nouvelle tentative `www.`→apex) ; `hostmap` réutilise `loadPairs` — elle tient donc compte du site et exclut les `www.*`, exactement comme les routes proxy — et retire simplement le suffixe `:443`.

### Enregistrement/suppression de domaine — une seule poussée en mode best-effort

`DomainController.save` écrit les lignes de `domains`, puis effectue un **seul** appel `CaddyHelper.updateCaddy()` en mode best-effort, encapsulé dans un `try/catch` qui journalise (`console.error`) et ignore l'erreur ; `delete` fait de même (ce qui a aussi corrigé un ancien bogue de route obsolète à la suppression), de même que la suppression d'un site secondaire (`SiteController.delete`). `updateCaddy` est elle-même bornée par un délai d'expiration Axios de **10 s**, de sorte qu'un Caddy injoignable ou arrêté ne peut jamais provoquer une erreur `500` lors de l'enregistrement d'un domaine — la table `domains` fait foi.

### État actuel — configuration statique, aucun état d'exécution

La machine (une instance EC2 Windows derrière l'adresse IP élastique permanente) exécute Caddy à partir d'un **Caddyfile statique** : TLS à la demande dont le `ask` pointe vers `/membership/domains/authorize`, plus un fichier de correspondance hôte→amont actualisé toutes les 5 minutes depuis `/membership/domains/hostmap` par une tâche planifiée qui se termine par un `caddy reload` gracieux. La configuration survit aux redémarrages sans aucun état d'exécution — sans séquence de réamorçage — et un SNI inconnu est **refusé au niveau TLS** (aucun certificat n'est émis pour un hôte que `authorize` rejette), tandis qu'un hôte autorisé mais pas encore dans la correspondance (un nouveau domaine dans la fenêtre de synchronisation) reçoit un 404 propre. Les nouveaux domaines deviennent routables dans les ~5 minutes suivant un enregistrement ; leurs certificats sont émis à la première requête. Installation/mise en place, exploitation et pièges constatés sur le terrain : [Proxy Caddy pour domaines personnalisés](../deployment/caddy-proxy).

### Poussée d'exécution héritée — chemin de retour arrière, suppression prévue

`CaddyHelper` (module membership) peut encore piloter Caddy via son **API d'administration** à `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort` ; sans effet si non défini ; exposé sous le groupe Intégrations de `ServerHealthController`) : `updateCaddy()` envoie un PATCH avec un tableau complet de routes, et `initializeCaddy()` ainsi que les points de terminaison `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstruisent entièrement un serveur configuré à l'exécution. Dans ce mode, la configuration n'existait que dans la mémoire de Caddy — l'« amnésie au redémarrage » que cette architecture a remplacée. Ce mécanisme ne subsiste que comme chemin de retour arrière et doit être supprimé une fois la machine statique stable ; la poussée best-effort `updateCaddy()` lors de l'enregistrement/suppression d'un domaine est sans effet néfaste sur la machine statique (son API d'administration n'est accessible que depuis localhost).

## Pages connexes

- [Proxy Caddy pour domaines personnalisés](../deployment/caddy-proxy) — la machine elle-même : installation d'une machine neuve, service WinSW, tâche de synchronisation de la correspondance et pièges d'exploitation
- [Créateur de site web](./website-builder) — l'arborescence page/section/élément, les moteurs de rendu, le blog, le SEO et la génération par IA (ce qui s'affiche une fois la requête associée à une église/un site)
- [Points de terminaison de contenu](../api/endpoints/content) — l'interface REST pour les pages, blocs, liens et styles globaux, tous désormais compatibles avec `?siteId=`
- [B1App](../web-apps/b1-app) — l'application Next.js qui héberge le middleware et le routage `[sdSlug]`
- [Déploiement des applications web](../deployment/web-apps) — comment B1App est déployée sur Vercel
