---
title: "Auto-hébergement avec Docker"
---

# Auto-hébergement avec Docker

<div class="article-intro">

Exécutez votre propre instance privée de B1 Admin, du portail membres et du site web B1, de l'API et d'une base de données MySQL sur n'importe quelle machine disposant de Docker : un serveur domestique, un petit VPS ou un serveur sur site. Une commande l'installe, une commande le met à jour, et chaque mise à jour commence par une sauvegarde. Si vous préférez ne pas gérer de serveur du tout, consultez [Auto-hébergement sur Railway](./railway-template) pour l'alternative gérée.

</div>

## Démarrage rapide

<div class="prereqs">
<h4>Ce dont vous avez besoin</h4>

- Une machine Linux (ou macOS / Windows avec WSL ou Git Bash — l'outil d'aide `b1` est un script bash) avec [Docker Engine](https://docs.docker.com/engine/install/) et Compose v2 (inclus dans Docker Desktop)
- Environ 2 Go de RAM et 5 Go d'espace disque
- Pour un site public : un nom de domaine pointant vers la machine, avec les ports 80 et 443 accessibles

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Omettez `--domain` pour fonctionner sur `http://localhost`. L'installateur crée un dossier `b1church`, écrit un fichier `.env` avec des secrets fraîchement générés, télécharge les images précompilées depuis GitHub Container Registry et attend que l'API signale un état sain. Rien n'est compilé sur votre machine, donc le premier démarrage prend une minute ou deux.

Une fois l'installation terminée :

1. Ouvrez **https://church.example.org/admin** (ou http://localhost/admin) et cliquez sur **Register**. Le premier compte devient automatiquement administrateur du serveur.
2. Suivez les instructions de l'application pour créer votre première église. Son site web et son portail membres sont accessibles à **https://church.example.org/** dès sa création.

Tout fonctionne derrière un seul domaine :

| Chemin | Service |
|------|---------|
| `/` | B1App — site web de l'église et portail membres |
| `/admin` | B1Admin — tableau de bord du personnel |
| `/api` | API, fichiers téléversés et websocket des mises à jour en direct |

Le HTTPS est automatique : le proxy [Caddy](https://caddyserver.com/) inclus obtient et renouvelle un certificat Let's Encrypt pour le domaine défini dans `.env`. Seuls les ports 80 et 443 sont exposés ; la base de données n'est accessible que depuis le réseau Docker interne.

## La commande `b1`

L'installateur place un script `deploy/b1` à côté de `docker-compose.yml`. C'est le seul outil dont vous avez besoin au quotidien :

| Commande | Ce qu'elle fait |
|---------|--------------|
| `./deploy/b1 upgrade` | Télécharge la version actuelle, crée une sauvegarde, redémarre et vérifie que l'API est saine |
| `./deploy/b1 upgrade 2026.10.1` | Identique, mais figé sur une version précise |
| `./deploy/b1 backup` | Crée un instantané de la base de données, des fichiers téléversés et de `.env` dans `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Restaure un instantané (l'API s'arrête pendant l'opération) |
| `./deploy/b1 rollback` | Restaure la sauvegarde la plus récente, y compris la version sur laquelle elle a été prise |
| `./deploy/b1 status` | Version installée et état des conteneurs |
| `./deploy/b1 logs api` | Suit les journaux d'un service |

Les versions sont publiées sous forme de lot versionné unique, afin que les trois images correspondent toujours. `B1_VERSION=stable` dans `.env` suit la dernière version ; indiquez une version précise pour la figer. Les notes de version se trouvent dans les [versions de B1Admin](https://github.com/ChurchApps/B1Admin/releases).

## Configuration

Tous les paramètres se trouvent dans `.env`, à côté de `docker-compose.yml`. L'installateur renseigne ceux qui sont obligatoires :

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # what Caddy serves; http://localhost for a local install
PUBLIC_URL=https://church.example.org    # how browsers and emails reach the site
MYSQL_ROOT_PASSWORD=…                    # generated
JWT_SECRET=…                             # generated
ENCRYPTION_KEY=…                         # generated, exactly 32 characters — never change it after storing credentials

# Email — strongly recommended; without it members can't reset their own passwords
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Après avoir modifié `.env`, appliquez les changements avec `docker compose up -d`. Les applications web déterminent l'API à utiliser à partir de l'adresse saisie dans le navigateur ; changer de domaine nécessite donc seulement de mettre à jour `SITE_ADDRESS` et `PUBLIC_URL`, puis de redémarrer — sans reconstruction.

:::warning
Conservez `.env` en lieu sûr. `ENCRYPTION_KEY` protège les identifiants stockés de la passerelle de paiement et du stockage ; une sauvegarde sans cette clé ne peut pas les déchiffrer. `./deploy/b1 backup` en inclut une copie pour cette raison.
:::

### Passer à un domaine plus tard

Si vous avez installé sur `localhost` et souhaitez ensuite le rendre public : pointez le DNS vers la machine, définissez `DOMAIN`, `SITE_ADDRESS` (le domaine seul) et `PUBLIC_URL` (`https://` suivi du domaine) dans `.env`, puis exécutez `docker compose up -d`. Caddy obtient un certificat à la première requête.

## E-mail, dons, multi-sites et intégrations

Ces fonctionnalités fonctionnent exactement comme sur Railway — mêmes variables d'environnement, définies dans `.env` au lieu du tableau de bord Railway :

- **[E-mail / SMTP](./railway-template#1-email-highly-recommended)** — guides pas à pas pour Resend, Brevo et Gmail
- **[Multi-sites](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — nombre illimité d'églises par instance. `/` affiche l'église dont le slug correspond à `DEFAULT_CHURCH_SLUG` (la première église s'appelle `church`) ; pointez les domaines supplémentaires vers la machine et associez-les sous **Paramètres → Domaines** dans B1Admin
- **[Dons en ligne](./railway-template#4-online-giving-stripe--paypal)** — configurés pour chaque église dans l'interface d'administration
- **[Intégrations facultatives](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_*`, `GOOGLE_RECAPTCHA_SECRET_KEY`

Les invitations et les autres e-mails envoyés par l'église sont activés automatiquement sur une instance auto-hébergée (le service hébergé les soumet à une vérification manuelle afin de protéger sa réputation d'expéditeur).

## Données, sauvegardes et stockage des fichiers

Trois volumes Docker nommés contiennent toutes les données :

| Volume | Contenu |
|--------|----------|
| `b1church_mysql-data` | Tous les schémas de la base de données |
| `b1church_api-content` | Fichiers téléversés — photos, documents, images du site web |
| `b1church_caddy-data` | Certificats TLS |

`./deploy/b1 backup` écrit un instantané cohérent des deux premiers volumes ainsi que de `.env` dans `backups/<timestamp>/`. Planifiez-le avec cron et copiez le dossier hors de la machine :

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Pour de grandes bibliothèques multimédias, vous pouvez passer le stockage des fichiers sur S3 — définissez `FILE_STORE=S3` ainsi que les variables `AWS_*` décrites dans la [section Stockage des fichiers du guide Railway](./railway-template#5-file-storage). Les sauvegardes de la base de données n'incluent pas les objets S3 ; activez le versionnement du bucket.

## Mise à jour

```bash
./deploy/b1 upgrade
```

Dans l'ordre : télécharge la version, crée une sauvegarde, recrée les conteneurs, exécute les migrations de base de données en attente au démarrage de l'API, puis attend la vérification de santé de l'API. En cas d'échec, la commande s'arrête et vous indique d'exécuter `./deploy/b1 rollback`, qui restaure cette sauvegarde ainsi que la version précédente. Les migrations ne vont que dans un sens ; revenir en arrière implique toujours de restaurer l'instantané.

Pour passer depuis l'ancien fichier compose bêta (celui qui compilait les images à partir des sources), la procédure est la même une fois que vous disposez d'un `.env` : celui-ci utilisait par défaut `MYSQL_ROOT_PASSWORD=churchapps`, donc ajoutez cette valeur dans `.env` avec `PUBLIC_URL` et `SITE_ADDRESS`, remplacez `docker-compose.yml` et `deploy/` par les fichiers actuels, puis exécutez `./deploy/b1 upgrade`.

## Compilation à partir des sources

Les développeurs peuvent compiler les images localement au lieu de les télécharger :

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` et `B1APP_CONTEXT` dans `.env` pointent les compilations vers des copies locales (par exemple `../Api`) ou vers une référence git.

## Dépannage

| Symptôme | Cause probable | Solution |
|---------|--------------|-----|
| Le conteneur `api` redémarre en boucle | échec de migration ou mot de passe de base de données incorrect | `./deploy/b1 logs api` — la migration indique le module en échec |
| `api` journalise « ENCRYPTION_KEY must be exactly 32 characters » | clé modifiée à la main ou tronquée dans `.env` | restaurez la clé d'origine de 32 caractères (n'en générez une nouvelle que si aucun identifiant n'est encore stocké) |
| Le navigateur affiche un avertissement de certificat | le DNS ne pointe pas encore ici, ou les ports 80/443 sont bloqués | corrigez le DNS ou le pare-feu ; Caddy réessaie automatiquement |
| `/` affiche un tableau de bord au lieu du site web | aucune église créée, ou `DEFAULT_CHURCH_SLUG` ne correspond pas | créez l'église, ou définissez le slug depuis **Paramètres → Église** |
| « Check your email » sans e-mail reçu | `MAIL_SYSTEM=SMTP` avec des identifiants incorrects | corrigez les identifiants, ou supprimez `MAIL_SYSTEM` pour désactiver l'e-mail |
| Chat / fonctions en direct silencieuses | websocket bloquée par un autre proxy en amont | le socket se trouve sur `/api/` sur le même port ; autorisez les en-têtes `Upgrade` |
| `install` refuse : « database volume already exists » | restes d'une installation antérieure | `docker compose down -v` pour tout effacer, ou écrivez un `.env` et utilisez `upgrade` |

Vous êtes toujours bloqué ? Ouvrez un ticket sur [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) en joignant la sortie de `./deploy/b1 logs`.

## Articles connexes

- **[Auto-hébergement sur Railway](./railway-template)** — alternative d'hébergement géré, ainsi que les guides de configuration post-déploiement communs
- **[Configuration initiale](../../getting-started/initial-setup)** — premières étapes après la création de votre église
- **[Configuration locale de l'API](../api/local-setup)** — exécuter la pile directement pour le développement
