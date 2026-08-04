---
title: "Proxy Caddy pour domaines personnalisés"
---

# Proxy Caddy pour domaines personnalisés

<div class="article-intro">

Les domaines d'église personnalisés (`mychurch.org` → le site web B1 de l'église) se terminent sur une seule boîte Windows EC2 exécutant Caddy. La boîte détient les certificats TLS, résout chaque domaine vers son site `{sub}.b1.church`, et fait un proxy inverse avec un en-tête Host réécrit. Sa configuration complète tient en deux fichiers — un `Caddyfile` statique et un `hosts.map` rafraîchi depuis le Membership API — si bien qu'elle survit aux redémarrages avec zéro état à l'exécution. Cette page couvre la construction de la boîte à partir de zéro, son fonctionnement, et les pièges éprouvés sur le terrain qui mordront quiconque la reconstruira.

</div>

Pour savoir comment une requête se résout vers une église/un site une fois qu'elle atteint B1App, voir [Routage du site Web et multi-site](../architecture/websites).

## Composants

| Élément | Ce que c'est |
|---|---|
| Instance EC2 | Windows Server ; IP élastique **`3.23.251.61`** (gravée dans le DNS des églises partout dans le monde — l'IP est permanente, les instances sont jetables) |
| `C:\caddy\caddy.exe` | Build **personnalisé** de Caddy avec le module `techknowlogick/certmagic-s3` — le Caddy standard ne peut pas lire le magasin de certificats |
| `C:\caddy\Caddyfile` | Toute la configuration du proxy : TLS à la demande, `map` hôte→amont, redirections www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Une ligne `{domain} {sub}.b1.church` par domaine routable, importée dans le bloc `map` du Caddyfile |
| Tâche `sync-hostmap.ps1` + `CaddyHostmapSync` | Tâche planifiée (toutes les 5 min + au démarrage, en tant que SYSTEM) qui rafraîchit `hosts.map` depuis l'API et recharge Caddy gracieusement uniquement en cas de changement |
| Service Windows `caddy` (enveloppe WinSW) | Exécute `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` ; redémarrage automatique en cas d'échec. Caddy n'est pas conscient du SCM, une enveloppe est donc nécessaire |
| Compartiment S3 `churchapps-caddy-certs` | Stockage de certificats partagé (`région us-east-2`, préfixe `certs`) — les certificats survivent aux reconstructions d'instance |
| Rôle IAM `CaddyRole` | Accorde à l'instance l'accès S3 ; Caddy utilise la chaîne d'identifiants AWS par défaut (pas de clés dans la configuration) |

## Les deux points de terminaison API dont dépend la boîte

Les deux sont anonymes, sur le Membership API :

| Point de terminaison | Rôle |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Le portail `ask` TLS à la demande de Caddy : `200 {"authorized":true}` quand l'hôte (ou, pour un hôte `www.`, son apex) est une ligne dans `domains` ; `404` sinon. C'est le contrôle anti-abus — Caddy n'émettra pas de certificat pour un hôte que ce point de terminaison rejette |
| `GET /membership/domains/hostmap` | `text/plain`, trié, dédupliqué, lignes `{domain} {sub}.b1.church` (conscient du site : un domaine assigné à un site secondaire compose vers le sous-domaine de ce site). Source de la `map` |

## Flux de requête

1. Le navigateur résout `mychurch.org` → `3.23.251.61` (enregistrement `A` en apex, ou `CNAME proxy.b1.church`).
2. Caddy termine le TLS. Certificat déjà en main dans S3 → le sert ; SNI inconnu → `authorize` est interrogé ; 200 → émission à la demande via Let's Encrypt ; 404 → **la poignée de main est refusée** (pas de certificat, pas de réponse — un hôte inconnu se voit refuser le TLS, pas une erreur HTTP).
3. La `map` résout l'hôte vers `{sub}.b1.church` ; `www.{apex}` reçoit un 302 vers l'apex ; un hôte autorisé mais non encore cartographié (un domaine tout nouveau à l'intérieur de la fenêtre de synchronisation de ≤5 minutes) reçoit un 404 propre.
4. `reverse_proxy` compose `{sub}.b1.church:443` avec le SNI et le Host réécrits vers l'amont, si bien que le bord de Vercel sert le site B1App.
5. Le port 80 laisse passer les défis ACME HTTP-01 et redirige en 308 tout le reste vers https.

Propagation d'un nouveau domaine : un domaine sauvegardé dans B1Admin devient routable dans les ~5 minutes (la tâche de synchronisation) ; son certificat est frappé au premier accès HTTPS.

## Construire la boîte à partir de zéro

Condensé à partir de la procédure éprouvée sur le terrain (la procédure complète pas à pas avec les commandes prêtes à copier-coller vit dans le workspace des opérations, pas dans ce dépôt). Les prérequis d'abord — la construction est morte sans eux :

1. **IAM** : attachez `CaddyRole` (accès S3 au compartiment de certificats) à l'instance. Vérifiez via IMDSv2 depuis la boîte — notez qu'un simple GET IMDS renvoyant 401 signifie juste que IMDSv2 est imposé, pas « pas de rôle ».
2. **Santé de l'API** : `authorize` doit renvoyer 404 pour un domaine bidon et `hostmap` doit renvoyer 200 avant quoi que ce soit d'autre.

Ensuite :

3. **Binaire** : téléchargez un build personnalisé depuis le service de build de Caddy — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 Mo contre ~45 Mo pour le standard ; v2.11.4 au moment de la rédaction). Le choix du module compte : `techknowlogick/certmagic-s3` utilise les clés `bucket`/`region`/`prefix` correspondant à la disposition de certificats existante ; le fork `ss098` utilise `host`/`endpoint` et ne **trouvera pas** les certificats existants.
4. **Fichiers** : `Caddyfile` + `sync-hostmap.ps1` dans `C:\caddy\` ; amorcez la carte une fois avec `sync-hostmap.ps1 -NoReload`.
5. **Portails avant le premier démarrage** : `caddy list-modules` doit montrer le module de stockage s3 ; `caddy adapt` doit émettre `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` dans son bloc de stockage ; `caddy validate` doit passer.
6. **Service** : installez via WinSW (id de service `caddy`, redémarrage automatique en cas d'échec, journaux tournants). S'exécute en tant que LocalSystem, qui atteint IMDS pour les identifiants du rôle.
7. **Tâche de synchronisation** : enregistrez `CaddyHostmapSync` (SYSTEM, toutes les 5 min + au démarrage, limite d'exécution de 4 minutes).
8. **Vérifiez avant la bascule** en forçant la résolution des domaines vers `127.0.0.1` avec `curl --resolve` (la boîte n'a pas de vrai trafic tant que l'EIP n'a pas basculé) : un domaine existant doit servir avec un certificat porté-valide ; `www.` doit faire un 302 ; un hôte inconnu doit se voir refuser le TLS ; et `Restart-Service caddy` doit redémarrer en servant **sans ré-amorçage manuel** — ce test de redémarrage est tout l'intérêt de la conception statique.
9. **Mise en production** : réassociez l'IP élastique `3.23.251.61` à la nouvelle instance. Le DNS des églises ne change jamais.

## Pièges éprouvés sur le terrain (appris à la dure — ne pas régresser)

| Piège | Symptôme | Correction |
|---|---|---|
| `tls_server_name {vars.upstream}` dans le transport reverse_proxy | Chaque domaine proxifié fait 502 : les placeholders de map se résolvent **vides au moment de la composition TLS** (« either ServerName or InsecureSkipVerify must be specified ») | Utilisez le placeholder natif au transport : `tls_server_name {http.reverse_proxy.upstream.host}` |
| Clés dupliquées ou lignes indésirables dans `hosts.map` | Le gestionnaire `map` de Caddy **échoue durement sur une clé d'entrée dupliquée** — une seule mauvaise ligne peut faire tomber toute la configuration | Le script de synchronisation normalise les espaces blancs, abandonne les lignes malformées (ne rejette en bloc que si >20% sont mauvaises), déduplique premier-arrivé-gagne, et écrit en UTF-8 **sans BOM** (un BOM corrompt la première clé de la map). L'API filtre aussi les lignes de domaine vides/contenant des espaces à la source |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | L'enregistrement de la tâche **échoue silencieusement** (XML hors limites, erreur non terminante) | Construisez la répétition comme une instance CIM `MSFT_TaskRepetitionPattern` avec `Interval = "PT5M"` et pas de durée ; ajoutez une `ExecutionTimeLimit` de 4 minutes (la première exécution SYSTEM peut se bloquer sur une recherche TLS/CRL à froid) |

:::warning
L'API d'administration ne se lie qu'à `localhost:2019`. L'ancien mode à l'exécution l'exposait à distance pour que le Membership API puisse pousser des configurations de route ; la conception statique n'a besoin d'aucune poussée à distance, et la surface plus réduite est délibérée. `caddy reload` (exécuté localement par le script de synchronisation) est le seul consommateur de l'API d'administration.
:::

:::info Ancien mode de poussée à l'exécution
`CaddyHelper` dans l'API (ainsi que les points de terminaison `/membership/domains/caddy` + `/caddy/init`) existent toujours comme chemin de repli vers l'ancien mode configuré à l'exécution. Ils sont programmés pour suppression une fois que la boîte statique aura été stable pendant quelques semaines — après cela, `authorize` + `hostmap` seront les seuls points d'intégration.
:::

## Opérations

- **Journaux** : journaux tournants WinSW dans `C:\caddy\` (stdout/err du service — les erreurs de reverse-proxy atterrissent dans `caddy-service.err.log`) ; historique de synchronisation dans `C:\caddy\sync-hostmap.log`.
- **Forcer un rafraîchissement de la carte** : `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Changement de configuration** : éditez `C:\caddy\Caddyfile`, puis `caddy validate` + `caddy reload` (ou `Restart-Service caddy` — les redémarrages sont sûrs par conception).
- **La suppression massive de domaines** déclenche par conception le garde-fou anti-rétrécissement du script de synchronisation ; déplacez l'ancien `hosts.map` de côté et relancez la tâche pour accepter un rétrécissement intentionnel important.
- **Les instructions DNS pour les églises restent inchangées pour toujours** : `A 3.23.251.61` en apex ou `CNAME proxy.b1.church`.

## Pages connexes

- [Routage du site Web et multi-site](../architecture/websites) — comment la requête proxifiée se résout vers une église/un site dans B1App
- [Déploiement de l'API](./apis) — déployer le Membership API qui sert `authorize`/`hostmap`
