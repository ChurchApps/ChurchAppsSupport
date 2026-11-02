---
title: "Proxy Caddy pour domaines personnalisés"
---

# Proxy Caddy pour domaines personnalisés

<div class="article-intro">

Les domaines personnalisés des églises (`mon-eglise.org` → le site web B1 de l'église) aboutissent à une seule machine EC2 Windows qui exécute Caddy. Cette machine gère les certificats TLS, associe chaque domaine à son site `{sub}.b1.church` et fait du reverse proxy avec un en-tête Host réécrit. Toute sa configuration tient en deux fichiers — un `Caddyfile` statique et un `hosts.map` rafraîchi depuis l'API Membership — de sorte qu'elle survit aux redémarrages sans aucun état d'exécution. Cette page explique comment construire la machine à partir de zéro, comment elle fonctionne, et les pièges éprouvés sur le terrain qui guettent quiconque la reconstruit.

</div>

Pour savoir comment une requête est associée à une église et à un site une fois arrivée dans B1App, voir [Routage du site web et multi-sites](../architecture/websites).

## Composants

| Élément | Description |
|---|---|
| Instance EC2 | Windows Server ; IP élastique **`3.23.251.61`** (inscrite dans le DNS de toutes les églises — l'IP est permanente, les instances sont jetables) |
| `C:\caddy\caddy.exe` | Version **personnalisée** de Caddy avec le module de stockage `techknowlogick/certmagic-s3` — le Caddy standard ne peut pas lire le magasin de certificats |
| `C:\caddy\Caddyfile` | Toute la configuration du proxy : TLS à la demande, `map` hôte→upstream, redirections www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Une ligne `{domaine} {sub}.b1.church` par domaine routable, importée dans le bloc `map` du Caddyfile |
| `sync-hostmap.ps1` + tâche `CaddyHostmapSync` | Tâche planifiée (toutes les 5 minutes et au démarrage, en tant que SYSTEM) qui rafraîchit `hosts.map` depuis l'API et ne recharge Caddy en douceur qu'en cas de changement |
| Service Windows `caddy` (enveloppe WinSW) | Exécute `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` ; redémarrage automatique en cas d'échec. Caddy ne gère pas le SCM, un enveloppeur est donc nécessaire |
| Seau S3 `churchapps-caddy-certs` | Stockage partagé des certificats (`region us-east-2`, préfixe `certs`) — les certificats survivent à la reconstruction des instances |
| Rôle IAM `CaddyRole` | Accorde à l'instance l'accès S3 ; Caddy utilise la chaîne d'identifiants par défaut d'AWS (aucune clé dans la configuration) |

## Les deux points de terminaison de l'API dont dépend la machine

Les deux sont sur l'API Membership. `authorize` est anonyme ; `hostmap` exige l'en-tête `x-internal-key: <INTERNAL_API_KEY>` depuis la PR n° 67 de l'Api (2026-08-16) — `sync-hostmap.ps1` le lit dans `C:\caddy\internal-key.txt` :

| Point de terminaison | Rôle |
|---|---|
| `GET /membership/domains/authorize?domain={hôte}` | Le **contrôle `ask` du TLS à la demande** de Caddy : `200 {"authorized":true}` lorsque l'hôte (ou, pour un hôte `www.`, son apex) figure dans `domains` ; `404` sinon. C'est le contrôle anti-abus — Caddy ne délivrera jamais de certificat pour un hôte que ce point de terminaison rejette |
| `GET /membership/domains/hostmap` | Exige `x-internal-key` (ou un JWT d'administrateur du serveur). `text/plain`, lignes `{domaine} {sub}.b1.church` triées et dédoublonnées (tenant compte du site : un domaine attribué à un site secondaire pointe vers le sous-domaine de ce site). Source de la `map` |

## Flux d'une requête

1. Le navigateur résout `mon-eglise.org` → `3.23.251.61` (enregistrement `A` de l'apex, ou `CNAME proxy.b1.church`).
2. Caddy termine le TLS. Certificat disponible dans S3 → le servir ; SNI inconnu → on interroge `authorize` ; 200 → émettre à la demande via Let's Encrypt ; 404 → **la négociation est refusée** (ni certificat, ni réponse — un hôte inconnu reçoit un refus TLS, et non une erreur HTTP).
3. La `map` résout l'hôte vers `{sub}.b1.church` ; `www.{apex}` reçoit une redirection 302 vers l'apex ; un hôte autorisé mais non encore mappé (un domaine tout neuf dans la fenêtre de synchronisation de 5 minutes au plus) reçoit un 404 propre.
4. `reverse_proxy` se connecte à `{sub}.b1.church:443` avec SNI et Host réécrits vers l'upstream, de sorte que l'edge de Vercel sert le site B1App.
   Caddy envoie aussi le domaine d'origine du visiteur dans `X-Church-Host` (Vercel écrase `X-Forwarded-Host` avec l'hôte réécrit). Le middleware de B1App ne l'accepte que si `/domains/public/lookup/{hôte}` associe ce domaine au même `{sub}` que l'hôte de la requête ; il l'expose alors comme `x-public-host` pour l'en-tête canonique `Link`, `robots.txt` et `sitemap.xml`. Un `x-public-host` envoyé par le client est toujours retiré. Le `ChurchJsonLd` (schema.org) utilise toujours l'URL `b1.church` (lire les en-têtes à cet endroit rendrait les pages dynamiques).
5. Le port 80 transmet les défis ACME HTTP-01 et redirige tout le reste en 308 vers https.

Propagation d'un nouveau domaine : un domaine enregistré dans B1Admin devient routable en 5 minutes environ (la tâche de synchronisation) ; son certificat est émis au premier accès HTTPS.

## Construire la machine à partir de zéro

Version condensée de la procédure éprouvée sur le terrain (la procédure complète pas à pas avec les commandes à copier-coller se trouve dans l'espace de travail des opérations, pas dans ce dépôt). Les prérequis d'abord — sans eux, la construction échoue :

1. **IAM** : attachez `CaddyRole` (accès S3 au seau des certificats) à l'instance. Vérifiez via IMDSv2 depuis la machine — notez qu'un GET IMDS nu renvoyant 401 signifie seulement qu'IMDSv2 est imposé, et non « pas de rôle ».
2. **Santé de l'API** : `authorize` doit renvoyer 404 pour un faux domaine, et `hostmap` (avec l'en-tête `x-internal-key`) doit renvoyer 200, avant toute autre chose.

Ensuite :

3. **Binaire** : téléchargez une version personnalisée depuis le service de compilation de Caddy — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 Mo contre ~45 Mo pour la version standard ; v2.11.4 au moment de la rédaction). Le choix du module compte : `techknowlogick/certmagic-s3` utilise les clés `bucket`/`region`/`prefix` qui correspondent à la disposition existante des certificats ; le fork `ss098` utilise `host`/`endpoint` et ne **trouvera pas** les certificats existants.
4. **Fichiers** : `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (clé `INTERNAL_API_KEY` de production, une ligne) dans `C:\caddy\` ; amorcez la map une fois avec `sync-hostmap.ps1 -NoReload`.
5. **Contrôles avant le premier démarrage** : `caddy list-modules` doit afficher le module de stockage s3 ; `caddy adapt` doit produire `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` dans son bloc de stockage ; `caddy validate` doit réussir.
6. **Service** : installez-le avec WinSW (identifiant de service `caddy`, redémarrage automatique en cas d'échec, journaux roulants). Il s'exécute en LocalSystem, qui accède à IMDS pour les identifiants du rôle.
7. **Tâche de synchronisation** : enregistrez `CaddyHostmapSync` (SYSTEM, toutes les 5 minutes et au démarrage, limite d'exécution de 4 minutes).
8. **Vérification avant la bascule** en résolvant de force les domaines vers `127.0.0.1` avec `curl --resolve` (la machine ne reçoit aucun trafic réel tant que l'IP élastique n'a pas été déplacée) : un domaine existant doit servir avec un certificat repris ; `www.` doit renvoyer 302 ; un hôte inconnu doit recevoir un refus TLS ; et `Restart-Service caddy` doit redémarrer et servir **sans réamorçage manuel** — ce test de redémarrage est tout l'intérêt de la conception statique.
9. **Mise en production** : réassociez l'IP élastique `3.23.251.61` à la nouvelle instance. Le DNS des églises ne change jamais.

## Pièges éprouvés sur le terrain (appris à la dure — à ne pas réintroduire)

| Piège | Symptôme | Correction |
|---|---|---|
| `tls_server_name {vars.upstream}` dans le transport du reverse_proxy | Chaque domaine proxifié renvoie 502 : les espaces réservés de la map se résolvent **vides au moment de la connexion TLS** (« either ServerName or InsecureSkipVerify must be specified ») | Utilisez l'espace réservé natif du transport : `tls_server_name {http.reverse_proxy.upstream.host}` |
| Clés en double ou lignes parasites dans `hosts.map` | Le gestionnaire `map` de Caddy **échoue net sur une clé d'entrée en double** — une seule mauvaise ligne peut faire tomber toute la configuration | Le script de synchronisation normalise les espaces, retire les lignes malformées (ne rejette l'ensemble que si plus de 20 % sont mauvaises), dédoublonne en gardant la première occurrence, et écrit en UTF-8 **sans BOM** (un BOM corrompt la première clé de la map). L'API filtre aussi à la source les lignes de domaine vides ou contenant des espaces |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | L'enregistrement de la tâche **échoue silencieusement** (XML hors plage, erreur non bloquante) | Construisez la répétition comme une instance CIM `MSFT_TaskRepetitionPattern` avec `Interval = "PT5M"` et sans durée ; ajoutez une `ExecutionTimeLimit` de 4 minutes (la première exécution SYSTEM peut se bloquer sur une recherche TLS/CRL à froid) |

:::warning
L'API d'administration n'écoute que sur `localhost:2019`. Le mode d'exécution légacy l'exposait à distance pour que l'API Membership puisse pousser des configurations de routes ; la conception statique n'a besoin d'aucune poussée distante, et la surface réduite est délibérée. `caddy reload` (exécuté localement par le script de synchronisation) est le seul consommateur de l'API d'administration.
:::

:::info Poussée d'exécution légacy
`CaddyHelper` dans l'API (et les points de terminaison `/membership/domains/caddy` + `/caddy/init`) existent encore comme voie de retour arrière vers l'ancien mode configuré à l'exécution. Ils seront supprimés une fois la machine statique stable depuis quelques semaines — après cela, `authorize` + `hostmap` seront les seuls points d'intégration.
:::

## Exploitation

- **Journaux** : journaux roulants de WinSW dans `C:\caddy\` (sortie standard/erreur du service — les erreurs du reverse proxy aboutissent dans `caddy-service.err.log`) ; historique de synchronisation dans `C:\caddy\sync-hostmap.log`.
- **Forcer un rafraîchissement de la map** : `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Modification de la configuration** : éditez `C:\caddy\Caddyfile`, puis `caddy validate` + `caddy reload` (ou `Restart-Service caddy` — les redémarrages sont sûrs par conception).
- **Suppression massive de domaines** déclenche par conception le garde-fou de réduction du script de synchronisation ; déplacez l'ancien `hosts.map` de côté et relancez la tâche pour accepter une réduction importante volontaire.
- **Les instructions DNS pour les églises ne changent jamais** : apex `A 3.23.251.61` ou `CNAME proxy.b1.church`.

## Pages connexes

- [Routage du site web et multi-sites](../architecture/websites) — comment la requête proxifiée est associée à une église ou à un site dans B1App
- [Déploiement de l'API](./apis) — déploiement de l'API Membership qui sert `authorize`/`hostmap`
