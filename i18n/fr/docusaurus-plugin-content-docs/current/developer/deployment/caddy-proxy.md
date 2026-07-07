---
title: "Proxy Caddy personnalisé-domaine"
---

# Proxy Caddy personnalisé-domaine

<div class="article-intro">

Les domaines d'église personnalisés (`mychurch.org` → le site Web B1 de l'église) se terminent à une boîte Windows EC2 unique exécutant Caddy. La boîte possède les certificats TLS, résout chaque domaine sur son site `{sub}.b1.church`, et fait un proxy inverse avec un en-tête Host réécrit. Sa configuration entière est deux fichiers — un `Caddyfile` statique et un `hosts.map` rafraîchis à partir du Membership API — pour qu'il survit les redémarrages avec zéro état exécuté. Cette page couvre la construction de la boîte à partir de zéro, sa manière d'opérer, et les pièges testés sur le terrain qui mordraient quiconque la reconstruisait.

</div>

Pour comment une demande se résout à une église/site une fois qu'elle atteint B1App, voir [Routage du site Web et multi-site](../architecture/websites).

## Composants

| Pièce | Ce que c'est |
|---|---|
| Instance EC2 | Windows Server ; IP élastique **`3.23.251.61`** (gravée dans le DNS d'église partout — l'IP est permanente, les instances sont disposables) |
| `C:\caddy\caddy.exe` | **Construire personnalisé** Caddy avec le module `techknowlogick/certmagic-s3` — le Caddy stock ne peut pas lire le magasin de certificat |
| `C:\caddy\Caddyfile` | La configuration entière du proxy : TLS à la demande, cartographie `map` hôte→amont, redirections www→sommet, `:80`→https |
| `C:\caddy\hosts.map` | Une ligne `{domain} {sub}.b1.church` par domaine routyable, importée dans le bloc `map` de Caddyfile |
| `sync-hostmap.ps1` + tâche `CaddyHostmapSync` | Tâche programmée (tous les 5 min + au démarrage, en tant que SYSTEM) rafraîchit `hosts.map` à partir de l'API et recharge gracieusement Caddy seulement au changement |
| Service Windows `caddy` (enveloppe WinSW) | Court `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` ; redémarrage auto sur défaillance. Caddy n'est pas conscient du SCM, donc une enveloppe est requise |
| Seau S3 `churchapps-caddy-certs` | Stockage de certificat partagé (`région us-east-2`, préfixe `certs`) — les certificats survivent les reconstructions d'instance |
| Rôle IAM `CaddyRole` | Accorde à l'instance l'accès S3 ; Caddy utilise la chaîne de credential AWS par défaut (pas de clés en config) |

## Les deux points de terminaison API dont la boîte dépend

Les deux sont anonymes, sur le Membership API :

| Point de terminaison | Rôle |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy **TLS à la demande `ask` gate** : `200 {"authorized":true}` quand l'hôte (ou, pour un hôte `www.`, son sommet) est une ligne dans `domains` ; `404` autrement. C'est le contrôle d'abus — Caddy n'émettra pas un certificat pour un hôte que ce point de terminaison rejette |
| `GET /membership/domains/hostmap` | `text/plain`, trié, dédupliqué `{domain} {sub}.b1.church` lignes (site-conscient : un domaine assigné à un site secondaire compose ce sous-domaine du site). Source de la `map` |

## Flux de demande

1. Le navigateur résout `mychurch.org` → `3.23.251.61` (enregistrement d'apex `A`, ou `CNAME proxy.b1.church`).
2. Caddy termine TLS. Certificat en main dans S3 → servir ; SNI inconnu → `authorize` est demandé ; 200 → émettre à la demande via Let's Encrypt ; 404 → **la poignée de main est refusée** (pas de certificat, pas de réponse — un hôte inconnu reçoit TLS-refusé, pas une erreur HTTP).
3. La `map` résout l'Host sur `{sub}.b1.church` ; `www.{apex}` reçoit une 302 vers le sommet ; un hôte autorisé-mais-non-encore-cartes (un domaine marque-nouvelle à l'intérieur la fenêtre de sync ≤5 minutes) reçoit un 404 propre.
4. `reverse_proxy` compose `{sub}.b1.church:443` avec SNI et Host réécrits sur l'amont, pour que le bord de Vercel serve le site B1App.
5. Le port 80 passe les défis ACME HTTP-01 et 308-redirige tout le reste vers https.

Propagation de nouveau domaine : un domaine sauvegardé en B1Admin devient routyable à l'intérieur ~5 minutes (la tâche de sync) ; son certificat est frappé au premier coup HTTPS.

## Construction de la boîte à partir de zéro

Condensé à partir de la procédure testée sur le terrain (la procédure complète étape-par-étape avec les commandes copie-coller vit dans le workspace ops, pas ce dépôt). D'abord les conditions préalables — la construction est morte sans eux :

1. **IAM** : attachez `CaddyRole` (accès S3 au seau de certificat) à l'instance. Vérifiez via IMDSv2 à partir de la boîte — note une GET IMDS brut retournant 401 signifie juste que IMDSv2 est appliqué, pas "pas de rôle".
2. **Santé d'API** : `authorize` doit retourner 404 pour un domaine bogus et `hostmap` doit retourner 200 avant quoi que ce soit d'autre.

