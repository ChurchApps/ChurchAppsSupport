---
title: "Auto-hébergement sur Railway"
---

# Auto-hébergement sur Railway

<div class="article-intro">

ChurchApps publie un modèle [Railway](https://railway.com) en un clic qui donne à votre église sa propre instance privée de B1 Admin, du portail membre B1, de l'API et d'une base de données MySQL — le tout fonctionnant sur une infrastructure que vous possédez et payez directement. Ce guide vous met en ligne en environ 15 minutes, puis parcourt la configuration post-déploiement que la plupart des églises finissent par vouloir.

</div>

## Démarrage rapide

[![Déployer sur Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Cliquez sur le bouton **Deploy on Railway** ci-dessus.
2. Connectez-vous à Railway (ou créez un compte gratuit) et ajoutez un moyen de paiement.
3. Cliquez sur **Deploy** sans rien changer — chaque variable a une valeur par défaut sensée.
4. Attendez 5 à 10 minutes que les quatre services deviennent verts.
5. Ouvrez l'URL du service **B1Admin**, cliquez sur **Register**, et créez votre compte. Le premier compte est automatiquement un administrateur serveur.
6. Suivez les invites dans l'application pour créer votre première église.

C'est tout. Vous avez maintenant une instance ChurchApps pleinement fonctionnelle. Tout ce qui suit est du polissage optionnel.

:::tip
Le déploiement est actuellement en **bêta**. Si vous rencontrez quelque chose que la documentation ne couvre pas, veuillez ouvrir un ticket sur [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) avec les journaux de déploiement joints.
:::

<div class="prereqs">
<h4>Ce dont vous avez besoin</h4>

- Un compte [Railway](https://railway.com) gratuit
- Une carte de crédit enregistrée chez Railway (~15 à 25 $/mois pour une petite congrégation ; voir [Coûts](#costs))
- Environ 15 minutes pour le déploiement initial
- *Optionnel mais fortement recommandé plus tard :* identifiants SMTP et un domaine personnalisé

</div>

## Ce qui est déployé

Le modèle provisionne quatre services dans un seul projet Railway :

| Service | Objectif | URL après déploiement |
|---------|---------|------------------|
| **MySQL** | Stocke toutes les données (une instance, plusieurs schémas) | interne uniquement |
| **Api** | Backend pour membership, contenu, dons, présence, etc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Application web du personnel/administration | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Application web orientée membres et site web de l'église | `https://b1app-<id>.up.railway.app` |

Les schémas de base de données sont créés automatiquement au premier lancement par la migration de démarrage de l'API.

## Configuration initiale

Maintenant que vous êtes en ligne, voici les choses que la plupart des églises configurent ensuite, à peu près par ordre de priorité.

### 1. E-mail (fortement recommandé)

Sans e-mail, les membres peuvent toujours s'inscrire et utiliser le système, mais **ils ne peuvent pas réinitialiser les mots de passe oubliés** — un administrateur doit le faire pour eux. Configurer le SMTP prend environ 5 minutes.

Dans le tableau de bord Railway, ouvrez le service **Api** → **Variables**, et ajoutez :

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<votre hôte fournisseur>
SMTP_USER=<votre nom d'utilisateur>
SMTP_PASS=<votre mot de passe ou clé API>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Trois fournisseurs à connaître :

#### Resend — option gratuite la plus simple (100 e-mails/jour)

1. Inscrivez-vous sur [resend.com](https://resend.com).
2. Vérifiez un domaine d'envoi (ou utilisez l'expéditeur de test `onboarding@resend.dev` pour commencer).
3. Créez une clé API.
4. Définissez `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — gratuit pour usage personnel (~500/jour)

1. Activez l'authentification à deux facteurs sur le compte Google.
2. Créez un [mot de passe d'application](https://myaccount.google.com/apppasswords).
3. Définissez `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<le mot de passe d'application à 16 caractères>`.

#### AWS SES — le moins cher à grande échelle

1. Vérifiez un domaine d'envoi dans AWS.
2. Sortez du bac à sable SES si vous envoyez à des adresses non vérifiées.
3. Créez des identifiants SMTP sous **SES → SMTP Settings → Create credentials**.
4. Définissez `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<mot de passe SMTP SES>`.

Après avoir enregistré les variables, le service Api se redéploie automatiquement. Testez-le en déclenchant une réinitialisation de mot de passe sur un compte de test.

:::warning
Si vous définissez `MAIL_SYSTEM=SMTP` avec de mauvais identifiants, l'inscription semblera réussir mais l'e-mail de vérification n'arrivera jamais. Corrigez les identifiants, ou désactivez `MAIL_SYSTEM` pour revenir au mode sans e-mail.
:::

### 2. Domaines personnalisés

Les URL par défaut `*.up.railway.app` fonctionnent, mais la plupart des églises veulent les leurs.

Pour chaque service web (B1Admin et B1App) :

1. Ouvrez le service dans Railway → **Settings** → **Networking**.
2. Cliquez sur **+ Custom Domain** et entrez le nom d'hôte :
   - `admin.yourchurch.org` pour B1Admin
   - `app.yourchurch.org` (ou `www`) pour B1App
3. Ajoutez l'enregistrement CNAME que Railway vous montre à votre fournisseur DNS.
4. Attendez quelques minutes que le DNS se propage. Railway provisionne le certificat TLS automatiquement.

Puis mettez à jour les variables du service **Api** afin que les liens dans les e-mails utilisent les nouveaux domaines :

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Et sur le service **B1Admin** :

```
REACT_APP_API_BASE=https://api.yourchurch.org   (si vous définissez également un domaine API personnalisé)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Le jeton `{subdomain}` est littéral — il est remplacé au moment de l'exécution par le sous-domaine de chaque église (voir Multi-Site ci-dessous).

### 3. Multi-Site (plusieurs églises sur une instance)

ChurchApps est multi-tenant par conception — un déploiement peut héberger un nombre quelconque d'églises, chacune avec ses propres personnes, groupes et site web. Les nouvelles églises sont ajoutées entièrement via l'interface d'administration ; aucun changement d'infrastructure n'est nécessaire.

#### Ajouter des églises supplémentaires

1. Dans **B1 Admin**, naviguez vers **Settings → Manage Church → Switch Church → Create New**.
2. Chaque église a un **slug de sous-domaine** unique (par exemple `firstchurch`, `gracecommunity`).
3. La nouvelle église obtient ses propres données, membres, site web et configuration de dons, entièrement isolés des autres églises sur la même instance.

#### Router chaque église vers sa propre URL

Deux façons d'exposer les églises publiquement :

| Modèle | Exemple | Configuration |
|---------|---------|-------|
| **Basé sur un chemin** (fonctionne dès le départ) | `app.yourchurch.org/firstchurch` | Aucune configuration supplémentaire |
| **Basé sur un sous-domaine** (URL plus propres) | `firstchurch.yourchurch.org` | DNS générique + domaine personnalisé générique |

Pour le routage **basé sur un sous-domaine** sur Railway :

1. Chez votre fournisseur DNS, créez un CNAME générique : `*.yourchurch.org → <cible railway b1app>`.
2. Dans Railway, sur le service B1App → **Settings → Networking**, ajoutez `*.yourchurch.org` comme domaine personnalisé.
3. Sur le service **B1Admin**, définissez `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Après redéploiement, le site de chaque église est servi sur `<leur-sous-domaine>.yourchurch.org` automatiquement.

:::info
Les domaines personnalisés génériques requièrent un plan Railway payant. Le routage basé sur un chemin fonctionne sur tous les plans et est fonctionnellement identique — juste moins joli dans la barre d'adresse.
:::

### 4. Dons en ligne (Stripe / PayPal)

Les dons sont configurés **par église dans l'interface d'administration**, pas via des variables d'environnement — ainsi chaque église peut utiliser son propre compte marchand.

1. Obtenez des identifiants développeur de [Stripe](https://dashboard.stripe.com/) (Developers → API keys) ou [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. Dans B1 Admin, allez dans **Settings → Giving Settings**.
3. Choisissez votre fournisseur, collez les clés publique et secrète, et configurez la gestion des frais.
4. Optionnellement, ajoutez `GOOGLE_RECAPTCHA_SECRET_KEY` au service **Api** dans Railway pour protéger les formulaires de dons publics contre les bots.

### 5. Stockage de fichiers

Le modèle provisionne un **volume persistant de 1 Go** monté sur le service Api pour les photos des membres, les fichiers de prédication et les documents téléchargés.

Pour l'agrandir : ouvrez le service Api → **Volumes** → ajustez le curseur de taille.

Pour des déploiements plus importants (100+ Go ou de nombreux téléchargements simultanés), passez à S3 en définissant ceci sur le service **Api** :

```
FILE_STORE=S3
AWS_S3_BUCKET=<votre-bucket>
AWS_ACCESS_KEY_ID=<clé>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Les fichiers existants dans le volume ne migrent pas automatiquement — copiez-les vers le bucket avant de basculer la variable.

### 6. Intégrations de fonctionnalités optionnelles

Celles-ci débloquent des fonctionnalités spécifiques et peuvent toutes être ajoutées plus tard via le tableau de bord Railway. Définissez-les sur le service **Api**.

| Variable | Fonctionnalité qu'elle active |
|----------|--------------------|
| `OPENAI_API_KEY` *ou* `OPENROUTER_API_KEY` | Recherche assistée par IA et suggestions de contenu |
| `YOUTUBE_API_KEY` | Recherche et intégration de prédications YouTube |
| `PEXELS_KEY` | Sélecteur d'images libres de droits pour le créateur de sites web |
| `VIMEO_TOKEN` | Support des prédications Vimeo |
| `API_BIBLE_KEY` | Recherches de versets bibliques dans les leçons et le contenu |
| `YOUVERSION_API_KEY` | Intégration Bible YouVersion |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Notifications push du navigateur (générer une paire de clés VAPID) |
| `HUBSPOT_KEY` | Synchronisation CRM optionnelle pour les nouvelles inscriptions |

## Mise à jour

Chaque service est lié à son dépôt GitHub respectif. Les pushs sur `main` de `ChurchApps/Api`, `ChurchApps/B1Admin`, ou `ChurchApps/B1App` déclenchent des redéploiements automatiques.

Pour épingler une version spécifique, changez le paramètre **Branch** de chaque service sur un tag ou une branche de release. C'est la configuration recommandée pour la production — le déploiement automatique depuis `main` signifie que vous héritez de tout travail en cours.

## Coûts

Fourchettes réelles pour une petite église (moins de 200 membres, trafic léger) :

| Composant | Coût mensuel approximatif |
|-----------|---------------------|
| Base Railway | 5 $ |
| Plugin MySQL | 5 $ + ~1 $ de stockage |
| Calcul de 3 services web | 3 à 10 $ combinés |
| Volume de 1 Go | 0,25 $ |
| **Total** | **~15 à 25 $/mois** |

Les coûts évoluent linéairement avec le trafic, les téléchargements de photos et la taille de la base de données. Railway affiche l'utilisation en direct dans l'onglet **Usage** du projet — définissez-y des limites de dépenses pour plafonner votre exposition.

## Dépannage

| Symptôme | Cause probable | Correction |
|---------|--------------|-----|
| La construction échoue avec `EBUSY: rmdir '/app/node_modules/.cache'` | Conflit de montage du cache Nixpacks | Définissez `NIXPACKS_NO_CACHE=true` sur le service concerné |
| La construction échoue sur B1Admin avec `Missing: @types/...` | `package-lock.json` désynchronisé | Récupérez le dernier `main` |
| Le déploiement de Api reste bloqué sur « Deploying » | Le bilan de santé échoue — `/health` ne retourne pas 200 | Consultez les journaux de déploiement ; généralement une variable d'environnement requise manquante |
| B1Admin affiche « check your email » mais aucun e-mail n'arrive | `MAIL_SYSTEM=SMTP` défini mais identifiants manquants/incorrects | Corrigez les identifiants, ou désactivez `MAIL_SYSTEM` pour désactiver l'e-mail |
| La connexion redirige vers `api.churchapps.org` | `REACT_APP_STAGE` vaut `prod` | Définissez `REACT_APP_STAGE=custom` sur le service B1Admin |
| Les églises en sous-domaine affichent toutes le même contenu | `REACT_APP_B1_WEBSITE_URL` n'inclut pas le jeton `{subdomain}` | Définissez-le par exemple à `https://{subdomain}.yourchurch.org` |
| Le domaine personnalisé affiche « Application not found » | DNS pas encore propagé, ou certificat Railway en attente | Attendez 5 minutes ; vérifiez le DNS avec `dig admin.yourchurch.org` |

Si vous rencontrez quelque chose qui n'est pas dans cette liste, ouvrez un ticket sur [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) avec les journaux de déploiement joints.

## Articles connexes

- **[Auto-hébergement avec Docker](./docker)** — La même pile sur votre propre matériel ou VPS
- **[Configuration initiale](../../getting-started/initial-setup)** — Premières étapes après la création de votre église
- **[Configuration initiale du site web](../../b1-admin/website/initial-setup)** — Configurer le site public de votre église
- **[Paramètres de dons](../../b1-admin/donations/online-giving-setup)** — Configurer Stripe ou PayPal
- **[Configuration locale de l'API](../api/local-setup)** — Exécuter la pile localement pour le développement
- **[Déploiement de l'API (AWS)](./apis)** — Comment le SaaS officiel ChurchApps est déployé
