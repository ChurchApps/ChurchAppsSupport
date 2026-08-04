---
title: "Routage du site Web et multi-site"
---

# Routage du site Web et multi-site

<div class="article-intro">

Une seule église peut désormais servir plus d'un site web distinct, et chacun peut vivre sur un sous-domaine `*.b1.church` ou sur un domaine entièrement personnalisé appartenant à l'église. Cette page décrit la couche de routage qui se situe *en dessous* du constructeur : comment une requête entrante se résout vers une église **et** vers un site spécifique, le modèle de données multi-site (la sentinelle `siteId` qui garde chaque site préexistant avec un rendu inchangé), et le bord de domaine personnalisé — un proxy Caddy auto-géré sur EC2 qui termine le TLS et réécrit chaque domaine d'église vers son amont `*.b1.church`. Pour ce qui se rend réellement une fois qu'une requête s'est résolue — l'arbre page/section/élément — voir [Constructeur de site Web](./website-builder).

</div>

## Vue d'ensemble

```
   grace.b1.church              www.gracechurch.org  (domaine personnalisé)
   (sous-domaine b1.church)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Bord Caddy — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • termine le TLS (certificat LE par domaine) │
          │             │  • réécrit Host → {sub}.b1.church        │
          │             │  • proxy inverse vers B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • toujours : supprime tout x-site fourni par le client (anti-spoof) │
   │  • Host *.b1.church interne ⇒ la recherche de domaines reste inerte  │
   │  • Host personnalisé brut (contourne Caddy) ⇒ recherche → définit x-site │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → première étiquette de l'hôte → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   enfile ?siteId= dans chaque appel de contenu : │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  sauvegarde/suppression de domaine (B1Admin Settings→Domains → POST /membership/domains)
        └─ meilleur effort CaddyHelper.updateCaddy()  (encapsulé, non fatal, délai 10s)
  Caddy lit lui-même la table des domaines via deux points de terminaison anonymes :
        GET /membership/domains/authorize  — `ask` TLS à la demande (200 connu / 404 inconnu)
        GET /membership/domains/hostmap    — carte hôte→{sub}.b1.church (rafraîchissement 5 min)
```

Trois règles tiennent sur cette couche :

1. **Une sentinelle garde tout rétrocompatible.** `siteId = ''` est le site primaire. Chaque page, bloc, lien, style global, et ligne de domaine qui existait avant cette fonctionnalité porte `''` et se rend exactement comme avant. Un *second* site web est simplement un ensemble de lignes avec un `siteId` non vide, et tout point de terminaison de contenu appelé sans `?siteId=` renvoie le site primaire — octet pour octet, la requête d'antan.
2. **La résolution est basée sur l'étiquette d'hôte et converge.** Un sous-domaine `*.b1.church` s'achemine directement par son étiquette d'hôte ; un domaine personnalisé est réécrit vers son étiquette `{sub}.b1.church` au bord Caddy avant que B1App ne le voie (avec une recherche BD du middleware qui estampille un en-tête `x-site` comme repli pour tout `Host` personnalisé brut). Les deux voies aboutissent à la même route `[sdSlug]` et au même appel `churches/lookup`, si bien que le rendu en aval est identique.
3. **Le bord Caddy est sans état par rapport à une source de vérité unique.** Les domaines personnalisés se terminent à un proxy Caddy auto-géré sur EC2 qui réécrit chaque domaine vers son amont `{sub}.b1.church`. Une sauvegarde de domaine déclenche un unique appel au mieux `CaddyHelper.updateCaddy()`, et Caddy lit aussi directement la table `domains` (les points de terminaison `authorize` et `hostmap` ci-dessous). La table fait autorité — un Caddy inaccessible ne peut jamais faire échouer une sauvegarde.

## Résolution de site

### Sous-domaines `*.b1.church`

`B1App/next.config.mjs` réécrit les requêtes entrantes par hôte. Une règle d'hôte avec le motif `(?<subdomain>.*?)\..*` capture la **première étiquette** de l'hôte et réécrit `/` et `/:path*` vers `/{subdomain}` — le segment App Router `[sdSlug]`. Ainsi, `grace.b1.church/about` devient `/grace/about`.

À l'intérieur de `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) appelle `GET /membership/churches/lookup/?subDomain={sdSlug}`. La réponse de `ChurchController.getBySubDomain` a désormais deux branches :

