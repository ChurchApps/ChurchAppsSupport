---
title: "Routage du site Web et multi-site"
---

# Routage du site Web et multi-site

<div class="article-intro">

Une seule église peut maintenant servir plus d'un site web distinct, et chacun peut vivre sur un sous-domaine `*.b1.church` ou sur un domaine entièrement personnalisé, propriété de l'église. Cette page mappe la couche de routage qui repose *en-dessous* du constructeur : comment une demande entrante se résout à une église **et** à un site spécifique, le modèle de données multi-site (la sentinel `siteId` qui garde chaque site pré-existant rendant inchangé), et l'arête du domaine personnalisé — un proxy Caddy auto-géré sur EC2 qui termine TLS et réécrit chaque domaine d'église sur son amont `*.b1.church`. Pour ce qui rend réellement une fois qu'une demande s'est résolue — l'arbre page/section/élément — voir [Constructeur de site Web](./website-builder).

</div>

## Aperçu

```
   grace.b1.church              www.gracechurch.org  (domaine personnalisé)
   (sous-domaine b1.church)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Arête Caddy — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • termine TLS (certificat LE par domaine)    │
          │             │  • réécrit Host → {sub}.b1.church        │
          │             │  • proxy inverse vers B1App               │
          │             └────────────────┬─────────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • toujours: supprimer tout x-site fourni-client (anti-spoof)   │
   │  • Host *.b1.church interne ⇒ recherche de domaines reste inerte   │
   │  * Host personnalisé brut (contournant Caddy) ⇒ recherche → défini x-site  │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → première étiquette d'hôte → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   enfilade ?siteId= dans chaque appel contenu :      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  sauvegarde/suppression de domaine (B1Admin Settings→Domains → POST /membership/domains)
        └─ meilleur effort CaddyHelper.updateCaddy()  (enveloppé, non-fatal, délai d'expiration 10s)
  Caddy lit la table des domaines elle-même via deux points de terminaison anonymes :
        GET /membership/domains/authorize  — TLS à la demande `ask` (200 connu / 404 inconnu)
        GET /membership/domains/hostmap    — carte hôte→{sub}.b1.church (rafraîchissement 5 min)
```

Trois règles tiennent dans cette couche :

1. **Une sentinel garde tout rétrocompatible.** `siteId = ''` est le site primaire. Chaque page, bloc, lien, style global, et ligne de domaine qui existait avant cette fonctionnalité porte `''` et rend exactement comme il l'a fait. Un site *second* est simplement un ensemble de lignes avec un `siteId` non-vide, et tout point de terminaison de contenu appelé sans `?siteId=` retourne le site primaire — octet-pour-octet la demande ancienne.
2. **La résolution est basée sur l'étiquette d'hôte et converge.** Un sous-domaine `*.b1.church` achemins par son étiquette d'hôte directement ; un domaine personnalisé est réécrit sur son étiquette `{sub}.b1.church` à l'arête Caddy avant que B1App le voit (avec une recherche BD de middleware qui horodate un en-tête `x-site` en tant que repli pour tout `Host` personnalisé brut). Les deux jambes atterrissent sur la même route `[sdSlug]` et le même appel `churches/lookup`, pour que le rendu en aval soit identique.
3. **L'arête Caddy est sans état sur une source de vérité unique.** Les domaines personnalisés se terminent à un proxy Caddy auto-géré sur EC2 qui réécrit chaque domaine sur son amont `{sub}.b1.church`. Une sauvegarde de domaine déclenche un seul meilleur effort `CaddyHelper.updateCaddy()`, et Caddy lit aussi directement la table `domains` (les points de terminaison `authorize` et `hostmap` ci-dessous). La table est faisant autorité — un Caddy inaccessible ne peut jamais échouer une sauvegarde.

## Résolution du site

### Sous-domaines `*.b1.church`

`B1App/next.config.mjs` réécrit les demandes entrantes par hôte. Une règle d'hôte avec le modèle `(?<subdomain>.*?)\..*` capture le **première étiquette** de l'hôte et réécrit `/` et `/:path*` en `/{subdomain}` — le segment `[sdSlug]` du routeur d'application. Donc `grace.b1.church/about` devient `/grace/about`.

À l'intérieur de `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) appelle `GET /membership/churches/lookup/?subDomain={sdSlug}`. La réponse `ChurchController.getBySubDomain` a maintenant deux branches :

