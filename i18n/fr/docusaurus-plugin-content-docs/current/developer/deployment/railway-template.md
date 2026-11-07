---
title: "Auto-hébergement sur Railway"
description: "Déployez ChurchApps sur Railway en 15 minutes environ, puis configurez e-mail, domaines, routage multi-églises, dons et stockage de fichiers."
---

# Auto-hébergement sur Railway

<div class="article-intro">

ChurchApps publie un [modèle Railway](https://railway.com) en un clic qui offre à votre église sa propre instance privée de B1 Admin, du portail des membres B1, de l'API et d'une base de données MySQL — le tout sur une infrastructure que vous possédez et payez directement. Ce guide vous met en ligne en une quinzaine de minutes, puis décrit la configuration post-déploiement que la plupart des églises finissent par vouloir.

</div>

## Démarrage rapide

[![Déployer sur Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Cliquez sur le bouton **Déployer sur Railway** ci-dessus.
2. Connectez-vous à Railway (ou créez un compte gratuit) et ajoutez un moyen de paiement.
3. Cliquez sur **Deploy** sans rien modifier — chaque variable a une valeur par défaut raisonnable.
4. Attendez 5 à 10 minutes que les quatre services passent au vert.
5. Ouvrez l'URL du service **B1Admin**, cliquez sur **S'inscrire** et créez votre compte. Le premier compte devient automatiquement administrateur du serveur.
6. Suivez les invites de l'application pour créer votre première église.

C'est tout. Vous disposez maintenant d'une instance ChurchApps entièrement fonctionnelle. Tout ce qui suit est facultatif.

:::tip
Le déploiement est actuellement en **bêta**. Si vous rencontrez quelque chose que la documentation ne couvre pas, ouvrez un ticket sur [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) en joignant les journaux de déploiement.
:::

<div class="prereqs">
<h4>Ce dont vous avez besoin</h4>

- Un compte [Railway](https://railway.com) gratuit
- Une carte de crédit enregistrée chez Railway (environ 15 à 25 $ par mois pour une petite congrégation ; voir [Coûts](#costs))
- Environ 15 minutes pour le déploiement initial
- *Facultatif mais fortement recommandé ensuite :* identifiants SMTP et un domaine personnalisé

</div>

## Ce qui est déployé

Le modèle provisionne quatre services dans un seul projet Railway :

| Service | Rôle | URL après le déploiement |
|---------|---------|------------------|
| **MySQL** | Stocke toutes les données (une instance, plusieurs schémas) | interne seulement |
| **Api** | Serveur pour l'appartenance, le contenu, les dons, les présences, etc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Application web du personnel et des administrateurs | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Application web destinée aux membres et site web de l'église | `https://b1app-<id>.up.railway.app` |

Les schémas de base de données sont créés automatiquement au premier démarrage par la migration de démarrage de l'API.

## Configuration initiale

Maintenant que l'instance est en ligne, voici ce que la plupart des églises configurent ensuite, à peu près par ordre de priorité.

### 1. Courriel (fortement recommandé) {#1-email-highly-recommended}

Sans courriel, les membres peuvent toujours s'inscrire et utiliser le système, mais **ils ne peuvent pas réinitialiser un mot de passe oublié** — un administrateur doit le faire à leur place. La configuration de SMTP prend environ 5 minutes.

Dans le tableau de bord Railway, ouvrez le service **Api** → **Variables**, et ajoutez :

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<l'hôte de votre fournisseur>
SMTP_USER=<votre nom d'utilisateur>
SMTP_PASS=<votre mot de passe ou clé API>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@votreeglise.org
```

Trois fournisseurs à connaître :

#### Resend — l'option gratuite la plus simple (100 courriels par jour)

1. Inscrivez-vous sur [resend.com](https://resend.com).
2. Vérifiez un domaine d'envoi (ou utilisez l'expéditeur de test `onboarding@resend.dev` pour commencer).
3. Créez une clé API.
4. Définissez `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — gratuit pour un usage personnel (environ 500 par jour)

1. Activez l'authentification à deux facteurs sur le compte Google.
2. Créez un [mot de passe d'application](https://myaccount.google.com/apppasswords).
3. Définissez `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=votre-adresse@gmail.com`, `SMTP_PASS=<le mot de passe d'application à 16 caractères>`.

#### AWS SES — le moins cher à grande échelle

1. Vérifiez un domaine d'envoi dans AWS.
2. Sortez du bac à sable SES si vous enverrez à des adresses non vérifiées.
3. Créez des identifiants SMTP sous **SES → Paramètres SMTP → Créer des identifiants**.
4. Définissez `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<mot de passe SMTP de SES>`.

Après l'enregistrement des variables, le service Api se redéploie automatiquement. Testez en déclenchant une réinitialisation de mot de passe sur un compte de test.

:::warning
Si vous définissez `MAIL_SYSTEM=SMTP` avec de mauvais identifiants, l'inscription semblera réussir, mais le courriel de vérification n'arrivera jamais. Corrigez les identifiants ou retirez `MAIL_SYSTEM` pour revenir au mode sans courriel.
:::

### 2. Domaines personnalisés

Les URL par défaut `*.up.railway.app` fonctionnent, mais la plupart des églises veulent les leurs.

Pour chaque service web (B1Admin et B1App) :

1. Ouvrez le service dans Railway → **Settings** → **Networking**.
2. Cliquez sur **+ Custom Domain** et saisissez le nom d'hôte :
   - `admin.votreeglise.org` pour B1Admin
   - `app.votreeglise.org` (ou `www`) pour B1App
3. Ajoutez l'enregistrement CNAME que Railway affiche à votre fournisseur DNS.
4. Attendez quelques minutes que le DNS se propage. Railway provisionne automatiquement le certificat TLS.

Mettez ensuite à jour les variables du service **Api** pour que les liens dans les courriels utilisent les nouveaux domaines :

```
B1ADMIN_ROOT=https://admin.votreeglise.org
```

Et sur le service **B1Admin** :

```
REACT_APP_API_BASE=https://api.votreeglise.org   (si vous définissez aussi un domaine d'API personnalisé)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.votreeglise.org
```

Le jeton `{subdomain}` est littéral — il est remplacé à l'exécution par le sous-domaine de chaque église (voir Multi-site ci-dessous).

### 3. Multi-site (plusieurs églises sur une même instance) {#3-multi-site-multiple-churches-on-one-instance}

ChurchApps est multilocataire par conception — un seul déploiement peut héberger un nombre quelconque d'églises, chacune avec ses propres personnes, groupes et site web. Les nouvelles églises s'ajoutent entièrement depuis l'interface d'administration ; aucun changement d'infrastructure n'est nécessaire.

#### Ajouter des églises supplémentaires

1. Dans **B1 Admin**, allez dans **Paramètres → Gérer l'église → Changer d'église → Créer**.
2. Chaque église a un **slug de sous-domaine** unique (par exemple `premiereeglise`, `communautegrace`).
3. La nouvelle église dispose de ses propres données, membres, site web et configuration des dons, entièrement isolés des autres églises de la même instance.

#### Acheminer chaque église vers sa propre URL {#routing-each-church-to-its-own-url}

Deux façons d'exposer les églises publiquement :

| Modèle | Exemple | Configuration |
|---------|---------|---------------|
| **Par chemin** (fonctionne dès le départ) | `app.votreeglise.org/premiereeglise` | Aucune configuration supplémentaire |
| **Par sous-domaine** (URL plus propres) | `premiereeglise.votreeglise.org` | DNS générique + domaine personnalisé générique |

Pour le routage **par sous-domaine** sur Railway :

1. Dans votre fournisseur DNS, créez un CNAME générique : `*.votreeglise.org → <cible Railway de b1app>`.
2. Dans Railway, sur le service B1App → **Settings → Networking**, ajoutez `*.votreeglise.org` comme domaine personnalisé.
3. Sur le service **B1Admin**, définissez `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.votreeglise.org`.

Après le redéploiement, le site de chaque église est servi automatiquement à `<sous-domaine-de-l-eglise>.votreeglise.org`.

:::info
Les domaines personnalisés génériques exigent un forfait Railway payant. Le routage par chemin fonctionne sur tous les forfaits et est fonctionnellement identique — simplement moins joli dans la barre d'adresse.
:::

### 4. Dons en ligne (Stripe / PayPal) {#4-online-giving-stripe--paypal}

Les dons se configurent **par église, dans l'interface d'administration**, et non par des variables d'environnement — ainsi, chaque église peut utiliser son propre compte marchand.

1. Obtenez les identifiants développeur auprès de [Stripe](https://dashboard.stripe.com/) (Developers → API keys) ou de [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. Dans B1 Admin, allez dans **Paramètres → Paramètres des dons**.
3. Choisissez votre fournisseur, collez les clés publique et secrète, et configurez la gestion des frais.
4. Facultativement, ajoutez `GOOGLE_RECAPTCHA_SECRET_KEY` au service **Api** dans Railway pour protéger les formulaires de dons publics contre les robots.

### 5. Stockage des fichiers {#file-storage}

Le modèle provisionne un **volume persistant de 1 Go** monté sur le service Api, pour les photos des membres, les fichiers de sermons et les documents téléversés.

Pour l'agrandir : ouvrez le service Api → **Volumes** → ajustez le curseur de taille.

Pour les déploiements plus importants (100 Go et plus, ou de nombreux téléversements simultanés), passez à S3 en définissant ces variables sur le service **Api** :

```
FILE_STORE=S3
AWS_S3_BUCKET=<votre-seau>
AWS_ACCESS_KEY_ID=<clé>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Les fichiers existants du volume ne migrent pas automatiquement — copiez-les dans le seau avant de changer la variable.

### 6. Intégrations facultatives {#optional-feature-integrations}

Elles débloquent des fonctions précises et peuvent toutes être ajoutées plus tard depuis le tableau de bord Railway. Définissez-les sur le service **Api**.

| Variable | Fonction activée |
|----------|--------------------|
| `OPENAI_API_KEY` *ou* `OPENROUTER_API_KEY` | Recherche assistée par IA et suggestions de contenu |
| `YOUTUBE_API_KEY` | Recherche et intégration de sermons YouTube |
| `PEXELS_KEY` | Sélecteur d'images d'archive pour le générateur de site web |
| `VIMEO_TOKEN` | Prise en charge des sermons Vimeo |
| `API_BIBLE_KEY` | Recherche de versets bibliques dans les leçons et le contenu |
| `YOUVERSION_API_KEY` | Intégration de la Bible YouVersion |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Notifications push du navigateur ([générer une paire de clés VAPID](./docker.md#push-notifications)) |
| `HUBSPOT_KEY` | Synchronisation facultative avec un CRM pour les nouvelles inscriptions |

## Mise à jour

Chaque service est lié à son dépôt GitHub. Les envois vers `main` dans `ChurchApps/Api`, `ChurchApps/B1Admin` ou `ChurchApps/B1App` déclenchent un redéploiement automatique.

Pour épingler une version précise, changez le paramètre **Branch** de chaque service pour qu'il pointe vers une étiquette ou une branche de version. C'est la configuration recommandée en production — le déploiement automatique depuis `main` vous fait hériter de tout travail en cours.

## Coûts {#costs}

Fourchettes réelles pour une petite église (moins de 200 membres, trafic léger) :

| Composant | Coût mensuel approximatif |
|-----------|---------------------|
| Forfait de base Railway | 5 $ |
| Extension MySQL | 5 $ + ~1 $ de stockage |
| Calcul des 3 services web | 3 à 10 $ combinés |
| Volume de 1 Go | 0,25 $ |
| **Total** | **environ 15 à 25 $ par mois** |

Les coûts augmentent linéairement avec le trafic, les téléversements de photos et la taille de la base de données. Railway affiche l'utilisation en direct dans l'onglet **Usage** du projet — définissez-y des plafonds de dépenses pour limiter votre exposition.

## Dépannage

| Symptôme | Cause probable | Correction |
|---------|--------------|-----------|
| La construction échoue avec `EBUSY: rmdir '/app/node_modules/.cache'` | Conflit de montage du cache Nixpacks | Définissez `NIXPACKS_NO_CACHE=true` sur le service concerné |
| La construction de B1Admin échoue avec `Missing: @types/...` | `package-lock.json` désynchronisé | Récupérez la dernière version de `main` |
| Le déploiement de l'Api reste bloqué sur « Deploying » | Le contrôle de santé échoue — `/health` ne renvoie pas 200 | Consultez les journaux de déploiement ; généralement une variable d'environnement obligatoire manquante |
| B1Admin affiche « vérifiez votre courriel » mais aucun courriel n'arrive | `MAIL_SYSTEM=SMTP` défini mais identifiants absents ou erronés | Corrigez les identifiants, ou retirez `MAIL_SYSTEM` pour désactiver le courriel |
| La connexion redirige vers `api.churchapps.org` | `REACT_APP_STAGE` vaut `prod` | Définissez `REACT_APP_STAGE=custom` sur le service B1Admin |
| Toutes les églises avec sous-domaine affichent le même contenu | `REACT_APP_B1_WEBSITE_URL` ne contient pas le jeton `{subdomain}` | Définissez-le, par exemple, sur `https://{subdomain}.votreeglise.org` |
| Le domaine personnalisé affiche « Application not found » | Le DNS ne s'est pas encore propagé, ou le certificat Railway est en attente | Attendez 5 minutes ; vérifiez le DNS avec `dig admin.votreeglise.org` |

Si vous rencontrez un problème absent de cette liste, ouvrez un ticket sur [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) en joignant les journaux de déploiement.

## Articles connexes

- **[Auto-hébergement avec Docker](./docker.md)** — la même pile sur votre propre matériel ou VPS
- **[Configuration initiale](../../getting-started/initial-setup.md)** — premières étapes après la création de votre église
- **[Configuration initiale du site web](../../b1-admin/website/initial-setup.md)** — configurer le site public de votre église
- **[Paramètres des dons](../../b1-admin/donations/online-giving-setup.md)** — connecter Stripe ou PayPal
- **[Configuration locale de l'API](../api/local-setup.md)** — faire tourner la pile localement pour le développement
- **[Déploiement de l'API (AWS)](./apis.md)** — comment le SaaS officiel de ChurchApps est déployé
