---
title: "Proxy Caddy pour domaines personnalisés"
---

# Proxy Caddy pour domaines personnalisés

<div class="article-intro">

Les domaines personnalisés des églises (`mon-eglise.org` → le site web B1 de l'église) se terminent sur une seule machine EC2 Windows qui exécute Caddy. La machine possède les certificats TLS, résout chaque domaine vers son site `{sub}.b1.church` et transmet la requête avec un en-tête Host réécrit. Toute sa configuration tient en deux fichiers -- un `Caddyfile` statique et un `hosts.map` rafraîchi depuis l'API Membership -- de sorte qu'elle survit aux redémarrages sans aucun état d'exécution. Cette page couvre la façon de construire la machine à partir de zéro, son fonctionnement et les pièges éprouvés sur le terrain qui attendent quiconque reconstruit ce système.

</div>

Pour savoir comment une requête se résout en église/site une fois arrivée à B1App, consultez [Routage du site web et multi-sites](../architecture/websites).

## Composants

| Élément | Description |
|---|---|
| Instance EC2 | Windows Server ; IP élastique **`3.23.251.61`** (inscrite dans le DNS des églises partout dans le monde -- l'IP est permanente, les instances sont jetables) |
| `C:\caddy\caddy.exe` | Build **personnalisé** de Caddy avec le module de stockage `techknowlogick/certmagic-s3` -- Caddy standard ne peut pas lire le magasin de certificats |
| `C:\caddy\Caddyfile` | L'intégralité de la configuration du proxy : TLS à la demande, `map` hôte→amont, redirections www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Une ligne `{domain} {sub}.b1.church` par domaine routable, importée dans le bloc `map` du Caddyfile |
| `sync-hostmap.ps1` + tâche `CaddyHostmapSync` | Tâche planifiée (toutes les 5 minutes et au démarrage, en tant que SYSTEM) qui rafraîchit `hosts.map` depuis l'API et ne recharge Caddy gracieusement que si quelque chose a changé |
| Service Windows `caddy` (enveloppe WinSW) | Exécute `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` ; redémarrage automatique en cas d'échec. Caddy ne reconnaît pas le SCM, donc une enveloppe est nécessaire |
| Compartiment S3 `churchapps-caddy-certs` | Stockage partagé des certificats (`region us-east-2`, préfixe `certs`) -- les certificats survivent à la reconstruction des instances |
| Rôle IAM `CaddyRole` | Accorde à l'instance l'accès S3 ; Caddy utilise la chaîne d'identification par défaut d'AWS (aucune clé dans la configuration) |

## Les deux points de terminaison de l'API dont dépend la machine

Tous deux sur l'API Membership. `authorize` est anonyme ; `hostmap` exige l'en-tête `x-internal-key: <INTERNAL_API_KEY>` depuis la PR Api n° 67 (2026-08-16) -- `sync-hostmap.ps1` le lit depuis `C:\caddy\internal-key.txt` :

| Point de terminaison | Rôle |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Le **contrôle `ask` du TLS à la demande** de Caddy : `200 {"authorized":true}` lorsque l'hôte (ou, pour un hôte `www.`, son apex) est une ligne de `domains` ; `404` sinon. C'est le contrôle anti-abus -- Caddy ne délivrera pas de certificat pour un hôte que ce point de terminaison rejette |
| `GET /membership/domains/hostmap` | Exige `x-internal-key` (ou un JWT d'administrateur serveur). `text/plain`, lignes `{domain} {sub}.b1.church` triées et dédupliquées (sensible au site : un domaine assigné à un site secondaire pointe vers le sous-domaine de ce site). Source de la `map` |

## Déroulement d'une requête

1. Le navigateur résout `mon-eglise.org` → `3.23.251.61` (enregistrement `A` apex, ou `CNAME proxy.b1.church`).
2. Caddy termine le TLS. Si le certificat est disponible dans S3 → le servir ; SNI inconnu → on interroge `authorize` ; 200 → émission à la demande par Let's Encrypt ; 404 → **la négociation TLS est refusée** (ni certificat, ni réponse -- un hôte inconnu est refusé au niveau TLS, et non par une erreur HTTP).
3. La `map` résout l'hôte vers `{sub}.b1.church` ; `www.{apex}` reçoit une redirection 302 vers l'apex ; un hôte autorisé mais pas encore mappé (un domaine tout neuf dans la fenêtre de synchronisation de 5 minutes au plus) reçoit un 404 propre.
4. `reverse_proxy` se connecte à `{sub}.b1.church:443` avec SNI et Host réécrits vers l'amont, de sorte que l'edge de Vercel sert le site B1App.
   Caddy envoie aussi le domaine d'origine du visiteur en `X-Church-Host` (Vercel écrase `X-Forwarded-Host` avec l'hôte réécrit). Le middleware de B1App ne l'accepte que lorsque `/domains/public/lookup/{host}` le fait correspondre au même `{sub}` que l'hôte de la requête, puis l'expose comme `x-public-host` pour l'en-tête `Link` canonique, `robots.txt` et `sitemap.xml` ; le `x-public-host` envoyé par le client est toujours retiré. Le `ChurchJsonLd` en schema.org utilise toujours l'URL `b1.church` (lire les en-têtes à cet endroit rendrait les pages dynamiques).
5. Le port 80 transmet les défis ACME HTTP-01 et redirige tout le reste en 308 vers https.

Propagation d'un nouveau domaine : un domaine enregistré dans B1Admin devient routable dans les ~5 minutes (la tâche de synchronisation) ; son certificat est émis à la première requête HTTPS.

## Construire la machine à partir de zéro

Condensé de la procédure éprouvée sur le terrain (la procédure complète, pas à pas et avec des commandes à copier-coller, se trouve dans l'espace de travail des opérations, et non dans ce dépôt). Les prérequis d'abord -- sans eux, la construction ne fonctionne pas :

1. **IAM** : attachez `CaddyRole` (accès S3 au compartiment des certificats) à l'instance. Vérifiez via IMDSv2 depuis la machine -- notez qu'un GET IMDS nu qui renvoie 401 signifie seulement qu'IMDSv2 est imposé, et non « aucun rôle ».
2. **Santé de l'API** : `authorize` doit renvoyer 404 pour un domaine bidon, et `hostmap` (avec l'en-tête `x-internal-key`) doit renvoyer 200, avant toute autre étape.

Puis :

3. **Binaire** : téléchargez un build personnalisé depuis le service de build de Caddy -- `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 Mo contre ~45 Mo pour la version standard ; v2.11.4 au moment de l'écriture). Le choix du module compte : `techknowlogick/certmagic-s3` utilise les clés `bucket`/`region`/`prefix` qui correspondent à la disposition existante des certificats ; la variante `ss098` utilise `host`/`endpoint` et **ne trouvera pas** les certificats existants.
4. **Fichiers** : `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (`INTERNAL_API_KEY` de production, une seule ligne) dans `C:\caddy\` ; amorcez la carte une fois avec `sync-hostmap.ps1 -NoReload`.
5. **Contrôles avant le premier démarrage** : `caddy list-modules` doit afficher le module de stockage s3 ; `caddy adapt` doit émettre `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` dans son bloc de stockage ; `caddy validate` doit réussir.
6. **Service** : installez via WinSW (identifiant de service `caddy`, redémarrage automatique en cas d'échec, journaux roulants). Exécutez sous LocalSystem, qui atteint IMDS pour les identifiants du rôle.
7. **Tâche de synchronisation** : enregistrez `CaddyHostmapSync` (SYSTEM, toutes les 5 minutes et au démarrage, limite d'exécution de 4 minutes).
8. **Vérifiez avant la bascule** en forçant la résolution des domaines vers `127.0.0.1` avec `curl --resolve` (la machine n'a aucun trafic réel tant que l'IP élastique n'a pas été déplacée) : un domaine existant doit être servi avec le certificat repris ; `www.` doit renvoyer 302 ; un hôte inconnu doit être refusé au niveau TLS ; et `Restart-Service caddy` doit revenir en servant **sans réamorçage manuel** -- ce test de redémarrage est toute la raison d'être de la conception statique.
9. **Mise en production** : réassociez l'IP élastique `3.23.251.61` à la nouvelle instance. Le DNS des églises ne change jamais.

## Pièges éprouvés (appris à la dure -- ne pas régresser)

| Piège | Symptôme | Correction |
|---|---|---|
| `tls_server_name {vars.upstream}` dans le transport de reverse_proxy | Chaque domaine proxifié renvoie 502 : les espaces réservés de la map se résolvent **vides au moment de la connexion TLS** (« either ServerName or InsecureSkipVerify must be specified ») | Utilisez l'espace réservé natif du transport : `tls_server_name {http.reverse_proxy.upstream.host}` |
| Clés en double ou lignes parasites dans `hosts.map` | Le gestionnaire `map` de Caddy **échoue à la compilation sur une clé d'entrée en double** -- une seule mauvaise ligne peut faire tomber toute la configuration | Le script de synchronisation normalise les espaces, retire les lignes mal formées (ne rejette l'ensemble que si plus de 20 % sont mauvaises), déduplique en gardant la première occurrence, et écrit de l'UTF-8 **sans BOM** (un BOM corrompt la première clé de la map). L'API filtre aussi à la source les lignes de domaine vides ou contenant des espaces |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | L'enregistrement de la tâche **échoue silencieusement** (XML hors plage, erreur non bloquante) | Construisez la répétition comme une instance CIM `MSFT_TaskRepetitionPattern` avec `Interval = "PT5M"` et sans durée ; ajoutez une `ExecutionTimeLimit` de 4 minutes (la première exécution SYSTEM peut se bloquer sur une recherche TLS/CRL à froid) |

:::warning
L'API d'administration n'écoute que sur `localhost:2019`. Le mode d'exécution hérité l'exposait à distance pour que l'API Membership pousse des configurations de routes ; la conception statique n'a besoin d'aucune poussée distante, et la surface réduite est délibérée. `caddy reload` (exécuté localement par le script de synchronisation) est le seul consommateur de l'API d'administration.
:::

:::info Poussée d'exécution héritée
`CaddyHelper` dans l'API (et les points de terminaison `/membership/domains/caddy` + `/caddy/init`) existent toujours comme chemin de retour arrière vers l'ancien mode configuré à l'exécution. Ils seront supprimés une fois la machine statique stable depuis quelques semaines ; après cela, `authorize` + `hostmap` seront les seuls points d'intégration.
:::

## Exploitation

- **Journaux** : journaux roulants de WinSW dans `C:\caddy\` (stdout/stderr du service -- les erreurs du reverse-proxy aboutissent dans `caddy-service.err.log`) ; historique de synchronisation dans `C:\caddy\sync-hostmap.log`.
- **Forcer un rafraîchissement de la carte** : `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Modification de la configuration** : éditez `C:\caddy\Caddyfile`, puis `caddy validate` + `caddy reload` (ou `Restart-Service caddy` -- les redémarrages sont sans danger par conception).
- **Suppression massive de domaines** : déclenche volontairement la garde de réduction du script de synchronisation ; déplacez l'ancien `hosts.map` de côté et relancez la tâche pour accepter une réduction importante intentionnelle.
- **Les instructions DNS destinées aux églises ne changent jamais** : `A` apex vers `3.23.251.61` ou `CNAME` vers `proxy.b1.church`.

## Pages connexes

- [Routage du site web et multi-sites](../architecture/websites) — comment la requête proxifiée se résout en église/site dans B1App
- [Déploiement de l'API](./apis) — déploiement de l'API Membership qui sert `authorize`/`hostmap`
