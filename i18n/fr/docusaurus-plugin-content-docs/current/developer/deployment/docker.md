---
title: "Auto-hébergement avec Docker"
---

# Auto-hébergement avec Docker

<div class="article-intro">

Exécutez votre propre instance privée de B1 Admin, du portail des membres B1, de l'API, et d'une base de données MySQL sur n'importe quelle machine équipée de Docker — un serveur domestique, un VPS à 5 $, ou une boîte sur site. Un seul `docker compose up` construit et démarre tout. Si vous préférez ne pas du tout gérer de serveur, voir [Auto-hébergement sur Railway](./railway-template) pour l'alternative gérée.

</div>

## Démarrage rapide

<div class="prereqs">
<h4>Ce dont vous avez besoin</h4>

- [Docker Engine](https://docs.docker.com/engine/install/) avec Compose v2 (inclus dans Docker Desktop)
- ~4 Go de RAM disponibles pendant la construction initiale (les applications web sont construites à partir des sources)
- Git, ou simplement le fichier `docker-compose.yml` brut

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

La première exécution prend 10 à 20 minutes : elle construit B1Admin à partir de votre clone et construit l'API et B1App directement à partir de leurs dépôts GitHub. Les démarrages suivants prennent quelques secondes.

Une fois les quatre services démarrés :

1. Ouvrez **http://localhost:3101** (B1 Admin).
2. Cliquez sur **Register** et créez votre compte. Le premier compte est automatiquement administrateur serveur.
3. Suivez les invites dans l'application pour créer votre première église.

Les schémas de base de données sont créés automatiquement par la migration de démarrage du conteneur API — aucun SQL manuel n'est requis.

| Service | URL |
|---------|-----|
| B1Admin (personnel/admin) | http://localhost:3101 |
| B1App (portail des membres / site web) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | interne uniquement (`mysql:3306` sur le réseau compose) |

## Configuration

Tous les paramètres vivent dans un fichier `.env` à côté de `docker-compose.yml`. Chaque variable a une valeur par défaut fonctionnelle pour localhost, le fichier est donc facultatif jusqu'à ce que vous personnalisiez.

```bash
# .env — tout est facultatif ; affiché avec les valeurs par défaut
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # exactement 32 caractères

# URL publiques (à modifier lors d'une exposition au-delà de localhost)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084

# E-mail — voir la section E-mail du guide Railway pour les tutoriels par fournisseur
MAIL_SYSTEM=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Avant une utilisation réelle, changez `MYSQL_ROOT_PASSWORD`, `JWT_SECRET`, et `ENCRYPTION_KEY` (n'importe quelle chaîne de 32 caractères).

:::warning
Les valeurs `*_URL` sont **intégrées dans les applications web au moment de la construction** (comportement standard de Vite/Next.js). Les modifier dans `.env` nécessite une reconstruction, pas seulement un redémarrage :

```bash
docker compose up -d --build
```
:::

Changer le mot de passe MySQL après le premier lancement nécessite aussi de mettre à jour le mot de passe à l'intérieur de MySQL — le volume conserve les anciens identifiants.

## L'exposer sur Internet

Placez n'importe quel proxy inverse devant et donnez un nom d'hôte à chaque service. Avec [Caddy](https://caddyserver.com/), voici comment :

```
admin.yourchurch.org { reverse_proxy localhost:3101 }
app.yourchurch.org   { reverse_proxy localhost:3000 }
api.yourchurch.org   { reverse_proxy localhost:8084 }
```

Puis définissez les URL dans `.env` et reconstruisez :

```bash
API_URL=https://api.yourchurch.org
B1ADMIN_URL=https://admin.yourchurch.org
B1APP_URL=https://app.yourchurch.org
SOCKET_URL=wss://api.yourchurch.org
```

```bash
docker compose up -d --build
```

Le WebSocket utilisé pour le chat et les notifications en direct partage le port de l'API, `SOCKET_URL` est donc simplement l'URL de l'API avec `wss://`.

## E-mail, dons, multi-site, et intégrations

Ceux-ci fonctionnent de manière identique au déploiement Railway — les mêmes variables d'environnement, définies dans votre fichier `.env` au lieu du tableau de bord Railway (le fichier compose les transmet à l'API) :