| L'étiquette correspond à | Réponse | Signification |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Site primaire de cette église |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **site secondaire** — le contrôleur se replie sur `sites`, résout l'église propriétaire, et retourne l'étiquette interrogée plus le `siteId` supplémentaire |

Ce `siteId` supplémentaire est la seule chose qui distingue une requête de site secondaire d'une requête primaire ; tout le reste du pipeline est partagé.

### Domaines personnalisés

Un domaine appartenant à une église se termine au **bord Caddy** (détaillé ci-dessous), qui réécrit l'en-tête `Host` vers le `{sub}.b1.church` du site avant de faire un proxy vers B1App. Ainsi, sur le chemin normal, B1App reçoit un hôte *interne* `*.b1.church` et le résout par étiquette d'hôte exactement comme un sous-domaine natif — la recherche BD du middleware ne se déclenche jamais. `src/middleware.ts` s'exécute quand même à chaque requête, mais avec une tâche toujours active et un repli :

1. **Toujours** — il **supprime tout en-tête `x-site` fourni par le client**. Cet en-tête est une entrée de réécriture usurpable et n'est jamais approuvé que lorsque le middleware lui-même l'a défini ; le supprimer est le véritable travail du middleware derrière Caddy.
2. **Repli, uniquement pour un `Host` non interne** — pour un `Host` de domaine personnalisé brut qui atteint B1App *sans* la réécriture de Caddy, il appelle `GET /membership/domains/public/lookup/{host}` et, si cela renvoie un `subDomain`, définit `x-site: {subDomain}.b1.church`. Derrière Caddy, cette branche est inerte car le `Host` est déjà `*.b1.church`.

Les hôtes internes — `localhost`, `b1.church`, et les suffixes `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — sautent entièrement la recherche (ils sont déjà résolus par la réécriture d'étiquette d'hôte, ou ce sont des hôtes de prévisualisation/déploiement).

La recherche elle-même (`DomainRepo.loadByName`) fait une jointure gauche `domains → churches` et `domains → sites` et renvoie `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — le sous-domaine du site secondaire assigné si le domaine pointe vers un, sinon celui de l'église. Elle correspond d'abord à l'hôte exact ; si cet hôte commençait par `www.` et a échoué, elle réessaie **une fois** contre l'apex nu.

Retour dans `next.config.mjs`, les règles de réécriture `x-site` sont placées **avant** les règles d'hôte génériques, si bien qu'elles l'emportent. `x-site: grace.b1.church` → première étiquette `grace` → `[sdSlug] = grace`, et à partir de là la résolution est identique au chemin de sous-domaine (même `churches/lookup`, même `siteId`).

:::info
L'en-tête `x-site` n'est pas approuvé venant de l'extérieur. Le middleware supprime inconditionnellement tout `x-site` entrant avant de définir éventuellement le sien, et les règles de réécriture ne voient jamais que la valeur définie par le middleware — un client ne peut pas se forcer sur le contenu d'une autre église en envoyant un en-tête.
:::

Deux détails opérationnels sur le middleware :

- **Cache.** Le résultat de chaque hôte (un succès *ou* un échec confirmé — jamais une erreur réseau) est mis en cache pendant **10 minutes** dans une `Map` en mémoire, par isolat serverless.
- **Matcher.** Le matcher réinclut délibérément `/sitemap.xml`, `/robots.txt`, et `/manifest.webmanifest`. Son premier motif exclut les chemins avec point, ce qui abandonnerait sinon ces fichiers ; ils sont rajoutés pour que les fichiers SEO/PWA par église d'un domaine personnalisé reçoivent eux aussi l'en-tête `x-site`.

### Enfilage du `siteId`

`ConfigHelper` stocke le `siteId` résolu sur son `ConfigurationInterface` par requête (mémoïsé avec React `cache()`) et ajoute `?siteId=` aux appels de contenu qu'il effectue ainsi qu'aux composants de page qu'il alimente — **conditionnellement** : un `siteId` vide (un sous-domaine d'église primaire) omet complètement le paramètre. Les points de terminaison enfilés sont l'arbre de page (`/content/pages/:id/tree`), la liste de pages publiques utilisée par la sitemap (`/content/pages/public/:id`), les styles globaux (`/content/globalStyles/church/:id`), les liens de navigation (`/content/links/church/:id`), et le bloc de pied de page autonome (`/content/blocks/public/footer/:id`). Sur le chemin de rendu normal, le pied de page arrive à l'intérieur de l'arbre de page (sections marquées `zone: "siteFooter"`), déjà récupéré avec `siteId`, si bien qu'il n'y a pas de lacune de pied de page non délimité.

