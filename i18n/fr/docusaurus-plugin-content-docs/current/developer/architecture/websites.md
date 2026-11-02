---
title: "Routage du site web et multi-sites"
---

# Routage du site web et multi-sites

<div class="article-intro">

Une seule église peut désormais servir plus d'un site web distinct, et chacun peut vivre sur un sous-domaine `*.b1.church` ou sur un domaine personnalisé entièrement géré par l'église. Cette page décrit la couche de routage qui se trouve *sous* le générateur : comment une requête entrante est associée à une église **et** à un site précis, le modèle de données multi-sites (la valeur sentinelle `siteId` qui garde chaque site existant en fonctionnement), et la périphérie des domaines personnalisés — un proxy Caddy auto-géré sur EC2 qui termine le TLS et réécrit chaque domaine d'église vers son upstream `*.b1.church`. Pour ce qui s'affiche une fois la requête associée — l'arbre pages/sections/éléments — voir [Générateur de site web](./website-builder).

</div>

## Vue d'ensemble

```
   grace.b1.church              www.gracechurch.org  (domaine personnalisé)
   (sous-domaine b1.church)               │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Périphérie Caddy — EC2 3.23.251.61        │
          │             │             (proxy.b1.church)             │
          │             │  • termine le TLS (certificat LE par domaine)│
          │             │  • réécrit Host → {sub}.b1.church        │
          │             │  • reverse-proxy vers B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • toujours : supprime tout en-tête x-site fourni par le client (anti-usurpation) │
   │  • Host interne *.b1.church ⇒ la recherche de domaines reste inactive │
   │  • Host personnalisé brut (sans Caddy) ⇒ recherche → définit x-site │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → premier label de l'hôte → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   transmet ?siteId= à chaque appel de contenu :  │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · plan du site  │
              └─────────────────────────────────────────────────┘

  sauvegarde/suppression de domaine (B1Admin Paramètres→Domaines → POST /membership/domains)
        └─ CaddyHelper.updateCaddy() au mieux  (encapsulé, non bloquant, délai de 10 s)
  Caddy lit lui-même la table des domaines par deux points de terminaison anonymes :
        GET /membership/domains/authorize  — `ask` du TLS à la demande (200 connu / 404 inconnu)
        GET /membership/domains/hostmap    — carte hôte→{sub}.b1.church (rafraîchie toutes les 5 min)
```

Trois règles tiennent dans cette couche :

1. **Une sentinelle assure la rétrocompatibilité.** `siteId = ''` désigne le site principal. Chaque page, bloc, lien, style global et ligne de domaine existant avant cette fonction porte `''` et s'affiche exactement comme avant. Un *second* site web n'est qu'un ensemble de lignes avec un `siteId` non vide, et tout point de terminaison de contenu appelé sans `?siteId=` renvoie le site principal — exactement la même requête qu'auparavant.
2. **La résolution repose sur le label de l'hôte et converge.** Un sous-domaine `*.b1.church` est routé par son label d'hôte directement ; un domaine personnalisé est réécrit vers son label `{sub}.b1.church` à la périphérie Caddy avant que B1App ne le voie (avec une recherche en base dans le middleware qui pose un en-tête `x-site` en repli pour tout `Host` personnalisé brut). Les deux trajets aboutissent à la même route `[sdSlug]` et au même appel `churches/lookup`, de sorte que le rendu en aval est identique.
3. **La périphérie Caddy est sans état sur une seule source de vérité.** Les domaines personnalisés se terminent sur un proxy Caddy auto-géré sur EC2, qui réécrit chaque domaine vers son upstream `{sub}.b1.church`. La sauvegarde d'un domaine déclenche un seul `CaddyHelper.updateCaddy()` au mieux, et Caddy lit aussi directement la table `domains` (les points de terminaison `authorize` et `hostmap` ci-dessous). La table fait foi — un Caddy injoignable ne peut jamais faire échouer une sauvegarde.

## Résolution du site

### Sous-domaines `*.b1.church`

`B1App/next.config.mjs` réécrit les requêtes entrantes selon l'hôte. Une règle d'hôte au motif `(?<subdomain>.*?)\..*` capture le **premier label** de l'hôte et réécrit `/` et `/:path*` en `/{subdomain}` — le segment App Router `[sdSlug]`. Ainsi, `grace.b1.church/about` devient `/grace/about`.