Ensuite :

3. **Binaire** : téléchargez un construire personnalisé à partir du service de construction de Caddy — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB contre ~45 MB stock ; v2.11.4 au moment d'écriture). Le choix du module importe : `techknowlogick/certmagic-s3` utilise les clés `bucket`/`region`/`prefix` correspondant la disposition de certificat existant ; la fourchette `ss098` utilise `host`/`endpoint` et **ne trouvera pas** les certificats existants.
4. **Fichiers** : `Caddyfile` + `sync-hostmap.ps1` dans `C:\caddy\` ; ensemencez la cartographie une fois avec `sync-hostmap.ps1 -NoReload`.
5. **Portails avant le premier démarrage** : `caddy list-modules` doit afficher le module de stockage s3 ; `caddy adapt` doit émettre `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` dans son bloc de stockage ; `caddy validate` doit passer.
6. **Service** : installez via WinSW (id service `caddy`, redémarrage auto sur défaillance, registres roulants). Court en tant que LocalSystem, qui atteint IMDS pour les credential de rôle.
7. **Tâche de sync** : enregistrez `CaddyHostmapSync` (SYSTEM, tous les 5 min + au démarrage, limite d'exécution de 4 minutes).
8. **Vérifiez pré-cutover** en forçant-résolvant les domaines vers `127.0.0.1` avec `curl --resolve` (la boîte n'a pas de vrai trafic jusqu'à la mutation EIP) : un domaine existant doit servir avec un certificat porté-valide ; `www.` doit 302 ; un hôte inconnu doit être TLS-refusé ; et `Restart-Service caddy` doit revenir servir **sans re-primeur manuel** — ce test redémarrage est le point entier de la conception statique.
9. **Go-live** : réassociez l'IP élastique `3.23.251.61` à la nouvelle instance. Le DNS d'église ne change jamais.

## Pièges testés sur le terrain (appris de la manière difficile — ne regresse pas)

| Piège | Symptôme | Correction |
|---|---|---|
| `tls_server_name {vars.upstream}` dans le transport reverse_proxy | Chaque domaine proxié 502s : les placeholders cartographique se résolvent **vide au temps TLS-compose** ("soit ServerName soit InsecureSkipVerify doivent être spécifiés") | Utilise le placeholder natif-au-transport : `tls_server_name {http.reverse_proxy.upstream.host}` |
| Clés dupliquées ou lignes poubelle dans `hosts.map` | Le gestionnaire `map` de Caddy **dur-erreurs sur une clé d'entrée dupliquée** — une ligne mauvaise peut prendre toute la config vers le bas | Le script de sync normalise l'espace blanc, abandonne les lignes mal-formées (rejetant le gros seulement si >20% sont mauvaises), dédupe premier-gagne, et écrit **BOM-gratuit** UTF-8 (un BOM corrompt la clé cartographique première). L'API filtre aussi les lignes de domaine vide/espace-contenant à la source |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | L'enregistrement de tâche **échoue silencieusement** (XML hors-de-plage, erreur non-terminante) | Construisez la répétition en tant qu'instance `MSFT_TaskRepetitionPattern` CIM avec `Interval = "PT5M"` et pas de durée ; ajoutez une `ExecutionTimeLimit` de 4 minutes (la première exécution SYSTEM peut pendre sur une recherche TLS/CRL froide) |

:::warning
L'API d'administration se lie à `localhost:2019` seulement. Le mode exécuté-hérité l'a exposé à distance pour que le Membership API puisse pousser les configurations de route ; la conception statique n'a pas besoin de poussées à distance, et la surface plus petite est délibérée. `caddy reload` (court localement par le script de sync) est le seul consommateur API d'administration.
:::

:::info Push exécuté hérité
`CaddyHelper` dans l'API (et les points de terminaison `/membership/domains/caddy` + `/caddy/init`) existent toujours en tant que chemin de repli au mode exécuté-configuré ancien. Ils sont programmés pour suppression une fois la boîte statique stable pendant un couple de semaines — après cela, `authorize` + `hostmap` sont les seuls points d'intégration.
:::

## Opérations

- **Journaux** : journaux roulants WinSW dans `C:\caddy\` (stdout/err de service — les erreurs de reverse-proxy atterrissent dans `caddy-service.err.log`) ; historique de sync dans `C:\caddy\sync-hostmap.log`.
- **Forcer un rafraîchissement de cartographie** : `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Changement de configuration** : modifiez `C:\caddy\Caddyfile`, puis `caddy validate` + `caddy reload` (ou `Restart-Service caddy` — les redémarrages sont sûrs par conception).
- **Suppression de masse de domaine** déclenche la garde de rétrécissement du script de sync par conception ; déplacer le vieux `hosts.map` de côté et re-courir la tâche pour accepter un rétrécissement intentionnel large.
- **Instructions DNS pour les églises sont inchangées à jamais** : sommet `A 3.23.251.61` ou `CNAME proxy.b1.church`.

## Pages connexes

- [Routage du site Web et multi-site](../architecture/websites) — comment la demande proxiée se résout à une église/site dans B1App
- [Déploiement d'API](./apis) — déploiement du Membership API qui sert `authorize`/`hostmap`