Le portail des membres (B1App `mobile`) se situe délibérément en dehors de ceci : `loadChurchAppearance.ts` résout l'église via `churches/lookup` mais lit `/settings/public/{id}` au niveau église et n'enfile jamais `siteId` — le portail est à l'échelle de l'église en v1 (voir ci-dessous).

## Sites web multiples par église

### Modèle de données

La nouvelle table `membership.sites` est délibérément minuscule :

| Colonne | Type | Notes |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Église propriétaire |
| `name` | `varchar(255)` | Nom d'affichage (par ex. « Español », « Youth ») |
| `subDomain` | `varchar(45)` | Index **unique** — espace de noms global (ci-dessous) |

La délimitation par site est ensuite une seule colonne sans nullabilité, ajoutée aux tables content et domain :

| Table (module) | Colonne | `''` signifie |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Le domaine sert le site primaire |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Site primaire — et sur **`blocks`**, `''` signifie en plus *partagé entre tous les sites* |

Deux migrations ajoutent tout ceci (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Comme la colonne vaut `''` par défaut, chaque ligne existante conserve le comportement d'aujourd'hui sans remplissage rétroactif.

**Espace de noms de sous-domaine global.** `sites.subDomain` partage *un seul* espace de noms avec `churches.subDomain` — un sous-domaine de site ne peut jamais entrer en collision avec un sous-domaine d'église ou celui d'un autre site. Ceci est appliqué sur **les deux** chemins de sauvegarde : `SiteController.save` rejette une étiquette qui touche soit `churches` soit `sites`, et `ChurchController.validateSave` fait de même en sens inverse. Un index unique sur `sites.subDomain` le soutient au niveau base de données.

**L'unicité des pages** est élargie de `(churchId, url)` à `(churchId, siteId, url)`, si bien que deux sites d'une même église peuvent chacun posséder leur propre `/about`.

### Contenu par site, avec replis

Chaque point de terminaison **liste/arbre** de contenu délimité par site accepte un `?siteId=` optionnel (absent ⇒ `''` = primaire) : arbre/liste/public de pages, liste de blocs/par type/pied de page, liens (anon / filtré / tout), et styles globaux. Les sections et éléments ne sont *pas* délimités directement — ils héritent via leur page ou bloc parent.

Deux chaînes de résolution font le travail intéressant :

- **Styles globaux — `site → primaire → défaut`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` renvoie la propre ligne du site ; si un site secondaire n'en a aucune, il renvoie la ligne **primaire (`''`) telle quelle** (en conservant l'`id`/`siteId` du primaire, que le client utilise pour la copie à l'écriture) ; s'il n'y a pas non plus de primaire, `GlobalStyleController` renvoie une palette/police par défaut codée en dur.
- **Bloc de pied de page — le spécifique au site l'emporte, le partagé sert de repli.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` renvoie les lignes partagées (`''`) *et* spécifiques au site ; le résolveur choisit le propre pied de page du site s'il existe, sinon le pied de page partagé. La même logique s'exécute à la fois dans `TreeHelper.insertBlocks` (arbre de page) et dans le point de terminaison autonome `/content/blocks/public/footer/:churchId`.

### Cascade de suppression de site

`SiteController.delete` (protégé par la permission Settings→Edit du membership) démantèle un site secondaire en trois étapes :

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` fait une cascade sur tout le contenu que le site possède : ses **pages** → leurs sections, éléments, `pageHistory`, et `posts` ; ses propres **blocs** → leurs sections, éléments, et `pageHistory` ; ses **liens** et **globalStyles**. Un garde-fou refuse de s'exécuter pour `''` — la sentinelle primaire/partagée n'est jamais mise en cascade.
2. `DomainRepo.clearSiteId` **réassigne** les domaines du site au primaire (`siteId → ''`) plutôt que de les supprimer, si bien qu'un domaine personnalisé survit à une suppression de site.
3. La ligne `sites` est supprimée et les routes Caddy sont resynchronisées (au mieux).

### Surface B1Admin

| Capacité | Où | Mécanisme |
|-----------|-------|-----------|
| Sélecteur de site | `useSiteSelection` + `SiteSwitcher` (vide = « Site principal ») | Lit un paramètre d'URL `?site=` et l'enfile comme `?siteId=` dans les appels ContentApi. Présent sur les trois zones de **liste** du Site — **Pages**, **Blocs**, **Apparence** — mais *pas* dans les éditeurs de page/bloc, qui portent `siteId` sur l'enregistrement |
| Création/suppression de sites | `SitesDialog`, ouvert depuis l'entrée « Gérer les sites web… » du sélecteur | `POST /membership/sites` / `DELETE /membership/sites/:id` (nom + sous-domaine). Protégé par la permission Settings→Edit du membership (`Permissions.settings.edit` côté serveur ; `Permissions.membershipApi.settings.edit` dans B1Admin). **Création/suppression uniquement — il n'y a pas d'interface de renommage en v1** |
| Assignation de site par domaine | `DomainSettingsEdit` sous Settings→Domains | Une liste déroulante de site par ligne poste `siteId` par domaine vers `/membership/domains`. La colonne se cache si l'API ne renvoie aucun site (backend plus ancien) |
| Copie à l'écriture des styles | `StylesManager.prepareForSave` | Quand le `siteId` de la ligne de style global chargée ne correspond pas au site sélectionné (c.-à-d. l'API a renvoyé le primaire hérité comme repli), il abandonne l'`id` du primaire et estampille le `siteId` actuel, forçant une **insertion** d'une nouvelle ligne spécifique au site plutôt que d'écraser le primaire. Le même fork-sur-désaccord s'applique au bloc de pied de page du site |

:::info
**Ce qui reste à l'échelle de l'église en v1 (un choix de délimitation délibéré, pas une limite du modèle de données) :** le **blog** (`BlogPage` n'a pas de sélecteur et charge `/posts` sans `siteId`), les **widgets de site** (bannière d'annonce + lanceur), les **redirections**, le **logo / GA4 / paramètres d'église**, et le **portail des membres** (B1App mobile). Notez que ce n'est *pas* « toute l'Apparence » — les styles globaux d'un site secondaire (palette, polices, typographie, espacement, navigation, CSS personnalisé) **sont** par site via le chemin de copie à l'écriture ci-dessus ; seuls les sous-panneaux bannière/lanceur/redirections/logo de la page Apparence restent à l'échelle de l'église.
:::

## Domaines personnalisés : bord Caddy (plan de configuration statique)

:::info
**Direction révisée le 2026-07-02.** Un plan antérieur pour déplacer l'hébergement de domaines personnalisés vers des domaines gérés par Vercel a été **annulé**, et tout le code d'enregistrement de domaine Vercel (`VercelHelper`, ses variables d'environnement `vercelToken`/`vercelProjectId`/`vercelTeamId`, les paramètres SSM, et les entrées de santé) a été retiré de l'Api. Le **proxy Caddy auto-géré sur EC2 reste** comme bord de domaine personnalisé permanent. Le seul travail restant est interne : remplacer la configuration *à l'exécution* de l'API admin de Caddy par une configuration *statique* qui survit aux redémarrages.
:::

### Le bord

Chaque domaine d'église personnalisé pointe le DNS vers une seule boîte EC2 — `3.23.251.61`, aussi accessible sous le nom `proxy.b1.church`. L'écran Settings→Domains de B1Admin demande aux églises d'ajouter un `A → 3.23.251.61` en apex ou un `CNAME → proxy.b1.church`. Caddy termine le TLS avec un certificat Let's Encrypt par domaine, réécrit l'en-tête `Host` vers le `{sub}.b1.church` amont du domaine, et fait un proxy inverse vers B1App — qui le route ensuite par étiquette d'hôte comme tout sous-domaine natif (voir [Domaines personnalisés](#custom-domains) ci-dessus).

La correspondance amont provient de `DomainRepo.loadPairs`, dont l'adresse **applique un COALESCE sur le sous-domaine du site assigné** afin qu'un domaine fasse un proxy vers le bon site *secondaire*, en se repliant sur le primaire de l'église :

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Les lignes `www.*` sont exclues de la carte ; Caddy sert `www.{host}` via une redirection `302` vers l'apex à la place.

### Deux points de terminaison anonymes alimentent le bord

`DomainController` expose deux points de terminaison non authentifiés, en lecture seule, que la boîte consomme directement — anonymes par nécessité, puisque le bord les interroge avant qu'aucun contexte d'église n'existe :

| Point de terminaison | Renvoie | Rôle |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` si le domaine — ou, pour un échec `www.`, son apex nu — existe dans `domains` ; `404` sinon (y compris pour un `domain` vide) | Le `ask` TLS à la demande de Caddy : le contrôle anti-abus décidant s'il faut émettre un certificat pour un SNI entrant |
| `GET /membership/domains/hostmap` | `text/plain`, une ligne `{domain} {sub}.b1.church` triée par domaine routable | Le fichier de carte hôte→amont que la boîte rafraîchit selon un minuteur |

`authorize` réutilise `DomainRepo.loadByName` (hôte exact, puis un seul réessai `www.`→apex) ; `hostmap` réutilise `loadPairs` — il est donc conscient du site et exclut `www.*`, identique aux routes du proxy — et retire simplement le suffixe `:443`.

### Sauvegarde/suppression de domaine — un seul appel au mieux

`DomainController.save` écrit les lignes `domains` puis effectue un **unique** appel au mieux `CaddyHelper.updateCaddy()`, encapsulé dans un `try/catch` qui journalise (`console.error`) et avale l'erreur ; `delete` fait de même (ce qui a aussi corrigé un ancien bug de route obsolète à la suppression), tout comme la suppression de site secondaire (`SiteController.delete`). `updateCaddy` est elle-même bornée par un délai Axios de **10s**, si bien qu'un Caddy inaccessible ou arrêté ne peut jamais faire `500` une sauvegarde de domaine — la table `domains` fait autorité.

### État actuel — configuration statique, aucun état à l'exécution

La boîte (Windows EC2 derrière l'IP élastique permanente) exécute Caddy à partir d'un **Caddyfile statique** : TLS à la demande dont le `ask` pointe vers `/membership/domains/authorize`, plus un fichier de carte hôte→amont rafraîchi toutes les 5 minutes depuis `/membership/domains/hostmap` par une tâche planifiée qui se termine par un `caddy reload` gracieux. La configuration survit aux redémarrages avec zéro état à l'exécution — pas de danse de ré-amorçage — et un SNI inconnu est **refusé au niveau TLS** (aucun certificat n'est frappé pour un hôte qu'`authorize` rejette), tandis qu'un hôte autorisé mais pas-encore-cartographié (un domaine tout nouveau à l'intérieur de la fenêtre de synchronisation de 5 minutes) reçoit un 404 propre. Les nouveaux domaines deviennent routables dans les ~5 minutes suivant une sauvegarde ; leurs certificats sont frappés au premier accès. Construction/configuration, opérations, et pièges éprouvés sur le terrain : [Proxy Caddy pour domaines personnalisés](../deployment/caddy-proxy).

### Ancien mode de poussée à l'exécution — chemin de repli, en attente de suppression

`CaddyHelper` (module membership) peut toujours piloter Caddy via son **API d'administration** à `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort` ; no-op quand non défini ; affiché sous le groupe Intégrations du `ServerHealthController`) : `updateCaddy()` fait un PATCH sur un tableau complet de routes, et `initializeCaddy()` + les points de terminaison `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstruisent de zéro un serveur configuré à l'exécution. La configuration de ce mode ne vivait que dans la mémoire de Caddy — l'amnésie au redémarrage que cette architecture a remplacée. La mécanique subsiste uniquement comme chemin de repli et est programmée pour suppression une fois la boîte statique stabilisée ; la poussée au mieux `updateCaddy()` à la sauvegarde/suppression de domaine est un no-op inoffensif contre la boîte statique (son API d'administration n'est accessible qu'en localhost).

## Pages connexes

- [Proxy Caddy pour domaines personnalisés](../deployment/caddy-proxy) — la boîte de bord elle-même : configuration d'une boîte neuve, service WinSW, tâche de synchronisation de carte, et pièges opérationnels
- [Constructeur de site Web](./website-builder) — l'arbre page/section/élément, les moteurs de rendu, le blog, le SEO, et la génération par IA (ce qui se rend une fois qu'une requête s'est résolue vers une église/un site)
- [Points de terminaison de contenu](../api/endpoints/content) — la surface REST pour les pages, blocs, liens, et styles globaux, tous désormais conscients de `?siteId=`
- [B1App](../web-apps/b1-app) — l'application Next.js qui héberge le middleware et le routage `[sdSlug]`
- [Déploiement des applications Web](../deployment/web-apps) — comment B1App est déployée sur Vercel