Dans `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) appelle `GET /membership/churches/lookup/?subDomain={sdSlug}`. La réponse de `ChurchController.getBySubDomain` comporte désormais deux branches :

| Le slug correspond à | Réponse | Signification |
|--------------|---------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Site principal de cette église |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **site secondaire** — le contrôleur se rabat sur `sites`, résout l'église propriétaire, et renvoie le slug demandé avec le `siteId` supplémentaire |

Ce `siteId` supplémentaire est le seul élément qui distingue une requête de site secondaire d'une requête de site principal ; tout le reste du pipeline est partagé.

Un slug qui ne correspond à aucune des deux tables revient sous la forme `{}` avec un `200`. `ConfigHelper.load` traite une réponse sans `id` comme un site inconnu et appelle `notFound()` de Next, de sorte qu'un sous-domaine inconnu reçoit un vrai 404 au lieu que chaque appel ultérieur demande `/…/undefined`. La route de page du générateur construit aussi son chemin d'arbre avec `pageTreePath()` (`src/helpers/pageTreePath.ts`), qui encode le slug en URL, de sorte qu'un slug mal formé (antislashs, espaces) renvoie 404 au lieu de faire remonter le `400` de l'API en erreur 500.

### Domaines personnalisés {#custom-domains}

Un domaine appartenant à l'église se termine à la **périphérie Caddy** (détaillée ci-dessous), qui réécrit l'en-tête `Host` vers le `{sub}.b1.church` du site avant de transmettre à B1App. Sur le chemin normal, B1App reçoit donc un hôte *interne* `*.b1.church` et le résout par label d'hôte exactement comme un sous-domaine natif — la recherche en base du middleware ne se déclenche jamais. `src/middleware.ts` s'exécute toujours sur chaque requête, mais avec un travail permanent et un repli :

1. **Toujours** — il **supprime tout en-tête `x-site` fourni par le client**. Cet en-tête est une entrée de réécriture falsifiable, et il n'est jamais considéré comme fiable que lorsque le middleware lui-même le pose ; le retirer est le véritable rôle du middleware derrière Caddy.
2. **Repli, seulement pour un `Host` non interne** — pour un `Host` de domaine personnalisé brut qui atteint B1App *sans* la réécriture de Caddy, il appelle `GET /membership/domains/public/lookup/{host}` et, si cela renvoie un `subDomain`, pose `x-site: {subDomain}.b1.church`. Derrière Caddy, cette branche est inactive, car le `Host` est déjà `*.b1.church`.

Les hôtes internes — `localhost`, `b1.church`, et les suffixes `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — sautent entièrement la recherche (ils sont déjà résolus par la réécriture de label d'hôte, ou sont des hôtes de prévisualisation ou de déploiement).

La recherche elle-même (`DomainRepo.loadByName`) fait une jointure externe gauche `domains → churches` et `domains → sites`, et renvoie `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — le sous-domaine du site secondaire attribué si le domaine pointe vers un site secondaire, sinon celui de l'église. Elle cherche d'abord l'hôte exact ; si cet hôte commençait par `www.` et ne trouve rien, elle réessaie **une seule fois** avec l'apex nu.

Dans `next.config.mjs`, les règles de réécriture `x-site` sont placées **avant** les règles d'hôte génériques, afin qu'elles l'emportent. `x-site: grace.b1.church` → premier label `grace` → `[sdSlug] = grace`, et à partir de là la résolution est identique au chemin par sous-domaine (même `churches/lookup`, même `siteId`).

:::info
L'en-tête `x-site` n'est pas fiable depuis l'extérieur. Le middleware retire inconditionnellement tout `x-site` entrant avant d'en poser éventuellement le sien, et les règles de réécriture ne voient que la valeur posée par le middleware — un client ne peut pas se forcer sur le contenu d'une autre église en envoyant un en-tête.
:::

Deux détails opérationnels du middleware :

- **Cache.** Le résultat de chaque hôte (un succès *ou* une absence confirmée — jamais une erreur réseau) est mis en cache pendant **10 minutes** dans une `Map` en mémoire, par isolat serverless.
- **Matcher.** Le matcher réinclut délibérément `/sitemap.xml`, `/robots.txt` et `/manifest.webmanifest`. Son premier motif exclut les chemins contenant un point, ce qui les ferait sinon disparaître ; ils sont réajoutés pour qu'un domaine personnalisé reçoive aussi l'en-tête `x-site` sur ses fichiers SEO/PWA propres à l'église.
- **En-tête canonique.** Pour les pages d'église, le middleware ajoute un en-tête de réponse `Link: <{proto}://{host}{path}>; rel="canonical"` qui nomme l'hôte à partir duquel la page a réellement été servie — sous-domaine ou domaine personnalisé (`helpers/canonicalLink.ts`). Lorsqu'un domaine personnalisé atteint B1App par le [proxy Caddy](../deployment/caddy-proxy.md), l'hôte de la requête est le sous-domaine `{sub}.b1.church`, donc le middleware utilise à la place le domaine du visiteur, lu dans `X-Church-Host` — mais seulement après que `/domains/public/lookup/{host}` confirme que ce domaine correspond au même sous-domaine (`ownsSubdomain()`). Le lien canonique, `robots.txt` et `sitemap.xml` désignent alors le domaine personnalisé plutôt que le sous-domaine `b1.church`. Il est ignoré sur les hôtes non églises (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) et sur `/mobile`, `/login`, `/logout`, ainsi que sur les fichiers robots/sitemap/manifest générés.

### Site public désactivé

Une église peut activer **Désactiver le site public** dans B1Admin (paramètre de contenu au niveau de l'église `hidePublicSite = "true"`). Le site ne sert alors que ses routes destinées aux membres :

- **Le middleware de B1App** recherche le sous-domaine (`/membership/churches/lookup` puis `/content/settings/public/:churchId`) et redirige les requêtes anonymes vers tout chemin hors de la liste blanche vers `/login?returnUrl={path}{query}`. La liste blanche (`helpers/publicSite.ts`) comprend `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, et les fichiers manifest/robots/sitemap. Seules les réponses confirmées sont mises en cache (60 secondes en production, car l'appel de revalidation de l'administrateur ne peut pas vider cette `Map` propre à chaque instance ; sans cache en développement/test). Une erreur de l'API sert le site plutôt que de verrouiller tout le monde dehors.
- **Les membres connectés voient le site complet.** Une requête portant un cookie `jwt` non expiré (la fonction `hasSession()` du middleware décode le `exp` de la charge utile sans vérifier la signature — c'est une barrière souple, et non un contrôle d'accès) saute la redirection ; ainsi, après la connexion, un membre revient à la page demandée et voit les pages normales, les pages intégrées (Groupes, Sermons, etc.) et la navigation d'en-tête. Les composants de page et `Header` ne vérifient plus eux-mêmes `hidePublicSite`.
- **`robots.txt`** interdit tout, comme sur les hôtes en noindex.
- **API.** `GET /content/pages/public/:churchId` (la liste des pages du plan du site) renvoie `[]`, de sorte que les appelants anonymes ne peuvent pas énumérer les pages.

### Propagation de `siteId`

`ConfigHelper` stocke le `siteId` résolu dans sa `ConfigurationInterface` par requête (mémoïsée avec `cache()` de React) et ajoute `?siteId=` aux appels de contenu qu'il effectue ainsi qu'à ceux des composants de page — **conditionnellement** : un `siteId` vide (sous-domaine d'une église principale) omet entièrement le paramètre. Les points de terminaison concernés sont l'arbre des pages (`/content/pages/:id/tree`), la liste publique des pages utilisée par le plan du site (`/content/pages/public/:id`), les styles globaux (`/content/globalStyles/church/:id`), les liens de navigation (`/content/links/church/:id`), et le bloc de pied de page autonome (`/content/blocks/public/footer/:id`). Sur le chemin de rendu normal, le pied de page arrive dans l'arbre des pages (sections marquées `zone: "siteFooter"`), déjà récupéré avec `siteId`, de sorte qu'il n'existe aucun trou de pied de page non délimité.

L'application membre (B1App `mobile`) reste volontairement à l'écart : `loadChurchAppearance.ts` résout l'église via `churches/lookup` mais lit les `/settings/public/{id}` au niveau de l'église et ne transmet jamais `siteId` — le portail est à l'échelle de l'église dans la v1 (voir plus bas).

## Plusieurs sites web par église

### Modèle de données

La nouvelle table `membership.sites` est volontairement minimale :

| Colonne | Type | Remarques |
|--------|------|--------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Église propriétaire |
| `name` | `varchar(255)` | Nom affiché (par ex. « Español », « Jeunesse ») |
| `subDomain` | `varchar(45)` | **Index unique** — espace de noms global (voir ci-dessous) |

La délimitation par site se réduit alors à une seule colonne, non nulle, ajoutée aux tables de contenu et de domaines :

| Table (module) | Colonne | `''` signifie |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Le domaine sert le site principal |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Site principal — et, sur **`blocks`**, `''` signifie en outre *partagé entre tous les sites* |

Deux migrations ajoutent tout cela (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Comme la colonne vaut `''` par défaut, chaque ligne existante conserve le comportement actuel sans aucun remplissage.

**Espace de noms global des sous-domaines.** `sites.subDomain` partage *un seul* espace de noms avec `churches.subDomain` — le sous-domaine d'un site ne peut jamais entrer en collision avec un sous-domaine d'église ou avec celui d'un autre site. Cela est appliqué sur **les deux** chemins de sauvegarde : `SiteController.save` rejette un slug qui touche `churches` ou `sites`, et `ChurchController.validateSave` fait de même dans l'autre sens. Un index unique sur `sites.subDomain` le garantit au niveau de la base de données.

**L'unicité des pages** est élargie de `(churchId, url)` à `(churchId, siteId, url)`, de sorte que deux sites d'une même église peuvent chacun posséder leur propre `/about`.

### Contenu par site, avec replis

Chaque point de terminaison de **liste/arbre** de contenu délimité par site accepte un `?siteId=` facultatif (absent ⇒ `''` = principal) : arbre / liste / public des pages, liste / par type / pied de page des blocs, liens (anonymes / filtrés / tous), et styles globaux. Les sections et les éléments ne sont pas délimités directement — ils héritent de leur page ou de leur bloc parent.

Deux chaînes de résolution font le travail intéressant :

- **Styles globaux — `site → principal → défaut`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` renvoie la propre ligne du site ; si un site secondaire n'en a pas, il renvoie **telle quelle la ligne principale (`''`)** (en gardant l'`id`/le `siteId` du principal, que le client utilise pour la copie sur écriture) ; s'il n'y a pas non plus de principal, `GlobalStyleController` renvoie une palette et des polices par défaut codées en dur.
- **Bloc de pied de page — le spécifique au site l'emporte, le partagé sert de repli.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` renvoie les lignes partagées (`''`) *et* celles propres au site ; le résolveur choisit le pied de page du site s'il existe, sinon le partagé. La même logique s'applique à `TreeHelper.insertBlocks` (arbre de page) et au point de terminaison autonome `/content/blocks/public/footer/:churchId`.

### Suppression en cascade d'un site

`SiteController.delete` (protégé par l'autorisation Paramètres→Modifier du module membership) supprime un site secondaire en trois étapes :

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` supprime en cascade tout le contenu que possède le site : ses **pages** → leurs sections, éléments, `pageHistory` et `posts` ; ses propres **blocs** → leurs sections, éléments et `pageHistory` ; ses **liens** et **globalStyles**. Une garde refuse de s'exécuter pour `''` — la sentinelle principale/partagée n'est jamais supprimée en cascade.
2. `DomainRepo.clearSiteId` **réassigne** les domaines du site au principal (`siteId → ''`) au lieu de les supprimer, de sorte qu'un domaine personnalisé survit à la suppression d'un site.
3. La ligne `sites` est supprimée et les routes Caddy sont resynchronisées (au mieux).

### Interface de B1Admin

| Capacité | Emplacement | Mécanisme |
|-----------|-----------|-----------|
| Sélecteur de site | `useSiteSelection` + `SiteSwitcher` (vide = « Site principal ») | Lit un paramètre d'URL `?site=` et le transmet sous forme de `?siteId=` aux appels ContentApi. Présent sur les trois **listes** de Site — **Pages**, **Blocs**, **Apparence** — mais *pas* sur les éditeurs de page/bloc, qui portent `siteId` dans l'enregistrement |
| Création/suppression de sites | `SitesDialog`, ouvert depuis l'entrée « Gérer les sites web… » du sélecteur | `POST /membership/sites` / `DELETE /membership/sites/:id` (nom + subDomain). Protégé par l'autorisation Paramètres→Modifier du module membership (`Permissions.settings.edit` côté serveur ; `Permissions.membershipApi.settings.edit` dans B1Admin). **Création/suppression seulement — il n'existe pas d'interface de renommage dans la v1** |
| Attribution de site par domaine | `DomainSettingsEdit` sous Paramètres→Domaines | Une liste déroulante de site par ligne envoie `siteId` par domaine à `/membership/domains`. La colonne se masque si l'API ne renvoie aucun site (backend plus ancien) |
| Styles en copie sur écriture | `StylesManager.prepareForSave` | Lorsque la ligne de styles globaux chargée a un `siteId` qui ne correspond pas au site sélectionné (c'est-à-dire que l'API a renvoyé le principal hérité comme repli), il retire l'`id` du principal et appose le `siteId` courant, forçant une **insertion** d'une nouvelle ligne propre au site au lieu d'écraser le principal. La même bifurcation en cas de non-correspondance s'applique au bloc de pied de page du site |

:::info
**Ce qui reste à l'échelle de l'église dans la v1 (un choix de portée délibéré, et non une limite du modèle de données) :** le **blogue** (`BlogPage` n'a pas de sélecteur et charge `/posts` sans `siteId`), les **widgets du site** (bandeau d'annonce + lanceur), les **redirections**, le **logo / GA4 / paramètres de l'église**, et le **portail des membres** (mobile B1App). Notez qu'il ne s'agit *pas* de « toute l'Apparence » — les styles globaux d'un site secondaire (palette, polices, typographie, espacement, navigation, CSS personnalisé) **sont** propres à chaque site via le chemin de copie sur écriture ci-dessus ; seuls les sous-panneaux bandeau/lanceur/redirections/logo de la page Apparence restent à l'échelle de l'église.
:::

## Domaines personnalisés : périphérie Caddy (plan de configuration statique)

:::info
**Orientation révisée le 2026-07-02.** Un projet antérieur qui visait à déplacer l'hébergement des domaines personnalisés vers des domaines gérés par Vercel a été **abandonné**, et tout le code d'enregistrement de domaines Vercel (`VercelHelper`, ses variables d'environnement `vercelToken`/`vercelProjectId`/`vercelTeamId`, les paramètres SSM et les vérifications de santé) a été retiré de l'Api. Le **proxy Caddy auto-géré sur EC2 reste** comme périphérie permanente des domaines personnalisés. Il ne reste qu'un travail interne : remplacer la configuration à l'*exécution* de l'API d'administration de Caddy par une configuration *statique* qui survit aux redémarrages.
:::

### La périphérie

Chaque domaine personnalisé d'église pointe son DNS vers une seule machine EC2 — `3.23.251.61`, aussi joignable sous `proxy.b1.church`. L'écran Paramètres→Domaines de B1Admin demande aux églises d'ajouter un `A` d'apex vers `3.23.251.61` ou un `CNAME` vers `proxy.b1.church`. Caddy termine le TLS avec un certificat Let's Encrypt par domaine, réécrit l'en-tête `Host` vers l'upstream `{sub}.b1.church` du domaine, et fait du reverse proxy vers B1App — qui le route ensuite par label d'hôte comme n'importe quel sous-domaine natif (voir [Domaines personnalisés](#custom-domains) plus haut).

La correspondance vers l'upstream vient de `DomainRepo.loadPairs`, dont la destination fait un COALESCE du sous-domaine du site attribué, de sorte qu'un domaine est proxifié vers le bon *site secondaire*, avec repli sur le principal de l'église :

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Les lignes `www.*` sont exclues de la correspondance ; Caddy sert `www.{host}` par une redirection `302` vers l'apex.

### Deux points de terminaison anonymes alimentent la périphérie

`DomainController` expose deux points de terminaison en lecture seule, sans authentification, que la machine consomme directement — anonymes par nécessité, puisque la périphérie les interroge avant même qu'un contexte d'église n'existe :

| Point de terminaison | Renvoie | Rôle |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` si le domaine — ou, pour un échec sur `www.`, son apex nu — existe dans `domains` ; `404` sinon (y compris pour un `domain` vide) | Le **`ask` du TLS à la demande** de Caddy : le contrôle anti-abus qui décide s'il faut émettre un certificat pour un SNI entrant |
| `GET /membership/domains/hostmap` | `text/plain`, une ligne triée `{domain} {sub}.b1.church` par domaine routable | Le fichier de correspondance hôte→upstream que la machine rafraîchit par minuterie |

`authorize` réutilise `DomainRepo.loadByName` (hôte exact, puis un nouvel essai `www.`→apex) ; `hostmap` réutilise `loadPairs` — il est donc sensible au site et exclut les `www.*`, comme les routes proxy — et ne fait que retirer le suffixe `:443`.

### Sauvegarde/suppression d'un domaine — une seule poussée au mieux

`DomainController.save` écrit les lignes `domains`, puis effectue un **seul appel au mieux** `CaddyHelper.updateCaddy()`, encapsulé dans un `try/catch` qui journalise (`console.error`) et avale l'erreur ; `delete` fait de même (ce qui a aussi corrigé un ancien bogue de route obsolète après suppression), de même que la suppression d'un site secondaire (`SiteController.delete`). `updateCaddy` est lui-même borné par un délai Axios de **10 s**, de sorte qu'un Caddy injoignable ou arrêté ne peut jamais faire renvoyer une erreur 500 à une sauvegarde de domaine — la table `domains` fait foi.

### État actuel — configuration statique, aucun état d'exécution

La machine (un EC2 Windows derrière l'IP élastique permanente) exécute Caddy avec un **Caddyfile statique** : TLS à la demande dont le `ask` pointe vers `/membership/domains/authorize`, plus un fichier de correspondance hôte→upstream rafraîchi toutes les 5 minutes depuis `/membership/domains/hostmap` par une tâche planifiée qui se termine par un `caddy reload` gracieux. La configuration survit aux redémarrages sans aucun état d'exécution — pas de réamorçage manuel — et un SNI inconnu est **refusé au niveau TLS** (aucun certificat n'est émis pour un hôte que `authorize` rejette), tandis qu'un hôte autorisé mais pas encore mappé (un domaine tout neuf dans la fenêtre de synchronisation) reçoit un 404 propre. Les nouveaux domaines deviennent routables dans les 5 minutes suivant une sauvegarde ; leurs certificats sont émis au premier accès. Installation, exploitation et pièges éprouvés : [Proxy Caddy pour domaines personnalisés](../deployment/caddy-proxy).

### Poussée d'exécution héritée — voie de retour arrière, suppression prévue

`CaddyHelper` (module membership) peut encore piloter Caddy par son **API d'administration** sur `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort` ; sans effet si non défini ; exposé sous le groupe Intégrations de `ServerHealthController`) : `updateCaddy()` envoie un PATCH du tableau complet des routes, et `initializeCaddy()` ainsi que les points de terminaison `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstruisent entièrement un serveur configuré à l'exécution. Dans ce mode, la configuration ne vivait que dans la mémoire de Caddy — l'« amnésie au redémarrage » que cette architecture a remplacée. Le mécanisme subsiste uniquement comme voie de retour arrière et est prévu pour suppression une fois la machine statique stable ; la poussée `updateCaddy()` au mieux, à la sauvegarde ou à la suppression d'un domaine, est sans effet inoffensif sur la machine statique (son API d'administration n'écoute qu'en local).

## Pages connexes

- [Proxy Caddy pour domaines personnalisés](../deployment/caddy-proxy) — la machine de périphérie elle-même : installation à partir de zéro, service WinSW, tâche de synchronisation de la carte, et pièges d'exploitation
- [Générateur de site web](./website-builder) — l'arbre pages/sections/éléments, les moteurs de rendu, le blogue, le référencement et la génération par IA (ce qui s'affiche une fois la requête associée à une église/un site)
- [Points de terminaison Content](../api/endpoints/content) — la surface REST des pages, blocs, liens et styles globaux, tous désormais sensibles à `?siteId=`
- [B1App](../web-apps/b1-app) — l'application Next.js qui héberge le middleware et le routage `[sdSlug]`
- [Déploiement des applications web](../deployment/web-apps) — comment B1App est déployé sur Vercel
