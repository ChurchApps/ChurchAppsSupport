---
title: "Auto-hébergement avec Docker"
---

# Auto-hébergement avec Docker

<div class="article-intro">

Faites tourner votre propre instance privée de B1 Admin, du portail des membres et du site web B1, de l'API et d'une base de données MySQL sur n'importe quelle machine dotée de Docker — un serveur domestique, un petit VPS ou un serveur sur place. Une seule commande l'installe, une seule commande la met à niveau, et chaque mise à niveau commence par une sauvegarde. Si vous préférez ne pas gérer de serveur du tout, consultez [Auto-hébergement sur Railway](./railway-template) pour l'alternative gérée.

</div>

## Démarrage rapide

<div class="prereqs">
<h4>Ce dont vous avez besoin</h4>

- Une machine Linux (ou macOS / Windows avec WSL ou Git Bash — l'utilitaire `b1` est un script bash) avec [Docker Engine](https://docs.docker.com/engine/install/) et Compose v2 (inclus dans Docker Desktop)
- Environ 2 Go de RAM et 5 Go d'espace disque
- Pour un site public : un nom de domaine pointant vers la machine, avec les ports 80 et 443 accessibles

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Omettez `--domain` pour fonctionner sur `http://localhost`. Le programme d'installation crée un dossier `b1church`, écrit un `.env` avec des secrets fraîchement générés, télécharge les images précompilées depuis GitHub Container Registry, et attend que l'API signale qu'elle est en bon état. Rien n'est compilé sur votre machine, donc le premier démarrage prend une minute ou deux.

Une fois terminé :

1. Ouvrez **https://church.example.org/admin** (ou http://localhost/admin) et cliquez sur **S'inscrire**. Le premier compte devient automatiquement administrateur du serveur.
2. Suivez les invites de l'application pour créer votre première église. Son site web et son portail des membres sont en ligne à **https://church.example.org/** dès qu'elle existe.

Tout fonctionne derrière un seul domaine :

| Chemin | Service |
|------|---------|
| `/` | B1App — site web de l'église et portail des membres |
| `/admin` | B1Admin — tableau de bord du personnel |
| `/api` | API, fichiers téléversés et websocket des mises à jour en direct |

Le HTTPS est automatique : le proxy [Caddy](https://caddyserver.com/) inclus obtient et renouvelle un certificat Let's Encrypt pour le domaine indiqué dans `.env`. Seuls les ports 80 et 443 sont exposés ; la base de données n'est accessible que depuis le réseau Docker interne.

## La commande `b1`

Le programme d'installation laisse un script `deploy/b1` à côté de `docker-compose.yml`. C'est la seule chose dont vous avez besoin au quotidien :

| Commande | Ce qu'elle fait |
|---------|--------------|
| `./deploy/b1 upgrade` | Télécharge la version courante, fait une sauvegarde, redémarre et vérifie que l'API est en bon état |
| `./deploy/b1 upgrade 2026.10.1` | Identique, épinglé sur une version précise |
| `./deploy/b1 backup` | Capture la base de données, les fichiers téléversés et `.env` dans `backups/<horodatage>/` |
| `./deploy/b1 restore backups/<horodatage>` | Restaure une capture (l'API s'arrête pendant l'opération) |
| `./deploy/b1 rollback` | Restaure la sauvegarde la plus récente, y compris la version sur laquelle elle a été prise |
| `./deploy/b1 status` | Version installée et état de santé des conteneurs |
| `./deploy/b1 logs api` | Suit les journaux d'un service |

Les versions sont publiées sous forme d'un seul ensemble versionné, de sorte que les trois images correspondent toujours. `B1_VERSION=stable` dans `.env` suit la dernière version ; indiquez une version précise pour l'épingler. Les notes de version se trouvent sous [Versions de B1Admin](https://github.com/ChurchApps/B1Admin/releases).

## Configuration

Tous les paramètres se trouvent dans `.env`, à côté de `docker-compose.yml`. Le programme d'installation remplit les paramètres obligatoires :

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # ce que Caddy sert ; http://localhost pour une installation locale
PUBLIC_URL=https://church.example.org    # comment les navigateurs et les courriels atteignent le site
MYSQL_ROOT_PASSWORD=…                    # généré
JWT_SECRET=…                             # généré
ENCRYPTION_KEY=…                         # généré, exactement 32 caractères — ne jamais la modifier après avoir stocké des identifiants

# Courriel — fortement recommandé ; sans lui, les membres ne peuvent pas réinitialiser leur mot de passe
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Après avoir modifié `.env`, appliquez-le avec `docker compose up -d`. Les applications web déterminent quelle API interroger à partir de l'adresse dans le navigateur ; changer de domaine ne demande donc que la mise à jour de `SITE_ADDRESS` et de `PUBLIC_URL`, puis un redémarrage — aucune recompilation.

:::warning
Conservez `.env` en lieu sûr. `ENCRYPTION_KEY` protège les identifiants de la passerelle de paiement et du stockage ; une sauvegarde sans elle ne peut pas les déchiffrer. `./deploy/b1 backup` en inclut une copie pour cette raison.
:::

### Passer plus tard à un domaine

Si vous avez installé l'instance sur `localhost` et voulez la rendre publique ensuite : pointez le DNS vers la machine, puis définissez `DOMAIN`, `SITE_ADDRESS` (le domaine nu) et `PUBLIC_URL` (`https://` + domaine) dans `.env`, puis lancez `docker compose up -d`. Caddy obtient un certificat à la première requête.

## Courriel, dons, multi-sites et intégrations

Ces éléments fonctionnent exactement comme sur Railway — les mêmes variables d'environnement, définies dans `.env` au lieu du tableau de bord Railway :

- **[Courriel / SMTP](./railway-template#1-email-highly-recommended)** — guides des fournisseurs Resend, Brevo et Gmail
- **[Multi-site](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — un nombre illimité d'églises par instance. `/` sert l'église dont le slug est `DEFAULT_CHURCH_SLUG` (la première église est `church`) ; pointez les domaines supplémentaires vers la machine et associez-les sous **Paramètres → Domaines** dans B1Admin
- **[Dons en ligne](./railway-template#4-online-giving-stripe--paypal)** — configurés par église dans l'interface d'administration
- **[Intégrations facultatives](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Notifications push](#push-notifications)** — `WEB_PUSH_*` ; le programme d'installation les laisse vides, donc le push est désactivé jusqu'à ce que vous les ajoutiez

Les invitations et les autres courriels envoyés par l'église sont activés automatiquement sur une instance auto-hébergée (le service hébergé les soumet à un examen manuel pour protéger la réputation de son expéditeur).

## Notifications push {#push-notifications}

Les notifications push web (navigateur et mobile) restent désactivées tant que le serveur ne dispose pas d'une paire de clés VAPID. Le programme d'installation n'en crée pas. Tant que vous ne les ajoutez pas, la page Notifications de l'application web mobile indique que le push n'est pas activé pour le site.

1. Générez une paire de clés. Cela ne nécessite que Docker :

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Ajoutez les deux valeurs dans `.env`. `WEB_PUSH_SUBJECT` est facultatif et correspond à l'adresse de contact que voient les services de push :

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Appliquez-les :

   ```bash
   docker compose up -d
   ```

4. Pour vérifier, ouvrez **Administration du serveur → Santé du serveur** dans B1Admin. Les deux clés Web Push doivent apparaître comme configurées. Les membres peuvent alors activer les notifications depuis l'application web mobile.

:::warning
Gardez les mêmes clés une fois que les membres se sont inscrits. Les modifier invalide tous les abonnements existants, et chaque appareil doit s'enregistrer à nouveau.
:::

## Données, sauvegardes et stockage des fichiers

Trois volumes Docker nommés contiennent tout l'état :

| Volume | Contenu |
|--------|----------|
| `b1church_mysql-data` | Tous les schémas de base de données |
| `b1church_api-content` | Fichiers téléversés — photos, documents, images du site web |
| `b1church_caddy-data` | Certificats TLS |

`./deploy/b1 backup` écrit une capture cohérente des deux premiers, plus `.env`, dans `backups/<horodatage>/`. Planifiez-la avec cron et copiez le dossier hors de la machine :

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Pour les grandes bibliothèques de médias, vous pouvez passer le stockage des fichiers sur S3 — définissez `FILE_STORE=S3` ainsi que les variables `AWS_*` décrites dans la [section Stockage des fichiers du guide Railway](./railway-template#5-file-storage). Les sauvegardes de la base de données n'incluent pas les objets S3 ; activez le versionnage du seau de ce côté.

## Mise à jour

```bash
./deploy/b1 upgrade
```

Dans l'ordre : télécharge la version, prend une sauvegarde, recrée les conteneurs, exécute les migrations de base de données en attente au démarrage de l'API, et attend le contrôle de santé de l'API. En cas d'échec, il s'arrête et vous indique d'exécuter `./deploy/b1 rollback`, qui restaure cette sauvegarde et la version précédente. Les migrations ne vont que vers l'avant ; revenir en arrière signifie toujours restaurer la capture.

La mise à niveau depuis le fichier compose bêta (celui qui compilait les images à partir des sources) fonctionne de la même façon une fois que vous avez un `.env` : il utilisait par défaut `MYSQL_ROOT_PASSWORD=churchapps`, donc placez cette valeur dans `.env` avec `PUBLIC_URL` et `SITE_ADDRESS`, remplacez `docker-compose.yml` et `deploy/` par les fichiers actuels, puis exécutez `./deploy/b1 upgrade`.

## Compiler à partir des sources

Les développeurs peuvent compiler les images localement au lieu de les télécharger :

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` et `B1APP_CONTEXT` dans `.env` pointent les compilations vers des copies locales (par exemple `../Api`) ou vers une référence git.

## Dépannage

| Symptôme | Cause probable | Correction |
|---------|--------------|-----------|
| Le conteneur `api` redémarre en boucle | Échec d'une migration ou mauvais mot de passe de base de données | `./deploy/b1 logs api` — la migration indique quel module a échoué |
| L'API journalise « ENCRYPTION_KEY must be exactly 32 characters » | Clé modifiée à la main ou tronquée dans `.env` | Restaurez la clé d'origine de 32 caractères (n'en générez une nouvelle que si aucun identifiant n'est encore stocké) |
| Le navigateur affiche un avertissement de certificat | Le DNS ne pointe pas encore ici, ou les ports 80/443 sont bloqués | Corrigez le DNS ou le pare-feu ; Caddy réessaie automatiquement |
| `/` affiche un tableau de bord au lieu du site web | Aucune église encore, ou `DEFAULT_CHURCH_SLUG` ne correspond pas | Créez l'église, ou définissez le slug dans **Paramètres → Église** |
| « Vérifiez votre courriel » mais aucun courriel n'arrive | `MAIL_SYSTEM=SMTP` avec de mauvais identifiants | Corrigez les identifiants, ou retirez `MAIL_SYSTEM` pour désactiver le courriel |
| L'application web mobile indique que les notifications push ne sont pas activées | Aucune clé VAPID sur le serveur | Ajoutez-les comme décrit dans [Notifications push](#push-notifications) |
| Clavardage / fonctions en direct silencieuses | Websocket bloqué par un autre proxy placé devant | Le socket est sur `/api/` sur le même port ; autorisez les en-têtes `Upgrade` |
| `install` refuse : « database volume already exists » | Restes d'une installation antérieure | `docker compose down -v` pour tout effacer, ou écrivez un `.env` et utilisez `upgrade` |

Vous êtes toujours bloqué ? Ouvrez un ticket sur [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) avec la sortie de `./deploy/b1 logs`.

## Articles connexes

- **[Auto-hébergement sur Railway](./railway-template)** — alternative d'hébergement géré, ainsi que les guides de configuration post-déploiement partagés
- **[Configuration initiale](../../getting-started/initial-setup)** — premières étapes après la création de votre église
- **[Configuration locale de l'API](../api/local-setup)** — faire tourner la pile directement pour le développement