- **[E-mail / SMTP](./railway-template#1-email-highly-recommended)** — fortement recommandé ; sans cela, les membres ne peuvent pas réinitialiser leurs mots de passe
- **[Multi-site](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — un nombre illimité d'églises par instance, gérées dans l'interface d'administration
- **[Dons en ligne](./railway-template#4-online-giving-stripe--paypal)** — configurés par église dans l'interface d'administration, pas via des variables d'environnement
- **[Intégrations optionnelles](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`

## Données, sauvegardes, et stockage de fichiers

Deux volumes Docker nommés détiennent tout l'état :

| Volume | Contenu |
|--------|----------|
| `mysql-data` | Tous les schémas de base de données |
| `api-content` | Fichiers téléversés — photos, documents, images de site web (monté sur `/app/content`) |

Sauvegardez la base de données avec une seule ligne de commande (planifiez-la avec cron) :

```bash
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

Sauvegardez les fichiers téléversés en copiant le volume :

```bash
docker run --rm -v b1admin_api-content:/data -v "$PWD":/backup alpine tar czf /backup/content-$(date +%F).tgz -C /data .
```

Pour de grandes bibliothèques de médias, vous pouvez basculer le stockage de fichiers vers S3 au lieu du volume local — définissez `FILE_STORE=S3` plus les variables `AWS_*` décrites dans la [section Stockage de fichiers du guide Railway](./railway-template#5-file-storage).

## Mise à jour

L'API et B1App se construisent depuis la branche `main` de leurs dépôts GitHub ; B1Admin se construit depuis votre clone local.

```bash
git pull                              # mettre à jour B1Admin
docker compose build --pull           # reconstruire toutes les images contre le dernier main
docker compose up -d
```

Les migrations de base de données s'exécutent automatiquement au démarrage du conteneur API.

Pour épingler des versions au lieu de suivre `main`, faites pointer les contextes de construction vers un tag dans `.env` :

```bash
API_CONTEXT=https://github.com/ChurchApps/Api.git#v1.2.3
B1APP_CONTEXT=https://github.com/ChurchApps/B1App.git#v1.2.3
```

Les développeurs peuvent faire pointer les mêmes variables vers des copies locales (par ex. `API_CONTEXT=../Api`).

## Dépannage

| Symptôme | Cause probable | Solution |
|---------|--------------|-----|
| Le conteneur `api` redémarre en boucle | MySQL pas prêt ou échec de migration | `docker compose logs api` — la migration affiche quel module a échoué |
| La connexion redirige vers `api.churchapps.org` | Application web construite sans les arguments d'étape `custom` | Reconstruire : `docker compose build --no-cache b1admin b1app` |
| Une URL a été changée dans `.env` mais rien ne s'est passé | Les URL sont intégrées au moment de la construction | `docker compose up -d --build` |
| « Consultez votre e-mail » mais aucun e-mail n'arrive | `MAIL_SYSTEM=SMTP` avec de mauvais identifiants | Corrigez les identifiants, ou désactivez `MAIL_SYSTEM` pour désactiver l'e-mail |
| Chat / fonctionnalités en direct silencieuses | `SOCKET_URL` inaccessible depuis le navigateur | Doit être `wss://` derrière HTTPS et redirigé vers le port 8084 |
| La construction échoue sur un petit VPS | Manque de mémoire pendant `next build` | Ajoutez du swap, ou construisez sur une autre machine puis `docker save`/`load` |

Toujours bloqué ? Ouvrez une issue sur [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) avec la sortie de `docker compose logs`.

## Articles connexes

- **[Auto-hébergement sur Railway](./railway-template)** — alternative d'hébergement géré, plus les guides de configuration post-déploiement partagés
- **[Configuration initiale](../../getting-started/initial-setup)** — premières étapes après la création de votre église
- **[Configuration locale de l'API](../api/local-setup)** — exécuter la pile directement pour le développement