| Slug appaire | Réponse | Sens |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Site primaire de cette église |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un site **secondaire** — le contrôleur revient à `sites`, résout l'église propriétaire, et répond le slug interrogé plus le `siteId` supplémentaire |

Ce `siteId` supplémentaire est la seule chose qui distingue une demande de site secondaire d'une primaire ; tout le reste du pipeline est partagé.

### Domaines personnalisés

Un domaine propriété-église se termine à l'**arête Caddy** (détaillé ci-dessous), qui réécrit l'en-tête `Host` sur le site `{sub}.b1.church` avant de faire un proxy vers B1App. Donc sur le chemin normal B1App reçoit un `Host` *interne* `*.b1.church` et le résout par étiquette d'hôte exactement comme un sous-domaine natif — la recherche BD du middleware ne se déclenche jamais. `src/middleware.ts` court toujours sur chaque demande, mais avec un travail toujours-activé et un repli :

1. **Toujours** — il **supprime tout en-tête `x-site` fourni-client**. Cet en-tête est une entrée de réécriture usurpable et n'est approuvé que quand le middleware l'y affecte lui-même ; le supprimer est le vrai travail du middleware derrière Caddy.
2. **Repli, seulement `Host` non-interne** — pour un `Host` personnalisé-domaine brut qui atteint B1App *sans* la réécriture de Caddy, il appelle `GET /membership/domains/public/lookup/{host}` et, si cela retourne un `subDomain`, défini `x-site: {subDomain}.b1.church`. Derrière Caddy cette branche est inerte parce que le `Host` est déjà `*.b1.church`.

Les hôtes internes — `localhost`, `b1.church`, et les suffixes `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — ignorent complètement la recherche (ils sont déjà résolus par la réécriture d'étiquette d'hôte, ou sont les hôtes de prévisualisation/déploiement).

La recherche elle-même (`DomainRepo.loadByName`) laisse-joint `domains → churches` et `domains → sites` et retourne `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — le sous-domaine du site secondaire assigné s'il pointe vers un, sinon celui de l'église. Il appaire d'abord l'hôte exact ; si cet hôte a commencé avec `www.` et a raté, il retry **une fois** par le sommet nu.

De retour dans `next.config.mjs`, les règles de réécriture de `x-site` sont placées **en-avant de** les règles d'hôte génériques, pour qu'elles gagnent. `x-site: grace.b1.church` → première étiquette `grace` → `[sdSlug] = grace`, et à partir de là la résolution est identique au chemin de sous-domaine (même `churches/lookup`, même `siteId`).

:::info
L'en-tête `x-site` n'est pas approuvé de l'extérieur. Le middleware supprime sans conditions tout `x-site` entrant avant de définir optionnellement le sien, et les règles de réécriture voient seulement la valeur définie-par-middleware — un client ne peut pas se forcer sur le contenu d'une autre église en envoyant un en-tête.
:::

Deux détails opérationnels sur le middleware :

- **Cache.** Chaque résultat d'hôte (un coup *ou* un miss confirmé — jamais une erreur de réseau) est misen cache pendant **10 minutes** dans une `Map` en mémoire, par isolé sans serveur.
- **Matcher.** Le matcher réinclut intentionnellement `/sitemap.xml`, `/robots.txt`, et `/manifest.webmanifest`. Son premier motif exclut les chemins pointés, qui autrement abandonneraient ces fichiers ; ils sont rajoutés pour qu'un SEO par domaine personnalisé/fichiers PWA reçoivent aussi l'en-tête `x-site`.

### Enfilage `siteId`

`ConfigHelper` stocke le `siteId` résolu sur sa `ConfigurationInterface` par demande (memoïzée avec React `cache()`) et annexe `?siteId=` aux appels de contenu qu'il fait et les composants de page font — **conditionnellement** : un `siteId` vide (un sous-domaine d'église primaire) omet le paramètre ensemble. Les points de terminaison enfilés sont l'arbre de page (`/content/pages/:id/tree`), la liste de page publique utilisée par le sitemap (`/content/pages/public/:id`), les styles globaux (`/content/globalStyles/church/:id`), les liens de navigation (`/content/links/church/:id`), et le bloc pied de page autonome (`/content/blocks/public/footer/:id`). Sur le chemin de rendu normal le pied de page arrive à l'intérieur de l'arbre de page (sections marquées `zone: "siteFooter"`), déjà récupérées avec `siteId`, pour qu'il n'y ait pas de lacune de pied de page non-limitée.

Le portail des membres (B1App `mobile`) s'en sort intentionnellement dehors : `loadChurchAppearance.ts` résout l'église via `churches/lookup` mais lit `/settings/public/{id}` de niveau église et ne limite jamais `siteId` — le portail est à l'échelle de l'église en v1 (voir ci-dessous).

## Sites Web multiples par église

### Modèle de données

La nouvelle table `membership.sites` est intentionnellement minuscule :

| Colonne | Type | Notes |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Église propriétaire |
| `name` | `varchar(255)` | Nom d'affichage (par ex. "Español", "Youth") |
| `subDomain` | `varchar(45)` | Index **unique** — espace de noms global (ci-dessous) |

La limitation du site est alors une colonne nullable-gratuitement unique ajoutée aux tables contenu et domaine :

| Table (module) | Colonne | `''` signifie |
|----------------|--------|-----------|
| `domains` (adhésion) | `siteId char(11) NOT NULL DEFAULT ''` | Le domaine sert le site primaire |
| `pages`, `links`, `globalStyles`, `blocks` (contenu) | `siteId char(11) NOT NULL DEFAULT ''` | Site primaire — et sur **`blocks`**, `''` signifie également *partagé sur tous les sites* |

Deux migrations ajoutent tout cela (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Parce que la colonne est par défaut `''`, chaque ligne existante garde le comportement d'aujourd'hui sans remblayage.

**Espace de noms de sous-domaine global.** `sites.subDomain` partage *un* espace de noms avec `churches.subDomain` — un sous-domaine de site ne peut jamais entrer en collision avec un sous-domaine d'église ou un autre site. Ceci est appliqué sur **les deux** chemins de sauvegarde : `SiteController.save` rejette un slug qui frappe l'un ou l'autre des `churches` ou `sites`, et `ChurchController.validateSave` fait la même chose en inverse. Un index unique sur `sites.subDomain` le soutient au niveau de la base de données.

**L'unicité des pages** s'élargit de `(churchId, url)` à `(churchId, siteId, url)`, pour que deux sites d'une église puissent chacun posséder leur propre `/about`.

### Contenu par site, avec replis

Chaque **liste/arbre** de contenu limité au site prend un `?siteId=` optionnel (absent ⇒ `''` = primaire) : arbre/liste/pages publiques, liste/par-type/pied de page de blocs, liens (anon / filtré / tout), et styles globaux. Les sections et les éléments ne sont *pas* limités directement — ils héritent via leur page ou bloc parent.

Deux chaînes de résolution font le travail intéressant :

- **Styles globaux — `site → primaire → défaut`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` retourne la ligne du site ; si un site secondaire n'en a aucune, elle retourne la ligne **primaire (`''`) tel quel** (gardant le `id`/`siteId` du primaire, que le client utilise pour copy-on-write) ; s'il n'y a pas de primaire non plus, `GlobalStyleController` retourne une palette/polices de code dur par défaut.
- **Bloc de pied de page — site-spécifique gagne, partagé revient.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` retourne le partagé (`''`) *et* les lignes site-spécifiques ; le résolveur choisit le pied de page du site s'il existe, sinon celui partagé. La même logique court à la fois dans `TreeHelper.insertBlocks` (arbre de page) et dans le point de terminaison `/content/blocks/public/footer/:churchId` autonome.

### Cascade de suppression de site

`SiteController.delete` (ferme sur la permission d'adhésion Settings→Edit) déchire un site secondaire en trois étapes :

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` en cascade tout le contenu que le site possède : ses **pages** → leurs sections, éléments, `pageHistory`, et `posts` ; ses propres **blocs** → leurs sections, éléments, et `pageHistory` ; ses **liens** et **styles globaux**. Une garde refuse de courir pour `''` — le sentinel primaire/partagé est jamais en cascade.
2. `DomainRepo.clearSiteId` **réassigne** les domaines du site de retour au primaire (`siteId → ''`) plutôt que de les supprimer, pour qu'un domaine personnalisé survit à une suppression de site.
3. La ligne `sites` est supprimée et les routes Caddy sont re-synchronisées (meilleur effort).

### Surface B1Admin

| Capacité | Où | Mécanisme |
|-----------|-------|-----------|
| Commutateur de site | `useSiteSelection` + `SiteSwitcher` (vide = "Site Principal") | Lit un paramètre URL `?site=` et l'enfile comme `?siteId=` dans les appels ContentApi. Présent sur les trois zones de **liste** du site — **Pages**, **Blocs**, **Apparence** — mais *pas* les éditeurs de page/bloc, qui portent `siteId` sur l'enregistrement |
| Création/suppression de sites | `SitesDialog`, ouvert à partir de l'entrée "Gérer les sites web…" du commutateur | `POST /membership/sites` / `DELETE /membership/sites/:id` (nom + sous-domaine). Ferme sur la permission d'adhésion Settings→Edit (`Permissions.settings.edit` côté serveur ; `Permissions.membershipApi.settings.edit` en B1Admin). **Création/suppression seulement — il n'y a pas d'IU renommer en v1** |
| Assignation de site par domaine | `DomainSettingsEdit` sous Settings→Domains | Une liste déroulante de site par ligne pose `siteId` par domaine à `/membership/domains`. La colonne se cache si l'API ne retourne aucun site (serveur plus ancien) |
| Styles de copie sur écrit | `StylesManager.prepareForSave` | Quand la ligne de style global chargée `siteId` ne correspond pas au site sélectionné (c.-à-d. l'API a retourné le primaire hérité en repli), elle abandonne le `id` du primaire et horodate le `siteId` actuel, forçant une **insertion** d'une nouvelle ligne site-spécifique au lieu de faire écraser le primaire. Le même fork-on-mismatch s'applique au bloc pied de page du site |

:::info
**Ce qui reste à l'échelle de l'église en v1 (un choix de limitation délibéré, pas une limite du modèle de données) :** le **blog** (`BlogPage` n'a pas de commutateur et charge `/posts` sans `siteId`), les **widgets de site** (banneau d'annonce + lanceur), les **redirections**, le **logo / GA4 / paramètres d'église**, et le **portail des membres** (B1App mobile). Notez que ce n'est *pas* "tout de l'apparence" — les styles globaux d'un site secondaire (palette, polices, typographie, espacement, navigation, CSS personnalisée) **sont** par site via le chemin copy-on-write ci-dessus ; seulement les sous-panels banneau/lanceur/redirections/logo de la page Apparence restent à l'échelle de l'église.
:::

## Domaines personnalisés : arête Caddy (plan de config statique)

:::info
**Direction révisée 2026-07-02.** Un plan antérieur pour déplacer l'hébergement de domaine personnalisé sur des domaines gérés par Vercel a été **annulé**, et tout le code de domaine Vercel (`VercelHelper`, ses vars d'env `vercelToken`/`vercelProjectId`/`vercelTeamId`, les params SSM, et les entrées de santé) a été supprimé de l'Api. L'auto-géré **proxy Caddy sur EC2 reste** comme l'arête de domaine personnalisé permanent. Le seul travail restant est interne : échanger la configuration *exécutée* de Caddy pour une configuration *statique* qui survit les redémarrages.
:::

### L'arête

Chaque domaine d'église personnalisé pointe le DNS sur une boîte EC2 — `3.23.251.61`, aussi accessible en tant que `proxy.b1.church`. L'écran Settings→Domains de B1Admin instruit les églises d'ajouter un sommet `A → 3.23.251.61` ou un `CNAME → proxy.b1.church`. Caddy termine TLS avec un certificat Let's Encrypt par domaine, réécrit l'en-tête `Host` sur le `{sub}.b1.church` amont du site, et fait un proxy inverse vers B1App — qui l'achemine alors par étiquette d'hôte comme tout sous-domaine natif (voir [Domaines personnalisés](#custom-domains) ci-dessus).

La cartographie en amont vient de `DomainRepo.loadPairs`, dont le cadran **COALESCEs le sous-domaine du site assigné** pour qu'un domaine fasse un proxy vers le site *secondaire* correct, révenant au primaire de l'église :

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Les lignes `www.*` sont exclues de la cartographie ; Caddy sert `www.{host}` via une `302` redirige vers le sommet à la place.

### Deux points de terminaison anonymes alimentent l'arête

`DomainController` expose deux points de terminaison non-authentifiés, en lecture seule que la boîte consomme directement — anonymes par nécessité, puisque l'arête les interroge avant que tout contexte d'église existe :

| Point de terminaison | Retourne | Rôle |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` si le domaine — ou, pour un miss `www.`, son sommet nu — existe dans `domains` ; `404` autrement (y compris un `domain` vide) | Caddy **TLS à la demande `ask`** : le contrôle d'abus décidant s'il faut émettre un certificat pour un SNI entrant |
| `GET /membership/domains/hostmap` | `text/plain`, une ligne trié `{domain} {sub}.b1.church` par domaine routyable | La cartographie hôte→amont que la boîte rafraîchit sur un minuteur |

`authorize` réutilise `DomainRepo.loadByName` (hôte exact, puis un seul retry `www.`→sommet) ; `hostmap` réutilise `loadPairs` — pour que ce soit site-conscient et `www.*`-exclut, identique aux routes de proxy — et simplement bande le suffixe `:443`.

### Sauvegarde/suppression de domaine — un meilleur effort unique

`DomainController.save` écrit les lignes `domains` puis effectue un appel `CaddyHelper.updateCaddy()` **meilleur effort unique**, enveloppé dans un `try/catch` qui enregistre (`console.error`) et avale ; `delete` fait de même (ce qui a aussi corrigé un bug de route rassis-sur-suppression antérieur), comme le fait la suppression de site secondaire (`SiteController.delete`). `updateCaddy` elle-même est bornée par un délai d'expiration **10s** Axios, pour qu'un Caddy inaccessible ou arrêté ne puisse jamais `500` une sauvegarde de domaine — la table `domains` est la source de vérité.

### État actuel — config statique, pas d'état exécuté

La boîte (Windows EC2 derrière l'IP élastique permanente) court Caddy à partir d'une **Caddyfile statique** : TLS à la demande dont `ask` pointe `/membership/domains/authorize`, plus un fichier cartographie hôte→amont rafraîchit toutes les 5 minutes à partir de `/membership/domains/hostmap` par une tâche programmée qui finit par un `caddy reload` gracieux. La config survit les redémarrages avec zéro état exécuté — pas de danse de re-primeur — et un SNI inconnu est **refusé TLS** (aucun certificat n'est frappé pour un hôte qu'`authorize` rejette), tandis qu'un hôte autorisé mais pas-encore-cartes (un domaine marque-nouvelle à l'intérieur la fenêtre de sync ≤5 minutes) reçoit un 404 propre. Les nouveaux domaines deviennent routyables à l'intérieur ~5 minutes d'une sauvegarde ; leurs certificats sont frappés au premier coup. Construction/configuration, opérations, et pièges testés sur le terrain : [Proxy personnalisé Caddy-Domain](../deployment/caddy-proxy).

### Push exécuté hérité — chemin de repli, en attente de suppression

`CaddyHelper` (module d'adhésion) peut toujours piloter Caddy via son **API d'administration** à `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort` ; pas-op quand non défini ; surfacé sous le groupe Integrations du `ServerHealthController`) : `updateCaddy()` PATCHes un tableau de routes complet, et `initializeCaddy()` + les points de terminaison `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstruisent un serveur exécuté-configuré à partir de zéro. Le mode de cette config a vécu seulement dans la mémoire de Caddy — l'amnésie-redémarrage que cette architecture a remplacée. Le mécanisme reste uniquement en tant que chemin de repli et est programmé pour suppression une fois la boîte statique stable ; le meilleur effort `updateCaddy()` push sur sauvegarde/suppression de domaine est un pas-op inoffensif par rapport à la boîte statique (son API d'administration est localhost-seulement).

## Pages connexes

- [Proxy personnalisé Caddy-Domain](../deployment/caddy-proxy) — la boîte arête elle-même : configuration de boîte fraîche, service WinSW, tâche de sync cartographie, et pièges opérationnels
- [Constructeur de site Web](./website-builder) — l'arbre page/section/élément, rendeurs, blog, SEO, et génération IA (ce qui rend une fois qu'une demande s'est résolue à une église/site)
- [Points de terminaison de contenu](../api/endpoints/content) — la surface REST pour les pages, blocs, liens, et styles globaux, tous maintenant `?siteId=`-conscients
- [B1App](../web-apps/b1-app) — l'application Next.js qui accueille le middleware et le routage `[sdSlug]`
- [Déploiement d'application Web](../deployment/web-apps) — comment B1App est déployée sur Vercel
